/**
 * Leaflet vector features drag functionality
 * @author Alexander Milevski <info@w8r.name>
 * @preserve
 */

/**
 * Matrix transform path for SVG/VML
 * Renderer-independent
 */
L.Path.include({
  /**
   * Applies matrix transformation to SVG
   * @param {Array.<Number>?} matrix
   */
  _transform: function (matrix) {
    if (this._renderer) {
      if (matrix) {
        this._renderer.transformPath(this, matrix);
      } else {
        // reset transform matrix
        this._renderer._resetTransformPath(this);
        this._update();
      }
    }
    return this;
  },

  /**
   * Check if the feature was dragged, that'll supress the click event
   * on mouseup. That fixes popups for example
   *
   * @param  {MouseEvent} e
   */
  _onMouseClick: function (e) {
    if (
      (this.dragging && this.dragging.moved()) ||
      (this._map.dragging && this._map.dragging.moved())
    ) {
      return;
    }

    this._fireMouseEvent(e);
  },
});
var END = {
  mousedown: 'mouseup',
  touchstart: 'touchend',
  pointerdown: 'touchend',
  MSPointerDown: 'touchend',
};

var MOVE = {
  mousedown: 'mousemove',
  touchstart: 'touchmove',
  pointerdown: 'touchmove',
  MSPointerDown: 'touchmove',
};

