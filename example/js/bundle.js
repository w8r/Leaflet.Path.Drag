(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/w8r/Projects/Leaflet.Path.Drag/example/js/app.js":[function(require,module,exports){
(function (global){
var L = global.L;
// L.Browser.retina = true;
var DragHandler = require('../../index');

L.Icon.Default.imagePath = "leaflet-master/images";

////////////////////////////////////////////////////////////////////////////////
var map = global.map = new L.Map('map', {
  // crs: L.CRS.EPSG4326 // that was tested as well
}).setView([22.42658, 114.1952], 11);

var renderer = new L.Canvas();

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
    draggable: true,
    renderer: renderer
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
    })
  .addTo(map)
  .bindPopup("I'm a polyline");

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
      draggable: true,
      renderer: renderer
    }
  )
  .addTo(map)
  .bindPopup("I'm a polygon with hole");

var circle = new L.Circle([22.360897240132373, 114.14520263671875], 4000, {
    draggable: true
  })
  .bindPopup("L.Circle")
  .addTo(map)

var circleMarker = new L.CircleMarker(map.getCenter(), {
    draggable: true,
    renderer: renderer
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
  // renderer: renderer,
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

var marker = new L.Marker(map.getCenter(), {
  draggable: true
}).addTo(map);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../../index":"/Users/w8r/Projects/Leaflet.Path.Drag/index.js"}],"/Users/w8r/Projects/Leaflet.Path.Drag/index.js":[function(require,module,exports){
require('./src/SVG');
require('./src/SVG.VML');
require('./src/Canvas');
require('./src/Path.Transform');
require('./src/Path.Drag');

module.exports = L.Path.Drag;

},{"./src/Canvas":"/Users/w8r/Projects/Leaflet.Path.Drag/src/Canvas.js","./src/Path.Drag":"/Users/w8r/Projects/Leaflet.Path.Drag/src/Path.Drag.js","./src/Path.Transform":"/Users/w8r/Projects/Leaflet.Path.Drag/src/Path.Transform.js","./src/SVG":"/Users/w8r/Projects/Leaflet.Path.Drag/src/SVG.js","./src/SVG.VML":"/Users/w8r/Projects/Leaflet.Path.Drag/src/SVG.VML.js"}],"/Users/w8r/Projects/Leaflet.Path.Drag/src/Canvas.js":[function(require,module,exports){
L.Util.trueFn = function() {
  return true;
};

L.Canvas.include({

  /**
   * Do nothing
   * @param  {L.Path} layer
   */
  _resetTransformPath: function(layer) {
    if (!this._containerCopy) {
      return;
    }

    delete this._containerCopy;

    if (layer._containsPoint_) {
      layer._containsPoint = layer._containsPoint_;
      delete layer._containsPoint_;

      this._requestRedraw(layer);
      this._draw(true);
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
   *
   * @param  {L.Path} layer
   * @param  {Array.<Number>} matrix
   */
  transformPath: function(layer, matrix) {
    var copy = this._containerCopy;
    var ctx = this._ctx;
    var m = L.Browser.retina ? 2 : 1;
    var bounds = this._bounds;
    var size = bounds.getSize();
    var pos = L.DomUtil.getPosition(this._container);

    if (!copy) {
      copy = this._containerCopy = document.createElement('canvas');
      document.body.appendChild(copy);

      copy.width = m * size.x;
      copy.height = m * size.y;

      layer._removed = true;
      this._redraw();

      copy.getContext('2d').translate(m * bounds.min.x, m * bounds.min.y);
      copy.getContext('2d').drawImage(this._container, 0, 0);
      this._initPath(layer);
      layer._containsPoint_ = layer._containsPoint;
      layer._containsPoint = L.Util.trueFn;
    }

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(pos.x, pos.y, size.x * m, size.y * m);
    ctx.restore();

    ctx.save();

    ctx.drawImage(this._containerCopy, 0, 0, size.x, size.y);
    ctx.transform.apply(ctx, matrix);

    var layers = this._layers;
    this._layers = {};

    this._initPath(layer);
    layer._updatePath();

    this._layers = layers;
    ctx.restore();
  }

});

},{}],"/Users/w8r/Projects/Leaflet.Path.Drag/src/Path.Drag.js":[function(require,module,exports){
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

    /**
     * @type {Boolean}
     */
    this._mapDraggingWasEnabled = false;

  },

  /**
   * Enable dragging
   */
  addHooks: function() {
    this._path.on('mousedown', this._onDragStart, this);
    if (this._path._path) {
      L.DomUtil.addClass(this._path._path, 'leaflet-path-draggable');
    }
  },

  /**
   * Disable dragging
   */
  removeHooks: function() {
    this._path.off('mousedown', this._onDragStart, this);
    if (this._path._path) {
      L.DomUtil.removeClass(this._path._path, 'leaflet-path-draggable');
    }
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
    var eventType = evt.originalEvent._simulated ? 'touchstart' : evt.originalEvent.type;

    this._mapDraggingWasEnabled = false;
    this._startPoint = evt.containerPoint.clone();
    this._dragStartPoint = evt.containerPoint.clone();
    this._matrix = [1, 0, 0, 1, 0, 0];
    L.DomEvent.stop(evt.originalEvent);

    L.DomUtil.addClass(this._path._renderer._container, 'leaflet-interactive');
    L.DomEvent
      .on(document, L.Draggable.MOVE[eventType], this._onDrag, this)
      .on(document, L.Draggable.END[eventType], this._onDragEnd, this);

    if (this._path._map.dragging.enabled()) {
      // I guess it's required because mousdown gets simulated with a delay
      this._path._map.dragging._draggable._onUp();

      this._path._map.dragging.disable();
      this._mapDraggingWasEnabled = true;
    }
    this._path._dragMoved = false;

    if (this._path._popup) { // that might be a case on touch devices as well
      this._path._popup._close();
    }
  },

  /**
   * Dragging
   * @param  {L.MouseEvent} evt
   */
  _onDrag: function(evt) {
    L.DomEvent.stop(evt);

    var first = (evt.touches && evt.touches.length === 1 ? evt.touches[0] : evt);
    var containerPoint = this._path._map.mouseEventToContainerPoint(first);

    var x = containerPoint.x;
    var y = containerPoint.y;

    var dx = x - this._startPoint.x;
    var dy = y - this._startPoint.y;

    if (!this._path._dragMoved && (dx || dy)) {
      this._path._dragMoved = true;
      this._path.fire('dragstart', evt);
      // we don't want that to happen on click
      this._path.bringToFront();
    }

    this._matrix[4] += dx;
    this._matrix[5] += dy;

    this._startPoint.x = x;
    this._startPoint.y = y;

    this._path.fire('predrag', evt);
    this._path.transform(this._matrix);
    this._path.fire('drag', evt);
  },

  /**
   * Dragging stopped, apply
   * @param  {L.MouseEvent} evt
   */
  _onDragEnd: function(evt) {
    var eventType = evt.type;
    var containerPoint = this._path._map.mouseEventToContainerPoint(evt);

    // apply matrix
    if (this.moved()) {
      this._transformPoints(this._matrix);
      this._path._project();
      this._path.transform(null);
    }

    L.DomEvent
      .off(document, 'mousemove touchmove', this._onDrag, this)
      .off(document, 'mouseup touchend', this._onDragEnd, this);

    // consistency
    this._path.fire('dragend', {
      distance: Math.sqrt(
        L.LineUtil._sqDist(this._dragStartPoint, containerPoint)
      )
    });

    this._matrix = null;
    this._startPoint = null;
    this._dragStartPoint = null;

    if (this._mapDraggingWasEnabled) {
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

    path._bounds = new L.LatLngBounds();

    // console.time('transform');
    // all shifts are in-place
    if (path._point) { // L.Circle
      path._latlng = projection.unproject(
        projection.project(path._latlng)._add(diff));
      path._point._add(px);
    } else if (path._rings || path._parts) { // everything else
      var rings = path._rings || path._parts;
      var latlngs = path._latlngs;
      if (!L.Util.isArray(latlngs[0])) { // polyline
        latlngs = [latlngs];
      }
      for (i = 0, len = rings.length; i < len; i++) {
        for (var j = 0, jj = rings[i].length; j < jj; j++) {
          latlng = latlngs[i][j];
          latlngs[i][j] = projection
            .unproject(projection.project(latlng)._add(diff));
          path._bounds.extend(latlngs[i][j]);
          rings[i][j]._add(px);
        }
      }
    }
    // console.timeEnd('transform');

    path._updatePath();
  }

});

L.Path.addInitHook(function() {
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
});

},{}],"/Users/w8r/Projects/Leaflet.Path.Drag/src/Path.Transform.js":[function(require,module,exports){
/**
 * Matrix transform path for SVG/VML
 * TODO: adapt to Leaflet 0.8 upon release
 */

"use strict";

// Renderer-independent
L.Path.include({

	/**
	 * Applies matrix transformation to SVG
	 * @param {Array.<Number>?} matrix
	 */
	transform: function(matrix) {
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
	_onMouseClick: function(e) {
		if ((this.dragging && this.dragging.moved()) ||
			(this._map.dragging && this._map.dragging.moved())) {
			return;
		}

		this._fireMouseEvent(e);
	}

});

},{}],"/Users/w8r/Projects/Leaflet.Path.Drag/src/SVG.VML.js":[function(require,module,exports){
L.SVG.include(!L.Browser.vml ? {} : {

	/**
	 * Reset transform matrix
	 */
	_resetTransformPath: function(layer) {
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
	transformPath: function(layer, matrix) {
		var skew = layer._skew;

		if (!skew) {
			skew = L.SVG.create('skew');
			layer._path.appendChild(skew);
			skew.style.behavior = 'url(#default#VML)';
			layer._skew = skew;
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

},{}],"/Users/w8r/Projects/Leaflet.Path.Drag/src/SVG.js":[function(require,module,exports){
L.SVG.include({

	/**
	 * Reset transform matrix
	 */
	_resetTransformPath: function(layer) {
		layer._path.setAttributeNS(null, 'transform', '');
	},

	/**
	 * Applies matrix transformation to SVG
	 * @param {L.Path}         layer
	 * @param {Array.<Number>} matrix
	 */
	transformPath: function(layer, matrix) {
		layer._path.setAttributeNS(null, "transform",
			'matrix(' + matrix.join(' ') + ')');
	}

});

},{}]},{},["/Users/w8r/Projects/Leaflet.Path.Drag/example/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiZXhhbXBsZS9qcy9hcHAuanMiLCJpbmRleC5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvUGF0aC5EcmFnLmpzIiwic3JjL1BhdGguVHJhbnNmb3JtLmpzIiwic3JjL1NWRy5WTUwuanMiLCJzcmMvU1ZHLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgTCA9IGdsb2JhbC5MO1xuLy8gTC5Ccm93c2VyLnJldGluYSA9IHRydWU7XG52YXIgRHJhZ0hhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9pbmRleCcpO1xuXG5MLkljb24uRGVmYXVsdC5pbWFnZVBhdGggPSBcImxlYWZsZXQtbWFzdGVyL2ltYWdlc1wiO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIG1hcCA9IGdsb2JhbC5tYXAgPSBuZXcgTC5NYXAoJ21hcCcsIHtcbiAgLy8gY3JzOiBMLkNSUy5FUFNHNDMyNiAvLyB0aGF0IHdhcyB0ZXN0ZWQgYXMgd2VsbFxufSkuc2V0VmlldyhbMjIuNDI2NTgsIDExNC4xOTUyXSwgMTEpO1xuXG52YXIgcmVuZGVyZXIgPSBuZXcgTC5DYW52YXMoKTtcblxuTC50aWxlTGF5ZXIoJ2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcbiAgYXR0cmlidXRpb246ICcmY29weTsgJyArXG4gICAgJzxhIGhyZWY9XCJodHRwOi8vb3NtLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXG59KS5hZGRUbyhtYXApO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gaW50ZXJwb2xhdGVBcnIoYXJyYXksIGluc2VydCkge1xuICB2YXIgcmVzID0gW107XG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24ocCwgaSwgYXJyKSB7XG4gICAgcmVzLnB1c2gocC5jb25jYXQoKSk7XG5cbiAgICBpZiAoaSA8IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICB2YXIgZGlmZiA9IFthcnJbaSArIDFdWzBdIC0gcFswXSwgYXJyW2kgKyAxXVsxXSAtIHBbMV1dO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBpbnNlcnQ7IGkrKykge1xuICAgICAgICByZXMucHVzaChbcFswXSArIChkaWZmWzBdICogaSkgLyBpbnNlcnQsIHBbMV0gKyAoZGlmZlsxXSAqIGkpIC8gaW5zZXJ0XSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIHBvbHlnb24gPSBnbG9iYWwucG9seWdvbiA9IG5ldyBMLlBvbHlnb24oXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoXG5cbiAgICAvLyB+IDEzIDAwMCBwb2ludHNcbiAgICBpbnRlcnBvbGF0ZUFycihbXG4gICAgICBbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdLFxuICAgICAgWzExMy45ODY1ODc1MjQ0MTQwNSwgMjIuMzgzNzMwMDg1OTI0OTVdLFxuICAgICAgWzExNC4wMTI2ODAwNTM3MTA5NCwgMjIuMzY5MTI2Mzk3NTQ1ODg3XSxcbiAgICAgIFsxMTQuMDI3Nzg2MjU0ODgyODEsIDIyLjM4NTYzNDgwMTg1NzE4XSxcbiAgICAgIFsxMTQuMDQ3MDEyMzI5MTAxNTYsIDIyLjM5NTE1Nzk5MDI5MDc1NV0sXG4gICAgICBbMTE0LjA2MDA1ODU5Mzc1LCAyMi40MTM1Njc2MzgzNjk4MDVdLFxuICAgICAgWzExNC4wNjI4MDUxNzU3ODEyNSwgMjIuNDMyNjA5NTM0ODc2Nzk2XSxcbiAgICAgIFsxMTQuMDQ4Mzg1NjIwMTE3MTcsIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG4gICAgICBbMTE0LjA0Mjg5MjQ1NjA1NDY5LCAyMi40NDg0NzU3ODY1NjU0NF0sXG4gICAgICBbMTE0LjAzMjU5Mjc3MzQzNzQ5LCAyMi40NDQ2NjgwNTE2NTcxNTddLFxuICAgICAgWzExNC4wMTk1NDY1MDg3ODkwNiwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICAgIFsxMTMuOTk2MjAwNTYxNTIzNDQsIDIyLjQzNjQxNzYwMDc2MzExNF0sXG4gICAgICBbMTEzLjk4MTc4MTAwNTg1OTM4LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuICAgICAgWzExMy45NzY5NzQ0ODczMDQ2OSwgMjIuNDAzNDEwODkyNzEyMTI0XVxuICAgIF0sIDEwMDApXG4gICksIHtcbiAgICBjb2xvcjogJyNmMDAnLFxuICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICByZW5kZXJlcjogcmVuZGVyZXJcbiAgfSkuYWRkVG8obWFwKTtcblxudmFyIHBvbHlsaW5lID0gZ2xvYmFsLnBvbHlsaW5lID0gbmV3IEwuUG9seWxpbmUoXG4gICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICBbMTE0LjE0MzE0MjcwMDE5NTMxLCAyMi40OTQ3OTQ4NDk3NTQ0M10sXG4gICAgICBbMTE0LjE1MzQ0MjM4MjgxMjUsIDIyLjQ4NTkxMjk0MjMyMDk1OF0sXG4gICAgICBbMTE0LjE1MjA2OTA5MTc5Njg4LCAyMi40NzMyMjM1MTQ0NzgxXSxcbiAgICAgIFsxMTQuMTQ5MzIyNTA5NzY1NjEsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG4gICAgICBbMTE0LjE1OTYyMjE5MjM4MjgxLCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgICAgWzExNC4xNjk5MjE4NzUsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgICBbMTE0LjE5Mzk1NDQ2Nzc3MzQ0LCAyMi40NTk4OTgzNjM5NDM4OTNdLFxuICAgICAgWzExNC4yMDYzMTQwODY5MTQwNiwgMjIuNDYxMTY3NDgxMTA5MzVdLFxuICAgICAgWzExNC4yMTE4MDcyNTA5NzY1NSwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICAgIFsxMTQuMjI0MTY2ODcwMTE3MTksIDIyLjQ3MTMyMDAwMDAwOTk5Ml0sXG4gICAgICBbMTE0LjIzNzIxMzEzNDc2NTYyLCAyMi40NzYzOTU5ODA0NTc5NzNdLFxuICAgICAgWzExNC4yNDIwMTk2NTMzMjAzMSwgMjIuNDkzNTI2MDQwNzM3MjJdLFxuICAgICAgWzExNC4yMzAzNDY2Nzk2ODc1LCAyMi41MTU3Mjg1MTgzMDM1MV0sXG4gICAgICBbMTE0LjIxNzk4NzA2MDU0Njg4LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuICAgICAgWzExNC4yMDc2ODczNzc5Mjk2OSwgMjIuNTI0NjA4NTExMDI2MjYyXSxcbiAgICAgIFsxMTQuMjA3Njg3Mzc3OTI5NjksIDIyLjUzNjAyNDgwNTg4Njk3NF1cbiAgICBdKSwge1xuICAgICAgd2VpZ2h0OiAxNSxcbiAgICAgIGRyYWdnYWJsZTogdHJ1ZVxuICAgIH0pXG4gIC5hZGRUbyhtYXApXG4gIC5iaW5kUG9wdXAoXCJJJ20gYSBwb2x5bGluZVwiKTtcblxudmFyIHBvbHlnb25XaXRoSG9sZSA9IGdsb2JhbC5wb2x5Z29uV2l0aEhvbGUgPSBuZXcgTC5Qb2x5Z29uKFxuICAgIFtcbiAgICAgIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQxMjkzMjg2MzUxNzcxN10sXG4gICAgICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQwMDg3MTU5MDMwNTk1XSxcbiAgICAgICAgWzExNC4yOTAwODQ4Mzg4NjcxNywgMjIuMzg4ODA5MjcwNDU1NTZdLFxuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi4zODI0NjAyNjA4MTU3MTZdLFxuICAgICAgICBbMTE0LjMxODkyMzk1MDE5NTMxLCAyMi4zOTE5ODM2NjY2MDI3ODNdLFxuICAgICAgICBbMTE0LjMyMzA0MzgyMzI0MjE5LCAyMi4zODA1NTU1MDE0MjE1MzNdLFxuICAgICAgICBbMTE0LjM0Mjk1NjU0Mjk2ODc1LCAyMi4zNzI5MzYyMDMxMTM4MzhdLFxuICAgICAgICBbMTE0LjMzNDcxNjc5Njg3NSwgMjIuMzg0MzY0OTk0MTMzMzAzXSxcbiAgICAgICAgWzExNC4zMzA1OTY5MjM4MjgxMiwgMjIuMzkzODg4MjY5NTExMTk0XSxcbiAgICAgICAgWzExNC4zMjE2NzA1MzIyMjY1NSwgMjIuNDAwODcxNTkwMzA1OTVdLFxuICAgICAgICBbMTE0LjMyNzg1MDM0MTc5Njg4LCAyMi40MTM1Njc2MzgzNjk4MDVdLFxuICAgICAgICBbMTE0LjMzMTk3MDIxNDg0Mzc1LCAyMi40MjQ5OTMwODk2NDcyMl0sXG4gICAgICAgIFsxMTQuMzI1NzkwNDA1MjczNDQsIDIyLjQzMDcwNTQ2Mjc0ODkxOF0sXG4gICAgICAgIFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQzOTU5MDkwOTE3MjY2XSxcbiAgICAgICAgWzExNC4zMzc0NjMzNzg5MDYyNCwgMjIuNDQ5MTEwMzk4ODg2MTA2XSxcbiAgICAgICAgWzExNC4zMzU0MDM0NDIzODI4MSwgMjIuNDYxODAyMDM1MzMzOTkyXSxcbiAgICAgICAgWzExNC4zMjUxMDM3NTk3NjU2MiwgMjIuNDY0MzQwMjIzMTc3MTE4XSxcbiAgICAgICAgWzExNC4zMjkyMjM2MzI4MTI0OSwgMjIuNDcyNTg5MDEyNTYxOTU0XSxcbiAgICAgICAgWzExNC4zMjM3MzA0Njg3NSwgMjIuNDc3MDMwNDY0OTMzMzA3XSxcbiAgICAgICAgWzExNC4zMTk2MTA1OTU3MDMxMiwgMjIuNDc4OTMzOTAwOTE2OTI4XSxcbiAgICAgICAgWzExNC4zMDE3NTc4MTI1LCAyMi40NjYyNDM4MzM1NDk0NDVdLFxuICAgICAgICBbMTE0LjMwMjQ0NDQ1ODAwNzgxLCAyMi40NTczNjAwOTQ3NTAwODNdLFxuICAgICAgICBbMTE0LjI5MjgzMTQyMDg5ODQ0LCAyMi40NTQ4MjE3NzkwNzU4MzJdLFxuICAgICAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi40NTEwMTQyMTg0MjI2OV0sXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDQyNzY0MTQ1MDAxNzA3XSxcbiAgICAgICAgWzExNC4yOTA3NzE0ODQzNzQ5OSwgMjIuNDI4MTY2NjU5Mjc5NjE1XSxcbiAgICAgICAgWzExNC4yNzcwMzg1NzQyMTg3NSwgMjIuNDIwNTQ5OTcwMjkwODc1XSxcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40MTI5MzI4NjM1MTc3MTddXG4gICAgICBdKSxcbiAgICAgIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi40MzM4Nzg5MDE3ODI5N10sXG4gICAgICAgIFsxMTQuMjkzNTE4MDY2NDA2MjUsIDIyLjQxNDIwMjQxMDMyMTMwMl0sXG4gICAgICAgIFsxMTQuMzA1ODc3Njg1NTQ2ODYsIDIyLjQwODQ4OTM1ODM0MjYzNV0sXG4gICAgICAgIFsxMTQuMzIyMzU3MTc3NzM0MzgsIDIyLjQyMTE4NDcxMDMzMTg1OF0sXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XVxuICAgICAgXSlcbiAgICBdLCB7XG4gICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICByZW5kZXJlcjogcmVuZGVyZXJcbiAgICB9XG4gIClcbiAgLmFkZFRvKG1hcClcbiAgLmJpbmRQb3B1cChcIkknbSBhIHBvbHlnb24gd2l0aCBob2xlXCIpO1xuXG52YXIgY2lyY2xlID0gbmV3IEwuQ2lyY2xlKFsyMi4zNjA4OTcyNDAxMzIzNzMsIDExNC4xNDUyMDI2MzY3MTg3NV0sIDQwMDAsIHtcbiAgICBkcmFnZ2FibGU6IHRydWVcbiAgfSlcbiAgLmJpbmRQb3B1cChcIkwuQ2lyY2xlXCIpXG4gIC5hZGRUbyhtYXApXG5cbnZhciBjaXJjbGVNYXJrZXIgPSBuZXcgTC5DaXJjbGVNYXJrZXIobWFwLmdldENlbnRlcigpLCB7XG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICB9KVxuICAuYmluZFBvcHVwKFwiTC5DaXJjbGVNYXJrZXJcIilcbiAgLmFkZFRvKG1hcCk7XG5cbnZhciBtdWx0aVBvbHlnb24gPSBnbG9iYWwubXVsdGlQb2x5Z29uID0gbmV3IEwuUG9seWdvbihbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjA1NjI3NDQxNDA2MjUsIDIyLjMyMDg1OTg0MTAwNTkzXSxcbiAgICBbMTE0LjIxNTkyNzEyNDAyMzQ0LCAyMi4zNTI2MTYwMzU1MTIxNV0sXG4gICAgWzExNC4yNjQ2Nzg5NTUwNzgxMiwgMjIuMzUxMzQ1OTI2NjA2OTU3XSxcbiAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjMyNDAzNTc4NTg0MDM4XSxcbiAgICBbMTE0LjI5MjE0NDc3NTM5MDYyLCAyMi4zMjcyMTE2NTgzODg5M10sXG4gICAgWzExNC4zMDE3NTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjk0MjA0NzExOTE0MDYsIDIyLjI5MTAwMjQyNzczNTMyNV0sXG4gICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuMjcyNTc2NTg1NDEzNDc1XSxcbiAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi4yNjE3NzQxMDA5NzQzNV0sXG4gICAgWzExNC4yNjg3OTg4MjgxMjUsIDIyLjI4MTQ3MjEyMjc4MzgxOF0sXG4gICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi4yOTQ4MTQzNjc3ODA1MThdLFxuICAgIFsxMTQuMjY5NDg1NDczNjMyODEsIDIyLjMwMjQzNzkzNTkwNDQ4XSxcbiAgICBbMTE0LjI3MDE3MjExOTE0MDYyLCAyMi4zMTUxNDI5NTgxNjkzOV0sXG4gICAgWzExNC4yNTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjQ3NTEyODE3MzgyODEsIDIyLjI5OTg5Njc5Mjc1MTkyN10sXG4gICAgWzExNC4yNDU0NTI4ODA4NTkzOCwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjIyOTY2MDAzNDE3OTY5LCAyMi4zMDc1MjAwODM1MjI0NzZdLFxuICAgIFsxMTQuMjIwNzMzNjQyNTc4MTIsIDIyLjMwNTYxNDI5OTgzNzA0Nl0sXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl0sXG4gICAgWzExNC4zMjAyOTcyNDEyMTA5NCwgMjIuMzI2NTc2NDg5NjYyNDgyXSxcbiAgICBbMTE0LjMyOTkxMDI3ODMyMDMxLCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzMzMzQzNTA1ODU5MzgsIDIyLjMzMjI5MjkwNDA5MTcxNl0sXG4gICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzQyNDU0ODQwMTQ2NV0sXG4gICAgWzExNC4zMTU0OTA3MjI2NTYyNSwgMjIuMzM5Mjc5MzE0NjgzMTJdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdLFxuICAgIFsxMTQuMjgxMTU4NDQ3MjY1NjIsIDIyLjI1MTYwNjI5NTEzMjk0OF0sXG4gICAgWzExNC4yODY2NTE2MTEzMjgxMiwgMjIuMjU1NDE5MzA4ODU4NTU2XSxcbiAgICBbMTE0LjI5OTY5Nzg3NTk3NjU2LCAyMi4yNjExMzg2MzQ3NDQ0OV0sXG4gICAgWzExNC4yOTYyNjQ2NDg0Mzc1LCAyMi4yNTA5NzA3ODI3NTA4NjZdLFxuICAgIFsxMTQuMjk0ODkxMzU3NDIxODgsIDIyLjI0MDgwMjE5MjQ2MzM1XSxcbiAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4yMzg4OTU0OTk2MTMyMzJdLFxuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF1cbiAgXSlcbl0sIHtcbiAgZHJhZ2dhYmxlOiB0cnVlLFxuICAvLyByZW5kZXJlcjogcmVuZGVyZXIsXG4gIGNvbG9yOiAnIzA5Midcbn0pLmJpbmRQb3B1cCgnTXVsdGlQb2x5Z29uJykuYWRkVG8obWFwKTtcblxudmFyIG11bHRpUG9seWxpbmUgPSBnbG9iYWwubXVsdGlQb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExMy44OTg2OTY4OTk0MTQwNiwgMjIuMzk5NjAxOTIxNzA2OTUzXSxcbiAgICBbMTEzLjg5ODAxMDI1MzkwNjI1LCAyMi40MjI0NTQxODE3MDk3MDddLFxuICAgIFsxMTMuOTAzNTAzNDE3OTY4NzUsIDIyLjQzMzI0NDIxOTc4MTE3XSxcbiAgICBbMTEzLjkwOTY4MzIyNzUzOTA2LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgIFsxMTMuOTA2OTM2NjQ1NTA3ODEsIDIyLjQ3ODI5OTQyNTE2Mjg1Ml0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAyMi40ODg0NTA2ODgzMjU0MDhdLFxuICAgIFsxMTMuOTMzNzE1ODIwMzEyNSwgMjIuNDgzMzc1MTQ5Nzg5NjIzXSxcbiAgICBbMTEzLjk0NDcwMjE0ODQzNzUsIDIyLjQ5MjI1NzIyMDA4NTE5M10sXG4gICAgWzExMy45NTIyNTUyNDkwMjM0NCwgMjIuNTEyNTU2OTU0MDUxNDVdXG4gIF0pLFxuXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODY3Nzk3ODUxNTYyNSwgMjIuMzkyNjE4NTM3MTM3MzhdLFxuICAgIFsxMTMuODY5MTcxMTQyNTc4MTEsIDIyLjQyNzUzMTk1MTE1Njk5XSxcbiAgICBbMTEzLjkyMzQxNjEzNzY5NTMsIDIyLjQ2MjQzNjU4NjY1MzE0OF0sXG4gICAgWzExMy45NDgxMzUzNzU5NzY1NiwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICBbMTEzLjk3ODM0Nzc3ODMyMDMsIDIyLjQ5OTIzNTU4OTY4MzA2XSxcbiAgICBbMTEzLjk5Njg4NzIwNzAzMTI1LCAyMi41MTE5MjI2MzI0Njg4Nl0sXG4gICAgWzExNC4wMTMzNjY2OTkyMTg3NSwgMjIuNTAxMTM4NzIwMzAwMjU0XSxcbiAgICBbMTE0LjAyNTAzOTY3Mjg1MTU1LCAyMi41MDgxMTY2NDE4NTM2NzVdXG4gIF0pXG5dLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZSxcbiAgY29sb3I6ICcjZTkwJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlsaW5lJykuYWRkVG8obWFwKTtcblxudmFyIG1hcmtlciA9IG5ldyBMLk1hcmtlcihtYXAuZ2V0Q2VudGVyKCksIHtcbiAgZHJhZ2dhYmxlOiB0cnVlXG59KS5hZGRUbyhtYXApO1xuIiwicmVxdWlyZSgnLi9zcmMvU1ZHJyk7XG5yZXF1aXJlKCcuL3NyYy9TVkcuVk1MJyk7XG5yZXF1aXJlKCcuL3NyYy9DYW52YXMnKTtcbnJlcXVpcmUoJy4vc3JjL1BhdGguVHJhbnNmb3JtJyk7XG5yZXF1aXJlKCcuL3NyYy9QYXRoLkRyYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBMLlBhdGguRHJhZztcbiIsIkwuVXRpbC50cnVlRm4gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5MLkNhbnZhcy5pbmNsdWRlKHtcblxuICAvKipcbiAgICogRG8gbm90aGluZ1xuICAgKiBAcGFyYW0gIHtMLlBhdGh9IGxheWVyXG4gICAqL1xuICBfcmVzZXRUcmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllcikge1xuICAgIGlmICghdGhpcy5fY29udGFpbmVyQ29weSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRlbGV0ZSB0aGlzLl9jb250YWluZXJDb3B5O1xuXG4gICAgaWYgKGxheWVyLl9jb250YWluc1BvaW50Xykge1xuICAgICAgbGF5ZXIuX2NvbnRhaW5zUG9pbnQgPSBsYXllci5fY29udGFpbnNQb2ludF87XG4gICAgICBkZWxldGUgbGF5ZXIuX2NvbnRhaW5zUG9pbnRfO1xuXG4gICAgICB0aGlzLl9yZXF1ZXN0UmVkcmF3KGxheWVyKTtcbiAgICAgIHRoaXMuX2RyYXcodHJ1ZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBBbGdvcml0aG0gb3V0bGluZTpcbiAgICpcbiAgICogMS4gcHJlLXRyYW5zZm9ybSAtIGNsZWFyIHRoZSBwYXRoIG91dCBvZiB0aGUgY2FudmFzLCBjb3B5IGNhbnZhcyBzdGF0ZVxuICAgKiAyLiBhdCBldmVyeSBmcmFtZTpcbiAgICogICAgMi4xLiBzYXZlXG4gICAqICAgIDIuMi4gcmVkcmF3IHRoZSBjYW52YXMgZnJvbSBzYXZlZCBvbmVcbiAgICogICAgMi4zLiB0cmFuc2Zvcm1cbiAgICogICAgMi40LiBkcmF3IHBhdGhcbiAgICogICAgMi41LiByZXN0b3JlXG4gICAqXG4gICAqIEBwYXJhbSAge0wuUGF0aH0gbGF5ZXJcbiAgICogQHBhcmFtICB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuICAgKi9cbiAgdHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuICAgIHZhciBjb3B5ID0gdGhpcy5fY29udGFpbmVyQ29weTtcbiAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgIHZhciBtID0gTC5Ccm93c2VyLnJldGluYSA/IDIgOiAxO1xuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XG4gICAgdmFyIHNpemUgPSBib3VuZHMuZ2V0U2l6ZSgpO1xuICAgIHZhciBwb3MgPSBMLkRvbVV0aWwuZ2V0UG9zaXRpb24odGhpcy5fY29udGFpbmVyKTtcblxuICAgIGlmICghY29weSkge1xuICAgICAgY29weSA9IHRoaXMuX2NvbnRhaW5lckNvcHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weSk7XG5cbiAgICAgIGNvcHkud2lkdGggPSBtICogc2l6ZS54O1xuICAgICAgY29weS5oZWlnaHQgPSBtICogc2l6ZS55O1xuXG4gICAgICBsYXllci5fcmVtb3ZlZCA9IHRydWU7XG4gICAgICB0aGlzLl9yZWRyYXcoKTtcblxuICAgICAgY29weS5nZXRDb250ZXh0KCcyZCcpLnRyYW5zbGF0ZShtICogYm91bmRzLm1pbi54LCBtICogYm91bmRzLm1pbi55KTtcbiAgICAgIGNvcHkuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodGhpcy5fY29udGFpbmVyLCAwLCAwKTtcbiAgICAgIHRoaXMuX2luaXRQYXRoKGxheWVyKTtcbiAgICAgIGxheWVyLl9jb250YWluc1BvaW50XyA9IGxheWVyLl9jb250YWluc1BvaW50O1xuICAgICAgbGF5ZXIuX2NvbnRhaW5zUG9pbnQgPSBMLlV0aWwudHJ1ZUZuO1xuICAgIH1cblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICBjdHguY2xlYXJSZWN0KHBvcy54LCBwb3MueSwgc2l6ZS54ICogbSwgc2l6ZS55ICogbSk7XG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIGN0eC5zYXZlKCk7XG5cbiAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2NvbnRhaW5lckNvcHksIDAsIDAsIHNpemUueCwgc2l6ZS55KTtcbiAgICBjdHgudHJhbnNmb3JtLmFwcGx5KGN0eCwgbWF0cml4KTtcblxuICAgIHZhciBsYXllcnMgPSB0aGlzLl9sYXllcnM7XG4gICAgdGhpcy5fbGF5ZXJzID0ge307XG5cbiAgICB0aGlzLl9pbml0UGF0aChsYXllcik7XG4gICAgbGF5ZXIuX3VwZGF0ZVBhdGgoKTtcblxuICAgIHRoaXMuX2xheWVycyA9IGxheWVycztcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbn0pO1xuIiwiLyoqXG4gKiBMZWFmbGV0IHZlY3RvciBmZWF0dXJlcyBkcmFnIGZ1bmN0aW9uYWxpdHlcbiAqIEBwcmVzZXJ2ZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIERyYWcgaGFuZGxlclxuICogQGNsYXNzIEwuUGF0aC5EcmFnXG4gKiBAZXh0ZW5kcyB7TC5IYW5kbGVyfVxuICovXG5MLkhhbmRsZXIuUGF0aERyYWcgPSBMLkhhbmRsZXIuZXh0ZW5kKCAvKiogQGxlbmRzICBMLlBhdGguRHJhZy5wcm90b3R5cGUgKi8ge1xuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtMLlBhdGh9IHBhdGhcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBpbml0aWFsaXplOiBmdW5jdGlvbihwYXRoKSB7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7TC5QYXRofVxuICAgICAqL1xuICAgIHRoaXMuX3BhdGggPSBwYXRoO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0FycmF5LjxOdW1iZXI+fVxuICAgICAqL1xuICAgIHRoaXMuX21hdHJpeCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7TC5Qb2ludH1cbiAgICAgKi9cbiAgICB0aGlzLl9zdGFydFBvaW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtMLlBvaW50fVxuICAgICAqL1xuICAgIHRoaXMuX2RyYWdTdGFydFBvaW50ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtCb29sZWFufVxuICAgICAqL1xuICAgIHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCA9IGZhbHNlO1xuXG4gIH0sXG5cbiAgLyoqXG4gICAqIEVuYWJsZSBkcmFnZ2luZ1xuICAgKi9cbiAgYWRkSG9va3M6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKTtcbiAgICBpZiAodGhpcy5fcGF0aC5fcGF0aCkge1xuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3BhdGguX3BhdGgsICdsZWFmbGV0LXBhdGgtZHJhZ2dhYmxlJyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIGRyYWdnaW5nXG4gICAqL1xuICByZW1vdmVIb29rczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcGF0aC5vZmYoJ21vdXNlZG93bicsIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKTtcbiAgICBpZiAodGhpcy5fcGF0aC5fcGF0aCkge1xuICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3BhdGguX3BhdGgsICdsZWFmbGV0LXBhdGgtZHJhZ2dhYmxlJyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgbW92ZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXRoLl9kcmFnTW92ZWQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGRyYWdcbiAgICogQHBhcmFtICB7TC5Nb3VzZUV2ZW50fSBldnRcbiAgICovXG4gIF9vbkRyYWdTdGFydDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIGV2ZW50VHlwZSA9IGV2dC5vcmlnaW5hbEV2ZW50Ll9zaW11bGF0ZWQgPyAndG91Y2hzdGFydCcgOiBldnQub3JpZ2luYWxFdmVudC50eXBlO1xuXG4gICAgdGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IGV2dC5jb250YWluZXJQb2ludC5jbG9uZSgpO1xuICAgIHRoaXMuX2RyYWdTdGFydFBvaW50ID0gZXZ0LmNvbnRhaW5lclBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5fbWF0cml4ID0gWzEsIDAsIDAsIDEsIDAsIDBdO1xuICAgIEwuRG9tRXZlbnQuc3RvcChldnQub3JpZ2luYWxFdmVudCk7XG5cbiAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fcGF0aC5fcmVuZGVyZXIuX2NvbnRhaW5lciwgJ2xlYWZsZXQtaW50ZXJhY3RpdmUnKTtcbiAgICBMLkRvbUV2ZW50XG4gICAgICAub24oZG9jdW1lbnQsIEwuRHJhZ2dhYmxlLk1PVkVbZXZlbnRUeXBlXSwgdGhpcy5fb25EcmFnLCB0aGlzKVxuICAgICAgLm9uKGRvY3VtZW50LCBMLkRyYWdnYWJsZS5FTkRbZXZlbnRUeXBlXSwgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcblxuICAgIGlmICh0aGlzLl9wYXRoLl9tYXAuZHJhZ2dpbmcuZW5hYmxlZCgpKSB7XG4gICAgICAvLyBJIGd1ZXNzIGl0J3MgcmVxdWlyZWQgYmVjYXVzZSBtb3VzZG93biBnZXRzIHNpbXVsYXRlZCB3aXRoIGEgZGVsYXlcbiAgICAgIHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5fZHJhZ2dhYmxlLl9vblVwKCk7XG5cbiAgICAgIHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gICAgICB0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLl9wYXRoLl9kcmFnTW92ZWQgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLl9wYXRoLl9wb3B1cCkgeyAvLyB0aGF0IG1pZ2h0IGJlIGEgY2FzZSBvbiB0b3VjaCBkZXZpY2VzIGFzIHdlbGxcbiAgICAgIHRoaXMuX3BhdGguX3BvcHVwLl9jbG9zZSgpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRHJhZ2dpbmdcbiAgICogQHBhcmFtICB7TC5Nb3VzZUV2ZW50fSBldnRcbiAgICovXG4gIF9vbkRyYWc6IGZ1bmN0aW9uKGV2dCkge1xuICAgIEwuRG9tRXZlbnQuc3RvcChldnQpO1xuXG4gICAgdmFyIGZpcnN0ID0gKGV2dC50b3VjaGVzICYmIGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMSA/IGV2dC50b3VjaGVzWzBdIDogZXZ0KTtcbiAgICB2YXIgY29udGFpbmVyUG9pbnQgPSB0aGlzLl9wYXRoLl9tYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZmlyc3QpO1xuXG4gICAgdmFyIHggPSBjb250YWluZXJQb2ludC54O1xuICAgIHZhciB5ID0gY29udGFpbmVyUG9pbnQueTtcblxuICAgIHZhciBkeCA9IHggLSB0aGlzLl9zdGFydFBvaW50Lng7XG4gICAgdmFyIGR5ID0geSAtIHRoaXMuX3N0YXJ0UG9pbnQueTtcblxuICAgIGlmICghdGhpcy5fcGF0aC5fZHJhZ01vdmVkICYmIChkeCB8fCBkeSkpIHtcbiAgICAgIHRoaXMuX3BhdGguX2RyYWdNb3ZlZCA9IHRydWU7XG4gICAgICB0aGlzLl9wYXRoLmZpcmUoJ2RyYWdzdGFydCcsIGV2dCk7XG4gICAgICAvLyB3ZSBkb24ndCB3YW50IHRoYXQgdG8gaGFwcGVuIG9uIGNsaWNrXG4gICAgICB0aGlzLl9wYXRoLmJyaW5nVG9Gcm9udCgpO1xuICAgIH1cblxuICAgIHRoaXMuX21hdHJpeFs0XSArPSBkeDtcbiAgICB0aGlzLl9tYXRyaXhbNV0gKz0gZHk7XG5cbiAgICB0aGlzLl9zdGFydFBvaW50LnggPSB4O1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQueSA9IHk7XG5cbiAgICB0aGlzLl9wYXRoLmZpcmUoJ3ByZWRyYWcnLCBldnQpO1xuICAgIHRoaXMuX3BhdGgudHJhbnNmb3JtKHRoaXMuX21hdHJpeCk7XG4gICAgdGhpcy5fcGF0aC5maXJlKCdkcmFnJywgZXZ0KTtcbiAgfSxcblxuICAvKipcbiAgICogRHJhZ2dpbmcgc3RvcHBlZCwgYXBwbHlcbiAgICogQHBhcmFtICB7TC5Nb3VzZUV2ZW50fSBldnRcbiAgICovXG4gIF9vbkRyYWdFbmQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgIHZhciBldmVudFR5cGUgPSBldnQudHlwZTtcbiAgICB2YXIgY29udGFpbmVyUG9pbnQgPSB0aGlzLl9wYXRoLl9tYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZXZ0KTtcblxuICAgIC8vIGFwcGx5IG1hdHJpeFxuICAgIGlmICh0aGlzLm1vdmVkKCkpIHtcbiAgICAgIHRoaXMuX3RyYW5zZm9ybVBvaW50cyh0aGlzLl9tYXRyaXgpO1xuICAgICAgdGhpcy5fcGF0aC5fcHJvamVjdCgpO1xuICAgICAgdGhpcy5fcGF0aC50cmFuc2Zvcm0obnVsbCk7XG4gICAgfVxuXG4gICAgTC5Eb21FdmVudFxuICAgICAgLm9mZihkb2N1bWVudCwgJ21vdXNlbW92ZSB0b3VjaG1vdmUnLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgICAub2ZmKGRvY3VtZW50LCAnbW91c2V1cCB0b3VjaGVuZCcsIHRoaXMuX29uRHJhZ0VuZCwgdGhpcyk7XG5cbiAgICAvLyBjb25zaXN0ZW5jeVxuICAgIHRoaXMuX3BhdGguZmlyZSgnZHJhZ2VuZCcsIHtcbiAgICAgIGRpc3RhbmNlOiBNYXRoLnNxcnQoXG4gICAgICAgIEwuTGluZVV0aWwuX3NxRGlzdCh0aGlzLl9kcmFnU3RhcnRQb2ludCwgY29udGFpbmVyUG9pbnQpXG4gICAgICApXG4gICAgfSk7XG5cbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSBudWxsO1xuICAgIHRoaXMuX2RyYWdTdGFydFBvaW50ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdHJhbnNmb3JtYXRpb24sIGRvZXMgaXQgaW4gb25lIHN3ZWVwIGZvciBwZXJmb3JtYW5jZSxcbiAgICogc28gZG9uJ3QgYmUgc3VycHJpc2VkIGFib3V0IHRoZSBjb2RlIHJlcGV0aXRpb24uXG4gICAqXG4gICAqIFsgeCBdICAgWyBhICBiICB0eCBdIFsgeCBdICAgWyBhICogeCArIGIgKiB5ICsgdHggXVxuICAgKiBbIHkgXSA9IFsgYyAgZCAgdHkgXSBbIHkgXSA9IFsgYyAqIHggKyBkICogeSArIHR5IF1cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG4gICAqL1xuICBfdHJhbnNmb3JtUG9pbnRzOiBmdW5jdGlvbihtYXRyaXgpIHtcbiAgICB2YXIgcGF0aCA9IHRoaXMuX3BhdGg7XG4gICAgdmFyIGksIGxlbiwgbGF0bG5nO1xuXG4gICAgdmFyIHB4ID0gTC5wb2ludChtYXRyaXhbNF0sIG1hdHJpeFs1XSk7XG5cbiAgICB2YXIgY3JzID0gcGF0aC5fbWFwLm9wdGlvbnMuY3JzO1xuICAgIHZhciB0cmFuc2Zvcm1hdGlvbiA9IGNycy50cmFuc2Zvcm1hdGlvbjtcbiAgICB2YXIgc2NhbGUgPSBjcnMuc2NhbGUocGF0aC5fbWFwLmdldFpvb20oKSk7XG4gICAgdmFyIHByb2plY3Rpb24gPSBjcnMucHJvamVjdGlvbjtcblxuICAgIHZhciBkaWZmID0gdHJhbnNmb3JtYXRpb24udW50cmFuc2Zvcm0ocHgsIHNjYWxlKVxuICAgICAgLnN1YnRyYWN0KHRyYW5zZm9ybWF0aW9uLnVudHJhbnNmb3JtKEwucG9pbnQoMCwgMCksIHNjYWxlKSk7XG5cbiAgICBwYXRoLl9ib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoKTtcblxuICAgIC8vIGNvbnNvbGUudGltZSgndHJhbnNmb3JtJyk7XG4gICAgLy8gYWxsIHNoaWZ0cyBhcmUgaW4tcGxhY2VcbiAgICBpZiAocGF0aC5fcG9pbnQpIHsgLy8gTC5DaXJjbGVcbiAgICAgIHBhdGguX2xhdGxuZyA9IHByb2plY3Rpb24udW5wcm9qZWN0KFxuICAgICAgICBwcm9qZWN0aW9uLnByb2plY3QocGF0aC5fbGF0bG5nKS5fYWRkKGRpZmYpKTtcbiAgICAgIHBhdGguX3BvaW50Ll9hZGQocHgpO1xuICAgIH0gZWxzZSBpZiAocGF0aC5fcmluZ3MgfHwgcGF0aC5fcGFydHMpIHsgLy8gZXZlcnl0aGluZyBlbHNlXG4gICAgICB2YXIgcmluZ3MgPSBwYXRoLl9yaW5ncyB8fCBwYXRoLl9wYXJ0cztcbiAgICAgIHZhciBsYXRsbmdzID0gcGF0aC5fbGF0bG5ncztcbiAgICAgIGlmICghTC5VdGlsLmlzQXJyYXkobGF0bG5nc1swXSkpIHsgLy8gcG9seWxpbmVcbiAgICAgICAgbGF0bG5ncyA9IFtsYXRsbmdzXTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJpbmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqaiA9IHJpbmdzW2ldLmxlbmd0aDsgaiA8IGpqOyBqKyspIHtcbiAgICAgICAgICBsYXRsbmcgPSBsYXRsbmdzW2ldW2pdO1xuICAgICAgICAgIGxhdGxuZ3NbaV1bal0gPSBwcm9qZWN0aW9uXG4gICAgICAgICAgICAudW5wcm9qZWN0KHByb2plY3Rpb24ucHJvamVjdChsYXRsbmcpLl9hZGQoZGlmZikpO1xuICAgICAgICAgIHBhdGguX2JvdW5kcy5leHRlbmQobGF0bG5nc1tpXVtqXSk7XG4gICAgICAgICAgcmluZ3NbaV1bal0uX2FkZChweCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY29uc29sZS50aW1lRW5kKCd0cmFuc2Zvcm0nKTtcblxuICAgIHBhdGguX3VwZGF0ZVBhdGgoKTtcbiAgfVxuXG59KTtcblxuTC5QYXRoLmFkZEluaXRIb29rKGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5vcHRpb25zLmRyYWdnYWJsZSkge1xuICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gbmV3IEwuSGFuZGxlci5QYXRoRHJhZyh0aGlzKTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICB0aGlzLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgfVxufSk7XG4iLCIvKipcbiAqIE1hdHJpeCB0cmFuc2Zvcm0gcGF0aCBmb3IgU1ZHL1ZNTFxuICogVE9ETzogYWRhcHQgdG8gTGVhZmxldCAwLjggdXBvbiByZWxlYXNlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFJlbmRlcmVyLWluZGVwZW5kZW50XG5MLlBhdGguaW5jbHVkZSh7XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgbWF0cml4IHRyYW5zZm9ybWF0aW9uIHRvIFNWR1xuXHQgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+P30gbWF0cml4XG5cdCAqL1xuXHR0cmFuc2Zvcm06IGZ1bmN0aW9uKG1hdHJpeCkge1xuXHRcdGlmICh0aGlzLl9yZW5kZXJlcikge1xuXHRcdFx0aWYgKG1hdHJpeCkge1xuXHRcdFx0XHR0aGlzLl9yZW5kZXJlci50cmFuc2Zvcm1QYXRoKHRoaXMsIG1hdHJpeCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyByZXNldCB0cmFuc2Zvcm0gbWF0cml4XG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVyLl9yZXNldFRyYW5zZm9ybVBhdGgodGhpcyk7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKipcblx0ICogQ2hlY2sgaWYgdGhlIGZlYXR1cmUgd2FzIGRyYWdnZWQsIHRoYXQnbGwgc3VwcmVzcyB0aGUgY2xpY2sgZXZlbnRcblx0ICogb24gbW91c2V1cC4gVGhhdCBmaXhlcyBwb3B1cHMgZm9yIGV4YW1wbGVcblx0ICpcblx0ICogQHBhcmFtICB7TW91c2VFdmVudH0gZVxuXHQgKi9cblx0X29uTW91c2VDbGljazogZnVuY3Rpb24oZSkge1xuXHRcdGlmICgodGhpcy5kcmFnZ2luZyAmJiB0aGlzLmRyYWdnaW5nLm1vdmVkKCkpIHx8XG5cdFx0XHQodGhpcy5fbWFwLmRyYWdnaW5nICYmIHRoaXMuX21hcC5kcmFnZ2luZy5tb3ZlZCgpKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX2ZpcmVNb3VzZUV2ZW50KGUpO1xuXHR9XG5cbn0pO1xuIiwiTC5TVkcuaW5jbHVkZSghTC5Ccm93c2VyLnZtbCA/IHt9IDoge1xuXG5cdC8qKlxuXHQgKiBSZXNldCB0cmFuc2Zvcm0gbWF0cml4XG5cdCAqL1xuXHRfcmVzZXRUcmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllcikge1xuXHRcdGlmIChsYXllci5fc2tldykge1xuXHRcdFx0Ly8gc3VwZXIgaW1wb3J0YW50ISB3b3JrYXJvdW5kIGZvciBhICdqdW1waW5nJyBnbGl0Y2g6XG5cdFx0XHQvLyBkaXNhYmxlIHRyYW5zZm9ybSBiZWZvcmUgcmVtb3ZpbmcgaXRcblx0XHRcdGxheWVyLl9za2V3Lm9uID0gZmFsc2U7XG5cdFx0XHRsYXllci5fcGF0aC5yZW1vdmVDaGlsZChsYXllci5fc2tldyk7XG5cdFx0XHRsYXllci5fc2tldyA9IG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBWTUxcblx0ICogQHBhcmFtIHtMLlBhdGh9ICAgICAgICAgbGF5ZXJcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG5cdCAqL1xuXHR0cmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllciwgbWF0cml4KSB7XG5cdFx0dmFyIHNrZXcgPSBsYXllci5fc2tldztcblxuXHRcdGlmICghc2tldykge1xuXHRcdFx0c2tldyA9IEwuU1ZHLmNyZWF0ZSgnc2tldycpO1xuXHRcdFx0bGF5ZXIuX3BhdGguYXBwZW5kQ2hpbGQoc2tldyk7XG5cdFx0XHRza2V3LnN0eWxlLmJlaGF2aW9yID0gJ3VybCgjZGVmYXVsdCNWTUwpJztcblx0XHRcdGxheWVyLl9za2V3ID0gc2tldztcblx0XHR9XG5cblx0XHQvLyBoYW5kbGUgc2tldy90cmFuc2xhdGUgc2VwYXJhdGVseSwgY2F1c2UgaXQncyBicm9rZW5cblx0XHR2YXIgbXQgPSBtYXRyaXhbMF0udG9GaXhlZCg4KSArIFwiIFwiICsgbWF0cml4WzFdLnRvRml4ZWQoOCkgKyBcIiBcIiArXG5cdFx0XHRtYXRyaXhbMl0udG9GaXhlZCg4KSArIFwiIFwiICsgbWF0cml4WzNdLnRvRml4ZWQoOCkgKyBcIiAwIDBcIjtcblx0XHR2YXIgb2Zmc2V0ID0gTWF0aC5mbG9vcihtYXRyaXhbNF0pLnRvRml4ZWQoKSArIFwiLCBcIiArXG5cdFx0XHRNYXRoLmZsb29yKG1hdHJpeFs1XSkudG9GaXhlZCgpICsgXCJcIjtcblxuXHRcdHZhciBzID0gdGhpcy5fcGF0aC5zdHlsZTtcblx0XHR2YXIgbCA9IHBhcnNlRmxvYXQocy5sZWZ0KTtcblx0XHR2YXIgdCA9IHBhcnNlRmxvYXQocy50b3ApO1xuXHRcdHZhciB3ID0gcGFyc2VGbG9hdChzLndpZHRoKTtcblx0XHR2YXIgaCA9IHBhcnNlRmxvYXQocy5oZWlnaHQpO1xuXG5cdFx0aWYgKGlzTmFOKGwpKSBsID0gMDtcblx0XHRpZiAoaXNOYU4odCkpIHQgPSAwO1xuXHRcdGlmIChpc05hTih3KSB8fCAhdykgdyA9IDE7XG5cdFx0aWYgKGlzTmFOKGgpIHx8ICFoKSBoID0gMTtcblxuXHRcdHZhciBvcmlnaW4gPSAoLWwgLyB3IC0gMC41KS50b0ZpeGVkKDgpICsgXCIgXCIgKyAoLXQgLyBoIC0gMC41KS50b0ZpeGVkKDgpO1xuXG5cdFx0c2tldy5vbiA9IFwiZlwiO1xuXHRcdHNrZXcubWF0cml4ID0gbXQ7XG5cdFx0c2tldy5vcmlnaW4gPSBvcmlnaW47XG5cdFx0c2tldy5vZmZzZXQgPSBvZmZzZXQ7XG5cdFx0c2tldy5vbiA9IHRydWU7XG5cdH1cblxufSk7XG4iLCJMLlNWRy5pbmNsdWRlKHtcblxuXHQvKipcblx0ICogUmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHQgKi9cblx0X3Jlc2V0VHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIpIHtcblx0XHRsYXllci5fcGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndHJhbnNmb3JtJywgJycpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBTVkdcblx0ICogQHBhcmFtIHtMLlBhdGh9ICAgICAgICAgbGF5ZXJcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG5cdCAqL1xuXHR0cmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllciwgbWF0cml4KSB7XG5cdFx0bGF5ZXIuX3BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ0cmFuc2Zvcm1cIixcblx0XHRcdCdtYXRyaXgoJyArIG1hdHJpeC5qb2luKCcgJykgKyAnKScpO1xuXHR9XG5cbn0pO1xuIl19
