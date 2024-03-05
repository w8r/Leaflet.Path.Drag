import { SVG as P, Browser as x, Canvas as C, Path as D, Handler as h, DomUtil as m, DomEvent as f, Util as u, point as G, LatLngBounds as N } from "leaflet";
P.include({
  /**
   * Reset transform matrix
   */
  _resetTransformPath: function(t) {
    t._path.setAttributeNS(null, "transform", "");
  },
  /**
   * Applies matrix transformation to SVG
   * @param {L.Path}         layer
   * @param {Array.<Number>} matrix
   */
  transformPath: function(t, i) {
    t._path.setAttributeNS(
      null,
      "transform",
      "matrix(" + i.join(" ") + ")"
    );
  }
});
P.include(
  x.vml ? {
    /**
     * Reset transform matrix
     */
    _resetTransformPath: function(t) {
      t._skew && (t._skew.on = !1, t._path.removeChild(t._skew), t._skew = null);
    },
    /**
     * Applies matrix transformation to VML
     * @param {L.Path}         layer
     * @param {Array.<Number>} matrix
     */
    transformPath: function(t, i) {
      let n = t._skew;
      n || (n = P.create("skew"), t._path.appendChild(n), n.style.behavior = "url(#default#VML)", t._skew = n);
      const a = i[0].toFixed(8) + " " + i[1].toFixed(8) + " " + i[2].toFixed(8) + " " + i[3].toFixed(8) + " 0 0", r = Math.floor(i[4]).toFixed() + ", " + Math.floor(i[5]).toFixed(), s = this._path.style;
      let e = parseFloat(s.left), o = parseFloat(s.top), _ = parseFloat(s.width), p = parseFloat(s.height);
      isNaN(e) && (e = 0), isNaN(o) && (o = 0), (isNaN(_) || !_) && (_ = 1), (isNaN(p) || !p) && (p = 1);
      const l = (-e / _ - 0.5).toFixed(8) + " " + (-o / p - 0.5).toFixed(8);
      n.on = "f", n.matrix = a, n.origin = l, n.offset = r, n.on = !0;
    }
  } : {}
);
function E() {
  return !0;
}
C.include({
  /**
   * Do nothing
   * @param  {L.Path} layer
   */
  _resetTransformPath: function(t) {
    this._containerCopy && (delete this._containerCopy, t._containsPoint_ && (t._containsPoint = t._containsPoint_, delete t._containsPoint_, this._requestRedraw(t)));
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
  transformPath: function(t, i) {
    let n = this._containerCopy;
    const a = this._ctx;
    let r;
    const s = x.retina ? 2 : 1, e = this._bounds, o = e.getSize(), _ = e.min;
    n || (n = this._containerCopy = document.createElement("canvas"), r = n.getContext("2d"), n.width = s * o.x, n.height = s * o.y, this._removePath(t), this._redraw(), r.translate(s * e.min.x, s * e.min.y), r.drawImage(this._container, 0, 0), this._initPath(t), t._containsPoint_ = t._containsPoint, t._containsPoint = E), a.save(), a.clearRect(_.x, _.y, o.x * s, o.y * s), a.setTransform(1, 0, 0, 1, 0, 0), a.restore(), a.save(), a.drawImage(this._containerCopy, 0, 0, o.x, o.y), a.transform.apply(a, i), this._drawing = !0, t._updatePath(), this._drawing = !1, a.restore();
  }
});
/**
 * Leaflet vector features drag functionality
 * @author Alexander Milevski <info@w8r.name>
 * @preserve
 */
D.include({
  /**
   * Applies matrix transformation to SVG
   * @param {Array.<Number>?} matrix
   */
  _transform: function(t) {
    return this._renderer && (t ? this._renderer.transformPath(this, t) : (this._renderer._resetTransformPath(this), this._update())), this;
  },
  /**
   * Check if the feature was dragged, that'll supress the click event
   * on mouseup. That fixes popups for example
   *
   * @param  {MouseEvent} e
   */
  _onMouseClick: function(t) {
    this.dragging && this.dragging.moved() || this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(t);
  }
});
const S = {
  mousedown: "mouseup",
  touchstart: "touchend",
  pointerdown: "touchend",
  MSPointerDown: "touchend"
}, M = {
  mousedown: "mousemove",
  touchstart: "touchmove",
  pointerdown: "touchmove",
  MSPointerDown: "touchmove"
};
function k(t, i) {
  const n = t.x - i.x, a = t.y - i.y;
  return Math.sqrt(n * n + a * a);
}
h.PathDrag = h.extend(
  /** @lends  L.Path.Drag.prototype */
  {
    statics: {
      DRAGGING_CLS: "leaflet-path-draggable"
    },
    /**
     * @param  {L.Path} path
     * @constructor
     */
    initialize: function(t) {
      this._path = t, this._matrix = null, this._startPoint = null, this._dragStartPoint = null, this._mapDraggingWasEnabled = !1, this._path._dragMoved = !1;
    },
    /**
     * Enable dragging
     */
    addHooks: function() {
      this._path.on("mousedown", this._onDragStart, this), this._path.options.className = this._path.options.className ? this._path.options.className + " " + h.PathDrag.DRAGGING_CLS : h.PathDrag.DRAGGING_CLS, this._path._path && m.addClass(this._path._path, h.PathDrag.DRAGGING_CLS);
    },
    /**
     * Disable dragging
     */
    removeHooks: function() {
      this._path.off("mousedown", this._onDragStart, this), this._path.options.className = this._path.options.className.replace(
        new RegExp("\\s+" + h.PathDrag.DRAGGING_CLS),
        ""
      ), this._path._path && m.removeClass(this._path._path, h.PathDrag.DRAGGING_CLS);
    },
    /**
     * @return {Boolean}
     */
    moved: function() {
      return this._path._dragMoved;
    },
    /**
     * Start drag
     * @param  {L.MouseEvent} evt
     */
    _onDragStart: function(t) {
      const i = t.originalEvent._simulated ? "touchstart" : t.originalEvent.type;
      console.log({ eventType: i }), this._mapDraggingWasEnabled = !1, this._startPoint = t.containerPoint.clone(), this._dragStartPoint = t.containerPoint.clone(), this._matrix = [1, 0, 0, 1, 0, 0], f.stop(t.originalEvent), m.addClass(this._path._renderer._container, "leaflet-interactive"), f.on(document, M[i], this._onDrag, this).on(
        document,
        S[i],
        this._onDragEnd,
        this
      ), this._path._map.dragging.enabled() && (this._path._map.dragging.disable(), this._mapDraggingWasEnabled = !0), this._path._dragMoved = !1, this._path._popup && this._path._popup.close(), this._replaceCoordGetters(t);
    },
    /**
     * Dragging
     * @param  {L.MouseEvent} evt
     */
    _onDrag: function(t) {
      f.stop(t);
      const i = t.touches && t.touches.length >= 1 ? t.touches[0] : t, n = this._path._map.mouseEventToContainerPoint(i);
      if (t.type === "touchmove" && !this._path._dragMoved && this._dragStartPoint.distanceTo(n) <= this._path._map.options.tapTolerance)
        return;
      const a = n.x, r = n.y, s = a - this._startPoint.x, e = r - this._startPoint.y;
      (s || e) && (this._path._dragMoved || (this._path._dragMoved = !0, this._path.options.interactive = !1, this._path._map.dragging._draggable._moved = !0, this._path.fire("dragstart", t), this._path.bringToFront()), this._matrix[4] += s, this._matrix[5] += e, this._startPoint.x = a, this._startPoint.y = r, this._path.fire("predrag", t), this._path._transform(this._matrix), this._path.fire("drag", t));
    },
    /**
     * Dragging stopped, apply
     * @param  {L.MouseEvent} evt
     */
    _onDragEnd: function(t) {
      const i = this._path._map.mouseEventToContainerPoint(t), n = this.moved();
      if (n && (this._transformPoints(this._matrix), this._path._updatePath(), this._path._project(), this._path._transform(null), f.stop(t)), f.off(document, "mousemove touchmove", this._onDrag, this), f.off(document, "mouseup touchend", this._onDragEnd, this), this._restoreCoordGetters(), n) {
        this._path.fire("dragend", {
          distance: k(this._dragStartPoint, i)
        });
        const a = this._path._containsPoint;
        this._path._containsPoint = u.falseFn, u.requestAnimFrame(function() {
          this._path._dragMoved = !1, this._path.options.interactive = !0, this._path._containsPoint = a;
        }, this);
      }
      this._mapDraggingWasEnabled && this._path._map.dragging.enable();
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
    _transformPoints: function(t, i) {
      const n = this._path, a = L.point(t[4], t[5]), r = n._map.options.crs, s = r.transformation, e = r.scale(n._map.getZoom()), o = r.projection, _ = s.untransform(a, e).subtract(s.untransform(G(0, 0), e)), p = !i;
      if (n._bounds = new N(), n._point)
        i = o.unproject(
          o.project(n._latlng)._add(_)
        ), p && (n._latlng = i, n._point._add(a));
      else if (n._rings || n._parts) {
        const l = n._rings || n._parts;
        let c = n._latlngs;
        i = i || c, u.isArray(c[0]) || (c = [c], i = [i]);
        for (let g = 0, w = l.length; g < w; g++) {
          i[g] = i[g] || [];
          for (let d = 0, v = l[g].length; d < v; d++) {
            const b = c[g][d];
            i[g][d] = o.unproject(
              o.project(b)._add(_)
            ), p && (n._bounds.extend(c[g][d]), l[g][d]._add(a));
          }
        }
      }
      return i;
    },
    /**
     * If you want to read the latlngs during the drag - your right,
     * but they have to be transformed
     */
    _replaceCoordGetters: function() {
      this._path.getLatLng ? (this._path.getLatLng_ = this._path.getLatLng, this._path.getLatLng = u.bind(function() {
        return this.dragging._transformPoints(this.dragging._matrix, {});
      }, this._path)) : this._path.getLatLngs && (this._path.getLatLngs_ = this._path.getLatLngs, this._path.getLatLngs = u.bind(function() {
        return this.dragging._transformPoints(this.dragging._matrix, []);
      }, this._path));
    },
    /**
     * Put back the getters
     */
    _restoreCoordGetters: function() {
      this._path.getLatLng_ ? (this._path.getLatLng = this._path.getLatLng_, delete this._path.getLatLng_) : this._path.getLatLngs_ && (this._path.getLatLngs = this._path.getLatLngs_, delete this._path.getLatLngs_);
    }
  }
);
h.PathDrag.makeDraggable = function(t) {
  return t.dragging = new h.PathDrag(t), t;
};
D.prototype.makeDraggable = function() {
  return h.PathDrag.makeDraggable(this);
};
D.addInitHook(function() {
  this.options.draggable ? (this.options.interactive = !0, this.dragging ? this.dragging.enable() : (h.PathDrag.makeDraggable(this), this.dragging.enable())) : this.dragging && this.dragging.disable();
});
const T = h.PathDrag;
export {
  T as default
};