function distance(a, b) {
  var dx = a.x - b.x,
    dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Drag handler
 * @class L.Path.Drag
 * @extends {L.Handler}
 */
L.Handler.PathDrag = L.Handler.extend(
  /** @lends  L.Path.Drag.prototype */ {
    statics: {
      DRAGGING_CLS: 'leaflet-path-draggable',
    },

    /**
     * @param  {L.Path} path
     * @constructor
     */
    initialize: function (path) {
      /**
       * @type {L.Path}
       */
      this._path = path;

      /**
       * @type {Array.<Number>}
       */
      this._matrix = null;

      /**
       * @type {L.Point}
       */
      this._startPoint = null;

      /**
       * @type {L.Point}
       */
      this._dragStartPoint = null;

      /**
       * @type {Boolean}
       */
      this._mapDraggingWasEnabled = false;

      this._path._dragMoved = false;
    },

    /**
     * Enable dragging
     */
    addHooks: function () {
      this._path.on('mousedown', this._onDragStart, this);

      this._path.options.className = this._path.options.className
        ? this._path.options.className + ' ' + L.Handler.PathDrag.DRAGGING_CLS
        : L.Handler.PathDrag.DRAGGING_CLS;

      if (this._path._path) {
        L.DomUtil.addClass(this._path._path, L.Handler.PathDrag.DRAGGING_CLS);
      }
    },

    /**
     * Disable dragging
     */
    removeHooks: function () {
      this._path.off('mousedown', this._onDragStart, this);

      this._path.options.className = this._path.options.className.replace(
        new RegExp('\\s+' + L.Handler.PathDrag.DRAGGING_CLS),
        ''
      );
      if (this._path._path) {
        L.DomUtil.removeClass(
          this._path._path,
          L.Handler.PathDrag.DRAGGING_CLS
        );
      }
    },

    /**
     * @return {Boolean}
     */
    moved: function () {
      return this._path._dragMoved;
    },

    /**
     * Start drag
     * @param  {L.MouseEvent} evt
     */
    _onDragStart: function (evt) {
      var eventType = evt.originalEvent._simulated
        ? 'touchstart'
        : evt.originalEvent.type;

      this._mapDraggingWasEnabled = false;
      this._startPoint = evt.containerPoint.clone();

      this._dragStartPoint = evt.containerPoint.clone();
      this._matrix = [1, 0, 0, 1, 0, 0];
      L.DomEvent.stop(evt.originalEvent);

      L.DomUtil.addClass(
        this._path._renderer._container,
        'leaflet-interactive'
      );
      L.DomEvent.on(document, MOVE[eventType], this._onDrag, this).on(
        document,
        END[eventType],
        this._onDragEnd,
        this
      );

      //L.DomEvent.disableClickPropagation(this._path._renderer._container);

      if (this._path._map.dragging.enabled()) {
        // I guess it's required because mousdown gets simulated with a delay
        //this._path._map.dragging._draggable._onUp(evt);

        this._path._map.dragging.disable();
        this._mapDraggingWasEnabled = true;
      }
      this._path._dragMoved = false;

      if (this._path._popup) {
        // that might be a case on touch devices as well
        this._path._popup.close();
      }

      this._replaceCoordGetters(evt);
    },

    /**
     * Dragging
     * @param  {L.MouseEvent} evt
     */
    _onDrag: function (evt) {
      L.DomEvent.stop(evt);

      var first = evt.touches && evt.touches.length >= 1 ? evt.touches[0] : evt;
      var containerPoint = this._path._map.mouseEventToContainerPoint(first);

      // skip taps
      if (evt.type === 'touchmove' && !this._path._dragMoved) {
        var totalMouseDragDistance =
          this._dragStartPoint.distanceTo(containerPoint);
        if (totalMouseDragDistance <= this._path._map.options.tapTolerance) {
          return;
        }
      }

      var x = containerPoint.x;
      var y = containerPoint.y;

      var dx = x - this._startPoint.x;
      var dy = y - this._startPoint.y;

      // Send events only if point was moved
      if (dx || dy) {
        if (!this._path._dragMoved) {
          this._path._dragMoved = true;
          this._path.options.interactive = false;
          this._path._map.dragging._draggable._moved = true;

          this._path.fire('dragstart', evt);
          // we don't want that to happen on click
          this._path.bringToFront();
        }

        this._matrix[4] += dx;
        this._matrix[5] += dy;

        this._startPoint.x = x;
        this._startPoint.y = y;

        this._path.fire('predrag', evt);
        this._path._transform(this._matrix);
        this._path.fire('drag', evt);
      }
    },

    /**
     * Dragging stopped, apply
     * @param  {L.MouseEvent} evt
     */
    _onDragEnd: function (evt) {
      var containerPoint = this._path._map.mouseEventToContainerPoint(evt);
      var moved = this.moved();

      // apply matrix
      if (moved) {
        this._transformPoints(this._matrix);
        this._path._updatePath();
        this._path._project();
        this._path._transform(null);

        L.DomEvent.stop(evt);
      }

      L.DomEvent.off(document, 'mousemove touchmove', this._onDrag, this);
      L.DomEvent.off(document, 'mouseup touchend', this._onDragEnd, this);

      this._restoreCoordGetters();

      // consistency
      if (moved) {
        this._path.fire('dragend', {
          distance: distance(this._dragStartPoint, containerPoint),
        });

        // hack for skipping the click in canvas-rendered layers
        var contains = this._path._containsPoint;
        this._path._containsPoint = L.Util.falseFn;

        L.Util.requestAnimFrame(function () {
          this._path._dragMoved = false;
          this._path.options.interactive = true;
          this._path._containsPoint = contains;
        }, this);
      }

      if (this._mapDraggingWasEnabled) {
        //if (moved) L.DomEvent.fakeStop({ type: "click" });
        this._path._map.dragging.enable();
      }
    },

    /**
     * Applies transformation, does it in one sweep for performance,
     * so don't be surprised about the code repetition.
     *
     * [ x ]   [ a  b  tx ] [ x ]   [ a * x + b * y + tx ]
     * [ y ] = [ c  d  ty ] [ y ] = [ c * x + d * y + ty ]
     *
     * @param {Array.<Number>} matrix
     */
    _transformPoints: function (matrix, dest) {
      var path = this._path;
      var i, len, latlng;

      var px = L.point(matrix[4], matrix[5]);

      var crs = path._map.options.crs;
      var transformation = crs.transformation;
      var scale = crs.scale(path._map.getZoom());
      var projection = crs.projection;

      var diff = transformation
        .untransform(px, scale)
        .subtract(transformation.untransform(L.point(0, 0), scale));
      var applyTransform = !dest;

      path._bounds = new L.LatLngBounds();

      // console.time('transform');
      // all shifts are in-place
      if (path._point) {
        // L.Circle
        dest = projection.unproject(
          projection.project(path._latlng)._add(diff)
        );
        if (applyTransform) {
          path._latlng = dest;
          path._point._add(px);
        }
      } else if (path._rings || path._parts) {
        // everything else
        var rings = path._rings || path._parts;
        var latlngs = path._latlngs;
        dest = dest || latlngs;
        if (!L.Util.isArray(latlngs[0])) {
          // polyline
          latlngs = [latlngs];
          dest = [dest];
        }
        for (i = 0, len = rings.length; i < len; i++) {
          dest[i] = dest[i] || [];
          for (var j = 0, jj = rings[i].length; j < jj; j++) {
            latlng = latlngs[i][j];
            dest[i][j] = projection.unproject(
              projection.project(latlng)._add(diff)
            );
            if (applyTransform) {
              path._bounds.extend(latlngs[i][j]);
              rings[i][j]._add(px);
            }
          }
        }
      }
      return dest;
      // console.timeEnd('transform');
    },

    /**
     * If you want to read the latlngs during the drag - your right,
     * but they have to be transformed
     */
    _replaceCoordGetters: function () {
      if (this._path.getLatLng) {
        // Circle, CircleMarker
        this._path.getLatLng_ = this._path.getLatLng;
        this._path.getLatLng = L.Util.bind(function () {
          return this.dragging._transformPoints(this.dragging._matrix, {});
        }, this._path);
      } else if (this._path.getLatLngs) {
        this._path.getLatLngs_ = this._path.getLatLngs;
        this._path.getLatLngs = L.Util.bind(function () {
          return this.dragging._transformPoints(this.dragging._matrix, []);
        }, this._path);
      }
    },

    /**
     * Put back the getters
     */
    _restoreCoordGetters: function () {
      if (this._path.getLatLng_) {
        this._path.getLatLng = this._path.getLatLng_;
        delete this._path.getLatLng_;
      } else if (this._path.getLatLngs_) {
        this._path.getLatLngs = this._path.getLatLngs_;
        delete this._path.getLatLngs_;
      }
    },
  }
);

/**
 * @param  {L.Path} layer
 * @return {L.Path}
 */
L.Handler.PathDrag.makeDraggable = function (layer) {
  layer.dragging = new L.Handler.PathDrag(layer);
  return layer;
};

/**
 * Also expose as a method
 * @return {L.Path}
 */
L.Path.prototype.makeDraggable = function () {
  return L.Handler.PathDrag.makeDraggable(this);
};

L.Path.addInitHook(function () {
  if (this.options.draggable) {
    // ensure interactive
    this.options.interactive = true;

    if (this.dragging) {
      this.dragging.enable();
    } else {
      L.Handler.PathDrag.makeDraggable(this);
      this.dragging.enable();
    }
  } else if (this.dragging) {
    this.dragging.disable();
  }
});
L.SVG.include({
  /**
   * Reset transform matrix
   */
  _resetTransformPath: function (layer) {
    layer._path.setAttributeNS(null, 'transform', '');
  },

  /**
   * Applies matrix transformation to SVG
   * @param {L.Path}         layer
   * @param {Array.<Number>} matrix
   */
  transformPath: function (layer, matrix) {
    layer._path.setAttributeNS(
      null,
      'transform',
      'matrix(' + matrix.join(' ') + ')'
    );
  },
});
L.SVG.include(
  !L.Browser.vml
    ? {}
    : {
        /**
         * Reset transform matrix
         */
        _resetTransformPath: function (layer) {
          if (layer._skew) {
            // super important! workaround for a 'jumping' glitch:
            // disable transform before removing it
            layer._skew.on = false;
            layer._path.removeChild(layer._skew);
            layer._skew = null;
          }
        },

        /**
         * Applies matrix transformation to VML
         * @param {L.Path}         layer
         * @param {Array.<Number>} matrix
         */
        transformPath: function (layer, matrix) {
          var skew = layer._skew;

          if (!skew) {
            skew = L.SVG.create('skew');
            layer._path.appendChild(skew);
            skew.style.behavior = 'url(#default#VML)';
            layer._skew = skew;
          }

          // handle skew/translate separately, cause it's broken
          var mt =
            matrix[0].toFixed(8) +
            ' ' +
            matrix[1].toFixed(8) +
            ' ' +
            matrix[2].toFixed(8) +
            ' ' +
            matrix[3].toFixed(8) +
            ' 0 0';
          var offset =
            Math.floor(matrix[4]).toFixed() +
            ', ' +
            Math.floor(matrix[5]).toFixed() +
            '';

          var s = this._path.style;
          var l = parseFloat(s.left);
          var t = parseFloat(s.top);
          var w = parseFloat(s.width);
          var h = parseFloat(s.height);

          if (isNaN(l)) l = 0;
          if (isNaN(t)) t = 0;
          if (isNaN(w) || !w) w = 1;
          if (isNaN(h) || !h) h = 1;

          var origin =
            (-l / w - 0.5).toFixed(8) + ' ' + (-t / h - 0.5).toFixed(8);

          skew.on = 'f';
          skew.matrix = mt;
          skew.origin = origin;
          skew.offset = offset;
          skew.on = true;
        },
      }
);
function TRUE_FN() {
  return true;
}

L.Canvas.include({
  /**
   * Do nothing
   * @param  {L.Path} layer
   */
  _resetTransformPath: function (layer) {
    if (!this._containerCopy) return;

    delete this._containerCopy;

    if (layer._containsPoint_) {
      layer._containsPoint = layer._containsPoint_;
      delete layer._containsPoint_;

      this._requestRedraw(layer);
    }
  },

  /**
   * Algorithm outline:
   *
   * 1. pre-transform - clear the path out of the canvas, copy canvas state
   * 2. at every frame:
   *    2.1. save
   *    2.2. redraw the canvas from saved one
   *    2.3. transform
   *    2.4. draw path
   *    2.5. restore
   * 3. Repeat
   *
   * @param  {L.Path}         layer
   * @param  {Array.<Number>} matrix
   */
  transformPath: function (layer, matrix) {
    var copy = this._containerCopy;
    var ctx = this._ctx,
      copyCtx;
    var m = L.Browser.retina ? 2 : 1;
    var bounds = this._bounds;
    var size = bounds.getSize();
    var pos = bounds.min;

    if (!copy) {
      // get copy of all rendered layers
      copy = this._containerCopy = document.createElement('canvas');
      copyCtx = copy.getContext('2d');
      // document.body.appendChild(copy);

      copy.width = m * size.x;
      copy.height = m * size.y;

      this._removePath(layer);
      this._redraw();

      copyCtx.translate(m * bounds.min.x, m * bounds.min.y);
      copyCtx.drawImage(this._container, 0, 0);
      this._initPath(layer);

      // avoid flickering because of the 'mouseover's
      layer._containsPoint_ = layer._containsPoint;
      layer._containsPoint = TRUE_FN;
    }

    ctx.save();
    ctx.clearRect(pos.x, pos.y, size.x * m, size.y * m);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();
    ctx.save();

    ctx.drawImage(this._containerCopy, 0, 0, size.x, size.y);
    ctx.transform.apply(ctx, matrix);

    // now draw one layer only
    this._drawing = true;
    layer._updatePath();
    this._drawing = false;

    ctx.restore();
  },
});
