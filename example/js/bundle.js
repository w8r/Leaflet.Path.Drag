(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/w8r/Projects/Leaflet.Path.Drag/example/js/app.js":[function(require,module,exports){
(function (global){
var L = global.L || require('leaflet');
var DragHandler = require('../../index');

L.Icon.Default.imagePath = "http://cdn.leafletjs.com/leaflet-0.7/images";

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

var multiPolygon = global.multiPolygon = new L.MultiPolygon([
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

var multiPolyline = global.multiPolyline = new L.MultiPolyline([
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

},{"../../index":"/Users/w8r/Projects/Leaflet.Path.Drag/index.js","leaflet":"/Users/w8r/Projects/Leaflet.Path.Drag/node_modules/leaflet/dist/leaflet-src.js"}],"/Users/w8r/Projects/Leaflet.Path.Drag/index.js":[function(require,module,exports){
require('./src/Path.Transform');
require('./src/Path.Drag');
require('./src/MultiPoly.Drag');

module.exports = L.Path.Drag;

},{"./src/MultiPoly.Drag":"/Users/w8r/Projects/Leaflet.Path.Drag/src/MultiPoly.Drag.js","./src/Path.Drag":"/Users/w8r/Projects/Leaflet.Path.Drag/src/Path.Drag.js","./src/Path.Transform":"/Users/w8r/Projects/Leaflet.Path.Drag/src/Path.Transform.js"}],"/Users/w8r/Projects/Leaflet.Path.Drag/node_modules/leaflet/dist/leaflet-src.js":[function(require,module,exports){
/*
 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
 (c) 2010-2013, Vladimir Agafonkin
 (c) 2010-2011, CloudMade
*/
(function (window, document, undefined) {
var oldL = window.L,
    L = {};

L.version = '0.7.7';

// define Leaflet for Node module pattern loaders, including Browserify
if (typeof module === 'object' && typeof module.exports === 'object') {
	module.exports = L;

// define Leaflet as an AMD module
} else if (typeof define === 'function' && define.amd) {
	define(L);
}

// define Leaflet as a global L variable, saving the original L to restore later if needed

L.noConflict = function () {
	window.L = oldL;
	return this;
};

window.L = L;


/*
 * L.Util contains various utility functions used throughout Leaflet code.
 */

L.Util = {
	extend: function (dest) { // (Object[, Object, ...]) ->
		var sources = Array.prototype.slice.call(arguments, 1),
		    i, j, len, src;

		for (j = 0, len = sources.length; j < len; j++) {
			src = sources[j] || {};
			for (i in src) {
				if (src.hasOwnProperty(i)) {
					dest[i] = src[i];
				}
			}
		}
		return dest;
	},

	bind: function (fn, obj) { // (Function, Object) -> Function
		var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
		return function () {
			return fn.apply(obj, args || arguments);
		};
	},

	stamp: (function () {
		var lastId = 0,
		    key = '_leaflet_id';
		return function (obj) {
			obj[key] = obj[key] || ++lastId;
			return obj[key];
		};
	}()),

	invokeEach: function (obj, method, context) {
		var i, args;

		if (typeof obj === 'object') {
			args = Array.prototype.slice.call(arguments, 3);

			for (i in obj) {
				method.apply(context, [i, obj[i]].concat(args));
			}
			return true;
		}

		return false;
	},

	limitExecByInterval: function (fn, time, context) {
		var lock, execOnUnlock;

		return function wrapperFn() {
			var args = arguments;

			if (lock) {
				execOnUnlock = true;
				return;
			}

			lock = true;

			setTimeout(function () {
				lock = false;

				if (execOnUnlock) {
					wrapperFn.apply(context, args);
					execOnUnlock = false;
				}
			}, time);

			fn.apply(context, args);
		};
	},

	falseFn: function () {
		return false;
	},

	formatNum: function (num, digits) {
		var pow = Math.pow(10, digits || 5);
		return Math.round(num * pow) / pow;
	},

	trim: function (str) {
		return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
	},

	splitWords: function (str) {
		return L.Util.trim(str).split(/\s+/);
	},

	setOptions: function (obj, options) {
		obj.options = L.extend({}, obj.options, options);
		return obj.options;
	},

	getParamString: function (obj, existingUrl, uppercase) {
		var params = [];
		for (var i in obj) {
			params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
		}
		return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
	},
	template: function (str, data) {
		return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
			var value = data[key];
			if (value === undefined) {
				throw new Error('No value provided for variable ' + str);
			} else if (typeof value === 'function') {
				value = value(data);
			}
			return value;
		});
	},

	isArray: Array.isArray || function (obj) {
		return (Object.prototype.toString.call(obj) === '[object Array]');
	},

	emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
};

(function () {

	// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

	function getPrefixed(name) {
		var i, fn,
		    prefixes = ['webkit', 'moz', 'o', 'ms'];

		for (i = 0; i < prefixes.length && !fn; i++) {
			fn = window[prefixes[i] + name];
		}

		return fn;
	}

	var lastTime = 0;

	function timeoutDefer(fn) {
		var time = +new Date(),
		    timeToCall = Math.max(0, 16 - (time - lastTime));

		lastTime = time + timeToCall;
		return window.setTimeout(fn, timeToCall);
	}

	var requestFn = window.requestAnimationFrame ||
	        getPrefixed('RequestAnimationFrame') || timeoutDefer;

	var cancelFn = window.cancelAnimationFrame ||
	        getPrefixed('CancelAnimationFrame') ||
	        getPrefixed('CancelRequestAnimationFrame') ||
	        function (id) { window.clearTimeout(id); };


	L.Util.requestAnimFrame = function (fn, context, immediate, element) {
		fn = L.bind(fn, context);

		if (immediate && requestFn === timeoutDefer) {
			fn();
		} else {
			return requestFn.call(window, fn, element);
		}
	};

	L.Util.cancelAnimFrame = function (id) {
		if (id) {
			cancelFn.call(window, id);
		}
	};

}());

// shortcuts for most used utility functions
L.extend = L.Util.extend;
L.bind = L.Util.bind;
L.stamp = L.Util.stamp;
L.setOptions = L.Util.setOptions;


/*
 * L.Class powers the OOP facilities of the library.
 * Thanks to John Resig and Dean Edwards for inspiration!
 */

L.Class = function () {};

L.Class.extend = function (props) {

	// extended class with the new prototype
	var NewClass = function () {

		// call the constructor
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}

		// call all constructor hooks
		if (this._initHooks) {
			this.callInitHooks();
		}
	};

	// instantiate class without calling constructor
	var F = function () {};
	F.prototype = this.prototype;

	var proto = new F();
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	//inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if (props.statics) {
		L.extend(NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	if (props.includes) {
		L.Util.extend.apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	if (props.options && proto.options) {
		props.options = L.extend({}, proto.options, props.options);
	}

	// mix given properties into the prototype
	L.extend(proto, props);

	proto._initHooks = [];

	var parent = this;
	// jshint camelcase: false
	NewClass.__super__ = parent.prototype;

	// add method for calling all hooks
	proto.callInitHooks = function () {

		if (this._initHooksCalled) { return; }

		if (parent.prototype.callInitHooks) {
			parent.prototype.callInitHooks.call(this);
		}

		this._initHooksCalled = true;

		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
			proto._initHooks[i].call(this);
		}
	};

	return NewClass;
};


// method for adding properties to prototype
L.Class.include = function (props) {
	L.extend(this.prototype, props);
};

// merge new default options to the Class
L.Class.mergeOptions = function (options) {
	L.extend(this.prototype.options, options);
};

// add a constructor hook
L.Class.addInitHook = function (fn) { // (Function) || (String, args...)
	var args = Array.prototype.slice.call(arguments, 1);

	var init = typeof fn === 'function' ? fn : function () {
		this[fn].apply(this, args);
	};

	this.prototype._initHooks = this.prototype._initHooks || [];
	this.prototype._initHooks.push(init);
};


/*
 * L.Mixin.Events is used to add custom events functionality to Leaflet classes.
 */

var eventsKey = '_leaflet_events';

L.Mixin = {};

L.Mixin.Events = {

	addEventListener: function (types, fn, context) { // (String, Function[, Object]) or (Object[, Object])

		// types can be a map of types/handlers
		if (L.Util.invokeEach(types, this.addEventListener, this, fn, context)) { return this; }

		var events = this[eventsKey] = this[eventsKey] || {},
		    contextId = context && context !== this && L.stamp(context),
		    i, len, event, type, indexKey, indexLenKey, typeIndex;

		// types can be a string of space-separated words
		types = L.Util.splitWords(types);

		for (i = 0, len = types.length; i < len; i++) {
			event = {
				action: fn,
				context: context || this
			};
			type = types[i];

			if (contextId) {
				// store listeners of a particular context in a separate hash (if it has an id)
				// gives a major performance boost when removing thousands of map layers

				indexKey = type + '_idx';
				indexLenKey = indexKey + '_len';

				typeIndex = events[indexKey] = events[indexKey] || {};

				if (!typeIndex[contextId]) {
					typeIndex[contextId] = [];

					// keep track of the number of keys in the index to quickly check if it's empty
					events[indexLenKey] = (events[indexLenKey] || 0) + 1;
				}

				typeIndex[contextId].push(event);


			} else {
				events[type] = events[type] || [];
				events[type].push(event);
			}
		}

		return this;
	},

	hasEventListeners: function (type) { // (String) -> Boolean
		var events = this[eventsKey];
		return !!events && ((type in events && events[type].length > 0) ||
		                    (type + '_idx' in events && events[type + '_idx_len'] > 0));
	},

	removeEventListener: function (types, fn, context) { // ([String, Function, Object]) or (Object[, Object])

		if (!this[eventsKey]) {
			return this;
		}

		if (!types) {
			return this.clearAllEventListeners();
		}

		if (L.Util.invokeEach(types, this.removeEventListener, this, fn, context)) { return this; }

		var events = this[eventsKey],
		    contextId = context && context !== this && L.stamp(context),
		    i, len, type, listeners, j, indexKey, indexLenKey, typeIndex, removed;

		types = L.Util.splitWords(types);

		for (i = 0, len = types.length; i < len; i++) {
			type = types[i];
			indexKey = type + '_idx';
			indexLenKey = indexKey + '_len';

			typeIndex = events[indexKey];

			if (!fn) {
				// clear all listeners for a type if function isn't specified
				delete events[type];
				delete events[indexKey];
				delete events[indexLenKey];

			} else {
				listeners = contextId && typeIndex ? typeIndex[contextId] : events[type];

				if (listeners) {
					for (j = listeners.length - 1; j >= 0; j--) {
						if ((listeners[j].action === fn) && (!context || (listeners[j].context === context))) {
							removed = listeners.splice(j, 1);
							// set the old action to a no-op, because it is possible
							// that the listener is being iterated over as part of a dispatch
							removed[0].action = L.Util.falseFn;
						}
					}

					if (context && typeIndex && (listeners.length === 0)) {
						delete typeIndex[contextId];
						events[indexLenKey]--;
					}
				}
			}
		}

		return this;
	},

	clearAllEventListeners: function () {
		delete this[eventsKey];
		return this;
	},

	fireEvent: function (type, data) { // (String[, Object])
		if (!this.hasEventListeners(type)) {
			return this;
		}

		var event = L.Util.extend({}, data, { type: type, target: this });

		var events = this[eventsKey],
		    listeners, i, len, typeIndex, contextId;

		if (events[type]) {
			// make sure adding/removing listeners inside other listeners won't cause infinite loop
			listeners = events[type].slice();

			for (i = 0, len = listeners.length; i < len; i++) {
				listeners[i].action.call(listeners[i].context, event);
			}
		}

		// fire event for the context-indexed listeners as well
		typeIndex = events[type + '_idx'];

		for (contextId in typeIndex) {
			listeners = typeIndex[contextId].slice();

			if (listeners) {
				for (i = 0, len = listeners.length; i < len; i++) {
					listeners[i].action.call(listeners[i].context, event);
				}
			}
		}

		return this;
	},

	addOneTimeEventListener: function (types, fn, context) {

		if (L.Util.invokeEach(types, this.addOneTimeEventListener, this, fn, context)) { return this; }

		var handler = L.bind(function () {
			this
			    .removeEventListener(types, fn, context)
			    .removeEventListener(types, handler, context);
		}, this);

		return this
		    .addEventListener(types, fn, context)
		    .addEventListener(types, handler, context);
	}
};

L.Mixin.Events.on = L.Mixin.Events.addEventListener;
L.Mixin.Events.off = L.Mixin.Events.removeEventListener;
L.Mixin.Events.once = L.Mixin.Events.addOneTimeEventListener;
L.Mixin.Events.fire = L.Mixin.Events.fireEvent;


/*
 * L.Browser handles different browser and feature detections for internal Leaflet use.
 */

(function () {

	var ie = 'ActiveXObject' in window,
		ielt9 = ie && !document.addEventListener,

	    // terrible browser detection to work around Safari / iOS / Android browser bugs
	    ua = navigator.userAgent.toLowerCase(),
	    webkit = ua.indexOf('webkit') !== -1,
	    chrome = ua.indexOf('chrome') !== -1,
	    phantomjs = ua.indexOf('phantom') !== -1,
	    android = ua.indexOf('android') !== -1,
	    android23 = ua.search('android [23]') !== -1,
		gecko = ua.indexOf('gecko') !== -1,

	    mobile = typeof orientation !== undefined + '',
	    msPointer = !window.PointerEvent && window.MSPointerEvent,
		pointer = (window.PointerEvent && window.navigator.pointerEnabled) ||
				  msPointer,
	    retina = ('devicePixelRatio' in window && window.devicePixelRatio > 1) ||
	             ('matchMedia' in window && window.matchMedia('(min-resolution:144dpi)') &&
	              window.matchMedia('(min-resolution:144dpi)').matches),

	    doc = document.documentElement,
	    ie3d = ie && ('transition' in doc.style),
	    webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
	    gecko3d = 'MozPerspective' in doc.style,
	    opera3d = 'OTransition' in doc.style,
	    any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d || opera3d) && !phantomjs;

	var touch = !window.L_NO_TOUCH && !phantomjs && (pointer || 'ontouchstart' in window ||
		(window.DocumentTouch && document instanceof window.DocumentTouch));

	L.Browser = {
		ie: ie,
		ielt9: ielt9,
		webkit: webkit,
		gecko: gecko && !webkit && !window.opera && !ie,

		android: android,
		android23: android23,

		chrome: chrome,

		ie3d: ie3d,
		webkit3d: webkit3d,
		gecko3d: gecko3d,
		opera3d: opera3d,
		any3d: any3d,

		mobile: mobile,
		mobileWebkit: mobile && webkit,
		mobileWebkit3d: mobile && webkit3d,
		mobileOpera: mobile && window.opera,

		touch: touch,
		msPointer: msPointer,
		pointer: pointer,

		retina: retina
	};

}());


/*
 * L.Point represents a point with x and y coordinates.
 */

L.Point = function (/*Number*/ x, /*Number*/ y, /*Boolean*/ round) {
	this.x = (round ? Math.round(x) : x);
	this.y = (round ? Math.round(y) : y);
};

L.Point.prototype = {

	clone: function () {
		return new L.Point(this.x, this.y);
	},

	// non-destructive, returns a new point
	add: function (point) {
		return this.clone()._add(L.point(point));
	},

	// destructive, used directly for performance in situations where it's safe to modify existing point
	_add: function (point) {
		this.x += point.x;
		this.y += point.y;
		return this;
	},

	subtract: function (point) {
		return this.clone()._subtract(L.point(point));
	},

	_subtract: function (point) {
		this.x -= point.x;
		this.y -= point.y;
		return this;
	},

	divideBy: function (num) {
		return this.clone()._divideBy(num);
	},

	_divideBy: function (num) {
		this.x /= num;
		this.y /= num;
		return this;
	},

	multiplyBy: function (num) {
		return this.clone()._multiplyBy(num);
	},

	_multiplyBy: function (num) {
		this.x *= num;
		this.y *= num;
		return this;
	},

	round: function () {
		return this.clone()._round();
	},

	_round: function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	},

	floor: function () {
		return this.clone()._floor();
	},

	_floor: function () {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	},

	distanceTo: function (point) {
		point = L.point(point);

		var x = point.x - this.x,
		    y = point.y - this.y;

		return Math.sqrt(x * x + y * y);
	},

	equals: function (point) {
		point = L.point(point);

		return point.x === this.x &&
		       point.y === this.y;
	},

	contains: function (point) {
		point = L.point(point);

		return Math.abs(point.x) <= Math.abs(this.x) &&
		       Math.abs(point.y) <= Math.abs(this.y);
	},

	toString: function () {
		return 'Point(' +
		        L.Util.formatNum(this.x) + ', ' +
		        L.Util.formatNum(this.y) + ')';
	}
};

L.point = function (x, y, round) {
	if (x instanceof L.Point) {
		return x;
	}
	if (L.Util.isArray(x)) {
		return new L.Point(x[0], x[1]);
	}
	if (x === undefined || x === null) {
		return x;
	}
	return new L.Point(x, y, round);
};


/*
 * L.Bounds represents a rectangular area on the screen in pixel coordinates.
 */

L.Bounds = function (a, b) { //(Point, Point) or Point[]
	if (!a) { return; }

	var points = b ? [a, b] : a;

	for (var i = 0, len = points.length; i < len; i++) {
		this.extend(points[i]);
	}
};

L.Bounds.prototype = {
	// extend the bounds to contain the given point
	extend: function (point) { // (Point)
		point = L.point(point);

		if (!this.min && !this.max) {
			this.min = point.clone();
			this.max = point.clone();
		} else {
			this.min.x = Math.min(point.x, this.min.x);
			this.max.x = Math.max(point.x, this.max.x);
			this.min.y = Math.min(point.y, this.min.y);
			this.max.y = Math.max(point.y, this.max.y);
		}
		return this;
	},

	getCenter: function (round) { // (Boolean) -> Point
		return new L.Point(
		        (this.min.x + this.max.x) / 2,
		        (this.min.y + this.max.y) / 2, round);
	},

	getBottomLeft: function () { // -> Point
		return new L.Point(this.min.x, this.max.y);
	},

	getTopRight: function () { // -> Point
		return new L.Point(this.max.x, this.min.y);
	},

	getSize: function () {
		return this.max.subtract(this.min);
	},

	contains: function (obj) { // (Bounds) or (Point) -> Boolean
		var min, max;

		if (typeof obj[0] === 'number' || obj instanceof L.Point) {
			obj = L.point(obj);
		} else {
			obj = L.bounds(obj);
		}

		if (obj instanceof L.Bounds) {
			min = obj.min;
			max = obj.max;
		} else {
			min = max = obj;
		}

		return (min.x >= this.min.x) &&
		       (max.x <= this.max.x) &&
		       (min.y >= this.min.y) &&
		       (max.y <= this.max.y);
	},

	intersects: function (bounds) { // (Bounds) -> Boolean
		bounds = L.bounds(bounds);

		var min = this.min,
		    max = this.max,
		    min2 = bounds.min,
		    max2 = bounds.max,
		    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
		    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

		return xIntersects && yIntersects;
	},

	isValid: function () {
		return !!(this.min && this.max);
	}
};

L.bounds = function (a, b) { // (Bounds) or (Point, Point) or (Point[])
	if (!a || a instanceof L.Bounds) {
		return a;
	}
	return new L.Bounds(a, b);
};


/*
 * L.Transformation is an utility class to perform simple point transformations through a 2d-matrix.
 */

L.Transformation = function (a, b, c, d) {
	this._a = a;
	this._b = b;
	this._c = c;
	this._d = d;
};

L.Transformation.prototype = {
	transform: function (point, scale) { // (Point, Number) -> Point
		return this._transform(point.clone(), scale);
	},

	// destructive transform (faster)
	_transform: function (point, scale) {
		scale = scale || 1;
		point.x = scale * (this._a * point.x + this._b);
		point.y = scale * (this._c * point.y + this._d);
		return point;
	},

	untransform: function (point, scale) {
		scale = scale || 1;
		return new L.Point(
		        (point.x / scale - this._b) / this._a,
		        (point.y / scale - this._d) / this._c);
	}
};


/*
 * L.DomUtil contains various utility functions for working with DOM.
 */

L.DomUtil = {
	get: function (id) {
		return (typeof id === 'string' ? document.getElementById(id) : id);
	},

	getStyle: function (el, style) {

		var value = el.style[style];

		if (!value && el.currentStyle) {
			value = el.currentStyle[style];
		}

		if ((!value || value === 'auto') && document.defaultView) {
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		}

		return value === 'auto' ? null : value;
	},

	getViewportOffset: function (element) {

		var top = 0,
		    left = 0,
		    el = element,
		    docBody = document.body,
		    docEl = document.documentElement,
		    pos;

		do {
			top  += el.offsetTop  || 0;
			left += el.offsetLeft || 0;

			//add borders
			top += parseInt(L.DomUtil.getStyle(el, 'borderTopWidth'), 10) || 0;
			left += parseInt(L.DomUtil.getStyle(el, 'borderLeftWidth'), 10) || 0;

			pos = L.DomUtil.getStyle(el, 'position');

			if (el.offsetParent === docBody && pos === 'absolute') { break; }

			if (pos === 'fixed') {
				top  += docBody.scrollTop  || docEl.scrollTop  || 0;
				left += docBody.scrollLeft || docEl.scrollLeft || 0;
				break;
			}

			if (pos === 'relative' && !el.offsetLeft) {
				var width = L.DomUtil.getStyle(el, 'width'),
				    maxWidth = L.DomUtil.getStyle(el, 'max-width'),
				    r = el.getBoundingClientRect();

				if (width !== 'none' || maxWidth !== 'none') {
					left += r.left + el.clientLeft;
				}

				//calculate full y offset since we're breaking out of the loop
				top += r.top + (docBody.scrollTop  || docEl.scrollTop  || 0);

				break;
			}

			el = el.offsetParent;

		} while (el);

		el = element;

		do {
			if (el === docBody) { break; }

			top  -= el.scrollTop  || 0;
			left -= el.scrollLeft || 0;

			el = el.parentNode;
		} while (el);

		return new L.Point(left, top);
	},

	documentIsLtr: function () {
		if (!L.DomUtil._docIsLtrCached) {
			L.DomUtil._docIsLtrCached = true;
			L.DomUtil._docIsLtr = L.DomUtil.getStyle(document.body, 'direction') === 'ltr';
		}
		return L.DomUtil._docIsLtr;
	},

	create: function (tagName, className, container) {

		var el = document.createElement(tagName);
		el.className = className;

		if (container) {
			container.appendChild(el);
		}

		return el;
	},

	hasClass: function (el, name) {
		if (el.classList !== undefined) {
			return el.classList.contains(name);
		}
		var className = L.DomUtil._getClass(el);
		return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
	},

	addClass: function (el, name) {
		if (el.classList !== undefined) {
			var classes = L.Util.splitWords(name);
			for (var i = 0, len = classes.length; i < len; i++) {
				el.classList.add(classes[i]);
			}
		} else if (!L.DomUtil.hasClass(el, name)) {
			var className = L.DomUtil._getClass(el);
			L.DomUtil._setClass(el, (className ? className + ' ' : '') + name);
		}
	},

	removeClass: function (el, name) {
		if (el.classList !== undefined) {
			el.classList.remove(name);
		} else {
			L.DomUtil._setClass(el, L.Util.trim((' ' + L.DomUtil._getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
		}
	},

	_setClass: function (el, name) {
		if (el.className.baseVal === undefined) {
			el.className = name;
		} else {
			// in case of SVG element
			el.className.baseVal = name;
		}
	},

	_getClass: function (el) {
		return el.className.baseVal === undefined ? el.className : el.className.baseVal;
	},

	setOpacity: function (el, value) {

		if ('opacity' in el.style) {
			el.style.opacity = value;

		} else if ('filter' in el.style) {

			var filter = false,
			    filterName = 'DXImageTransform.Microsoft.Alpha';

			// filters collection throws an error if we try to retrieve a filter that doesn't exist
			try {
				filter = el.filters.item(filterName);
			} catch (e) {
				// don't set opacity to 1 if we haven't already set an opacity,
				// it isn't needed and breaks transparent pngs.
				if (value === 1) { return; }
			}

			value = Math.round(value * 100);

			if (filter) {
				filter.Enabled = (value !== 100);
				filter.Opacity = value;
			} else {
				el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
			}
		}
	},

	testProp: function (props) {

		var style = document.documentElement.style;

		for (var i = 0; i < props.length; i++) {
			if (props[i] in style) {
				return props[i];
			}
		}
		return false;
	},

	getTranslateString: function (point) {
		// on WebKit browsers (Chrome/Safari/iOS Safari/Android) using translate3d instead of translate
		// makes animation smoother as it ensures HW accel is used. Firefox 13 doesn't care
		// (same speed either way), Opera 12 doesn't support translate3d

		var is3d = L.Browser.webkit3d,
		    open = 'translate' + (is3d ? '3d' : '') + '(',
		    close = (is3d ? ',0' : '') + ')';

		return open + point.x + 'px,' + point.y + 'px' + close;
	},

	getScaleString: function (scale, origin) {

		var preTranslateStr = L.DomUtil.getTranslateString(origin.add(origin.multiplyBy(-1 * scale))),
		    scaleStr = ' scale(' + scale + ') ';

		return preTranslateStr + scaleStr;
	},

	setPosition: function (el, point, disable3D) { // (HTMLElement, Point[, Boolean])

		// jshint camelcase: false
		el._leaflet_pos = point;

		if (!disable3D && L.Browser.any3d) {
			el.style[L.DomUtil.TRANSFORM] =  L.DomUtil.getTranslateString(point);
		} else {
			el.style.left = point.x + 'px';
			el.style.top = point.y + 'px';
		}
	},

	getPosition: function (el) {
		// this method is only used for elements previously positioned using setPosition,
		// so it's safe to cache the position for performance

		// jshint camelcase: false
		return el._leaflet_pos;
	}
};


// prefix style property names

L.DomUtil.TRANSFORM = L.DomUtil.testProp(
        ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

// webkitTransition comes first because some browser versions that drop vendor prefix don't do
// the same for the transitionend event, in particular the Android 4.1 stock browser

L.DomUtil.TRANSITION = L.DomUtil.testProp(
        ['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

L.DomUtil.TRANSITION_END =
        L.DomUtil.TRANSITION === 'webkitTransition' || L.DomUtil.TRANSITION === 'OTransition' ?
        L.DomUtil.TRANSITION + 'End' : 'transitionend';

(function () {
    if ('onselectstart' in document) {
        L.extend(L.DomUtil, {
            disableTextSelection: function () {
                L.DomEvent.on(window, 'selectstart', L.DomEvent.preventDefault);
            },

            enableTextSelection: function () {
                L.DomEvent.off(window, 'selectstart', L.DomEvent.preventDefault);
            }
        });
    } else {
        var userSelectProperty = L.DomUtil.testProp(
            ['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

        L.extend(L.DomUtil, {
            disableTextSelection: function () {
                if (userSelectProperty) {
                    var style = document.documentElement.style;
                    this._userSelect = style[userSelectProperty];
                    style[userSelectProperty] = 'none';
                }
            },

            enableTextSelection: function () {
                if (userSelectProperty) {
                    document.documentElement.style[userSelectProperty] = this._userSelect;
                    delete this._userSelect;
                }
            }
        });
    }

	L.extend(L.DomUtil, {
		disableImageDrag: function () {
			L.DomEvent.on(window, 'dragstart', L.DomEvent.preventDefault);
		},

		enableImageDrag: function () {
			L.DomEvent.off(window, 'dragstart', L.DomEvent.preventDefault);
		}
	});
})();


/*
 * L.LatLng represents a geographical point with latitude and longitude coordinates.
 */

L.LatLng = function (lat, lng, alt) { // (Number, Number, Number)
	lat = parseFloat(lat);
	lng = parseFloat(lng);

	if (isNaN(lat) || isNaN(lng)) {
		throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
	}

	this.lat = lat;
	this.lng = lng;

	if (alt !== undefined) {
		this.alt = parseFloat(alt);
	}
};

L.extend(L.LatLng, {
	DEG_TO_RAD: Math.PI / 180,
	RAD_TO_DEG: 180 / Math.PI,
	MAX_MARGIN: 1.0E-9 // max margin of error for the "equals" check
});

L.LatLng.prototype = {
	equals: function (obj) { // (LatLng) -> Boolean
		if (!obj) { return false; }

		obj = L.latLng(obj);

		var margin = Math.max(
		        Math.abs(this.lat - obj.lat),
		        Math.abs(this.lng - obj.lng));

		return margin <= L.LatLng.MAX_MARGIN;
	},

	toString: function (precision) { // (Number) -> String
		return 'LatLng(' +
		        L.Util.formatNum(this.lat, precision) + ', ' +
		        L.Util.formatNum(this.lng, precision) + ')';
	},

	// Haversine distance formula, see http://en.wikipedia.org/wiki/Haversine_formula
	// TODO move to projection code, LatLng shouldn't know about Earth
	distanceTo: function (other) { // (LatLng) -> Number
		other = L.latLng(other);

		var R = 6378137, // earth radius in meters
		    d2r = L.LatLng.DEG_TO_RAD,
		    dLat = (other.lat - this.lat) * d2r,
		    dLon = (other.lng - this.lng) * d2r,
		    lat1 = this.lat * d2r,
		    lat2 = other.lat * d2r,
		    sin1 = Math.sin(dLat / 2),
		    sin2 = Math.sin(dLon / 2);

		var a = sin1 * sin1 + sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2);

		return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	},

	wrap: function (a, b) { // (Number, Number) -> LatLng
		var lng = this.lng;

		a = a || -180;
		b = b ||  180;

		lng = (lng + b) % (b - a) + (lng < a || lng === b ? b : a);

		return new L.LatLng(this.lat, lng);
	}
};

L.latLng = function (a, b) { // (LatLng) or ([Number, Number]) or (Number, Number)
	if (a instanceof L.LatLng) {
		return a;
	}
	if (L.Util.isArray(a)) {
		if (typeof a[0] === 'number' || typeof a[0] === 'string') {
			return new L.LatLng(a[0], a[1], a[2]);
		} else {
			return null;
		}
	}
	if (a === undefined || a === null) {
		return a;
	}
	if (typeof a === 'object' && 'lat' in a) {
		return new L.LatLng(a.lat, 'lng' in a ? a.lng : a.lon);
	}
	if (b === undefined) {
		return null;
	}
	return new L.LatLng(a, b);
};



/*
 * L.LatLngBounds represents a rectangular area on the map in geographical coordinates.
 */

L.LatLngBounds = function (southWest, northEast) { // (LatLng, LatLng) or (LatLng[])
	if (!southWest) { return; }

	var latlngs = northEast ? [southWest, northEast] : southWest;

	for (var i = 0, len = latlngs.length; i < len; i++) {
		this.extend(latlngs[i]);
	}
};

L.LatLngBounds.prototype = {
	// extend the bounds to contain the given point or bounds
	extend: function (obj) { // (LatLng) or (LatLngBounds)
		if (!obj) { return this; }

		var latLng = L.latLng(obj);
		if (latLng !== null) {
			obj = latLng;
		} else {
			obj = L.latLngBounds(obj);
		}

		if (obj instanceof L.LatLng) {
			if (!this._southWest && !this._northEast) {
				this._southWest = new L.LatLng(obj.lat, obj.lng);
				this._northEast = new L.LatLng(obj.lat, obj.lng);
			} else {
				this._southWest.lat = Math.min(obj.lat, this._southWest.lat);
				this._southWest.lng = Math.min(obj.lng, this._southWest.lng);

				this._northEast.lat = Math.max(obj.lat, this._northEast.lat);
				this._northEast.lng = Math.max(obj.lng, this._northEast.lng);
			}
		} else if (obj instanceof L.LatLngBounds) {
			this.extend(obj._southWest);
			this.extend(obj._northEast);
		}
		return this;
	},

	// extend the bounds by a percentage
	pad: function (bufferRatio) { // (Number) -> LatLngBounds
		var sw = this._southWest,
		    ne = this._northEast,
		    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
		    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

		return new L.LatLngBounds(
		        new L.LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
		        new L.LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
	},

	getCenter: function () { // -> LatLng
		return new L.LatLng(
		        (this._southWest.lat + this._northEast.lat) / 2,
		        (this._southWest.lng + this._northEast.lng) / 2);
	},

	getSouthWest: function () {
		return this._southWest;
	},

	getNorthEast: function () {
		return this._northEast;
	},

	getNorthWest: function () {
		return new L.LatLng(this.getNorth(), this.getWest());
	},

	getSouthEast: function () {
		return new L.LatLng(this.getSouth(), this.getEast());
	},

	getWest: function () {
		return this._southWest.lng;
	},

	getSouth: function () {
		return this._southWest.lat;
	},

	getEast: function () {
		return this._northEast.lng;
	},

	getNorth: function () {
		return this._northEast.lat;
	},

	contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
		if (typeof obj[0] === 'number' || obj instanceof L.LatLng) {
			obj = L.latLng(obj);
		} else {
			obj = L.latLngBounds(obj);
		}

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2, ne2;

		if (obj instanceof L.LatLngBounds) {
			sw2 = obj.getSouthWest();
			ne2 = obj.getNorthEast();
		} else {
			sw2 = ne2 = obj;
		}

		return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
		       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
	},

	intersects: function (bounds) { // (LatLngBounds)
		bounds = L.latLngBounds(bounds);

		var sw = this._southWest,
		    ne = this._northEast,
		    sw2 = bounds.getSouthWest(),
		    ne2 = bounds.getNorthEast(),

		    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
		    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

		return latIntersects && lngIntersects;
	},

	toBBoxString: function () {
		return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
	},

	equals: function (bounds) { // (LatLngBounds)
		if (!bounds) { return false; }

		bounds = L.latLngBounds(bounds);

		return this._southWest.equals(bounds.getSouthWest()) &&
		       this._northEast.equals(bounds.getNorthEast());
	},

	isValid: function () {
		return !!(this._southWest && this._northEast);
	}
};

//TODO International date line?

L.latLngBounds = function (a, b) { // (LatLngBounds) or (LatLng, LatLng)
	if (!a || a instanceof L.LatLngBounds) {
		return a;
	}
	return new L.LatLngBounds(a, b);
};


/*
 * L.Projection contains various geographical projections used by CRS classes.
 */

L.Projection = {};


/*
 * Spherical Mercator is the most popular map projection, used by EPSG:3857 CRS used by default.
 */

L.Projection.SphericalMercator = {
	MAX_LATITUDE: 85.0511287798,

	project: function (latlng) { // (LatLng) -> Point
		var d = L.LatLng.DEG_TO_RAD,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    x = latlng.lng * d,
		    y = lat * d;

		y = Math.log(Math.tan((Math.PI / 4) + (y / 2)));

		return new L.Point(x, y);
	},

	unproject: function (point) { // (Point, Boolean) -> LatLng
		var d = L.LatLng.RAD_TO_DEG,
		    lng = point.x * d,
		    lat = (2 * Math.atan(Math.exp(point.y)) - (Math.PI / 2)) * d;

		return new L.LatLng(lat, lng);
	}
};


/*
 * Simple equirectangular (Plate Carree) projection, used by CRS like EPSG:4326 and Simple.
 */

L.Projection.LonLat = {
	project: function (latlng) {
		return new L.Point(latlng.lng, latlng.lat);
	},

	unproject: function (point) {
		return new L.LatLng(point.y, point.x);
	}
};


/*
 * L.CRS is a base object for all defined CRS (Coordinate Reference Systems) in Leaflet.
 */

L.CRS = {
	latLngToPoint: function (latlng, zoom) { // (LatLng, Number) -> Point
		var projectedPoint = this.projection.project(latlng),
		    scale = this.scale(zoom);

		return this.transformation._transform(projectedPoint, scale);
	},

	pointToLatLng: function (point, zoom) { // (Point, Number[, Boolean]) -> LatLng
		var scale = this.scale(zoom),
		    untransformedPoint = this.transformation.untransform(point, scale);

		return this.projection.unproject(untransformedPoint);
	},

	project: function (latlng) {
		return this.projection.project(latlng);
	},

	scale: function (zoom) {
		return 256 * Math.pow(2, zoom);
	},

	getSize: function (zoom) {
		var s = this.scale(zoom);
		return L.point(s, s);
	}
};


/*
 * A simple CRS that can be used for flat non-Earth maps like panoramas or game maps.
 */

L.CRS.Simple = L.extend({}, L.CRS, {
	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1, 0, -1, 0),

	scale: function (zoom) {
		return Math.pow(2, zoom);
	}
});


/*
 * L.CRS.EPSG3857 (Spherical Mercator) is the most common CRS for web mapping
 * and is used by Leaflet by default.
 */

L.CRS.EPSG3857 = L.extend({}, L.CRS, {
	code: 'EPSG:3857',

	projection: L.Projection.SphericalMercator,
	transformation: new L.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),

	project: function (latlng) { // (LatLng) -> Point
		var projectedPoint = this.projection.project(latlng),
		    earthRadius = 6378137;
		return projectedPoint.multiplyBy(earthRadius);
	}
});

L.CRS.EPSG900913 = L.extend({}, L.CRS.EPSG3857, {
	code: 'EPSG:900913'
});


/*
 * L.CRS.EPSG4326 is a CRS popular among advanced GIS specialists.
 */

L.CRS.EPSG4326 = L.extend({}, L.CRS, {
	code: 'EPSG:4326',

	projection: L.Projection.LonLat,
	transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
});


/*
 * L.Map is the central class of the API - it is used to create a map.
 */

L.Map = L.Class.extend({

	includes: L.Mixin.Events,

	options: {
		crs: L.CRS.EPSG3857,

		/*
		center: LatLng,
		zoom: Number,
		layers: Array,
		*/

		fadeAnimation: L.DomUtil.TRANSITION && !L.Browser.android23,
		trackResize: true,
		markerZoomAnimation: L.DomUtil.TRANSITION && L.Browser.any3d
	},

	initialize: function (id, options) { // (HTMLElement or String, Object)
		options = L.setOptions(this, options);


		this._initContainer(id);
		this._initLayout();

		// hack for https://github.com/Leaflet/Leaflet/issues/1980
		this._onResize = L.bind(this._onResize, this);

		this._initEvents();

		if (options.maxBounds) {
			this.setMaxBounds(options.maxBounds);
		}

		if (options.center && options.zoom !== undefined) {
			this.setView(L.latLng(options.center), options.zoom, {reset: true});
		}

		this._handlers = [];

		this._layers = {};
		this._zoomBoundLayers = {};
		this._tileLayersNum = 0;

		this.callInitHooks();

		this._addLayers(options.layers);
	},


	// public methods that modify map state

	// replaced by animation-powered implementation in Map.PanAnimation.js
	setView: function (center, zoom) {
		zoom = zoom === undefined ? this.getZoom() : zoom;
		this._resetView(L.latLng(center), this._limitZoom(zoom));
		return this;
	},

	setZoom: function (zoom, options) {
		if (!this._loaded) {
			this._zoom = this._limitZoom(zoom);
			return this;
		}
		return this.setView(this.getCenter(), zoom, {zoom: options});
	},

	zoomIn: function (delta, options) {
		return this.setZoom(this._zoom + (delta || 1), options);
	},

	zoomOut: function (delta, options) {
		return this.setZoom(this._zoom - (delta || 1), options);
	},

	setZoomAround: function (latlng, zoom, options) {
		var scale = this.getZoomScale(zoom),
		    viewHalf = this.getSize().divideBy(2),
		    containerPoint = latlng instanceof L.Point ? latlng : this.latLngToContainerPoint(latlng),

		    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
		    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

		return this.setView(newCenter, zoom, {zoom: options});
	},

	fitBounds: function (bounds, options) {

		options = options || {};
		bounds = bounds.getBounds ? bounds.getBounds() : L.latLngBounds(bounds);

		var paddingTL = L.point(options.paddingTopLeft || options.padding || [0, 0]),
		    paddingBR = L.point(options.paddingBottomRight || options.padding || [0, 0]),

		    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR));

		zoom = (options.maxZoom) ? Math.min(options.maxZoom, zoom) : zoom;

		var paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

		    swPoint = this.project(bounds.getSouthWest(), zoom),
		    nePoint = this.project(bounds.getNorthEast(), zoom),
		    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

		return this.setView(center, zoom, options);
	},

	fitWorld: function (options) {
		return this.fitBounds([[-90, -180], [90, 180]], options);
	},

	panTo: function (center, options) { // (LatLng)
		return this.setView(center, this._zoom, {pan: options});
	},

	panBy: function (offset) { // (Point)
		// replaced with animated panBy in Map.PanAnimation.js
		this.fire('movestart');

		this._rawPanBy(L.point(offset));

		this.fire('move');
		return this.fire('moveend');
	},

	setMaxBounds: function (bounds) {
		bounds = L.latLngBounds(bounds);

		this.options.maxBounds = bounds;

		if (!bounds) {
			return this.off('moveend', this._panInsideMaxBounds, this);
		}

		if (this._loaded) {
			this._panInsideMaxBounds();
		}

		return this.on('moveend', this._panInsideMaxBounds, this);
	},

	panInsideBounds: function (bounds, options) {
		var center = this.getCenter(),
			newCenter = this._limitCenter(center, this._zoom, bounds);

		if (center.equals(newCenter)) { return this; }

		return this.panTo(newCenter, options);
	},

	addLayer: function (layer) {
		// TODO method is too big, refactor

		var id = L.stamp(layer);

		if (this._layers[id]) { return this; }

		this._layers[id] = layer;

		// TODO getMaxZoom, getMinZoom in ILayer (instead of options)
		if (layer.options && (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom))) {
			this._zoomBoundLayers[id] = layer;
			this._updateZoomLevels();
		}

		// TODO looks ugly, refactor!!!
		if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
			this._tileLayersNum++;
			this._tileLayersToLoad++;
			layer.on('load', this._onTileLayerLoad, this);
		}

		if (this._loaded) {
			this._layerAdd(layer);
		}

		return this;
	},

	removeLayer: function (layer) {
		var id = L.stamp(layer);

		if (!this._layers[id]) { return this; }

		if (this._loaded) {
			layer.onRemove(this);
		}

		delete this._layers[id];

		if (this._loaded) {
			this.fire('layerremove', {layer: layer});
		}

		if (this._zoomBoundLayers[id]) {
			delete this._zoomBoundLayers[id];
			this._updateZoomLevels();
		}

		// TODO looks ugly, refactor
		if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
			this._tileLayersNum--;
			this._tileLayersToLoad--;
			layer.off('load', this._onTileLayerLoad, this);
		}

		return this;
	},

	hasLayer: function (layer) {
		if (!layer) { return false; }

		return (L.stamp(layer) in this._layers);
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	invalidateSize: function (options) {
		if (!this._loaded) { return this; }

		options = L.extend({
			animate: false,
			pan: true
		}, options === true ? {animate: true} : options);

		var oldSize = this.getSize();
		this._sizeChanged = true;
		this._initialCenter = null;

		var newSize = this.getSize(),
		    oldCenter = oldSize.divideBy(2).round(),
		    newCenter = newSize.divideBy(2).round(),
		    offset = oldCenter.subtract(newCenter);

		if (!offset.x && !offset.y) { return this; }

		if (options.animate && options.pan) {
			this.panBy(offset);

		} else {
			if (options.pan) {
				this._rawPanBy(offset);
			}

			this.fire('move');

			if (options.debounceMoveend) {
				clearTimeout(this._sizeTimer);
				this._sizeTimer = setTimeout(L.bind(this.fire, this, 'moveend'), 200);
			} else {
				this.fire('moveend');
			}
		}

		return this.fire('resize', {
			oldSize: oldSize,
			newSize: newSize
		});
	},

	// TODO handler.addTo
	addHandler: function (name, HandlerClass) {
		if (!HandlerClass) { return this; }

		var handler = this[name] = new HandlerClass(this);

		this._handlers.push(handler);

		if (this.options[name]) {
			handler.enable();
		}

		return this;
	},

	remove: function () {
		if (this._loaded) {
			this.fire('unload');
		}

		this._initEvents('off');

		try {
			// throws error in IE6-8
			delete this._container._leaflet;
		} catch (e) {
			this._container._leaflet = undefined;
		}

		this._clearPanes();
		if (this._clearControlPos) {
			this._clearControlPos();
		}

		this._clearHandlers();

		return this;
	},


	// public methods for getting map state

	getCenter: function () { // (Boolean) -> LatLng
		this._checkIfLoaded();

		if (this._initialCenter && !this._moved()) {
			return this._initialCenter;
		}
		return this.layerPointToLatLng(this._getCenterLayerPoint());
	},

	getZoom: function () {
		return this._zoom;
	},

	getBounds: function () {
		var bounds = this.getPixelBounds(),
		    sw = this.unproject(bounds.getBottomLeft()),
		    ne = this.unproject(bounds.getTopRight());

		return new L.LatLngBounds(sw, ne);
	},

	getMinZoom: function () {
		return this.options.minZoom === undefined ?
			(this._layersMinZoom === undefined ? 0 : this._layersMinZoom) :
			this.options.minZoom;
	},

	getMaxZoom: function () {
		return this.options.maxZoom === undefined ?
			(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
			this.options.maxZoom;
	},

	getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
		bounds = L.latLngBounds(bounds);

		var zoom = this.getMinZoom() - (inside ? 1 : 0),
		    maxZoom = this.getMaxZoom(),
		    size = this.getSize(),

		    nw = bounds.getNorthWest(),
		    se = bounds.getSouthEast(),

		    zoomNotFound = true,
		    boundsSize;

		padding = L.point(padding || [0, 0]);

		do {
			zoom++;
			boundsSize = this.project(se, zoom).subtract(this.project(nw, zoom)).add(padding);
			zoomNotFound = !inside ? size.contains(boundsSize) : boundsSize.x < size.x || boundsSize.y < size.y;

		} while (zoomNotFound && zoom <= maxZoom);

		if (zoomNotFound && inside) {
			return null;
		}

		return inside ? zoom : zoom - 1;
	},

	getSize: function () {
		if (!this._size || this._sizeChanged) {
			this._size = new L.Point(
				this._container.clientWidth,
				this._container.clientHeight);

			this._sizeChanged = false;
		}
		return this._size.clone();
	},

	getPixelBounds: function () {
		var topLeftPoint = this._getTopLeftPoint();
		return new L.Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
	},

	getPixelOrigin: function () {
		this._checkIfLoaded();
		return this._initialTopLeftPoint;
	},

	getPanes: function () {
		return this._panes;
	},

	getContainer: function () {
		return this._container;
	},


	// TODO replace with universal implementation after refactoring projections

	getZoomScale: function (toZoom) {
		var crs = this.options.crs;
		return crs.scale(toZoom) / crs.scale(this._zoom);
	},

	getScaleZoom: function (scale) {
		return this._zoom + (Math.log(scale) / Math.LN2);
	},


	// conversion methods

	project: function (latlng, zoom) { // (LatLng[, Number]) -> Point
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.latLngToPoint(L.latLng(latlng), zoom);
	},

	unproject: function (point, zoom) { // (Point[, Number]) -> LatLng
		zoom = zoom === undefined ? this._zoom : zoom;
		return this.options.crs.pointToLatLng(L.point(point), zoom);
	},

	layerPointToLatLng: function (point) { // (Point)
		var projectedPoint = L.point(point).add(this.getPixelOrigin());
		return this.unproject(projectedPoint);
	},

	latLngToLayerPoint: function (latlng) { // (LatLng)
		var projectedPoint = this.project(L.latLng(latlng))._round();
		return projectedPoint._subtract(this.getPixelOrigin());
	},

	containerPointToLayerPoint: function (point) { // (Point)
		return L.point(point).subtract(this._getMapPanePos());
	},

	layerPointToContainerPoint: function (point) { // (Point)
		return L.point(point).add(this._getMapPanePos());
	},

	containerPointToLatLng: function (point) {
		var layerPoint = this.containerPointToLayerPoint(L.point(point));
		return this.layerPointToLatLng(layerPoint);
	},

	latLngToContainerPoint: function (latlng) {
		return this.layerPointToContainerPoint(this.latLngToLayerPoint(L.latLng(latlng)));
	},

	mouseEventToContainerPoint: function (e) { // (MouseEvent)
		return L.DomEvent.getMousePosition(e, this._container);
	},

	mouseEventToLayerPoint: function (e) { // (MouseEvent)
		return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
	},

	mouseEventToLatLng: function (e) { // (MouseEvent)
		return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
	},


	// map initialization methods

	_initContainer: function (id) {
		var container = this._container = L.DomUtil.get(id);

		if (!container) {
			throw new Error('Map container not found.');
		} else if (container._leaflet) {
			throw new Error('Map container is already initialized.');
		}

		container._leaflet = true;
	},

	_initLayout: function () {
		var container = this._container;

		L.DomUtil.addClass(container, 'leaflet-container' +
			(L.Browser.touch ? ' leaflet-touch' : '') +
			(L.Browser.retina ? ' leaflet-retina' : '') +
			(L.Browser.ielt9 ? ' leaflet-oldie' : '') +
			(this.options.fadeAnimation ? ' leaflet-fade-anim' : ''));

		var position = L.DomUtil.getStyle(container, 'position');

		if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
			container.style.position = 'relative';
		}

		this._initPanes();

		if (this._initControlPos) {
			this._initControlPos();
		}
	},

	_initPanes: function () {
		var panes = this._panes = {};

		this._mapPane = panes.mapPane = this._createPane('leaflet-map-pane', this._container);

		this._tilePane = panes.tilePane = this._createPane('leaflet-tile-pane', this._mapPane);
		panes.objectsPane = this._createPane('leaflet-objects-pane', this._mapPane);
		panes.shadowPane = this._createPane('leaflet-shadow-pane');
		panes.overlayPane = this._createPane('leaflet-overlay-pane');
		panes.markerPane = this._createPane('leaflet-marker-pane');
		panes.popupPane = this._createPane('leaflet-popup-pane');

		var zoomHide = ' leaflet-zoom-hide';

		if (!this.options.markerZoomAnimation) {
			L.DomUtil.addClass(panes.markerPane, zoomHide);
			L.DomUtil.addClass(panes.shadowPane, zoomHide);
			L.DomUtil.addClass(panes.popupPane, zoomHide);
		}
	},

	_createPane: function (className, container) {
		return L.DomUtil.create('div', className, container || this._panes.objectsPane);
	},

	_clearPanes: function () {
		this._container.removeChild(this._mapPane);
	},

	_addLayers: function (layers) {
		layers = layers ? (L.Util.isArray(layers) ? layers : [layers]) : [];

		for (var i = 0, len = layers.length; i < len; i++) {
			this.addLayer(layers[i]);
		}
	},


	// private methods that modify map state

	_resetView: function (center, zoom, preserveMapOffset, afterZoomAnim) {

		var zoomChanged = (this._zoom !== zoom);

		if (!afterZoomAnim) {
			this.fire('movestart');

			if (zoomChanged) {
				this.fire('zoomstart');
			}
		}

		this._zoom = zoom;
		this._initialCenter = center;

		this._initialTopLeftPoint = this._getNewTopLeftPoint(center);

		if (!preserveMapOffset) {
			L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));
		} else {
			this._initialTopLeftPoint._add(this._getMapPanePos());
		}

		this._tileLayersToLoad = this._tileLayersNum;

		var loading = !this._loaded;
		this._loaded = true;

		this.fire('viewreset', {hard: !preserveMapOffset});

		if (loading) {
			this.fire('load');
			this.eachLayer(this._layerAdd, this);
		}

		this.fire('move');

		if (zoomChanged || afterZoomAnim) {
			this.fire('zoomend');
		}

		this.fire('moveend', {hard: !preserveMapOffset});
	},

	_rawPanBy: function (offset) {
		L.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
	},

	_getZoomSpan: function () {
		return this.getMaxZoom() - this.getMinZoom();
	},

	_updateZoomLevels: function () {
		var i,
			minZoom = Infinity,
			maxZoom = -Infinity,
			oldZoomSpan = this._getZoomSpan();

		for (i in this._zoomBoundLayers) {
			var layer = this._zoomBoundLayers[i];
			if (!isNaN(layer.options.minZoom)) {
				minZoom = Math.min(minZoom, layer.options.minZoom);
			}
			if (!isNaN(layer.options.maxZoom)) {
				maxZoom = Math.max(maxZoom, layer.options.maxZoom);
			}
		}

		if (i === undefined) { // we have no tilelayers
			this._layersMaxZoom = this._layersMinZoom = undefined;
		} else {
			this._layersMaxZoom = maxZoom;
			this._layersMinZoom = minZoom;
		}

		if (oldZoomSpan !== this._getZoomSpan()) {
			this.fire('zoomlevelschange');
		}
	},

	_panInsideMaxBounds: function () {
		this.panInsideBounds(this.options.maxBounds);
	},

	_checkIfLoaded: function () {
		if (!this._loaded) {
			throw new Error('Set map center and zoom first.');
		}
	},

	// map events

	_initEvents: function (onOff) {
		if (!L.DomEvent) { return; }

		onOff = onOff || 'on';

		L.DomEvent[onOff](this._container, 'click', this._onMouseClick, this);

		var events = ['dblclick', 'mousedown', 'mouseup', 'mouseenter',
		              'mouseleave', 'mousemove', 'contextmenu'],
		    i, len;

		for (i = 0, len = events.length; i < len; i++) {
			L.DomEvent[onOff](this._container, events[i], this._fireMouseEvent, this);
		}

		if (this.options.trackResize) {
			L.DomEvent[onOff](window, 'resize', this._onResize, this);
		}
	},

	_onResize: function () {
		L.Util.cancelAnimFrame(this._resizeRequest);
		this._resizeRequest = L.Util.requestAnimFrame(
		        function () { this.invalidateSize({debounceMoveend: true}); }, this, false, this._container);
	},

	_onMouseClick: function (e) {
		if (!this._loaded || (!e._simulated &&
		        ((this.dragging && this.dragging.moved()) ||
		         (this.boxZoom  && this.boxZoom.moved()))) ||
		            L.DomEvent._skipped(e)) { return; }

		this.fire('preclick');
		this._fireMouseEvent(e);
	},

	_fireMouseEvent: function (e) {
		if (!this._loaded || L.DomEvent._skipped(e)) { return; }

		var type = e.type;

		type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));

		if (!this.hasEventListeners(type)) { return; }

		if (type === 'contextmenu') {
			L.DomEvent.preventDefault(e);
		}

		var containerPoint = this.mouseEventToContainerPoint(e),
		    layerPoint = this.containerPointToLayerPoint(containerPoint),
		    latlng = this.layerPointToLatLng(layerPoint);

		this.fire(type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			originalEvent: e
		});
	},

	_onTileLayerLoad: function () {
		this._tileLayersToLoad--;
		if (this._tileLayersNum && !this._tileLayersToLoad) {
			this.fire('tilelayersload');
		}
	},

	_clearHandlers: function () {
		for (var i = 0, len = this._handlers.length; i < len; i++) {
			this._handlers[i].disable();
		}
	},

	whenReady: function (callback, context) {
		if (this._loaded) {
			callback.call(context || this, this);
		} else {
			this.on('load', callback, context);
		}
		return this;
	},

	_layerAdd: function (layer) {
		layer.onAdd(this);
		this.fire('layeradd', {layer: layer});
	},


	// private methods for getting map state

	_getMapPanePos: function () {
		return L.DomUtil.getPosition(this._mapPane);
	},

	_moved: function () {
		var pos = this._getMapPanePos();
		return pos && !pos.equals([0, 0]);
	},

	_getTopLeftPoint: function () {
		return this.getPixelOrigin().subtract(this._getMapPanePos());
	},

	_getNewTopLeftPoint: function (center, zoom) {
		var viewHalf = this.getSize()._divideBy(2);
		// TODO round on display, not calculation to increase precision?
		return this.project(center, zoom)._subtract(viewHalf)._round();
	},

	_latLngToNewLayerPoint: function (latlng, newZoom, newCenter) {
		var topLeft = this._getNewTopLeftPoint(newCenter, newZoom).add(this._getMapPanePos());
		return this.project(latlng, newZoom)._subtract(topLeft);
	},

	// layer point of the current center
	_getCenterLayerPoint: function () {
		return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
	},

	// offset of the specified place to the current center in pixels
	_getCenterOffset: function (latlng) {
		return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
	},

	// adjust center for view to get inside bounds
	_limitCenter: function (center, zoom, bounds) {

		if (!bounds) { return center; }

		var centerPoint = this.project(center, zoom),
		    viewHalf = this.getSize().divideBy(2),
		    viewBounds = new L.Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
		    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

		return this.unproject(centerPoint.add(offset), zoom);
	},

	// adjust offset for view to get inside bounds
	_limitOffset: function (offset, bounds) {
		if (!bounds) { return offset; }

		var viewBounds = this.getPixelBounds(),
		    newBounds = new L.Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

		return offset.add(this._getBoundsOffset(newBounds, bounds));
	},

	// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
	_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
		var nwOffset = this.project(maxBounds.getNorthWest(), zoom).subtract(pxBounds.min),
		    seOffset = this.project(maxBounds.getSouthEast(), zoom).subtract(pxBounds.max),

		    dx = this._rebound(nwOffset.x, -seOffset.x),
		    dy = this._rebound(nwOffset.y, -seOffset.y);

		return new L.Point(dx, dy);
	},

	_rebound: function (left, right) {
		return left + right > 0 ?
			Math.round(left - right) / 2 :
			Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
	},

	_limitZoom: function (zoom) {
		var min = this.getMinZoom(),
		    max = this.getMaxZoom();

		return Math.max(min, Math.min(max, zoom));
	}
});

L.map = function (id, options) {
	return new L.Map(id, options);
};


/*
 * Mercator projection that takes into account that the Earth is not a perfect sphere.
 * Less popular than spherical mercator; used by projections like EPSG:3395.
 */

L.Projection.Mercator = {
	MAX_LATITUDE: 85.0840591556,

	R_MINOR: 6356752.314245179,
	R_MAJOR: 6378137,

	project: function (latlng) { // (LatLng) -> Point
		var d = L.LatLng.DEG_TO_RAD,
		    max = this.MAX_LATITUDE,
		    lat = Math.max(Math.min(max, latlng.lat), -max),
		    r = this.R_MAJOR,
		    r2 = this.R_MINOR,
		    x = latlng.lng * d * r,
		    y = lat * d,
		    tmp = r2 / r,
		    eccent = Math.sqrt(1.0 - tmp * tmp),
		    con = eccent * Math.sin(y);

		con = Math.pow((1 - con) / (1 + con), eccent * 0.5);

		var ts = Math.tan(0.5 * ((Math.PI * 0.5) - y)) / con;
		y = -r * Math.log(ts);

		return new L.Point(x, y);
	},

	unproject: function (point) { // (Point, Boolean) -> LatLng
		var d = L.LatLng.RAD_TO_DEG,
		    r = this.R_MAJOR,
		    r2 = this.R_MINOR,
		    lng = point.x * d / r,
		    tmp = r2 / r,
		    eccent = Math.sqrt(1 - (tmp * tmp)),
		    ts = Math.exp(- point.y / r),
		    phi = (Math.PI / 2) - 2 * Math.atan(ts),
		    numIter = 15,
		    tol = 1e-7,
		    i = numIter,
		    dphi = 0.1,
		    con;

		while ((Math.abs(dphi) > tol) && (--i > 0)) {
			con = eccent * Math.sin(phi);
			dphi = (Math.PI / 2) - 2 * Math.atan(ts *
			            Math.pow((1.0 - con) / (1.0 + con), 0.5 * eccent)) - phi;
			phi += dphi;
		}

		return new L.LatLng(phi * d, lng);
	}
};



L.CRS.EPSG3395 = L.extend({}, L.CRS, {
	code: 'EPSG:3395',

	projection: L.Projection.Mercator,

	transformation: (function () {
		var m = L.Projection.Mercator,
		    r = m.R_MAJOR,
		    scale = 0.5 / (Math.PI * r);

		return new L.Transformation(scale, 0.5, -scale, 0.5);
	}())
});


/*
 * L.TileLayer is used for standard xyz-numbered tile layers.
 */

L.TileLayer = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		minZoom: 0,
		maxZoom: 18,
		tileSize: 256,
		subdomains: 'abc',
		errorTileUrl: '',
		attribution: '',
		zoomOffset: 0,
		opacity: 1,
		/*
		maxNativeZoom: null,
		zIndex: null,
		tms: false,
		continuousWorld: false,
		noWrap: false,
		zoomReverse: false,
		detectRetina: false,
		reuseTiles: false,
		bounds: false,
		*/
		unloadInvisibleTiles: L.Browser.mobile,
		updateWhenIdle: L.Browser.mobile
	},

	initialize: function (url, options) {
		options = L.setOptions(this, options);

		// detecting retina displays, adjusting tileSize and zoom levels
		if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {

			options.tileSize = Math.floor(options.tileSize / 2);
			options.zoomOffset++;

			if (options.minZoom > 0) {
				options.minZoom--;
			}
			this.options.maxZoom--;
		}

		if (options.bounds) {
			options.bounds = L.latLngBounds(options.bounds);
		}

		this._url = url;

		var subdomains = this.options.subdomains;

		if (typeof subdomains === 'string') {
			this.options.subdomains = subdomains.split('');
		}
	},

	onAdd: function (map) {
		this._map = map;
		this._animated = map._zoomAnimated;

		// create a container div for tiles
		this._initContainer();

		// set up events
		map.on({
			'viewreset': this._reset,
			'moveend': this._update
		}, this);

		if (this._animated) {
			map.on({
				'zoomanim': this._animateZoom,
				'zoomend': this._endZoomAnim
			}, this);
		}

		if (!this.options.updateWhenIdle) {
			this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this);
			map.on('move', this._limitedUpdate, this);
		}

		this._reset();
		this._update();
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		this._container.parentNode.removeChild(this._container);

		map.off({
			'viewreset': this._reset,
			'moveend': this._update
		}, this);

		if (this._animated) {
			map.off({
				'zoomanim': this._animateZoom,
				'zoomend': this._endZoomAnim
			}, this);
		}

		if (!this.options.updateWhenIdle) {
			map.off('move', this._limitedUpdate, this);
		}

		this._container = null;
		this._map = null;
	},

	bringToFront: function () {
		var pane = this._map._panes.tilePane;

		if (this._container) {
			pane.appendChild(this._container);
			this._setAutoZIndex(pane, Math.max);
		}

		return this;
	},

	bringToBack: function () {
		var pane = this._map._panes.tilePane;

		if (this._container) {
			pane.insertBefore(this._container, pane.firstChild);
			this._setAutoZIndex(pane, Math.min);
		}

		return this;
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	getContainer: function () {
		return this._container;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;

		if (this._map) {
			this._updateOpacity();
		}

		return this;
	},

	setZIndex: function (zIndex) {
		this.options.zIndex = zIndex;
		this._updateZIndex();

		return this;
	},

	setUrl: function (url, noRedraw) {
		this._url = url;

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	},

	redraw: function () {
		if (this._map) {
			this._reset({hard: true});
			this._update();
		}
		return this;
	},

	_updateZIndex: function () {
		if (this._container && this.options.zIndex !== undefined) {
			this._container.style.zIndex = this.options.zIndex;
		}
	},

	_setAutoZIndex: function (pane, compare) {

		var layers = pane.children,
		    edgeZIndex = -compare(Infinity, -Infinity), // -Infinity for max, Infinity for min
		    zIndex, i, len;

		for (i = 0, len = layers.length; i < len; i++) {

			if (layers[i] !== this._container) {
				zIndex = parseInt(layers[i].style.zIndex, 10);

				if (!isNaN(zIndex)) {
					edgeZIndex = compare(edgeZIndex, zIndex);
				}
			}
		}

		this.options.zIndex = this._container.style.zIndex =
		        (isFinite(edgeZIndex) ? edgeZIndex : 0) + compare(1, -1);
	},

	_updateOpacity: function () {
		var i,
		    tiles = this._tiles;

		if (L.Browser.ielt9) {
			for (i in tiles) {
				L.DomUtil.setOpacity(tiles[i], this.options.opacity);
			}
		} else {
			L.DomUtil.setOpacity(this._container, this.options.opacity);
		}
	},

	_initContainer: function () {
		var tilePane = this._map._panes.tilePane;

		if (!this._container) {
			this._container = L.DomUtil.create('div', 'leaflet-layer');

			this._updateZIndex();

			if (this._animated) {
				var className = 'leaflet-tile-container';

				this._bgBuffer = L.DomUtil.create('div', className, this._container);
				this._tileContainer = L.DomUtil.create('div', className, this._container);

			} else {
				this._tileContainer = this._container;
			}

			tilePane.appendChild(this._container);

			if (this.options.opacity < 1) {
				this._updateOpacity();
			}
		}
	},

	_reset: function (e) {
		for (var key in this._tiles) {
			this.fire('tileunload', {tile: this._tiles[key]});
		}

		this._tiles = {};
		this._tilesToLoad = 0;

		if (this.options.reuseTiles) {
			this._unusedTiles = [];
		}

		this._tileContainer.innerHTML = '';

		if (this._animated && e && e.hard) {
			this._clearBgBuffer();
		}

		this._initContainer();
	},

	_getTileSize: function () {
		var map = this._map,
		    zoom = map.getZoom() + this.options.zoomOffset,
		    zoomN = this.options.maxNativeZoom,
		    tileSize = this.options.tileSize;

		if (zoomN && zoom > zoomN) {
			tileSize = Math.round(map.getZoomScale(zoom) / map.getZoomScale(zoomN) * tileSize);
		}

		return tileSize;
	},

	_update: function () {

		if (!this._map) { return; }

		var map = this._map,
		    bounds = map.getPixelBounds(),
		    zoom = map.getZoom(),
		    tileSize = this._getTileSize();

		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			return;
		}

		var tileBounds = L.bounds(
		        bounds.min.divideBy(tileSize)._floor(),
		        bounds.max.divideBy(tileSize)._floor());

		this._addTilesFromCenterOut(tileBounds);

		if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
			this._removeOtherTiles(tileBounds);
		}
	},

	_addTilesFromCenterOut: function (bounds) {
		var queue = [],
		    center = bounds.getCenter();

		var j, i, point;

		for (j = bounds.min.y; j <= bounds.max.y; j++) {
			for (i = bounds.min.x; i <= bounds.max.x; i++) {
				point = new L.Point(i, j);

				if (this._tileShouldBeLoaded(point)) {
					queue.push(point);
				}
			}
		}

		var tilesToLoad = queue.length;

		if (tilesToLoad === 0) { return; }

		// load tiles in order of their distance to center
		queue.sort(function (a, b) {
			return a.distanceTo(center) - b.distanceTo(center);
		});

		var fragment = document.createDocumentFragment();

		// if its the first batch of tiles to load
		if (!this._tilesToLoad) {
			this.fire('loading');
		}

		this._tilesToLoad += tilesToLoad;

		for (i = 0; i < tilesToLoad; i++) {
			this._addTile(queue[i], fragment);
		}

		this._tileContainer.appendChild(fragment);
	},

	_tileShouldBeLoaded: function (tilePoint) {
		if ((tilePoint.x + ':' + tilePoint.y) in this._tiles) {
			return false; // already loaded
		}

		var options = this.options;

		if (!options.continuousWorld) {
			var limit = this._getWrapTileNum();

			// don't load if exceeds world bounds
			if ((options.noWrap && (tilePoint.x < 0 || tilePoint.x >= limit.x)) ||
				tilePoint.y < 0 || tilePoint.y >= limit.y) { return false; }
		}

		if (options.bounds) {
			var tileSize = this._getTileSize(),
			    nwPoint = tilePoint.multiplyBy(tileSize),
			    sePoint = nwPoint.add([tileSize, tileSize]),
			    nw = this._map.unproject(nwPoint),
			    se = this._map.unproject(sePoint);

			// TODO temporary hack, will be removed after refactoring projections
			// https://github.com/Leaflet/Leaflet/issues/1618
			if (!options.continuousWorld && !options.noWrap) {
				nw = nw.wrap();
				se = se.wrap();
			}

			if (!options.bounds.intersects([nw, se])) { return false; }
		}

		return true;
	},

	_removeOtherTiles: function (bounds) {
		var kArr, x, y, key;

		for (key in this._tiles) {
			kArr = key.split(':');
			x = parseInt(kArr[0], 10);
			y = parseInt(kArr[1], 10);

			// remove tile if it's out of bounds
			if (x < bounds.min.x || x > bounds.max.x || y < bounds.min.y || y > bounds.max.y) {
				this._removeTile(key);
			}
		}
	},

	_removeTile: function (key) {
		var tile = this._tiles[key];

		this.fire('tileunload', {tile: tile, url: tile.src});

		if (this.options.reuseTiles) {
			L.DomUtil.removeClass(tile, 'leaflet-tile-loaded');
			this._unusedTiles.push(tile);

		} else if (tile.parentNode === this._tileContainer) {
			this._tileContainer.removeChild(tile);
		}

		// for https://github.com/CloudMade/Leaflet/issues/137
		if (!L.Browser.android) {
			tile.onload = null;
			tile.src = L.Util.emptyImageUrl;
		}

		delete this._tiles[key];
	},

	_addTile: function (tilePoint, container) {
		var tilePos = this._getTilePos(tilePoint);

		// get unused tile - or create a new tile
		var tile = this._getTile();

		/*
		Chrome 20 layouts much faster with top/left (verify with timeline, frames)
		Android 4 browser has display issues with top/left and requires transform instead
		(other browsers don't currently care) - see debug/hacks/jitter.html for an example
		*/
		L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome);

		this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;

		this._loadTile(tile, tilePoint);

		if (tile.parentNode !== this._tileContainer) {
			container.appendChild(tile);
		}
	},

	_getZoomForUrl: function () {

		var options = this.options,
		    zoom = this._map.getZoom();

		if (options.zoomReverse) {
			zoom = options.maxZoom - zoom;
		}

		zoom += options.zoomOffset;

		return options.maxNativeZoom ? Math.min(zoom, options.maxNativeZoom) : zoom;
	},

	_getTilePos: function (tilePoint) {
		var origin = this._map.getPixelOrigin(),
		    tileSize = this._getTileSize();

		return tilePoint.multiplyBy(tileSize).subtract(origin);
	},

	// image-specific code (override to implement e.g. Canvas or SVG tile layer)

	getTileUrl: function (tilePoint) {
		return L.Util.template(this._url, L.extend({
			s: this._getSubdomain(tilePoint),
			z: tilePoint.z,
			x: tilePoint.x,
			y: tilePoint.y
		}, this.options));
	},

	_getWrapTileNum: function () {
		var crs = this._map.options.crs,
		    size = crs.getSize(this._map.getZoom());
		return size.divideBy(this._getTileSize())._floor();
	},

	_adjustTilePoint: function (tilePoint) {

		var limit = this._getWrapTileNum();

		// wrap tile coordinates
		if (!this.options.continuousWorld && !this.options.noWrap) {
			tilePoint.x = ((tilePoint.x % limit.x) + limit.x) % limit.x;
		}

		if (this.options.tms) {
			tilePoint.y = limit.y - tilePoint.y - 1;
		}

		tilePoint.z = this._getZoomForUrl();
	},

	_getSubdomain: function (tilePoint) {
		var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
		return this.options.subdomains[index];
	},

	_getTile: function () {
		if (this.options.reuseTiles && this._unusedTiles.length > 0) {
			var tile = this._unusedTiles.pop();
			this._resetTile(tile);
			return tile;
		}
		return this._createTile();
	},

	// Override if data stored on a tile needs to be cleaned up before reuse
	_resetTile: function (/*tile*/) {},

	_createTile: function () {
		var tile = L.DomUtil.create('img', 'leaflet-tile');
		tile.style.width = tile.style.height = this._getTileSize() + 'px';
		tile.galleryimg = 'no';

		tile.onselectstart = tile.onmousemove = L.Util.falseFn;

		if (L.Browser.ielt9 && this.options.opacity !== undefined) {
			L.DomUtil.setOpacity(tile, this.options.opacity);
		}
		// without this hack, tiles disappear after zoom on Chrome for Android
		// https://github.com/Leaflet/Leaflet/issues/2078
		if (L.Browser.mobileWebkit3d) {
			tile.style.WebkitBackfaceVisibility = 'hidden';
		}
		return tile;
	},

	_loadTile: function (tile, tilePoint) {
		tile._layer  = this;
		tile.onload  = this._tileOnLoad;
		tile.onerror = this._tileOnError;

		this._adjustTilePoint(tilePoint);
		tile.src     = this.getTileUrl(tilePoint);

		this.fire('tileloadstart', {
			tile: tile,
			url: tile.src
		});
	},

	_tileLoaded: function () {
		this._tilesToLoad--;

		if (this._animated) {
			L.DomUtil.addClass(this._tileContainer, 'leaflet-zoom-animated');
		}

		if (!this._tilesToLoad) {
			this.fire('load');

			if (this._animated) {
				// clear scaled tiles after all new tiles are loaded (for performance)
				clearTimeout(this._clearBgBufferTimer);
				this._clearBgBufferTimer = setTimeout(L.bind(this._clearBgBuffer, this), 500);
			}
		}
	},

	_tileOnLoad: function () {
		var layer = this._layer;

		//Only if we are loading an actual image
		if (this.src !== L.Util.emptyImageUrl) {
			L.DomUtil.addClass(this, 'leaflet-tile-loaded');

			layer.fire('tileload', {
				tile: this,
				url: this.src
			});
		}

		layer._tileLoaded();
	},

	_tileOnError: function () {
		var layer = this._layer;

		layer.fire('tileerror', {
			tile: this,
			url: this.src
		});

		var newUrl = layer.options.errorTileUrl;
		if (newUrl) {
			this.src = newUrl;
		}

		layer._tileLoaded();
	}
});

L.tileLayer = function (url, options) {
	return new L.TileLayer(url, options);
};


/*
 * L.TileLayer.WMS is used for putting WMS tile layers on the map.
 */

L.TileLayer.WMS = L.TileLayer.extend({

	defaultWmsParams: {
		service: 'WMS',
		request: 'GetMap',
		version: '1.1.1',
		layers: '',
		styles: '',
		format: 'image/jpeg',
		transparent: false
	},

	initialize: function (url, options) { // (String, Object)

		this._url = url;

		var wmsParams = L.extend({}, this.defaultWmsParams),
		    tileSize = options.tileSize || this.options.tileSize;

		if (options.detectRetina && L.Browser.retina) {
			wmsParams.width = wmsParams.height = tileSize * 2;
		} else {
			wmsParams.width = wmsParams.height = tileSize;
		}

		for (var i in options) {
			// all keys that are not TileLayer options go to WMS params
			if (!this.options.hasOwnProperty(i) && i !== 'crs') {
				wmsParams[i] = options[i];
			}
		}

		this.wmsParams = wmsParams;

		L.setOptions(this, options);
	},

	onAdd: function (map) {

		this._crs = this.options.crs || map.options.crs;

		this._wmsVersion = parseFloat(this.wmsParams.version);

		var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
		this.wmsParams[projectionKey] = this._crs.code;

		L.TileLayer.prototype.onAdd.call(this, map);
	},

	getTileUrl: function (tilePoint) { // (Point, Number) -> String

		var map = this._map,
		    tileSize = this.options.tileSize,

		    nwPoint = tilePoint.multiplyBy(tileSize),
		    sePoint = nwPoint.add([tileSize, tileSize]),

		    nw = this._crs.project(map.unproject(nwPoint, tilePoint.z)),
		    se = this._crs.project(map.unproject(sePoint, tilePoint.z)),
		    bbox = this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?
		        [se.y, nw.x, nw.y, se.x].join(',') :
		        [nw.x, se.y, se.x, nw.y].join(','),

		    url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});

		return url + L.Util.getParamString(this.wmsParams, url, true) + '&BBOX=' + bbox;
	},

	setParams: function (params, noRedraw) {

		L.extend(this.wmsParams, params);

		if (!noRedraw) {
			this.redraw();
		}

		return this;
	}
});

L.tileLayer.wms = function (url, options) {
	return new L.TileLayer.WMS(url, options);
};


/*
 * L.TileLayer.Canvas is a class that you can use as a base for creating
 * dynamically drawn Canvas-based tile layers.
 */

L.TileLayer.Canvas = L.TileLayer.extend({
	options: {
		async: false
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	redraw: function () {
		if (this._map) {
			this._reset({hard: true});
			this._update();
		}

		for (var i in this._tiles) {
			this._redrawTile(this._tiles[i]);
		}
		return this;
	},

	_redrawTile: function (tile) {
		this.drawTile(tile, tile._tilePoint, this._map._zoom);
	},

	_createTile: function () {
		var tile = L.DomUtil.create('canvas', 'leaflet-tile');
		tile.width = tile.height = this.options.tileSize;
		tile.onselectstart = tile.onmousemove = L.Util.falseFn;
		return tile;
	},

	_loadTile: function (tile, tilePoint) {
		tile._layer = this;
		tile._tilePoint = tilePoint;

		this._redrawTile(tile);

		if (!this.options.async) {
			this.tileDrawn(tile);
		}
	},

	drawTile: function (/*tile, tilePoint*/) {
		// override with rendering code
	},

	tileDrawn: function (tile) {
		this._tileOnLoad.call(tile);
	}
});


L.tileLayer.canvas = function (options) {
	return new L.TileLayer.Canvas(options);
};


/*
 * L.ImageOverlay is used to overlay images over the map (to specific geographical bounds).
 */

L.ImageOverlay = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		opacity: 1
	},

	initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
		this._url = url;
		this._bounds = L.latLngBounds(bounds);

		L.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._image) {
			this._initImage();
		}

		map._panes.overlayPane.appendChild(this._image);

		map.on('viewreset', this._reset, this);

		if (map.options.zoomAnimation && L.Browser.any3d) {
			map.on('zoomanim', this._animateZoom, this);
		}

		this._reset();
	},

	onRemove: function (map) {
		map.getPanes().overlayPane.removeChild(this._image);

		map.off('viewreset', this._reset, this);

		if (map.options.zoomAnimation) {
			map.off('zoomanim', this._animateZoom, this);
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		this._updateOpacity();
		return this;
	},

	// TODO remove bringToFront/bringToBack duplication from TileLayer/Path
	bringToFront: function () {
		if (this._image) {
			this._map._panes.overlayPane.appendChild(this._image);
		}
		return this;
	},

	bringToBack: function () {
		var pane = this._map._panes.overlayPane;
		if (this._image) {
			pane.insertBefore(this._image, pane.firstChild);
		}
		return this;
	},

	setUrl: function (url) {
		this._url = url;
		this._image.src = this._url;
	},

	getAttribution: function () {
		return this.options.attribution;
	},

	_initImage: function () {
		this._image = L.DomUtil.create('img', 'leaflet-image-layer');

		if (this._map.options.zoomAnimation && L.Browser.any3d) {
			L.DomUtil.addClass(this._image, 'leaflet-zoom-animated');
		} else {
			L.DomUtil.addClass(this._image, 'leaflet-zoom-hide');
		}

		this._updateOpacity();

		//TODO createImage util method to remove duplication
		L.extend(this._image, {
			galleryimg: 'no',
			onselectstart: L.Util.falseFn,
			onmousemove: L.Util.falseFn,
			onload: L.bind(this._onImageLoad, this),
			src: this._url
		});
	},

	_animateZoom: function (e) {
		var map = this._map,
		    image = this._image,
		    scale = map.getZoomScale(e.zoom),
		    nw = this._bounds.getNorthWest(),
		    se = this._bounds.getSouthEast(),

		    topLeft = map._latLngToNewLayerPoint(nw, e.zoom, e.center),
		    size = map._latLngToNewLayerPoint(se, e.zoom, e.center)._subtract(topLeft),
		    origin = topLeft._add(size._multiplyBy((1 / 2) * (1 - 1 / scale)));

		image.style[L.DomUtil.TRANSFORM] =
		        L.DomUtil.getTranslateString(origin) + ' scale(' + scale + ') ';
	},

	_reset: function () {
		var image   = this._image,
		    topLeft = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
		    size = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(topLeft);

		L.DomUtil.setPosition(image, topLeft);

		image.style.width  = size.x + 'px';
		image.style.height = size.y + 'px';
	},

	_onImageLoad: function () {
		this.fire('load');
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._image, this.options.opacity);
	}
});

L.imageOverlay = function (url, bounds, options) {
	return new L.ImageOverlay(url, bounds, options);
};


/*
 * L.Icon is an image-based icon class that you can use with L.Marker for custom markers.
 */

L.Icon = L.Class.extend({
	options: {
		/*
		iconUrl: (String) (required)
		iconRetinaUrl: (String) (optional, used for retina devices if detected)
		iconSize: (Point) (can be set through CSS)
		iconAnchor: (Point) (centered by default, can be set in CSS with negative margins)
		popupAnchor: (Point) (if not specified, popup opens in the anchor point)
		shadowUrl: (String) (no shadow by default)
		shadowRetinaUrl: (String) (optional, used for retina devices if detected)
		shadowSize: (Point)
		shadowAnchor: (Point)
		*/
		className: ''
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	createIcon: function (oldIcon) {
		return this._createIcon('icon', oldIcon);
	},

	createShadow: function (oldIcon) {
		return this._createIcon('shadow', oldIcon);
	},

	_createIcon: function (name, oldIcon) {
		var src = this._getIconUrl(name);

		if (!src) {
			if (name === 'icon') {
				throw new Error('iconUrl not set in Icon options (see the docs).');
			}
			return null;
		}

		var img;
		if (!oldIcon || oldIcon.tagName !== 'IMG') {
			img = this._createImg(src);
		} else {
			img = this._createImg(src, oldIcon);
		}
		this._setIconStyles(img, name);

		return img;
	},

	_setIconStyles: function (img, name) {
		var options = this.options,
		    size = L.point(options[name + 'Size']),
		    anchor;

		if (name === 'shadow') {
			anchor = L.point(options.shadowAnchor || options.iconAnchor);
		} else {
			anchor = L.point(options.iconAnchor);
		}

		if (!anchor && size) {
			anchor = size.divideBy(2, true);
		}

		img.className = 'leaflet-marker-' + name + ' ' + options.className;

		if (anchor) {
			img.style.marginLeft = (-anchor.x) + 'px';
			img.style.marginTop  = (-anchor.y) + 'px';
		}

		if (size) {
			img.style.width  = size.x + 'px';
			img.style.height = size.y + 'px';
		}
	},

	_createImg: function (src, el) {
		el = el || document.createElement('img');
		el.src = src;
		return el;
	},

	_getIconUrl: function (name) {
		if (L.Browser.retina && this.options[name + 'RetinaUrl']) {
			return this.options[name + 'RetinaUrl'];
		}
		return this.options[name + 'Url'];
	}
});

L.icon = function (options) {
	return new L.Icon(options);
};


/*
 * L.Icon.Default is the blue marker icon used by default in Leaflet.
 */

L.Icon.Default = L.Icon.extend({

	options: {
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],

		shadowSize: [41, 41]
	},

	_getIconUrl: function (name) {
		var key = name + 'Url';

		if (this.options[key]) {
			return this.options[key];
		}

		if (L.Browser.retina && name === 'icon') {
			name += '-2x';
		}

		var path = L.Icon.Default.imagePath;

		if (!path) {
			throw new Error('Couldn\'t autodetect L.Icon.Default.imagePath, set it manually.');
		}

		return path + '/marker-' + name + '.png';
	}
});

L.Icon.Default.imagePath = (function () {
	var scripts = document.getElementsByTagName('script'),
	    leafletRe = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;

	var i, len, src, matches, path;

	for (i = 0, len = scripts.length; i < len; i++) {
		src = scripts[i].src;
		matches = src.match(leafletRe);

		if (matches) {
			path = src.split(leafletRe)[0];
			return (path ? path + '/' : '') + 'images';
		}
	}
}());


/*
 * L.Marker is used to display clickable/draggable icons on the map.
 */

L.Marker = L.Class.extend({

	includes: L.Mixin.Events,

	options: {
		icon: new L.Icon.Default(),
		title: '',
		alt: '',
		clickable: true,
		draggable: false,
		keyboard: true,
		zIndexOffset: 0,
		opacity: 1,
		riseOnHover: false,
		riseOffset: 250
	},

	initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = L.latLng(latlng);
	},

	onAdd: function (map) {
		this._map = map;

		map.on('viewreset', this.update, this);

		this._initIcon();
		this.update();
		this.fire('add');

		if (map.options.zoomAnimation && map.options.markerZoomAnimation) {
			map.on('zoomanim', this._animateZoom, this);
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		if (this.dragging) {
			this.dragging.disable();
		}

		this._removeIcon();
		this._removeShadow();

		this.fire('remove');

		map.off({
			'viewreset': this.update,
			'zoomanim': this._animateZoom
		}, this);

		this._map = null;
	},

	getLatLng: function () {
		return this._latlng;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);

		this.update();

		return this.fire('move', { latlng: this._latlng });
	},

	setZIndexOffset: function (offset) {
		this.options.zIndexOffset = offset;
		this.update();

		return this;
	},

	setIcon: function (icon) {

		this.options.icon = icon;

		if (this._map) {
			this._initIcon();
			this.update();
		}

		if (this._popup) {
			this.bindPopup(this._popup);
		}

		return this;
	},

	update: function () {
		if (this._icon) {
			this._setPos(this._map.latLngToLayerPoint(this._latlng).round());
		}
		return this;
	},

	_initIcon: function () {
		var options = this.options,
		    map = this._map,
		    animation = (map.options.zoomAnimation && map.options.markerZoomAnimation),
		    classToAdd = animation ? 'leaflet-zoom-animated' : 'leaflet-zoom-hide';

		var icon = options.icon.createIcon(this._icon),
			addIcon = false;

		// if we're not reusing the icon, remove the old one and init new one
		if (icon !== this._icon) {
			if (this._icon) {
				this._removeIcon();
			}
			addIcon = true;

			if (options.title) {
				icon.title = options.title;
			}

			if (options.alt) {
				icon.alt = options.alt;
			}
		}

		L.DomUtil.addClass(icon, classToAdd);

		if (options.keyboard) {
			icon.tabIndex = '0';
		}

		this._icon = icon;

		this._initInteraction();

		if (options.riseOnHover) {
			L.DomEvent
				.on(icon, 'mouseover', this._bringToFront, this)
				.on(icon, 'mouseout', this._resetZIndex, this);
		}

		var newShadow = options.icon.createShadow(this._shadow),
			addShadow = false;

		if (newShadow !== this._shadow) {
			this._removeShadow();
			addShadow = true;
		}

		if (newShadow) {
			L.DomUtil.addClass(newShadow, classToAdd);
		}
		this._shadow = newShadow;


		if (options.opacity < 1) {
			this._updateOpacity();
		}


		var panes = this._map._panes;

		if (addIcon) {
			panes.markerPane.appendChild(this._icon);
		}

		if (newShadow && addShadow) {
			panes.shadowPane.appendChild(this._shadow);
		}
	},

	_removeIcon: function () {
		if (this.options.riseOnHover) {
			L.DomEvent
			    .off(this._icon, 'mouseover', this._bringToFront)
			    .off(this._icon, 'mouseout', this._resetZIndex);
		}

		this._map._panes.markerPane.removeChild(this._icon);

		this._icon = null;
	},

	_removeShadow: function () {
		if (this._shadow) {
			this._map._panes.shadowPane.removeChild(this._shadow);
		}
		this._shadow = null;
	},

	_setPos: function (pos) {
		L.DomUtil.setPosition(this._icon, pos);

		if (this._shadow) {
			L.DomUtil.setPosition(this._shadow, pos);
		}

		this._zIndex = pos.y + this.options.zIndexOffset;

		this._resetZIndex();
	},

	_updateZIndex: function (offset) {
		this._icon.style.zIndex = this._zIndex + offset;
	},

	_animateZoom: function (opt) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

		this._setPos(pos);
	},

	_initInteraction: function () {

		if (!this.options.clickable) { return; }

		// TODO refactor into something shared with Map/Path/etc. to DRY it up

		var icon = this._icon,
		    events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

		L.DomUtil.addClass(icon, 'leaflet-clickable');
		L.DomEvent.on(icon, 'click', this._onMouseClick, this);
		L.DomEvent.on(icon, 'keypress', this._onKeyPress, this);

		for (var i = 0; i < events.length; i++) {
			L.DomEvent.on(icon, events[i], this._fireMouseEvent, this);
		}

		if (L.Handler.MarkerDrag) {
			this.dragging = new L.Handler.MarkerDrag(this);

			if (this.options.draggable) {
				this.dragging.enable();
			}
		}
	},

	_onMouseClick: function (e) {
		var wasDragged = this.dragging && this.dragging.moved();

		if (this.hasEventListeners(e.type) || wasDragged) {
			L.DomEvent.stopPropagation(e);
		}

		if (wasDragged) { return; }

		if ((!this.dragging || !this.dragging._enabled) && this._map.dragging && this._map.dragging.moved()) { return; }

		this.fire(e.type, {
			originalEvent: e,
			latlng: this._latlng
		});
	},

	_onKeyPress: function (e) {
		if (e.keyCode === 13) {
			this.fire('click', {
				originalEvent: e,
				latlng: this._latlng
			});
		}
	},

	_fireMouseEvent: function (e) {

		this.fire(e.type, {
			originalEvent: e,
			latlng: this._latlng
		});

		// TODO proper custom event propagation
		// this line will always be called if marker is in a FeatureGroup
		if (e.type === 'contextmenu' && this.hasEventListeners(e.type)) {
			L.DomEvent.preventDefault(e);
		}
		if (e.type !== 'mousedown') {
			L.DomEvent.stopPropagation(e);
		} else {
			L.DomEvent.preventDefault(e);
		}
	},

	setOpacity: function (opacity) {
		this.options.opacity = opacity;
		if (this._map) {
			this._updateOpacity();
		}

		return this;
	},

	_updateOpacity: function () {
		L.DomUtil.setOpacity(this._icon, this.options.opacity);
		if (this._shadow) {
			L.DomUtil.setOpacity(this._shadow, this.options.opacity);
		}
	},

	_bringToFront: function () {
		this._updateZIndex(this.options.riseOffset);
	},

	_resetZIndex: function () {
		this._updateZIndex(0);
	}
});

L.marker = function (latlng, options) {
	return new L.Marker(latlng, options);
};


/*
 * L.DivIcon is a lightweight HTML-based icon class (as opposed to the image-based L.Icon)
 * to use with L.Marker.
 */

L.DivIcon = L.Icon.extend({
	options: {
		iconSize: [12, 12], // also can be set through CSS
		/*
		iconAnchor: (Point)
		popupAnchor: (Point)
		html: (String)
		bgPos: (Point)
		*/
		className: 'leaflet-div-icon',
		html: false
	},

	createIcon: function (oldIcon) {
		var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
		    options = this.options;

		if (options.html !== false) {
			div.innerHTML = options.html;
		} else {
			div.innerHTML = '';
		}

		if (options.bgPos) {
			div.style.backgroundPosition =
			        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
		}

		this._setIconStyles(div, 'icon');
		return div;
	},

	createShadow: function () {
		return null;
	}
});

L.divIcon = function (options) {
	return new L.DivIcon(options);
};


/*
 * L.Popup is used for displaying popups on the map.
 */

L.Map.mergeOptions({
	closePopupOnClick: true
});

L.Popup = L.Class.extend({
	includes: L.Mixin.Events,

	options: {
		minWidth: 50,
		maxWidth: 300,
		// maxHeight: null,
		autoPan: true,
		closeButton: true,
		offset: [0, 7],
		autoPanPadding: [5, 5],
		// autoPanPaddingTopLeft: null,
		// autoPanPaddingBottomRight: null,
		keepInView: false,
		className: '',
		zoomAnimation: true
	},

	initialize: function (options, source) {
		L.setOptions(this, options);

		this._source = source;
		this._animated = L.Browser.any3d && this.options.zoomAnimation;
		this._isOpen = false;
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._container) {
			this._initLayout();
		}

		var animFade = map.options.fadeAnimation;

		if (animFade) {
			L.DomUtil.setOpacity(this._container, 0);
		}
		map._panes.popupPane.appendChild(this._container);

		map.on(this._getEvents(), this);

		this.update();

		if (animFade) {
			L.DomUtil.setOpacity(this._container, 1);
		}

		this.fire('open');

		map.fire('popupopen', {popup: this});

		if (this._source) {
			this._source.fire('popupopen', {popup: this});
		}
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	openOn: function (map) {
		map.openPopup(this);
		return this;
	},

	onRemove: function (map) {
		map._panes.popupPane.removeChild(this._container);

		L.Util.falseFn(this._container.offsetWidth); // force reflow

		map.off(this._getEvents(), this);

		if (map.options.fadeAnimation) {
			L.DomUtil.setOpacity(this._container, 0);
		}

		this._map = null;

		this.fire('close');

		map.fire('popupclose', {popup: this});

		if (this._source) {
			this._source.fire('popupclose', {popup: this});
		}
	},

	getLatLng: function () {
		return this._latlng;
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		if (this._map) {
			this._updatePosition();
			this._adjustPan();
		}
		return this;
	},

	getContent: function () {
		return this._content;
	},

	setContent: function (content) {
		this._content = content;
		this.update();
		return this;
	},

	update: function () {
		if (!this._map) { return; }

		this._container.style.visibility = 'hidden';

		this._updateContent();
		this._updateLayout();
		this._updatePosition();

		this._container.style.visibility = '';

		this._adjustPan();
	},

	_getEvents: function () {
		var events = {
			viewreset: this._updatePosition
		};

		if (this._animated) {
			events.zoomanim = this._zoomAnimation;
		}
		if ('closeOnClick' in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
			events.preclick = this._close;
		}
		if (this.options.keepInView) {
			events.moveend = this._adjustPan;
		}

		return events;
	},

	_close: function () {
		if (this._map) {
			this._map.closePopup(this);
		}
	},

	_initLayout: function () {
		var prefix = 'leaflet-popup',
			containerClass = prefix + ' ' + this.options.className + ' leaflet-zoom-' +
			        (this._animated ? 'animated' : 'hide'),
			container = this._container = L.DomUtil.create('div', containerClass),
			closeButton;

		if (this.options.closeButton) {
			closeButton = this._closeButton =
			        L.DomUtil.create('a', prefix + '-close-button', container);
			closeButton.href = '#close';
			closeButton.innerHTML = '&#215;';
			L.DomEvent.disableClickPropagation(closeButton);

			L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
		}

		var wrapper = this._wrapper =
		        L.DomUtil.create('div', prefix + '-content-wrapper', container);
		L.DomEvent.disableClickPropagation(wrapper);

		this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

		L.DomEvent.disableScrollPropagation(this._contentNode);
		L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

		this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
		this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
	},

	_updateContent: function () {
		if (!this._content) { return; }

		if (typeof this._content === 'string') {
			this._contentNode.innerHTML = this._content;
		} else {
			while (this._contentNode.hasChildNodes()) {
				this._contentNode.removeChild(this._contentNode.firstChild);
			}
			this._contentNode.appendChild(this._content);
		}
		this.fire('contentupdate');
	},

	_updateLayout: function () {
		var container = this._contentNode,
		    style = container.style;

		style.width = '';
		style.whiteSpace = 'nowrap';

		var width = container.offsetWidth;
		width = Math.min(width, this.options.maxWidth);
		width = Math.max(width, this.options.minWidth);

		style.width = (width + 1) + 'px';
		style.whiteSpace = '';

		style.height = '';

		var height = container.offsetHeight,
		    maxHeight = this.options.maxHeight,
		    scrolledClass = 'leaflet-popup-scrolled';

		if (maxHeight && height > maxHeight) {
			style.height = maxHeight + 'px';
			L.DomUtil.addClass(container, scrolledClass);
		} else {
			L.DomUtil.removeClass(container, scrolledClass);
		}

		this._containerWidth = this._container.offsetWidth;
	},

	_updatePosition: function () {
		if (!this._map) { return; }

		var pos = this._map.latLngToLayerPoint(this._latlng),
		    animated = this._animated,
		    offset = L.point(this.options.offset);

		if (animated) {
			L.DomUtil.setPosition(this._container, pos);
		}

		this._containerBottom = -offset.y - (animated ? 0 : pos.y);
		this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x + (animated ? 0 : pos.x);

		// bottom position the popup in case the height of the popup changes (images loading etc)
		this._container.style.bottom = this._containerBottom + 'px';
		this._container.style.left = this._containerLeft + 'px';
	},

	_zoomAnimation: function (opt) {
		var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center);

		L.DomUtil.setPosition(this._container, pos);
	},

	_adjustPan: function () {
		if (!this.options.autoPan) { return; }

		var map = this._map,
		    containerHeight = this._container.offsetHeight,
		    containerWidth = this._containerWidth,

		    layerPos = new L.Point(this._containerLeft, -containerHeight - this._containerBottom);

		if (this._animated) {
			layerPos._add(L.DomUtil.getPosition(this._container));
		}

		var containerPos = map.layerPointToContainerPoint(layerPos),
		    padding = L.point(this.options.autoPanPadding),
		    paddingTL = L.point(this.options.autoPanPaddingTopLeft || padding),
		    paddingBR = L.point(this.options.autoPanPaddingBottomRight || padding),
		    size = map.getSize(),
		    dx = 0,
		    dy = 0;

		if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
			dx = containerPos.x + containerWidth - size.x + paddingBR.x;
		}
		if (containerPos.x - dx - paddingTL.x < 0) { // left
			dx = containerPos.x - paddingTL.x;
		}
		if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
			dy = containerPos.y + containerHeight - size.y + paddingBR.y;
		}
		if (containerPos.y - dy - paddingTL.y < 0) { // top
			dy = containerPos.y - paddingTL.y;
		}

		if (dx || dy) {
			map
			    .fire('autopanstart')
			    .panBy([dx, dy]);
		}
	},

	_onCloseButtonClick: function (e) {
		this._close();
		L.DomEvent.stop(e);
	}
});

L.popup = function (options, source) {
	return new L.Popup(options, source);
};


L.Map.include({
	openPopup: function (popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
		this.closePopup();

		if (!(popup instanceof L.Popup)) {
			var content = popup;

			popup = new L.Popup(options)
			    .setLatLng(latlng)
			    .setContent(content);
		}
		popup._isOpen = true;

		this._popup = popup;
		return this.addLayer(popup);
	},

	closePopup: function (popup) {
		if (!popup || popup === this._popup) {
			popup = this._popup;
			this._popup = null;
		}
		if (popup) {
			this.removeLayer(popup);
			popup._isOpen = false;
		}
		return this;
	}
});


/*
 * Popup extension to L.Marker, adding popup-related methods.
 */

L.Marker.include({
	openPopup: function () {
		if (this._popup && this._map && !this._map.hasLayer(this._popup)) {
			this._popup.setLatLng(this._latlng);
			this._map.openPopup(this._popup);
		}

		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	togglePopup: function () {
		if (this._popup) {
			if (this._popup._isOpen) {
				this.closePopup();
			} else {
				this.openPopup();
			}
		}
		return this;
	},

	bindPopup: function (content, options) {
		var anchor = L.point(this.options.icon.options.popupAnchor || [0, 0]);

		anchor = anchor.add(L.Popup.prototype.options.offset);

		if (options && options.offset) {
			anchor = anchor.add(options.offset);
		}

		options = L.extend({offset: anchor}, options);

		if (!this._popupHandlersAdded) {
			this
			    .on('click', this.togglePopup, this)
			    .on('remove', this.closePopup, this)
			    .on('move', this._movePopup, this);
			this._popupHandlersAdded = true;
		}

		if (content instanceof L.Popup) {
			L.setOptions(content, options);
			this._popup = content;
			content._source = this;
		} else {
			this._popup = new L.Popup(options, this)
				.setContent(content);
		}

		return this;
	},

	setPopupContent: function (content) {
		if (this._popup) {
			this._popup.setContent(content);
		}
		return this;
	},

	unbindPopup: function () {
		if (this._popup) {
			this._popup = null;
			this
			    .off('click', this.togglePopup, this)
			    .off('remove', this.closePopup, this)
			    .off('move', this._movePopup, this);
			this._popupHandlersAdded = false;
		}
		return this;
	},

	getPopup: function () {
		return this._popup;
	},

	_movePopup: function (e) {
		this._popup.setLatLng(e.latlng);
	}
});


/*
 * L.LayerGroup is a class to combine several layers into one so that
 * you can manipulate the group (e.g. add/remove it) as one layer.
 */

L.LayerGroup = L.Class.extend({
	initialize: function (layers) {
		this._layers = {};

		var i, len;

		if (layers) {
			for (i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		}
	},

	addLayer: function (layer) {
		var id = this.getLayerId(layer);

		this._layers[id] = layer;

		if (this._map) {
			this._map.addLayer(layer);
		}

		return this;
	},

	removeLayer: function (layer) {
		var id = layer in this._layers ? layer : this.getLayerId(layer);

		if (this._map && this._layers[id]) {
			this._map.removeLayer(this._layers[id]);
		}

		delete this._layers[id];

		return this;
	},

	hasLayer: function (layer) {
		if (!layer) { return false; }

		return (layer in this._layers || this.getLayerId(layer) in this._layers);
	},

	clearLayers: function () {
		this.eachLayer(this.removeLayer, this);
		return this;
	},

	invoke: function (methodName) {
		var args = Array.prototype.slice.call(arguments, 1),
		    i, layer;

		for (i in this._layers) {
			layer = this._layers[i];

			if (layer[methodName]) {
				layer[methodName].apply(layer, args);
			}
		}

		return this;
	},

	onAdd: function (map) {
		this._map = map;
		this.eachLayer(map.addLayer, map);
	},

	onRemove: function (map) {
		this.eachLayer(map.removeLayer, map);
		this._map = null;
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	eachLayer: function (method, context) {
		for (var i in this._layers) {
			method.call(context, this._layers[i]);
		}
		return this;
	},

	getLayer: function (id) {
		return this._layers[id];
	},

	getLayers: function () {
		var layers = [];

		for (var i in this._layers) {
			layers.push(this._layers[i]);
		}
		return layers;
	},

	setZIndex: function (zIndex) {
		return this.invoke('setZIndex', zIndex);
	},

	getLayerId: function (layer) {
		return L.stamp(layer);
	}
});

L.layerGroup = function (layers) {
	return new L.LayerGroup(layers);
};


/*
 * L.FeatureGroup extends L.LayerGroup by introducing mouse events and additional methods
 * shared between a group of interactive layers (like vectors or markers).
 */

L.FeatureGroup = L.LayerGroup.extend({
	includes: L.Mixin.Events,

	statics: {
		EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose'
	},

	addLayer: function (layer) {
		if (this.hasLayer(layer)) {
			return this;
		}

		if ('on' in layer) {
			layer.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);
		}

		L.LayerGroup.prototype.addLayer.call(this, layer);

		if (this._popupContent && layer.bindPopup) {
			layer.bindPopup(this._popupContent, this._popupOptions);
		}

		return this.fire('layeradd', {layer: layer});
	},

	removeLayer: function (layer) {
		if (!this.hasLayer(layer)) {
			return this;
		}
		if (layer in this._layers) {
			layer = this._layers[layer];
		}

		if ('off' in layer) {
			layer.off(L.FeatureGroup.EVENTS, this._propagateEvent, this);
		}

		L.LayerGroup.prototype.removeLayer.call(this, layer);

		if (this._popupContent) {
			this.invoke('unbindPopup');
		}

		return this.fire('layerremove', {layer: layer});
	},

	bindPopup: function (content, options) {
		this._popupContent = content;
		this._popupOptions = options;
		return this.invoke('bindPopup', content, options);
	},

	openPopup: function (latlng) {
		// open popup on the first layer
		for (var id in this._layers) {
			this._layers[id].openPopup(latlng);
			break;
		}
		return this;
	},

	setStyle: function (style) {
		return this.invoke('setStyle', style);
	},

	bringToFront: function () {
		return this.invoke('bringToFront');
	},

	bringToBack: function () {
		return this.invoke('bringToBack');
	},

	getBounds: function () {
		var bounds = new L.LatLngBounds();

		this.eachLayer(function (layer) {
			bounds.extend(layer instanceof L.Marker ? layer.getLatLng() : layer.getBounds());
		});

		return bounds;
	},

	_propagateEvent: function (e) {
		e = L.extend({
			layer: e.target,
			target: this
		}, e);
		this.fire(e.type, e);
	}
});

L.featureGroup = function (layers) {
	return new L.FeatureGroup(layers);
};


/*
 * L.Path is a base class for rendering vector paths on a map. Inherited by Polyline, Circle, etc.
 */

L.Path = L.Class.extend({
	includes: [L.Mixin.Events],

	statics: {
		// how much to extend the clip area around the map view
		// (relative to its size, e.g. 0.5 is half the screen in each direction)
		// set it so that SVG element doesn't exceed 1280px (vectors flicker on dragend if it is)
		CLIP_PADDING: (function () {
			var max = L.Browser.mobile ? 1280 : 2000,
			    target = (max / Math.max(window.outerWidth, window.outerHeight) - 1) / 2;
			return Math.max(0, Math.min(0.5, target));
		})()
	},

	options: {
		stroke: true,
		color: '#0033ff',
		dashArray: null,
		lineCap: null,
		lineJoin: null,
		weight: 5,
		opacity: 0.5,

		fill: false,
		fillColor: null, //same as color by default
		fillOpacity: 0.2,

		clickable: true
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	onAdd: function (map) {
		this._map = map;

		if (!this._container) {
			this._initElements();
			this._initEvents();
		}

		this.projectLatlngs();
		this._updatePath();

		if (this._container) {
			this._map._pathRoot.appendChild(this._container);
		}

		this.fire('add');

		map.on({
			'viewreset': this.projectLatlngs,
			'moveend': this._updatePath
		}, this);
	},

	addTo: function (map) {
		map.addLayer(this);
		return this;
	},

	onRemove: function (map) {
		map._pathRoot.removeChild(this._container);

		// Need to fire remove event before we set _map to null as the event hooks might need the object
		this.fire('remove');
		this._map = null;

		if (L.Browser.vml) {
			this._container = null;
			this._stroke = null;
			this._fill = null;
		}

		map.off({
			'viewreset': this.projectLatlngs,
			'moveend': this._updatePath
		}, this);
	},

	projectLatlngs: function () {
		// do all projection stuff here
	},

	setStyle: function (style) {
		L.setOptions(this, style);

		if (this._container) {
			this._updateStyle();
		}

		return this;
	},

	redraw: function () {
		if (this._map) {
			this.projectLatlngs();
			this._updatePath();
		}
		return this;
	}
});

L.Map.include({
	_updatePathViewport: function () {
		var p = L.Path.CLIP_PADDING,
		    size = this.getSize(),
		    panePos = L.DomUtil.getPosition(this._mapPane),
		    min = panePos.multiplyBy(-1)._subtract(size.multiplyBy(p)._round()),
		    max = min.add(size.multiplyBy(1 + p * 2)._round());

		this._pathViewport = new L.Bounds(min, max);
	}
});


/*
 * Extends L.Path with SVG-specific rendering code.
 */

L.Path.SVG_NS = 'http://www.w3.org/2000/svg';

L.Browser.svg = !!(document.createElementNS && document.createElementNS(L.Path.SVG_NS, 'svg').createSVGRect);

L.Path = L.Path.extend({
	statics: {
		SVG: L.Browser.svg
	},

	bringToFront: function () {
		var root = this._map._pathRoot,
		    path = this._container;

		if (path && root.lastChild !== path) {
			root.appendChild(path);
		}
		return this;
	},

	bringToBack: function () {
		var root = this._map._pathRoot,
		    path = this._container,
		    first = root.firstChild;

		if (path && first !== path) {
			root.insertBefore(path, first);
		}
		return this;
	},

	getPathString: function () {
		// form path string here
	},

	_createElement: function (name) {
		return document.createElementNS(L.Path.SVG_NS, name);
	},

	_initElements: function () {
		this._map._initPathRoot();
		this._initPath();
		this._initStyle();
	},

	_initPath: function () {
		this._container = this._createElement('g');

		this._path = this._createElement('path');

		if (this.options.className) {
			L.DomUtil.addClass(this._path, this.options.className);
		}

		this._container.appendChild(this._path);
	},

	_initStyle: function () {
		if (this.options.stroke) {
			this._path.setAttribute('stroke-linejoin', 'round');
			this._path.setAttribute('stroke-linecap', 'round');
		}
		if (this.options.fill) {
			this._path.setAttribute('fill-rule', 'evenodd');
		}
		if (this.options.pointerEvents) {
			this._path.setAttribute('pointer-events', this.options.pointerEvents);
		}
		if (!this.options.clickable && !this.options.pointerEvents) {
			this._path.setAttribute('pointer-events', 'none');
		}
		this._updateStyle();
	},

	_updateStyle: function () {
		if (this.options.stroke) {
			this._path.setAttribute('stroke', this.options.color);
			this._path.setAttribute('stroke-opacity', this.options.opacity);
			this._path.setAttribute('stroke-width', this.options.weight);
			if (this.options.dashArray) {
				this._path.setAttribute('stroke-dasharray', this.options.dashArray);
			} else {
				this._path.removeAttribute('stroke-dasharray');
			}
			if (this.options.lineCap) {
				this._path.setAttribute('stroke-linecap', this.options.lineCap);
			}
			if (this.options.lineJoin) {
				this._path.setAttribute('stroke-linejoin', this.options.lineJoin);
			}
		} else {
			this._path.setAttribute('stroke', 'none');
		}
		if (this.options.fill) {
			this._path.setAttribute('fill', this.options.fillColor || this.options.color);
			this._path.setAttribute('fill-opacity', this.options.fillOpacity);
		} else {
			this._path.setAttribute('fill', 'none');
		}
	},

	_updatePath: function () {
		var str = this.getPathString();
		if (!str) {
			// fix webkit empty string parsing bug
			str = 'M0 0';
		}
		this._path.setAttribute('d', str);
	},

	// TODO remove duplication with L.Map
	_initEvents: function () {
		if (this.options.clickable) {
			if (L.Browser.svg || !L.Browser.vml) {
				L.DomUtil.addClass(this._path, 'leaflet-clickable');
			}

			L.DomEvent.on(this._container, 'click', this._onMouseClick, this);

			var events = ['dblclick', 'mousedown', 'mouseover',
			              'mouseout', 'mousemove', 'contextmenu'];
			for (var i = 0; i < events.length; i++) {
				L.DomEvent.on(this._container, events[i], this._fireMouseEvent, this);
			}
		}
	},

	_onMouseClick: function (e) {
		if (this._map.dragging && this._map.dragging.moved()) { return; }

		this._fireMouseEvent(e);
	},

	_fireMouseEvent: function (e) {
		if (!this._map || !this.hasEventListeners(e.type)) { return; }

		var map = this._map,
		    containerPoint = map.mouseEventToContainerPoint(e),
		    layerPoint = map.containerPointToLayerPoint(containerPoint),
		    latlng = map.layerPointToLatLng(layerPoint);

		this.fire(e.type, {
			latlng: latlng,
			layerPoint: layerPoint,
			containerPoint: containerPoint,
			originalEvent: e
		});

		if (e.type === 'contextmenu') {
			L.DomEvent.preventDefault(e);
		}
		if (e.type !== 'mousemove') {
			L.DomEvent.stopPropagation(e);
		}
	}
});

L.Map.include({
	_initPathRoot: function () {
		if (!this._pathRoot) {
			this._pathRoot = L.Path.prototype._createElement('svg');
			this._panes.overlayPane.appendChild(this._pathRoot);

			if (this.options.zoomAnimation && L.Browser.any3d) {
				L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-animated');

				this.on({
					'zoomanim': this._animatePathZoom,
					'zoomend': this._endPathZoom
				});
			} else {
				L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-hide');
			}

			this.on('moveend', this._updateSvgViewport);
			this._updateSvgViewport();
		}
	},

	_animatePathZoom: function (e) {
		var scale = this.getZoomScale(e.zoom),
		    offset = this._getCenterOffset(e.center)._multiplyBy(-scale)._add(this._pathViewport.min);

		this._pathRoot.style[L.DomUtil.TRANSFORM] =
		        L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ') ';

		this._pathZooming = true;
	},

	_endPathZoom: function () {
		this._pathZooming = false;
	},

	_updateSvgViewport: function () {

		if (this._pathZooming) {
			// Do not update SVGs while a zoom animation is going on otherwise the animation will break.
			// When the zoom animation ends we will be updated again anyway
			// This fixes the case where you do a momentum move and zoom while the move is still ongoing.
			return;
		}

		this._updatePathViewport();

		var vp = this._pathViewport,
		    min = vp.min,
		    max = vp.max,
		    width = max.x - min.x,
		    height = max.y - min.y,
		    root = this._pathRoot,
		    pane = this._panes.overlayPane;

		// Hack to make flicker on drag end on mobile webkit less irritating
		if (L.Browser.mobileWebkit) {
			pane.removeChild(root);
		}

		L.DomUtil.setPosition(root, min);
		root.setAttribute('width', width);
		root.setAttribute('height', height);
		root.setAttribute('viewBox', [min.x, min.y, width, height].join(' '));

		if (L.Browser.mobileWebkit) {
			pane.appendChild(root);
		}
	}
});


/*
 * Popup extension to L.Path (polylines, polygons, circles), adding popup-related methods.
 */

L.Path.include({

	bindPopup: function (content, options) {

		if (content instanceof L.Popup) {
			this._popup = content;
		} else {
			if (!this._popup || options) {
				this._popup = new L.Popup(options, this);
			}
			this._popup.setContent(content);
		}

		if (!this._popupHandlersAdded) {
			this
			    .on('click', this._openPopup, this)
			    .on('remove', this.closePopup, this);

			this._popupHandlersAdded = true;
		}

		return this;
	},

	unbindPopup: function () {
		if (this._popup) {
			this._popup = null;
			this
			    .off('click', this._openPopup)
			    .off('remove', this.closePopup);

			this._popupHandlersAdded = false;
		}
		return this;
	},

	openPopup: function (latlng) {

		if (this._popup) {
			// open the popup from one of the path's points if not specified
			latlng = latlng || this._latlng ||
			         this._latlngs[Math.floor(this._latlngs.length / 2)];

			this._openPopup({latlng: latlng});
		}

		return this;
	},

	closePopup: function () {
		if (this._popup) {
			this._popup._close();
		}
		return this;
	},

	_openPopup: function (e) {
		this._popup.setLatLng(e.latlng);
		this._map.openPopup(this._popup);
	}
});


/*
 * Vector rendering for IE6-8 through VML.
 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
 */

L.Browser.vml = !L.Browser.svg && (function () {
	try {
		var div = document.createElement('div');
		div.innerHTML = '<v:shape adj="1"/>';

		var shape = div.firstChild;
		shape.style.behavior = 'url(#default#VML)';

		return shape && (typeof shape.adj === 'object');

	} catch (e) {
		return false;
	}
}());

L.Path = L.Browser.svg || !L.Browser.vml ? L.Path : L.Path.extend({
	statics: {
		VML: true,
		CLIP_PADDING: 0.02
	},

	_createElement: (function () {
		try {
			document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
			return function (name) {
				return document.createElement('<lvml:' + name + ' class="lvml">');
			};
		} catch (e) {
			return function (name) {
				return document.createElement(
				        '<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
			};
		}
	}()),

	_initPath: function () {
		var container = this._container = this._createElement('shape');

		L.DomUtil.addClass(container, 'leaflet-vml-shape' +
			(this.options.className ? ' ' + this.options.className : ''));

		if (this.options.clickable) {
			L.DomUtil.addClass(container, 'leaflet-clickable');
		}

		container.coordsize = '1 1';

		this._path = this._createElement('path');
		container.appendChild(this._path);

		this._map._pathRoot.appendChild(container);
	},

	_initStyle: function () {
		this._updateStyle();
	},

	_updateStyle: function () {
		var stroke = this._stroke,
		    fill = this._fill,
		    options = this.options,
		    container = this._container;

		container.stroked = options.stroke;
		container.filled = options.fill;

		if (options.stroke) {
			if (!stroke) {
				stroke = this._stroke = this._createElement('stroke');
				stroke.endcap = 'round';
				container.appendChild(stroke);
			}
			stroke.weight = options.weight + 'px';
			stroke.color = options.color;
			stroke.opacity = options.opacity;

			if (options.dashArray) {
				stroke.dashStyle = L.Util.isArray(options.dashArray) ?
				    options.dashArray.join(' ') :
				    options.dashArray.replace(/( *, *)/g, ' ');
			} else {
				stroke.dashStyle = '';
			}
			if (options.lineCap) {
				stroke.endcap = options.lineCap.replace('butt', 'flat');
			}
			if (options.lineJoin) {
				stroke.joinstyle = options.lineJoin;
			}

		} else if (stroke) {
			container.removeChild(stroke);
			this._stroke = null;
		}

		if (options.fill) {
			if (!fill) {
				fill = this._fill = this._createElement('fill');
				container.appendChild(fill);
			}
			fill.color = options.fillColor || options.color;
			fill.opacity = options.fillOpacity;

		} else if (fill) {
			container.removeChild(fill);
			this._fill = null;
		}
	},

	_updatePath: function () {
		var style = this._container.style;

		style.display = 'none';
		this._path.v = this.getPathString() + ' '; // the space fixes IE empty path string bug
		style.display = '';
	}
});

L.Map.include(L.Browser.svg || !L.Browser.vml ? {} : {
	_initPathRoot: function () {
		if (this._pathRoot) { return; }

		var root = this._pathRoot = document.createElement('div');
		root.className = 'leaflet-vml-container';
		this._panes.overlayPane.appendChild(root);

		this.on('moveend', this._updatePathViewport);
		this._updatePathViewport();
	}
});


/*
 * Vector rendering for all browsers that support canvas.
 */

L.Browser.canvas = (function () {
	return !!document.createElement('canvas').getContext;
}());

L.Path = (L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? L.Path : L.Path.extend({
	statics: {
		//CLIP_PADDING: 0.02, // not sure if there's a need to set it to a small value
		CANVAS: true,
		SVG: false
	},

	redraw: function () {
		if (this._map) {
			this.projectLatlngs();
			this._requestUpdate();
		}
		return this;
	},

	setStyle: function (style) {
		L.setOptions(this, style);

		if (this._map) {
			this._updateStyle();
			this._requestUpdate();
		}
		return this;
	},

	onRemove: function (map) {
		map
		    .off('viewreset', this.projectLatlngs, this)
		    .off('moveend', this._updatePath, this);

		if (this.options.clickable) {
			this._map.off('click', this._onClick, this);
			this._map.off('mousemove', this._onMouseMove, this);
		}

		this._requestUpdate();

		this.fire('remove');
		this._map = null;
	},

	_requestUpdate: function () {
		if (this._map && !L.Path._updateRequest) {
			L.Path._updateRequest = L.Util.requestAnimFrame(this._fireMapMoveEnd, this._map);
		}
	},

	_fireMapMoveEnd: function () {
		L.Path._updateRequest = null;
		this.fire('moveend');
	},

	_initElements: function () {
		this._map._initPathRoot();
		this._ctx = this._map._canvasCtx;
	},

	_updateStyle: function () {
		var options = this.options;

		if (options.stroke) {
			this._ctx.lineWidth = options.weight;
			this._ctx.strokeStyle = options.color;
		}
		if (options.fill) {
			this._ctx.fillStyle = options.fillColor || options.color;
		}

		if (options.lineCap) {
			this._ctx.lineCap = options.lineCap;
		}
		if (options.lineJoin) {
			this._ctx.lineJoin = options.lineJoin;
		}
	},

	_drawPath: function () {
		var i, j, len, len2, point, drawMethod;

		this._ctx.beginPath();

		for (i = 0, len = this._parts.length; i < len; i++) {
			for (j = 0, len2 = this._parts[i].length; j < len2; j++) {
				point = this._parts[i][j];
				drawMethod = (j === 0 ? 'move' : 'line') + 'To';

				this._ctx[drawMethod](point.x, point.y);
			}
			// TODO refactor ugly hack
			if (this instanceof L.Polygon) {
				this._ctx.closePath();
			}
		}
	},

	_checkIfEmpty: function () {
		return !this._parts.length;
	},

	_updatePath: function () {
		if (this._checkIfEmpty()) { return; }

		var ctx = this._ctx,
		    options = this.options;

		this._drawPath();
		ctx.save();
		this._updateStyle();

		if (options.fill) {
			ctx.globalAlpha = options.fillOpacity;
			ctx.fill(options.fillRule || 'evenodd');
		}

		if (options.stroke) {
			ctx.globalAlpha = options.opacity;
			ctx.stroke();
		}

		ctx.restore();

		// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
	},

	_initEvents: function () {
		if (this.options.clickable) {
			this._map.on('mousemove', this._onMouseMove, this);
			this._map.on('click dblclick contextmenu', this._fireMouseEvent, this);
		}
	},

	_fireMouseEvent: function (e) {
		if (this._containsPoint(e.layerPoint)) {
			this.fire(e.type, e);
		}
	},

	_onMouseMove: function (e) {
		if (!this._map || this._map._animatingZoom) { return; }

		// TODO don't do on each move
		if (this._containsPoint(e.layerPoint)) {
			this._ctx.canvas.style.cursor = 'pointer';
			this._mouseInside = true;
			this.fire('mouseover', e);

		} else if (this._mouseInside) {
			this._ctx.canvas.style.cursor = '';
			this._mouseInside = false;
			this.fire('mouseout', e);
		}
	}
});

L.Map.include((L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? {} : {
	_initPathRoot: function () {
		var root = this._pathRoot,
		    ctx;

		if (!root) {
			root = this._pathRoot = document.createElement('canvas');
			root.style.position = 'absolute';
			ctx = this._canvasCtx = root.getContext('2d');

			ctx.lineCap = 'round';
			ctx.lineJoin = 'round';

			this._panes.overlayPane.appendChild(root);

			if (this.options.zoomAnimation) {
				this._pathRoot.className = 'leaflet-zoom-animated';
				this.on('zoomanim', this._animatePathZoom);
				this.on('zoomend', this._endPathZoom);
			}
			this.on('moveend', this._updateCanvasViewport);
			this._updateCanvasViewport();
		}
	},

	_updateCanvasViewport: function () {
		// don't redraw while zooming. See _updateSvgViewport for more details
		if (this._pathZooming) { return; }
		this._updatePathViewport();

		var vp = this._pathViewport,
		    min = vp.min,
		    size = vp.max.subtract(min),
		    root = this._pathRoot;

		//TODO check if this works properly on mobile webkit
		L.DomUtil.setPosition(root, min);
		root.width = size.x;
		root.height = size.y;
		root.getContext('2d').translate(-min.x, -min.y);
	}
});


/*
 * L.LineUtil contains different utility functions for line segments
 * and polylines (clipping, simplification, distances, etc.)
 */

/*jshint bitwise:false */ // allow bitwise operations for this file

L.LineUtil = {

	// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
	// Improves rendering performance dramatically by lessening the number of points to draw.

	simplify: function (/*Point[]*/ points, /*Number*/ tolerance) {
		if (!tolerance || !points.length) {
			return points.slice();
		}

		var sqTolerance = tolerance * tolerance;

		// stage 1: vertex reduction
		points = this._reducePoints(points, sqTolerance);

		// stage 2: Douglas-Peucker simplification
		points = this._simplifyDP(points, sqTolerance);

		return points;
	},

	// distance from a point to a segment between two points
	pointToSegmentDistance:  function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return Math.sqrt(this._sqClosestPointOnSegment(p, p1, p2, true));
	},

	closestPointOnSegment: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
		return this._sqClosestPointOnSegment(p, p1, p2);
	},

	// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
	_simplifyDP: function (points, sqTolerance) {

		var len = points.length,
		    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
		    markers = new ArrayConstructor(len);

		markers[0] = markers[len - 1] = 1;

		this._simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

		var i,
		    newPoints = [];

		for (i = 0; i < len; i++) {
			if (markers[i]) {
				newPoints.push(points[i]);
			}
		}

		return newPoints;
	},

	_simplifyDPStep: function (points, markers, sqTolerance, first, last) {

		var maxSqDist = 0,
		    index, i, sqDist;

		for (i = first + 1; i <= last - 1; i++) {
			sqDist = this._sqClosestPointOnSegment(points[i], points[first], points[last], true);

			if (sqDist > maxSqDist) {
				index = i;
				maxSqDist = sqDist;
			}
		}

		if (maxSqDist > sqTolerance) {
			markers[index] = 1;

			this._simplifyDPStep(points, markers, sqTolerance, first, index);
			this._simplifyDPStep(points, markers, sqTolerance, index, last);
		}
	},

	// reduce points that are too close to each other to a single point
	_reducePoints: function (points, sqTolerance) {
		var reducedPoints = [points[0]];

		for (var i = 1, prev = 0, len = points.length; i < len; i++) {
			if (this._sqDist(points[i], points[prev]) > sqTolerance) {
				reducedPoints.push(points[i]);
				prev = i;
			}
		}
		if (prev < len - 1) {
			reducedPoints.push(points[len - 1]);
		}
		return reducedPoints;
	},

	// Cohen-Sutherland line clipping algorithm.
	// Used to avoid rendering parts of a polyline that are not currently visible.

	clipSegment: function (a, b, bounds, useLastCode) {
		var codeA = useLastCode ? this._lastCode : this._getBitCode(a, bounds),
		    codeB = this._getBitCode(b, bounds),

		    codeOut, p, newCode;

		// save 2nd code to avoid calculating it on the next segment
		this._lastCode = codeB;

		while (true) {
			// if a,b is inside the clip window (trivial accept)
			if (!(codeA | codeB)) {
				return [a, b];
			// if a,b is outside the clip window (trivial reject)
			} else if (codeA & codeB) {
				return false;
			// other cases
			} else {
				codeOut = codeA || codeB;
				p = this._getEdgeIntersection(a, b, codeOut, bounds);
				newCode = this._getBitCode(p, bounds);

				if (codeOut === codeA) {
					a = p;
					codeA = newCode;
				} else {
					b = p;
					codeB = newCode;
				}
			}
		}
	},

	_getEdgeIntersection: function (a, b, code, bounds) {
		var dx = b.x - a.x,
		    dy = b.y - a.y,
		    min = bounds.min,
		    max = bounds.max;

		if (code & 8) { // top
			return new L.Point(a.x + dx * (max.y - a.y) / dy, max.y);
		} else if (code & 4) { // bottom
			return new L.Point(a.x + dx * (min.y - a.y) / dy, min.y);
		} else if (code & 2) { // right
			return new L.Point(max.x, a.y + dy * (max.x - a.x) / dx);
		} else if (code & 1) { // left
			return new L.Point(min.x, a.y + dy * (min.x - a.x) / dx);
		}
	},

	_getBitCode: function (/*Point*/ p, bounds) {
		var code = 0;

		if (p.x < bounds.min.x) { // left
			code |= 1;
		} else if (p.x > bounds.max.x) { // right
			code |= 2;
		}
		if (p.y < bounds.min.y) { // bottom
			code |= 4;
		} else if (p.y > bounds.max.y) { // top
			code |= 8;
		}

		return code;
	},

	// square distance (to avoid unnecessary Math.sqrt calls)
	_sqDist: function (p1, p2) {
		var dx = p2.x - p1.x,
		    dy = p2.y - p1.y;
		return dx * dx + dy * dy;
	},

	// return closest point on segment or distance to that point
	_sqClosestPointOnSegment: function (p, p1, p2, sqDist) {
		var x = p1.x,
		    y = p1.y,
		    dx = p2.x - x,
		    dy = p2.y - y,
		    dot = dx * dx + dy * dy,
		    t;

		if (dot > 0) {
			t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

			if (t > 1) {
				x = p2.x;
				y = p2.y;
			} else if (t > 0) {
				x += dx * t;
				y += dy * t;
			}
		}

		dx = p.x - x;
		dy = p.y - y;

		return sqDist ? dx * dx + dy * dy : new L.Point(x, y);
	}
};


/*
 * L.Polyline is used to display polylines on a map.
 */

L.Polyline = L.Path.extend({
	initialize: function (latlngs, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlngs = this._convertLatLngs(latlngs);
	},

	options: {
		// how much to simplify the polyline on each zoom level
		// more = better performance and smoother look, less = more accurate
		smoothFactor: 1.0,
		noClip: false
	},

	projectLatlngs: function () {
		this._originalPoints = [];

		for (var i = 0, len = this._latlngs.length; i < len; i++) {
			this._originalPoints[i] = this._map.latLngToLayerPoint(this._latlngs[i]);
		}
	},

	getPathString: function () {
		for (var i = 0, len = this._parts.length, str = ''; i < len; i++) {
			str += this._getPathPartStr(this._parts[i]);
		}
		return str;
	},

	getLatLngs: function () {
		return this._latlngs;
	},

	setLatLngs: function (latlngs) {
		this._latlngs = this._convertLatLngs(latlngs);
		return this.redraw();
	},

	addLatLng: function (latlng) {
		this._latlngs.push(L.latLng(latlng));
		return this.redraw();
	},

	spliceLatLngs: function () { // (Number index, Number howMany)
		var removed = [].splice.apply(this._latlngs, arguments);
		this._convertLatLngs(this._latlngs, true);
		this.redraw();
		return removed;
	},

	closestLayerPoint: function (p) {
		var minDistance = Infinity, parts = this._parts, p1, p2, minPoint = null;

		for (var j = 0, jLen = parts.length; j < jLen; j++) {
			var points = parts[j];
			for (var i = 1, len = points.length; i < len; i++) {
				p1 = points[i - 1];
				p2 = points[i];
				var sqDist = L.LineUtil._sqClosestPointOnSegment(p, p1, p2, true);
				if (sqDist < minDistance) {
					minDistance = sqDist;
					minPoint = L.LineUtil._sqClosestPointOnSegment(p, p1, p2);
				}
			}
		}
		if (minPoint) {
			minPoint.distance = Math.sqrt(minDistance);
		}
		return minPoint;
	},

	getBounds: function () {
		return new L.LatLngBounds(this.getLatLngs());
	},

	_convertLatLngs: function (latlngs, overwrite) {
		var i, len, target = overwrite ? latlngs : [];

		for (i = 0, len = latlngs.length; i < len; i++) {
			if (L.Util.isArray(latlngs[i]) && typeof latlngs[i][0] !== 'number') {
				return;
			}
			target[i] = L.latLng(latlngs[i]);
		}
		return target;
	},

	_initEvents: function () {
		L.Path.prototype._initEvents.call(this);
	},

	_getPathPartStr: function (points) {
		var round = L.Path.VML;

		for (var j = 0, len2 = points.length, str = '', p; j < len2; j++) {
			p = points[j];
			if (round) {
				p._round();
			}
			str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
		}
		return str;
	},

	_clipPoints: function () {
		var points = this._originalPoints,
		    len = points.length,
		    i, k, segment;

		if (this.options.noClip) {
			this._parts = [points];
			return;
		}

		this._parts = [];

		var parts = this._parts,
		    vp = this._map._pathViewport,
		    lu = L.LineUtil;

		for (i = 0, k = 0; i < len - 1; i++) {
			segment = lu.clipSegment(points[i], points[i + 1], vp, i);
			if (!segment) {
				continue;
			}

			parts[k] = parts[k] || [];
			parts[k].push(segment[0]);

			// if segment goes out of screen, or it's the last one, it's the end of the line part
			if ((segment[1] !== points[i + 1]) || (i === len - 2)) {
				parts[k].push(segment[1]);
				k++;
			}
		}
	},

	// simplify each clipped part of the polyline
	_simplifyPoints: function () {
		var parts = this._parts,
		    lu = L.LineUtil;

		for (var i = 0, len = parts.length; i < len; i++) {
			parts[i] = lu.simplify(parts[i], this.options.smoothFactor);
		}
	},

	_updatePath: function () {
		if (!this._map) { return; }

		this._clipPoints();
		this._simplifyPoints();

		L.Path.prototype._updatePath.call(this);
	}
});

L.polyline = function (latlngs, options) {
	return new L.Polyline(latlngs, options);
};


/*
 * L.PolyUtil contains utility functions for polygons (clipping, etc.).
 */

/*jshint bitwise:false */ // allow bitwise operations here

L.PolyUtil = {};

/*
 * Sutherland-Hodgeman polygon clipping algorithm.
 * Used to avoid rendering parts of a polygon that are not currently visible.
 */
L.PolyUtil.clipPolygon = function (points, bounds) {
	var clippedPoints,
	    edges = [1, 4, 2, 8],
	    i, j, k,
	    a, b,
	    len, edge, p,
	    lu = L.LineUtil;

	for (i = 0, len = points.length; i < len; i++) {
		points[i]._code = lu._getBitCode(points[i], bounds);
	}

	// for each edge (left, bottom, right, top)
	for (k = 0; k < 4; k++) {
		edge = edges[k];
		clippedPoints = [];

		for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
			a = points[i];
			b = points[j];

			// if a is inside the clip window
			if (!(a._code & edge)) {
				// if b is outside the clip window (a->b goes out of screen)
				if (b._code & edge) {
					p = lu._getEdgeIntersection(b, a, edge, bounds);
					p._code = lu._getBitCode(p, bounds);
					clippedPoints.push(p);
				}
				clippedPoints.push(a);

			// else if b is inside the clip window (a->b enters the screen)
			} else if (!(b._code & edge)) {
				p = lu._getEdgeIntersection(b, a, edge, bounds);
				p._code = lu._getBitCode(p, bounds);
				clippedPoints.push(p);
			}
		}
		points = clippedPoints;
	}

	return points;
};


/*
 * L.Polygon is used to display polygons on a map.
 */

L.Polygon = L.Polyline.extend({
	options: {
		fill: true
	},

	initialize: function (latlngs, options) {
		L.Polyline.prototype.initialize.call(this, latlngs, options);
		this._initWithHoles(latlngs);
	},

	_initWithHoles: function (latlngs) {
		var i, len, hole;
		if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
			this._latlngs = this._convertLatLngs(latlngs[0]);
			this._holes = latlngs.slice(1);

			for (i = 0, len = this._holes.length; i < len; i++) {
				hole = this._holes[i] = this._convertLatLngs(this._holes[i]);
				if (hole[0].equals(hole[hole.length - 1])) {
					hole.pop();
				}
			}
		}

		// filter out last point if its equal to the first one
		latlngs = this._latlngs;

		if (latlngs.length >= 2 && latlngs[0].equals(latlngs[latlngs.length - 1])) {
			latlngs.pop();
		}
	},

	projectLatlngs: function () {
		L.Polyline.prototype.projectLatlngs.call(this);

		// project polygon holes points
		// TODO move this logic to Polyline to get rid of duplication
		this._holePoints = [];

		if (!this._holes) { return; }

		var i, j, len, len2;

		for (i = 0, len = this._holes.length; i < len; i++) {
			this._holePoints[i] = [];

			for (j = 0, len2 = this._holes[i].length; j < len2; j++) {
				this._holePoints[i][j] = this._map.latLngToLayerPoint(this._holes[i][j]);
			}
		}
	},

	setLatLngs: function (latlngs) {
		if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
			this._initWithHoles(latlngs);
			return this.redraw();
		} else {
			return L.Polyline.prototype.setLatLngs.call(this, latlngs);
		}
	},

	_clipPoints: function () {
		var points = this._originalPoints,
		    newParts = [];

		this._parts = [points].concat(this._holePoints);

		if (this.options.noClip) { return; }

		for (var i = 0, len = this._parts.length; i < len; i++) {
			var clipped = L.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
			if (clipped.length) {
				newParts.push(clipped);
			}
		}

		this._parts = newParts;
	},

	_getPathPartStr: function (points) {
		var str = L.Polyline.prototype._getPathPartStr.call(this, points);
		return str + (L.Browser.svg ? 'z' : 'x');
	}
});

L.polygon = function (latlngs, options) {
	return new L.Polygon(latlngs, options);
};


/*
 * Contains L.MultiPolyline and L.MultiPolygon layers.
 */

(function () {
	function createMulti(Klass) {

		return L.FeatureGroup.extend({

			initialize: function (latlngs, options) {
				this._layers = {};
				this._options = options;
				this.setLatLngs(latlngs);
			},

			setLatLngs: function (latlngs) {
				var i = 0,
				    len = latlngs.length;

				this.eachLayer(function (layer) {
					if (i < len) {
						layer.setLatLngs(latlngs[i++]);
					} else {
						this.removeLayer(layer);
					}
				}, this);

				while (i < len) {
					this.addLayer(new Klass(latlngs[i++], this._options));
				}

				return this;
			},

			getLatLngs: function () {
				var latlngs = [];

				this.eachLayer(function (layer) {
					latlngs.push(layer.getLatLngs());
				});

				return latlngs;
			}
		});
	}

	L.MultiPolyline = createMulti(L.Polyline);
	L.MultiPolygon = createMulti(L.Polygon);

	L.multiPolyline = function (latlngs, options) {
		return new L.MultiPolyline(latlngs, options);
	};

	L.multiPolygon = function (latlngs, options) {
		return new L.MultiPolygon(latlngs, options);
	};
}());


/*
 * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
 */

L.Rectangle = L.Polygon.extend({
	initialize: function (latLngBounds, options) {
		L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
	},

	setBounds: function (latLngBounds) {
		this.setLatLngs(this._boundsToLatLngs(latLngBounds));
	},

	_boundsToLatLngs: function (latLngBounds) {
		latLngBounds = L.latLngBounds(latLngBounds);
		return [
			latLngBounds.getSouthWest(),
			latLngBounds.getNorthWest(),
			latLngBounds.getNorthEast(),
			latLngBounds.getSouthEast()
		];
	}
});

L.rectangle = function (latLngBounds, options) {
	return new L.Rectangle(latLngBounds, options);
};


/*
 * L.Circle is a circle overlay (with a certain radius in meters).
 */

L.Circle = L.Path.extend({
	initialize: function (latlng, radius, options) {
		L.Path.prototype.initialize.call(this, options);

		this._latlng = L.latLng(latlng);
		this._mRadius = radius;
	},

	options: {
		fill: true
	},

	setLatLng: function (latlng) {
		this._latlng = L.latLng(latlng);
		return this.redraw();
	},

	setRadius: function (radius) {
		this._mRadius = radius;
		return this.redraw();
	},

	projectLatlngs: function () {
		var lngRadius = this._getLngRadius(),
		    latlng = this._latlng,
		    pointLeft = this._map.latLngToLayerPoint([latlng.lat, latlng.lng - lngRadius]);

		this._point = this._map.latLngToLayerPoint(latlng);
		this._radius = Math.max(this._point.x - pointLeft.x, 1);
	},

	getBounds: function () {
		var lngRadius = this._getLngRadius(),
		    latRadius = (this._mRadius / 40075017) * 360,
		    latlng = this._latlng;

		return new L.LatLngBounds(
		        [latlng.lat - latRadius, latlng.lng - lngRadius],
		        [latlng.lat + latRadius, latlng.lng + lngRadius]);
	},

	getLatLng: function () {
		return this._latlng;
	},

	getPathString: function () {
		var p = this._point,
		    r = this._radius;

		if (this._checkIfEmpty()) {
			return '';
		}

		if (L.Browser.svg) {
			return 'M' + p.x + ',' + (p.y - r) +
			       'A' + r + ',' + r + ',0,1,1,' +
			       (p.x - 0.1) + ',' + (p.y - r) + ' z';
		} else {
			p._round();
			r = Math.round(r);
			return 'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r + ' 0,' + (65535 * 360);
		}
	},

	getRadius: function () {
		return this._mRadius;
	},

	// TODO Earth hardcoded, move into projection code!

	_getLatRadius: function () {
		return (this._mRadius / 40075017) * 360;
	},

	_getLngRadius: function () {
		return this._getLatRadius() / Math.cos(L.LatLng.DEG_TO_RAD * this._latlng.lat);
	},

	_checkIfEmpty: function () {
		if (!this._map) {
			return false;
		}
		var vp = this._map._pathViewport,
		    r = this._radius,
		    p = this._point;

		return p.x - r > vp.max.x || p.y - r > vp.max.y ||
		       p.x + r < vp.min.x || p.y + r < vp.min.y;
	}
});

L.circle = function (latlng, radius, options) {
	return new L.Circle(latlng, radius, options);
};


/*
 * L.CircleMarker is a circle overlay with a permanent pixel radius.
 */

L.CircleMarker = L.Circle.extend({
	options: {
		radius: 10,
		weight: 2
	},

	initialize: function (latlng, options) {
		L.Circle.prototype.initialize.call(this, latlng, null, options);
		this._radius = this.options.radius;
	},

	projectLatlngs: function () {
		this._point = this._map.latLngToLayerPoint(this._latlng);
	},

	_updateStyle : function () {
		L.Circle.prototype._updateStyle.call(this);
		this.setRadius(this.options.radius);
	},

	setLatLng: function (latlng) {
		L.Circle.prototype.setLatLng.call(this, latlng);
		if (this._popup && this._popup._isOpen) {
			this._popup.setLatLng(latlng);
		}
		return this;
	},

	setRadius: function (radius) {
		this.options.radius = this._radius = radius;
		return this.redraw();
	},

	getRadius: function () {
		return this._radius;
	}
});

L.circleMarker = function (latlng, options) {
	return new L.CircleMarker(latlng, options);
};


/*
 * Extends L.Polyline to be able to manually detect clicks on Canvas-rendered polylines.
 */

L.Polyline.include(!L.Path.CANVAS ? {} : {
	_containsPoint: function (p, closed) {
		var i, j, k, len, len2, dist, part,
		    w = this.options.weight / 2;

		if (L.Browser.touch) {
			w += 10; // polyline click tolerance on touch devices
		}

		for (i = 0, len = this._parts.length; i < len; i++) {
			part = this._parts[i];
			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
				if (!closed && (j === 0)) {
					continue;
				}

				dist = L.LineUtil.pointToSegmentDistance(p, part[k], part[j]);

				if (dist <= w) {
					return true;
				}
			}
		}
		return false;
	}
});


/*
 * Extends L.Polygon to be able to manually detect clicks on Canvas-rendered polygons.
 */

L.Polygon.include(!L.Path.CANVAS ? {} : {
	_containsPoint: function (p) {
		var inside = false,
		    part, p1, p2,
		    i, j, k,
		    len, len2;

		// TODO optimization: check if within bounds first

		if (L.Polyline.prototype._containsPoint.call(this, p, true)) {
			// click on polygon border
			return true;
		}

		// ray casting algorithm for detecting if point is in polygon

		for (i = 0, len = this._parts.length; i < len; i++) {
			part = this._parts[i];

			for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
				p1 = part[j];
				p2 = part[k];

				if (((p1.y > p.y) !== (p2.y > p.y)) &&
						(p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
					inside = !inside;
				}
			}
		}

		return inside;
	}
});


/*
 * Extends L.Circle with Canvas-specific code.
 */

L.Circle.include(!L.Path.CANVAS ? {} : {
	_drawPath: function () {
		var p = this._point;
		this._ctx.beginPath();
		this._ctx.arc(p.x, p.y, this._radius, 0, Math.PI * 2, false);
	},

	_containsPoint: function (p) {
		var center = this._point,
		    w2 = this.options.stroke ? this.options.weight / 2 : 0;

		return (p.distanceTo(center) <= this._radius + w2);
	}
});


/*
 * CircleMarker canvas specific drawing parts.
 */

L.CircleMarker.include(!L.Path.CANVAS ? {} : {
	_updateStyle: function () {
		L.Path.prototype._updateStyle.call(this);
	}
});


/*
 * L.GeoJSON turns any GeoJSON data into a Leaflet layer.
 */

L.GeoJSON = L.FeatureGroup.extend({

	initialize: function (geojson, options) {
		L.setOptions(this, options);

		this._layers = {};

		if (geojson) {
			this.addData(geojson);
		}
	},

	addData: function (geojson) {
		var features = L.Util.isArray(geojson) ? geojson : geojson.features,
		    i, len, feature;

		if (features) {
			for (i = 0, len = features.length; i < len; i++) {
				// Only add this if geometry or geometries are set and not null
				feature = features[i];
				if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
					this.addData(features[i]);
				}
			}
			return this;
		}

		var options = this.options;

		if (options.filter && !options.filter(geojson)) { return; }

		var layer = L.GeoJSON.geometryToLayer(geojson, options.pointToLayer, options.coordsToLatLng, options);
		layer.feature = L.GeoJSON.asFeature(geojson);

		layer.defaultOptions = layer.options;
		this.resetStyle(layer);

		if (options.onEachFeature) {
			options.onEachFeature(geojson, layer);
		}

		return this.addLayer(layer);
	},

	resetStyle: function (layer) {
		var style = this.options.style;
		if (style) {
			// reset any custom styles
			L.Util.extend(layer.options, layer.defaultOptions);

			this._setLayerStyle(layer, style);
		}
	},

	setStyle: function (style) {
		this.eachLayer(function (layer) {
			this._setLayerStyle(layer, style);
		}, this);
	},

	_setLayerStyle: function (layer, style) {
		if (typeof style === 'function') {
			style = style(layer.feature);
		}
		if (layer.setStyle) {
			layer.setStyle(style);
		}
	}
});

L.extend(L.GeoJSON, {
	geometryToLayer: function (geojson, pointToLayer, coordsToLatLng, vectorOptions) {
		var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
		    coords = geometry.coordinates,
		    layers = [],
		    latlng, latlngs, i, len;

		coordsToLatLng = coordsToLatLng || this.coordsToLatLng;

		switch (geometry.type) {
		case 'Point':
			latlng = coordsToLatLng(coords);
			return pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng);

		case 'MultiPoint':
			for (i = 0, len = coords.length; i < len; i++) {
				latlng = coordsToLatLng(coords[i]);
				layers.push(pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng));
			}
			return new L.FeatureGroup(layers);

		case 'LineString':
			latlngs = this.coordsToLatLngs(coords, 0, coordsToLatLng);
			return new L.Polyline(latlngs, vectorOptions);

		case 'Polygon':
			if (coords.length === 2 && !coords[1].length) {
				throw new Error('Invalid GeoJSON object.');
			}
			latlngs = this.coordsToLatLngs(coords, 1, coordsToLatLng);
			return new L.Polygon(latlngs, vectorOptions);

		case 'MultiLineString':
			latlngs = this.coordsToLatLngs(coords, 1, coordsToLatLng);
			return new L.MultiPolyline(latlngs, vectorOptions);

		case 'MultiPolygon':
			latlngs = this.coordsToLatLngs(coords, 2, coordsToLatLng);
			return new L.MultiPolygon(latlngs, vectorOptions);

		case 'GeometryCollection':
			for (i = 0, len = geometry.geometries.length; i < len; i++) {

				layers.push(this.geometryToLayer({
					geometry: geometry.geometries[i],
					type: 'Feature',
					properties: geojson.properties
				}, pointToLayer, coordsToLatLng, vectorOptions));
			}
			return new L.FeatureGroup(layers);

		default:
			throw new Error('Invalid GeoJSON object.');
		}
	},

	coordsToLatLng: function (coords) { // (Array[, Boolean]) -> LatLng
		return new L.LatLng(coords[1], coords[0], coords[2]);
	},

	coordsToLatLngs: function (coords, levelsDeep, coordsToLatLng) { // (Array[, Number, Function]) -> Array
		var latlng, i, len,
		    latlngs = [];

		for (i = 0, len = coords.length; i < len; i++) {
			latlng = levelsDeep ?
			        this.coordsToLatLngs(coords[i], levelsDeep - 1, coordsToLatLng) :
			        (coordsToLatLng || this.coordsToLatLng)(coords[i]);

			latlngs.push(latlng);
		}

		return latlngs;
	},

	latLngToCoords: function (latlng) {
		var coords = [latlng.lng, latlng.lat];

		if (latlng.alt !== undefined) {
			coords.push(latlng.alt);
		}
		return coords;
	},

	latLngsToCoords: function (latLngs) {
		var coords = [];

		for (var i = 0, len = latLngs.length; i < len; i++) {
			coords.push(L.GeoJSON.latLngToCoords(latLngs[i]));
		}

		return coords;
	},

	getFeature: function (layer, newGeometry) {
		return layer.feature ? L.extend({}, layer.feature, {geometry: newGeometry}) : L.GeoJSON.asFeature(newGeometry);
	},

	asFeature: function (geoJSON) {
		if (geoJSON.type === 'Feature') {
			return geoJSON;
		}

		return {
			type: 'Feature',
			properties: {},
			geometry: geoJSON
		};
	}
});

var PointToGeoJSON = {
	toGeoJSON: function () {
		return L.GeoJSON.getFeature(this, {
			type: 'Point',
			coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
		});
	}
};

L.Marker.include(PointToGeoJSON);
L.Circle.include(PointToGeoJSON);
L.CircleMarker.include(PointToGeoJSON);

L.Polyline.include({
	toGeoJSON: function () {
		return L.GeoJSON.getFeature(this, {
			type: 'LineString',
			coordinates: L.GeoJSON.latLngsToCoords(this.getLatLngs())
		});
	}
});

L.Polygon.include({
	toGeoJSON: function () {
		var coords = [L.GeoJSON.latLngsToCoords(this.getLatLngs())],
		    i, len, hole;

		coords[0].push(coords[0][0]);

		if (this._holes) {
			for (i = 0, len = this._holes.length; i < len; i++) {
				hole = L.GeoJSON.latLngsToCoords(this._holes[i]);
				hole.push(hole[0]);
				coords.push(hole);
			}
		}

		return L.GeoJSON.getFeature(this, {
			type: 'Polygon',
			coordinates: coords
		});
	}
});

(function () {
	function multiToGeoJSON(type) {
		return function () {
			var coords = [];

			this.eachLayer(function (layer) {
				coords.push(layer.toGeoJSON().geometry.coordinates);
			});

			return L.GeoJSON.getFeature(this, {
				type: type,
				coordinates: coords
			});
		};
	}

	L.MultiPolyline.include({toGeoJSON: multiToGeoJSON('MultiLineString')});
	L.MultiPolygon.include({toGeoJSON: multiToGeoJSON('MultiPolygon')});

	L.LayerGroup.include({
		toGeoJSON: function () {

			var geometry = this.feature && this.feature.geometry,
				jsons = [],
				json;

			if (geometry && geometry.type === 'MultiPoint') {
				return multiToGeoJSON('MultiPoint').call(this);
			}

			var isGeometryCollection = geometry && geometry.type === 'GeometryCollection';

			this.eachLayer(function (layer) {
				if (layer.toGeoJSON) {
					json = layer.toGeoJSON();
					jsons.push(isGeometryCollection ? json.geometry : L.GeoJSON.asFeature(json));
				}
			});

			if (isGeometryCollection) {
				return L.GeoJSON.getFeature(this, {
					geometries: jsons,
					type: 'GeometryCollection'
				});
			}

			return {
				type: 'FeatureCollection',
				features: jsons
			};
		}
	});
}());

L.geoJson = function (geojson, options) {
	return new L.GeoJSON(geojson, options);
};


/*
 * L.DomEvent contains functions for working with DOM events.
 */

L.DomEvent = {
	/* inspired by John Resig, Dean Edwards and YUI addEvent implementations */
	addListener: function (obj, type, fn, context) { // (HTMLElement, String, Function[, Object])

		var id = L.stamp(fn),
		    key = '_leaflet_' + type + id,
		    handler, originalHandler, newType;

		if (obj[key]) { return this; }

		handler = function (e) {
			return fn.call(context || obj, e || L.DomEvent._getEvent());
		};

		if (L.Browser.pointer && type.indexOf('touch') === 0) {
			return this.addPointerListener(obj, type, handler, id);
		}
		if (L.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
			this.addDoubleTapListener(obj, handler, id);
		}

		if ('addEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.addEventListener('DOMMouseScroll', handler, false);
				obj.addEventListener(type, handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {

				originalHandler = handler;
				newType = (type === 'mouseenter' ? 'mouseover' : 'mouseout');

				handler = function (e) {
					if (!L.DomEvent._checkMouse(obj, e)) { return; }
					return originalHandler(e);
				};

				obj.addEventListener(newType, handler, false);

			} else if (type === 'click' && L.Browser.android) {
				originalHandler = handler;
				handler = function (e) {
					return L.DomEvent._filterClick(e, originalHandler);
				};

				obj.addEventListener(type, handler, false);
			} else {
				obj.addEventListener(type, handler, false);
			}

		} else if ('attachEvent' in obj) {
			obj.attachEvent('on' + type, handler);
		}

		obj[key] = handler;

		return this;
	},

	removeListener: function (obj, type, fn) {  // (HTMLElement, String, Function)

		var id = L.stamp(fn),
		    key = '_leaflet_' + type + id,
		    handler = obj[key];

		if (!handler) { return this; }

		if (L.Browser.pointer && type.indexOf('touch') === 0) {
			this.removePointerListener(obj, type, id);
		} else if (L.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
			this.removeDoubleTapListener(obj, id);

		} else if ('removeEventListener' in obj) {

			if (type === 'mousewheel') {
				obj.removeEventListener('DOMMouseScroll', handler, false);
				obj.removeEventListener(type, handler, false);

			} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
				obj.removeEventListener((type === 'mouseenter' ? 'mouseover' : 'mouseout'), handler, false);
			} else {
				obj.removeEventListener(type, handler, false);
			}
		} else if ('detachEvent' in obj) {
			obj.detachEvent('on' + type, handler);
		}

		obj[key] = null;

		return this;
	},

	stopPropagation: function (e) {

		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		L.DomEvent._skipped(e);

		return this;
	},

	disableScrollPropagation: function (el) {
		var stop = L.DomEvent.stopPropagation;

		return L.DomEvent
			.on(el, 'mousewheel', stop)
			.on(el, 'MozMousePixelScroll', stop);
	},

	disableClickPropagation: function (el) {
		var stop = L.DomEvent.stopPropagation;

		for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
			L.DomEvent.on(el, L.Draggable.START[i], stop);
		}

		return L.DomEvent
			.on(el, 'click', L.DomEvent._fakeStop)
			.on(el, 'dblclick', stop);
	},

	preventDefault: function (e) {

		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}
		return this;
	},

	stop: function (e) {
		return L.DomEvent
			.preventDefault(e)
			.stopPropagation(e);
	},

	getMousePosition: function (e, container) {
		if (!container) {
			return new L.Point(e.clientX, e.clientY);
		}

		var rect = container.getBoundingClientRect();

		return new L.Point(
			e.clientX - rect.left - container.clientLeft,
			e.clientY - rect.top - container.clientTop);
	},

	getWheelDelta: function (e) {

		var delta = 0;

		if (e.wheelDelta) {
			delta = e.wheelDelta / 120;
		}
		if (e.detail) {
			delta = -e.detail / 3;
		}
		return delta;
	},

	_skipEvents: {},

	_fakeStop: function (e) {
		// fakes stopPropagation by setting a special event flag, checked/reset with L.DomEvent._skipped(e)
		L.DomEvent._skipEvents[e.type] = true;
	},

	_skipped: function (e) {
		var skipped = this._skipEvents[e.type];
		// reset when checking, as it's only used in map container and propagates outside of the map
		this._skipEvents[e.type] = false;
		return skipped;
	},

	// check if element really left/entered the event target (for mouseenter/mouseleave)
	_checkMouse: function (el, e) {

		var related = e.relatedTarget;

		if (!related) { return true; }

		try {
			while (related && (related !== el)) {
				related = related.parentNode;
			}
		} catch (err) {
			return false;
		}
		return (related !== el);
	},

	_getEvent: function () { // evil magic for IE
		/*jshint noarg:false */
		var e = window.event;
		if (!e) {
			var caller = arguments.callee.caller;
			while (caller) {
				e = caller['arguments'][0];
				if (e && window.Event === e.constructor) {
					break;
				}
				caller = caller.caller;
			}
		}
		return e;
	},

	// this is a horrible workaround for a bug in Android where a single touch triggers two click events
	_filterClick: function (e, handler) {
		var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
			elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);

		// are they closer together than 500ms yet more than 100ms?
		// Android typically triggers them ~300ms apart while multiple listeners
		// on the same event should be triggered far faster;
		// or check if click is simulated on the element, and if it is, reject any non-simulated events

		if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
			L.DomEvent.stop(e);
			return;
		}
		L.DomEvent._lastClick = timeStamp;

		return handler(e);
	}
};

L.DomEvent.on = L.DomEvent.addListener;
L.DomEvent.off = L.DomEvent.removeListener;


/*
 * L.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
 */

L.Draggable = L.Class.extend({
	includes: L.Mixin.Events,

	statics: {
		START: L.Browser.touch ? ['touchstart', 'mousedown'] : ['mousedown'],
		END: {
			mousedown: 'mouseup',
			touchstart: 'touchend',
			pointerdown: 'touchend',
			MSPointerDown: 'touchend'
		},
		MOVE: {
			mousedown: 'mousemove',
			touchstart: 'touchmove',
			pointerdown: 'touchmove',
			MSPointerDown: 'touchmove'
		}
	},

	initialize: function (element, dragStartTarget) {
		this._element = element;
		this._dragStartTarget = dragStartTarget || element;
	},

	enable: function () {
		if (this._enabled) { return; }

		for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
			L.DomEvent.on(this._dragStartTarget, L.Draggable.START[i], this._onDown, this);
		}

		this._enabled = true;
	},

	disable: function () {
		if (!this._enabled) { return; }

		for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
			L.DomEvent.off(this._dragStartTarget, L.Draggable.START[i], this._onDown, this);
		}

		this._enabled = false;
		this._moved = false;
	},

	_onDown: function (e) {
		this._moved = false;

		if (e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }

		L.DomEvent.stopPropagation(e);

		if (L.Draggable._disabled) { return; }

		L.DomUtil.disableImageDrag();
		L.DomUtil.disableTextSelection();

		if (this._moving) { return; }

		var first = e.touches ? e.touches[0] : e;

		this._startPoint = new L.Point(first.clientX, first.clientY);
		this._startPos = this._newPos = L.DomUtil.getPosition(this._element);

		L.DomEvent
		    .on(document, L.Draggable.MOVE[e.type], this._onMove, this)
		    .on(document, L.Draggable.END[e.type], this._onUp, this);
	},

	_onMove: function (e) {
		if (e.touches && e.touches.length > 1) {
			this._moved = true;
			return;
		}

		var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
		    newPoint = new L.Point(first.clientX, first.clientY),
		    offset = newPoint.subtract(this._startPoint);

		if (!offset.x && !offset.y) { return; }
		if (L.Browser.touch && Math.abs(offset.x) + Math.abs(offset.y) < 3) { return; }

		L.DomEvent.preventDefault(e);

		if (!this._moved) {
			this.fire('dragstart');

			this._moved = true;
			this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

			L.DomUtil.addClass(document.body, 'leaflet-dragging');
			this._lastTarget = e.target || e.srcElement;
			L.DomUtil.addClass(this._lastTarget, 'leaflet-drag-target');
		}

		this._newPos = this._startPos.add(offset);
		this._moving = true;

		L.Util.cancelAnimFrame(this._animRequest);
		this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
	},

	_updatePosition: function () {
		this.fire('predrag');
		L.DomUtil.setPosition(this._element, this._newPos);
		this.fire('drag');
	},

	_onUp: function () {
		L.DomUtil.removeClass(document.body, 'leaflet-dragging');

		if (this._lastTarget) {
			L.DomUtil.removeClass(this._lastTarget, 'leaflet-drag-target');
			this._lastTarget = null;
		}

		for (var i in L.Draggable.MOVE) {
			L.DomEvent
			    .off(document, L.Draggable.MOVE[i], this._onMove)
			    .off(document, L.Draggable.END[i], this._onUp);
		}

		L.DomUtil.enableImageDrag();
		L.DomUtil.enableTextSelection();

		if (this._moved && this._moving) {
			// ensure drag is not fired after dragend
			L.Util.cancelAnimFrame(this._animRequest);

			this.fire('dragend', {
				distance: this._newPos.distanceTo(this._startPos)
			});
		}

		this._moving = false;
	}
});


/*
	L.Handler is a base class for handler classes that are used internally to inject
	interaction features like dragging to classes like Map and Marker.
*/

L.Handler = L.Class.extend({
	initialize: function (map) {
		this._map = map;
	},

	enable: function () {
		if (this._enabled) { return; }

		this._enabled = true;
		this.addHooks();
	},

	disable: function () {
		if (!this._enabled) { return; }

		this._enabled = false;
		this.removeHooks();
	},

	enabled: function () {
		return !!this._enabled;
	}
});


/*
 * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
 */

L.Map.mergeOptions({
	dragging: true,

	inertia: !L.Browser.android23,
	inertiaDeceleration: 3400, // px/s^2
	inertiaMaxSpeed: Infinity, // px/s
	inertiaThreshold: L.Browser.touch ? 32 : 18, // ms
	easeLinearity: 0.25,

	// TODO refactor, move to CRS
	worldCopyJump: false
});

L.Map.Drag = L.Handler.extend({
	addHooks: function () {
		if (!this._draggable) {
			var map = this._map;

			this._draggable = new L.Draggable(map._mapPane, map._container);

			this._draggable.on({
				'dragstart': this._onDragStart,
				'drag': this._onDrag,
				'dragend': this._onDragEnd
			}, this);

			if (map.options.worldCopyJump) {
				this._draggable.on('predrag', this._onPreDrag, this);
				map.on('viewreset', this._onViewReset, this);

				map.whenReady(this._onViewReset, this);
			}
		}
		this._draggable.enable();
	},

	removeHooks: function () {
		this._draggable.disable();
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		var map = this._map;

		if (map._panAnim) {
			map._panAnim.stop();
		}

		map
		    .fire('movestart')
		    .fire('dragstart');

		if (map.options.inertia) {
			this._positions = [];
			this._times = [];
		}
	},

	_onDrag: function () {
		if (this._map.options.inertia) {
			var time = this._lastTime = +new Date(),
			    pos = this._lastPos = this._draggable._newPos;

			this._positions.push(pos);
			this._times.push(time);

			if (time - this._times[0] > 200) {
				this._positions.shift();
				this._times.shift();
			}
		}

		this._map
		    .fire('move')
		    .fire('drag');
	},

	_onViewReset: function () {
		// TODO fix hardcoded Earth values
		var pxCenter = this._map.getSize()._divideBy(2),
		    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

		this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
		this._worldWidth = this._map.project([0, 180]).x;
	},

	_onPreDrag: function () {
		// TODO refactor to be able to adjust map pane position after zoom
		var worldWidth = this._worldWidth,
		    halfWidth = Math.round(worldWidth / 2),
		    dx = this._initialWorldOffset,
		    x = this._draggable._newPos.x,
		    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
		    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
		    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

		this._draggable._newPos.x = newX;
	},

	_onDragEnd: function (e) {
		var map = this._map,
		    options = map.options,
		    delay = +new Date() - this._lastTime,

		    noInertia = !options.inertia || delay > options.inertiaThreshold || !this._positions[0];

		map.fire('dragend', e);

		if (noInertia) {
			map.fire('moveend');

		} else {

			var direction = this._lastPos.subtract(this._positions[0]),
			    duration = (this._lastTime + delay - this._times[0]) / 1000,
			    ease = options.easeLinearity,

			    speedVector = direction.multiplyBy(ease / duration),
			    speed = speedVector.distanceTo([0, 0]),

			    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
			    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

			    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
			    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

			if (!offset.x || !offset.y) {
				map.fire('moveend');

			} else {
				offset = map._limitOffset(offset, map.options.maxBounds);

				L.Util.requestAnimFrame(function () {
					map.panBy(offset, {
						duration: decelerationDuration,
						easeLinearity: ease,
						noMoveStart: true
					});
				});
			}
		}
	}
});

L.Map.addInitHook('addHandler', 'dragging', L.Map.Drag);


/*
 * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
 */

L.Map.mergeOptions({
	doubleClickZoom: true
});

L.Map.DoubleClickZoom = L.Handler.extend({
	addHooks: function () {
		this._map.on('dblclick', this._onDoubleClick, this);
	},

	removeHooks: function () {
		this._map.off('dblclick', this._onDoubleClick, this);
	},

	_onDoubleClick: function (e) {
		var map = this._map,
		    zoom = map.getZoom() + (e.originalEvent.shiftKey ? -1 : 1);

		if (map.options.doubleClickZoom === 'center') {
			map.setZoom(zoom);
		} else {
			map.setZoomAround(e.containerPoint, zoom);
		}
	}
});

L.Map.addInitHook('addHandler', 'doubleClickZoom', L.Map.DoubleClickZoom);


/*
 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
 */

L.Map.mergeOptions({
	scrollWheelZoom: true
});

L.Map.ScrollWheelZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'mousewheel', this._onWheelScroll, this);
		L.DomEvent.on(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);
		this._delta = 0;
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'mousewheel', this._onWheelScroll);
		L.DomEvent.off(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);
	},

	_onWheelScroll: function (e) {
		var delta = L.DomEvent.getWheelDelta(e);

		this._delta += delta;
		this._lastMousePos = this._map.mouseEventToContainerPoint(e);

		if (!this._startTime) {
			this._startTime = +new Date();
		}

		var left = Math.max(40 - (+new Date() - this._startTime), 0);

		clearTimeout(this._timer);
		this._timer = setTimeout(L.bind(this._performZoom, this), left);

		L.DomEvent.preventDefault(e);
		L.DomEvent.stopPropagation(e);
	},

	_performZoom: function () {
		var map = this._map,
		    delta = this._delta,
		    zoom = map.getZoom();

		delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
		delta = Math.max(Math.min(delta, 4), -4);
		delta = map._limitZoom(zoom + delta) - zoom;

		this._delta = 0;
		this._startTime = null;

		if (!delta) { return; }

		if (map.options.scrollWheelZoom === 'center') {
			map.setZoom(zoom + delta);
		} else {
			map.setZoomAround(this._lastMousePos, zoom + delta);
		}
	}
});

L.Map.addInitHook('addHandler', 'scrollWheelZoom', L.Map.ScrollWheelZoom);


/*
 * Extends the event handling code with double tap support for mobile browsers.
 */

L.extend(L.DomEvent, {

	_touchstart: L.Browser.msPointer ? 'MSPointerDown' : L.Browser.pointer ? 'pointerdown' : 'touchstart',
	_touchend: L.Browser.msPointer ? 'MSPointerUp' : L.Browser.pointer ? 'pointerup' : 'touchend',

	// inspired by Zepto touch code by Thomas Fuchs
	addDoubleTapListener: function (obj, handler, id) {
		var last,
		    doubleTap = false,
		    delay = 250,
		    touch,
		    pre = '_leaflet_',
		    touchstart = this._touchstart,
		    touchend = this._touchend,
		    trackedTouches = [];

		function onTouchStart(e) {
			var count;

			if (L.Browser.pointer) {
				trackedTouches.push(e.pointerId);
				count = trackedTouches.length;
			} else {
				count = e.touches.length;
			}
			if (count > 1) {
				return;
			}

			var now = Date.now(),
				delta = now - (last || now);

			touch = e.touches ? e.touches[0] : e;
			doubleTap = (delta > 0 && delta <= delay);
			last = now;
		}

		function onTouchEnd(e) {
			if (L.Browser.pointer) {
				var idx = trackedTouches.indexOf(e.pointerId);
				if (idx === -1) {
					return;
				}
				trackedTouches.splice(idx, 1);
			}

			if (doubleTap) {
				if (L.Browser.pointer) {
					// work around .type being readonly with MSPointer* events
					var newTouch = { },
						prop;

					// jshint forin:false
					for (var i in touch) {
						prop = touch[i];
						if (typeof prop === 'function') {
							newTouch[i] = prop.bind(touch);
						} else {
							newTouch[i] = prop;
						}
					}
					touch = newTouch;
				}
				touch.type = 'dblclick';
				handler(touch);
				last = null;
			}
		}
		obj[pre + touchstart + id] = onTouchStart;
		obj[pre + touchend + id] = onTouchEnd;

		// on pointer we need to listen on the document, otherwise a drag starting on the map and moving off screen
		// will not come through to us, so we will lose track of how many touches are ongoing
		var endElement = L.Browser.pointer ? document.documentElement : obj;

		obj.addEventListener(touchstart, onTouchStart, false);
		endElement.addEventListener(touchend, onTouchEnd, false);

		if (L.Browser.pointer) {
			endElement.addEventListener(L.DomEvent.POINTER_CANCEL, onTouchEnd, false);
		}

		return this;
	},

	removeDoubleTapListener: function (obj, id) {
		var pre = '_leaflet_';

		obj.removeEventListener(this._touchstart, obj[pre + this._touchstart + id], false);
		(L.Browser.pointer ? document.documentElement : obj).removeEventListener(
		        this._touchend, obj[pre + this._touchend + id], false);

		if (L.Browser.pointer) {
			document.documentElement.removeEventListener(L.DomEvent.POINTER_CANCEL, obj[pre + this._touchend + id],
				false);
		}

		return this;
	}
});


/*
 * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
 */

L.extend(L.DomEvent, {

	//static
	POINTER_DOWN: L.Browser.msPointer ? 'MSPointerDown' : 'pointerdown',
	POINTER_MOVE: L.Browser.msPointer ? 'MSPointerMove' : 'pointermove',
	POINTER_UP: L.Browser.msPointer ? 'MSPointerUp' : 'pointerup',
	POINTER_CANCEL: L.Browser.msPointer ? 'MSPointerCancel' : 'pointercancel',

	_pointers: [],
	_pointerDocumentListener: false,

	// Provides a touch events wrapper for (ms)pointer events.
	// Based on changes by veproza https://github.com/CloudMade/Leaflet/pull/1019
	//ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

	addPointerListener: function (obj, type, handler, id) {

		switch (type) {
		case 'touchstart':
			return this.addPointerListenerStart(obj, type, handler, id);
		case 'touchend':
			return this.addPointerListenerEnd(obj, type, handler, id);
		case 'touchmove':
			return this.addPointerListenerMove(obj, type, handler, id);
		default:
			throw 'Unknown touch event type';
		}
	},

	addPointerListenerStart: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    pointers = this._pointers;

		var cb = function (e) {
			if (e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
				L.DomEvent.preventDefault(e);
			}

			var alreadyInArray = false;
			for (var i = 0; i < pointers.length; i++) {
				if (pointers[i].pointerId === e.pointerId) {
					alreadyInArray = true;
					break;
				}
			}
			if (!alreadyInArray) {
				pointers.push(e);
			}

			e.touches = pointers.slice();
			e.changedTouches = [e];

			handler(e);
		};

		obj[pre + 'touchstart' + id] = cb;
		obj.addEventListener(this.POINTER_DOWN, cb, false);

		// need to also listen for end events to keep the _pointers list accurate
		// this needs to be on the body and never go away
		if (!this._pointerDocumentListener) {
			var internalCb = function (e) {
				for (var i = 0; i < pointers.length; i++) {
					if (pointers[i].pointerId === e.pointerId) {
						pointers.splice(i, 1);
						break;
					}
				}
			};
			//We listen on the documentElement as any drags that end by moving the touch off the screen get fired there
			document.documentElement.addEventListener(this.POINTER_UP, internalCb, false);
			document.documentElement.addEventListener(this.POINTER_CANCEL, internalCb, false);

			this._pointerDocumentListener = true;
		}

		return this;
	},

	addPointerListenerMove: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    touches = this._pointers;

		function cb(e) {

			// don't fire touch moves when mouse isn't down
			if ((e.pointerType === e.MSPOINTER_TYPE_MOUSE || e.pointerType === 'mouse') && e.buttons === 0) { return; }

			for (var i = 0; i < touches.length; i++) {
				if (touches[i].pointerId === e.pointerId) {
					touches[i] = e;
					break;
				}
			}

			e.touches = touches.slice();
			e.changedTouches = [e];

			handler(e);
		}

		obj[pre + 'touchmove' + id] = cb;
		obj.addEventListener(this.POINTER_MOVE, cb, false);

		return this;
	},

	addPointerListenerEnd: function (obj, type, handler, id) {
		var pre = '_leaflet_',
		    touches = this._pointers;

		var cb = function (e) {
			for (var i = 0; i < touches.length; i++) {
				if (touches[i].pointerId === e.pointerId) {
					touches.splice(i, 1);
					break;
				}
			}

			e.touches = touches.slice();
			e.changedTouches = [e];

			handler(e);
		};

		obj[pre + 'touchend' + id] = cb;
		obj.addEventListener(this.POINTER_UP, cb, false);
		obj.addEventListener(this.POINTER_CANCEL, cb, false);

		return this;
	},

	removePointerListener: function (obj, type, id) {
		var pre = '_leaflet_',
		    cb = obj[pre + type + id];

		switch (type) {
		case 'touchstart':
			obj.removeEventListener(this.POINTER_DOWN, cb, false);
			break;
		case 'touchmove':
			obj.removeEventListener(this.POINTER_MOVE, cb, false);
			break;
		case 'touchend':
			obj.removeEventListener(this.POINTER_UP, cb, false);
			obj.removeEventListener(this.POINTER_CANCEL, cb, false);
			break;
		}

		return this;
	}
});


/*
 * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
 */

L.Map.mergeOptions({
	touchZoom: L.Browser.touch && !L.Browser.android23,
	bounceAtZoomLimits: true
});

L.Map.TouchZoom = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
	},

	_onTouchStart: function (e) {
		var map = this._map;

		if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
		    p2 = map.mouseEventToLayerPoint(e.touches[1]),
		    viewCenter = map._getCenterLayerPoint();

		this._startCenter = p1.add(p2)._divideBy(2);
		this._startDist = p1.distanceTo(p2);

		this._moved = false;
		this._zooming = true;

		this._centerOffset = viewCenter.subtract(this._startCenter);

		if (map._panAnim) {
			map._panAnim.stop();
		}

		L.DomEvent
		    .on(document, 'touchmove', this._onTouchMove, this)
		    .on(document, 'touchend', this._onTouchEnd, this);

		L.DomEvent.preventDefault(e);
	},

	_onTouchMove: function (e) {
		var map = this._map;

		if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

		var p1 = map.mouseEventToLayerPoint(e.touches[0]),
		    p2 = map.mouseEventToLayerPoint(e.touches[1]);

		this._scale = p1.distanceTo(p2) / this._startDist;
		this._delta = p1._add(p2)._divideBy(2)._subtract(this._startCenter);

		if (this._scale === 1) { return; }

		if (!map.options.bounceAtZoomLimits) {
			if ((map.getZoom() === map.getMinZoom() && this._scale < 1) ||
			    (map.getZoom() === map.getMaxZoom() && this._scale > 1)) { return; }
		}

		if (!this._moved) {
			L.DomUtil.addClass(map._mapPane, 'leaflet-touching');

			map
			    .fire('movestart')
			    .fire('zoomstart');

			this._moved = true;
		}

		L.Util.cancelAnimFrame(this._animRequest);
		this._animRequest = L.Util.requestAnimFrame(
		        this._updateOnMove, this, true, this._map._container);

		L.DomEvent.preventDefault(e);
	},

	_updateOnMove: function () {
		var map = this._map,
		    origin = this._getScaleOrigin(),
		    center = map.layerPointToLatLng(origin),
		    zoom = map.getScaleZoom(this._scale);

		map._animateZoom(center, zoom, this._startCenter, this._scale, this._delta, false, true);
	},

	_onTouchEnd: function () {
		if (!this._moved || !this._zooming) {
			this._zooming = false;
			return;
		}

		var map = this._map;

		this._zooming = false;
		L.DomUtil.removeClass(map._mapPane, 'leaflet-touching');
		L.Util.cancelAnimFrame(this._animRequest);

		L.DomEvent
		    .off(document, 'touchmove', this._onTouchMove)
		    .off(document, 'touchend', this._onTouchEnd);

		var origin = this._getScaleOrigin(),
		    center = map.layerPointToLatLng(origin),

		    oldZoom = map.getZoom(),
		    floatZoomDelta = map.getScaleZoom(this._scale) - oldZoom,
		    roundZoomDelta = (floatZoomDelta > 0 ?
		            Math.ceil(floatZoomDelta) : Math.floor(floatZoomDelta)),

		    zoom = map._limitZoom(oldZoom + roundZoomDelta),
		    scale = map.getZoomScale(zoom) / this._scale;

		map._animateZoom(center, zoom, origin, scale);
	},

	_getScaleOrigin: function () {
		var centerOffset = this._centerOffset.subtract(this._delta).divideBy(this._scale);
		return this._startCenter.add(centerOffset);
	}
});

L.Map.addInitHook('addHandler', 'touchZoom', L.Map.TouchZoom);


/*
 * L.Map.Tap is used to enable mobile hacks like quick taps and long hold.
 */

L.Map.mergeOptions({
	tap: true,
	tapTolerance: 15
});

L.Map.Tap = L.Handler.extend({
	addHooks: function () {
		L.DomEvent.on(this._map._container, 'touchstart', this._onDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._map._container, 'touchstart', this._onDown, this);
	},

	_onDown: function (e) {
		if (!e.touches) { return; }

		L.DomEvent.preventDefault(e);

		this._fireClick = true;

		// don't simulate click or track longpress if more than 1 touch
		if (e.touches.length > 1) {
			this._fireClick = false;
			clearTimeout(this._holdTimeout);
			return;
		}

		var first = e.touches[0],
		    el = first.target;

		this._startPos = this._newPos = new L.Point(first.clientX, first.clientY);

		// if touching a link, highlight it
		if (el.tagName && el.tagName.toLowerCase() === 'a') {
			L.DomUtil.addClass(el, 'leaflet-active');
		}

		// simulate long hold but setting a timeout
		this._holdTimeout = setTimeout(L.bind(function () {
			if (this._isTapValid()) {
				this._fireClick = false;
				this._onUp();
				this._simulateEvent('contextmenu', first);
			}
		}, this), 1000);

		L.DomEvent
			.on(document, 'touchmove', this._onMove, this)
			.on(document, 'touchend', this._onUp, this);
	},

	_onUp: function (e) {
		clearTimeout(this._holdTimeout);

		L.DomEvent
			.off(document, 'touchmove', this._onMove, this)
			.off(document, 'touchend', this._onUp, this);

		if (this._fireClick && e && e.changedTouches) {

			var first = e.changedTouches[0],
			    el = first.target;

			if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
				L.DomUtil.removeClass(el, 'leaflet-active');
			}

			// simulate click if the touch didn't move too much
			if (this._isTapValid()) {
				this._simulateEvent('click', first);
			}
		}
	},

	_isTapValid: function () {
		return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
	},

	_onMove: function (e) {
		var first = e.touches[0];
		this._newPos = new L.Point(first.clientX, first.clientY);
	},

	_simulateEvent: function (type, e) {
		var simulatedEvent = document.createEvent('MouseEvents');

		simulatedEvent._simulated = true;
		e.target._simulatedClick = true;

		simulatedEvent.initMouseEvent(
		        type, true, true, window, 1,
		        e.screenX, e.screenY,
		        e.clientX, e.clientY,
		        false, false, false, false, 0, null);

		e.target.dispatchEvent(simulatedEvent);
	}
});

if (L.Browser.touch && !L.Browser.pointer) {
	L.Map.addInitHook('addHandler', 'tap', L.Map.Tap);
}


/*
 * L.Handler.ShiftDragZoom is used to add shift-drag zoom interaction to the map
  * (zoom to a selected bounding box), enabled by default.
 */

L.Map.mergeOptions({
	boxZoom: true
});

L.Map.BoxZoom = L.Handler.extend({
	initialize: function (map) {
		this._map = map;
		this._container = map._container;
		this._pane = map._panes.overlayPane;
		this._moved = false;
	},

	addHooks: function () {
		L.DomEvent.on(this._container, 'mousedown', this._onMouseDown, this);
	},

	removeHooks: function () {
		L.DomEvent.off(this._container, 'mousedown', this._onMouseDown);
		this._moved = false;
	},

	moved: function () {
		return this._moved;
	},

	_onMouseDown: function (e) {
		this._moved = false;

		if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

		L.DomUtil.disableTextSelection();
		L.DomUtil.disableImageDrag();

		this._startLayerPoint = this._map.mouseEventToLayerPoint(e);

		L.DomEvent
		    .on(document, 'mousemove', this._onMouseMove, this)
		    .on(document, 'mouseup', this._onMouseUp, this)
		    .on(document, 'keydown', this._onKeyDown, this);
	},

	_onMouseMove: function (e) {
		if (!this._moved) {
			this._box = L.DomUtil.create('div', 'leaflet-zoom-box', this._pane);
			L.DomUtil.setPosition(this._box, this._startLayerPoint);

			//TODO refactor: move cursor to styles
			this._container.style.cursor = 'crosshair';
			this._map.fire('boxzoomstart');
		}

		var startPoint = this._startLayerPoint,
		    box = this._box,

		    layerPoint = this._map.mouseEventToLayerPoint(e),
		    offset = layerPoint.subtract(startPoint),

		    newPos = new L.Point(
		        Math.min(layerPoint.x, startPoint.x),
		        Math.min(layerPoint.y, startPoint.y));

		L.DomUtil.setPosition(box, newPos);

		this._moved = true;

		// TODO refactor: remove hardcoded 4 pixels
		box.style.width  = (Math.max(0, Math.abs(offset.x) - 4)) + 'px';
		box.style.height = (Math.max(0, Math.abs(offset.y) - 4)) + 'px';
	},

	_finish: function () {
		if (this._moved) {
			this._pane.removeChild(this._box);
			this._container.style.cursor = '';
		}

		L.DomUtil.enableTextSelection();
		L.DomUtil.enableImageDrag();

		L.DomEvent
		    .off(document, 'mousemove', this._onMouseMove)
		    .off(document, 'mouseup', this._onMouseUp)
		    .off(document, 'keydown', this._onKeyDown);
	},

	_onMouseUp: function (e) {

		this._finish();

		var map = this._map,
		    layerPoint = map.mouseEventToLayerPoint(e);

		if (this._startLayerPoint.equals(layerPoint)) { return; }

		var bounds = new L.LatLngBounds(
		        map.layerPointToLatLng(this._startLayerPoint),
		        map.layerPointToLatLng(layerPoint));

		map.fitBounds(bounds);

		map.fire('boxzoomend', {
			boxZoomBounds: bounds
		});
	},

	_onKeyDown: function (e) {
		if (e.keyCode === 27) {
			this._finish();
		}
	}
});

L.Map.addInitHook('addHandler', 'boxZoom', L.Map.BoxZoom);


/*
 * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
 */

L.Map.mergeOptions({
	keyboard: true,
	keyboardPanOffset: 80,
	keyboardZoomOffset: 1
});

L.Map.Keyboard = L.Handler.extend({

	keyCodes: {
		left:    [37],
		right:   [39],
		down:    [40],
		up:      [38],
		zoomIn:  [187, 107, 61, 171],
		zoomOut: [189, 109, 173]
	},

	initialize: function (map) {
		this._map = map;

		this._setPanOffset(map.options.keyboardPanOffset);
		this._setZoomOffset(map.options.keyboardZoomOffset);
	},

	addHooks: function () {
		var container = this._map._container;

		// make the container focusable by tabbing
		if (container.tabIndex === -1) {
			container.tabIndex = '0';
		}

		L.DomEvent
		    .on(container, 'focus', this._onFocus, this)
		    .on(container, 'blur', this._onBlur, this)
		    .on(container, 'mousedown', this._onMouseDown, this);

		this._map
		    .on('focus', this._addHooks, this)
		    .on('blur', this._removeHooks, this);
	},

	removeHooks: function () {
		this._removeHooks();

		var container = this._map._container;

		L.DomEvent
		    .off(container, 'focus', this._onFocus, this)
		    .off(container, 'blur', this._onBlur, this)
		    .off(container, 'mousedown', this._onMouseDown, this);

		this._map
		    .off('focus', this._addHooks, this)
		    .off('blur', this._removeHooks, this);
	},

	_onMouseDown: function () {
		if (this._focused) { return; }

		var body = document.body,
		    docEl = document.documentElement,
		    top = body.scrollTop || docEl.scrollTop,
		    left = body.scrollLeft || docEl.scrollLeft;

		this._map._container.focus();

		window.scrollTo(left, top);
	},

	_onFocus: function () {
		this._focused = true;
		this._map.fire('focus');
	},

	_onBlur: function () {
		this._focused = false;
		this._map.fire('blur');
	},

	_setPanOffset: function (pan) {
		var keys = this._panKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.left.length; i < len; i++) {
			keys[codes.left[i]] = [-1 * pan, 0];
		}
		for (i = 0, len = codes.right.length; i < len; i++) {
			keys[codes.right[i]] = [pan, 0];
		}
		for (i = 0, len = codes.down.length; i < len; i++) {
			keys[codes.down[i]] = [0, pan];
		}
		for (i = 0, len = codes.up.length; i < len; i++) {
			keys[codes.up[i]] = [0, -1 * pan];
		}
	},

	_setZoomOffset: function (zoom) {
		var keys = this._zoomKeys = {},
		    codes = this.keyCodes,
		    i, len;

		for (i = 0, len = codes.zoomIn.length; i < len; i++) {
			keys[codes.zoomIn[i]] = zoom;
		}
		for (i = 0, len = codes.zoomOut.length; i < len; i++) {
			keys[codes.zoomOut[i]] = -zoom;
		}
	},

	_addHooks: function () {
		L.DomEvent.on(document, 'keydown', this._onKeyDown, this);
	},

	_removeHooks: function () {
		L.DomEvent.off(document, 'keydown', this._onKeyDown, this);
	},

	_onKeyDown: function (e) {
		var key = e.keyCode,
		    map = this._map;

		if (key in this._panKeys) {

			if (map._panAnim && map._panAnim._inProgress) { return; }

			map.panBy(this._panKeys[key]);

			if (map.options.maxBounds) {
				map.panInsideBounds(map.options.maxBounds);
			}

		} else if (key in this._zoomKeys) {
			map.setZoom(map.getZoom() + this._zoomKeys[key]);

		} else {
			return;
		}

		L.DomEvent.stop(e);
	}
});

L.Map.addInitHook('addHandler', 'keyboard', L.Map.Keyboard);


/*
 * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
 */

L.Handler.MarkerDrag = L.Handler.extend({
	initialize: function (marker) {
		this._marker = marker;
	},

	addHooks: function () {
		var icon = this._marker._icon;
		if (!this._draggable) {
			this._draggable = new L.Draggable(icon, icon);
		}

		this._draggable
			.on('dragstart', this._onDragStart, this)
			.on('drag', this._onDrag, this)
			.on('dragend', this._onDragEnd, this);
		this._draggable.enable();
		L.DomUtil.addClass(this._marker._icon, 'leaflet-marker-draggable');
	},

	removeHooks: function () {
		this._draggable
			.off('dragstart', this._onDragStart, this)
			.off('drag', this._onDrag, this)
			.off('dragend', this._onDragEnd, this);

		this._draggable.disable();
		L.DomUtil.removeClass(this._marker._icon, 'leaflet-marker-draggable');
	},

	moved: function () {
		return this._draggable && this._draggable._moved;
	},

	_onDragStart: function () {
		this._marker
		    .closePopup()
		    .fire('movestart')
		    .fire('dragstart');
	},

	_onDrag: function () {
		var marker = this._marker,
		    shadow = marker._shadow,
		    iconPos = L.DomUtil.getPosition(marker._icon),
		    latlng = marker._map.layerPointToLatLng(iconPos);

		// update shadow position
		if (shadow) {
			L.DomUtil.setPosition(shadow, iconPos);
		}

		marker._latlng = latlng;

		marker
		    .fire('move', {latlng: latlng})
		    .fire('drag');
	},

	_onDragEnd: function (e) {
		this._marker
		    .fire('moveend')
		    .fire('dragend', e);
	}
});


/*
 * L.Control is a base class for implementing map controls. Handles positioning.
 * All other controls extend from this class.
 */

L.Control = L.Class.extend({
	options: {
		position: 'topright'
	},

	initialize: function (options) {
		L.setOptions(this, options);
	},

	getPosition: function () {
		return this.options.position;
	},

	setPosition: function (position) {
		var map = this._map;

		if (map) {
			map.removeControl(this);
		}

		this.options.position = position;

		if (map) {
			map.addControl(this);
		}

		return this;
	},

	getContainer: function () {
		return this._container;
	},

	addTo: function (map) {
		this._map = map;

		var container = this._container = this.onAdd(map),
		    pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		L.DomUtil.addClass(container, 'leaflet-control');

		if (pos.indexOf('bottom') !== -1) {
			corner.insertBefore(container, corner.firstChild);
		} else {
			corner.appendChild(container);
		}

		return this;
	},

	removeFrom: function (map) {
		var pos = this.getPosition(),
		    corner = map._controlCorners[pos];

		corner.removeChild(this._container);
		this._map = null;

		if (this.onRemove) {
			this.onRemove(map);
		}

		return this;
	},

	_refocusOnMap: function () {
		if (this._map) {
			this._map.getContainer().focus();
		}
	}
});

L.control = function (options) {
	return new L.Control(options);
};


// adds control-related methods to L.Map

L.Map.include({
	addControl: function (control) {
		control.addTo(this);
		return this;
	},

	removeControl: function (control) {
		control.removeFrom(this);
		return this;
	},

	_initControlPos: function () {
		var corners = this._controlCorners = {},
		    l = 'leaflet-',
		    container = this._controlContainer =
		            L.DomUtil.create('div', l + 'control-container', this._container);

		function createCorner(vSide, hSide) {
			var className = l + vSide + ' ' + l + hSide;

			corners[vSide + hSide] = L.DomUtil.create('div', className, container);
		}

		createCorner('top', 'left');
		createCorner('top', 'right');
		createCorner('bottom', 'left');
		createCorner('bottom', 'right');
	},

	_clearControlPos: function () {
		this._container.removeChild(this._controlContainer);
	}
});


/*
 * L.Control.Zoom is used for the default zoom buttons on the map.
 */

L.Control.Zoom = L.Control.extend({
	options: {
		position: 'topleft',
		zoomInText: '+',
		zoomInTitle: 'Zoom in',
		zoomOutText: '-',
		zoomOutTitle: 'Zoom out'
	},

	onAdd: function (map) {
		var zoomName = 'leaflet-control-zoom',
		    container = L.DomUtil.create('div', zoomName + ' leaflet-bar');

		this._map = map;

		this._zoomInButton  = this._createButton(
		        this.options.zoomInText, this.options.zoomInTitle,
		        zoomName + '-in',  container, this._zoomIn,  this);
		this._zoomOutButton = this._createButton(
		        this.options.zoomOutText, this.options.zoomOutTitle,
		        zoomName + '-out', container, this._zoomOut, this);

		this._updateDisabled();
		map.on('zoomend zoomlevelschange', this._updateDisabled, this);

		return container;
	},

	onRemove: function (map) {
		map.off('zoomend zoomlevelschange', this._updateDisabled, this);
	},

	_zoomIn: function (e) {
		this._map.zoomIn(e.shiftKey ? 3 : 1);
	},

	_zoomOut: function (e) {
		this._map.zoomOut(e.shiftKey ? 3 : 1);
	},

	_createButton: function (html, title, className, container, fn, context) {
		var link = L.DomUtil.create('a', className, container);
		link.innerHTML = html;
		link.href = '#';
		link.title = title;

		var stop = L.DomEvent.stopPropagation;

		L.DomEvent
		    .on(link, 'click', stop)
		    .on(link, 'mousedown', stop)
		    .on(link, 'dblclick', stop)
		    .on(link, 'click', L.DomEvent.preventDefault)
		    .on(link, 'click', fn, context)
		    .on(link, 'click', this._refocusOnMap, context);

		return link;
	},

	_updateDisabled: function () {
		var map = this._map,
			className = 'leaflet-disabled';

		L.DomUtil.removeClass(this._zoomInButton, className);
		L.DomUtil.removeClass(this._zoomOutButton, className);

		if (map._zoom === map.getMinZoom()) {
			L.DomUtil.addClass(this._zoomOutButton, className);
		}
		if (map._zoom === map.getMaxZoom()) {
			L.DomUtil.addClass(this._zoomInButton, className);
		}
	}
});

L.Map.mergeOptions({
	zoomControl: true
});

L.Map.addInitHook(function () {
	if (this.options.zoomControl) {
		this.zoomControl = new L.Control.Zoom();
		this.addControl(this.zoomControl);
	}
});

L.control.zoom = function (options) {
	return new L.Control.Zoom(options);
};



/*
 * L.Control.Attribution is used for displaying attribution on the map (added by default).
 */

L.Control.Attribution = L.Control.extend({
	options: {
		position: 'bottomright',
		prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
	},

	initialize: function (options) {
		L.setOptions(this, options);

		this._attributions = {};
	},

	onAdd: function (map) {
		this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
		L.DomEvent.disableClickPropagation(this._container);

		for (var i in map._layers) {
			if (map._layers[i].getAttribution) {
				this.addAttribution(map._layers[i].getAttribution());
			}
		}

		map
		    .on('layeradd', this._onLayerAdd, this)
		    .on('layerremove', this._onLayerRemove, this);

		this._update();

		return this._container;
	},

	onRemove: function (map) {
		map
		    .off('layeradd', this._onLayerAdd)
		    .off('layerremove', this._onLayerRemove);

	},

	setPrefix: function (prefix) {
		this.options.prefix = prefix;
		this._update();
		return this;
	},

	addAttribution: function (text) {
		if (!text) { return; }

		if (!this._attributions[text]) {
			this._attributions[text] = 0;
		}
		this._attributions[text]++;

		this._update();

		return this;
	},

	removeAttribution: function (text) {
		if (!text) { return; }

		if (this._attributions[text]) {
			this._attributions[text]--;
			this._update();
		}

		return this;
	},

	_update: function () {
		if (!this._map) { return; }

		var attribs = [];

		for (var i in this._attributions) {
			if (this._attributions[i]) {
				attribs.push(i);
			}
		}

		var prefixAndAttribs = [];

		if (this.options.prefix) {
			prefixAndAttribs.push(this.options.prefix);
		}
		if (attribs.length) {
			prefixAndAttribs.push(attribs.join(', '));
		}

		this._container.innerHTML = prefixAndAttribs.join(' | ');
	},

	_onLayerAdd: function (e) {
		if (e.layer.getAttribution) {
			this.addAttribution(e.layer.getAttribution());
		}
	},

	_onLayerRemove: function (e) {
		if (e.layer.getAttribution) {
			this.removeAttribution(e.layer.getAttribution());
		}
	}
});

L.Map.mergeOptions({
	attributionControl: true
});

L.Map.addInitHook(function () {
	if (this.options.attributionControl) {
		this.attributionControl = (new L.Control.Attribution()).addTo(this);
	}
});

L.control.attribution = function (options) {
	return new L.Control.Attribution(options);
};


/*
 * L.Control.Scale is used for displaying metric/imperial scale on the map.
 */

L.Control.Scale = L.Control.extend({
	options: {
		position: 'bottomleft',
		maxWidth: 100,
		metric: true,
		imperial: true,
		updateWhenIdle: false
	},

	onAdd: function (map) {
		this._map = map;

		var className = 'leaflet-control-scale',
		    container = L.DomUtil.create('div', className),
		    options = this.options;

		this._addScales(options, className, container);

		map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
		map.whenReady(this._update, this);

		return container;
	},

	onRemove: function (map) {
		map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
	},

	_addScales: function (options, className, container) {
		if (options.metric) {
			this._mScale = L.DomUtil.create('div', className + '-line', container);
		}
		if (options.imperial) {
			this._iScale = L.DomUtil.create('div', className + '-line', container);
		}
	},

	_update: function () {
		var bounds = this._map.getBounds(),
		    centerLat = bounds.getCenter().lat,
		    halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180),
		    dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180,

		    size = this._map.getSize(),
		    options = this.options,
		    maxMeters = 0;

		if (size.x > 0) {
			maxMeters = dist * (options.maxWidth / size.x);
		}

		this._updateScales(options, maxMeters);
	},

	_updateScales: function (options, maxMeters) {
		if (options.metric && maxMeters) {
			this._updateMetric(maxMeters);
		}

		if (options.imperial && maxMeters) {
			this._updateImperial(maxMeters);
		}
	},

	_updateMetric: function (maxMeters) {
		var meters = this._getRoundNum(maxMeters);

		this._mScale.style.width = this._getScaleWidth(meters / maxMeters) + 'px';
		this._mScale.innerHTML = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';
	},

	_updateImperial: function (maxMeters) {
		var maxFeet = maxMeters * 3.2808399,
		    scale = this._iScale,
		    maxMiles, miles, feet;

		if (maxFeet > 5280) {
			maxMiles = maxFeet / 5280;
			miles = this._getRoundNum(maxMiles);

			scale.style.width = this._getScaleWidth(miles / maxMiles) + 'px';
			scale.innerHTML = miles + ' mi';

		} else {
			feet = this._getRoundNum(maxFeet);

			scale.style.width = this._getScaleWidth(feet / maxFeet) + 'px';
			scale.innerHTML = feet + ' ft';
		}
	},

	_getScaleWidth: function (ratio) {
		return Math.round(this.options.maxWidth * ratio) - 10;
	},

	_getRoundNum: function (num) {
		var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
		    d = num / pow10;

		d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;

		return pow10 * d;
	}
});

L.control.scale = function (options) {
	return new L.Control.Scale(options);
};


/*
 * L.Control.Layers is a control to allow users to switch between different layers on the map.
 */

L.Control.Layers = L.Control.extend({
	options: {
		collapsed: true,
		position: 'topright',
		autoZIndex: true
	},

	initialize: function (baseLayers, overlays, options) {
		L.setOptions(this, options);

		this._layers = {};
		this._lastZIndex = 0;
		this._handlingClick = false;

		for (var i in baseLayers) {
			this._addLayer(baseLayers[i], i);
		}

		for (i in overlays) {
			this._addLayer(overlays[i], i, true);
		}
	},

	onAdd: function (map) {
		this._initLayout();
		this._update();

		map
		    .on('layeradd', this._onLayerChange, this)
		    .on('layerremove', this._onLayerChange, this);

		return this._container;
	},

	onRemove: function (map) {
		map
		    .off('layeradd', this._onLayerChange, this)
		    .off('layerremove', this._onLayerChange, this);
	},

	addBaseLayer: function (layer, name) {
		this._addLayer(layer, name);
		this._update();
		return this;
	},

	addOverlay: function (layer, name) {
		this._addLayer(layer, name, true);
		this._update();
		return this;
	},

	removeLayer: function (layer) {
		var id = L.stamp(layer);
		delete this._layers[id];
		this._update();
		return this;
	},

	_initLayout: function () {
		var className = 'leaflet-control-layers',
		    container = this._container = L.DomUtil.create('div', className);

		//Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
		container.setAttribute('aria-haspopup', true);

		if (!L.Browser.touch) {
			L.DomEvent
				.disableClickPropagation(container)
				.disableScrollPropagation(container);
		} else {
			L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
		}

		var form = this._form = L.DomUtil.create('form', className + '-list');

		if (this.options.collapsed) {
			if (!L.Browser.android) {
				L.DomEvent
				    .on(container, 'mouseover', this._expand, this)
				    .on(container, 'mouseout', this._collapse, this);
			}
			var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
			link.href = '#';
			link.title = 'Layers';

			if (L.Browser.touch) {
				L.DomEvent
				    .on(link, 'click', L.DomEvent.stop)
				    .on(link, 'click', this._expand, this);
			}
			else {
				L.DomEvent.on(link, 'focus', this._expand, this);
			}
			//Work around for Firefox android issue https://github.com/Leaflet/Leaflet/issues/2033
			L.DomEvent.on(form, 'click', function () {
				setTimeout(L.bind(this._onInputClick, this), 0);
			}, this);

			this._map.on('click', this._collapse, this);
			// TODO keyboard accessibility
		} else {
			this._expand();
		}

		this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
		this._separator = L.DomUtil.create('div', className + '-separator', form);
		this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

		container.appendChild(form);
	},

	_addLayer: function (layer, name, overlay) {
		var id = L.stamp(layer);

		this._layers[id] = {
			layer: layer,
			name: name,
			overlay: overlay
		};

		if (this.options.autoZIndex && layer.setZIndex) {
			this._lastZIndex++;
			layer.setZIndex(this._lastZIndex);
		}
	},

	_update: function () {
		if (!this._container) {
			return;
		}

		this._baseLayersList.innerHTML = '';
		this._overlaysList.innerHTML = '';

		var baseLayersPresent = false,
		    overlaysPresent = false,
		    i, obj;

		for (i in this._layers) {
			obj = this._layers[i];
			this._addItem(obj);
			overlaysPresent = overlaysPresent || obj.overlay;
			baseLayersPresent = baseLayersPresent || !obj.overlay;
		}

		this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';
	},

	_onLayerChange: function (e) {
		var obj = this._layers[L.stamp(e.layer)];

		if (!obj) { return; }

		if (!this._handlingClick) {
			this._update();
		}

		var type = obj.overlay ?
			(e.type === 'layeradd' ? 'overlayadd' : 'overlayremove') :
			(e.type === 'layeradd' ? 'baselayerchange' : null);

		if (type) {
			this._map.fire(type, obj);
		}
	},

	// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
	_createRadioElement: function (name, checked) {

		var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"';
		if (checked) {
			radioHtml += ' checked="checked"';
		}
		radioHtml += '/>';

		var radioFragment = document.createElement('div');
		radioFragment.innerHTML = radioHtml;

		return radioFragment.firstChild;
	},

	_addItem: function (obj) {
		var label = document.createElement('label'),
		    input,
		    checked = this._map.hasLayer(obj.layer);

		if (obj.overlay) {
			input = document.createElement('input');
			input.type = 'checkbox';
			input.className = 'leaflet-control-layers-selector';
			input.defaultChecked = checked;
		} else {
			input = this._createRadioElement('leaflet-base-layers', checked);
		}

		input.layerId = L.stamp(obj.layer);

		L.DomEvent.on(input, 'click', this._onInputClick, this);

		var name = document.createElement('span');
		name.innerHTML = ' ' + obj.name;

		label.appendChild(input);
		label.appendChild(name);

		var container = obj.overlay ? this._overlaysList : this._baseLayersList;
		container.appendChild(label);

		return label;
	},

	_onInputClick: function () {
		var i, input, obj,
		    inputs = this._form.getElementsByTagName('input'),
		    inputsLen = inputs.length;

		this._handlingClick = true;

		for (i = 0; i < inputsLen; i++) {
			input = inputs[i];
			obj = this._layers[input.layerId];

			if (input.checked && !this._map.hasLayer(obj.layer)) {
				this._map.addLayer(obj.layer);

			} else if (!input.checked && this._map.hasLayer(obj.layer)) {
				this._map.removeLayer(obj.layer);
			}
		}

		this._handlingClick = false;

		this._refocusOnMap();
	},

	_expand: function () {
		L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
	},

	_collapse: function () {
		this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '');
	}
});

L.control.layers = function (baseLayers, overlays, options) {
	return new L.Control.Layers(baseLayers, overlays, options);
};


/*
 * L.PosAnimation is used by Leaflet internally for pan animations.
 */

L.PosAnimation = L.Class.extend({
	includes: L.Mixin.Events,

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._newPos = newPos;

		this.fire('start');

		el.style[L.DomUtil.TRANSITION] = 'all ' + (duration || 0.25) +
		        's cubic-bezier(0,0,' + (easeLinearity || 0.5) + ',1)';

		L.DomEvent.on(el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
		L.DomUtil.setPosition(el, newPos);

		// toggle reflow, Chrome flickers for some reason if you don't do this
		L.Util.falseFn(el.offsetWidth);

		// there's no native way to track value updates of transitioned properties, so we imitate this
		this._stepTimer = setInterval(L.bind(this._onStep, this), 50);
	},

	stop: function () {
		if (!this._inProgress) { return; }

		// if we just removed the transition property, the element would jump to its final position,
		// so we need to make it stay at the current position

		L.DomUtil.setPosition(this._el, this._getPos());
		this._onTransitionEnd();
		L.Util.falseFn(this._el.offsetWidth); // force reflow in case we are about to start a new animation
	},

	_onStep: function () {
		var stepPos = this._getPos();
		if (!stepPos) {
			this._onTransitionEnd();
			return;
		}
		// jshint camelcase: false
		// make L.DomUtil.getPosition return intermediate position value during animation
		this._el._leaflet_pos = stepPos;

		this.fire('step');
	},

	// you can't easily get intermediate values of properties animated with CSS3 Transitions,
	// we need to parse computed style (in case of transform it returns matrix string)

	_transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,

	_getPos: function () {
		var left, top, matches,
		    el = this._el,
		    style = window.getComputedStyle(el);

		if (L.Browser.any3d) {
			matches = style[L.DomUtil.TRANSFORM].match(this._transformRe);
			if (!matches) { return; }
			left = parseFloat(matches[1]);
			top  = parseFloat(matches[2]);
		} else {
			left = parseFloat(style.left);
			top  = parseFloat(style.top);
		}

		return new L.Point(left, top, true);
	},

	_onTransitionEnd: function () {
		L.DomEvent.off(this._el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);

		if (!this._inProgress) { return; }
		this._inProgress = false;

		this._el.style[L.DomUtil.TRANSITION] = '';

		// jshint camelcase: false
		// make sure L.DomUtil.getPosition returns the final position value after animation
		this._el._leaflet_pos = this._newPos;

		clearInterval(this._stepTimer);

		this.fire('step').fire('end');
	}

});


/*
 * Extends L.Map to handle panning animations.
 */

L.Map.include({

	setView: function (center, zoom, options) {

		zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
		center = this._limitCenter(L.latLng(center), zoom, this.options.maxBounds);
		options = options || {};

		if (this._panAnim) {
			this._panAnim.stop();
		}

		if (this._loaded && !options.reset && options !== true) {

			if (options.animate !== undefined) {
				options.zoom = L.extend({animate: options.animate}, options.zoom);
				options.pan = L.extend({animate: options.animate}, options.pan);
			}

			// try animating pan or zoom
			var animated = (this._zoom !== zoom) ?
				this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
				this._tryAnimatedPan(center, options.pan);

			if (animated) {
				// prevent resize handler call, the view will refresh after animation anyway
				clearTimeout(this._sizeTimer);
				return this;
			}
		}

		// animation didn't start, just reset the map view
		this._resetView(center, zoom);

		return this;
	},

	panBy: function (offset, options) {
		offset = L.point(offset).round();
		options = options || {};

		if (!offset.x && !offset.y) {
			return this;
		}

		if (!this._panAnim) {
			this._panAnim = new L.PosAnimation();

			this._panAnim.on({
				'step': this._onPanTransitionStep,
				'end': this._onPanTransitionEnd
			}, this);
		}

		// don't fire movestart if animating inertia
		if (!options.noMoveStart) {
			this.fire('movestart');
		}

		// animate pan unless animate: false specified
		if (options.animate !== false) {
			L.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');

			var newPos = this._getMapPanePos().subtract(offset);
			this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
		} else {
			this._rawPanBy(offset);
			this.fire('move').fire('moveend');
		}

		return this;
	},

	_onPanTransitionStep: function () {
		this.fire('move');
	},

	_onPanTransitionEnd: function () {
		L.DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
		this.fire('moveend');
	},

	_tryAnimatedPan: function (center, options) {
		// difference between the new and current centers in pixels
		var offset = this._getCenterOffset(center)._floor();

		// don't animate too far unless animate: true specified in options
		if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

		this.panBy(offset, options);

		return true;
	}
});


/*
 * L.PosAnimation fallback implementation that powers Leaflet pan animations
 * in browsers that don't support CSS3 Transitions.
 */

L.PosAnimation = L.DomUtil.TRANSITION ? L.PosAnimation : L.PosAnimation.extend({

	run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
		this.stop();

		this._el = el;
		this._inProgress = true;
		this._duration = duration || 0.25;
		this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

		this._startPos = L.DomUtil.getPosition(el);
		this._offset = newPos.subtract(this._startPos);
		this._startTime = +new Date();

		this.fire('start');

		this._animate();
	},

	stop: function () {
		if (!this._inProgress) { return; }

		this._step();
		this._complete();
	},

	_animate: function () {
		// animation loop
		this._animId = L.Util.requestAnimFrame(this._animate, this);
		this._step();
	},

	_step: function () {
		var elapsed = (+new Date()) - this._startTime,
		    duration = this._duration * 1000;

		if (elapsed < duration) {
			this._runFrame(this._easeOut(elapsed / duration));
		} else {
			this._runFrame(1);
			this._complete();
		}
	},

	_runFrame: function (progress) {
		var pos = this._startPos.add(this._offset.multiplyBy(progress));
		L.DomUtil.setPosition(this._el, pos);

		this.fire('step');
	},

	_complete: function () {
		L.Util.cancelAnimFrame(this._animId);

		this._inProgress = false;
		this.fire('end');
	},

	_easeOut: function (t) {
		return 1 - Math.pow(1 - t, this._easeOutPower);
	}
});


/*
 * Extends L.Map to handle zoom animations.
 */

L.Map.mergeOptions({
	zoomAnimation: true,
	zoomAnimationThreshold: 4
});

if (L.DomUtil.TRANSITION) {

	L.Map.addInitHook(function () {
		// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
		this._zoomAnimated = this.options.zoomAnimation && L.DomUtil.TRANSITION &&
				L.Browser.any3d && !L.Browser.android23 && !L.Browser.mobileOpera;

		// zoom transitions run with the same duration for all layers, so if one of transitionend events
		// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
		if (this._zoomAnimated) {
			L.DomEvent.on(this._mapPane, L.DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
		}
	});
}

L.Map.include(!L.DomUtil.TRANSITION ? {} : {

	_catchTransitionEnd: function (e) {
		if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
			this._onZoomTransitionEnd();
		}
	},

	_nothingToAnimate: function () {
		return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
	},

	_tryAnimatedZoom: function (center, zoom, options) {

		if (this._animatingZoom) { return true; }

		options = options || {};

		// don't animate if disabled, not supported or zoom difference is too large
		if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
		        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

		// offset is the pixel coords of the zoom origin relative to the current center
		var scale = this.getZoomScale(zoom),
		    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale),
			origin = this._getCenterLayerPoint()._add(offset);

		// don't animate if the zoom origin isn't within one screen from the current center, unless forced
		if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

		this
		    .fire('movestart')
		    .fire('zoomstart');

		this._animateZoom(center, zoom, origin, scale, null, true);

		return true;
	},

	_animateZoom: function (center, zoom, origin, scale, delta, backwards, forTouchZoom) {

		if (!forTouchZoom) {
			this._animatingZoom = true;
		}

		// put transform transition on all layers with leaflet-zoom-animated class
		L.DomUtil.addClass(this._mapPane, 'leaflet-zoom-anim');

		// remember what center/zoom to set after animation
		this._animateToCenter = center;
		this._animateToZoom = zoom;

		// disable any dragging during animation
		if (L.Draggable) {
			L.Draggable._disabled = true;
		}

		L.Util.requestAnimFrame(function () {
			this.fire('zoomanim', {
				center: center,
				zoom: zoom,
				origin: origin,
				scale: scale,
				delta: delta,
				backwards: backwards
			});
			// horrible hack to work around a Chrome bug https://github.com/Leaflet/Leaflet/issues/3689
			setTimeout(L.bind(this._onZoomTransitionEnd, this), 250);
		}, this);
	},

	_onZoomTransitionEnd: function () {
		if (!this._animatingZoom) { return; }

		this._animatingZoom = false;

		L.DomUtil.removeClass(this._mapPane, 'leaflet-zoom-anim');

		L.Util.requestAnimFrame(function () {
			this._resetView(this._animateToCenter, this._animateToZoom, true, true);

			if (L.Draggable) {
				L.Draggable._disabled = false;
			}
		}, this);
	}
});


/*
	Zoom animation logic for L.TileLayer.
*/

L.TileLayer.include({
	_animateZoom: function (e) {
		if (!this._animating) {
			this._animating = true;
			this._prepareBgBuffer();
		}

		var bg = this._bgBuffer,
		    transform = L.DomUtil.TRANSFORM,
		    initialTransform = e.delta ? L.DomUtil.getTranslateString(e.delta) : bg.style[transform],
		    scaleStr = L.DomUtil.getScaleString(e.scale, e.origin);

		bg.style[transform] = e.backwards ?
				scaleStr + ' ' + initialTransform :
				initialTransform + ' ' + scaleStr;
	},

	_endZoomAnim: function () {
		var front = this._tileContainer,
		    bg = this._bgBuffer;

		front.style.visibility = '';
		front.parentNode.appendChild(front); // Bring to fore

		// force reflow
		L.Util.falseFn(bg.offsetWidth);

		var zoom = this._map.getZoom();
		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			this._clearBgBuffer();
		}

		this._animating = false;
	},

	_clearBgBuffer: function () {
		var map = this._map;

		if (map && !map._animatingZoom && !map.touchZoom._zooming) {
			this._bgBuffer.innerHTML = '';
			this._bgBuffer.style[L.DomUtil.TRANSFORM] = '';
		}
	},

	_prepareBgBuffer: function () {

		var front = this._tileContainer,
		    bg = this._bgBuffer;

		// if foreground layer doesn't have many tiles but bg layer does,
		// keep the existing bg layer and just zoom it some more

		var bgLoaded = this._getLoadedTilesPercentage(bg),
		    frontLoaded = this._getLoadedTilesPercentage(front);

		if (bg && bgLoaded > 0.5 && frontLoaded < 0.5) {

			front.style.visibility = 'hidden';
			this._stopLoadingImages(front);
			return;
		}

		// prepare the buffer to become the front tile pane
		bg.style.visibility = 'hidden';
		bg.style[L.DomUtil.TRANSFORM] = '';

		// switch out the current layer to be the new bg layer (and vice-versa)
		this._tileContainer = bg;
		bg = this._bgBuffer = front;

		this._stopLoadingImages(bg);

		//prevent bg buffer from clearing right after zoom
		clearTimeout(this._clearBgBufferTimer);
	},

	_getLoadedTilesPercentage: function (container) {
		var tiles = container.getElementsByTagName('img'),
		    i, len, count = 0;

		for (i = 0, len = tiles.length; i < len; i++) {
			if (tiles[i].complete) {
				count++;
			}
		}
		return count / len;
	},

	// stops loading all tiles in the background layer
	_stopLoadingImages: function (container) {
		var tiles = Array.prototype.slice.call(container.getElementsByTagName('img')),
		    i, len, tile;

		for (i = 0, len = tiles.length; i < len; i++) {
			tile = tiles[i];

			if (!tile.complete) {
				tile.onload = L.Util.falseFn;
				tile.onerror = L.Util.falseFn;
				tile.src = L.Util.emptyImageUrl;

				tile.parentNode.removeChild(tile);
			}
		}
	}
});


/*
 * Provides L.Map with convenient shortcuts for using browser geolocation features.
 */

L.Map.include({
	_defaultLocateOptions: {
		watch: false,
		setView: false,
		maxZoom: Infinity,
		timeout: 10000,
		maximumAge: 0,
		enableHighAccuracy: false
	},

	locate: function (/*Object*/ options) {

		options = this._locateOptions = L.extend(this._defaultLocateOptions, options);

		if (!navigator.geolocation) {
			this._handleGeolocationError({
				code: 0,
				message: 'Geolocation not supported.'
			});
			return this;
		}

		var onResponse = L.bind(this._handleGeolocationResponse, this),
			onError = L.bind(this._handleGeolocationError, this);

		if (options.watch) {
			this._locationWatchId =
			        navigator.geolocation.watchPosition(onResponse, onError, options);
		} else {
			navigator.geolocation.getCurrentPosition(onResponse, onError, options);
		}
		return this;
	},

	stopLocate: function () {
		if (navigator.geolocation) {
			navigator.geolocation.clearWatch(this._locationWatchId);
		}
		if (this._locateOptions) {
			this._locateOptions.setView = false;
		}
		return this;
	},

	_handleGeolocationError: function (error) {
		var c = error.code,
		    message = error.message ||
		            (c === 1 ? 'permission denied' :
		            (c === 2 ? 'position unavailable' : 'timeout'));

		if (this._locateOptions.setView && !this._loaded) {
			this.fitWorld();
		}

		this.fire('locationerror', {
			code: c,
			message: 'Geolocation error: ' + message + '.'
		});
	},

	_handleGeolocationResponse: function (pos) {
		var lat = pos.coords.latitude,
		    lng = pos.coords.longitude,
		    latlng = new L.LatLng(lat, lng),

		    latAccuracy = 180 * pos.coords.accuracy / 40075017,
		    lngAccuracy = latAccuracy / Math.cos(L.LatLng.DEG_TO_RAD * lat),

		    bounds = L.latLngBounds(
		            [lat - latAccuracy, lng - lngAccuracy],
		            [lat + latAccuracy, lng + lngAccuracy]),

		    options = this._locateOptions;

		if (options.setView) {
			var zoom = Math.min(this.getBoundsZoom(bounds), options.maxZoom);
			this.setView(latlng, zoom);
		}

		var data = {
			latlng: latlng,
			bounds: bounds,
			timestamp: pos.timestamp
		};

		for (var i in pos.coords) {
			if (typeof pos.coords[i] === 'number') {
				data[i] = pos.coords[i];
			}
		}

		this.fire('locationfound', data);
	}
});


}(window, document));

},{}],"/Users/w8r/Projects/Leaflet.Path.Drag/src/MultiPoly.Drag.js":[function(require,module,exports){
(function() {

  // listen and propagate dragstart on sub-layers
  L.FeatureGroup.EVENTS += ' dragstart';

  function wrapMethod(klasses, methodName, method) {
    for (var i = 0, len = klasses.length; i < len; i++) {
      var klass = klasses[i];
      klass.prototype['_' + methodName] = klass.prototype[methodName];
      klass.prototype[methodName] = method;
    }
  }

  /**
   * @param {L.Polygon|L.Polyline} layer
   * @return {L.MultiPolygon|L.MultiPolyline}
   */
  function addLayer(layer) {
    if (this.hasLayer(layer)) {
      return this;
    }
    layer
      .on('drag', this._onDrag, this)
      .on('dragend', this._onDragEnd, this);
    return this._addLayer.call(this, layer);
  }

  /**
   * @param  {L.Polygon|L.Polyline} layer
   * @return {L.MultiPolygon|L.MultiPolyline}
   */
  function removeLayer(layer) {
    if (!this.hasLayer(layer)) {
      return this;
    }
    layer
      .off('drag', this._onDrag, this)
      .off('dragend', this._onDragEnd, this);
    return this._removeLayer.call(this, layer);
  }

  // duck-type methods to listen to the drag events
  wrapMethod([L.MultiPolygon, L.MultiPolyline], 'addLayer', addLayer);
  wrapMethod([L.MultiPolygon, L.MultiPolyline], 'removeLayer', removeLayer);

  var dragMethods = {
    _onDrag: function(evt) {
      var layer = evt.target;
      this.eachLayer(function(otherLayer) {
        if (otherLayer !== layer) {
          otherLayer._applyTransform(layer.dragging._matrix);
        }
      });

      this._propagateEvent(evt);
    },

    _onDragEnd: function(evt) {
      var layer = evt.target;

      this.eachLayer(function(otherLayer) {
        if (otherLayer !== layer) {
          otherLayer._resetTransform();
          otherLayer.dragging._transformPoints(layer.dragging._matrix);
        }
      });

      this._propagateEvent(evt);
    }
  };

  L.MultiPolygon.include(dragMethods);
  L.MultiPolyline.include(dragMethods);

})();

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

  statics: {
    DRAGGABLE_CLS: 'leaflet-path-draggable'
  },

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
    this._dragInProgress = false;

    /**
     * @type {Boolean}
     */
    this._dragMoved = false;

  },


  /**
   * Enable dragging
   */
  addHooks: function() {
    var className = L.Handler.PathDrag.DRAGGABLE_CLS;
    var path      = this._path._path;

    this._path.on('mousedown', this._onDragStart, this);
    this._path.options.className =
      (this._path.options.className || '') + ' ' + className;

    if (!L.Path.CANVAS && path) {
      L.DomUtil.addClass(path, className);
    }
  },


  /**
   * Disable dragging
   */
  removeHooks: function() {
    var className = L.Handler.PathDrag.DRAGGABLE_CLS;
    var path      = this._path._path;

    this._path.off('mousedown', this._onDragStart, this);
    this._path.options.className =
      (this._path.options.className || '').replace(className, '');

    if (!L.Path.CANVAS && path) {
      L.DomUtil.removeClass(path, className);
    }
    this._dragMoved = false;
  },


  /**
   * @return {Boolean}
   */
  moved: function() {
    return this._dragMoved;
  },


  /**
   * If dragging currently in progress.
   *
   * @return {Boolean}
   */
  inProgress: function() {
    return this._dragInProgress;
  },


  /**
   * Start drag
   * @param  {L.MouseEvent} evt
   */
  _onDragStart: function(evt) {
    this._dragInProgress = true;
    this._startPoint = evt.containerPoint.clone();
    this._dragStartPoint = evt.containerPoint.clone();
    this._matrix = [1, 0, 0, 1, 0, 0];

    if(this._path._point) {
      this._point = this._path._point.clone();
    }

    this._path._map
      .on('mousemove', this._onDrag, this)
      .on('mouseup', this._onDragEnd, this)
    this._dragMoved = false;
  },


  /**
   * Dragging
   * @param  {L.MouseEvent} evt
   */
  _onDrag: function(evt) {
    var x = evt.containerPoint.x;
    var y = evt.containerPoint.y;

    var matrix     = this._matrix;
    var path       = this._path;
    var startPoint = this._startPoint;

    var dx = x - startPoint.x;
    var dy = y - startPoint.y;

    if (!this._dragMoved && (dx || dy)) {
      this._dragMoved = true;
      path.fire('dragstart');

      if (path._popup) {
        path._popup._close();
        path.off('click', path._openPopup, path);
      }
    }

    matrix[4] += dx;
    matrix[5] += dy;

    startPoint.x = x;
    startPoint.y = y;

    path._applyTransform(matrix);

    if (path._point) { // L.Circle, L.CircleMarker
      path._point.x = this._point.x + matrix[4];
      path._point.y = this._point.y + matrix[5];
    }

    path.fire('drag');
    L.DomEvent.stop(evt.originalEvent);
  },


  /**
   * Dragging stopped, apply
   * @param  {L.MouseEvent} evt
   */
  _onDragEnd: function(evt) {
    L.DomEvent.stop(evt);
    L.DomEvent._fakeStop({ type: 'click' });

    this._dragInProgress = false;
    // undo container transform
    this._path._resetTransform();
    // apply matrix
    this._transformPoints(this._matrix);

    this._path._map
      .off('mousemove', this._onDrag, this)
      .off('mouseup', this._onDragEnd, this);

    // consistency
    this._path.fire('dragend', {
      distance: Math.sqrt(
        L.LineUtil._sqDist(this._dragStartPoint, evt.containerPoint)
      )
    });

    if (this._path._popup) {
      L.Util.requestAnimFrame(function() {
        this._path.on('click', this._path._openPopup, this._path);
      }, this);
    }

    this._matrix = null;
    this._startPoint = null;
    this._point = null;
    this._dragStartPoint = null;
  },


  /**
   * Transforms point according to the provided transformation matrix.
   *
   *  @param {Array.<Number>} matrix
   *  @param {L.LatLng} point
   */
  _transformPoint: function(point, matrix) {
    var path = this._path;

    var px = L.point(matrix[4], matrix[5]);

    var crs = path._map.options.crs;
    var transformation = crs.transformation;
    var scale = crs.scale(path._map.getZoom());
    var projection = crs.projection;

    var diff = transformation.untransform(px, scale)
      .subtract(transformation.untransform(L.point(0, 0), scale));

    return projection.unproject(projection.project(point)._add(diff));
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
      path._point = this._point._add(px);
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


// Init hook instead of replacing the `initEvents`
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

/*
 * Return transformed points in case if dragging is enabled and in progress,
 * otherwise - call original method.
 *
 * For L.Circle and L.Polyline
 */

// don't like this? me neither, but I like it even less
// when the original methods are not exposed
L.Circle.prototype._getLatLng = L.Circle.prototype.getLatLng;
L.Circle.prototype.getLatLng = function() {
  if (this.dragging && this.dragging.inProgress()) {
    return this.dragging._transformPoint(this._latlng, this.dragging._matrix);
  } else {
    return this._getLatLng();
  }
};


L.Polyline.prototype._getLatLngs = L.Polyline.prototype.getLatLngs;
L.Polyline.prototype.getLatLngs = function() {
  if (this.dragging && this.dragging.inProgress()) {
    var matrix = this.dragging._matrix;
    var points = this._getLatLngs();
    for (var i = 0, len = points.length; i < len; i++) {
      points[i] = this.dragging._transformPoint(points[i], matrix);
    }
    return points;
  } else {
    return this._getLatLngs();
  }
};

},{}],"/Users/w8r/Projects/Leaflet.Path.Drag/src/Path.Transform.js":[function(require,module,exports){
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

},{}]},{},["/Users/w8r/Projects/Leaflet.Path.Drag/example/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiZXhhbXBsZS9qcy9hcHAuanMiLCJpbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sZWFmbGV0L2Rpc3QvbGVhZmxldC1zcmMuanMiLCJzcmMvTXVsdGlQb2x5LkRyYWcuanMiLCJzcmMvUGF0aC5EcmFnLmpzIiwic3JjL1BhdGguVHJhbnNmb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoOVJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEwgPSBnbG9iYWwuTCB8fCByZXF1aXJlKCdsZWFmbGV0Jyk7XG52YXIgRHJhZ0hhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9pbmRleCcpO1xuXG5MLkljb24uRGVmYXVsdC5pbWFnZVBhdGggPSBcImh0dHA6Ly9jZG4ubGVhZmxldGpzLmNvbS9sZWFmbGV0LTAuNy9pbWFnZXNcIjtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBtYXAgPSBnbG9iYWwubWFwID0gbmV3IEwuTWFwKCdtYXAnLCB7XG4gIC8vIGNyczogTC5DUlMuRVBTRzQzMjYgLy8gdGhhdCB3YXMgdGVzdGVkIGFzIHdlbGxcbn0pLnNldFZpZXcoWzIyLjQyNjU4LCAxMTQuMTk1Ml0sIDExKTtcblxuTC50aWxlTGF5ZXIoJ2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcbiAgYXR0cmlidXRpb246ICcmY29weTsgJyArXG4gICAgJzxhIGhyZWY9XCJodHRwOi8vb3NtLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXG59KS5hZGRUbyhtYXApO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gaW50ZXJwb2xhdGVBcnIoYXJyYXksIGluc2VydCkge1xuICB2YXIgcmVzID0gW107XG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24ocCwgaSwgYXJyKSB7XG4gICAgcmVzLnB1c2gocC5jb25jYXQoKSk7XG5cbiAgICBpZiAoaSA8IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICB2YXIgZGlmZiA9IFthcnJbaSArIDFdWzBdIC0gcFswXSwgYXJyW2kgKyAxXVsxXSAtIHBbMV1dO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBpbnNlcnQ7IGkrKykge1xuICAgICAgICByZXMucHVzaChbcFswXSArIChkaWZmWzBdICogaSkgLyBpbnNlcnQsIHBbMV0gKyAoZGlmZlsxXSAqIGkpIC8gaW5zZXJ0XSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIHBvbHlnb24gPSBnbG9iYWwucG9seWdvbiA9IG5ldyBMLlBvbHlnb24oXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoXG5cbiAgICAvLyB+IDEzIDAwMCBwb2ludHNcbiAgICBpbnRlcnBvbGF0ZUFycihbXG4gICAgICBbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdLFxuICAgICAgWzExMy45ODY1ODc1MjQ0MTQwNSwgMjIuMzgzNzMwMDg1OTI0OTVdLFxuICAgICAgWzExNC4wMTI2ODAwNTM3MTA5NCwgMjIuMzY5MTI2Mzk3NTQ1ODg3XSxcbiAgICAgIFsxMTQuMDI3Nzg2MjU0ODgyODEsIDIyLjM4NTYzNDgwMTg1NzE4XSxcbiAgICAgIFsxMTQuMDQ3MDEyMzI5MTAxNTYsIDIyLjM5NTE1Nzk5MDI5MDc1NV0sXG4gICAgICBbMTE0LjA2MDA1ODU5Mzc1LCAyMi40MTM1Njc2MzgzNjk4MDVdLFxuICAgICAgWzExNC4wNjI4MDUxNzU3ODEyNSwgMjIuNDMyNjA5NTM0ODc2Nzk2XSxcbiAgICAgIFsxMTQuMDQ4Mzg1NjIwMTE3MTcsIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG4gICAgICBbMTE0LjA0Mjg5MjQ1NjA1NDY5LCAyMi40NDg0NzU3ODY1NjU0NF0sXG4gICAgICBbMTE0LjAzMjU5Mjc3MzQzNzQ5LCAyMi40NDQ2NjgwNTE2NTcxNTddLFxuICAgICAgWzExNC4wMTk1NDY1MDg3ODkwNiwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICAgIFsxMTMuOTk2MjAwNTYxNTIzNDQsIDIyLjQzNjQxNzYwMDc2MzExNF0sXG4gICAgICBbMTEzLjk4MTc4MTAwNTg1OTM4LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuICAgICAgWzExMy45NzY5NzQ0ODczMDQ2OSwgMjIuNDAzNDEwODkyNzEyMTI0XVxuICAgIF0sIDEwMDApXG4gICksIHtcbiAgICBjb2xvcjogJyNmMDAnLFxuICAgIGRyYWdnYWJsZTogdHJ1ZVxuICB9KS5hZGRUbyhtYXApO1xuXG52YXIgcG9seWxpbmUgPSBnbG9iYWwucG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExNC4xNDMxNDI3MDAxOTUzMSwgMjIuNDk0Nzk0ODQ5NzU0NDNdLFxuICAgIFsxMTQuMTUzNDQyMzgyODEyNSwgMjIuNDg1OTEyOTQyMzIwOTU4XSxcbiAgICBbMTE0LjE1MjA2OTA5MTc5Njg4LCAyMi40NzMyMjM1MTQ0NzgxXSxcbiAgICBbMTE0LjE0OTMyMjUwOTc2NTYxLCAyMi40NTk4OTgzNjM5NDM4OTNdLFxuICAgIFsxMTQuMTU5NjIyMTkyMzgyODEsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgWzExNC4xNjk5MjE4NzUsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgWzExNC4xOTM5NTQ0Njc3NzM0NCwgMjIuNDU5ODk4MzYzOTQzODkzXSxcbiAgICBbMTE0LjIwNjMxNDA4NjkxNDA2LCAyMi40NjExNjc0ODExMDkzNV0sXG4gICAgWzExNC4yMTE4MDcyNTA5NzY1NSwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICBbMTE0LjIyNDE2Njg3MDExNzE5LCAyMi40NzEzMjAwMDAwMDk5OTJdLFxuICAgIFsxMTQuMjM3MjEzMTM0NzY1NjIsIDIyLjQ3NjM5NTk4MDQ1Nzk3M10sXG4gICAgWzExNC4yNDIwMTk2NTMzMjAzMSwgMjIuNDkzNTI2MDQwNzM3MjJdLFxuICAgIFsxMTQuMjMwMzQ2Njc5Njg3NSwgMjIuNTE1NzI4NTE4MzAzNTFdLFxuICAgIFsxMTQuMjE3OTg3MDYwNTQ2ODgsIDIyLjUyNDYwODUxMTAyNjI2Ml0sXG4gICAgWzExNC4yMDc2ODczNzc5Mjk2OSwgMjIuNTI0NjA4NTExMDI2MjYyXSxcbiAgICBbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MzYwMjQ4MDU4ODY5NzRdXG4gIF0pLCB7XG4gICAgd2VpZ2h0OiAxNSxcbiAgICBkcmFnZ2FibGU6IHRydWVcbiAgfSkuYWRkVG8obWFwKTtcblxudmFyIHBvbHlnb25XaXRoSG9sZSA9IGdsb2JhbC5wb2x5Z29uV2l0aEhvbGUgPSBuZXcgTC5Qb2x5Z29uKFxuICAgIFtcbiAgICAgIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQxMjkzMjg2MzUxNzcxN10sXG4gICAgICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQwMDg3MTU5MDMwNTk1XSxcbiAgICAgICAgWzExNC4yOTAwODQ4Mzg4NjcxNywgMjIuMzg4ODA5MjcwNDU1NTZdLFxuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi4zODI0NjAyNjA4MTU3MTZdLFxuICAgICAgICBbMTE0LjMxODkyMzk1MDE5NTMxLCAyMi4zOTE5ODM2NjY2MDI3ODNdLFxuICAgICAgICBbMTE0LjMyMzA0MzgyMzI0MjE5LCAyMi4zODA1NTU1MDE0MjE1MzNdLFxuICAgICAgICBbMTE0LjM0Mjk1NjU0Mjk2ODc1LCAyMi4zNzI5MzYyMDMxMTM4MzhdLFxuICAgICAgICBbMTE0LjMzNDcxNjc5Njg3NSwgMjIuMzg0MzY0OTk0MTMzMzAzXSxcbiAgICAgICAgWzExNC4zMzA1OTY5MjM4MjgxMiwgMjIuMzkzODg4MjY5NTExMTk0XSxcbiAgICAgICAgWzExNC4zMjE2NzA1MzIyMjY1NSwgMjIuNDAwODcxNTkwMzA1OTVdLFxuICAgICAgICBbMTE0LjMyNzg1MDM0MTc5Njg4LCAyMi40MTM1Njc2MzgzNjk4MDVdLFxuICAgICAgICBbMTE0LjMzMTk3MDIxNDg0Mzc1LCAyMi40MjQ5OTMwODk2NDcyMl0sXG4gICAgICAgIFsxMTQuMzI1NzkwNDA1MjczNDQsIDIyLjQzMDcwNTQ2Mjc0ODkxOF0sXG4gICAgICAgIFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQzOTU5MDkwOTE3MjY2XSxcbiAgICAgICAgWzExNC4zMzc0NjMzNzg5MDYyNCwgMjIuNDQ5MTEwMzk4ODg2MTA2XSxcbiAgICAgICAgWzExNC4zMzU0MDM0NDIzODI4MSwgMjIuNDYxODAyMDM1MzMzOTkyXSxcbiAgICAgICAgWzExNC4zMjUxMDM3NTk3NjU2MiwgMjIuNDY0MzQwMjIzMTc3MTE4XSxcbiAgICAgICAgWzExNC4zMjkyMjM2MzI4MTI0OSwgMjIuNDcyNTg5MDEyNTYxOTU0XSxcbiAgICAgICAgWzExNC4zMjM3MzA0Njg3NSwgMjIuNDc3MDMwNDY0OTMzMzA3XSxcbiAgICAgICAgWzExNC4zMTk2MTA1OTU3MDMxMiwgMjIuNDc4OTMzOTAwOTE2OTI4XSxcbiAgICAgICAgWzExNC4zMDE3NTc4MTI1LCAyMi40NjYyNDM4MzM1NDk0NDVdLFxuICAgICAgICBbMTE0LjMwMjQ0NDQ1ODAwNzgxLCAyMi40NTczNjAwOTQ3NTAwODNdLFxuICAgICAgICBbMTE0LjI5MjgzMTQyMDg5ODQ0LCAyMi40NTQ4MjE3NzkwNzU4MzJdLFxuICAgICAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi40NTEwMTQyMTg0MjI2OV0sXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDQyNzY0MTQ1MDAxNzA3XSxcbiAgICAgICAgWzExNC4yOTA3NzE0ODQzNzQ5OSwgMjIuNDI4MTY2NjU5Mjc5NjE1XSxcbiAgICAgICAgWzExNC4yNzcwMzg1NzQyMTg3NSwgMjIuNDIwNTQ5OTcwMjkwODc1XSxcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40MTI5MzI4NjM1MTc3MTddXG4gICAgICBdKSxcbiAgICAgIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi40MzM4Nzg5MDE3ODI5N10sXG4gICAgICAgIFsxMTQuMjkzNTE4MDY2NDA2MjUsIDIyLjQxNDIwMjQxMDMyMTMwMl0sXG4gICAgICAgIFsxMTQuMzA1ODc3Njg1NTQ2ODYsIDIyLjQwODQ4OTM1ODM0MjYzNV0sXG4gICAgICAgIFsxMTQuMzIyMzU3MTc3NzM0MzgsIDIyLjQyMTE4NDcxMDMzMTg1OF0sXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XVxuICAgICAgXSlcbiAgICBdLCB7XG4gICAgICBkcmFnZ2FibGU6IHRydWVcbiAgICB9XG4gIClcbiAgLmFkZFRvKG1hcCk7XG5cbnZhciBjaXJjbGUgPSBuZXcgTC5DaXJjbGUoWzIyLjM2MDg5NzI0MDEzMjM3MywgMTE0LjE0NTIwMjYzNjcxODc1XSwgNDAwMCwge1xuICAgIGRyYWdnYWJsZTogdHJ1ZVxuICB9KVxuICAuYmluZFBvcHVwKFwiTC5DaXJjbGVcIilcbiAgLmFkZFRvKG1hcClcblxudmFyIGNpcmNsZU1hcmtlciA9IG5ldyBMLkNpcmNsZU1hcmtlcihtYXAuZ2V0Q2VudGVyKCksIHtcbiAgICBkcmFnZ2FibGU6IHRydWVcbiAgfSlcbiAgLmJpbmRQb3B1cChcIkwuQ2lyY2xlTWFya2VyXCIpXG4gIC5hZGRUbyhtYXApO1xuXG52YXIgbXVsdGlQb2x5Z29uID0gZ2xvYmFsLm11bHRpUG9seWdvbiA9IG5ldyBMLk11bHRpUG9seWdvbihbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjA1NjI3NDQxNDA2MjUsIDIyLjMyMDg1OTg0MTAwNTkzXSxcbiAgICBbMTE0LjIxNTkyNzEyNDAyMzQ0LCAyMi4zNTI2MTYwMzU1MTIxNV0sXG4gICAgWzExNC4yNjQ2Nzg5NTUwNzgxMiwgMjIuMzUxMzQ1OTI2NjA2OTU3XSxcbiAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjMyNDAzNTc4NTg0MDM4XSxcbiAgICBbMTE0LjI5MjE0NDc3NTM5MDYyLCAyMi4zMjcyMTE2NTgzODg5M10sXG4gICAgWzExNC4zMDE3NTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjk0MjA0NzExOTE0MDYsIDIyLjI5MTAwMjQyNzczNTMyNV0sXG4gICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuMjcyNTc2NTg1NDEzNDc1XSxcbiAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi4yNjE3NzQxMDA5NzQzNV0sXG4gICAgWzExNC4yNjg3OTg4MjgxMjUsIDIyLjI4MTQ3MjEyMjc4MzgxOF0sXG4gICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi4yOTQ4MTQzNjc3ODA1MThdLFxuICAgIFsxMTQuMjY5NDg1NDczNjMyODEsIDIyLjMwMjQzNzkzNTkwNDQ4XSxcbiAgICBbMTE0LjI3MDE3MjExOTE0MDYyLCAyMi4zMTUxNDI5NTgxNjkzOV0sXG4gICAgWzExNC4yNTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjQ3NTEyODE3MzgyODEsIDIyLjI5OTg5Njc5Mjc1MTkyN10sXG4gICAgWzExNC4yNDU0NTI4ODA4NTkzOCwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjIyOTY2MDAzNDE3OTY5LCAyMi4zMDc1MjAwODM1MjI0NzZdLFxuICAgIFsxMTQuMjIwNzMzNjQyNTc4MTIsIDIyLjMwNTYxNDI5OTgzNzA0Nl0sXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl0sXG4gICAgWzExNC4zMjAyOTcyNDEyMTA5NCwgMjIuMzI2NTc2NDg5NjYyNDgyXSxcbiAgICBbMTE0LjMyOTkxMDI3ODMyMDMxLCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzMzMzQzNTA1ODU5MzgsIDIyLjMzMjI5MjkwNDA5MTcxNl0sXG4gICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzQyNDU0ODQwMTQ2NV0sXG4gICAgWzExNC4zMTU0OTA3MjI2NTYyNSwgMjIuMzM5Mjc5MzE0NjgzMTJdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdLFxuICAgIFsxMTQuMjgxMTU4NDQ3MjY1NjIsIDIyLjI1MTYwNjI5NTEzMjk0OF0sXG4gICAgWzExNC4yODY2NTE2MTEzMjgxMiwgMjIuMjU1NDE5MzA4ODU4NTU2XSxcbiAgICBbMTE0LjI5OTY5Nzg3NTk3NjU2LCAyMi4yNjExMzg2MzQ3NDQ0OV0sXG4gICAgWzExNC4yOTYyNjQ2NDg0Mzc1LCAyMi4yNTA5NzA3ODI3NTA4NjZdLFxuICAgIFsxMTQuMjk0ODkxMzU3NDIxODgsIDIyLjI0MDgwMjE5MjQ2MzM1XSxcbiAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4yMzg4OTU0OTk2MTMyMzJdLFxuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF1cbiAgXSlcbl0sIHtcbiAgZHJhZ2dhYmxlOiB0cnVlLFxuICBjb2xvcjogJyMwOTInXG59KS5iaW5kUG9wdXAoJ011bHRpUG9seWdvbicpLmFkZFRvKG1hcCk7XG5cbnZhciBtdWx0aVBvbHlsaW5lID0gZ2xvYmFsLm11bHRpUG9seWxpbmUgPSBuZXcgTC5NdWx0aVBvbHlsaW5lKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExMy44OTg2OTY4OTk0MTQwNiwgMjIuMzk5NjAxOTIxNzA2OTUzXSxcbiAgICBbMTEzLjg5ODAxMDI1MzkwNjI1LCAyMi40MjI0NTQxODE3MDk3MDddLFxuICAgIFsxMTMuOTAzNTAzNDE3OTY4NzUsIDIyLjQzMzI0NDIxOTc4MTE3XSxcbiAgICBbMTEzLjkwOTY4MzIyNzUzOTA2LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgIFsxMTMuOTA2OTM2NjQ1NTA3ODEsIDIyLjQ3ODI5OTQyNTE2Mjg1Ml0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAyMi40ODg0NTA2ODgzMjU0MDhdLFxuICAgIFsxMTMuOTMzNzE1ODIwMzEyNSwgMjIuNDgzMzc1MTQ5Nzg5NjIzXSxcbiAgICBbMTEzLjk0NDcwMjE0ODQzNzUsIDIyLjQ5MjI1NzIyMDA4NTE5M10sXG4gICAgWzExMy45NTIyNTUyNDkwMjM0NCwgMjIuNTEyNTU2OTU0MDUxNDVdXG4gIF0pLFxuXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODY3Nzk3ODUxNTYyNSwgMjIuMzkyNjE4NTM3MTM3MzhdLFxuICAgIFsxMTMuODY5MTcxMTQyNTc4MTEsIDIyLjQyNzUzMTk1MTE1Njk5XSxcbiAgICBbMTEzLjkyMzQxNjEzNzY5NTMsIDIyLjQ2MjQzNjU4NjY1MzE0OF0sXG4gICAgWzExMy45NDgxMzUzNzU5NzY1NiwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICBbMTEzLjk3ODM0Nzc3ODMyMDMsIDIyLjQ5OTIzNTU4OTY4MzA2XSxcbiAgICBbMTEzLjk5Njg4NzIwNzAzMTI1LCAyMi41MTE5MjI2MzI0Njg4Nl0sXG4gICAgWzExNC4wMTMzNjY2OTkyMTg3NSwgMjIuNTAxMTM4NzIwMzAwMjU0XSxcbiAgICBbMTE0LjAyNTAzOTY3Mjg1MTU1LCAyMi41MDgxMTY2NDE4NTM2NzVdXG4gIF0pXG5dLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZSxcbiAgY29sb3I6ICcjZTkwJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlsaW5lJykuYWRkVG8obWFwKTtcbiIsInJlcXVpcmUoJy4vc3JjL1BhdGguVHJhbnNmb3JtJyk7XG5yZXF1aXJlKCcuL3NyYy9QYXRoLkRyYWcnKTtcbnJlcXVpcmUoJy4vc3JjL011bHRpUG9seS5EcmFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTC5QYXRoLkRyYWc7XG4iLCIvKlxyXG4gTGVhZmxldCwgYSBKYXZhU2NyaXB0IGxpYnJhcnkgZm9yIG1vYmlsZS1mcmllbmRseSBpbnRlcmFjdGl2ZSBtYXBzLiBodHRwOi8vbGVhZmxldGpzLmNvbVxyXG4gKGMpIDIwMTAtMjAxMywgVmxhZGltaXIgQWdhZm9ua2luXHJcbiAoYykgMjAxMC0yMDExLCBDbG91ZE1hZGVcclxuKi9cclxuKGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpIHtcclxudmFyIG9sZEwgPSB3aW5kb3cuTCxcclxuICAgIEwgPSB7fTtcclxuXHJcbkwudmVyc2lvbiA9ICcwLjcuNyc7XHJcblxyXG4vLyBkZWZpbmUgTGVhZmxldCBmb3IgTm9kZSBtb2R1bGUgcGF0dGVybiBsb2FkZXJzLCBpbmNsdWRpbmcgQnJvd3NlcmlmeVxyXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xyXG5cdG1vZHVsZS5leHBvcnRzID0gTDtcclxuXHJcbi8vIGRlZmluZSBMZWFmbGV0IGFzIGFuIEFNRCBtb2R1bGVcclxufSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcclxuXHRkZWZpbmUoTCk7XHJcbn1cclxuXHJcbi8vIGRlZmluZSBMZWFmbGV0IGFzIGEgZ2xvYmFsIEwgdmFyaWFibGUsIHNhdmluZyB0aGUgb3JpZ2luYWwgTCB0byByZXN0b3JlIGxhdGVyIGlmIG5lZWRlZFxyXG5cclxuTC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xyXG5cdHdpbmRvdy5MID0gb2xkTDtcclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcbndpbmRvdy5MID0gTDtcclxuXHJcblxyXG4vKlxyXG4gKiBMLlV0aWwgY29udGFpbnMgdmFyaW91cyB1dGlsaXR5IGZ1bmN0aW9ucyB1c2VkIHRocm91Z2hvdXQgTGVhZmxldCBjb2RlLlxyXG4gKi9cclxuXHJcbkwuVXRpbCA9IHtcclxuXHRleHRlbmQ6IGZ1bmN0aW9uIChkZXN0KSB7IC8vIChPYmplY3RbLCBPYmplY3QsIC4uLl0pIC0+XHJcblx0XHR2YXIgc291cmNlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXHJcblx0XHQgICAgaSwgaiwgbGVuLCBzcmM7XHJcblxyXG5cdFx0Zm9yIChqID0gMCwgbGVuID0gc291cmNlcy5sZW5ndGg7IGogPCBsZW47IGorKykge1xyXG5cdFx0XHRzcmMgPSBzb3VyY2VzW2pdIHx8IHt9O1xyXG5cdFx0XHRmb3IgKGkgaW4gc3JjKSB7XHJcblx0XHRcdFx0aWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG5cdFx0XHRcdFx0ZGVzdFtpXSA9IHNyY1tpXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBkZXN0O1xyXG5cdH0sXHJcblxyXG5cdGJpbmQ6IGZ1bmN0aW9uIChmbiwgb2JqKSB7IC8vIChGdW5jdGlvbiwgT2JqZWN0KSAtPiBGdW5jdGlvblxyXG5cdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoID4gMiA/IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikgOiBudWxsO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGZuLmFwcGx5KG9iaiwgYXJncyB8fCBhcmd1bWVudHMpO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRzdGFtcDogKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBsYXN0SWQgPSAwLFxyXG5cdFx0ICAgIGtleSA9ICdfbGVhZmxldF9pZCc7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKG9iaikge1xyXG5cdFx0XHRvYmpba2V5XSA9IG9ialtrZXldIHx8ICsrbGFzdElkO1xyXG5cdFx0XHRyZXR1cm4gb2JqW2tleV07XHJcblx0XHR9O1xyXG5cdH0oKSksXHJcblxyXG5cdGludm9rZUVhY2g6IGZ1bmN0aW9uIChvYmosIG1ldGhvZCwgY29udGV4dCkge1xyXG5cdFx0dmFyIGksIGFyZ3M7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpO1xyXG5cclxuXHRcdFx0Zm9yIChpIGluIG9iaikge1xyXG5cdFx0XHRcdG1ldGhvZC5hcHBseShjb250ZXh0LCBbaSwgb2JqW2ldXS5jb25jYXQoYXJncykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHRsaW1pdEV4ZWNCeUludGVydmFsOiBmdW5jdGlvbiAoZm4sIHRpbWUsIGNvbnRleHQpIHtcclxuXHRcdHZhciBsb2NrLCBleGVjT25VbmxvY2s7XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIHdyYXBwZXJGbigpIHtcclxuXHRcdFx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcblxyXG5cdFx0XHRpZiAobG9jaykge1xyXG5cdFx0XHRcdGV4ZWNPblVubG9jayA9IHRydWU7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsb2NrID0gdHJ1ZTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGxvY2sgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0aWYgKGV4ZWNPblVubG9jaykge1xyXG5cdFx0XHRcdFx0d3JhcHBlckZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdFx0ZXhlY09uVW5sb2NrID0gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCB0aW1lKTtcclxuXHJcblx0XHRcdGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHRmYWxzZUZuOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0Zm9ybWF0TnVtOiBmdW5jdGlvbiAobnVtLCBkaWdpdHMpIHtcclxuXHRcdHZhciBwb3cgPSBNYXRoLnBvdygxMCwgZGlnaXRzIHx8IDUpO1xyXG5cdFx0cmV0dXJuIE1hdGgucm91bmQobnVtICogcG93KSAvIHBvdztcclxuXHR9LFxyXG5cclxuXHR0cmltOiBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHRyZXR1cm4gc3RyLnRyaW0gPyBzdHIudHJpbSgpIDogc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcclxuXHR9LFxyXG5cclxuXHRzcGxpdFdvcmRzOiBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHRyZXR1cm4gTC5VdGlsLnRyaW0oc3RyKS5zcGxpdCgvXFxzKy8pO1xyXG5cdH0sXHJcblxyXG5cdHNldE9wdGlvbnM6IGZ1bmN0aW9uIChvYmosIG9wdGlvbnMpIHtcclxuXHRcdG9iai5vcHRpb25zID0gTC5leHRlbmQoe30sIG9iai5vcHRpb25zLCBvcHRpb25zKTtcclxuXHRcdHJldHVybiBvYmoub3B0aW9ucztcclxuXHR9LFxyXG5cclxuXHRnZXRQYXJhbVN0cmluZzogZnVuY3Rpb24gKG9iaiwgZXhpc3RpbmdVcmwsIHVwcGVyY2FzZSkge1xyXG5cdFx0dmFyIHBhcmFtcyA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSBpbiBvYmopIHtcclxuXHRcdFx0cGFyYW1zLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHVwcGVyY2FzZSA/IGkudG9VcHBlckNhc2UoKSA6IGkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtpXSkpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuICgoIWV4aXN0aW5nVXJsIHx8IGV4aXN0aW5nVXJsLmluZGV4T2YoJz8nKSA9PT0gLTEpID8gJz8nIDogJyYnKSArIHBhcmFtcy5qb2luKCcmJyk7XHJcblx0fSxcclxuXHR0ZW1wbGF0ZTogZnVuY3Rpb24gKHN0ciwgZGF0YSkge1xyXG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9cXHsgKihbXFx3X10rKSAqXFx9L2csIGZ1bmN0aW9uIChzdHIsIGtleSkge1xyXG5cdFx0XHR2YXIgdmFsdWUgPSBkYXRhW2tleV07XHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdObyB2YWx1ZSBwcm92aWRlZCBmb3IgdmFyaWFibGUgJyArIHN0cik7XHJcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XHJcblx0XHRcdFx0dmFsdWUgPSB2YWx1ZShkYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRpc0FycmF5OiBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmopIHtcclxuXHRcdHJldHVybiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XScpO1xyXG5cdH0sXHJcblxyXG5cdGVtcHR5SW1hZ2VVcmw6ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUFEL0FDd0FBQUFBQVFBQkFBQUNBRHM9J1xyXG59O1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHJcblx0Ly8gaW5zcGlyZWQgYnkgaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cclxuXHJcblx0ZnVuY3Rpb24gZ2V0UHJlZml4ZWQobmFtZSkge1xyXG5cdFx0dmFyIGksIGZuLFxyXG5cdFx0ICAgIHByZWZpeGVzID0gWyd3ZWJraXQnLCAnbW96JywgJ28nLCAnbXMnXTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoICYmICFmbjsgaSsrKSB7XHJcblx0XHRcdGZuID0gd2luZG93W3ByZWZpeGVzW2ldICsgbmFtZV07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZuO1xyXG5cdH1cclxuXHJcblx0dmFyIGxhc3RUaW1lID0gMDtcclxuXHJcblx0ZnVuY3Rpb24gdGltZW91dERlZmVyKGZuKSB7XHJcblx0XHR2YXIgdGltZSA9ICtuZXcgRGF0ZSgpLFxyXG5cdFx0ICAgIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtICh0aW1lIC0gbGFzdFRpbWUpKTtcclxuXHJcblx0XHRsYXN0VGltZSA9IHRpbWUgKyB0aW1lVG9DYWxsO1xyXG5cdFx0cmV0dXJuIHdpbmRvdy5zZXRUaW1lb3V0KGZuLCB0aW1lVG9DYWxsKTtcclxuXHR9XHJcblxyXG5cdHZhciByZXF1ZXN0Rm4gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcblx0ICAgICAgICBnZXRQcmVmaXhlZCgnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJykgfHwgdGltZW91dERlZmVyO1xyXG5cclxuXHR2YXIgY2FuY2VsRm4gPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgfHxcclxuXHQgICAgICAgIGdldFByZWZpeGVkKCdDYW5jZWxBbmltYXRpb25GcmFtZScpIHx8XHJcblx0ICAgICAgICBnZXRQcmVmaXhlZCgnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJykgfHxcclxuXHQgICAgICAgIGZ1bmN0aW9uIChpZCkgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KGlkKTsgfTtcclxuXHJcblxyXG5cdEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lID0gZnVuY3Rpb24gKGZuLCBjb250ZXh0LCBpbW1lZGlhdGUsIGVsZW1lbnQpIHtcclxuXHRcdGZuID0gTC5iaW5kKGZuLCBjb250ZXh0KTtcclxuXHJcblx0XHRpZiAoaW1tZWRpYXRlICYmIHJlcXVlc3RGbiA9PT0gdGltZW91dERlZmVyKSB7XHJcblx0XHRcdGZuKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gcmVxdWVzdEZuLmNhbGwod2luZG93LCBmbiwgZWxlbWVudCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0TC5VdGlsLmNhbmNlbEFuaW1GcmFtZSA9IGZ1bmN0aW9uIChpZCkge1xyXG5cdFx0aWYgKGlkKSB7XHJcblx0XHRcdGNhbmNlbEZuLmNhbGwod2luZG93LCBpZCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcbn0oKSk7XHJcblxyXG4vLyBzaG9ydGN1dHMgZm9yIG1vc3QgdXNlZCB1dGlsaXR5IGZ1bmN0aW9uc1xyXG5MLmV4dGVuZCA9IEwuVXRpbC5leHRlbmQ7XHJcbkwuYmluZCA9IEwuVXRpbC5iaW5kO1xyXG5MLnN0YW1wID0gTC5VdGlsLnN0YW1wO1xyXG5MLnNldE9wdGlvbnMgPSBMLlV0aWwuc2V0T3B0aW9ucztcclxuXHJcblxyXG4vKlxyXG4gKiBMLkNsYXNzIHBvd2VycyB0aGUgT09QIGZhY2lsaXRpZXMgb2YgdGhlIGxpYnJhcnkuXHJcbiAqIFRoYW5rcyB0byBKb2huIFJlc2lnIGFuZCBEZWFuIEVkd2FyZHMgZm9yIGluc3BpcmF0aW9uIVxyXG4gKi9cclxuXHJcbkwuQ2xhc3MgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHJcbkwuQ2xhc3MuZXh0ZW5kID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcblxyXG5cdC8vIGV4dGVuZGVkIGNsYXNzIHdpdGggdGhlIG5ldyBwcm90b3R5cGVcclxuXHR2YXIgTmV3Q2xhc3MgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0Ly8gY2FsbCB0aGUgY29uc3RydWN0b3JcclxuXHRcdGlmICh0aGlzLmluaXRpYWxpemUpIHtcclxuXHRcdFx0dGhpcy5pbml0aWFsaXplLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gY2FsbCBhbGwgY29uc3RydWN0b3IgaG9va3NcclxuXHRcdGlmICh0aGlzLl9pbml0SG9va3MpIHtcclxuXHRcdFx0dGhpcy5jYWxsSW5pdEhvb2tzKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0Ly8gaW5zdGFudGlhdGUgY2xhc3Mgd2l0aG91dCBjYWxsaW5nIGNvbnN0cnVjdG9yXHJcblx0dmFyIEYgPSBmdW5jdGlvbiAoKSB7fTtcclxuXHRGLnByb3RvdHlwZSA9IHRoaXMucHJvdG90eXBlO1xyXG5cclxuXHR2YXIgcHJvdG8gPSBuZXcgRigpO1xyXG5cdHByb3RvLmNvbnN0cnVjdG9yID0gTmV3Q2xhc3M7XHJcblxyXG5cdE5ld0NsYXNzLnByb3RvdHlwZSA9IHByb3RvO1xyXG5cclxuXHQvL2luaGVyaXQgcGFyZW50J3Mgc3RhdGljc1xyXG5cdGZvciAodmFyIGkgaW4gdGhpcykge1xyXG5cdFx0aWYgKHRoaXMuaGFzT3duUHJvcGVydHkoaSkgJiYgaSAhPT0gJ3Byb3RvdHlwZScpIHtcclxuXHRcdFx0TmV3Q2xhc3NbaV0gPSB0aGlzW2ldO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly8gbWl4IHN0YXRpYyBwcm9wZXJ0aWVzIGludG8gdGhlIGNsYXNzXHJcblx0aWYgKHByb3BzLnN0YXRpY3MpIHtcclxuXHRcdEwuZXh0ZW5kKE5ld0NsYXNzLCBwcm9wcy5zdGF0aWNzKTtcclxuXHRcdGRlbGV0ZSBwcm9wcy5zdGF0aWNzO1xyXG5cdH1cclxuXHJcblx0Ly8gbWl4IGluY2x1ZGVzIGludG8gdGhlIHByb3RvdHlwZVxyXG5cdGlmIChwcm9wcy5pbmNsdWRlcykge1xyXG5cdFx0TC5VdGlsLmV4dGVuZC5hcHBseShudWxsLCBbcHJvdG9dLmNvbmNhdChwcm9wcy5pbmNsdWRlcykpO1xyXG5cdFx0ZGVsZXRlIHByb3BzLmluY2x1ZGVzO1xyXG5cdH1cclxuXHJcblx0Ly8gbWVyZ2Ugb3B0aW9uc1xyXG5cdGlmIChwcm9wcy5vcHRpb25zICYmIHByb3RvLm9wdGlvbnMpIHtcclxuXHRcdHByb3BzLm9wdGlvbnMgPSBMLmV4dGVuZCh7fSwgcHJvdG8ub3B0aW9ucywgcHJvcHMub3B0aW9ucyk7XHJcblx0fVxyXG5cclxuXHQvLyBtaXggZ2l2ZW4gcHJvcGVydGllcyBpbnRvIHRoZSBwcm90b3R5cGVcclxuXHRMLmV4dGVuZChwcm90bywgcHJvcHMpO1xyXG5cclxuXHRwcm90by5faW5pdEhvb2tzID0gW107XHJcblxyXG5cdHZhciBwYXJlbnQgPSB0aGlzO1xyXG5cdC8vIGpzaGludCBjYW1lbGNhc2U6IGZhbHNlXHJcblx0TmV3Q2xhc3MuX19zdXBlcl9fID0gcGFyZW50LnByb3RvdHlwZTtcclxuXHJcblx0Ly8gYWRkIG1ldGhvZCBmb3IgY2FsbGluZyBhbGwgaG9va3NcclxuXHRwcm90by5jYWxsSW5pdEhvb2tzID0gZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmICh0aGlzLl9pbml0SG9va3NDYWxsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0aWYgKHBhcmVudC5wcm90b3R5cGUuY2FsbEluaXRIb29rcykge1xyXG5cdFx0XHRwYXJlbnQucHJvdG90eXBlLmNhbGxJbml0SG9va3MuY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pbml0SG9va3NDYWxsZWQgPSB0cnVlO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSBwcm90by5faW5pdEhvb2tzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdHByb3RvLl9pbml0SG9va3NbaV0uY2FsbCh0aGlzKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRyZXR1cm4gTmV3Q2xhc3M7XHJcbn07XHJcblxyXG5cclxuLy8gbWV0aG9kIGZvciBhZGRpbmcgcHJvcGVydGllcyB0byBwcm90b3R5cGVcclxuTC5DbGFzcy5pbmNsdWRlID0gZnVuY3Rpb24gKHByb3BzKSB7XHJcblx0TC5leHRlbmQodGhpcy5wcm90b3R5cGUsIHByb3BzKTtcclxufTtcclxuXHJcbi8vIG1lcmdlIG5ldyBkZWZhdWx0IG9wdGlvbnMgdG8gdGhlIENsYXNzXHJcbkwuQ2xhc3MubWVyZ2VPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRMLmV4dGVuZCh0aGlzLnByb3RvdHlwZS5vcHRpb25zLCBvcHRpb25zKTtcclxufTtcclxuXHJcbi8vIGFkZCBhIGNvbnN0cnVjdG9yIGhvb2tcclxuTC5DbGFzcy5hZGRJbml0SG9vayA9IGZ1bmN0aW9uIChmbikgeyAvLyAoRnVuY3Rpb24pIHx8IChTdHJpbmcsIGFyZ3MuLi4pXHJcblx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xyXG5cclxuXHR2YXIgaW5pdCA9IHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyA/IGZuIDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpc1tmbl0uYXBwbHkodGhpcywgYXJncyk7XHJcblx0fTtcclxuXHJcblx0dGhpcy5wcm90b3R5cGUuX2luaXRIb29rcyA9IHRoaXMucHJvdG90eXBlLl9pbml0SG9va3MgfHwgW107XHJcblx0dGhpcy5wcm90b3R5cGUuX2luaXRIb29rcy5wdXNoKGluaXQpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuTWl4aW4uRXZlbnRzIGlzIHVzZWQgdG8gYWRkIGN1c3RvbSBldmVudHMgZnVuY3Rpb25hbGl0eSB0byBMZWFmbGV0IGNsYXNzZXMuXHJcbiAqL1xyXG5cclxudmFyIGV2ZW50c0tleSA9ICdfbGVhZmxldF9ldmVudHMnO1xyXG5cclxuTC5NaXhpbiA9IHt9O1xyXG5cclxuTC5NaXhpbi5FdmVudHMgPSB7XHJcblxyXG5cdGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uICh0eXBlcywgZm4sIGNvbnRleHQpIHsgLy8gKFN0cmluZywgRnVuY3Rpb25bLCBPYmplY3RdKSBvciAoT2JqZWN0WywgT2JqZWN0XSlcclxuXHJcblx0XHQvLyB0eXBlcyBjYW4gYmUgYSBtYXAgb2YgdHlwZXMvaGFuZGxlcnNcclxuXHRcdGlmIChMLlV0aWwuaW52b2tlRWFjaCh0eXBlcywgdGhpcy5hZGRFdmVudExpc3RlbmVyLCB0aGlzLCBmbiwgY29udGV4dCkpIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHR2YXIgZXZlbnRzID0gdGhpc1tldmVudHNLZXldID0gdGhpc1tldmVudHNLZXldIHx8IHt9LFxyXG5cdFx0ICAgIGNvbnRleHRJZCA9IGNvbnRleHQgJiYgY29udGV4dCAhPT0gdGhpcyAmJiBMLnN0YW1wKGNvbnRleHQpLFxyXG5cdFx0ICAgIGksIGxlbiwgZXZlbnQsIHR5cGUsIGluZGV4S2V5LCBpbmRleExlbktleSwgdHlwZUluZGV4O1xyXG5cclxuXHRcdC8vIHR5cGVzIGNhbiBiZSBhIHN0cmluZyBvZiBzcGFjZS1zZXBhcmF0ZWQgd29yZHNcclxuXHRcdHR5cGVzID0gTC5VdGlsLnNwbGl0V29yZHModHlwZXMpO1xyXG5cclxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IHR5cGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGV2ZW50ID0ge1xyXG5cdFx0XHRcdGFjdGlvbjogZm4sXHJcblx0XHRcdFx0Y29udGV4dDogY29udGV4dCB8fCB0aGlzXHJcblx0XHRcdH07XHJcblx0XHRcdHR5cGUgPSB0eXBlc1tpXTtcclxuXHJcblx0XHRcdGlmIChjb250ZXh0SWQpIHtcclxuXHRcdFx0XHQvLyBzdG9yZSBsaXN0ZW5lcnMgb2YgYSBwYXJ0aWN1bGFyIGNvbnRleHQgaW4gYSBzZXBhcmF0ZSBoYXNoIChpZiBpdCBoYXMgYW4gaWQpXHJcblx0XHRcdFx0Ly8gZ2l2ZXMgYSBtYWpvciBwZXJmb3JtYW5jZSBib29zdCB3aGVuIHJlbW92aW5nIHRob3VzYW5kcyBvZiBtYXAgbGF5ZXJzXHJcblxyXG5cdFx0XHRcdGluZGV4S2V5ID0gdHlwZSArICdfaWR4JztcclxuXHRcdFx0XHRpbmRleExlbktleSA9IGluZGV4S2V5ICsgJ19sZW4nO1xyXG5cclxuXHRcdFx0XHR0eXBlSW5kZXggPSBldmVudHNbaW5kZXhLZXldID0gZXZlbnRzW2luZGV4S2V5XSB8fCB7fTtcclxuXHJcblx0XHRcdFx0aWYgKCF0eXBlSW5kZXhbY29udGV4dElkXSkge1xyXG5cdFx0XHRcdFx0dHlwZUluZGV4W2NvbnRleHRJZF0gPSBbXTtcclxuXHJcblx0XHRcdFx0XHQvLyBrZWVwIHRyYWNrIG9mIHRoZSBudW1iZXIgb2Yga2V5cyBpbiB0aGUgaW5kZXggdG8gcXVpY2tseSBjaGVjayBpZiBpdCdzIGVtcHR5XHJcblx0XHRcdFx0XHRldmVudHNbaW5kZXhMZW5LZXldID0gKGV2ZW50c1tpbmRleExlbktleV0gfHwgMCkgKyAxO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dHlwZUluZGV4W2NvbnRleHRJZF0ucHVzaChldmVudCk7XHJcblxyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRldmVudHNbdHlwZV0gPSBldmVudHNbdHlwZV0gfHwgW107XHJcblx0XHRcdFx0ZXZlbnRzW3R5cGVdLnB1c2goZXZlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0aGFzRXZlbnRMaXN0ZW5lcnM6IGZ1bmN0aW9uICh0eXBlKSB7IC8vIChTdHJpbmcpIC0+IEJvb2xlYW5cclxuXHRcdHZhciBldmVudHMgPSB0aGlzW2V2ZW50c0tleV07XHJcblx0XHRyZXR1cm4gISFldmVudHMgJiYgKCh0eXBlIGluIGV2ZW50cyAmJiBldmVudHNbdHlwZV0ubGVuZ3RoID4gMCkgfHxcclxuXHRcdCAgICAgICAgICAgICAgICAgICAgKHR5cGUgKyAnX2lkeCcgaW4gZXZlbnRzICYmIGV2ZW50c1t0eXBlICsgJ19pZHhfbGVuJ10gPiAwKSk7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gKHR5cGVzLCBmbiwgY29udGV4dCkgeyAvLyAoW1N0cmluZywgRnVuY3Rpb24sIE9iamVjdF0pIG9yIChPYmplY3RbLCBPYmplY3RdKVxyXG5cclxuXHRcdGlmICghdGhpc1tldmVudHNLZXldKSB7XHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdHlwZXMpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuY2xlYXJBbGxFdmVudExpc3RlbmVycygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChMLlV0aWwuaW52b2tlRWFjaCh0eXBlcywgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyLCB0aGlzLCBmbiwgY29udGV4dCkpIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHR2YXIgZXZlbnRzID0gdGhpc1tldmVudHNLZXldLFxyXG5cdFx0ICAgIGNvbnRleHRJZCA9IGNvbnRleHQgJiYgY29udGV4dCAhPT0gdGhpcyAmJiBMLnN0YW1wKGNvbnRleHQpLFxyXG5cdFx0ICAgIGksIGxlbiwgdHlwZSwgbGlzdGVuZXJzLCBqLCBpbmRleEtleSwgaW5kZXhMZW5LZXksIHR5cGVJbmRleCwgcmVtb3ZlZDtcclxuXHJcblx0XHR0eXBlcyA9IEwuVXRpbC5zcGxpdFdvcmRzKHR5cGVzKTtcclxuXHJcblx0XHRmb3IgKGkgPSAwLCBsZW4gPSB0eXBlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHR0eXBlID0gdHlwZXNbaV07XHJcblx0XHRcdGluZGV4S2V5ID0gdHlwZSArICdfaWR4JztcclxuXHRcdFx0aW5kZXhMZW5LZXkgPSBpbmRleEtleSArICdfbGVuJztcclxuXHJcblx0XHRcdHR5cGVJbmRleCA9IGV2ZW50c1tpbmRleEtleV07XHJcblxyXG5cdFx0XHRpZiAoIWZuKSB7XHJcblx0XHRcdFx0Ly8gY2xlYXIgYWxsIGxpc3RlbmVycyBmb3IgYSB0eXBlIGlmIGZ1bmN0aW9uIGlzbid0IHNwZWNpZmllZFxyXG5cdFx0XHRcdGRlbGV0ZSBldmVudHNbdHlwZV07XHJcblx0XHRcdFx0ZGVsZXRlIGV2ZW50c1tpbmRleEtleV07XHJcblx0XHRcdFx0ZGVsZXRlIGV2ZW50c1tpbmRleExlbktleV07XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGxpc3RlbmVycyA9IGNvbnRleHRJZCAmJiB0eXBlSW5kZXggPyB0eXBlSW5kZXhbY29udGV4dElkXSA6IGV2ZW50c1t0eXBlXTtcclxuXHJcblx0XHRcdFx0aWYgKGxpc3RlbmVycykge1xyXG5cdFx0XHRcdFx0Zm9yIChqID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XHJcblx0XHRcdFx0XHRcdGlmICgobGlzdGVuZXJzW2pdLmFjdGlvbiA9PT0gZm4pICYmICghY29udGV4dCB8fCAobGlzdGVuZXJzW2pdLmNvbnRleHQgPT09IGNvbnRleHQpKSkge1xyXG5cdFx0XHRcdFx0XHRcdHJlbW92ZWQgPSBsaXN0ZW5lcnMuc3BsaWNlKGosIDEpO1xyXG5cdFx0XHRcdFx0XHRcdC8vIHNldCB0aGUgb2xkIGFjdGlvbiB0byBhIG5vLW9wLCBiZWNhdXNlIGl0IGlzIHBvc3NpYmxlXHJcblx0XHRcdFx0XHRcdFx0Ly8gdGhhdCB0aGUgbGlzdGVuZXIgaXMgYmVpbmcgaXRlcmF0ZWQgb3ZlciBhcyBwYXJ0IG9mIGEgZGlzcGF0Y2hcclxuXHRcdFx0XHRcdFx0XHRyZW1vdmVkWzBdLmFjdGlvbiA9IEwuVXRpbC5mYWxzZUZuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYgKGNvbnRleHQgJiYgdHlwZUluZGV4ICYmIChsaXN0ZW5lcnMubGVuZ3RoID09PSAwKSkge1xyXG5cdFx0XHRcdFx0XHRkZWxldGUgdHlwZUluZGV4W2NvbnRleHRJZF07XHJcblx0XHRcdFx0XHRcdGV2ZW50c1tpbmRleExlbktleV0tLTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRjbGVhckFsbEV2ZW50TGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRkZWxldGUgdGhpc1tldmVudHNLZXldO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0ZmlyZUV2ZW50OiBmdW5jdGlvbiAodHlwZSwgZGF0YSkgeyAvLyAoU3RyaW5nWywgT2JqZWN0XSlcclxuXHRcdGlmICghdGhpcy5oYXNFdmVudExpc3RlbmVycyh0eXBlKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZXZlbnQgPSBMLlV0aWwuZXh0ZW5kKHt9LCBkYXRhLCB7IHR5cGU6IHR5cGUsIHRhcmdldDogdGhpcyB9KTtcclxuXHJcblx0XHR2YXIgZXZlbnRzID0gdGhpc1tldmVudHNLZXldLFxyXG5cdFx0ICAgIGxpc3RlbmVycywgaSwgbGVuLCB0eXBlSW5kZXgsIGNvbnRleHRJZDtcclxuXHJcblx0XHRpZiAoZXZlbnRzW3R5cGVdKSB7XHJcblx0XHRcdC8vIG1ha2Ugc3VyZSBhZGRpbmcvcmVtb3ZpbmcgbGlzdGVuZXJzIGluc2lkZSBvdGhlciBsaXN0ZW5lcnMgd29uJ3QgY2F1c2UgaW5maW5pdGUgbG9vcFxyXG5cdFx0XHRsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV0uc2xpY2UoKTtcclxuXHJcblx0XHRcdGZvciAoaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdGxpc3RlbmVyc1tpXS5hY3Rpb24uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgZXZlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZmlyZSBldmVudCBmb3IgdGhlIGNvbnRleHQtaW5kZXhlZCBsaXN0ZW5lcnMgYXMgd2VsbFxyXG5cdFx0dHlwZUluZGV4ID0gZXZlbnRzW3R5cGUgKyAnX2lkeCddO1xyXG5cclxuXHRcdGZvciAoY29udGV4dElkIGluIHR5cGVJbmRleCkge1xyXG5cdFx0XHRsaXN0ZW5lcnMgPSB0eXBlSW5kZXhbY29udGV4dElkXS5zbGljZSgpO1xyXG5cclxuXHRcdFx0aWYgKGxpc3RlbmVycykge1xyXG5cdFx0XHRcdGZvciAoaSA9IDAsIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdFx0bGlzdGVuZXJzW2ldLmFjdGlvbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBldmVudCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0YWRkT25lVGltZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uICh0eXBlcywgZm4sIGNvbnRleHQpIHtcclxuXHJcblx0XHRpZiAoTC5VdGlsLmludm9rZUVhY2godHlwZXMsIHRoaXMuYWRkT25lVGltZUV2ZW50TGlzdGVuZXIsIHRoaXMsIGZuLCBjb250ZXh0KSkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdHZhciBoYW5kbGVyID0gTC5iaW5kKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dGhpc1xyXG5cdFx0XHQgICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZXMsIGZuLCBjb250ZXh0KVxyXG5cdFx0XHQgICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZXMsIGhhbmRsZXIsIGNvbnRleHQpO1xyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXNcclxuXHRcdCAgICAuYWRkRXZlbnRMaXN0ZW5lcih0eXBlcywgZm4sIGNvbnRleHQpXHJcblx0XHQgICAgLmFkZEV2ZW50TGlzdGVuZXIodHlwZXMsIGhhbmRsZXIsIGNvbnRleHQpO1xyXG5cdH1cclxufTtcclxuXHJcbkwuTWl4aW4uRXZlbnRzLm9uID0gTC5NaXhpbi5FdmVudHMuYWRkRXZlbnRMaXN0ZW5lcjtcclxuTC5NaXhpbi5FdmVudHMub2ZmID0gTC5NaXhpbi5FdmVudHMucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcclxuTC5NaXhpbi5FdmVudHMub25jZSA9IEwuTWl4aW4uRXZlbnRzLmFkZE9uZVRpbWVFdmVudExpc3RlbmVyO1xyXG5MLk1peGluLkV2ZW50cy5maXJlID0gTC5NaXhpbi5FdmVudHMuZmlyZUV2ZW50O1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuQnJvd3NlciBoYW5kbGVzIGRpZmZlcmVudCBicm93c2VyIGFuZCBmZWF0dXJlIGRldGVjdGlvbnMgZm9yIGludGVybmFsIExlYWZsZXQgdXNlLlxyXG4gKi9cclxuXHJcbihmdW5jdGlvbiAoKSB7XHJcblxyXG5cdHZhciBpZSA9ICdBY3RpdmVYT2JqZWN0JyBpbiB3aW5kb3csXHJcblx0XHRpZWx0OSA9IGllICYmICFkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyLFxyXG5cclxuXHQgICAgLy8gdGVycmlibGUgYnJvd3NlciBkZXRlY3Rpb24gdG8gd29yayBhcm91bmQgU2FmYXJpIC8gaU9TIC8gQW5kcm9pZCBicm93c2VyIGJ1Z3NcclxuXHQgICAgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksXHJcblx0ICAgIHdlYmtpdCA9IHVhLmluZGV4T2YoJ3dlYmtpdCcpICE9PSAtMSxcclxuXHQgICAgY2hyb21lID0gdWEuaW5kZXhPZignY2hyb21lJykgIT09IC0xLFxyXG5cdCAgICBwaGFudG9tanMgPSB1YS5pbmRleE9mKCdwaGFudG9tJykgIT09IC0xLFxyXG5cdCAgICBhbmRyb2lkID0gdWEuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSxcclxuXHQgICAgYW5kcm9pZDIzID0gdWEuc2VhcmNoKCdhbmRyb2lkIFsyM10nKSAhPT0gLTEsXHJcblx0XHRnZWNrbyA9IHVhLmluZGV4T2YoJ2dlY2tvJykgIT09IC0xLFxyXG5cclxuXHQgICAgbW9iaWxlID0gdHlwZW9mIG9yaWVudGF0aW9uICE9PSB1bmRlZmluZWQgKyAnJyxcclxuXHQgICAgbXNQb2ludGVyID0gIXdpbmRvdy5Qb2ludGVyRXZlbnQgJiYgd2luZG93Lk1TUG9pbnRlckV2ZW50LFxyXG5cdFx0cG9pbnRlciA9ICh3aW5kb3cuUG9pbnRlckV2ZW50ICYmIHdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQpIHx8XHJcblx0XHRcdFx0ICBtc1BvaW50ZXIsXHJcblx0ICAgIHJldGluYSA9ICgnZGV2aWNlUGl4ZWxSYXRpbycgaW4gd2luZG93ICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvID4gMSkgfHxcclxuXHQgICAgICAgICAgICAgKCdtYXRjaE1lZGlhJyBpbiB3aW5kb3cgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhtaW4tcmVzb2x1dGlvbjoxNDRkcGkpJykgJiZcclxuXHQgICAgICAgICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcobWluLXJlc29sdXRpb246MTQ0ZHBpKScpLm1hdGNoZXMpLFxyXG5cclxuXHQgICAgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG5cdCAgICBpZTNkID0gaWUgJiYgKCd0cmFuc2l0aW9uJyBpbiBkb2Muc3R5bGUpLFxyXG5cdCAgICB3ZWJraXQzZCA9ICgnV2ViS2l0Q1NTTWF0cml4JyBpbiB3aW5kb3cpICYmICgnbTExJyBpbiBuZXcgd2luZG93LldlYktpdENTU01hdHJpeCgpKSAmJiAhYW5kcm9pZDIzLFxyXG5cdCAgICBnZWNrbzNkID0gJ01velBlcnNwZWN0aXZlJyBpbiBkb2Muc3R5bGUsXHJcblx0ICAgIG9wZXJhM2QgPSAnT1RyYW5zaXRpb24nIGluIGRvYy5zdHlsZSxcclxuXHQgICAgYW55M2QgPSAhd2luZG93LkxfRElTQUJMRV8zRCAmJiAoaWUzZCB8fCB3ZWJraXQzZCB8fCBnZWNrbzNkIHx8IG9wZXJhM2QpICYmICFwaGFudG9tanM7XHJcblxyXG5cdHZhciB0b3VjaCA9ICF3aW5kb3cuTF9OT19UT1VDSCAmJiAhcGhhbnRvbWpzICYmIChwb2ludGVyIHx8ICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fFxyXG5cdFx0KHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKTtcclxuXHJcblx0TC5Ccm93c2VyID0ge1xyXG5cdFx0aWU6IGllLFxyXG5cdFx0aWVsdDk6IGllbHQ5LFxyXG5cdFx0d2Via2l0OiB3ZWJraXQsXHJcblx0XHRnZWNrbzogZ2Vja28gJiYgIXdlYmtpdCAmJiAhd2luZG93Lm9wZXJhICYmICFpZSxcclxuXHJcblx0XHRhbmRyb2lkOiBhbmRyb2lkLFxyXG5cdFx0YW5kcm9pZDIzOiBhbmRyb2lkMjMsXHJcblxyXG5cdFx0Y2hyb21lOiBjaHJvbWUsXHJcblxyXG5cdFx0aWUzZDogaWUzZCxcclxuXHRcdHdlYmtpdDNkOiB3ZWJraXQzZCxcclxuXHRcdGdlY2tvM2Q6IGdlY2tvM2QsXHJcblx0XHRvcGVyYTNkOiBvcGVyYTNkLFxyXG5cdFx0YW55M2Q6IGFueTNkLFxyXG5cclxuXHRcdG1vYmlsZTogbW9iaWxlLFxyXG5cdFx0bW9iaWxlV2Via2l0OiBtb2JpbGUgJiYgd2Via2l0LFxyXG5cdFx0bW9iaWxlV2Via2l0M2Q6IG1vYmlsZSAmJiB3ZWJraXQzZCxcclxuXHRcdG1vYmlsZU9wZXJhOiBtb2JpbGUgJiYgd2luZG93Lm9wZXJhLFxyXG5cclxuXHRcdHRvdWNoOiB0b3VjaCxcclxuXHRcdG1zUG9pbnRlcjogbXNQb2ludGVyLFxyXG5cdFx0cG9pbnRlcjogcG9pbnRlcixcclxuXHJcblx0XHRyZXRpbmE6IHJldGluYVxyXG5cdH07XHJcblxyXG59KCkpO1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuUG9pbnQgcmVwcmVzZW50cyBhIHBvaW50IHdpdGggeCBhbmQgeSBjb29yZGluYXRlcy5cclxuICovXHJcblxyXG5MLlBvaW50ID0gZnVuY3Rpb24gKC8qTnVtYmVyKi8geCwgLypOdW1iZXIqLyB5LCAvKkJvb2xlYW4qLyByb3VuZCkge1xyXG5cdHRoaXMueCA9IChyb3VuZCA/IE1hdGgucm91bmQoeCkgOiB4KTtcclxuXHR0aGlzLnkgPSAocm91bmQgPyBNYXRoLnJvdW5kKHkpIDogeSk7XHJcbn07XHJcblxyXG5MLlBvaW50LnByb3RvdHlwZSA9IHtcclxuXHJcblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludCh0aGlzLngsIHRoaXMueSk7XHJcblx0fSxcclxuXHJcblx0Ly8gbm9uLWRlc3RydWN0aXZlLCByZXR1cm5zIGEgbmV3IHBvaW50XHJcblx0YWRkOiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHJldHVybiB0aGlzLmNsb25lKCkuX2FkZChMLnBvaW50KHBvaW50KSk7XHJcblx0fSxcclxuXHJcblx0Ly8gZGVzdHJ1Y3RpdmUsIHVzZWQgZGlyZWN0bHkgZm9yIHBlcmZvcm1hbmNlIGluIHNpdHVhdGlvbnMgd2hlcmUgaXQncyBzYWZlIHRvIG1vZGlmeSBleGlzdGluZyBwb2ludFxyXG5cdF9hZGQ6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0dGhpcy54ICs9IHBvaW50Lng7XHJcblx0XHR0aGlzLnkgKz0gcG9pbnQueTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHN1YnRyYWN0OiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHJldHVybiB0aGlzLmNsb25lKCkuX3N1YnRyYWN0KEwucG9pbnQocG9pbnQpKTtcclxuXHR9LFxyXG5cclxuXHRfc3VidHJhY3Q6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0dGhpcy54IC09IHBvaW50Lng7XHJcblx0XHR0aGlzLnkgLT0gcG9pbnQueTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGRpdmlkZUJ5OiBmdW5jdGlvbiAobnVtKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jbG9uZSgpLl9kaXZpZGVCeShudW0pO1xyXG5cdH0sXHJcblxyXG5cdF9kaXZpZGVCeTogZnVuY3Rpb24gKG51bSkge1xyXG5cdFx0dGhpcy54IC89IG51bTtcclxuXHRcdHRoaXMueSAvPSBudW07XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRtdWx0aXBseUJ5OiBmdW5jdGlvbiAobnVtKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jbG9uZSgpLl9tdWx0aXBseUJ5KG51bSk7XHJcblx0fSxcclxuXHJcblx0X211bHRpcGx5Qnk6IGZ1bmN0aW9uIChudW0pIHtcclxuXHRcdHRoaXMueCAqPSBudW07XHJcblx0XHR0aGlzLnkgKj0gbnVtO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cm91bmQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmNsb25lKCkuX3JvdW5kKCk7XHJcblx0fSxcclxuXHJcblx0X3JvdW5kOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLnggPSBNYXRoLnJvdW5kKHRoaXMueCk7XHJcblx0XHR0aGlzLnkgPSBNYXRoLnJvdW5kKHRoaXMueSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRmbG9vcjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuY2xvbmUoKS5fZmxvb3IoKTtcclxuXHR9LFxyXG5cclxuXHRfZmxvb3I6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMueCA9IE1hdGguZmxvb3IodGhpcy54KTtcclxuXHRcdHRoaXMueSA9IE1hdGguZmxvb3IodGhpcy55KTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGRpc3RhbmNlVG86IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0cG9pbnQgPSBMLnBvaW50KHBvaW50KTtcclxuXHJcblx0XHR2YXIgeCA9IHBvaW50LnggLSB0aGlzLngsXHJcblx0XHQgICAgeSA9IHBvaW50LnkgLSB0aGlzLnk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcclxuXHR9LFxyXG5cclxuXHRlcXVhbHM6IGZ1bmN0aW9uIChwb2ludCkge1xyXG5cdFx0cG9pbnQgPSBMLnBvaW50KHBvaW50KTtcclxuXHJcblx0XHRyZXR1cm4gcG9pbnQueCA9PT0gdGhpcy54ICYmXHJcblx0XHQgICAgICAgcG9pbnQueSA9PT0gdGhpcy55O1xyXG5cdH0sXHJcblxyXG5cdGNvbnRhaW5zOiBmdW5jdGlvbiAocG9pbnQpIHtcclxuXHRcdHBvaW50ID0gTC5wb2ludChwb2ludCk7XHJcblxyXG5cdFx0cmV0dXJuIE1hdGguYWJzKHBvaW50LngpIDw9IE1hdGguYWJzKHRoaXMueCkgJiZcclxuXHRcdCAgICAgICBNYXRoLmFicyhwb2ludC55KSA8PSBNYXRoLmFicyh0aGlzLnkpO1xyXG5cdH0sXHJcblxyXG5cdHRvU3RyaW5nOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gJ1BvaW50KCcgK1xyXG5cdFx0ICAgICAgICBMLlV0aWwuZm9ybWF0TnVtKHRoaXMueCkgKyAnLCAnICtcclxuXHRcdCAgICAgICAgTC5VdGlsLmZvcm1hdE51bSh0aGlzLnkpICsgJyknO1xyXG5cdH1cclxufTtcclxuXHJcbkwucG9pbnQgPSBmdW5jdGlvbiAoeCwgeSwgcm91bmQpIHtcclxuXHRpZiAoeCBpbnN0YW5jZW9mIEwuUG9pbnQpIHtcclxuXHRcdHJldHVybiB4O1xyXG5cdH1cclxuXHRpZiAoTC5VdGlsLmlzQXJyYXkoeCkpIHtcclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludCh4WzBdLCB4WzFdKTtcclxuXHR9XHJcblx0aWYgKHggPT09IHVuZGVmaW5lZCB8fCB4ID09PSBudWxsKSB7XHJcblx0XHRyZXR1cm4geDtcclxuXHR9XHJcblx0cmV0dXJuIG5ldyBMLlBvaW50KHgsIHksIHJvdW5kKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkJvdW5kcyByZXByZXNlbnRzIGEgcmVjdGFuZ3VsYXIgYXJlYSBvbiB0aGUgc2NyZWVuIGluIHBpeGVsIGNvb3JkaW5hdGVzLlxyXG4gKi9cclxuXHJcbkwuQm91bmRzID0gZnVuY3Rpb24gKGEsIGIpIHsgLy8oUG9pbnQsIFBvaW50KSBvciBQb2ludFtdXHJcblx0aWYgKCFhKSB7IHJldHVybjsgfVxyXG5cclxuXHR2YXIgcG9pbnRzID0gYiA/IFthLCBiXSA6IGE7XHJcblxyXG5cdGZvciAodmFyIGkgPSAwLCBsZW4gPSBwb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdHRoaXMuZXh0ZW5kKHBvaW50c1tpXSk7XHJcblx0fVxyXG59O1xyXG5cclxuTC5Cb3VuZHMucHJvdG90eXBlID0ge1xyXG5cdC8vIGV4dGVuZCB0aGUgYm91bmRzIHRvIGNvbnRhaW4gdGhlIGdpdmVuIHBvaW50XHJcblx0ZXh0ZW5kOiBmdW5jdGlvbiAocG9pbnQpIHsgLy8gKFBvaW50KVxyXG5cdFx0cG9pbnQgPSBMLnBvaW50KHBvaW50KTtcclxuXHJcblx0XHRpZiAoIXRoaXMubWluICYmICF0aGlzLm1heCkge1xyXG5cdFx0XHR0aGlzLm1pbiA9IHBvaW50LmNsb25lKCk7XHJcblx0XHRcdHRoaXMubWF4ID0gcG9pbnQuY2xvbmUoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubWluLnggPSBNYXRoLm1pbihwb2ludC54LCB0aGlzLm1pbi54KTtcclxuXHRcdFx0dGhpcy5tYXgueCA9IE1hdGgubWF4KHBvaW50LngsIHRoaXMubWF4LngpO1xyXG5cdFx0XHR0aGlzLm1pbi55ID0gTWF0aC5taW4ocG9pbnQueSwgdGhpcy5taW4ueSk7XHJcblx0XHRcdHRoaXMubWF4LnkgPSBNYXRoLm1heChwb2ludC55LCB0aGlzLm1heC55KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGdldENlbnRlcjogZnVuY3Rpb24gKHJvdW5kKSB7IC8vIChCb29sZWFuKSAtPiBQb2ludFxyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KFxyXG5cdFx0ICAgICAgICAodGhpcy5taW4ueCArIHRoaXMubWF4LngpIC8gMixcclxuXHRcdCAgICAgICAgKHRoaXMubWluLnkgKyB0aGlzLm1heC55KSAvIDIsIHJvdW5kKTtcclxuXHR9LFxyXG5cclxuXHRnZXRCb3R0b21MZWZ0OiBmdW5jdGlvbiAoKSB7IC8vIC0+IFBvaW50XHJcblx0XHRyZXR1cm4gbmV3IEwuUG9pbnQodGhpcy5taW4ueCwgdGhpcy5tYXgueSk7XHJcblx0fSxcclxuXHJcblx0Z2V0VG9wUmlnaHQ6IGZ1bmN0aW9uICgpIHsgLy8gLT4gUG9pbnRcclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludCh0aGlzLm1heC54LCB0aGlzLm1pbi55KTtcclxuXHR9LFxyXG5cclxuXHRnZXRTaXplOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5tYXguc3VidHJhY3QodGhpcy5taW4pO1xyXG5cdH0sXHJcblxyXG5cdGNvbnRhaW5zOiBmdW5jdGlvbiAob2JqKSB7IC8vIChCb3VuZHMpIG9yIChQb2ludCkgLT4gQm9vbGVhblxyXG5cdFx0dmFyIG1pbiwgbWF4O1xyXG5cclxuXHRcdGlmICh0eXBlb2Ygb2JqWzBdID09PSAnbnVtYmVyJyB8fCBvYmogaW5zdGFuY2VvZiBMLlBvaW50KSB7XHJcblx0XHRcdG9iaiA9IEwucG9pbnQob2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iaiA9IEwuYm91bmRzKG9iaik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9iaiBpbnN0YW5jZW9mIEwuQm91bmRzKSB7XHJcblx0XHRcdG1pbiA9IG9iai5taW47XHJcblx0XHRcdG1heCA9IG9iai5tYXg7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtaW4gPSBtYXggPSBvYmo7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChtaW4ueCA+PSB0aGlzLm1pbi54KSAmJlxyXG5cdFx0ICAgICAgIChtYXgueCA8PSB0aGlzLm1heC54KSAmJlxyXG5cdFx0ICAgICAgIChtaW4ueSA+PSB0aGlzLm1pbi55KSAmJlxyXG5cdFx0ICAgICAgIChtYXgueSA8PSB0aGlzLm1heC55KTtcclxuXHR9LFxyXG5cclxuXHRpbnRlcnNlY3RzOiBmdW5jdGlvbiAoYm91bmRzKSB7IC8vIChCb3VuZHMpIC0+IEJvb2xlYW5cclxuXHRcdGJvdW5kcyA9IEwuYm91bmRzKGJvdW5kcyk7XHJcblxyXG5cdFx0dmFyIG1pbiA9IHRoaXMubWluLFxyXG5cdFx0ICAgIG1heCA9IHRoaXMubWF4LFxyXG5cdFx0ICAgIG1pbjIgPSBib3VuZHMubWluLFxyXG5cdFx0ICAgIG1heDIgPSBib3VuZHMubWF4LFxyXG5cdFx0ICAgIHhJbnRlcnNlY3RzID0gKG1heDIueCA+PSBtaW4ueCkgJiYgKG1pbjIueCA8PSBtYXgueCksXHJcblx0XHQgICAgeUludGVyc2VjdHMgPSAobWF4Mi55ID49IG1pbi55KSAmJiAobWluMi55IDw9IG1heC55KTtcclxuXHJcblx0XHRyZXR1cm4geEludGVyc2VjdHMgJiYgeUludGVyc2VjdHM7XHJcblx0fSxcclxuXHJcblx0aXNWYWxpZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuICEhKHRoaXMubWluICYmIHRoaXMubWF4KTtcclxuXHR9XHJcbn07XHJcblxyXG5MLmJvdW5kcyA9IGZ1bmN0aW9uIChhLCBiKSB7IC8vIChCb3VuZHMpIG9yIChQb2ludCwgUG9pbnQpIG9yIChQb2ludFtdKVxyXG5cdGlmICghYSB8fCBhIGluc3RhbmNlb2YgTC5Cb3VuZHMpIHtcclxuXHRcdHJldHVybiBhO1xyXG5cdH1cclxuXHRyZXR1cm4gbmV3IEwuQm91bmRzKGEsIGIpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuVHJhbnNmb3JtYXRpb24gaXMgYW4gdXRpbGl0eSBjbGFzcyB0byBwZXJmb3JtIHNpbXBsZSBwb2ludCB0cmFuc2Zvcm1hdGlvbnMgdGhyb3VnaCBhIDJkLW1hdHJpeC5cclxuICovXHJcblxyXG5MLlRyYW5zZm9ybWF0aW9uID0gZnVuY3Rpb24gKGEsIGIsIGMsIGQpIHtcclxuXHR0aGlzLl9hID0gYTtcclxuXHR0aGlzLl9iID0gYjtcclxuXHR0aGlzLl9jID0gYztcclxuXHR0aGlzLl9kID0gZDtcclxufTtcclxuXHJcbkwuVHJhbnNmb3JtYXRpb24ucHJvdG90eXBlID0ge1xyXG5cdHRyYW5zZm9ybTogZnVuY3Rpb24gKHBvaW50LCBzY2FsZSkgeyAvLyAoUG9pbnQsIE51bWJlcikgLT4gUG9pbnRcclxuXHRcdHJldHVybiB0aGlzLl90cmFuc2Zvcm0ocG9pbnQuY2xvbmUoKSwgc2NhbGUpO1xyXG5cdH0sXHJcblxyXG5cdC8vIGRlc3RydWN0aXZlIHRyYW5zZm9ybSAoZmFzdGVyKVxyXG5cdF90cmFuc2Zvcm06IGZ1bmN0aW9uIChwb2ludCwgc2NhbGUpIHtcclxuXHRcdHNjYWxlID0gc2NhbGUgfHwgMTtcclxuXHRcdHBvaW50LnggPSBzY2FsZSAqICh0aGlzLl9hICogcG9pbnQueCArIHRoaXMuX2IpO1xyXG5cdFx0cG9pbnQueSA9IHNjYWxlICogKHRoaXMuX2MgKiBwb2ludC55ICsgdGhpcy5fZCk7XHJcblx0XHRyZXR1cm4gcG9pbnQ7XHJcblx0fSxcclxuXHJcblx0dW50cmFuc2Zvcm06IGZ1bmN0aW9uIChwb2ludCwgc2NhbGUpIHtcclxuXHRcdHNjYWxlID0gc2NhbGUgfHwgMTtcclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludChcclxuXHRcdCAgICAgICAgKHBvaW50LnggLyBzY2FsZSAtIHRoaXMuX2IpIC8gdGhpcy5fYSxcclxuXHRcdCAgICAgICAgKHBvaW50LnkgLyBzY2FsZSAtIHRoaXMuX2QpIC8gdGhpcy5fYyk7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuRG9tVXRpbCBjb250YWlucyB2YXJpb3VzIHV0aWxpdHkgZnVuY3Rpb25zIGZvciB3b3JraW5nIHdpdGggRE9NLlxyXG4gKi9cclxuXHJcbkwuRG9tVXRpbCA9IHtcclxuXHRnZXQ6IGZ1bmN0aW9uIChpZCkge1xyXG5cdFx0cmV0dXJuICh0eXBlb2YgaWQgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIDogaWQpO1xyXG5cdH0sXHJcblxyXG5cdGdldFN0eWxlOiBmdW5jdGlvbiAoZWwsIHN0eWxlKSB7XHJcblxyXG5cdFx0dmFyIHZhbHVlID0gZWwuc3R5bGVbc3R5bGVdO1xyXG5cclxuXHRcdGlmICghdmFsdWUgJiYgZWwuY3VycmVudFN0eWxlKSB7XHJcblx0XHRcdHZhbHVlID0gZWwuY3VycmVudFN0eWxlW3N0eWxlXTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJ2F1dG8nKSAmJiBkb2N1bWVudC5kZWZhdWx0Vmlldykge1xyXG5cdFx0XHR2YXIgY3NzID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XHJcblx0XHRcdHZhbHVlID0gY3NzID8gY3NzW3N0eWxlXSA6IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlID09PSAnYXV0bycgPyBudWxsIDogdmFsdWU7XHJcblx0fSxcclxuXHJcblx0Z2V0Vmlld3BvcnRPZmZzZXQ6IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblxyXG5cdFx0dmFyIHRvcCA9IDAsXHJcblx0XHQgICAgbGVmdCA9IDAsXHJcblx0XHQgICAgZWwgPSBlbGVtZW50LFxyXG5cdFx0ICAgIGRvY0JvZHkgPSBkb2N1bWVudC5ib2R5LFxyXG5cdFx0ICAgIGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG5cdFx0ICAgIHBvcztcclxuXHJcblx0XHRkbyB7XHJcblx0XHRcdHRvcCAgKz0gZWwub2Zmc2V0VG9wICB8fCAwO1xyXG5cdFx0XHRsZWZ0ICs9IGVsLm9mZnNldExlZnQgfHwgMDtcclxuXHJcblx0XHRcdC8vYWRkIGJvcmRlcnNcclxuXHRcdFx0dG9wICs9IHBhcnNlSW50KEwuRG9tVXRpbC5nZXRTdHlsZShlbCwgJ2JvcmRlclRvcFdpZHRoJyksIDEwKSB8fCAwO1xyXG5cdFx0XHRsZWZ0ICs9IHBhcnNlSW50KEwuRG9tVXRpbC5nZXRTdHlsZShlbCwgJ2JvcmRlckxlZnRXaWR0aCcpLCAxMCkgfHwgMDtcclxuXHJcblx0XHRcdHBvcyA9IEwuRG9tVXRpbC5nZXRTdHlsZShlbCwgJ3Bvc2l0aW9uJyk7XHJcblxyXG5cdFx0XHRpZiAoZWwub2Zmc2V0UGFyZW50ID09PSBkb2NCb2R5ICYmIHBvcyA9PT0gJ2Fic29sdXRlJykgeyBicmVhazsgfVxyXG5cclxuXHRcdFx0aWYgKHBvcyA9PT0gJ2ZpeGVkJykge1xyXG5cdFx0XHRcdHRvcCAgKz0gZG9jQm9keS5zY3JvbGxUb3AgIHx8IGRvY0VsLnNjcm9sbFRvcCAgfHwgMDtcclxuXHRcdFx0XHRsZWZ0ICs9IGRvY0JvZHkuc2Nyb2xsTGVmdCB8fCBkb2NFbC5zY3JvbGxMZWZ0IHx8IDA7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChwb3MgPT09ICdyZWxhdGl2ZScgJiYgIWVsLm9mZnNldExlZnQpIHtcclxuXHRcdFx0XHR2YXIgd2lkdGggPSBMLkRvbVV0aWwuZ2V0U3R5bGUoZWwsICd3aWR0aCcpLFxyXG5cdFx0XHRcdCAgICBtYXhXaWR0aCA9IEwuRG9tVXRpbC5nZXRTdHlsZShlbCwgJ21heC13aWR0aCcpLFxyXG5cdFx0XHRcdCAgICByID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdFx0XHRcdGlmICh3aWR0aCAhPT0gJ25vbmUnIHx8IG1heFdpZHRoICE9PSAnbm9uZScpIHtcclxuXHRcdFx0XHRcdGxlZnQgKz0gci5sZWZ0ICsgZWwuY2xpZW50TGVmdDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdC8vY2FsY3VsYXRlIGZ1bGwgeSBvZmZzZXQgc2luY2Ugd2UncmUgYnJlYWtpbmcgb3V0IG9mIHRoZSBsb29wXHJcblx0XHRcdFx0dG9wICs9IHIudG9wICsgKGRvY0JvZHkuc2Nyb2xsVG9wICB8fCBkb2NFbC5zY3JvbGxUb3AgIHx8IDApO1xyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XHJcblxyXG5cdFx0fSB3aGlsZSAoZWwpO1xyXG5cclxuXHRcdGVsID0gZWxlbWVudDtcclxuXHJcblx0XHRkbyB7XHJcblx0XHRcdGlmIChlbCA9PT0gZG9jQm9keSkgeyBicmVhazsgfVxyXG5cclxuXHRcdFx0dG9wICAtPSBlbC5zY3JvbGxUb3AgIHx8IDA7XHJcblx0XHRcdGxlZnQgLT0gZWwuc2Nyb2xsTGVmdCB8fCAwO1xyXG5cclxuXHRcdFx0ZWwgPSBlbC5wYXJlbnROb2RlO1xyXG5cdFx0fSB3aGlsZSAoZWwpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludChsZWZ0LCB0b3ApO1xyXG5cdH0sXHJcblxyXG5cdGRvY3VtZW50SXNMdHI6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghTC5Eb21VdGlsLl9kb2NJc0x0ckNhY2hlZCkge1xyXG5cdFx0XHRMLkRvbVV0aWwuX2RvY0lzTHRyQ2FjaGVkID0gdHJ1ZTtcclxuXHRcdFx0TC5Eb21VdGlsLl9kb2NJc0x0ciA9IEwuRG9tVXRpbC5nZXRTdHlsZShkb2N1bWVudC5ib2R5LCAnZGlyZWN0aW9uJykgPT09ICdsdHInO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIEwuRG9tVXRpbC5fZG9jSXNMdHI7XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlOiBmdW5jdGlvbiAodGFnTmFtZSwgY2xhc3NOYW1lLCBjb250YWluZXIpIHtcclxuXHJcblx0XHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xyXG5cdFx0ZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG5cclxuXHRcdGlmIChjb250YWluZXIpIHtcclxuXHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGVsKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZWw7XHJcblx0fSxcclxuXHJcblx0aGFzQ2xhc3M6IGZ1bmN0aW9uIChlbCwgbmFtZSkge1xyXG5cdFx0aWYgKGVsLmNsYXNzTGlzdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSk7XHJcblx0XHR9XHJcblx0XHR2YXIgY2xhc3NOYW1lID0gTC5Eb21VdGlsLl9nZXRDbGFzcyhlbCk7XHJcblx0XHRyZXR1cm4gY2xhc3NOYW1lLmxlbmd0aCA+IDAgJiYgbmV3IFJlZ0V4cCgnKF58XFxcXHMpJyArIG5hbWUgKyAnKFxcXFxzfCQpJykudGVzdChjbGFzc05hbWUpO1xyXG5cdH0sXHJcblxyXG5cdGFkZENsYXNzOiBmdW5jdGlvbiAoZWwsIG5hbWUpIHtcclxuXHRcdGlmIChlbC5jbGFzc0xpc3QgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR2YXIgY2xhc3NlcyA9IEwuVXRpbC5zcGxpdFdvcmRzKG5hbWUpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gY2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdGVsLmNsYXNzTGlzdC5hZGQoY2xhc3Nlc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoIUwuRG9tVXRpbC5oYXNDbGFzcyhlbCwgbmFtZSkpIHtcclxuXHRcdFx0dmFyIGNsYXNzTmFtZSA9IEwuRG9tVXRpbC5fZ2V0Q2xhc3MoZWwpO1xyXG5cdFx0XHRMLkRvbVV0aWwuX3NldENsYXNzKGVsLCAoY2xhc3NOYW1lID8gY2xhc3NOYW1lICsgJyAnIDogJycpICsgbmFtZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChlbCwgbmFtZSkge1xyXG5cdFx0aWYgKGVsLmNsYXNzTGlzdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGVsLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRMLkRvbVV0aWwuX3NldENsYXNzKGVsLCBMLlV0aWwudHJpbSgoJyAnICsgTC5Eb21VdGlsLl9nZXRDbGFzcyhlbCkgKyAnICcpLnJlcGxhY2UoJyAnICsgbmFtZSArICcgJywgJyAnKSkpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9zZXRDbGFzczogZnVuY3Rpb24gKGVsLCBuYW1lKSB7XHJcblx0XHRpZiAoZWwuY2xhc3NOYW1lLmJhc2VWYWwgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRlbC5jbGFzc05hbWUgPSBuYW1lO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gaW4gY2FzZSBvZiBTVkcgZWxlbWVudFxyXG5cdFx0XHRlbC5jbGFzc05hbWUuYmFzZVZhbCA9IG5hbWU7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2dldENsYXNzOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdHJldHVybiBlbC5jbGFzc05hbWUuYmFzZVZhbCA9PT0gdW5kZWZpbmVkID8gZWwuY2xhc3NOYW1lIDogZWwuY2xhc3NOYW1lLmJhc2VWYWw7XHJcblx0fSxcclxuXHJcblx0c2V0T3BhY2l0eTogZnVuY3Rpb24gKGVsLCB2YWx1ZSkge1xyXG5cclxuXHRcdGlmICgnb3BhY2l0eScgaW4gZWwuc3R5bGUpIHtcclxuXHRcdFx0ZWwuc3R5bGUub3BhY2l0eSA9IHZhbHVlO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoJ2ZpbHRlcicgaW4gZWwuc3R5bGUpIHtcclxuXHJcblx0XHRcdHZhciBmaWx0ZXIgPSBmYWxzZSxcclxuXHRcdFx0ICAgIGZpbHRlck5hbWUgPSAnRFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQWxwaGEnO1xyXG5cclxuXHRcdFx0Ly8gZmlsdGVycyBjb2xsZWN0aW9uIHRocm93cyBhbiBlcnJvciBpZiB3ZSB0cnkgdG8gcmV0cmlldmUgYSBmaWx0ZXIgdGhhdCBkb2Vzbid0IGV4aXN0XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0ZmlsdGVyID0gZWwuZmlsdGVycy5pdGVtKGZpbHRlck5hbWUpO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Ly8gZG9uJ3Qgc2V0IG9wYWNpdHkgdG8gMSBpZiB3ZSBoYXZlbid0IGFscmVhZHkgc2V0IGFuIG9wYWNpdHksXHJcblx0XHRcdFx0Ly8gaXQgaXNuJ3QgbmVlZGVkIGFuZCBicmVha3MgdHJhbnNwYXJlbnQgcG5ncy5cclxuXHRcdFx0XHRpZiAodmFsdWUgPT09IDEpIHsgcmV0dXJuOyB9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhbHVlID0gTWF0aC5yb3VuZCh2YWx1ZSAqIDEwMCk7XHJcblxyXG5cdFx0XHRpZiAoZmlsdGVyKSB7XHJcblx0XHRcdFx0ZmlsdGVyLkVuYWJsZWQgPSAodmFsdWUgIT09IDEwMCk7XHJcblx0XHRcdFx0ZmlsdGVyLk9wYWNpdHkgPSB2YWx1ZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRlbC5zdHlsZS5maWx0ZXIgKz0gJyBwcm9naWQ6JyArIGZpbHRlck5hbWUgKyAnKG9wYWNpdHk9JyArIHZhbHVlICsgJyknO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0dGVzdFByb3A6IGZ1bmN0aW9uIChwcm9wcykge1xyXG5cclxuXHRcdHZhciBzdHlsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmIChwcm9wc1tpXSBpbiBzdHlsZSkge1xyXG5cdFx0XHRcdHJldHVybiBwcm9wc1tpXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdGdldFRyYW5zbGF0ZVN0cmluZzogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHQvLyBvbiBXZWJLaXQgYnJvd3NlcnMgKENocm9tZS9TYWZhcmkvaU9TIFNhZmFyaS9BbmRyb2lkKSB1c2luZyB0cmFuc2xhdGUzZCBpbnN0ZWFkIG9mIHRyYW5zbGF0ZVxyXG5cdFx0Ly8gbWFrZXMgYW5pbWF0aW9uIHNtb290aGVyIGFzIGl0IGVuc3VyZXMgSFcgYWNjZWwgaXMgdXNlZC4gRmlyZWZveCAxMyBkb2Vzbid0IGNhcmVcclxuXHRcdC8vIChzYW1lIHNwZWVkIGVpdGhlciB3YXkpLCBPcGVyYSAxMiBkb2Vzbid0IHN1cHBvcnQgdHJhbnNsYXRlM2RcclxuXHJcblx0XHR2YXIgaXMzZCA9IEwuQnJvd3Nlci53ZWJraXQzZCxcclxuXHRcdCAgICBvcGVuID0gJ3RyYW5zbGF0ZScgKyAoaXMzZCA/ICczZCcgOiAnJykgKyAnKCcsXHJcblx0XHQgICAgY2xvc2UgPSAoaXMzZCA/ICcsMCcgOiAnJykgKyAnKSc7XHJcblxyXG5cdFx0cmV0dXJuIG9wZW4gKyBwb2ludC54ICsgJ3B4LCcgKyBwb2ludC55ICsgJ3B4JyArIGNsb3NlO1xyXG5cdH0sXHJcblxyXG5cdGdldFNjYWxlU3RyaW5nOiBmdW5jdGlvbiAoc2NhbGUsIG9yaWdpbikge1xyXG5cclxuXHRcdHZhciBwcmVUcmFuc2xhdGVTdHIgPSBMLkRvbVV0aWwuZ2V0VHJhbnNsYXRlU3RyaW5nKG9yaWdpbi5hZGQob3JpZ2luLm11bHRpcGx5QnkoLTEgKiBzY2FsZSkpKSxcclxuXHRcdCAgICBzY2FsZVN0ciA9ICcgc2NhbGUoJyArIHNjYWxlICsgJykgJztcclxuXHJcblx0XHRyZXR1cm4gcHJlVHJhbnNsYXRlU3RyICsgc2NhbGVTdHI7XHJcblx0fSxcclxuXHJcblx0c2V0UG9zaXRpb246IGZ1bmN0aW9uIChlbCwgcG9pbnQsIGRpc2FibGUzRCkgeyAvLyAoSFRNTEVsZW1lbnQsIFBvaW50WywgQm9vbGVhbl0pXHJcblxyXG5cdFx0Ly8ganNoaW50IGNhbWVsY2FzZTogZmFsc2VcclxuXHRcdGVsLl9sZWFmbGV0X3BvcyA9IHBvaW50O1xyXG5cclxuXHRcdGlmICghZGlzYWJsZTNEICYmIEwuQnJvd3Nlci5hbnkzZCkge1xyXG5cdFx0XHRlbC5zdHlsZVtMLkRvbVV0aWwuVFJBTlNGT1JNXSA9ICBMLkRvbVV0aWwuZ2V0VHJhbnNsYXRlU3RyaW5nKHBvaW50KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsLnN0eWxlLmxlZnQgPSBwb2ludC54ICsgJ3B4JztcclxuXHRcdFx0ZWwuc3R5bGUudG9wID0gcG9pbnQueSArICdweCc7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Z2V0UG9zaXRpb246IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0Ly8gdGhpcyBtZXRob2QgaXMgb25seSB1c2VkIGZvciBlbGVtZW50cyBwcmV2aW91c2x5IHBvc2l0aW9uZWQgdXNpbmcgc2V0UG9zaXRpb24sXHJcblx0XHQvLyBzbyBpdCdzIHNhZmUgdG8gY2FjaGUgdGhlIHBvc2l0aW9uIGZvciBwZXJmb3JtYW5jZVxyXG5cclxuXHRcdC8vIGpzaGludCBjYW1lbGNhc2U6IGZhbHNlXHJcblx0XHRyZXR1cm4gZWwuX2xlYWZsZXRfcG9zO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG4vLyBwcmVmaXggc3R5bGUgcHJvcGVydHkgbmFtZXNcclxuXHJcbkwuRG9tVXRpbC5UUkFOU0ZPUk0gPSBMLkRvbVV0aWwudGVzdFByb3AoXHJcbiAgICAgICAgWyd0cmFuc2Zvcm0nLCAnV2Via2l0VHJhbnNmb3JtJywgJ09UcmFuc2Zvcm0nLCAnTW96VHJhbnNmb3JtJywgJ21zVHJhbnNmb3JtJ10pO1xyXG5cclxuLy8gd2Via2l0VHJhbnNpdGlvbiBjb21lcyBmaXJzdCBiZWNhdXNlIHNvbWUgYnJvd3NlciB2ZXJzaW9ucyB0aGF0IGRyb3AgdmVuZG9yIHByZWZpeCBkb24ndCBkb1xyXG4vLyB0aGUgc2FtZSBmb3IgdGhlIHRyYW5zaXRpb25lbmQgZXZlbnQsIGluIHBhcnRpY3VsYXIgdGhlIEFuZHJvaWQgNC4xIHN0b2NrIGJyb3dzZXJcclxuXHJcbkwuRG9tVXRpbC5UUkFOU0lUSU9OID0gTC5Eb21VdGlsLnRlc3RQcm9wKFxyXG4gICAgICAgIFsnd2Via2l0VHJhbnNpdGlvbicsICd0cmFuc2l0aW9uJywgJ09UcmFuc2l0aW9uJywgJ01velRyYW5zaXRpb24nLCAnbXNUcmFuc2l0aW9uJ10pO1xyXG5cclxuTC5Eb21VdGlsLlRSQU5TSVRJT05fRU5EID1cclxuICAgICAgICBMLkRvbVV0aWwuVFJBTlNJVElPTiA9PT0gJ3dlYmtpdFRyYW5zaXRpb24nIHx8IEwuRG9tVXRpbC5UUkFOU0lUSU9OID09PSAnT1RyYW5zaXRpb24nID9cclxuICAgICAgICBMLkRvbVV0aWwuVFJBTlNJVElPTiArICdFbmQnIDogJ3RyYW5zaXRpb25lbmQnO1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgnb25zZWxlY3RzdGFydCcgaW4gZG9jdW1lbnQpIHtcclxuICAgICAgICBMLmV4dGVuZChMLkRvbVV0aWwsIHtcclxuICAgICAgICAgICAgZGlzYWJsZVRleHRTZWxlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIEwuRG9tRXZlbnQub24od2luZG93LCAnc2VsZWN0c3RhcnQnLCBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGVuYWJsZVRleHRTZWxlY3Rpb246IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIEwuRG9tRXZlbnQub2ZmKHdpbmRvdywgJ3NlbGVjdHN0YXJ0JywgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHVzZXJTZWxlY3RQcm9wZXJ0eSA9IEwuRG9tVXRpbC50ZXN0UHJvcChcclxuICAgICAgICAgICAgWyd1c2VyU2VsZWN0JywgJ1dlYmtpdFVzZXJTZWxlY3QnLCAnT1VzZXJTZWxlY3QnLCAnTW96VXNlclNlbGVjdCcsICdtc1VzZXJTZWxlY3QnXSk7XHJcblxyXG4gICAgICAgIEwuZXh0ZW5kKEwuRG9tVXRpbCwge1xyXG4gICAgICAgICAgICBkaXNhYmxlVGV4dFNlbGVjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJTZWxlY3RQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91c2VyU2VsZWN0ID0gc3R5bGVbdXNlclNlbGVjdFByb3BlcnR5XTtcclxuICAgICAgICAgICAgICAgICAgICBzdHlsZVt1c2VyU2VsZWN0UHJvcGVydHldID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZW5hYmxlVGV4dFNlbGVjdGlvbjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHVzZXJTZWxlY3RQcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZVt1c2VyU2VsZWN0UHJvcGVydHldID0gdGhpcy5fdXNlclNlbGVjdDtcclxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fdXNlclNlbGVjdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHRMLmV4dGVuZChMLkRvbVV0aWwsIHtcclxuXHRcdGRpc2FibGVJbWFnZURyYWc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0TC5Eb21FdmVudC5vbih3aW5kb3csICdkcmFnc3RhcnQnLCBMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0ZW5hYmxlSW1hZ2VEcmFnOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdEwuRG9tRXZlbnQub2ZmKHdpbmRvdywgJ2RyYWdzdGFydCcsIEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KSgpO1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuTGF0TG5nIHJlcHJlc2VudHMgYSBnZW9ncmFwaGljYWwgcG9pbnQgd2l0aCBsYXRpdHVkZSBhbmQgbG9uZ2l0dWRlIGNvb3JkaW5hdGVzLlxyXG4gKi9cclxuXHJcbkwuTGF0TG5nID0gZnVuY3Rpb24gKGxhdCwgbG5nLCBhbHQpIHsgLy8gKE51bWJlciwgTnVtYmVyLCBOdW1iZXIpXHJcblx0bGF0ID0gcGFyc2VGbG9hdChsYXQpO1xyXG5cdGxuZyA9IHBhcnNlRmxvYXQobG5nKTtcclxuXHJcblx0aWYgKGlzTmFOKGxhdCkgfHwgaXNOYU4obG5nKSkge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIExhdExuZyBvYmplY3Q6ICgnICsgbGF0ICsgJywgJyArIGxuZyArICcpJyk7XHJcblx0fVxyXG5cclxuXHR0aGlzLmxhdCA9IGxhdDtcclxuXHR0aGlzLmxuZyA9IGxuZztcclxuXHJcblx0aWYgKGFsdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHR0aGlzLmFsdCA9IHBhcnNlRmxvYXQoYWx0KTtcclxuXHR9XHJcbn07XHJcblxyXG5MLmV4dGVuZChMLkxhdExuZywge1xyXG5cdERFR19UT19SQUQ6IE1hdGguUEkgLyAxODAsXHJcblx0UkFEX1RPX0RFRzogMTgwIC8gTWF0aC5QSSxcclxuXHRNQVhfTUFSR0lOOiAxLjBFLTkgLy8gbWF4IG1hcmdpbiBvZiBlcnJvciBmb3IgdGhlIFwiZXF1YWxzXCIgY2hlY2tcclxufSk7XHJcblxyXG5MLkxhdExuZy5wcm90b3R5cGUgPSB7XHJcblx0ZXF1YWxzOiBmdW5jdGlvbiAob2JqKSB7IC8vIChMYXRMbmcpIC0+IEJvb2xlYW5cclxuXHRcdGlmICghb2JqKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuXHRcdG9iaiA9IEwubGF0TG5nKG9iaik7XHJcblxyXG5cdFx0dmFyIG1hcmdpbiA9IE1hdGgubWF4KFxyXG5cdFx0ICAgICAgICBNYXRoLmFicyh0aGlzLmxhdCAtIG9iai5sYXQpLFxyXG5cdFx0ICAgICAgICBNYXRoLmFicyh0aGlzLmxuZyAtIG9iai5sbmcpKTtcclxuXHJcblx0XHRyZXR1cm4gbWFyZ2luIDw9IEwuTGF0TG5nLk1BWF9NQVJHSU47XHJcblx0fSxcclxuXHJcblx0dG9TdHJpbmc6IGZ1bmN0aW9uIChwcmVjaXNpb24pIHsgLy8gKE51bWJlcikgLT4gU3RyaW5nXHJcblx0XHRyZXR1cm4gJ0xhdExuZygnICtcclxuXHRcdCAgICAgICAgTC5VdGlsLmZvcm1hdE51bSh0aGlzLmxhdCwgcHJlY2lzaW9uKSArICcsICcgK1xyXG5cdFx0ICAgICAgICBMLlV0aWwuZm9ybWF0TnVtKHRoaXMubG5nLCBwcmVjaXNpb24pICsgJyknO1xyXG5cdH0sXHJcblxyXG5cdC8vIEhhdmVyc2luZSBkaXN0YW5jZSBmb3JtdWxhLCBzZWUgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IYXZlcnNpbmVfZm9ybXVsYVxyXG5cdC8vIFRPRE8gbW92ZSB0byBwcm9qZWN0aW9uIGNvZGUsIExhdExuZyBzaG91bGRuJ3Qga25vdyBhYm91dCBFYXJ0aFxyXG5cdGRpc3RhbmNlVG86IGZ1bmN0aW9uIChvdGhlcikgeyAvLyAoTGF0TG5nKSAtPiBOdW1iZXJcclxuXHRcdG90aGVyID0gTC5sYXRMbmcob3RoZXIpO1xyXG5cclxuXHRcdHZhciBSID0gNjM3ODEzNywgLy8gZWFydGggcmFkaXVzIGluIG1ldGVyc1xyXG5cdFx0ICAgIGQyciA9IEwuTGF0TG5nLkRFR19UT19SQUQsXHJcblx0XHQgICAgZExhdCA9IChvdGhlci5sYXQgLSB0aGlzLmxhdCkgKiBkMnIsXHJcblx0XHQgICAgZExvbiA9IChvdGhlci5sbmcgLSB0aGlzLmxuZykgKiBkMnIsXHJcblx0XHQgICAgbGF0MSA9IHRoaXMubGF0ICogZDJyLFxyXG5cdFx0ICAgIGxhdDIgPSBvdGhlci5sYXQgKiBkMnIsXHJcblx0XHQgICAgc2luMSA9IE1hdGguc2luKGRMYXQgLyAyKSxcclxuXHRcdCAgICBzaW4yID0gTWF0aC5zaW4oZExvbiAvIDIpO1xyXG5cclxuXHRcdHZhciBhID0gc2luMSAqIHNpbjEgKyBzaW4yICogc2luMiAqIE1hdGguY29zKGxhdDEpICogTWF0aC5jb3MobGF0Mik7XHJcblxyXG5cdFx0cmV0dXJuIFIgKiAyICogTWF0aC5hdGFuMihNYXRoLnNxcnQoYSksIE1hdGguc3FydCgxIC0gYSkpO1xyXG5cdH0sXHJcblxyXG5cdHdyYXA6IGZ1bmN0aW9uIChhLCBiKSB7IC8vIChOdW1iZXIsIE51bWJlcikgLT4gTGF0TG5nXHJcblx0XHR2YXIgbG5nID0gdGhpcy5sbmc7XHJcblxyXG5cdFx0YSA9IGEgfHwgLTE4MDtcclxuXHRcdGIgPSBiIHx8ICAxODA7XHJcblxyXG5cdFx0bG5nID0gKGxuZyArIGIpICUgKGIgLSBhKSArIChsbmcgPCBhIHx8IGxuZyA9PT0gYiA/IGIgOiBhKTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nKHRoaXMubGF0LCBsbmcpO1xyXG5cdH1cclxufTtcclxuXHJcbkwubGF0TG5nID0gZnVuY3Rpb24gKGEsIGIpIHsgLy8gKExhdExuZykgb3IgKFtOdW1iZXIsIE51bWJlcl0pIG9yIChOdW1iZXIsIE51bWJlcilcclxuXHRpZiAoYSBpbnN0YW5jZW9mIEwuTGF0TG5nKSB7XHJcblx0XHRyZXR1cm4gYTtcclxuXHR9XHJcblx0aWYgKEwuVXRpbC5pc0FycmF5KGEpKSB7XHJcblx0XHRpZiAodHlwZW9mIGFbMF0gPT09ICdudW1iZXInIHx8IHR5cGVvZiBhWzBdID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nKGFbMF0sIGFbMV0sIGFbMl0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cdGlmIChhID09PSB1bmRlZmluZWQgfHwgYSA9PT0gbnVsbCkge1xyXG5cdFx0cmV0dXJuIGE7XHJcblx0fVxyXG5cdGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcgJiYgJ2xhdCcgaW4gYSkge1xyXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZyhhLmxhdCwgJ2xuZycgaW4gYSA/IGEubG5nIDogYS5sb24pO1xyXG5cdH1cclxuXHRpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0cmV0dXJuIG5ldyBMLkxhdExuZyhhLCBiKTtcclxufTtcclxuXHJcblxyXG5cclxuLypcclxuICogTC5MYXRMbmdCb3VuZHMgcmVwcmVzZW50cyBhIHJlY3Rhbmd1bGFyIGFyZWEgb24gdGhlIG1hcCBpbiBnZW9ncmFwaGljYWwgY29vcmRpbmF0ZXMuXHJcbiAqL1xyXG5cclxuTC5MYXRMbmdCb3VuZHMgPSBmdW5jdGlvbiAoc291dGhXZXN0LCBub3J0aEVhc3QpIHsgLy8gKExhdExuZywgTGF0TG5nKSBvciAoTGF0TG5nW10pXHJcblx0aWYgKCFzb3V0aFdlc3QpIHsgcmV0dXJuOyB9XHJcblxyXG5cdHZhciBsYXRsbmdzID0gbm9ydGhFYXN0ID8gW3NvdXRoV2VzdCwgbm9ydGhFYXN0XSA6IHNvdXRoV2VzdDtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGxhdGxuZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdHRoaXMuZXh0ZW5kKGxhdGxuZ3NbaV0pO1xyXG5cdH1cclxufTtcclxuXHJcbkwuTGF0TG5nQm91bmRzLnByb3RvdHlwZSA9IHtcclxuXHQvLyBleHRlbmQgdGhlIGJvdW5kcyB0byBjb250YWluIHRoZSBnaXZlbiBwb2ludCBvciBib3VuZHNcclxuXHRleHRlbmQ6IGZ1bmN0aW9uIChvYmopIHsgLy8gKExhdExuZykgb3IgKExhdExuZ0JvdW5kcylcclxuXHRcdGlmICghb2JqKSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0dmFyIGxhdExuZyA9IEwubGF0TG5nKG9iaik7XHJcblx0XHRpZiAobGF0TG5nICE9PSBudWxsKSB7XHJcblx0XHRcdG9iaiA9IGxhdExuZztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdG9iaiA9IEwubGF0TG5nQm91bmRzKG9iaik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9iaiBpbnN0YW5jZW9mIEwuTGF0TG5nKSB7XHJcblx0XHRcdGlmICghdGhpcy5fc291dGhXZXN0ICYmICF0aGlzLl9ub3J0aEVhc3QpIHtcclxuXHRcdFx0XHR0aGlzLl9zb3V0aFdlc3QgPSBuZXcgTC5MYXRMbmcob2JqLmxhdCwgb2JqLmxuZyk7XHJcblx0XHRcdFx0dGhpcy5fbm9ydGhFYXN0ID0gbmV3IEwuTGF0TG5nKG9iai5sYXQsIG9iai5sbmcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX3NvdXRoV2VzdC5sYXQgPSBNYXRoLm1pbihvYmoubGF0LCB0aGlzLl9zb3V0aFdlc3QubGF0KTtcclxuXHRcdFx0XHR0aGlzLl9zb3V0aFdlc3QubG5nID0gTWF0aC5taW4ob2JqLmxuZywgdGhpcy5fc291dGhXZXN0LmxuZyk7XHJcblxyXG5cdFx0XHRcdHRoaXMuX25vcnRoRWFzdC5sYXQgPSBNYXRoLm1heChvYmoubGF0LCB0aGlzLl9ub3J0aEVhc3QubGF0KTtcclxuXHRcdFx0XHR0aGlzLl9ub3J0aEVhc3QubG5nID0gTWF0aC5tYXgob2JqLmxuZywgdGhpcy5fbm9ydGhFYXN0LmxuZyk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgTC5MYXRMbmdCb3VuZHMpIHtcclxuXHRcdFx0dGhpcy5leHRlbmQob2JqLl9zb3V0aFdlc3QpO1xyXG5cdFx0XHR0aGlzLmV4dGVuZChvYmouX25vcnRoRWFzdCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvLyBleHRlbmQgdGhlIGJvdW5kcyBieSBhIHBlcmNlbnRhZ2VcclxuXHRwYWQ6IGZ1bmN0aW9uIChidWZmZXJSYXRpbykgeyAvLyAoTnVtYmVyKSAtPiBMYXRMbmdCb3VuZHNcclxuXHRcdHZhciBzdyA9IHRoaXMuX3NvdXRoV2VzdCxcclxuXHRcdCAgICBuZSA9IHRoaXMuX25vcnRoRWFzdCxcclxuXHRcdCAgICBoZWlnaHRCdWZmZXIgPSBNYXRoLmFicyhzdy5sYXQgLSBuZS5sYXQpICogYnVmZmVyUmF0aW8sXHJcblx0XHQgICAgd2lkdGhCdWZmZXIgPSBNYXRoLmFicyhzdy5sbmcgLSBuZS5sbmcpICogYnVmZmVyUmF0aW87XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZ0JvdW5kcyhcclxuXHRcdCAgICAgICAgbmV3IEwuTGF0TG5nKHN3LmxhdCAtIGhlaWdodEJ1ZmZlciwgc3cubG5nIC0gd2lkdGhCdWZmZXIpLFxyXG5cdFx0ICAgICAgICBuZXcgTC5MYXRMbmcobmUubGF0ICsgaGVpZ2h0QnVmZmVyLCBuZS5sbmcgKyB3aWR0aEJ1ZmZlcikpO1xyXG5cdH0sXHJcblxyXG5cdGdldENlbnRlcjogZnVuY3Rpb24gKCkgeyAvLyAtPiBMYXRMbmdcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcoXHJcblx0XHQgICAgICAgICh0aGlzLl9zb3V0aFdlc3QubGF0ICsgdGhpcy5fbm9ydGhFYXN0LmxhdCkgLyAyLFxyXG5cdFx0ICAgICAgICAodGhpcy5fc291dGhXZXN0LmxuZyArIHRoaXMuX25vcnRoRWFzdC5sbmcpIC8gMik7XHJcblx0fSxcclxuXHJcblx0Z2V0U291dGhXZXN0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc291dGhXZXN0O1xyXG5cdH0sXHJcblxyXG5cdGdldE5vcnRoRWFzdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX25vcnRoRWFzdDtcclxuXHR9LFxyXG5cclxuXHRnZXROb3J0aFdlc3Q6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcodGhpcy5nZXROb3J0aCgpLCB0aGlzLmdldFdlc3QoKSk7XHJcblx0fSxcclxuXHJcblx0Z2V0U291dGhFYXN0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nKHRoaXMuZ2V0U291dGgoKSwgdGhpcy5nZXRFYXN0KCkpO1xyXG5cdH0sXHJcblxyXG5cdGdldFdlc3Q6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9zb3V0aFdlc3QubG5nO1xyXG5cdH0sXHJcblxyXG5cdGdldFNvdXRoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc291dGhXZXN0LmxhdDtcclxuXHR9LFxyXG5cclxuXHRnZXRFYXN0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbm9ydGhFYXN0LmxuZztcclxuXHR9LFxyXG5cclxuXHRnZXROb3J0aDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX25vcnRoRWFzdC5sYXQ7XHJcblx0fSxcclxuXHJcblx0Y29udGFpbnM6IGZ1bmN0aW9uIChvYmopIHsgLy8gKExhdExuZ0JvdW5kcykgb3IgKExhdExuZykgLT4gQm9vbGVhblxyXG5cdFx0aWYgKHR5cGVvZiBvYmpbMF0gPT09ICdudW1iZXInIHx8IG9iaiBpbnN0YW5jZW9mIEwuTGF0TG5nKSB7XHJcblx0XHRcdG9iaiA9IEwubGF0TG5nKG9iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRvYmogPSBMLmxhdExuZ0JvdW5kcyhvYmopO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdyA9IHRoaXMuX3NvdXRoV2VzdCxcclxuXHRcdCAgICBuZSA9IHRoaXMuX25vcnRoRWFzdCxcclxuXHRcdCAgICBzdzIsIG5lMjtcclxuXHJcblx0XHRpZiAob2JqIGluc3RhbmNlb2YgTC5MYXRMbmdCb3VuZHMpIHtcclxuXHRcdFx0c3cyID0gb2JqLmdldFNvdXRoV2VzdCgpO1xyXG5cdFx0XHRuZTIgPSBvYmouZ2V0Tm9ydGhFYXN0KCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdzIgPSBuZTIgPSBvYmo7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIChzdzIubGF0ID49IHN3LmxhdCkgJiYgKG5lMi5sYXQgPD0gbmUubGF0KSAmJlxyXG5cdFx0ICAgICAgIChzdzIubG5nID49IHN3LmxuZykgJiYgKG5lMi5sbmcgPD0gbmUubG5nKTtcclxuXHR9LFxyXG5cclxuXHRpbnRlcnNlY3RzOiBmdW5jdGlvbiAoYm91bmRzKSB7IC8vIChMYXRMbmdCb3VuZHMpXHJcblx0XHRib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xyXG5cclxuXHRcdHZhciBzdyA9IHRoaXMuX3NvdXRoV2VzdCxcclxuXHRcdCAgICBuZSA9IHRoaXMuX25vcnRoRWFzdCxcclxuXHRcdCAgICBzdzIgPSBib3VuZHMuZ2V0U291dGhXZXN0KCksXHJcblx0XHQgICAgbmUyID0gYm91bmRzLmdldE5vcnRoRWFzdCgpLFxyXG5cclxuXHRcdCAgICBsYXRJbnRlcnNlY3RzID0gKG5lMi5sYXQgPj0gc3cubGF0KSAmJiAoc3cyLmxhdCA8PSBuZS5sYXQpLFxyXG5cdFx0ICAgIGxuZ0ludGVyc2VjdHMgPSAobmUyLmxuZyA+PSBzdy5sbmcpICYmIChzdzIubG5nIDw9IG5lLmxuZyk7XHJcblxyXG5cdFx0cmV0dXJuIGxhdEludGVyc2VjdHMgJiYgbG5nSW50ZXJzZWN0cztcclxuXHR9LFxyXG5cclxuXHR0b0JCb3hTdHJpbmc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBbdGhpcy5nZXRXZXN0KCksIHRoaXMuZ2V0U291dGgoKSwgdGhpcy5nZXRFYXN0KCksIHRoaXMuZ2V0Tm9ydGgoKV0uam9pbignLCcpO1xyXG5cdH0sXHJcblxyXG5cdGVxdWFsczogZnVuY3Rpb24gKGJvdW5kcykgeyAvLyAoTGF0TG5nQm91bmRzKVxyXG5cdFx0aWYgKCFib3VuZHMpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG5cdFx0Ym91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc291dGhXZXN0LmVxdWFscyhib3VuZHMuZ2V0U291dGhXZXN0KCkpICYmXHJcblx0XHQgICAgICAgdGhpcy5fbm9ydGhFYXN0LmVxdWFscyhib3VuZHMuZ2V0Tm9ydGhFYXN0KCkpO1xyXG5cdH0sXHJcblxyXG5cdGlzVmFsaWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiAhISh0aGlzLl9zb3V0aFdlc3QgJiYgdGhpcy5fbm9ydGhFYXN0KTtcclxuXHR9XHJcbn07XHJcblxyXG4vL1RPRE8gSW50ZXJuYXRpb25hbCBkYXRlIGxpbmU/XHJcblxyXG5MLmxhdExuZ0JvdW5kcyA9IGZ1bmN0aW9uIChhLCBiKSB7IC8vIChMYXRMbmdCb3VuZHMpIG9yIChMYXRMbmcsIExhdExuZylcclxuXHRpZiAoIWEgfHwgYSBpbnN0YW5jZW9mIEwuTGF0TG5nQm91bmRzKSB7XHJcblx0XHRyZXR1cm4gYTtcclxuXHR9XHJcblx0cmV0dXJuIG5ldyBMLkxhdExuZ0JvdW5kcyhhLCBiKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLlByb2plY3Rpb24gY29udGFpbnMgdmFyaW91cyBnZW9ncmFwaGljYWwgcHJvamVjdGlvbnMgdXNlZCBieSBDUlMgY2xhc3Nlcy5cclxuICovXHJcblxyXG5MLlByb2plY3Rpb24gPSB7fTtcclxuXHJcblxyXG4vKlxyXG4gKiBTcGhlcmljYWwgTWVyY2F0b3IgaXMgdGhlIG1vc3QgcG9wdWxhciBtYXAgcHJvamVjdGlvbiwgdXNlZCBieSBFUFNHOjM4NTcgQ1JTIHVzZWQgYnkgZGVmYXVsdC5cclxuICovXHJcblxyXG5MLlByb2plY3Rpb24uU3BoZXJpY2FsTWVyY2F0b3IgPSB7XHJcblx0TUFYX0xBVElUVURFOiA4NS4wNTExMjg3Nzk4LFxyXG5cclxuXHRwcm9qZWN0OiBmdW5jdGlvbiAobGF0bG5nKSB7IC8vIChMYXRMbmcpIC0+IFBvaW50XHJcblx0XHR2YXIgZCA9IEwuTGF0TG5nLkRFR19UT19SQUQsXHJcblx0XHQgICAgbWF4ID0gdGhpcy5NQVhfTEFUSVRVREUsXHJcblx0XHQgICAgbGF0ID0gTWF0aC5tYXgoTWF0aC5taW4obWF4LCBsYXRsbmcubGF0KSwgLW1heCksXHJcblx0XHQgICAgeCA9IGxhdGxuZy5sbmcgKiBkLFxyXG5cdFx0ICAgIHkgPSBsYXQgKiBkO1xyXG5cclxuXHRcdHkgPSBNYXRoLmxvZyhNYXRoLnRhbigoTWF0aC5QSSAvIDQpICsgKHkgLyAyKSkpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludCh4LCB5KTtcclxuXHR9LFxyXG5cclxuXHR1bnByb2plY3Q6IGZ1bmN0aW9uIChwb2ludCkgeyAvLyAoUG9pbnQsIEJvb2xlYW4pIC0+IExhdExuZ1xyXG5cdFx0dmFyIGQgPSBMLkxhdExuZy5SQURfVE9fREVHLFxyXG5cdFx0ICAgIGxuZyA9IHBvaW50LnggKiBkLFxyXG5cdFx0ICAgIGxhdCA9ICgyICogTWF0aC5hdGFuKE1hdGguZXhwKHBvaW50LnkpKSAtIChNYXRoLlBJIC8gMikpICogZDtcclxuXHJcblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nKGxhdCwgbG5nKTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuLypcclxuICogU2ltcGxlIGVxdWlyZWN0YW5ndWxhciAoUGxhdGUgQ2FycmVlKSBwcm9qZWN0aW9uLCB1c2VkIGJ5IENSUyBsaWtlIEVQU0c6NDMyNiBhbmQgU2ltcGxlLlxyXG4gKi9cclxuXHJcbkwuUHJvamVjdGlvbi5Mb25MYXQgPSB7XHJcblx0cHJvamVjdDogZnVuY3Rpb24gKGxhdGxuZykge1xyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KGxhdGxuZy5sbmcsIGxhdGxuZy5sYXQpO1xyXG5cdH0sXHJcblxyXG5cdHVucHJvamVjdDogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nKHBvaW50LnksIHBvaW50LngpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkNSUyBpcyBhIGJhc2Ugb2JqZWN0IGZvciBhbGwgZGVmaW5lZCBDUlMgKENvb3JkaW5hdGUgUmVmZXJlbmNlIFN5c3RlbXMpIGluIExlYWZsZXQuXHJcbiAqL1xyXG5cclxuTC5DUlMgPSB7XHJcblx0bGF0TG5nVG9Qb2ludDogZnVuY3Rpb24gKGxhdGxuZywgem9vbSkgeyAvLyAoTGF0TG5nLCBOdW1iZXIpIC0+IFBvaW50XHJcblx0XHR2YXIgcHJvamVjdGVkUG9pbnQgPSB0aGlzLnByb2plY3Rpb24ucHJvamVjdChsYXRsbmcpLFxyXG5cdFx0ICAgIHNjYWxlID0gdGhpcy5zY2FsZSh6b29tKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy50cmFuc2Zvcm1hdGlvbi5fdHJhbnNmb3JtKHByb2plY3RlZFBvaW50LCBzY2FsZSk7XHJcblx0fSxcclxuXHJcblx0cG9pbnRUb0xhdExuZzogZnVuY3Rpb24gKHBvaW50LCB6b29tKSB7IC8vIChQb2ludCwgTnVtYmVyWywgQm9vbGVhbl0pIC0+IExhdExuZ1xyXG5cdFx0dmFyIHNjYWxlID0gdGhpcy5zY2FsZSh6b29tKSxcclxuXHRcdCAgICB1bnRyYW5zZm9ybWVkUG9pbnQgPSB0aGlzLnRyYW5zZm9ybWF0aW9uLnVudHJhbnNmb3JtKHBvaW50LCBzY2FsZSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMucHJvamVjdGlvbi51bnByb2plY3QodW50cmFuc2Zvcm1lZFBvaW50KTtcclxuXHR9LFxyXG5cclxuXHRwcm9qZWN0OiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9qZWN0aW9uLnByb2plY3QobGF0bG5nKTtcclxuXHR9LFxyXG5cclxuXHRzY2FsZTogZnVuY3Rpb24gKHpvb20pIHtcclxuXHRcdHJldHVybiAyNTYgKiBNYXRoLnBvdygyLCB6b29tKTtcclxuXHR9LFxyXG5cclxuXHRnZXRTaXplOiBmdW5jdGlvbiAoem9vbSkge1xyXG5cdFx0dmFyIHMgPSB0aGlzLnNjYWxlKHpvb20pO1xyXG5cdFx0cmV0dXJuIEwucG9pbnQocywgcyk7XHJcblx0fVxyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEEgc2ltcGxlIENSUyB0aGF0IGNhbiBiZSB1c2VkIGZvciBmbGF0IG5vbi1FYXJ0aCBtYXBzIGxpa2UgcGFub3JhbWFzIG9yIGdhbWUgbWFwcy5cclxuICovXHJcblxyXG5MLkNSUy5TaW1wbGUgPSBMLmV4dGVuZCh7fSwgTC5DUlMsIHtcclxuXHRwcm9qZWN0aW9uOiBMLlByb2plY3Rpb24uTG9uTGF0LFxyXG5cdHRyYW5zZm9ybWF0aW9uOiBuZXcgTC5UcmFuc2Zvcm1hdGlvbigxLCAwLCAtMSwgMCksXHJcblxyXG5cdHNjYWxlOiBmdW5jdGlvbiAoem9vbSkge1xyXG5cdFx0cmV0dXJuIE1hdGgucG93KDIsIHpvb20pO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLypcclxuICogTC5DUlMuRVBTRzM4NTcgKFNwaGVyaWNhbCBNZXJjYXRvcikgaXMgdGhlIG1vc3QgY29tbW9uIENSUyBmb3Igd2ViIG1hcHBpbmdcclxuICogYW5kIGlzIHVzZWQgYnkgTGVhZmxldCBieSBkZWZhdWx0LlxyXG4gKi9cclxuXHJcbkwuQ1JTLkVQU0czODU3ID0gTC5leHRlbmQoe30sIEwuQ1JTLCB7XHJcblx0Y29kZTogJ0VQU0c6Mzg1NycsXHJcblxyXG5cdHByb2plY3Rpb246IEwuUHJvamVjdGlvbi5TcGhlcmljYWxNZXJjYXRvcixcclxuXHR0cmFuc2Zvcm1hdGlvbjogbmV3IEwuVHJhbnNmb3JtYXRpb24oMC41IC8gTWF0aC5QSSwgMC41LCAtMC41IC8gTWF0aC5QSSwgMC41KSxcclxuXHJcblx0cHJvamVjdDogZnVuY3Rpb24gKGxhdGxuZykgeyAvLyAoTGF0TG5nKSAtPiBQb2ludFxyXG5cdFx0dmFyIHByb2plY3RlZFBvaW50ID0gdGhpcy5wcm9qZWN0aW9uLnByb2plY3QobGF0bG5nKSxcclxuXHRcdCAgICBlYXJ0aFJhZGl1cyA9IDYzNzgxMzc7XHJcblx0XHRyZXR1cm4gcHJvamVjdGVkUG9pbnQubXVsdGlwbHlCeShlYXJ0aFJhZGl1cyk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwuQ1JTLkVQU0c5MDA5MTMgPSBMLmV4dGVuZCh7fSwgTC5DUlMuRVBTRzM4NTcsIHtcclxuXHRjb2RlOiAnRVBTRzo5MDA5MTMnXHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuQ1JTLkVQU0c0MzI2IGlzIGEgQ1JTIHBvcHVsYXIgYW1vbmcgYWR2YW5jZWQgR0lTIHNwZWNpYWxpc3RzLlxyXG4gKi9cclxuXHJcbkwuQ1JTLkVQU0c0MzI2ID0gTC5leHRlbmQoe30sIEwuQ1JTLCB7XHJcblx0Y29kZTogJ0VQU0c6NDMyNicsXHJcblxyXG5cdHByb2plY3Rpb246IEwuUHJvamVjdGlvbi5Mb25MYXQsXHJcblx0dHJhbnNmb3JtYXRpb246IG5ldyBMLlRyYW5zZm9ybWF0aW9uKDEgLyAzNjAsIDAuNSwgLTEgLyAzNjAsIDAuNSlcclxufSk7XHJcblxyXG5cclxuLypcclxuICogTC5NYXAgaXMgdGhlIGNlbnRyYWwgY2xhc3Mgb2YgdGhlIEFQSSAtIGl0IGlzIHVzZWQgdG8gY3JlYXRlIGEgbWFwLlxyXG4gKi9cclxuXHJcbkwuTWFwID0gTC5DbGFzcy5leHRlbmQoe1xyXG5cclxuXHRpbmNsdWRlczogTC5NaXhpbi5FdmVudHMsXHJcblxyXG5cdG9wdGlvbnM6IHtcclxuXHRcdGNyczogTC5DUlMuRVBTRzM4NTcsXHJcblxyXG5cdFx0LypcclxuXHRcdGNlbnRlcjogTGF0TG5nLFxyXG5cdFx0em9vbTogTnVtYmVyLFxyXG5cdFx0bGF5ZXJzOiBBcnJheSxcclxuXHRcdCovXHJcblxyXG5cdFx0ZmFkZUFuaW1hdGlvbjogTC5Eb21VdGlsLlRSQU5TSVRJT04gJiYgIUwuQnJvd3Nlci5hbmRyb2lkMjMsXHJcblx0XHR0cmFja1Jlc2l6ZTogdHJ1ZSxcclxuXHRcdG1hcmtlclpvb21BbmltYXRpb246IEwuRG9tVXRpbC5UUkFOU0lUSU9OICYmIEwuQnJvd3Nlci5hbnkzZFxyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChpZCwgb3B0aW9ucykgeyAvLyAoSFRNTEVsZW1lbnQgb3IgU3RyaW5nLCBPYmplY3QpXHJcblx0XHRvcHRpb25zID0gTC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHJcblx0XHR0aGlzLl9pbml0Q29udGFpbmVyKGlkKTtcclxuXHRcdHRoaXMuX2luaXRMYXlvdXQoKTtcclxuXHJcblx0XHQvLyBoYWNrIGZvciBodHRwczovL2dpdGh1Yi5jb20vTGVhZmxldC9MZWFmbGV0L2lzc3Vlcy8xOTgwXHJcblx0XHR0aGlzLl9vblJlc2l6ZSA9IEwuYmluZCh0aGlzLl9vblJlc2l6ZSwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5faW5pdEV2ZW50cygpO1xyXG5cclxuXHRcdGlmIChvcHRpb25zLm1heEJvdW5kcykge1xyXG5cdFx0XHR0aGlzLnNldE1heEJvdW5kcyhvcHRpb25zLm1heEJvdW5kcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuY2VudGVyICYmIG9wdGlvbnMuem9vbSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuc2V0VmlldyhMLmxhdExuZyhvcHRpb25zLmNlbnRlciksIG9wdGlvbnMuem9vbSwge3Jlc2V0OiB0cnVlfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faGFuZGxlcnMgPSBbXTtcclxuXHJcblx0XHR0aGlzLl9sYXllcnMgPSB7fTtcclxuXHRcdHRoaXMuX3pvb21Cb3VuZExheWVycyA9IHt9O1xyXG5cdFx0dGhpcy5fdGlsZUxheWVyc051bSA9IDA7XHJcblxyXG5cdFx0dGhpcy5jYWxsSW5pdEhvb2tzKCk7XHJcblxyXG5cdFx0dGhpcy5fYWRkTGF5ZXJzKG9wdGlvbnMubGF5ZXJzKTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gcHVibGljIG1ldGhvZHMgdGhhdCBtb2RpZnkgbWFwIHN0YXRlXHJcblxyXG5cdC8vIHJlcGxhY2VkIGJ5IGFuaW1hdGlvbi1wb3dlcmVkIGltcGxlbWVudGF0aW9uIGluIE1hcC5QYW5BbmltYXRpb24uanNcclxuXHRzZXRWaWV3OiBmdW5jdGlvbiAoY2VudGVyLCB6b29tKSB7XHJcblx0XHR6b29tID0gem9vbSA9PT0gdW5kZWZpbmVkID8gdGhpcy5nZXRab29tKCkgOiB6b29tO1xyXG5cdFx0dGhpcy5fcmVzZXRWaWV3KEwubGF0TG5nKGNlbnRlciksIHRoaXMuX2xpbWl0Wm9vbSh6b29tKSk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzZXRab29tOiBmdW5jdGlvbiAoem9vbSwgb3B0aW9ucykge1xyXG5cdFx0aWYgKCF0aGlzLl9sb2FkZWQpIHtcclxuXHRcdFx0dGhpcy5fem9vbSA9IHRoaXMuX2xpbWl0Wm9vbSh6b29tKTtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5zZXRWaWV3KHRoaXMuZ2V0Q2VudGVyKCksIHpvb20sIHt6b29tOiBvcHRpb25zfSk7XHJcblx0fSxcclxuXHJcblx0em9vbUluOiBmdW5jdGlvbiAoZGVsdGEsIG9wdGlvbnMpIHtcclxuXHRcdHJldHVybiB0aGlzLnNldFpvb20odGhpcy5fem9vbSArIChkZWx0YSB8fCAxKSwgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0em9vbU91dDogZnVuY3Rpb24gKGRlbHRhLCBvcHRpb25zKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5zZXRab29tKHRoaXMuX3pvb20gLSAoZGVsdGEgfHwgMSksIG9wdGlvbnMpO1xyXG5cdH0sXHJcblxyXG5cdHNldFpvb21Bcm91bmQ6IGZ1bmN0aW9uIChsYXRsbmcsIHpvb20sIG9wdGlvbnMpIHtcclxuXHRcdHZhciBzY2FsZSA9IHRoaXMuZ2V0Wm9vbVNjYWxlKHpvb20pLFxyXG5cdFx0ICAgIHZpZXdIYWxmID0gdGhpcy5nZXRTaXplKCkuZGl2aWRlQnkoMiksXHJcblx0XHQgICAgY29udGFpbmVyUG9pbnQgPSBsYXRsbmcgaW5zdGFuY2VvZiBMLlBvaW50ID8gbGF0bG5nIDogdGhpcy5sYXRMbmdUb0NvbnRhaW5lclBvaW50KGxhdGxuZyksXHJcblxyXG5cdFx0ICAgIGNlbnRlck9mZnNldCA9IGNvbnRhaW5lclBvaW50LnN1YnRyYWN0KHZpZXdIYWxmKS5tdWx0aXBseUJ5KDEgLSAxIC8gc2NhbGUpLFxyXG5cdFx0ICAgIG5ld0NlbnRlciA9IHRoaXMuY29udGFpbmVyUG9pbnRUb0xhdExuZyh2aWV3SGFsZi5hZGQoY2VudGVyT2Zmc2V0KSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuc2V0VmlldyhuZXdDZW50ZXIsIHpvb20sIHt6b29tOiBvcHRpb25zfSk7XHJcblx0fSxcclxuXHJcblx0Zml0Qm91bmRzOiBmdW5jdGlvbiAoYm91bmRzLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0XHRib3VuZHMgPSBib3VuZHMuZ2V0Qm91bmRzID8gYm91bmRzLmdldEJvdW5kcygpIDogTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHR2YXIgcGFkZGluZ1RMID0gTC5wb2ludChvcHRpb25zLnBhZGRpbmdUb3BMZWZ0IHx8IG9wdGlvbnMucGFkZGluZyB8fCBbMCwgMF0pLFxyXG5cdFx0ICAgIHBhZGRpbmdCUiA9IEwucG9pbnQob3B0aW9ucy5wYWRkaW5nQm90dG9tUmlnaHQgfHwgb3B0aW9ucy5wYWRkaW5nIHx8IFswLCAwXSksXHJcblxyXG5cdFx0ICAgIHpvb20gPSB0aGlzLmdldEJvdW5kc1pvb20oYm91bmRzLCBmYWxzZSwgcGFkZGluZ1RMLmFkZChwYWRkaW5nQlIpKTtcclxuXHJcblx0XHR6b29tID0gKG9wdGlvbnMubWF4Wm9vbSkgPyBNYXRoLm1pbihvcHRpb25zLm1heFpvb20sIHpvb20pIDogem9vbTtcclxuXHJcblx0XHR2YXIgcGFkZGluZ09mZnNldCA9IHBhZGRpbmdCUi5zdWJ0cmFjdChwYWRkaW5nVEwpLmRpdmlkZUJ5KDIpLFxyXG5cclxuXHRcdCAgICBzd1BvaW50ID0gdGhpcy5wcm9qZWN0KGJvdW5kcy5nZXRTb3V0aFdlc3QoKSwgem9vbSksXHJcblx0XHQgICAgbmVQb2ludCA9IHRoaXMucHJvamVjdChib3VuZHMuZ2V0Tm9ydGhFYXN0KCksIHpvb20pLFxyXG5cdFx0ICAgIGNlbnRlciA9IHRoaXMudW5wcm9qZWN0KHN3UG9pbnQuYWRkKG5lUG9pbnQpLmRpdmlkZUJ5KDIpLmFkZChwYWRkaW5nT2Zmc2V0KSwgem9vbSk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuc2V0VmlldyhjZW50ZXIsIHpvb20sIG9wdGlvbnMpO1xyXG5cdH0sXHJcblxyXG5cdGZpdFdvcmxkOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0cmV0dXJuIHRoaXMuZml0Qm91bmRzKFtbLTkwLCAtMTgwXSwgWzkwLCAxODBdXSwgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0cGFuVG86IGZ1bmN0aW9uIChjZW50ZXIsIG9wdGlvbnMpIHsgLy8gKExhdExuZylcclxuXHRcdHJldHVybiB0aGlzLnNldFZpZXcoY2VudGVyLCB0aGlzLl96b29tLCB7cGFuOiBvcHRpb25zfSk7XHJcblx0fSxcclxuXHJcblx0cGFuQnk6IGZ1bmN0aW9uIChvZmZzZXQpIHsgLy8gKFBvaW50KVxyXG5cdFx0Ly8gcmVwbGFjZWQgd2l0aCBhbmltYXRlZCBwYW5CeSBpbiBNYXAuUGFuQW5pbWF0aW9uLmpzXHJcblx0XHR0aGlzLmZpcmUoJ21vdmVzdGFydCcpO1xyXG5cclxuXHRcdHRoaXMuX3Jhd1BhbkJ5KEwucG9pbnQob2Zmc2V0KSk7XHJcblxyXG5cdFx0dGhpcy5maXJlKCdtb3ZlJyk7XHJcblx0XHRyZXR1cm4gdGhpcy5maXJlKCdtb3ZlZW5kJyk7XHJcblx0fSxcclxuXHJcblx0c2V0TWF4Qm91bmRzOiBmdW5jdGlvbiAoYm91bmRzKSB7XHJcblx0XHRib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhib3VuZHMpO1xyXG5cclxuXHRcdHRoaXMub3B0aW9ucy5tYXhCb3VuZHMgPSBib3VuZHM7XHJcblxyXG5cdFx0aWYgKCFib3VuZHMpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMub2ZmKCdtb3ZlZW5kJywgdGhpcy5fcGFuSW5zaWRlTWF4Qm91bmRzLCB0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fbG9hZGVkKSB7XHJcblx0XHRcdHRoaXMuX3Bhbkluc2lkZU1heEJvdW5kcygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLm9uKCdtb3ZlZW5kJywgdGhpcy5fcGFuSW5zaWRlTWF4Qm91bmRzLCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRwYW5JbnNpZGVCb3VuZHM6IGZ1bmN0aW9uIChib3VuZHMsIG9wdGlvbnMpIHtcclxuXHRcdHZhciBjZW50ZXIgPSB0aGlzLmdldENlbnRlcigpLFxyXG5cdFx0XHRuZXdDZW50ZXIgPSB0aGlzLl9saW1pdENlbnRlcihjZW50ZXIsIHRoaXMuX3pvb20sIGJvdW5kcyk7XHJcblxyXG5cdFx0aWYgKGNlbnRlci5lcXVhbHMobmV3Q2VudGVyKSkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdHJldHVybiB0aGlzLnBhblRvKG5ld0NlbnRlciwgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0YWRkTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0Ly8gVE9ETyBtZXRob2QgaXMgdG9vIGJpZywgcmVmYWN0b3JcclxuXHJcblx0XHR2YXIgaWQgPSBMLnN0YW1wKGxheWVyKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbGF5ZXJzW2lkXSkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdHRoaXMuX2xheWVyc1tpZF0gPSBsYXllcjtcclxuXHJcblx0XHQvLyBUT0RPIGdldE1heFpvb20sIGdldE1pblpvb20gaW4gSUxheWVyIChpbnN0ZWFkIG9mIG9wdGlvbnMpXHJcblx0XHRpZiAobGF5ZXIub3B0aW9ucyAmJiAoIWlzTmFOKGxheWVyLm9wdGlvbnMubWF4Wm9vbSkgfHwgIWlzTmFOKGxheWVyLm9wdGlvbnMubWluWm9vbSkpKSB7XHJcblx0XHRcdHRoaXMuX3pvb21Cb3VuZExheWVyc1tpZF0gPSBsYXllcjtcclxuXHRcdFx0dGhpcy5fdXBkYXRlWm9vbUxldmVscygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRPRE8gbG9va3MgdWdseSwgcmVmYWN0b3IhISFcclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuem9vbUFuaW1hdGlvbiAmJiBMLlRpbGVMYXllciAmJiAobGF5ZXIgaW5zdGFuY2VvZiBMLlRpbGVMYXllcikpIHtcclxuXHRcdFx0dGhpcy5fdGlsZUxheWVyc051bSsrO1xyXG5cdFx0XHR0aGlzLl90aWxlTGF5ZXJzVG9Mb2FkKys7XHJcblx0XHRcdGxheWVyLm9uKCdsb2FkJywgdGhpcy5fb25UaWxlTGF5ZXJMb2FkLCB0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fbG9hZGVkKSB7XHJcblx0XHRcdHRoaXMuX2xheWVyQWRkKGxheWVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHR2YXIgaWQgPSBMLnN0YW1wKGxheWVyKTtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2xheWVyc1tpZF0pIHsgcmV0dXJuIHRoaXM7IH1cclxuXHJcblx0XHRpZiAodGhpcy5fbG9hZGVkKSB7XHJcblx0XHRcdGxheWVyLm9uUmVtb3ZlKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlbGV0ZSB0aGlzLl9sYXllcnNbaWRdO1xyXG5cclxuXHRcdGlmICh0aGlzLl9sb2FkZWQpIHtcclxuXHRcdFx0dGhpcy5maXJlKCdsYXllcnJlbW92ZScsIHtsYXllcjogbGF5ZXJ9KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fem9vbUJvdW5kTGF5ZXJzW2lkXSkge1xyXG5cdFx0XHRkZWxldGUgdGhpcy5fem9vbUJvdW5kTGF5ZXJzW2lkXTtcclxuXHRcdFx0dGhpcy5fdXBkYXRlWm9vbUxldmVscygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFRPRE8gbG9va3MgdWdseSwgcmVmYWN0b3JcclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuem9vbUFuaW1hdGlvbiAmJiBMLlRpbGVMYXllciAmJiAobGF5ZXIgaW5zdGFuY2VvZiBMLlRpbGVMYXllcikpIHtcclxuXHRcdFx0dGhpcy5fdGlsZUxheWVyc051bS0tO1xyXG5cdFx0XHR0aGlzLl90aWxlTGF5ZXJzVG9Mb2FkLS07XHJcblx0XHRcdGxheWVyLm9mZignbG9hZCcsIHRoaXMuX29uVGlsZUxheWVyTG9hZCwgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0aGFzTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0aWYgKCFsYXllcikgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblx0XHRyZXR1cm4gKEwuc3RhbXAobGF5ZXIpIGluIHRoaXMuX2xheWVycyk7XHJcblx0fSxcclxuXHJcblx0ZWFjaExheWVyOiBmdW5jdGlvbiAobWV0aG9kLCBjb250ZXh0KSB7XHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xyXG5cdFx0XHRtZXRob2QuY2FsbChjb250ZXh0LCB0aGlzLl9sYXllcnNbaV0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0aW52YWxpZGF0ZVNpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRpZiAoIXRoaXMuX2xvYWRlZCkgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdG9wdGlvbnMgPSBMLmV4dGVuZCh7XHJcblx0XHRcdGFuaW1hdGU6IGZhbHNlLFxyXG5cdFx0XHRwYW46IHRydWVcclxuXHRcdH0sIG9wdGlvbnMgPT09IHRydWUgPyB7YW5pbWF0ZTogdHJ1ZX0gOiBvcHRpb25zKTtcclxuXHJcblx0XHR2YXIgb2xkU2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xyXG5cdFx0dGhpcy5fc2l6ZUNoYW5nZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5faW5pdGlhbENlbnRlciA9IG51bGw7XHJcblxyXG5cdFx0dmFyIG5ld1NpemUgPSB0aGlzLmdldFNpemUoKSxcclxuXHRcdCAgICBvbGRDZW50ZXIgPSBvbGRTaXplLmRpdmlkZUJ5KDIpLnJvdW5kKCksXHJcblx0XHQgICAgbmV3Q2VudGVyID0gbmV3U2l6ZS5kaXZpZGVCeSgyKS5yb3VuZCgpLFxyXG5cdFx0ICAgIG9mZnNldCA9IG9sZENlbnRlci5zdWJ0cmFjdChuZXdDZW50ZXIpO1xyXG5cclxuXHRcdGlmICghb2Zmc2V0LnggJiYgIW9mZnNldC55KSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuYW5pbWF0ZSAmJiBvcHRpb25zLnBhbikge1xyXG5cdFx0XHR0aGlzLnBhbkJ5KG9mZnNldCk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aWYgKG9wdGlvbnMucGFuKSB7XHJcblx0XHRcdFx0dGhpcy5fcmF3UGFuQnkob2Zmc2V0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5maXJlKCdtb3ZlJyk7XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5kZWJvdW5jZU1vdmVlbmQpIHtcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fc2l6ZVRpbWVyKTtcclxuXHRcdFx0XHR0aGlzLl9zaXplVGltZXIgPSBzZXRUaW1lb3V0KEwuYmluZCh0aGlzLmZpcmUsIHRoaXMsICdtb3ZlZW5kJyksIDIwMCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5maXJlKCdtb3ZlZW5kJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5maXJlKCdyZXNpemUnLCB7XHJcblx0XHRcdG9sZFNpemU6IG9sZFNpemUsXHJcblx0XHRcdG5ld1NpemU6IG5ld1NpemVcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRPRE8gaGFuZGxlci5hZGRUb1xyXG5cdGFkZEhhbmRsZXI6IGZ1bmN0aW9uIChuYW1lLCBIYW5kbGVyQ2xhc3MpIHtcclxuXHRcdGlmICghSGFuZGxlckNsYXNzKSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0dmFyIGhhbmRsZXIgPSB0aGlzW25hbWVdID0gbmV3IEhhbmRsZXJDbGFzcyh0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9oYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnNbbmFtZV0pIHtcclxuXHRcdFx0aGFuZGxlci5lbmFibGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRyZW1vdmU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9sb2FkZWQpIHtcclxuXHRcdFx0dGhpcy5maXJlKCd1bmxvYWQnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9pbml0RXZlbnRzKCdvZmYnKTtcclxuXHJcblx0XHR0cnkge1xyXG5cdFx0XHQvLyB0aHJvd3MgZXJyb3IgaW4gSUU2LThcclxuXHRcdFx0ZGVsZXRlIHRoaXMuX2NvbnRhaW5lci5fbGVhZmxldDtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0dGhpcy5fY29udGFpbmVyLl9sZWFmbGV0ID0gdW5kZWZpbmVkO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2NsZWFyUGFuZXMoKTtcclxuXHRcdGlmICh0aGlzLl9jbGVhckNvbnRyb2xQb3MpIHtcclxuXHRcdFx0dGhpcy5fY2xlYXJDb250cm9sUG9zKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fY2xlYXJIYW5kbGVycygpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBwdWJsaWMgbWV0aG9kcyBmb3IgZ2V0dGluZyBtYXAgc3RhdGVcclxuXHJcblx0Z2V0Q2VudGVyOiBmdW5jdGlvbiAoKSB7IC8vIChCb29sZWFuKSAtPiBMYXRMbmdcclxuXHRcdHRoaXMuX2NoZWNrSWZMb2FkZWQoKTtcclxuXHJcblx0XHRpZiAodGhpcy5faW5pdGlhbENlbnRlciAmJiAhdGhpcy5fbW92ZWQoKSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5faW5pdGlhbENlbnRlcjtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzLmxheWVyUG9pbnRUb0xhdExuZyh0aGlzLl9nZXRDZW50ZXJMYXllclBvaW50KCkpO1xyXG5cdH0sXHJcblxyXG5cdGdldFpvb206IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl96b29tO1xyXG5cdH0sXHJcblxyXG5cdGdldEJvdW5kczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGJvdW5kcyA9IHRoaXMuZ2V0UGl4ZWxCb3VuZHMoKSxcclxuXHRcdCAgICBzdyA9IHRoaXMudW5wcm9qZWN0KGJvdW5kcy5nZXRCb3R0b21MZWZ0KCkpLFxyXG5cdFx0ICAgIG5lID0gdGhpcy51bnByb2plY3QoYm91bmRzLmdldFRvcFJpZ2h0KCkpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmdCb3VuZHMoc3csIG5lKTtcclxuXHR9LFxyXG5cclxuXHRnZXRNaW5ab29tOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLm1pblpvb20gPT09IHVuZGVmaW5lZCA/XHJcblx0XHRcdCh0aGlzLl9sYXllcnNNaW5ab29tID09PSB1bmRlZmluZWQgPyAwIDogdGhpcy5fbGF5ZXJzTWluWm9vbSkgOlxyXG5cdFx0XHR0aGlzLm9wdGlvbnMubWluWm9vbTtcclxuXHR9LFxyXG5cclxuXHRnZXRNYXhab29tOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLm1heFpvb20gPT09IHVuZGVmaW5lZCA/XHJcblx0XHRcdCh0aGlzLl9sYXllcnNNYXhab29tID09PSB1bmRlZmluZWQgPyBJbmZpbml0eSA6IHRoaXMuX2xheWVyc01heFpvb20pIDpcclxuXHRcdFx0dGhpcy5vcHRpb25zLm1heFpvb207XHJcblx0fSxcclxuXHJcblx0Z2V0Qm91bmRzWm9vbTogZnVuY3Rpb24gKGJvdW5kcywgaW5zaWRlLCBwYWRkaW5nKSB7IC8vIChMYXRMbmdCb3VuZHNbLCBCb29sZWFuLCBQb2ludF0pIC0+IE51bWJlclxyXG5cdFx0Ym91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHR2YXIgem9vbSA9IHRoaXMuZ2V0TWluWm9vbSgpIC0gKGluc2lkZSA/IDEgOiAwKSxcclxuXHRcdCAgICBtYXhab29tID0gdGhpcy5nZXRNYXhab29tKCksXHJcblx0XHQgICAgc2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpLFxyXG5cclxuXHRcdCAgICBudyA9IGJvdW5kcy5nZXROb3J0aFdlc3QoKSxcclxuXHRcdCAgICBzZSA9IGJvdW5kcy5nZXRTb3V0aEVhc3QoKSxcclxuXHJcblx0XHQgICAgem9vbU5vdEZvdW5kID0gdHJ1ZSxcclxuXHRcdCAgICBib3VuZHNTaXplO1xyXG5cclxuXHRcdHBhZGRpbmcgPSBMLnBvaW50KHBhZGRpbmcgfHwgWzAsIDBdKTtcclxuXHJcblx0XHRkbyB7XHJcblx0XHRcdHpvb20rKztcclxuXHRcdFx0Ym91bmRzU2l6ZSA9IHRoaXMucHJvamVjdChzZSwgem9vbSkuc3VidHJhY3QodGhpcy5wcm9qZWN0KG53LCB6b29tKSkuYWRkKHBhZGRpbmcpO1xyXG5cdFx0XHR6b29tTm90Rm91bmQgPSAhaW5zaWRlID8gc2l6ZS5jb250YWlucyhib3VuZHNTaXplKSA6IGJvdW5kc1NpemUueCA8IHNpemUueCB8fCBib3VuZHNTaXplLnkgPCBzaXplLnk7XHJcblxyXG5cdFx0fSB3aGlsZSAoem9vbU5vdEZvdW5kICYmIHpvb20gPD0gbWF4Wm9vbSk7XHJcblxyXG5cdFx0aWYgKHpvb21Ob3RGb3VuZCAmJiBpbnNpZGUpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc2lkZSA/IHpvb20gOiB6b29tIC0gMTtcclxuXHR9LFxyXG5cclxuXHRnZXRTaXplOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX3NpemUgfHwgdGhpcy5fc2l6ZUNoYW5nZWQpIHtcclxuXHRcdFx0dGhpcy5fc2l6ZSA9IG5ldyBMLlBvaW50KFxyXG5cdFx0XHRcdHRoaXMuX2NvbnRhaW5lci5jbGllbnRXaWR0aCxcclxuXHRcdFx0XHR0aGlzLl9jb250YWluZXIuY2xpZW50SGVpZ2h0KTtcclxuXHJcblx0XHRcdHRoaXMuX3NpemVDaGFuZ2VkID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5fc2l6ZS5jbG9uZSgpO1xyXG5cdH0sXHJcblxyXG5cdGdldFBpeGVsQm91bmRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgdG9wTGVmdFBvaW50ID0gdGhpcy5fZ2V0VG9wTGVmdFBvaW50KCk7XHJcblx0XHRyZXR1cm4gbmV3IEwuQm91bmRzKHRvcExlZnRQb2ludCwgdG9wTGVmdFBvaW50LmFkZCh0aGlzLmdldFNpemUoKSkpO1xyXG5cdH0sXHJcblxyXG5cdGdldFBpeGVsT3JpZ2luOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9jaGVja0lmTG9hZGVkKCk7XHJcblx0XHRyZXR1cm4gdGhpcy5faW5pdGlhbFRvcExlZnRQb2ludDtcclxuXHR9LFxyXG5cclxuXHRnZXRQYW5lczogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3BhbmVzO1xyXG5cdH0sXHJcblxyXG5cdGdldENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gVE9ETyByZXBsYWNlIHdpdGggdW5pdmVyc2FsIGltcGxlbWVudGF0aW9uIGFmdGVyIHJlZmFjdG9yaW5nIHByb2plY3Rpb25zXHJcblxyXG5cdGdldFpvb21TY2FsZTogZnVuY3Rpb24gKHRvWm9vbSkge1xyXG5cdFx0dmFyIGNycyA9IHRoaXMub3B0aW9ucy5jcnM7XHJcblx0XHRyZXR1cm4gY3JzLnNjYWxlKHRvWm9vbSkgLyBjcnMuc2NhbGUodGhpcy5fem9vbSk7XHJcblx0fSxcclxuXHJcblx0Z2V0U2NhbGVab29tOiBmdW5jdGlvbiAoc2NhbGUpIHtcclxuXHRcdHJldHVybiB0aGlzLl96b29tICsgKE1hdGgubG9nKHNjYWxlKSAvIE1hdGguTE4yKTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gY29udmVyc2lvbiBtZXRob2RzXHJcblxyXG5cdHByb2plY3Q6IGZ1bmN0aW9uIChsYXRsbmcsIHpvb20pIHsgLy8gKExhdExuZ1ssIE51bWJlcl0pIC0+IFBvaW50XHJcblx0XHR6b29tID0gem9vbSA9PT0gdW5kZWZpbmVkID8gdGhpcy5fem9vbSA6IHpvb207XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmNycy5sYXRMbmdUb1BvaW50KEwubGF0TG5nKGxhdGxuZyksIHpvb20pO1xyXG5cdH0sXHJcblxyXG5cdHVucHJvamVjdDogZnVuY3Rpb24gKHBvaW50LCB6b29tKSB7IC8vIChQb2ludFssIE51bWJlcl0pIC0+IExhdExuZ1xyXG5cdFx0em9vbSA9IHpvb20gPT09IHVuZGVmaW5lZCA/IHRoaXMuX3pvb20gOiB6b29tO1xyXG5cdFx0cmV0dXJuIHRoaXMub3B0aW9ucy5jcnMucG9pbnRUb0xhdExuZyhMLnBvaW50KHBvaW50KSwgem9vbSk7XHJcblx0fSxcclxuXHJcblx0bGF5ZXJQb2ludFRvTGF0TG5nOiBmdW5jdGlvbiAocG9pbnQpIHsgLy8gKFBvaW50KVxyXG5cdFx0dmFyIHByb2plY3RlZFBvaW50ID0gTC5wb2ludChwb2ludCkuYWRkKHRoaXMuZ2V0UGl4ZWxPcmlnaW4oKSk7XHJcblx0XHRyZXR1cm4gdGhpcy51bnByb2plY3QocHJvamVjdGVkUG9pbnQpO1xyXG5cdH0sXHJcblxyXG5cdGxhdExuZ1RvTGF5ZXJQb2ludDogZnVuY3Rpb24gKGxhdGxuZykgeyAvLyAoTGF0TG5nKVxyXG5cdFx0dmFyIHByb2plY3RlZFBvaW50ID0gdGhpcy5wcm9qZWN0KEwubGF0TG5nKGxhdGxuZykpLl9yb3VuZCgpO1xyXG5cdFx0cmV0dXJuIHByb2plY3RlZFBvaW50Ll9zdWJ0cmFjdCh0aGlzLmdldFBpeGVsT3JpZ2luKCkpO1xyXG5cdH0sXHJcblxyXG5cdGNvbnRhaW5lclBvaW50VG9MYXllclBvaW50OiBmdW5jdGlvbiAocG9pbnQpIHsgLy8gKFBvaW50KVxyXG5cdFx0cmV0dXJuIEwucG9pbnQocG9pbnQpLnN1YnRyYWN0KHRoaXMuX2dldE1hcFBhbmVQb3MoKSk7XHJcblx0fSxcclxuXHJcblx0bGF5ZXJQb2ludFRvQ29udGFpbmVyUG9pbnQ6IGZ1bmN0aW9uIChwb2ludCkgeyAvLyAoUG9pbnQpXHJcblx0XHRyZXR1cm4gTC5wb2ludChwb2ludCkuYWRkKHRoaXMuX2dldE1hcFBhbmVQb3MoKSk7XHJcblx0fSxcclxuXHJcblx0Y29udGFpbmVyUG9pbnRUb0xhdExuZzogZnVuY3Rpb24gKHBvaW50KSB7XHJcblx0XHR2YXIgbGF5ZXJQb2ludCA9IHRoaXMuY29udGFpbmVyUG9pbnRUb0xheWVyUG9pbnQoTC5wb2ludChwb2ludCkpO1xyXG5cdFx0cmV0dXJuIHRoaXMubGF5ZXJQb2ludFRvTGF0TG5nKGxheWVyUG9pbnQpO1xyXG5cdH0sXHJcblxyXG5cdGxhdExuZ1RvQ29udGFpbmVyUG9pbnQ6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHJldHVybiB0aGlzLmxheWVyUG9pbnRUb0NvbnRhaW5lclBvaW50KHRoaXMubGF0TG5nVG9MYXllclBvaW50KEwubGF0TG5nKGxhdGxuZykpKTtcclxuXHR9LFxyXG5cclxuXHRtb3VzZUV2ZW50VG9Db250YWluZXJQb2ludDogZnVuY3Rpb24gKGUpIHsgLy8gKE1vdXNlRXZlbnQpXHJcblx0XHRyZXR1cm4gTC5Eb21FdmVudC5nZXRNb3VzZVBvc2l0aW9uKGUsIHRoaXMuX2NvbnRhaW5lcik7XHJcblx0fSxcclxuXHJcblx0bW91c2VFdmVudFRvTGF5ZXJQb2ludDogZnVuY3Rpb24gKGUpIHsgLy8gKE1vdXNlRXZlbnQpXHJcblx0XHRyZXR1cm4gdGhpcy5jb250YWluZXJQb2ludFRvTGF5ZXJQb2ludCh0aGlzLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGUpKTtcclxuXHR9LFxyXG5cclxuXHRtb3VzZUV2ZW50VG9MYXRMbmc6IGZ1bmN0aW9uIChlKSB7IC8vIChNb3VzZUV2ZW50KVxyXG5cdFx0cmV0dXJuIHRoaXMubGF5ZXJQb2ludFRvTGF0TG5nKHRoaXMubW91c2VFdmVudFRvTGF5ZXJQb2ludChlKSk7XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIG1hcCBpbml0aWFsaXphdGlvbiBtZXRob2RzXHJcblxyXG5cdF9pbml0Q29udGFpbmVyOiBmdW5jdGlvbiAoaWQpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgPSBMLkRvbVV0aWwuZ2V0KGlkKTtcclxuXHJcblx0XHRpZiAoIWNvbnRhaW5lcikge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01hcCBjb250YWluZXIgbm90IGZvdW5kLicpO1xyXG5cdFx0fSBlbHNlIGlmIChjb250YWluZXIuX2xlYWZsZXQpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNYXAgY29udGFpbmVyIGlzIGFscmVhZHkgaW5pdGlhbGl6ZWQuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29udGFpbmVyLl9sZWFmbGV0ID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRfaW5pdExheW91dDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lcjtcclxuXHJcblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MoY29udGFpbmVyLCAnbGVhZmxldC1jb250YWluZXInICtcclxuXHRcdFx0KEwuQnJvd3Nlci50b3VjaCA/ICcgbGVhZmxldC10b3VjaCcgOiAnJykgK1xyXG5cdFx0XHQoTC5Ccm93c2VyLnJldGluYSA/ICcgbGVhZmxldC1yZXRpbmEnIDogJycpICtcclxuXHRcdFx0KEwuQnJvd3Nlci5pZWx0OSA/ICcgbGVhZmxldC1vbGRpZScgOiAnJykgK1xyXG5cdFx0XHQodGhpcy5vcHRpb25zLmZhZGVBbmltYXRpb24gPyAnIGxlYWZsZXQtZmFkZS1hbmltJyA6ICcnKSk7XHJcblxyXG5cdFx0dmFyIHBvc2l0aW9uID0gTC5Eb21VdGlsLmdldFN0eWxlKGNvbnRhaW5lciwgJ3Bvc2l0aW9uJyk7XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uICE9PSAnYWJzb2x1dGUnICYmIHBvc2l0aW9uICE9PSAncmVsYXRpdmUnICYmIHBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XHJcblx0XHRcdGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faW5pdFBhbmVzKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2luaXRDb250cm9sUG9zKSB7XHJcblx0XHRcdHRoaXMuX2luaXRDb250cm9sUG9zKCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2luaXRQYW5lczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHBhbmVzID0gdGhpcy5fcGFuZXMgPSB7fTtcclxuXHJcblx0XHR0aGlzLl9tYXBQYW5lID0gcGFuZXMubWFwUGFuZSA9IHRoaXMuX2NyZWF0ZVBhbmUoJ2xlYWZsZXQtbWFwLXBhbmUnLCB0aGlzLl9jb250YWluZXIpO1xyXG5cclxuXHRcdHRoaXMuX3RpbGVQYW5lID0gcGFuZXMudGlsZVBhbmUgPSB0aGlzLl9jcmVhdGVQYW5lKCdsZWFmbGV0LXRpbGUtcGFuZScsIHRoaXMuX21hcFBhbmUpO1xyXG5cdFx0cGFuZXMub2JqZWN0c1BhbmUgPSB0aGlzLl9jcmVhdGVQYW5lKCdsZWFmbGV0LW9iamVjdHMtcGFuZScsIHRoaXMuX21hcFBhbmUpO1xyXG5cdFx0cGFuZXMuc2hhZG93UGFuZSA9IHRoaXMuX2NyZWF0ZVBhbmUoJ2xlYWZsZXQtc2hhZG93LXBhbmUnKTtcclxuXHRcdHBhbmVzLm92ZXJsYXlQYW5lID0gdGhpcy5fY3JlYXRlUGFuZSgnbGVhZmxldC1vdmVybGF5LXBhbmUnKTtcclxuXHRcdHBhbmVzLm1hcmtlclBhbmUgPSB0aGlzLl9jcmVhdGVQYW5lKCdsZWFmbGV0LW1hcmtlci1wYW5lJyk7XHJcblx0XHRwYW5lcy5wb3B1cFBhbmUgPSB0aGlzLl9jcmVhdGVQYW5lKCdsZWFmbGV0LXBvcHVwLXBhbmUnKTtcclxuXHJcblx0XHR2YXIgem9vbUhpZGUgPSAnIGxlYWZsZXQtem9vbS1oaWRlJztcclxuXHJcblx0XHRpZiAoIXRoaXMub3B0aW9ucy5tYXJrZXJab29tQW5pbWF0aW9uKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhwYW5lcy5tYXJrZXJQYW5lLCB6b29tSGlkZSk7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhwYW5lcy5zaGFkb3dQYW5lLCB6b29tSGlkZSk7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhwYW5lcy5wb3B1cFBhbmUsIHpvb21IaWRlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfY3JlYXRlUGFuZTogZnVuY3Rpb24gKGNsYXNzTmFtZSwgY29udGFpbmVyKSB7XHJcblx0XHRyZXR1cm4gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lLCBjb250YWluZXIgfHwgdGhpcy5fcGFuZXMub2JqZWN0c1BhbmUpO1xyXG5cdH0sXHJcblxyXG5cdF9jbGVhclBhbmVzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9jb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5fbWFwUGFuZSk7XHJcblx0fSxcclxuXHJcblx0X2FkZExheWVyczogZnVuY3Rpb24gKGxheWVycykge1xyXG5cdFx0bGF5ZXJzID0gbGF5ZXJzID8gKEwuVXRpbC5pc0FycmF5KGxheWVycykgPyBsYXllcnMgOiBbbGF5ZXJzXSkgOiBbXTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gbGF5ZXJzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdHRoaXMuYWRkTGF5ZXIobGF5ZXJzW2ldKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gcHJpdmF0ZSBtZXRob2RzIHRoYXQgbW9kaWZ5IG1hcCBzdGF0ZVxyXG5cclxuXHRfcmVzZXRWaWV3OiBmdW5jdGlvbiAoY2VudGVyLCB6b29tLCBwcmVzZXJ2ZU1hcE9mZnNldCwgYWZ0ZXJab29tQW5pbSkge1xyXG5cclxuXHRcdHZhciB6b29tQ2hhbmdlZCA9ICh0aGlzLl96b29tICE9PSB6b29tKTtcclxuXHJcblx0XHRpZiAoIWFmdGVyWm9vbUFuaW0pIHtcclxuXHRcdFx0dGhpcy5maXJlKCdtb3Zlc3RhcnQnKTtcclxuXHJcblx0XHRcdGlmICh6b29tQ2hhbmdlZCkge1xyXG5cdFx0XHRcdHRoaXMuZmlyZSgnem9vbXN0YXJ0Jyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl96b29tID0gem9vbTtcclxuXHRcdHRoaXMuX2luaXRpYWxDZW50ZXIgPSBjZW50ZXI7XHJcblxyXG5cdFx0dGhpcy5faW5pdGlhbFRvcExlZnRQb2ludCA9IHRoaXMuX2dldE5ld1RvcExlZnRQb2ludChjZW50ZXIpO1xyXG5cclxuXHRcdGlmICghcHJlc2VydmVNYXBPZmZzZXQpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX21hcFBhbmUsIG5ldyBMLlBvaW50KDAsIDApKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX2luaXRpYWxUb3BMZWZ0UG9pbnQuX2FkZCh0aGlzLl9nZXRNYXBQYW5lUG9zKCkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3RpbGVMYXllcnNUb0xvYWQgPSB0aGlzLl90aWxlTGF5ZXJzTnVtO1xyXG5cclxuXHRcdHZhciBsb2FkaW5nID0gIXRoaXMuX2xvYWRlZDtcclxuXHRcdHRoaXMuX2xvYWRlZCA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5maXJlKCd2aWV3cmVzZXQnLCB7aGFyZDogIXByZXNlcnZlTWFwT2Zmc2V0fSk7XHJcblxyXG5cdFx0aWYgKGxvYWRpbmcpIHtcclxuXHRcdFx0dGhpcy5maXJlKCdsb2FkJyk7XHJcblx0XHRcdHRoaXMuZWFjaExheWVyKHRoaXMuX2xheWVyQWRkLCB0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZpcmUoJ21vdmUnKTtcclxuXHJcblx0XHRpZiAoem9vbUNoYW5nZWQgfHwgYWZ0ZXJab29tQW5pbSkge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ3pvb21lbmQnKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZpcmUoJ21vdmVlbmQnLCB7aGFyZDogIXByZXNlcnZlTWFwT2Zmc2V0fSk7XHJcblx0fSxcclxuXHJcblx0X3Jhd1BhbkJ5OiBmdW5jdGlvbiAob2Zmc2V0KSB7XHJcblx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5fbWFwUGFuZSwgdGhpcy5fZ2V0TWFwUGFuZVBvcygpLnN1YnRyYWN0KG9mZnNldCkpO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRab29tU3BhbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuZ2V0TWF4Wm9vbSgpIC0gdGhpcy5nZXRNaW5ab29tKCk7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZVpvb21MZXZlbHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBpLFxyXG5cdFx0XHRtaW5ab29tID0gSW5maW5pdHksXHJcblx0XHRcdG1heFpvb20gPSAtSW5maW5pdHksXHJcblx0XHRcdG9sZFpvb21TcGFuID0gdGhpcy5fZ2V0Wm9vbVNwYW4oKTtcclxuXHJcblx0XHRmb3IgKGkgaW4gdGhpcy5fem9vbUJvdW5kTGF5ZXJzKSB7XHJcblx0XHRcdHZhciBsYXllciA9IHRoaXMuX3pvb21Cb3VuZExheWVyc1tpXTtcclxuXHRcdFx0aWYgKCFpc05hTihsYXllci5vcHRpb25zLm1pblpvb20pKSB7XHJcblx0XHRcdFx0bWluWm9vbSA9IE1hdGgubWluKG1pblpvb20sIGxheWVyLm9wdGlvbnMubWluWm9vbSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFpc05hTihsYXllci5vcHRpb25zLm1heFpvb20pKSB7XHJcblx0XHRcdFx0bWF4Wm9vbSA9IE1hdGgubWF4KG1heFpvb20sIGxheWVyLm9wdGlvbnMubWF4Wm9vbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoaSA9PT0gdW5kZWZpbmVkKSB7IC8vIHdlIGhhdmUgbm8gdGlsZWxheWVyc1xyXG5cdFx0XHR0aGlzLl9sYXllcnNNYXhab29tID0gdGhpcy5fbGF5ZXJzTWluWm9vbSA9IHVuZGVmaW5lZDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX2xheWVyc01heFpvb20gPSBtYXhab29tO1xyXG5cdFx0XHR0aGlzLl9sYXllcnNNaW5ab29tID0gbWluWm9vbTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob2xkWm9vbVNwYW4gIT09IHRoaXMuX2dldFpvb21TcGFuKCkpIHtcclxuXHRcdFx0dGhpcy5maXJlKCd6b29tbGV2ZWxzY2hhbmdlJyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X3Bhbkluc2lkZU1heEJvdW5kczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5wYW5JbnNpZGVCb3VuZHModGhpcy5vcHRpb25zLm1heEJvdW5kcyk7XHJcblx0fSxcclxuXHJcblx0X2NoZWNrSWZMb2FkZWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fbG9hZGVkKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignU2V0IG1hcCBjZW50ZXIgYW5kIHpvb20gZmlyc3QuJyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gbWFwIGV2ZW50c1xyXG5cclxuXHRfaW5pdEV2ZW50czogZnVuY3Rpb24gKG9uT2ZmKSB7XHJcblx0XHRpZiAoIUwuRG9tRXZlbnQpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0b25PZmYgPSBvbk9mZiB8fCAnb24nO1xyXG5cclxuXHRcdEwuRG9tRXZlbnRbb25PZmZdKHRoaXMuX2NvbnRhaW5lciwgJ2NsaWNrJywgdGhpcy5fb25Nb3VzZUNsaWNrLCB0aGlzKTtcclxuXHJcblx0XHR2YXIgZXZlbnRzID0gWydkYmxjbGljaycsICdtb3VzZWRvd24nLCAnbW91c2V1cCcsICdtb3VzZWVudGVyJyxcclxuXHRcdCAgICAgICAgICAgICAgJ21vdXNlbGVhdmUnLCAnbW91c2Vtb3ZlJywgJ2NvbnRleHRtZW51J10sXHJcblx0XHQgICAgaSwgbGVuO1xyXG5cclxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGV2ZW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRMLkRvbUV2ZW50W29uT2ZmXSh0aGlzLl9jb250YWluZXIsIGV2ZW50c1tpXSwgdGhpcy5fZmlyZU1vdXNlRXZlbnQsIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMudHJhY2tSZXNpemUpIHtcclxuXHRcdFx0TC5Eb21FdmVudFtvbk9mZl0od2luZG93LCAncmVzaXplJywgdGhpcy5fb25SZXNpemUsIHRoaXMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9vblJlc2l6ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5VdGlsLmNhbmNlbEFuaW1GcmFtZSh0aGlzLl9yZXNpemVSZXF1ZXN0KTtcclxuXHRcdHRoaXMuX3Jlc2l6ZVJlcXVlc3QgPSBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShcclxuXHRcdCAgICAgICAgZnVuY3Rpb24gKCkgeyB0aGlzLmludmFsaWRhdGVTaXplKHtkZWJvdW5jZU1vdmVlbmQ6IHRydWV9KTsgfSwgdGhpcywgZmFsc2UsIHRoaXMuX2NvbnRhaW5lcik7XHJcblx0fSxcclxuXHJcblx0X29uTW91c2VDbGljazogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICghdGhpcy5fbG9hZGVkIHx8ICghZS5fc2ltdWxhdGVkICYmXHJcblx0XHQgICAgICAgICgodGhpcy5kcmFnZ2luZyAmJiB0aGlzLmRyYWdnaW5nLm1vdmVkKCkpIHx8XHJcblx0XHQgICAgICAgICAodGhpcy5ib3hab29tICAmJiB0aGlzLmJveFpvb20ubW92ZWQoKSkpKSB8fFxyXG5cdFx0ICAgICAgICAgICAgTC5Eb21FdmVudC5fc2tpcHBlZChlKSkgeyByZXR1cm47IH1cclxuXHJcblx0XHR0aGlzLmZpcmUoJ3ByZWNsaWNrJyk7XHJcblx0XHR0aGlzLl9maXJlTW91c2VFdmVudChlKTtcclxuXHR9LFxyXG5cclxuXHRfZmlyZU1vdXNlRXZlbnQ6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoIXRoaXMuX2xvYWRlZCB8fCBMLkRvbUV2ZW50Ll9za2lwcGVkKGUpKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciB0eXBlID0gZS50eXBlO1xyXG5cclxuXHRcdHR5cGUgPSAodHlwZSA9PT0gJ21vdXNlZW50ZXInID8gJ21vdXNlb3ZlcicgOiAodHlwZSA9PT0gJ21vdXNlbGVhdmUnID8gJ21vdXNlb3V0JyA6IHR5cGUpKTtcclxuXHJcblx0XHRpZiAoIXRoaXMuaGFzRXZlbnRMaXN0ZW5lcnModHlwZSkpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0aWYgKHR5cGUgPT09ICdjb250ZXh0bWVudScpIHtcclxuXHRcdFx0TC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY29udGFpbmVyUG9pbnQgPSB0aGlzLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGUpLFxyXG5cdFx0ICAgIGxheWVyUG9pbnQgPSB0aGlzLmNvbnRhaW5lclBvaW50VG9MYXllclBvaW50KGNvbnRhaW5lclBvaW50KSxcclxuXHRcdCAgICBsYXRsbmcgPSB0aGlzLmxheWVyUG9pbnRUb0xhdExuZyhsYXllclBvaW50KTtcclxuXHJcblx0XHR0aGlzLmZpcmUodHlwZSwge1xyXG5cdFx0XHRsYXRsbmc6IGxhdGxuZyxcclxuXHRcdFx0bGF5ZXJQb2ludDogbGF5ZXJQb2ludCxcclxuXHRcdFx0Y29udGFpbmVyUG9pbnQ6IGNvbnRhaW5lclBvaW50LFxyXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBlXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRfb25UaWxlTGF5ZXJMb2FkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl90aWxlTGF5ZXJzVG9Mb2FkLS07XHJcblx0XHRpZiAodGhpcy5fdGlsZUxheWVyc051bSAmJiAhdGhpcy5fdGlsZUxheWVyc1RvTG9hZCkge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ3RpbGVsYXllcnNsb2FkJyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2NsZWFySGFuZGxlcnM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9oYW5kbGVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHR0aGlzLl9oYW5kbGVyc1tpXS5kaXNhYmxlKCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0d2hlblJlYWR5OiBmdW5jdGlvbiAoY2FsbGJhY2ssIGNvbnRleHQpIHtcclxuXHRcdGlmICh0aGlzLl9sb2FkZWQpIHtcclxuXHRcdFx0Y2FsbGJhY2suY2FsbChjb250ZXh0IHx8IHRoaXMsIHRoaXMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5vbignbG9hZCcsIGNhbGxiYWNrLCBjb250ZXh0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF9sYXllckFkZDogZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHRsYXllci5vbkFkZCh0aGlzKTtcclxuXHRcdHRoaXMuZmlyZSgnbGF5ZXJhZGQnLCB7bGF5ZXI6IGxheWVyfSk7XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIHByaXZhdGUgbWV0aG9kcyBmb3IgZ2V0dGluZyBtYXAgc3RhdGVcclxuXHJcblx0X2dldE1hcFBhbmVQb3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBMLkRvbVV0aWwuZ2V0UG9zaXRpb24odGhpcy5fbWFwUGFuZSk7XHJcblx0fSxcclxuXHJcblx0X21vdmVkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcG9zID0gdGhpcy5fZ2V0TWFwUGFuZVBvcygpO1xyXG5cdFx0cmV0dXJuIHBvcyAmJiAhcG9zLmVxdWFscyhbMCwgMF0pO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRUb3BMZWZ0UG9pbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmdldFBpeGVsT3JpZ2luKCkuc3VidHJhY3QodGhpcy5fZ2V0TWFwUGFuZVBvcygpKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0TmV3VG9wTGVmdFBvaW50OiBmdW5jdGlvbiAoY2VudGVyLCB6b29tKSB7XHJcblx0XHR2YXIgdmlld0hhbGYgPSB0aGlzLmdldFNpemUoKS5fZGl2aWRlQnkoMik7XHJcblx0XHQvLyBUT0RPIHJvdW5kIG9uIGRpc3BsYXksIG5vdCBjYWxjdWxhdGlvbiB0byBpbmNyZWFzZSBwcmVjaXNpb24/XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9qZWN0KGNlbnRlciwgem9vbSkuX3N1YnRyYWN0KHZpZXdIYWxmKS5fcm91bmQoKTtcclxuXHR9LFxyXG5cclxuXHRfbGF0TG5nVG9OZXdMYXllclBvaW50OiBmdW5jdGlvbiAobGF0bG5nLCBuZXdab29tLCBuZXdDZW50ZXIpIHtcclxuXHRcdHZhciB0b3BMZWZ0ID0gdGhpcy5fZ2V0TmV3VG9wTGVmdFBvaW50KG5ld0NlbnRlciwgbmV3Wm9vbSkuYWRkKHRoaXMuX2dldE1hcFBhbmVQb3MoKSk7XHJcblx0XHRyZXR1cm4gdGhpcy5wcm9qZWN0KGxhdGxuZywgbmV3Wm9vbSkuX3N1YnRyYWN0KHRvcExlZnQpO1xyXG5cdH0sXHJcblxyXG5cdC8vIGxheWVyIHBvaW50IG9mIHRoZSBjdXJyZW50IGNlbnRlclxyXG5cdF9nZXRDZW50ZXJMYXllclBvaW50OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250YWluZXJQb2ludFRvTGF5ZXJQb2ludCh0aGlzLmdldFNpemUoKS5fZGl2aWRlQnkoMikpO1xyXG5cdH0sXHJcblxyXG5cdC8vIG9mZnNldCBvZiB0aGUgc3BlY2lmaWVkIHBsYWNlIHRvIHRoZSBjdXJyZW50IGNlbnRlciBpbiBwaXhlbHNcclxuXHRfZ2V0Q2VudGVyT2Zmc2V0OiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5sYXRMbmdUb0xheWVyUG9pbnQobGF0bG5nKS5zdWJ0cmFjdCh0aGlzLl9nZXRDZW50ZXJMYXllclBvaW50KCkpO1xyXG5cdH0sXHJcblxyXG5cdC8vIGFkanVzdCBjZW50ZXIgZm9yIHZpZXcgdG8gZ2V0IGluc2lkZSBib3VuZHNcclxuXHRfbGltaXRDZW50ZXI6IGZ1bmN0aW9uIChjZW50ZXIsIHpvb20sIGJvdW5kcykge1xyXG5cclxuXHRcdGlmICghYm91bmRzKSB7IHJldHVybiBjZW50ZXI7IH1cclxuXHJcblx0XHR2YXIgY2VudGVyUG9pbnQgPSB0aGlzLnByb2plY3QoY2VudGVyLCB6b29tKSxcclxuXHRcdCAgICB2aWV3SGFsZiA9IHRoaXMuZ2V0U2l6ZSgpLmRpdmlkZUJ5KDIpLFxyXG5cdFx0ICAgIHZpZXdCb3VuZHMgPSBuZXcgTC5Cb3VuZHMoY2VudGVyUG9pbnQuc3VidHJhY3Qodmlld0hhbGYpLCBjZW50ZXJQb2ludC5hZGQodmlld0hhbGYpKSxcclxuXHRcdCAgICBvZmZzZXQgPSB0aGlzLl9nZXRCb3VuZHNPZmZzZXQodmlld0JvdW5kcywgYm91bmRzLCB6b29tKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy51bnByb2plY3QoY2VudGVyUG9pbnQuYWRkKG9mZnNldCksIHpvb20pO1xyXG5cdH0sXHJcblxyXG5cdC8vIGFkanVzdCBvZmZzZXQgZm9yIHZpZXcgdG8gZ2V0IGluc2lkZSBib3VuZHNcclxuXHRfbGltaXRPZmZzZXQ6IGZ1bmN0aW9uIChvZmZzZXQsIGJvdW5kcykge1xyXG5cdFx0aWYgKCFib3VuZHMpIHsgcmV0dXJuIG9mZnNldDsgfVxyXG5cclxuXHRcdHZhciB2aWV3Qm91bmRzID0gdGhpcy5nZXRQaXhlbEJvdW5kcygpLFxyXG5cdFx0ICAgIG5ld0JvdW5kcyA9IG5ldyBMLkJvdW5kcyh2aWV3Qm91bmRzLm1pbi5hZGQob2Zmc2V0KSwgdmlld0JvdW5kcy5tYXguYWRkKG9mZnNldCkpO1xyXG5cclxuXHRcdHJldHVybiBvZmZzZXQuYWRkKHRoaXMuX2dldEJvdW5kc09mZnNldChuZXdCb3VuZHMsIGJvdW5kcykpO1xyXG5cdH0sXHJcblxyXG5cdC8vIHJldHVybnMgb2Zmc2V0IG5lZWRlZCBmb3IgcHhCb3VuZHMgdG8gZ2V0IGluc2lkZSBtYXhCb3VuZHMgYXQgYSBzcGVjaWZpZWQgem9vbVxyXG5cdF9nZXRCb3VuZHNPZmZzZXQ6IGZ1bmN0aW9uIChweEJvdW5kcywgbWF4Qm91bmRzLCB6b29tKSB7XHJcblx0XHR2YXIgbndPZmZzZXQgPSB0aGlzLnByb2plY3QobWF4Qm91bmRzLmdldE5vcnRoV2VzdCgpLCB6b29tKS5zdWJ0cmFjdChweEJvdW5kcy5taW4pLFxyXG5cdFx0ICAgIHNlT2Zmc2V0ID0gdGhpcy5wcm9qZWN0KG1heEJvdW5kcy5nZXRTb3V0aEVhc3QoKSwgem9vbSkuc3VidHJhY3QocHhCb3VuZHMubWF4KSxcclxuXHJcblx0XHQgICAgZHggPSB0aGlzLl9yZWJvdW5kKG53T2Zmc2V0LngsIC1zZU9mZnNldC54KSxcclxuXHRcdCAgICBkeSA9IHRoaXMuX3JlYm91bmQobndPZmZzZXQueSwgLXNlT2Zmc2V0LnkpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludChkeCwgZHkpO1xyXG5cdH0sXHJcblxyXG5cdF9yZWJvdW5kOiBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHtcclxuXHRcdHJldHVybiBsZWZ0ICsgcmlnaHQgPiAwID9cclxuXHRcdFx0TWF0aC5yb3VuZChsZWZ0IC0gcmlnaHQpIC8gMiA6XHJcblx0XHRcdE1hdGgubWF4KDAsIE1hdGguY2VpbChsZWZ0KSkgLSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHJpZ2h0KSk7XHJcblx0fSxcclxuXHJcblx0X2xpbWl0Wm9vbTogZnVuY3Rpb24gKHpvb20pIHtcclxuXHRcdHZhciBtaW4gPSB0aGlzLmdldE1pblpvb20oKSxcclxuXHRcdCAgICBtYXggPSB0aGlzLmdldE1heFpvb20oKTtcclxuXHJcblx0XHRyZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbihtYXgsIHpvb20pKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5tYXAgPSBmdW5jdGlvbiAoaWQsIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuTWFwKGlkLCBvcHRpb25zKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBNZXJjYXRvciBwcm9qZWN0aW9uIHRoYXQgdGFrZXMgaW50byBhY2NvdW50IHRoYXQgdGhlIEVhcnRoIGlzIG5vdCBhIHBlcmZlY3Qgc3BoZXJlLlxyXG4gKiBMZXNzIHBvcHVsYXIgdGhhbiBzcGhlcmljYWwgbWVyY2F0b3I7IHVzZWQgYnkgcHJvamVjdGlvbnMgbGlrZSBFUFNHOjMzOTUuXHJcbiAqL1xyXG5cclxuTC5Qcm9qZWN0aW9uLk1lcmNhdG9yID0ge1xyXG5cdE1BWF9MQVRJVFVERTogODUuMDg0MDU5MTU1NixcclxuXHJcblx0Ul9NSU5PUjogNjM1Njc1Mi4zMTQyNDUxNzksXHJcblx0Ul9NQUpPUjogNjM3ODEzNyxcclxuXHJcblx0cHJvamVjdDogZnVuY3Rpb24gKGxhdGxuZykgeyAvLyAoTGF0TG5nKSAtPiBQb2ludFxyXG5cdFx0dmFyIGQgPSBMLkxhdExuZy5ERUdfVE9fUkFELFxyXG5cdFx0ICAgIG1heCA9IHRoaXMuTUFYX0xBVElUVURFLFxyXG5cdFx0ICAgIGxhdCA9IE1hdGgubWF4KE1hdGgubWluKG1heCwgbGF0bG5nLmxhdCksIC1tYXgpLFxyXG5cdFx0ICAgIHIgPSB0aGlzLlJfTUFKT1IsXHJcblx0XHQgICAgcjIgPSB0aGlzLlJfTUlOT1IsXHJcblx0XHQgICAgeCA9IGxhdGxuZy5sbmcgKiBkICogcixcclxuXHRcdCAgICB5ID0gbGF0ICogZCxcclxuXHRcdCAgICB0bXAgPSByMiAvIHIsXHJcblx0XHQgICAgZWNjZW50ID0gTWF0aC5zcXJ0KDEuMCAtIHRtcCAqIHRtcCksXHJcblx0XHQgICAgY29uID0gZWNjZW50ICogTWF0aC5zaW4oeSk7XHJcblxyXG5cdFx0Y29uID0gTWF0aC5wb3coKDEgLSBjb24pIC8gKDEgKyBjb24pLCBlY2NlbnQgKiAwLjUpO1xyXG5cclxuXHRcdHZhciB0cyA9IE1hdGgudGFuKDAuNSAqICgoTWF0aC5QSSAqIDAuNSkgLSB5KSkgLyBjb247XHJcblx0XHR5ID0gLXIgKiBNYXRoLmxvZyh0cyk7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KHgsIHkpO1xyXG5cdH0sXHJcblxyXG5cdHVucHJvamVjdDogZnVuY3Rpb24gKHBvaW50KSB7IC8vIChQb2ludCwgQm9vbGVhbikgLT4gTGF0TG5nXHJcblx0XHR2YXIgZCA9IEwuTGF0TG5nLlJBRF9UT19ERUcsXHJcblx0XHQgICAgciA9IHRoaXMuUl9NQUpPUixcclxuXHRcdCAgICByMiA9IHRoaXMuUl9NSU5PUixcclxuXHRcdCAgICBsbmcgPSBwb2ludC54ICogZCAvIHIsXHJcblx0XHQgICAgdG1wID0gcjIgLyByLFxyXG5cdFx0ICAgIGVjY2VudCA9IE1hdGguc3FydCgxIC0gKHRtcCAqIHRtcCkpLFxyXG5cdFx0ICAgIHRzID0gTWF0aC5leHAoLSBwb2ludC55IC8gciksXHJcblx0XHQgICAgcGhpID0gKE1hdGguUEkgLyAyKSAtIDIgKiBNYXRoLmF0YW4odHMpLFxyXG5cdFx0ICAgIG51bUl0ZXIgPSAxNSxcclxuXHRcdCAgICB0b2wgPSAxZS03LFxyXG5cdFx0ICAgIGkgPSBudW1JdGVyLFxyXG5cdFx0ICAgIGRwaGkgPSAwLjEsXHJcblx0XHQgICAgY29uO1xyXG5cclxuXHRcdHdoaWxlICgoTWF0aC5hYnMoZHBoaSkgPiB0b2wpICYmICgtLWkgPiAwKSkge1xyXG5cdFx0XHRjb24gPSBlY2NlbnQgKiBNYXRoLnNpbihwaGkpO1xyXG5cdFx0XHRkcGhpID0gKE1hdGguUEkgLyAyKSAtIDIgKiBNYXRoLmF0YW4odHMgKlxyXG5cdFx0XHQgICAgICAgICAgICBNYXRoLnBvdygoMS4wIC0gY29uKSAvICgxLjAgKyBjb24pLCAwLjUgKiBlY2NlbnQpKSAtIHBoaTtcclxuXHRcdFx0cGhpICs9IGRwaGk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBMLkxhdExuZyhwaGkgKiBkLCBsbmcpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5cclxuTC5DUlMuRVBTRzMzOTUgPSBMLmV4dGVuZCh7fSwgTC5DUlMsIHtcclxuXHRjb2RlOiAnRVBTRzozMzk1JyxcclxuXHJcblx0cHJvamVjdGlvbjogTC5Qcm9qZWN0aW9uLk1lcmNhdG9yLFxyXG5cclxuXHR0cmFuc2Zvcm1hdGlvbjogKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtID0gTC5Qcm9qZWN0aW9uLk1lcmNhdG9yLFxyXG5cdFx0ICAgIHIgPSBtLlJfTUFKT1IsXHJcblx0XHQgICAgc2NhbGUgPSAwLjUgLyAoTWF0aC5QSSAqIHIpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5UcmFuc2Zvcm1hdGlvbihzY2FsZSwgMC41LCAtc2NhbGUsIDAuNSk7XHJcblx0fSgpKVxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLlRpbGVMYXllciBpcyB1c2VkIGZvciBzdGFuZGFyZCB4eXotbnVtYmVyZWQgdGlsZSBsYXllcnMuXHJcbiAqL1xyXG5cclxuTC5UaWxlTGF5ZXIgPSBMLkNsYXNzLmV4dGVuZCh7XHJcblx0aW5jbHVkZXM6IEwuTWl4aW4uRXZlbnRzLFxyXG5cclxuXHRvcHRpb25zOiB7XHJcblx0XHRtaW5ab29tOiAwLFxyXG5cdFx0bWF4Wm9vbTogMTgsXHJcblx0XHR0aWxlU2l6ZTogMjU2LFxyXG5cdFx0c3ViZG9tYWluczogJ2FiYycsXHJcblx0XHRlcnJvclRpbGVVcmw6ICcnLFxyXG5cdFx0YXR0cmlidXRpb246ICcnLFxyXG5cdFx0em9vbU9mZnNldDogMCxcclxuXHRcdG9wYWNpdHk6IDEsXHJcblx0XHQvKlxyXG5cdFx0bWF4TmF0aXZlWm9vbTogbnVsbCxcclxuXHRcdHpJbmRleDogbnVsbCxcclxuXHRcdHRtczogZmFsc2UsXHJcblx0XHRjb250aW51b3VzV29ybGQ6IGZhbHNlLFxyXG5cdFx0bm9XcmFwOiBmYWxzZSxcclxuXHRcdHpvb21SZXZlcnNlOiBmYWxzZSxcclxuXHRcdGRldGVjdFJldGluYTogZmFsc2UsXHJcblx0XHRyZXVzZVRpbGVzOiBmYWxzZSxcclxuXHRcdGJvdW5kczogZmFsc2UsXHJcblx0XHQqL1xyXG5cdFx0dW5sb2FkSW52aXNpYmxlVGlsZXM6IEwuQnJvd3Nlci5tb2JpbGUsXHJcblx0XHR1cGRhdGVXaGVuSWRsZTogTC5Ccm93c2VyLm1vYmlsZVxyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcclxuXHRcdG9wdGlvbnMgPSBMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblxyXG5cdFx0Ly8gZGV0ZWN0aW5nIHJldGluYSBkaXNwbGF5cywgYWRqdXN0aW5nIHRpbGVTaXplIGFuZCB6b29tIGxldmVsc1xyXG5cdFx0aWYgKG9wdGlvbnMuZGV0ZWN0UmV0aW5hICYmIEwuQnJvd3Nlci5yZXRpbmEgJiYgb3B0aW9ucy5tYXhab29tID4gMCkge1xyXG5cclxuXHRcdFx0b3B0aW9ucy50aWxlU2l6ZSA9IE1hdGguZmxvb3Iob3B0aW9ucy50aWxlU2l6ZSAvIDIpO1xyXG5cdFx0XHRvcHRpb25zLnpvb21PZmZzZXQrKztcclxuXHJcblx0XHRcdGlmIChvcHRpb25zLm1pblpvb20gPiAwKSB7XHJcblx0XHRcdFx0b3B0aW9ucy5taW5ab29tLS07XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5vcHRpb25zLm1heFpvb20tLTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAob3B0aW9ucy5ib3VuZHMpIHtcclxuXHRcdFx0b3B0aW9ucy5ib3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhvcHRpb25zLmJvdW5kcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fdXJsID0gdXJsO1xyXG5cclxuXHRcdHZhciBzdWJkb21haW5zID0gdGhpcy5vcHRpb25zLnN1YmRvbWFpbnM7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBzdWJkb21haW5zID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHR0aGlzLm9wdGlvbnMuc3ViZG9tYWlucyA9IHN1YmRvbWFpbnMuc3BsaXQoJycpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHR0aGlzLl9tYXAgPSBtYXA7XHJcblx0XHR0aGlzLl9hbmltYXRlZCA9IG1hcC5fem9vbUFuaW1hdGVkO1xyXG5cclxuXHRcdC8vIGNyZWF0ZSBhIGNvbnRhaW5lciBkaXYgZm9yIHRpbGVzXHJcblx0XHR0aGlzLl9pbml0Q29udGFpbmVyKCk7XHJcblxyXG5cdFx0Ly8gc2V0IHVwIGV2ZW50c1xyXG5cdFx0bWFwLm9uKHtcclxuXHRcdFx0J3ZpZXdyZXNldCc6IHRoaXMuX3Jlc2V0LFxyXG5cdFx0XHQnbW92ZWVuZCc6IHRoaXMuX3VwZGF0ZVxyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2FuaW1hdGVkKSB7XHJcblx0XHRcdG1hcC5vbih7XHJcblx0XHRcdFx0J3pvb21hbmltJzogdGhpcy5fYW5pbWF0ZVpvb20sXHJcblx0XHRcdFx0J3pvb21lbmQnOiB0aGlzLl9lbmRab29tQW5pbVxyXG5cdFx0XHR9LCB0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMub3B0aW9ucy51cGRhdGVXaGVuSWRsZSkge1xyXG5cdFx0XHR0aGlzLl9saW1pdGVkVXBkYXRlID0gTC5VdGlsLmxpbWl0RXhlY0J5SW50ZXJ2YWwodGhpcy5fdXBkYXRlLCAxNTAsIHRoaXMpO1xyXG5cdFx0XHRtYXAub24oJ21vdmUnLCB0aGlzLl9saW1pdGVkVXBkYXRlLCB0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9yZXNldCgpO1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0fSxcclxuXHJcblx0YWRkVG86IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdG1hcC5hZGRMYXllcih0aGlzKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHR0aGlzLl9jb250YWluZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9jb250YWluZXIpO1xyXG5cclxuXHRcdG1hcC5vZmYoe1xyXG5cdFx0XHQndmlld3Jlc2V0JzogdGhpcy5fcmVzZXQsXHJcblx0XHRcdCdtb3ZlZW5kJzogdGhpcy5fdXBkYXRlXHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHRpZiAodGhpcy5fYW5pbWF0ZWQpIHtcclxuXHRcdFx0bWFwLm9mZih7XHJcblx0XHRcdFx0J3pvb21hbmltJzogdGhpcy5fYW5pbWF0ZVpvb20sXHJcblx0XHRcdFx0J3pvb21lbmQnOiB0aGlzLl9lbmRab29tQW5pbVxyXG5cdFx0XHR9LCB0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMub3B0aW9ucy51cGRhdGVXaGVuSWRsZSkge1xyXG5cdFx0XHRtYXAub2ZmKCdtb3ZlJywgdGhpcy5fbGltaXRlZFVwZGF0ZSwgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fY29udGFpbmVyID0gbnVsbDtcclxuXHRcdHRoaXMuX21hcCA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0YnJpbmdUb0Zyb250OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcGFuZSA9IHRoaXMuX21hcC5fcGFuZXMudGlsZVBhbmU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2NvbnRhaW5lcikge1xyXG5cdFx0XHRwYW5lLmFwcGVuZENoaWxkKHRoaXMuX2NvbnRhaW5lcik7XHJcblx0XHRcdHRoaXMuX3NldEF1dG9aSW5kZXgocGFuZSwgTWF0aC5tYXgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGJyaW5nVG9CYWNrOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcGFuZSA9IHRoaXMuX21hcC5fcGFuZXMudGlsZVBhbmU7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2NvbnRhaW5lcikge1xyXG5cdFx0XHRwYW5lLmluc2VydEJlZm9yZSh0aGlzLl9jb250YWluZXIsIHBhbmUuZmlyc3RDaGlsZCk7XHJcblx0XHRcdHRoaXMuX3NldEF1dG9aSW5kZXgocGFuZSwgTWF0aC5taW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uO1xyXG5cdH0sXHJcblxyXG5cdGdldENvbnRhaW5lcjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcclxuXHR9LFxyXG5cclxuXHRzZXRPcGFjaXR5OiBmdW5jdGlvbiAob3BhY2l0eSkge1xyXG5cdFx0dGhpcy5vcHRpb25zLm9wYWNpdHkgPSBvcGFjaXR5O1xyXG5cclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0dGhpcy5fdXBkYXRlT3BhY2l0eSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHNldFpJbmRleDogZnVuY3Rpb24gKHpJbmRleCkge1xyXG5cdFx0dGhpcy5vcHRpb25zLnpJbmRleCA9IHpJbmRleDtcclxuXHRcdHRoaXMuX3VwZGF0ZVpJbmRleCgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHNldFVybDogZnVuY3Rpb24gKHVybCwgbm9SZWRyYXcpIHtcclxuXHRcdHRoaXMuX3VybCA9IHVybDtcclxuXHJcblx0XHRpZiAoIW5vUmVkcmF3KSB7XHJcblx0XHRcdHRoaXMucmVkcmF3KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVkcmF3OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX3Jlc2V0KHtoYXJkOiB0cnVlfSk7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZVpJbmRleDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX2NvbnRhaW5lciAmJiB0aGlzLm9wdGlvbnMuekluZGV4ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLnpJbmRleCA9IHRoaXMub3B0aW9ucy56SW5kZXg7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X3NldEF1dG9aSW5kZXg6IGZ1bmN0aW9uIChwYW5lLCBjb21wYXJlKSB7XHJcblxyXG5cdFx0dmFyIGxheWVycyA9IHBhbmUuY2hpbGRyZW4sXHJcblx0XHQgICAgZWRnZVpJbmRleCA9IC1jb21wYXJlKEluZmluaXR5LCAtSW5maW5pdHkpLCAvLyAtSW5maW5pdHkgZm9yIG1heCwgSW5maW5pdHkgZm9yIG1pblxyXG5cdFx0ICAgIHpJbmRleCwgaSwgbGVuO1xyXG5cclxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGxheWVycy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cclxuXHRcdFx0aWYgKGxheWVyc1tpXSAhPT0gdGhpcy5fY29udGFpbmVyKSB7XHJcblx0XHRcdFx0ekluZGV4ID0gcGFyc2VJbnQobGF5ZXJzW2ldLnN0eWxlLnpJbmRleCwgMTApO1xyXG5cclxuXHRcdFx0XHRpZiAoIWlzTmFOKHpJbmRleCkpIHtcclxuXHRcdFx0XHRcdGVkZ2VaSW5kZXggPSBjb21wYXJlKGVkZ2VaSW5kZXgsIHpJbmRleCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5vcHRpb25zLnpJbmRleCA9IHRoaXMuX2NvbnRhaW5lci5zdHlsZS56SW5kZXggPVxyXG5cdFx0ICAgICAgICAoaXNGaW5pdGUoZWRnZVpJbmRleCkgPyBlZGdlWkluZGV4IDogMCkgKyBjb21wYXJlKDEsIC0xKTtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlT3BhY2l0eTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGksXHJcblx0XHQgICAgdGlsZXMgPSB0aGlzLl90aWxlcztcclxuXHJcblx0XHRpZiAoTC5Ccm93c2VyLmllbHQ5KSB7XHJcblx0XHRcdGZvciAoaSBpbiB0aWxlcykge1xyXG5cdFx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRpbGVzW2ldLCB0aGlzLm9wdGlvbnMub3BhY2l0eSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRoaXMuX2NvbnRhaW5lciwgdGhpcy5vcHRpb25zLm9wYWNpdHkpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9pbml0Q29udGFpbmVyOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgdGlsZVBhbmUgPSB0aGlzLl9tYXAuX3BhbmVzLnRpbGVQYW5lO1xyXG5cclxuXHRcdGlmICghdGhpcy5fY29udGFpbmVyKSB7XHJcblx0XHRcdHRoaXMuX2NvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWxheWVyJyk7XHJcblxyXG5cdFx0XHR0aGlzLl91cGRhdGVaSW5kZXgoKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9hbmltYXRlZCkge1xyXG5cdFx0XHRcdHZhciBjbGFzc05hbWUgPSAnbGVhZmxldC10aWxlLWNvbnRhaW5lcic7XHJcblxyXG5cdFx0XHRcdHRoaXMuX2JnQnVmZmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lLCB0aGlzLl9jb250YWluZXIpO1xyXG5cdFx0XHRcdHRoaXMuX3RpbGVDb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUsIHRoaXMuX2NvbnRhaW5lcik7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuX3RpbGVDb250YWluZXIgPSB0aGlzLl9jb250YWluZXI7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRpbGVQYW5lLmFwcGVuZENoaWxkKHRoaXMuX2NvbnRhaW5lcik7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLm9wYWNpdHkgPCAxKSB7XHJcblx0XHRcdFx0dGhpcy5fdXBkYXRlT3BhY2l0eSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X3Jlc2V0OiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Zm9yICh2YXIga2V5IGluIHRoaXMuX3RpbGVzKSB7XHJcblx0XHRcdHRoaXMuZmlyZSgndGlsZXVubG9hZCcsIHt0aWxlOiB0aGlzLl90aWxlc1trZXldfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fdGlsZXMgPSB7fTtcclxuXHRcdHRoaXMuX3RpbGVzVG9Mb2FkID0gMDtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnJldXNlVGlsZXMpIHtcclxuXHRcdFx0dGhpcy5fdW51c2VkVGlsZXMgPSBbXTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl90aWxlQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG5cclxuXHRcdGlmICh0aGlzLl9hbmltYXRlZCAmJiBlICYmIGUuaGFyZCkge1xyXG5cdFx0XHR0aGlzLl9jbGVhckJnQnVmZmVyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faW5pdENvbnRhaW5lcigpO1xyXG5cdH0sXHJcblxyXG5cdF9nZXRUaWxlU2l6ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICB6b29tID0gbWFwLmdldFpvb20oKSArIHRoaXMub3B0aW9ucy56b29tT2Zmc2V0LFxyXG5cdFx0ICAgIHpvb21OID0gdGhpcy5vcHRpb25zLm1heE5hdGl2ZVpvb20sXHJcblx0XHQgICAgdGlsZVNpemUgPSB0aGlzLm9wdGlvbnMudGlsZVNpemU7XHJcblxyXG5cdFx0aWYgKHpvb21OICYmIHpvb20gPiB6b29tTikge1xyXG5cdFx0XHR0aWxlU2l6ZSA9IE1hdGgucm91bmQobWFwLmdldFpvb21TY2FsZSh6b29tKSAvIG1hcC5nZXRab29tU2NhbGUoem9vbU4pICogdGlsZVNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aWxlU2l6ZTtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9tYXApIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICBib3VuZHMgPSBtYXAuZ2V0UGl4ZWxCb3VuZHMoKSxcclxuXHRcdCAgICB6b29tID0gbWFwLmdldFpvb20oKSxcclxuXHRcdCAgICB0aWxlU2l6ZSA9IHRoaXMuX2dldFRpbGVTaXplKCk7XHJcblxyXG5cdFx0aWYgKHpvb20gPiB0aGlzLm9wdGlvbnMubWF4Wm9vbSB8fCB6b29tIDwgdGhpcy5vcHRpb25zLm1pblpvb20pIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0aWxlQm91bmRzID0gTC5ib3VuZHMoXHJcblx0XHQgICAgICAgIGJvdW5kcy5taW4uZGl2aWRlQnkodGlsZVNpemUpLl9mbG9vcigpLFxyXG5cdFx0ICAgICAgICBib3VuZHMubWF4LmRpdmlkZUJ5KHRpbGVTaXplKS5fZmxvb3IoKSk7XHJcblxyXG5cdFx0dGhpcy5fYWRkVGlsZXNGcm9tQ2VudGVyT3V0KHRpbGVCb3VuZHMpO1xyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMudW5sb2FkSW52aXNpYmxlVGlsZXMgfHwgdGhpcy5vcHRpb25zLnJldXNlVGlsZXMpIHtcclxuXHRcdFx0dGhpcy5fcmVtb3ZlT3RoZXJUaWxlcyh0aWxlQm91bmRzKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfYWRkVGlsZXNGcm9tQ2VudGVyT3V0OiBmdW5jdGlvbiAoYm91bmRzKSB7XHJcblx0XHR2YXIgcXVldWUgPSBbXSxcclxuXHRcdCAgICBjZW50ZXIgPSBib3VuZHMuZ2V0Q2VudGVyKCk7XHJcblxyXG5cdFx0dmFyIGosIGksIHBvaW50O1xyXG5cclxuXHRcdGZvciAoaiA9IGJvdW5kcy5taW4ueTsgaiA8PSBib3VuZHMubWF4Lnk7IGorKykge1xyXG5cdFx0XHRmb3IgKGkgPSBib3VuZHMubWluLng7IGkgPD0gYm91bmRzLm1heC54OyBpKyspIHtcclxuXHRcdFx0XHRwb2ludCA9IG5ldyBMLlBvaW50KGksIGopO1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5fdGlsZVNob3VsZEJlTG9hZGVkKHBvaW50KSkge1xyXG5cdFx0XHRcdFx0cXVldWUucHVzaChwb2ludCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHRpbGVzVG9Mb2FkID0gcXVldWUubGVuZ3RoO1xyXG5cclxuXHRcdGlmICh0aWxlc1RvTG9hZCA9PT0gMCkgeyByZXR1cm47IH1cclxuXHJcblx0XHQvLyBsb2FkIHRpbGVzIGluIG9yZGVyIG9mIHRoZWlyIGRpc3RhbmNlIHRvIGNlbnRlclxyXG5cdFx0cXVldWUuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0XHRyZXR1cm4gYS5kaXN0YW5jZVRvKGNlbnRlcikgLSBiLmRpc3RhbmNlVG8oY2VudGVyKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcblx0XHQvLyBpZiBpdHMgdGhlIGZpcnN0IGJhdGNoIG9mIHRpbGVzIHRvIGxvYWRcclxuXHRcdGlmICghdGhpcy5fdGlsZXNUb0xvYWQpIHtcclxuXHRcdFx0dGhpcy5maXJlKCdsb2FkaW5nJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fdGlsZXNUb0xvYWQgKz0gdGlsZXNUb0xvYWQ7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IHRpbGVzVG9Mb2FkOyBpKyspIHtcclxuXHRcdFx0dGhpcy5fYWRkVGlsZShxdWV1ZVtpXSwgZnJhZ21lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3RpbGVDb250YWluZXIuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG5cdH0sXHJcblxyXG5cdF90aWxlU2hvdWxkQmVMb2FkZWQ6IGZ1bmN0aW9uICh0aWxlUG9pbnQpIHtcclxuXHRcdGlmICgodGlsZVBvaW50LnggKyAnOicgKyB0aWxlUG9pbnQueSkgaW4gdGhpcy5fdGlsZXMpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlOyAvLyBhbHJlYWR5IGxvYWRlZFxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG5cclxuXHRcdGlmICghb3B0aW9ucy5jb250aW51b3VzV29ybGQpIHtcclxuXHRcdFx0dmFyIGxpbWl0ID0gdGhpcy5fZ2V0V3JhcFRpbGVOdW0oKTtcclxuXHJcblx0XHRcdC8vIGRvbid0IGxvYWQgaWYgZXhjZWVkcyB3b3JsZCBib3VuZHNcclxuXHRcdFx0aWYgKChvcHRpb25zLm5vV3JhcCAmJiAodGlsZVBvaW50LnggPCAwIHx8IHRpbGVQb2ludC54ID49IGxpbWl0LngpKSB8fFxyXG5cdFx0XHRcdHRpbGVQb2ludC55IDwgMCB8fCB0aWxlUG9pbnQueSA+PSBsaW1pdC55KSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLmJvdW5kcykge1xyXG5cdFx0XHR2YXIgdGlsZVNpemUgPSB0aGlzLl9nZXRUaWxlU2l6ZSgpLFxyXG5cdFx0XHQgICAgbndQb2ludCA9IHRpbGVQb2ludC5tdWx0aXBseUJ5KHRpbGVTaXplKSxcclxuXHRcdFx0ICAgIHNlUG9pbnQgPSBud1BvaW50LmFkZChbdGlsZVNpemUsIHRpbGVTaXplXSksXHJcblx0XHRcdCAgICBudyA9IHRoaXMuX21hcC51bnByb2plY3QobndQb2ludCksXHJcblx0XHRcdCAgICBzZSA9IHRoaXMuX21hcC51bnByb2plY3Qoc2VQb2ludCk7XHJcblxyXG5cdFx0XHQvLyBUT0RPIHRlbXBvcmFyeSBoYWNrLCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgcmVmYWN0b3JpbmcgcHJvamVjdGlvbnNcclxuXHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL0xlYWZsZXQvTGVhZmxldC9pc3N1ZXMvMTYxOFxyXG5cdFx0XHRpZiAoIW9wdGlvbnMuY29udGludW91c1dvcmxkICYmICFvcHRpb25zLm5vV3JhcCkge1xyXG5cdFx0XHRcdG53ID0gbncud3JhcCgpO1xyXG5cdFx0XHRcdHNlID0gc2Uud3JhcCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIW9wdGlvbnMuYm91bmRzLmludGVyc2VjdHMoW253LCBzZV0pKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdF9yZW1vdmVPdGhlclRpbGVzOiBmdW5jdGlvbiAoYm91bmRzKSB7XHJcblx0XHR2YXIga0FyciwgeCwgeSwga2V5O1xyXG5cclxuXHRcdGZvciAoa2V5IGluIHRoaXMuX3RpbGVzKSB7XHJcblx0XHRcdGtBcnIgPSBrZXkuc3BsaXQoJzonKTtcclxuXHRcdFx0eCA9IHBhcnNlSW50KGtBcnJbMF0sIDEwKTtcclxuXHRcdFx0eSA9IHBhcnNlSW50KGtBcnJbMV0sIDEwKTtcclxuXHJcblx0XHRcdC8vIHJlbW92ZSB0aWxlIGlmIGl0J3Mgb3V0IG9mIGJvdW5kc1xyXG5cdFx0XHRpZiAoeCA8IGJvdW5kcy5taW4ueCB8fCB4ID4gYm91bmRzLm1heC54IHx8IHkgPCBib3VuZHMubWluLnkgfHwgeSA+IGJvdW5kcy5tYXgueSkge1xyXG5cdFx0XHRcdHRoaXMuX3JlbW92ZVRpbGUoa2V5KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9yZW1vdmVUaWxlOiBmdW5jdGlvbiAoa2V5KSB7XHJcblx0XHR2YXIgdGlsZSA9IHRoaXMuX3RpbGVzW2tleV07XHJcblxyXG5cdFx0dGhpcy5maXJlKCd0aWxldW5sb2FkJywge3RpbGU6IHRpbGUsIHVybDogdGlsZS5zcmN9KTtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnJldXNlVGlsZXMpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRpbGUsICdsZWFmbGV0LXRpbGUtbG9hZGVkJyk7XHJcblx0XHRcdHRoaXMuX3VudXNlZFRpbGVzLnB1c2godGlsZSk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICh0aWxlLnBhcmVudE5vZGUgPT09IHRoaXMuX3RpbGVDb250YWluZXIpIHtcclxuXHRcdFx0dGhpcy5fdGlsZUNvbnRhaW5lci5yZW1vdmVDaGlsZCh0aWxlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBmb3IgaHR0cHM6Ly9naXRodWIuY29tL0Nsb3VkTWFkZS9MZWFmbGV0L2lzc3Vlcy8xMzdcclxuXHRcdGlmICghTC5Ccm93c2VyLmFuZHJvaWQpIHtcclxuXHRcdFx0dGlsZS5vbmxvYWQgPSBudWxsO1xyXG5cdFx0XHR0aWxlLnNyYyA9IEwuVXRpbC5lbXB0eUltYWdlVXJsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlbGV0ZSB0aGlzLl90aWxlc1trZXldO1xyXG5cdH0sXHJcblxyXG5cdF9hZGRUaWxlOiBmdW5jdGlvbiAodGlsZVBvaW50LCBjb250YWluZXIpIHtcclxuXHRcdHZhciB0aWxlUG9zID0gdGhpcy5fZ2V0VGlsZVBvcyh0aWxlUG9pbnQpO1xyXG5cclxuXHRcdC8vIGdldCB1bnVzZWQgdGlsZSAtIG9yIGNyZWF0ZSBhIG5ldyB0aWxlXHJcblx0XHR2YXIgdGlsZSA9IHRoaXMuX2dldFRpbGUoKTtcclxuXHJcblx0XHQvKlxyXG5cdFx0Q2hyb21lIDIwIGxheW91dHMgbXVjaCBmYXN0ZXIgd2l0aCB0b3AvbGVmdCAodmVyaWZ5IHdpdGggdGltZWxpbmUsIGZyYW1lcylcclxuXHRcdEFuZHJvaWQgNCBicm93c2VyIGhhcyBkaXNwbGF5IGlzc3VlcyB3aXRoIHRvcC9sZWZ0IGFuZCByZXF1aXJlcyB0cmFuc2Zvcm0gaW5zdGVhZFxyXG5cdFx0KG90aGVyIGJyb3dzZXJzIGRvbid0IGN1cnJlbnRseSBjYXJlKSAtIHNlZSBkZWJ1Zy9oYWNrcy9qaXR0ZXIuaHRtbCBmb3IgYW4gZXhhbXBsZVxyXG5cdFx0Ki9cclxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aWxlLCB0aWxlUG9zLCBMLkJyb3dzZXIuY2hyb21lKTtcclxuXHJcblx0XHR0aGlzLl90aWxlc1t0aWxlUG9pbnQueCArICc6JyArIHRpbGVQb2ludC55XSA9IHRpbGU7XHJcblxyXG5cdFx0dGhpcy5fbG9hZFRpbGUodGlsZSwgdGlsZVBvaW50KTtcclxuXHJcblx0XHRpZiAodGlsZS5wYXJlbnROb2RlICE9PSB0aGlzLl90aWxlQ29udGFpbmVyKSB7XHJcblx0XHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aWxlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfZ2V0Wm9vbUZvclVybDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zLFxyXG5cdFx0ICAgIHpvb20gPSB0aGlzLl9tYXAuZ2V0Wm9vbSgpO1xyXG5cclxuXHRcdGlmIChvcHRpb25zLnpvb21SZXZlcnNlKSB7XHJcblx0XHRcdHpvb20gPSBvcHRpb25zLm1heFpvb20gLSB6b29tO1xyXG5cdFx0fVxyXG5cclxuXHRcdHpvb20gKz0gb3B0aW9ucy56b29tT2Zmc2V0O1xyXG5cclxuXHRcdHJldHVybiBvcHRpb25zLm1heE5hdGl2ZVpvb20gPyBNYXRoLm1pbih6b29tLCBvcHRpb25zLm1heE5hdGl2ZVpvb20pIDogem9vbTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0VGlsZVBvczogZnVuY3Rpb24gKHRpbGVQb2ludCkge1xyXG5cdFx0dmFyIG9yaWdpbiA9IHRoaXMuX21hcC5nZXRQaXhlbE9yaWdpbigpLFxyXG5cdFx0ICAgIHRpbGVTaXplID0gdGhpcy5fZ2V0VGlsZVNpemUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGlsZVBvaW50Lm11bHRpcGx5QnkodGlsZVNpemUpLnN1YnRyYWN0KG9yaWdpbik7XHJcblx0fSxcclxuXHJcblx0Ly8gaW1hZ2Utc3BlY2lmaWMgY29kZSAob3ZlcnJpZGUgdG8gaW1wbGVtZW50IGUuZy4gQ2FudmFzIG9yIFNWRyB0aWxlIGxheWVyKVxyXG5cclxuXHRnZXRUaWxlVXJsOiBmdW5jdGlvbiAodGlsZVBvaW50KSB7XHJcblx0XHRyZXR1cm4gTC5VdGlsLnRlbXBsYXRlKHRoaXMuX3VybCwgTC5leHRlbmQoe1xyXG5cdFx0XHRzOiB0aGlzLl9nZXRTdWJkb21haW4odGlsZVBvaW50KSxcclxuXHRcdFx0ejogdGlsZVBvaW50LnosXHJcblx0XHRcdHg6IHRpbGVQb2ludC54LFxyXG5cdFx0XHR5OiB0aWxlUG9pbnQueVxyXG5cdFx0fSwgdGhpcy5vcHRpb25zKSk7XHJcblx0fSxcclxuXHJcblx0X2dldFdyYXBUaWxlTnVtOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgY3JzID0gdGhpcy5fbWFwLm9wdGlvbnMuY3JzLFxyXG5cdFx0ICAgIHNpemUgPSBjcnMuZ2V0U2l6ZSh0aGlzLl9tYXAuZ2V0Wm9vbSgpKTtcclxuXHRcdHJldHVybiBzaXplLmRpdmlkZUJ5KHRoaXMuX2dldFRpbGVTaXplKCkpLl9mbG9vcigpO1xyXG5cdH0sXHJcblxyXG5cdF9hZGp1c3RUaWxlUG9pbnQ6IGZ1bmN0aW9uICh0aWxlUG9pbnQpIHtcclxuXHJcblx0XHR2YXIgbGltaXQgPSB0aGlzLl9nZXRXcmFwVGlsZU51bSgpO1xyXG5cclxuXHRcdC8vIHdyYXAgdGlsZSBjb29yZGluYXRlc1xyXG5cdFx0aWYgKCF0aGlzLm9wdGlvbnMuY29udGludW91c1dvcmxkICYmICF0aGlzLm9wdGlvbnMubm9XcmFwKSB7XHJcblx0XHRcdHRpbGVQb2ludC54ID0gKCh0aWxlUG9pbnQueCAlIGxpbWl0LngpICsgbGltaXQueCkgJSBsaW1pdC54O1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMudG1zKSB7XHJcblx0XHRcdHRpbGVQb2ludC55ID0gbGltaXQueSAtIHRpbGVQb2ludC55IC0gMTtcclxuXHRcdH1cclxuXHJcblx0XHR0aWxlUG9pbnQueiA9IHRoaXMuX2dldFpvb21Gb3JVcmwoKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0U3ViZG9tYWluOiBmdW5jdGlvbiAodGlsZVBvaW50KSB7XHJcblx0XHR2YXIgaW5kZXggPSBNYXRoLmFicyh0aWxlUG9pbnQueCArIHRpbGVQb2ludC55KSAlIHRoaXMub3B0aW9ucy5zdWJkb21haW5zLmxlbmd0aDtcclxuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMuc3ViZG9tYWluc1tpbmRleF07XHJcblx0fSxcclxuXHJcblx0X2dldFRpbGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLm9wdGlvbnMucmV1c2VUaWxlcyAmJiB0aGlzLl91bnVzZWRUaWxlcy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHZhciB0aWxlID0gdGhpcy5fdW51c2VkVGlsZXMucG9wKCk7XHJcblx0XHRcdHRoaXMuX3Jlc2V0VGlsZSh0aWxlKTtcclxuXHRcdFx0cmV0dXJuIHRpbGU7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5fY3JlYXRlVGlsZSgpO1xyXG5cdH0sXHJcblxyXG5cdC8vIE92ZXJyaWRlIGlmIGRhdGEgc3RvcmVkIG9uIGEgdGlsZSBuZWVkcyB0byBiZSBjbGVhbmVkIHVwIGJlZm9yZSByZXVzZVxyXG5cdF9yZXNldFRpbGU6IGZ1bmN0aW9uICgvKnRpbGUqLykge30sXHJcblxyXG5cdF9jcmVhdGVUaWxlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgdGlsZSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2ltZycsICdsZWFmbGV0LXRpbGUnKTtcclxuXHRcdHRpbGUuc3R5bGUud2lkdGggPSB0aWxlLnN0eWxlLmhlaWdodCA9IHRoaXMuX2dldFRpbGVTaXplKCkgKyAncHgnO1xyXG5cdFx0dGlsZS5nYWxsZXJ5aW1nID0gJ25vJztcclxuXHJcblx0XHR0aWxlLm9uc2VsZWN0c3RhcnQgPSB0aWxlLm9ubW91c2Vtb3ZlID0gTC5VdGlsLmZhbHNlRm47XHJcblxyXG5cdFx0aWYgKEwuQnJvd3Nlci5pZWx0OSAmJiB0aGlzLm9wdGlvbnMub3BhY2l0eSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRpbGUsIHRoaXMub3B0aW9ucy5vcGFjaXR5KTtcclxuXHRcdH1cclxuXHRcdC8vIHdpdGhvdXQgdGhpcyBoYWNrLCB0aWxlcyBkaXNhcHBlYXIgYWZ0ZXIgem9vbSBvbiBDaHJvbWUgZm9yIEFuZHJvaWRcclxuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9MZWFmbGV0L0xlYWZsZXQvaXNzdWVzLzIwNzhcclxuXHRcdGlmIChMLkJyb3dzZXIubW9iaWxlV2Via2l0M2QpIHtcclxuXHRcdFx0dGlsZS5zdHlsZS5XZWJraXRCYWNrZmFjZVZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aWxlO1xyXG5cdH0sXHJcblxyXG5cdF9sb2FkVGlsZTogZnVuY3Rpb24gKHRpbGUsIHRpbGVQb2ludCkge1xyXG5cdFx0dGlsZS5fbGF5ZXIgID0gdGhpcztcclxuXHRcdHRpbGUub25sb2FkICA9IHRoaXMuX3RpbGVPbkxvYWQ7XHJcblx0XHR0aWxlLm9uZXJyb3IgPSB0aGlzLl90aWxlT25FcnJvcjtcclxuXHJcblx0XHR0aGlzLl9hZGp1c3RUaWxlUG9pbnQodGlsZVBvaW50KTtcclxuXHRcdHRpbGUuc3JjICAgICA9IHRoaXMuZ2V0VGlsZVVybCh0aWxlUG9pbnQpO1xyXG5cclxuXHRcdHRoaXMuZmlyZSgndGlsZWxvYWRzdGFydCcsIHtcclxuXHRcdFx0dGlsZTogdGlsZSxcclxuXHRcdFx0dXJsOiB0aWxlLnNyY1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0X3RpbGVMb2FkZWQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX3RpbGVzVG9Mb2FkLS07XHJcblxyXG5cdFx0aWYgKHRoaXMuX2FuaW1hdGVkKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl90aWxlQ29udGFpbmVyLCAnbGVhZmxldC16b29tLWFuaW1hdGVkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLl90aWxlc1RvTG9hZCkge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ2xvYWQnKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLl9hbmltYXRlZCkge1xyXG5cdFx0XHRcdC8vIGNsZWFyIHNjYWxlZCB0aWxlcyBhZnRlciBhbGwgbmV3IHRpbGVzIGFyZSBsb2FkZWQgKGZvciBwZXJmb3JtYW5jZSlcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fY2xlYXJCZ0J1ZmZlclRpbWVyKTtcclxuXHRcdFx0XHR0aGlzLl9jbGVhckJnQnVmZmVyVGltZXIgPSBzZXRUaW1lb3V0KEwuYmluZCh0aGlzLl9jbGVhckJnQnVmZmVyLCB0aGlzKSwgNTAwKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF90aWxlT25Mb2FkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcjtcclxuXHJcblx0XHQvL09ubHkgaWYgd2UgYXJlIGxvYWRpbmcgYW4gYWN0dWFsIGltYWdlXHJcblx0XHRpZiAodGhpcy5zcmMgIT09IEwuVXRpbC5lbXB0eUltYWdlVXJsKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLCAnbGVhZmxldC10aWxlLWxvYWRlZCcpO1xyXG5cclxuXHRcdFx0bGF5ZXIuZmlyZSgndGlsZWxvYWQnLCB7XHJcblx0XHRcdFx0dGlsZTogdGhpcyxcclxuXHRcdFx0XHR1cmw6IHRoaXMuc3JjXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxheWVyLl90aWxlTG9hZGVkKCk7XHJcblx0fSxcclxuXHJcblx0X3RpbGVPbkVycm9yOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcjtcclxuXHJcblx0XHRsYXllci5maXJlKCd0aWxlZXJyb3InLCB7XHJcblx0XHRcdHRpbGU6IHRoaXMsXHJcblx0XHRcdHVybDogdGhpcy5zcmNcclxuXHRcdH0pO1xyXG5cclxuXHRcdHZhciBuZXdVcmwgPSBsYXllci5vcHRpb25zLmVycm9yVGlsZVVybDtcclxuXHRcdGlmIChuZXdVcmwpIHtcclxuXHRcdFx0dGhpcy5zcmMgPSBuZXdVcmw7XHJcblx0XHR9XHJcblxyXG5cdFx0bGF5ZXIuX3RpbGVMb2FkZWQoKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC50aWxlTGF5ZXIgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLlRpbGVMYXllcih1cmwsIG9wdGlvbnMpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuVGlsZUxheWVyLldNUyBpcyB1c2VkIGZvciBwdXR0aW5nIFdNUyB0aWxlIGxheWVycyBvbiB0aGUgbWFwLlxyXG4gKi9cclxuXHJcbkwuVGlsZUxheWVyLldNUyA9IEwuVGlsZUxheWVyLmV4dGVuZCh7XHJcblxyXG5cdGRlZmF1bHRXbXNQYXJhbXM6IHtcclxuXHRcdHNlcnZpY2U6ICdXTVMnLFxyXG5cdFx0cmVxdWVzdDogJ0dldE1hcCcsXHJcblx0XHR2ZXJzaW9uOiAnMS4xLjEnLFxyXG5cdFx0bGF5ZXJzOiAnJyxcclxuXHRcdHN0eWxlczogJycsXHJcblx0XHRmb3JtYXQ6ICdpbWFnZS9qcGVnJyxcclxuXHRcdHRyYW5zcGFyZW50OiBmYWxzZVxyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHsgLy8gKFN0cmluZywgT2JqZWN0KVxyXG5cclxuXHRcdHRoaXMuX3VybCA9IHVybDtcclxuXHJcblx0XHR2YXIgd21zUGFyYW1zID0gTC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdFdtc1BhcmFtcyksXHJcblx0XHQgICAgdGlsZVNpemUgPSBvcHRpb25zLnRpbGVTaXplIHx8IHRoaXMub3B0aW9ucy50aWxlU2l6ZTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy5kZXRlY3RSZXRpbmEgJiYgTC5Ccm93c2VyLnJldGluYSkge1xyXG5cdFx0XHR3bXNQYXJhbXMud2lkdGggPSB3bXNQYXJhbXMuaGVpZ2h0ID0gdGlsZVNpemUgKiAyO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0d21zUGFyYW1zLndpZHRoID0gd21zUGFyYW1zLmhlaWdodCA9IHRpbGVTaXplO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gb3B0aW9ucykge1xyXG5cdFx0XHQvLyBhbGwga2V5cyB0aGF0IGFyZSBub3QgVGlsZUxheWVyIG9wdGlvbnMgZ28gdG8gV01TIHBhcmFtc1xyXG5cdFx0XHRpZiAoIXRoaXMub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBpICE9PSAnY3JzJykge1xyXG5cdFx0XHRcdHdtc1BhcmFtc1tpXSA9IG9wdGlvbnNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLndtc1BhcmFtcyA9IHdtc1BhcmFtcztcclxuXHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcclxuXHJcblx0XHR0aGlzLl9jcnMgPSB0aGlzLm9wdGlvbnMuY3JzIHx8IG1hcC5vcHRpb25zLmNycztcclxuXHJcblx0XHR0aGlzLl93bXNWZXJzaW9uID0gcGFyc2VGbG9hdCh0aGlzLndtc1BhcmFtcy52ZXJzaW9uKTtcclxuXHJcblx0XHR2YXIgcHJvamVjdGlvbktleSA9IHRoaXMuX3dtc1ZlcnNpb24gPj0gMS4zID8gJ2NycycgOiAnc3JzJztcclxuXHRcdHRoaXMud21zUGFyYW1zW3Byb2plY3Rpb25LZXldID0gdGhpcy5fY3JzLmNvZGU7XHJcblxyXG5cdFx0TC5UaWxlTGF5ZXIucHJvdG90eXBlLm9uQWRkLmNhbGwodGhpcywgbWFwKTtcclxuXHR9LFxyXG5cclxuXHRnZXRUaWxlVXJsOiBmdW5jdGlvbiAodGlsZVBvaW50KSB7IC8vIChQb2ludCwgTnVtYmVyKSAtPiBTdHJpbmdcclxuXHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxyXG5cdFx0ICAgIHRpbGVTaXplID0gdGhpcy5vcHRpb25zLnRpbGVTaXplLFxyXG5cclxuXHRcdCAgICBud1BvaW50ID0gdGlsZVBvaW50Lm11bHRpcGx5QnkodGlsZVNpemUpLFxyXG5cdFx0ICAgIHNlUG9pbnQgPSBud1BvaW50LmFkZChbdGlsZVNpemUsIHRpbGVTaXplXSksXHJcblxyXG5cdFx0ICAgIG53ID0gdGhpcy5fY3JzLnByb2plY3QobWFwLnVucHJvamVjdChud1BvaW50LCB0aWxlUG9pbnQueikpLFxyXG5cdFx0ICAgIHNlID0gdGhpcy5fY3JzLnByb2plY3QobWFwLnVucHJvamVjdChzZVBvaW50LCB0aWxlUG9pbnQueikpLFxyXG5cdFx0ICAgIGJib3ggPSB0aGlzLl93bXNWZXJzaW9uID49IDEuMyAmJiB0aGlzLl9jcnMgPT09IEwuQ1JTLkVQU0c0MzI2ID9cclxuXHRcdCAgICAgICAgW3NlLnksIG53LngsIG53LnksIHNlLnhdLmpvaW4oJywnKSA6XHJcblx0XHQgICAgICAgIFtudy54LCBzZS55LCBzZS54LCBudy55XS5qb2luKCcsJyksXHJcblxyXG5cdFx0ICAgIHVybCA9IEwuVXRpbC50ZW1wbGF0ZSh0aGlzLl91cmwsIHtzOiB0aGlzLl9nZXRTdWJkb21haW4odGlsZVBvaW50KX0pO1xyXG5cclxuXHRcdHJldHVybiB1cmwgKyBMLlV0aWwuZ2V0UGFyYW1TdHJpbmcodGhpcy53bXNQYXJhbXMsIHVybCwgdHJ1ZSkgKyAnJkJCT1g9JyArIGJib3g7XHJcblx0fSxcclxuXHJcblx0c2V0UGFyYW1zOiBmdW5jdGlvbiAocGFyYW1zLCBub1JlZHJhdykge1xyXG5cclxuXHRcdEwuZXh0ZW5kKHRoaXMud21zUGFyYW1zLCBwYXJhbXMpO1xyXG5cclxuXHRcdGlmICghbm9SZWRyYXcpIHtcclxuXHRcdFx0dGhpcy5yZWRyYXcoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn0pO1xyXG5cclxuTC50aWxlTGF5ZXIud21zID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5UaWxlTGF5ZXIuV01TKHVybCwgb3B0aW9ucyk7XHJcbn07XHJcblxyXG5cclxuLypcclxuICogTC5UaWxlTGF5ZXIuQ2FudmFzIGlzIGEgY2xhc3MgdGhhdCB5b3UgY2FuIHVzZSBhcyBhIGJhc2UgZm9yIGNyZWF0aW5nXHJcbiAqIGR5bmFtaWNhbGx5IGRyYXduIENhbnZhcy1iYXNlZCB0aWxlIGxheWVycy5cclxuICovXHJcblxyXG5MLlRpbGVMYXllci5DYW52YXMgPSBMLlRpbGVMYXllci5leHRlbmQoe1xyXG5cdG9wdGlvbnM6IHtcclxuXHRcdGFzeW5jOiBmYWxzZVxyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0cmVkcmF3OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX3Jlc2V0KHtoYXJkOiB0cnVlfSk7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5fdGlsZXMpIHtcclxuXHRcdFx0dGhpcy5fcmVkcmF3VGlsZSh0aGlzLl90aWxlc1tpXSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfcmVkcmF3VGlsZTogZnVuY3Rpb24gKHRpbGUpIHtcclxuXHRcdHRoaXMuZHJhd1RpbGUodGlsZSwgdGlsZS5fdGlsZVBvaW50LCB0aGlzLl9tYXAuX3pvb20pO1xyXG5cdH0sXHJcblxyXG5cdF9jcmVhdGVUaWxlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgdGlsZSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2NhbnZhcycsICdsZWFmbGV0LXRpbGUnKTtcclxuXHRcdHRpbGUud2lkdGggPSB0aWxlLmhlaWdodCA9IHRoaXMub3B0aW9ucy50aWxlU2l6ZTtcclxuXHRcdHRpbGUub25zZWxlY3RzdGFydCA9IHRpbGUub25tb3VzZW1vdmUgPSBMLlV0aWwuZmFsc2VGbjtcclxuXHRcdHJldHVybiB0aWxlO1xyXG5cdH0sXHJcblxyXG5cdF9sb2FkVGlsZTogZnVuY3Rpb24gKHRpbGUsIHRpbGVQb2ludCkge1xyXG5cdFx0dGlsZS5fbGF5ZXIgPSB0aGlzO1xyXG5cdFx0dGlsZS5fdGlsZVBvaW50ID0gdGlsZVBvaW50O1xyXG5cclxuXHRcdHRoaXMuX3JlZHJhd1RpbGUodGlsZSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLm9wdGlvbnMuYXN5bmMpIHtcclxuXHRcdFx0dGhpcy50aWxlRHJhd24odGlsZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0ZHJhd1RpbGU6IGZ1bmN0aW9uICgvKnRpbGUsIHRpbGVQb2ludCovKSB7XHJcblx0XHQvLyBvdmVycmlkZSB3aXRoIHJlbmRlcmluZyBjb2RlXHJcblx0fSxcclxuXHJcblx0dGlsZURyYXduOiBmdW5jdGlvbiAodGlsZSkge1xyXG5cdFx0dGhpcy5fdGlsZU9uTG9hZC5jYWxsKHRpbGUpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuTC50aWxlTGF5ZXIuY2FudmFzID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuVGlsZUxheWVyLkNhbnZhcyhvcHRpb25zKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkltYWdlT3ZlcmxheSBpcyB1c2VkIHRvIG92ZXJsYXkgaW1hZ2VzIG92ZXIgdGhlIG1hcCAodG8gc3BlY2lmaWMgZ2VvZ3JhcGhpY2FsIGJvdW5kcykuXHJcbiAqL1xyXG5cclxuTC5JbWFnZU92ZXJsYXkgPSBMLkNsYXNzLmV4dGVuZCh7XHJcblx0aW5jbHVkZXM6IEwuTWl4aW4uRXZlbnRzLFxyXG5cclxuXHRvcHRpb25zOiB7XHJcblx0XHRvcGFjaXR5OiAxXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKHVybCwgYm91bmRzLCBvcHRpb25zKSB7IC8vIChTdHJpbmcsIExhdExuZ0JvdW5kcywgT2JqZWN0KVxyXG5cdFx0dGhpcy5fdXJsID0gdXJsO1xyXG5cdFx0dGhpcy5fYm91bmRzID0gTC5sYXRMbmdCb3VuZHMoYm91bmRzKTtcclxuXHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdHRoaXMuX21hcCA9IG1hcDtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2ltYWdlKSB7XHJcblx0XHRcdHRoaXMuX2luaXRJbWFnZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hcC5fcGFuZXMub3ZlcmxheVBhbmUuYXBwZW5kQ2hpbGQodGhpcy5faW1hZ2UpO1xyXG5cclxuXHRcdG1hcC5vbigndmlld3Jlc2V0JywgdGhpcy5fcmVzZXQsIHRoaXMpO1xyXG5cclxuXHRcdGlmIChtYXAub3B0aW9ucy56b29tQW5pbWF0aW9uICYmIEwuQnJvd3Nlci5hbnkzZCkge1xyXG5cdFx0XHRtYXAub24oJ3pvb21hbmltJywgdGhpcy5fYW5pbWF0ZVpvb20sIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3Jlc2V0KCk7XHJcblx0fSxcclxuXHJcblx0b25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdG1hcC5nZXRQYW5lcygpLm92ZXJsYXlQYW5lLnJlbW92ZUNoaWxkKHRoaXMuX2ltYWdlKTtcclxuXHJcblx0XHRtYXAub2ZmKCd2aWV3cmVzZXQnLCB0aGlzLl9yZXNldCwgdGhpcyk7XHJcblxyXG5cdFx0aWYgKG1hcC5vcHRpb25zLnpvb21BbmltYXRpb24pIHtcclxuXHRcdFx0bWFwLm9mZignem9vbWFuaW0nLCB0aGlzLl9hbmltYXRlWm9vbSwgdGhpcyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0YWRkVG86IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdG1hcC5hZGRMYXllcih0aGlzKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHNldE9wYWNpdHk6IGZ1bmN0aW9uIChvcGFjaXR5KSB7XHJcblx0XHR0aGlzLm9wdGlvbnMub3BhY2l0eSA9IG9wYWNpdHk7XHJcblx0XHR0aGlzLl91cGRhdGVPcGFjaXR5KCk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHQvLyBUT0RPIHJlbW92ZSBicmluZ1RvRnJvbnQvYnJpbmdUb0JhY2sgZHVwbGljYXRpb24gZnJvbSBUaWxlTGF5ZXIvUGF0aFxyXG5cdGJyaW5nVG9Gcm9udDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX2ltYWdlKSB7XHJcblx0XHRcdHRoaXMuX21hcC5fcGFuZXMub3ZlcmxheVBhbmUuYXBwZW5kQ2hpbGQodGhpcy5faW1hZ2UpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0YnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBwYW5lID0gdGhpcy5fbWFwLl9wYW5lcy5vdmVybGF5UGFuZTtcclxuXHRcdGlmICh0aGlzLl9pbWFnZSkge1xyXG5cdFx0XHRwYW5lLmluc2VydEJlZm9yZSh0aGlzLl9pbWFnZSwgcGFuZS5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHNldFVybDogZnVuY3Rpb24gKHVybCkge1xyXG5cdFx0dGhpcy5fdXJsID0gdXJsO1xyXG5cdFx0dGhpcy5faW1hZ2Uuc3JjID0gdGhpcy5fdXJsO1xyXG5cdH0sXHJcblxyXG5cdGdldEF0dHJpYnV0aW9uOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uO1xyXG5cdH0sXHJcblxyXG5cdF9pbml0SW1hZ2U6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX2ltYWdlID0gTC5Eb21VdGlsLmNyZWF0ZSgnaW1nJywgJ2xlYWZsZXQtaW1hZ2UtbGF5ZXInKTtcclxuXHJcblx0XHRpZiAodGhpcy5fbWFwLm9wdGlvbnMuem9vbUFuaW1hdGlvbiAmJiBMLkJyb3dzZXIuYW55M2QpIHtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2ltYWdlLCAnbGVhZmxldC16b29tLWFuaW1hdGVkJyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5faW1hZ2UsICdsZWFmbGV0LXpvb20taGlkZScpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3VwZGF0ZU9wYWNpdHkoKTtcclxuXHJcblx0XHQvL1RPRE8gY3JlYXRlSW1hZ2UgdXRpbCBtZXRob2QgdG8gcmVtb3ZlIGR1cGxpY2F0aW9uXHJcblx0XHRMLmV4dGVuZCh0aGlzLl9pbWFnZSwge1xyXG5cdFx0XHRnYWxsZXJ5aW1nOiAnbm8nLFxyXG5cdFx0XHRvbnNlbGVjdHN0YXJ0OiBMLlV0aWwuZmFsc2VGbixcclxuXHRcdFx0b25tb3VzZW1vdmU6IEwuVXRpbC5mYWxzZUZuLFxyXG5cdFx0XHRvbmxvYWQ6IEwuYmluZCh0aGlzLl9vbkltYWdlTG9hZCwgdGhpcyksXHJcblx0XHRcdHNyYzogdGhpcy5fdXJsXHJcblx0XHR9KTtcclxuXHR9LFxyXG5cclxuXHRfYW5pbWF0ZVpvb206IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxyXG5cdFx0ICAgIGltYWdlID0gdGhpcy5faW1hZ2UsXHJcblx0XHQgICAgc2NhbGUgPSBtYXAuZ2V0Wm9vbVNjYWxlKGUuem9vbSksXHJcblx0XHQgICAgbncgPSB0aGlzLl9ib3VuZHMuZ2V0Tm9ydGhXZXN0KCksXHJcblx0XHQgICAgc2UgPSB0aGlzLl9ib3VuZHMuZ2V0U291dGhFYXN0KCksXHJcblxyXG5cdFx0ICAgIHRvcExlZnQgPSBtYXAuX2xhdExuZ1RvTmV3TGF5ZXJQb2ludChudywgZS56b29tLCBlLmNlbnRlciksXHJcblx0XHQgICAgc2l6ZSA9IG1hcC5fbGF0TG5nVG9OZXdMYXllclBvaW50KHNlLCBlLnpvb20sIGUuY2VudGVyKS5fc3VidHJhY3QodG9wTGVmdCksXHJcblx0XHQgICAgb3JpZ2luID0gdG9wTGVmdC5fYWRkKHNpemUuX211bHRpcGx5QnkoKDEgLyAyKSAqICgxIC0gMSAvIHNjYWxlKSkpO1xyXG5cclxuXHRcdGltYWdlLnN0eWxlW0wuRG9tVXRpbC5UUkFOU0ZPUk1dID1cclxuXHRcdCAgICAgICAgTC5Eb21VdGlsLmdldFRyYW5zbGF0ZVN0cmluZyhvcmlnaW4pICsgJyBzY2FsZSgnICsgc2NhbGUgKyAnKSAnO1xyXG5cdH0sXHJcblxyXG5cdF9yZXNldDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGltYWdlICAgPSB0aGlzLl9pbWFnZSxcclxuXHRcdCAgICB0b3BMZWZ0ID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludCh0aGlzLl9ib3VuZHMuZ2V0Tm9ydGhXZXN0KCkpLFxyXG5cdFx0ICAgIHNpemUgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2JvdW5kcy5nZXRTb3V0aEVhc3QoKSkuX3N1YnRyYWN0KHRvcExlZnQpO1xyXG5cclxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbihpbWFnZSwgdG9wTGVmdCk7XHJcblxyXG5cdFx0aW1hZ2Uuc3R5bGUud2lkdGggID0gc2l6ZS54ICsgJ3B4JztcclxuXHRcdGltYWdlLnN0eWxlLmhlaWdodCA9IHNpemUueSArICdweCc7XHJcblx0fSxcclxuXHJcblx0X29uSW1hZ2VMb2FkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLmZpcmUoJ2xvYWQnKTtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlT3BhY2l0eTogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21VdGlsLnNldE9wYWNpdHkodGhpcy5faW1hZ2UsIHRoaXMub3B0aW9ucy5vcGFjaXR5KTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5pbWFnZU92ZXJsYXkgPSBmdW5jdGlvbiAodXJsLCBib3VuZHMsIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuSW1hZ2VPdmVybGF5KHVybCwgYm91bmRzLCBvcHRpb25zKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkljb24gaXMgYW4gaW1hZ2UtYmFzZWQgaWNvbiBjbGFzcyB0aGF0IHlvdSBjYW4gdXNlIHdpdGggTC5NYXJrZXIgZm9yIGN1c3RvbSBtYXJrZXJzLlxyXG4gKi9cclxuXHJcbkwuSWNvbiA9IEwuQ2xhc3MuZXh0ZW5kKHtcclxuXHRvcHRpb25zOiB7XHJcblx0XHQvKlxyXG5cdFx0aWNvblVybDogKFN0cmluZykgKHJlcXVpcmVkKVxyXG5cdFx0aWNvblJldGluYVVybDogKFN0cmluZykgKG9wdGlvbmFsLCB1c2VkIGZvciByZXRpbmEgZGV2aWNlcyBpZiBkZXRlY3RlZClcclxuXHRcdGljb25TaXplOiAoUG9pbnQpIChjYW4gYmUgc2V0IHRocm91Z2ggQ1NTKVxyXG5cdFx0aWNvbkFuY2hvcjogKFBvaW50KSAoY2VudGVyZWQgYnkgZGVmYXVsdCwgY2FuIGJlIHNldCBpbiBDU1Mgd2l0aCBuZWdhdGl2ZSBtYXJnaW5zKVxyXG5cdFx0cG9wdXBBbmNob3I6IChQb2ludCkgKGlmIG5vdCBzcGVjaWZpZWQsIHBvcHVwIG9wZW5zIGluIHRoZSBhbmNob3IgcG9pbnQpXHJcblx0XHRzaGFkb3dVcmw6IChTdHJpbmcpIChubyBzaGFkb3cgYnkgZGVmYXVsdClcclxuXHRcdHNoYWRvd1JldGluYVVybDogKFN0cmluZykgKG9wdGlvbmFsLCB1c2VkIGZvciByZXRpbmEgZGV2aWNlcyBpZiBkZXRlY3RlZClcclxuXHRcdHNoYWRvd1NpemU6IChQb2ludClcclxuXHRcdHNoYWRvd0FuY2hvcjogKFBvaW50KVxyXG5cdFx0Ki9cclxuXHRcdGNsYXNzTmFtZTogJydcclxuXHR9LFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZUljb246IGZ1bmN0aW9uIChvbGRJY29uKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY3JlYXRlSWNvbignaWNvbicsIG9sZEljb24pO1xyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZVNoYWRvdzogZnVuY3Rpb24gKG9sZEljb24pIHtcclxuXHRcdHJldHVybiB0aGlzLl9jcmVhdGVJY29uKCdzaGFkb3cnLCBvbGRJY29uKTtcclxuXHR9LFxyXG5cclxuXHRfY3JlYXRlSWNvbjogZnVuY3Rpb24gKG5hbWUsIG9sZEljb24pIHtcclxuXHRcdHZhciBzcmMgPSB0aGlzLl9nZXRJY29uVXJsKG5hbWUpO1xyXG5cclxuXHRcdGlmICghc3JjKSB7XHJcblx0XHRcdGlmIChuYW1lID09PSAnaWNvbicpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ2ljb25Vcmwgbm90IHNldCBpbiBJY29uIG9wdGlvbnMgKHNlZSB0aGUgZG9jcykuJyk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGltZztcclxuXHRcdGlmICghb2xkSWNvbiB8fCBvbGRJY29uLnRhZ05hbWUgIT09ICdJTUcnKSB7XHJcblx0XHRcdGltZyA9IHRoaXMuX2NyZWF0ZUltZyhzcmMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aW1nID0gdGhpcy5fY3JlYXRlSW1nKHNyYywgb2xkSWNvbik7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9zZXRJY29uU3R5bGVzKGltZywgbmFtZSk7XHJcblxyXG5cdFx0cmV0dXJuIGltZztcclxuXHR9LFxyXG5cclxuXHRfc2V0SWNvblN0eWxlczogZnVuY3Rpb24gKGltZywgbmFtZSkge1xyXG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXHJcblx0XHQgICAgc2l6ZSA9IEwucG9pbnQob3B0aW9uc1tuYW1lICsgJ1NpemUnXSksXHJcblx0XHQgICAgYW5jaG9yO1xyXG5cclxuXHRcdGlmIChuYW1lID09PSAnc2hhZG93Jykge1xyXG5cdFx0XHRhbmNob3IgPSBMLnBvaW50KG9wdGlvbnMuc2hhZG93QW5jaG9yIHx8IG9wdGlvbnMuaWNvbkFuY2hvcik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRhbmNob3IgPSBMLnBvaW50KG9wdGlvbnMuaWNvbkFuY2hvcik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFhbmNob3IgJiYgc2l6ZSkge1xyXG5cdFx0XHRhbmNob3IgPSBzaXplLmRpdmlkZUJ5KDIsIHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGltZy5jbGFzc05hbWUgPSAnbGVhZmxldC1tYXJrZXItJyArIG5hbWUgKyAnICcgKyBvcHRpb25zLmNsYXNzTmFtZTtcclxuXHJcblx0XHRpZiAoYW5jaG9yKSB7XHJcblx0XHRcdGltZy5zdHlsZS5tYXJnaW5MZWZ0ID0gKC1hbmNob3IueCkgKyAncHgnO1xyXG5cdFx0XHRpbWcuc3R5bGUubWFyZ2luVG9wICA9ICgtYW5jaG9yLnkpICsgJ3B4JztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2l6ZSkge1xyXG5cdFx0XHRpbWcuc3R5bGUud2lkdGggID0gc2l6ZS54ICsgJ3B4JztcclxuXHRcdFx0aW1nLnN0eWxlLmhlaWdodCA9IHNpemUueSArICdweCc7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2NyZWF0ZUltZzogZnVuY3Rpb24gKHNyYywgZWwpIHtcclxuXHRcdGVsID0gZWwgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblx0XHRlbC5zcmMgPSBzcmM7XHJcblx0XHRyZXR1cm4gZWw7XHJcblx0fSxcclxuXHJcblx0X2dldEljb25Vcmw6IGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRpZiAoTC5Ccm93c2VyLnJldGluYSAmJiB0aGlzLm9wdGlvbnNbbmFtZSArICdSZXRpbmFVcmwnXSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5vcHRpb25zW25hbWUgKyAnUmV0aW5hVXJsJ107XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5vcHRpb25zW25hbWUgKyAnVXJsJ107XHJcblx0fVxyXG59KTtcclxuXHJcbkwuaWNvbiA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLkljb24ob3B0aW9ucyk7XHJcbn07XHJcblxyXG5cclxuLypcclxuICogTC5JY29uLkRlZmF1bHQgaXMgdGhlIGJsdWUgbWFya2VyIGljb24gdXNlZCBieSBkZWZhdWx0IGluIExlYWZsZXQuXHJcbiAqL1xyXG5cclxuTC5JY29uLkRlZmF1bHQgPSBMLkljb24uZXh0ZW5kKHtcclxuXHJcblx0b3B0aW9uczoge1xyXG5cdFx0aWNvblNpemU6IFsyNSwgNDFdLFxyXG5cdFx0aWNvbkFuY2hvcjogWzEyLCA0MV0sXHJcblx0XHRwb3B1cEFuY2hvcjogWzEsIC0zNF0sXHJcblxyXG5cdFx0c2hhZG93U2l6ZTogWzQxLCA0MV1cclxuXHR9LFxyXG5cclxuXHRfZ2V0SWNvblVybDogZnVuY3Rpb24gKG5hbWUpIHtcclxuXHRcdHZhciBrZXkgPSBuYW1lICsgJ1VybCc7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9uc1trZXldKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLm9wdGlvbnNba2V5XTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoTC5Ccm93c2VyLnJldGluYSAmJiBuYW1lID09PSAnaWNvbicpIHtcclxuXHRcdFx0bmFtZSArPSAnLTJ4JztcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgcGF0aCA9IEwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aDtcclxuXHJcblx0XHRpZiAoIXBhdGgpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDb3VsZG5cXCd0IGF1dG9kZXRlY3QgTC5JY29uLkRlZmF1bHQuaW1hZ2VQYXRoLCBzZXQgaXQgbWFudWFsbHkuJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHBhdGggKyAnL21hcmtlci0nICsgbmFtZSArICcucG5nJztcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5JY29uLkRlZmF1bHQuaW1hZ2VQYXRoID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKSxcclxuXHQgICAgbGVhZmxldFJlID0gL1tcXC9eXWxlYWZsZXRbXFwtXFwuX10/KFtcXHdcXC1cXC5fXSopXFwuanNcXD8/LztcclxuXHJcblx0dmFyIGksIGxlbiwgc3JjLCBtYXRjaGVzLCBwYXRoO1xyXG5cclxuXHRmb3IgKGkgPSAwLCBsZW4gPSBzY3JpcHRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRzcmMgPSBzY3JpcHRzW2ldLnNyYztcclxuXHRcdG1hdGNoZXMgPSBzcmMubWF0Y2gobGVhZmxldFJlKTtcclxuXHJcblx0XHRpZiAobWF0Y2hlcykge1xyXG5cdFx0XHRwYXRoID0gc3JjLnNwbGl0KGxlYWZsZXRSZSlbMF07XHJcblx0XHRcdHJldHVybiAocGF0aCA/IHBhdGggKyAnLycgOiAnJykgKyAnaW1hZ2VzJztcclxuXHRcdH1cclxuXHR9XHJcbn0oKSk7XHJcblxyXG5cclxuLypcclxuICogTC5NYXJrZXIgaXMgdXNlZCB0byBkaXNwbGF5IGNsaWNrYWJsZS9kcmFnZ2FibGUgaWNvbnMgb24gdGhlIG1hcC5cclxuICovXHJcblxyXG5MLk1hcmtlciA9IEwuQ2xhc3MuZXh0ZW5kKHtcclxuXHJcblx0aW5jbHVkZXM6IEwuTWl4aW4uRXZlbnRzLFxyXG5cclxuXHRvcHRpb25zOiB7XHJcblx0XHRpY29uOiBuZXcgTC5JY29uLkRlZmF1bHQoKSxcclxuXHRcdHRpdGxlOiAnJyxcclxuXHRcdGFsdDogJycsXHJcblx0XHRjbGlja2FibGU6IHRydWUsXHJcblx0XHRkcmFnZ2FibGU6IGZhbHNlLFxyXG5cdFx0a2V5Ym9hcmQ6IHRydWUsXHJcblx0XHR6SW5kZXhPZmZzZXQ6IDAsXHJcblx0XHRvcGFjaXR5OiAxLFxyXG5cdFx0cmlzZU9uSG92ZXI6IGZhbHNlLFxyXG5cdFx0cmlzZU9mZnNldDogMjUwXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZywgb3B0aW9ucykge1xyXG5cdFx0TC5zZXRPcHRpb25zKHRoaXMsIG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5fbGF0bG5nID0gTC5sYXRMbmcobGF0bG5nKTtcclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5fbWFwID0gbWFwO1xyXG5cclxuXHRcdG1hcC5vbigndmlld3Jlc2V0JywgdGhpcy51cGRhdGUsIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX2luaXRJY29uKCk7XHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0dGhpcy5maXJlKCdhZGQnKTtcclxuXHJcblx0XHRpZiAobWFwLm9wdGlvbnMuem9vbUFuaW1hdGlvbiAmJiBtYXAub3B0aW9ucy5tYXJrZXJab29tQW5pbWF0aW9uKSB7XHJcblx0XHRcdG1hcC5vbignem9vbWFuaW0nLCB0aGlzLl9hbmltYXRlWm9vbSwgdGhpcyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0YWRkVG86IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdG1hcC5hZGRMYXllcih0aGlzKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHRpZiAodGhpcy5kcmFnZ2luZykge1xyXG5cdFx0XHR0aGlzLmRyYWdnaW5nLmRpc2FibGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9yZW1vdmVJY29uKCk7XHJcblx0XHR0aGlzLl9yZW1vdmVTaGFkb3coKTtcclxuXHJcblx0XHR0aGlzLmZpcmUoJ3JlbW92ZScpO1xyXG5cclxuXHRcdG1hcC5vZmYoe1xyXG5cdFx0XHQndmlld3Jlc2V0JzogdGhpcy51cGRhdGUsXHJcblx0XHRcdCd6b29tYW5pbSc6IHRoaXMuX2FuaW1hdGVab29tXHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9tYXAgPSBudWxsO1xyXG5cdH0sXHJcblxyXG5cdGdldExhdExuZzogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xhdGxuZztcclxuXHR9LFxyXG5cclxuXHRzZXRMYXRMbmc6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHRoaXMuX2xhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XHJcblxyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5maXJlKCdtb3ZlJywgeyBsYXRsbmc6IHRoaXMuX2xhdGxuZyB9KTtcclxuXHR9LFxyXG5cclxuXHRzZXRaSW5kZXhPZmZzZXQ6IGZ1bmN0aW9uIChvZmZzZXQpIHtcclxuXHRcdHRoaXMub3B0aW9ucy56SW5kZXhPZmZzZXQgPSBvZmZzZXQ7XHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHNldEljb246IGZ1bmN0aW9uIChpY29uKSB7XHJcblxyXG5cdFx0dGhpcy5vcHRpb25zLmljb24gPSBpY29uO1xyXG5cclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0dGhpcy5faW5pdEljb24oKTtcclxuXHRcdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fcG9wdXApIHtcclxuXHRcdFx0dGhpcy5iaW5kUG9wdXAodGhpcy5fcG9wdXApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX2ljb24pIHtcclxuXHRcdFx0dGhpcy5fc2V0UG9zKHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQodGhpcy5fbGF0bG5nKS5yb3VuZCgpKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF9pbml0SWNvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXHJcblx0XHQgICAgbWFwID0gdGhpcy5fbWFwLFxyXG5cdFx0ICAgIGFuaW1hdGlvbiA9IChtYXAub3B0aW9ucy56b29tQW5pbWF0aW9uICYmIG1hcC5vcHRpb25zLm1hcmtlclpvb21BbmltYXRpb24pLFxyXG5cdFx0ICAgIGNsYXNzVG9BZGQgPSBhbmltYXRpb24gPyAnbGVhZmxldC16b29tLWFuaW1hdGVkJyA6ICdsZWFmbGV0LXpvb20taGlkZSc7XHJcblxyXG5cdFx0dmFyIGljb24gPSBvcHRpb25zLmljb24uY3JlYXRlSWNvbih0aGlzLl9pY29uKSxcclxuXHRcdFx0YWRkSWNvbiA9IGZhbHNlO1xyXG5cclxuXHRcdC8vIGlmIHdlJ3JlIG5vdCByZXVzaW5nIHRoZSBpY29uLCByZW1vdmUgdGhlIG9sZCBvbmUgYW5kIGluaXQgbmV3IG9uZVxyXG5cdFx0aWYgKGljb24gIT09IHRoaXMuX2ljb24pIHtcclxuXHRcdFx0aWYgKHRoaXMuX2ljb24pIHtcclxuXHRcdFx0XHR0aGlzLl9yZW1vdmVJY29uKCk7XHJcblx0XHRcdH1cclxuXHRcdFx0YWRkSWNvbiA9IHRydWU7XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy50aXRsZSkge1xyXG5cdFx0XHRcdGljb24udGl0bGUgPSBvcHRpb25zLnRpdGxlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5hbHQpIHtcclxuXHRcdFx0XHRpY29uLmFsdCA9IG9wdGlvbnMuYWx0O1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0TC5Eb21VdGlsLmFkZENsYXNzKGljb24sIGNsYXNzVG9BZGQpO1xyXG5cclxuXHRcdGlmIChvcHRpb25zLmtleWJvYXJkKSB7XHJcblx0XHRcdGljb24udGFiSW5kZXggPSAnMCc7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5faWNvbiA9IGljb247XHJcblxyXG5cdFx0dGhpcy5faW5pdEludGVyYWN0aW9uKCk7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMucmlzZU9uSG92ZXIpIHtcclxuXHRcdFx0TC5Eb21FdmVudFxyXG5cdFx0XHRcdC5vbihpY29uLCAnbW91c2VvdmVyJywgdGhpcy5fYnJpbmdUb0Zyb250LCB0aGlzKVxyXG5cdFx0XHRcdC5vbihpY29uLCAnbW91c2VvdXQnLCB0aGlzLl9yZXNldFpJbmRleCwgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIG5ld1NoYWRvdyA9IG9wdGlvbnMuaWNvbi5jcmVhdGVTaGFkb3codGhpcy5fc2hhZG93KSxcclxuXHRcdFx0YWRkU2hhZG93ID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKG5ld1NoYWRvdyAhPT0gdGhpcy5fc2hhZG93KSB7XHJcblx0XHRcdHRoaXMuX3JlbW92ZVNoYWRvdygpO1xyXG5cdFx0XHRhZGRTaGFkb3cgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChuZXdTaGFkb3cpIHtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKG5ld1NoYWRvdywgY2xhc3NUb0FkZCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLl9zaGFkb3cgPSBuZXdTaGFkb3c7XHJcblxyXG5cclxuXHRcdGlmIChvcHRpb25zLm9wYWNpdHkgPCAxKSB7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZU9wYWNpdHkoKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0dmFyIHBhbmVzID0gdGhpcy5fbWFwLl9wYW5lcztcclxuXHJcblx0XHRpZiAoYWRkSWNvbikge1xyXG5cdFx0XHRwYW5lcy5tYXJrZXJQYW5lLmFwcGVuZENoaWxkKHRoaXMuX2ljb24pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChuZXdTaGFkb3cgJiYgYWRkU2hhZG93KSB7XHJcblx0XHRcdHBhbmVzLnNoYWRvd1BhbmUuYXBwZW5kQ2hpbGQodGhpcy5fc2hhZG93KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfcmVtb3ZlSWNvbjogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5yaXNlT25Ib3Zlcikge1xyXG5cdFx0XHRMLkRvbUV2ZW50XHJcblx0XHRcdCAgICAub2ZmKHRoaXMuX2ljb24sICdtb3VzZW92ZXInLCB0aGlzLl9icmluZ1RvRnJvbnQpXHJcblx0XHRcdCAgICAub2ZmKHRoaXMuX2ljb24sICdtb3VzZW91dCcsIHRoaXMuX3Jlc2V0WkluZGV4KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9tYXAuX3BhbmVzLm1hcmtlclBhbmUucmVtb3ZlQ2hpbGQodGhpcy5faWNvbik7XHJcblxyXG5cdFx0dGhpcy5faWNvbiA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0X3JlbW92ZVNoYWRvdzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX3NoYWRvdykge1xyXG5cdFx0XHR0aGlzLl9tYXAuX3BhbmVzLnNoYWRvd1BhbmUucmVtb3ZlQ2hpbGQodGhpcy5fc2hhZG93KTtcclxuXHRcdH1cclxuXHRcdHRoaXMuX3NoYWRvdyA9IG51bGw7XHJcblx0fSxcclxuXHJcblx0X3NldFBvczogZnVuY3Rpb24gKHBvcykge1xyXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX2ljb24sIHBvcyk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3NoYWRvdykge1xyXG5cdFx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5fc2hhZG93LCBwb3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3pJbmRleCA9IHBvcy55ICsgdGhpcy5vcHRpb25zLnpJbmRleE9mZnNldDtcclxuXHJcblx0XHR0aGlzLl9yZXNldFpJbmRleCgpO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGVaSW5kZXg6IGZ1bmN0aW9uIChvZmZzZXQpIHtcclxuXHRcdHRoaXMuX2ljb24uc3R5bGUuekluZGV4ID0gdGhpcy5fekluZGV4ICsgb2Zmc2V0O1xyXG5cdH0sXHJcblxyXG5cdF9hbmltYXRlWm9vbTogZnVuY3Rpb24gKG9wdCkge1xyXG5cdFx0dmFyIHBvcyA9IHRoaXMuX21hcC5fbGF0TG5nVG9OZXdMYXllclBvaW50KHRoaXMuX2xhdGxuZywgb3B0Lnpvb20sIG9wdC5jZW50ZXIpLnJvdW5kKCk7XHJcblxyXG5cdFx0dGhpcy5fc2V0UG9zKHBvcyk7XHJcblx0fSxcclxuXHJcblx0X2luaXRJbnRlcmFjdGlvbjogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmICghdGhpcy5vcHRpb25zLmNsaWNrYWJsZSkgeyByZXR1cm47IH1cclxuXHJcblx0XHQvLyBUT0RPIHJlZmFjdG9yIGludG8gc29tZXRoaW5nIHNoYXJlZCB3aXRoIE1hcC9QYXRoL2V0Yy4gdG8gRFJZIGl0IHVwXHJcblxyXG5cdFx0dmFyIGljb24gPSB0aGlzLl9pY29uLFxyXG5cdFx0ICAgIGV2ZW50cyA9IFsnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNlb3ZlcicsICdtb3VzZW91dCcsICdjb250ZXh0bWVudSddO1xyXG5cclxuXHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhpY29uLCAnbGVhZmxldC1jbGlja2FibGUnKTtcclxuXHRcdEwuRG9tRXZlbnQub24oaWNvbiwgJ2NsaWNrJywgdGhpcy5fb25Nb3VzZUNsaWNrLCB0aGlzKTtcclxuXHRcdEwuRG9tRXZlbnQub24oaWNvbiwgJ2tleXByZXNzJywgdGhpcy5fb25LZXlQcmVzcywgdGhpcyk7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0TC5Eb21FdmVudC5vbihpY29uLCBldmVudHNbaV0sIHRoaXMuX2ZpcmVNb3VzZUV2ZW50LCB0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoTC5IYW5kbGVyLk1hcmtlckRyYWcpIHtcclxuXHRcdFx0dGhpcy5kcmFnZ2luZyA9IG5ldyBMLkhhbmRsZXIuTWFya2VyRHJhZyh0aGlzKTtcclxuXHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKSB7XHJcblx0XHRcdFx0dGhpcy5kcmFnZ2luZy5lbmFibGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9vbk1vdXNlQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgd2FzRHJhZ2dlZCA9IHRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5kcmFnZ2luZy5tb3ZlZCgpO1xyXG5cclxuXHRcdGlmICh0aGlzLmhhc0V2ZW50TGlzdGVuZXJzKGUudHlwZSkgfHwgd2FzRHJhZ2dlZCkge1xyXG5cdFx0XHRMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbihlKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAod2FzRHJhZ2dlZCkgeyByZXR1cm47IH1cclxuXHJcblx0XHRpZiAoKCF0aGlzLmRyYWdnaW5nIHx8ICF0aGlzLmRyYWdnaW5nLl9lbmFibGVkKSAmJiB0aGlzLl9tYXAuZHJhZ2dpbmcgJiYgdGhpcy5fbWFwLmRyYWdnaW5nLm1vdmVkKCkpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dGhpcy5maXJlKGUudHlwZSwge1xyXG5cdFx0XHRvcmlnaW5hbEV2ZW50OiBlLFxyXG5cdFx0XHRsYXRsbmc6IHRoaXMuX2xhdGxuZ1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0X29uS2V5UHJlc3M6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoZS5rZXlDb2RlID09PSAxMykge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ2NsaWNrJywge1xyXG5cdFx0XHRcdG9yaWdpbmFsRXZlbnQ6IGUsXHJcblx0XHRcdFx0bGF0bG5nOiB0aGlzLl9sYXRsbmdcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2ZpcmVNb3VzZUV2ZW50OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuXHRcdHRoaXMuZmlyZShlLnR5cGUsIHtcclxuXHRcdFx0b3JpZ2luYWxFdmVudDogZSxcclxuXHRcdFx0bGF0bG5nOiB0aGlzLl9sYXRsbmdcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFRPRE8gcHJvcGVyIGN1c3RvbSBldmVudCBwcm9wYWdhdGlvblxyXG5cdFx0Ly8gdGhpcyBsaW5lIHdpbGwgYWx3YXlzIGJlIGNhbGxlZCBpZiBtYXJrZXIgaXMgaW4gYSBGZWF0dXJlR3JvdXBcclxuXHRcdGlmIChlLnR5cGUgPT09ICdjb250ZXh0bWVudScgJiYgdGhpcy5oYXNFdmVudExpc3RlbmVycyhlLnR5cGUpKSB7XHJcblx0XHRcdEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XHJcblx0XHR9XHJcblx0XHRpZiAoZS50eXBlICE9PSAnbW91c2Vkb3duJykge1xyXG5cdFx0XHRMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbihlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0c2V0T3BhY2l0eTogZnVuY3Rpb24gKG9wYWNpdHkpIHtcclxuXHRcdHRoaXMub3B0aW9ucy5vcGFjaXR5ID0gb3BhY2l0eTtcclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0dGhpcy5fdXBkYXRlT3BhY2l0eSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGVPcGFjaXR5OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLkRvbVV0aWwuc2V0T3BhY2l0eSh0aGlzLl9pY29uLCB0aGlzLm9wdGlvbnMub3BhY2l0eSk7XHJcblx0XHRpZiAodGhpcy5fc2hhZG93KSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRoaXMuX3NoYWRvdywgdGhpcy5vcHRpb25zLm9wYWNpdHkpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9icmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX3VwZGF0ZVpJbmRleCh0aGlzLm9wdGlvbnMucmlzZU9mZnNldCk7XHJcblx0fSxcclxuXHJcblx0X3Jlc2V0WkluZGV4OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl91cGRhdGVaSW5kZXgoMCk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwubWFya2VyID0gZnVuY3Rpb24gKGxhdGxuZywgb3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5NYXJrZXIobGF0bG5nLCBvcHRpb25zKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkRpdkljb24gaXMgYSBsaWdodHdlaWdodCBIVE1MLWJhc2VkIGljb24gY2xhc3MgKGFzIG9wcG9zZWQgdG8gdGhlIGltYWdlLWJhc2VkIEwuSWNvbilcclxuICogdG8gdXNlIHdpdGggTC5NYXJrZXIuXHJcbiAqL1xyXG5cclxuTC5EaXZJY29uID0gTC5JY29uLmV4dGVuZCh7XHJcblx0b3B0aW9uczoge1xyXG5cdFx0aWNvblNpemU6IFsxMiwgMTJdLCAvLyBhbHNvIGNhbiBiZSBzZXQgdGhyb3VnaCBDU1NcclxuXHRcdC8qXHJcblx0XHRpY29uQW5jaG9yOiAoUG9pbnQpXHJcblx0XHRwb3B1cEFuY2hvcjogKFBvaW50KVxyXG5cdFx0aHRtbDogKFN0cmluZylcclxuXHRcdGJnUG9zOiAoUG9pbnQpXHJcblx0XHQqL1xyXG5cdFx0Y2xhc3NOYW1lOiAnbGVhZmxldC1kaXYtaWNvbicsXHJcblx0XHRodG1sOiBmYWxzZVxyXG5cdH0sXHJcblxyXG5cdGNyZWF0ZUljb246IGZ1bmN0aW9uIChvbGRJY29uKSB7XHJcblx0XHR2YXIgZGl2ID0gKG9sZEljb24gJiYgb2xkSWNvbi50YWdOYW1lID09PSAnRElWJykgPyBvbGRJY29uIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JyksXHJcblx0XHQgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuXHJcblx0XHRpZiAob3B0aW9ucy5odG1sICE9PSBmYWxzZSkge1xyXG5cdFx0XHRkaXYuaW5uZXJIVE1MID0gb3B0aW9ucy5odG1sO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGl2LmlubmVySFRNTCA9ICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLmJnUG9zKSB7XHJcblx0XHRcdGRpdi5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPVxyXG5cdFx0XHQgICAgICAgICgtb3B0aW9ucy5iZ1Bvcy54KSArICdweCAnICsgKC1vcHRpb25zLmJnUG9zLnkpICsgJ3B4JztcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9zZXRJY29uU3R5bGVzKGRpdiwgJ2ljb24nKTtcclxuXHRcdHJldHVybiBkaXY7XHJcblx0fSxcclxuXHJcblx0Y3JlYXRlU2hhZG93OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5kaXZJY29uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuRGl2SWNvbihvcHRpb25zKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLlBvcHVwIGlzIHVzZWQgZm9yIGRpc3BsYXlpbmcgcG9wdXBzIG9uIHRoZSBtYXAuXHJcbiAqL1xyXG5cclxuTC5NYXAubWVyZ2VPcHRpb25zKHtcclxuXHRjbG9zZVBvcHVwT25DbGljazogdHJ1ZVxyXG59KTtcclxuXHJcbkwuUG9wdXAgPSBMLkNsYXNzLmV4dGVuZCh7XHJcblx0aW5jbHVkZXM6IEwuTWl4aW4uRXZlbnRzLFxyXG5cclxuXHRvcHRpb25zOiB7XHJcblx0XHRtaW5XaWR0aDogNTAsXHJcblx0XHRtYXhXaWR0aDogMzAwLFxyXG5cdFx0Ly8gbWF4SGVpZ2h0OiBudWxsLFxyXG5cdFx0YXV0b1BhbjogdHJ1ZSxcclxuXHRcdGNsb3NlQnV0dG9uOiB0cnVlLFxyXG5cdFx0b2Zmc2V0OiBbMCwgN10sXHJcblx0XHRhdXRvUGFuUGFkZGluZzogWzUsIDVdLFxyXG5cdFx0Ly8gYXV0b1BhblBhZGRpbmdUb3BMZWZ0OiBudWxsLFxyXG5cdFx0Ly8gYXV0b1BhblBhZGRpbmdCb3R0b21SaWdodDogbnVsbCxcclxuXHRcdGtlZXBJblZpZXc6IGZhbHNlLFxyXG5cdFx0Y2xhc3NOYW1lOiAnJyxcclxuXHRcdHpvb21BbmltYXRpb246IHRydWVcclxuXHR9LFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAob3B0aW9ucywgc291cmNlKSB7XHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5fc291cmNlID0gc291cmNlO1xyXG5cdFx0dGhpcy5fYW5pbWF0ZWQgPSBMLkJyb3dzZXIuYW55M2QgJiYgdGhpcy5vcHRpb25zLnpvb21BbmltYXRpb247XHJcblx0XHR0aGlzLl9pc09wZW4gPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5fbWFwID0gbWFwO1xyXG5cclxuXHRcdGlmICghdGhpcy5fY29udGFpbmVyKSB7XHJcblx0XHRcdHRoaXMuX2luaXRMYXlvdXQoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgYW5pbUZhZGUgPSBtYXAub3B0aW9ucy5mYWRlQW5pbWF0aW9uO1xyXG5cclxuXHRcdGlmIChhbmltRmFkZSkge1xyXG5cdFx0XHRMLkRvbVV0aWwuc2V0T3BhY2l0eSh0aGlzLl9jb250YWluZXIsIDApO1xyXG5cdFx0fVxyXG5cdFx0bWFwLl9wYW5lcy5wb3B1cFBhbmUuYXBwZW5kQ2hpbGQodGhpcy5fY29udGFpbmVyKTtcclxuXHJcblx0XHRtYXAub24odGhpcy5fZ2V0RXZlbnRzKCksIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlKCk7XHJcblxyXG5cdFx0aWYgKGFuaW1GYWRlKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRPcGFjaXR5KHRoaXMuX2NvbnRhaW5lciwgMSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5maXJlKCdvcGVuJyk7XHJcblxyXG5cdFx0bWFwLmZpcmUoJ3BvcHVwb3BlbicsIHtwb3B1cDogdGhpc30pO1xyXG5cclxuXHRcdGlmICh0aGlzLl9zb3VyY2UpIHtcclxuXHRcdFx0dGhpcy5fc291cmNlLmZpcmUoJ3BvcHVwb3BlbicsIHtwb3B1cDogdGhpc30pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGFkZFRvOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHRtYXAuYWRkTGF5ZXIodGhpcyk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRvcGVuT246IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdG1hcC5vcGVuUG9wdXAodGhpcyk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0bWFwLl9wYW5lcy5wb3B1cFBhbmUucmVtb3ZlQ2hpbGQodGhpcy5fY29udGFpbmVyKTtcclxuXHJcblx0XHRMLlV0aWwuZmFsc2VGbih0aGlzLl9jb250YWluZXIub2Zmc2V0V2lkdGgpOyAvLyBmb3JjZSByZWZsb3dcclxuXHJcblx0XHRtYXAub2ZmKHRoaXMuX2dldEV2ZW50cygpLCB0aGlzKTtcclxuXHJcblx0XHRpZiAobWFwLm9wdGlvbnMuZmFkZUFuaW1hdGlvbikge1xyXG5cdFx0XHRMLkRvbVV0aWwuc2V0T3BhY2l0eSh0aGlzLl9jb250YWluZXIsIDApO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX21hcCA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5maXJlKCdjbG9zZScpO1xyXG5cclxuXHRcdG1hcC5maXJlKCdwb3B1cGNsb3NlJywge3BvcHVwOiB0aGlzfSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3NvdXJjZSkge1xyXG5cdFx0XHR0aGlzLl9zb3VyY2UuZmlyZSgncG9wdXBjbG9zZScsIHtwb3B1cDogdGhpc30pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGdldExhdExuZzogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2xhdGxuZztcclxuXHR9LFxyXG5cclxuXHRzZXRMYXRMbmc6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHRoaXMuX2xhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XHJcblx0XHRcdHRoaXMuX2FkanVzdFBhbigpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Z2V0Q29udGVudDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRlbnQ7XHJcblx0fSxcclxuXHJcblx0c2V0Q29udGVudDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuXHRcdHRoaXMuX2NvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0dGhpcy51cGRhdGUoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9tYXApIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuXHJcblx0XHR0aGlzLl91cGRhdGVDb250ZW50KCk7XHJcblx0XHR0aGlzLl91cGRhdGVMYXlvdXQoKTtcclxuXHRcdHRoaXMuX3VwZGF0ZVBvc2l0aW9uKCk7XHJcblxyXG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSAnJztcclxuXHJcblx0XHR0aGlzLl9hZGp1c3RQYW4oKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0RXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZXZlbnRzID0ge1xyXG5cdFx0XHR2aWV3cmVzZXQ6IHRoaXMuX3VwZGF0ZVBvc2l0aW9uXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmICh0aGlzLl9hbmltYXRlZCkge1xyXG5cdFx0XHRldmVudHMuem9vbWFuaW0gPSB0aGlzLl96b29tQW5pbWF0aW9uO1xyXG5cdFx0fVxyXG5cdFx0aWYgKCdjbG9zZU9uQ2xpY2snIGluIHRoaXMub3B0aW9ucyA/IHRoaXMub3B0aW9ucy5jbG9zZU9uQ2xpY2sgOiB0aGlzLl9tYXAub3B0aW9ucy5jbG9zZVBvcHVwT25DbGljaykge1xyXG5cdFx0XHRldmVudHMucHJlY2xpY2sgPSB0aGlzLl9jbG9zZTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMua2VlcEluVmlldykge1xyXG5cdFx0XHRldmVudHMubW92ZWVuZCA9IHRoaXMuX2FkanVzdFBhbjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZXZlbnRzO1xyXG5cdH0sXHJcblxyXG5cdF9jbG9zZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX21hcCkge1xyXG5cdFx0XHR0aGlzLl9tYXAuY2xvc2VQb3B1cCh0aGlzKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfaW5pdExheW91dDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHByZWZpeCA9ICdsZWFmbGV0LXBvcHVwJyxcclxuXHRcdFx0Y29udGFpbmVyQ2xhc3MgPSBwcmVmaXggKyAnICcgKyB0aGlzLm9wdGlvbnMuY2xhc3NOYW1lICsgJyBsZWFmbGV0LXpvb20tJyArXHJcblx0XHRcdCAgICAgICAgKHRoaXMuX2FuaW1hdGVkID8gJ2FuaW1hdGVkJyA6ICdoaWRlJyksXHJcblx0XHRcdGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIGNvbnRhaW5lckNsYXNzKSxcclxuXHRcdFx0Y2xvc2VCdXR0b247XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jbG9zZUJ1dHRvbikge1xyXG5cdFx0XHRjbG9zZUJ1dHRvbiA9IHRoaXMuX2Nsb3NlQnV0dG9uID1cclxuXHRcdFx0ICAgICAgICBMLkRvbVV0aWwuY3JlYXRlKCdhJywgcHJlZml4ICsgJy1jbG9zZS1idXR0b24nLCBjb250YWluZXIpO1xyXG5cdFx0XHRjbG9zZUJ1dHRvbi5ocmVmID0gJyNjbG9zZSc7XHJcblx0XHRcdGNsb3NlQnV0dG9uLmlubmVySFRNTCA9ICcmIzIxNTsnO1xyXG5cdFx0XHRMLkRvbUV2ZW50LmRpc2FibGVDbGlja1Byb3BhZ2F0aW9uKGNsb3NlQnV0dG9uKTtcclxuXHJcblx0XHRcdEwuRG9tRXZlbnQub24oY2xvc2VCdXR0b24sICdjbGljaycsIHRoaXMuX29uQ2xvc2VCdXR0b25DbGljaywgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIHdyYXBwZXIgPSB0aGlzLl93cmFwcGVyID1cclxuXHRcdCAgICAgICAgTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgcHJlZml4ICsgJy1jb250ZW50LXdyYXBwZXInLCBjb250YWluZXIpO1xyXG5cdFx0TC5Eb21FdmVudC5kaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbih3cmFwcGVyKTtcclxuXHJcblx0XHR0aGlzLl9jb250ZW50Tm9kZSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIHByZWZpeCArICctY29udGVudCcsIHdyYXBwZXIpO1xyXG5cclxuXHRcdEwuRG9tRXZlbnQuZGlzYWJsZVNjcm9sbFByb3BhZ2F0aW9uKHRoaXMuX2NvbnRlbnROb2RlKTtcclxuXHRcdEwuRG9tRXZlbnQub24od3JhcHBlciwgJ2NvbnRleHRtZW51JywgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pO1xyXG5cclxuXHRcdHRoaXMuX3RpcENvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIHByZWZpeCArICctdGlwLWNvbnRhaW5lcicsIGNvbnRhaW5lcik7XHJcblx0XHR0aGlzLl90aXAgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBwcmVmaXggKyAnLXRpcCcsIHRoaXMuX3RpcENvbnRhaW5lcik7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZUNvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fY29udGVudCkgeyByZXR1cm47IH1cclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXMuX2NvbnRlbnQgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHRoaXMuX2NvbnRlbnROb2RlLmlubmVySFRNTCA9IHRoaXMuX2NvbnRlbnQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR3aGlsZSAodGhpcy5fY29udGVudE5vZGUuaGFzQ2hpbGROb2RlcygpKSB7XHJcblx0XHRcdFx0dGhpcy5fY29udGVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fY29udGVudE5vZGUuZmlyc3RDaGlsZCk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5fY29udGVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy5fY29udGVudCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLmZpcmUoJ2NvbnRlbnR1cGRhdGUnKTtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlTGF5b3V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgY29udGFpbmVyID0gdGhpcy5fY29udGVudE5vZGUsXHJcblx0XHQgICAgc3R5bGUgPSBjb250YWluZXIuc3R5bGU7XHJcblxyXG5cdFx0c3R5bGUud2lkdGggPSAnJztcclxuXHRcdHN0eWxlLndoaXRlU3BhY2UgPSAnbm93cmFwJztcclxuXHJcblx0XHR2YXIgd2lkdGggPSBjb250YWluZXIub2Zmc2V0V2lkdGg7XHJcblx0XHR3aWR0aCA9IE1hdGgubWluKHdpZHRoLCB0aGlzLm9wdGlvbnMubWF4V2lkdGgpO1xyXG5cdFx0d2lkdGggPSBNYXRoLm1heCh3aWR0aCwgdGhpcy5vcHRpb25zLm1pbldpZHRoKTtcclxuXHJcblx0XHRzdHlsZS53aWR0aCA9ICh3aWR0aCArIDEpICsgJ3B4JztcclxuXHRcdHN0eWxlLndoaXRlU3BhY2UgPSAnJztcclxuXHJcblx0XHRzdHlsZS5oZWlnaHQgPSAnJztcclxuXHJcblx0XHR2YXIgaGVpZ2h0ID0gY29udGFpbmVyLm9mZnNldEhlaWdodCxcclxuXHRcdCAgICBtYXhIZWlnaHQgPSB0aGlzLm9wdGlvbnMubWF4SGVpZ2h0LFxyXG5cdFx0ICAgIHNjcm9sbGVkQ2xhc3MgPSAnbGVhZmxldC1wb3B1cC1zY3JvbGxlZCc7XHJcblxyXG5cdFx0aWYgKG1heEhlaWdodCAmJiBoZWlnaHQgPiBtYXhIZWlnaHQpIHtcclxuXHRcdFx0c3R5bGUuaGVpZ2h0ID0gbWF4SGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKGNvbnRhaW5lciwgc2Nyb2xsZWRDbGFzcyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRMLkRvbVV0aWwucmVtb3ZlQ2xhc3MoY29udGFpbmVyLCBzY3JvbGxlZENsYXNzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9jb250YWluZXJXaWR0aCA9IHRoaXMuX2NvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fbWFwKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciBwb3MgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2xhdGxuZyksXHJcblx0XHQgICAgYW5pbWF0ZWQgPSB0aGlzLl9hbmltYXRlZCxcclxuXHRcdCAgICBvZmZzZXQgPSBMLnBvaW50KHRoaXMub3B0aW9ucy5vZmZzZXQpO1xyXG5cclxuXHRcdGlmIChhbmltYXRlZCkge1xyXG5cdFx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5fY29udGFpbmVyLCBwb3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2NvbnRhaW5lckJvdHRvbSA9IC1vZmZzZXQueSAtIChhbmltYXRlZCA/IDAgOiBwb3MueSk7XHJcblx0XHR0aGlzLl9jb250YWluZXJMZWZ0ID0gLU1hdGgucm91bmQodGhpcy5fY29udGFpbmVyV2lkdGggLyAyKSArIG9mZnNldC54ICsgKGFuaW1hdGVkID8gMCA6IHBvcy54KTtcclxuXHJcblx0XHQvLyBib3R0b20gcG9zaXRpb24gdGhlIHBvcHVwIGluIGNhc2UgdGhlIGhlaWdodCBvZiB0aGUgcG9wdXAgY2hhbmdlcyAoaW1hZ2VzIGxvYWRpbmcgZXRjKVxyXG5cdFx0dGhpcy5fY29udGFpbmVyLnN0eWxlLmJvdHRvbSA9IHRoaXMuX2NvbnRhaW5lckJvdHRvbSArICdweCc7XHJcblx0XHR0aGlzLl9jb250YWluZXIuc3R5bGUubGVmdCA9IHRoaXMuX2NvbnRhaW5lckxlZnQgKyAncHgnO1xyXG5cdH0sXHJcblxyXG5cdF96b29tQW5pbWF0aW9uOiBmdW5jdGlvbiAob3B0KSB7XHJcblx0XHR2YXIgcG9zID0gdGhpcy5fbWFwLl9sYXRMbmdUb05ld0xheWVyUG9pbnQodGhpcy5fbGF0bG5nLCBvcHQuem9vbSwgb3B0LmNlbnRlcik7XHJcblxyXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX2NvbnRhaW5lciwgcG9zKTtcclxuXHR9LFxyXG5cclxuXHRfYWRqdXN0UGFuOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMub3B0aW9ucy5hdXRvUGFuKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXAsXHJcblx0XHQgICAgY29udGFpbmVySGVpZ2h0ID0gdGhpcy5fY29udGFpbmVyLm9mZnNldEhlaWdodCxcclxuXHRcdCAgICBjb250YWluZXJXaWR0aCA9IHRoaXMuX2NvbnRhaW5lcldpZHRoLFxyXG5cclxuXHRcdCAgICBsYXllclBvcyA9IG5ldyBMLlBvaW50KHRoaXMuX2NvbnRhaW5lckxlZnQsIC1jb250YWluZXJIZWlnaHQgLSB0aGlzLl9jb250YWluZXJCb3R0b20pO1xyXG5cclxuXHRcdGlmICh0aGlzLl9hbmltYXRlZCkge1xyXG5cdFx0XHRsYXllclBvcy5fYWRkKEwuRG9tVXRpbC5nZXRQb3NpdGlvbih0aGlzLl9jb250YWluZXIpKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgY29udGFpbmVyUG9zID0gbWFwLmxheWVyUG9pbnRUb0NvbnRhaW5lclBvaW50KGxheWVyUG9zKSxcclxuXHRcdCAgICBwYWRkaW5nID0gTC5wb2ludCh0aGlzLm9wdGlvbnMuYXV0b1BhblBhZGRpbmcpLFxyXG5cdFx0ICAgIHBhZGRpbmdUTCA9IEwucG9pbnQodGhpcy5vcHRpb25zLmF1dG9QYW5QYWRkaW5nVG9wTGVmdCB8fCBwYWRkaW5nKSxcclxuXHRcdCAgICBwYWRkaW5nQlIgPSBMLnBvaW50KHRoaXMub3B0aW9ucy5hdXRvUGFuUGFkZGluZ0JvdHRvbVJpZ2h0IHx8IHBhZGRpbmcpLFxyXG5cdFx0ICAgIHNpemUgPSBtYXAuZ2V0U2l6ZSgpLFxyXG5cdFx0ICAgIGR4ID0gMCxcclxuXHRcdCAgICBkeSA9IDA7XHJcblxyXG5cdFx0aWYgKGNvbnRhaW5lclBvcy54ICsgY29udGFpbmVyV2lkdGggKyBwYWRkaW5nQlIueCA+IHNpemUueCkgeyAvLyByaWdodFxyXG5cdFx0XHRkeCA9IGNvbnRhaW5lclBvcy54ICsgY29udGFpbmVyV2lkdGggLSBzaXplLnggKyBwYWRkaW5nQlIueDtcclxuXHRcdH1cclxuXHRcdGlmIChjb250YWluZXJQb3MueCAtIGR4IC0gcGFkZGluZ1RMLnggPCAwKSB7IC8vIGxlZnRcclxuXHRcdFx0ZHggPSBjb250YWluZXJQb3MueCAtIHBhZGRpbmdUTC54O1xyXG5cdFx0fVxyXG5cdFx0aWYgKGNvbnRhaW5lclBvcy55ICsgY29udGFpbmVySGVpZ2h0ICsgcGFkZGluZ0JSLnkgPiBzaXplLnkpIHsgLy8gYm90dG9tXHJcblx0XHRcdGR5ID0gY29udGFpbmVyUG9zLnkgKyBjb250YWluZXJIZWlnaHQgLSBzaXplLnkgKyBwYWRkaW5nQlIueTtcclxuXHRcdH1cclxuXHRcdGlmIChjb250YWluZXJQb3MueSAtIGR5IC0gcGFkZGluZ1RMLnkgPCAwKSB7IC8vIHRvcFxyXG5cdFx0XHRkeSA9IGNvbnRhaW5lclBvcy55IC0gcGFkZGluZ1RMLnk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGR4IHx8IGR5KSB7XHJcblx0XHRcdG1hcFxyXG5cdFx0XHQgICAgLmZpcmUoJ2F1dG9wYW5zdGFydCcpXHJcblx0XHRcdCAgICAucGFuQnkoW2R4LCBkeV0pO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9vbkNsb3NlQnV0dG9uQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR0aGlzLl9jbG9zZSgpO1xyXG5cdFx0TC5Eb21FdmVudC5zdG9wKGUpO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLnBvcHVwID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xyXG5cdHJldHVybiBuZXcgTC5Qb3B1cChvcHRpb25zLCBzb3VyY2UpO1xyXG59O1xyXG5cclxuXHJcbkwuTWFwLmluY2x1ZGUoe1xyXG5cdG9wZW5Qb3B1cDogZnVuY3Rpb24gKHBvcHVwLCBsYXRsbmcsIG9wdGlvbnMpIHsgLy8gKFBvcHVwKSBvciAoU3RyaW5nIHx8IEhUTUxFbGVtZW50LCBMYXRMbmdbLCBPYmplY3RdKVxyXG5cdFx0dGhpcy5jbG9zZVBvcHVwKCk7XHJcblxyXG5cdFx0aWYgKCEocG9wdXAgaW5zdGFuY2VvZiBMLlBvcHVwKSkge1xyXG5cdFx0XHR2YXIgY29udGVudCA9IHBvcHVwO1xyXG5cclxuXHRcdFx0cG9wdXAgPSBuZXcgTC5Qb3B1cChvcHRpb25zKVxyXG5cdFx0XHQgICAgLnNldExhdExuZyhsYXRsbmcpXHJcblx0XHRcdCAgICAuc2V0Q29udGVudChjb250ZW50KTtcclxuXHRcdH1cclxuXHRcdHBvcHVwLl9pc09wZW4gPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuX3BvcHVwID0gcG9wdXA7XHJcblx0XHRyZXR1cm4gdGhpcy5hZGRMYXllcihwb3B1cCk7XHJcblx0fSxcclxuXHJcblx0Y2xvc2VQb3B1cDogZnVuY3Rpb24gKHBvcHVwKSB7XHJcblx0XHRpZiAoIXBvcHVwIHx8IHBvcHVwID09PSB0aGlzLl9wb3B1cCkge1xyXG5cdFx0XHRwb3B1cCA9IHRoaXMuX3BvcHVwO1xyXG5cdFx0XHR0aGlzLl9wb3B1cCA9IG51bGw7XHJcblx0XHR9XHJcblx0XHRpZiAocG9wdXApIHtcclxuXHRcdFx0dGhpcy5yZW1vdmVMYXllcihwb3B1cCk7XHJcblx0XHRcdHBvcHVwLl9pc09wZW4gPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLypcclxuICogUG9wdXAgZXh0ZW5zaW9uIHRvIEwuTWFya2VyLCBhZGRpbmcgcG9wdXAtcmVsYXRlZCBtZXRob2RzLlxyXG4gKi9cclxuXHJcbkwuTWFya2VyLmluY2x1ZGUoe1xyXG5cdG9wZW5Qb3B1cDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX3BvcHVwICYmIHRoaXMuX21hcCAmJiAhdGhpcy5fbWFwLmhhc0xheWVyKHRoaXMuX3BvcHVwKSkge1xyXG5cdFx0XHR0aGlzLl9wb3B1cC5zZXRMYXRMbmcodGhpcy5fbGF0bG5nKTtcclxuXHRcdFx0dGhpcy5fbWFwLm9wZW5Qb3B1cCh0aGlzLl9wb3B1cCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Y2xvc2VQb3B1cDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX3BvcHVwKSB7XHJcblx0XHRcdHRoaXMuX3BvcHVwLl9jbG9zZSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0dG9nZ2xlUG9wdXA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9wb3B1cCkge1xyXG5cdFx0XHRpZiAodGhpcy5fcG9wdXAuX2lzT3Blbikge1xyXG5cdFx0XHRcdHRoaXMuY2xvc2VQb3B1cCgpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMub3BlblBvcHVwKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGJpbmRQb3B1cDogZnVuY3Rpb24gKGNvbnRlbnQsIG9wdGlvbnMpIHtcclxuXHRcdHZhciBhbmNob3IgPSBMLnBvaW50KHRoaXMub3B0aW9ucy5pY29uLm9wdGlvbnMucG9wdXBBbmNob3IgfHwgWzAsIDBdKTtcclxuXHJcblx0XHRhbmNob3IgPSBhbmNob3IuYWRkKEwuUG9wdXAucHJvdG90eXBlLm9wdGlvbnMub2Zmc2V0KTtcclxuXHJcblx0XHRpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9mZnNldCkge1xyXG5cdFx0XHRhbmNob3IgPSBhbmNob3IuYWRkKG9wdGlvbnMub2Zmc2V0KTtcclxuXHRcdH1cclxuXHJcblx0XHRvcHRpb25zID0gTC5leHRlbmQoe29mZnNldDogYW5jaG9yfSwgb3B0aW9ucyk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9wb3B1cEhhbmRsZXJzQWRkZWQpIHtcclxuXHRcdFx0dGhpc1xyXG5cdFx0XHQgICAgLm9uKCdjbGljaycsIHRoaXMudG9nZ2xlUG9wdXAsIHRoaXMpXHJcblx0XHRcdCAgICAub24oJ3JlbW92ZScsIHRoaXMuY2xvc2VQb3B1cCwgdGhpcylcclxuXHRcdFx0ICAgIC5vbignbW92ZScsIHRoaXMuX21vdmVQb3B1cCwgdGhpcyk7XHJcblx0XHRcdHRoaXMuX3BvcHVwSGFuZGxlcnNBZGRlZCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBMLlBvcHVwKSB7XHJcblx0XHRcdEwuc2V0T3B0aW9ucyhjb250ZW50LCBvcHRpb25zKTtcclxuXHRcdFx0dGhpcy5fcG9wdXAgPSBjb250ZW50O1xyXG5cdFx0XHRjb250ZW50Ll9zb3VyY2UgPSB0aGlzO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5fcG9wdXAgPSBuZXcgTC5Qb3B1cChvcHRpb25zLCB0aGlzKVxyXG5cdFx0XHRcdC5zZXRDb250ZW50KGNvbnRlbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHNldFBvcHVwQ29udGVudDogZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuXHRcdGlmICh0aGlzLl9wb3B1cCkge1xyXG5cdFx0XHR0aGlzLl9wb3B1cC5zZXRDb250ZW50KGNvbnRlbnQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0dW5iaW5kUG9wdXA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9wb3B1cCkge1xyXG5cdFx0XHR0aGlzLl9wb3B1cCA9IG51bGw7XHJcblx0XHRcdHRoaXNcclxuXHRcdFx0ICAgIC5vZmYoJ2NsaWNrJywgdGhpcy50b2dnbGVQb3B1cCwgdGhpcylcclxuXHRcdFx0ICAgIC5vZmYoJ3JlbW92ZScsIHRoaXMuY2xvc2VQb3B1cCwgdGhpcylcclxuXHRcdFx0ICAgIC5vZmYoJ21vdmUnLCB0aGlzLl9tb3ZlUG9wdXAsIHRoaXMpO1xyXG5cdFx0XHR0aGlzLl9wb3B1cEhhbmRsZXJzQWRkZWQgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGdldFBvcHVwOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fcG9wdXA7XHJcblx0fSxcclxuXHJcblx0X21vdmVQb3B1cDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHRoaXMuX3BvcHVwLnNldExhdExuZyhlLmxhdGxuZyk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkxheWVyR3JvdXAgaXMgYSBjbGFzcyB0byBjb21iaW5lIHNldmVyYWwgbGF5ZXJzIGludG8gb25lIHNvIHRoYXRcclxuICogeW91IGNhbiBtYW5pcHVsYXRlIHRoZSBncm91cCAoZS5nLiBhZGQvcmVtb3ZlIGl0KSBhcyBvbmUgbGF5ZXIuXHJcbiAqL1xyXG5cclxuTC5MYXllckdyb3VwID0gTC5DbGFzcy5leHRlbmQoe1xyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChsYXllcnMpIHtcclxuXHRcdHRoaXMuX2xheWVycyA9IHt9O1xyXG5cclxuXHRcdHZhciBpLCBsZW47XHJcblxyXG5cdFx0aWYgKGxheWVycykge1xyXG5cdFx0XHRmb3IgKGkgPSAwLCBsZW4gPSBsYXllcnMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHR0aGlzLmFkZExheWVyKGxheWVyc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRhZGRMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHR2YXIgaWQgPSB0aGlzLmdldExheWVySWQobGF5ZXIpO1xyXG5cclxuXHRcdHRoaXMuX2xheWVyc1tpZF0gPSBsYXllcjtcclxuXHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX21hcC5hZGRMYXllcihsYXllcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0dmFyIGlkID0gbGF5ZXIgaW4gdGhpcy5fbGF5ZXJzID8gbGF5ZXIgOiB0aGlzLmdldExheWVySWQobGF5ZXIpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9tYXAgJiYgdGhpcy5fbGF5ZXJzW2lkXSkge1xyXG5cdFx0XHR0aGlzLl9tYXAucmVtb3ZlTGF5ZXIodGhpcy5fbGF5ZXJzW2lkXSk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGVsZXRlIHRoaXMuX2xheWVyc1tpZF07XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0aGFzTGF5ZXI6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0aWYgKCFsYXllcikgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblx0XHRyZXR1cm4gKGxheWVyIGluIHRoaXMuX2xheWVycyB8fCB0aGlzLmdldExheWVySWQobGF5ZXIpIGluIHRoaXMuX2xheWVycyk7XHJcblx0fSxcclxuXHJcblx0Y2xlYXJMYXllcnM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuZWFjaExheWVyKHRoaXMucmVtb3ZlTGF5ZXIsIHRoaXMpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0aW52b2tlOiBmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xyXG5cdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxyXG5cdFx0ICAgIGksIGxheWVyO1xyXG5cclxuXHRcdGZvciAoaSBpbiB0aGlzLl9sYXllcnMpIHtcclxuXHRcdFx0bGF5ZXIgPSB0aGlzLl9sYXllcnNbaV07XHJcblxyXG5cdFx0XHRpZiAobGF5ZXJbbWV0aG9kTmFtZV0pIHtcclxuXHRcdFx0XHRsYXllclttZXRob2ROYW1lXS5hcHBseShsYXllciwgYXJncyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5fbWFwID0gbWFwO1xyXG5cdFx0dGhpcy5lYWNoTGF5ZXIobWFwLmFkZExheWVyLCBtYXApO1xyXG5cdH0sXHJcblxyXG5cdG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHR0aGlzLmVhY2hMYXllcihtYXAucmVtb3ZlTGF5ZXIsIG1hcCk7XHJcblx0XHR0aGlzLl9tYXAgPSBudWxsO1xyXG5cdH0sXHJcblxyXG5cdGFkZFRvOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHRtYXAuYWRkTGF5ZXIodGhpcyk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRlYWNoTGF5ZXI6IGZ1bmN0aW9uIChtZXRob2QsIGNvbnRleHQpIHtcclxuXHRcdGZvciAodmFyIGkgaW4gdGhpcy5fbGF5ZXJzKSB7XHJcblx0XHRcdG1ldGhvZC5jYWxsKGNvbnRleHQsIHRoaXMuX2xheWVyc1tpXSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRnZXRMYXllcjogZnVuY3Rpb24gKGlkKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGF5ZXJzW2lkXTtcclxuXHR9LFxyXG5cclxuXHRnZXRMYXllcnM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBsYXllcnMgPSBbXTtcclxuXHJcblx0XHRmb3IgKHZhciBpIGluIHRoaXMuX2xheWVycykge1xyXG5cdFx0XHRsYXllcnMucHVzaCh0aGlzLl9sYXllcnNbaV0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGxheWVycztcclxuXHR9LFxyXG5cclxuXHRzZXRaSW5kZXg6IGZ1bmN0aW9uICh6SW5kZXgpIHtcclxuXHRcdHJldHVybiB0aGlzLmludm9rZSgnc2V0WkluZGV4JywgekluZGV4KTtcclxuXHR9LFxyXG5cclxuXHRnZXRMYXllcklkOiBmdW5jdGlvbiAobGF5ZXIpIHtcclxuXHRcdHJldHVybiBMLnN0YW1wKGxheWVyKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5sYXllckdyb3VwID0gZnVuY3Rpb24gKGxheWVycykge1xyXG5cdHJldHVybiBuZXcgTC5MYXllckdyb3VwKGxheWVycyk7XHJcbn07XHJcblxyXG5cclxuLypcclxuICogTC5GZWF0dXJlR3JvdXAgZXh0ZW5kcyBMLkxheWVyR3JvdXAgYnkgaW50cm9kdWNpbmcgbW91c2UgZXZlbnRzIGFuZCBhZGRpdGlvbmFsIG1ldGhvZHNcclxuICogc2hhcmVkIGJldHdlZW4gYSBncm91cCBvZiBpbnRlcmFjdGl2ZSBsYXllcnMgKGxpa2UgdmVjdG9ycyBvciBtYXJrZXJzKS5cclxuICovXHJcblxyXG5MLkZlYXR1cmVHcm91cCA9IEwuTGF5ZXJHcm91cC5leHRlbmQoe1xyXG5cdGluY2x1ZGVzOiBMLk1peGluLkV2ZW50cyxcclxuXHJcblx0c3RhdGljczoge1xyXG5cdFx0RVZFTlRTOiAnY2xpY2sgZGJsY2xpY2sgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlbW92ZSBjb250ZXh0bWVudSBwb3B1cG9wZW4gcG9wdXBjbG9zZSdcclxuXHR9LFxyXG5cclxuXHRhZGRMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHRpZiAodGhpcy5oYXNMYXllcihsYXllcikpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCdvbicgaW4gbGF5ZXIpIHtcclxuXHRcdFx0bGF5ZXIub24oTC5GZWF0dXJlR3JvdXAuRVZFTlRTLCB0aGlzLl9wcm9wYWdhdGVFdmVudCwgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0TC5MYXllckdyb3VwLnByb3RvdHlwZS5hZGRMYXllci5jYWxsKHRoaXMsIGxheWVyKTtcclxuXHJcblx0XHRpZiAodGhpcy5fcG9wdXBDb250ZW50ICYmIGxheWVyLmJpbmRQb3B1cCkge1xyXG5cdFx0XHRsYXllci5iaW5kUG9wdXAodGhpcy5fcG9wdXBDb250ZW50LCB0aGlzLl9wb3B1cE9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLmZpcmUoJ2xheWVyYWRkJywge2xheWVyOiBsYXllcn0pO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUxheWVyOiBmdW5jdGlvbiAobGF5ZXIpIHtcclxuXHRcdGlmICghdGhpcy5oYXNMYXllcihsYXllcikpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblx0XHR9XHJcblx0XHRpZiAobGF5ZXIgaW4gdGhpcy5fbGF5ZXJzKSB7XHJcblx0XHRcdGxheWVyID0gdGhpcy5fbGF5ZXJzW2xheWVyXTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoJ29mZicgaW4gbGF5ZXIpIHtcclxuXHRcdFx0bGF5ZXIub2ZmKEwuRmVhdHVyZUdyb3VwLkVWRU5UUywgdGhpcy5fcHJvcGFnYXRlRXZlbnQsIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdEwuTGF5ZXJHcm91cC5wcm90b3R5cGUucmVtb3ZlTGF5ZXIuY2FsbCh0aGlzLCBsYXllcik7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BvcHVwQ29udGVudCkge1xyXG5cdFx0XHR0aGlzLmludm9rZSgndW5iaW5kUG9wdXAnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5maXJlKCdsYXllcnJlbW92ZScsIHtsYXllcjogbGF5ZXJ9KTtcclxuXHR9LFxyXG5cclxuXHRiaW5kUG9wdXA6IGZ1bmN0aW9uIChjb250ZW50LCBvcHRpb25zKSB7XHJcblx0XHR0aGlzLl9wb3B1cENvbnRlbnQgPSBjb250ZW50O1xyXG5cdFx0dGhpcy5fcG9wdXBPcHRpb25zID0gb3B0aW9ucztcclxuXHRcdHJldHVybiB0aGlzLmludm9rZSgnYmluZFBvcHVwJywgY29udGVudCwgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0b3BlblBvcHVwOiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHQvLyBvcGVuIHBvcHVwIG9uIHRoZSBmaXJzdCBsYXllclxyXG5cdFx0Zm9yICh2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XHJcblx0XHRcdHRoaXMuX2xheWVyc1tpZF0ub3BlblBvcHVwKGxhdGxuZyk7XHJcblx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0c2V0U3R5bGU6IGZ1bmN0aW9uIChzdHlsZSkge1xyXG5cdFx0cmV0dXJuIHRoaXMuaW52b2tlKCdzZXRTdHlsZScsIHN0eWxlKTtcclxuXHR9LFxyXG5cclxuXHRicmluZ1RvRnJvbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmludm9rZSgnYnJpbmdUb0Zyb250Jyk7XHJcblx0fSxcclxuXHJcblx0YnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLmludm9rZSgnYnJpbmdUb0JhY2snKTtcclxuXHR9LFxyXG5cclxuXHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBib3VuZHMgPSBuZXcgTC5MYXRMbmdCb3VuZHMoKTtcclxuXHJcblx0XHR0aGlzLmVhY2hMYXllcihmdW5jdGlvbiAobGF5ZXIpIHtcclxuXHRcdFx0Ym91bmRzLmV4dGVuZChsYXllciBpbnN0YW5jZW9mIEwuTWFya2VyID8gbGF5ZXIuZ2V0TGF0TG5nKCkgOiBsYXllci5nZXRCb3VuZHMoKSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gYm91bmRzO1xyXG5cdH0sXHJcblxyXG5cdF9wcm9wYWdhdGVFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGUgPSBMLmV4dGVuZCh7XHJcblx0XHRcdGxheWVyOiBlLnRhcmdldCxcclxuXHRcdFx0dGFyZ2V0OiB0aGlzXHJcblx0XHR9LCBlKTtcclxuXHRcdHRoaXMuZmlyZShlLnR5cGUsIGUpO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLmZlYXR1cmVHcm91cCA9IGZ1bmN0aW9uIChsYXllcnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuRmVhdHVyZUdyb3VwKGxheWVycyk7XHJcbn07XHJcblxyXG5cclxuLypcclxuICogTC5QYXRoIGlzIGEgYmFzZSBjbGFzcyBmb3IgcmVuZGVyaW5nIHZlY3RvciBwYXRocyBvbiBhIG1hcC4gSW5oZXJpdGVkIGJ5IFBvbHlsaW5lLCBDaXJjbGUsIGV0Yy5cclxuICovXHJcblxyXG5MLlBhdGggPSBMLkNsYXNzLmV4dGVuZCh7XHJcblx0aW5jbHVkZXM6IFtMLk1peGluLkV2ZW50c10sXHJcblxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdC8vIGhvdyBtdWNoIHRvIGV4dGVuZCB0aGUgY2xpcCBhcmVhIGFyb3VuZCB0aGUgbWFwIHZpZXdcclxuXHRcdC8vIChyZWxhdGl2ZSB0byBpdHMgc2l6ZSwgZS5nLiAwLjUgaXMgaGFsZiB0aGUgc2NyZWVuIGluIGVhY2ggZGlyZWN0aW9uKVxyXG5cdFx0Ly8gc2V0IGl0IHNvIHRoYXQgU1ZHIGVsZW1lbnQgZG9lc24ndCBleGNlZWQgMTI4MHB4ICh2ZWN0b3JzIGZsaWNrZXIgb24gZHJhZ2VuZCBpZiBpdCBpcylcclxuXHRcdENMSVBfUEFERElORzogKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0dmFyIG1heCA9IEwuQnJvd3Nlci5tb2JpbGUgPyAxMjgwIDogMjAwMCxcclxuXHRcdFx0ICAgIHRhcmdldCA9IChtYXggLyBNYXRoLm1heCh3aW5kb3cub3V0ZXJXaWR0aCwgd2luZG93Lm91dGVySGVpZ2h0KSAtIDEpIC8gMjtcclxuXHRcdFx0cmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKDAuNSwgdGFyZ2V0KSk7XHJcblx0XHR9KSgpXHJcblx0fSxcclxuXHJcblx0b3B0aW9uczoge1xyXG5cdFx0c3Ryb2tlOiB0cnVlLFxyXG5cdFx0Y29sb3I6ICcjMDAzM2ZmJyxcclxuXHRcdGRhc2hBcnJheTogbnVsbCxcclxuXHRcdGxpbmVDYXA6IG51bGwsXHJcblx0XHRsaW5lSm9pbjogbnVsbCxcclxuXHRcdHdlaWdodDogNSxcclxuXHRcdG9wYWNpdHk6IDAuNSxcclxuXHJcblx0XHRmaWxsOiBmYWxzZSxcclxuXHRcdGZpbGxDb2xvcjogbnVsbCwgLy9zYW1lIGFzIGNvbG9yIGJ5IGRlZmF1bHRcclxuXHRcdGZpbGxPcGFjaXR5OiAwLjIsXHJcblxyXG5cdFx0Y2xpY2thYmxlOiB0cnVlXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5fbWFwID0gbWFwO1xyXG5cclxuXHRcdGlmICghdGhpcy5fY29udGFpbmVyKSB7XHJcblx0XHRcdHRoaXMuX2luaXRFbGVtZW50cygpO1xyXG5cdFx0XHR0aGlzLl9pbml0RXZlbnRzKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5wcm9qZWN0TGF0bG5ncygpO1xyXG5cdFx0dGhpcy5fdXBkYXRlUGF0aCgpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9jb250YWluZXIpIHtcclxuXHRcdFx0dGhpcy5fbWFwLl9wYXRoUm9vdC5hcHBlbmRDaGlsZCh0aGlzLl9jb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZmlyZSgnYWRkJyk7XHJcblxyXG5cdFx0bWFwLm9uKHtcclxuXHRcdFx0J3ZpZXdyZXNldCc6IHRoaXMucHJvamVjdExhdGxuZ3MsXHJcblx0XHRcdCdtb3ZlZW5kJzogdGhpcy5fdXBkYXRlUGF0aFxyXG5cdFx0fSwgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0YWRkVG86IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdG1hcC5hZGRMYXllcih0aGlzKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdG9uUmVtb3ZlOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHRtYXAuX3BhdGhSb290LnJlbW92ZUNoaWxkKHRoaXMuX2NvbnRhaW5lcik7XHJcblxyXG5cdFx0Ly8gTmVlZCB0byBmaXJlIHJlbW92ZSBldmVudCBiZWZvcmUgd2Ugc2V0IF9tYXAgdG8gbnVsbCBhcyB0aGUgZXZlbnQgaG9va3MgbWlnaHQgbmVlZCB0aGUgb2JqZWN0XHJcblx0XHR0aGlzLmZpcmUoJ3JlbW92ZScpO1xyXG5cdFx0dGhpcy5fbWFwID0gbnVsbDtcclxuXHJcblx0XHRpZiAoTC5Ccm93c2VyLnZtbCkge1xyXG5cdFx0XHR0aGlzLl9jb250YWluZXIgPSBudWxsO1xyXG5cdFx0XHR0aGlzLl9zdHJva2UgPSBudWxsO1xyXG5cdFx0XHR0aGlzLl9maWxsID0gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRtYXAub2ZmKHtcclxuXHRcdFx0J3ZpZXdyZXNldCc6IHRoaXMucHJvamVjdExhdGxuZ3MsXHJcblx0XHRcdCdtb3ZlZW5kJzogdGhpcy5fdXBkYXRlUGF0aFxyXG5cdFx0fSwgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0cHJvamVjdExhdGxuZ3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vIGRvIGFsbCBwcm9qZWN0aW9uIHN0dWZmIGhlcmVcclxuXHR9LFxyXG5cclxuXHRzZXRTdHlsZTogZnVuY3Rpb24gKHN0eWxlKSB7XHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgc3R5bGUpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9jb250YWluZXIpIHtcclxuXHRcdFx0dGhpcy5fdXBkYXRlU3R5bGUoKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRyZWRyYXc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9tYXApIHtcclxuXHRcdFx0dGhpcy5wcm9qZWN0TGF0bG5ncygpO1xyXG5cdFx0XHR0aGlzLl91cGRhdGVQYXRoKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5NYXAuaW5jbHVkZSh7XHJcblx0X3VwZGF0ZVBhdGhWaWV3cG9ydDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHAgPSBMLlBhdGguQ0xJUF9QQURESU5HLFxyXG5cdFx0ICAgIHNpemUgPSB0aGlzLmdldFNpemUoKSxcclxuXHRcdCAgICBwYW5lUG9zID0gTC5Eb21VdGlsLmdldFBvc2l0aW9uKHRoaXMuX21hcFBhbmUpLFxyXG5cdFx0ICAgIG1pbiA9IHBhbmVQb3MubXVsdGlwbHlCeSgtMSkuX3N1YnRyYWN0KHNpemUubXVsdGlwbHlCeShwKS5fcm91bmQoKSksXHJcblx0XHQgICAgbWF4ID0gbWluLmFkZChzaXplLm11bHRpcGx5QnkoMSArIHAgKiAyKS5fcm91bmQoKSk7XHJcblxyXG5cdFx0dGhpcy5fcGF0aFZpZXdwb3J0ID0gbmV3IEwuQm91bmRzKG1pbiwgbWF4KTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEV4dGVuZHMgTC5QYXRoIHdpdGggU1ZHLXNwZWNpZmljIHJlbmRlcmluZyBjb2RlLlxyXG4gKi9cclxuXHJcbkwuUGF0aC5TVkdfTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xyXG5cclxuTC5Ccm93c2VyLnN2ZyA9ICEhKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyAmJiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoTC5QYXRoLlNWR19OUywgJ3N2ZycpLmNyZWF0ZVNWR1JlY3QpO1xyXG5cclxuTC5QYXRoID0gTC5QYXRoLmV4dGVuZCh7XHJcblx0c3RhdGljczoge1xyXG5cdFx0U1ZHOiBMLkJyb3dzZXIuc3ZnXHJcblx0fSxcclxuXHJcblx0YnJpbmdUb0Zyb250OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcm9vdCA9IHRoaXMuX21hcC5fcGF0aFJvb3QsXHJcblx0XHQgICAgcGF0aCA9IHRoaXMuX2NvbnRhaW5lcjtcclxuXHJcblx0XHRpZiAocGF0aCAmJiByb290Lmxhc3RDaGlsZCAhPT0gcGF0aCkge1xyXG5cdFx0XHRyb290LmFwcGVuZENoaWxkKHBhdGgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0YnJpbmdUb0JhY2s6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciByb290ID0gdGhpcy5fbWFwLl9wYXRoUm9vdCxcclxuXHRcdCAgICBwYXRoID0gdGhpcy5fY29udGFpbmVyLFxyXG5cdFx0ICAgIGZpcnN0ID0gcm9vdC5maXJzdENoaWxkO1xyXG5cclxuXHRcdGlmIChwYXRoICYmIGZpcnN0ICE9PSBwYXRoKSB7XHJcblx0XHRcdHJvb3QuaW5zZXJ0QmVmb3JlKHBhdGgsIGZpcnN0KTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGdldFBhdGhTdHJpbmc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vIGZvcm0gcGF0aCBzdHJpbmcgaGVyZVxyXG5cdH0sXHJcblxyXG5cdF9jcmVhdGVFbGVtZW50OiBmdW5jdGlvbiAobmFtZSkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhMLlBhdGguU1ZHX05TLCBuYW1lKTtcclxuXHR9LFxyXG5cclxuXHRfaW5pdEVsZW1lbnRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9tYXAuX2luaXRQYXRoUm9vdCgpO1xyXG5cdFx0dGhpcy5faW5pdFBhdGgoKTtcclxuXHRcdHRoaXMuX2luaXRTdHlsZSgpO1xyXG5cdH0sXHJcblxyXG5cdF9pbml0UGF0aDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fY29udGFpbmVyID0gdGhpcy5fY3JlYXRlRWxlbWVudCgnZycpO1xyXG5cclxuXHRcdHRoaXMuX3BhdGggPSB0aGlzLl9jcmVhdGVFbGVtZW50KCdwYXRoJyk7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jbGFzc05hbWUpIHtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3BhdGgsIHRoaXMub3B0aW9ucy5jbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9wYXRoKTtcclxuXHR9LFxyXG5cclxuXHRfaW5pdFN0eWxlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnN0cm9rZSkge1xyXG5cdFx0XHR0aGlzLl9wYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLWxpbmVqb2luJywgJ3JvdW5kJyk7XHJcblx0XHRcdHRoaXMuX3BhdGguc2V0QXR0cmlidXRlKCdzdHJva2UtbGluZWNhcCcsICdyb3VuZCcpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5maWxsKSB7XHJcblx0XHRcdHRoaXMuX3BhdGguc2V0QXR0cmlidXRlKCdmaWxsLXJ1bGUnLCAnZXZlbm9kZCcpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5wb2ludGVyRXZlbnRzKSB7XHJcblx0XHRcdHRoaXMuX3BhdGguc2V0QXR0cmlidXRlKCdwb2ludGVyLWV2ZW50cycsIHRoaXMub3B0aW9ucy5wb2ludGVyRXZlbnRzKTtcclxuXHRcdH1cclxuXHRcdGlmICghdGhpcy5vcHRpb25zLmNsaWNrYWJsZSAmJiAhdGhpcy5vcHRpb25zLnBvaW50ZXJFdmVudHMpIHtcclxuXHRcdFx0dGhpcy5fcGF0aC5zZXRBdHRyaWJ1dGUoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuX3VwZGF0ZVN0eWxlKCk7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZVN0eWxlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5vcHRpb25zLnN0cm9rZSkge1xyXG5cdFx0XHR0aGlzLl9wYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlJywgdGhpcy5vcHRpb25zLmNvbG9yKTtcclxuXHRcdFx0dGhpcy5fcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1vcGFjaXR5JywgdGhpcy5vcHRpb25zLm9wYWNpdHkpO1xyXG5cdFx0XHR0aGlzLl9wYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgdGhpcy5vcHRpb25zLndlaWdodCk7XHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMuZGFzaEFycmF5KSB7XHJcblx0XHRcdFx0dGhpcy5fcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1kYXNoYXJyYXknLCB0aGlzLm9wdGlvbnMuZGFzaEFycmF5KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aGlzLl9wYXRoLnJlbW92ZUF0dHJpYnV0ZSgnc3Ryb2tlLWRhc2hhcnJheScpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLm9wdGlvbnMubGluZUNhcCkge1xyXG5cdFx0XHRcdHRoaXMuX3BhdGguc2V0QXR0cmlidXRlKCdzdHJva2UtbGluZWNhcCcsIHRoaXMub3B0aW9ucy5saW5lQ2FwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLmxpbmVKb2luKSB7XHJcblx0XHRcdFx0dGhpcy5fcGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS1saW5lam9pbicsIHRoaXMub3B0aW9ucy5saW5lSm9pbik7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3BhdGguc2V0QXR0cmlidXRlKCdzdHJva2UnLCAnbm9uZScpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5maWxsKSB7XHJcblx0XHRcdHRoaXMuX3BhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgdGhpcy5vcHRpb25zLmZpbGxDb2xvciB8fCB0aGlzLm9wdGlvbnMuY29sb3IpO1xyXG5cdFx0XHR0aGlzLl9wYXRoLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5JywgdGhpcy5vcHRpb25zLmZpbGxPcGFjaXR5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3BhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlUGF0aDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHN0ciA9IHRoaXMuZ2V0UGF0aFN0cmluZygpO1xyXG5cdFx0aWYgKCFzdHIpIHtcclxuXHRcdFx0Ly8gZml4IHdlYmtpdCBlbXB0eSBzdHJpbmcgcGFyc2luZyBidWdcclxuXHRcdFx0c3RyID0gJ00wIDAnO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5fcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBzdHIpO1xyXG5cdH0sXHJcblxyXG5cdC8vIFRPRE8gcmVtb3ZlIGR1cGxpY2F0aW9uIHdpdGggTC5NYXBcclxuXHRfaW5pdEV2ZW50czogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jbGlja2FibGUpIHtcclxuXHRcdFx0aWYgKEwuQnJvd3Nlci5zdmcgfHwgIUwuQnJvd3Nlci52bWwpIHtcclxuXHRcdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fcGF0aCwgJ2xlYWZsZXQtY2xpY2thYmxlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdEwuRG9tRXZlbnQub24odGhpcy5fY29udGFpbmVyLCAnY2xpY2snLCB0aGlzLl9vbk1vdXNlQ2xpY2ssIHRoaXMpO1xyXG5cclxuXHRcdFx0dmFyIGV2ZW50cyA9IFsnZGJsY2xpY2snLCAnbW91c2Vkb3duJywgJ21vdXNlb3ZlcicsXHJcblx0XHRcdCAgICAgICAgICAgICAgJ21vdXNlb3V0JywgJ21vdXNlbW92ZScsICdjb250ZXh0bWVudSddO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdEwuRG9tRXZlbnQub24odGhpcy5fY29udGFpbmVyLCBldmVudHNbaV0sIHRoaXMuX2ZpcmVNb3VzZUV2ZW50LCB0aGlzKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9vbk1vdXNlQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAodGhpcy5fbWFwLmRyYWdnaW5nICYmIHRoaXMuX21hcC5kcmFnZ2luZy5tb3ZlZCgpKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHRoaXMuX2ZpcmVNb3VzZUV2ZW50KGUpO1xyXG5cdH0sXHJcblxyXG5cdF9maXJlTW91c2VFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICghdGhpcy5fbWFwIHx8ICF0aGlzLmhhc0V2ZW50TGlzdGVuZXJzKGUudHlwZSkpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICBjb250YWluZXJQb2ludCA9IG1hcC5tb3VzZUV2ZW50VG9Db250YWluZXJQb2ludChlKSxcclxuXHRcdCAgICBsYXllclBvaW50ID0gbWFwLmNvbnRhaW5lclBvaW50VG9MYXllclBvaW50KGNvbnRhaW5lclBvaW50KSxcclxuXHRcdCAgICBsYXRsbmcgPSBtYXAubGF5ZXJQb2ludFRvTGF0TG5nKGxheWVyUG9pbnQpO1xyXG5cclxuXHRcdHRoaXMuZmlyZShlLnR5cGUsIHtcclxuXHRcdFx0bGF0bG5nOiBsYXRsbmcsXHJcblx0XHRcdGxheWVyUG9pbnQ6IGxheWVyUG9pbnQsXHJcblx0XHRcdGNvbnRhaW5lclBvaW50OiBjb250YWluZXJQb2ludCxcclxuXHRcdFx0b3JpZ2luYWxFdmVudDogZVxyXG5cdFx0fSk7XHJcblxyXG5cdFx0aWYgKGUudHlwZSA9PT0gJ2NvbnRleHRtZW51Jykge1xyXG5cdFx0XHRMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGUudHlwZSAhPT0gJ21vdXNlbW92ZScpIHtcclxuXHRcdFx0TC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24oZSk7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbkwuTWFwLmluY2x1ZGUoe1xyXG5cdF9pbml0UGF0aFJvb3Q6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fcGF0aFJvb3QpIHtcclxuXHRcdFx0dGhpcy5fcGF0aFJvb3QgPSBMLlBhdGgucHJvdG90eXBlLl9jcmVhdGVFbGVtZW50KCdzdmcnKTtcclxuXHRcdFx0dGhpcy5fcGFuZXMub3ZlcmxheVBhbmUuYXBwZW5kQ2hpbGQodGhpcy5fcGF0aFJvb3QpO1xyXG5cclxuXHRcdFx0aWYgKHRoaXMub3B0aW9ucy56b29tQW5pbWF0aW9uICYmIEwuQnJvd3Nlci5hbnkzZCkge1xyXG5cdFx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9wYXRoUm9vdCwgJ2xlYWZsZXQtem9vbS1hbmltYXRlZCcpO1xyXG5cclxuXHRcdFx0XHR0aGlzLm9uKHtcclxuXHRcdFx0XHRcdCd6b29tYW5pbSc6IHRoaXMuX2FuaW1hdGVQYXRoWm9vbSxcclxuXHRcdFx0XHRcdCd6b29tZW5kJzogdGhpcy5fZW5kUGF0aFpvb21cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fcGF0aFJvb3QsICdsZWFmbGV0LXpvb20taGlkZScpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLm9uKCdtb3ZlZW5kJywgdGhpcy5fdXBkYXRlU3ZnVmlld3BvcnQpO1xyXG5cdFx0XHR0aGlzLl91cGRhdGVTdmdWaWV3cG9ydCgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9hbmltYXRlUGF0aFpvb206IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgc2NhbGUgPSB0aGlzLmdldFpvb21TY2FsZShlLnpvb20pLFxyXG5cdFx0ICAgIG9mZnNldCA9IHRoaXMuX2dldENlbnRlck9mZnNldChlLmNlbnRlcikuX211bHRpcGx5QnkoLXNjYWxlKS5fYWRkKHRoaXMuX3BhdGhWaWV3cG9ydC5taW4pO1xyXG5cclxuXHRcdHRoaXMuX3BhdGhSb290LnN0eWxlW0wuRG9tVXRpbC5UUkFOU0ZPUk1dID1cclxuXHRcdCAgICAgICAgTC5Eb21VdGlsLmdldFRyYW5zbGF0ZVN0cmluZyhvZmZzZXQpICsgJyBzY2FsZSgnICsgc2NhbGUgKyAnKSAnO1xyXG5cclxuXHRcdHRoaXMuX3BhdGhab29taW5nID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRfZW5kUGF0aFpvb206IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX3BhdGhab29taW5nID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZVN2Z1ZpZXdwb3J0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3BhdGhab29taW5nKSB7XHJcblx0XHRcdC8vIERvIG5vdCB1cGRhdGUgU1ZHcyB3aGlsZSBhIHpvb20gYW5pbWF0aW9uIGlzIGdvaW5nIG9uIG90aGVyd2lzZSB0aGUgYW5pbWF0aW9uIHdpbGwgYnJlYWsuXHJcblx0XHRcdC8vIFdoZW4gdGhlIHpvb20gYW5pbWF0aW9uIGVuZHMgd2Ugd2lsbCBiZSB1cGRhdGVkIGFnYWluIGFueXdheVxyXG5cdFx0XHQvLyBUaGlzIGZpeGVzIHRoZSBjYXNlIHdoZXJlIHlvdSBkbyBhIG1vbWVudHVtIG1vdmUgYW5kIHpvb20gd2hpbGUgdGhlIG1vdmUgaXMgc3RpbGwgb25nb2luZy5cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3VwZGF0ZVBhdGhWaWV3cG9ydCgpO1xyXG5cclxuXHRcdHZhciB2cCA9IHRoaXMuX3BhdGhWaWV3cG9ydCxcclxuXHRcdCAgICBtaW4gPSB2cC5taW4sXHJcblx0XHQgICAgbWF4ID0gdnAubWF4LFxyXG5cdFx0ICAgIHdpZHRoID0gbWF4LnggLSBtaW4ueCxcclxuXHRcdCAgICBoZWlnaHQgPSBtYXgueSAtIG1pbi55LFxyXG5cdFx0ICAgIHJvb3QgPSB0aGlzLl9wYXRoUm9vdCxcclxuXHRcdCAgICBwYW5lID0gdGhpcy5fcGFuZXMub3ZlcmxheVBhbmU7XHJcblxyXG5cdFx0Ly8gSGFjayB0byBtYWtlIGZsaWNrZXIgb24gZHJhZyBlbmQgb24gbW9iaWxlIHdlYmtpdCBsZXNzIGlycml0YXRpbmdcclxuXHRcdGlmIChMLkJyb3dzZXIubW9iaWxlV2Via2l0KSB7XHJcblx0XHRcdHBhbmUucmVtb3ZlQ2hpbGQocm9vdCk7XHJcblx0XHR9XHJcblxyXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHJvb3QsIG1pbik7XHJcblx0XHRyb290LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCk7XHJcblx0XHRyb290LnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaGVpZ2h0KTtcclxuXHRcdHJvb3Quc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgW21pbi54LCBtaW4ueSwgd2lkdGgsIGhlaWdodF0uam9pbignICcpKTtcclxuXHJcblx0XHRpZiAoTC5Ccm93c2VyLm1vYmlsZVdlYmtpdCkge1xyXG5cdFx0XHRwYW5lLmFwcGVuZENoaWxkKHJvb3QpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLypcclxuICogUG9wdXAgZXh0ZW5zaW9uIHRvIEwuUGF0aCAocG9seWxpbmVzLCBwb2x5Z29ucywgY2lyY2xlcyksIGFkZGluZyBwb3B1cC1yZWxhdGVkIG1ldGhvZHMuXHJcbiAqL1xyXG5cclxuTC5QYXRoLmluY2x1ZGUoe1xyXG5cclxuXHRiaW5kUG9wdXA6IGZ1bmN0aW9uIChjb250ZW50LCBvcHRpb25zKSB7XHJcblxyXG5cdFx0aWYgKGNvbnRlbnQgaW5zdGFuY2VvZiBMLlBvcHVwKSB7XHJcblx0XHRcdHRoaXMuX3BvcHVwID0gY29udGVudDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGlmICghdGhpcy5fcG9wdXAgfHwgb3B0aW9ucykge1xyXG5cdFx0XHRcdHRoaXMuX3BvcHVwID0gbmV3IEwuUG9wdXAob3B0aW9ucywgdGhpcyk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5fcG9wdXAuc2V0Q29udGVudChjb250ZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuX3BvcHVwSGFuZGxlcnNBZGRlZCkge1xyXG5cdFx0XHR0aGlzXHJcblx0XHRcdCAgICAub24oJ2NsaWNrJywgdGhpcy5fb3BlblBvcHVwLCB0aGlzKVxyXG5cdFx0XHQgICAgLm9uKCdyZW1vdmUnLCB0aGlzLmNsb3NlUG9wdXAsIHRoaXMpO1xyXG5cclxuXHRcdFx0dGhpcy5fcG9wdXBIYW5kbGVyc0FkZGVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHR1bmJpbmRQb3B1cDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX3BvcHVwKSB7XHJcblx0XHRcdHRoaXMuX3BvcHVwID0gbnVsbDtcclxuXHRcdFx0dGhpc1xyXG5cdFx0XHQgICAgLm9mZignY2xpY2snLCB0aGlzLl9vcGVuUG9wdXApXHJcblx0XHRcdCAgICAub2ZmKCdyZW1vdmUnLCB0aGlzLmNsb3NlUG9wdXApO1xyXG5cclxuXHRcdFx0dGhpcy5fcG9wdXBIYW5kbGVyc0FkZGVkID0gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRvcGVuUG9wdXA6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHJcblx0XHRpZiAodGhpcy5fcG9wdXApIHtcclxuXHRcdFx0Ly8gb3BlbiB0aGUgcG9wdXAgZnJvbSBvbmUgb2YgdGhlIHBhdGgncyBwb2ludHMgaWYgbm90IHNwZWNpZmllZFxyXG5cdFx0XHRsYXRsbmcgPSBsYXRsbmcgfHwgdGhpcy5fbGF0bG5nIHx8XHJcblx0XHRcdCAgICAgICAgIHRoaXMuX2xhdGxuZ3NbTWF0aC5mbG9vcih0aGlzLl9sYXRsbmdzLmxlbmd0aCAvIDIpXTtcclxuXHJcblx0XHRcdHRoaXMuX29wZW5Qb3B1cCh7bGF0bG5nOiBsYXRsbmd9KTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRjbG9zZVBvcHVwOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5fcG9wdXApIHtcclxuXHRcdFx0dGhpcy5fcG9wdXAuX2Nsb3NlKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfb3BlblBvcHVwOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dGhpcy5fcG9wdXAuc2V0TGF0TG5nKGUubGF0bG5nKTtcclxuXHRcdHRoaXMuX21hcC5vcGVuUG9wdXAodGhpcy5fcG9wdXApO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLypcclxuICogVmVjdG9yIHJlbmRlcmluZyBmb3IgSUU2LTggdGhyb3VnaCBWTUwuXHJcbiAqIFRoYW5rcyB0byBEbWl0cnkgQmFyYW5vdnNreSBhbmQgaGlzIFJhcGhhZWwgbGlicmFyeSBmb3IgaW5zcGlyYXRpb24hXHJcbiAqL1xyXG5cclxuTC5Ccm93c2VyLnZtbCA9ICFMLkJyb3dzZXIuc3ZnICYmIChmdW5jdGlvbiAoKSB7XHJcblx0dHJ5IHtcclxuXHRcdHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdGRpdi5pbm5lckhUTUwgPSAnPHY6c2hhcGUgYWRqPVwiMVwiLz4nO1xyXG5cclxuXHRcdHZhciBzaGFwZSA9IGRpdi5maXJzdENoaWxkO1xyXG5cdFx0c2hhcGUuc3R5bGUuYmVoYXZpb3IgPSAndXJsKCNkZWZhdWx0I1ZNTCknO1xyXG5cclxuXHRcdHJldHVybiBzaGFwZSAmJiAodHlwZW9mIHNoYXBlLmFkaiA9PT0gJ29iamVjdCcpO1xyXG5cclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG59KCkpO1xyXG5cclxuTC5QYXRoID0gTC5Ccm93c2VyLnN2ZyB8fCAhTC5Ccm93c2VyLnZtbCA/IEwuUGF0aCA6IEwuUGF0aC5leHRlbmQoe1xyXG5cdHN0YXRpY3M6IHtcclxuXHRcdFZNTDogdHJ1ZSxcclxuXHRcdENMSVBfUEFERElORzogMC4wMlxyXG5cdH0sXHJcblxyXG5cdF9jcmVhdGVFbGVtZW50OiAoZnVuY3Rpb24gKCkge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0ZG9jdW1lbnQubmFtZXNwYWNlcy5hZGQoJ2x2bWwnLCAndXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTp2bWwnKTtcclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJzxsdm1sOicgKyBuYW1lICsgJyBjbGFzcz1cImx2bWxcIj4nKTtcclxuXHRcdFx0fTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChuYW1lKSB7XHJcblx0XHRcdFx0cmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdFx0ICAgICAgICAnPCcgKyBuYW1lICsgJyB4bWxucz1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC5jb206dm1sXCIgY2xhc3M9XCJsdm1sXCI+Jyk7XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0fSgpKSxcclxuXHJcblx0X2luaXRQYXRoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgY29udGFpbmVyID0gdGhpcy5fY29udGFpbmVyID0gdGhpcy5fY3JlYXRlRWxlbWVudCgnc2hhcGUnKTtcclxuXHJcblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MoY29udGFpbmVyLCAnbGVhZmxldC12bWwtc2hhcGUnICtcclxuXHRcdFx0KHRoaXMub3B0aW9ucy5jbGFzc05hbWUgPyAnICcgKyB0aGlzLm9wdGlvbnMuY2xhc3NOYW1lIDogJycpKTtcclxuXHJcblx0XHRpZiAodGhpcy5vcHRpb25zLmNsaWNrYWJsZSkge1xyXG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MoY29udGFpbmVyLCAnbGVhZmxldC1jbGlja2FibGUnKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb250YWluZXIuY29vcmRzaXplID0gJzEgMSc7XHJcblxyXG5cdFx0dGhpcy5fcGF0aCA9IHRoaXMuX2NyZWF0ZUVsZW1lbnQoJ3BhdGgnKTtcclxuXHRcdGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl9wYXRoKTtcclxuXHJcblx0XHR0aGlzLl9tYXAuX3BhdGhSb290LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblx0fSxcclxuXHJcblx0X2luaXRTdHlsZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fdXBkYXRlU3R5bGUoKTtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlU3R5bGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBzdHJva2UgPSB0aGlzLl9zdHJva2UsXHJcblx0XHQgICAgZmlsbCA9IHRoaXMuX2ZpbGwsXHJcblx0XHQgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyxcclxuXHRcdCAgICBjb250YWluZXIgPSB0aGlzLl9jb250YWluZXI7XHJcblxyXG5cdFx0Y29udGFpbmVyLnN0cm9rZWQgPSBvcHRpb25zLnN0cm9rZTtcclxuXHRcdGNvbnRhaW5lci5maWxsZWQgPSBvcHRpb25zLmZpbGw7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuc3Ryb2tlKSB7XHJcblx0XHRcdGlmICghc3Ryb2tlKSB7XHJcblx0XHRcdFx0c3Ryb2tlID0gdGhpcy5fc3Ryb2tlID0gdGhpcy5fY3JlYXRlRWxlbWVudCgnc3Ryb2tlJyk7XHJcblx0XHRcdFx0c3Ryb2tlLmVuZGNhcCA9ICdyb3VuZCc7XHJcblx0XHRcdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKHN0cm9rZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3Ryb2tlLndlaWdodCA9IG9wdGlvbnMud2VpZ2h0ICsgJ3B4JztcclxuXHRcdFx0c3Ryb2tlLmNvbG9yID0gb3B0aW9ucy5jb2xvcjtcclxuXHRcdFx0c3Ryb2tlLm9wYWNpdHkgPSBvcHRpb25zLm9wYWNpdHk7XHJcblxyXG5cdFx0XHRpZiAob3B0aW9ucy5kYXNoQXJyYXkpIHtcclxuXHRcdFx0XHRzdHJva2UuZGFzaFN0eWxlID0gTC5VdGlsLmlzQXJyYXkob3B0aW9ucy5kYXNoQXJyYXkpID9cclxuXHRcdFx0XHQgICAgb3B0aW9ucy5kYXNoQXJyYXkuam9pbignICcpIDpcclxuXHRcdFx0XHQgICAgb3B0aW9ucy5kYXNoQXJyYXkucmVwbGFjZSgvKCAqLCAqKS9nLCAnICcpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHN0cm9rZS5kYXNoU3R5bGUgPSAnJztcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAob3B0aW9ucy5saW5lQ2FwKSB7XHJcblx0XHRcdFx0c3Ryb2tlLmVuZGNhcCA9IG9wdGlvbnMubGluZUNhcC5yZXBsYWNlKCdidXR0JywgJ2ZsYXQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAob3B0aW9ucy5saW5lSm9pbikge1xyXG5cdFx0XHRcdHN0cm9rZS5qb2luc3R5bGUgPSBvcHRpb25zLmxpbmVKb2luO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIGlmIChzdHJva2UpIHtcclxuXHRcdFx0Y29udGFpbmVyLnJlbW92ZUNoaWxkKHN0cm9rZSk7XHJcblx0XHRcdHRoaXMuX3N0cm9rZSA9IG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuZmlsbCkge1xyXG5cdFx0XHRpZiAoIWZpbGwpIHtcclxuXHRcdFx0XHRmaWxsID0gdGhpcy5fZmlsbCA9IHRoaXMuX2NyZWF0ZUVsZW1lbnQoJ2ZpbGwnKTtcclxuXHRcdFx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQoZmlsbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZmlsbC5jb2xvciA9IG9wdGlvbnMuZmlsbENvbG9yIHx8IG9wdGlvbnMuY29sb3I7XHJcblx0XHRcdGZpbGwub3BhY2l0eSA9IG9wdGlvbnMuZmlsbE9wYWNpdHk7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChmaWxsKSB7XHJcblx0XHRcdGNvbnRhaW5lci5yZW1vdmVDaGlsZChmaWxsKTtcclxuXHRcdFx0dGhpcy5fZmlsbCA9IG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZVBhdGg6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBzdHlsZSA9IHRoaXMuX2NvbnRhaW5lci5zdHlsZTtcclxuXHJcblx0XHRzdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0dGhpcy5fcGF0aC52ID0gdGhpcy5nZXRQYXRoU3RyaW5nKCkgKyAnICc7IC8vIHRoZSBzcGFjZSBmaXhlcyBJRSBlbXB0eSBwYXRoIHN0cmluZyBidWdcclxuXHRcdHN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5NYXAuaW5jbHVkZShMLkJyb3dzZXIuc3ZnIHx8ICFMLkJyb3dzZXIudm1sID8ge30gOiB7XHJcblx0X2luaXRQYXRoUm9vdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX3BhdGhSb290KSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciByb290ID0gdGhpcy5fcGF0aFJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHRcdHJvb3QuY2xhc3NOYW1lID0gJ2xlYWZsZXQtdm1sLWNvbnRhaW5lcic7XHJcblx0XHR0aGlzLl9wYW5lcy5vdmVybGF5UGFuZS5hcHBlbmRDaGlsZChyb290KTtcclxuXHJcblx0XHR0aGlzLm9uKCdtb3ZlZW5kJywgdGhpcy5fdXBkYXRlUGF0aFZpZXdwb3J0KTtcclxuXHRcdHRoaXMuX3VwZGF0ZVBhdGhWaWV3cG9ydCgpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLypcclxuICogVmVjdG9yIHJlbmRlcmluZyBmb3IgYWxsIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBjYW52YXMuXHJcbiAqL1xyXG5cclxuTC5Ccm93c2VyLmNhbnZhcyA9IChmdW5jdGlvbiAoKSB7XHJcblx0cmV0dXJuICEhZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJykuZ2V0Q29udGV4dDtcclxufSgpKTtcclxuXHJcbkwuUGF0aCA9IChMLlBhdGguU1ZHICYmICF3aW5kb3cuTF9QUkVGRVJfQ0FOVkFTKSB8fCAhTC5Ccm93c2VyLmNhbnZhcyA/IEwuUGF0aCA6IEwuUGF0aC5leHRlbmQoe1xyXG5cdHN0YXRpY3M6IHtcclxuXHRcdC8vQ0xJUF9QQURESU5HOiAwLjAyLCAvLyBub3Qgc3VyZSBpZiB0aGVyZSdzIGEgbmVlZCB0byBzZXQgaXQgdG8gYSBzbWFsbCB2YWx1ZVxyXG5cdFx0Q0FOVkFTOiB0cnVlLFxyXG5cdFx0U1ZHOiBmYWxzZVxyXG5cdH0sXHJcblxyXG5cdHJlZHJhdzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX21hcCkge1xyXG5cdFx0XHR0aGlzLnByb2plY3RMYXRsbmdzKCk7XHJcblx0XHRcdHRoaXMuX3JlcXVlc3RVcGRhdGUoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHNldFN0eWxlOiBmdW5jdGlvbiAoc3R5bGUpIHtcclxuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBzdHlsZSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX21hcCkge1xyXG5cdFx0XHR0aGlzLl91cGRhdGVTdHlsZSgpO1xyXG5cdFx0XHR0aGlzLl9yZXF1ZXN0VXBkYXRlKCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0bWFwXHJcblx0XHQgICAgLm9mZigndmlld3Jlc2V0JywgdGhpcy5wcm9qZWN0TGF0bG5ncywgdGhpcylcclxuXHRcdCAgICAub2ZmKCdtb3ZlZW5kJywgdGhpcy5fdXBkYXRlUGF0aCwgdGhpcyk7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jbGlja2FibGUpIHtcclxuXHRcdFx0dGhpcy5fbWFwLm9mZignY2xpY2snLCB0aGlzLl9vbkNsaWNrLCB0aGlzKTtcclxuXHRcdFx0dGhpcy5fbWFwLm9mZignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUsIHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3JlcXVlc3RVcGRhdGUoKTtcclxuXHJcblx0XHR0aGlzLmZpcmUoJ3JlbW92ZScpO1xyXG5cdFx0dGhpcy5fbWFwID0gbnVsbDtcclxuXHR9LFxyXG5cclxuXHRfcmVxdWVzdFVwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX21hcCAmJiAhTC5QYXRoLl91cGRhdGVSZXF1ZXN0KSB7XHJcblx0XHRcdEwuUGF0aC5fdXBkYXRlUmVxdWVzdCA9IEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKHRoaXMuX2ZpcmVNYXBNb3ZlRW5kLCB0aGlzLl9tYXApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9maXJlTWFwTW92ZUVuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5QYXRoLl91cGRhdGVSZXF1ZXN0ID0gbnVsbDtcclxuXHRcdHRoaXMuZmlyZSgnbW92ZWVuZCcpO1xyXG5cdH0sXHJcblxyXG5cdF9pbml0RWxlbWVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX21hcC5faW5pdFBhdGhSb290KCk7XHJcblx0XHR0aGlzLl9jdHggPSB0aGlzLl9tYXAuX2NhbnZhc0N0eDtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlU3R5bGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG5cclxuXHRcdGlmIChvcHRpb25zLnN0cm9rZSkge1xyXG5cdFx0XHR0aGlzLl9jdHgubGluZVdpZHRoID0gb3B0aW9ucy53ZWlnaHQ7XHJcblx0XHRcdHRoaXMuX2N0eC5zdHJva2VTdHlsZSA9IG9wdGlvbnMuY29sb3I7XHJcblx0XHR9XHJcblx0XHRpZiAob3B0aW9ucy5maWxsKSB7XHJcblx0XHRcdHRoaXMuX2N0eC5maWxsU3R5bGUgPSBvcHRpb25zLmZpbGxDb2xvciB8fCBvcHRpb25zLmNvbG9yO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChvcHRpb25zLmxpbmVDYXApIHtcclxuXHRcdFx0dGhpcy5fY3R4LmxpbmVDYXAgPSBvcHRpb25zLmxpbmVDYXA7XHJcblx0XHR9XHJcblx0XHRpZiAob3B0aW9ucy5saW5lSm9pbikge1xyXG5cdFx0XHR0aGlzLl9jdHgubGluZUpvaW4gPSBvcHRpb25zLmxpbmVKb2luO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9kcmF3UGF0aDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGksIGosIGxlbiwgbGVuMiwgcG9pbnQsIGRyYXdNZXRob2Q7XHJcblxyXG5cdFx0dGhpcy5fY3R4LmJlZ2luUGF0aCgpO1xyXG5cclxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IHRoaXMuX3BhcnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGZvciAoaiA9IDAsIGxlbjIgPSB0aGlzLl9wYXJ0c1tpXS5sZW5ndGg7IGogPCBsZW4yOyBqKyspIHtcclxuXHRcdFx0XHRwb2ludCA9IHRoaXMuX3BhcnRzW2ldW2pdO1xyXG5cdFx0XHRcdGRyYXdNZXRob2QgPSAoaiA9PT0gMCA/ICdtb3ZlJyA6ICdsaW5lJykgKyAnVG8nO1xyXG5cclxuXHRcdFx0XHR0aGlzLl9jdHhbZHJhd01ldGhvZF0ocG9pbnQueCwgcG9pbnQueSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly8gVE9ETyByZWZhY3RvciB1Z2x5IGhhY2tcclxuXHRcdFx0aWYgKHRoaXMgaW5zdGFuY2VvZiBMLlBvbHlnb24pIHtcclxuXHRcdFx0XHR0aGlzLl9jdHguY2xvc2VQYXRoKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfY2hlY2tJZkVtcHR5OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gIXRoaXMuX3BhcnRzLmxlbmd0aDtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlUGF0aDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX2NoZWNrSWZFbXB0eSgpKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciBjdHggPSB0aGlzLl9jdHgsXHJcblx0XHQgICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuXHJcblx0XHR0aGlzLl9kcmF3UGF0aCgpO1xyXG5cdFx0Y3R4LnNhdmUoKTtcclxuXHRcdHRoaXMuX3VwZGF0ZVN0eWxlKCk7XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuZmlsbCkge1xyXG5cdFx0XHRjdHguZ2xvYmFsQWxwaGEgPSBvcHRpb25zLmZpbGxPcGFjaXR5O1xyXG5cdFx0XHRjdHguZmlsbChvcHRpb25zLmZpbGxSdWxlIHx8ICdldmVub2RkJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuc3Ryb2tlKSB7XHJcblx0XHRcdGN0eC5nbG9iYWxBbHBoYSA9IG9wdGlvbnMub3BhY2l0eTtcclxuXHRcdFx0Y3R4LnN0cm9rZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGN0eC5yZXN0b3JlKCk7XHJcblxyXG5cdFx0Ly8gVE9ETyBvcHRpbWl6YXRpb246IDEgZmlsbC9zdHJva2UgZm9yIGFsbCBmZWF0dXJlcyB3aXRoIGVxdWFsIHN0eWxlIGluc3RlYWQgb2YgMSBmb3IgZWFjaCBmZWF0dXJlXHJcblx0fSxcclxuXHJcblx0X2luaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLm9wdGlvbnMuY2xpY2thYmxlKSB7XHJcblx0XHRcdHRoaXMuX21hcC5vbignbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUsIHRoaXMpO1xyXG5cdFx0XHR0aGlzLl9tYXAub24oJ2NsaWNrIGRibGNsaWNrIGNvbnRleHRtZW51JywgdGhpcy5fZmlyZU1vdXNlRXZlbnQsIHRoaXMpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9maXJlTW91c2VFdmVudDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICh0aGlzLl9jb250YWluc1BvaW50KGUubGF5ZXJQb2ludCkpIHtcclxuXHRcdFx0dGhpcy5maXJlKGUudHlwZSwgZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X29uTW91c2VNb3ZlOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKCF0aGlzLl9tYXAgfHwgdGhpcy5fbWFwLl9hbmltYXRpbmdab29tKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdC8vIFRPRE8gZG9uJ3QgZG8gb24gZWFjaCBtb3ZlXHJcblx0XHRpZiAodGhpcy5fY29udGFpbnNQb2ludChlLmxheWVyUG9pbnQpKSB7XHJcblx0XHRcdHRoaXMuX2N0eC5jYW52YXMuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG5cdFx0XHR0aGlzLl9tb3VzZUluc2lkZSA9IHRydWU7XHJcblx0XHRcdHRoaXMuZmlyZSgnbW91c2VvdmVyJywgZSk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLl9tb3VzZUluc2lkZSkge1xyXG5cdFx0XHR0aGlzLl9jdHguY2FudmFzLnN0eWxlLmN1cnNvciA9ICcnO1xyXG5cdFx0XHR0aGlzLl9tb3VzZUluc2lkZSA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmZpcmUoJ21vdXNlb3V0JywgZSk7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbkwuTWFwLmluY2x1ZGUoKEwuUGF0aC5TVkcgJiYgIXdpbmRvdy5MX1BSRUZFUl9DQU5WQVMpIHx8ICFMLkJyb3dzZXIuY2FudmFzID8ge30gOiB7XHJcblx0X2luaXRQYXRoUm9vdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHJvb3QgPSB0aGlzLl9wYXRoUm9vdCxcclxuXHRcdCAgICBjdHg7XHJcblxyXG5cdFx0aWYgKCFyb290KSB7XHJcblx0XHRcdHJvb3QgPSB0aGlzLl9wYXRoUm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5cdFx0XHRyb290LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0Y3R4ID0gdGhpcy5fY2FudmFzQ3R4ID0gcm9vdC5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRcdFx0Y3R4LmxpbmVDYXAgPSAncm91bmQnO1xyXG5cdFx0XHRjdHgubGluZUpvaW4gPSAncm91bmQnO1xyXG5cclxuXHRcdFx0dGhpcy5fcGFuZXMub3ZlcmxheVBhbmUuYXBwZW5kQ2hpbGQocm9vdCk7XHJcblxyXG5cdFx0XHRpZiAodGhpcy5vcHRpb25zLnpvb21BbmltYXRpb24pIHtcclxuXHRcdFx0XHR0aGlzLl9wYXRoUm9vdC5jbGFzc05hbWUgPSAnbGVhZmxldC16b29tLWFuaW1hdGVkJztcclxuXHRcdFx0XHR0aGlzLm9uKCd6b29tYW5pbScsIHRoaXMuX2FuaW1hdGVQYXRoWm9vbSk7XHJcblx0XHRcdFx0dGhpcy5vbignem9vbWVuZCcsIHRoaXMuX2VuZFBhdGhab29tKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLm9uKCdtb3ZlZW5kJywgdGhpcy5fdXBkYXRlQ2FudmFzVmlld3BvcnQpO1xyXG5cdFx0XHR0aGlzLl91cGRhdGVDYW52YXNWaWV3cG9ydCgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF91cGRhdGVDYW52YXNWaWV3cG9ydDogZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly8gZG9uJ3QgcmVkcmF3IHdoaWxlIHpvb21pbmcuIFNlZSBfdXBkYXRlU3ZnVmlld3BvcnQgZm9yIG1vcmUgZGV0YWlsc1xyXG5cdFx0aWYgKHRoaXMuX3BhdGhab29taW5nKSB7IHJldHVybjsgfVxyXG5cdFx0dGhpcy5fdXBkYXRlUGF0aFZpZXdwb3J0KCk7XHJcblxyXG5cdFx0dmFyIHZwID0gdGhpcy5fcGF0aFZpZXdwb3J0LFxyXG5cdFx0ICAgIG1pbiA9IHZwLm1pbixcclxuXHRcdCAgICBzaXplID0gdnAubWF4LnN1YnRyYWN0KG1pbiksXHJcblx0XHQgICAgcm9vdCA9IHRoaXMuX3BhdGhSb290O1xyXG5cclxuXHRcdC8vVE9ETyBjaGVjayBpZiB0aGlzIHdvcmtzIHByb3Blcmx5IG9uIG1vYmlsZSB3ZWJraXRcclxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbihyb290LCBtaW4pO1xyXG5cdFx0cm9vdC53aWR0aCA9IHNpemUueDtcclxuXHRcdHJvb3QuaGVpZ2h0ID0gc2l6ZS55O1xyXG5cdFx0cm9vdC5nZXRDb250ZXh0KCcyZCcpLnRyYW5zbGF0ZSgtbWluLngsIC1taW4ueSk7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkxpbmVVdGlsIGNvbnRhaW5zIGRpZmZlcmVudCB1dGlsaXR5IGZ1bmN0aW9ucyBmb3IgbGluZSBzZWdtZW50c1xyXG4gKiBhbmQgcG9seWxpbmVzIChjbGlwcGluZywgc2ltcGxpZmljYXRpb24sIGRpc3RhbmNlcywgZXRjLilcclxuICovXHJcblxyXG4vKmpzaGludCBiaXR3aXNlOmZhbHNlICovIC8vIGFsbG93IGJpdHdpc2Ugb3BlcmF0aW9ucyBmb3IgdGhpcyBmaWxlXHJcblxyXG5MLkxpbmVVdGlsID0ge1xyXG5cclxuXHQvLyBTaW1wbGlmeSBwb2x5bGluZSB3aXRoIHZlcnRleCByZWR1Y3Rpb24gYW5kIERvdWdsYXMtUGV1Y2tlciBzaW1wbGlmaWNhdGlvbi5cclxuXHQvLyBJbXByb3ZlcyByZW5kZXJpbmcgcGVyZm9ybWFuY2UgZHJhbWF0aWNhbGx5IGJ5IGxlc3NlbmluZyB0aGUgbnVtYmVyIG9mIHBvaW50cyB0byBkcmF3LlxyXG5cclxuXHRzaW1wbGlmeTogZnVuY3Rpb24gKC8qUG9pbnRbXSovIHBvaW50cywgLypOdW1iZXIqLyB0b2xlcmFuY2UpIHtcclxuXHRcdGlmICghdG9sZXJhbmNlIHx8ICFwb2ludHMubGVuZ3RoKSB7XHJcblx0XHRcdHJldHVybiBwb2ludHMuc2xpY2UoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgc3FUb2xlcmFuY2UgPSB0b2xlcmFuY2UgKiB0b2xlcmFuY2U7XHJcblxyXG5cdFx0Ly8gc3RhZ2UgMTogdmVydGV4IHJlZHVjdGlvblxyXG5cdFx0cG9pbnRzID0gdGhpcy5fcmVkdWNlUG9pbnRzKHBvaW50cywgc3FUb2xlcmFuY2UpO1xyXG5cclxuXHRcdC8vIHN0YWdlIDI6IERvdWdsYXMtUGV1Y2tlciBzaW1wbGlmaWNhdGlvblxyXG5cdFx0cG9pbnRzID0gdGhpcy5fc2ltcGxpZnlEUChwb2ludHMsIHNxVG9sZXJhbmNlKTtcclxuXHJcblx0XHRyZXR1cm4gcG9pbnRzO1xyXG5cdH0sXHJcblxyXG5cdC8vIGRpc3RhbmNlIGZyb20gYSBwb2ludCB0byBhIHNlZ21lbnQgYmV0d2VlbiB0d28gcG9pbnRzXHJcblx0cG9pbnRUb1NlZ21lbnREaXN0YW5jZTogIGZ1bmN0aW9uICgvKlBvaW50Ki8gcCwgLypQb2ludCovIHAxLCAvKlBvaW50Ki8gcDIpIHtcclxuXHRcdHJldHVybiBNYXRoLnNxcnQodGhpcy5fc3FDbG9zZXN0UG9pbnRPblNlZ21lbnQocCwgcDEsIHAyLCB0cnVlKSk7XHJcblx0fSxcclxuXHJcblx0Y2xvc2VzdFBvaW50T25TZWdtZW50OiBmdW5jdGlvbiAoLypQb2ludCovIHAsIC8qUG9pbnQqLyBwMSwgLypQb2ludCovIHAyKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fc3FDbG9zZXN0UG9pbnRPblNlZ21lbnQocCwgcDEsIHAyKTtcclxuXHR9LFxyXG5cclxuXHQvLyBEb3VnbGFzLVBldWNrZXIgc2ltcGxpZmljYXRpb24sIHNlZSBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0RvdWdsYXMtUGV1Y2tlcl9hbGdvcml0aG1cclxuXHRfc2ltcGxpZnlEUDogZnVuY3Rpb24gKHBvaW50cywgc3FUb2xlcmFuY2UpIHtcclxuXHJcblx0XHR2YXIgbGVuID0gcG9pbnRzLmxlbmd0aCxcclxuXHRcdCAgICBBcnJheUNvbnN0cnVjdG9yID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09IHVuZGVmaW5lZCArICcnID8gVWludDhBcnJheSA6IEFycmF5LFxyXG5cdFx0ICAgIG1hcmtlcnMgPSBuZXcgQXJyYXlDb25zdHJ1Y3RvcihsZW4pO1xyXG5cclxuXHRcdG1hcmtlcnNbMF0gPSBtYXJrZXJzW2xlbiAtIDFdID0gMTtcclxuXHJcblx0XHR0aGlzLl9zaW1wbGlmeURQU3RlcChwb2ludHMsIG1hcmtlcnMsIHNxVG9sZXJhbmNlLCAwLCBsZW4gLSAxKTtcclxuXHJcblx0XHR2YXIgaSxcclxuXHRcdCAgICBuZXdQb2ludHMgPSBbXTtcclxuXHJcblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKG1hcmtlcnNbaV0pIHtcclxuXHRcdFx0XHRuZXdQb2ludHMucHVzaChwb2ludHNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ld1BvaW50cztcclxuXHR9LFxyXG5cclxuXHRfc2ltcGxpZnlEUFN0ZXA6IGZ1bmN0aW9uIChwb2ludHMsIG1hcmtlcnMsIHNxVG9sZXJhbmNlLCBmaXJzdCwgbGFzdCkge1xyXG5cclxuXHRcdHZhciBtYXhTcURpc3QgPSAwLFxyXG5cdFx0ICAgIGluZGV4LCBpLCBzcURpc3Q7XHJcblxyXG5cdFx0Zm9yIChpID0gZmlyc3QgKyAxOyBpIDw9IGxhc3QgLSAxOyBpKyspIHtcclxuXHRcdFx0c3FEaXN0ID0gdGhpcy5fc3FDbG9zZXN0UG9pbnRPblNlZ21lbnQocG9pbnRzW2ldLCBwb2ludHNbZmlyc3RdLCBwb2ludHNbbGFzdF0sIHRydWUpO1xyXG5cclxuXHRcdFx0aWYgKHNxRGlzdCA+IG1heFNxRGlzdCkge1xyXG5cdFx0XHRcdGluZGV4ID0gaTtcclxuXHRcdFx0XHRtYXhTcURpc3QgPSBzcURpc3Q7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAobWF4U3FEaXN0ID4gc3FUb2xlcmFuY2UpIHtcclxuXHRcdFx0bWFya2Vyc1tpbmRleF0gPSAxO1xyXG5cclxuXHRcdFx0dGhpcy5fc2ltcGxpZnlEUFN0ZXAocG9pbnRzLCBtYXJrZXJzLCBzcVRvbGVyYW5jZSwgZmlyc3QsIGluZGV4KTtcclxuXHRcdFx0dGhpcy5fc2ltcGxpZnlEUFN0ZXAocG9pbnRzLCBtYXJrZXJzLCBzcVRvbGVyYW5jZSwgaW5kZXgsIGxhc3QpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vIHJlZHVjZSBwb2ludHMgdGhhdCBhcmUgdG9vIGNsb3NlIHRvIGVhY2ggb3RoZXIgdG8gYSBzaW5nbGUgcG9pbnRcclxuXHRfcmVkdWNlUG9pbnRzOiBmdW5jdGlvbiAocG9pbnRzLCBzcVRvbGVyYW5jZSkge1xyXG5cdFx0dmFyIHJlZHVjZWRQb2ludHMgPSBbcG9pbnRzWzBdXTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMSwgcHJldiA9IDAsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5fc3FEaXN0KHBvaW50c1tpXSwgcG9pbnRzW3ByZXZdKSA+IHNxVG9sZXJhbmNlKSB7XHJcblx0XHRcdFx0cmVkdWNlZFBvaW50cy5wdXNoKHBvaW50c1tpXSk7XHJcblx0XHRcdFx0cHJldiA9IGk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmIChwcmV2IDwgbGVuIC0gMSkge1xyXG5cdFx0XHRyZWR1Y2VkUG9pbnRzLnB1c2gocG9pbnRzW2xlbiAtIDFdKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZWR1Y2VkUG9pbnRzO1xyXG5cdH0sXHJcblxyXG5cdC8vIENvaGVuLVN1dGhlcmxhbmQgbGluZSBjbGlwcGluZyBhbGdvcml0aG0uXHJcblx0Ly8gVXNlZCB0byBhdm9pZCByZW5kZXJpbmcgcGFydHMgb2YgYSBwb2x5bGluZSB0aGF0IGFyZSBub3QgY3VycmVudGx5IHZpc2libGUuXHJcblxyXG5cdGNsaXBTZWdtZW50OiBmdW5jdGlvbiAoYSwgYiwgYm91bmRzLCB1c2VMYXN0Q29kZSkge1xyXG5cdFx0dmFyIGNvZGVBID0gdXNlTGFzdENvZGUgPyB0aGlzLl9sYXN0Q29kZSA6IHRoaXMuX2dldEJpdENvZGUoYSwgYm91bmRzKSxcclxuXHRcdCAgICBjb2RlQiA9IHRoaXMuX2dldEJpdENvZGUoYiwgYm91bmRzKSxcclxuXHJcblx0XHQgICAgY29kZU91dCwgcCwgbmV3Q29kZTtcclxuXHJcblx0XHQvLyBzYXZlIDJuZCBjb2RlIHRvIGF2b2lkIGNhbGN1bGF0aW5nIGl0IG9uIHRoZSBuZXh0IHNlZ21lbnRcclxuXHRcdHRoaXMuX2xhc3RDb2RlID0gY29kZUI7XHJcblxyXG5cdFx0d2hpbGUgKHRydWUpIHtcclxuXHRcdFx0Ly8gaWYgYSxiIGlzIGluc2lkZSB0aGUgY2xpcCB3aW5kb3cgKHRyaXZpYWwgYWNjZXB0KVxyXG5cdFx0XHRpZiAoIShjb2RlQSB8IGNvZGVCKSkge1xyXG5cdFx0XHRcdHJldHVybiBbYSwgYl07XHJcblx0XHRcdC8vIGlmIGEsYiBpcyBvdXRzaWRlIHRoZSBjbGlwIHdpbmRvdyAodHJpdmlhbCByZWplY3QpXHJcblx0XHRcdH0gZWxzZSBpZiAoY29kZUEgJiBjb2RlQikge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0Ly8gb3RoZXIgY2FzZXNcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb2RlT3V0ID0gY29kZUEgfHwgY29kZUI7XHJcblx0XHRcdFx0cCA9IHRoaXMuX2dldEVkZ2VJbnRlcnNlY3Rpb24oYSwgYiwgY29kZU91dCwgYm91bmRzKTtcclxuXHRcdFx0XHRuZXdDb2RlID0gdGhpcy5fZ2V0Qml0Q29kZShwLCBib3VuZHMpO1xyXG5cclxuXHRcdFx0XHRpZiAoY29kZU91dCA9PT0gY29kZUEpIHtcclxuXHRcdFx0XHRcdGEgPSBwO1xyXG5cdFx0XHRcdFx0Y29kZUEgPSBuZXdDb2RlO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRiID0gcDtcclxuXHRcdFx0XHRcdGNvZGVCID0gbmV3Q29kZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfZ2V0RWRnZUludGVyc2VjdGlvbjogZnVuY3Rpb24gKGEsIGIsIGNvZGUsIGJvdW5kcykge1xyXG5cdFx0dmFyIGR4ID0gYi54IC0gYS54LFxyXG5cdFx0ICAgIGR5ID0gYi55IC0gYS55LFxyXG5cdFx0ICAgIG1pbiA9IGJvdW5kcy5taW4sXHJcblx0XHQgICAgbWF4ID0gYm91bmRzLm1heDtcclxuXHJcblx0XHRpZiAoY29kZSAmIDgpIHsgLy8gdG9wXHJcblx0XHRcdHJldHVybiBuZXcgTC5Qb2ludChhLnggKyBkeCAqIChtYXgueSAtIGEueSkgLyBkeSwgbWF4LnkpO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlICYgNCkgeyAvLyBib3R0b21cclxuXHRcdFx0cmV0dXJuIG5ldyBMLlBvaW50KGEueCArIGR4ICogKG1pbi55IC0gYS55KSAvIGR5LCBtaW4ueSk7XHJcblx0XHR9IGVsc2UgaWYgKGNvZGUgJiAyKSB7IC8vIHJpZ2h0XHJcblx0XHRcdHJldHVybiBuZXcgTC5Qb2ludChtYXgueCwgYS55ICsgZHkgKiAobWF4LnggLSBhLngpIC8gZHgpO1xyXG5cdFx0fSBlbHNlIGlmIChjb2RlICYgMSkgeyAvLyBsZWZ0XHJcblx0XHRcdHJldHVybiBuZXcgTC5Qb2ludChtaW4ueCwgYS55ICsgZHkgKiAobWluLnggLSBhLngpIC8gZHgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9nZXRCaXRDb2RlOiBmdW5jdGlvbiAoLypQb2ludCovIHAsIGJvdW5kcykge1xyXG5cdFx0dmFyIGNvZGUgPSAwO1xyXG5cclxuXHRcdGlmIChwLnggPCBib3VuZHMubWluLngpIHsgLy8gbGVmdFxyXG5cdFx0XHRjb2RlIHw9IDE7XHJcblx0XHR9IGVsc2UgaWYgKHAueCA+IGJvdW5kcy5tYXgueCkgeyAvLyByaWdodFxyXG5cdFx0XHRjb2RlIHw9IDI7XHJcblx0XHR9XHJcblx0XHRpZiAocC55IDwgYm91bmRzLm1pbi55KSB7IC8vIGJvdHRvbVxyXG5cdFx0XHRjb2RlIHw9IDQ7XHJcblx0XHR9IGVsc2UgaWYgKHAueSA+IGJvdW5kcy5tYXgueSkgeyAvLyB0b3BcclxuXHRcdFx0Y29kZSB8PSA4O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjb2RlO1xyXG5cdH0sXHJcblxyXG5cdC8vIHNxdWFyZSBkaXN0YW5jZSAodG8gYXZvaWQgdW5uZWNlc3NhcnkgTWF0aC5zcXJ0IGNhbGxzKVxyXG5cdF9zcURpc3Q6IGZ1bmN0aW9uIChwMSwgcDIpIHtcclxuXHRcdHZhciBkeCA9IHAyLnggLSBwMS54LFxyXG5cdFx0ICAgIGR5ID0gcDIueSAtIHAxLnk7XHJcblx0XHRyZXR1cm4gZHggKiBkeCArIGR5ICogZHk7XHJcblx0fSxcclxuXHJcblx0Ly8gcmV0dXJuIGNsb3Nlc3QgcG9pbnQgb24gc2VnbWVudCBvciBkaXN0YW5jZSB0byB0aGF0IHBvaW50XHJcblx0X3NxQ2xvc2VzdFBvaW50T25TZWdtZW50OiBmdW5jdGlvbiAocCwgcDEsIHAyLCBzcURpc3QpIHtcclxuXHRcdHZhciB4ID0gcDEueCxcclxuXHRcdCAgICB5ID0gcDEueSxcclxuXHRcdCAgICBkeCA9IHAyLnggLSB4LFxyXG5cdFx0ICAgIGR5ID0gcDIueSAtIHksXHJcblx0XHQgICAgZG90ID0gZHggKiBkeCArIGR5ICogZHksXHJcblx0XHQgICAgdDtcclxuXHJcblx0XHRpZiAoZG90ID4gMCkge1xyXG5cdFx0XHR0ID0gKChwLnggLSB4KSAqIGR4ICsgKHAueSAtIHkpICogZHkpIC8gZG90O1xyXG5cclxuXHRcdFx0aWYgKHQgPiAxKSB7XHJcblx0XHRcdFx0eCA9IHAyLng7XHJcblx0XHRcdFx0eSA9IHAyLnk7XHJcblx0XHRcdH0gZWxzZSBpZiAodCA+IDApIHtcclxuXHRcdFx0XHR4ICs9IGR4ICogdDtcclxuXHRcdFx0XHR5ICs9IGR5ICogdDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdGR4ID0gcC54IC0geDtcclxuXHRcdGR5ID0gcC55IC0geTtcclxuXHJcblx0XHRyZXR1cm4gc3FEaXN0ID8gZHggKiBkeCArIGR5ICogZHkgOiBuZXcgTC5Qb2ludCh4LCB5KTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuLypcclxuICogTC5Qb2x5bGluZSBpcyB1c2VkIHRvIGRpc3BsYXkgcG9seWxpbmVzIG9uIGEgbWFwLlxyXG4gKi9cclxuXHJcbkwuUG9seWxpbmUgPSBMLlBhdGguZXh0ZW5kKHtcclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5ncywgb3B0aW9ucykge1xyXG5cdFx0TC5QYXRoLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgb3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5fbGF0bG5ncyA9IHRoaXMuX2NvbnZlcnRMYXRMbmdzKGxhdGxuZ3MpO1xyXG5cdH0sXHJcblxyXG5cdG9wdGlvbnM6IHtcclxuXHRcdC8vIGhvdyBtdWNoIHRvIHNpbXBsaWZ5IHRoZSBwb2x5bGluZSBvbiBlYWNoIHpvb20gbGV2ZWxcclxuXHRcdC8vIG1vcmUgPSBiZXR0ZXIgcGVyZm9ybWFuY2UgYW5kIHNtb290aGVyIGxvb2ssIGxlc3MgPSBtb3JlIGFjY3VyYXRlXHJcblx0XHRzbW9vdGhGYWN0b3I6IDEuMCxcclxuXHRcdG5vQ2xpcDogZmFsc2VcclxuXHR9LFxyXG5cclxuXHRwcm9qZWN0TGF0bG5nczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fb3JpZ2luYWxQb2ludHMgPSBbXTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gdGhpcy5fbGF0bG5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHR0aGlzLl9vcmlnaW5hbFBvaW50c1tpXSA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQodGhpcy5fbGF0bG5nc1tpXSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Z2V0UGF0aFN0cmluZzogZnVuY3Rpb24gKCkge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX3BhcnRzLmxlbmd0aCwgc3RyID0gJyc7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRzdHIgKz0gdGhpcy5fZ2V0UGF0aFBhcnRTdHIodGhpcy5fcGFydHNbaV0pO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHN0cjtcclxuXHR9LFxyXG5cclxuXHRnZXRMYXRMbmdzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGF0bG5ncztcclxuXHR9LFxyXG5cclxuXHRzZXRMYXRMbmdzOiBmdW5jdGlvbiAobGF0bG5ncykge1xyXG5cdFx0dGhpcy5fbGF0bG5ncyA9IHRoaXMuX2NvbnZlcnRMYXRMbmdzKGxhdGxuZ3MpO1xyXG5cdFx0cmV0dXJuIHRoaXMucmVkcmF3KCk7XHJcblx0fSxcclxuXHJcblx0YWRkTGF0TG5nOiBmdW5jdGlvbiAobGF0bG5nKSB7XHJcblx0XHR0aGlzLl9sYXRsbmdzLnB1c2goTC5sYXRMbmcobGF0bG5nKSk7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWRyYXcoKTtcclxuXHR9LFxyXG5cclxuXHRzcGxpY2VMYXRMbmdzOiBmdW5jdGlvbiAoKSB7IC8vIChOdW1iZXIgaW5kZXgsIE51bWJlciBob3dNYW55KVxyXG5cdFx0dmFyIHJlbW92ZWQgPSBbXS5zcGxpY2UuYXBwbHkodGhpcy5fbGF0bG5ncywgYXJndW1lbnRzKTtcclxuXHRcdHRoaXMuX2NvbnZlcnRMYXRMbmdzKHRoaXMuX2xhdGxuZ3MsIHRydWUpO1xyXG5cdFx0dGhpcy5yZWRyYXcoKTtcclxuXHRcdHJldHVybiByZW1vdmVkO1xyXG5cdH0sXHJcblxyXG5cdGNsb3Nlc3RMYXllclBvaW50OiBmdW5jdGlvbiAocCkge1xyXG5cdFx0dmFyIG1pbkRpc3RhbmNlID0gSW5maW5pdHksIHBhcnRzID0gdGhpcy5fcGFydHMsIHAxLCBwMiwgbWluUG9pbnQgPSBudWxsO1xyXG5cclxuXHRcdGZvciAodmFyIGogPSAwLCBqTGVuID0gcGFydHMubGVuZ3RoOyBqIDwgakxlbjsgaisrKSB7XHJcblx0XHRcdHZhciBwb2ludHMgPSBwYXJ0c1tqXTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDEsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdHAxID0gcG9pbnRzW2kgLSAxXTtcclxuXHRcdFx0XHRwMiA9IHBvaW50c1tpXTtcclxuXHRcdFx0XHR2YXIgc3FEaXN0ID0gTC5MaW5lVXRpbC5fc3FDbG9zZXN0UG9pbnRPblNlZ21lbnQocCwgcDEsIHAyLCB0cnVlKTtcclxuXHRcdFx0XHRpZiAoc3FEaXN0IDwgbWluRGlzdGFuY2UpIHtcclxuXHRcdFx0XHRcdG1pbkRpc3RhbmNlID0gc3FEaXN0O1xyXG5cdFx0XHRcdFx0bWluUG9pbnQgPSBMLkxpbmVVdGlsLl9zcUNsb3Nlc3RQb2ludE9uU2VnbWVudChwLCBwMSwgcDIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0aWYgKG1pblBvaW50KSB7XHJcblx0XHRcdG1pblBvaW50LmRpc3RhbmNlID0gTWF0aC5zcXJ0KG1pbkRpc3RhbmNlKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBtaW5Qb2ludDtcclxuXHR9LFxyXG5cclxuXHRnZXRCb3VuZHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmdCb3VuZHModGhpcy5nZXRMYXRMbmdzKCkpO1xyXG5cdH0sXHJcblxyXG5cdF9jb252ZXJ0TGF0TG5nczogZnVuY3Rpb24gKGxhdGxuZ3MsIG92ZXJ3cml0ZSkge1xyXG5cdFx0dmFyIGksIGxlbiwgdGFyZ2V0ID0gb3ZlcndyaXRlID8gbGF0bG5ncyA6IFtdO1xyXG5cclxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGxhdGxuZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0aWYgKEwuVXRpbC5pc0FycmF5KGxhdGxuZ3NbaV0pICYmIHR5cGVvZiBsYXRsbmdzW2ldWzBdICE9PSAnbnVtYmVyJykge1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0XHR0YXJnZXRbaV0gPSBMLmxhdExuZyhsYXRsbmdzW2ldKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0YXJnZXQ7XHJcblx0fSxcclxuXHJcblx0X2luaXRFdmVudHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdEwuUGF0aC5wcm90b3R5cGUuX2luaXRFdmVudHMuY2FsbCh0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0UGF0aFBhcnRTdHI6IGZ1bmN0aW9uIChwb2ludHMpIHtcclxuXHRcdHZhciByb3VuZCA9IEwuUGF0aC5WTUw7XHJcblxyXG5cdFx0Zm9yICh2YXIgaiA9IDAsIGxlbjIgPSBwb2ludHMubGVuZ3RoLCBzdHIgPSAnJywgcDsgaiA8IGxlbjI7IGorKykge1xyXG5cdFx0XHRwID0gcG9pbnRzW2pdO1xyXG5cdFx0XHRpZiAocm91bmQpIHtcclxuXHRcdFx0XHRwLl9yb3VuZCgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0ciArPSAoaiA/ICdMJyA6ICdNJykgKyBwLnggKyAnICcgKyBwLnk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RyO1xyXG5cdH0sXHJcblxyXG5cdF9jbGlwUG9pbnRzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcG9pbnRzID0gdGhpcy5fb3JpZ2luYWxQb2ludHMsXHJcblx0XHQgICAgbGVuID0gcG9pbnRzLmxlbmd0aCxcclxuXHRcdCAgICBpLCBrLCBzZWdtZW50O1xyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMubm9DbGlwKSB7XHJcblx0XHRcdHRoaXMuX3BhcnRzID0gW3BvaW50c107XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9wYXJ0cyA9IFtdO1xyXG5cclxuXHRcdHZhciBwYXJ0cyA9IHRoaXMuX3BhcnRzLFxyXG5cdFx0ICAgIHZwID0gdGhpcy5fbWFwLl9wYXRoVmlld3BvcnQsXHJcblx0XHQgICAgbHUgPSBMLkxpbmVVdGlsO1xyXG5cclxuXHRcdGZvciAoaSA9IDAsIGsgPSAwOyBpIDwgbGVuIC0gMTsgaSsrKSB7XHJcblx0XHRcdHNlZ21lbnQgPSBsdS5jbGlwU2VnbWVudChwb2ludHNbaV0sIHBvaW50c1tpICsgMV0sIHZwLCBpKTtcclxuXHRcdFx0aWYgKCFzZWdtZW50KSB7XHJcblx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHBhcnRzW2tdID0gcGFydHNba10gfHwgW107XHJcblx0XHRcdHBhcnRzW2tdLnB1c2goc2VnbWVudFswXSk7XHJcblxyXG5cdFx0XHQvLyBpZiBzZWdtZW50IGdvZXMgb3V0IG9mIHNjcmVlbiwgb3IgaXQncyB0aGUgbGFzdCBvbmUsIGl0J3MgdGhlIGVuZCBvZiB0aGUgbGluZSBwYXJ0XHJcblx0XHRcdGlmICgoc2VnbWVudFsxXSAhPT0gcG9pbnRzW2kgKyAxXSkgfHwgKGkgPT09IGxlbiAtIDIpKSB7XHJcblx0XHRcdFx0cGFydHNba10ucHVzaChzZWdtZW50WzFdKTtcclxuXHRcdFx0XHRrKys7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvLyBzaW1wbGlmeSBlYWNoIGNsaXBwZWQgcGFydCBvZiB0aGUgcG9seWxpbmVcclxuXHRfc2ltcGxpZnlQb2ludHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBwYXJ0cyA9IHRoaXMuX3BhcnRzLFxyXG5cdFx0ICAgIGx1ID0gTC5MaW5lVXRpbDtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0cGFydHNbaV0gPSBsdS5zaW1wbGlmeShwYXJ0c1tpXSwgdGhpcy5vcHRpb25zLnNtb290aEZhY3Rvcik7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZVBhdGg6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fbWFwKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHRoaXMuX2NsaXBQb2ludHMoKTtcclxuXHRcdHRoaXMuX3NpbXBsaWZ5UG9pbnRzKCk7XHJcblxyXG5cdFx0TC5QYXRoLnByb3RvdHlwZS5fdXBkYXRlUGF0aC5jYWxsKHRoaXMpO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLnBvbHlsaW5lID0gZnVuY3Rpb24gKGxhdGxuZ3MsIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuUG9seWxpbmUobGF0bG5ncywgb3B0aW9ucyk7XHJcbn07XHJcblxyXG5cclxuLypcclxuICogTC5Qb2x5VXRpbCBjb250YWlucyB1dGlsaXR5IGZ1bmN0aW9ucyBmb3IgcG9seWdvbnMgKGNsaXBwaW5nLCBldGMuKS5cclxuICovXHJcblxyXG4vKmpzaGludCBiaXR3aXNlOmZhbHNlICovIC8vIGFsbG93IGJpdHdpc2Ugb3BlcmF0aW9ucyBoZXJlXHJcblxyXG5MLlBvbHlVdGlsID0ge307XHJcblxyXG4vKlxyXG4gKiBTdXRoZXJsYW5kLUhvZGdlbWFuIHBvbHlnb24gY2xpcHBpbmcgYWxnb3JpdGhtLlxyXG4gKiBVc2VkIHRvIGF2b2lkIHJlbmRlcmluZyBwYXJ0cyBvZiBhIHBvbHlnb24gdGhhdCBhcmUgbm90IGN1cnJlbnRseSB2aXNpYmxlLlxyXG4gKi9cclxuTC5Qb2x5VXRpbC5jbGlwUG9seWdvbiA9IGZ1bmN0aW9uIChwb2ludHMsIGJvdW5kcykge1xyXG5cdHZhciBjbGlwcGVkUG9pbnRzLFxyXG5cdCAgICBlZGdlcyA9IFsxLCA0LCAyLCA4XSxcclxuXHQgICAgaSwgaiwgayxcclxuXHQgICAgYSwgYixcclxuXHQgICAgbGVuLCBlZGdlLCBwLFxyXG5cdCAgICBsdSA9IEwuTGluZVV0aWw7XHJcblxyXG5cdGZvciAoaSA9IDAsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0cG9pbnRzW2ldLl9jb2RlID0gbHUuX2dldEJpdENvZGUocG9pbnRzW2ldLCBib3VuZHMpO1xyXG5cdH1cclxuXHJcblx0Ly8gZm9yIGVhY2ggZWRnZSAobGVmdCwgYm90dG9tLCByaWdodCwgdG9wKVxyXG5cdGZvciAoayA9IDA7IGsgPCA0OyBrKyspIHtcclxuXHRcdGVkZ2UgPSBlZGdlc1trXTtcclxuXHRcdGNsaXBwZWRQb2ludHMgPSBbXTtcclxuXHJcblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBwb2ludHMubGVuZ3RoLCBqID0gbGVuIC0gMTsgaSA8IGxlbjsgaiA9IGkrKykge1xyXG5cdFx0XHRhID0gcG9pbnRzW2ldO1xyXG5cdFx0XHRiID0gcG9pbnRzW2pdO1xyXG5cclxuXHRcdFx0Ly8gaWYgYSBpcyBpbnNpZGUgdGhlIGNsaXAgd2luZG93XHJcblx0XHRcdGlmICghKGEuX2NvZGUgJiBlZGdlKSkge1xyXG5cdFx0XHRcdC8vIGlmIGIgaXMgb3V0c2lkZSB0aGUgY2xpcCB3aW5kb3cgKGEtPmIgZ29lcyBvdXQgb2Ygc2NyZWVuKVxyXG5cdFx0XHRcdGlmIChiLl9jb2RlICYgZWRnZSkge1xyXG5cdFx0XHRcdFx0cCA9IGx1Ll9nZXRFZGdlSW50ZXJzZWN0aW9uKGIsIGEsIGVkZ2UsIGJvdW5kcyk7XHJcblx0XHRcdFx0XHRwLl9jb2RlID0gbHUuX2dldEJpdENvZGUocCwgYm91bmRzKTtcclxuXHRcdFx0XHRcdGNsaXBwZWRQb2ludHMucHVzaChwKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2xpcHBlZFBvaW50cy5wdXNoKGEpO1xyXG5cclxuXHRcdFx0Ly8gZWxzZSBpZiBiIGlzIGluc2lkZSB0aGUgY2xpcCB3aW5kb3cgKGEtPmIgZW50ZXJzIHRoZSBzY3JlZW4pXHJcblx0XHRcdH0gZWxzZSBpZiAoIShiLl9jb2RlICYgZWRnZSkpIHtcclxuXHRcdFx0XHRwID0gbHUuX2dldEVkZ2VJbnRlcnNlY3Rpb24oYiwgYSwgZWRnZSwgYm91bmRzKTtcclxuXHRcdFx0XHRwLl9jb2RlID0gbHUuX2dldEJpdENvZGUocCwgYm91bmRzKTtcclxuXHRcdFx0XHRjbGlwcGVkUG9pbnRzLnB1c2gocCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHBvaW50cyA9IGNsaXBwZWRQb2ludHM7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcG9pbnRzO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuUG9seWdvbiBpcyB1c2VkIHRvIGRpc3BsYXkgcG9seWdvbnMgb24gYSBtYXAuXHJcbiAqL1xyXG5cclxuTC5Qb2x5Z29uID0gTC5Qb2x5bGluZS5leHRlbmQoe1xyXG5cdG9wdGlvbnM6IHtcclxuXHRcdGZpbGw6IHRydWVcclxuXHR9LFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5ncywgb3B0aW9ucykge1xyXG5cdFx0TC5Qb2x5bGluZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGxhdGxuZ3MsIG9wdGlvbnMpO1xyXG5cdFx0dGhpcy5faW5pdFdpdGhIb2xlcyhsYXRsbmdzKTtcclxuXHR9LFxyXG5cclxuXHRfaW5pdFdpdGhIb2xlczogZnVuY3Rpb24gKGxhdGxuZ3MpIHtcclxuXHRcdHZhciBpLCBsZW4sIGhvbGU7XHJcblx0XHRpZiAobGF0bG5ncyAmJiBMLlV0aWwuaXNBcnJheShsYXRsbmdzWzBdKSAmJiAodHlwZW9mIGxhdGxuZ3NbMF1bMF0gIT09ICdudW1iZXInKSkge1xyXG5cdFx0XHR0aGlzLl9sYXRsbmdzID0gdGhpcy5fY29udmVydExhdExuZ3MobGF0bG5nc1swXSk7XHJcblx0XHRcdHRoaXMuX2hvbGVzID0gbGF0bG5ncy5zbGljZSgxKTtcclxuXHJcblx0XHRcdGZvciAoaSA9IDAsIGxlbiA9IHRoaXMuX2hvbGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdFx0aG9sZSA9IHRoaXMuX2hvbGVzW2ldID0gdGhpcy5fY29udmVydExhdExuZ3ModGhpcy5faG9sZXNbaV0pO1xyXG5cdFx0XHRcdGlmIChob2xlWzBdLmVxdWFscyhob2xlW2hvbGUubGVuZ3RoIC0gMV0pKSB7XHJcblx0XHRcdFx0XHRob2xlLnBvcCgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGZpbHRlciBvdXQgbGFzdCBwb2ludCBpZiBpdHMgZXF1YWwgdG8gdGhlIGZpcnN0IG9uZVxyXG5cdFx0bGF0bG5ncyA9IHRoaXMuX2xhdGxuZ3M7XHJcblxyXG5cdFx0aWYgKGxhdGxuZ3MubGVuZ3RoID49IDIgJiYgbGF0bG5nc1swXS5lcXVhbHMobGF0bG5nc1tsYXRsbmdzLmxlbmd0aCAtIDFdKSkge1xyXG5cdFx0XHRsYXRsbmdzLnBvcCgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHByb2plY3RMYXRsbmdzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLlBvbHlsaW5lLnByb3RvdHlwZS5wcm9qZWN0TGF0bG5ncy5jYWxsKHRoaXMpO1xyXG5cclxuXHRcdC8vIHByb2plY3QgcG9seWdvbiBob2xlcyBwb2ludHNcclxuXHRcdC8vIFRPRE8gbW92ZSB0aGlzIGxvZ2ljIHRvIFBvbHlsaW5lIHRvIGdldCByaWQgb2YgZHVwbGljYXRpb25cclxuXHRcdHRoaXMuX2hvbGVQb2ludHMgPSBbXTtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2hvbGVzKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciBpLCBqLCBsZW4sIGxlbjI7XHJcblxyXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gdGhpcy5faG9sZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0dGhpcy5faG9sZVBvaW50c1tpXSA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yIChqID0gMCwgbGVuMiA9IHRoaXMuX2hvbGVzW2ldLmxlbmd0aDsgaiA8IGxlbjI7IGorKykge1xyXG5cdFx0XHRcdHRoaXMuX2hvbGVQb2ludHNbaV1bal0gPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KHRoaXMuX2hvbGVzW2ldW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHNldExhdExuZ3M6IGZ1bmN0aW9uIChsYXRsbmdzKSB7XHJcblx0XHRpZiAobGF0bG5ncyAmJiBMLlV0aWwuaXNBcnJheShsYXRsbmdzWzBdKSAmJiAodHlwZW9mIGxhdGxuZ3NbMF1bMF0gIT09ICdudW1iZXInKSkge1xyXG5cdFx0XHR0aGlzLl9pbml0V2l0aEhvbGVzKGxhdGxuZ3MpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5yZWRyYXcoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybiBMLlBvbHlsaW5lLnByb3RvdHlwZS5zZXRMYXRMbmdzLmNhbGwodGhpcywgbGF0bG5ncyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2NsaXBQb2ludHM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBwb2ludHMgPSB0aGlzLl9vcmlnaW5hbFBvaW50cyxcclxuXHRcdCAgICBuZXdQYXJ0cyA9IFtdO1xyXG5cclxuXHRcdHRoaXMuX3BhcnRzID0gW3BvaW50c10uY29uY2F0KHRoaXMuX2hvbGVQb2ludHMpO1xyXG5cclxuXHRcdGlmICh0aGlzLm9wdGlvbnMubm9DbGlwKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwLCBsZW4gPSB0aGlzLl9wYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHR2YXIgY2xpcHBlZCA9IEwuUG9seVV0aWwuY2xpcFBvbHlnb24odGhpcy5fcGFydHNbaV0sIHRoaXMuX21hcC5fcGF0aFZpZXdwb3J0KTtcclxuXHRcdFx0aWYgKGNsaXBwZWQubGVuZ3RoKSB7XHJcblx0XHRcdFx0bmV3UGFydHMucHVzaChjbGlwcGVkKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3BhcnRzID0gbmV3UGFydHM7XHJcblx0fSxcclxuXHJcblx0X2dldFBhdGhQYXJ0U3RyOiBmdW5jdGlvbiAocG9pbnRzKSB7XHJcblx0XHR2YXIgc3RyID0gTC5Qb2x5bGluZS5wcm90b3R5cGUuX2dldFBhdGhQYXJ0U3RyLmNhbGwodGhpcywgcG9pbnRzKTtcclxuXHRcdHJldHVybiBzdHIgKyAoTC5Ccm93c2VyLnN2ZyA/ICd6JyA6ICd4Jyk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwucG9seWdvbiA9IGZ1bmN0aW9uIChsYXRsbmdzLCBvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLlBvbHlnb24obGF0bG5ncywgb3B0aW9ucyk7XHJcbn07XHJcblxyXG5cclxuLypcclxuICogQ29udGFpbnMgTC5NdWx0aVBvbHlsaW5lIGFuZCBMLk11bHRpUG9seWdvbiBsYXllcnMuXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uICgpIHtcclxuXHRmdW5jdGlvbiBjcmVhdGVNdWx0aShLbGFzcykge1xyXG5cclxuXHRcdHJldHVybiBMLkZlYXR1cmVHcm91cC5leHRlbmQoe1xyXG5cclxuXHRcdFx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdGxuZ3MsIG9wdGlvbnMpIHtcclxuXHRcdFx0XHR0aGlzLl9sYXllcnMgPSB7fTtcclxuXHRcdFx0XHR0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcclxuXHRcdFx0XHR0aGlzLnNldExhdExuZ3MobGF0bG5ncyk7XHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRzZXRMYXRMbmdzOiBmdW5jdGlvbiAobGF0bG5ncykge1xyXG5cdFx0XHRcdHZhciBpID0gMCxcclxuXHRcdFx0XHQgICAgbGVuID0gbGF0bG5ncy5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0XHRcdFx0aWYgKGkgPCBsZW4pIHtcclxuXHRcdFx0XHRcdFx0bGF5ZXIuc2V0TGF0TG5ncyhsYXRsbmdzW2krK10pO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5yZW1vdmVMYXllcihsYXllcik7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0XHRcdHdoaWxlIChpIDwgbGVuKSB7XHJcblx0XHRcdFx0XHR0aGlzLmFkZExheWVyKG5ldyBLbGFzcyhsYXRsbmdzW2krK10sIHRoaXMuX29wdGlvbnMpKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzO1xyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0Z2V0TGF0TG5nczogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHZhciBsYXRsbmdzID0gW107XHJcblxyXG5cdFx0XHRcdHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0XHRcdFx0bGF0bG5ncy5wdXNoKGxheWVyLmdldExhdExuZ3MoKSk7XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdHJldHVybiBsYXRsbmdzO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdEwuTXVsdGlQb2x5bGluZSA9IGNyZWF0ZU11bHRpKEwuUG9seWxpbmUpO1xyXG5cdEwuTXVsdGlQb2x5Z29uID0gY3JlYXRlTXVsdGkoTC5Qb2x5Z29uKTtcclxuXHJcblx0TC5tdWx0aVBvbHlsaW5lID0gZnVuY3Rpb24gKGxhdGxuZ3MsIG9wdGlvbnMpIHtcclxuXHRcdHJldHVybiBuZXcgTC5NdWx0aVBvbHlsaW5lKGxhdGxuZ3MsIG9wdGlvbnMpO1xyXG5cdH07XHJcblxyXG5cdEwubXVsdGlQb2x5Z29uID0gZnVuY3Rpb24gKGxhdGxuZ3MsIG9wdGlvbnMpIHtcclxuXHRcdHJldHVybiBuZXcgTC5NdWx0aVBvbHlnb24obGF0bG5ncywgb3B0aW9ucyk7XHJcblx0fTtcclxufSgpKTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLlJlY3RhbmdsZSBleHRlbmRzIFBvbHlnb24gYW5kIGNyZWF0ZXMgYSByZWN0YW5nbGUgd2hlbiBwYXNzZWQgYSBMYXRMbmdCb3VuZHMgb2JqZWN0LlxyXG4gKi9cclxuXHJcbkwuUmVjdGFuZ2xlID0gTC5Qb2x5Z29uLmV4dGVuZCh7XHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGxhdExuZ0JvdW5kcywgb3B0aW9ucykge1xyXG5cdFx0TC5Qb2x5Z29uLnByb3RvdHlwZS5pbml0aWFsaXplLmNhbGwodGhpcywgdGhpcy5fYm91bmRzVG9MYXRMbmdzKGxhdExuZ0JvdW5kcyksIG9wdGlvbnMpO1xyXG5cdH0sXHJcblxyXG5cdHNldEJvdW5kczogZnVuY3Rpb24gKGxhdExuZ0JvdW5kcykge1xyXG5cdFx0dGhpcy5zZXRMYXRMbmdzKHRoaXMuX2JvdW5kc1RvTGF0TG5ncyhsYXRMbmdCb3VuZHMpKTtcclxuXHR9LFxyXG5cclxuXHRfYm91bmRzVG9MYXRMbmdzOiBmdW5jdGlvbiAobGF0TG5nQm91bmRzKSB7XHJcblx0XHRsYXRMbmdCb3VuZHMgPSBMLmxhdExuZ0JvdW5kcyhsYXRMbmdCb3VuZHMpO1xyXG5cdFx0cmV0dXJuIFtcclxuXHRcdFx0bGF0TG5nQm91bmRzLmdldFNvdXRoV2VzdCgpLFxyXG5cdFx0XHRsYXRMbmdCb3VuZHMuZ2V0Tm9ydGhXZXN0KCksXHJcblx0XHRcdGxhdExuZ0JvdW5kcy5nZXROb3J0aEVhc3QoKSxcclxuXHRcdFx0bGF0TG5nQm91bmRzLmdldFNvdXRoRWFzdCgpXHJcblx0XHRdO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLnJlY3RhbmdsZSA9IGZ1bmN0aW9uIChsYXRMbmdCb3VuZHMsIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuUmVjdGFuZ2xlKGxhdExuZ0JvdW5kcywgb3B0aW9ucyk7XHJcbn07XHJcblxyXG5cclxuLypcclxuICogTC5DaXJjbGUgaXMgYSBjaXJjbGUgb3ZlcmxheSAod2l0aCBhIGNlcnRhaW4gcmFkaXVzIGluIG1ldGVycykuXHJcbiAqL1xyXG5cclxuTC5DaXJjbGUgPSBMLlBhdGguZXh0ZW5kKHtcclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5nLCByYWRpdXMsIG9wdGlvbnMpIHtcclxuXHRcdEwuUGF0aC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuXHRcdHRoaXMuX2xhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XHJcblx0XHR0aGlzLl9tUmFkaXVzID0gcmFkaXVzO1xyXG5cdH0sXHJcblxyXG5cdG9wdGlvbnM6IHtcclxuXHRcdGZpbGw6IHRydWVcclxuXHR9LFxyXG5cclxuXHRzZXRMYXRMbmc6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdHRoaXMuX2xhdGxuZyA9IEwubGF0TG5nKGxhdGxuZyk7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWRyYXcoKTtcclxuXHR9LFxyXG5cclxuXHRzZXRSYWRpdXM6IGZ1bmN0aW9uIChyYWRpdXMpIHtcclxuXHRcdHRoaXMuX21SYWRpdXMgPSByYWRpdXM7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWRyYXcoKTtcclxuXHR9LFxyXG5cclxuXHRwcm9qZWN0TGF0bG5nczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGxuZ1JhZGl1cyA9IHRoaXMuX2dldExuZ1JhZGl1cygpLFxyXG5cdFx0ICAgIGxhdGxuZyA9IHRoaXMuX2xhdGxuZyxcclxuXHRcdCAgICBwb2ludExlZnQgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KFtsYXRsbmcubGF0LCBsYXRsbmcubG5nIC0gbG5nUmFkaXVzXSk7XHJcblxyXG5cdFx0dGhpcy5fcG9pbnQgPSB0aGlzLl9tYXAubGF0TG5nVG9MYXllclBvaW50KGxhdGxuZyk7XHJcblx0XHR0aGlzLl9yYWRpdXMgPSBNYXRoLm1heCh0aGlzLl9wb2ludC54IC0gcG9pbnRMZWZ0LngsIDEpO1xyXG5cdH0sXHJcblxyXG5cdGdldEJvdW5kczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGxuZ1JhZGl1cyA9IHRoaXMuX2dldExuZ1JhZGl1cygpLFxyXG5cdFx0ICAgIGxhdFJhZGl1cyA9ICh0aGlzLl9tUmFkaXVzIC8gNDAwNzUwMTcpICogMzYwLFxyXG5cdFx0ICAgIGxhdGxuZyA9IHRoaXMuX2xhdGxuZztcclxuXHJcblx0XHRyZXR1cm4gbmV3IEwuTGF0TG5nQm91bmRzKFxyXG5cdFx0ICAgICAgICBbbGF0bG5nLmxhdCAtIGxhdFJhZGl1cywgbGF0bG5nLmxuZyAtIGxuZ1JhZGl1c10sXHJcblx0XHQgICAgICAgIFtsYXRsbmcubGF0ICsgbGF0UmFkaXVzLCBsYXRsbmcubG5nICsgbG5nUmFkaXVzXSk7XHJcblx0fSxcclxuXHJcblx0Z2V0TGF0TG5nOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fbGF0bG5nO1xyXG5cdH0sXHJcblxyXG5cdGdldFBhdGhTdHJpbmc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBwID0gdGhpcy5fcG9pbnQsXHJcblx0XHQgICAgciA9IHRoaXMuX3JhZGl1cztcclxuXHJcblx0XHRpZiAodGhpcy5fY2hlY2tJZkVtcHR5KCkpIHtcclxuXHRcdFx0cmV0dXJuICcnO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChMLkJyb3dzZXIuc3ZnKSB7XHJcblx0XHRcdHJldHVybiAnTScgKyBwLnggKyAnLCcgKyAocC55IC0gcikgK1xyXG5cdFx0XHQgICAgICAgJ0EnICsgciArICcsJyArIHIgKyAnLDAsMSwxLCcgK1xyXG5cdFx0XHQgICAgICAgKHAueCAtIDAuMSkgKyAnLCcgKyAocC55IC0gcikgKyAnIHonO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cC5fcm91bmQoKTtcclxuXHRcdFx0ciA9IE1hdGgucm91bmQocik7XHJcblx0XHRcdHJldHVybiAnQUwgJyArIHAueCArICcsJyArIHAueSArICcgJyArIHIgKyAnLCcgKyByICsgJyAwLCcgKyAoNjU1MzUgKiAzNjApO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGdldFJhZGl1czogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX21SYWRpdXM7XHJcblx0fSxcclxuXHJcblx0Ly8gVE9ETyBFYXJ0aCBoYXJkY29kZWQsIG1vdmUgaW50byBwcm9qZWN0aW9uIGNvZGUhXHJcblxyXG5cdF9nZXRMYXRSYWRpdXM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiAodGhpcy5fbVJhZGl1cyAvIDQwMDc1MDE3KSAqIDM2MDtcclxuXHR9LFxyXG5cclxuXHRfZ2V0TG5nUmFkaXVzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZ2V0TGF0UmFkaXVzKCkgLyBNYXRoLmNvcyhMLkxhdExuZy5ERUdfVE9fUkFEICogdGhpcy5fbGF0bG5nLmxhdCk7XHJcblx0fSxcclxuXHJcblx0X2NoZWNrSWZFbXB0eTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9tYXApIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0dmFyIHZwID0gdGhpcy5fbWFwLl9wYXRoVmlld3BvcnQsXHJcblx0XHQgICAgciA9IHRoaXMuX3JhZGl1cyxcclxuXHRcdCAgICBwID0gdGhpcy5fcG9pbnQ7XHJcblxyXG5cdFx0cmV0dXJuIHAueCAtIHIgPiB2cC5tYXgueCB8fCBwLnkgLSByID4gdnAubWF4LnkgfHxcclxuXHRcdCAgICAgICBwLnggKyByIDwgdnAubWluLnggfHwgcC55ICsgciA8IHZwLm1pbi55O1xyXG5cdH1cclxufSk7XHJcblxyXG5MLmNpcmNsZSA9IGZ1bmN0aW9uIChsYXRsbmcsIHJhZGl1cywgb3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5DaXJjbGUobGF0bG5nLCByYWRpdXMsIG9wdGlvbnMpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuQ2lyY2xlTWFya2VyIGlzIGEgY2lyY2xlIG92ZXJsYXkgd2l0aCBhIHBlcm1hbmVudCBwaXhlbCByYWRpdXMuXHJcbiAqL1xyXG5cclxuTC5DaXJjbGVNYXJrZXIgPSBMLkNpcmNsZS5leHRlbmQoe1xyXG5cdG9wdGlvbnM6IHtcclxuXHRcdHJhZGl1czogMTAsXHJcblx0XHR3ZWlnaHQ6IDJcclxuXHR9LFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAobGF0bG5nLCBvcHRpb25zKSB7XHJcblx0XHRMLkNpcmNsZS5wcm90b3R5cGUuaW5pdGlhbGl6ZS5jYWxsKHRoaXMsIGxhdGxuZywgbnVsbCwgb3B0aW9ucyk7XHJcblx0XHR0aGlzLl9yYWRpdXMgPSB0aGlzLm9wdGlvbnMucmFkaXVzO1xyXG5cdH0sXHJcblxyXG5cdHByb2plY3RMYXRsbmdzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9wb2ludCA9IHRoaXMuX21hcC5sYXRMbmdUb0xheWVyUG9pbnQodGhpcy5fbGF0bG5nKTtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlU3R5bGUgOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLkNpcmNsZS5wcm90b3R5cGUuX3VwZGF0ZVN0eWxlLmNhbGwodGhpcyk7XHJcblx0XHR0aGlzLnNldFJhZGl1cyh0aGlzLm9wdGlvbnMucmFkaXVzKTtcclxuXHR9LFxyXG5cclxuXHRzZXRMYXRMbmc6IGZ1bmN0aW9uIChsYXRsbmcpIHtcclxuXHRcdEwuQ2lyY2xlLnByb3RvdHlwZS5zZXRMYXRMbmcuY2FsbCh0aGlzLCBsYXRsbmcpO1xyXG5cdFx0aWYgKHRoaXMuX3BvcHVwICYmIHRoaXMuX3BvcHVwLl9pc09wZW4pIHtcclxuXHRcdFx0dGhpcy5fcG9wdXAuc2V0TGF0TG5nKGxhdGxuZyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRzZXRSYWRpdXM6IGZ1bmN0aW9uIChyYWRpdXMpIHtcclxuXHRcdHRoaXMub3B0aW9ucy5yYWRpdXMgPSB0aGlzLl9yYWRpdXMgPSByYWRpdXM7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWRyYXcoKTtcclxuXHR9LFxyXG5cclxuXHRnZXRSYWRpdXM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9yYWRpdXM7XHJcblx0fVxyXG59KTtcclxuXHJcbkwuY2lyY2xlTWFya2VyID0gZnVuY3Rpb24gKGxhdGxuZywgb3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5DaXJjbGVNYXJrZXIobGF0bG5nLCBvcHRpb25zKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBFeHRlbmRzIEwuUG9seWxpbmUgdG8gYmUgYWJsZSB0byBtYW51YWxseSBkZXRlY3QgY2xpY2tzIG9uIENhbnZhcy1yZW5kZXJlZCBwb2x5bGluZXMuXHJcbiAqL1xyXG5cclxuTC5Qb2x5bGluZS5pbmNsdWRlKCFMLlBhdGguQ0FOVkFTID8ge30gOiB7XHJcblx0X2NvbnRhaW5zUG9pbnQ6IGZ1bmN0aW9uIChwLCBjbG9zZWQpIHtcclxuXHRcdHZhciBpLCBqLCBrLCBsZW4sIGxlbjIsIGRpc3QsIHBhcnQsXHJcblx0XHQgICAgdyA9IHRoaXMub3B0aW9ucy53ZWlnaHQgLyAyO1xyXG5cclxuXHRcdGlmIChMLkJyb3dzZXIudG91Y2gpIHtcclxuXHRcdFx0dyArPSAxMDsgLy8gcG9seWxpbmUgY2xpY2sgdG9sZXJhbmNlIG9uIHRvdWNoIGRldmljZXNcclxuXHRcdH1cclxuXHJcblx0XHRmb3IgKGkgPSAwLCBsZW4gPSB0aGlzLl9wYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRwYXJ0ID0gdGhpcy5fcGFydHNbaV07XHJcblx0XHRcdGZvciAoaiA9IDAsIGxlbjIgPSBwYXJ0Lmxlbmd0aCwgayA9IGxlbjIgLSAxOyBqIDwgbGVuMjsgayA9IGorKykge1xyXG5cdFx0XHRcdGlmICghY2xvc2VkICYmIChqID09PSAwKSkge1xyXG5cdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRkaXN0ID0gTC5MaW5lVXRpbC5wb2ludFRvU2VnbWVudERpc3RhbmNlKHAsIHBhcnRba10sIHBhcnRbal0pO1xyXG5cclxuXHRcdFx0XHRpZiAoZGlzdCA8PSB3KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEV4dGVuZHMgTC5Qb2x5Z29uIHRvIGJlIGFibGUgdG8gbWFudWFsbHkgZGV0ZWN0IGNsaWNrcyBvbiBDYW52YXMtcmVuZGVyZWQgcG9seWdvbnMuXHJcbiAqL1xyXG5cclxuTC5Qb2x5Z29uLmluY2x1ZGUoIUwuUGF0aC5DQU5WQVMgPyB7fSA6IHtcclxuXHRfY29udGFpbnNQb2ludDogZnVuY3Rpb24gKHApIHtcclxuXHRcdHZhciBpbnNpZGUgPSBmYWxzZSxcclxuXHRcdCAgICBwYXJ0LCBwMSwgcDIsXHJcblx0XHQgICAgaSwgaiwgayxcclxuXHRcdCAgICBsZW4sIGxlbjI7XHJcblxyXG5cdFx0Ly8gVE9ETyBvcHRpbWl6YXRpb246IGNoZWNrIGlmIHdpdGhpbiBib3VuZHMgZmlyc3RcclxuXHJcblx0XHRpZiAoTC5Qb2x5bGluZS5wcm90b3R5cGUuX2NvbnRhaW5zUG9pbnQuY2FsbCh0aGlzLCBwLCB0cnVlKSkge1xyXG5cdFx0XHQvLyBjbGljayBvbiBwb2x5Z29uIGJvcmRlclxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyByYXkgY2FzdGluZyBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBpZiBwb2ludCBpcyBpbiBwb2x5Z29uXHJcblxyXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gdGhpcy5fcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0cGFydCA9IHRoaXMuX3BhcnRzW2ldO1xyXG5cclxuXHRcdFx0Zm9yIChqID0gMCwgbGVuMiA9IHBhcnQubGVuZ3RoLCBrID0gbGVuMiAtIDE7IGogPCBsZW4yOyBrID0gaisrKSB7XHJcblx0XHRcdFx0cDEgPSBwYXJ0W2pdO1xyXG5cdFx0XHRcdHAyID0gcGFydFtrXTtcclxuXHJcblx0XHRcdFx0aWYgKCgocDEueSA+IHAueSkgIT09IChwMi55ID4gcC55KSkgJiZcclxuXHRcdFx0XHRcdFx0KHAueCA8IChwMi54IC0gcDEueCkgKiAocC55IC0gcDEueSkgLyAocDIueSAtIHAxLnkpICsgcDEueCkpIHtcclxuXHRcdFx0XHRcdGluc2lkZSA9ICFpbnNpZGU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGluc2lkZTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEV4dGVuZHMgTC5DaXJjbGUgd2l0aCBDYW52YXMtc3BlY2lmaWMgY29kZS5cclxuICovXHJcblxyXG5MLkNpcmNsZS5pbmNsdWRlKCFMLlBhdGguQ0FOVkFTID8ge30gOiB7XHJcblx0X2RyYXdQYXRoOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgcCA9IHRoaXMuX3BvaW50O1xyXG5cdFx0dGhpcy5fY3R4LmJlZ2luUGF0aCgpO1xyXG5cdFx0dGhpcy5fY3R4LmFyYyhwLngsIHAueSwgdGhpcy5fcmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xyXG5cdH0sXHJcblxyXG5cdF9jb250YWluc1BvaW50OiBmdW5jdGlvbiAocCkge1xyXG5cdFx0dmFyIGNlbnRlciA9IHRoaXMuX3BvaW50LFxyXG5cdFx0ICAgIHcyID0gdGhpcy5vcHRpb25zLnN0cm9rZSA/IHRoaXMub3B0aW9ucy53ZWlnaHQgLyAyIDogMDtcclxuXHJcblx0XHRyZXR1cm4gKHAuZGlzdGFuY2VUbyhjZW50ZXIpIDw9IHRoaXMuX3JhZGl1cyArIHcyKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbiAqIENpcmNsZU1hcmtlciBjYW52YXMgc3BlY2lmaWMgZHJhd2luZyBwYXJ0cy5cclxuICovXHJcblxyXG5MLkNpcmNsZU1hcmtlci5pbmNsdWRlKCFMLlBhdGguQ0FOVkFTID8ge30gOiB7XHJcblx0X3VwZGF0ZVN0eWxlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLlBhdGgucHJvdG90eXBlLl91cGRhdGVTdHlsZS5jYWxsKHRoaXMpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLypcclxuICogTC5HZW9KU09OIHR1cm5zIGFueSBHZW9KU09OIGRhdGEgaW50byBhIExlYWZsZXQgbGF5ZXIuXHJcbiAqL1xyXG5cclxuTC5HZW9KU09OID0gTC5GZWF0dXJlR3JvdXAuZXh0ZW5kKHtcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGdlb2pzb24sIG9wdGlvbnMpIHtcclxuXHRcdEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuXHJcblx0XHR0aGlzLl9sYXllcnMgPSB7fTtcclxuXHJcblx0XHRpZiAoZ2VvanNvbikge1xyXG5cdFx0XHR0aGlzLmFkZERhdGEoZ2VvanNvbik7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0YWRkRGF0YTogZnVuY3Rpb24gKGdlb2pzb24pIHtcclxuXHRcdHZhciBmZWF0dXJlcyA9IEwuVXRpbC5pc0FycmF5KGdlb2pzb24pID8gZ2VvanNvbiA6IGdlb2pzb24uZmVhdHVyZXMsXHJcblx0XHQgICAgaSwgbGVuLCBmZWF0dXJlO1xyXG5cclxuXHRcdGlmIChmZWF0dXJlcykge1xyXG5cdFx0XHRmb3IgKGkgPSAwLCBsZW4gPSBmZWF0dXJlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdC8vIE9ubHkgYWRkIHRoaXMgaWYgZ2VvbWV0cnkgb3IgZ2VvbWV0cmllcyBhcmUgc2V0IGFuZCBub3QgbnVsbFxyXG5cdFx0XHRcdGZlYXR1cmUgPSBmZWF0dXJlc1tpXTtcclxuXHRcdFx0XHRpZiAoZmVhdHVyZS5nZW9tZXRyaWVzIHx8IGZlYXR1cmUuZ2VvbWV0cnkgfHwgZmVhdHVyZS5mZWF0dXJlcyB8fCBmZWF0dXJlLmNvb3JkaW5hdGVzKSB7XHJcblx0XHRcdFx0XHR0aGlzLmFkZERhdGEoZmVhdHVyZXNbaV0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcclxuXHJcblx0XHRpZiAob3B0aW9ucy5maWx0ZXIgJiYgIW9wdGlvbnMuZmlsdGVyKGdlb2pzb24pKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciBsYXllciA9IEwuR2VvSlNPTi5nZW9tZXRyeVRvTGF5ZXIoZ2VvanNvbiwgb3B0aW9ucy5wb2ludFRvTGF5ZXIsIG9wdGlvbnMuY29vcmRzVG9MYXRMbmcsIG9wdGlvbnMpO1xyXG5cdFx0bGF5ZXIuZmVhdHVyZSA9IEwuR2VvSlNPTi5hc0ZlYXR1cmUoZ2VvanNvbik7XHJcblxyXG5cdFx0bGF5ZXIuZGVmYXVsdE9wdGlvbnMgPSBsYXllci5vcHRpb25zO1xyXG5cdFx0dGhpcy5yZXNldFN0eWxlKGxheWVyKTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy5vbkVhY2hGZWF0dXJlKSB7XHJcblx0XHRcdG9wdGlvbnMub25FYWNoRmVhdHVyZShnZW9qc29uLCBsYXllcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuYWRkTGF5ZXIobGF5ZXIpO1xyXG5cdH0sXHJcblxyXG5cdHJlc2V0U3R5bGU6IGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0dmFyIHN0eWxlID0gdGhpcy5vcHRpb25zLnN0eWxlO1xyXG5cdFx0aWYgKHN0eWxlKSB7XHJcblx0XHRcdC8vIHJlc2V0IGFueSBjdXN0b20gc3R5bGVzXHJcblx0XHRcdEwuVXRpbC5leHRlbmQobGF5ZXIub3B0aW9ucywgbGF5ZXIuZGVmYXVsdE9wdGlvbnMpO1xyXG5cclxuXHRcdFx0dGhpcy5fc2V0TGF5ZXJTdHlsZShsYXllciwgc3R5bGUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdHNldFN0eWxlOiBmdW5jdGlvbiAoc3R5bGUpIHtcclxuXHRcdHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0XHR0aGlzLl9zZXRMYXllclN0eWxlKGxheWVyLCBzdHlsZSk7XHJcblx0XHR9LCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRfc2V0TGF5ZXJTdHlsZTogZnVuY3Rpb24gKGxheWVyLCBzdHlsZSkge1xyXG5cdFx0aWYgKHR5cGVvZiBzdHlsZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRzdHlsZSA9IHN0eWxlKGxheWVyLmZlYXR1cmUpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGxheWVyLnNldFN0eWxlKSB7XHJcblx0XHRcdGxheWVyLnNldFN0eWxlKHN0eWxlKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTC5leHRlbmQoTC5HZW9KU09OLCB7XHJcblx0Z2VvbWV0cnlUb0xheWVyOiBmdW5jdGlvbiAoZ2VvanNvbiwgcG9pbnRUb0xheWVyLCBjb29yZHNUb0xhdExuZywgdmVjdG9yT3B0aW9ucykge1xyXG5cdFx0dmFyIGdlb21ldHJ5ID0gZ2VvanNvbi50eXBlID09PSAnRmVhdHVyZScgPyBnZW9qc29uLmdlb21ldHJ5IDogZ2VvanNvbixcclxuXHRcdCAgICBjb29yZHMgPSBnZW9tZXRyeS5jb29yZGluYXRlcyxcclxuXHRcdCAgICBsYXllcnMgPSBbXSxcclxuXHRcdCAgICBsYXRsbmcsIGxhdGxuZ3MsIGksIGxlbjtcclxuXHJcblx0XHRjb29yZHNUb0xhdExuZyA9IGNvb3Jkc1RvTGF0TG5nIHx8IHRoaXMuY29vcmRzVG9MYXRMbmc7XHJcblxyXG5cdFx0c3dpdGNoIChnZW9tZXRyeS50eXBlKSB7XHJcblx0XHRjYXNlICdQb2ludCc6XHJcblx0XHRcdGxhdGxuZyA9IGNvb3Jkc1RvTGF0TG5nKGNvb3Jkcyk7XHJcblx0XHRcdHJldHVybiBwb2ludFRvTGF5ZXIgPyBwb2ludFRvTGF5ZXIoZ2VvanNvbiwgbGF0bG5nKSA6IG5ldyBMLk1hcmtlcihsYXRsbmcpO1xyXG5cclxuXHRcdGNhc2UgJ011bHRpUG9pbnQnOlxyXG5cdFx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjb29yZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0XHRsYXRsbmcgPSBjb29yZHNUb0xhdExuZyhjb29yZHNbaV0pO1xyXG5cdFx0XHRcdGxheWVycy5wdXNoKHBvaW50VG9MYXllciA/IHBvaW50VG9MYXllcihnZW9qc29uLCBsYXRsbmcpIDogbmV3IEwuTWFya2VyKGxhdGxuZykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBuZXcgTC5GZWF0dXJlR3JvdXAobGF5ZXJzKTtcclxuXHJcblx0XHRjYXNlICdMaW5lU3RyaW5nJzpcclxuXHRcdFx0bGF0bG5ncyA9IHRoaXMuY29vcmRzVG9MYXRMbmdzKGNvb3JkcywgMCwgY29vcmRzVG9MYXRMbmcpO1xyXG5cdFx0XHRyZXR1cm4gbmV3IEwuUG9seWxpbmUobGF0bG5ncywgdmVjdG9yT3B0aW9ucyk7XHJcblxyXG5cdFx0Y2FzZSAnUG9seWdvbic6XHJcblx0XHRcdGlmIChjb29yZHMubGVuZ3RoID09PSAyICYmICFjb29yZHNbMV0ubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEdlb0pTT04gb2JqZWN0LicpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGxhdGxuZ3MgPSB0aGlzLmNvb3Jkc1RvTGF0TG5ncyhjb29yZHMsIDEsIGNvb3Jkc1RvTGF0TG5nKTtcclxuXHRcdFx0cmV0dXJuIG5ldyBMLlBvbHlnb24obGF0bG5ncywgdmVjdG9yT3B0aW9ucyk7XHJcblxyXG5cdFx0Y2FzZSAnTXVsdGlMaW5lU3RyaW5nJzpcclxuXHRcdFx0bGF0bG5ncyA9IHRoaXMuY29vcmRzVG9MYXRMbmdzKGNvb3JkcywgMSwgY29vcmRzVG9MYXRMbmcpO1xyXG5cdFx0XHRyZXR1cm4gbmV3IEwuTXVsdGlQb2x5bGluZShsYXRsbmdzLCB2ZWN0b3JPcHRpb25zKTtcclxuXHJcblx0XHRjYXNlICdNdWx0aVBvbHlnb24nOlxyXG5cdFx0XHRsYXRsbmdzID0gdGhpcy5jb29yZHNUb0xhdExuZ3MoY29vcmRzLCAyLCBjb29yZHNUb0xhdExuZyk7XHJcblx0XHRcdHJldHVybiBuZXcgTC5NdWx0aVBvbHlnb24obGF0bG5ncywgdmVjdG9yT3B0aW9ucyk7XHJcblxyXG5cdFx0Y2FzZSAnR2VvbWV0cnlDb2xsZWN0aW9uJzpcclxuXHRcdFx0Zm9yIChpID0gMCwgbGVuID0gZ2VvbWV0cnkuZ2VvbWV0cmllcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cclxuXHRcdFx0XHRsYXllcnMucHVzaCh0aGlzLmdlb21ldHJ5VG9MYXllcih7XHJcblx0XHRcdFx0XHRnZW9tZXRyeTogZ2VvbWV0cnkuZ2VvbWV0cmllc1tpXSxcclxuXHRcdFx0XHRcdHR5cGU6ICdGZWF0dXJlJyxcclxuXHRcdFx0XHRcdHByb3BlcnRpZXM6IGdlb2pzb24ucHJvcGVydGllc1xyXG5cdFx0XHRcdH0sIHBvaW50VG9MYXllciwgY29vcmRzVG9MYXRMbmcsIHZlY3Rvck9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbmV3IEwuRmVhdHVyZUdyb3VwKGxheWVycyk7XHJcblxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEdlb0pTT04gb2JqZWN0LicpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNvb3Jkc1RvTGF0TG5nOiBmdW5jdGlvbiAoY29vcmRzKSB7IC8vIChBcnJheVssIEJvb2xlYW5dKSAtPiBMYXRMbmdcclxuXHRcdHJldHVybiBuZXcgTC5MYXRMbmcoY29vcmRzWzFdLCBjb29yZHNbMF0sIGNvb3Jkc1syXSk7XHJcblx0fSxcclxuXHJcblx0Y29vcmRzVG9MYXRMbmdzOiBmdW5jdGlvbiAoY29vcmRzLCBsZXZlbHNEZWVwLCBjb29yZHNUb0xhdExuZykgeyAvLyAoQXJyYXlbLCBOdW1iZXIsIEZ1bmN0aW9uXSkgLT4gQXJyYXlcclxuXHRcdHZhciBsYXRsbmcsIGksIGxlbixcclxuXHRcdCAgICBsYXRsbmdzID0gW107XHJcblxyXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY29vcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGxhdGxuZyA9IGxldmVsc0RlZXAgP1xyXG5cdFx0XHQgICAgICAgIHRoaXMuY29vcmRzVG9MYXRMbmdzKGNvb3Jkc1tpXSwgbGV2ZWxzRGVlcCAtIDEsIGNvb3Jkc1RvTGF0TG5nKSA6XHJcblx0XHRcdCAgICAgICAgKGNvb3Jkc1RvTGF0TG5nIHx8IHRoaXMuY29vcmRzVG9MYXRMbmcpKGNvb3Jkc1tpXSk7XHJcblxyXG5cdFx0XHRsYXRsbmdzLnB1c2gobGF0bG5nKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbGF0bG5ncztcclxuXHR9LFxyXG5cclxuXHRsYXRMbmdUb0Nvb3JkczogZnVuY3Rpb24gKGxhdGxuZykge1xyXG5cdFx0dmFyIGNvb3JkcyA9IFtsYXRsbmcubG5nLCBsYXRsbmcubGF0XTtcclxuXHJcblx0XHRpZiAobGF0bG5nLmFsdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGNvb3Jkcy5wdXNoKGxhdGxuZy5hbHQpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGNvb3JkcztcclxuXHR9LFxyXG5cclxuXHRsYXRMbmdzVG9Db29yZHM6IGZ1bmN0aW9uIChsYXRMbmdzKSB7XHJcblx0XHR2YXIgY29vcmRzID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGxlbiA9IGxhdExuZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuXHRcdFx0Y29vcmRzLnB1c2goTC5HZW9KU09OLmxhdExuZ1RvQ29vcmRzKGxhdExuZ3NbaV0pKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY29vcmRzO1xyXG5cdH0sXHJcblxyXG5cdGdldEZlYXR1cmU6IGZ1bmN0aW9uIChsYXllciwgbmV3R2VvbWV0cnkpIHtcclxuXHRcdHJldHVybiBsYXllci5mZWF0dXJlID8gTC5leHRlbmQoe30sIGxheWVyLmZlYXR1cmUsIHtnZW9tZXRyeTogbmV3R2VvbWV0cnl9KSA6IEwuR2VvSlNPTi5hc0ZlYXR1cmUobmV3R2VvbWV0cnkpO1xyXG5cdH0sXHJcblxyXG5cdGFzRmVhdHVyZTogZnVuY3Rpb24gKGdlb0pTT04pIHtcclxuXHRcdGlmIChnZW9KU09OLnR5cGUgPT09ICdGZWF0dXJlJykge1xyXG5cdFx0XHRyZXR1cm4gZ2VvSlNPTjtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0eXBlOiAnRmVhdHVyZScsXHJcblx0XHRcdHByb3BlcnRpZXM6IHt9LFxyXG5cdFx0XHRnZW9tZXRyeTogZ2VvSlNPTlxyXG5cdFx0fTtcclxuXHR9XHJcbn0pO1xyXG5cclxudmFyIFBvaW50VG9HZW9KU09OID0ge1xyXG5cdHRvR2VvSlNPTjogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIEwuR2VvSlNPTi5nZXRGZWF0dXJlKHRoaXMsIHtcclxuXHRcdFx0dHlwZTogJ1BvaW50JyxcclxuXHRcdFx0Y29vcmRpbmF0ZXM6IEwuR2VvSlNPTi5sYXRMbmdUb0Nvb3Jkcyh0aGlzLmdldExhdExuZygpKVxyXG5cdFx0fSk7XHJcblx0fVxyXG59O1xyXG5cclxuTC5NYXJrZXIuaW5jbHVkZShQb2ludFRvR2VvSlNPTik7XHJcbkwuQ2lyY2xlLmluY2x1ZGUoUG9pbnRUb0dlb0pTT04pO1xyXG5MLkNpcmNsZU1hcmtlci5pbmNsdWRlKFBvaW50VG9HZW9KU09OKTtcclxuXHJcbkwuUG9seWxpbmUuaW5jbHVkZSh7XHJcblx0dG9HZW9KU09OOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gTC5HZW9KU09OLmdldEZlYXR1cmUodGhpcywge1xyXG5cdFx0XHR0eXBlOiAnTGluZVN0cmluZycsXHJcblx0XHRcdGNvb3JkaW5hdGVzOiBMLkdlb0pTT04ubGF0TG5nc1RvQ29vcmRzKHRoaXMuZ2V0TGF0TG5ncygpKVxyXG5cdFx0fSk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwuUG9seWdvbi5pbmNsdWRlKHtcclxuXHR0b0dlb0pTT046IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBjb29yZHMgPSBbTC5HZW9KU09OLmxhdExuZ3NUb0Nvb3Jkcyh0aGlzLmdldExhdExuZ3MoKSldLFxyXG5cdFx0ICAgIGksIGxlbiwgaG9sZTtcclxuXHJcblx0XHRjb29yZHNbMF0ucHVzaChjb29yZHNbMF1bMF0pO1xyXG5cclxuXHRcdGlmICh0aGlzLl9ob2xlcykge1xyXG5cdFx0XHRmb3IgKGkgPSAwLCBsZW4gPSB0aGlzLl9ob2xlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRcdGhvbGUgPSBMLkdlb0pTT04ubGF0TG5nc1RvQ29vcmRzKHRoaXMuX2hvbGVzW2ldKTtcclxuXHRcdFx0XHRob2xlLnB1c2goaG9sZVswXSk7XHJcblx0XHRcdFx0Y29vcmRzLnB1c2goaG9sZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTC5HZW9KU09OLmdldEZlYXR1cmUodGhpcywge1xyXG5cdFx0XHR0eXBlOiAnUG9seWdvbicsXHJcblx0XHRcdGNvb3JkaW5hdGVzOiBjb29yZHNcclxuXHRcdH0pO1xyXG5cdH1cclxufSk7XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG5cdGZ1bmN0aW9uIG11bHRpVG9HZW9KU09OKHR5cGUpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciBjb29yZHMgPSBbXTtcclxuXHJcblx0XHRcdHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uIChsYXllcikge1xyXG5cdFx0XHRcdGNvb3Jkcy5wdXNoKGxheWVyLnRvR2VvSlNPTigpLmdlb21ldHJ5LmNvb3JkaW5hdGVzKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gTC5HZW9KU09OLmdldEZlYXR1cmUodGhpcywge1xyXG5cdFx0XHRcdHR5cGU6IHR5cGUsXHJcblx0XHRcdFx0Y29vcmRpbmF0ZXM6IGNvb3Jkc1xyXG5cdFx0XHR9KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRMLk11bHRpUG9seWxpbmUuaW5jbHVkZSh7dG9HZW9KU09OOiBtdWx0aVRvR2VvSlNPTignTXVsdGlMaW5lU3RyaW5nJyl9KTtcclxuXHRMLk11bHRpUG9seWdvbi5pbmNsdWRlKHt0b0dlb0pTT046IG11bHRpVG9HZW9KU09OKCdNdWx0aVBvbHlnb24nKX0pO1xyXG5cclxuXHRMLkxheWVyR3JvdXAuaW5jbHVkZSh7XHJcblx0XHR0b0dlb0pTT046IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdHZhciBnZW9tZXRyeSA9IHRoaXMuZmVhdHVyZSAmJiB0aGlzLmZlYXR1cmUuZ2VvbWV0cnksXHJcblx0XHRcdFx0anNvbnMgPSBbXSxcclxuXHRcdFx0XHRqc29uO1xyXG5cclxuXHRcdFx0aWYgKGdlb21ldHJ5ICYmIGdlb21ldHJ5LnR5cGUgPT09ICdNdWx0aVBvaW50Jykge1xyXG5cdFx0XHRcdHJldHVybiBtdWx0aVRvR2VvSlNPTignTXVsdGlQb2ludCcpLmNhbGwodGhpcyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBpc0dlb21ldHJ5Q29sbGVjdGlvbiA9IGdlb21ldHJ5ICYmIGdlb21ldHJ5LnR5cGUgPT09ICdHZW9tZXRyeUNvbGxlY3Rpb24nO1xyXG5cclxuXHRcdFx0dGhpcy5lYWNoTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHRcdFx0aWYgKGxheWVyLnRvR2VvSlNPTikge1xyXG5cdFx0XHRcdFx0anNvbiA9IGxheWVyLnRvR2VvSlNPTigpO1xyXG5cdFx0XHRcdFx0anNvbnMucHVzaChpc0dlb21ldHJ5Q29sbGVjdGlvbiA/IGpzb24uZ2VvbWV0cnkgOiBMLkdlb0pTT04uYXNGZWF0dXJlKGpzb24pKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cclxuXHRcdFx0aWYgKGlzR2VvbWV0cnlDb2xsZWN0aW9uKSB7XHJcblx0XHRcdFx0cmV0dXJuIEwuR2VvSlNPTi5nZXRGZWF0dXJlKHRoaXMsIHtcclxuXHRcdFx0XHRcdGdlb21ldHJpZXM6IGpzb25zLFxyXG5cdFx0XHRcdFx0dHlwZTogJ0dlb21ldHJ5Q29sbGVjdGlvbidcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxyXG5cdFx0XHRcdGZlYXR1cmVzOiBqc29uc1xyXG5cdFx0XHR9O1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59KCkpO1xyXG5cclxuTC5nZW9Kc29uID0gZnVuY3Rpb24gKGdlb2pzb24sIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuR2VvSlNPTihnZW9qc29uLCBvcHRpb25zKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkRvbUV2ZW50IGNvbnRhaW5zIGZ1bmN0aW9ucyBmb3Igd29ya2luZyB3aXRoIERPTSBldmVudHMuXHJcbiAqL1xyXG5cclxuTC5Eb21FdmVudCA9IHtcclxuXHQvKiBpbnNwaXJlZCBieSBKb2huIFJlc2lnLCBEZWFuIEVkd2FyZHMgYW5kIFlVSSBhZGRFdmVudCBpbXBsZW1lbnRhdGlvbnMgKi9cclxuXHRhZGRMaXN0ZW5lcjogZnVuY3Rpb24gKG9iaiwgdHlwZSwgZm4sIGNvbnRleHQpIHsgLy8gKEhUTUxFbGVtZW50LCBTdHJpbmcsIEZ1bmN0aW9uWywgT2JqZWN0XSlcclxuXHJcblx0XHR2YXIgaWQgPSBMLnN0YW1wKGZuKSxcclxuXHRcdCAgICBrZXkgPSAnX2xlYWZsZXRfJyArIHR5cGUgKyBpZCxcclxuXHRcdCAgICBoYW5kbGVyLCBvcmlnaW5hbEhhbmRsZXIsIG5ld1R5cGU7XHJcblxyXG5cdFx0aWYgKG9ialtrZXldKSB7IHJldHVybiB0aGlzOyB9XHJcblxyXG5cdFx0aGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdHJldHVybiBmbi5jYWxsKGNvbnRleHQgfHwgb2JqLCBlIHx8IEwuRG9tRXZlbnQuX2dldEV2ZW50KCkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRpZiAoTC5Ccm93c2VyLnBvaW50ZXIgJiYgdHlwZS5pbmRleE9mKCd0b3VjaCcpID09PSAwKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmFkZFBvaW50ZXJMaXN0ZW5lcihvYmosIHR5cGUsIGhhbmRsZXIsIGlkKTtcclxuXHRcdH1cclxuXHRcdGlmIChMLkJyb3dzZXIudG91Y2ggJiYgKHR5cGUgPT09ICdkYmxjbGljaycpICYmIHRoaXMuYWRkRG91YmxlVGFwTGlzdGVuZXIpIHtcclxuXHRcdFx0dGhpcy5hZGREb3VibGVUYXBMaXN0ZW5lcihvYmosIGhhbmRsZXIsIGlkKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoJ2FkZEV2ZW50TGlzdGVuZXInIGluIG9iaikge1xyXG5cclxuXHRcdFx0aWYgKHR5cGUgPT09ICdtb3VzZXdoZWVsJykge1xyXG5cdFx0XHRcdG9iai5hZGRFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIGhhbmRsZXIsIGZhbHNlKTtcclxuXHRcdFx0XHRvYmouYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCh0eXBlID09PSAnbW91c2VlbnRlcicpIHx8ICh0eXBlID09PSAnbW91c2VsZWF2ZScpKSB7XHJcblxyXG5cdFx0XHRcdG9yaWdpbmFsSGFuZGxlciA9IGhhbmRsZXI7XHJcblx0XHRcdFx0bmV3VHlwZSA9ICh0eXBlID09PSAnbW91c2VlbnRlcicgPyAnbW91c2VvdmVyJyA6ICdtb3VzZW91dCcpO1xyXG5cclxuXHRcdFx0XHRoYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0XHRcdGlmICghTC5Eb21FdmVudC5fY2hlY2tNb3VzZShvYmosIGUpKSB7IHJldHVybjsgfVxyXG5cdFx0XHRcdFx0cmV0dXJuIG9yaWdpbmFsSGFuZGxlcihlKTtcclxuXHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRvYmouYWRkRXZlbnRMaXN0ZW5lcihuZXdUeXBlLCBoYW5kbGVyLCBmYWxzZSk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdjbGljaycgJiYgTC5Ccm93c2VyLmFuZHJvaWQpIHtcclxuXHRcdFx0XHRvcmlnaW5hbEhhbmRsZXIgPSBoYW5kbGVyO1xyXG5cdFx0XHRcdGhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIEwuRG9tRXZlbnQuX2ZpbHRlckNsaWNrKGUsIG9yaWdpbmFsSGFuZGxlcik7XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0b2JqLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdG9iai5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSBpZiAoJ2F0dGFjaEV2ZW50JyBpbiBvYmopIHtcclxuXHRcdFx0b2JqLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCBoYW5kbGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRvYmpba2V5XSA9IGhhbmRsZXI7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlTGlzdGVuZXI6IGZ1bmN0aW9uIChvYmosIHR5cGUsIGZuKSB7ICAvLyAoSFRNTEVsZW1lbnQsIFN0cmluZywgRnVuY3Rpb24pXHJcblxyXG5cdFx0dmFyIGlkID0gTC5zdGFtcChmbiksXHJcblx0XHQgICAga2V5ID0gJ19sZWFmbGV0XycgKyB0eXBlICsgaWQsXHJcblx0XHQgICAgaGFuZGxlciA9IG9ialtrZXldO1xyXG5cclxuXHRcdGlmICghaGFuZGxlcikgeyByZXR1cm4gdGhpczsgfVxyXG5cclxuXHRcdGlmIChMLkJyb3dzZXIucG9pbnRlciAmJiB0eXBlLmluZGV4T2YoJ3RvdWNoJykgPT09IDApIHtcclxuXHRcdFx0dGhpcy5yZW1vdmVQb2ludGVyTGlzdGVuZXIob2JqLCB0eXBlLCBpZCk7XHJcblx0XHR9IGVsc2UgaWYgKEwuQnJvd3Nlci50b3VjaCAmJiAodHlwZSA9PT0gJ2RibGNsaWNrJykgJiYgdGhpcy5yZW1vdmVEb3VibGVUYXBMaXN0ZW5lcikge1xyXG5cdFx0XHR0aGlzLnJlbW92ZURvdWJsZVRhcExpc3RlbmVyKG9iaiwgaWQpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoJ3JlbW92ZUV2ZW50TGlzdGVuZXInIGluIG9iaikge1xyXG5cclxuXHRcdFx0aWYgKHR5cGUgPT09ICdtb3VzZXdoZWVsJykge1xyXG5cdFx0XHRcdG9iai5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIGhhbmRsZXIsIGZhbHNlKTtcclxuXHRcdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCh0eXBlID09PSAnbW91c2VlbnRlcicpIHx8ICh0eXBlID09PSAnbW91c2VsZWF2ZScpKSB7XHJcblx0XHRcdFx0b2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIoKHR5cGUgPT09ICdtb3VzZWVudGVyJyA/ICdtb3VzZW92ZXInIDogJ21vdXNlb3V0JyksIGhhbmRsZXIsIGZhbHNlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoJ2RldGFjaEV2ZW50JyBpbiBvYmopIHtcclxuXHRcdFx0b2JqLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBoYW5kbGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRvYmpba2V5XSA9IG51bGw7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0c3RvcFByb3BhZ2F0aW9uOiBmdW5jdGlvbiAoZSkge1xyXG5cclxuXHRcdGlmIChlLnN0b3BQcm9wYWdhdGlvbikge1xyXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0TC5Eb21FdmVudC5fc2tpcHBlZChlKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRkaXNhYmxlU2Nyb2xsUHJvcGFnYXRpb246IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0dmFyIHN0b3AgPSBMLkRvbUV2ZW50LnN0b3BQcm9wYWdhdGlvbjtcclxuXHJcblx0XHRyZXR1cm4gTC5Eb21FdmVudFxyXG5cdFx0XHQub24oZWwsICdtb3VzZXdoZWVsJywgc3RvcClcclxuXHRcdFx0Lm9uKGVsLCAnTW96TW91c2VQaXhlbFNjcm9sbCcsIHN0b3ApO1xyXG5cdH0sXHJcblxyXG5cdGRpc2FibGVDbGlja1Byb3BhZ2F0aW9uOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdHZhciBzdG9wID0gTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb247XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IEwuRHJhZ2dhYmxlLlNUQVJULmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdEwuRG9tRXZlbnQub24oZWwsIEwuRHJhZ2dhYmxlLlNUQVJUW2ldLCBzdG9wKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gTC5Eb21FdmVudFxyXG5cdFx0XHQub24oZWwsICdjbGljaycsIEwuRG9tRXZlbnQuX2Zha2VTdG9wKVxyXG5cdFx0XHQub24oZWwsICdkYmxjbGljaycsIHN0b3ApO1xyXG5cdH0sXHJcblxyXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbiAoZSkge1xyXG5cclxuXHRcdGlmIChlLnByZXZlbnREZWZhdWx0KSB7XHJcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHN0b3A6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRyZXR1cm4gTC5Eb21FdmVudFxyXG5cdFx0XHQucHJldmVudERlZmF1bHQoZSlcclxuXHRcdFx0LnN0b3BQcm9wYWdhdGlvbihlKTtcclxuXHR9LFxyXG5cclxuXHRnZXRNb3VzZVBvc2l0aW9uOiBmdW5jdGlvbiAoZSwgY29udGFpbmVyKSB7XHJcblx0XHRpZiAoIWNvbnRhaW5lcikge1xyXG5cdFx0XHRyZXR1cm4gbmV3IEwuUG9pbnQoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHRcdHJldHVybiBuZXcgTC5Qb2ludChcclxuXHRcdFx0ZS5jbGllbnRYIC0gcmVjdC5sZWZ0IC0gY29udGFpbmVyLmNsaWVudExlZnQsXHJcblx0XHRcdGUuY2xpZW50WSAtIHJlY3QudG9wIC0gY29udGFpbmVyLmNsaWVudFRvcCk7XHJcblx0fSxcclxuXHJcblx0Z2V0V2hlZWxEZWx0YTogZnVuY3Rpb24gKGUpIHtcclxuXHJcblx0XHR2YXIgZGVsdGEgPSAwO1xyXG5cclxuXHRcdGlmIChlLndoZWVsRGVsdGEpIHtcclxuXHRcdFx0ZGVsdGEgPSBlLndoZWVsRGVsdGEgLyAxMjA7XHJcblx0XHR9XHJcblx0XHRpZiAoZS5kZXRhaWwpIHtcclxuXHRcdFx0ZGVsdGEgPSAtZS5kZXRhaWwgLyAzO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRlbHRhO1xyXG5cdH0sXHJcblxyXG5cdF9za2lwRXZlbnRzOiB7fSxcclxuXHJcblx0X2Zha2VTdG9wOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Ly8gZmFrZXMgc3RvcFByb3BhZ2F0aW9uIGJ5IHNldHRpbmcgYSBzcGVjaWFsIGV2ZW50IGZsYWcsIGNoZWNrZWQvcmVzZXQgd2l0aCBMLkRvbUV2ZW50Ll9za2lwcGVkKGUpXHJcblx0XHRMLkRvbUV2ZW50Ll9za2lwRXZlbnRzW2UudHlwZV0gPSB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdF9za2lwcGVkOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHNraXBwZWQgPSB0aGlzLl9za2lwRXZlbnRzW2UudHlwZV07XHJcblx0XHQvLyByZXNldCB3aGVuIGNoZWNraW5nLCBhcyBpdCdzIG9ubHkgdXNlZCBpbiBtYXAgY29udGFpbmVyIGFuZCBwcm9wYWdhdGVzIG91dHNpZGUgb2YgdGhlIG1hcFxyXG5cdFx0dGhpcy5fc2tpcEV2ZW50c1tlLnR5cGVdID0gZmFsc2U7XHJcblx0XHRyZXR1cm4gc2tpcHBlZDtcclxuXHR9LFxyXG5cclxuXHQvLyBjaGVjayBpZiBlbGVtZW50IHJlYWxseSBsZWZ0L2VudGVyZWQgdGhlIGV2ZW50IHRhcmdldCAoZm9yIG1vdXNlZW50ZXIvbW91c2VsZWF2ZSlcclxuXHRfY2hlY2tNb3VzZTogZnVuY3Rpb24gKGVsLCBlKSB7XHJcblxyXG5cdFx0dmFyIHJlbGF0ZWQgPSBlLnJlbGF0ZWRUYXJnZXQ7XHJcblxyXG5cdFx0aWYgKCFyZWxhdGVkKSB7IHJldHVybiB0cnVlOyB9XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0d2hpbGUgKHJlbGF0ZWQgJiYgKHJlbGF0ZWQgIT09IGVsKSkge1xyXG5cdFx0XHRcdHJlbGF0ZWQgPSByZWxhdGVkLnBhcmVudE5vZGU7XHJcblx0XHRcdH1cclxuXHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gKHJlbGF0ZWQgIT09IGVsKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0RXZlbnQ6IGZ1bmN0aW9uICgpIHsgLy8gZXZpbCBtYWdpYyBmb3IgSUVcclxuXHRcdC8qanNoaW50IG5vYXJnOmZhbHNlICovXHJcblx0XHR2YXIgZSA9IHdpbmRvdy5ldmVudDtcclxuXHRcdGlmICghZSkge1xyXG5cdFx0XHR2YXIgY2FsbGVyID0gYXJndW1lbnRzLmNhbGxlZS5jYWxsZXI7XHJcblx0XHRcdHdoaWxlIChjYWxsZXIpIHtcclxuXHRcdFx0XHRlID0gY2FsbGVyWydhcmd1bWVudHMnXVswXTtcclxuXHRcdFx0XHRpZiAoZSAmJiB3aW5kb3cuRXZlbnQgPT09IGUuY29uc3RydWN0b3IpIHtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjYWxsZXIgPSBjYWxsZXIuY2FsbGVyO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZTtcclxuXHR9LFxyXG5cclxuXHQvLyB0aGlzIGlzIGEgaG9ycmlibGUgd29ya2Fyb3VuZCBmb3IgYSBidWcgaW4gQW5kcm9pZCB3aGVyZSBhIHNpbmdsZSB0b3VjaCB0cmlnZ2VycyB0d28gY2xpY2sgZXZlbnRzXHJcblx0X2ZpbHRlckNsaWNrOiBmdW5jdGlvbiAoZSwgaGFuZGxlcikge1xyXG5cdFx0dmFyIHRpbWVTdGFtcCA9IChlLnRpbWVTdGFtcCB8fCBlLm9yaWdpbmFsRXZlbnQudGltZVN0YW1wKSxcclxuXHRcdFx0ZWxhcHNlZCA9IEwuRG9tRXZlbnQuX2xhc3RDbGljayAmJiAodGltZVN0YW1wIC0gTC5Eb21FdmVudC5fbGFzdENsaWNrKTtcclxuXHJcblx0XHQvLyBhcmUgdGhleSBjbG9zZXIgdG9nZXRoZXIgdGhhbiA1MDBtcyB5ZXQgbW9yZSB0aGFuIDEwMG1zP1xyXG5cdFx0Ly8gQW5kcm9pZCB0eXBpY2FsbHkgdHJpZ2dlcnMgdGhlbSB+MzAwbXMgYXBhcnQgd2hpbGUgbXVsdGlwbGUgbGlzdGVuZXJzXHJcblx0XHQvLyBvbiB0aGUgc2FtZSBldmVudCBzaG91bGQgYmUgdHJpZ2dlcmVkIGZhciBmYXN0ZXI7XHJcblx0XHQvLyBvciBjaGVjayBpZiBjbGljayBpcyBzaW11bGF0ZWQgb24gdGhlIGVsZW1lbnQsIGFuZCBpZiBpdCBpcywgcmVqZWN0IGFueSBub24tc2ltdWxhdGVkIGV2ZW50c1xyXG5cclxuXHRcdGlmICgoZWxhcHNlZCAmJiBlbGFwc2VkID4gMTAwICYmIGVsYXBzZWQgPCA1MDApIHx8IChlLnRhcmdldC5fc2ltdWxhdGVkQ2xpY2sgJiYgIWUuX3NpbXVsYXRlZCkpIHtcclxuXHRcdFx0TC5Eb21FdmVudC5zdG9wKGUpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRMLkRvbUV2ZW50Ll9sYXN0Q2xpY2sgPSB0aW1lU3RhbXA7XHJcblxyXG5cdFx0cmV0dXJuIGhhbmRsZXIoZSk7XHJcblx0fVxyXG59O1xyXG5cclxuTC5Eb21FdmVudC5vbiA9IEwuRG9tRXZlbnQuYWRkTGlzdGVuZXI7XHJcbkwuRG9tRXZlbnQub2ZmID0gTC5Eb21FdmVudC5yZW1vdmVMaXN0ZW5lcjtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkRyYWdnYWJsZSBhbGxvd3MgeW91IHRvIGFkZCBkcmFnZ2luZyBjYXBhYmlsaXRpZXMgdG8gYW55IGVsZW1lbnQuIFN1cHBvcnRzIG1vYmlsZSBkZXZpY2VzIHRvby5cclxuICovXHJcblxyXG5MLkRyYWdnYWJsZSA9IEwuQ2xhc3MuZXh0ZW5kKHtcclxuXHRpbmNsdWRlczogTC5NaXhpbi5FdmVudHMsXHJcblxyXG5cdHN0YXRpY3M6IHtcclxuXHRcdFNUQVJUOiBMLkJyb3dzZXIudG91Y2ggPyBbJ3RvdWNoc3RhcnQnLCAnbW91c2Vkb3duJ10gOiBbJ21vdXNlZG93biddLFxyXG5cdFx0RU5EOiB7XHJcblx0XHRcdG1vdXNlZG93bjogJ21vdXNldXAnLFxyXG5cdFx0XHR0b3VjaHN0YXJ0OiAndG91Y2hlbmQnLFxyXG5cdFx0XHRwb2ludGVyZG93bjogJ3RvdWNoZW5kJyxcclxuXHRcdFx0TVNQb2ludGVyRG93bjogJ3RvdWNoZW5kJ1xyXG5cdFx0fSxcclxuXHRcdE1PVkU6IHtcclxuXHRcdFx0bW91c2Vkb3duOiAnbW91c2Vtb3ZlJyxcclxuXHRcdFx0dG91Y2hzdGFydDogJ3RvdWNobW92ZScsXHJcblx0XHRcdHBvaW50ZXJkb3duOiAndG91Y2htb3ZlJyxcclxuXHRcdFx0TVNQb2ludGVyRG93bjogJ3RvdWNobW92ZSdcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRpbml0aWFsaXplOiBmdW5jdGlvbiAoZWxlbWVudCwgZHJhZ1N0YXJ0VGFyZ2V0KSB7XHJcblx0XHR0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcclxuXHRcdHRoaXMuX2RyYWdTdGFydFRhcmdldCA9IGRyYWdTdGFydFRhcmdldCB8fCBlbGVtZW50O1xyXG5cdH0sXHJcblxyXG5cdGVuYWJsZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX2VuYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IEwuRHJhZ2dhYmxlLlNUQVJULmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdEwuRG9tRXZlbnQub24odGhpcy5fZHJhZ1N0YXJ0VGFyZ2V0LCBMLkRyYWdnYWJsZS5TVEFSVFtpXSwgdGhpcy5fb25Eb3duLCB0aGlzKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9lbmFibGVkID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRkaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX2VuYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IEwuRHJhZ2dhYmxlLlNUQVJULmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdEwuRG9tRXZlbnQub2ZmKHRoaXMuX2RyYWdTdGFydFRhcmdldCwgTC5EcmFnZ2FibGUuU1RBUlRbaV0sIHRoaXMuX29uRG93biwgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZW5hYmxlZCA9IGZhbHNlO1xyXG5cdFx0dGhpcy5fbW92ZWQgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHRfb25Eb3duOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dGhpcy5fbW92ZWQgPSBmYWxzZTtcclxuXHJcblx0XHRpZiAoZS5zaGlmdEtleSB8fCAoKGUud2hpY2ggIT09IDEpICYmIChlLmJ1dHRvbiAhPT0gMSkgJiYgIWUudG91Y2hlcykpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0TC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24oZSk7XHJcblxyXG5cdFx0aWYgKEwuRHJhZ2dhYmxlLl9kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcblx0XHRMLkRvbVV0aWwuZGlzYWJsZUltYWdlRHJhZygpO1xyXG5cdFx0TC5Eb21VdGlsLmRpc2FibGVUZXh0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX21vdmluZykgeyByZXR1cm47IH1cclxuXHJcblx0XHR2YXIgZmlyc3QgPSBlLnRvdWNoZXMgPyBlLnRvdWNoZXNbMF0gOiBlO1xyXG5cclxuXHRcdHRoaXMuX3N0YXJ0UG9pbnQgPSBuZXcgTC5Qb2ludChmaXJzdC5jbGllbnRYLCBmaXJzdC5jbGllbnRZKTtcclxuXHRcdHRoaXMuX3N0YXJ0UG9zID0gdGhpcy5fbmV3UG9zID0gTC5Eb21VdGlsLmdldFBvc2l0aW9uKHRoaXMuX2VsZW1lbnQpO1xyXG5cclxuXHRcdEwuRG9tRXZlbnRcclxuXHRcdCAgICAub24oZG9jdW1lbnQsIEwuRHJhZ2dhYmxlLk1PVkVbZS50eXBlXSwgdGhpcy5fb25Nb3ZlLCB0aGlzKVxyXG5cdFx0ICAgIC5vbihkb2N1bWVudCwgTC5EcmFnZ2FibGUuRU5EW2UudHlwZV0sIHRoaXMuX29uVXAsIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdF9vbk1vdmU6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlcy5sZW5ndGggPiAxKSB7XHJcblx0XHRcdHRoaXMuX21vdmVkID0gdHJ1ZTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBmaXJzdCA9IChlLnRvdWNoZXMgJiYgZS50b3VjaGVzLmxlbmd0aCA9PT0gMSA/IGUudG91Y2hlc1swXSA6IGUpLFxyXG5cdFx0ICAgIG5ld1BvaW50ID0gbmV3IEwuUG9pbnQoZmlyc3QuY2xpZW50WCwgZmlyc3QuY2xpZW50WSksXHJcblx0XHQgICAgb2Zmc2V0ID0gbmV3UG9pbnQuc3VidHJhY3QodGhpcy5fc3RhcnRQb2ludCk7XHJcblxyXG5cdFx0aWYgKCFvZmZzZXQueCAmJiAhb2Zmc2V0LnkpIHsgcmV0dXJuOyB9XHJcblx0XHRpZiAoTC5Ccm93c2VyLnRvdWNoICYmIE1hdGguYWJzKG9mZnNldC54KSArIE1hdGguYWJzKG9mZnNldC55KSA8IDMpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0TC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcclxuXHJcblx0XHRpZiAoIXRoaXMuX21vdmVkKSB7XHJcblx0XHRcdHRoaXMuZmlyZSgnZHJhZ3N0YXJ0Jyk7XHJcblxyXG5cdFx0XHR0aGlzLl9tb3ZlZCA9IHRydWU7XHJcblx0XHRcdHRoaXMuX3N0YXJ0UG9zID0gTC5Eb21VdGlsLmdldFBvc2l0aW9uKHRoaXMuX2VsZW1lbnQpLnN1YnRyYWN0KG9mZnNldCk7XHJcblxyXG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ2xlYWZsZXQtZHJhZ2dpbmcnKTtcclxuXHRcdFx0dGhpcy5fbGFzdFRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX2xhc3RUYXJnZXQsICdsZWFmbGV0LWRyYWctdGFyZ2V0Jyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fbmV3UG9zID0gdGhpcy5fc3RhcnRQb3MuYWRkKG9mZnNldCk7XHJcblx0XHR0aGlzLl9tb3ZpbmcgPSB0cnVlO1xyXG5cclxuXHRcdEwuVXRpbC5jYW5jZWxBbmltRnJhbWUodGhpcy5fYW5pbVJlcXVlc3QpO1xyXG5cdFx0dGhpcy5fYW5pbVJlcXVlc3QgPSBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZSh0aGlzLl91cGRhdGVQb3NpdGlvbiwgdGhpcywgdHJ1ZSwgdGhpcy5fZHJhZ1N0YXJ0VGFyZ2V0KTtcclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlUG9zaXRpb246IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuZmlyZSgncHJlZHJhZycpO1xyXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX2VsZW1lbnQsIHRoaXMuX25ld1Bvcyk7XHJcblx0XHR0aGlzLmZpcmUoJ2RyYWcnKTtcclxuXHR9LFxyXG5cclxuXHRfb25VcDogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICdsZWFmbGV0LWRyYWdnaW5nJyk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xhc3RUYXJnZXQpIHtcclxuXHRcdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX2xhc3RUYXJnZXQsICdsZWFmbGV0LWRyYWctdGFyZ2V0Jyk7XHJcblx0XHRcdHRoaXMuX2xhc3RUYXJnZXQgPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gTC5EcmFnZ2FibGUuTU9WRSkge1xyXG5cdFx0XHRMLkRvbUV2ZW50XHJcblx0XHRcdCAgICAub2ZmKGRvY3VtZW50LCBMLkRyYWdnYWJsZS5NT1ZFW2ldLCB0aGlzLl9vbk1vdmUpXHJcblx0XHRcdCAgICAub2ZmKGRvY3VtZW50LCBMLkRyYWdnYWJsZS5FTkRbaV0sIHRoaXMuX29uVXApO1xyXG5cdFx0fVxyXG5cclxuXHRcdEwuRG9tVXRpbC5lbmFibGVJbWFnZURyYWcoKTtcclxuXHRcdEwuRG9tVXRpbC5lbmFibGVUZXh0U2VsZWN0aW9uKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX21vdmVkICYmIHRoaXMuX21vdmluZykge1xyXG5cdFx0XHQvLyBlbnN1cmUgZHJhZyBpcyBub3QgZmlyZWQgYWZ0ZXIgZHJhZ2VuZFxyXG5cdFx0XHRMLlV0aWwuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX2FuaW1SZXF1ZXN0KTtcclxuXHJcblx0XHRcdHRoaXMuZmlyZSgnZHJhZ2VuZCcsIHtcclxuXHRcdFx0XHRkaXN0YW5jZTogdGhpcy5fbmV3UG9zLmRpc3RhbmNlVG8odGhpcy5fc3RhcnRQb3MpXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX21vdmluZyA9IGZhbHNlO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLypcclxuXHRMLkhhbmRsZXIgaXMgYSBiYXNlIGNsYXNzIGZvciBoYW5kbGVyIGNsYXNzZXMgdGhhdCBhcmUgdXNlZCBpbnRlcm5hbGx5IHRvIGluamVjdFxyXG5cdGludGVyYWN0aW9uIGZlYXR1cmVzIGxpa2UgZHJhZ2dpbmcgdG8gY2xhc3NlcyBsaWtlIE1hcCBhbmQgTWFya2VyLlxyXG4qL1xyXG5cclxuTC5IYW5kbGVyID0gTC5DbGFzcy5leHRlbmQoe1xyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdHRoaXMuX21hcCA9IG1hcDtcclxuXHR9LFxyXG5cclxuXHRlbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9lbmFibGVkKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHRoaXMuX2VuYWJsZWQgPSB0cnVlO1xyXG5cdFx0dGhpcy5hZGRIb29rcygpO1xyXG5cdH0sXHJcblxyXG5cdGRpc2FibGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fZW5hYmxlZCkgeyByZXR1cm47IH1cclxuXHJcblx0XHR0aGlzLl9lbmFibGVkID0gZmFsc2U7XHJcblx0XHR0aGlzLnJlbW92ZUhvb2tzKCk7XHJcblx0fSxcclxuXHJcblx0ZW5hYmxlZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuICEhdGhpcy5fZW5hYmxlZDtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuSGFuZGxlci5NYXBEcmFnIGlzIHVzZWQgdG8gbWFrZSB0aGUgbWFwIGRyYWdnYWJsZSAod2l0aCBwYW5uaW5nIGluZXJ0aWEpLCBlbmFibGVkIGJ5IGRlZmF1bHQuXHJcbiAqL1xyXG5cclxuTC5NYXAubWVyZ2VPcHRpb25zKHtcclxuXHRkcmFnZ2luZzogdHJ1ZSxcclxuXHJcblx0aW5lcnRpYTogIUwuQnJvd3Nlci5hbmRyb2lkMjMsXHJcblx0aW5lcnRpYURlY2VsZXJhdGlvbjogMzQwMCwgLy8gcHgvc14yXHJcblx0aW5lcnRpYU1heFNwZWVkOiBJbmZpbml0eSwgLy8gcHgvc1xyXG5cdGluZXJ0aWFUaHJlc2hvbGQ6IEwuQnJvd3Nlci50b3VjaCA/IDMyIDogMTgsIC8vIG1zXHJcblx0ZWFzZUxpbmVhcml0eTogMC4yNSxcclxuXHJcblx0Ly8gVE9ETyByZWZhY3RvciwgbW92ZSB0byBDUlNcclxuXHR3b3JsZENvcHlKdW1wOiBmYWxzZVxyXG59KTtcclxuXHJcbkwuTWFwLkRyYWcgPSBMLkhhbmRsZXIuZXh0ZW5kKHtcclxuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9kcmFnZ2FibGUpIHtcclxuXHRcdFx0dmFyIG1hcCA9IHRoaXMuX21hcDtcclxuXHJcblx0XHRcdHRoaXMuX2RyYWdnYWJsZSA9IG5ldyBMLkRyYWdnYWJsZShtYXAuX21hcFBhbmUsIG1hcC5fY29udGFpbmVyKTtcclxuXHJcblx0XHRcdHRoaXMuX2RyYWdnYWJsZS5vbih7XHJcblx0XHRcdFx0J2RyYWdzdGFydCc6IHRoaXMuX29uRHJhZ1N0YXJ0LFxyXG5cdFx0XHRcdCdkcmFnJzogdGhpcy5fb25EcmFnLFxyXG5cdFx0XHRcdCdkcmFnZW5kJzogdGhpcy5fb25EcmFnRW5kXHJcblx0XHRcdH0sIHRoaXMpO1xyXG5cclxuXHRcdFx0aWYgKG1hcC5vcHRpb25zLndvcmxkQ29weUp1bXApIHtcclxuXHRcdFx0XHR0aGlzLl9kcmFnZ2FibGUub24oJ3ByZWRyYWcnLCB0aGlzLl9vblByZURyYWcsIHRoaXMpO1xyXG5cdFx0XHRcdG1hcC5vbigndmlld3Jlc2V0JywgdGhpcy5fb25WaWV3UmVzZXQsIHRoaXMpO1xyXG5cclxuXHRcdFx0XHRtYXAud2hlblJlYWR5KHRoaXMuX29uVmlld1Jlc2V0LCB0aGlzKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5fZHJhZ2dhYmxlLmVuYWJsZSgpO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9kcmFnZ2FibGUuZGlzYWJsZSgpO1xyXG5cdH0sXHJcblxyXG5cdG1vdmVkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZHJhZ2dhYmxlICYmIHRoaXMuX2RyYWdnYWJsZS5fbW92ZWQ7XHJcblx0fSxcclxuXHJcblx0X29uRHJhZ1N0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xyXG5cclxuXHRcdGlmIChtYXAuX3BhbkFuaW0pIHtcclxuXHRcdFx0bWFwLl9wYW5BbmltLnN0b3AoKTtcclxuXHRcdH1cclxuXHJcblx0XHRtYXBcclxuXHRcdCAgICAuZmlyZSgnbW92ZXN0YXJ0JylcclxuXHRcdCAgICAuZmlyZSgnZHJhZ3N0YXJ0Jyk7XHJcblxyXG5cdFx0aWYgKG1hcC5vcHRpb25zLmluZXJ0aWEpIHtcclxuXHRcdFx0dGhpcy5fcG9zaXRpb25zID0gW107XHJcblx0XHRcdHRoaXMuX3RpbWVzID0gW107XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X29uRHJhZzogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX21hcC5vcHRpb25zLmluZXJ0aWEpIHtcclxuXHRcdFx0dmFyIHRpbWUgPSB0aGlzLl9sYXN0VGltZSA9ICtuZXcgRGF0ZSgpLFxyXG5cdFx0XHQgICAgcG9zID0gdGhpcy5fbGFzdFBvcyA9IHRoaXMuX2RyYWdnYWJsZS5fbmV3UG9zO1xyXG5cclxuXHRcdFx0dGhpcy5fcG9zaXRpb25zLnB1c2gocG9zKTtcclxuXHRcdFx0dGhpcy5fdGltZXMucHVzaCh0aW1lKTtcclxuXHJcblx0XHRcdGlmICh0aW1lIC0gdGhpcy5fdGltZXNbMF0gPiAyMDApIHtcclxuXHRcdFx0XHR0aGlzLl9wb3NpdGlvbnMuc2hpZnQoKTtcclxuXHRcdFx0XHR0aGlzLl90aW1lcy5zaGlmdCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fbWFwXHJcblx0XHQgICAgLmZpcmUoJ21vdmUnKVxyXG5cdFx0ICAgIC5maXJlKCdkcmFnJyk7XHJcblx0fSxcclxuXHJcblx0X29uVmlld1Jlc2V0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHQvLyBUT0RPIGZpeCBoYXJkY29kZWQgRWFydGggdmFsdWVzXHJcblx0XHR2YXIgcHhDZW50ZXIgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpLl9kaXZpZGVCeSgyKSxcclxuXHRcdCAgICBweFdvcmxkQ2VudGVyID0gdGhpcy5fbWFwLmxhdExuZ1RvTGF5ZXJQb2ludChbMCwgMF0pO1xyXG5cclxuXHRcdHRoaXMuX2luaXRpYWxXb3JsZE9mZnNldCA9IHB4V29ybGRDZW50ZXIuc3VidHJhY3QocHhDZW50ZXIpLng7XHJcblx0XHR0aGlzLl93b3JsZFdpZHRoID0gdGhpcy5fbWFwLnByb2plY3QoWzAsIDE4MF0pLng7XHJcblx0fSxcclxuXHJcblx0X29uUHJlRHJhZzogZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly8gVE9ETyByZWZhY3RvciB0byBiZSBhYmxlIHRvIGFkanVzdCBtYXAgcGFuZSBwb3NpdGlvbiBhZnRlciB6b29tXHJcblx0XHR2YXIgd29ybGRXaWR0aCA9IHRoaXMuX3dvcmxkV2lkdGgsXHJcblx0XHQgICAgaGFsZldpZHRoID0gTWF0aC5yb3VuZCh3b3JsZFdpZHRoIC8gMiksXHJcblx0XHQgICAgZHggPSB0aGlzLl9pbml0aWFsV29ybGRPZmZzZXQsXHJcblx0XHQgICAgeCA9IHRoaXMuX2RyYWdnYWJsZS5fbmV3UG9zLngsXHJcblx0XHQgICAgbmV3WDEgPSAoeCAtIGhhbGZXaWR0aCArIGR4KSAlIHdvcmxkV2lkdGggKyBoYWxmV2lkdGggLSBkeCxcclxuXHRcdCAgICBuZXdYMiA9ICh4ICsgaGFsZldpZHRoICsgZHgpICUgd29ybGRXaWR0aCAtIGhhbGZXaWR0aCAtIGR4LFxyXG5cdFx0ICAgIG5ld1ggPSBNYXRoLmFicyhuZXdYMSArIGR4KSA8IE1hdGguYWJzKG5ld1gyICsgZHgpID8gbmV3WDEgOiBuZXdYMjtcclxuXHJcblx0XHR0aGlzLl9kcmFnZ2FibGUuX25ld1Bvcy54ID0gbmV3WDtcclxuXHR9LFxyXG5cclxuXHRfb25EcmFnRW5kOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICBvcHRpb25zID0gbWFwLm9wdGlvbnMsXHJcblx0XHQgICAgZGVsYXkgPSArbmV3IERhdGUoKSAtIHRoaXMuX2xhc3RUaW1lLFxyXG5cclxuXHRcdCAgICBub0luZXJ0aWEgPSAhb3B0aW9ucy5pbmVydGlhIHx8IGRlbGF5ID4gb3B0aW9ucy5pbmVydGlhVGhyZXNob2xkIHx8ICF0aGlzLl9wb3NpdGlvbnNbMF07XHJcblxyXG5cdFx0bWFwLmZpcmUoJ2RyYWdlbmQnLCBlKTtcclxuXHJcblx0XHRpZiAobm9JbmVydGlhKSB7XHJcblx0XHRcdG1hcC5maXJlKCdtb3ZlZW5kJyk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHZhciBkaXJlY3Rpb24gPSB0aGlzLl9sYXN0UG9zLnN1YnRyYWN0KHRoaXMuX3Bvc2l0aW9uc1swXSksXHJcblx0XHRcdCAgICBkdXJhdGlvbiA9ICh0aGlzLl9sYXN0VGltZSArIGRlbGF5IC0gdGhpcy5fdGltZXNbMF0pIC8gMTAwMCxcclxuXHRcdFx0ICAgIGVhc2UgPSBvcHRpb25zLmVhc2VMaW5lYXJpdHksXHJcblxyXG5cdFx0XHQgICAgc3BlZWRWZWN0b3IgPSBkaXJlY3Rpb24ubXVsdGlwbHlCeShlYXNlIC8gZHVyYXRpb24pLFxyXG5cdFx0XHQgICAgc3BlZWQgPSBzcGVlZFZlY3Rvci5kaXN0YW5jZVRvKFswLCAwXSksXHJcblxyXG5cdFx0XHQgICAgbGltaXRlZFNwZWVkID0gTWF0aC5taW4ob3B0aW9ucy5pbmVydGlhTWF4U3BlZWQsIHNwZWVkKSxcclxuXHRcdFx0ICAgIGxpbWl0ZWRTcGVlZFZlY3RvciA9IHNwZWVkVmVjdG9yLm11bHRpcGx5QnkobGltaXRlZFNwZWVkIC8gc3BlZWQpLFxyXG5cclxuXHRcdFx0ICAgIGRlY2VsZXJhdGlvbkR1cmF0aW9uID0gbGltaXRlZFNwZWVkIC8gKG9wdGlvbnMuaW5lcnRpYURlY2VsZXJhdGlvbiAqIGVhc2UpLFxyXG5cdFx0XHQgICAgb2Zmc2V0ID0gbGltaXRlZFNwZWVkVmVjdG9yLm11bHRpcGx5QnkoLWRlY2VsZXJhdGlvbkR1cmF0aW9uIC8gMikucm91bmQoKTtcclxuXHJcblx0XHRcdGlmICghb2Zmc2V0LnggfHwgIW9mZnNldC55KSB7XHJcblx0XHRcdFx0bWFwLmZpcmUoJ21vdmVlbmQnKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0b2Zmc2V0ID0gbWFwLl9saW1pdE9mZnNldChvZmZzZXQsIG1hcC5vcHRpb25zLm1heEJvdW5kcyk7XHJcblxyXG5cdFx0XHRcdEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdG1hcC5wYW5CeShvZmZzZXQsIHtcclxuXHRcdFx0XHRcdFx0ZHVyYXRpb246IGRlY2VsZXJhdGlvbkR1cmF0aW9uLFxyXG5cdFx0XHRcdFx0XHRlYXNlTGluZWFyaXR5OiBlYXNlLFxyXG5cdFx0XHRcdFx0XHRub01vdmVTdGFydDogdHJ1ZVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTC5NYXAuYWRkSW5pdEhvb2soJ2FkZEhhbmRsZXInLCAnZHJhZ2dpbmcnLCBMLk1hcC5EcmFnKTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkhhbmRsZXIuRG91YmxlQ2xpY2tab29tIGlzIHVzZWQgdG8gaGFuZGxlIGRvdWJsZS1jbGljayB6b29tIG9uIHRoZSBtYXAsIGVuYWJsZWQgYnkgZGVmYXVsdC5cclxuICovXHJcblxyXG5MLk1hcC5tZXJnZU9wdGlvbnMoe1xyXG5cdGRvdWJsZUNsaWNrWm9vbTogdHJ1ZVxyXG59KTtcclxuXHJcbkwuTWFwLkRvdWJsZUNsaWNrWm9vbSA9IEwuSGFuZGxlci5leHRlbmQoe1xyXG5cdGFkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9tYXAub24oJ2RibGNsaWNrJywgdGhpcy5fb25Eb3VibGVDbGljaywgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlSG9va3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX21hcC5vZmYoJ2RibGNsaWNrJywgdGhpcy5fb25Eb3VibGVDbGljaywgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0X29uRG91YmxlQ2xpY2s6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxyXG5cdFx0ICAgIHpvb20gPSBtYXAuZ2V0Wm9vbSgpICsgKGUub3JpZ2luYWxFdmVudC5zaGlmdEtleSA/IC0xIDogMSk7XHJcblxyXG5cdFx0aWYgKG1hcC5vcHRpb25zLmRvdWJsZUNsaWNrWm9vbSA9PT0gJ2NlbnRlcicpIHtcclxuXHRcdFx0bWFwLnNldFpvb20oem9vbSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtYXAuc2V0Wm9vbUFyb3VuZChlLmNvbnRhaW5lclBvaW50LCB6b29tKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG5cclxuTC5NYXAuYWRkSW5pdEhvb2soJ2FkZEhhbmRsZXInLCAnZG91YmxlQ2xpY2tab29tJywgTC5NYXAuRG91YmxlQ2xpY2tab29tKTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkhhbmRsZXIuU2Nyb2xsV2hlZWxab29tIGlzIHVzZWQgYnkgTC5NYXAgdG8gZW5hYmxlIG1vdXNlIHNjcm9sbCB3aGVlbCB6b29tIG9uIHRoZSBtYXAuXHJcbiAqL1xyXG5cclxuTC5NYXAubWVyZ2VPcHRpb25zKHtcclxuXHRzY3JvbGxXaGVlbFpvb206IHRydWVcclxufSk7XHJcblxyXG5MLk1hcC5TY3JvbGxXaGVlbFpvb20gPSBMLkhhbmRsZXIuZXh0ZW5kKHtcclxuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21FdmVudC5vbih0aGlzLl9tYXAuX2NvbnRhaW5lciwgJ21vdXNld2hlZWwnLCB0aGlzLl9vbldoZWVsU2Nyb2xsLCB0aGlzKTtcclxuXHRcdEwuRG9tRXZlbnQub24odGhpcy5fbWFwLl9jb250YWluZXIsICdNb3pNb3VzZVBpeGVsU2Nyb2xsJywgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdCk7XHJcblx0XHR0aGlzLl9kZWx0YSA9IDA7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlSG9va3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdEwuRG9tRXZlbnQub2ZmKHRoaXMuX21hcC5fY29udGFpbmVyLCAnbW91c2V3aGVlbCcsIHRoaXMuX29uV2hlZWxTY3JvbGwpO1xyXG5cdFx0TC5Eb21FdmVudC5vZmYodGhpcy5fbWFwLl9jb250YWluZXIsICdNb3pNb3VzZVBpeGVsU2Nyb2xsJywgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdCk7XHJcblx0fSxcclxuXHJcblx0X29uV2hlZWxTY3JvbGw6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgZGVsdGEgPSBMLkRvbUV2ZW50LmdldFdoZWVsRGVsdGEoZSk7XHJcblxyXG5cdFx0dGhpcy5fZGVsdGEgKz0gZGVsdGE7XHJcblx0XHR0aGlzLl9sYXN0TW91c2VQb3MgPSB0aGlzLl9tYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZSk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9zdGFydFRpbWUpIHtcclxuXHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gK25ldyBEYXRlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGxlZnQgPSBNYXRoLm1heCg0MCAtICgrbmV3IERhdGUoKSAtIHRoaXMuX3N0YXJ0VGltZSksIDApO1xyXG5cclxuXHRcdGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XHJcblx0XHR0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoTC5iaW5kKHRoaXMuX3BlcmZvcm1ab29tLCB0aGlzKSwgbGVmdCk7XHJcblxyXG5cdFx0TC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdChlKTtcclxuXHRcdEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKGUpO1xyXG5cdH0sXHJcblxyXG5cdF9wZXJmb3JtWm9vbTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICBkZWx0YSA9IHRoaXMuX2RlbHRhLFxyXG5cdFx0ICAgIHpvb20gPSBtYXAuZ2V0Wm9vbSgpO1xyXG5cclxuXHRcdGRlbHRhID0gZGVsdGEgPiAwID8gTWF0aC5jZWlsKGRlbHRhKSA6IE1hdGguZmxvb3IoZGVsdGEpO1xyXG5cdFx0ZGVsdGEgPSBNYXRoLm1heChNYXRoLm1pbihkZWx0YSwgNCksIC00KTtcclxuXHRcdGRlbHRhID0gbWFwLl9saW1pdFpvb20oem9vbSArIGRlbHRhKSAtIHpvb207XHJcblxyXG5cdFx0dGhpcy5fZGVsdGEgPSAwO1xyXG5cdFx0dGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcclxuXHJcblx0XHRpZiAoIWRlbHRhKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdGlmIChtYXAub3B0aW9ucy5zY3JvbGxXaGVlbFpvb20gPT09ICdjZW50ZXInKSB7XHJcblx0XHRcdG1hcC5zZXRab29tKHpvb20gKyBkZWx0YSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRtYXAuc2V0Wm9vbUFyb3VuZCh0aGlzLl9sYXN0TW91c2VQb3MsIHpvb20gKyBkZWx0YSk7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbkwuTWFwLmFkZEluaXRIb29rKCdhZGRIYW5kbGVyJywgJ3Njcm9sbFdoZWVsWm9vbScsIEwuTWFwLlNjcm9sbFdoZWVsWm9vbSk7XHJcblxyXG5cclxuLypcclxuICogRXh0ZW5kcyB0aGUgZXZlbnQgaGFuZGxpbmcgY29kZSB3aXRoIGRvdWJsZSB0YXAgc3VwcG9ydCBmb3IgbW9iaWxlIGJyb3dzZXJzLlxyXG4gKi9cclxuXHJcbkwuZXh0ZW5kKEwuRG9tRXZlbnQsIHtcclxuXHJcblx0X3RvdWNoc3RhcnQ6IEwuQnJvd3Nlci5tc1BvaW50ZXIgPyAnTVNQb2ludGVyRG93bicgOiBMLkJyb3dzZXIucG9pbnRlciA/ICdwb2ludGVyZG93bicgOiAndG91Y2hzdGFydCcsXHJcblx0X3RvdWNoZW5kOiBMLkJyb3dzZXIubXNQb2ludGVyID8gJ01TUG9pbnRlclVwJyA6IEwuQnJvd3Nlci5wb2ludGVyID8gJ3BvaW50ZXJ1cCcgOiAndG91Y2hlbmQnLFxyXG5cclxuXHQvLyBpbnNwaXJlZCBieSBaZXB0byB0b3VjaCBjb2RlIGJ5IFRob21hcyBGdWNoc1xyXG5cdGFkZERvdWJsZVRhcExpc3RlbmVyOiBmdW5jdGlvbiAob2JqLCBoYW5kbGVyLCBpZCkge1xyXG5cdFx0dmFyIGxhc3QsXHJcblx0XHQgICAgZG91YmxlVGFwID0gZmFsc2UsXHJcblx0XHQgICAgZGVsYXkgPSAyNTAsXHJcblx0XHQgICAgdG91Y2gsXHJcblx0XHQgICAgcHJlID0gJ19sZWFmbGV0XycsXHJcblx0XHQgICAgdG91Y2hzdGFydCA9IHRoaXMuX3RvdWNoc3RhcnQsXHJcblx0XHQgICAgdG91Y2hlbmQgPSB0aGlzLl90b3VjaGVuZCxcclxuXHRcdCAgICB0cmFja2VkVG91Y2hlcyA9IFtdO1xyXG5cclxuXHRcdGZ1bmN0aW9uIG9uVG91Y2hTdGFydChlKSB7XHJcblx0XHRcdHZhciBjb3VudDtcclxuXHJcblx0XHRcdGlmIChMLkJyb3dzZXIucG9pbnRlcikge1xyXG5cdFx0XHRcdHRyYWNrZWRUb3VjaGVzLnB1c2goZS5wb2ludGVySWQpO1xyXG5cdFx0XHRcdGNvdW50ID0gdHJhY2tlZFRvdWNoZXMubGVuZ3RoO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNvdW50ID0gZS50b3VjaGVzLmxlbmd0aDtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoY291bnQgPiAxKSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgbm93ID0gRGF0ZS5ub3coKSxcclxuXHRcdFx0XHRkZWx0YSA9IG5vdyAtIChsYXN0IHx8IG5vdyk7XHJcblxyXG5cdFx0XHR0b3VjaCA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXSA6IGU7XHJcblx0XHRcdGRvdWJsZVRhcCA9IChkZWx0YSA+IDAgJiYgZGVsdGEgPD0gZGVsYXkpO1xyXG5cdFx0XHRsYXN0ID0gbm93O1xyXG5cdFx0fVxyXG5cclxuXHRcdGZ1bmN0aW9uIG9uVG91Y2hFbmQoZSkge1xyXG5cdFx0XHRpZiAoTC5Ccm93c2VyLnBvaW50ZXIpIHtcclxuXHRcdFx0XHR2YXIgaWR4ID0gdHJhY2tlZFRvdWNoZXMuaW5kZXhPZihlLnBvaW50ZXJJZCk7XHJcblx0XHRcdFx0aWYgKGlkeCA9PT0gLTEpIHtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dHJhY2tlZFRvdWNoZXMuc3BsaWNlKGlkeCwgMSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChkb3VibGVUYXApIHtcclxuXHRcdFx0XHRpZiAoTC5Ccm93c2VyLnBvaW50ZXIpIHtcclxuXHRcdFx0XHRcdC8vIHdvcmsgYXJvdW5kIC50eXBlIGJlaW5nIHJlYWRvbmx5IHdpdGggTVNQb2ludGVyKiBldmVudHNcclxuXHRcdFx0XHRcdHZhciBuZXdUb3VjaCA9IHsgfSxcclxuXHRcdFx0XHRcdFx0cHJvcDtcclxuXHJcblx0XHRcdFx0XHQvLyBqc2hpbnQgZm9yaW46ZmFsc2VcclxuXHRcdFx0XHRcdGZvciAodmFyIGkgaW4gdG91Y2gpIHtcclxuXHRcdFx0XHRcdFx0cHJvcCA9IHRvdWNoW2ldO1xyXG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIHByb3AgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0XHRcdFx0XHRuZXdUb3VjaFtpXSA9IHByb3AuYmluZCh0b3VjaCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0bmV3VG91Y2hbaV0gPSBwcm9wO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR0b3VjaCA9IG5ld1RvdWNoO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0b3VjaC50eXBlID0gJ2RibGNsaWNrJztcclxuXHRcdFx0XHRoYW5kbGVyKHRvdWNoKTtcclxuXHRcdFx0XHRsYXN0ID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0b2JqW3ByZSArIHRvdWNoc3RhcnQgKyBpZF0gPSBvblRvdWNoU3RhcnQ7XHJcblx0XHRvYmpbcHJlICsgdG91Y2hlbmQgKyBpZF0gPSBvblRvdWNoRW5kO1xyXG5cclxuXHRcdC8vIG9uIHBvaW50ZXIgd2UgbmVlZCB0byBsaXN0ZW4gb24gdGhlIGRvY3VtZW50LCBvdGhlcndpc2UgYSBkcmFnIHN0YXJ0aW5nIG9uIHRoZSBtYXAgYW5kIG1vdmluZyBvZmYgc2NyZWVuXHJcblx0XHQvLyB3aWxsIG5vdCBjb21lIHRocm91Z2ggdG8gdXMsIHNvIHdlIHdpbGwgbG9zZSB0cmFjayBvZiBob3cgbWFueSB0b3VjaGVzIGFyZSBvbmdvaW5nXHJcblx0XHR2YXIgZW5kRWxlbWVudCA9IEwuQnJvd3Nlci5wb2ludGVyID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogb2JqO1xyXG5cclxuXHRcdG9iai5hZGRFdmVudExpc3RlbmVyKHRvdWNoc3RhcnQsIG9uVG91Y2hTdGFydCwgZmFsc2UpO1xyXG5cdFx0ZW5kRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRvdWNoZW5kLCBvblRvdWNoRW5kLCBmYWxzZSk7XHJcblxyXG5cdFx0aWYgKEwuQnJvd3Nlci5wb2ludGVyKSB7XHJcblx0XHRcdGVuZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihMLkRvbUV2ZW50LlBPSU5URVJfQ0FOQ0VMLCBvblRvdWNoRW5kLCBmYWxzZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlRG91YmxlVGFwTGlzdGVuZXI6IGZ1bmN0aW9uIChvYmosIGlkKSB7XHJcblx0XHR2YXIgcHJlID0gJ19sZWFmbGV0Xyc7XHJcblxyXG5cdFx0b2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5fdG91Y2hzdGFydCwgb2JqW3ByZSArIHRoaXMuX3RvdWNoc3RhcnQgKyBpZF0sIGZhbHNlKTtcclxuXHRcdChMLkJyb3dzZXIucG9pbnRlciA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA6IG9iaikucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuXHRcdCAgICAgICAgdGhpcy5fdG91Y2hlbmQsIG9ialtwcmUgKyB0aGlzLl90b3VjaGVuZCArIGlkXSwgZmFsc2UpO1xyXG5cclxuXHRcdGlmIChMLkJyb3dzZXIucG9pbnRlcikge1xyXG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihMLkRvbUV2ZW50LlBPSU5URVJfQ0FOQ0VMLCBvYmpbcHJlICsgdGhpcy5fdG91Y2hlbmQgKyBpZF0sXHJcblx0XHRcdFx0ZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLypcclxuICogRXh0ZW5kcyBMLkRvbUV2ZW50IHRvIHByb3ZpZGUgdG91Y2ggc3VwcG9ydCBmb3IgSW50ZXJuZXQgRXhwbG9yZXIgYW5kIFdpbmRvd3MtYmFzZWQgZGV2aWNlcy5cclxuICovXHJcblxyXG5MLmV4dGVuZChMLkRvbUV2ZW50LCB7XHJcblxyXG5cdC8vc3RhdGljXHJcblx0UE9JTlRFUl9ET1dOOiBMLkJyb3dzZXIubXNQb2ludGVyID8gJ01TUG9pbnRlckRvd24nIDogJ3BvaW50ZXJkb3duJyxcclxuXHRQT0lOVEVSX01PVkU6IEwuQnJvd3Nlci5tc1BvaW50ZXIgPyAnTVNQb2ludGVyTW92ZScgOiAncG9pbnRlcm1vdmUnLFxyXG5cdFBPSU5URVJfVVA6IEwuQnJvd3Nlci5tc1BvaW50ZXIgPyAnTVNQb2ludGVyVXAnIDogJ3BvaW50ZXJ1cCcsXHJcblx0UE9JTlRFUl9DQU5DRUw6IEwuQnJvd3Nlci5tc1BvaW50ZXIgPyAnTVNQb2ludGVyQ2FuY2VsJyA6ICdwb2ludGVyY2FuY2VsJyxcclxuXHJcblx0X3BvaW50ZXJzOiBbXSxcclxuXHRfcG9pbnRlckRvY3VtZW50TGlzdGVuZXI6IGZhbHNlLFxyXG5cclxuXHQvLyBQcm92aWRlcyBhIHRvdWNoIGV2ZW50cyB3cmFwcGVyIGZvciAobXMpcG9pbnRlciBldmVudHMuXHJcblx0Ly8gQmFzZWQgb24gY2hhbmdlcyBieSB2ZXByb3phIGh0dHBzOi8vZ2l0aHViLmNvbS9DbG91ZE1hZGUvTGVhZmxldC9wdWxsLzEwMTlcclxuXHQvL3JlZiBodHRwOi8vd3d3LnczLm9yZy9UUi9wb2ludGVyZXZlbnRzLyBodHRwczovL3d3dy53My5vcmcvQnVncy9QdWJsaWMvc2hvd19idWcuY2dpP2lkPTIyODkwXHJcblxyXG5cdGFkZFBvaW50ZXJMaXN0ZW5lcjogZnVuY3Rpb24gKG9iaiwgdHlwZSwgaGFuZGxlciwgaWQpIHtcclxuXHJcblx0XHRzd2l0Y2ggKHR5cGUpIHtcclxuXHRcdGNhc2UgJ3RvdWNoc3RhcnQnOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5hZGRQb2ludGVyTGlzdGVuZXJTdGFydChvYmosIHR5cGUsIGhhbmRsZXIsIGlkKTtcclxuXHRcdGNhc2UgJ3RvdWNoZW5kJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWRkUG9pbnRlckxpc3RlbmVyRW5kKG9iaiwgdHlwZSwgaGFuZGxlciwgaWQpO1xyXG5cdFx0Y2FzZSAndG91Y2htb3ZlJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWRkUG9pbnRlckxpc3RlbmVyTW92ZShvYmosIHR5cGUsIGhhbmRsZXIsIGlkKTtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHRocm93ICdVbmtub3duIHRvdWNoIGV2ZW50IHR5cGUnO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGFkZFBvaW50ZXJMaXN0ZW5lclN0YXJ0OiBmdW5jdGlvbiAob2JqLCB0eXBlLCBoYW5kbGVyLCBpZCkge1xyXG5cdFx0dmFyIHByZSA9ICdfbGVhZmxldF8nLFxyXG5cdFx0ICAgIHBvaW50ZXJzID0gdGhpcy5fcG9pbnRlcnM7XHJcblxyXG5cdFx0dmFyIGNiID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0aWYgKGUucG9pbnRlclR5cGUgIT09ICdtb3VzZScgJiYgZS5wb2ludGVyVHlwZSAhPT0gZS5NU1BPSU5URVJfVFlQRV9NT1VTRSkge1xyXG5cdFx0XHRcdEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBhbHJlYWR5SW5BcnJheSA9IGZhbHNlO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50ZXJzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKHBvaW50ZXJzW2ldLnBvaW50ZXJJZCA9PT0gZS5wb2ludGVySWQpIHtcclxuXHRcdFx0XHRcdGFscmVhZHlJbkFycmF5ID0gdHJ1ZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoIWFscmVhZHlJbkFycmF5KSB7XHJcblx0XHRcdFx0cG9pbnRlcnMucHVzaChlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZS50b3VjaGVzID0gcG9pbnRlcnMuc2xpY2UoKTtcclxuXHRcdFx0ZS5jaGFuZ2VkVG91Y2hlcyA9IFtlXTtcclxuXHJcblx0XHRcdGhhbmRsZXIoZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdG9ialtwcmUgKyAndG91Y2hzdGFydCcgKyBpZF0gPSBjYjtcclxuXHRcdG9iai5hZGRFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9ET1dOLCBjYiwgZmFsc2UpO1xyXG5cclxuXHRcdC8vIG5lZWQgdG8gYWxzbyBsaXN0ZW4gZm9yIGVuZCBldmVudHMgdG8ga2VlcCB0aGUgX3BvaW50ZXJzIGxpc3QgYWNjdXJhdGVcclxuXHRcdC8vIHRoaXMgbmVlZHMgdG8gYmUgb24gdGhlIGJvZHkgYW5kIG5ldmVyIGdvIGF3YXlcclxuXHRcdGlmICghdGhpcy5fcG9pbnRlckRvY3VtZW50TGlzdGVuZXIpIHtcclxuXHRcdFx0dmFyIGludGVybmFsQ2IgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcG9pbnRlcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdGlmIChwb2ludGVyc1tpXS5wb2ludGVySWQgPT09IGUucG9pbnRlcklkKSB7XHJcblx0XHRcdFx0XHRcdHBvaW50ZXJzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cdFx0XHQvL1dlIGxpc3RlbiBvbiB0aGUgZG9jdW1lbnRFbGVtZW50IGFzIGFueSBkcmFncyB0aGF0IGVuZCBieSBtb3ZpbmcgdGhlIHRvdWNoIG9mZiB0aGUgc2NyZWVuIGdldCBmaXJlZCB0aGVyZVxyXG5cdFx0XHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfVVAsIGludGVybmFsQ2IsIGZhbHNlKTtcclxuXHRcdFx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5QT0lOVEVSX0NBTkNFTCwgaW50ZXJuYWxDYiwgZmFsc2UpO1xyXG5cclxuXHRcdFx0dGhpcy5fcG9pbnRlckRvY3VtZW50TGlzdGVuZXIgPSB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGFkZFBvaW50ZXJMaXN0ZW5lck1vdmU6IGZ1bmN0aW9uIChvYmosIHR5cGUsIGhhbmRsZXIsIGlkKSB7XHJcblx0XHR2YXIgcHJlID0gJ19sZWFmbGV0XycsXHJcblx0XHQgICAgdG91Y2hlcyA9IHRoaXMuX3BvaW50ZXJzO1xyXG5cclxuXHRcdGZ1bmN0aW9uIGNiKGUpIHtcclxuXHJcblx0XHRcdC8vIGRvbid0IGZpcmUgdG91Y2ggbW92ZXMgd2hlbiBtb3VzZSBpc24ndCBkb3duXHJcblx0XHRcdGlmICgoZS5wb2ludGVyVHlwZSA9PT0gZS5NU1BPSU5URVJfVFlQRV9NT1VTRSB8fCBlLnBvaW50ZXJUeXBlID09PSAnbW91c2UnKSAmJiBlLmJ1dHRvbnMgPT09IDApIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRvdWNoZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZiAodG91Y2hlc1tpXS5wb2ludGVySWQgPT09IGUucG9pbnRlcklkKSB7XHJcblx0XHRcdFx0XHR0b3VjaGVzW2ldID0gZTtcclxuXHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZS50b3VjaGVzID0gdG91Y2hlcy5zbGljZSgpO1xyXG5cdFx0XHRlLmNoYW5nZWRUb3VjaGVzID0gW2VdO1xyXG5cclxuXHRcdFx0aGFuZGxlcihlKTtcclxuXHRcdH1cclxuXHJcblx0XHRvYmpbcHJlICsgJ3RvdWNobW92ZScgKyBpZF0gPSBjYjtcclxuXHRcdG9iai5hZGRFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9NT1ZFLCBjYiwgZmFsc2UpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGFkZFBvaW50ZXJMaXN0ZW5lckVuZDogZnVuY3Rpb24gKG9iaiwgdHlwZSwgaGFuZGxlciwgaWQpIHtcclxuXHRcdHZhciBwcmUgPSAnX2xlYWZsZXRfJyxcclxuXHRcdCAgICB0b3VjaGVzID0gdGhpcy5fcG9pbnRlcnM7XHJcblxyXG5cdFx0dmFyIGNiID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0b3VjaGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aWYgKHRvdWNoZXNbaV0ucG9pbnRlcklkID09PSBlLnBvaW50ZXJJZCkge1xyXG5cdFx0XHRcdFx0dG91Y2hlcy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGUudG91Y2hlcyA9IHRvdWNoZXMuc2xpY2UoKTtcclxuXHRcdFx0ZS5jaGFuZ2VkVG91Y2hlcyA9IFtlXTtcclxuXHJcblx0XHRcdGhhbmRsZXIoZSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdG9ialtwcmUgKyAndG91Y2hlbmQnICsgaWRdID0gY2I7XHJcblx0XHRvYmouYWRkRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfVVAsIGNiLCBmYWxzZSk7XHJcblx0XHRvYmouYWRkRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfQ0FOQ0VMLCBjYiwgZmFsc2UpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZVBvaW50ZXJMaXN0ZW5lcjogZnVuY3Rpb24gKG9iaiwgdHlwZSwgaWQpIHtcclxuXHRcdHZhciBwcmUgPSAnX2xlYWZsZXRfJyxcclxuXHRcdCAgICBjYiA9IG9ialtwcmUgKyB0eXBlICsgaWRdO1xyXG5cclxuXHRcdHN3aXRjaCAodHlwZSkge1xyXG5cdFx0Y2FzZSAndG91Y2hzdGFydCc6XHJcblx0XHRcdG9iai5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9ET1dOLCBjYiwgZmFsc2UpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgJ3RvdWNobW92ZSc6XHJcblx0XHRcdG9iai5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuUE9JTlRFUl9NT1ZFLCBjYiwgZmFsc2UpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdGNhc2UgJ3RvdWNoZW5kJzpcclxuXHRcdFx0b2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5QT0lOVEVSX1VQLCBjYiwgZmFsc2UpO1xyXG5cdFx0XHRvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLlBPSU5URVJfQ0FOQ0VMLCBjYiwgZmFsc2UpO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuSGFuZGxlci5Ub3VjaFpvb20gaXMgdXNlZCBieSBMLk1hcCB0byBhZGQgcGluY2ggem9vbSBvbiBzdXBwb3J0ZWQgbW9iaWxlIGJyb3dzZXJzLlxyXG4gKi9cclxuXHJcbkwuTWFwLm1lcmdlT3B0aW9ucyh7XHJcblx0dG91Y2hab29tOiBMLkJyb3dzZXIudG91Y2ggJiYgIUwuQnJvd3Nlci5hbmRyb2lkMjMsXHJcblx0Ym91bmNlQXRab29tTGltaXRzOiB0cnVlXHJcbn0pO1xyXG5cclxuTC5NYXAuVG91Y2hab29tID0gTC5IYW5kbGVyLmV4dGVuZCh7XHJcblx0YWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdEwuRG9tRXZlbnQub24odGhpcy5fbWFwLl9jb250YWluZXIsICd0b3VjaHN0YXJ0JywgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21FdmVudC5vZmYodGhpcy5fbWFwLl9jb250YWluZXIsICd0b3VjaHN0YXJ0JywgdGhpcy5fb25Ub3VjaFN0YXJ0LCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRfb25Ub3VjaFN0YXJ0OiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcDtcclxuXHJcblx0XHRpZiAoIWUudG91Y2hlcyB8fCBlLnRvdWNoZXMubGVuZ3RoICE9PSAyIHx8IG1hcC5fYW5pbWF0aW5nWm9vbSB8fCB0aGlzLl96b29taW5nKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciBwMSA9IG1hcC5tb3VzZUV2ZW50VG9MYXllclBvaW50KGUudG91Y2hlc1swXSksXHJcblx0XHQgICAgcDIgPSBtYXAubW91c2VFdmVudFRvTGF5ZXJQb2ludChlLnRvdWNoZXNbMV0pLFxyXG5cdFx0ICAgIHZpZXdDZW50ZXIgPSBtYXAuX2dldENlbnRlckxheWVyUG9pbnQoKTtcclxuXHJcblx0XHR0aGlzLl9zdGFydENlbnRlciA9IHAxLmFkZChwMikuX2RpdmlkZUJ5KDIpO1xyXG5cdFx0dGhpcy5fc3RhcnREaXN0ID0gcDEuZGlzdGFuY2VUbyhwMik7XHJcblxyXG5cdFx0dGhpcy5fbW92ZWQgPSBmYWxzZTtcclxuXHRcdHRoaXMuX3pvb21pbmcgPSB0cnVlO1xyXG5cclxuXHRcdHRoaXMuX2NlbnRlck9mZnNldCA9IHZpZXdDZW50ZXIuc3VidHJhY3QodGhpcy5fc3RhcnRDZW50ZXIpO1xyXG5cclxuXHRcdGlmIChtYXAuX3BhbkFuaW0pIHtcclxuXHRcdFx0bWFwLl9wYW5BbmltLnN0b3AoKTtcclxuXHRcdH1cclxuXHJcblx0XHRMLkRvbUV2ZW50XHJcblx0XHQgICAgLm9uKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5fb25Ub3VjaE1vdmUsIHRoaXMpXHJcblx0XHQgICAgLm9uKGRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLl9vblRvdWNoRW5kLCB0aGlzKTtcclxuXHJcblx0XHRMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xyXG5cdH0sXHJcblxyXG5cdF9vblRvdWNoTW92ZTogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXA7XHJcblxyXG5cdFx0aWYgKCFlLnRvdWNoZXMgfHwgZS50b3VjaGVzLmxlbmd0aCAhPT0gMiB8fCAhdGhpcy5fem9vbWluZykgeyByZXR1cm47IH1cclxuXHJcblx0XHR2YXIgcDEgPSBtYXAubW91c2VFdmVudFRvTGF5ZXJQb2ludChlLnRvdWNoZXNbMF0pLFxyXG5cdFx0ICAgIHAyID0gbWFwLm1vdXNlRXZlbnRUb0xheWVyUG9pbnQoZS50b3VjaGVzWzFdKTtcclxuXHJcblx0XHR0aGlzLl9zY2FsZSA9IHAxLmRpc3RhbmNlVG8ocDIpIC8gdGhpcy5fc3RhcnREaXN0O1xyXG5cdFx0dGhpcy5fZGVsdGEgPSBwMS5fYWRkKHAyKS5fZGl2aWRlQnkoMikuX3N1YnRyYWN0KHRoaXMuX3N0YXJ0Q2VudGVyKTtcclxuXHJcblx0XHRpZiAodGhpcy5fc2NhbGUgPT09IDEpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0aWYgKCFtYXAub3B0aW9ucy5ib3VuY2VBdFpvb21MaW1pdHMpIHtcclxuXHRcdFx0aWYgKChtYXAuZ2V0Wm9vbSgpID09PSBtYXAuZ2V0TWluWm9vbSgpICYmIHRoaXMuX3NjYWxlIDwgMSkgfHxcclxuXHRcdFx0ICAgIChtYXAuZ2V0Wm9vbSgpID09PSBtYXAuZ2V0TWF4Wm9vbSgpICYmIHRoaXMuX3NjYWxlID4gMSkpIHsgcmV0dXJuOyB9XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9tb3ZlZCkge1xyXG5cdFx0XHRMLkRvbVV0aWwuYWRkQ2xhc3MobWFwLl9tYXBQYW5lLCAnbGVhZmxldC10b3VjaGluZycpO1xyXG5cclxuXHRcdFx0bWFwXHJcblx0XHRcdCAgICAuZmlyZSgnbW92ZXN0YXJ0JylcclxuXHRcdFx0ICAgIC5maXJlKCd6b29tc3RhcnQnKTtcclxuXHJcblx0XHRcdHRoaXMuX21vdmVkID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRMLlV0aWwuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX2FuaW1SZXF1ZXN0KTtcclxuXHRcdHRoaXMuX2FuaW1SZXF1ZXN0ID0gTC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoXHJcblx0XHQgICAgICAgIHRoaXMuX3VwZGF0ZU9uTW92ZSwgdGhpcywgdHJ1ZSwgdGhpcy5fbWFwLl9jb250YWluZXIpO1xyXG5cclxuXHRcdEwuRG9tRXZlbnQucHJldmVudERlZmF1bHQoZSk7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZU9uTW92ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICBvcmlnaW4gPSB0aGlzLl9nZXRTY2FsZU9yaWdpbigpLFxyXG5cdFx0ICAgIGNlbnRlciA9IG1hcC5sYXllclBvaW50VG9MYXRMbmcob3JpZ2luKSxcclxuXHRcdCAgICB6b29tID0gbWFwLmdldFNjYWxlWm9vbSh0aGlzLl9zY2FsZSk7XHJcblxyXG5cdFx0bWFwLl9hbmltYXRlWm9vbShjZW50ZXIsIHpvb20sIHRoaXMuX3N0YXJ0Q2VudGVyLCB0aGlzLl9zY2FsZSwgdGhpcy5fZGVsdGEsIGZhbHNlLCB0cnVlKTtcclxuXHR9LFxyXG5cclxuXHRfb25Ub3VjaEVuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9tb3ZlZCB8fCAhdGhpcy5fem9vbWluZykge1xyXG5cdFx0XHR0aGlzLl96b29taW5nID0gZmFsc2U7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwO1xyXG5cclxuXHRcdHRoaXMuX3pvb21pbmcgPSBmYWxzZTtcclxuXHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyhtYXAuX21hcFBhbmUsICdsZWFmbGV0LXRvdWNoaW5nJyk7XHJcblx0XHRMLlV0aWwuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX2FuaW1SZXF1ZXN0KTtcclxuXHJcblx0XHRMLkRvbUV2ZW50XHJcblx0XHQgICAgLm9mZihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuX29uVG91Y2hNb3ZlKVxyXG5cdFx0ICAgIC5vZmYoZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuX29uVG91Y2hFbmQpO1xyXG5cclxuXHRcdHZhciBvcmlnaW4gPSB0aGlzLl9nZXRTY2FsZU9yaWdpbigpLFxyXG5cdFx0ICAgIGNlbnRlciA9IG1hcC5sYXllclBvaW50VG9MYXRMbmcob3JpZ2luKSxcclxuXHJcblx0XHQgICAgb2xkWm9vbSA9IG1hcC5nZXRab29tKCksXHJcblx0XHQgICAgZmxvYXRab29tRGVsdGEgPSBtYXAuZ2V0U2NhbGVab29tKHRoaXMuX3NjYWxlKSAtIG9sZFpvb20sXHJcblx0XHQgICAgcm91bmRab29tRGVsdGEgPSAoZmxvYXRab29tRGVsdGEgPiAwID9cclxuXHRcdCAgICAgICAgICAgIE1hdGguY2VpbChmbG9hdFpvb21EZWx0YSkgOiBNYXRoLmZsb29yKGZsb2F0Wm9vbURlbHRhKSksXHJcblxyXG5cdFx0ICAgIHpvb20gPSBtYXAuX2xpbWl0Wm9vbShvbGRab29tICsgcm91bmRab29tRGVsdGEpLFxyXG5cdFx0ICAgIHNjYWxlID0gbWFwLmdldFpvb21TY2FsZSh6b29tKSAvIHRoaXMuX3NjYWxlO1xyXG5cclxuXHRcdG1hcC5fYW5pbWF0ZVpvb20oY2VudGVyLCB6b29tLCBvcmlnaW4sIHNjYWxlKTtcclxuXHR9LFxyXG5cclxuXHRfZ2V0U2NhbGVPcmlnaW46IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBjZW50ZXJPZmZzZXQgPSB0aGlzLl9jZW50ZXJPZmZzZXQuc3VidHJhY3QodGhpcy5fZGVsdGEpLmRpdmlkZUJ5KHRoaXMuX3NjYWxlKTtcclxuXHRcdHJldHVybiB0aGlzLl9zdGFydENlbnRlci5hZGQoY2VudGVyT2Zmc2V0KTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5NYXAuYWRkSW5pdEhvb2soJ2FkZEhhbmRsZXInLCAndG91Y2hab29tJywgTC5NYXAuVG91Y2hab29tKTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLk1hcC5UYXAgaXMgdXNlZCB0byBlbmFibGUgbW9iaWxlIGhhY2tzIGxpa2UgcXVpY2sgdGFwcyBhbmQgbG9uZyBob2xkLlxyXG4gKi9cclxuXHJcbkwuTWFwLm1lcmdlT3B0aW9ucyh7XHJcblx0dGFwOiB0cnVlLFxyXG5cdHRhcFRvbGVyYW5jZTogMTVcclxufSk7XHJcblxyXG5MLk1hcC5UYXAgPSBMLkhhbmRsZXIuZXh0ZW5kKHtcclxuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21FdmVudC5vbih0aGlzLl9tYXAuX2NvbnRhaW5lciwgJ3RvdWNoc3RhcnQnLCB0aGlzLl9vbkRvd24sIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLkRvbUV2ZW50Lm9mZih0aGlzLl9tYXAuX2NvbnRhaW5lciwgJ3RvdWNoc3RhcnQnLCB0aGlzLl9vbkRvd24sIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdF9vbkRvd246IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoIWUudG91Y2hlcykgeyByZXR1cm47IH1cclxuXHJcblx0XHRMLkRvbUV2ZW50LnByZXZlbnREZWZhdWx0KGUpO1xyXG5cclxuXHRcdHRoaXMuX2ZpcmVDbGljayA9IHRydWU7XHJcblxyXG5cdFx0Ly8gZG9uJ3Qgc2ltdWxhdGUgY2xpY2sgb3IgdHJhY2sgbG9uZ3ByZXNzIGlmIG1vcmUgdGhhbiAxIHRvdWNoXHJcblx0XHRpZiAoZS50b3VjaGVzLmxlbmd0aCA+IDEpIHtcclxuXHRcdFx0dGhpcy5fZmlyZUNsaWNrID0gZmFsc2U7XHJcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLl9ob2xkVGltZW91dCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZmlyc3QgPSBlLnRvdWNoZXNbMF0sXHJcblx0XHQgICAgZWwgPSBmaXJzdC50YXJnZXQ7XHJcblxyXG5cdFx0dGhpcy5fc3RhcnRQb3MgPSB0aGlzLl9uZXdQb3MgPSBuZXcgTC5Qb2ludChmaXJzdC5jbGllbnRYLCBmaXJzdC5jbGllbnRZKTtcclxuXHJcblx0XHQvLyBpZiB0b3VjaGluZyBhIGxpbmssIGhpZ2hsaWdodCBpdFxyXG5cdFx0aWYgKGVsLnRhZ05hbWUgJiYgZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYScpIHtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKGVsLCAnbGVhZmxldC1hY3RpdmUnKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBzaW11bGF0ZSBsb25nIGhvbGQgYnV0IHNldHRpbmcgYSB0aW1lb3V0XHJcblx0XHR0aGlzLl9ob2xkVGltZW91dCA9IHNldFRpbWVvdXQoTC5iaW5kKGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHRoaXMuX2lzVGFwVmFsaWQoKSkge1xyXG5cdFx0XHRcdHRoaXMuX2ZpcmVDbGljayA9IGZhbHNlO1xyXG5cdFx0XHRcdHRoaXMuX29uVXAoKTtcclxuXHRcdFx0XHR0aGlzLl9zaW11bGF0ZUV2ZW50KCdjb250ZXh0bWVudScsIGZpcnN0KTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcyksIDEwMDApO1xyXG5cclxuXHRcdEwuRG9tRXZlbnRcclxuXHRcdFx0Lm9uKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5fb25Nb3ZlLCB0aGlzKVxyXG5cdFx0XHQub24oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuX29uVXAsIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdF9vblVwOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2hvbGRUaW1lb3V0KTtcclxuXHJcblx0XHRMLkRvbUV2ZW50XHJcblx0XHRcdC5vZmYoZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLl9vbk1vdmUsIHRoaXMpXHJcblx0XHRcdC5vZmYoZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuX29uVXAsIHRoaXMpO1xyXG5cclxuXHRcdGlmICh0aGlzLl9maXJlQ2xpY2sgJiYgZSAmJiBlLmNoYW5nZWRUb3VjaGVzKSB7XHJcblxyXG5cdFx0XHR2YXIgZmlyc3QgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLFxyXG5cdFx0XHQgICAgZWwgPSBmaXJzdC50YXJnZXQ7XHJcblxyXG5cdFx0XHRpZiAoZWwgJiYgZWwudGFnTmFtZSAmJiBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdhJykge1xyXG5cdFx0XHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyhlbCwgJ2xlYWZsZXQtYWN0aXZlJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIHNpbXVsYXRlIGNsaWNrIGlmIHRoZSB0b3VjaCBkaWRuJ3QgbW92ZSB0b28gbXVjaFxyXG5cdFx0XHRpZiAodGhpcy5faXNUYXBWYWxpZCgpKSB7XHJcblx0XHRcdFx0dGhpcy5fc2ltdWxhdGVFdmVudCgnY2xpY2snLCBmaXJzdCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfaXNUYXBWYWxpZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX25ld1Bvcy5kaXN0YW5jZVRvKHRoaXMuX3N0YXJ0UG9zKSA8PSB0aGlzLl9tYXAub3B0aW9ucy50YXBUb2xlcmFuY2U7XHJcblx0fSxcclxuXHJcblx0X29uTW92ZTogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciBmaXJzdCA9IGUudG91Y2hlc1swXTtcclxuXHRcdHRoaXMuX25ld1BvcyA9IG5ldyBMLlBvaW50KGZpcnN0LmNsaWVudFgsIGZpcnN0LmNsaWVudFkpO1xyXG5cdH0sXHJcblxyXG5cdF9zaW11bGF0ZUV2ZW50OiBmdW5jdGlvbiAodHlwZSwgZSkge1xyXG5cdFx0dmFyIHNpbXVsYXRlZEV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XHJcblxyXG5cdFx0c2ltdWxhdGVkRXZlbnQuX3NpbXVsYXRlZCA9IHRydWU7XHJcblx0XHRlLnRhcmdldC5fc2ltdWxhdGVkQ2xpY2sgPSB0cnVlO1xyXG5cclxuXHRcdHNpbXVsYXRlZEV2ZW50LmluaXRNb3VzZUV2ZW50KFxyXG5cdFx0ICAgICAgICB0eXBlLCB0cnVlLCB0cnVlLCB3aW5kb3csIDEsXHJcblx0XHQgICAgICAgIGUuc2NyZWVuWCwgZS5zY3JlZW5ZLFxyXG5cdFx0ICAgICAgICBlLmNsaWVudFgsIGUuY2xpZW50WSxcclxuXHRcdCAgICAgICAgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xyXG5cclxuXHRcdGUudGFyZ2V0LmRpc3BhdGNoRXZlbnQoc2ltdWxhdGVkRXZlbnQpO1xyXG5cdH1cclxufSk7XHJcblxyXG5pZiAoTC5Ccm93c2VyLnRvdWNoICYmICFMLkJyb3dzZXIucG9pbnRlcikge1xyXG5cdEwuTWFwLmFkZEluaXRIb29rKCdhZGRIYW5kbGVyJywgJ3RhcCcsIEwuTWFwLlRhcCk7XHJcbn1cclxuXHJcblxyXG4vKlxyXG4gKiBMLkhhbmRsZXIuU2hpZnREcmFnWm9vbSBpcyB1c2VkIHRvIGFkZCBzaGlmdC1kcmFnIHpvb20gaW50ZXJhY3Rpb24gdG8gdGhlIG1hcFxyXG4gICogKHpvb20gdG8gYSBzZWxlY3RlZCBib3VuZGluZyBib3gpLCBlbmFibGVkIGJ5IGRlZmF1bHQuXHJcbiAqL1xyXG5cclxuTC5NYXAubWVyZ2VPcHRpb25zKHtcclxuXHRib3hab29tOiB0cnVlXHJcbn0pO1xyXG5cclxuTC5NYXAuQm94Wm9vbSA9IEwuSGFuZGxlci5leHRlbmQoe1xyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdHRoaXMuX21hcCA9IG1hcDtcclxuXHRcdHRoaXMuX2NvbnRhaW5lciA9IG1hcC5fY29udGFpbmVyO1xyXG5cdFx0dGhpcy5fcGFuZSA9IG1hcC5fcGFuZXMub3ZlcmxheVBhbmU7XHJcblx0XHR0aGlzLl9tb3ZlZCA9IGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cdGFkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLkRvbUV2ZW50Lm9uKHRoaXMuX2NvbnRhaW5lciwgJ21vdXNlZG93bicsIHRoaXMuX29uTW91c2VEb3duLCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21FdmVudC5vZmYodGhpcy5fY29udGFpbmVyLCAnbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24pO1xyXG5cdFx0dGhpcy5fbW92ZWQgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHRtb3ZlZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIHRoaXMuX21vdmVkO1xyXG5cdH0sXHJcblxyXG5cdF9vbk1vdXNlRG93bjogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHRoaXMuX21vdmVkID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKCFlLnNoaWZ0S2V5IHx8ICgoZS53aGljaCAhPT0gMSkgJiYgKGUuYnV0dG9uICE9PSAxKSkpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG5cdFx0TC5Eb21VdGlsLmRpc2FibGVUZXh0U2VsZWN0aW9uKCk7XHJcblx0XHRMLkRvbVV0aWwuZGlzYWJsZUltYWdlRHJhZygpO1xyXG5cclxuXHRcdHRoaXMuX3N0YXJ0TGF5ZXJQb2ludCA9IHRoaXMuX21hcC5tb3VzZUV2ZW50VG9MYXllclBvaW50KGUpO1xyXG5cclxuXHRcdEwuRG9tRXZlbnRcclxuXHRcdCAgICAub24oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLl9vbk1vdXNlTW92ZSwgdGhpcylcclxuXHRcdCAgICAub24oZG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5fb25Nb3VzZVVwLCB0aGlzKVxyXG5cdFx0ICAgIC5vbihkb2N1bWVudCwgJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24sIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdF9vbk1vdXNlTW92ZTogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmICghdGhpcy5fbW92ZWQpIHtcclxuXHRcdFx0dGhpcy5fYm94ID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtem9vbS1ib3gnLCB0aGlzLl9wYW5lKTtcclxuXHRcdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKHRoaXMuX2JveCwgdGhpcy5fc3RhcnRMYXllclBvaW50KTtcclxuXHJcblx0XHRcdC8vVE9ETyByZWZhY3RvcjogbW92ZSBjdXJzb3IgdG8gc3R5bGVzXHJcblx0XHRcdHRoaXMuX2NvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcclxuXHRcdFx0dGhpcy5fbWFwLmZpcmUoJ2JveHpvb21zdGFydCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdGFydFBvaW50ID0gdGhpcy5fc3RhcnRMYXllclBvaW50LFxyXG5cdFx0ICAgIGJveCA9IHRoaXMuX2JveCxcclxuXHJcblx0XHQgICAgbGF5ZXJQb2ludCA9IHRoaXMuX21hcC5tb3VzZUV2ZW50VG9MYXllclBvaW50KGUpLFxyXG5cdFx0ICAgIG9mZnNldCA9IGxheWVyUG9pbnQuc3VidHJhY3Qoc3RhcnRQb2ludCksXHJcblxyXG5cdFx0ICAgIG5ld1BvcyA9IG5ldyBMLlBvaW50KFxyXG5cdFx0ICAgICAgICBNYXRoLm1pbihsYXllclBvaW50LngsIHN0YXJ0UG9pbnQueCksXHJcblx0XHQgICAgICAgIE1hdGgubWluKGxheWVyUG9pbnQueSwgc3RhcnRQb2ludC55KSk7XHJcblxyXG5cdFx0TC5Eb21VdGlsLnNldFBvc2l0aW9uKGJveCwgbmV3UG9zKTtcclxuXHJcblx0XHR0aGlzLl9tb3ZlZCA9IHRydWU7XHJcblxyXG5cdFx0Ly8gVE9ETyByZWZhY3RvcjogcmVtb3ZlIGhhcmRjb2RlZCA0IHBpeGVsc1xyXG5cdFx0Ym94LnN0eWxlLndpZHRoICA9IChNYXRoLm1heCgwLCBNYXRoLmFicyhvZmZzZXQueCkgLSA0KSkgKyAncHgnO1xyXG5cdFx0Ym94LnN0eWxlLmhlaWdodCA9IChNYXRoLm1heCgwLCBNYXRoLmFicyhvZmZzZXQueSkgLSA0KSkgKyAncHgnO1xyXG5cdH0sXHJcblxyXG5cdF9maW5pc2g6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICh0aGlzLl9tb3ZlZCkge1xyXG5cdFx0XHR0aGlzLl9wYW5lLnJlbW92ZUNoaWxkKHRoaXMuX2JveCk7XHJcblx0XHRcdHRoaXMuX2NvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSAnJztcclxuXHRcdH1cclxuXHJcblx0XHRMLkRvbVV0aWwuZW5hYmxlVGV4dFNlbGVjdGlvbigpO1xyXG5cdFx0TC5Eb21VdGlsLmVuYWJsZUltYWdlRHJhZygpO1xyXG5cclxuXHRcdEwuRG9tRXZlbnRcclxuXHRcdCAgICAub2ZmKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5fb25Nb3VzZU1vdmUpXHJcblx0XHQgICAgLm9mZihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLl9vbk1vdXNlVXApXHJcblx0XHQgICAgLm9mZihkb2N1bWVudCwgJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24pO1xyXG5cdH0sXHJcblxyXG5cdF9vbk1vdXNlVXA6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG5cdFx0dGhpcy5fZmluaXNoKCk7XHJcblxyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcCxcclxuXHRcdCAgICBsYXllclBvaW50ID0gbWFwLm1vdXNlRXZlbnRUb0xheWVyUG9pbnQoZSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX3N0YXJ0TGF5ZXJQb2ludC5lcXVhbHMobGF5ZXJQb2ludCkpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dmFyIGJvdW5kcyA9IG5ldyBMLkxhdExuZ0JvdW5kcyhcclxuXHRcdCAgICAgICAgbWFwLmxheWVyUG9pbnRUb0xhdExuZyh0aGlzLl9zdGFydExheWVyUG9pbnQpLFxyXG5cdFx0ICAgICAgICBtYXAubGF5ZXJQb2ludFRvTGF0TG5nKGxheWVyUG9pbnQpKTtcclxuXHJcblx0XHRtYXAuZml0Qm91bmRzKGJvdW5kcyk7XHJcblxyXG5cdFx0bWFwLmZpcmUoJ2JveHpvb21lbmQnLCB7XHJcblx0XHRcdGJveFpvb21Cb3VuZHM6IGJvdW5kc1xyXG5cdFx0fSk7XHJcblx0fSxcclxuXHJcblx0X29uS2V5RG93bjogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmIChlLmtleUNvZGUgPT09IDI3KSB7XHJcblx0XHRcdHRoaXMuX2ZpbmlzaCgpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5MLk1hcC5hZGRJbml0SG9vaygnYWRkSGFuZGxlcicsICdib3hab29tJywgTC5NYXAuQm94Wm9vbSk7XHJcblxyXG5cclxuLypcclxuICogTC5NYXAuS2V5Ym9hcmQgaXMgaGFuZGxpbmcga2V5Ym9hcmQgaW50ZXJhY3Rpb24gd2l0aCB0aGUgbWFwLCBlbmFibGVkIGJ5IGRlZmF1bHQuXHJcbiAqL1xyXG5cclxuTC5NYXAubWVyZ2VPcHRpb25zKHtcclxuXHRrZXlib2FyZDogdHJ1ZSxcclxuXHRrZXlib2FyZFBhbk9mZnNldDogODAsXHJcblx0a2V5Ym9hcmRab29tT2Zmc2V0OiAxXHJcbn0pO1xyXG5cclxuTC5NYXAuS2V5Ym9hcmQgPSBMLkhhbmRsZXIuZXh0ZW5kKHtcclxuXHJcblx0a2V5Q29kZXM6IHtcclxuXHRcdGxlZnQ6ICAgIFszN10sXHJcblx0XHRyaWdodDogICBbMzldLFxyXG5cdFx0ZG93bjogICAgWzQwXSxcclxuXHRcdHVwOiAgICAgIFszOF0sXHJcblx0XHR6b29tSW46ICBbMTg3LCAxMDcsIDYxLCAxNzFdLFxyXG5cdFx0em9vbU91dDogWzE4OSwgMTA5LCAxNzNdXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5fbWFwID0gbWFwO1xyXG5cclxuXHRcdHRoaXMuX3NldFBhbk9mZnNldChtYXAub3B0aW9ucy5rZXlib2FyZFBhbk9mZnNldCk7XHJcblx0XHR0aGlzLl9zZXRab29tT2Zmc2V0KG1hcC5vcHRpb25zLmtleWJvYXJkWm9vbU9mZnNldCk7XHJcblx0fSxcclxuXHJcblx0YWRkSG9va3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBjb250YWluZXIgPSB0aGlzLl9tYXAuX2NvbnRhaW5lcjtcclxuXHJcblx0XHQvLyBtYWtlIHRoZSBjb250YWluZXIgZm9jdXNhYmxlIGJ5IHRhYmJpbmdcclxuXHRcdGlmIChjb250YWluZXIudGFiSW5kZXggPT09IC0xKSB7XHJcblx0XHRcdGNvbnRhaW5lci50YWJJbmRleCA9ICcwJztcclxuXHRcdH1cclxuXHJcblx0XHRMLkRvbUV2ZW50XHJcblx0XHQgICAgLm9uKGNvbnRhaW5lciwgJ2ZvY3VzJywgdGhpcy5fb25Gb2N1cywgdGhpcylcclxuXHRcdCAgICAub24oY29udGFpbmVyLCAnYmx1cicsIHRoaXMuX29uQmx1ciwgdGhpcylcclxuXHRcdCAgICAub24oY29udGFpbmVyLCAnbW91c2Vkb3duJywgdGhpcy5fb25Nb3VzZURvd24sIHRoaXMpO1xyXG5cclxuXHRcdHRoaXMuX21hcFxyXG5cdFx0ICAgIC5vbignZm9jdXMnLCB0aGlzLl9hZGRIb29rcywgdGhpcylcclxuXHRcdCAgICAub24oJ2JsdXInLCB0aGlzLl9yZW1vdmVIb29rcywgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlSG9va3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHRoaXMuX3JlbW92ZUhvb2tzKCk7XHJcblxyXG5cdFx0dmFyIGNvbnRhaW5lciA9IHRoaXMuX21hcC5fY29udGFpbmVyO1xyXG5cclxuXHRcdEwuRG9tRXZlbnRcclxuXHRcdCAgICAub2ZmKGNvbnRhaW5lciwgJ2ZvY3VzJywgdGhpcy5fb25Gb2N1cywgdGhpcylcclxuXHRcdCAgICAub2ZmKGNvbnRhaW5lciwgJ2JsdXInLCB0aGlzLl9vbkJsdXIsIHRoaXMpXHJcblx0XHQgICAgLm9mZihjb250YWluZXIsICdtb3VzZWRvd24nLCB0aGlzLl9vbk1vdXNlRG93biwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5fbWFwXHJcblx0XHQgICAgLm9mZignZm9jdXMnLCB0aGlzLl9hZGRIb29rcywgdGhpcylcclxuXHRcdCAgICAub2ZmKCdibHVyJywgdGhpcy5fcmVtb3ZlSG9va3MsIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdF9vbk1vdXNlRG93bjogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHRoaXMuX2ZvY3VzZWQpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5LFxyXG5cdFx0ICAgIGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxyXG5cdFx0ICAgIHRvcCA9IGJvZHkuc2Nyb2xsVG9wIHx8IGRvY0VsLnNjcm9sbFRvcCxcclxuXHRcdCAgICBsZWZ0ID0gYm9keS5zY3JvbGxMZWZ0IHx8IGRvY0VsLnNjcm9sbExlZnQ7XHJcblxyXG5cdFx0dGhpcy5fbWFwLl9jb250YWluZXIuZm9jdXMoKTtcclxuXHJcblx0XHR3aW5kb3cuc2Nyb2xsVG8obGVmdCwgdG9wKTtcclxuXHR9LFxyXG5cclxuXHRfb25Gb2N1czogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fZm9jdXNlZCA9IHRydWU7XHJcblx0XHR0aGlzLl9tYXAuZmlyZSgnZm9jdXMnKTtcclxuXHR9LFxyXG5cclxuXHRfb25CbHVyOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9mb2N1c2VkID0gZmFsc2U7XHJcblx0XHR0aGlzLl9tYXAuZmlyZSgnYmx1cicpO1xyXG5cdH0sXHJcblxyXG5cdF9zZXRQYW5PZmZzZXQ6IGZ1bmN0aW9uIChwYW4pIHtcclxuXHRcdHZhciBrZXlzID0gdGhpcy5fcGFuS2V5cyA9IHt9LFxyXG5cdFx0ICAgIGNvZGVzID0gdGhpcy5rZXlDb2RlcyxcclxuXHRcdCAgICBpLCBsZW47XHJcblxyXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY29kZXMubGVmdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRrZXlzW2NvZGVzLmxlZnRbaV1dID0gWy0xICogcGFuLCAwXTtcclxuXHRcdH1cclxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNvZGVzLnJpZ2h0Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGtleXNbY29kZXMucmlnaHRbaV1dID0gW3BhbiwgMF07XHJcblx0XHR9XHJcblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjb2Rlcy5kb3duLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGtleXNbY29kZXMuZG93bltpXV0gPSBbMCwgcGFuXTtcclxuXHRcdH1cclxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNvZGVzLnVwLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcblx0XHRcdGtleXNbY29kZXMudXBbaV1dID0gWzAsIC0xICogcGFuXTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfc2V0Wm9vbU9mZnNldDogZnVuY3Rpb24gKHpvb20pIHtcclxuXHRcdHZhciBrZXlzID0gdGhpcy5fem9vbUtleXMgPSB7fSxcclxuXHRcdCAgICBjb2RlcyA9IHRoaXMua2V5Q29kZXMsXHJcblx0XHQgICAgaSwgbGVuO1xyXG5cclxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNvZGVzLnpvb21Jbi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRrZXlzW2NvZGVzLnpvb21JbltpXV0gPSB6b29tO1xyXG5cdFx0fVxyXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY29kZXMuem9vbU91dC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRrZXlzW2NvZGVzLnpvb21PdXRbaV1dID0gLXpvb207XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X2FkZEhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLkRvbUV2ZW50Lm9uKGRvY3VtZW50LCAna2V5ZG93bicsIHRoaXMuX29uS2V5RG93biwgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0X3JlbW92ZUhvb2tzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLkRvbUV2ZW50Lm9mZihkb2N1bWVudCwgJ2tleWRvd24nLCB0aGlzLl9vbktleURvd24sIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdF9vbktleURvd246IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIga2V5ID0gZS5rZXlDb2RlLFxyXG5cdFx0ICAgIG1hcCA9IHRoaXMuX21hcDtcclxuXHJcblx0XHRpZiAoa2V5IGluIHRoaXMuX3BhbktleXMpIHtcclxuXHJcblx0XHRcdGlmIChtYXAuX3BhbkFuaW0gJiYgbWFwLl9wYW5BbmltLl9pblByb2dyZXNzKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdFx0bWFwLnBhbkJ5KHRoaXMuX3BhbktleXNba2V5XSk7XHJcblxyXG5cdFx0XHRpZiAobWFwLm9wdGlvbnMubWF4Qm91bmRzKSB7XHJcblx0XHRcdFx0bWFwLnBhbkluc2lkZUJvdW5kcyhtYXAub3B0aW9ucy5tYXhCb3VuZHMpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIGlmIChrZXkgaW4gdGhpcy5fem9vbUtleXMpIHtcclxuXHRcdFx0bWFwLnNldFpvb20obWFwLmdldFpvb20oKSArIHRoaXMuX3pvb21LZXlzW2tleV0pO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRMLkRvbUV2ZW50LnN0b3AoZSk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwuTWFwLmFkZEluaXRIb29rKCdhZGRIYW5kbGVyJywgJ2tleWJvYXJkJywgTC5NYXAuS2V5Ym9hcmQpO1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuSGFuZGxlci5NYXJrZXJEcmFnIGlzIHVzZWQgaW50ZXJuYWxseSBieSBMLk1hcmtlciB0byBtYWtlIHRoZSBtYXJrZXJzIGRyYWdnYWJsZS5cclxuICovXHJcblxyXG5MLkhhbmRsZXIuTWFya2VyRHJhZyA9IEwuSGFuZGxlci5leHRlbmQoe1xyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChtYXJrZXIpIHtcclxuXHRcdHRoaXMuX21hcmtlciA9IG1hcmtlcjtcclxuXHR9LFxyXG5cclxuXHRhZGRIb29rczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGljb24gPSB0aGlzLl9tYXJrZXIuX2ljb247XHJcblx0XHRpZiAoIXRoaXMuX2RyYWdnYWJsZSkge1xyXG5cdFx0XHR0aGlzLl9kcmFnZ2FibGUgPSBuZXcgTC5EcmFnZ2FibGUoaWNvbiwgaWNvbik7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fZHJhZ2dhYmxlXHJcblx0XHRcdC5vbignZHJhZ3N0YXJ0JywgdGhpcy5fb25EcmFnU3RhcnQsIHRoaXMpXHJcblx0XHRcdC5vbignZHJhZycsIHRoaXMuX29uRHJhZywgdGhpcylcclxuXHRcdFx0Lm9uKCdkcmFnZW5kJywgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcclxuXHRcdHRoaXMuX2RyYWdnYWJsZS5lbmFibGUoKTtcclxuXHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9tYXJrZXIuX2ljb24sICdsZWFmbGV0LW1hcmtlci1kcmFnZ2FibGUnKTtcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVIb29rczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fZHJhZ2dhYmxlXHJcblx0XHRcdC5vZmYoJ2RyYWdzdGFydCcsIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKVxyXG5cdFx0XHQub2ZmKCdkcmFnJywgdGhpcy5fb25EcmFnLCB0aGlzKVxyXG5cdFx0XHQub2ZmKCdkcmFnZW5kJywgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcclxuXHJcblx0XHR0aGlzLl9kcmFnZ2FibGUuZGlzYWJsZSgpO1xyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX21hcmtlci5faWNvbiwgJ2xlYWZsZXQtbWFya2VyLWRyYWdnYWJsZScpO1xyXG5cdH0sXHJcblxyXG5cdG1vdmVkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fZHJhZ2dhYmxlICYmIHRoaXMuX2RyYWdnYWJsZS5fbW92ZWQ7XHJcblx0fSxcclxuXHJcblx0X29uRHJhZ1N0YXJ0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9tYXJrZXJcclxuXHRcdCAgICAuY2xvc2VQb3B1cCgpXHJcblx0XHQgICAgLmZpcmUoJ21vdmVzdGFydCcpXHJcblx0XHQgICAgLmZpcmUoJ2RyYWdzdGFydCcpO1xyXG5cdH0sXHJcblxyXG5cdF9vbkRyYWc6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtYXJrZXIgPSB0aGlzLl9tYXJrZXIsXHJcblx0XHQgICAgc2hhZG93ID0gbWFya2VyLl9zaGFkb3csXHJcblx0XHQgICAgaWNvblBvcyA9IEwuRG9tVXRpbC5nZXRQb3NpdGlvbihtYXJrZXIuX2ljb24pLFxyXG5cdFx0ICAgIGxhdGxuZyA9IG1hcmtlci5fbWFwLmxheWVyUG9pbnRUb0xhdExuZyhpY29uUG9zKTtcclxuXHJcblx0XHQvLyB1cGRhdGUgc2hhZG93IHBvc2l0aW9uXHJcblx0XHRpZiAoc2hhZG93KSB7XHJcblx0XHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbihzaGFkb3csIGljb25Qb3MpO1xyXG5cdFx0fVxyXG5cclxuXHRcdG1hcmtlci5fbGF0bG5nID0gbGF0bG5nO1xyXG5cclxuXHRcdG1hcmtlclxyXG5cdFx0ICAgIC5maXJlKCdtb3ZlJywge2xhdGxuZzogbGF0bG5nfSlcclxuXHRcdCAgICAuZmlyZSgnZHJhZycpO1xyXG5cdH0sXHJcblxyXG5cdF9vbkRyYWdFbmQ6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR0aGlzLl9tYXJrZXJcclxuXHRcdCAgICAuZmlyZSgnbW92ZWVuZCcpXHJcblx0XHQgICAgLmZpcmUoJ2RyYWdlbmQnLCBlKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuQ29udHJvbCBpcyBhIGJhc2UgY2xhc3MgZm9yIGltcGxlbWVudGluZyBtYXAgY29udHJvbHMuIEhhbmRsZXMgcG9zaXRpb25pbmcuXHJcbiAqIEFsbCBvdGhlciBjb250cm9scyBleHRlbmQgZnJvbSB0aGlzIGNsYXNzLlxyXG4gKi9cclxuXHJcbkwuQ29udHJvbCA9IEwuQ2xhc3MuZXh0ZW5kKHtcclxuXHRvcHRpb25zOiB7XHJcblx0XHRwb3NpdGlvbjogJ3RvcHJpZ2h0J1xyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblx0fSxcclxuXHJcblx0Z2V0UG9zaXRpb246IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiB0aGlzLm9wdGlvbnMucG9zaXRpb247XHJcblx0fSxcclxuXHJcblx0c2V0UG9zaXRpb246IGZ1bmN0aW9uIChwb3NpdGlvbikge1xyXG5cdFx0dmFyIG1hcCA9IHRoaXMuX21hcDtcclxuXHJcblx0XHRpZiAobWFwKSB7XHJcblx0XHRcdG1hcC5yZW1vdmVDb250cm9sKHRoaXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMub3B0aW9ucy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuXHRcdGlmIChtYXApIHtcclxuXHRcdFx0bWFwLmFkZENvbnRyb2wodGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0Z2V0Q29udGFpbmVyOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fY29udGFpbmVyO1xyXG5cdH0sXHJcblxyXG5cdGFkZFRvOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHR0aGlzLl9tYXAgPSBtYXA7XHJcblxyXG5cdFx0dmFyIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRhaW5lciA9IHRoaXMub25BZGQobWFwKSxcclxuXHRcdCAgICBwb3MgPSB0aGlzLmdldFBvc2l0aW9uKCksXHJcblx0XHQgICAgY29ybmVyID0gbWFwLl9jb250cm9sQ29ybmVyc1twb3NdO1xyXG5cclxuXHRcdEwuRG9tVXRpbC5hZGRDbGFzcyhjb250YWluZXIsICdsZWFmbGV0LWNvbnRyb2wnKTtcclxuXHJcblx0XHRpZiAocG9zLmluZGV4T2YoJ2JvdHRvbScpICE9PSAtMSkge1xyXG5cdFx0XHRjb3JuZXIuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgY29ybmVyLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Y29ybmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlRnJvbTogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dmFyIHBvcyA9IHRoaXMuZ2V0UG9zaXRpb24oKSxcclxuXHRcdCAgICBjb3JuZXIgPSBtYXAuX2NvbnRyb2xDb3JuZXJzW3Bvc107XHJcblxyXG5cdFx0Y29ybmVyLnJlbW92ZUNoaWxkKHRoaXMuX2NvbnRhaW5lcik7XHJcblx0XHR0aGlzLl9tYXAgPSBudWxsO1xyXG5cclxuXHRcdGlmICh0aGlzLm9uUmVtb3ZlKSB7XHJcblx0XHRcdHRoaXMub25SZW1vdmUobWFwKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfcmVmb2N1c09uTWFwOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAodGhpcy5fbWFwKSB7XHJcblx0XHRcdHRoaXMuX21hcC5nZXRDb250YWluZXIoKS5mb2N1cygpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5MLmNvbnRyb2wgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5Db250cm9sKG9wdGlvbnMpO1xyXG59O1xyXG5cclxuXHJcbi8vIGFkZHMgY29udHJvbC1yZWxhdGVkIG1ldGhvZHMgdG8gTC5NYXBcclxuXHJcbkwuTWFwLmluY2x1ZGUoe1xyXG5cdGFkZENvbnRyb2w6IGZ1bmN0aW9uIChjb250cm9sKSB7XHJcblx0XHRjb250cm9sLmFkZFRvKHRoaXMpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0cmVtb3ZlQ29udHJvbDogZnVuY3Rpb24gKGNvbnRyb2wpIHtcclxuXHRcdGNvbnRyb2wucmVtb3ZlRnJvbSh0aGlzKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF9pbml0Q29udHJvbFBvczogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGNvcm5lcnMgPSB0aGlzLl9jb250cm9sQ29ybmVycyA9IHt9LFxyXG5cdFx0ICAgIGwgPSAnbGVhZmxldC0nLFxyXG5cdFx0ICAgIGNvbnRhaW5lciA9IHRoaXMuX2NvbnRyb2xDb250YWluZXIgPVxyXG5cdFx0ICAgICAgICAgICAgTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgbCArICdjb250cm9sLWNvbnRhaW5lcicsIHRoaXMuX2NvbnRhaW5lcik7XHJcblxyXG5cdFx0ZnVuY3Rpb24gY3JlYXRlQ29ybmVyKHZTaWRlLCBoU2lkZSkge1xyXG5cdFx0XHR2YXIgY2xhc3NOYW1lID0gbCArIHZTaWRlICsgJyAnICsgbCArIGhTaWRlO1xyXG5cclxuXHRcdFx0Y29ybmVyc1t2U2lkZSArIGhTaWRlXSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIGNsYXNzTmFtZSwgY29udGFpbmVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRjcmVhdGVDb3JuZXIoJ3RvcCcsICdsZWZ0Jyk7XHJcblx0XHRjcmVhdGVDb3JuZXIoJ3RvcCcsICdyaWdodCcpO1xyXG5cdFx0Y3JlYXRlQ29ybmVyKCdib3R0b20nLCAnbGVmdCcpO1xyXG5cdFx0Y3JlYXRlQ29ybmVyKCdib3R0b20nLCAncmlnaHQnKTtcclxuXHR9LFxyXG5cclxuXHRfY2xlYXJDb250cm9sUG9zOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR0aGlzLl9jb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5fY29udHJvbENvbnRhaW5lcik7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkNvbnRyb2wuWm9vbSBpcyB1c2VkIGZvciB0aGUgZGVmYXVsdCB6b29tIGJ1dHRvbnMgb24gdGhlIG1hcC5cclxuICovXHJcblxyXG5MLkNvbnRyb2wuWm9vbSA9IEwuQ29udHJvbC5leHRlbmQoe1xyXG5cdG9wdGlvbnM6IHtcclxuXHRcdHBvc2l0aW9uOiAndG9wbGVmdCcsXHJcblx0XHR6b29tSW5UZXh0OiAnKycsXHJcblx0XHR6b29tSW5UaXRsZTogJ1pvb20gaW4nLFxyXG5cdFx0em9vbU91dFRleHQ6ICctJyxcclxuXHRcdHpvb21PdXRUaXRsZTogJ1pvb20gb3V0J1xyXG5cdH0sXHJcblxyXG5cdG9uQWRkOiBmdW5jdGlvbiAobWFwKSB7XHJcblx0XHR2YXIgem9vbU5hbWUgPSAnbGVhZmxldC1jb250cm9sLXpvb20nLFxyXG5cdFx0ICAgIGNvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIHpvb21OYW1lICsgJyBsZWFmbGV0LWJhcicpO1xyXG5cclxuXHRcdHRoaXMuX21hcCA9IG1hcDtcclxuXHJcblx0XHR0aGlzLl96b29tSW5CdXR0b24gID0gdGhpcy5fY3JlYXRlQnV0dG9uKFxyXG5cdFx0ICAgICAgICB0aGlzLm9wdGlvbnMuem9vbUluVGV4dCwgdGhpcy5vcHRpb25zLnpvb21JblRpdGxlLFxyXG5cdFx0ICAgICAgICB6b29tTmFtZSArICctaW4nLCAgY29udGFpbmVyLCB0aGlzLl96b29tSW4sICB0aGlzKTtcclxuXHRcdHRoaXMuX3pvb21PdXRCdXR0b24gPSB0aGlzLl9jcmVhdGVCdXR0b24oXHJcblx0XHQgICAgICAgIHRoaXMub3B0aW9ucy56b29tT3V0VGV4dCwgdGhpcy5vcHRpb25zLnpvb21PdXRUaXRsZSxcclxuXHRcdCAgICAgICAgem9vbU5hbWUgKyAnLW91dCcsIGNvbnRhaW5lciwgdGhpcy5fem9vbU91dCwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5fdXBkYXRlRGlzYWJsZWQoKTtcclxuXHRcdG1hcC5vbignem9vbWVuZCB6b29tbGV2ZWxzY2hhbmdlJywgdGhpcy5fdXBkYXRlRGlzYWJsZWQsIHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiBjb250YWluZXI7XHJcblx0fSxcclxuXHJcblx0b25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdG1hcC5vZmYoJ3pvb21lbmQgem9vbWxldmVsc2NoYW5nZScsIHRoaXMuX3VwZGF0ZURpc2FibGVkLCB0aGlzKTtcclxuXHR9LFxyXG5cclxuXHRfem9vbUluOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dGhpcy5fbWFwLnpvb21JbihlLnNoaWZ0S2V5ID8gMyA6IDEpO1xyXG5cdH0sXHJcblxyXG5cdF96b29tT3V0OiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dGhpcy5fbWFwLnpvb21PdXQoZS5zaGlmdEtleSA/IDMgOiAxKTtcclxuXHR9LFxyXG5cclxuXHRfY3JlYXRlQnV0dG9uOiBmdW5jdGlvbiAoaHRtbCwgdGl0bGUsIGNsYXNzTmFtZSwgY29udGFpbmVyLCBmbiwgY29udGV4dCkge1xyXG5cdFx0dmFyIGxpbmsgPSBMLkRvbVV0aWwuY3JlYXRlKCdhJywgY2xhc3NOYW1lLCBjb250YWluZXIpO1xyXG5cdFx0bGluay5pbm5lckhUTUwgPSBodG1sO1xyXG5cdFx0bGluay5ocmVmID0gJyMnO1xyXG5cdFx0bGluay50aXRsZSA9IHRpdGxlO1xyXG5cclxuXHRcdHZhciBzdG9wID0gTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb247XHJcblxyXG5cdFx0TC5Eb21FdmVudFxyXG5cdFx0ICAgIC5vbihsaW5rLCAnY2xpY2snLCBzdG9wKVxyXG5cdFx0ICAgIC5vbihsaW5rLCAnbW91c2Vkb3duJywgc3RvcClcclxuXHRcdCAgICAub24obGluaywgJ2RibGNsaWNrJywgc3RvcClcclxuXHRcdCAgICAub24obGluaywgJ2NsaWNrJywgTC5Eb21FdmVudC5wcmV2ZW50RGVmYXVsdClcclxuXHRcdCAgICAub24obGluaywgJ2NsaWNrJywgZm4sIGNvbnRleHQpXHJcblx0XHQgICAgLm9uKGxpbmssICdjbGljaycsIHRoaXMuX3JlZm9jdXNPbk1hcCwgY29udGV4dCk7XHJcblxyXG5cdFx0cmV0dXJuIGxpbms7XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZURpc2FibGVkOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgbWFwID0gdGhpcy5fbWFwLFxyXG5cdFx0XHRjbGFzc05hbWUgPSAnbGVhZmxldC1kaXNhYmxlZCc7XHJcblxyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3pvb21JbkJ1dHRvbiwgY2xhc3NOYW1lKTtcclxuXHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl96b29tT3V0QnV0dG9uLCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdGlmIChtYXAuX3pvb20gPT09IG1hcC5nZXRNaW5ab29tKCkpIHtcclxuXHRcdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3pvb21PdXRCdXR0b24sIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0XHRpZiAobWFwLl96b29tID09PSBtYXAuZ2V0TWF4Wm9vbSgpKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl96b29tSW5CdXR0b24sIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG59KTtcclxuXHJcbkwuTWFwLm1lcmdlT3B0aW9ucyh7XHJcblx0em9vbUNvbnRyb2w6IHRydWVcclxufSk7XHJcblxyXG5MLk1hcC5hZGRJbml0SG9vayhmdW5jdGlvbiAoKSB7XHJcblx0aWYgKHRoaXMub3B0aW9ucy56b29tQ29udHJvbCkge1xyXG5cdFx0dGhpcy56b29tQ29udHJvbCA9IG5ldyBMLkNvbnRyb2wuWm9vbSgpO1xyXG5cdFx0dGhpcy5hZGRDb250cm9sKHRoaXMuem9vbUNvbnRyb2wpO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLmNvbnRyb2wuem9vbSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0cmV0dXJuIG5ldyBMLkNvbnRyb2wuWm9vbShvcHRpb25zKTtcclxufTtcclxuXHJcblxyXG5cclxuLypcclxuICogTC5Db250cm9sLkF0dHJpYnV0aW9uIGlzIHVzZWQgZm9yIGRpc3BsYXlpbmcgYXR0cmlidXRpb24gb24gdGhlIG1hcCAoYWRkZWQgYnkgZGVmYXVsdCkuXHJcbiAqL1xyXG5cclxuTC5Db250cm9sLkF0dHJpYnV0aW9uID0gTC5Db250cm9sLmV4dGVuZCh7XHJcblx0b3B0aW9uczoge1xyXG5cdFx0cG9zaXRpb246ICdib3R0b21yaWdodCcsXHJcblx0XHRwcmVmaXg6ICc8YSBocmVmPVwiaHR0cDovL2xlYWZsZXRqcy5jb21cIiB0aXRsZT1cIkEgSlMgbGlicmFyeSBmb3IgaW50ZXJhY3RpdmUgbWFwc1wiPkxlYWZsZXQ8L2E+J1xyXG5cdH0sXHJcblxyXG5cdGluaXRpYWxpemU6IGZ1bmN0aW9uIChvcHRpb25zKSB7XHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5fYXR0cmlidXRpb25zID0ge307XHJcblx0fSxcclxuXHJcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdHRoaXMuX2NvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LWNvbnRyb2wtYXR0cmlidXRpb24nKTtcclxuXHRcdEwuRG9tRXZlbnQuZGlzYWJsZUNsaWNrUHJvcGFnYXRpb24odGhpcy5fY29udGFpbmVyKTtcclxuXHJcblx0XHRmb3IgKHZhciBpIGluIG1hcC5fbGF5ZXJzKSB7XHJcblx0XHRcdGlmIChtYXAuX2xheWVyc1tpXS5nZXRBdHRyaWJ1dGlvbikge1xyXG5cdFx0XHRcdHRoaXMuYWRkQXR0cmlidXRpb24obWFwLl9sYXllcnNbaV0uZ2V0QXR0cmlidXRpb24oKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRtYXBcclxuXHRcdCAgICAub24oJ2xheWVyYWRkJywgdGhpcy5fb25MYXllckFkZCwgdGhpcylcclxuXHRcdCAgICAub24oJ2xheWVycmVtb3ZlJywgdGhpcy5fb25MYXllclJlbW92ZSwgdGhpcyk7XHJcblxyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX2NvbnRhaW5lcjtcclxuXHR9LFxyXG5cclxuXHRvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0bWFwXHJcblx0XHQgICAgLm9mZignbGF5ZXJhZGQnLCB0aGlzLl9vbkxheWVyQWRkKVxyXG5cdFx0ICAgIC5vZmYoJ2xheWVycmVtb3ZlJywgdGhpcy5fb25MYXllclJlbW92ZSk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHNldFByZWZpeDogZnVuY3Rpb24gKHByZWZpeCkge1xyXG5cdFx0dGhpcy5vcHRpb25zLnByZWZpeCA9IHByZWZpeDtcclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0YWRkQXR0cmlidXRpb246IGZ1bmN0aW9uICh0ZXh0KSB7XHJcblx0XHRpZiAoIXRleHQpIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9hdHRyaWJ1dGlvbnNbdGV4dF0pIHtcclxuXHRcdFx0dGhpcy5fYXR0cmlidXRpb25zW3RleHRdID0gMDtcclxuXHRcdH1cclxuXHRcdHRoaXMuX2F0dHJpYnV0aW9uc1t0ZXh0XSsrO1xyXG5cclxuXHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHJlbW92ZUF0dHJpYnV0aW9uOiBmdW5jdGlvbiAodGV4dCkge1xyXG5cdFx0aWYgKCF0ZXh0KSB7IHJldHVybjsgfVxyXG5cclxuXHRcdGlmICh0aGlzLl9hdHRyaWJ1dGlvbnNbdGV4dF0pIHtcclxuXHRcdFx0dGhpcy5fYXR0cmlidXRpb25zW3RleHRdLS07XHJcblx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmICghdGhpcy5fbWFwKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHZhciBhdHRyaWJzID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSBpbiB0aGlzLl9hdHRyaWJ1dGlvbnMpIHtcclxuXHRcdFx0aWYgKHRoaXMuX2F0dHJpYnV0aW9uc1tpXSkge1xyXG5cdFx0XHRcdGF0dHJpYnMucHVzaChpKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBwcmVmaXhBbmRBdHRyaWJzID0gW107XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5wcmVmaXgpIHtcclxuXHRcdFx0cHJlZml4QW5kQXR0cmlicy5wdXNoKHRoaXMub3B0aW9ucy5wcmVmaXgpO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGF0dHJpYnMubGVuZ3RoKSB7XHJcblx0XHRcdHByZWZpeEFuZEF0dHJpYnMucHVzaChhdHRyaWJzLmpvaW4oJywgJykpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2NvbnRhaW5lci5pbm5lckhUTUwgPSBwcmVmaXhBbmRBdHRyaWJzLmpvaW4oJyB8ICcpO1xyXG5cdH0sXHJcblxyXG5cdF9vbkxheWVyQWRkOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKGUubGF5ZXIuZ2V0QXR0cmlidXRpb24pIHtcclxuXHRcdFx0dGhpcy5hZGRBdHRyaWJ1dGlvbihlLmxheWVyLmdldEF0dHJpYnV0aW9uKCkpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9vbkxheWVyUmVtb3ZlOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKGUubGF5ZXIuZ2V0QXR0cmlidXRpb24pIHtcclxuXHRcdFx0dGhpcy5yZW1vdmVBdHRyaWJ1dGlvbihlLmxheWVyLmdldEF0dHJpYnV0aW9uKCkpO1xyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5MLk1hcC5tZXJnZU9wdGlvbnMoe1xyXG5cdGF0dHJpYnV0aW9uQ29udHJvbDogdHJ1ZVxyXG59KTtcclxuXHJcbkwuTWFwLmFkZEluaXRIb29rKGZ1bmN0aW9uICgpIHtcclxuXHRpZiAodGhpcy5vcHRpb25zLmF0dHJpYnV0aW9uQ29udHJvbCkge1xyXG5cdFx0dGhpcy5hdHRyaWJ1dGlvbkNvbnRyb2wgPSAobmV3IEwuQ29udHJvbC5BdHRyaWJ1dGlvbigpKS5hZGRUbyh0aGlzKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuTC5jb250cm9sLmF0dHJpYnV0aW9uID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuQ29udHJvbC5BdHRyaWJ1dGlvbihvcHRpb25zKTtcclxufTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLkNvbnRyb2wuU2NhbGUgaXMgdXNlZCBmb3IgZGlzcGxheWluZyBtZXRyaWMvaW1wZXJpYWwgc2NhbGUgb24gdGhlIG1hcC5cclxuICovXHJcblxyXG5MLkNvbnRyb2wuU2NhbGUgPSBMLkNvbnRyb2wuZXh0ZW5kKHtcclxuXHRvcHRpb25zOiB7XHJcblx0XHRwb3NpdGlvbjogJ2JvdHRvbWxlZnQnLFxyXG5cdFx0bWF4V2lkdGg6IDEwMCxcclxuXHRcdG1ldHJpYzogdHJ1ZSxcclxuXHRcdGltcGVyaWFsOiB0cnVlLFxyXG5cdFx0dXBkYXRlV2hlbklkbGU6IGZhbHNlXHJcblx0fSxcclxuXHJcblx0b25BZGQ6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdHRoaXMuX21hcCA9IG1hcDtcclxuXHJcblx0XHR2YXIgY2xhc3NOYW1lID0gJ2xlYWZsZXQtY29udHJvbC1zY2FsZScsXHJcblx0XHQgICAgY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lKSxcclxuXHRcdCAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xyXG5cclxuXHRcdHRoaXMuX2FkZFNjYWxlcyhvcHRpb25zLCBjbGFzc05hbWUsIGNvbnRhaW5lcik7XHJcblxyXG5cdFx0bWFwLm9uKG9wdGlvbnMudXBkYXRlV2hlbklkbGUgPyAnbW92ZWVuZCcgOiAnbW92ZScsIHRoaXMuX3VwZGF0ZSwgdGhpcyk7XHJcblx0XHRtYXAud2hlblJlYWR5KHRoaXMuX3VwZGF0ZSwgdGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIGNvbnRhaW5lcjtcclxuXHR9LFxyXG5cclxuXHRvblJlbW92ZTogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0bWFwLm9mZih0aGlzLm9wdGlvbnMudXBkYXRlV2hlbklkbGUgPyAnbW92ZWVuZCcgOiAnbW92ZScsIHRoaXMuX3VwZGF0ZSwgdGhpcyk7XHJcblx0fSxcclxuXHJcblx0X2FkZFNjYWxlczogZnVuY3Rpb24gKG9wdGlvbnMsIGNsYXNzTmFtZSwgY29udGFpbmVyKSB7XHJcblx0XHRpZiAob3B0aW9ucy5tZXRyaWMpIHtcclxuXHRcdFx0dGhpcy5fbVNjYWxlID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgY2xhc3NOYW1lICsgJy1saW5lJywgY29udGFpbmVyKTtcclxuXHRcdH1cclxuXHRcdGlmIChvcHRpb25zLmltcGVyaWFsKSB7XHJcblx0XHRcdHRoaXMuX2lTY2FsZSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIGNsYXNzTmFtZSArICctbGluZScsIGNvbnRhaW5lcik7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGJvdW5kcyA9IHRoaXMuX21hcC5nZXRCb3VuZHMoKSxcclxuXHRcdCAgICBjZW50ZXJMYXQgPSBib3VuZHMuZ2V0Q2VudGVyKCkubGF0LFxyXG5cdFx0ICAgIGhhbGZXb3JsZE1ldGVycyA9IDYzNzgxMzcgKiBNYXRoLlBJICogTWF0aC5jb3MoY2VudGVyTGF0ICogTWF0aC5QSSAvIDE4MCksXHJcblx0XHQgICAgZGlzdCA9IGhhbGZXb3JsZE1ldGVycyAqIChib3VuZHMuZ2V0Tm9ydGhFYXN0KCkubG5nIC0gYm91bmRzLmdldFNvdXRoV2VzdCgpLmxuZykgLyAxODAsXHJcblxyXG5cdFx0ICAgIHNpemUgPSB0aGlzLl9tYXAuZ2V0U2l6ZSgpLFxyXG5cdFx0ICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXHJcblx0XHQgICAgbWF4TWV0ZXJzID0gMDtcclxuXHJcblx0XHRpZiAoc2l6ZS54ID4gMCkge1xyXG5cdFx0XHRtYXhNZXRlcnMgPSBkaXN0ICogKG9wdGlvbnMubWF4V2lkdGggLyBzaXplLngpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX3VwZGF0ZVNjYWxlcyhvcHRpb25zLCBtYXhNZXRlcnMpO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGVTY2FsZXM6IGZ1bmN0aW9uIChvcHRpb25zLCBtYXhNZXRlcnMpIHtcclxuXHRcdGlmIChvcHRpb25zLm1ldHJpYyAmJiBtYXhNZXRlcnMpIHtcclxuXHRcdFx0dGhpcy5fdXBkYXRlTWV0cmljKG1heE1ldGVycyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKG9wdGlvbnMuaW1wZXJpYWwgJiYgbWF4TWV0ZXJzKSB7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZUltcGVyaWFsKG1heE1ldGVycyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X3VwZGF0ZU1ldHJpYzogZnVuY3Rpb24gKG1heE1ldGVycykge1xyXG5cdFx0dmFyIG1ldGVycyA9IHRoaXMuX2dldFJvdW5kTnVtKG1heE1ldGVycyk7XHJcblxyXG5cdFx0dGhpcy5fbVNjYWxlLnN0eWxlLndpZHRoID0gdGhpcy5fZ2V0U2NhbGVXaWR0aChtZXRlcnMgLyBtYXhNZXRlcnMpICsgJ3B4JztcclxuXHRcdHRoaXMuX21TY2FsZS5pbm5lckhUTUwgPSBtZXRlcnMgPCAxMDAwID8gbWV0ZXJzICsgJyBtJyA6IChtZXRlcnMgLyAxMDAwKSArICcga20nO1xyXG5cdH0sXHJcblxyXG5cdF91cGRhdGVJbXBlcmlhbDogZnVuY3Rpb24gKG1heE1ldGVycykge1xyXG5cdFx0dmFyIG1heEZlZXQgPSBtYXhNZXRlcnMgKiAzLjI4MDgzOTksXHJcblx0XHQgICAgc2NhbGUgPSB0aGlzLl9pU2NhbGUsXHJcblx0XHQgICAgbWF4TWlsZXMsIG1pbGVzLCBmZWV0O1xyXG5cclxuXHRcdGlmIChtYXhGZWV0ID4gNTI4MCkge1xyXG5cdFx0XHRtYXhNaWxlcyA9IG1heEZlZXQgLyA1MjgwO1xyXG5cdFx0XHRtaWxlcyA9IHRoaXMuX2dldFJvdW5kTnVtKG1heE1pbGVzKTtcclxuXHJcblx0XHRcdHNjYWxlLnN0eWxlLndpZHRoID0gdGhpcy5fZ2V0U2NhbGVXaWR0aChtaWxlcyAvIG1heE1pbGVzKSArICdweCc7XHJcblx0XHRcdHNjYWxlLmlubmVySFRNTCA9IG1pbGVzICsgJyBtaSc7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZmVldCA9IHRoaXMuX2dldFJvdW5kTnVtKG1heEZlZXQpO1xyXG5cclxuXHRcdFx0c2NhbGUuc3R5bGUud2lkdGggPSB0aGlzLl9nZXRTY2FsZVdpZHRoKGZlZXQgLyBtYXhGZWV0KSArICdweCc7XHJcblx0XHRcdHNjYWxlLmlubmVySFRNTCA9IGZlZXQgKyAnIGZ0JztcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfZ2V0U2NhbGVXaWR0aDogZnVuY3Rpb24gKHJhdGlvKSB7XHJcblx0XHRyZXR1cm4gTWF0aC5yb3VuZCh0aGlzLm9wdGlvbnMubWF4V2lkdGggKiByYXRpbykgLSAxMDtcclxuXHR9LFxyXG5cclxuXHRfZ2V0Um91bmROdW06IGZ1bmN0aW9uIChudW0pIHtcclxuXHRcdHZhciBwb3cxMCA9IE1hdGgucG93KDEwLCAoTWF0aC5mbG9vcihudW0pICsgJycpLmxlbmd0aCAtIDEpLFxyXG5cdFx0ICAgIGQgPSBudW0gLyBwb3cxMDtcclxuXHJcblx0XHRkID0gZCA+PSAxMCA/IDEwIDogZCA+PSA1ID8gNSA6IGQgPj0gMyA/IDMgOiBkID49IDIgPyAyIDogMTtcclxuXHJcblx0XHRyZXR1cm4gcG93MTAgKiBkO1xyXG5cdH1cclxufSk7XHJcblxyXG5MLmNvbnRyb2wuc2NhbGUgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG5cdHJldHVybiBuZXcgTC5Db250cm9sLlNjYWxlKG9wdGlvbnMpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuQ29udHJvbC5MYXllcnMgaXMgYSBjb250cm9sIHRvIGFsbG93IHVzZXJzIHRvIHN3aXRjaCBiZXR3ZWVuIGRpZmZlcmVudCBsYXllcnMgb24gdGhlIG1hcC5cclxuICovXHJcblxyXG5MLkNvbnRyb2wuTGF5ZXJzID0gTC5Db250cm9sLmV4dGVuZCh7XHJcblx0b3B0aW9uczoge1xyXG5cdFx0Y29sbGFwc2VkOiB0cnVlLFxyXG5cdFx0cG9zaXRpb246ICd0b3ByaWdodCcsXHJcblx0XHRhdXRvWkluZGV4OiB0cnVlXHJcblx0fSxcclxuXHJcblx0aW5pdGlhbGl6ZTogZnVuY3Rpb24gKGJhc2VMYXllcnMsIG92ZXJsYXlzLCBvcHRpb25zKSB7XHJcblx0XHRMLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XHJcblxyXG5cdFx0dGhpcy5fbGF5ZXJzID0ge307XHJcblx0XHR0aGlzLl9sYXN0WkluZGV4ID0gMDtcclxuXHRcdHRoaXMuX2hhbmRsaW5nQ2xpY2sgPSBmYWxzZTtcclxuXHJcblx0XHRmb3IgKHZhciBpIGluIGJhc2VMYXllcnMpIHtcclxuXHRcdFx0dGhpcy5fYWRkTGF5ZXIoYmFzZUxheWVyc1tpXSwgaSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yIChpIGluIG92ZXJsYXlzKSB7XHJcblx0XHRcdHRoaXMuX2FkZExheWVyKG92ZXJsYXlzW2ldLCBpLCB0cnVlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG5cdFx0dGhpcy5faW5pdExheW91dCgpO1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblxyXG5cdFx0bWFwXHJcblx0XHQgICAgLm9uKCdsYXllcmFkZCcsIHRoaXMuX29uTGF5ZXJDaGFuZ2UsIHRoaXMpXHJcblx0XHQgICAgLm9uKCdsYXllcnJlbW92ZScsIHRoaXMuX29uTGF5ZXJDaGFuZ2UsIHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9jb250YWluZXI7XHJcblx0fSxcclxuXHJcblx0b25SZW1vdmU6IGZ1bmN0aW9uIChtYXApIHtcclxuXHRcdG1hcFxyXG5cdFx0ICAgIC5vZmYoJ2xheWVyYWRkJywgdGhpcy5fb25MYXllckNoYW5nZSwgdGhpcylcclxuXHRcdCAgICAub2ZmKCdsYXllcnJlbW92ZScsIHRoaXMuX29uTGF5ZXJDaGFuZ2UsIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdGFkZEJhc2VMYXllcjogZnVuY3Rpb24gKGxheWVyLCBuYW1lKSB7XHJcblx0XHR0aGlzLl9hZGRMYXllcihsYXllciwgbmFtZSk7XHJcblx0XHR0aGlzLl91cGRhdGUoKTtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdGFkZE92ZXJsYXk6IGZ1bmN0aW9uIChsYXllciwgbmFtZSkge1xyXG5cdFx0dGhpcy5fYWRkTGF5ZXIobGF5ZXIsIG5hbWUsIHRydWUpO1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRyZW1vdmVMYXllcjogZnVuY3Rpb24gKGxheWVyKSB7XHJcblx0XHR2YXIgaWQgPSBMLnN0YW1wKGxheWVyKTtcclxuXHRcdGRlbGV0ZSB0aGlzLl9sYXllcnNbaWRdO1xyXG5cdFx0dGhpcy5fdXBkYXRlKCk7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfaW5pdExheW91dDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGNsYXNzTmFtZSA9ICdsZWFmbGV0LWNvbnRyb2wtbGF5ZXJzJyxcclxuXHRcdCAgICBjb250YWluZXIgPSB0aGlzLl9jb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUpO1xyXG5cclxuXHRcdC8vTWFrZXMgdGhpcyB3b3JrIG9uIElFMTAgVG91Y2ggZGV2aWNlcyBieSBzdG9wcGluZyBpdCBmcm9tIGZpcmluZyBhIG1vdXNlb3V0IGV2ZW50IHdoZW4gdGhlIHRvdWNoIGlzIHJlbGVhc2VkXHJcblx0XHRjb250YWluZXIuc2V0QXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJywgdHJ1ZSk7XHJcblxyXG5cdFx0aWYgKCFMLkJyb3dzZXIudG91Y2gpIHtcclxuXHRcdFx0TC5Eb21FdmVudFxyXG5cdFx0XHRcdC5kaXNhYmxlQ2xpY2tQcm9wYWdhdGlvbihjb250YWluZXIpXHJcblx0XHRcdFx0LmRpc2FibGVTY3JvbGxQcm9wYWdhdGlvbihjb250YWluZXIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0TC5Eb21FdmVudC5vbihjb250YWluZXIsICdjbGljaycsIEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZm9ybSA9IHRoaXMuX2Zvcm0gPSBMLkRvbVV0aWwuY3JlYXRlKCdmb3JtJywgY2xhc3NOYW1lICsgJy1saXN0Jyk7XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5jb2xsYXBzZWQpIHtcclxuXHRcdFx0aWYgKCFMLkJyb3dzZXIuYW5kcm9pZCkge1xyXG5cdFx0XHRcdEwuRG9tRXZlbnRcclxuXHRcdFx0XHQgICAgLm9uKGNvbnRhaW5lciwgJ21vdXNlb3ZlcicsIHRoaXMuX2V4cGFuZCwgdGhpcylcclxuXHRcdFx0XHQgICAgLm9uKGNvbnRhaW5lciwgJ21vdXNlb3V0JywgdGhpcy5fY29sbGFwc2UsIHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBsaW5rID0gdGhpcy5fbGF5ZXJzTGluayA9IEwuRG9tVXRpbC5jcmVhdGUoJ2EnLCBjbGFzc05hbWUgKyAnLXRvZ2dsZScsIGNvbnRhaW5lcik7XHJcblx0XHRcdGxpbmsuaHJlZiA9ICcjJztcclxuXHRcdFx0bGluay50aXRsZSA9ICdMYXllcnMnO1xyXG5cclxuXHRcdFx0aWYgKEwuQnJvd3Nlci50b3VjaCkge1xyXG5cdFx0XHRcdEwuRG9tRXZlbnRcclxuXHRcdFx0XHQgICAgLm9uKGxpbmssICdjbGljaycsIEwuRG9tRXZlbnQuc3RvcClcclxuXHRcdFx0XHQgICAgLm9uKGxpbmssICdjbGljaycsIHRoaXMuX2V4cGFuZCwgdGhpcyk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0TC5Eb21FdmVudC5vbihsaW5rLCAnZm9jdXMnLCB0aGlzLl9leHBhbmQsIHRoaXMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vV29yayBhcm91bmQgZm9yIEZpcmVmb3ggYW5kcm9pZCBpc3N1ZSBodHRwczovL2dpdGh1Yi5jb20vTGVhZmxldC9MZWFmbGV0L2lzc3Vlcy8yMDMzXHJcblx0XHRcdEwuRG9tRXZlbnQub24oZm9ybSwgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHNldFRpbWVvdXQoTC5iaW5kKHRoaXMuX29uSW5wdXRDbGljaywgdGhpcyksIDApO1xyXG5cdFx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHRcdHRoaXMuX21hcC5vbignY2xpY2snLCB0aGlzLl9jb2xsYXBzZSwgdGhpcyk7XHJcblx0XHRcdC8vIFRPRE8ga2V5Ym9hcmQgYWNjZXNzaWJpbGl0eVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5fZXhwYW5kKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fYmFzZUxheWVyc0xpc3QgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUgKyAnLWJhc2UnLCBmb3JtKTtcclxuXHRcdHRoaXMuX3NlcGFyYXRvciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsIGNsYXNzTmFtZSArICctc2VwYXJhdG9yJywgZm9ybSk7XHJcblx0XHR0aGlzLl9vdmVybGF5c0xpc3QgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCBjbGFzc05hbWUgKyAnLW92ZXJsYXlzJywgZm9ybSk7XHJcblxyXG5cdFx0Y29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xyXG5cdH0sXHJcblxyXG5cdF9hZGRMYXllcjogZnVuY3Rpb24gKGxheWVyLCBuYW1lLCBvdmVybGF5KSB7XHJcblx0XHR2YXIgaWQgPSBMLnN0YW1wKGxheWVyKTtcclxuXHJcblx0XHR0aGlzLl9sYXllcnNbaWRdID0ge1xyXG5cdFx0XHRsYXllcjogbGF5ZXIsXHJcblx0XHRcdG5hbWU6IG5hbWUsXHJcblx0XHRcdG92ZXJsYXk6IG92ZXJsYXlcclxuXHRcdH07XHJcblxyXG5cdFx0aWYgKHRoaXMub3B0aW9ucy5hdXRvWkluZGV4ICYmIGxheWVyLnNldFpJbmRleCkge1xyXG5cdFx0XHR0aGlzLl9sYXN0WkluZGV4Kys7XHJcblx0XHRcdGxheWVyLnNldFpJbmRleCh0aGlzLl9sYXN0WkluZGV4KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHRfdXBkYXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX2NvbnRhaW5lcikge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fYmFzZUxheWVyc0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcblx0XHR0aGlzLl9vdmVybGF5c0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG5cdFx0dmFyIGJhc2VMYXllcnNQcmVzZW50ID0gZmFsc2UsXHJcblx0XHQgICAgb3ZlcmxheXNQcmVzZW50ID0gZmFsc2UsXHJcblx0XHQgICAgaSwgb2JqO1xyXG5cclxuXHRcdGZvciAoaSBpbiB0aGlzLl9sYXllcnMpIHtcclxuXHRcdFx0b2JqID0gdGhpcy5fbGF5ZXJzW2ldO1xyXG5cdFx0XHR0aGlzLl9hZGRJdGVtKG9iaik7XHJcblx0XHRcdG92ZXJsYXlzUHJlc2VudCA9IG92ZXJsYXlzUHJlc2VudCB8fCBvYmoub3ZlcmxheTtcclxuXHRcdFx0YmFzZUxheWVyc1ByZXNlbnQgPSBiYXNlTGF5ZXJzUHJlc2VudCB8fCAhb2JqLm92ZXJsYXk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fc2VwYXJhdG9yLnN0eWxlLmRpc3BsYXkgPSBvdmVybGF5c1ByZXNlbnQgJiYgYmFzZUxheWVyc1ByZXNlbnQgPyAnJyA6ICdub25lJztcclxuXHR9LFxyXG5cclxuXHRfb25MYXllckNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciBvYmogPSB0aGlzLl9sYXllcnNbTC5zdGFtcChlLmxheWVyKV07XHJcblxyXG5cdFx0aWYgKCFvYmopIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0aWYgKCF0aGlzLl9oYW5kbGluZ0NsaWNrKSB7XHJcblx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciB0eXBlID0gb2JqLm92ZXJsYXkgP1xyXG5cdFx0XHQoZS50eXBlID09PSAnbGF5ZXJhZGQnID8gJ292ZXJsYXlhZGQnIDogJ292ZXJsYXlyZW1vdmUnKSA6XHJcblx0XHRcdChlLnR5cGUgPT09ICdsYXllcmFkZCcgPyAnYmFzZWxheWVyY2hhbmdlJyA6IG51bGwpO1xyXG5cclxuXHRcdGlmICh0eXBlKSB7XHJcblx0XHRcdHRoaXMuX21hcC5maXJlKHR5cGUsIG9iaik7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0Ly8gSUU3IGJ1Z3Mgb3V0IGlmIHlvdSBjcmVhdGUgYSByYWRpbyBkeW5hbWljYWxseSwgc28geW91IGhhdmUgdG8gZG8gaXQgdGhpcyBoYWNreSB3YXkgKHNlZSBodHRwOi8vYml0Lmx5L1BxWUxCZSlcclxuXHRfY3JlYXRlUmFkaW9FbGVtZW50OiBmdW5jdGlvbiAobmFtZSwgY2hlY2tlZCkge1xyXG5cclxuXHRcdHZhciByYWRpb0h0bWwgPSAnPGlucHV0IHR5cGU9XCJyYWRpb1wiIGNsYXNzPVwibGVhZmxldC1jb250cm9sLWxheWVycy1zZWxlY3RvclwiIG5hbWU9XCInICsgbmFtZSArICdcIic7XHJcblx0XHRpZiAoY2hlY2tlZCkge1xyXG5cdFx0XHRyYWRpb0h0bWwgKz0gJyBjaGVja2VkPVwiY2hlY2tlZFwiJztcclxuXHRcdH1cclxuXHRcdHJhZGlvSHRtbCArPSAnLz4nO1xyXG5cclxuXHRcdHZhciByYWRpb0ZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRyYWRpb0ZyYWdtZW50LmlubmVySFRNTCA9IHJhZGlvSHRtbDtcclxuXHJcblx0XHRyZXR1cm4gcmFkaW9GcmFnbWVudC5maXJzdENoaWxkO1xyXG5cdH0sXHJcblxyXG5cdF9hZGRJdGVtOiBmdW5jdGlvbiAob2JqKSB7XHJcblx0XHR2YXIgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpLFxyXG5cdFx0ICAgIGlucHV0LFxyXG5cdFx0ICAgIGNoZWNrZWQgPSB0aGlzLl9tYXAuaGFzTGF5ZXIob2JqLmxheWVyKTtcclxuXHJcblx0XHRpZiAob2JqLm92ZXJsYXkpIHtcclxuXHRcdFx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdFx0XHRpbnB1dC50eXBlID0gJ2NoZWNrYm94JztcclxuXHRcdFx0aW5wdXQuY2xhc3NOYW1lID0gJ2xlYWZsZXQtY29udHJvbC1sYXllcnMtc2VsZWN0b3InO1xyXG5cdFx0XHRpbnB1dC5kZWZhdWx0Q2hlY2tlZCA9IGNoZWNrZWQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpbnB1dCA9IHRoaXMuX2NyZWF0ZVJhZGlvRWxlbWVudCgnbGVhZmxldC1iYXNlLWxheWVycycsIGNoZWNrZWQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlucHV0LmxheWVySWQgPSBMLnN0YW1wKG9iai5sYXllcik7XHJcblxyXG5cdFx0TC5Eb21FdmVudC5vbihpbnB1dCwgJ2NsaWNrJywgdGhpcy5fb25JbnB1dENsaWNrLCB0aGlzKTtcclxuXHJcblx0XHR2YXIgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuXHRcdG5hbWUuaW5uZXJIVE1MID0gJyAnICsgb2JqLm5hbWU7XHJcblxyXG5cdFx0bGFiZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xyXG5cdFx0bGFiZWwuYXBwZW5kQ2hpbGQobmFtZSk7XHJcblxyXG5cdFx0dmFyIGNvbnRhaW5lciA9IG9iai5vdmVybGF5ID8gdGhpcy5fb3ZlcmxheXNMaXN0IDogdGhpcy5fYmFzZUxheWVyc0xpc3Q7XHJcblx0XHRjb250YWluZXIuYXBwZW5kQ2hpbGQobGFiZWwpO1xyXG5cclxuXHRcdHJldHVybiBsYWJlbDtcclxuXHR9LFxyXG5cclxuXHRfb25JbnB1dENsaWNrOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaSwgaW5wdXQsIG9iaixcclxuXHRcdCAgICBpbnB1dHMgPSB0aGlzLl9mb3JtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpLFxyXG5cdFx0ICAgIGlucHV0c0xlbiA9IGlucHV0cy5sZW5ndGg7XHJcblxyXG5cdFx0dGhpcy5faGFuZGxpbmdDbGljayA9IHRydWU7XHJcblxyXG5cdFx0Zm9yIChpID0gMDsgaSA8IGlucHV0c0xlbjsgaSsrKSB7XHJcblx0XHRcdGlucHV0ID0gaW5wdXRzW2ldO1xyXG5cdFx0XHRvYmogPSB0aGlzLl9sYXllcnNbaW5wdXQubGF5ZXJJZF07XHJcblxyXG5cdFx0XHRpZiAoaW5wdXQuY2hlY2tlZCAmJiAhdGhpcy5fbWFwLmhhc0xheWVyKG9iai5sYXllcikpIHtcclxuXHRcdFx0XHR0aGlzLl9tYXAuYWRkTGF5ZXIob2JqLmxheWVyKTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoIWlucHV0LmNoZWNrZWQgJiYgdGhpcy5fbWFwLmhhc0xheWVyKG9iai5sYXllcikpIHtcclxuXHRcdFx0XHR0aGlzLl9tYXAucmVtb3ZlTGF5ZXIob2JqLmxheWVyKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuX2hhbmRsaW5nQ2xpY2sgPSBmYWxzZTtcclxuXHJcblx0XHR0aGlzLl9yZWZvY3VzT25NYXAoKTtcclxuXHR9LFxyXG5cclxuXHRfZXhwYW5kOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fY29udGFpbmVyLCAnbGVhZmxldC1jb250cm9sLWxheWVycy1leHBhbmRlZCcpO1xyXG5cdH0sXHJcblxyXG5cdF9jb2xsYXBzZTogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5fY29udGFpbmVyLmNsYXNzTmFtZSA9IHRoaXMuX2NvbnRhaW5lci5jbGFzc05hbWUucmVwbGFjZSgnIGxlYWZsZXQtY29udHJvbC1sYXllcnMtZXhwYW5kZWQnLCAnJyk7XHJcblx0fVxyXG59KTtcclxuXHJcbkwuY29udHJvbC5sYXllcnMgPSBmdW5jdGlvbiAoYmFzZUxheWVycywgb3ZlcmxheXMsIG9wdGlvbnMpIHtcclxuXHRyZXR1cm4gbmV3IEwuQ29udHJvbC5MYXllcnMoYmFzZUxheWVycywgb3ZlcmxheXMsIG9wdGlvbnMpO1xyXG59O1xyXG5cclxuXHJcbi8qXHJcbiAqIEwuUG9zQW5pbWF0aW9uIGlzIHVzZWQgYnkgTGVhZmxldCBpbnRlcm5hbGx5IGZvciBwYW4gYW5pbWF0aW9ucy5cclxuICovXHJcblxyXG5MLlBvc0FuaW1hdGlvbiA9IEwuQ2xhc3MuZXh0ZW5kKHtcclxuXHRpbmNsdWRlczogTC5NaXhpbi5FdmVudHMsXHJcblxyXG5cdHJ1bjogZnVuY3Rpb24gKGVsLCBuZXdQb3MsIGR1cmF0aW9uLCBlYXNlTGluZWFyaXR5KSB7IC8vIChIVE1MRWxlbWVudCwgUG9pbnRbLCBOdW1iZXIsIE51bWJlcl0pXHJcblx0XHR0aGlzLnN0b3AoKTtcclxuXHJcblx0XHR0aGlzLl9lbCA9IGVsO1xyXG5cdFx0dGhpcy5faW5Qcm9ncmVzcyA9IHRydWU7XHJcblx0XHR0aGlzLl9uZXdQb3MgPSBuZXdQb3M7XHJcblxyXG5cdFx0dGhpcy5maXJlKCdzdGFydCcpO1xyXG5cclxuXHRcdGVsLnN0eWxlW0wuRG9tVXRpbC5UUkFOU0lUSU9OXSA9ICdhbGwgJyArIChkdXJhdGlvbiB8fCAwLjI1KSArXHJcblx0XHQgICAgICAgICdzIGN1YmljLWJlemllcigwLDAsJyArIChlYXNlTGluZWFyaXR5IHx8IDAuNSkgKyAnLDEpJztcclxuXHJcblx0XHRMLkRvbUV2ZW50Lm9uKGVsLCBMLkRvbVV0aWwuVFJBTlNJVElPTl9FTkQsIHRoaXMuX29uVHJhbnNpdGlvbkVuZCwgdGhpcyk7XHJcblx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24oZWwsIG5ld1Bvcyk7XHJcblxyXG5cdFx0Ly8gdG9nZ2xlIHJlZmxvdywgQ2hyb21lIGZsaWNrZXJzIGZvciBzb21lIHJlYXNvbiBpZiB5b3UgZG9uJ3QgZG8gdGhpc1xyXG5cdFx0TC5VdGlsLmZhbHNlRm4oZWwub2Zmc2V0V2lkdGgpO1xyXG5cclxuXHRcdC8vIHRoZXJlJ3Mgbm8gbmF0aXZlIHdheSB0byB0cmFjayB2YWx1ZSB1cGRhdGVzIG9mIHRyYW5zaXRpb25lZCBwcm9wZXJ0aWVzLCBzbyB3ZSBpbWl0YXRlIHRoaXNcclxuXHRcdHRoaXMuX3N0ZXBUaW1lciA9IHNldEludGVydmFsKEwuYmluZCh0aGlzLl9vblN0ZXAsIHRoaXMpLCA1MCk7XHJcblx0fSxcclxuXHJcblx0c3RvcDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9pblByb2dyZXNzKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdC8vIGlmIHdlIGp1c3QgcmVtb3ZlZCB0aGUgdHJhbnNpdGlvbiBwcm9wZXJ0eSwgdGhlIGVsZW1lbnQgd291bGQganVtcCB0byBpdHMgZmluYWwgcG9zaXRpb24sXHJcblx0XHQvLyBzbyB3ZSBuZWVkIHRvIG1ha2UgaXQgc3RheSBhdCB0aGUgY3VycmVudCBwb3NpdGlvblxyXG5cclxuXHRcdEwuRG9tVXRpbC5zZXRQb3NpdGlvbih0aGlzLl9lbCwgdGhpcy5fZ2V0UG9zKCkpO1xyXG5cdFx0dGhpcy5fb25UcmFuc2l0aW9uRW5kKCk7XHJcblx0XHRMLlV0aWwuZmFsc2VGbih0aGlzLl9lbC5vZmZzZXRXaWR0aCk7IC8vIGZvcmNlIHJlZmxvdyBpbiBjYXNlIHdlIGFyZSBhYm91dCB0byBzdGFydCBhIG5ldyBhbmltYXRpb25cclxuXHR9LFxyXG5cclxuXHRfb25TdGVwOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgc3RlcFBvcyA9IHRoaXMuX2dldFBvcygpO1xyXG5cdFx0aWYgKCFzdGVwUG9zKSB7XHJcblx0XHRcdHRoaXMuX29uVHJhbnNpdGlvbkVuZCgpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHQvLyBqc2hpbnQgY2FtZWxjYXNlOiBmYWxzZVxyXG5cdFx0Ly8gbWFrZSBMLkRvbVV0aWwuZ2V0UG9zaXRpb24gcmV0dXJuIGludGVybWVkaWF0ZSBwb3NpdGlvbiB2YWx1ZSBkdXJpbmcgYW5pbWF0aW9uXHJcblx0XHR0aGlzLl9lbC5fbGVhZmxldF9wb3MgPSBzdGVwUG9zO1xyXG5cclxuXHRcdHRoaXMuZmlyZSgnc3RlcCcpO1xyXG5cdH0sXHJcblxyXG5cdC8vIHlvdSBjYW4ndCBlYXNpbHkgZ2V0IGludGVybWVkaWF0ZSB2YWx1ZXMgb2YgcHJvcGVydGllcyBhbmltYXRlZCB3aXRoIENTUzMgVHJhbnNpdGlvbnMsXHJcblx0Ly8gd2UgbmVlZCB0byBwYXJzZSBjb21wdXRlZCBzdHlsZSAoaW4gY2FzZSBvZiB0cmFuc2Zvcm0gaXQgcmV0dXJucyBtYXRyaXggc3RyaW5nKVxyXG5cclxuXHRfdHJhbnNmb3JtUmU6IC8oWy0rXT8oPzpcXGQqXFwuKT9cXGQrKVxcRCosIChbLStdPyg/OlxcZCpcXC4pP1xcZCspXFxEKlxcKS8sXHJcblxyXG5cdF9nZXRQb3M6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBsZWZ0LCB0b3AsIG1hdGNoZXMsXHJcblx0XHQgICAgZWwgPSB0aGlzLl9lbCxcclxuXHRcdCAgICBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcclxuXHJcblx0XHRpZiAoTC5Ccm93c2VyLmFueTNkKSB7XHJcblx0XHRcdG1hdGNoZXMgPSBzdHlsZVtMLkRvbVV0aWwuVFJBTlNGT1JNXS5tYXRjaCh0aGlzLl90cmFuc2Zvcm1SZSk7XHJcblx0XHRcdGlmICghbWF0Y2hlcykgeyByZXR1cm47IH1cclxuXHRcdFx0bGVmdCA9IHBhcnNlRmxvYXQobWF0Y2hlc1sxXSk7XHJcblx0XHRcdHRvcCAgPSBwYXJzZUZsb2F0KG1hdGNoZXNbMl0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bGVmdCA9IHBhcnNlRmxvYXQoc3R5bGUubGVmdCk7XHJcblx0XHRcdHRvcCAgPSBwYXJzZUZsb2F0KHN0eWxlLnRvcCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBMLlBvaW50KGxlZnQsIHRvcCwgdHJ1ZSk7XHJcblx0fSxcclxuXHJcblx0X29uVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21FdmVudC5vZmYodGhpcy5fZWwsIEwuRG9tVXRpbC5UUkFOU0lUSU9OX0VORCwgdGhpcy5fb25UcmFuc2l0aW9uRW5kLCB0aGlzKTtcclxuXHJcblx0XHRpZiAoIXRoaXMuX2luUHJvZ3Jlc3MpIHsgcmV0dXJuOyB9XHJcblx0XHR0aGlzLl9pblByb2dyZXNzID0gZmFsc2U7XHJcblxyXG5cdFx0dGhpcy5fZWwuc3R5bGVbTC5Eb21VdGlsLlRSQU5TSVRJT05dID0gJyc7XHJcblxyXG5cdFx0Ly8ganNoaW50IGNhbWVsY2FzZTogZmFsc2VcclxuXHRcdC8vIG1ha2Ugc3VyZSBMLkRvbVV0aWwuZ2V0UG9zaXRpb24gcmV0dXJucyB0aGUgZmluYWwgcG9zaXRpb24gdmFsdWUgYWZ0ZXIgYW5pbWF0aW9uXHJcblx0XHR0aGlzLl9lbC5fbGVhZmxldF9wb3MgPSB0aGlzLl9uZXdQb3M7XHJcblxyXG5cdFx0Y2xlYXJJbnRlcnZhbCh0aGlzLl9zdGVwVGltZXIpO1xyXG5cclxuXHRcdHRoaXMuZmlyZSgnc3RlcCcpLmZpcmUoJ2VuZCcpO1xyXG5cdH1cclxuXHJcbn0pO1xyXG5cclxuXHJcbi8qXHJcbiAqIEV4dGVuZHMgTC5NYXAgdG8gaGFuZGxlIHBhbm5pbmcgYW5pbWF0aW9ucy5cclxuICovXHJcblxyXG5MLk1hcC5pbmNsdWRlKHtcclxuXHJcblx0c2V0VmlldzogZnVuY3Rpb24gKGNlbnRlciwgem9vbSwgb3B0aW9ucykge1xyXG5cclxuXHRcdHpvb20gPSB6b29tID09PSB1bmRlZmluZWQgPyB0aGlzLl96b29tIDogdGhpcy5fbGltaXRab29tKHpvb20pO1xyXG5cdFx0Y2VudGVyID0gdGhpcy5fbGltaXRDZW50ZXIoTC5sYXRMbmcoY2VudGVyKSwgem9vbSwgdGhpcy5vcHRpb25zLm1heEJvdW5kcyk7XHJcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcblx0XHRpZiAodGhpcy5fcGFuQW5pbSkge1xyXG5cdFx0XHR0aGlzLl9wYW5BbmltLnN0b3AoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy5fbG9hZGVkICYmICFvcHRpb25zLnJlc2V0ICYmIG9wdGlvbnMgIT09IHRydWUpIHtcclxuXHJcblx0XHRcdGlmIChvcHRpb25zLmFuaW1hdGUgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdG9wdGlvbnMuem9vbSA9IEwuZXh0ZW5kKHthbmltYXRlOiBvcHRpb25zLmFuaW1hdGV9LCBvcHRpb25zLnpvb20pO1xyXG5cdFx0XHRcdG9wdGlvbnMucGFuID0gTC5leHRlbmQoe2FuaW1hdGU6IG9wdGlvbnMuYW5pbWF0ZX0sIG9wdGlvbnMucGFuKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gdHJ5IGFuaW1hdGluZyBwYW4gb3Igem9vbVxyXG5cdFx0XHR2YXIgYW5pbWF0ZWQgPSAodGhpcy5fem9vbSAhPT0gem9vbSkgP1xyXG5cdFx0XHRcdHRoaXMuX3RyeUFuaW1hdGVkWm9vbSAmJiB0aGlzLl90cnlBbmltYXRlZFpvb20oY2VudGVyLCB6b29tLCBvcHRpb25zLnpvb20pIDpcclxuXHRcdFx0XHR0aGlzLl90cnlBbmltYXRlZFBhbihjZW50ZXIsIG9wdGlvbnMucGFuKTtcclxuXHJcblx0XHRcdGlmIChhbmltYXRlZCkge1xyXG5cdFx0XHRcdC8vIHByZXZlbnQgcmVzaXplIGhhbmRsZXIgY2FsbCwgdGhlIHZpZXcgd2lsbCByZWZyZXNoIGFmdGVyIGFuaW1hdGlvbiBhbnl3YXlcclxuXHRcdFx0XHRjbGVhclRpbWVvdXQodGhpcy5fc2l6ZVRpbWVyKTtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFuaW1hdGlvbiBkaWRuJ3Qgc3RhcnQsIGp1c3QgcmVzZXQgdGhlIG1hcCB2aWV3XHJcblx0XHR0aGlzLl9yZXNldFZpZXcoY2VudGVyLCB6b29tKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRwYW5CeTogZnVuY3Rpb24gKG9mZnNldCwgb3B0aW9ucykge1xyXG5cdFx0b2Zmc2V0ID0gTC5wb2ludChvZmZzZXQpLnJvdW5kKCk7XHJcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcblx0XHRpZiAoIW9mZnNldC54ICYmICFvZmZzZXQueSkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuX3BhbkFuaW0pIHtcclxuXHRcdFx0dGhpcy5fcGFuQW5pbSA9IG5ldyBMLlBvc0FuaW1hdGlvbigpO1xyXG5cclxuXHRcdFx0dGhpcy5fcGFuQW5pbS5vbih7XHJcblx0XHRcdFx0J3N0ZXAnOiB0aGlzLl9vblBhblRyYW5zaXRpb25TdGVwLFxyXG5cdFx0XHRcdCdlbmQnOiB0aGlzLl9vblBhblRyYW5zaXRpb25FbmRcclxuXHRcdFx0fSwgdGhpcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZG9uJ3QgZmlyZSBtb3Zlc3RhcnQgaWYgYW5pbWF0aW5nIGluZXJ0aWFcclxuXHRcdGlmICghb3B0aW9ucy5ub01vdmVTdGFydCkge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ21vdmVzdGFydCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFuaW1hdGUgcGFuIHVubGVzcyBhbmltYXRlOiBmYWxzZSBzcGVjaWZpZWRcclxuXHRcdGlmIChvcHRpb25zLmFuaW1hdGUgIT09IGZhbHNlKSB7XHJcblx0XHRcdEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9tYXBQYW5lLCAnbGVhZmxldC1wYW4tYW5pbScpO1xyXG5cclxuXHRcdFx0dmFyIG5ld1BvcyA9IHRoaXMuX2dldE1hcFBhbmVQb3MoKS5zdWJ0cmFjdChvZmZzZXQpO1xyXG5cdFx0XHR0aGlzLl9wYW5BbmltLnJ1bih0aGlzLl9tYXBQYW5lLCBuZXdQb3MsIG9wdGlvbnMuZHVyYXRpb24gfHwgMC4yNSwgb3B0aW9ucy5lYXNlTGluZWFyaXR5KTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3Jhd1BhbkJ5KG9mZnNldCk7XHJcblx0XHRcdHRoaXMuZmlyZSgnbW92ZScpLmZpcmUoJ21vdmVlbmQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9LFxyXG5cclxuXHRfb25QYW5UcmFuc2l0aW9uU3RlcDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dGhpcy5maXJlKCdtb3ZlJyk7XHJcblx0fSxcclxuXHJcblx0X29uUGFuVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKCkge1xyXG5cdFx0TC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX21hcFBhbmUsICdsZWFmbGV0LXBhbi1hbmltJyk7XHJcblx0XHR0aGlzLmZpcmUoJ21vdmVlbmQnKTtcclxuXHR9LFxyXG5cclxuXHRfdHJ5QW5pbWF0ZWRQYW46IGZ1bmN0aW9uIChjZW50ZXIsIG9wdGlvbnMpIHtcclxuXHRcdC8vIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgbmV3IGFuZCBjdXJyZW50IGNlbnRlcnMgaW4gcGl4ZWxzXHJcblx0XHR2YXIgb2Zmc2V0ID0gdGhpcy5fZ2V0Q2VudGVyT2Zmc2V0KGNlbnRlcikuX2Zsb29yKCk7XHJcblxyXG5cdFx0Ly8gZG9uJ3QgYW5pbWF0ZSB0b28gZmFyIHVubGVzcyBhbmltYXRlOiB0cnVlIHNwZWNpZmllZCBpbiBvcHRpb25zXHJcblx0XHRpZiAoKG9wdGlvbnMgJiYgb3B0aW9ucy5hbmltYXRlKSAhPT0gdHJ1ZSAmJiAhdGhpcy5nZXRTaXplKCkuY29udGFpbnMob2Zmc2V0KSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblx0XHR0aGlzLnBhbkJ5KG9mZnNldCwgb3B0aW9ucyk7XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gKiBMLlBvc0FuaW1hdGlvbiBmYWxsYmFjayBpbXBsZW1lbnRhdGlvbiB0aGF0IHBvd2VycyBMZWFmbGV0IHBhbiBhbmltYXRpb25zXHJcbiAqIGluIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBDU1MzIFRyYW5zaXRpb25zLlxyXG4gKi9cclxuXHJcbkwuUG9zQW5pbWF0aW9uID0gTC5Eb21VdGlsLlRSQU5TSVRJT04gPyBMLlBvc0FuaW1hdGlvbiA6IEwuUG9zQW5pbWF0aW9uLmV4dGVuZCh7XHJcblxyXG5cdHJ1bjogZnVuY3Rpb24gKGVsLCBuZXdQb3MsIGR1cmF0aW9uLCBlYXNlTGluZWFyaXR5KSB7IC8vIChIVE1MRWxlbWVudCwgUG9pbnRbLCBOdW1iZXIsIE51bWJlcl0pXHJcblx0XHR0aGlzLnN0b3AoKTtcclxuXHJcblx0XHR0aGlzLl9lbCA9IGVsO1xyXG5cdFx0dGhpcy5faW5Qcm9ncmVzcyA9IHRydWU7XHJcblx0XHR0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uIHx8IDAuMjU7XHJcblx0XHR0aGlzLl9lYXNlT3V0UG93ZXIgPSAxIC8gTWF0aC5tYXgoZWFzZUxpbmVhcml0eSB8fCAwLjUsIDAuMik7XHJcblxyXG5cdFx0dGhpcy5fc3RhcnRQb3MgPSBMLkRvbVV0aWwuZ2V0UG9zaXRpb24oZWwpO1xyXG5cdFx0dGhpcy5fb2Zmc2V0ID0gbmV3UG9zLnN1YnRyYWN0KHRoaXMuX3N0YXJ0UG9zKTtcclxuXHRcdHRoaXMuX3N0YXJ0VGltZSA9ICtuZXcgRGF0ZSgpO1xyXG5cclxuXHRcdHRoaXMuZmlyZSgnc3RhcnQnKTtcclxuXHJcblx0XHR0aGlzLl9hbmltYXRlKCk7XHJcblx0fSxcclxuXHJcblx0c3RvcDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKCF0aGlzLl9pblByb2dyZXNzKSB7IHJldHVybjsgfVxyXG5cclxuXHRcdHRoaXMuX3N0ZXAoKTtcclxuXHRcdHRoaXMuX2NvbXBsZXRlKCk7XHJcblx0fSxcclxuXHJcblx0X2FuaW1hdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdC8vIGFuaW1hdGlvbiBsb29wXHJcblx0XHR0aGlzLl9hbmltSWQgPSBMLlV0aWwucmVxdWVzdEFuaW1GcmFtZSh0aGlzLl9hbmltYXRlLCB0aGlzKTtcclxuXHRcdHRoaXMuX3N0ZXAoKTtcclxuXHR9LFxyXG5cclxuXHRfc3RlcDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGVsYXBzZWQgPSAoK25ldyBEYXRlKCkpIC0gdGhpcy5fc3RhcnRUaW1lLFxyXG5cdFx0ICAgIGR1cmF0aW9uID0gdGhpcy5fZHVyYXRpb24gKiAxMDAwO1xyXG5cclxuXHRcdGlmIChlbGFwc2VkIDwgZHVyYXRpb24pIHtcclxuXHRcdFx0dGhpcy5fcnVuRnJhbWUodGhpcy5fZWFzZU91dChlbGFwc2VkIC8gZHVyYXRpb24pKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMuX3J1bkZyYW1lKDEpO1xyXG5cdFx0XHR0aGlzLl9jb21wbGV0ZSgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9ydW5GcmFtZTogZnVuY3Rpb24gKHByb2dyZXNzKSB7XHJcblx0XHR2YXIgcG9zID0gdGhpcy5fc3RhcnRQb3MuYWRkKHRoaXMuX29mZnNldC5tdWx0aXBseUJ5KHByb2dyZXNzKSk7XHJcblx0XHRMLkRvbVV0aWwuc2V0UG9zaXRpb24odGhpcy5fZWwsIHBvcyk7XHJcblxyXG5cdFx0dGhpcy5maXJlKCdzdGVwJyk7XHJcblx0fSxcclxuXHJcblx0X2NvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRMLlV0aWwuY2FuY2VsQW5pbUZyYW1lKHRoaXMuX2FuaW1JZCk7XHJcblxyXG5cdFx0dGhpcy5faW5Qcm9ncmVzcyA9IGZhbHNlO1xyXG5cdFx0dGhpcy5maXJlKCdlbmQnKTtcclxuXHR9LFxyXG5cclxuXHRfZWFzZU91dDogZnVuY3Rpb24gKHQpIHtcclxuXHRcdHJldHVybiAxIC0gTWF0aC5wb3coMSAtIHQsIHRoaXMuX2Vhc2VPdXRQb3dlcik7XHJcblx0fVxyXG59KTtcclxuXHJcblxyXG4vKlxyXG4gKiBFeHRlbmRzIEwuTWFwIHRvIGhhbmRsZSB6b29tIGFuaW1hdGlvbnMuXHJcbiAqL1xyXG5cclxuTC5NYXAubWVyZ2VPcHRpb25zKHtcclxuXHR6b29tQW5pbWF0aW9uOiB0cnVlLFxyXG5cdHpvb21BbmltYXRpb25UaHJlc2hvbGQ6IDRcclxufSk7XHJcblxyXG5pZiAoTC5Eb21VdGlsLlRSQU5TSVRJT04pIHtcclxuXHJcblx0TC5NYXAuYWRkSW5pdEhvb2soZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly8gZG9uJ3QgYW5pbWF0ZSBvbiBicm93c2VycyB3aXRob3V0IGhhcmR3YXJlLWFjY2VsZXJhdGVkIHRyYW5zaXRpb25zIG9yIG9sZCBBbmRyb2lkL09wZXJhXHJcblx0XHR0aGlzLl96b29tQW5pbWF0ZWQgPSB0aGlzLm9wdGlvbnMuem9vbUFuaW1hdGlvbiAmJiBMLkRvbVV0aWwuVFJBTlNJVElPTiAmJlxyXG5cdFx0XHRcdEwuQnJvd3Nlci5hbnkzZCAmJiAhTC5Ccm93c2VyLmFuZHJvaWQyMyAmJiAhTC5Ccm93c2VyLm1vYmlsZU9wZXJhO1xyXG5cclxuXHRcdC8vIHpvb20gdHJhbnNpdGlvbnMgcnVuIHdpdGggdGhlIHNhbWUgZHVyYXRpb24gZm9yIGFsbCBsYXllcnMsIHNvIGlmIG9uZSBvZiB0cmFuc2l0aW9uZW5kIGV2ZW50c1xyXG5cdFx0Ly8gaGFwcGVucyBhZnRlciBzdGFydGluZyB6b29tIGFuaW1hdGlvbiAocHJvcGFnYXRpbmcgdG8gdGhlIG1hcCBwYW5lKSwgd2Uga25vdyB0aGF0IGl0IGVuZGVkIGdsb2JhbGx5XHJcblx0XHRpZiAodGhpcy5fem9vbUFuaW1hdGVkKSB7XHJcblx0XHRcdEwuRG9tRXZlbnQub24odGhpcy5fbWFwUGFuZSwgTC5Eb21VdGlsLlRSQU5TSVRJT05fRU5ELCB0aGlzLl9jYXRjaFRyYW5zaXRpb25FbmQsIHRoaXMpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5MLk1hcC5pbmNsdWRlKCFMLkRvbVV0aWwuVFJBTlNJVElPTiA/IHt9IDoge1xyXG5cclxuXHRfY2F0Y2hUcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKHRoaXMuX2FuaW1hdGluZ1pvb20gJiYgZS5wcm9wZXJ0eU5hbWUuaW5kZXhPZigndHJhbnNmb3JtJykgPj0gMCkge1xyXG5cdFx0XHR0aGlzLl9vblpvb21UcmFuc2l0aW9uRW5kKCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0X25vdGhpbmdUb0FuaW1hdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiAhdGhpcy5fY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xlYWZsZXQtem9vbS1hbmltYXRlZCcpLmxlbmd0aDtcclxuXHR9LFxyXG5cclxuXHRfdHJ5QW5pbWF0ZWRab29tOiBmdW5jdGlvbiAoY2VudGVyLCB6b29tLCBvcHRpb25zKSB7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2FuaW1hdGluZ1pvb20pIHsgcmV0dXJuIHRydWU7IH1cclxuXHJcblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcblx0XHQvLyBkb24ndCBhbmltYXRlIGlmIGRpc2FibGVkLCBub3Qgc3VwcG9ydGVkIG9yIHpvb20gZGlmZmVyZW5jZSBpcyB0b28gbGFyZ2VcclxuXHRcdGlmICghdGhpcy5fem9vbUFuaW1hdGVkIHx8IG9wdGlvbnMuYW5pbWF0ZSA9PT0gZmFsc2UgfHwgdGhpcy5fbm90aGluZ1RvQW5pbWF0ZSgpIHx8XHJcblx0XHQgICAgICAgIE1hdGguYWJzKHpvb20gLSB0aGlzLl96b29tKSA+IHRoaXMub3B0aW9ucy56b29tQW5pbWF0aW9uVGhyZXNob2xkKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuXHRcdC8vIG9mZnNldCBpcyB0aGUgcGl4ZWwgY29vcmRzIG9mIHRoZSB6b29tIG9yaWdpbiByZWxhdGl2ZSB0byB0aGUgY3VycmVudCBjZW50ZXJcclxuXHRcdHZhciBzY2FsZSA9IHRoaXMuZ2V0Wm9vbVNjYWxlKHpvb20pLFxyXG5cdFx0ICAgIG9mZnNldCA9IHRoaXMuX2dldENlbnRlck9mZnNldChjZW50ZXIpLl9kaXZpZGVCeSgxIC0gMSAvIHNjYWxlKSxcclxuXHRcdFx0b3JpZ2luID0gdGhpcy5fZ2V0Q2VudGVyTGF5ZXJQb2ludCgpLl9hZGQob2Zmc2V0KTtcclxuXHJcblx0XHQvLyBkb24ndCBhbmltYXRlIGlmIHRoZSB6b29tIG9yaWdpbiBpc24ndCB3aXRoaW4gb25lIHNjcmVlbiBmcm9tIHRoZSBjdXJyZW50IGNlbnRlciwgdW5sZXNzIGZvcmNlZFxyXG5cdFx0aWYgKG9wdGlvbnMuYW5pbWF0ZSAhPT0gdHJ1ZSAmJiAhdGhpcy5nZXRTaXplKCkuY29udGFpbnMob2Zmc2V0KSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcblx0XHR0aGlzXHJcblx0XHQgICAgLmZpcmUoJ21vdmVzdGFydCcpXHJcblx0XHQgICAgLmZpcmUoJ3pvb21zdGFydCcpO1xyXG5cclxuXHRcdHRoaXMuX2FuaW1hdGVab29tKGNlbnRlciwgem9vbSwgb3JpZ2luLCBzY2FsZSwgbnVsbCwgdHJ1ZSk7XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSxcclxuXHJcblx0X2FuaW1hdGVab29tOiBmdW5jdGlvbiAoY2VudGVyLCB6b29tLCBvcmlnaW4sIHNjYWxlLCBkZWx0YSwgYmFja3dhcmRzLCBmb3JUb3VjaFpvb20pIHtcclxuXHJcblx0XHRpZiAoIWZvclRvdWNoWm9vbSkge1xyXG5cdFx0XHR0aGlzLl9hbmltYXRpbmdab29tID0gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBwdXQgdHJhbnNmb3JtIHRyYW5zaXRpb24gb24gYWxsIGxheWVycyB3aXRoIGxlYWZsZXQtem9vbS1hbmltYXRlZCBjbGFzc1xyXG5cdFx0TC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX21hcFBhbmUsICdsZWFmbGV0LXpvb20tYW5pbScpO1xyXG5cclxuXHRcdC8vIHJlbWVtYmVyIHdoYXQgY2VudGVyL3pvb20gdG8gc2V0IGFmdGVyIGFuaW1hdGlvblxyXG5cdFx0dGhpcy5fYW5pbWF0ZVRvQ2VudGVyID0gY2VudGVyO1xyXG5cdFx0dGhpcy5fYW5pbWF0ZVRvWm9vbSA9IHpvb207XHJcblxyXG5cdFx0Ly8gZGlzYWJsZSBhbnkgZHJhZ2dpbmcgZHVyaW5nIGFuaW1hdGlvblxyXG5cdFx0aWYgKEwuRHJhZ2dhYmxlKSB7XHJcblx0XHRcdEwuRHJhZ2dhYmxlLl9kaXNhYmxlZCA9IHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0TC5VdGlsLnJlcXVlc3RBbmltRnJhbWUoZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR0aGlzLmZpcmUoJ3pvb21hbmltJywge1xyXG5cdFx0XHRcdGNlbnRlcjogY2VudGVyLFxyXG5cdFx0XHRcdHpvb206IHpvb20sXHJcblx0XHRcdFx0b3JpZ2luOiBvcmlnaW4sXHJcblx0XHRcdFx0c2NhbGU6IHNjYWxlLFxyXG5cdFx0XHRcdGRlbHRhOiBkZWx0YSxcclxuXHRcdFx0XHRiYWNrd2FyZHM6IGJhY2t3YXJkc1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Ly8gaG9ycmlibGUgaGFjayB0byB3b3JrIGFyb3VuZCBhIENocm9tZSBidWcgaHR0cHM6Ly9naXRodWIuY29tL0xlYWZsZXQvTGVhZmxldC9pc3N1ZXMvMzY4OVxyXG5cdFx0XHRzZXRUaW1lb3V0KEwuYmluZCh0aGlzLl9vblpvb21UcmFuc2l0aW9uRW5kLCB0aGlzKSwgMjUwKTtcclxuXHRcdH0sIHRoaXMpO1xyXG5cdH0sXHJcblxyXG5cdF9vblpvb21UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoIXRoaXMuX2FuaW1hdGluZ1pvb20pIHsgcmV0dXJuOyB9XHJcblxyXG5cdFx0dGhpcy5fYW5pbWF0aW5nWm9vbSA9IGZhbHNlO1xyXG5cclxuXHRcdEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9tYXBQYW5lLCAnbGVhZmxldC16b29tLWFuaW0nKTtcclxuXHJcblx0XHRMLlV0aWwucmVxdWVzdEFuaW1GcmFtZShmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHRoaXMuX3Jlc2V0Vmlldyh0aGlzLl9hbmltYXRlVG9DZW50ZXIsIHRoaXMuX2FuaW1hdGVUb1pvb20sIHRydWUsIHRydWUpO1xyXG5cclxuXHRcdFx0aWYgKEwuRHJhZ2dhYmxlKSB7XHJcblx0XHRcdFx0TC5EcmFnZ2FibGUuX2Rpc2FibGVkID0gZmFsc2U7XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMpO1xyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLypcclxuXHRab29tIGFuaW1hdGlvbiBsb2dpYyBmb3IgTC5UaWxlTGF5ZXIuXHJcbiovXHJcblxyXG5MLlRpbGVMYXllci5pbmNsdWRlKHtcclxuXHRfYW5pbWF0ZVpvb206IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoIXRoaXMuX2FuaW1hdGluZykge1xyXG5cdFx0XHR0aGlzLl9hbmltYXRpbmcgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLl9wcmVwYXJlQmdCdWZmZXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgYmcgPSB0aGlzLl9iZ0J1ZmZlcixcclxuXHRcdCAgICB0cmFuc2Zvcm0gPSBMLkRvbVV0aWwuVFJBTlNGT1JNLFxyXG5cdFx0ICAgIGluaXRpYWxUcmFuc2Zvcm0gPSBlLmRlbHRhID8gTC5Eb21VdGlsLmdldFRyYW5zbGF0ZVN0cmluZyhlLmRlbHRhKSA6IGJnLnN0eWxlW3RyYW5zZm9ybV0sXHJcblx0XHQgICAgc2NhbGVTdHIgPSBMLkRvbVV0aWwuZ2V0U2NhbGVTdHJpbmcoZS5zY2FsZSwgZS5vcmlnaW4pO1xyXG5cclxuXHRcdGJnLnN0eWxlW3RyYW5zZm9ybV0gPSBlLmJhY2t3YXJkcyA/XHJcblx0XHRcdFx0c2NhbGVTdHIgKyAnICcgKyBpbml0aWFsVHJhbnNmb3JtIDpcclxuXHRcdFx0XHRpbml0aWFsVHJhbnNmb3JtICsgJyAnICsgc2NhbGVTdHI7XHJcblx0fSxcclxuXHJcblx0X2VuZFpvb21BbmltOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZnJvbnQgPSB0aGlzLl90aWxlQ29udGFpbmVyLFxyXG5cdFx0ICAgIGJnID0gdGhpcy5fYmdCdWZmZXI7XHJcblxyXG5cdFx0ZnJvbnQuc3R5bGUudmlzaWJpbGl0eSA9ICcnO1xyXG5cdFx0ZnJvbnQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChmcm9udCk7IC8vIEJyaW5nIHRvIGZvcmVcclxuXHJcblx0XHQvLyBmb3JjZSByZWZsb3dcclxuXHRcdEwuVXRpbC5mYWxzZUZuKGJnLm9mZnNldFdpZHRoKTtcclxuXHJcblx0XHR2YXIgem9vbSA9IHRoaXMuX21hcC5nZXRab29tKCk7XHJcblx0XHRpZiAoem9vbSA+IHRoaXMub3B0aW9ucy5tYXhab29tIHx8IHpvb20gPCB0aGlzLm9wdGlvbnMubWluWm9vbSkge1xyXG5cdFx0XHR0aGlzLl9jbGVhckJnQnVmZmVyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5fYW5pbWF0aW5nID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0X2NsZWFyQmdCdWZmZXI6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBtYXAgPSB0aGlzLl9tYXA7XHJcblxyXG5cdFx0aWYgKG1hcCAmJiAhbWFwLl9hbmltYXRpbmdab29tICYmICFtYXAudG91Y2hab29tLl96b29taW5nKSB7XHJcblx0XHRcdHRoaXMuX2JnQnVmZmVyLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHR0aGlzLl9iZ0J1ZmZlci5zdHlsZVtMLkRvbVV0aWwuVFJBTlNGT1JNXSA9ICcnO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdF9wcmVwYXJlQmdCdWZmZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgZnJvbnQgPSB0aGlzLl90aWxlQ29udGFpbmVyLFxyXG5cdFx0ICAgIGJnID0gdGhpcy5fYmdCdWZmZXI7XHJcblxyXG5cdFx0Ly8gaWYgZm9yZWdyb3VuZCBsYXllciBkb2Vzbid0IGhhdmUgbWFueSB0aWxlcyBidXQgYmcgbGF5ZXIgZG9lcyxcclxuXHRcdC8vIGtlZXAgdGhlIGV4aXN0aW5nIGJnIGxheWVyIGFuZCBqdXN0IHpvb20gaXQgc29tZSBtb3JlXHJcblxyXG5cdFx0dmFyIGJnTG9hZGVkID0gdGhpcy5fZ2V0TG9hZGVkVGlsZXNQZXJjZW50YWdlKGJnKSxcclxuXHRcdCAgICBmcm9udExvYWRlZCA9IHRoaXMuX2dldExvYWRlZFRpbGVzUGVyY2VudGFnZShmcm9udCk7XHJcblxyXG5cdFx0aWYgKGJnICYmIGJnTG9hZGVkID4gMC41ICYmIGZyb250TG9hZGVkIDwgMC41KSB7XHJcblxyXG5cdFx0XHRmcm9udC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcblx0XHRcdHRoaXMuX3N0b3BMb2FkaW5nSW1hZ2VzKGZyb250KTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIHByZXBhcmUgdGhlIGJ1ZmZlciB0byBiZWNvbWUgdGhlIGZyb250IHRpbGUgcGFuZVxyXG5cdFx0Ymcuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG5cdFx0Ymcuc3R5bGVbTC5Eb21VdGlsLlRSQU5TRk9STV0gPSAnJztcclxuXHJcblx0XHQvLyBzd2l0Y2ggb3V0IHRoZSBjdXJyZW50IGxheWVyIHRvIGJlIHRoZSBuZXcgYmcgbGF5ZXIgKGFuZCB2aWNlLXZlcnNhKVxyXG5cdFx0dGhpcy5fdGlsZUNvbnRhaW5lciA9IGJnO1xyXG5cdFx0YmcgPSB0aGlzLl9iZ0J1ZmZlciA9IGZyb250O1xyXG5cclxuXHRcdHRoaXMuX3N0b3BMb2FkaW5nSW1hZ2VzKGJnKTtcclxuXHJcblx0XHQvL3ByZXZlbnQgYmcgYnVmZmVyIGZyb20gY2xlYXJpbmcgcmlnaHQgYWZ0ZXIgem9vbVxyXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX2NsZWFyQmdCdWZmZXJUaW1lcik7XHJcblx0fSxcclxuXHJcblx0X2dldExvYWRlZFRpbGVzUGVyY2VudGFnZTogZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG5cdFx0dmFyIHRpbGVzID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKSxcclxuXHRcdCAgICBpLCBsZW4sIGNvdW50ID0gMDtcclxuXHJcblx0XHRmb3IgKGkgPSAwLCBsZW4gPSB0aWxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHRpZiAodGlsZXNbaV0uY29tcGxldGUpIHtcclxuXHRcdFx0XHRjb3VudCsrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY291bnQgLyBsZW47XHJcblx0fSxcclxuXHJcblx0Ly8gc3RvcHMgbG9hZGluZyBhbGwgdGlsZXMgaW4gdGhlIGJhY2tncm91bmQgbGF5ZXJcclxuXHRfc3RvcExvYWRpbmdJbWFnZXM6IGZ1bmN0aW9uIChjb250YWluZXIpIHtcclxuXHRcdHZhciB0aWxlcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJykpLFxyXG5cdFx0ICAgIGksIGxlbiwgdGlsZTtcclxuXHJcblx0XHRmb3IgKGkgPSAwLCBsZW4gPSB0aWxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG5cdFx0XHR0aWxlID0gdGlsZXNbaV07XHJcblxyXG5cdFx0XHRpZiAoIXRpbGUuY29tcGxldGUpIHtcclxuXHRcdFx0XHR0aWxlLm9ubG9hZCA9IEwuVXRpbC5mYWxzZUZuO1xyXG5cdFx0XHRcdHRpbGUub25lcnJvciA9IEwuVXRpbC5mYWxzZUZuO1xyXG5cdFx0XHRcdHRpbGUuc3JjID0gTC5VdGlsLmVtcHR5SW1hZ2VVcmw7XHJcblxyXG5cdFx0XHRcdHRpbGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aWxlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSk7XHJcblxyXG5cclxuLypcclxuICogUHJvdmlkZXMgTC5NYXAgd2l0aCBjb252ZW5pZW50IHNob3J0Y3V0cyBmb3IgdXNpbmcgYnJvd3NlciBnZW9sb2NhdGlvbiBmZWF0dXJlcy5cclxuICovXHJcblxyXG5MLk1hcC5pbmNsdWRlKHtcclxuXHRfZGVmYXVsdExvY2F0ZU9wdGlvbnM6IHtcclxuXHRcdHdhdGNoOiBmYWxzZSxcclxuXHRcdHNldFZpZXc6IGZhbHNlLFxyXG5cdFx0bWF4Wm9vbTogSW5maW5pdHksXHJcblx0XHR0aW1lb3V0OiAxMDAwMCxcclxuXHRcdG1heGltdW1BZ2U6IDAsXHJcblx0XHRlbmFibGVIaWdoQWNjdXJhY3k6IGZhbHNlXHJcblx0fSxcclxuXHJcblx0bG9jYXRlOiBmdW5jdGlvbiAoLypPYmplY3QqLyBvcHRpb25zKSB7XHJcblxyXG5cdFx0b3B0aW9ucyA9IHRoaXMuX2xvY2F0ZU9wdGlvbnMgPSBMLmV4dGVuZCh0aGlzLl9kZWZhdWx0TG9jYXRlT3B0aW9ucywgb3B0aW9ucyk7XHJcblxyXG5cdFx0aWYgKCFuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcclxuXHRcdFx0dGhpcy5faGFuZGxlR2VvbG9jYXRpb25FcnJvcih7XHJcblx0XHRcdFx0Y29kZTogMCxcclxuXHRcdFx0XHRtZXNzYWdlOiAnR2VvbG9jYXRpb24gbm90IHN1cHBvcnRlZC4nXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gdGhpcztcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgb25SZXNwb25zZSA9IEwuYmluZCh0aGlzLl9oYW5kbGVHZW9sb2NhdGlvblJlc3BvbnNlLCB0aGlzKSxcclxuXHRcdFx0b25FcnJvciA9IEwuYmluZCh0aGlzLl9oYW5kbGVHZW9sb2NhdGlvbkVycm9yLCB0aGlzKTtcclxuXHJcblx0XHRpZiAob3B0aW9ucy53YXRjaCkge1xyXG5cdFx0XHR0aGlzLl9sb2NhdGlvbldhdGNoSWQgPVxyXG5cdFx0XHQgICAgICAgIG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uKG9uUmVzcG9uc2UsIG9uRXJyb3IsIG9wdGlvbnMpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmdldEN1cnJlbnRQb3NpdGlvbihvblJlc3BvbnNlLCBvbkVycm9yLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH0sXHJcblxyXG5cdHN0b3BMb2NhdGU6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGlmIChuYXZpZ2F0b3IuZ2VvbG9jYXRpb24pIHtcclxuXHRcdFx0bmF2aWdhdG9yLmdlb2xvY2F0aW9uLmNsZWFyV2F0Y2godGhpcy5fbG9jYXRpb25XYXRjaElkKTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzLl9sb2NhdGVPcHRpb25zKSB7XHJcblx0XHRcdHRoaXMuX2xvY2F0ZU9wdGlvbnMuc2V0VmlldyA9IGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fSxcclxuXHJcblx0X2hhbmRsZUdlb2xvY2F0aW9uRXJyb3I6IGZ1bmN0aW9uIChlcnJvcikge1xyXG5cdFx0dmFyIGMgPSBlcnJvci5jb2RlLFxyXG5cdFx0ICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlIHx8XHJcblx0XHQgICAgICAgICAgICAoYyA9PT0gMSA/ICdwZXJtaXNzaW9uIGRlbmllZCcgOlxyXG5cdFx0ICAgICAgICAgICAgKGMgPT09IDIgPyAncG9zaXRpb24gdW5hdmFpbGFibGUnIDogJ3RpbWVvdXQnKSk7XHJcblxyXG5cdFx0aWYgKHRoaXMuX2xvY2F0ZU9wdGlvbnMuc2V0VmlldyAmJiAhdGhpcy5fbG9hZGVkKSB7XHJcblx0XHRcdHRoaXMuZml0V29ybGQoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZpcmUoJ2xvY2F0aW9uZXJyb3InLCB7XHJcblx0XHRcdGNvZGU6IGMsXHJcblx0XHRcdG1lc3NhZ2U6ICdHZW9sb2NhdGlvbiBlcnJvcjogJyArIG1lc3NhZ2UgKyAnLidcclxuXHRcdH0pO1xyXG5cdH0sXHJcblxyXG5cdF9oYW5kbGVHZW9sb2NhdGlvblJlc3BvbnNlOiBmdW5jdGlvbiAocG9zKSB7XHJcblx0XHR2YXIgbGF0ID0gcG9zLmNvb3Jkcy5sYXRpdHVkZSxcclxuXHRcdCAgICBsbmcgPSBwb3MuY29vcmRzLmxvbmdpdHVkZSxcclxuXHRcdCAgICBsYXRsbmcgPSBuZXcgTC5MYXRMbmcobGF0LCBsbmcpLFxyXG5cclxuXHRcdCAgICBsYXRBY2N1cmFjeSA9IDE4MCAqIHBvcy5jb29yZHMuYWNjdXJhY3kgLyA0MDA3NTAxNyxcclxuXHRcdCAgICBsbmdBY2N1cmFjeSA9IGxhdEFjY3VyYWN5IC8gTWF0aC5jb3MoTC5MYXRMbmcuREVHX1RPX1JBRCAqIGxhdCksXHJcblxyXG5cdFx0ICAgIGJvdW5kcyA9IEwubGF0TG5nQm91bmRzKFxyXG5cdFx0ICAgICAgICAgICAgW2xhdCAtIGxhdEFjY3VyYWN5LCBsbmcgLSBsbmdBY2N1cmFjeV0sXHJcblx0XHQgICAgICAgICAgICBbbGF0ICsgbGF0QWNjdXJhY3ksIGxuZyArIGxuZ0FjY3VyYWN5XSksXHJcblxyXG5cdFx0ICAgIG9wdGlvbnMgPSB0aGlzLl9sb2NhdGVPcHRpb25zO1xyXG5cclxuXHRcdGlmIChvcHRpb25zLnNldFZpZXcpIHtcclxuXHRcdFx0dmFyIHpvb20gPSBNYXRoLm1pbih0aGlzLmdldEJvdW5kc1pvb20oYm91bmRzKSwgb3B0aW9ucy5tYXhab29tKTtcclxuXHRcdFx0dGhpcy5zZXRWaWV3KGxhdGxuZywgem9vbSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGRhdGEgPSB7XHJcblx0XHRcdGxhdGxuZzogbGF0bG5nLFxyXG5cdFx0XHRib3VuZHM6IGJvdW5kcyxcclxuXHRcdFx0dGltZXN0YW1wOiBwb3MudGltZXN0YW1wXHJcblx0XHR9O1xyXG5cclxuXHRcdGZvciAodmFyIGkgaW4gcG9zLmNvb3Jkcykge1xyXG5cdFx0XHRpZiAodHlwZW9mIHBvcy5jb29yZHNbaV0gPT09ICdudW1iZXInKSB7XHJcblx0XHRcdFx0ZGF0YVtpXSA9IHBvcy5jb29yZHNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZpcmUoJ2xvY2F0aW9uZm91bmQnLCBkYXRhKTtcclxuXHR9XHJcbn0pO1xyXG5cclxuXHJcbn0od2luZG93LCBkb2N1bWVudCkpO1xyXG4iLCIoZnVuY3Rpb24oKSB7XG5cbiAgLy8gbGlzdGVuIGFuZCBwcm9wYWdhdGUgZHJhZ3N0YXJ0IG9uIHN1Yi1sYXllcnNcbiAgTC5GZWF0dXJlR3JvdXAuRVZFTlRTICs9ICcgZHJhZ3N0YXJ0JztcblxuICBmdW5jdGlvbiB3cmFwTWV0aG9kKGtsYXNzZXMsIG1ldGhvZE5hbWUsIG1ldGhvZCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBrbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICB2YXIga2xhc3MgPSBrbGFzc2VzW2ldO1xuICAgICAga2xhc3MucHJvdG90eXBlWydfJyArIG1ldGhvZE5hbWVdID0ga2xhc3MucHJvdG90eXBlW21ldGhvZE5hbWVdO1xuICAgICAga2xhc3MucHJvdG90eXBlW21ldGhvZE5hbWVdID0gbWV0aG9kO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0wuUG9seWdvbnxMLlBvbHlsaW5lfSBsYXllclxuICAgKiBAcmV0dXJuIHtMLk11bHRpUG9seWdvbnxMLk11bHRpUG9seWxpbmV9XG4gICAqL1xuICBmdW5jdGlvbiBhZGRMYXllcihsYXllcikge1xuICAgIGlmICh0aGlzLmhhc0xheWVyKGxheWVyKSkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGxheWVyXG4gICAgICAub24oJ2RyYWcnLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgICAub24oJ2RyYWdlbmQnLCB0aGlzLl9vbkRyYWdFbmQsIHRoaXMpO1xuICAgIHJldHVybiB0aGlzLl9hZGRMYXllci5jYWxsKHRoaXMsIGxheWVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gIHtMLlBvbHlnb258TC5Qb2x5bGluZX0gbGF5ZXJcbiAgICogQHJldHVybiB7TC5NdWx0aVBvbHlnb258TC5NdWx0aVBvbHlsaW5lfVxuICAgKi9cbiAgZnVuY3Rpb24gcmVtb3ZlTGF5ZXIobGF5ZXIpIHtcbiAgICBpZiAoIXRoaXMuaGFzTGF5ZXIobGF5ZXIpKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgbGF5ZXJcbiAgICAgIC5vZmYoJ2RyYWcnLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgICAub2ZmKCdkcmFnZW5kJywgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcbiAgICByZXR1cm4gdGhpcy5fcmVtb3ZlTGF5ZXIuY2FsbCh0aGlzLCBsYXllcik7XG4gIH1cblxuICAvLyBkdWNrLXR5cGUgbWV0aG9kcyB0byBsaXN0ZW4gdG8gdGhlIGRyYWcgZXZlbnRzXG4gIHdyYXBNZXRob2QoW0wuTXVsdGlQb2x5Z29uLCBMLk11bHRpUG9seWxpbmVdLCAnYWRkTGF5ZXInLCBhZGRMYXllcik7XG4gIHdyYXBNZXRob2QoW0wuTXVsdGlQb2x5Z29uLCBMLk11bHRpUG9seWxpbmVdLCAncmVtb3ZlTGF5ZXInLCByZW1vdmVMYXllcik7XG5cbiAgdmFyIGRyYWdNZXRob2RzID0ge1xuICAgIF9vbkRyYWc6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgdmFyIGxheWVyID0gZXZ0LnRhcmdldDtcbiAgICAgIHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uKG90aGVyTGF5ZXIpIHtcbiAgICAgICAgaWYgKG90aGVyTGF5ZXIgIT09IGxheWVyKSB7XG4gICAgICAgICAgb3RoZXJMYXllci5fYXBwbHlUcmFuc2Zvcm0obGF5ZXIuZHJhZ2dpbmcuX21hdHJpeCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9wcm9wYWdhdGVFdmVudChldnQpO1xuICAgIH0sXG5cbiAgICBfb25EcmFnRW5kOiBmdW5jdGlvbihldnQpIHtcbiAgICAgIHZhciBsYXllciA9IGV2dC50YXJnZXQ7XG5cbiAgICAgIHRoaXMuZWFjaExheWVyKGZ1bmN0aW9uKG90aGVyTGF5ZXIpIHtcbiAgICAgICAgaWYgKG90aGVyTGF5ZXIgIT09IGxheWVyKSB7XG4gICAgICAgICAgb3RoZXJMYXllci5fcmVzZXRUcmFuc2Zvcm0oKTtcbiAgICAgICAgICBvdGhlckxheWVyLmRyYWdnaW5nLl90cmFuc2Zvcm1Qb2ludHMobGF5ZXIuZHJhZ2dpbmcuX21hdHJpeCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLl9wcm9wYWdhdGVFdmVudChldnQpO1xuICAgIH1cbiAgfTtcblxuICBMLk11bHRpUG9seWdvbi5pbmNsdWRlKGRyYWdNZXRob2RzKTtcbiAgTC5NdWx0aVBvbHlsaW5lLmluY2x1ZGUoZHJhZ01ldGhvZHMpO1xuXG59KSgpO1xuIiwiLyoqXG4gKiBMZWFmbGV0IHZlY3RvciBmZWF0dXJlcyBkcmFnIGZ1bmN0aW9uYWxpdHlcbiAqIEBwcmVzZXJ2ZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIERyYWcgaGFuZGxlclxuICogQGNsYXNzIEwuUGF0aC5EcmFnXG4gKiBAZXh0ZW5kcyB7TC5IYW5kbGVyfVxuICovXG5MLkhhbmRsZXIuUGF0aERyYWcgPSBMLkhhbmRsZXIuZXh0ZW5kKCAvKiogQGxlbmRzICBMLlBhdGguRHJhZy5wcm90b3R5cGUgKi8ge1xuXG4gIHN0YXRpY3M6IHtcbiAgICBEUkFHR0FCTEVfQ0xTOiAnbGVhZmxldC1wYXRoLWRyYWdnYWJsZSdcbiAgfSxcblxuICAvKipcbiAgICogQHBhcmFtICB7TC5QYXRofSBwYXRoXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUGF0aH1cbiAgICAgKi9cbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48TnVtYmVyPn1cbiAgICAgKi9cbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUG9pbnR9XG4gICAgICovXG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7TC5Qb2ludH1cbiAgICAgKi9cbiAgICB0aGlzLl9kcmFnU3RhcnRQb2ludCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl9kcmFnSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5fZHJhZ01vdmVkID0gZmFsc2U7XG5cbiAgfSxcblxuXG4gIC8qKlxuICAgKiBFbmFibGUgZHJhZ2dpbmdcbiAgICovXG4gIGFkZEhvb2tzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHQUJMRV9DTFM7XG4gICAgdmFyIHBhdGggICAgICA9IHRoaXMuX3BhdGguX3BhdGg7XG5cbiAgICB0aGlzLl9wYXRoLm9uKCdtb3VzZWRvd24nLCB0aGlzLl9vbkRyYWdTdGFydCwgdGhpcyk7XG4gICAgdGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZSA9XG4gICAgICAodGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZSB8fCAnJykgKyAnICcgKyBjbGFzc05hbWU7XG5cbiAgICBpZiAoIUwuUGF0aC5DQU5WQVMgJiYgcGF0aCkge1xuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHBhdGgsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9LFxuXG5cbiAgLyoqXG4gICAqIERpc2FibGUgZHJhZ2dpbmdcbiAgICovXG4gIHJlbW92ZUhvb2tzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHQUJMRV9DTFM7XG4gICAgdmFyIHBhdGggICAgICA9IHRoaXMuX3BhdGguX3BhdGg7XG5cbiAgICB0aGlzLl9wYXRoLm9mZignbW91c2Vkb3duJywgdGhpcy5fb25EcmFnU3RhcnQsIHRoaXMpO1xuICAgIHRoaXMuX3BhdGgub3B0aW9ucy5jbGFzc05hbWUgPVxuICAgICAgKHRoaXMuX3BhdGgub3B0aW9ucy5jbGFzc05hbWUgfHwgJycpLnJlcGxhY2UoY2xhc3NOYW1lLCAnJyk7XG5cbiAgICBpZiAoIUwuUGF0aC5DQU5WQVMgJiYgcGF0aCkge1xuICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHBhdGgsIGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHRoaXMuX2RyYWdNb3ZlZCA9IGZhbHNlO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBtb3ZlZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RyYWdNb3ZlZDtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBJZiBkcmFnZ2luZyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MuXG4gICAqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBpblByb2dyZXNzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZHJhZ0luUHJvZ3Jlc3M7XG4gIH0sXG5cblxuICAvKipcbiAgICogU3RhcnQgZHJhZ1xuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZ1N0YXJ0OiBmdW5jdGlvbihldnQpIHtcbiAgICB0aGlzLl9kcmFnSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IGV2dC5jb250YWluZXJQb2ludC5jbG9uZSgpO1xuICAgIHRoaXMuX2RyYWdTdGFydFBvaW50ID0gZXZ0LmNvbnRhaW5lclBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5fbWF0cml4ID0gWzEsIDAsIDAsIDEsIDAsIDBdO1xuXG4gICAgaWYodGhpcy5fcGF0aC5fcG9pbnQpIHtcbiAgICAgIHRoaXMuX3BvaW50ID0gdGhpcy5fcGF0aC5fcG9pbnQuY2xvbmUoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9wYXRoLl9tYXBcbiAgICAgIC5vbignbW91c2Vtb3ZlJywgdGhpcy5fb25EcmFnLCB0aGlzKVxuICAgICAgLm9uKCdtb3VzZXVwJywgdGhpcy5fb25EcmFnRW5kLCB0aGlzKVxuICAgIHRoaXMuX2RyYWdNb3ZlZCA9IGZhbHNlO1xuICB9LFxuXG5cbiAgLyoqXG4gICAqIERyYWdnaW5nXG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnOiBmdW5jdGlvbihldnQpIHtcbiAgICB2YXIgeCA9IGV2dC5jb250YWluZXJQb2ludC54O1xuICAgIHZhciB5ID0gZXZ0LmNvbnRhaW5lclBvaW50Lnk7XG5cbiAgICB2YXIgbWF0cml4ICAgICA9IHRoaXMuX21hdHJpeDtcbiAgICB2YXIgcGF0aCAgICAgICA9IHRoaXMuX3BhdGg7XG4gICAgdmFyIHN0YXJ0UG9pbnQgPSB0aGlzLl9zdGFydFBvaW50O1xuXG4gICAgdmFyIGR4ID0geCAtIHN0YXJ0UG9pbnQueDtcbiAgICB2YXIgZHkgPSB5IC0gc3RhcnRQb2ludC55O1xuXG4gICAgaWYgKCF0aGlzLl9kcmFnTW92ZWQgJiYgKGR4IHx8IGR5KSkge1xuICAgICAgdGhpcy5fZHJhZ01vdmVkID0gdHJ1ZTtcbiAgICAgIHBhdGguZmlyZSgnZHJhZ3N0YXJ0Jyk7XG5cbiAgICAgIGlmIChwYXRoLl9wb3B1cCkge1xuICAgICAgICBwYXRoLl9wb3B1cC5fY2xvc2UoKTtcbiAgICAgICAgcGF0aC5vZmYoJ2NsaWNrJywgcGF0aC5fb3BlblBvcHVwLCBwYXRoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtYXRyaXhbNF0gKz0gZHg7XG4gICAgbWF0cml4WzVdICs9IGR5O1xuXG4gICAgc3RhcnRQb2ludC54ID0geDtcbiAgICBzdGFydFBvaW50LnkgPSB5O1xuXG4gICAgcGF0aC5fYXBwbHlUcmFuc2Zvcm0obWF0cml4KTtcblxuICAgIGlmIChwYXRoLl9wb2ludCkgeyAvLyBMLkNpcmNsZSwgTC5DaXJjbGVNYXJrZXJcbiAgICAgIHBhdGguX3BvaW50LnggPSB0aGlzLl9wb2ludC54ICsgbWF0cml4WzRdO1xuICAgICAgcGF0aC5fcG9pbnQueSA9IHRoaXMuX3BvaW50LnkgKyBtYXRyaXhbNV07XG4gICAgfVxuXG4gICAgcGF0aC5maXJlKCdkcmFnJyk7XG4gICAgTC5Eb21FdmVudC5zdG9wKGV2dC5vcmlnaW5hbEV2ZW50KTtcbiAgfSxcblxuXG4gIC8qKlxuICAgKiBEcmFnZ2luZyBzdG9wcGVkLCBhcHBseVxuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZ0VuZDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgTC5Eb21FdmVudC5zdG9wKGV2dCk7XG4gICAgTC5Eb21FdmVudC5fZmFrZVN0b3AoeyB0eXBlOiAnY2xpY2snIH0pO1xuXG4gICAgdGhpcy5fZHJhZ0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAvLyB1bmRvIGNvbnRhaW5lciB0cmFuc2Zvcm1cbiAgICB0aGlzLl9wYXRoLl9yZXNldFRyYW5zZm9ybSgpO1xuICAgIC8vIGFwcGx5IG1hdHJpeFxuICAgIHRoaXMuX3RyYW5zZm9ybVBvaW50cyh0aGlzLl9tYXRyaXgpO1xuXG4gICAgdGhpcy5fcGF0aC5fbWFwXG4gICAgICAub2ZmKCdtb3VzZW1vdmUnLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgICAub2ZmKCdtb3VzZXVwJywgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcblxuICAgIC8vIGNvbnNpc3RlbmN5XG4gICAgdGhpcy5fcGF0aC5maXJlKCdkcmFnZW5kJywge1xuICAgICAgZGlzdGFuY2U6IE1hdGguc3FydChcbiAgICAgICAgTC5MaW5lVXRpbC5fc3FEaXN0KHRoaXMuX2RyYWdTdGFydFBvaW50LCBldnQuY29udGFpbmVyUG9pbnQpXG4gICAgICApXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5fcGF0aC5fcG9wdXApIHtcbiAgICAgIEwuVXRpbC5yZXF1ZXN0QW5pbUZyYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9wYXRoLm9uKCdjbGljaycsIHRoaXMuX3BhdGguX29wZW5Qb3B1cCwgdGhpcy5fcGF0aCk7XG4gICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSBudWxsO1xuICAgIHRoaXMuX3BvaW50ID0gbnVsbDtcbiAgICB0aGlzLl9kcmFnU3RhcnRQb2ludCA9IG51bGw7XG4gIH0sXG5cblxuICAvKipcbiAgICogVHJhbnNmb3JtcyBwb2ludCBhY2NvcmRpbmcgdG8gdGhlIHByb3ZpZGVkIHRyYW5zZm9ybWF0aW9uIG1hdHJpeC5cbiAgICpcbiAgICogIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuICAgKiAgQHBhcmFtIHtMLkxhdExuZ30gcG9pbnRcbiAgICovXG4gIF90cmFuc2Zvcm1Qb2ludDogZnVuY3Rpb24ocG9pbnQsIG1hdHJpeCkge1xuICAgIHZhciBwYXRoID0gdGhpcy5fcGF0aDtcblxuICAgIHZhciBweCA9IEwucG9pbnQobWF0cml4WzRdLCBtYXRyaXhbNV0pO1xuXG4gICAgdmFyIGNycyA9IHBhdGguX21hcC5vcHRpb25zLmNycztcbiAgICB2YXIgdHJhbnNmb3JtYXRpb24gPSBjcnMudHJhbnNmb3JtYXRpb247XG4gICAgdmFyIHNjYWxlID0gY3JzLnNjYWxlKHBhdGguX21hcC5nZXRab29tKCkpO1xuICAgIHZhciBwcm9qZWN0aW9uID0gY3JzLnByb2plY3Rpb247XG5cbiAgICB2YXIgZGlmZiA9IHRyYW5zZm9ybWF0aW9uLnVudHJhbnNmb3JtKHB4LCBzY2FsZSlcbiAgICAgIC5zdWJ0cmFjdCh0cmFuc2Zvcm1hdGlvbi51bnRyYW5zZm9ybShMLnBvaW50KDAsIDApLCBzY2FsZSkpO1xuXG4gICAgcmV0dXJuIHByb2plY3Rpb24udW5wcm9qZWN0KHByb2plY3Rpb24ucHJvamVjdChwb2ludCkuX2FkZChkaWZmKSk7XG4gIH0sXG5cblxuICAvKipcbiAgICogQXBwbGllcyB0cmFuc2Zvcm1hdGlvbiwgZG9lcyBpdCBpbiBvbmUgc3dlZXAgZm9yIHBlcmZvcm1hbmNlLFxuICAgKiBzbyBkb24ndCBiZSBzdXJwcmlzZWQgYWJvdXQgdGhlIGNvZGUgcmVwZXRpdGlvbi5cbiAgICpcbiAgICogWyB4IF0gICBbIGEgIGIgIHR4IF0gWyB4IF0gICBbIGEgKiB4ICsgYiAqIHkgKyB0eCBdXG4gICAqIFsgeSBdID0gWyBjICBkICB0eSBdIFsgeSBdID0gWyBjICogeCArIGQgKiB5ICsgdHkgXVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcbiAgICovXG4gIF90cmFuc2Zvcm1Qb2ludHM6IGZ1bmN0aW9uKG1hdHJpeCkge1xuICAgIHZhciBwYXRoID0gdGhpcy5fcGF0aDtcbiAgICB2YXIgaSwgbGVuLCBsYXRsbmc7XG5cbiAgICB2YXIgcHggPSBMLnBvaW50KG1hdHJpeFs0XSwgbWF0cml4WzVdKTtcblxuICAgIHZhciBjcnMgPSBwYXRoLl9tYXAub3B0aW9ucy5jcnM7XG4gICAgdmFyIHRyYW5zZm9ybWF0aW9uID0gY3JzLnRyYW5zZm9ybWF0aW9uO1xuICAgIHZhciBzY2FsZSA9IGNycy5zY2FsZShwYXRoLl9tYXAuZ2V0Wm9vbSgpKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IGNycy5wcm9qZWN0aW9uO1xuXG4gICAgdmFyIGRpZmYgPSB0cmFuc2Zvcm1hdGlvbi51bnRyYW5zZm9ybShweCwgc2NhbGUpXG4gICAgICAuc3VidHJhY3QodHJhbnNmb3JtYXRpb24udW50cmFuc2Zvcm0oTC5wb2ludCgwLCAwKSwgc2NhbGUpKTtcblxuICAgIC8vIGNvbnNvbGUudGltZSgndHJhbnNmb3JtJyk7XG5cbiAgICAvLyBhbGwgc2hpZnRzIGFyZSBpbi1wbGFjZVxuICAgIGlmIChwYXRoLl9wb2ludCkgeyAvLyBMLkNpcmNsZVxuICAgICAgcGF0aC5fbGF0bG5nID0gcHJvamVjdGlvbi51bnByb2plY3QoXG4gICAgICAgIHByb2plY3Rpb24ucHJvamVjdChwYXRoLl9sYXRsbmcpLl9hZGQoZGlmZikpO1xuICAgICAgcGF0aC5fcG9pbnQgPSB0aGlzLl9wb2ludC5fYWRkKHB4KTtcbiAgICB9IGVsc2UgaWYgKHBhdGguX29yaWdpbmFsUG9pbnRzKSB7IC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgZm9yIChpID0gMCwgbGVuID0gcGF0aC5fb3JpZ2luYWxQb2ludHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbGF0bG5nID0gcGF0aC5fbGF0bG5nc1tpXTtcbiAgICAgICAgcGF0aC5fbGF0bG5nc1tpXSA9IHByb2plY3Rpb25cbiAgICAgICAgICAudW5wcm9qZWN0KHByb2plY3Rpb24ucHJvamVjdChsYXRsbmcpLl9hZGQoZGlmZikpO1xuICAgICAgICBwYXRoLl9vcmlnaW5hbFBvaW50c1tpXS5fYWRkKHB4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBob2xlcyBvcGVyYXRpb25zXG4gICAgaWYgKHBhdGguX2hvbGVzKSB7XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBwYXRoLl9ob2xlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgbGVuMiA9IHBhdGguX2hvbGVzW2ldLmxlbmd0aDsgaiA8IGxlbjI7IGorKykge1xuICAgICAgICAgIGxhdGxuZyA9IHBhdGguX2hvbGVzW2ldW2pdO1xuICAgICAgICAgIHBhdGguX2hvbGVzW2ldW2pdID0gcHJvamVjdGlvblxuICAgICAgICAgICAgLnVucHJvamVjdChwcm9qZWN0aW9uLnByb2plY3QobGF0bG5nKS5fYWRkKGRpZmYpKTtcbiAgICAgICAgICBwYXRoLl9ob2xlUG9pbnRzW2ldW2pdLl9hZGQocHgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS50aW1lRW5kKCd0cmFuc2Zvcm0nKTtcblxuICAgIHBhdGguX3VwZGF0ZVBhdGgoKTtcbiAgfVxuXG59KTtcblxuXG4vLyBJbml0IGhvb2sgaW5zdGVhZCBvZiByZXBsYWNpbmcgdGhlIGBpbml0RXZlbnRzYFxuTC5QYXRoLmFkZEluaXRIb29rKGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5vcHRpb25zLmRyYWdnYWJsZSkge1xuICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gbmV3IEwuSGFuZGxlci5QYXRoRHJhZyh0aGlzKTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICB0aGlzLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgfVxufSk7XG5cbi8qXG4gKiBSZXR1cm4gdHJhbnNmb3JtZWQgcG9pbnRzIGluIGNhc2UgaWYgZHJhZ2dpbmcgaXMgZW5hYmxlZCBhbmQgaW4gcHJvZ3Jlc3MsXG4gKiBvdGhlcndpc2UgLSBjYWxsIG9yaWdpbmFsIG1ldGhvZC5cbiAqXG4gKiBGb3IgTC5DaXJjbGUgYW5kIEwuUG9seWxpbmVcbiAqL1xuXG4vLyBkb24ndCBsaWtlIHRoaXM/IG1lIG5laXRoZXIsIGJ1dCBJIGxpa2UgaXQgZXZlbiBsZXNzXG4vLyB3aGVuIHRoZSBvcmlnaW5hbCBtZXRob2RzIGFyZSBub3QgZXhwb3NlZFxuTC5DaXJjbGUucHJvdG90eXBlLl9nZXRMYXRMbmcgPSBMLkNpcmNsZS5wcm90b3R5cGUuZ2V0TGF0TG5nO1xuTC5DaXJjbGUucHJvdG90eXBlLmdldExhdExuZyA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5kcmFnZ2luZyAmJiB0aGlzLmRyYWdnaW5nLmluUHJvZ3Jlc3MoKSkge1xuICAgIHJldHVybiB0aGlzLmRyYWdnaW5nLl90cmFuc2Zvcm1Qb2ludCh0aGlzLl9sYXRsbmcsIHRoaXMuZHJhZ2dpbmcuX21hdHJpeCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMuX2dldExhdExuZygpO1xuICB9XG59O1xuXG5cbkwuUG9seWxpbmUucHJvdG90eXBlLl9nZXRMYXRMbmdzID0gTC5Qb2x5bGluZS5wcm90b3R5cGUuZ2V0TGF0TG5ncztcbkwuUG9seWxpbmUucHJvdG90eXBlLmdldExhdExuZ3MgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5kcmFnZ2luZy5pblByb2dyZXNzKCkpIHtcbiAgICB2YXIgbWF0cml4ID0gdGhpcy5kcmFnZ2luZy5fbWF0cml4O1xuICAgIHZhciBwb2ludHMgPSB0aGlzLl9nZXRMYXRMbmdzKCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBvaW50cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgcG9pbnRzW2ldID0gdGhpcy5kcmFnZ2luZy5fdHJhbnNmb3JtUG9pbnQocG9pbnRzW2ldLCBtYXRyaXgpO1xuICAgIH1cbiAgICByZXR1cm4gcG9pbnRzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0aGlzLl9nZXRMYXRMbmdzKCk7XG4gIH1cbn07XG4iLCIvKipcbiAqIE1hdHJpeCB0cmFuc2Zvcm0gcGF0aCBmb3IgU1ZHL1ZNTFxuICogVE9ETzogYWRhcHQgdG8gTGVhZmxldCAwLjggdXBvbiByZWxlYXNlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmlmIChMLkJyb3dzZXIuc3ZnKSB7IC8vIFNWRyB0cmFuc2Zvcm1hdGlvblxuXG4gIEwuUGF0aC5pbmNsdWRlKHtcblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRyYW5zZm9ybSBtYXRyaXhcbiAgICAgKi9cbiAgICBfcmVzZXRUcmFuc2Zvcm06IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5fY29udGFpbmVyLnNldEF0dHJpYnV0ZU5TKG51bGwsICd0cmFuc2Zvcm0nLCAnJyk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFwcGxpZXMgbWF0cml4IHRyYW5zZm9ybWF0aW9uIHRvIFNWR1xuICAgICAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuICAgICAqL1xuICAgIF9hcHBseVRyYW5zZm9ybTogZnVuY3Rpb24obWF0cml4KSB7XG4gICAgICB0aGlzLl9jb250YWluZXIuc2V0QXR0cmlidXRlTlMobnVsbCwgXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgJ21hdHJpeCgnICsgbWF0cml4LmpvaW4oJyAnKSArICcpJyk7XG4gICAgfVxuXG4gIH0pO1xuXG59IGVsc2UgeyAvLyBWTUwgdHJhbnNmb3JtIHJvdXRpbmVzXG5cbiAgTC5QYXRoLmluY2x1ZGUoe1xuXG4gICAgLyoqXG4gICAgICogUmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuICAgICAqL1xuICAgIF9yZXNldFRyYW5zZm9ybTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5fc2tldykge1xuICAgICAgICAvLyBzdXBlciBpbXBvcnRhbnQhIHdvcmthcm91bmQgZm9yIGEgJ2p1bXBpbmcnIGdsaXRjaDpcbiAgICAgICAgLy8gZGlzYWJsZSB0cmFuc2Zvcm0gYmVmb3JlIHJlbW92aW5nIGl0XG4gICAgICAgIHRoaXMuX3NrZXcub24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuX3NrZXcpO1xuICAgICAgICB0aGlzLl9za2V3ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gVk1MXG4gICAgICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG4gICAgICovXG4gICAgX2FwcGx5VHJhbnNmb3JtOiBmdW5jdGlvbihtYXRyaXgpIHtcbiAgICAgIHZhciBza2V3ID0gdGhpcy5fc2tldztcblxuICAgICAgaWYgKCFza2V3KSB7XG4gICAgICAgIHNrZXcgPSB0aGlzLl9jcmVhdGVFbGVtZW50KCdza2V3Jyk7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChza2V3KTtcbiAgICAgICAgc2tldy5zdHlsZS5iZWhhdmlvciA9ICd1cmwoI2RlZmF1bHQjVk1MKSc7XG4gICAgICAgIHRoaXMuX3NrZXcgPSBza2V3O1xuICAgICAgfVxuXG4gICAgICAvLyBoYW5kbGUgc2tldy90cmFuc2xhdGUgc2VwYXJhdGVseSwgY2F1c2UgaXQncyBicm9rZW5cbiAgICAgIHZhciBtdCA9IG1hdHJpeFswXS50b0ZpeGVkKDgpICsgXCIgXCIgKyBtYXRyaXhbMV0udG9GaXhlZCg4KSArIFwiIFwiICtcbiAgICAgICAgbWF0cml4WzJdLnRvRml4ZWQoOCkgKyBcIiBcIiArIG1hdHJpeFszXS50b0ZpeGVkKDgpICsgXCIgMCAwXCI7XG4gICAgICB2YXIgb2Zmc2V0ID0gTWF0aC5mbG9vcihtYXRyaXhbNF0pLnRvRml4ZWQoKSArIFwiLCBcIiArXG4gICAgICAgIE1hdGguZmxvb3IobWF0cml4WzVdKS50b0ZpeGVkKCkgKyBcIlwiO1xuXG4gICAgICB2YXIgcyA9IHRoaXMuX2NvbnRhaW5lci5zdHlsZTtcbiAgICAgIHZhciBsID0gcGFyc2VGbG9hdChzLmxlZnQpO1xuICAgICAgdmFyIHQgPSBwYXJzZUZsb2F0KHMudG9wKTtcbiAgICAgIHZhciB3ID0gcGFyc2VGbG9hdChzLndpZHRoKTtcbiAgICAgIHZhciBoID0gcGFyc2VGbG9hdChzLmhlaWdodCk7XG5cbiAgICAgIGlmIChpc05hTihsKSkgbCA9IDA7XG4gICAgICBpZiAoaXNOYU4odCkpIHQgPSAwO1xuICAgICAgaWYgKGlzTmFOKHcpIHx8ICF3KSB3ID0gMTtcbiAgICAgIGlmIChpc05hTihoKSB8fCAhaCkgaCA9IDE7XG5cbiAgICAgIHZhciBvcmlnaW4gPSAoLWwgLyB3IC0gMC41KS50b0ZpeGVkKDgpICsgXCIgXCIgKyAoLXQgLyBoIC0gMC41KS50b0ZpeGVkKDgpO1xuXG4gICAgICBza2V3Lm9uID0gXCJmXCI7XG4gICAgICBza2V3Lm1hdHJpeCA9IG10O1xuICAgICAgc2tldy5vcmlnaW4gPSBvcmlnaW47XG4gICAgICBza2V3Lm9mZnNldCA9IG9mZnNldDtcbiAgICAgIHNrZXcub24gPSB0cnVlO1xuICAgIH1cblxuICB9KTtcbn1cblxuLy8gUmVuZGVyZXItaW5kZXBlbmRlbnRcbkwuUGF0aC5pbmNsdWRlKHtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIGZlYXR1cmUgd2FzIGRyYWdnZWQsIHRoYXQnbGwgc3VwcmVzcyB0aGUgY2xpY2sgZXZlbnRcbiAgICogb24gbW91c2V1cC4gVGhhdCBmaXhlcyBwb3B1cHMgZm9yIGV4YW1wbGVcbiAgICpcbiAgICogQHBhcmFtICB7TW91c2VFdmVudH0gZVxuICAgKi9cbiAgX29uTW91c2VDbGljazogZnVuY3Rpb24oZSkge1xuICAgIGlmICgodGhpcy5kcmFnZ2luZyAmJiB0aGlzLmRyYWdnaW5nLm1vdmVkKCkpIHx8XG4gICAgICAodGhpcy5fbWFwLmRyYWdnaW5nICYmIHRoaXMuX21hcC5kcmFnZ2luZy5tb3ZlZCgpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2ZpcmVNb3VzZUV2ZW50KGUpO1xuICB9XG59KTtcbiJdfQ==
