(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/w8r/Projects/Leaflet.Path.Drag/example/js/app.js":[function(require,module,exports){
(function (global){
var L = global.L;
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
	renderer: renderer,
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

		if (!copy) {
			copy = this._containerCopy = document.createElement('canvas');
			copy.width = this._container.width;
			copy.height = this._container.height;

			layer._removed = true;
			this._redraw();

			copy.getContext('2d').translate(this._bounds.min.x, this._bounds.min.y);
			copy.getContext('2d').drawImage(this._container, 0, 0);
			this._initPath(layer);
			layer._containsPoint_ = layer._containsPoint;
			layer._containsPoint = L.Util.trueFn;
		}

		ctx.save();
		ctx.clearRect(0, 0, copy.width, copy.height);
		ctx.drawImage(this._containerCopy, 0, 0);
		ctx.transform.apply(this._ctx, matrix);

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
		this._mapDraggingWasEnabled = false;
		this._startPoint = evt.containerPoint.clone();
		this._dragStartPoint = evt.containerPoint.clone();
		this._matrix = [1, 0, 0, 1, 0, 0];
		L.DomEvent.stop(evt.originalEvent);

		L.DomUtil.addClass(this._path._renderer._container, 'leaflet-interactive');

		this._path._map.on('mousemove', this._onDrag, this);
		this._path
			.on('mousemove', this._onDrag, this)
			.on('mouseup', this._onDragEnd, this);

		if (this._path._map.dragging.enabled()) {
			this._mapDraggingWasEnabled = true;
			this._path._map.dragging.disable();
		}
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
			// we don't want that to happen on click
			this._path.bringToFront();
		}

		this._matrix[4] += dx;
		this._matrix[5] += dy;

		this._startPoint.x = x;
		this._startPoint.y = y;

		this._path.transform(this._matrix);
		this._path.fire('drag');
		L.DomEvent.stop(evt.originalEvent);
	},

	/**
	 * Dragging stopped, apply
	 * @param  {L.MouseEvent} evt
	 */
	_onDragEnd: function(evt) {
		// apply matrix
		if (this.moved()) {
			this._transformPoints(this._matrix);
			this._path._project();
			this._path.transform(null);
		}

		this._path._map.off('mousemove', this._onDrag, this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiZXhhbXBsZS9qcy9hcHAuanMiLCJpbmRleC5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvUGF0aC5EcmFnLmpzIiwic3JjL1BhdGguVHJhbnNmb3JtLmpzIiwic3JjL1NWRy5WTUwuanMiLCJzcmMvU1ZHLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDM05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEwgPSBnbG9iYWwuTDtcbnZhciBEcmFnSGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7XG5cbkwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCA9IFwibGVhZmxldC1tYXN0ZXIvaW1hZ2VzXCI7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbWFwID0gZ2xvYmFsLm1hcCA9IG5ldyBMLk1hcCgnbWFwJywge1xuXHQvLyBjcnM6IEwuQ1JTLkVQU0c0MzI2IC8vIHRoYXQgd2FzIHRlc3RlZCBhcyB3ZWxsXG59KS5zZXRWaWV3KFsyMi40MjY1OCwgMTE0LjE5NTJdLCAxMSk7XG5cbnZhciByZW5kZXJlciA9IG5ldyBMLkNhbnZhcygpO1xuXG5MLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuXHRhdHRyaWJ1dGlvbjogJyZjb3B5OyAnICtcblx0XHQnPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcbn0pLmFkZFRvKG1hcCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFycihhcnJheSwgaW5zZXJ0KSB7XG5cdHZhciByZXMgPSBbXTtcblx0YXJyYXkuZm9yRWFjaChmdW5jdGlvbihwLCBpLCBhcnIpIHtcblx0XHRyZXMucHVzaChwLmNvbmNhdCgpKTtcblxuXHRcdGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpIHtcblx0XHRcdHZhciBkaWZmID0gW2FycltpICsgMV1bMF0gLSBwWzBdLCBhcnJbaSArIDFdWzFdIC0gcFsxXV07XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8IGluc2VydDsgaSsrKSB7XG5cdFx0XHRcdHJlcy5wdXNoKFtwWzBdICsgKGRpZmZbMF0gKiBpKSAvIGluc2VydCwgcFsxXSArIChkaWZmWzFdICogaSkgLyBpbnNlcnRdKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiByZXM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgcG9seWdvbiA9IGdsb2JhbC5wb2x5Z29uID0gbmV3IEwuUG9seWdvbihcblx0TC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhcblxuXHRcdC8vIH4gMTMgMDAwIHBvaW50c1xuXHRcdGludGVycG9sYXRlQXJyKFtcblx0XHRcdFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF0sXG5cdFx0XHRbMTEzLjk4NjU4NzUyNDQxNDA1LCAyMi4zODM3MzAwODU5MjQ5NV0sXG5cdFx0XHRbMTE0LjAxMjY4MDA1MzcxMDk0LCAyMi4zNjkxMjYzOTc1NDU4ODddLFxuXHRcdFx0WzExNC4wMjc3ODYyNTQ4ODI4MSwgMjIuMzg1NjM0ODAxODU3MThdLFxuXHRcdFx0WzExNC4wNDcwMTIzMjkxMDE1NiwgMjIuMzk1MTU3OTkwMjkwNzU1XSxcblx0XHRcdFsxMTQuMDYwMDU4NTkzNzUsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG5cdFx0XHRbMTE0LjA2MjgwNTE3NTc4MTI1LCAyMi40MzI2MDk1MzQ4NzY3OTZdLFxuXHRcdFx0WzExNC4wNDgzODU2MjAxMTcxNywgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcblx0XHRcdFsxMTQuMDQyODkyNDU2MDU0NjksIDIyLjQ0ODQ3NTc4NjU2NTQ0XSxcblx0XHRcdFsxMTQuMDMyNTkyNzczNDM3NDksIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG5cdFx0XHRbMTE0LjAxOTU0NjUwODc4OTA2LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuXHRcdFx0WzExMy45OTYyMDA1NjE1MjM0NCwgMjIuNDM2NDE3NjAwNzYzMTE0XSxcblx0XHRcdFsxMTMuOTgxNzgxMDA1ODU5MzgsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG5cdFx0XHRbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdXG5cdFx0XSwgMTAwMClcblx0KSwge1xuXHRcdGNvbG9yOiAnI2YwMCcsXG5cdFx0ZHJhZ2dhYmxlOiB0cnVlLFxuXHRcdHJlbmRlcmVyOiByZW5kZXJlclxuXHR9KS5hZGRUbyhtYXApO1xuXG52YXIgcG9seWxpbmUgPSBnbG9iYWwucG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShcblx0XHRMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcblx0XHRcdFsxMTQuMTQzMTQyNzAwMTk1MzEsIDIyLjQ5NDc5NDg0OTc1NDQzXSxcblx0XHRcdFsxMTQuMTUzNDQyMzgyODEyNSwgMjIuNDg1OTEyOTQyMzIwOTU4XSxcblx0XHRcdFsxMTQuMTUyMDY5MDkxNzk2ODgsIDIyLjQ3MzIyMzUxNDQ3ODFdLFxuXHRcdFx0WzExNC4xNDkzMjI1MDk3NjU2MSwgMjIuNDU5ODk4MzYzOTQzODkzXSxcblx0XHRcdFsxMTQuMTU5NjIyMTkyMzgyODEsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG5cdFx0XHRbMTE0LjE2OTkyMTg3NSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcblx0XHRcdFsxMTQuMTkzOTU0NDY3NzczNDQsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG5cdFx0XHRbMTE0LjIwNjMxNDA4NjkxNDA2LCAyMi40NjExNjc0ODExMDkzNV0sXG5cdFx0XHRbMTE0LjIxMTgwNzI1MDk3NjU1LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuXHRcdFx0WzExNC4yMjQxNjY4NzAxMTcxOSwgMjIuNDcxMzIwMDAwMDA5OTkyXSxcblx0XHRcdFsxMTQuMjM3MjEzMTM0NzY1NjIsIDIyLjQ3NjM5NTk4MDQ1Nzk3M10sXG5cdFx0XHRbMTE0LjI0MjAxOTY1MzMyMDMxLCAyMi40OTM1MjYwNDA3MzcyMl0sXG5cdFx0XHRbMTE0LjIzMDM0NjY3OTY4NzUsIDIyLjUxNTcyODUxODMwMzUxXSxcblx0XHRcdFsxMTQuMjE3OTg3MDYwNTQ2ODgsIDIyLjUyNDYwODUxMTAyNjI2Ml0sXG5cdFx0XHRbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuXHRcdFx0WzExNC4yMDc2ODczNzc5Mjk2OSwgMjIuNTM2MDI0ODA1ODg2OTc0XVxuXHRcdF0pLCB7XG5cdFx0XHR3ZWlnaHQ6IDE1LFxuXHRcdFx0ZHJhZ2dhYmxlOiB0cnVlXG5cdFx0fSlcblx0LmFkZFRvKG1hcClcblx0LmJpbmRQb3B1cChcIkknbSBhIHBvbHlsaW5lXCIpO1xuXG52YXIgcG9seWdvbldpdGhIb2xlID0gZ2xvYmFsLnBvbHlnb25XaXRoSG9sZSA9IG5ldyBMLlBvbHlnb24oXG5cdFx0W1xuXHRcdFx0TC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG5cdFx0XHRcdFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDEyOTMyODYzNTE3NzE3XSxcblx0XHRcdFx0WzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDAwODcxNTkwMzA1OTVdLFxuXHRcdFx0XHRbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4zODg4MDkyNzA0NTU1Nl0sXG5cdFx0XHRcdFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjM4MjQ2MDI2MDgxNTcxNl0sXG5cdFx0XHRcdFsxMTQuMzE4OTIzOTUwMTk1MzEsIDIyLjM5MTk4MzY2NjYwMjc4M10sXG5cdFx0XHRcdFsxMTQuMzIzMDQzODIzMjQyMTksIDIyLjM4MDU1NTUwMTQyMTUzM10sXG5cdFx0XHRcdFsxMTQuMzQyOTU2NTQyOTY4NzUsIDIyLjM3MjkzNjIwMzExMzgzOF0sXG5cdFx0XHRcdFsxMTQuMzM0NzE2Nzk2ODc1LCAyMi4zODQzNjQ5OTQxMzMzMDNdLFxuXHRcdFx0XHRbMTE0LjMzMDU5NjkyMzgyODEyLCAyMi4zOTM4ODgyNjk1MTExOTRdLFxuXHRcdFx0XHRbMTE0LjMyMTY3MDUzMjIyNjU1LCAyMi40MDA4NzE1OTAzMDU5NV0sXG5cdFx0XHRcdFsxMTQuMzI3ODUwMzQxNzk2ODgsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG5cdFx0XHRcdFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQyNDk5MzA4OTY0NzIyXSxcblx0XHRcdFx0WzExNC4zMjU3OTA0MDUyNzM0NCwgMjIuNDMwNzA1NDYyNzQ4OTE4XSxcblx0XHRcdFx0WzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDM5NTkwOTA5MTcyNjZdLFxuXHRcdFx0XHRbMTE0LjMzNzQ2MzM3ODkwNjI0LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuXHRcdFx0XHRbMTE0LjMzNTQwMzQ0MjM4MjgxLCAyMi40NjE4MDIwMzUzMzM5OTJdLFxuXHRcdFx0XHRbMTE0LjMyNTEwMzc1OTc2NTYyLCAyMi40NjQzNDAyMjMxNzcxMThdLFxuXHRcdFx0XHRbMTE0LjMyOTIyMzYzMjgxMjQ5LCAyMi40NzI1ODkwMTI1NjE5NTRdLFxuXHRcdFx0XHRbMTE0LjMyMzczMDQ2ODc1LCAyMi40NzcwMzA0NjQ5MzMzMDddLFxuXHRcdFx0XHRbMTE0LjMxOTYxMDU5NTcwMzEyLCAyMi40Nzg5MzM5MDA5MTY5MjhdLFxuXHRcdFx0XHRbMTE0LjMwMTc1NzgxMjUsIDIyLjQ2NjI0MzgzMzU0OTQ0NV0sXG5cdFx0XHRcdFsxMTQuMzAyNDQ0NDU4MDA3ODEsIDIyLjQ1NzM2MDA5NDc1MDA4M10sXG5cdFx0XHRcdFsxMTQuMjkyODMxNDIwODk4NDQsIDIyLjQ1NDgyMTc3OTA3NTgzMl0sXG5cdFx0XHRcdFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQ1MTAxNDIxODQyMjY5XSxcblx0XHRcdFx0WzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40NDI3NjQxNDUwMDE3MDddLFxuXHRcdFx0XHRbMTE0LjI5MDc3MTQ4NDM3NDk5LCAyMi40MjgxNjY2NTkyNzk2MTVdLFxuXHRcdFx0XHRbMTE0LjI3NzAzODU3NDIxODc1LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuXHRcdFx0XHRbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQxMjkzMjg2MzUxNzcxN11cblx0XHRcdF0pLFxuXHRcdFx0TC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG5cdFx0XHRcdFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XSxcblx0XHRcdFx0WzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuNDE0MjAyNDEwMzIxMzAyXSxcblx0XHRcdFx0WzExNC4zMDU4Nzc2ODU1NDY4NiwgMjIuNDA4NDg5MzU4MzQyNjM1XSxcblx0XHRcdFx0WzExNC4zMjIzNTcxNzc3MzQzOCwgMjIuNDIxMTg0NzEwMzMxODU4XSxcblx0XHRcdFx0WzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddXG5cdFx0XHRdKVxuXHRcdF0sIHtcblx0XHRcdGRyYWdnYWJsZTogdHJ1ZSxcblx0XHRcdHJlbmRlcmVyOiByZW5kZXJlclxuXHRcdH1cblx0KVxuXHQuYWRkVG8obWFwKVxuXHQuYmluZFBvcHVwKFwiSSdtIGEgcG9seWdvbiB3aXRoIGhvbGVcIik7XG5cbnZhciBjaXJjbGUgPSBuZXcgTC5DaXJjbGUoWzIyLjM2MDg5NzI0MDEzMjM3MywgMTE0LjE0NTIwMjYzNjcxODc1XSwgNDAwMCwge1xuXHRcdGRyYWdnYWJsZTogdHJ1ZVxuXHR9KVxuXHQuYmluZFBvcHVwKFwiTC5DaXJjbGVcIilcblx0LmFkZFRvKG1hcClcblxudmFyIGNpcmNsZU1hcmtlciA9IG5ldyBMLkNpcmNsZU1hcmtlcihtYXAuZ2V0Q2VudGVyKCksIHtcblx0XHRkcmFnZ2FibGU6IHRydWUsXG5cdFx0cmVuZGVyZXI6IHJlbmRlcmVyXG5cdH0pXG5cdC5iaW5kUG9wdXAoXCJMLkNpcmNsZU1hcmtlclwiKVxuXHQuYWRkVG8obWFwKTtcblxudmFyIG11bHRpUG9seWdvbiA9IGdsb2JhbC5tdWx0aVBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKFtcblx0TC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG5cdFx0WzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdLFxuXHRcdFsxMTQuMjE1OTI3MTI0MDIzNDQsIDIyLjM1MjYxNjAzNTUxMjE1XSxcblx0XHRbMTE0LjI2NDY3ODk1NTA3ODEyLCAyMi4zNTEzNDU5MjY2MDY5NTddLFxuXHRcdFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuMzI0MDM1Nzg1ODQwMzhdLFxuXHRcdFsxMTQuMjkyMTQ0Nzc1MzkwNjIsIDIyLjMyNzIxMTY1ODM4ODkzXSxcblx0XHRbMTE0LjMwMTc1NzgxMjUsIDIyLjMxMTk2NjgxMDk3NzYxNl0sXG5cdFx0WzExNC4yOTQyMDQ3MTE5MTQwNiwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcblx0XHRbMTE0LjI5MzUxODA2NjQwNjI1LCAyMi4yNzI1NzY1ODU0MTM0NzVdLFxuXHRcdFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjI2MTc3NDEwMDk3NDM1XSxcblx0XHRbMTE0LjI2ODc5ODgyODEyNSwgMjIuMjgxNDcyMTIyNzgzODE4XSxcblx0XHRbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjI5NDgxNDM2Nzc4MDUxOF0sXG5cdFx0WzExNC4yNjk0ODU0NzM2MzI4MSwgMjIuMzAyNDM3OTM1OTA0NDhdLFxuXHRcdFsxMTQuMjcwMTcyMTE5MTQwNjIsIDIyLjMxNTE0Mjk1ODE2OTM5XSxcblx0XHRbMTE0LjI1NzgxMjUsIDIyLjMxMTk2NjgxMDk3NzYxNl0sXG5cdFx0WzExNC4yNDc1MTI4MTczODI4MSwgMjIuMjk5ODk2NzkyNzUxOTI3XSxcblx0XHRbMTE0LjI0NTQ1Mjg4MDg1OTM4LCAyMi4yOTEwMDI0Mjc3MzUzMjVdLFxuXHRcdFsxMTQuMjI5NjYwMDM0MTc5NjksIDIyLjMwNzUyMDA4MzUyMjQ3Nl0sXG5cdFx0WzExNC4yMjA3MzM2NDI1NzgxMiwgMjIuMzA1NjE0Mjk5ODM3MDQ2XSxcblx0XHRbMTE0LjIwNTYyNzQ0MTQwNjI1LCAyMi4zMjA4NTk4NDEwMDU5M11cblx0XSksXG5cdEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuXHRcdFsxMTQuMzE1NDkwNzIyNjU2MjUsIDIyLjMzOTI3OTMxNDY4MzEyXSxcblx0XHRbMTE0LjMyMDI5NzI0MTIxMDk0LCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuXHRcdFsxMTQuMzI5OTEwMjc4MzIwMzEsIDIyLjMyNjU3NjQ4OTY2MjQ4Ml0sXG5cdFx0WzExNC4zMzMzNDM1MDU4NTkzOCwgMjIuMzMyMjkyOTA0MDkxNzE2XSxcblx0XHRbMTE0LjMyMzA0MzgyMzI0MjE5LCAyMi4zNDI0NTQ4NDAxNDY1XSxcblx0XHRbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl1cblx0XSksXG5cdEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuXHRcdFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF0sXG5cdFx0WzExNC4yODExNTg0NDcyNjU2MiwgMjIuMjUxNjA2Mjk1MTMyOTQ4XSxcblx0XHRbMTE0LjI4NjY1MTYxMTMyODEyLCAyMi4yNTU0MTkzMDg4NTg1NTZdLFxuXHRcdFsxMTQuMjk5Njk3ODc1OTc2NTYsIDIyLjI2MTEzODYzNDc0NDQ5XSxcblx0XHRbMTE0LjI5NjI2NDY0ODQzNzUsIDIyLjI1MDk3MDc4Mjc1MDg2Nl0sXG5cdFx0WzExNC4yOTQ4OTEzNTc0MjE4OCwgMjIuMjQwODAyMTkyNDYzMzVdLFxuXHRcdFsxMTQuMjkwMDg0ODM4ODY3MTcsIDIyLjIzODg5NTQ5OTYxMzIzMl0sXG5cdFx0WzExNC4yNzkwOTg1MTA3NDIxOSwgMjIuMjQ0NjE1NTAwMzIzMDY0XVxuXHRdKVxuXSwge1xuXHRkcmFnZ2FibGU6IHRydWUsXG5cdHJlbmRlcmVyOiByZW5kZXJlcixcblx0Y29sb3I6ICcjMDkyJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlnb24nKS5hZGRUbyhtYXApO1xuXG52YXIgbXVsdGlQb2x5bGluZSA9IGdsb2JhbC5tdWx0aVBvbHlsaW5lID0gbmV3IEwuUG9seWxpbmUoW1xuXHRMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcblx0XHRbMTEzLjg5ODY5Njg5OTQxNDA2LCAyMi4zOTk2MDE5MjE3MDY5NTNdLFxuXHRcdFsxMTMuODk4MDEwMjUzOTA2MjUsIDIyLjQyMjQ1NDE4MTcwOTcwN10sXG5cdFx0WzExMy45MDM1MDM0MTc5Njg3NSwgMjIuNDMzMjQ0MjE5NzgxMTddLFxuXHRcdFsxMTMuOTA5NjgzMjI3NTM5MDYsIDIyLjQ0OTExMDM5ODg4NjEwNl0sXG5cdFx0WzExMy45MDY5MzY2NDU1MDc4MSwgMjIuNDc4Mjk5NDI1MTYyODUyXSxcblx0XHRbMTEzLjkyMzQxNjEzNzY5NTMsIDIyLjQ4ODQ1MDY4ODMyNTQwOF0sXG5cdFx0WzExMy45MzM3MTU4MjAzMTI1LCAyMi40ODMzNzUxNDk3ODk2MjNdLFxuXHRcdFsxMTMuOTQ0NzAyMTQ4NDM3NSwgMjIuNDkyMjU3MjIwMDg1MTkzXSxcblx0XHRbMTEzLjk1MjI1NTI0OTAyMzQ0LCAyMi41MTI1NTY5NTQwNTE0NV1cblx0XSksXG5cblx0TC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG5cdFx0WzExMy44Njc3OTc4NTE1NjI1LCAyMi4zOTI2MTg1MzcxMzczOF0sXG5cdFx0WzExMy44NjkxNzExNDI1NzgxMSwgMjIuNDI3NTMxOTUxMTU2OTldLFxuXHRcdFsxMTMuOTIzNDE2MTM3Njk1MywgMjIuNDYyNDM2NTg2NjUzMTQ4XSxcblx0XHRbMTEzLjk0ODEzNTM3NTk3NjU2LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuXHRcdFsxMTMuOTc4MzQ3Nzc4MzIwMywgMjIuNDk5MjM1NTg5NjgzMDZdLFxuXHRcdFsxMTMuOTk2ODg3MjA3MDMxMjUsIDIyLjUxMTkyMjYzMjQ2ODg2XSxcblx0XHRbMTE0LjAxMzM2NjY5OTIxODc1LCAyMi41MDExMzg3MjAzMDAyNTRdLFxuXHRcdFsxMTQuMDI1MDM5NjcyODUxNTUsIDIyLjUwODExNjY0MTg1MzY3NV1cblx0XSlcbl0sIHtcblx0ZHJhZ2dhYmxlOiB0cnVlLFxuXHRjb2xvcjogJyNlOTAnXG59KS5iaW5kUG9wdXAoJ011bHRpUG9seWxpbmUnKS5hZGRUbyhtYXApO1xuIiwicmVxdWlyZSgnLi9zcmMvU1ZHJyk7XG5yZXF1aXJlKCcuL3NyYy9TVkcuVk1MJyk7XG5yZXF1aXJlKCcuL3NyYy9DYW52YXMnKTtcbnJlcXVpcmUoJy4vc3JjL1BhdGguVHJhbnNmb3JtJyk7XG5yZXF1aXJlKCcuL3NyYy9QYXRoLkRyYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBMLlBhdGguRHJhZztcbiIsIkwuVXRpbC50cnVlRm4gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRydWU7XG59O1xuXG5MLkNhbnZhcy5pbmNsdWRlKHtcblxuXHQvKipcblx0ICogRG8gbm90aGluZ1xuXHQgKiBAcGFyYW0gIHtMLlBhdGh9IGxheWVyXG5cdCAqL1xuXHRfcmVzZXRUcmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllcikge1xuXHRcdGlmICghdGhpcy5fY29udGFpbmVyQ29weSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRkZWxldGUgdGhpcy5fY29udGFpbmVyQ29weTtcblxuXHRcdGlmIChsYXllci5fY29udGFpbnNQb2ludF8pIHtcblx0XHRcdGxheWVyLl9jb250YWluc1BvaW50ID0gbGF5ZXIuX2NvbnRhaW5zUG9pbnRfO1xuXHRcdFx0ZGVsZXRlIGxheWVyLl9jb250YWluc1BvaW50XztcblxuXHRcdFx0dGhpcy5fcmVxdWVzdFJlZHJhdyhsYXllcik7XG5cdFx0XHR0aGlzLl9kcmF3KHRydWUpO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogQWxnb3JpdGhtIG91dGxpbmU6XG5cdCAqXG5cdCAqIDEuIHByZS10cmFuc2Zvcm0gLSBjbGVhciB0aGUgcGF0aCBvdXQgb2YgdGhlIGNhbnZhcywgY29weSBjYW52YXMgc3RhdGVcblx0ICogMi4gYXQgZXZlcnkgZnJhbWU6XG5cdCAqICAgIDIuMS4gc2F2ZVxuXHQgKiAgICAyLjIuIHJlZHJhdyB0aGUgY2FudmFzIGZyb20gc2F2ZWQgb25lXG5cdCAqICAgIDIuMy4gdHJhbnNmb3JtXG5cdCAqICAgIDIuNC4gZHJhdyBwYXRoXG5cdCAqICAgIDIuNS4gcmVzdG9yZVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtMLlBhdGh9IGxheWVyXG5cdCAqIEBwYXJhbSAge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcblx0ICovXG5cdHRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyLCBtYXRyaXgpIHtcblx0XHR2YXIgY29weSA9IHRoaXMuX2NvbnRhaW5lckNvcHk7XG5cdFx0dmFyIGN0eCA9IHRoaXMuX2N0eDtcblxuXHRcdGlmICghY29weSkge1xuXHRcdFx0Y29weSA9IHRoaXMuX2NvbnRhaW5lckNvcHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblx0XHRcdGNvcHkud2lkdGggPSB0aGlzLl9jb250YWluZXIud2lkdGg7XG5cdFx0XHRjb3B5LmhlaWdodCA9IHRoaXMuX2NvbnRhaW5lci5oZWlnaHQ7XG5cblx0XHRcdGxheWVyLl9yZW1vdmVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuX3JlZHJhdygpO1xuXG5cdFx0XHRjb3B5LmdldENvbnRleHQoJzJkJykudHJhbnNsYXRlKHRoaXMuX2JvdW5kcy5taW4ueCwgdGhpcy5fYm91bmRzLm1pbi55KTtcblx0XHRcdGNvcHkuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodGhpcy5fY29udGFpbmVyLCAwLCAwKTtcblx0XHRcdHRoaXMuX2luaXRQYXRoKGxheWVyKTtcblx0XHRcdGxheWVyLl9jb250YWluc1BvaW50XyA9IGxheWVyLl9jb250YWluc1BvaW50O1xuXHRcdFx0bGF5ZXIuX2NvbnRhaW5zUG9pbnQgPSBMLlV0aWwudHJ1ZUZuO1xuXHRcdH1cblxuXHRcdGN0eC5zYXZlKCk7XG5cdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjb3B5LndpZHRoLCBjb3B5LmhlaWdodCk7XG5cdFx0Y3R4LmRyYXdJbWFnZSh0aGlzLl9jb250YWluZXJDb3B5LCAwLCAwKTtcblx0XHRjdHgudHJhbnNmb3JtLmFwcGx5KHRoaXMuX2N0eCwgbWF0cml4KTtcblxuXHRcdHZhciBsYXllcnMgPSB0aGlzLl9sYXllcnM7XG5cdFx0dGhpcy5fbGF5ZXJzID0ge307XG5cblx0XHR0aGlzLl9pbml0UGF0aChsYXllcik7XG5cdFx0bGF5ZXIuX3VwZGF0ZVBhdGgoKTtcblxuXHRcdHRoaXMuX2xheWVycyA9IGxheWVycztcblx0XHRjdHgucmVzdG9yZSgpO1xuXHR9XG5cbn0pO1xuIiwiLyoqXG4gKiBMZWFmbGV0IHZlY3RvciBmZWF0dXJlcyBkcmFnIGZ1bmN0aW9uYWxpdHlcbiAqIEBwcmVzZXJ2ZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIERyYWcgaGFuZGxlclxuICogQGNsYXNzIEwuUGF0aC5EcmFnXG4gKiBAZXh0ZW5kcyB7TC5IYW5kbGVyfVxuICovXG5MLkhhbmRsZXIuUGF0aERyYWcgPSBMLkhhbmRsZXIuZXh0ZW5kKCAvKiogQGxlbmRzICBMLlBhdGguRHJhZy5wcm90b3R5cGUgKi8ge1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0gIHtMLlBhdGh9IHBhdGhcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqL1xuXHRpbml0aWFsaXplOiBmdW5jdGlvbihwYXRoKSB7XG5cblx0XHQvKipcblx0XHQgKiBAdHlwZSB7TC5QYXRofVxuXHRcdCAqL1xuXHRcdHRoaXMuX3BhdGggPSBwYXRoO1xuXG5cdFx0LyoqXG5cdFx0ICogQHR5cGUge0FycmF5LjxOdW1iZXI+fVxuXHRcdCAqL1xuXHRcdHRoaXMuX21hdHJpeCA9IG51bGw7XG5cblx0XHQvKipcblx0XHQgKiBAdHlwZSB7TC5Qb2ludH1cblx0XHQgKi9cblx0XHR0aGlzLl9zdGFydFBvaW50ID0gbnVsbDtcblxuXHRcdC8qKlxuXHRcdCAqIEB0eXBlIHtMLlBvaW50fVxuXHRcdCAqL1xuXHRcdHRoaXMuX2RyYWdTdGFydFBvaW50ID0gbnVsbDtcblxuXHRcdC8qKlxuXHRcdCAqIEB0eXBlIHtCb29sZWFufVxuXHRcdCAqL1xuXHRcdHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCA9IGZhbHNlO1xuXG5cdH0sXG5cblx0LyoqXG5cdCAqIEVuYWJsZSBkcmFnZ2luZ1xuXHQgKi9cblx0YWRkSG9va3M6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuX3BhdGgub24oJ21vdXNlZG93bicsIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKTtcblx0XHRpZiAodGhpcy5fcGF0aC5fcGF0aCkge1xuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3BhdGguX3BhdGgsICdsZWFmbGV0LXBhdGgtZHJhZ2dhYmxlJyk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBEaXNhYmxlIGRyYWdnaW5nXG5cdCAqL1xuXHRyZW1vdmVIb29rczogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5fcGF0aC5vZmYoJ21vdXNlZG93bicsIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKTtcblx0XHRpZiAodGhpcy5fcGF0aC5fcGF0aCkge1xuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3BhdGguX3BhdGgsICdsZWFmbGV0LXBhdGgtZHJhZ2dhYmxlJyk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBAcmV0dXJuIHtCb29sZWFufVxuXHQgKi9cblx0bW92ZWQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLl9wYXRoLl9kcmFnTW92ZWQ7XG5cdH0sXG5cblx0LyoqXG5cdCAqIFN0YXJ0IGRyYWdcblx0ICogQHBhcmFtICB7TC5Nb3VzZUV2ZW50fSBldnRcblx0ICovXG5cdF9vbkRyYWdTdGFydDogZnVuY3Rpb24oZXZ0KSB7XG5cdFx0dGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkID0gZmFsc2U7XG5cdFx0dGhpcy5fc3RhcnRQb2ludCA9IGV2dC5jb250YWluZXJQb2ludC5jbG9uZSgpO1xuXHRcdHRoaXMuX2RyYWdTdGFydFBvaW50ID0gZXZ0LmNvbnRhaW5lclBvaW50LmNsb25lKCk7XG5cdFx0dGhpcy5fbWF0cml4ID0gWzEsIDAsIDAsIDEsIDAsIDBdO1xuXHRcdEwuRG9tRXZlbnQuc3RvcChldnQub3JpZ2luYWxFdmVudCk7XG5cblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fcGF0aC5fcmVuZGVyZXIuX2NvbnRhaW5lciwgJ2xlYWZsZXQtaW50ZXJhY3RpdmUnKTtcblxuXHRcdHRoaXMuX3BhdGguX21hcC5vbignbW91c2Vtb3ZlJywgdGhpcy5fb25EcmFnLCB0aGlzKTtcblx0XHR0aGlzLl9wYXRoXG5cdFx0XHQub24oJ21vdXNlbW92ZScsIHRoaXMuX29uRHJhZywgdGhpcylcblx0XHRcdC5vbignbW91c2V1cCcsIHRoaXMuX29uRHJhZ0VuZCwgdGhpcyk7XG5cblx0XHRpZiAodGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmVuYWJsZWQoKSkge1xuXHRcdFx0dGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG5cdFx0fVxuXHRcdHRoaXMuX3BhdGguX2RyYWdNb3ZlZCA9IGZhbHNlO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBEcmFnZ2luZ1xuXHQgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuXHQgKi9cblx0X29uRHJhZzogZnVuY3Rpb24oZXZ0KSB7XG5cdFx0dmFyIHggPSBldnQuY29udGFpbmVyUG9pbnQueDtcblx0XHR2YXIgeSA9IGV2dC5jb250YWluZXJQb2ludC55O1xuXG5cdFx0dmFyIGR4ID0geCAtIHRoaXMuX3N0YXJ0UG9pbnQueDtcblx0XHR2YXIgZHkgPSB5IC0gdGhpcy5fc3RhcnRQb2ludC55O1xuXG5cdFx0aWYgKCF0aGlzLl9wYXRoLl9kcmFnTW92ZWQgJiYgKGR4IHx8IGR5KSkge1xuXHRcdFx0dGhpcy5fcGF0aC5fZHJhZ01vdmVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuX3BhdGguZmlyZSgnZHJhZ3N0YXJ0Jyk7XG5cdFx0XHQvLyB3ZSBkb24ndCB3YW50IHRoYXQgdG8gaGFwcGVuIG9uIGNsaWNrXG5cdFx0XHR0aGlzLl9wYXRoLmJyaW5nVG9Gcm9udCgpO1xuXHRcdH1cblxuXHRcdHRoaXMuX21hdHJpeFs0XSArPSBkeDtcblx0XHR0aGlzLl9tYXRyaXhbNV0gKz0gZHk7XG5cblx0XHR0aGlzLl9zdGFydFBvaW50LnggPSB4O1xuXHRcdHRoaXMuX3N0YXJ0UG9pbnQueSA9IHk7XG5cblx0XHR0aGlzLl9wYXRoLnRyYW5zZm9ybSh0aGlzLl9tYXRyaXgpO1xuXHRcdHRoaXMuX3BhdGguZmlyZSgnZHJhZycpO1xuXHRcdEwuRG9tRXZlbnQuc3RvcChldnQub3JpZ2luYWxFdmVudCk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIERyYWdnaW5nIHN0b3BwZWQsIGFwcGx5XG5cdCAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG5cdCAqL1xuXHRfb25EcmFnRW5kOiBmdW5jdGlvbihldnQpIHtcblx0XHQvLyBhcHBseSBtYXRyaXhcblx0XHRpZiAodGhpcy5tb3ZlZCgpKSB7XG5cdFx0XHR0aGlzLl90cmFuc2Zvcm1Qb2ludHModGhpcy5fbWF0cml4KTtcblx0XHRcdHRoaXMuX3BhdGguX3Byb2plY3QoKTtcblx0XHRcdHRoaXMuX3BhdGgudHJhbnNmb3JtKG51bGwpO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BhdGguX21hcC5vZmYoJ21vdXNlbW92ZScsIHRoaXMuX29uRHJhZywgdGhpcyk7XG5cdFx0dGhpcy5fcGF0aFxuXHRcdFx0Lm9mZignbW91c2Vtb3ZlJywgdGhpcy5fb25EcmFnLCB0aGlzKVxuXHRcdFx0Lm9mZignbW91c2V1cCcsIHRoaXMuX29uRHJhZ0VuZCwgdGhpcyk7XG5cblx0XHQvLyBjb25zaXN0ZW5jeVxuXHRcdHRoaXMuX3BhdGguZmlyZSgnZHJhZ2VuZCcsIHtcblx0XHRcdGRpc3RhbmNlOiBNYXRoLnNxcnQoXG5cdFx0XHRcdEwuTGluZVV0aWwuX3NxRGlzdCh0aGlzLl9kcmFnU3RhcnRQb2ludCwgZXZ0LmNvbnRhaW5lclBvaW50KVxuXHRcdFx0KVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5fbWF0cml4ID0gbnVsbDtcblx0XHR0aGlzLl9zdGFydFBvaW50ID0gbnVsbDtcblx0XHR0aGlzLl9kcmFnU3RhcnRQb2ludCA9IG51bGw7XG5cblx0XHRpZiAodGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkKSB7XG5cdFx0XHR0aGlzLl9wYXRoLl9tYXAuZHJhZ2dpbmcuZW5hYmxlKCk7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIHRyYW5zZm9ybWF0aW9uLCBkb2VzIGl0IGluIG9uZSBzd2VlcCBmb3IgcGVyZm9ybWFuY2UsXG5cdCAqIHNvIGRvbid0IGJlIHN1cnByaXNlZCBhYm91dCB0aGUgY29kZSByZXBldGl0aW9uLlxuXHQgKlxuXHQgKiBbIHggXSAgIFsgYSAgYiAgdHggXSBbIHggXSAgIFsgYSAqIHggKyBiICogeSArIHR4IF1cblx0ICogWyB5IF0gPSBbIGMgIGQgIHR5IF0gWyB5IF0gPSBbIGMgKiB4ICsgZCAqIHkgKyB0eSBdXG5cdCAqXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuXHQgKi9cblx0X3RyYW5zZm9ybVBvaW50czogZnVuY3Rpb24obWF0cml4KSB7XG5cdFx0dmFyIHBhdGggPSB0aGlzLl9wYXRoO1xuXHRcdHZhciBpLCBsZW4sIGxhdGxuZztcblxuXHRcdHZhciBweCA9IEwucG9pbnQobWF0cml4WzRdLCBtYXRyaXhbNV0pO1xuXG5cdFx0dmFyIGNycyA9IHBhdGguX21hcC5vcHRpb25zLmNycztcblx0XHR2YXIgdHJhbnNmb3JtYXRpb24gPSBjcnMudHJhbnNmb3JtYXRpb247XG5cdFx0dmFyIHNjYWxlID0gY3JzLnNjYWxlKHBhdGguX21hcC5nZXRab29tKCkpO1xuXHRcdHZhciBwcm9qZWN0aW9uID0gY3JzLnByb2plY3Rpb247XG5cblx0XHR2YXIgZGlmZiA9IHRyYW5zZm9ybWF0aW9uLnVudHJhbnNmb3JtKHB4LCBzY2FsZSlcblx0XHRcdC5zdWJ0cmFjdCh0cmFuc2Zvcm1hdGlvbi51bnRyYW5zZm9ybShMLnBvaW50KDAsIDApLCBzY2FsZSkpO1xuXG5cdFx0cGF0aC5fYm91bmRzID0gbmV3IEwuTGF0TG5nQm91bmRzKCk7XG5cblx0XHQvLyBjb25zb2xlLnRpbWUoJ3RyYW5zZm9ybScpO1xuXHRcdC8vIGFsbCBzaGlmdHMgYXJlIGluLXBsYWNlXG5cdFx0aWYgKHBhdGguX3BvaW50KSB7IC8vIEwuQ2lyY2xlXG5cdFx0XHRwYXRoLl9sYXRsbmcgPSBwcm9qZWN0aW9uLnVucHJvamVjdChcblx0XHRcdFx0cHJvamVjdGlvbi5wcm9qZWN0KHBhdGguX2xhdGxuZykuX2FkZChkaWZmKSk7XG5cdFx0XHRwYXRoLl9wb2ludC5fYWRkKHB4KTtcblx0XHR9IGVsc2UgaWYgKHBhdGguX3JpbmdzIHx8IHBhdGguX3BhcnRzKSB7IC8vIGV2ZXJ5dGhpbmcgZWxzZVxuXHRcdFx0dmFyIHJpbmdzID0gcGF0aC5fcmluZ3MgfHwgcGF0aC5fcGFydHM7XG5cdFx0XHR2YXIgbGF0bG5ncyA9IHBhdGguX2xhdGxuZ3M7XG5cdFx0XHRpZiAoIUwuVXRpbC5pc0FycmF5KGxhdGxuZ3NbMF0pKSB7IC8vIHBvbHlsaW5lXG5cdFx0XHRcdGxhdGxuZ3MgPSBbbGF0bG5nc107XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGkgPSAwLCBsZW4gPSByaW5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMCwgamogPSByaW5nc1tpXS5sZW5ndGg7IGogPCBqajsgaisrKSB7XG5cdFx0XHRcdFx0bGF0bG5nID0gbGF0bG5nc1tpXVtqXTtcblx0XHRcdFx0XHRsYXRsbmdzW2ldW2pdID0gcHJvamVjdGlvblxuXHRcdFx0XHRcdFx0LnVucHJvamVjdChwcm9qZWN0aW9uLnByb2plY3QobGF0bG5nKS5fYWRkKGRpZmYpKTtcblx0XHRcdFx0XHRwYXRoLl9ib3VuZHMuZXh0ZW5kKGxhdGxuZ3NbaV1bal0pO1xuXHRcdFx0XHRcdHJpbmdzW2ldW2pdLl9hZGQocHgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIGNvbnNvbGUudGltZUVuZCgndHJhbnNmb3JtJyk7XG5cblx0XHRwYXRoLl91cGRhdGVQYXRoKCk7XG5cdH1cblxufSk7XG5cbkwuUGF0aC5hZGRJbml0SG9vayhmdW5jdGlvbigpIHtcblx0aWYgKHRoaXMub3B0aW9ucy5kcmFnZ2FibGUpIHtcblx0XHRpZiAodGhpcy5kcmFnZ2luZykge1xuXHRcdFx0dGhpcy5kcmFnZ2luZy5lbmFibGUoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IG5ldyBMLkhhbmRsZXIuUGF0aERyYWcodGhpcyk7XG5cdFx0XHR0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuXHRcdH1cblx0fSBlbHNlIGlmICh0aGlzLmRyYWdnaW5nKSB7XG5cdFx0dGhpcy5kcmFnZ2luZy5kaXNhYmxlKCk7XG5cdH1cbn0pO1xuIiwiLyoqXG4gKiBNYXRyaXggdHJhbnNmb3JtIHBhdGggZm9yIFNWRy9WTUxcbiAqIFRPRE86IGFkYXB0IHRvIExlYWZsZXQgMC44IHVwb24gcmVsZWFzZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vLyBSZW5kZXJlci1pbmRlcGVuZGVudFxuTC5QYXRoLmluY2x1ZGUoe1xuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBTVkdcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPj99IG1hdHJpeFxuXHQgKi9cblx0dHJhbnNmb3JtOiBmdW5jdGlvbihtYXRyaXgpIHtcblx0XHRpZiAodGhpcy5fcmVuZGVyZXIpIHtcblx0XHRcdGlmIChtYXRyaXgpIHtcblx0XHRcdFx0dGhpcy5fcmVuZGVyZXIudHJhbnNmb3JtUGF0aCh0aGlzLCBtYXRyaXgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gcmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHRcdFx0XHR0aGlzLl9yZW5kZXJlci5fcmVzZXRUcmFuc2Zvcm1QYXRoKHRoaXMpO1xuXHRcdFx0XHR0aGlzLl91cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHRoZSBmZWF0dXJlIHdhcyBkcmFnZ2VkLCB0aGF0J2xsIHN1cHJlc3MgdGhlIGNsaWNrIGV2ZW50XG5cdCAqIG9uIG1vdXNldXAuIFRoYXQgZml4ZXMgcG9wdXBzIGZvciBleGFtcGxlXG5cdCAqXG5cdCAqIEBwYXJhbSAge01vdXNlRXZlbnR9IGVcblx0ICovXG5cdF9vbk1vdXNlQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoKHRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5kcmFnZ2luZy5tb3ZlZCgpKSB8fFxuXHRcdFx0KHRoaXMuX21hcC5kcmFnZ2luZyAmJiB0aGlzLl9tYXAuZHJhZ2dpbmcubW92ZWQoKSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9maXJlTW91c2VFdmVudChlKTtcblx0fVxuXG59KTtcbiIsIkwuU1ZHLmluY2x1ZGUoIUwuQnJvd3Nlci52bWwgPyB7fSA6IHtcblxuXHQvKipcblx0ICogUmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHQgKi9cblx0X3Jlc2V0VHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIpIHtcblx0XHRpZiAobGF5ZXIuX3NrZXcpIHtcblx0XHRcdC8vIHN1cGVyIGltcG9ydGFudCEgd29ya2Fyb3VuZCBmb3IgYSAnanVtcGluZycgZ2xpdGNoOlxuXHRcdFx0Ly8gZGlzYWJsZSB0cmFuc2Zvcm0gYmVmb3JlIHJlbW92aW5nIGl0XG5cdFx0XHRsYXllci5fc2tldy5vbiA9IGZhbHNlO1xuXHRcdFx0bGF5ZXIuX3BhdGgucmVtb3ZlQ2hpbGQobGF5ZXIuX3NrZXcpO1xuXHRcdFx0bGF5ZXIuX3NrZXcgPSBudWxsO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gVk1MXG5cdCAqIEBwYXJhbSB7TC5QYXRofSAgICAgICAgIGxheWVyXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuXHQgKi9cblx0dHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuXHRcdHZhciBza2V3ID0gbGF5ZXIuX3NrZXc7XG5cblx0XHRpZiAoIXNrZXcpIHtcblx0XHRcdHNrZXcgPSBMLlNWRy5jcmVhdGUoJ3NrZXcnKTtcblx0XHRcdGxheWVyLl9wYXRoLmFwcGVuZENoaWxkKHNrZXcpO1xuXHRcdFx0c2tldy5zdHlsZS5iZWhhdmlvciA9ICd1cmwoI2RlZmF1bHQjVk1MKSc7XG5cdFx0XHRsYXllci5fc2tldyA9IHNrZXc7XG5cdFx0fVxuXG5cdFx0Ly8gaGFuZGxlIHNrZXcvdHJhbnNsYXRlIHNlcGFyYXRlbHksIGNhdXNlIGl0J3MgYnJva2VuXG5cdFx0dmFyIG10ID0gbWF0cml4WzBdLnRvRml4ZWQoOCkgKyBcIiBcIiArIG1hdHJpeFsxXS50b0ZpeGVkKDgpICsgXCIgXCIgK1xuXHRcdFx0bWF0cml4WzJdLnRvRml4ZWQoOCkgKyBcIiBcIiArIG1hdHJpeFszXS50b0ZpeGVkKDgpICsgXCIgMCAwXCI7XG5cdFx0dmFyIG9mZnNldCA9IE1hdGguZmxvb3IobWF0cml4WzRdKS50b0ZpeGVkKCkgKyBcIiwgXCIgK1xuXHRcdFx0TWF0aC5mbG9vcihtYXRyaXhbNV0pLnRvRml4ZWQoKSArIFwiXCI7XG5cblx0XHR2YXIgcyA9IHRoaXMuX3BhdGguc3R5bGU7XG5cdFx0dmFyIGwgPSBwYXJzZUZsb2F0KHMubGVmdCk7XG5cdFx0dmFyIHQgPSBwYXJzZUZsb2F0KHMudG9wKTtcblx0XHR2YXIgdyA9IHBhcnNlRmxvYXQocy53aWR0aCk7XG5cdFx0dmFyIGggPSBwYXJzZUZsb2F0KHMuaGVpZ2h0KTtcblxuXHRcdGlmIChpc05hTihsKSkgbCA9IDA7XG5cdFx0aWYgKGlzTmFOKHQpKSB0ID0gMDtcblx0XHRpZiAoaXNOYU4odykgfHwgIXcpIHcgPSAxO1xuXHRcdGlmIChpc05hTihoKSB8fCAhaCkgaCA9IDE7XG5cblx0XHR2YXIgb3JpZ2luID0gKC1sIC8gdyAtIDAuNSkudG9GaXhlZCg4KSArIFwiIFwiICsgKC10IC8gaCAtIDAuNSkudG9GaXhlZCg4KTtcblxuXHRcdHNrZXcub24gPSBcImZcIjtcblx0XHRza2V3Lm1hdHJpeCA9IG10O1xuXHRcdHNrZXcub3JpZ2luID0gb3JpZ2luO1xuXHRcdHNrZXcub2Zmc2V0ID0gb2Zmc2V0O1xuXHRcdHNrZXcub24gPSB0cnVlO1xuXHR9XG5cbn0pO1xuIiwiTC5TVkcuaW5jbHVkZSh7XG5cblx0LyoqXG5cdCAqIFJlc2V0IHRyYW5zZm9ybSBtYXRyaXhcblx0ICovXG5cdF9yZXNldFRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyKSB7XG5cdFx0bGF5ZXIuX3BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ3RyYW5zZm9ybScsICcnKTtcblx0fSxcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gU1ZHXG5cdCAqIEBwYXJhbSB7TC5QYXRofSAgICAgICAgIGxheWVyXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuXHQgKi9cblx0dHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuXHRcdGxheWVyLl9wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidHJhbnNmb3JtXCIsXG5cdFx0XHQnbWF0cml4KCcgKyBtYXRyaXguam9pbignICcpICsgJyknKTtcblx0fVxuXG59KTtcbiJdfQ==
