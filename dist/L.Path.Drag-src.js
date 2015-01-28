/**
 * Matrix transform path for SVG/VML
 * TODO: adapt to Leaflet 0.8 upon release
 */

"use strict";

if (L.Browser.svg) { // SVG transformation

  L.Path.include({

    /**
     * Reset transform matrix
     */
    _resetTransform: function() {
      this._container.setAttributeNS(null, 'transform', '');
    },

    /**
     * Applies matrix transformation to SVG
     * @param {Array.<Number>} matrix
     */
    _applyTransform: function(matrix) {
      this._container.setAttributeNS(null, "transform",
        'matrix(' + matrix.join(' ') + ')');
    }

  });

} else { // VML transform routines

  L.Path.include({

    /**
     * Reset transform matrix
     */
    _resetTransform: function() {
      if (this._skew) {
        // super important! workaround for a 'jumping' glitch:
        // disable transform before removing it
        this._skew.on = false;
        this._container.removeChild(this._skew);
        this._skew = null;
      }
    },

    /**
     * Applies matrix transformation to VML
     * @param {Array.<Number>} matrix
     */
    _applyTransform: function(matrix) {
      var skew = this._skew;

      if (!skew) {
        skew = this._createElement('skew');
        this._container.appendChild(skew);
        skew.style.behavior = 'url(#default#VML)';
        this._skew = skew;
      }

      // handle skew/translate separately, cause it's broken
      var mt = matrix[0].toFixed(8) + " " + matrix[1].toFixed(8) + " " +
        matrix[2].toFixed(8) + " " + matrix[3].toFixed(8) + " 0 0";
      var offset = Math.floor(matrix[4]).toFixed() + ", " +
        Math.floor(matrix[5]).toFixed() + "";

      var s = this._container.style;
      var l = parseFloat(s.left);
      var t = parseFloat(s.top);
      var w = parseFloat(s.width);
      var h = parseFloat(s.height);

      if (isNaN(l)) l = 0;
      if (isNaN(t)) t = 0;
      if (isNaN(w) || !w) w = 1;
      if (isNaN(h) || !h) h = 1;

      var origin = (-l / w - 0.5).toFixed(8) + " " + (-t / h - 0.5).toFixed(8);

      skew.on = "f";
      skew.matrix = mt;
      skew.origin = origin;
      skew.offset = offset;
      skew.on = true;
    }

  });
}
/**
 * Leaflet vector features drag functionality
 * @preserve
 */

"use strict";

/**
 * Drag handler
 * @class L.Path.Drag
 * @extends {L.Handler}
 */
L.Path.Drag = L.Handler.extend( /** @lends  L.Path.Drag.prototype */ {

  /**
   * @param  {L.Path} path
   * @constructor
   */
  initialize: function(path) {

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

  },

  /**
   * Enable dragging
   */
  addHooks: function() {
    this._path.on('mousedown', this._onDragStart, this);
    L.DomUtil.addClass(this._path._container, 'leaflet-path-draggable');
  },

  /**
   * Disable dragging
   */
  removeHooks: function() {
    this._path.off('mousedown', this._onDragStart, this);
    L.DomUtil.removeClass(this._path._container, 'leaflet-path-draggable');
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
  _onDragStart: function(evt) {
    this._startPoint = L.point(evt.containerPoint);
    this._dragStartPoint = L.point(evt.containerPoint);
    this._matrix = [1, 0, 0, 1, 0, 0];

    this._path._map
      .on('mousemove', this._onDrag, this)
      .on('mouseup', this._onDragEnd, this)
    this._path._dragMoved = false;
  },

  /**
   * Dragging
   * @param  {L.MouseEvent} evt
   */
  _onDrag: function(evt) {
    var x = evt.containerPoint.x;
    var y = evt.containerPoint.y;

    var dx = x - this._startPoint.x;
    var dy = y - this._startPoint.y;

    if (!this._path._dragMoved && (dx || dy)) {
      this._path._dragMoved = true;
      this._path.fire('dragstart');
    }

    this._matrix[4] += dx;
    this._matrix[5] += dy;

    this._startPoint.x = x;
    this._startPoint.y = y;

    this._path._applyTransform(this._matrix);
    this._path.fire('drag');
    L.DomEvent.stop(evt.originalEvent);
  },

  /**
   * Dragging stopped, apply
   * @param  {L.MouseEvent} evt
   */
  _onDragEnd: function(evt) {
    // undo container transform
    this._path._resetTransform();
    // apply matrix
    this._transformPoints();

    this._path._map
      .off('mousemove', this._onDrag, this)
      .off('mouseup', this._onDragEnd, this);

    // consistency
    this._path.fire('dragend', {
      distance: Math.sqrt(
        L.LineUtil._sqDist(this._dragStartPoint, evt.containerPoint)
      )
    });

    this._matrix = null;
    this._startPoint = null;
    this._dragStartPoint = null;
  },

  /**
   * Applies transformation, does it in one sweep for performance,
   * so don't be surprised about the code repetition.
   *
   * [ x ]   [ a  b  tx ] [ x ]   [ a * x + b * y + tx ]
   * [ y ] = [ c  d  ty ] [ y ] = [ c * x + d * y + ty ]
   *
   * @param  {L.Point}        pt
   * @param  {Array.<Number>} matrix
   * @return {L.Point}
   */
  _transformPoints: function(matrix) {
    var matrix = this._matrix;
    var a = matrix[0];
    var c = matrix[1];
    var b = matrix[2];
    var d = matrix[3];
    var tx = matrix[4];
    var ty = matrix[5];

    var polygon = this._path;
    var latlngs = [];

    var x, y, point;
    var i, j, len, len2;

    // we transformed in pixel space, let's stay there
    for (i = 0, len = polygon._originalPoints.length; i < len; i++) {
      point = polygon._originalPoints[i];
      x = point.x;
      y = point.y;

      point.x = a * x + b * y + tx;
      point.y = c * x + d * y + ty;

      // update point
      polygon._originalPoints[i] = point;
      polygon._latlngs[i] = this._path._map.layerPointToLatLng(point);
    }

    // holes operations
    if (polygon._holes) {
      for (i = 0, len = polygon._holes.length; i < len; i++) {
        polygon._holes[i] = [];

        for (j = 0, len2 = this._holes[i].length; j < len2; j++) {
          point = polygon._holePoints[i][j];
          x = point.x;
          y = point.y;

          point.x = a * x + b * y + tx;
          point.y = c * x + d * y + ty;

          // update hole point
          polygon._holePoints[i][j] = point;
          polygon._holes[i][j] = this._path._map.layerPointToLatLng(point);
        }
      }
    }

    polygon._updatePath();
  }

});

(function() {
  var initEvents = L.Path.prototype._initEvents;

  L.Path.prototype._initEvents = function() {
    initEvents.call(this);

    if (this.options.draggable) {
      if (this.dragging) {
        this.dragging.enable();
      } else {
        this.dragging = new L.Path.Drag(this);
        this.dragging.enable();
      }
    } else if (this.dragging) {
      this.dragging.disable();
    }
  };

})();
