(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var L = global.L;
var DragHandler = require('../../index');

L.Icon.Default.imagePath = "leaflet-master/images";

////////////////////////////////////////////////////////////////////////////////
var map = global.map = new L.Map('map', {
  // crs: L.CRS.EPSG4326 // that was tested as well
}).setView([22.42658, 114.1952], 11);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; ' +
    '<a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

////////////////////////////////////////////////////////////////////////////////
function interpolateArr(array, insert) {
  var res = [];
  array.forEach(function(p, i, arr) {
    res.push(p.concat());

    if (i < arr.length - 1) {
      var diff = [arr[i + 1][0] - p[0], arr[i + 1][1] - p[1]];
      for (var i = 1; i < insert; i++) {
        res.push([p[0] + (diff[0] * i) / insert, p[1] + (diff[1] * i) / insert]);
      }
    }
  });

  return res;
}

////////////////////////////////////////////////////////////////////////////////
var polygon = global.polygon = new L.Polygon(
  L.GeoJSON.coordsToLatLngs(

    // ~ 13 000 points
    interpolateArr([
      [113.97697448730469, 22.403410892712124],
      [113.98658752441405, 22.38373008592495],
      [114.01268005371094, 22.369126397545887],
      [114.02778625488281, 22.38563480185718],
      [114.04701232910156, 22.395157990290755],
      [114.06005859375, 22.413567638369805],
      [114.06280517578125, 22.432609534876796],
      [114.04838562011717, 22.444668051657157],
      [114.04289245605469, 22.44847578656544],
      [114.03259277343749, 22.444668051657157],
      [114.01954650878906, 22.447206553211814],
      [113.99620056152344, 22.436417600763114],
      [113.98178100585938, 22.420549970290875],
      [113.97697448730469, 22.403410892712124]
    ], 1000)
  ), {
    color: '#f00',
    draggable: true
  }).addTo(map);

var polyline = global.polyline = new L.Polyline(
  L.GeoJSON.coordsToLatLngs([
    [114.14314270019531, 22.49479484975443],
    [114.1534423828125, 22.485912942320958],
    [114.15206909179688, 22.4732235144781],
    [114.14932250976561, 22.459898363943893],
    [114.15962219238281, 22.447206553211814],
    [114.169921875, 22.447206553211814],
    [114.19395446777344, 22.459898363943893],
    [114.20631408691406, 22.46116748110935],
    [114.21180725097655, 22.473858013487614],
    [114.22416687011719, 22.471320000009992],
    [114.23721313476562, 22.476395980457973],
    [114.24201965332031, 22.49352604073722],
    [114.2303466796875, 22.51572851830351],
    [114.21798706054688, 22.524608511026262],
    [114.20768737792969, 22.524608511026262],
    [114.20768737792969, 22.536024805886974]
  ]), {
    weight: 15,
    draggable: true
  }).addTo(map);

var polygonWithHole = global.polygonWithHole = new L.Polygon(
    [
      L.GeoJSON.coordsToLatLngs([
        [114.2749786376953, 22.412932863517717],
        [114.28390502929688, 22.40087159030595],
        [114.29008483886717, 22.38880927045556],
        [114.30107116699219, 22.382460260815716],
        [114.31892395019531, 22.391983666602783],
        [114.32304382324219, 22.380555501421533],
        [114.34295654296875, 22.372936203113838],
        [114.334716796875, 22.384364994133303],
        [114.33059692382812, 22.393888269511194],
        [114.32167053222655, 22.40087159030595],
        [114.32785034179688, 22.413567638369805],
        [114.33197021484375, 22.42499308964722],
        [114.32579040527344, 22.430705462748918],
        [114.33197021484375, 22.43959090917266],
        [114.33746337890624, 22.449110398886106],
        [114.33540344238281, 22.461802035333992],
        [114.32510375976562, 22.464340223177118],
        [114.32922363281249, 22.472589012561954],
        [114.32373046875, 22.477030464933307],
        [114.31961059570312, 22.478933900916928],
        [114.3017578125, 22.466243833549445],
        [114.30244445800781, 22.457360094750083],
        [114.29283142089844, 22.454821779075832],
        [114.28390502929688, 22.45101421842269],
        [114.2749786376953, 22.442764145001707],
        [114.29077148437499, 22.428166659279615],
        [114.27703857421875, 22.420549970290875],
        [114.2749786376953, 22.412932863517717]
      ]),
      L.GeoJSON.coordsToLatLngs([
        [114.30107116699219, 22.43387890178297],
        [114.29351806640625, 22.414202410321302],
        [114.30587768554686, 22.408489358342635],
        [114.32235717773438, 22.421184710331858],
        [114.30107116699219, 22.43387890178297]
      ])
    ], {
      draggable: true
    }
  )
  .addTo(map);

var circle = new L.Circle([22.360897240132373, 114.14520263671875], 4000, {
    draggable: true
  })
  .bindPopup("L.Circle")
  .addTo(map)

var circleMarker = new L.CircleMarker(map.getCenter(), {
    draggable: true
  })
  .bindPopup("L.CircleMarker")
  .addTo(map);

var multiPolygon = global.multiPolygon = new L.Polygon([
  L.GeoJSON.coordsToLatLngs([
    [114.20562744140625, 22.32085984100593],
    [114.21592712402344, 22.35261603551215],
    [114.26467895507812, 22.351345926606957],
    [114.2749786376953, 22.32403578584038],
    [114.29214477539062, 22.32721165838893],
    [114.3017578125, 22.311966810977616],
    [114.29420471191406, 22.291002427735325],
    [114.29351806640625, 22.272576585413475],
    [114.28390502929688, 22.26177410097435],
    [114.268798828125, 22.281472122783818],
    [114.2749786376953, 22.294814367780518],
    [114.26948547363281, 22.30243793590448],
    [114.27017211914062, 22.31514295816939],
    [114.2578125, 22.311966810977616],
    [114.24751281738281, 22.299896792751927],
    [114.24545288085938, 22.291002427735325],
    [114.22966003417969, 22.307520083522476],
    [114.22073364257812, 22.305614299837046],
    [114.20562744140625, 22.32085984100593]
  ]),
  L.GeoJSON.coordsToLatLngs([
    [114.31549072265625, 22.33927931468312],
    [114.32029724121094, 22.326576489662482],
    [114.32991027832031, 22.326576489662482],
    [114.33334350585938, 22.332292904091716],
    [114.32304382324219, 22.3424548401465],
    [114.31549072265625, 22.33927931468312]
  ]),
  L.GeoJSON.coordsToLatLngs([
    [114.27909851074219, 22.244615500323064],
    [114.28115844726562, 22.251606295132948],
    [114.28665161132812, 22.255419308858556],
    [114.29969787597656, 22.26113863474449],
    [114.2962646484375, 22.250970782750866],
    [114.29489135742188, 22.24080219246335],
    [114.29008483886717, 22.238895499613232],
    [114.27909851074219, 22.244615500323064]
  ])
], {
  draggable: true,
  color: '#092'
}).bindPopup('MultiPolygon').addTo(map);

var multiPolyline = global.multiPolyline = new L.Polyline([
  L.GeoJSON.coordsToLatLngs([
    [113.89869689941406, 22.399601921706953],
    [113.89801025390625, 22.422454181709707],
    [113.90350341796875, 22.43324421978117],
    [113.90968322753906, 22.449110398886106],
    [113.90693664550781, 22.478299425162852],
    [113.9234161376953, 22.488450688325408],
    [113.9337158203125, 22.483375149789623],
    [113.9447021484375, 22.492257220085193],
    [113.95225524902344, 22.51255695405145]
  ]),

  L.GeoJSON.coordsToLatLngs([
    [113.8677978515625, 22.39261853713738],
    [113.86917114257811, 22.42753195115699],
    [113.9234161376953, 22.462436586653148],
    [113.94813537597656, 22.473858013487614],
    [113.9783477783203, 22.49923558968306],
    [113.99688720703125, 22.51192263246886],
    [114.01336669921875, 22.501138720300254],
    [114.02503967285155, 22.508116641853675]
  ])
], {
  draggable: true,
  color: '#e90'
}).bindPopup('MultiPolyline').addTo(map);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../index":2}],2:[function(require,module,exports){
require('./src/Path.Transform');
require('./src/Path.Drag');
//require('./src/MultiPoly.Drag');

module.exports = L.Path.Drag;

},{"./src/Path.Drag":3,"./src/Path.Transform":4}],3:[function(require,module,exports){
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
L.Handler.PathDrag = L.Handler.extend( /** @lends  L.Path.Drag.prototype */ {

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
    L.DomUtil.addClass(this._path._path, 'leaflet-path-draggable');
  },

  /**
   * Disable dragging
   */
  removeHooks: function() {
    this._path.off('mousedown', this._onDragStart, this);
    L.DomUtil.removeClass(this._path._path, 'leaflet-path-draggable');
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
    this._startPoint = evt.containerPoint.clone();
    this._dragStartPoint = evt.containerPoint.clone();
    this._matrix = [1, 0, 0, 1, 0, 0];
    L.DomEvent.stop(evt.originalEvent);


    this._path._map
      .on('mousemove', this._onDrag, this);
    this._path
      .on('mousemove', this._onDrag, this)
      .on('mouseup', this._onDragEnd, this)
    this._path._map.dragging.disable();
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
    this._path._resetTransform();
    // apply matrix
    this._transformPoints(this._matrix);

    this._path._map
      .off('mousemove', this._onDrag, this);
    this._path
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
    this._path._map.dragging.enable();
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
  _transformPoints: function(matrix) {
    var path = this._path;
    var i, len, latlng;

    var px = L.point(matrix[4], matrix[5]);

    var crs = path._map.options.crs;
    var transformation = crs.transformation;
    var scale = crs.scale(path._map.getZoom());
    var projection = crs.projection;

    var diff = transformation.untransform(px, scale)
      .subtract(transformation.untransform(L.point(0, 0), scale));

    console.log(path);

    // console.time('transform');

    // all shifts are in-place
    if (path._point) { // L.Circle
      path._latlng = projection.unproject(
        projection.project(path._latlng)._add(diff));
      path._point._add(px);
    } else if (path._rings) { // everything else
      for (i = 0, len = path._rings.length; i < len; i++) {
        for (var j = 0, jj = path._rings[i].length; j < jj; j++) {
          latlng = path._latlngs[i][j];
          path._latlngs[i][j] = projection
            .unproject(projection.project(latlng)._add(diff));
          path._rings[i][j]._add(px);
        }
      }
    }

    // holes operations
    if (path._holes) {
      for (i = 0, len = path._holes.length; i < len; i++) {
        for (var j = 0, len2 = path._holes[i].length; j < len2; j++) {
          latlng = path._holes[i][j];
          path._holes[i][j] = projection
            .unproject(projection.project(latlng)._add(diff));
          path._holePoints[i][j]._add(px);
        }
      }
    }

    // console.timeEnd('transform');

    path._updatePath();
  }

});

L.Path.prototype.__onAdd = L.Path.prototype.onAdd;
L.Path.prototype.onAdd = function(map) {
  this.__onAdd.call(this, map);
  if (this.options.draggable) {
    if (this.dragging) {
      this.dragging.enable();
    } else {
      this.dragging = new L.Handler.PathDrag(this);
      this.dragging.enable();
    }
  } else if (this.dragging) {
    this.dragging.disable();
  }
};

// L.Path.prototype.__initEvents = L.Path.prototype._initEvents;
// L.Path.prototype._initEvents = function() {
//   this.__initEvents();

//   if (this.options.draggable) {
//     if (this.dragging) {
//       this.dragging.enable();
//     } else {
//       this.dragging = new L.Handler.PathDrag(this);
//       this.dragging.enable();
//     }
//   } else if (this.dragging) {
//     this.dragging.disable();
//   }
// };

},{}],4:[function(require,module,exports){
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
      this._path.setAttributeNS(null, 'transform', '');
    },

    /**
     * Applies matrix transformation to SVG
     * @param {Array.<Number>} matrix
     */
    _applyTransform: function(matrix) {
      this._path.setAttributeNS(null, "transform",
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
        this._path.removeChild(this._skew);
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
        this._path.appendChild(skew);
        skew.style.behavior = 'url(#default#VML)';
        this._skew = skew;
      }

      // handle skew/translate separately, cause it's broken
      var mt = matrix[0].toFixed(8) + " " + matrix[1].toFixed(8) + " " +
        matrix[2].toFixed(8) + " " + matrix[3].toFixed(8) + " 0 0";
      var offset = Math.floor(matrix[4]).toFixed() + ", " +
        Math.floor(matrix[5]).toFixed() + "";

      var s = this._path.style;
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

// Renderer-independent
L.Path.include({

  /**
   * Check if the feature was dragged, that'll supress the click event
   * on mouseup. That fixes popups for example
   *
   * @param  {MouseEvent} e
   */
  _onMouseClick: function(e) {
    if ((this.dragging && this.dragging.moved()) ||
      (this._map.dragging && this._map.dragging.moved())) {
      return;
    }

    this._fireMouseEvent(e);
  }
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL2pzL2FwcC5qcyIsImluZGV4LmpzIiwic3JjL1BhdGguRHJhZy5qcyIsInNyYy9QYXRoLlRyYW5zZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBMID0gZ2xvYmFsLkw7XG52YXIgRHJhZ0hhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9pbmRleCcpO1xuXG5MLkljb24uRGVmYXVsdC5pbWFnZVBhdGggPSBcImxlYWZsZXQtbWFzdGVyL2ltYWdlc1wiO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIG1hcCA9IGdsb2JhbC5tYXAgPSBuZXcgTC5NYXAoJ21hcCcsIHtcbiAgLy8gY3JzOiBMLkNSUy5FUFNHNDMyNiAvLyB0aGF0IHdhcyB0ZXN0ZWQgYXMgd2VsbFxufSkuc2V0VmlldyhbMjIuNDI2NTgsIDExNC4xOTUyXSwgMTEpO1xuXG5MLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICBhdHRyaWJ1dGlvbjogJyZjb3B5OyAnICtcbiAgICAnPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcbn0pLmFkZFRvKG1hcCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFycihhcnJheSwgaW5zZXJ0KSB7XG4gIHZhciByZXMgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihwLCBpLCBhcnIpIHtcbiAgICByZXMucHVzaChwLmNvbmNhdCgpKTtcblxuICAgIGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgIHZhciBkaWZmID0gW2FycltpICsgMV1bMF0gLSBwWzBdLCBhcnJbaSArIDFdWzFdIC0gcFsxXV07XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGluc2VydDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKFtwWzBdICsgKGRpZmZbMF0gKiBpKSAvIGluc2VydCwgcFsxXSArIChkaWZmWzFdICogaSkgLyBpbnNlcnRdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgcG9seWdvbiA9IGdsb2JhbC5wb2x5Z29uID0gbmV3IEwuUG9seWdvbihcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhcblxuICAgIC8vIH4gMTMgMDAwIHBvaW50c1xuICAgIGludGVycG9sYXRlQXJyKFtcbiAgICAgIFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF0sXG4gICAgICBbMTEzLjk4NjU4NzUyNDQxNDA1LCAyMi4zODM3MzAwODU5MjQ5NV0sXG4gICAgICBbMTE0LjAxMjY4MDA1MzcxMDk0LCAyMi4zNjkxMjYzOTc1NDU4ODddLFxuICAgICAgWzExNC4wMjc3ODYyNTQ4ODI4MSwgMjIuMzg1NjM0ODAxODU3MThdLFxuICAgICAgWzExNC4wNDcwMTIzMjkxMDE1NiwgMjIuMzk1MTU3OTkwMjkwNzU1XSxcbiAgICAgIFsxMTQuMDYwMDU4NTkzNzUsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICBbMTE0LjA2MjgwNTE3NTc4MTI1LCAyMi40MzI2MDk1MzQ4NzY3OTZdLFxuICAgICAgWzExNC4wNDgzODU2MjAxMTcxNywgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcbiAgICAgIFsxMTQuMDQyODkyNDU2MDU0NjksIDIyLjQ0ODQ3NTc4NjU2NTQ0XSxcbiAgICAgIFsxMTQuMDMyNTkyNzczNDM3NDksIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG4gICAgICBbMTE0LjAxOTU0NjUwODc4OTA2LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgICAgWzExMy45OTYyMDA1NjE1MjM0NCwgMjIuNDM2NDE3NjAwNzYzMTE0XSxcbiAgICAgIFsxMTMuOTgxNzgxMDA1ODU5MzgsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG4gICAgICBbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdXG4gICAgXSwgMTAwMClcbiAgKSwge1xuICAgIGNvbG9yOiAnI2YwMCcsXG4gICAgZHJhZ2dhYmxlOiB0cnVlXG4gIH0pLmFkZFRvKG1hcCk7XG5cbnZhciBwb2x5bGluZSA9IGdsb2JhbC5wb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjE0MzE0MjcwMDE5NTMxLCAyMi40OTQ3OTQ4NDk3NTQ0M10sXG4gICAgWzExNC4xNTM0NDIzODI4MTI1LCAyMi40ODU5MTI5NDIzMjA5NThdLFxuICAgIFsxMTQuMTUyMDY5MDkxNzk2ODgsIDIyLjQ3MzIyMzUxNDQ3ODFdLFxuICAgIFsxMTQuMTQ5MzIyNTA5NzY1NjEsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG4gICAgWzExNC4xNTk2MjIxOTIzODI4MSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICBbMTE0LjE2OTkyMTg3NSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICBbMTE0LjE5Mzk1NDQ2Nzc3MzQ0LCAyMi40NTk4OTgzNjM5NDM4OTNdLFxuICAgIFsxMTQuMjA2MzE0MDg2OTE0MDYsIDIyLjQ2MTE2NzQ4MTEwOTM1XSxcbiAgICBbMTE0LjIxMTgwNzI1MDk3NjU1LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuICAgIFsxMTQuMjI0MTY2ODcwMTE3MTksIDIyLjQ3MTMyMDAwMDAwOTk5Ml0sXG4gICAgWzExNC4yMzcyMTMxMzQ3NjU2MiwgMjIuNDc2Mzk1OTgwNDU3OTczXSxcbiAgICBbMTE0LjI0MjAxOTY1MzMyMDMxLCAyMi40OTM1MjYwNDA3MzcyMl0sXG4gICAgWzExNC4yMzAzNDY2Nzk2ODc1LCAyMi41MTU3Mjg1MTgzMDM1MV0sXG4gICAgWzExNC4yMTc5ODcwNjA1NDY4OCwgMjIuNTI0NjA4NTExMDI2MjYyXSxcbiAgICBbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuICAgIFsxMTQuMjA3Njg3Mzc3OTI5NjksIDIyLjUzNjAyNDgwNTg4Njk3NF1cbiAgXSksIHtcbiAgICB3ZWlnaHQ6IDE1LFxuICAgIGRyYWdnYWJsZTogdHJ1ZVxuICB9KS5hZGRUbyhtYXApO1xuXG52YXIgcG9seWdvbldpdGhIb2xlID0gZ2xvYmFsLnBvbHlnb25XaXRoSG9sZSA9IG5ldyBMLlBvbHlnb24oXG4gICAgW1xuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDEyOTMyODYzNTE3NzE3XSxcbiAgICAgICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDAwODcxNTkwMzA1OTVdLFxuICAgICAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4zODg4MDkyNzA0NTU1Nl0sXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjM4MjQ2MDI2MDgxNTcxNl0sXG4gICAgICAgIFsxMTQuMzE4OTIzOTUwMTk1MzEsIDIyLjM5MTk4MzY2NjYwMjc4M10sXG4gICAgICAgIFsxMTQuMzIzMDQzODIzMjQyMTksIDIyLjM4MDU1NTUwMTQyMTUzM10sXG4gICAgICAgIFsxMTQuMzQyOTU2NTQyOTY4NzUsIDIyLjM3MjkzNjIwMzExMzgzOF0sXG4gICAgICAgIFsxMTQuMzM0NzE2Nzk2ODc1LCAyMi4zODQzNjQ5OTQxMzMzMDNdLFxuICAgICAgICBbMTE0LjMzMDU5NjkyMzgyODEyLCAyMi4zOTM4ODgyNjk1MTExOTRdLFxuICAgICAgICBbMTE0LjMyMTY3MDUzMjIyNjU1LCAyMi40MDA4NzE1OTAzMDU5NV0sXG4gICAgICAgIFsxMTQuMzI3ODUwMzQxNzk2ODgsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICAgIFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQyNDk5MzA4OTY0NzIyXSxcbiAgICAgICAgWzExNC4zMjU3OTA0MDUyNzM0NCwgMjIuNDMwNzA1NDYyNzQ4OTE4XSxcbiAgICAgICAgWzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDM5NTkwOTA5MTcyNjZdLFxuICAgICAgICBbMTE0LjMzNzQ2MzM3ODkwNjI0LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgICAgICBbMTE0LjMzNTQwMzQ0MjM4MjgxLCAyMi40NjE4MDIwMzUzMzM5OTJdLFxuICAgICAgICBbMTE0LjMyNTEwMzc1OTc2NTYyLCAyMi40NjQzNDAyMjMxNzcxMThdLFxuICAgICAgICBbMTE0LjMyOTIyMzYzMjgxMjQ5LCAyMi40NzI1ODkwMTI1NjE5NTRdLFxuICAgICAgICBbMTE0LjMyMzczMDQ2ODc1LCAyMi40NzcwMzA0NjQ5MzMzMDddLFxuICAgICAgICBbMTE0LjMxOTYxMDU5NTcwMzEyLCAyMi40Nzg5MzM5MDA5MTY5MjhdLFxuICAgICAgICBbMTE0LjMwMTc1NzgxMjUsIDIyLjQ2NjI0MzgzMzU0OTQ0NV0sXG4gICAgICAgIFsxMTQuMzAyNDQ0NDU4MDA3ODEsIDIyLjQ1NzM2MDA5NDc1MDA4M10sXG4gICAgICAgIFsxMTQuMjkyODMxNDIwODk4NDQsIDIyLjQ1NDgyMTc3OTA3NTgzMl0sXG4gICAgICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQ1MTAxNDIxODQyMjY5XSxcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40NDI3NjQxNDUwMDE3MDddLFxuICAgICAgICBbMTE0LjI5MDc3MTQ4NDM3NDk5LCAyMi40MjgxNjY2NTkyNzk2MTVdLFxuICAgICAgICBbMTE0LjI3NzAzODU3NDIxODc1LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQxMjkzMjg2MzUxNzcxN11cbiAgICAgIF0pLFxuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XSxcbiAgICAgICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuNDE0MjAyNDEwMzIxMzAyXSxcbiAgICAgICAgWzExNC4zMDU4Nzc2ODU1NDY4NiwgMjIuNDA4NDg5MzU4MzQyNjM1XSxcbiAgICAgICAgWzExNC4zMjIzNTcxNzc3MzQzOCwgMjIuNDIxMTg0NzEwMzMxODU4XSxcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddXG4gICAgICBdKVxuICAgIF0sIHtcbiAgICAgIGRyYWdnYWJsZTogdHJ1ZVxuICAgIH1cbiAgKVxuICAuYWRkVG8obWFwKTtcblxudmFyIGNpcmNsZSA9IG5ldyBMLkNpcmNsZShbMjIuMzYwODk3MjQwMTMyMzczLCAxMTQuMTQ1MjAyNjM2NzE4NzVdLCA0MDAwLCB7XG4gICAgZHJhZ2dhYmxlOiB0cnVlXG4gIH0pXG4gIC5iaW5kUG9wdXAoXCJMLkNpcmNsZVwiKVxuICAuYWRkVG8obWFwKVxuXG52YXIgY2lyY2xlTWFya2VyID0gbmV3IEwuQ2lyY2xlTWFya2VyKG1hcC5nZXRDZW50ZXIoKSwge1xuICAgIGRyYWdnYWJsZTogdHJ1ZVxuICB9KVxuICAuYmluZFBvcHVwKFwiTC5DaXJjbGVNYXJrZXJcIilcbiAgLmFkZFRvKG1hcCk7XG5cbnZhciBtdWx0aVBvbHlnb24gPSBnbG9iYWwubXVsdGlQb2x5Z29uID0gbmV3IEwuUG9seWdvbihbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjA1NjI3NDQxNDA2MjUsIDIyLjMyMDg1OTg0MTAwNTkzXSxcbiAgICBbMTE0LjIxNTkyNzEyNDAyMzQ0LCAyMi4zNTI2MTYwMzU1MTIxNV0sXG4gICAgWzExNC4yNjQ2Nzg5NTUwNzgxMiwgMjIuMzUxMzQ1OTI2NjA2OTU3XSxcbiAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjMyNDAzNTc4NTg0MDM4XSxcbiAgICBbMTE0LjI5MjE0NDc3NTM5MDYyLCAyMi4zMjcyMTE2NTgzODg5M10sXG4gICAgWzExNC4zMDE3NTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjk0MjA0NzExOTE0MDYsIDIyLjI5MTAwMjQyNzczNTMyNV0sXG4gICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuMjcyNTc2NTg1NDEzNDc1XSxcbiAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi4yNjE3NzQxMDA5NzQzNV0sXG4gICAgWzExNC4yNjg3OTg4MjgxMjUsIDIyLjI4MTQ3MjEyMjc4MzgxOF0sXG4gICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi4yOTQ4MTQzNjc3ODA1MThdLFxuICAgIFsxMTQuMjY5NDg1NDczNjMyODEsIDIyLjMwMjQzNzkzNTkwNDQ4XSxcbiAgICBbMTE0LjI3MDE3MjExOTE0MDYyLCAyMi4zMTUxNDI5NTgxNjkzOV0sXG4gICAgWzExNC4yNTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjQ3NTEyODE3MzgyODEsIDIyLjI5OTg5Njc5Mjc1MTkyN10sXG4gICAgWzExNC4yNDU0NTI4ODA4NTkzOCwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjIyOTY2MDAzNDE3OTY5LCAyMi4zMDc1MjAwODM1MjI0NzZdLFxuICAgIFsxMTQuMjIwNzMzNjQyNTc4MTIsIDIyLjMwNTYxNDI5OTgzNzA0Nl0sXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl0sXG4gICAgWzExNC4zMjAyOTcyNDEyMTA5NCwgMjIuMzI2NTc2NDg5NjYyNDgyXSxcbiAgICBbMTE0LjMyOTkxMDI3ODMyMDMxLCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzMzMzQzNTA1ODU5MzgsIDIyLjMzMjI5MjkwNDA5MTcxNl0sXG4gICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzQyNDU0ODQwMTQ2NV0sXG4gICAgWzExNC4zMTU0OTA3MjI2NTYyNSwgMjIuMzM5Mjc5MzE0NjgzMTJdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdLFxuICAgIFsxMTQuMjgxMTU4NDQ3MjY1NjIsIDIyLjI1MTYwNjI5NTEzMjk0OF0sXG4gICAgWzExNC4yODY2NTE2MTEzMjgxMiwgMjIuMjU1NDE5MzA4ODU4NTU2XSxcbiAgICBbMTE0LjI5OTY5Nzg3NTk3NjU2LCAyMi4yNjExMzg2MzQ3NDQ0OV0sXG4gICAgWzExNC4yOTYyNjQ2NDg0Mzc1LCAyMi4yNTA5NzA3ODI3NTA4NjZdLFxuICAgIFsxMTQuMjk0ODkxMzU3NDIxODgsIDIyLjI0MDgwMjE5MjQ2MzM1XSxcbiAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4yMzg4OTU0OTk2MTMyMzJdLFxuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF1cbiAgXSlcbl0sIHtcbiAgZHJhZ2dhYmxlOiB0cnVlLFxuICBjb2xvcjogJyMwOTInXG59KS5iaW5kUG9wdXAoJ011bHRpUG9seWdvbicpLmFkZFRvKG1hcCk7XG5cbnZhciBtdWx0aVBvbHlsaW5lID0gZ2xvYmFsLm11bHRpUG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODk4Njk2ODk5NDE0MDYsIDIyLjM5OTYwMTkyMTcwNjk1M10sXG4gICAgWzExMy44OTgwMTAyNTM5MDYyNSwgMjIuNDIyNDU0MTgxNzA5NzA3XSxcbiAgICBbMTEzLjkwMzUwMzQxNzk2ODc1LCAyMi40MzMyNDQyMTk3ODExN10sXG4gICAgWzExMy45MDk2ODMyMjc1MzkwNiwgMjIuNDQ5MTEwMzk4ODg2MTA2XSxcbiAgICBbMTEzLjkwNjkzNjY0NTUwNzgxLCAyMi40NzgyOTk0MjUxNjI4NTJdLFxuICAgIFsxMTMuOTIzNDE2MTM3Njk1MywgMjIuNDg4NDUwNjg4MzI1NDA4XSxcbiAgICBbMTEzLjkzMzcxNTgyMDMxMjUsIDIyLjQ4MzM3NTE0OTc4OTYyM10sXG4gICAgWzExMy45NDQ3MDIxNDg0Mzc1LCAyMi40OTIyNTcyMjAwODUxOTNdLFxuICAgIFsxMTMuOTUyMjU1MjQ5MDIzNDQsIDIyLjUxMjU1Njk1NDA1MTQ1XVxuICBdKSxcblxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTEzLjg2Nzc5Nzg1MTU2MjUsIDIyLjM5MjYxODUzNzEzNzM4XSxcbiAgICBbMTEzLjg2OTE3MTE0MjU3ODExLCAyMi40Mjc1MzE5NTExNTY5OV0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAyMi40NjI0MzY1ODY2NTMxNDhdLFxuICAgIFsxMTMuOTQ4MTM1Mzc1OTc2NTYsIDIyLjQ3Mzg1ODAxMzQ4NzYxNF0sXG4gICAgWzExMy45NzgzNDc3NzgzMjAzLCAyMi40OTkyMzU1ODk2ODMwNl0sXG4gICAgWzExMy45OTY4ODcyMDcwMzEyNSwgMjIuNTExOTIyNjMyNDY4ODZdLFxuICAgIFsxMTQuMDEzMzY2Njk5MjE4NzUsIDIyLjUwMTEzODcyMDMwMDI1NF0sXG4gICAgWzExNC4wMjUwMzk2NzI4NTE1NSwgMjIuNTA4MTE2NjQxODUzNjc1XVxuICBdKVxuXSwge1xuICBkcmFnZ2FibGU6IHRydWUsXG4gIGNvbG9yOiAnI2U5MCdcbn0pLmJpbmRQb3B1cCgnTXVsdGlQb2x5bGluZScpLmFkZFRvKG1hcCk7XG4iLCJyZXF1aXJlKCcuL3NyYy9QYXRoLlRyYW5zZm9ybScpO1xucmVxdWlyZSgnLi9zcmMvUGF0aC5EcmFnJyk7XG4vL3JlcXVpcmUoJy4vc3JjL011bHRpUG9seS5EcmFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTC5QYXRoLkRyYWc7XG4iLCIvKipcbiAqIExlYWZsZXQgdmVjdG9yIGZlYXR1cmVzIGRyYWcgZnVuY3Rpb25hbGl0eVxuICogQHByZXNlcnZlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogRHJhZyBoYW5kbGVyXG4gKiBAY2xhc3MgTC5QYXRoLkRyYWdcbiAqIEBleHRlbmRzIHtMLkhhbmRsZXJ9XG4gKi9cbkwuSGFuZGxlci5QYXRoRHJhZyA9IEwuSGFuZGxlci5leHRlbmQoIC8qKiBAbGVuZHMgIEwuUGF0aC5EcmFnLnByb3RvdHlwZSAqLyB7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge0wuUGF0aH0gcGF0aFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKHBhdGgpIHtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtMLlBhdGh9XG4gICAgICovXG4gICAgdGhpcy5fcGF0aCA9IHBhdGg7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPE51bWJlcj59XG4gICAgICovXG4gICAgdGhpcy5fbWF0cml4ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtMLlBvaW50fVxuICAgICAqL1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUG9pbnR9XG4gICAgICovXG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBudWxsO1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIEVuYWJsZSBkcmFnZ2luZ1xuICAgKi9cbiAgYWRkSG9va3M6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKTtcbiAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fcGF0aC5fcGF0aCwgJ2xlYWZsZXQtcGF0aC1kcmFnZ2FibGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogRGlzYWJsZSBkcmFnZ2luZ1xuICAgKi9cbiAgcmVtb3ZlSG9va3M6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3BhdGgub2ZmKCdtb3VzZWRvd24nLCB0aGlzLl9vbkRyYWdTdGFydCwgdGhpcyk7XG4gICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3BhdGguX3BhdGgsICdsZWFmbGV0LXBhdGgtZHJhZ2dhYmxlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBtb3ZlZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhdGguX2RyYWdNb3ZlZDtcbiAgfSxcblxuICAvKipcbiAgICogU3RhcnQgZHJhZ1xuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZ1N0YXJ0OiBmdW5jdGlvbihldnQpIHtcbiAgICB0aGlzLl9zdGFydFBvaW50ID0gZXZ0LmNvbnRhaW5lclBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBldnQuY29udGFpbmVyUG9pbnQuY2xvbmUoKTtcbiAgICB0aGlzLl9tYXRyaXggPSBbMSwgMCwgMCwgMSwgMCwgMF07XG4gICAgTC5Eb21FdmVudC5zdG9wKGV2dC5vcmlnaW5hbEV2ZW50KTtcblxuXG4gICAgdGhpcy5fcGF0aC5fbWFwXG4gICAgICAub24oJ21vdXNlbW92ZScsIHRoaXMuX29uRHJhZywgdGhpcyk7XG4gICAgdGhpcy5fcGF0aFxuICAgICAgLm9uKCdtb3VzZW1vdmUnLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgICAub24oJ21vdXNldXAnLCB0aGlzLl9vbkRyYWdFbmQsIHRoaXMpXG4gICAgdGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgICB0aGlzLl9wYXRoLl9kcmFnTW92ZWQgPSBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRHJhZ2dpbmdcbiAgICogQHBhcmFtICB7TC5Nb3VzZUV2ZW50fSBldnRcbiAgICovXG4gIF9vbkRyYWc6IGZ1bmN0aW9uKGV2dCkge1xuICAgIHZhciB4ID0gZXZ0LmNvbnRhaW5lclBvaW50Lng7XG4gICAgdmFyIHkgPSBldnQuY29udGFpbmVyUG9pbnQueTtcblxuICAgIHZhciBkeCA9IHggLSB0aGlzLl9zdGFydFBvaW50Lng7XG4gICAgdmFyIGR5ID0geSAtIHRoaXMuX3N0YXJ0UG9pbnQueTtcblxuICAgIGlmICghdGhpcy5fcGF0aC5fZHJhZ01vdmVkICYmIChkeCB8fCBkeSkpIHtcbiAgICAgIHRoaXMuX3BhdGguX2RyYWdNb3ZlZCA9IHRydWU7XG4gICAgICB0aGlzLl9wYXRoLmZpcmUoJ2RyYWdzdGFydCcpO1xuICAgIH1cblxuICAgIHRoaXMuX21hdHJpeFs0XSArPSBkeDtcbiAgICB0aGlzLl9tYXRyaXhbNV0gKz0gZHk7XG5cbiAgICB0aGlzLl9zdGFydFBvaW50LnggPSB4O1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQueSA9IHk7XG5cbiAgICB0aGlzLl9wYXRoLl9hcHBseVRyYW5zZm9ybSh0aGlzLl9tYXRyaXgpO1xuICAgIHRoaXMuX3BhdGguZmlyZSgnZHJhZycpO1xuICAgIEwuRG9tRXZlbnQuc3RvcChldnQub3JpZ2luYWxFdmVudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERyYWdnaW5nIHN0b3BwZWQsIGFwcGx5XG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnRW5kOiBmdW5jdGlvbihldnQpIHtcbiAgICB0aGlzLl9wYXRoLl9yZXNldFRyYW5zZm9ybSgpO1xuICAgIC8vIGFwcGx5IG1hdHJpeFxuICAgIHRoaXMuX3RyYW5zZm9ybVBvaW50cyh0aGlzLl9tYXRyaXgpO1xuXG4gICAgdGhpcy5fcGF0aC5fbWFwXG4gICAgICAub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9vbkRyYWcsIHRoaXMpO1xuICAgIHRoaXMuX3BhdGhcbiAgICAgIC5vZmYoJ21vdXNlbW92ZScsIHRoaXMuX29uRHJhZywgdGhpcylcbiAgICAgIC5vZmYoJ21vdXNldXAnLCB0aGlzLl9vbkRyYWdFbmQsIHRoaXMpO1xuXG4gICAgLy8gY29uc2lzdGVuY3lcbiAgICB0aGlzLl9wYXRoLmZpcmUoJ2RyYWdlbmQnLCB7XG4gICAgICBkaXN0YW5jZTogTWF0aC5zcXJ0KFxuICAgICAgICBMLkxpbmVVdGlsLl9zcURpc3QodGhpcy5fZHJhZ1N0YXJ0UG9pbnQsIGV2dC5jb250YWluZXJQb2ludClcbiAgICAgIClcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdHJpeCA9IG51bGw7XG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IG51bGw7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBudWxsO1xuICAgIHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5lbmFibGUoKTtcbiAgfSxcblxuICAvKipcbiAgICogQXBwbGllcyB0cmFuc2Zvcm1hdGlvbiwgZG9lcyBpdCBpbiBvbmUgc3dlZXAgZm9yIHBlcmZvcm1hbmNlLFxuICAgKiBzbyBkb24ndCBiZSBzdXJwcmlzZWQgYWJvdXQgdGhlIGNvZGUgcmVwZXRpdGlvbi5cbiAgICpcbiAgICogWyB4IF0gICBbIGEgIGIgIHR4IF0gWyB4IF0gICBbIGEgKiB4ICsgYiAqIHkgKyB0eCBdXG4gICAqIFsgeSBdID0gWyBjICBkICB0eSBdIFsgeSBdID0gWyBjICogeCArIGQgKiB5ICsgdHkgXVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcbiAgICovXG4gIF90cmFuc2Zvcm1Qb2ludHM6IGZ1bmN0aW9uKG1hdHJpeCkge1xuICAgIHZhciBwYXRoID0gdGhpcy5fcGF0aDtcbiAgICB2YXIgaSwgbGVuLCBsYXRsbmc7XG5cbiAgICB2YXIgcHggPSBMLnBvaW50KG1hdHJpeFs0XSwgbWF0cml4WzVdKTtcblxuICAgIHZhciBjcnMgPSBwYXRoLl9tYXAub3B0aW9ucy5jcnM7XG4gICAgdmFyIHRyYW5zZm9ybWF0aW9uID0gY3JzLnRyYW5zZm9ybWF0aW9uO1xuICAgIHZhciBzY2FsZSA9IGNycy5zY2FsZShwYXRoLl9tYXAuZ2V0Wm9vbSgpKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IGNycy5wcm9qZWN0aW9uO1xuXG4gICAgdmFyIGRpZmYgPSB0cmFuc2Zvcm1hdGlvbi51bnRyYW5zZm9ybShweCwgc2NhbGUpXG4gICAgICAuc3VidHJhY3QodHJhbnNmb3JtYXRpb24udW50cmFuc2Zvcm0oTC5wb2ludCgwLCAwKSwgc2NhbGUpKTtcblxuICAgIGNvbnNvbGUubG9nKHBhdGgpO1xuXG4gICAgLy8gY29uc29sZS50aW1lKCd0cmFuc2Zvcm0nKTtcblxuICAgIC8vIGFsbCBzaGlmdHMgYXJlIGluLXBsYWNlXG4gICAgaWYgKHBhdGguX3BvaW50KSB7IC8vIEwuQ2lyY2xlXG4gICAgICBwYXRoLl9sYXRsbmcgPSBwcm9qZWN0aW9uLnVucHJvamVjdChcbiAgICAgICAgcHJvamVjdGlvbi5wcm9qZWN0KHBhdGguX2xhdGxuZykuX2FkZChkaWZmKSk7XG4gICAgICBwYXRoLl9wb2ludC5fYWRkKHB4KTtcbiAgICB9IGVsc2UgaWYgKHBhdGguX3JpbmdzKSB7IC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgZm9yIChpID0gMCwgbGVuID0gcGF0aC5fcmluZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpqID0gcGF0aC5fcmluZ3NbaV0ubGVuZ3RoOyBqIDwgamo7IGorKykge1xuICAgICAgICAgIGxhdGxuZyA9IHBhdGguX2xhdGxuZ3NbaV1bal07XG4gICAgICAgICAgcGF0aC5fbGF0bG5nc1tpXVtqXSA9IHByb2plY3Rpb25cbiAgICAgICAgICAgIC51bnByb2plY3QocHJvamVjdGlvbi5wcm9qZWN0KGxhdGxuZykuX2FkZChkaWZmKSk7XG4gICAgICAgICAgcGF0aC5fcmluZ3NbaV1bal0uX2FkZChweCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBob2xlcyBvcGVyYXRpb25zXG4gICAgaWYgKHBhdGguX2hvbGVzKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBwYXRoLl9ob2xlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgbGVuMiA9IHBhdGguX2hvbGVzW2ldLmxlbmd0aDsgaiA8IGxlbjI7IGorKykge1xuICAgICAgICAgIGxhdGxuZyA9IHBhdGguX2hvbGVzW2ldW2pdO1xuICAgICAgICAgIHBhdGguX2hvbGVzW2ldW2pdID0gcHJvamVjdGlvblxuICAgICAgICAgICAgLnVucHJvamVjdChwcm9qZWN0aW9uLnByb2plY3QobGF0bG5nKS5fYWRkKGRpZmYpKTtcbiAgICAgICAgICBwYXRoLl9ob2xlUG9pbnRzW2ldW2pdLl9hZGQocHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS50aW1lRW5kKCd0cmFuc2Zvcm0nKTtcblxuICAgIHBhdGguX3VwZGF0ZVBhdGgoKTtcbiAgfVxuXG59KTtcblxuTC5QYXRoLnByb3RvdHlwZS5fX29uQWRkID0gTC5QYXRoLnByb3RvdHlwZS5vbkFkZDtcbkwuUGF0aC5wcm90b3R5cGUub25BZGQgPSBmdW5jdGlvbihtYXApIHtcbiAgdGhpcy5fX29uQWRkLmNhbGwodGhpcywgbWFwKTtcbiAgaWYgKHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpIHtcbiAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kcmFnZ2luZyA9IG5ldyBMLkhhbmRsZXIuUGF0aERyYWcodGhpcyk7XG4gICAgICB0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgdGhpcy5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gIH1cbn07XG5cbi8vIEwuUGF0aC5wcm90b3R5cGUuX19pbml0RXZlbnRzID0gTC5QYXRoLnByb3RvdHlwZS5faW5pdEV2ZW50cztcbi8vIEwuUGF0aC5wcm90b3R5cGUuX2luaXRFdmVudHMgPSBmdW5jdGlvbigpIHtcbi8vICAgdGhpcy5fX2luaXRFdmVudHMoKTtcblxuLy8gICBpZiAodGhpcy5vcHRpb25zLmRyYWdnYWJsZSkge1xuLy8gICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4vLyAgICAgICB0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICB0aGlzLmRyYWdnaW5nID0gbmV3IEwuSGFuZGxlci5QYXRoRHJhZyh0aGlzKTtcbi8vICAgICAgIHRoaXMuZHJhZ2dpbmcuZW5hYmxlKCk7XG4vLyAgICAgfVxuLy8gICB9IGVsc2UgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbi8vICAgICB0aGlzLmRyYWdnaW5nLmRpc2FibGUoKTtcbi8vICAgfVxuLy8gfTtcbiIsIi8qKlxuICogTWF0cml4IHRyYW5zZm9ybSBwYXRoIGZvciBTVkcvVk1MXG4gKiBUT0RPOiBhZGFwdCB0byBMZWFmbGV0IDAuOCB1cG9uIHJlbGVhc2VcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaWYgKEwuQnJvd3Nlci5zdmcpIHsgLy8gU1ZHIHRyYW5zZm9ybWF0aW9uXG5cbiAgTC5QYXRoLmluY2x1ZGUoe1xuXG4gICAgLyoqXG4gICAgICogUmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuICAgICAqL1xuICAgIF9yZXNldFRyYW5zZm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLl9wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgbWF0cml4IHRyYW5zZm9ybWF0aW9uIHRvIFNWR1xuICAgICAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuICAgICAqL1xuICAgIF9hcHBseVRyYW5zZm9ybTogZnVuY3Rpb24obWF0cml4KSB7XG4gICAgICB0aGlzLl9wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidHJhbnNmb3JtXCIsXG4gICAgICAgICdtYXRyaXgoJyArIG1hdHJpeC5qb2luKCcgJykgKyAnKScpO1xuICAgIH1cblxuICB9KTtcblxufSBlbHNlIHsgLy8gVk1MIHRyYW5zZm9ybSByb3V0aW5lc1xuXG4gIEwuUGF0aC5pbmNsdWRlKHtcblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRyYW5zZm9ybSBtYXRyaXhcbiAgICAgKi9cbiAgICBfcmVzZXRUcmFuc2Zvcm06IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuX3NrZXcpIHtcbiAgICAgICAgLy8gc3VwZXIgaW1wb3J0YW50ISB3b3JrYXJvdW5kIGZvciBhICdqdW1waW5nJyBnbGl0Y2g6XG4gICAgICAgIC8vIGRpc2FibGUgdHJhbnNmb3JtIGJlZm9yZSByZW1vdmluZyBpdFxuICAgICAgICB0aGlzLl9za2V3Lm9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhdGgucmVtb3ZlQ2hpbGQodGhpcy5fc2tldyk7XG4gICAgICAgIHRoaXMuX3NrZXcgPSBudWxsO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBWTUxcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcbiAgICAgKi9cbiAgICBfYXBwbHlUcmFuc2Zvcm06IGZ1bmN0aW9uKG1hdHJpeCkge1xuICAgICAgdmFyIHNrZXcgPSB0aGlzLl9za2V3O1xuXG4gICAgICBpZiAoIXNrZXcpIHtcbiAgICAgICAgc2tldyA9IHRoaXMuX2NyZWF0ZUVsZW1lbnQoJ3NrZXcnKTtcbiAgICAgICAgdGhpcy5fcGF0aC5hcHBlbmRDaGlsZChza2V3KTtcbiAgICAgICAgc2tldy5zdHlsZS5iZWhhdmlvciA9ICd1cmwoI2RlZmF1bHQjVk1MKSc7XG4gICAgICAgIHRoaXMuX3NrZXcgPSBza2V3O1xuICAgICAgfVxuXG4gICAgICAvLyBoYW5kbGUgc2tldy90cmFuc2xhdGUgc2VwYXJhdGVseSwgY2F1c2UgaXQncyBicm9rZW5cbiAgICAgIHZhciBtdCA9IG1hdHJpeFswXS50b0ZpeGVkKDgpICsgXCIgXCIgKyBtYXRyaXhbMV0udG9GaXhlZCg4KSArIFwiIFwiICtcbiAgICAgICAgbWF0cml4WzJdLnRvRml4ZWQoOCkgKyBcIiBcIiArIG1hdHJpeFszXS50b0ZpeGVkKDgpICsgXCIgMCAwXCI7XG4gICAgICB2YXIgb2Zmc2V0ID0gTWF0aC5mbG9vcihtYXRyaXhbNF0pLnRvRml4ZWQoKSArIFwiLCBcIiArXG4gICAgICAgIE1hdGguZmxvb3IobWF0cml4WzVdKS50b0ZpeGVkKCkgKyBcIlwiO1xuXG4gICAgICB2YXIgcyA9IHRoaXMuX3BhdGguc3R5bGU7XG4gICAgICB2YXIgbCA9IHBhcnNlRmxvYXQocy5sZWZ0KTtcbiAgICAgIHZhciB0ID0gcGFyc2VGbG9hdChzLnRvcCk7XG4gICAgICB2YXIgdyA9IHBhcnNlRmxvYXQocy53aWR0aCk7XG4gICAgICB2YXIgaCA9IHBhcnNlRmxvYXQocy5oZWlnaHQpO1xuXG4gICAgICBpZiAoaXNOYU4obCkpIGwgPSAwO1xuICAgICAgaWYgKGlzTmFOKHQpKSB0ID0gMDtcbiAgICAgIGlmIChpc05hTih3KSB8fCAhdykgdyA9IDE7XG4gICAgICBpZiAoaXNOYU4oaCkgfHwgIWgpIGggPSAxO1xuXG4gICAgICB2YXIgb3JpZ2luID0gKC1sIC8gdyAtIDAuNSkudG9GaXhlZCg4KSArIFwiIFwiICsgKC10IC8gaCAtIDAuNSkudG9GaXhlZCg4KTtcblxuICAgICAgc2tldy5vbiA9IFwiZlwiO1xuICAgICAgc2tldy5tYXRyaXggPSBtdDtcbiAgICAgIHNrZXcub3JpZ2luID0gb3JpZ2luO1xuICAgICAgc2tldy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICBza2V3Lm9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgfSk7XG59XG5cbi8vIFJlbmRlcmVyLWluZGVwZW5kZW50XG5MLlBhdGguaW5jbHVkZSh7XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBmZWF0dXJlIHdhcyBkcmFnZ2VkLCB0aGF0J2xsIHN1cHJlc3MgdGhlIGNsaWNrIGV2ZW50XG4gICAqIG9uIG1vdXNldXAuIFRoYXQgZml4ZXMgcG9wdXBzIGZvciBleGFtcGxlXG4gICAqXG4gICAqIEBwYXJhbSAge01vdXNlRXZlbnR9IGVcbiAgICovXG4gIF9vbk1vdXNlQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoKHRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5kcmFnZ2luZy5tb3ZlZCgpKSB8fFxuICAgICAgKHRoaXMuX21hcC5kcmFnZ2luZyAmJiB0aGlzLl9tYXAuZHJhZ2dpbmcubW92ZWQoKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9maXJlTW91c2VFdmVudChlKTtcbiAgfVxufSk7XG4iXX0=
