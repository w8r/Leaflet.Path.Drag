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
    document.body.removeChild(this._containerCopy);
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

      document.body.appendChild(copy);
      copy.style.position = 'absolute';
      copy.style.top = copy.style.left = 0;
      copy.style.zIndex = 9999;
      copy.style.width = this._container.width / 5 + 'px';
      copy.style.height = this._container.height / 5 + 'px';

      layer._removed = true;
      this._redraw();

      copy.getContext('2d').translate(this._bounds.min.x, this._bounds.min.y);
      copy.getContext('2d').drawImage(this._container, 0, 0);
      this._initPath(layer);
      layer._containsPoint_ = layer._containsPoint;
      layer._containsPoint = L.Util.trueFn;
    }

    ctx.clearRect(
      this._bounds.min.x, this._bounds.min.y,
      this._container.width, this._container.height);

    ctx.save();

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
    this._path.on(L.Draggable.START.join(' '), this._onDragStart, this);
    if (this._path._path) {
      L.DomUtil.addClass(this._path._path, 'leaflet-path-draggable');
    }
  },

  /**
   * Disable dragging
   */
  removeHooks: function() {
    this._path.off(L.Draggable.START.join(' '), this._onDragStart, this);
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
    var eventType = evt.originalEvent.type;
    this._mapDraggingWasEnabled = false;
    this._startPoint = evt.containerPoint.clone();
    this._dragStartPoint = evt.containerPoint.clone();
    this._matrix = [1, 0, 0, 1, 0, 0];
    L.DomEvent.stop(evt.originalEvent);

    console.log(eventType, L.Draggable.END[eventType], L.Draggable.MOVE[eventType]);

    L.DomUtil.addClass(this._path._renderer._container, 'leaflet-interactive');

    // this._path._map.on('mousemove', this._onDrag, this);
    // this._path
    //   .on('mousemove', this._onDrag, this)
    //   .on('mouseup', this._onDragEnd, this);

    this._path._map.on(L.Draggable.MOVE[eventType], this._onDrag, this);
    this._path
      .on(L.Draggable.MOVE[eventType], this._onDrag, this)
      .on(L.Draggable.END[eventType], this._onDragEnd, this);

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
    var eventType = evt.originalEvent.type;

    // apply matrix
    if (this.moved()) {
      this._transformPoints(this._matrix);
      this._path._project();
      this._path.transform(null);
    }

    // this._path._map.off(L.Draggable.MOVE[eventType], this._onDrag, this);
    // this._path
    //   .off(L.Draggable.MOVE[eventType], this._onDrag, this)
    //   .off(L.Draggable.END[eventType], this._onDragEnd, this);

    console.log(eventType, L.Draggable.END[eventType], L.Draggable.MOVE[eventType]);
    for (var i in L.Draggable.MOVE) {
      this._path._map.off(L.Draggable.MOVE[i], this._onDrag, this);
      this._path.off(L.Draggable.MOVE[i], this._onDrag, this)
        .off(L.Draggable.END[i], this._onUp, this);
    }

    // this._path._map.off('mousemove', this._onDrag, this);
    // this._path
    //   .off('mousemove', this._onDrag, this)
    //   .off('mouseup', this._onDragEnd, this);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiZXhhbXBsZS9qcy9hcHAuanMiLCJpbmRleC5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvUGF0aC5EcmFnLmpzIiwic3JjL1BhdGguVHJhbnNmb3JtLmpzIiwic3JjL1NWRy5WTUwuanMiLCJzcmMvU1ZHLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEwgPSBnbG9iYWwuTDtcbnZhciBEcmFnSGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7XG5cbkwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCA9IFwibGVhZmxldC1tYXN0ZXIvaW1hZ2VzXCI7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbWFwID0gZ2xvYmFsLm1hcCA9IG5ldyBMLk1hcCgnbWFwJywge1xuICAvLyBjcnM6IEwuQ1JTLkVQU0c0MzI2IC8vIHRoYXQgd2FzIHRlc3RlZCBhcyB3ZWxsXG59KS5zZXRWaWV3KFsyMi40MjY1OCwgMTE0LjE5NTJdLCAxMSk7XG5cbnZhciByZW5kZXJlciA9IG5ldyBMLkNhbnZhcygpO1xuXG5MLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICBhdHRyaWJ1dGlvbjogJyZjb3B5OyAnICtcbiAgICAnPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcbn0pLmFkZFRvKG1hcCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFycihhcnJheSwgaW5zZXJ0KSB7XG4gIHZhciByZXMgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihwLCBpLCBhcnIpIHtcbiAgICByZXMucHVzaChwLmNvbmNhdCgpKTtcblxuICAgIGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgIHZhciBkaWZmID0gW2FycltpICsgMV1bMF0gLSBwWzBdLCBhcnJbaSArIDFdWzFdIC0gcFsxXV07XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGluc2VydDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKFtwWzBdICsgKGRpZmZbMF0gKiBpKSAvIGluc2VydCwgcFsxXSArIChkaWZmWzFdICogaSkgLyBpbnNlcnRdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgcG9seWdvbiA9IGdsb2JhbC5wb2x5Z29uID0gbmV3IEwuUG9seWdvbihcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhcblxuICAgIC8vIH4gMTMgMDAwIHBvaW50c1xuICAgIGludGVycG9sYXRlQXJyKFtcbiAgICAgIFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF0sXG4gICAgICBbMTEzLjk4NjU4NzUyNDQxNDA1LCAyMi4zODM3MzAwODU5MjQ5NV0sXG4gICAgICBbMTE0LjAxMjY4MDA1MzcxMDk0LCAyMi4zNjkxMjYzOTc1NDU4ODddLFxuICAgICAgWzExNC4wMjc3ODYyNTQ4ODI4MSwgMjIuMzg1NjM0ODAxODU3MThdLFxuICAgICAgWzExNC4wNDcwMTIzMjkxMDE1NiwgMjIuMzk1MTU3OTkwMjkwNzU1XSxcbiAgICAgIFsxMTQuMDYwMDU4NTkzNzUsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICBbMTE0LjA2MjgwNTE3NTc4MTI1LCAyMi40MzI2MDk1MzQ4NzY3OTZdLFxuICAgICAgWzExNC4wNDgzODU2MjAxMTcxNywgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcbiAgICAgIFsxMTQuMDQyODkyNDU2MDU0NjksIDIyLjQ0ODQ3NTc4NjU2NTQ0XSxcbiAgICAgIFsxMTQuMDMyNTkyNzczNDM3NDksIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG4gICAgICBbMTE0LjAxOTU0NjUwODc4OTA2LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgICAgWzExMy45OTYyMDA1NjE1MjM0NCwgMjIuNDM2NDE3NjAwNzYzMTE0XSxcbiAgICAgIFsxMTMuOTgxNzgxMDA1ODU5MzgsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG4gICAgICBbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdXG4gICAgXSwgMTAwMClcbiAgKSwge1xuICAgIGNvbG9yOiAnI2YwMCcsXG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICB9KS5hZGRUbyhtYXApO1xuXG52YXIgcG9seWxpbmUgPSBnbG9iYWwucG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShcbiAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICAgIFsxMTQuMTQzMTQyNzAwMTk1MzEsIDIyLjQ5NDc5NDg0OTc1NDQzXSxcbiAgICAgIFsxMTQuMTUzNDQyMzgyODEyNSwgMjIuNDg1OTEyOTQyMzIwOTU4XSxcbiAgICAgIFsxMTQuMTUyMDY5MDkxNzk2ODgsIDIyLjQ3MzIyMzUxNDQ3ODFdLFxuICAgICAgWzExNC4xNDkzMjI1MDk3NjU2MSwgMjIuNDU5ODk4MzYzOTQzODkzXSxcbiAgICAgIFsxMTQuMTU5NjIyMTkyMzgyODEsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgICBbMTE0LjE2OTkyMTg3NSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICAgIFsxMTQuMTkzOTU0NDY3NzczNDQsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG4gICAgICBbMTE0LjIwNjMxNDA4NjkxNDA2LCAyMi40NjExNjc0ODExMDkzNV0sXG4gICAgICBbMTE0LjIxMTgwNzI1MDk3NjU1LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuICAgICAgWzExNC4yMjQxNjY4NzAxMTcxOSwgMjIuNDcxMzIwMDAwMDA5OTkyXSxcbiAgICAgIFsxMTQuMjM3MjEzMTM0NzY1NjIsIDIyLjQ3NjM5NTk4MDQ1Nzk3M10sXG4gICAgICBbMTE0LjI0MjAxOTY1MzMyMDMxLCAyMi40OTM1MjYwNDA3MzcyMl0sXG4gICAgICBbMTE0LjIzMDM0NjY3OTY4NzUsIDIyLjUxNTcyODUxODMwMzUxXSxcbiAgICAgIFsxMTQuMjE3OTg3MDYwNTQ2ODgsIDIyLjUyNDYwODUxMTAyNjI2Ml0sXG4gICAgICBbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuICAgICAgWzExNC4yMDc2ODczNzc5Mjk2OSwgMjIuNTM2MDI0ODA1ODg2OTc0XVxuICAgIF0pLCB7XG4gICAgICB3ZWlnaHQ6IDE1LFxuICAgICAgZHJhZ2dhYmxlOiB0cnVlXG4gICAgfSlcbiAgLmFkZFRvKG1hcClcbiAgLmJpbmRQb3B1cChcIkknbSBhIHBvbHlsaW5lXCIpO1xuXG52YXIgcG9seWdvbldpdGhIb2xlID0gZ2xvYmFsLnBvbHlnb25XaXRoSG9sZSA9IG5ldyBMLlBvbHlnb24oXG4gICAgW1xuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDEyOTMyODYzNTE3NzE3XSxcbiAgICAgICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDAwODcxNTkwMzA1OTVdLFxuICAgICAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4zODg4MDkyNzA0NTU1Nl0sXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjM4MjQ2MDI2MDgxNTcxNl0sXG4gICAgICAgIFsxMTQuMzE4OTIzOTUwMTk1MzEsIDIyLjM5MTk4MzY2NjYwMjc4M10sXG4gICAgICAgIFsxMTQuMzIzMDQzODIzMjQyMTksIDIyLjM4MDU1NTUwMTQyMTUzM10sXG4gICAgICAgIFsxMTQuMzQyOTU2NTQyOTY4NzUsIDIyLjM3MjkzNjIwMzExMzgzOF0sXG4gICAgICAgIFsxMTQuMzM0NzE2Nzk2ODc1LCAyMi4zODQzNjQ5OTQxMzMzMDNdLFxuICAgICAgICBbMTE0LjMzMDU5NjkyMzgyODEyLCAyMi4zOTM4ODgyNjk1MTExOTRdLFxuICAgICAgICBbMTE0LjMyMTY3MDUzMjIyNjU1LCAyMi40MDA4NzE1OTAzMDU5NV0sXG4gICAgICAgIFsxMTQuMzI3ODUwMzQxNzk2ODgsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICAgIFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQyNDk5MzA4OTY0NzIyXSxcbiAgICAgICAgWzExNC4zMjU3OTA0MDUyNzM0NCwgMjIuNDMwNzA1NDYyNzQ4OTE4XSxcbiAgICAgICAgWzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDM5NTkwOTA5MTcyNjZdLFxuICAgICAgICBbMTE0LjMzNzQ2MzM3ODkwNjI0LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgICAgICBbMTE0LjMzNTQwMzQ0MjM4MjgxLCAyMi40NjE4MDIwMzUzMzM5OTJdLFxuICAgICAgICBbMTE0LjMyNTEwMzc1OTc2NTYyLCAyMi40NjQzNDAyMjMxNzcxMThdLFxuICAgICAgICBbMTE0LjMyOTIyMzYzMjgxMjQ5LCAyMi40NzI1ODkwMTI1NjE5NTRdLFxuICAgICAgICBbMTE0LjMyMzczMDQ2ODc1LCAyMi40NzcwMzA0NjQ5MzMzMDddLFxuICAgICAgICBbMTE0LjMxOTYxMDU5NTcwMzEyLCAyMi40Nzg5MzM5MDA5MTY5MjhdLFxuICAgICAgICBbMTE0LjMwMTc1NzgxMjUsIDIyLjQ2NjI0MzgzMzU0OTQ0NV0sXG4gICAgICAgIFsxMTQuMzAyNDQ0NDU4MDA3ODEsIDIyLjQ1NzM2MDA5NDc1MDA4M10sXG4gICAgICAgIFsxMTQuMjkyODMxNDIwODk4NDQsIDIyLjQ1NDgyMTc3OTA3NTgzMl0sXG4gICAgICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQ1MTAxNDIxODQyMjY5XSxcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40NDI3NjQxNDUwMDE3MDddLFxuICAgICAgICBbMTE0LjI5MDc3MTQ4NDM3NDk5LCAyMi40MjgxNjY2NTkyNzk2MTVdLFxuICAgICAgICBbMTE0LjI3NzAzODU3NDIxODc1LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQxMjkzMjg2MzUxNzcxN11cbiAgICAgIF0pLFxuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XSxcbiAgICAgICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuNDE0MjAyNDEwMzIxMzAyXSxcbiAgICAgICAgWzExNC4zMDU4Nzc2ODU1NDY4NiwgMjIuNDA4NDg5MzU4MzQyNjM1XSxcbiAgICAgICAgWzExNC4zMjIzNTcxNzc3MzQzOCwgMjIuNDIxMTg0NzEwMzMxODU4XSxcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddXG4gICAgICBdKVxuICAgIF0sIHtcbiAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICAgIH1cbiAgKVxuICAuYWRkVG8obWFwKVxuICAuYmluZFBvcHVwKFwiSSdtIGEgcG9seWdvbiB3aXRoIGhvbGVcIik7XG5cbnZhciBjaXJjbGUgPSBuZXcgTC5DaXJjbGUoWzIyLjM2MDg5NzI0MDEzMjM3MywgMTE0LjE0NTIwMjYzNjcxODc1XSwgNDAwMCwge1xuICAgIGRyYWdnYWJsZTogdHJ1ZVxuICB9KVxuICAuYmluZFBvcHVwKFwiTC5DaXJjbGVcIilcbiAgLmFkZFRvKG1hcClcblxudmFyIGNpcmNsZU1hcmtlciA9IG5ldyBMLkNpcmNsZU1hcmtlcihtYXAuZ2V0Q2VudGVyKCksIHtcbiAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgcmVuZGVyZXI6IHJlbmRlcmVyXG4gIH0pXG4gIC5iaW5kUG9wdXAoXCJMLkNpcmNsZU1hcmtlclwiKVxuICAuYWRkVG8obWFwKTtcblxudmFyIG11bHRpUG9seWdvbiA9IGdsb2JhbC5tdWx0aVBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdLFxuICAgIFsxMTQuMjE1OTI3MTI0MDIzNDQsIDIyLjM1MjYxNjAzNTUxMjE1XSxcbiAgICBbMTE0LjI2NDY3ODk1NTA3ODEyLCAyMi4zNTEzNDU5MjY2MDY5NTddLFxuICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuMzI0MDM1Nzg1ODQwMzhdLFxuICAgIFsxMTQuMjkyMTQ0Nzc1MzkwNjIsIDIyLjMyNzIxMTY1ODM4ODkzXSxcbiAgICBbMTE0LjMwMTc1NzgxMjUsIDIyLjMxMTk2NjgxMDk3NzYxNl0sXG4gICAgWzExNC4yOTQyMDQ3MTE5MTQwNiwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjI5MzUxODA2NjQwNjI1LCAyMi4yNzI1NzY1ODU0MTM0NzVdLFxuICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjI2MTc3NDEwMDk3NDM1XSxcbiAgICBbMTE0LjI2ODc5ODgyODEyNSwgMjIuMjgxNDcyMTIyNzgzODE4XSxcbiAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjI5NDgxNDM2Nzc4MDUxOF0sXG4gICAgWzExNC4yNjk0ODU0NzM2MzI4MSwgMjIuMzAyNDM3OTM1OTA0NDhdLFxuICAgIFsxMTQuMjcwMTcyMTE5MTQwNjIsIDIyLjMxNTE0Mjk1ODE2OTM5XSxcbiAgICBbMTE0LjI1NzgxMjUsIDIyLjMxMTk2NjgxMDk3NzYxNl0sXG4gICAgWzExNC4yNDc1MTI4MTczODI4MSwgMjIuMjk5ODk2NzkyNzUxOTI3XSxcbiAgICBbMTE0LjI0NTQ1Mjg4MDg1OTM4LCAyMi4yOTEwMDI0Mjc3MzUzMjVdLFxuICAgIFsxMTQuMjI5NjYwMDM0MTc5NjksIDIyLjMwNzUyMDA4MzUyMjQ3Nl0sXG4gICAgWzExNC4yMjA3MzM2NDI1NzgxMiwgMjIuMzA1NjE0Mjk5ODM3MDQ2XSxcbiAgICBbMTE0LjIwNTYyNzQ0MTQwNjI1LCAyMi4zMjA4NTk4NDEwMDU5M11cbiAgXSksXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMzE1NDkwNzIyNjU2MjUsIDIyLjMzOTI3OTMxNDY4MzEyXSxcbiAgICBbMTE0LjMyMDI5NzI0MTIxMDk0LCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzI5OTEwMjc4MzIwMzEsIDIyLjMyNjU3NjQ4OTY2MjQ4Ml0sXG4gICAgWzExNC4zMzMzNDM1MDU4NTkzOCwgMjIuMzMyMjkyOTA0MDkxNzE2XSxcbiAgICBbMTE0LjMyMzA0MzgyMzI0MjE5LCAyMi4zNDI0NTQ4NDAxNDY1XSxcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl1cbiAgXSksXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF0sXG4gICAgWzExNC4yODExNTg0NDcyNjU2MiwgMjIuMjUxNjA2Mjk1MTMyOTQ4XSxcbiAgICBbMTE0LjI4NjY1MTYxMTMyODEyLCAyMi4yNTU0MTkzMDg4NTg1NTZdLFxuICAgIFsxMTQuMjk5Njk3ODc1OTc2NTYsIDIyLjI2MTEzODYzNDc0NDQ5XSxcbiAgICBbMTE0LjI5NjI2NDY0ODQzNzUsIDIyLjI1MDk3MDc4Mjc1MDg2Nl0sXG4gICAgWzExNC4yOTQ4OTEzNTc0MjE4OCwgMjIuMjQwODAyMTkyNDYzMzVdLFxuICAgIFsxMTQuMjkwMDg0ODM4ODY3MTcsIDIyLjIzODg5NTQ5OTYxMzIzMl0sXG4gICAgWzExNC4yNzkwOTg1MTA3NDIxOSwgMjIuMjQ0NjE1NTAwMzIzMDY0XVxuICBdKVxuXSwge1xuICBkcmFnZ2FibGU6IHRydWUsXG4gIHJlbmRlcmVyOiByZW5kZXJlcixcbiAgY29sb3I6ICcjMDkyJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlnb24nKS5hZGRUbyhtYXApO1xuXG52YXIgbXVsdGlQb2x5bGluZSA9IGdsb2JhbC5tdWx0aVBvbHlsaW5lID0gbmV3IEwuUG9seWxpbmUoW1xuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTEzLjg5ODY5Njg5OTQxNDA2LCAyMi4zOTk2MDE5MjE3MDY5NTNdLFxuICAgIFsxMTMuODk4MDEwMjUzOTA2MjUsIDIyLjQyMjQ1NDE4MTcwOTcwN10sXG4gICAgWzExMy45MDM1MDM0MTc5Njg3NSwgMjIuNDMzMjQ0MjE5NzgxMTddLFxuICAgIFsxMTMuOTA5NjgzMjI3NTM5MDYsIDIyLjQ0OTExMDM5ODg4NjEwNl0sXG4gICAgWzExMy45MDY5MzY2NDU1MDc4MSwgMjIuNDc4Mjk5NDI1MTYyODUyXSxcbiAgICBbMTEzLjkyMzQxNjEzNzY5NTMsIDIyLjQ4ODQ1MDY4ODMyNTQwOF0sXG4gICAgWzExMy45MzM3MTU4MjAzMTI1LCAyMi40ODMzNzUxNDk3ODk2MjNdLFxuICAgIFsxMTMuOTQ0NzAyMTQ4NDM3NSwgMjIuNDkyMjU3MjIwMDg1MTkzXSxcbiAgICBbMTEzLjk1MjI1NTI0OTAyMzQ0LCAyMi41MTI1NTY5NTQwNTE0NV1cbiAgXSksXG5cbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExMy44Njc3OTc4NTE1NjI1LCAyMi4zOTI2MTg1MzcxMzczOF0sXG4gICAgWzExMy44NjkxNzExNDI1NzgxMSwgMjIuNDI3NTMxOTUxMTU2OTldLFxuICAgIFsxMTMuOTIzNDE2MTM3Njk1MywgMjIuNDYyNDM2NTg2NjUzMTQ4XSxcbiAgICBbMTEzLjk0ODEzNTM3NTk3NjU2LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuICAgIFsxMTMuOTc4MzQ3Nzc4MzIwMywgMjIuNDk5MjM1NTg5NjgzMDZdLFxuICAgIFsxMTMuOTk2ODg3MjA3MDMxMjUsIDIyLjUxMTkyMjYzMjQ2ODg2XSxcbiAgICBbMTE0LjAxMzM2NjY5OTIxODc1LCAyMi41MDExMzg3MjAzMDAyNTRdLFxuICAgIFsxMTQuMDI1MDM5NjcyODUxNTUsIDIyLjUwODExNjY0MTg1MzY3NV1cbiAgXSlcbl0sIHtcbiAgZHJhZ2dhYmxlOiB0cnVlLFxuICBjb2xvcjogJyNlOTAnXG59KS5iaW5kUG9wdXAoJ011bHRpUG9seWxpbmUnKS5hZGRUbyhtYXApO1xuXG52YXIgbWFya2VyID0gbmV3IEwuTWFya2VyKG1hcC5nZXRDZW50ZXIoKSwge1xuICBkcmFnZ2FibGU6IHRydWVcbn0pLmFkZFRvKG1hcCk7XG4iLCJyZXF1aXJlKCcuL3NyYy9TVkcnKTtcbnJlcXVpcmUoJy4vc3JjL1NWRy5WTUwnKTtcbnJlcXVpcmUoJy4vc3JjL0NhbnZhcycpO1xucmVxdWlyZSgnLi9zcmMvUGF0aC5UcmFuc2Zvcm0nKTtcbnJlcXVpcmUoJy4vc3JjL1BhdGguRHJhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEwuUGF0aC5EcmFnO1xuIiwiTC5VdGlsLnRydWVGbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkwuQ2FudmFzLmluY2x1ZGUoe1xuXG4gIC8qKlxuICAgKiBEbyBub3RoaW5nXG4gICAqIEBwYXJhbSAge0wuUGF0aH0gbGF5ZXJcbiAgICovXG4gIF9yZXNldFRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgaWYgKCF0aGlzLl9jb250YWluZXJDb3B5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5fY29udGFpbmVyQ29weSk7XG4gICAgZGVsZXRlIHRoaXMuX2NvbnRhaW5lckNvcHk7XG5cblxuICAgIGlmIChsYXllci5fY29udGFpbnNQb2ludF8pIHtcbiAgICAgIGxheWVyLl9jb250YWluc1BvaW50ID0gbGF5ZXIuX2NvbnRhaW5zUG9pbnRfO1xuICAgICAgZGVsZXRlIGxheWVyLl9jb250YWluc1BvaW50XztcblxuICAgICAgdGhpcy5fcmVxdWVzdFJlZHJhdyhsYXllcik7XG4gICAgICB0aGlzLl9kcmF3KHRydWUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQWxnb3JpdGhtIG91dGxpbmU6XG4gICAqXG4gICAqIDEuIHByZS10cmFuc2Zvcm0gLSBjbGVhciB0aGUgcGF0aCBvdXQgb2YgdGhlIGNhbnZhcywgY29weSBjYW52YXMgc3RhdGVcbiAgICogMi4gYXQgZXZlcnkgZnJhbWU6XG4gICAqICAgIDIuMS4gc2F2ZVxuICAgKiAgICAyLjIuIHJlZHJhdyB0aGUgY2FudmFzIGZyb20gc2F2ZWQgb25lXG4gICAqICAgIDIuMy4gdHJhbnNmb3JtXG4gICAqICAgIDIuNC4gZHJhdyBwYXRoXG4gICAqICAgIDIuNS4gcmVzdG9yZVxuICAgKlxuICAgKiBAcGFyYW0gIHtMLlBhdGh9IGxheWVyXG4gICAqIEBwYXJhbSAge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcbiAgICovXG4gIHRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyLCBtYXRyaXgpIHtcbiAgICB2YXIgY29weSA9IHRoaXMuX2NvbnRhaW5lckNvcHk7XG4gICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcblxuICAgIGlmICghY29weSkge1xuICAgICAgY29weSA9IHRoaXMuX2NvbnRhaW5lckNvcHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGNvcHkud2lkdGggPSB0aGlzLl9jb250YWluZXIud2lkdGg7XG4gICAgICBjb3B5LmhlaWdodCA9IHRoaXMuX2NvbnRhaW5lci5oZWlnaHQ7XG5cbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weSk7XG4gICAgICBjb3B5LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGNvcHkuc3R5bGUudG9wID0gY29weS5zdHlsZS5sZWZ0ID0gMDtcbiAgICAgIGNvcHkuc3R5bGUuekluZGV4ID0gOTk5OTtcbiAgICAgIGNvcHkuc3R5bGUud2lkdGggPSB0aGlzLl9jb250YWluZXIud2lkdGggLyA1ICsgJ3B4JztcbiAgICAgIGNvcHkuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fY29udGFpbmVyLmhlaWdodCAvIDUgKyAncHgnO1xuXG4gICAgICBsYXllci5fcmVtb3ZlZCA9IHRydWU7XG4gICAgICB0aGlzLl9yZWRyYXcoKTtcblxuICAgICAgY29weS5nZXRDb250ZXh0KCcyZCcpLnRyYW5zbGF0ZSh0aGlzLl9ib3VuZHMubWluLngsIHRoaXMuX2JvdW5kcy5taW4ueSk7XG4gICAgICBjb3B5LmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKHRoaXMuX2NvbnRhaW5lciwgMCwgMCk7XG4gICAgICB0aGlzLl9pbml0UGF0aChsYXllcik7XG4gICAgICBsYXllci5fY29udGFpbnNQb2ludF8gPSBsYXllci5fY29udGFpbnNQb2ludDtcbiAgICAgIGxheWVyLl9jb250YWluc1BvaW50ID0gTC5VdGlsLnRydWVGbjtcbiAgICB9XG5cbiAgICBjdHguY2xlYXJSZWN0KFxuICAgICAgdGhpcy5fYm91bmRzLm1pbi54LCB0aGlzLl9ib3VuZHMubWluLnksXG4gICAgICB0aGlzLl9jb250YWluZXIud2lkdGgsIHRoaXMuX2NvbnRhaW5lci5oZWlnaHQpO1xuXG4gICAgY3R4LnNhdmUoKTtcblxuICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5fY29udGFpbmVyQ29weSwgMCwgMCk7XG4gICAgY3R4LnRyYW5zZm9ybS5hcHBseSh0aGlzLl9jdHgsIG1hdHJpeCk7XG5cbiAgICB2YXIgbGF5ZXJzID0gdGhpcy5fbGF5ZXJzO1xuICAgIHRoaXMuX2xheWVycyA9IHt9O1xuXG4gICAgdGhpcy5faW5pdFBhdGgobGF5ZXIpO1xuICAgIGxheWVyLl91cGRhdGVQYXRoKCk7XG5cbiAgICB0aGlzLl9sYXllcnMgPSBsYXllcnM7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG59KTtcbiIsIi8qKlxuICogTGVhZmxldCB2ZWN0b3IgZmVhdHVyZXMgZHJhZyBmdW5jdGlvbmFsaXR5XG4gKiBAcHJlc2VydmVcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBEcmFnIGhhbmRsZXJcbiAqIEBjbGFzcyBMLlBhdGguRHJhZ1xuICogQGV4dGVuZHMge0wuSGFuZGxlcn1cbiAqL1xuTC5IYW5kbGVyLlBhdGhEcmFnID0gTC5IYW5kbGVyLmV4dGVuZCggLyoqIEBsZW5kcyAgTC5QYXRoLkRyYWcucHJvdG90eXBlICovIHtcblxuICAvKipcbiAgICogQHBhcmFtICB7TC5QYXRofSBwYXRoXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUGF0aH1cbiAgICAgKi9cbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48TnVtYmVyPn1cbiAgICAgKi9cbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUG9pbnR9XG4gICAgICovXG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7TC5Qb2ludH1cbiAgICAgKi9cbiAgICB0aGlzLl9kcmFnU3RhcnRQb2ludCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQgPSBmYWxzZTtcblxuICB9LFxuXG4gIC8qKlxuICAgKiBFbmFibGUgZHJhZ2dpbmdcbiAgICovXG4gIGFkZEhvb2tzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9wYXRoLm9uKEwuRHJhZ2dhYmxlLlNUQVJULmpvaW4oJyAnKSwgdGhpcy5fb25EcmFnU3RhcnQsIHRoaXMpO1xuICAgIGlmICh0aGlzLl9wYXRoLl9wYXRoKSB7XG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fcGF0aC5fcGF0aCwgJ2xlYWZsZXQtcGF0aC1kcmFnZ2FibGUnKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIERpc2FibGUgZHJhZ2dpbmdcbiAgICovXG4gIHJlbW92ZUhvb2tzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9wYXRoLm9mZihMLkRyYWdnYWJsZS5TVEFSVC5qb2luKCcgJyksIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKTtcbiAgICBpZiAodGhpcy5fcGF0aC5fcGF0aCkge1xuICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3BhdGguX3BhdGgsICdsZWFmbGV0LXBhdGgtZHJhZ2dhYmxlJyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgbW92ZWQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9wYXRoLl9kcmFnTW92ZWQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGRyYWdcbiAgICogQHBhcmFtICB7TC5Nb3VzZUV2ZW50fSBldnRcbiAgICovXG4gIF9vbkRyYWdTdGFydDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIGV2ZW50VHlwZSA9IGV2dC5vcmlnaW5hbEV2ZW50LnR5cGU7XG4gICAgdGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IGV2dC5jb250YWluZXJQb2ludC5jbG9uZSgpO1xuICAgIHRoaXMuX2RyYWdTdGFydFBvaW50ID0gZXZ0LmNvbnRhaW5lclBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5fbWF0cml4ID0gWzEsIDAsIDAsIDEsIDAsIDBdO1xuICAgIEwuRG9tRXZlbnQuc3RvcChldnQub3JpZ2luYWxFdmVudCk7XG5cbiAgICBjb25zb2xlLmxvZyhldmVudFR5cGUsIEwuRHJhZ2dhYmxlLkVORFtldmVudFR5cGVdLCBMLkRyYWdnYWJsZS5NT1ZFW2V2ZW50VHlwZV0pO1xuXG4gICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3BhdGguX3JlbmRlcmVyLl9jb250YWluZXIsICdsZWFmbGV0LWludGVyYWN0aXZlJyk7XG5cbiAgICAvLyB0aGlzLl9wYXRoLl9tYXAub24oJ21vdXNlbW92ZScsIHRoaXMuX29uRHJhZywgdGhpcyk7XG4gICAgLy8gdGhpcy5fcGF0aFxuICAgIC8vICAgLm9uKCdtb3VzZW1vdmUnLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgLy8gICAub24oJ21vdXNldXAnLCB0aGlzLl9vbkRyYWdFbmQsIHRoaXMpO1xuXG4gICAgdGhpcy5fcGF0aC5fbWFwLm9uKEwuRHJhZ2dhYmxlLk1PVkVbZXZlbnRUeXBlXSwgdGhpcy5fb25EcmFnLCB0aGlzKTtcbiAgICB0aGlzLl9wYXRoXG4gICAgICAub24oTC5EcmFnZ2FibGUuTU9WRVtldmVudFR5cGVdLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgICAub24oTC5EcmFnZ2FibGUuRU5EW2V2ZW50VHlwZV0sIHRoaXMuX29uRHJhZ0VuZCwgdGhpcyk7XG5cbiAgICBpZiAodGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmVuYWJsZWQoKSkge1xuICAgICAgdGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gICAgfVxuICAgIHRoaXMuX3BhdGguX2RyYWdNb3ZlZCA9IGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEcmFnZ2luZ1xuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZzogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIHggPSBldnQuY29udGFpbmVyUG9pbnQueDtcbiAgICB2YXIgeSA9IGV2dC5jb250YWluZXJQb2ludC55O1xuXG4gICAgdmFyIGR4ID0geCAtIHRoaXMuX3N0YXJ0UG9pbnQueDtcbiAgICB2YXIgZHkgPSB5IC0gdGhpcy5fc3RhcnRQb2ludC55O1xuXG4gICAgaWYgKCF0aGlzLl9wYXRoLl9kcmFnTW92ZWQgJiYgKGR4IHx8IGR5KSkge1xuICAgICAgdGhpcy5fcGF0aC5fZHJhZ01vdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3BhdGguZmlyZSgnZHJhZ3N0YXJ0Jyk7XG4gICAgICAvLyB3ZSBkb24ndCB3YW50IHRoYXQgdG8gaGFwcGVuIG9uIGNsaWNrXG4gICAgICB0aGlzLl9wYXRoLmJyaW5nVG9Gcm9udCgpO1xuICAgIH1cblxuICAgIHRoaXMuX21hdHJpeFs0XSArPSBkeDtcbiAgICB0aGlzLl9tYXRyaXhbNV0gKz0gZHk7XG5cbiAgICB0aGlzLl9zdGFydFBvaW50LnggPSB4O1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQueSA9IHk7XG5cbiAgICB0aGlzLl9wYXRoLnRyYW5zZm9ybSh0aGlzLl9tYXRyaXgpO1xuICAgIHRoaXMuX3BhdGguZmlyZSgnZHJhZycpO1xuICAgIEwuRG9tRXZlbnQuc3RvcChldnQub3JpZ2luYWxFdmVudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERyYWdnaW5nIHN0b3BwZWQsIGFwcGx5XG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnRW5kOiBmdW5jdGlvbihldnQpIHtcbiAgICB2YXIgZXZlbnRUeXBlID0gZXZ0Lm9yaWdpbmFsRXZlbnQudHlwZTtcblxuICAgIC8vIGFwcGx5IG1hdHJpeFxuICAgIGlmICh0aGlzLm1vdmVkKCkpIHtcbiAgICAgIHRoaXMuX3RyYW5zZm9ybVBvaW50cyh0aGlzLl9tYXRyaXgpO1xuICAgICAgdGhpcy5fcGF0aC5fcHJvamVjdCgpO1xuICAgICAgdGhpcy5fcGF0aC50cmFuc2Zvcm0obnVsbCk7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5fcGF0aC5fbWFwLm9mZihMLkRyYWdnYWJsZS5NT1ZFW2V2ZW50VHlwZV0sIHRoaXMuX29uRHJhZywgdGhpcyk7XG4gICAgLy8gdGhpcy5fcGF0aFxuICAgIC8vICAgLm9mZihMLkRyYWdnYWJsZS5NT1ZFW2V2ZW50VHlwZV0sIHRoaXMuX29uRHJhZywgdGhpcylcbiAgICAvLyAgIC5vZmYoTC5EcmFnZ2FibGUuRU5EW2V2ZW50VHlwZV0sIHRoaXMuX29uRHJhZ0VuZCwgdGhpcyk7XG5cbiAgICBjb25zb2xlLmxvZyhldmVudFR5cGUsIEwuRHJhZ2dhYmxlLkVORFtldmVudFR5cGVdLCBMLkRyYWdnYWJsZS5NT1ZFW2V2ZW50VHlwZV0pO1xuICAgIGZvciAodmFyIGkgaW4gTC5EcmFnZ2FibGUuTU9WRSkge1xuICAgICAgdGhpcy5fcGF0aC5fbWFwLm9mZihMLkRyYWdnYWJsZS5NT1ZFW2ldLCB0aGlzLl9vbkRyYWcsIHRoaXMpO1xuICAgICAgdGhpcy5fcGF0aC5vZmYoTC5EcmFnZ2FibGUuTU9WRVtpXSwgdGhpcy5fb25EcmFnLCB0aGlzKVxuICAgICAgICAub2ZmKEwuRHJhZ2dhYmxlLkVORFtpXSwgdGhpcy5fb25VcCwgdGhpcyk7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5fcGF0aC5fbWFwLm9mZignbW91c2Vtb3ZlJywgdGhpcy5fb25EcmFnLCB0aGlzKTtcbiAgICAvLyB0aGlzLl9wYXRoXG4gICAgLy8gICAub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgLy8gICAub2ZmKCdtb3VzZXVwJywgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcblxuICAgIC8vIGNvbnNpc3RlbmN5XG4gICAgdGhpcy5fcGF0aC5maXJlKCdkcmFnZW5kJywge1xuICAgICAgZGlzdGFuY2U6IE1hdGguc3FydChcbiAgICAgICAgTC5MaW5lVXRpbC5fc3FEaXN0KHRoaXMuX2RyYWdTdGFydFBvaW50LCBldnQuY29udGFpbmVyUG9pbnQpXG4gICAgICApXG4gICAgfSk7XG5cbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSBudWxsO1xuICAgIHRoaXMuX2RyYWdTdGFydFBvaW50ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQpIHtcbiAgICAgIHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdHJhbnNmb3JtYXRpb24sIGRvZXMgaXQgaW4gb25lIHN3ZWVwIGZvciBwZXJmb3JtYW5jZSxcbiAgICogc28gZG9uJ3QgYmUgc3VycHJpc2VkIGFib3V0IHRoZSBjb2RlIHJlcGV0aXRpb24uXG4gICAqXG4gICAqIFsgeCBdICAgWyBhICBiICB0eCBdIFsgeCBdICAgWyBhICogeCArIGIgKiB5ICsgdHggXVxuICAgKiBbIHkgXSA9IFsgYyAgZCAgdHkgXSBbIHkgXSA9IFsgYyAqIHggKyBkICogeSArIHR5IF1cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG4gICAqL1xuICBfdHJhbnNmb3JtUG9pbnRzOiBmdW5jdGlvbihtYXRyaXgpIHtcbiAgICB2YXIgcGF0aCA9IHRoaXMuX3BhdGg7XG4gICAgdmFyIGksIGxlbiwgbGF0bG5nO1xuXG4gICAgdmFyIHB4ID0gTC5wb2ludChtYXRyaXhbNF0sIG1hdHJpeFs1XSk7XG5cbiAgICB2YXIgY3JzID0gcGF0aC5fbWFwLm9wdGlvbnMuY3JzO1xuICAgIHZhciB0cmFuc2Zvcm1hdGlvbiA9IGNycy50cmFuc2Zvcm1hdGlvbjtcbiAgICB2YXIgc2NhbGUgPSBjcnMuc2NhbGUocGF0aC5fbWFwLmdldFpvb20oKSk7XG4gICAgdmFyIHByb2plY3Rpb24gPSBjcnMucHJvamVjdGlvbjtcblxuICAgIHZhciBkaWZmID0gdHJhbnNmb3JtYXRpb24udW50cmFuc2Zvcm0ocHgsIHNjYWxlKVxuICAgICAgLnN1YnRyYWN0KHRyYW5zZm9ybWF0aW9uLnVudHJhbnNmb3JtKEwucG9pbnQoMCwgMCksIHNjYWxlKSk7XG5cbiAgICBwYXRoLl9ib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoKTtcblxuICAgIC8vIGNvbnNvbGUudGltZSgndHJhbnNmb3JtJyk7XG4gICAgLy8gYWxsIHNoaWZ0cyBhcmUgaW4tcGxhY2VcbiAgICBpZiAocGF0aC5fcG9pbnQpIHsgLy8gTC5DaXJjbGVcbiAgICAgIHBhdGguX2xhdGxuZyA9IHByb2plY3Rpb24udW5wcm9qZWN0KFxuICAgICAgICBwcm9qZWN0aW9uLnByb2plY3QocGF0aC5fbGF0bG5nKS5fYWRkKGRpZmYpKTtcbiAgICAgIHBhdGguX3BvaW50Ll9hZGQocHgpO1xuICAgIH0gZWxzZSBpZiAocGF0aC5fcmluZ3MgfHwgcGF0aC5fcGFydHMpIHsgLy8gZXZlcnl0aGluZyBlbHNlXG4gICAgICB2YXIgcmluZ3MgPSBwYXRoLl9yaW5ncyB8fCBwYXRoLl9wYXJ0cztcbiAgICAgIHZhciBsYXRsbmdzID0gcGF0aC5fbGF0bG5ncztcbiAgICAgIGlmICghTC5VdGlsLmlzQXJyYXkobGF0bG5nc1swXSkpIHsgLy8gcG9seWxpbmVcbiAgICAgICAgbGF0bG5ncyA9IFtsYXRsbmdzXTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJpbmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwLCBqaiA9IHJpbmdzW2ldLmxlbmd0aDsgaiA8IGpqOyBqKyspIHtcbiAgICAgICAgICBsYXRsbmcgPSBsYXRsbmdzW2ldW2pdO1xuICAgICAgICAgIGxhdGxuZ3NbaV1bal0gPSBwcm9qZWN0aW9uXG4gICAgICAgICAgICAudW5wcm9qZWN0KHByb2plY3Rpb24ucHJvamVjdChsYXRsbmcpLl9hZGQoZGlmZikpO1xuICAgICAgICAgIHBhdGguX2JvdW5kcy5leHRlbmQobGF0bG5nc1tpXVtqXSk7XG4gICAgICAgICAgcmluZ3NbaV1bal0uX2FkZChweCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY29uc29sZS50aW1lRW5kKCd0cmFuc2Zvcm0nKTtcblxuICAgIHBhdGguX3VwZGF0ZVBhdGgoKTtcbiAgfVxuXG59KTtcblxuTC5QYXRoLmFkZEluaXRIb29rKGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5vcHRpb25zLmRyYWdnYWJsZSkge1xuICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gbmV3IEwuSGFuZGxlci5QYXRoRHJhZyh0aGlzKTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICB0aGlzLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgfVxufSk7XG4iLCIvKipcbiAqIE1hdHJpeCB0cmFuc2Zvcm0gcGF0aCBmb3IgU1ZHL1ZNTFxuICogVE9ETzogYWRhcHQgdG8gTGVhZmxldCAwLjggdXBvbiByZWxlYXNlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIFJlbmRlcmVyLWluZGVwZW5kZW50XG5MLlBhdGguaW5jbHVkZSh7XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgbWF0cml4IHRyYW5zZm9ybWF0aW9uIHRvIFNWR1xuXHQgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+P30gbWF0cml4XG5cdCAqL1xuXHR0cmFuc2Zvcm06IGZ1bmN0aW9uKG1hdHJpeCkge1xuXHRcdGlmICh0aGlzLl9yZW5kZXJlcikge1xuXHRcdFx0aWYgKG1hdHJpeCkge1xuXHRcdFx0XHR0aGlzLl9yZW5kZXJlci50cmFuc2Zvcm1QYXRoKHRoaXMsIG1hdHJpeCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyByZXNldCB0cmFuc2Zvcm0gbWF0cml4XG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVyLl9yZXNldFRyYW5zZm9ybVBhdGgodGhpcyk7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKipcblx0ICogQ2hlY2sgaWYgdGhlIGZlYXR1cmUgd2FzIGRyYWdnZWQsIHRoYXQnbGwgc3VwcmVzcyB0aGUgY2xpY2sgZXZlbnRcblx0ICogb24gbW91c2V1cC4gVGhhdCBmaXhlcyBwb3B1cHMgZm9yIGV4YW1wbGVcblx0ICpcblx0ICogQHBhcmFtICB7TW91c2VFdmVudH0gZVxuXHQgKi9cblx0X29uTW91c2VDbGljazogZnVuY3Rpb24oZSkge1xuXHRcdGlmICgodGhpcy5kcmFnZ2luZyAmJiB0aGlzLmRyYWdnaW5nLm1vdmVkKCkpIHx8XG5cdFx0XHQodGhpcy5fbWFwLmRyYWdnaW5nICYmIHRoaXMuX21hcC5kcmFnZ2luZy5tb3ZlZCgpKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX2ZpcmVNb3VzZUV2ZW50KGUpO1xuXHR9XG5cbn0pO1xuIiwiTC5TVkcuaW5jbHVkZSghTC5Ccm93c2VyLnZtbCA/IHt9IDoge1xuXG5cdC8qKlxuXHQgKiBSZXNldCB0cmFuc2Zvcm0gbWF0cml4XG5cdCAqL1xuXHRfcmVzZXRUcmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllcikge1xuXHRcdGlmIChsYXllci5fc2tldykge1xuXHRcdFx0Ly8gc3VwZXIgaW1wb3J0YW50ISB3b3JrYXJvdW5kIGZvciBhICdqdW1waW5nJyBnbGl0Y2g6XG5cdFx0XHQvLyBkaXNhYmxlIHRyYW5zZm9ybSBiZWZvcmUgcmVtb3ZpbmcgaXRcblx0XHRcdGxheWVyLl9za2V3Lm9uID0gZmFsc2U7XG5cdFx0XHRsYXllci5fcGF0aC5yZW1vdmVDaGlsZChsYXllci5fc2tldyk7XG5cdFx0XHRsYXllci5fc2tldyA9IG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBWTUxcblx0ICogQHBhcmFtIHtMLlBhdGh9ICAgICAgICAgbGF5ZXJcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG5cdCAqL1xuXHR0cmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllciwgbWF0cml4KSB7XG5cdFx0dmFyIHNrZXcgPSBsYXllci5fc2tldztcblxuXHRcdGlmICghc2tldykge1xuXHRcdFx0c2tldyA9IEwuU1ZHLmNyZWF0ZSgnc2tldycpO1xuXHRcdFx0bGF5ZXIuX3BhdGguYXBwZW5kQ2hpbGQoc2tldyk7XG5cdFx0XHRza2V3LnN0eWxlLmJlaGF2aW9yID0gJ3VybCgjZGVmYXVsdCNWTUwpJztcblx0XHRcdGxheWVyLl9za2V3ID0gc2tldztcblx0XHR9XG5cblx0XHQvLyBoYW5kbGUgc2tldy90cmFuc2xhdGUgc2VwYXJhdGVseSwgY2F1c2UgaXQncyBicm9rZW5cblx0XHR2YXIgbXQgPSBtYXRyaXhbMF0udG9GaXhlZCg4KSArIFwiIFwiICsgbWF0cml4WzFdLnRvRml4ZWQoOCkgKyBcIiBcIiArXG5cdFx0XHRtYXRyaXhbMl0udG9GaXhlZCg4KSArIFwiIFwiICsgbWF0cml4WzNdLnRvRml4ZWQoOCkgKyBcIiAwIDBcIjtcblx0XHR2YXIgb2Zmc2V0ID0gTWF0aC5mbG9vcihtYXRyaXhbNF0pLnRvRml4ZWQoKSArIFwiLCBcIiArXG5cdFx0XHRNYXRoLmZsb29yKG1hdHJpeFs1XSkudG9GaXhlZCgpICsgXCJcIjtcblxuXHRcdHZhciBzID0gdGhpcy5fcGF0aC5zdHlsZTtcblx0XHR2YXIgbCA9IHBhcnNlRmxvYXQocy5sZWZ0KTtcblx0XHR2YXIgdCA9IHBhcnNlRmxvYXQocy50b3ApO1xuXHRcdHZhciB3ID0gcGFyc2VGbG9hdChzLndpZHRoKTtcblx0XHR2YXIgaCA9IHBhcnNlRmxvYXQocy5oZWlnaHQpO1xuXG5cdFx0aWYgKGlzTmFOKGwpKSBsID0gMDtcblx0XHRpZiAoaXNOYU4odCkpIHQgPSAwO1xuXHRcdGlmIChpc05hTih3KSB8fCAhdykgdyA9IDE7XG5cdFx0aWYgKGlzTmFOKGgpIHx8ICFoKSBoID0gMTtcblxuXHRcdHZhciBvcmlnaW4gPSAoLWwgLyB3IC0gMC41KS50b0ZpeGVkKDgpICsgXCIgXCIgKyAoLXQgLyBoIC0gMC41KS50b0ZpeGVkKDgpO1xuXG5cdFx0c2tldy5vbiA9IFwiZlwiO1xuXHRcdHNrZXcubWF0cml4ID0gbXQ7XG5cdFx0c2tldy5vcmlnaW4gPSBvcmlnaW47XG5cdFx0c2tldy5vZmZzZXQgPSBvZmZzZXQ7XG5cdFx0c2tldy5vbiA9IHRydWU7XG5cdH1cblxufSk7XG4iLCJMLlNWRy5pbmNsdWRlKHtcblxuXHQvKipcblx0ICogUmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHQgKi9cblx0X3Jlc2V0VHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIpIHtcblx0XHRsYXllci5fcGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndHJhbnNmb3JtJywgJycpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBTVkdcblx0ICogQHBhcmFtIHtMLlBhdGh9ICAgICAgICAgbGF5ZXJcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG5cdCAqL1xuXHR0cmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllciwgbWF0cml4KSB7XG5cdFx0bGF5ZXIuX3BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ0cmFuc2Zvcm1cIixcblx0XHRcdCdtYXRyaXgoJyArIG1hdHJpeC5qb2luKCcgJykgKyAnKScpO1xuXHR9XG5cbn0pO1xuIl19
