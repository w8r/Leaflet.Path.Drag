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
			draggable: true,
			renderer: renderer
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
L.Canvas.include({

	/**
	 * Do nothing
	 * @param  {L.Path} layer
	 */
	_resetTransformPath: function(layer) {
		delete this._copy;
		delete this._copyCtx;
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
		if (!this._copy) {
			this._copy = document.createElement('canvas');
			this._copyCtx = this._copy.getContext('2d');
			this._copy.width = this._container.width;
			this._copy.height = this._container.height;

			document.body.appendChild(this._copy);
			this._copy.style.width = this._container.width / 5 + 'px';
			this._copy.style.height = this._container.height / 5 + 'px';
			this._copy.style.position = 'absolute';
			this._copy.style.top = 0;
			this._copy.style.left = 0;
			this._copy.style.zIndex = 9999;
			this._copy.style.border = '1px solid #444';
			console.log(this._copy);

			layer._removed = true;
			this._redrawBounds = this._redrawBounds || new L.Bounds();
			this._redrawBounds.extend(layer._pxBounds.min).extend(layer._pxBounds.max);
			this._redraw();
			this._copyCtx.drawImage(this._container, 0, 0)

			this._initPath(layer);
		}

		this._ctx.save();
		//this._ctx.clearRect(0, 0, this._copy.width, this._copy.height);
		this._ctx.drawImage(this._copy, 0, 0, this._copy.width, this._copy.height);
		this._ctx.transform.apply(this._ctx, matrix);

		var lrs = this._layers;
		this._layers = {}
		this._initPath(layer);
		//this._updatePoly(layer, true);
		this._layers = lrs;

		//this._layers
		//layer._removed = true;
		this._ctx.restore();
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
		this._path.transform(null);
		// apply matrix
		this._transformPoints(this._matrix);

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
					rings[i][j]._add(px);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiZXhhbXBsZS9qcy9hcHAuanMiLCJpbmRleC5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvUGF0aC5EcmFnLmpzIiwic3JjL1BhdGguVHJhbnNmb3JtLmpzIiwic3JjL1NWRy5WTUwuanMiLCJzcmMvU1ZHLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEwgPSBnbG9iYWwuTDtcbnZhciBEcmFnSGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7XG5cbkwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCA9IFwibGVhZmxldC1tYXN0ZXIvaW1hZ2VzXCI7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbWFwID0gZ2xvYmFsLm1hcCA9IG5ldyBMLk1hcCgnbWFwJywge1xuXHQvLyBjcnM6IEwuQ1JTLkVQU0c0MzI2IC8vIHRoYXQgd2FzIHRlc3RlZCBhcyB3ZWxsXG59KS5zZXRWaWV3KFsyMi40MjY1OCwgMTE0LjE5NTJdLCAxMSk7XG5cbnZhciByZW5kZXJlciA9IG5ldyBMLkNhbnZhcygpO1xuXG5MLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuXHRhdHRyaWJ1dGlvbjogJyZjb3B5OyAnICtcblx0XHQnPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcbn0pLmFkZFRvKG1hcCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFycihhcnJheSwgaW5zZXJ0KSB7XG5cdHZhciByZXMgPSBbXTtcblx0YXJyYXkuZm9yRWFjaChmdW5jdGlvbihwLCBpLCBhcnIpIHtcblx0XHRyZXMucHVzaChwLmNvbmNhdCgpKTtcblxuXHRcdGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpIHtcblx0XHRcdHZhciBkaWZmID0gW2FycltpICsgMV1bMF0gLSBwWzBdLCBhcnJbaSArIDFdWzFdIC0gcFsxXV07XG5cdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8IGluc2VydDsgaSsrKSB7XG5cdFx0XHRcdHJlcy5wdXNoKFtwWzBdICsgKGRpZmZbMF0gKiBpKSAvIGluc2VydCwgcFsxXSArIChkaWZmWzFdICogaSkgLyBpbnNlcnRdKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiByZXM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgcG9seWdvbiA9IGdsb2JhbC5wb2x5Z29uID0gbmV3IEwuUG9seWdvbihcblx0TC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhcblxuXHRcdC8vIH4gMTMgMDAwIHBvaW50c1xuXHRcdGludGVycG9sYXRlQXJyKFtcblx0XHRcdFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF0sXG5cdFx0XHRbMTEzLjk4NjU4NzUyNDQxNDA1LCAyMi4zODM3MzAwODU5MjQ5NV0sXG5cdFx0XHRbMTE0LjAxMjY4MDA1MzcxMDk0LCAyMi4zNjkxMjYzOTc1NDU4ODddLFxuXHRcdFx0WzExNC4wMjc3ODYyNTQ4ODI4MSwgMjIuMzg1NjM0ODAxODU3MThdLFxuXHRcdFx0WzExNC4wNDcwMTIzMjkxMDE1NiwgMjIuMzk1MTU3OTkwMjkwNzU1XSxcblx0XHRcdFsxMTQuMDYwMDU4NTkzNzUsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG5cdFx0XHRbMTE0LjA2MjgwNTE3NTc4MTI1LCAyMi40MzI2MDk1MzQ4NzY3OTZdLFxuXHRcdFx0WzExNC4wNDgzODU2MjAxMTcxNywgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcblx0XHRcdFsxMTQuMDQyODkyNDU2MDU0NjksIDIyLjQ0ODQ3NTc4NjU2NTQ0XSxcblx0XHRcdFsxMTQuMDMyNTkyNzczNDM3NDksIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG5cdFx0XHRbMTE0LjAxOTU0NjUwODc4OTA2LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuXHRcdFx0WzExMy45OTYyMDA1NjE1MjM0NCwgMjIuNDM2NDE3NjAwNzYzMTE0XSxcblx0XHRcdFsxMTMuOTgxNzgxMDA1ODU5MzgsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG5cdFx0XHRbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdXG5cdFx0XSwgMTAwMClcblx0KSwge1xuXHRcdGNvbG9yOiAnI2YwMCcsXG5cdFx0ZHJhZ2dhYmxlOiB0cnVlXG5cdH0pLmFkZFRvKG1hcCk7XG5cbnZhciBwb2x5bGluZSA9IGdsb2JhbC5wb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFxuXHRMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcblx0XHRbMTE0LjE0MzE0MjcwMDE5NTMxLCAyMi40OTQ3OTQ4NDk3NTQ0M10sXG5cdFx0WzExNC4xNTM0NDIzODI4MTI1LCAyMi40ODU5MTI5NDIzMjA5NThdLFxuXHRcdFsxMTQuMTUyMDY5MDkxNzk2ODgsIDIyLjQ3MzIyMzUxNDQ3ODFdLFxuXHRcdFsxMTQuMTQ5MzIyNTA5NzY1NjEsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG5cdFx0WzExNC4xNTk2MjIxOTIzODI4MSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcblx0XHRbMTE0LjE2OTkyMTg3NSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcblx0XHRbMTE0LjE5Mzk1NDQ2Nzc3MzQ0LCAyMi40NTk4OTgzNjM5NDM4OTNdLFxuXHRcdFsxMTQuMjA2MzE0MDg2OTE0MDYsIDIyLjQ2MTE2NzQ4MTEwOTM1XSxcblx0XHRbMTE0LjIxMTgwNzI1MDk3NjU1LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuXHRcdFsxMTQuMjI0MTY2ODcwMTE3MTksIDIyLjQ3MTMyMDAwMDAwOTk5Ml0sXG5cdFx0WzExNC4yMzcyMTMxMzQ3NjU2MiwgMjIuNDc2Mzk1OTgwNDU3OTczXSxcblx0XHRbMTE0LjI0MjAxOTY1MzMyMDMxLCAyMi40OTM1MjYwNDA3MzcyMl0sXG5cdFx0WzExNC4yMzAzNDY2Nzk2ODc1LCAyMi41MTU3Mjg1MTgzMDM1MV0sXG5cdFx0WzExNC4yMTc5ODcwNjA1NDY4OCwgMjIuNTI0NjA4NTExMDI2MjYyXSxcblx0XHRbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuXHRcdFsxMTQuMjA3Njg3Mzc3OTI5NjksIDIyLjUzNjAyNDgwNTg4Njk3NF1cblx0XSksIHtcblx0XHR3ZWlnaHQ6IDE1LFxuXHRcdGRyYWdnYWJsZTogdHJ1ZVxuXHR9KS5hZGRUbyhtYXApO1xuXG52YXIgcG9seWdvbldpdGhIb2xlID0gZ2xvYmFsLnBvbHlnb25XaXRoSG9sZSA9IG5ldyBMLlBvbHlnb24oXG5cdFx0W1xuXHRcdFx0TC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG5cdFx0XHRcdFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDEyOTMyODYzNTE3NzE3XSxcblx0XHRcdFx0WzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDAwODcxNTkwMzA1OTVdLFxuXHRcdFx0XHRbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4zODg4MDkyNzA0NTU1Nl0sXG5cdFx0XHRcdFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjM4MjQ2MDI2MDgxNTcxNl0sXG5cdFx0XHRcdFsxMTQuMzE4OTIzOTUwMTk1MzEsIDIyLjM5MTk4MzY2NjYwMjc4M10sXG5cdFx0XHRcdFsxMTQuMzIzMDQzODIzMjQyMTksIDIyLjM4MDU1NTUwMTQyMTUzM10sXG5cdFx0XHRcdFsxMTQuMzQyOTU2NTQyOTY4NzUsIDIyLjM3MjkzNjIwMzExMzgzOF0sXG5cdFx0XHRcdFsxMTQuMzM0NzE2Nzk2ODc1LCAyMi4zODQzNjQ5OTQxMzMzMDNdLFxuXHRcdFx0XHRbMTE0LjMzMDU5NjkyMzgyODEyLCAyMi4zOTM4ODgyNjk1MTExOTRdLFxuXHRcdFx0XHRbMTE0LjMyMTY3MDUzMjIyNjU1LCAyMi40MDA4NzE1OTAzMDU5NV0sXG5cdFx0XHRcdFsxMTQuMzI3ODUwMzQxNzk2ODgsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG5cdFx0XHRcdFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQyNDk5MzA4OTY0NzIyXSxcblx0XHRcdFx0WzExNC4zMjU3OTA0MDUyNzM0NCwgMjIuNDMwNzA1NDYyNzQ4OTE4XSxcblx0XHRcdFx0WzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDM5NTkwOTA5MTcyNjZdLFxuXHRcdFx0XHRbMTE0LjMzNzQ2MzM3ODkwNjI0LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuXHRcdFx0XHRbMTE0LjMzNTQwMzQ0MjM4MjgxLCAyMi40NjE4MDIwMzUzMzM5OTJdLFxuXHRcdFx0XHRbMTE0LjMyNTEwMzc1OTc2NTYyLCAyMi40NjQzNDAyMjMxNzcxMThdLFxuXHRcdFx0XHRbMTE0LjMyOTIyMzYzMjgxMjQ5LCAyMi40NzI1ODkwMTI1NjE5NTRdLFxuXHRcdFx0XHRbMTE0LjMyMzczMDQ2ODc1LCAyMi40NzcwMzA0NjQ5MzMzMDddLFxuXHRcdFx0XHRbMTE0LjMxOTYxMDU5NTcwMzEyLCAyMi40Nzg5MzM5MDA5MTY5MjhdLFxuXHRcdFx0XHRbMTE0LjMwMTc1NzgxMjUsIDIyLjQ2NjI0MzgzMzU0OTQ0NV0sXG5cdFx0XHRcdFsxMTQuMzAyNDQ0NDU4MDA3ODEsIDIyLjQ1NzM2MDA5NDc1MDA4M10sXG5cdFx0XHRcdFsxMTQuMjkyODMxNDIwODk4NDQsIDIyLjQ1NDgyMTc3OTA3NTgzMl0sXG5cdFx0XHRcdFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQ1MTAxNDIxODQyMjY5XSxcblx0XHRcdFx0WzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40NDI3NjQxNDUwMDE3MDddLFxuXHRcdFx0XHRbMTE0LjI5MDc3MTQ4NDM3NDk5LCAyMi40MjgxNjY2NTkyNzk2MTVdLFxuXHRcdFx0XHRbMTE0LjI3NzAzODU3NDIxODc1LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuXHRcdFx0XHRbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQxMjkzMjg2MzUxNzcxN11cblx0XHRcdF0pLFxuXHRcdFx0TC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG5cdFx0XHRcdFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XSxcblx0XHRcdFx0WzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuNDE0MjAyNDEwMzIxMzAyXSxcblx0XHRcdFx0WzExNC4zMDU4Nzc2ODU1NDY4NiwgMjIuNDA4NDg5MzU4MzQyNjM1XSxcblx0XHRcdFx0WzExNC4zMjIzNTcxNzc3MzQzOCwgMjIuNDIxMTg0NzEwMzMxODU4XSxcblx0XHRcdFx0WzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddXG5cdFx0XHRdKVxuXHRcdF0sIHtcblx0XHRcdGRyYWdnYWJsZTogdHJ1ZSxcblx0XHRcdHJlbmRlcmVyOiByZW5kZXJlclxuXHRcdH1cblx0KVxuXHQuYWRkVG8obWFwKTtcblxudmFyIGNpcmNsZSA9IG5ldyBMLkNpcmNsZShbMjIuMzYwODk3MjQwMTMyMzczLCAxMTQuMTQ1MjAyNjM2NzE4NzVdLCA0MDAwLCB7XG5cdFx0ZHJhZ2dhYmxlOiB0cnVlXG5cdH0pXG5cdC5iaW5kUG9wdXAoXCJMLkNpcmNsZVwiKVxuXHQuYWRkVG8obWFwKVxuXG52YXIgY2lyY2xlTWFya2VyID0gbmV3IEwuQ2lyY2xlTWFya2VyKG1hcC5nZXRDZW50ZXIoKSwge1xuXHRcdGRyYWdnYWJsZTogdHJ1ZVxuXHR9KVxuXHQuYmluZFBvcHVwKFwiTC5DaXJjbGVNYXJrZXJcIilcblx0LmFkZFRvKG1hcCk7XG5cbnZhciBtdWx0aVBvbHlnb24gPSBnbG9iYWwubXVsdGlQb2x5Z29uID0gbmV3IEwuUG9seWdvbihbXG5cdEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuXHRcdFsxMTQuMjA1NjI3NDQxNDA2MjUsIDIyLjMyMDg1OTg0MTAwNTkzXSxcblx0XHRbMTE0LjIxNTkyNzEyNDAyMzQ0LCAyMi4zNTI2MTYwMzU1MTIxNV0sXG5cdFx0WzExNC4yNjQ2Nzg5NTUwNzgxMiwgMjIuMzUxMzQ1OTI2NjA2OTU3XSxcblx0XHRbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjMyNDAzNTc4NTg0MDM4XSxcblx0XHRbMTE0LjI5MjE0NDc3NTM5MDYyLCAyMi4zMjcyMTE2NTgzODg5M10sXG5cdFx0WzExNC4zMDE3NTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuXHRcdFsxMTQuMjk0MjA0NzExOTE0MDYsIDIyLjI5MTAwMjQyNzczNTMyNV0sXG5cdFx0WzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuMjcyNTc2NTg1NDEzNDc1XSxcblx0XHRbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi4yNjE3NzQxMDA5NzQzNV0sXG5cdFx0WzExNC4yNjg3OTg4MjgxMjUsIDIyLjI4MTQ3MjEyMjc4MzgxOF0sXG5cdFx0WzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi4yOTQ4MTQzNjc3ODA1MThdLFxuXHRcdFsxMTQuMjY5NDg1NDczNjMyODEsIDIyLjMwMjQzNzkzNTkwNDQ4XSxcblx0XHRbMTE0LjI3MDE3MjExOTE0MDYyLCAyMi4zMTUxNDI5NTgxNjkzOV0sXG5cdFx0WzExNC4yNTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuXHRcdFsxMTQuMjQ3NTEyODE3MzgyODEsIDIyLjI5OTg5Njc5Mjc1MTkyN10sXG5cdFx0WzExNC4yNDU0NTI4ODA4NTkzOCwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcblx0XHRbMTE0LjIyOTY2MDAzNDE3OTY5LCAyMi4zMDc1MjAwODM1MjI0NzZdLFxuXHRcdFsxMTQuMjIwNzMzNjQyNTc4MTIsIDIyLjMwNTYxNDI5OTgzNzA0Nl0sXG5cdFx0WzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdXG5cdF0pLFxuXHRMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcblx0XHRbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl0sXG5cdFx0WzExNC4zMjAyOTcyNDEyMTA5NCwgMjIuMzI2NTc2NDg5NjYyNDgyXSxcblx0XHRbMTE0LjMyOTkxMDI3ODMyMDMxLCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuXHRcdFsxMTQuMzMzMzQzNTA1ODU5MzgsIDIyLjMzMjI5MjkwNDA5MTcxNl0sXG5cdFx0WzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzQyNDU0ODQwMTQ2NV0sXG5cdFx0WzExNC4zMTU0OTA3MjI2NTYyNSwgMjIuMzM5Mjc5MzE0NjgzMTJdXG5cdF0pLFxuXHRMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcblx0XHRbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdLFxuXHRcdFsxMTQuMjgxMTU4NDQ3MjY1NjIsIDIyLjI1MTYwNjI5NTEzMjk0OF0sXG5cdFx0WzExNC4yODY2NTE2MTEzMjgxMiwgMjIuMjU1NDE5MzA4ODU4NTU2XSxcblx0XHRbMTE0LjI5OTY5Nzg3NTk3NjU2LCAyMi4yNjExMzg2MzQ3NDQ0OV0sXG5cdFx0WzExNC4yOTYyNjQ2NDg0Mzc1LCAyMi4yNTA5NzA3ODI3NTA4NjZdLFxuXHRcdFsxMTQuMjk0ODkxMzU3NDIxODgsIDIyLjI0MDgwMjE5MjQ2MzM1XSxcblx0XHRbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4yMzg4OTU0OTk2MTMyMzJdLFxuXHRcdFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF1cblx0XSlcbl0sIHtcblx0ZHJhZ2dhYmxlOiB0cnVlLFxuXHRyZW5kZXJlcjogcmVuZGVyZXIsXG5cdGNvbG9yOiAnIzA5Midcbn0pLmJpbmRQb3B1cCgnTXVsdGlQb2x5Z29uJykuYWRkVG8obWFwKTtcblxudmFyIG11bHRpUG9seWxpbmUgPSBnbG9iYWwubXVsdGlQb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFtcblx0TC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG5cdFx0WzExMy44OTg2OTY4OTk0MTQwNiwgMjIuMzk5NjAxOTIxNzA2OTUzXSxcblx0XHRbMTEzLjg5ODAxMDI1MzkwNjI1LCAyMi40MjI0NTQxODE3MDk3MDddLFxuXHRcdFsxMTMuOTAzNTAzNDE3OTY4NzUsIDIyLjQzMzI0NDIxOTc4MTE3XSxcblx0XHRbMTEzLjkwOTY4MzIyNzUzOTA2LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuXHRcdFsxMTMuOTA2OTM2NjQ1NTA3ODEsIDIyLjQ3ODI5OTQyNTE2Mjg1Ml0sXG5cdFx0WzExMy45MjM0MTYxMzc2OTUzLCAyMi40ODg0NTA2ODgzMjU0MDhdLFxuXHRcdFsxMTMuOTMzNzE1ODIwMzEyNSwgMjIuNDgzMzc1MTQ5Nzg5NjIzXSxcblx0XHRbMTEzLjk0NDcwMjE0ODQzNzUsIDIyLjQ5MjI1NzIyMDA4NTE5M10sXG5cdFx0WzExMy45NTIyNTUyNDkwMjM0NCwgMjIuNTEyNTU2OTU0MDUxNDVdXG5cdF0pLFxuXG5cdEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuXHRcdFsxMTMuODY3Nzk3ODUxNTYyNSwgMjIuMzkyNjE4NTM3MTM3MzhdLFxuXHRcdFsxMTMuODY5MTcxMTQyNTc4MTEsIDIyLjQyNzUzMTk1MTE1Njk5XSxcblx0XHRbMTEzLjkyMzQxNjEzNzY5NTMsIDIyLjQ2MjQzNjU4NjY1MzE0OF0sXG5cdFx0WzExMy45NDgxMzUzNzU5NzY1NiwgMjIuNDczODU4MDEzNDg3NjE0XSxcblx0XHRbMTEzLjk3ODM0Nzc3ODMyMDMsIDIyLjQ5OTIzNTU4OTY4MzA2XSxcblx0XHRbMTEzLjk5Njg4NzIwNzAzMTI1LCAyMi41MTE5MjI2MzI0Njg4Nl0sXG5cdFx0WzExNC4wMTMzNjY2OTkyMTg3NSwgMjIuNTAxMTM4NzIwMzAwMjU0XSxcblx0XHRbMTE0LjAyNTAzOTY3Mjg1MTU1LCAyMi41MDgxMTY2NDE4NTM2NzVdXG5cdF0pXG5dLCB7XG5cdGRyYWdnYWJsZTogdHJ1ZSxcblx0Y29sb3I6ICcjZTkwJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlsaW5lJykuYWRkVG8obWFwKTtcbiIsInJlcXVpcmUoJy4vc3JjL1NWRycpO1xucmVxdWlyZSgnLi9zcmMvU1ZHLlZNTCcpO1xucmVxdWlyZSgnLi9zcmMvQ2FudmFzJyk7XG5yZXF1aXJlKCcuL3NyYy9QYXRoLlRyYW5zZm9ybScpO1xucmVxdWlyZSgnLi9zcmMvUGF0aC5EcmFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTC5QYXRoLkRyYWc7XG4iLCJMLkNhbnZhcy5pbmNsdWRlKHtcblxuXHQvKipcblx0ICogRG8gbm90aGluZ1xuXHQgKiBAcGFyYW0gIHtMLlBhdGh9IGxheWVyXG5cdCAqL1xuXHRfcmVzZXRUcmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllcikge1xuXHRcdGRlbGV0ZSB0aGlzLl9jb3B5O1xuXHRcdGRlbGV0ZSB0aGlzLl9jb3B5Q3R4O1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBBbGdvcml0aG0gb3V0bGluZTpcblx0ICpcblx0ICogMS4gcHJlLXRyYW5zZm9ybSAtIGNsZWFyIHRoZSBwYXRoIG91dCBvZiB0aGUgY2FudmFzLCBjb3B5IGNhbnZhcyBzdGF0ZVxuXHQgKiAyLiBhdCBldmVyeSBmcmFtZTpcblx0ICogICAgMi4xLiBzYXZlXG5cdCAqICAgIDIuMi4gcmVkcmF3IHRoZSBjYW52YXMgZnJvbSBzYXZlZCBvbmVcblx0ICogICAgMi4zLiB0cmFuc2Zvcm1cblx0ICogICAgMi40LiBkcmF3IHBhdGhcblx0ICogICAgMi41LiByZXN0b3JlXG5cdCAqXG5cdCAqIEBwYXJhbSAge0wuUGF0aH0gbGF5ZXJcblx0ICogQHBhcmFtICB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuXHQgKi9cblx0dHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuXHRcdGlmICghdGhpcy5fY29weSkge1xuXHRcdFx0dGhpcy5fY29weSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXHRcdFx0dGhpcy5fY29weUN0eCA9IHRoaXMuX2NvcHkuZ2V0Q29udGV4dCgnMmQnKTtcblx0XHRcdHRoaXMuX2NvcHkud2lkdGggPSB0aGlzLl9jb250YWluZXIud2lkdGg7XG5cdFx0XHR0aGlzLl9jb3B5LmhlaWdodCA9IHRoaXMuX2NvbnRhaW5lci5oZWlnaHQ7XG5cblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fY29weSk7XG5cdFx0XHR0aGlzLl9jb3B5LnN0eWxlLndpZHRoID0gdGhpcy5fY29udGFpbmVyLndpZHRoIC8gNSArICdweCc7XG5cdFx0XHR0aGlzLl9jb3B5LnN0eWxlLmhlaWdodCA9IHRoaXMuX2NvbnRhaW5lci5oZWlnaHQgLyA1ICsgJ3B4Jztcblx0XHRcdHRoaXMuX2NvcHkuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuXHRcdFx0dGhpcy5fY29weS5zdHlsZS50b3AgPSAwO1xuXHRcdFx0dGhpcy5fY29weS5zdHlsZS5sZWZ0ID0gMDtcblx0XHRcdHRoaXMuX2NvcHkuc3R5bGUuekluZGV4ID0gOTk5OTtcblx0XHRcdHRoaXMuX2NvcHkuc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCAjNDQ0Jztcblx0XHRcdGNvbnNvbGUubG9nKHRoaXMuX2NvcHkpO1xuXG5cdFx0XHRsYXllci5fcmVtb3ZlZCA9IHRydWU7XG5cdFx0XHR0aGlzLl9yZWRyYXdCb3VuZHMgPSB0aGlzLl9yZWRyYXdCb3VuZHMgfHwgbmV3IEwuQm91bmRzKCk7XG5cdFx0XHR0aGlzLl9yZWRyYXdCb3VuZHMuZXh0ZW5kKGxheWVyLl9weEJvdW5kcy5taW4pLmV4dGVuZChsYXllci5fcHhCb3VuZHMubWF4KTtcblx0XHRcdHRoaXMuX3JlZHJhdygpO1xuXHRcdFx0dGhpcy5fY29weUN0eC5kcmF3SW1hZ2UodGhpcy5fY29udGFpbmVyLCAwLCAwKVxuXG5cdFx0XHR0aGlzLl9pbml0UGF0aChsYXllcik7XG5cdFx0fVxuXG5cdFx0dGhpcy5fY3R4LnNhdmUoKTtcblx0XHQvL3RoaXMuX2N0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5fY29weS53aWR0aCwgdGhpcy5fY29weS5oZWlnaHQpO1xuXHRcdHRoaXMuX2N0eC5kcmF3SW1hZ2UodGhpcy5fY29weSwgMCwgMCwgdGhpcy5fY29weS53aWR0aCwgdGhpcy5fY29weS5oZWlnaHQpO1xuXHRcdHRoaXMuX2N0eC50cmFuc2Zvcm0uYXBwbHkodGhpcy5fY3R4LCBtYXRyaXgpO1xuXG5cdFx0dmFyIGxycyA9IHRoaXMuX2xheWVycztcblx0XHR0aGlzLl9sYXllcnMgPSB7fVxuXHRcdHRoaXMuX2luaXRQYXRoKGxheWVyKTtcblx0XHQvL3RoaXMuX3VwZGF0ZVBvbHkobGF5ZXIsIHRydWUpO1xuXHRcdHRoaXMuX2xheWVycyA9IGxycztcblxuXHRcdC8vdGhpcy5fbGF5ZXJzXG5cdFx0Ly9sYXllci5fcmVtb3ZlZCA9IHRydWU7XG5cdFx0dGhpcy5fY3R4LnJlc3RvcmUoKTtcblx0fVxuXG59KTtcbiIsIi8qKlxuICogTGVhZmxldCB2ZWN0b3IgZmVhdHVyZXMgZHJhZyBmdW5jdGlvbmFsaXR5XG4gKiBAcHJlc2VydmVcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBEcmFnIGhhbmRsZXJcbiAqIEBjbGFzcyBMLlBhdGguRHJhZ1xuICogQGV4dGVuZHMge0wuSGFuZGxlcn1cbiAqL1xuTC5IYW5kbGVyLlBhdGhEcmFnID0gTC5IYW5kbGVyLmV4dGVuZCggLyoqIEBsZW5kcyAgTC5QYXRoLkRyYWcucHJvdG90eXBlICovIHtcblxuXHQvKipcblx0ICogQHBhcmFtICB7TC5QYXRofSBwYXRoXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKi9cblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24ocGF0aCkge1xuXG5cdFx0LyoqXG5cdFx0ICogQHR5cGUge0wuUGF0aH1cblx0XHQgKi9cblx0XHR0aGlzLl9wYXRoID0gcGF0aDtcblxuXHRcdC8qKlxuXHRcdCAqIEB0eXBlIHtBcnJheS48TnVtYmVyPn1cblx0XHQgKi9cblx0XHR0aGlzLl9tYXRyaXggPSBudWxsO1xuXG5cdFx0LyoqXG5cdFx0ICogQHR5cGUge0wuUG9pbnR9XG5cdFx0ICovXG5cdFx0dGhpcy5fc3RhcnRQb2ludCA9IG51bGw7XG5cblx0XHQvKipcblx0XHQgKiBAdHlwZSB7TC5Qb2ludH1cblx0XHQgKi9cblx0XHR0aGlzLl9kcmFnU3RhcnRQb2ludCA9IG51bGw7XG5cblx0XHQvKipcblx0XHQgKiBAdHlwZSB7Qm9vbGVhbn1cblx0XHQgKi9cblx0XHR0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQgPSBmYWxzZTtcblxuXHR9LFxuXG5cdC8qKlxuXHQgKiBFbmFibGUgZHJhZ2dpbmdcblx0ICovXG5cdGFkZEhvb2tzOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLl9wYXRoLm9uKCdtb3VzZWRvd24nLCB0aGlzLl9vbkRyYWdTdGFydCwgdGhpcyk7XG5cdFx0aWYgKHRoaXMuX3BhdGguX3BhdGgpIHtcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9wYXRoLl9wYXRoLCAnbGVhZmxldC1wYXRoLWRyYWdnYWJsZScpO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogRGlzYWJsZSBkcmFnZ2luZ1xuXHQgKi9cblx0cmVtb3ZlSG9va3M6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuX3BhdGgub2ZmKCdtb3VzZWRvd24nLCB0aGlzLl9vbkRyYWdTdGFydCwgdGhpcyk7XG5cdFx0aWYgKHRoaXMuX3BhdGguX3BhdGgpIHtcblx0XHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9wYXRoLl9wYXRoLCAnbGVhZmxldC1wYXRoLWRyYWdnYWJsZScpO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogQHJldHVybiB7Qm9vbGVhbn1cblx0ICovXG5cdG1vdmVkOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fcGF0aC5fZHJhZ01vdmVkO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBTdGFydCBkcmFnXG5cdCAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG5cdCAqL1xuXHRfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uKGV2dCkge1xuXHRcdHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCA9IGZhbHNlO1xuXHRcdHRoaXMuX3N0YXJ0UG9pbnQgPSBldnQuY29udGFpbmVyUG9pbnQuY2xvbmUoKTtcblx0XHR0aGlzLl9kcmFnU3RhcnRQb2ludCA9IGV2dC5jb250YWluZXJQb2ludC5jbG9uZSgpO1xuXHRcdHRoaXMuX21hdHJpeCA9IFsxLCAwLCAwLCAxLCAwLCAwXTtcblx0XHRMLkRvbUV2ZW50LnN0b3AoZXZ0Lm9yaWdpbmFsRXZlbnQpO1xuXG5cdFx0dGhpcy5fcGF0aC5fbWFwLm9uKCdtb3VzZW1vdmUnLCB0aGlzLl9vbkRyYWcsIHRoaXMpO1xuXHRcdHRoaXMuX3BhdGhcblx0XHRcdC5vbignbW91c2Vtb3ZlJywgdGhpcy5fb25EcmFnLCB0aGlzKVxuXHRcdFx0Lm9uKCdtb3VzZXVwJywgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcblxuXHRcdGlmICh0aGlzLl9wYXRoLl9tYXAuZHJhZ2dpbmcuZW5hYmxlZCgpKSB7XG5cdFx0XHR0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcblx0XHR9XG5cdFx0dGhpcy5fcGF0aC5fZHJhZ01vdmVkID0gZmFsc2U7XG5cdH0sXG5cblx0LyoqXG5cdCAqIERyYWdnaW5nXG5cdCAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG5cdCAqL1xuXHRfb25EcmFnOiBmdW5jdGlvbihldnQpIHtcblx0XHR2YXIgeCA9IGV2dC5jb250YWluZXJQb2ludC54O1xuXHRcdHZhciB5ID0gZXZ0LmNvbnRhaW5lclBvaW50Lnk7XG5cblx0XHR2YXIgZHggPSB4IC0gdGhpcy5fc3RhcnRQb2ludC54O1xuXHRcdHZhciBkeSA9IHkgLSB0aGlzLl9zdGFydFBvaW50Lnk7XG5cblx0XHRpZiAoIXRoaXMuX3BhdGguX2RyYWdNb3ZlZCAmJiAoZHggfHwgZHkpKSB7XG5cdFx0XHR0aGlzLl9wYXRoLl9kcmFnTW92ZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5fcGF0aC5maXJlKCdkcmFnc3RhcnQnKTtcblx0XHRcdC8vIHdlIGRvbid0IHdhbnQgdGhhdCB0byBoYXBwZW4gb24gY2xpY2tcblx0XHRcdHRoaXMuX3BhdGguYnJpbmdUb0Zyb250KCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fbWF0cml4WzRdICs9IGR4O1xuXHRcdHRoaXMuX21hdHJpeFs1XSArPSBkeTtcblxuXHRcdHRoaXMuX3N0YXJ0UG9pbnQueCA9IHg7XG5cdFx0dGhpcy5fc3RhcnRQb2ludC55ID0geTtcblxuXHRcdHRoaXMuX3BhdGgudHJhbnNmb3JtKHRoaXMuX21hdHJpeCk7XG5cdFx0dGhpcy5fcGF0aC5maXJlKCdkcmFnJyk7XG5cdFx0TC5Eb21FdmVudC5zdG9wKGV2dC5vcmlnaW5hbEV2ZW50KTtcblx0fSxcblxuXHQvKipcblx0ICogRHJhZ2dpbmcgc3RvcHBlZCwgYXBwbHlcblx0ICogQHBhcmFtICB7TC5Nb3VzZUV2ZW50fSBldnRcblx0ICovXG5cdF9vbkRyYWdFbmQ6IGZ1bmN0aW9uKGV2dCkge1xuXHRcdHRoaXMuX3BhdGgudHJhbnNmb3JtKG51bGwpO1xuXHRcdC8vIGFwcGx5IG1hdHJpeFxuXHRcdHRoaXMuX3RyYW5zZm9ybVBvaW50cyh0aGlzLl9tYXRyaXgpO1xuXG5cdFx0dGhpcy5fcGF0aC5fbWFwLm9mZignbW91c2Vtb3ZlJywgdGhpcy5fb25EcmFnLCB0aGlzKTtcblx0XHR0aGlzLl9wYXRoXG5cdFx0XHQub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG5cdFx0XHQub2ZmKCdtb3VzZXVwJywgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcblxuXHRcdC8vIGNvbnNpc3RlbmN5XG5cdFx0dGhpcy5fcGF0aC5maXJlKCdkcmFnZW5kJywge1xuXHRcdFx0ZGlzdGFuY2U6IE1hdGguc3FydChcblx0XHRcdFx0TC5MaW5lVXRpbC5fc3FEaXN0KHRoaXMuX2RyYWdTdGFydFBvaW50LCBldnQuY29udGFpbmVyUG9pbnQpXG5cdFx0XHQpXG5cdFx0fSk7XG5cblx0XHR0aGlzLl9tYXRyaXggPSBudWxsO1xuXHRcdHRoaXMuX3N0YXJ0UG9pbnQgPSBudWxsO1xuXHRcdHRoaXMuX2RyYWdTdGFydFBvaW50ID0gbnVsbDtcblxuXHRcdGlmICh0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQpIHtcblx0XHRcdHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5lbmFibGUoKTtcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgdHJhbnNmb3JtYXRpb24sIGRvZXMgaXQgaW4gb25lIHN3ZWVwIGZvciBwZXJmb3JtYW5jZSxcblx0ICogc28gZG9uJ3QgYmUgc3VycHJpc2VkIGFib3V0IHRoZSBjb2RlIHJlcGV0aXRpb24uXG5cdCAqXG5cdCAqIFsgeCBdICAgWyBhICBiICB0eCBdIFsgeCBdICAgWyBhICogeCArIGIgKiB5ICsgdHggXVxuXHQgKiBbIHkgXSA9IFsgYyAgZCAgdHkgXSBbIHkgXSA9IFsgYyAqIHggKyBkICogeSArIHR5IF1cblx0ICpcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG5cdCAqL1xuXHRfdHJhbnNmb3JtUG9pbnRzOiBmdW5jdGlvbihtYXRyaXgpIHtcblx0XHR2YXIgcGF0aCA9IHRoaXMuX3BhdGg7XG5cdFx0dmFyIGksIGxlbiwgbGF0bG5nO1xuXG5cdFx0dmFyIHB4ID0gTC5wb2ludChtYXRyaXhbNF0sIG1hdHJpeFs1XSk7XG5cblx0XHR2YXIgY3JzID0gcGF0aC5fbWFwLm9wdGlvbnMuY3JzO1xuXHRcdHZhciB0cmFuc2Zvcm1hdGlvbiA9IGNycy50cmFuc2Zvcm1hdGlvbjtcblx0XHR2YXIgc2NhbGUgPSBjcnMuc2NhbGUocGF0aC5fbWFwLmdldFpvb20oKSk7XG5cdFx0dmFyIHByb2plY3Rpb24gPSBjcnMucHJvamVjdGlvbjtcblxuXHRcdHZhciBkaWZmID0gdHJhbnNmb3JtYXRpb24udW50cmFuc2Zvcm0ocHgsIHNjYWxlKVxuXHRcdFx0LnN1YnRyYWN0KHRyYW5zZm9ybWF0aW9uLnVudHJhbnNmb3JtKEwucG9pbnQoMCwgMCksIHNjYWxlKSk7XG5cblx0XHQvLyBjb25zb2xlLnRpbWUoJ3RyYW5zZm9ybScpO1xuXHRcdC8vIGFsbCBzaGlmdHMgYXJlIGluLXBsYWNlXG5cdFx0aWYgKHBhdGguX3BvaW50KSB7IC8vIEwuQ2lyY2xlXG5cdFx0XHRwYXRoLl9sYXRsbmcgPSBwcm9qZWN0aW9uLnVucHJvamVjdChcblx0XHRcdFx0cHJvamVjdGlvbi5wcm9qZWN0KHBhdGguX2xhdGxuZykuX2FkZChkaWZmKSk7XG5cdFx0XHRwYXRoLl9wb2ludC5fYWRkKHB4KTtcblx0XHR9IGVsc2UgaWYgKHBhdGguX3JpbmdzIHx8IHBhdGguX3BhcnRzKSB7IC8vIGV2ZXJ5dGhpbmcgZWxzZVxuXHRcdFx0dmFyIHJpbmdzID0gcGF0aC5fcmluZ3MgfHwgcGF0aC5fcGFydHM7XG5cdFx0XHR2YXIgbGF0bG5ncyA9IHBhdGguX2xhdGxuZ3M7XG5cdFx0XHRpZiAoIUwuVXRpbC5pc0FycmF5KGxhdGxuZ3NbMF0pKSB7IC8vIHBvbHlsaW5lXG5cdFx0XHRcdGxhdGxuZ3MgPSBbbGF0bG5nc107XG5cdFx0XHR9XG5cdFx0XHRmb3IgKGkgPSAwLCBsZW4gPSByaW5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMCwgamogPSByaW5nc1tpXS5sZW5ndGg7IGogPCBqajsgaisrKSB7XG5cdFx0XHRcdFx0bGF0bG5nID0gbGF0bG5nc1tpXVtqXTtcblx0XHRcdFx0XHRsYXRsbmdzW2ldW2pdID0gcHJvamVjdGlvblxuXHRcdFx0XHRcdFx0LnVucHJvamVjdChwcm9qZWN0aW9uLnByb2plY3QobGF0bG5nKS5fYWRkKGRpZmYpKTtcblx0XHRcdFx0XHRyaW5nc1tpXVtqXS5fYWRkKHB4KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBjb25zb2xlLnRpbWVFbmQoJ3RyYW5zZm9ybScpO1xuXG5cdFx0cGF0aC5fdXBkYXRlUGF0aCgpO1xuXHR9XG5cbn0pO1xuXG5MLlBhdGgucHJvdG90eXBlLl9fb25BZGQgPSBMLlBhdGgucHJvdG90eXBlLm9uQWRkO1xuTC5QYXRoLnByb3RvdHlwZS5vbkFkZCA9IGZ1bmN0aW9uKG1hcCkge1xuXHR0aGlzLl9fb25BZGQuY2FsbCh0aGlzLCBtYXApO1xuXHRpZiAodGhpcy5vcHRpb25zLmRyYWdnYWJsZSkge1xuXHRcdGlmICh0aGlzLmRyYWdnaW5nKSB7XG5cdFx0XHR0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmRyYWdnaW5nID0gbmV3IEwuSGFuZGxlci5QYXRoRHJhZyh0aGlzKTtcblx0XHRcdHRoaXMuZHJhZ2dpbmcuZW5hYmxlKCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcblx0XHR0aGlzLmRyYWdnaW5nLmRpc2FibGUoKTtcblx0fVxufTtcbiIsIi8qKlxuICogTWF0cml4IHRyYW5zZm9ybSBwYXRoIGZvciBTVkcvVk1MXG4gKiBUT0RPOiBhZGFwdCB0byBMZWFmbGV0IDAuOCB1cG9uIHJlbGVhc2VcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gUmVuZGVyZXItaW5kZXBlbmRlbnRcbkwuUGF0aC5pbmNsdWRlKHtcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gU1ZHXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj4/fSBtYXRyaXhcblx0ICovXG5cdHRyYW5zZm9ybTogZnVuY3Rpb24obWF0cml4KSB7XG5cdFx0aWYgKHRoaXMuX3JlbmRlcmVyKSB7XG5cdFx0XHRpZiAobWF0cml4KSB7XG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVyLnRyYW5zZm9ybVBhdGgodGhpcywgbWF0cml4KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHJlc2V0IHRyYW5zZm9ybSBtYXRyaXhcblx0XHRcdFx0dGhpcy5fcmVuZGVyZXIuX3Jlc2V0VHJhbnNmb3JtUGF0aCh0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHRoZSBmZWF0dXJlIHdhcyBkcmFnZ2VkLCB0aGF0J2xsIHN1cHJlc3MgdGhlIGNsaWNrIGV2ZW50XG5cdCAqIG9uIG1vdXNldXAuIFRoYXQgZml4ZXMgcG9wdXBzIGZvciBleGFtcGxlXG5cdCAqXG5cdCAqIEBwYXJhbSAge01vdXNlRXZlbnR9IGVcblx0ICovXG5cdF9vbk1vdXNlQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoKHRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5kcmFnZ2luZy5tb3ZlZCgpKSB8fFxuXHRcdFx0KHRoaXMuX21hcC5kcmFnZ2luZyAmJiB0aGlzLl9tYXAuZHJhZ2dpbmcubW92ZWQoKSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9maXJlTW91c2VFdmVudChlKTtcblx0fVxuXG59KTtcbiIsIkwuU1ZHLmluY2x1ZGUoIUwuQnJvd3Nlci52bWwgPyB7fSA6IHtcblxuXHQvKipcblx0ICogUmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHQgKi9cblx0X3Jlc2V0VHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIpIHtcblx0XHRpZiAobGF5ZXIuX3NrZXcpIHtcblx0XHRcdC8vIHN1cGVyIGltcG9ydGFudCEgd29ya2Fyb3VuZCBmb3IgYSAnanVtcGluZycgZ2xpdGNoOlxuXHRcdFx0Ly8gZGlzYWJsZSB0cmFuc2Zvcm0gYmVmb3JlIHJlbW92aW5nIGl0XG5cdFx0XHRsYXllci5fc2tldy5vbiA9IGZhbHNlO1xuXHRcdFx0bGF5ZXIuX3BhdGgucmVtb3ZlQ2hpbGQobGF5ZXIuX3NrZXcpO1xuXHRcdFx0bGF5ZXIuX3NrZXcgPSBudWxsO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gVk1MXG5cdCAqIEBwYXJhbSB7TC5QYXRofSAgICAgICAgIGxheWVyXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuXHQgKi9cblx0dHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuXHRcdHZhciBza2V3ID0gbGF5ZXIuX3NrZXc7XG5cblx0XHRpZiAoIXNrZXcpIHtcblx0XHRcdHNrZXcgPSBMLlNWRy5jcmVhdGUoJ3NrZXcnKTtcblx0XHRcdGxheWVyLl9wYXRoLmFwcGVuZENoaWxkKHNrZXcpO1xuXHRcdFx0c2tldy5zdHlsZS5iZWhhdmlvciA9ICd1cmwoI2RlZmF1bHQjVk1MKSc7XG5cdFx0XHRsYXllci5fc2tldyA9IHNrZXc7XG5cdFx0fVxuXG5cdFx0Ly8gaGFuZGxlIHNrZXcvdHJhbnNsYXRlIHNlcGFyYXRlbHksIGNhdXNlIGl0J3MgYnJva2VuXG5cdFx0dmFyIG10ID0gbWF0cml4WzBdLnRvRml4ZWQoOCkgKyBcIiBcIiArIG1hdHJpeFsxXS50b0ZpeGVkKDgpICsgXCIgXCIgK1xuXHRcdFx0bWF0cml4WzJdLnRvRml4ZWQoOCkgKyBcIiBcIiArIG1hdHJpeFszXS50b0ZpeGVkKDgpICsgXCIgMCAwXCI7XG5cdFx0dmFyIG9mZnNldCA9IE1hdGguZmxvb3IobWF0cml4WzRdKS50b0ZpeGVkKCkgKyBcIiwgXCIgK1xuXHRcdFx0TWF0aC5mbG9vcihtYXRyaXhbNV0pLnRvRml4ZWQoKSArIFwiXCI7XG5cblx0XHR2YXIgcyA9IHRoaXMuX3BhdGguc3R5bGU7XG5cdFx0dmFyIGwgPSBwYXJzZUZsb2F0KHMubGVmdCk7XG5cdFx0dmFyIHQgPSBwYXJzZUZsb2F0KHMudG9wKTtcblx0XHR2YXIgdyA9IHBhcnNlRmxvYXQocy53aWR0aCk7XG5cdFx0dmFyIGggPSBwYXJzZUZsb2F0KHMuaGVpZ2h0KTtcblxuXHRcdGlmIChpc05hTihsKSkgbCA9IDA7XG5cdFx0aWYgKGlzTmFOKHQpKSB0ID0gMDtcblx0XHRpZiAoaXNOYU4odykgfHwgIXcpIHcgPSAxO1xuXHRcdGlmIChpc05hTihoKSB8fCAhaCkgaCA9IDE7XG5cblx0XHR2YXIgb3JpZ2luID0gKC1sIC8gdyAtIDAuNSkudG9GaXhlZCg4KSArIFwiIFwiICsgKC10IC8gaCAtIDAuNSkudG9GaXhlZCg4KTtcblxuXHRcdHNrZXcub24gPSBcImZcIjtcblx0XHRza2V3Lm1hdHJpeCA9IG10O1xuXHRcdHNrZXcub3JpZ2luID0gb3JpZ2luO1xuXHRcdHNrZXcub2Zmc2V0ID0gb2Zmc2V0O1xuXHRcdHNrZXcub24gPSB0cnVlO1xuXHR9XG5cbn0pO1xuIiwiTC5TVkcuaW5jbHVkZSh7XG5cblx0LyoqXG5cdCAqIFJlc2V0IHRyYW5zZm9ybSBtYXRyaXhcblx0ICovXG5cdF9yZXNldFRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyKSB7XG5cdFx0bGF5ZXIuX3BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ3RyYW5zZm9ybScsICcnKTtcblx0fSxcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gU1ZHXG5cdCAqIEBwYXJhbSB7TC5QYXRofSAgICAgICAgIGxheWVyXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuXHQgKi9cblx0dHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuXHRcdGxheWVyLl9wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidHJhbnNmb3JtXCIsXG5cdFx0XHQnbWF0cml4KCcgKyBtYXRyaXguam9pbignICcpICsgJyknKTtcblx0fVxuXG59KTtcbiJdfQ==
