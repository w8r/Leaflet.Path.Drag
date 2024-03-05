import {
  Path,
  Handler,
  DomEvent,
  DomUtil,
  Util,
  point,
  LatLngBounds,
} from 'leaflet';

const END = {
  mousedown: 'mouseup',
  touchstart: 'touchend',
  pointerdown: 'touchend',
  MSPointerDown: 'touchend',
};

const MOVE = {
  mousedown: 'mousemove',
  touchstart: 'touchmove',
  pointerdown: 'touchmove',
  MSPointerDown: 'touchmove',
};

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Drag handler
 * @class L.Path.Drag
 * @extends {L.Handler}
 */
Handler.PathDrag = Handler.extend(
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
        ? this._path.options.className + ' ' + Handler.PathDrag.DRAGGING_CLS
        : Handler.PathDrag.DRAGGING_CLS;

      if (this._path._path) {
        DomUtil.addClass(this._path._path, Handler.PathDrag.DRAGGING_CLS);
      }
    },

    /**
     * Disable dragging
     */
    removeHooks: function () {
      this._path.off('mousedown', this._onDragStart, this);

      this._path.options.className = this._path.options.className.replace(
        new RegExp('\\s+' + Handler.PathDrag.DRAGGING_CLS),
        ''
      );
      if (this._path._path) {
        DomUtil.removeClass(this._path._path, Handler.PathDrag.DRAGGING_CLS);
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
      const eventType = evt.originalEvent._simulated
        ? 'touchstart'
        : evt.originalEvent.type;

      console.log({ eventType });

      this._mapDraggingWasEnabled = false;
      this._startPoint = evt.containerPoint.clone();

      this._dragStartPoint = evt.containerPoint.clone();
      this._matrix = [1, 0, 0, 1, 0, 0];
      DomEvent.stop(evt.originalEvent);

      DomUtil.addClass(this._path._renderer._container, 'leaflet-interactive');
      DomEvent.on(document, MOVE[eventType], this._onDrag, this).on(
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
      DomEvent.stop(evt);

      const first =
        evt.touches && evt.touches.length >= 1 ? evt.touches[0] : evt;
      const containerPoint = this._path._map.mouseEventToContainerPoint(first);

      // skip taps
      if (evt.type === 'touchmove' && !this._path._dragMoved) {
        const totalMouseDragDistance =
          this._dragStartPoint.distanceTo(containerPoint);
        if (totalMouseDragDistance <= this._path._map.options.tapTolerance) {
          return;
        }
      }

      const x = containerPoint.x;
      const y = containerPoint.y;

      const dx = x - this._startPoint.x;
      const dy = y - this._startPoint.y;

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
      const containerPoint = this._path._map.mouseEventToContainerPoint(evt);
      const moved = this.moved();

      // apply matrix
      if (moved) {
        this._transformPoints(this._matrix);
        this._path._updatePath();
        this._path._project();
        this._path._transform(null);

        DomEvent.stop(evt);
      }

      DomEvent.off(document, 'mousemove touchmove', this._onDrag, this);
      DomEvent.off(document, 'mouseup touchend', this._onDragEnd, this);

      this._restoreCoordGetters();

      // consistency
      if (moved) {
        this._path.fire('dragend', {
          distance: distance(this._dragStartPoint, containerPoint),
        });

        // hack for skipping the click in canvas-rendered layers
        const contains = this._path._containsPoint;
        this._path._containsPoint = Util.falseFn;

        Util.requestAnimFrame(function () {
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
      const path = this._path;

      const px = L.point(matrix[4], matrix[5]);

      const crs = path._map.options.crs;
      const transformation = crs.transformation;
      const scale = crs.scale(path._map.getZoom());
      const projection = crs.projection;

      const diff = transformation
        .untransform(px, scale)
        .subtract(transformation.untransform(point(0, 0), scale));
      const applyTransform = !dest;

      path._bounds = new LatLngBounds();

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
        const rings = path._rings || path._parts;
        let latlngs = path._latlngs;
        dest = dest || latlngs;
        if (!Util.isArray(latlngs[0])) {
          // polyline
          latlngs = [latlngs];
          dest = [dest];
        }
        for (let i = 0, len = rings.length; i < len; i++) {
          dest[i] = dest[i] || [];
          for (let j = 0, jj = rings[i].length; j < jj; j++) {
            const latlng = latlngs[i][j];
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
        this._path.getLatLng = Util.bind(function () {
          return this.dragging._transformPoints(this.dragging._matrix, {});
        }, this._path);
      } else if (this._path.getLatLngs) {
        this._path.getLatLngs_ = this._path.getLatLngs;
        this._path.getLatLngs = Util.bind(function () {
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
Handler.PathDrag.makeDraggable = function (layer) {
  layer.dragging = new Handler.PathDrag(layer);
  return layer;
};

/**
 * Also expose as a method
 * @return {L.Path}
 */
Path.prototype.makeDraggable = function () {
  return Handler.PathDrag.makeDraggable(this);
};

Path.addInitHook(function () {
  if (this.options.draggable) {
    // ensure interactive
    this.options.interactive = true;

    if (this.dragging) {
      this.dragging.enable();
    } else {
      Handler.PathDrag.makeDraggable(this);
      this.dragging.enable();
    }
  } else if (this.dragging) {
    this.dragging.disable();
  }
});

const PathDrag = Handler.PathDrag;
export { PathDrag };
