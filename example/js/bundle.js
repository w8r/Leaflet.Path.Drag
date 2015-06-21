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
    console.log('md', evt);
    this._startPoint = evt.containerPoint.clone();
    this._dragStartPoint = evt.containerPoint.clone();
    this._matrix = [1, 0, 0, 1, 0, 0];
    console.log(evt)
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
    //console.log('mm', evt);
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
    console.log('de', evt)
      //L.DomEvent.stop(evt.originalEvent);
      // undo container transform
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
    //this._path._map.dragging.enable();
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

    console.log(path)

    // console.time('transform');

    // all shifts are in-place
    if (path._point) { // L.Circle
      path._latlng = projection.unproject(
        projection.project(path._latlng)._add(diff));
      path._point._add(px);
    } else if (path._originalPoints) { // everything else
      for (i = 0, len = path._originalPoints.length; i < len; i++) {
        latlng = path._latlngs[i];
        path._latlngs[i] = projection
          .unproject(projection.project(latlng)._add(diff));
        path._originalPoints[i]._add(px);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJleGFtcGxlL2pzL2FwcC5qcyIsImluZGV4LmpzIiwic3JjL1BhdGguRHJhZy5qcyIsInNyYy9QYXRoLlRyYW5zZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEwgPSBnbG9iYWwuTDtcbnZhciBEcmFnSGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7XG5cbkwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCA9IFwibGVhZmxldC1tYXN0ZXIvaW1hZ2VzXCI7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbWFwID0gZ2xvYmFsLm1hcCA9IG5ldyBMLk1hcCgnbWFwJywge1xuICAvLyBjcnM6IEwuQ1JTLkVQU0c0MzI2IC8vIHRoYXQgd2FzIHRlc3RlZCBhcyB3ZWxsXG59KS5zZXRWaWV3KFsyMi40MjY1OCwgMTE0LjE5NTJdLCAxMSk7XG5cbkwudGlsZUxheWVyKCdodHRwOi8ve3N9LnRpbGUub3NtLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XG4gIGF0dHJpYnV0aW9uOiAnJmNvcHk7ICcgK1xuICAgICc8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xufSkuYWRkVG8obWFwKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIGludGVycG9sYXRlQXJyKGFycmF5LCBpbnNlcnQpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHAsIGksIGFycikge1xuICAgIHJlcy5wdXNoKHAuY29uY2F0KCkpO1xuXG4gICAgaWYgKGkgPCBhcnIubGVuZ3RoIC0gMSkge1xuICAgICAgdmFyIGRpZmYgPSBbYXJyW2kgKyAxXVswXSAtIHBbMF0sIGFycltpICsgMV1bMV0gLSBwWzFdXTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaW5zZXJ0OyBpKyspIHtcbiAgICAgICAgcmVzLnB1c2goW3BbMF0gKyAoZGlmZlswXSAqIGkpIC8gaW5zZXJ0LCBwWzFdICsgKGRpZmZbMV0gKiBpKSAvIGluc2VydF0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBwb2x5Z29uID0gZ2xvYmFsLnBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFxuXG4gICAgLy8gfiAxMyAwMDAgcG9pbnRzXG4gICAgaW50ZXJwb2xhdGVBcnIoW1xuICAgICAgWzExMy45NzY5NzQ0ODczMDQ2OSwgMjIuNDAzNDEwODkyNzEyMTI0XSxcbiAgICAgIFsxMTMuOTg2NTg3NTI0NDE0MDUsIDIyLjM4MzczMDA4NTkyNDk1XSxcbiAgICAgIFsxMTQuMDEyNjgwMDUzNzEwOTQsIDIyLjM2OTEyNjM5NzU0NTg4N10sXG4gICAgICBbMTE0LjAyNzc4NjI1NDg4MjgxLCAyMi4zODU2MzQ4MDE4NTcxOF0sXG4gICAgICBbMTE0LjA0NzAxMjMyOTEwMTU2LCAyMi4zOTUxNTc5OTAyOTA3NTVdLFxuICAgICAgWzExNC4wNjAwNTg1OTM3NSwgMjIuNDEzNTY3NjM4MzY5ODA1XSxcbiAgICAgIFsxMTQuMDYyODA1MTc1NzgxMjUsIDIyLjQzMjYwOTUzNDg3Njc5Nl0sXG4gICAgICBbMTE0LjA0ODM4NTYyMDExNzE3LCAyMi40NDQ2NjgwNTE2NTcxNTddLFxuICAgICAgWzExNC4wNDI4OTI0NTYwNTQ2OSwgMjIuNDQ4NDc1Nzg2NTY1NDRdLFxuICAgICAgWzExNC4wMzI1OTI3NzM0Mzc0OSwgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcbiAgICAgIFsxMTQuMDE5NTQ2NTA4Nzg5MDYsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgICBbMTEzLjk5NjIwMDU2MTUyMzQ0LCAyMi40MzY0MTc2MDA3NjMxMTRdLFxuICAgICAgWzExMy45ODE3ODEwMDU4NTkzOCwgMjIuNDIwNTQ5OTcwMjkwODc1XSxcbiAgICAgIFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF1cbiAgICBdLCAxMDAwKVxuICApLCB7XG4gICAgY29sb3I6ICcjZjAwJyxcbiAgICBkcmFnZ2FibGU6IHRydWVcbiAgfSkuYWRkVG8obWFwKTtcblxudmFyIHBvbHlsaW5lID0gZ2xvYmFsLnBvbHlsaW5lID0gbmV3IEwuUG9seWxpbmUoXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMTQzMTQyNzAwMTk1MzEsIDIyLjQ5NDc5NDg0OTc1NDQzXSxcbiAgICBbMTE0LjE1MzQ0MjM4MjgxMjUsIDIyLjQ4NTkxMjk0MjMyMDk1OF0sXG4gICAgWzExNC4xNTIwNjkwOTE3OTY4OCwgMjIuNDczMjIzNTE0NDc4MV0sXG4gICAgWzExNC4xNDkzMjI1MDk3NjU2MSwgMjIuNDU5ODk4MzYzOTQzODkzXSxcbiAgICBbMTE0LjE1OTYyMjE5MjM4MjgxLCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgIFsxMTQuMTY5OTIxODc1LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgIFsxMTQuMTkzOTU0NDY3NzczNDQsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG4gICAgWzExNC4yMDYzMTQwODY5MTQwNiwgMjIuNDYxMTY3NDgxMTA5MzVdLFxuICAgIFsxMTQuMjExODA3MjUwOTc2NTUsIDIyLjQ3Mzg1ODAxMzQ4NzYxNF0sXG4gICAgWzExNC4yMjQxNjY4NzAxMTcxOSwgMjIuNDcxMzIwMDAwMDA5OTkyXSxcbiAgICBbMTE0LjIzNzIxMzEzNDc2NTYyLCAyMi40NzYzOTU5ODA0NTc5NzNdLFxuICAgIFsxMTQuMjQyMDE5NjUzMzIwMzEsIDIyLjQ5MzUyNjA0MDczNzIyXSxcbiAgICBbMTE0LjIzMDM0NjY3OTY4NzUsIDIyLjUxNTcyODUxODMwMzUxXSxcbiAgICBbMTE0LjIxNzk4NzA2MDU0Njg4LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuICAgIFsxMTQuMjA3Njg3Mzc3OTI5NjksIDIyLjUyNDYwODUxMTAyNjI2Ml0sXG4gICAgWzExNC4yMDc2ODczNzc5Mjk2OSwgMjIuNTM2MDI0ODA1ODg2OTc0XVxuICBdKSwge1xuICAgIHdlaWdodDogMTUsXG4gICAgZHJhZ2dhYmxlOiB0cnVlXG4gIH0pLmFkZFRvKG1hcCk7XG5cbnZhciBwb2x5Z29uV2l0aEhvbGUgPSBnbG9iYWwucG9seWdvbldpdGhIb2xlID0gbmV3IEwuUG9seWdvbihcbiAgICBbXG4gICAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40MTI5MzI4NjM1MTc3MTddLFxuICAgICAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi40MDA4NzE1OTAzMDU5NV0sXG4gICAgICAgIFsxMTQuMjkwMDg0ODM4ODY3MTcsIDIyLjM4ODgwOTI3MDQ1NTU2XSxcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuMzgyNDYwMjYwODE1NzE2XSxcbiAgICAgICAgWzExNC4zMTg5MjM5NTAxOTUzMSwgMjIuMzkxOTgzNjY2NjAyNzgzXSxcbiAgICAgICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzgwNTU1NTAxNDIxNTMzXSxcbiAgICAgICAgWzExNC4zNDI5NTY1NDI5Njg3NSwgMjIuMzcyOTM2MjAzMTEzODM4XSxcbiAgICAgICAgWzExNC4zMzQ3MTY3OTY4NzUsIDIyLjM4NDM2NDk5NDEzMzMwM10sXG4gICAgICAgIFsxMTQuMzMwNTk2OTIzODI4MTIsIDIyLjM5Mzg4ODI2OTUxMTE5NF0sXG4gICAgICAgIFsxMTQuMzIxNjcwNTMyMjI2NTUsIDIyLjQwMDg3MTU5MDMwNTk1XSxcbiAgICAgICAgWzExNC4zMjc4NTAzNDE3OTY4OCwgMjIuNDEzNTY3NjM4MzY5ODA1XSxcbiAgICAgICAgWzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDI0OTkzMDg5NjQ3MjJdLFxuICAgICAgICBbMTE0LjMyNTc5MDQwNTI3MzQ0LCAyMi40MzA3MDU0NjI3NDg5MThdLFxuICAgICAgICBbMTE0LjMzMTk3MDIxNDg0Mzc1LCAyMi40Mzk1OTA5MDkxNzI2Nl0sXG4gICAgICAgIFsxMTQuMzM3NDYzMzc4OTA2MjQsIDIyLjQ0OTExMDM5ODg4NjEwNl0sXG4gICAgICAgIFsxMTQuMzM1NDAzNDQyMzgyODEsIDIyLjQ2MTgwMjAzNTMzMzk5Ml0sXG4gICAgICAgIFsxMTQuMzI1MTAzNzU5NzY1NjIsIDIyLjQ2NDM0MDIyMzE3NzExOF0sXG4gICAgICAgIFsxMTQuMzI5MjIzNjMyODEyNDksIDIyLjQ3MjU4OTAxMjU2MTk1NF0sXG4gICAgICAgIFsxMTQuMzIzNzMwNDY4NzUsIDIyLjQ3NzAzMDQ2NDkzMzMwN10sXG4gICAgICAgIFsxMTQuMzE5NjEwNTk1NzAzMTIsIDIyLjQ3ODkzMzkwMDkxNjkyOF0sXG4gICAgICAgIFsxMTQuMzAxNzU3ODEyNSwgMjIuNDY2MjQzODMzNTQ5NDQ1XSxcbiAgICAgICAgWzExNC4zMDI0NDQ0NTgwMDc4MSwgMjIuNDU3MzYwMDk0NzUwMDgzXSxcbiAgICAgICAgWzExNC4yOTI4MzE0MjA4OTg0NCwgMjIuNDU0ODIxNzc5MDc1ODMyXSxcbiAgICAgICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDUxMDE0MjE4NDIyNjldLFxuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQ0Mjc2NDE0NTAwMTcwN10sXG4gICAgICAgIFsxMTQuMjkwNzcxNDg0Mzc0OTksIDIyLjQyODE2NjY1OTI3OTYxNV0sXG4gICAgICAgIFsxMTQuMjc3MDM4NTc0MjE4NzUsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDEyOTMyODYzNTE3NzE3XVxuICAgICAgXSksXG4gICAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddLFxuICAgICAgICBbMTE0LjI5MzUxODA2NjQwNjI1LCAyMi40MTQyMDI0MTAzMjEzMDJdLFxuICAgICAgICBbMTE0LjMwNTg3NzY4NTU0Njg2LCAyMi40MDg0ODkzNTgzNDI2MzVdLFxuICAgICAgICBbMTE0LjMyMjM1NzE3NzczNDM4LCAyMi40MjExODQ3MTAzMzE4NThdLFxuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi40MzM4Nzg5MDE3ODI5N11cbiAgICAgIF0pXG4gICAgXSwge1xuICAgICAgZHJhZ2dhYmxlOiB0cnVlXG4gICAgfVxuICApXG4gIC5hZGRUbyhtYXApO1xuXG52YXIgY2lyY2xlID0gbmV3IEwuQ2lyY2xlKFsyMi4zNjA4OTcyNDAxMzIzNzMsIDExNC4xNDUyMDI2MzY3MTg3NV0sIDQwMDAsIHtcbiAgICBkcmFnZ2FibGU6IHRydWVcbiAgfSlcbiAgLmJpbmRQb3B1cChcIkwuQ2lyY2xlXCIpXG4gIC5hZGRUbyhtYXApXG5cbnZhciBjaXJjbGVNYXJrZXIgPSBuZXcgTC5DaXJjbGVNYXJrZXIobWFwLmdldENlbnRlcigpLCB7XG4gICAgZHJhZ2dhYmxlOiB0cnVlXG4gIH0pXG4gIC5iaW5kUG9wdXAoXCJMLkNpcmNsZU1hcmtlclwiKVxuICAuYWRkVG8obWFwKTtcblxudmFyIG11bHRpUG9seWdvbiA9IGdsb2JhbC5tdWx0aVBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdLFxuICAgIFsxMTQuMjE1OTI3MTI0MDIzNDQsIDIyLjM1MjYxNjAzNTUxMjE1XSxcbiAgICBbMTE0LjI2NDY3ODk1NTA3ODEyLCAyMi4zNTEzNDU5MjY2MDY5NTddLFxuICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuMzI0MDM1Nzg1ODQwMzhdLFxuICAgIFsxMTQuMjkyMTQ0Nzc1MzkwNjIsIDIyLjMyNzIxMTY1ODM4ODkzXSxcbiAgICBbMTE0LjMwMTc1NzgxMjUsIDIyLjMxMTk2NjgxMDk3NzYxNl0sXG4gICAgWzExNC4yOTQyMDQ3MTE5MTQwNiwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjI5MzUxODA2NjQwNjI1LCAyMi4yNzI1NzY1ODU0MTM0NzVdLFxuICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjI2MTc3NDEwMDk3NDM1XSxcbiAgICBbMTE0LjI2ODc5ODgyODEyNSwgMjIuMjgxNDcyMTIyNzgzODE4XSxcbiAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjI5NDgxNDM2Nzc4MDUxOF0sXG4gICAgWzExNC4yNjk0ODU0NzM2MzI4MSwgMjIuMzAyNDM3OTM1OTA0NDhdLFxuICAgIFsxMTQuMjcwMTcyMTE5MTQwNjIsIDIyLjMxNTE0Mjk1ODE2OTM5XSxcbiAgICBbMTE0LjI1NzgxMjUsIDIyLjMxMTk2NjgxMDk3NzYxNl0sXG4gICAgWzExNC4yNDc1MTI4MTczODI4MSwgMjIuMjk5ODk2NzkyNzUxOTI3XSxcbiAgICBbMTE0LjI0NTQ1Mjg4MDg1OTM4LCAyMi4yOTEwMDI0Mjc3MzUzMjVdLFxuICAgIFsxMTQuMjI5NjYwMDM0MTc5NjksIDIyLjMwNzUyMDA4MzUyMjQ3Nl0sXG4gICAgWzExNC4yMjA3MzM2NDI1NzgxMiwgMjIuMzA1NjE0Mjk5ODM3MDQ2XSxcbiAgICBbMTE0LjIwNTYyNzQ0MTQwNjI1LCAyMi4zMjA4NTk4NDEwMDU5M11cbiAgXSksXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMzE1NDkwNzIyNjU2MjUsIDIyLjMzOTI3OTMxNDY4MzEyXSxcbiAgICBbMTE0LjMyMDI5NzI0MTIxMDk0LCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzI5OTEwMjc4MzIwMzEsIDIyLjMyNjU3NjQ4OTY2MjQ4Ml0sXG4gICAgWzExNC4zMzMzNDM1MDU4NTkzOCwgMjIuMzMyMjkyOTA0MDkxNzE2XSxcbiAgICBbMTE0LjMyMzA0MzgyMzI0MjE5LCAyMi4zNDI0NTQ4NDAxNDY1XSxcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl1cbiAgXSksXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF0sXG4gICAgWzExNC4yODExNTg0NDcyNjU2MiwgMjIuMjUxNjA2Mjk1MTMyOTQ4XSxcbiAgICBbMTE0LjI4NjY1MTYxMTMyODEyLCAyMi4yNTU0MTkzMDg4NTg1NTZdLFxuICAgIFsxMTQuMjk5Njk3ODc1OTc2NTYsIDIyLjI2MTEzODYzNDc0NDQ5XSxcbiAgICBbMTE0LjI5NjI2NDY0ODQzNzUsIDIyLjI1MDk3MDc4Mjc1MDg2Nl0sXG4gICAgWzExNC4yOTQ4OTEzNTc0MjE4OCwgMjIuMjQwODAyMTkyNDYzMzVdLFxuICAgIFsxMTQuMjkwMDg0ODM4ODY3MTcsIDIyLjIzODg5NTQ5OTYxMzIzMl0sXG4gICAgWzExNC4yNzkwOTg1MTA3NDIxOSwgMjIuMjQ0NjE1NTAwMzIzMDY0XVxuICBdKVxuXSwge1xuICBkcmFnZ2FibGU6IHRydWUsXG4gIGNvbG9yOiAnIzA5Midcbn0pLmJpbmRQb3B1cCgnTXVsdGlQb2x5Z29uJykuYWRkVG8obWFwKTtcblxudmFyIG11bHRpUG9seWxpbmUgPSBnbG9iYWwubXVsdGlQb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExMy44OTg2OTY4OTk0MTQwNiwgMjIuMzk5NjAxOTIxNzA2OTUzXSxcbiAgICBbMTEzLjg5ODAxMDI1MzkwNjI1LCAyMi40MjI0NTQxODE3MDk3MDddLFxuICAgIFsxMTMuOTAzNTAzNDE3OTY4NzUsIDIyLjQzMzI0NDIxOTc4MTE3XSxcbiAgICBbMTEzLjkwOTY4MzIyNzUzOTA2LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgIFsxMTMuOTA2OTM2NjQ1NTA3ODEsIDIyLjQ3ODI5OTQyNTE2Mjg1Ml0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAyMi40ODg0NTA2ODgzMjU0MDhdLFxuICAgIFsxMTMuOTMzNzE1ODIwMzEyNSwgMjIuNDgzMzc1MTQ5Nzg5NjIzXSxcbiAgICBbMTEzLjk0NDcwMjE0ODQzNzUsIDIyLjQ5MjI1NzIyMDA4NTE5M10sXG4gICAgWzExMy45NTIyNTUyNDkwMjM0NCwgMjIuNTEyNTU2OTU0MDUxNDVdXG4gIF0pLFxuXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODY3Nzk3ODUxNTYyNSwgMjIuMzkyNjE4NTM3MTM3MzhdLFxuICAgIFsxMTMuODY5MTcxMTQyNTc4MTEsIDIyLjQyNzUzMTk1MTE1Njk5XSxcbiAgICBbMTEzLjkyMzQxNjEzNzY5NTMsIDIyLjQ2MjQzNjU4NjY1MzE0OF0sXG4gICAgWzExMy45NDgxMzUzNzU5NzY1NiwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICBbMTEzLjk3ODM0Nzc3ODMyMDMsIDIyLjQ5OTIzNTU4OTY4MzA2XSxcbiAgICBbMTEzLjk5Njg4NzIwNzAzMTI1LCAyMi41MTE5MjI2MzI0Njg4Nl0sXG4gICAgWzExNC4wMTMzNjY2OTkyMTg3NSwgMjIuNTAxMTM4NzIwMzAwMjU0XSxcbiAgICBbMTE0LjAyNTAzOTY3Mjg1MTU1LCAyMi41MDgxMTY2NDE4NTM2NzVdXG4gIF0pXG5dLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZSxcbiAgY29sb3I6ICcjZTkwJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlsaW5lJykuYWRkVG8obWFwKTtcbiIsInJlcXVpcmUoJy4vc3JjL1BhdGguVHJhbnNmb3JtJyk7XG5yZXF1aXJlKCcuL3NyYy9QYXRoLkRyYWcnKTtcbi8vcmVxdWlyZSgnLi9zcmMvTXVsdGlQb2x5LkRyYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBMLlBhdGguRHJhZztcbiIsIi8qKlxuICogTGVhZmxldCB2ZWN0b3IgZmVhdHVyZXMgZHJhZyBmdW5jdGlvbmFsaXR5XG4gKiBAcHJlc2VydmVcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBEcmFnIGhhbmRsZXJcbiAqIEBjbGFzcyBMLlBhdGguRHJhZ1xuICogQGV4dGVuZHMge0wuSGFuZGxlcn1cbiAqL1xuTC5IYW5kbGVyLlBhdGhEcmFnID0gTC5IYW5kbGVyLmV4dGVuZCggLyoqIEBsZW5kcyAgTC5QYXRoLkRyYWcucHJvdG90eXBlICovIHtcblxuICAvKipcbiAgICogQHBhcmFtICB7TC5QYXRofSBwYXRoXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUGF0aH1cbiAgICAgKi9cbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48TnVtYmVyPn1cbiAgICAgKi9cbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUG9pbnR9XG4gICAgICovXG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7TC5Qb2ludH1cbiAgICAgKi9cbiAgICB0aGlzLl9kcmFnU3RhcnRQb2ludCA9IG51bGw7XG5cbiAgfSxcblxuICAvKipcbiAgICogRW5hYmxlIGRyYWdnaW5nXG4gICAqL1xuICBhZGRIb29rczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcGF0aC5vbignbW91c2Vkb3duJywgdGhpcy5fb25EcmFnU3RhcnQsIHRoaXMpO1xuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9wYXRoLl9wYXRoLCAnbGVhZmxldC1wYXRoLWRyYWdnYWJsZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIGRyYWdnaW5nXG4gICAqL1xuICByZW1vdmVIb29rczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcGF0aC5vZmYoJ21vdXNlZG93bicsIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKTtcbiAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5fcGF0aC5fcGF0aCwgJ2xlYWZsZXQtcGF0aC1kcmFnZ2FibGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIG1vdmVkOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcGF0aC5fZHJhZ01vdmVkO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTdGFydCBkcmFnXG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgIGNvbnNvbGUubG9nKCdtZCcsIGV2dCk7XG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IGV2dC5jb250YWluZXJQb2ludC5jbG9uZSgpO1xuICAgIHRoaXMuX2RyYWdTdGFydFBvaW50ID0gZXZ0LmNvbnRhaW5lclBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5fbWF0cml4ID0gWzEsIDAsIDAsIDEsIDAsIDBdO1xuICAgIGNvbnNvbGUubG9nKGV2dClcbiAgICBMLkRvbUV2ZW50LnN0b3AoZXZ0Lm9yaWdpbmFsRXZlbnQpO1xuXG5cbiAgICB0aGlzLl9wYXRoLl9tYXBcbiAgICAgIC5vbignbW91c2Vtb3ZlJywgdGhpcy5fb25EcmFnLCB0aGlzKTtcbiAgICB0aGlzLl9wYXRoXG4gICAgICAub24oJ21vdXNlbW92ZScsIHRoaXMuX29uRHJhZywgdGhpcylcbiAgICAgIC5vbignbW91c2V1cCcsIHRoaXMuX29uRHJhZ0VuZCwgdGhpcylcbiAgICB0aGlzLl9wYXRoLl9tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgIHRoaXMuX3BhdGguX2RyYWdNb3ZlZCA9IGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEcmFnZ2luZ1xuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZzogZnVuY3Rpb24oZXZ0KSB7XG4gICAgLy9jb25zb2xlLmxvZygnbW0nLCBldnQpO1xuICAgIHZhciB4ID0gZXZ0LmNvbnRhaW5lclBvaW50Lng7XG4gICAgdmFyIHkgPSBldnQuY29udGFpbmVyUG9pbnQueTtcblxuICAgIHZhciBkeCA9IHggLSB0aGlzLl9zdGFydFBvaW50Lng7XG4gICAgdmFyIGR5ID0geSAtIHRoaXMuX3N0YXJ0UG9pbnQueTtcblxuICAgIGlmICghdGhpcy5fcGF0aC5fZHJhZ01vdmVkICYmIChkeCB8fCBkeSkpIHtcbiAgICAgIHRoaXMuX3BhdGguX2RyYWdNb3ZlZCA9IHRydWU7XG4gICAgICB0aGlzLl9wYXRoLmZpcmUoJ2RyYWdzdGFydCcpO1xuICAgIH1cblxuICAgIHRoaXMuX21hdHJpeFs0XSArPSBkeDtcbiAgICB0aGlzLl9tYXRyaXhbNV0gKz0gZHk7XG5cbiAgICB0aGlzLl9zdGFydFBvaW50LnggPSB4O1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQueSA9IHk7XG5cbiAgICB0aGlzLl9wYXRoLl9hcHBseVRyYW5zZm9ybSh0aGlzLl9tYXRyaXgpO1xuICAgIHRoaXMuX3BhdGguZmlyZSgnZHJhZycpO1xuICAgIEwuRG9tRXZlbnQuc3RvcChldnQub3JpZ2luYWxFdmVudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERyYWdnaW5nIHN0b3BwZWQsIGFwcGx5XG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnRW5kOiBmdW5jdGlvbihldnQpIHtcbiAgICBjb25zb2xlLmxvZygnZGUnLCBldnQpXG4gICAgICAvL0wuRG9tRXZlbnQuc3RvcChldnQub3JpZ2luYWxFdmVudCk7XG4gICAgICAvLyB1bmRvIGNvbnRhaW5lciB0cmFuc2Zvcm1cbiAgICB0aGlzLl9wYXRoLl9yZXNldFRyYW5zZm9ybSgpO1xuICAgIC8vIGFwcGx5IG1hdHJpeFxuICAgIHRoaXMuX3RyYW5zZm9ybVBvaW50cyh0aGlzLl9tYXRyaXgpO1xuXG4gICAgdGhpcy5fcGF0aC5fbWFwXG4gICAgICAub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9vbkRyYWcsIHRoaXMpO1xuICAgIHRoaXMuX3BhdGhcbiAgICAgIC5vZmYoJ21vdXNlbW92ZScsIHRoaXMuX29uRHJhZywgdGhpcylcbiAgICAgIC5vZmYoJ21vdXNldXAnLCB0aGlzLl9vbkRyYWdFbmQsIHRoaXMpO1xuXG4gICAgLy8gY29uc2lzdGVuY3lcbiAgICB0aGlzLl9wYXRoLmZpcmUoJ2RyYWdlbmQnLCB7XG4gICAgICBkaXN0YW5jZTogTWF0aC5zcXJ0KFxuICAgICAgICBMLkxpbmVVdGlsLl9zcURpc3QodGhpcy5fZHJhZ1N0YXJ0UG9pbnQsIGV2dC5jb250YWluZXJQb2ludClcbiAgICAgIClcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdHJpeCA9IG51bGw7XG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IG51bGw7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBudWxsO1xuICAgIC8vdGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmVuYWJsZSgpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRyYW5zZm9ybWF0aW9uLCBkb2VzIGl0IGluIG9uZSBzd2VlcCBmb3IgcGVyZm9ybWFuY2UsXG4gICAqIHNvIGRvbid0IGJlIHN1cnByaXNlZCBhYm91dCB0aGUgY29kZSByZXBldGl0aW9uLlxuICAgKlxuICAgKiBbIHggXSAgIFsgYSAgYiAgdHggXSBbIHggXSAgIFsgYSAqIHggKyBiICogeSArIHR4IF1cbiAgICogWyB5IF0gPSBbIGMgIGQgIHR5IF0gWyB5IF0gPSBbIGMgKiB4ICsgZCAqIHkgKyB0eSBdXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuICAgKi9cbiAgX3RyYW5zZm9ybVBvaW50czogZnVuY3Rpb24obWF0cml4KSB7XG4gICAgdmFyIHBhdGggPSB0aGlzLl9wYXRoO1xuICAgIHZhciBpLCBsZW4sIGxhdGxuZztcblxuICAgIHZhciBweCA9IEwucG9pbnQobWF0cml4WzRdLCBtYXRyaXhbNV0pO1xuXG4gICAgdmFyIGNycyA9IHBhdGguX21hcC5vcHRpb25zLmNycztcbiAgICB2YXIgdHJhbnNmb3JtYXRpb24gPSBjcnMudHJhbnNmb3JtYXRpb247XG4gICAgdmFyIHNjYWxlID0gY3JzLnNjYWxlKHBhdGguX21hcC5nZXRab29tKCkpO1xuICAgIHZhciBwcm9qZWN0aW9uID0gY3JzLnByb2plY3Rpb247XG5cbiAgICB2YXIgZGlmZiA9IHRyYW5zZm9ybWF0aW9uLnVudHJhbnNmb3JtKHB4LCBzY2FsZSlcbiAgICAgIC5zdWJ0cmFjdCh0cmFuc2Zvcm1hdGlvbi51bnRyYW5zZm9ybShMLnBvaW50KDAsIDApLCBzY2FsZSkpO1xuXG4gICAgY29uc29sZS5sb2cocGF0aClcblxuICAgIC8vIGNvbnNvbGUudGltZSgndHJhbnNmb3JtJyk7XG5cbiAgICAvLyBhbGwgc2hpZnRzIGFyZSBpbi1wbGFjZVxuICAgIGlmIChwYXRoLl9wb2ludCkgeyAvLyBMLkNpcmNsZVxuICAgICAgcGF0aC5fbGF0bG5nID0gcHJvamVjdGlvbi51bnByb2plY3QoXG4gICAgICAgIHByb2plY3Rpb24ucHJvamVjdChwYXRoLl9sYXRsbmcpLl9hZGQoZGlmZikpO1xuICAgICAgcGF0aC5fcG9pbnQuX2FkZChweCk7XG4gICAgfSBlbHNlIGlmIChwYXRoLl9vcmlnaW5hbFBvaW50cykgeyAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHBhdGguX29yaWdpbmFsUG9pbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGxhdGxuZyA9IHBhdGguX2xhdGxuZ3NbaV07XG4gICAgICAgIHBhdGguX2xhdGxuZ3NbaV0gPSBwcm9qZWN0aW9uXG4gICAgICAgICAgLnVucHJvamVjdChwcm9qZWN0aW9uLnByb2plY3QobGF0bG5nKS5fYWRkKGRpZmYpKTtcbiAgICAgICAgcGF0aC5fb3JpZ2luYWxQb2ludHNbaV0uX2FkZChweCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaG9sZXMgb3BlcmF0aW9uc1xuICAgIGlmIChwYXRoLl9ob2xlcykge1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcGF0aC5faG9sZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGxlbjIgPSBwYXRoLl9ob2xlc1tpXS5sZW5ndGg7IGogPCBsZW4yOyBqKyspIHtcbiAgICAgICAgICBsYXRsbmcgPSBwYXRoLl9ob2xlc1tpXVtqXTtcbiAgICAgICAgICBwYXRoLl9ob2xlc1tpXVtqXSA9IHByb2plY3Rpb25cbiAgICAgICAgICAgIC51bnByb2plY3QocHJvamVjdGlvbi5wcm9qZWN0KGxhdGxuZykuX2FkZChkaWZmKSk7XG4gICAgICAgICAgcGF0aC5faG9sZVBvaW50c1tpXVtqXS5fYWRkKHB4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUudGltZUVuZCgndHJhbnNmb3JtJyk7XG5cbiAgICBwYXRoLl91cGRhdGVQYXRoKCk7XG4gIH1cblxufSk7XG5cbkwuUGF0aC5wcm90b3R5cGUuX19vbkFkZCA9IEwuUGF0aC5wcm90b3R5cGUub25BZGQ7XG5MLlBhdGgucHJvdG90eXBlLm9uQWRkID0gZnVuY3Rpb24obWFwKSB7XG4gIHRoaXMuX19vbkFkZC5jYWxsKHRoaXMsIG1hcCk7XG4gIGlmICh0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKSB7XG4gICAgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZHJhZ2dpbmcgPSBuZXcgTC5IYW5kbGVyLlBhdGhEcmFnKHRoaXMpO1xuICAgICAgdGhpcy5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgIHRoaXMuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICB9XG59O1xuXG4vLyBMLlBhdGgucHJvdG90eXBlLl9faW5pdEV2ZW50cyA9IEwuUGF0aC5wcm90b3R5cGUuX2luaXRFdmVudHM7XG4vLyBMLlBhdGgucHJvdG90eXBlLl9pbml0RXZlbnRzID0gZnVuY3Rpb24oKSB7XG4vLyAgIHRoaXMuX19pbml0RXZlbnRzKCk7XG5cbi8vICAgaWYgKHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpIHtcbi8vICAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuLy8gICAgICAgdGhpcy5kcmFnZ2luZy5lbmFibGUoKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgdGhpcy5kcmFnZ2luZyA9IG5ldyBMLkhhbmRsZXIuUGF0aERyYWcodGhpcyk7XG4vLyAgICAgICB0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuLy8gICAgIH1cbi8vICAgfSBlbHNlIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4vLyAgICAgdGhpcy5kcmFnZ2luZy5kaXNhYmxlKCk7XG4vLyAgIH1cbi8vIH07XG4iLCIvKipcbiAqIE1hdHJpeCB0cmFuc2Zvcm0gcGF0aCBmb3IgU1ZHL1ZNTFxuICogVE9ETzogYWRhcHQgdG8gTGVhZmxldCAwLjggdXBvbiByZWxlYXNlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmIChMLkJyb3dzZXIuc3ZnKSB7IC8vIFNWRyB0cmFuc2Zvcm1hdGlvblxuXG4gIEwuUGF0aC5pbmNsdWRlKHtcblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRyYW5zZm9ybSBtYXRyaXhcbiAgICAgKi9cbiAgICBfcmVzZXRUcmFuc2Zvcm06IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fcGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndHJhbnNmb3JtJywgJycpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBTVkdcbiAgICAgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcbiAgICAgKi9cbiAgICBfYXBwbHlUcmFuc2Zvcm06IGZ1bmN0aW9uKG1hdHJpeCkge1xuICAgICAgdGhpcy5fcGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBcInRyYW5zZm9ybVwiLFxuICAgICAgICAnbWF0cml4KCcgKyBtYXRyaXguam9pbignICcpICsgJyknKTtcbiAgICB9XG5cbiAgfSk7XG5cbn0gZWxzZSB7IC8vIFZNTCB0cmFuc2Zvcm0gcm91dGluZXNcblxuICBMLlBhdGguaW5jbHVkZSh7XG5cbiAgICAvKipcbiAgICAgKiBSZXNldCB0cmFuc2Zvcm0gbWF0cml4XG4gICAgICovXG4gICAgX3Jlc2V0VHJhbnNmb3JtOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9za2V3KSB7XG4gICAgICAgIC8vIHN1cGVyIGltcG9ydGFudCEgd29ya2Fyb3VuZCBmb3IgYSAnanVtcGluZycgZ2xpdGNoOlxuICAgICAgICAvLyBkaXNhYmxlIHRyYW5zZm9ybSBiZWZvcmUgcmVtb3ZpbmcgaXRcbiAgICAgICAgdGhpcy5fc2tldy5vbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9wYXRoLnJlbW92ZUNoaWxkKHRoaXMuX3NrZXcpO1xuICAgICAgICB0aGlzLl9za2V3ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gVk1MXG4gICAgICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG4gICAgICovXG4gICAgX2FwcGx5VHJhbnNmb3JtOiBmdW5jdGlvbihtYXRyaXgpIHtcbiAgICAgIHZhciBza2V3ID0gdGhpcy5fc2tldztcblxuICAgICAgaWYgKCFza2V3KSB7XG4gICAgICAgIHNrZXcgPSB0aGlzLl9jcmVhdGVFbGVtZW50KCdza2V3Jyk7XG4gICAgICAgIHRoaXMuX3BhdGguYXBwZW5kQ2hpbGQoc2tldyk7XG4gICAgICAgIHNrZXcuc3R5bGUuYmVoYXZpb3IgPSAndXJsKCNkZWZhdWx0I1ZNTCknO1xuICAgICAgICB0aGlzLl9za2V3ID0gc2tldztcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxlIHNrZXcvdHJhbnNsYXRlIHNlcGFyYXRlbHksIGNhdXNlIGl0J3MgYnJva2VuXG4gICAgICB2YXIgbXQgPSBtYXRyaXhbMF0udG9GaXhlZCg4KSArIFwiIFwiICsgbWF0cml4WzFdLnRvRml4ZWQoOCkgKyBcIiBcIiArXG4gICAgICAgIG1hdHJpeFsyXS50b0ZpeGVkKDgpICsgXCIgXCIgKyBtYXRyaXhbM10udG9GaXhlZCg4KSArIFwiIDAgMFwiO1xuICAgICAgdmFyIG9mZnNldCA9IE1hdGguZmxvb3IobWF0cml4WzRdKS50b0ZpeGVkKCkgKyBcIiwgXCIgK1xuICAgICAgICBNYXRoLmZsb29yKG1hdHJpeFs1XSkudG9GaXhlZCgpICsgXCJcIjtcblxuICAgICAgdmFyIHMgPSB0aGlzLl9wYXRoLnN0eWxlO1xuICAgICAgdmFyIGwgPSBwYXJzZUZsb2F0KHMubGVmdCk7XG4gICAgICB2YXIgdCA9IHBhcnNlRmxvYXQocy50b3ApO1xuICAgICAgdmFyIHcgPSBwYXJzZUZsb2F0KHMud2lkdGgpO1xuICAgICAgdmFyIGggPSBwYXJzZUZsb2F0KHMuaGVpZ2h0KTtcblxuICAgICAgaWYgKGlzTmFOKGwpKSBsID0gMDtcbiAgICAgIGlmIChpc05hTih0KSkgdCA9IDA7XG4gICAgICBpZiAoaXNOYU4odykgfHwgIXcpIHcgPSAxO1xuICAgICAgaWYgKGlzTmFOKGgpIHx8ICFoKSBoID0gMTtcblxuICAgICAgdmFyIG9yaWdpbiA9ICgtbCAvIHcgLSAwLjUpLnRvRml4ZWQoOCkgKyBcIiBcIiArICgtdCAvIGggLSAwLjUpLnRvRml4ZWQoOCk7XG5cbiAgICAgIHNrZXcub24gPSBcImZcIjtcbiAgICAgIHNrZXcubWF0cml4ID0gbXQ7XG4gICAgICBza2V3Lm9yaWdpbiA9IG9yaWdpbjtcbiAgICAgIHNrZXcub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgc2tldy5vbiA9IHRydWU7XG4gICAgfVxuXG4gIH0pO1xufVxuXG4vLyBSZW5kZXJlci1pbmRlcGVuZGVudFxuTC5QYXRoLmluY2x1ZGUoe1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgZmVhdHVyZSB3YXMgZHJhZ2dlZCwgdGhhdCdsbCBzdXByZXNzIHRoZSBjbGljayBldmVudFxuICAgKiBvbiBtb3VzZXVwLiBUaGF0IGZpeGVzIHBvcHVwcyBmb3IgZXhhbXBsZVxuICAgKlxuICAgKiBAcGFyYW0gIHtNb3VzZUV2ZW50fSBlXG4gICAqL1xuICBfb25Nb3VzZUNsaWNrOiBmdW5jdGlvbihlKSB7XG4gICAgaWYgKCh0aGlzLmRyYWdnaW5nICYmIHRoaXMuZHJhZ2dpbmcubW92ZWQoKSkgfHxcbiAgICAgICh0aGlzLl9tYXAuZHJhZ2dpbmcgJiYgdGhpcy5fbWFwLmRyYWdnaW5nLm1vdmVkKCkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fZmlyZU1vdXNlRXZlbnQoZSk7XG4gIH1cbn0pO1xuIl19
