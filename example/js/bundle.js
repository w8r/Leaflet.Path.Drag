(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
      draggable: true//,
      //renderer: renderer
    }
  )
  .addTo(map)
  .bindPopup("I'm a polygon with hole");

var circle = global.circle = new L.Circle([22.360897240132373, 114.14520263671875], 4000, {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgTCA9IGdsb2JhbC5MO1xuLy8gTC5Ccm93c2VyLnJldGluYSA9IHRydWU7XG52YXIgRHJhZ0hhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9pbmRleCcpO1xuTC5JY29uLkRlZmF1bHQuaW1hZ2VQYXRoID0gXCJsZWFmbGV0LW1hc3Rlci9pbWFnZXNcIjtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBtYXAgPSBnbG9iYWwubWFwID0gbmV3IEwuTWFwKCdtYXAnLCB7XG4gIC8vIGNyczogTC5DUlMuRVBTRzQzMjYgLy8gdGhhdCB3YXMgdGVzdGVkIGFzIHdlbGxcbn0pLnNldFZpZXcoWzIyLjQyNjU4LCAxMTQuMTk1Ml0sIDExKTtcblxudmFyIHJlbmRlcmVyID0gbmV3IEwuQ2FudmFzKCk7XG5cbkwudGlsZUxheWVyKCdodHRwOi8ve3N9LnRpbGUub3NtLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XG4gIGF0dHJpYnV0aW9uOiAnJmNvcHk7ICcgK1xuICAgICc8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xufSkuYWRkVG8obWFwKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIGludGVycG9sYXRlQXJyKGFycmF5LCBpbnNlcnQpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHAsIGksIGFycikge1xuICAgIHJlcy5wdXNoKHAuY29uY2F0KCkpO1xuXG4gICAgaWYgKGkgPCBhcnIubGVuZ3RoIC0gMSkge1xuICAgICAgdmFyIGRpZmYgPSBbYXJyW2kgKyAxXVswXSAtIHBbMF0sIGFycltpICsgMV1bMV0gLSBwWzFdXTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaW5zZXJ0OyBpKyspIHtcbiAgICAgICAgcmVzLnB1c2goW3BbMF0gKyAoZGlmZlswXSAqIGkpIC8gaW5zZXJ0LCBwWzFdICsgKGRpZmZbMV0gKiBpKSAvIGluc2VydF0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBwb2x5Z29uID0gZ2xvYmFsLnBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFxuXG4gICAgLy8gfiAxMyAwMDAgcG9pbnRzXG4gICAgaW50ZXJwb2xhdGVBcnIoW1xuICAgICAgWzExMy45NzY5NzQ0ODczMDQ2OSwgMjIuNDAzNDEwODkyNzEyMTI0XSxcbiAgICAgIFsxMTMuOTg2NTg3NTI0NDE0MDUsIDIyLjM4MzczMDA4NTkyNDk1XSxcbiAgICAgIFsxMTQuMDEyNjgwMDUzNzEwOTQsIDIyLjM2OTEyNjM5NzU0NTg4N10sXG4gICAgICBbMTE0LjAyNzc4NjI1NDg4MjgxLCAyMi4zODU2MzQ4MDE4NTcxOF0sXG4gICAgICBbMTE0LjA0NzAxMjMyOTEwMTU2LCAyMi4zOTUxNTc5OTAyOTA3NTVdLFxuICAgICAgWzExNC4wNjAwNTg1OTM3NSwgMjIuNDEzNTY3NjM4MzY5ODA1XSxcbiAgICAgIFsxMTQuMDYyODA1MTc1NzgxMjUsIDIyLjQzMjYwOTUzNDg3Njc5Nl0sXG4gICAgICBbMTE0LjA0ODM4NTYyMDExNzE3LCAyMi40NDQ2NjgwNTE2NTcxNTddLFxuICAgICAgWzExNC4wNDI4OTI0NTYwNTQ2OSwgMjIuNDQ4NDc1Nzg2NTY1NDRdLFxuICAgICAgWzExNC4wMzI1OTI3NzM0Mzc0OSwgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcbiAgICAgIFsxMTQuMDE5NTQ2NTA4Nzg5MDYsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgICBbMTEzLjk5NjIwMDU2MTUyMzQ0LCAyMi40MzY0MTc2MDA3NjMxMTRdLFxuICAgICAgWzExMy45ODE3ODEwMDU4NTkzOCwgMjIuNDIwNTQ5OTcwMjkwODc1XSxcbiAgICAgIFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF1cbiAgICBdLCAxMDAwKVxuICApLCB7XG4gICAgY29sb3I6ICcjZjAwJyxcbiAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgcmVuZGVyZXI6IHJlbmRlcmVyXG4gIH0pLmFkZFRvKG1hcCk7XG5cbnZhciBwb2x5bGluZSA9IGdsb2JhbC5wb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFxuICAgIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgICAgWzExNC4xNDMxNDI3MDAxOTUzMSwgMjIuNDk0Nzk0ODQ5NzU0NDNdLFxuICAgICAgWzExNC4xNTM0NDIzODI4MTI1LCAyMi40ODU5MTI5NDIzMjA5NThdLFxuICAgICAgWzExNC4xNTIwNjkwOTE3OTY4OCwgMjIuNDczMjIzNTE0NDc4MV0sXG4gICAgICBbMTE0LjE0OTMyMjUwOTc2NTYxLCAyMi40NTk4OTgzNjM5NDM4OTNdLFxuICAgICAgWzExNC4xNTk2MjIxOTIzODI4MSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICAgIFsxMTQuMTY5OTIxODc1LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgICAgWzExNC4xOTM5NTQ0Njc3NzM0NCwgMjIuNDU5ODk4MzYzOTQzODkzXSxcbiAgICAgIFsxMTQuMjA2MzE0MDg2OTE0MDYsIDIyLjQ2MTE2NzQ4MTEwOTM1XSxcbiAgICAgIFsxMTQuMjExODA3MjUwOTc2NTUsIDIyLjQ3Mzg1ODAxMzQ4NzYxNF0sXG4gICAgICBbMTE0LjIyNDE2Njg3MDExNzE5LCAyMi40NzEzMjAwMDAwMDk5OTJdLFxuICAgICAgWzExNC4yMzcyMTMxMzQ3NjU2MiwgMjIuNDc2Mzk1OTgwNDU3OTczXSxcbiAgICAgIFsxMTQuMjQyMDE5NjUzMzIwMzEsIDIyLjQ5MzUyNjA0MDczNzIyXSxcbiAgICAgIFsxMTQuMjMwMzQ2Njc5Njg3NSwgMjIuNTE1NzI4NTE4MzAzNTFdLFxuICAgICAgWzExNC4yMTc5ODcwNjA1NDY4OCwgMjIuNTI0NjA4NTExMDI2MjYyXSxcbiAgICAgIFsxMTQuMjA3Njg3Mzc3OTI5NjksIDIyLjUyNDYwODUxMTAyNjI2Ml0sXG4gICAgICBbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MzYwMjQ4MDU4ODY5NzRdXG4gICAgXSksIHtcbiAgICAgIHdlaWdodDogMTUsXG4gICAgICBkcmFnZ2FibGU6IHRydWVcbiAgICB9KVxuICAuYWRkVG8obWFwKVxuICAuYmluZFBvcHVwKFwiSSdtIGEgcG9seWxpbmVcIik7XG5cbnZhciBwb2x5Z29uV2l0aEhvbGUgPSBnbG9iYWwucG9seWdvbldpdGhIb2xlID0gbmV3IEwuUG9seWdvbihcbiAgICBbXG4gICAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40MTI5MzI4NjM1MTc3MTddLFxuICAgICAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi40MDA4NzE1OTAzMDU5NV0sXG4gICAgICAgIFsxMTQuMjkwMDg0ODM4ODY3MTcsIDIyLjM4ODgwOTI3MDQ1NTU2XSxcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuMzgyNDYwMjYwODE1NzE2XSxcbiAgICAgICAgWzExNC4zMTg5MjM5NTAxOTUzMSwgMjIuMzkxOTgzNjY2NjAyNzgzXSxcbiAgICAgICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzgwNTU1NTAxNDIxNTMzXSxcbiAgICAgICAgWzExNC4zNDI5NTY1NDI5Njg3NSwgMjIuMzcyOTM2MjAzMTEzODM4XSxcbiAgICAgICAgWzExNC4zMzQ3MTY3OTY4NzUsIDIyLjM4NDM2NDk5NDEzMzMwM10sXG4gICAgICAgIFsxMTQuMzMwNTk2OTIzODI4MTIsIDIyLjM5Mzg4ODI2OTUxMTE5NF0sXG4gICAgICAgIFsxMTQuMzIxNjcwNTMyMjI2NTUsIDIyLjQwMDg3MTU5MDMwNTk1XSxcbiAgICAgICAgWzExNC4zMjc4NTAzNDE3OTY4OCwgMjIuNDEzNTY3NjM4MzY5ODA1XSxcbiAgICAgICAgWzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDI0OTkzMDg5NjQ3MjJdLFxuICAgICAgICBbMTE0LjMyNTc5MDQwNTI3MzQ0LCAyMi40MzA3MDU0NjI3NDg5MThdLFxuICAgICAgICBbMTE0LjMzMTk3MDIxNDg0Mzc1LCAyMi40Mzk1OTA5MDkxNzI2Nl0sXG4gICAgICAgIFsxMTQuMzM3NDYzMzc4OTA2MjQsIDIyLjQ0OTExMDM5ODg4NjEwNl0sXG4gICAgICAgIFsxMTQuMzM1NDAzNDQyMzgyODEsIDIyLjQ2MTgwMjAzNTMzMzk5Ml0sXG4gICAgICAgIFsxMTQuMzI1MTAzNzU5NzY1NjIsIDIyLjQ2NDM0MDIyMzE3NzExOF0sXG4gICAgICAgIFsxMTQuMzI5MjIzNjMyODEyNDksIDIyLjQ3MjU4OTAxMjU2MTk1NF0sXG4gICAgICAgIFsxMTQuMzIzNzMwNDY4NzUsIDIyLjQ3NzAzMDQ2NDkzMzMwN10sXG4gICAgICAgIFsxMTQuMzE5NjEwNTk1NzAzMTIsIDIyLjQ3ODkzMzkwMDkxNjkyOF0sXG4gICAgICAgIFsxMTQuMzAxNzU3ODEyNSwgMjIuNDY2MjQzODMzNTQ5NDQ1XSxcbiAgICAgICAgWzExNC4zMDI0NDQ0NTgwMDc4MSwgMjIuNDU3MzYwMDk0NzUwMDgzXSxcbiAgICAgICAgWzExNC4yOTI4MzE0MjA4OTg0NCwgMjIuNDU0ODIxNzc5MDc1ODMyXSxcbiAgICAgICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDUxMDE0MjE4NDIyNjldLFxuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQ0Mjc2NDE0NTAwMTcwN10sXG4gICAgICAgIFsxMTQuMjkwNzcxNDg0Mzc0OTksIDIyLjQyODE2NjY1OTI3OTYxNV0sXG4gICAgICAgIFsxMTQuMjc3MDM4NTc0MjE4NzUsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDEyOTMyODYzNTE3NzE3XVxuICAgICAgXSksXG4gICAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddLFxuICAgICAgICBbMTE0LjI5MzUxODA2NjQwNjI1LCAyMi40MTQyMDI0MTAzMjEzMDJdLFxuICAgICAgICBbMTE0LjMwNTg3NzY4NTU0Njg2LCAyMi40MDg0ODkzNTgzNDI2MzVdLFxuICAgICAgICBbMTE0LjMyMjM1NzE3NzczNDM4LCAyMi40MjExODQ3MTAzMzE4NThdLFxuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi40MzM4Nzg5MDE3ODI5N11cbiAgICAgIF0pXG4gICAgXSwge1xuICAgICAgZHJhZ2dhYmxlOiB0cnVlLy8sXG4gICAgICAvL3JlbmRlcmVyOiByZW5kZXJlclxuICAgIH1cbiAgKVxuICAuYWRkVG8obWFwKVxuICAuYmluZFBvcHVwKFwiSSdtIGEgcG9seWdvbiB3aXRoIGhvbGVcIik7XG5cbnZhciBjaXJjbGUgPSBnbG9iYWwuY2lyY2xlID0gbmV3IEwuQ2lyY2xlKFsyMi4zNjA4OTcyNDAxMzIzNzMsIDExNC4xNDUyMDI2MzY3MTg3NV0sIDQwMDAsIHtcbiAgICBkcmFnZ2FibGU6IHRydWVcbiAgfSlcbiAgLmJpbmRQb3B1cChcIkwuQ2lyY2xlXCIpXG4gIC5hZGRUbyhtYXApXG5cbnZhciBjaXJjbGVNYXJrZXIgPSBuZXcgTC5DaXJjbGVNYXJrZXIobWFwLmdldENlbnRlcigpLCB7XG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICB9KVxuICAuYmluZFBvcHVwKFwiTC5DaXJjbGVNYXJrZXJcIilcbiAgLmFkZFRvKG1hcCk7XG5cbnZhciBtdWx0aVBvbHlnb24gPSBnbG9iYWwubXVsdGlQb2x5Z29uID0gbmV3IEwuUG9seWdvbihbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjA1NjI3NDQxNDA2MjUsIDIyLjMyMDg1OTg0MTAwNTkzXSxcbiAgICBbMTE0LjIxNTkyNzEyNDAyMzQ0LCAyMi4zNTI2MTYwMzU1MTIxNV0sXG4gICAgWzExNC4yNjQ2Nzg5NTUwNzgxMiwgMjIuMzUxMzQ1OTI2NjA2OTU3XSxcbiAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjMyNDAzNTc4NTg0MDM4XSxcbiAgICBbMTE0LjI5MjE0NDc3NTM5MDYyLCAyMi4zMjcyMTE2NTgzODg5M10sXG4gICAgWzExNC4zMDE3NTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjk0MjA0NzExOTE0MDYsIDIyLjI5MTAwMjQyNzczNTMyNV0sXG4gICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuMjcyNTc2NTg1NDEzNDc1XSxcbiAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi4yNjE3NzQxMDA5NzQzNV0sXG4gICAgWzExNC4yNjg3OTg4MjgxMjUsIDIyLjI4MTQ3MjEyMjc4MzgxOF0sXG4gICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi4yOTQ4MTQzNjc3ODA1MThdLFxuICAgIFsxMTQuMjY5NDg1NDczNjMyODEsIDIyLjMwMjQzNzkzNTkwNDQ4XSxcbiAgICBbMTE0LjI3MDE3MjExOTE0MDYyLCAyMi4zMTUxNDI5NTgxNjkzOV0sXG4gICAgWzExNC4yNTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjQ3NTEyODE3MzgyODEsIDIyLjI5OTg5Njc5Mjc1MTkyN10sXG4gICAgWzExNC4yNDU0NTI4ODA4NTkzOCwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjIyOTY2MDAzNDE3OTY5LCAyMi4zMDc1MjAwODM1MjI0NzZdLFxuICAgIFsxMTQuMjIwNzMzNjQyNTc4MTIsIDIyLjMwNTYxNDI5OTgzNzA0Nl0sXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl0sXG4gICAgWzExNC4zMjAyOTcyNDEyMTA5NCwgMjIuMzI2NTc2NDg5NjYyNDgyXSxcbiAgICBbMTE0LjMyOTkxMDI3ODMyMDMxLCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzMzMzQzNTA1ODU5MzgsIDIyLjMzMjI5MjkwNDA5MTcxNl0sXG4gICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzQyNDU0ODQwMTQ2NV0sXG4gICAgWzExNC4zMTU0OTA3MjI2NTYyNSwgMjIuMzM5Mjc5MzE0NjgzMTJdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdLFxuICAgIFsxMTQuMjgxMTU4NDQ3MjY1NjIsIDIyLjI1MTYwNjI5NTEzMjk0OF0sXG4gICAgWzExNC4yODY2NTE2MTEzMjgxMiwgMjIuMjU1NDE5MzA4ODU4NTU2XSxcbiAgICBbMTE0LjI5OTY5Nzg3NTk3NjU2LCAyMi4yNjExMzg2MzQ3NDQ0OV0sXG4gICAgWzExNC4yOTYyNjQ2NDg0Mzc1LCAyMi4yNTA5NzA3ODI3NTA4NjZdLFxuICAgIFsxMTQuMjk0ODkxMzU3NDIxODgsIDIyLjI0MDgwMjE5MjQ2MzM1XSxcbiAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4yMzg4OTU0OTk2MTMyMzJdLFxuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF1cbiAgXSlcbl0sIHtcbiAgZHJhZ2dhYmxlOiB0cnVlLFxuICAvLyByZW5kZXJlcjogcmVuZGVyZXIsXG4gIGNvbG9yOiAnIzA5Midcbn0pLmJpbmRQb3B1cCgnTXVsdGlQb2x5Z29uJykuYWRkVG8obWFwKTtcblxudmFyIG11bHRpUG9seWxpbmUgPSBnbG9iYWwubXVsdGlQb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExMy44OTg2OTY4OTk0MTQwNiwgMjIuMzk5NjAxOTIxNzA2OTUzXSxcbiAgICBbMTEzLjg5ODAxMDI1MzkwNjI1LCAyMi40MjI0NTQxODE3MDk3MDddLFxuICAgIFsxMTMuOTAzNTAzNDE3OTY4NzUsIDIyLjQzMzI0NDIxOTc4MTE3XSxcbiAgICBbMTEzLjkwOTY4MzIyNzUzOTA2LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgIFsxMTMuOTA2OTM2NjQ1NTA3ODEsIDIyLjQ3ODI5OTQyNTE2Mjg1Ml0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAyMi40ODg0NTA2ODgzMjU0MDhdLFxuICAgIFsxMTMuOTMzNzE1ODIwMzEyNSwgMjIuNDgzMzc1MTQ5Nzg5NjIzXSxcbiAgICBbMTEzLjk0NDcwMjE0ODQzNzUsIDIyLjQ5MjI1NzIyMDA4NTE5M10sXG4gICAgWzExMy45NTIyNTUyNDkwMjM0NCwgMjIuNTEyNTU2OTU0MDUxNDVdXG4gIF0pLFxuXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODY3Nzk3ODUxNTYyNSwgMjIuMzkyNjE4NTM3MTM3MzhdLFxuICAgIFsxMTMuODY5MTcxMTQyNTc4MTEsIDIyLjQyNzUzMTk1MTE1Njk5XSxcbiAgICBbMTEzLjkyMzQxNjEzNzY5NTMsIDIyLjQ2MjQzNjU4NjY1MzE0OF0sXG4gICAgWzExMy45NDgxMzUzNzU5NzY1NiwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICBbMTEzLjk3ODM0Nzc3ODMyMDMsIDIyLjQ5OTIzNTU4OTY4MzA2XSxcbiAgICBbMTEzLjk5Njg4NzIwNzAzMTI1LCAyMi41MTE5MjI2MzI0Njg4Nl0sXG4gICAgWzExNC4wMTMzNjY2OTkyMTg3NSwgMjIuNTAxMTM4NzIwMzAwMjU0XSxcbiAgICBbMTE0LjAyNTAzOTY3Mjg1MTU1LCAyMi41MDgxMTY2NDE4NTM2NzVdXG4gIF0pXG5dLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZSxcbiAgY29sb3I6ICcjZTkwJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlsaW5lJykuYWRkVG8obWFwKTtcblxudmFyIG1hcmtlciA9IG5ldyBMLk1hcmtlcihtYXAuZ2V0Q2VudGVyKCksIHtcbiAgZHJhZ2dhYmxlOiB0cnVlXG59KS5hZGRUbyhtYXApO1xuIl19
},{"../../index":2}],2:[function(require,module,exports){
require('./src/SVG');
require('./src/SVG.VML');
require('./src/Canvas');
require('./src/Path.Transform');
require('./src/Path.Drag');

module.exports = L.Path.Drag;

},{"./src/Canvas":3,"./src/Path.Drag":4,"./src/Path.Transform":5,"./src/SVG":7,"./src/SVG.VML":6}],3:[function(require,module,exports){
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
    var pos = bounds.min;

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
    ctx.clearRect(pos.x, pos.y, size.x * m, size.y * m);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
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

},{}],4:[function(require,module,exports){
/**
 * Drag handler
 * @class L.Path.Drag
 * @extends {L.Handler}
 */
L.Handler.PathDrag = L.Handler.extend( /** @lends  L.Path.Drag.prototype */ {

  statics: {
    DRAGGING_CLS: 'leaflet-path-draggable',
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
    this._mapDraggingWasEnabled = false;

  },

  /**
   * Enable dragging
   */
  addHooks: function() {
    this._path.on('mousedown', this._onDragStart, this);

    this._path.options.className = this._path.options.className ?
        (this._path.options.className + ' ' + L.Handler.PathDrag.DRAGGING_CLS) :
         L.Handler.PathDrag.DRAGGING_CLS;

    if (this._path._path) {
      L.DomUtil.addClass(this._path._path, L.Handler.PathDrag.DRAGGING_CLS);
    }
  },

  /**
   * Disable dragging
   */
  removeHooks: function() {
    this._path.off('mousedown', this._onDragStart, this);

    this._path.options.className = this._path.options.className
      .replace(new RegExp('\\s+' + L.Handler.PathDrag.DRAGGING_CLS), '');
    if (this._path._path) {
      L.DomUtil.removeClass(this._path._path, L.Handler.PathDrag.DRAGGING_CLS);
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

    this._replaceCoordGetters(evt);
  },

  /**
   * Dragging
   * @param  {L.MouseEvent} evt
   */
  _onDrag: function(evt) {
    L.DomEvent.stop(evt);

    var first = (evt.touches && evt.touches.length >= 1 ? evt.touches[0] : evt);
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
    this._path._transform(this._matrix);
    this._path.fire('drag', evt);
  },

  /**
   * Dragging stopped, apply
   * @param  {L.MouseEvent} evt
   */
  _onDragEnd: function(evt) {
    L.DomEvent.stop(evt);
    L.DomEvent._fakeStop({ type: 'click' });

    var containerPoint = this._path._map.mouseEventToContainerPoint(evt);

    // apply matrix
    if (this.moved()) {
      this._transformPoints(this._matrix);
      this._path._updatePath();
      this._path._project();
      this._path._transform(null);
    }

    L.DomEvent
      .off(document, 'mousemove touchmove', this._onDrag, this)
      .off(document, 'mouseup touchend',    this._onDragEnd, this);

    this._restoreCoordGetters();
    // consistency
    this._path.fire('dragend', {
      distance: Math.sqrt(
        L.LineUtil._sqDist(this._dragStartPoint, containerPoint)
      )
    });

    this._matrix         = null;
    this._startPoint     = null;
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
  _transformPoints: function(matrix, dest) {
    var path = this._path;
    var i, len, latlng;

    var px = L.point(matrix[4], matrix[5]);

    var crs = path._map.options.crs;
    var transformation = crs.transformation;
    var scale = crs.scale(path._map.getZoom());
    var projection = crs.projection;

    var diff = transformation.untransform(px, scale)
      .subtract(transformation.untransform(L.point(0, 0), scale));
    var applyTransform = !dest;

    path._bounds = new L.LatLngBounds();

    // console.time('transform');
    // all shifts are in-place
    if (path._point) { // L.Circle
      dest = projection.unproject(
        projection.project(path._latlng)._add(diff));
      if (applyTransform) {
        path._latlng = dest;
        path._point._add(px);
      }
    } else if (path._rings || path._parts) { // everything else
      var rings   = path._rings || path._parts;
      var latlngs = path._latlngs;
      dest = dest || latlngs;
      if (!L.Util.isArray(latlngs[0])) { // polyline
        latlngs = [latlngs];
        dest    = [dest];
      }
      for (i = 0, len = rings.length; i < len; i++) {
        dest[i] = dest[i] || [];
        for (var j = 0, jj = rings[i].length; j < jj; j++) {
          latlng     = latlngs[i][j];
          dest[i][j] = projection
            .unproject(projection.project(latlng)._add(diff));
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
  _replaceCoordGetters: function() {
    if (this._path.getLatLng) { // Circle, CircleMarker
      this._path.getLatLng_ = this._path.getLatLng;
      this._path.getLatLng = L.Util.bind(function() {
        return this.dragging._transformPoints(this.dragging._matrix, {});
      }, this._path);
    } else if (this._path.getLatLngs) {
      this._path.getLatLngs_ = this._path.getLatLngs;
      this._path.getLatLngs = L.Util.bind(function() {
        return this.dragging._transformPoints(this.dragging._matrix, []);
      }, this._path);
    }
  },


  /**
   * Put back the getters
   */
  _restoreCoordGetters: function() {
    if (this._path.getLatLng_) {
      this._path.getLatLng = this._path.getLatLng_;
      delete this._path.getLatLng_;
    } else if (this._path.getLatLngs_) {
      this._path.getLatLngs = this._path.getLatLngs_;
      delete this._path.getLatLngs_;
    }
  }

});


/**
 * @param  {L.Path} layer
 * @return {L.Path}
 */
L.Handler.PathDrag.makeDraggable = function(layer) {
  layer.dragging = new L.Handler.PathDrag(layer);
  return layer;
};


/**
 * Also expose as a method
 * @return {L.Path}
 */
L.Path.prototype.makeDraggable = function() {
  return L.Handler.PathDrag.makeDraggable(this);
};


L.Path.addInitHook(function() {
  if (this.options.draggable) {
    // ensure interactive
    this.options.interactive = true;

    if (this.dragging) {
      this.dragging.enable();
    } else {
      L.Handler.PathDrag.makeDraggable(this);
      this.dragging.enable();
    }
  } else if (this.dragging) {
    this.dragging.disable();
  }
});

},{}],5:[function(require,module,exports){
/**
 * Leaflet vector features drag functionality
 * @author Alexander Milevski <info@w8r.name>
 * @preserve
 */

/**
 * Matrix transform path for SVG/VML
 * Renderer-independent
 */
L.Path.include({

	/**
	 * Applies matrix transformation to SVG
	 * @param {Array.<Number>?} matrix
	 */
	_transform: function(matrix) {
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

},{}],6:[function(require,module,exports){
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
		var mt = matrix[0].toFixed(8) + ' ' + matrix[1].toFixed(8) + ' ' +
			matrix[2].toFixed(8) + ' ' + matrix[3].toFixed(8) + ' 0 0';
		var offset = Math.floor(matrix[4]).toFixed() + ', ' +
			Math.floor(matrix[5]).toFixed() + '';

		var s = this._path.style;
		var l = parseFloat(s.left);
		var t = parseFloat(s.top);
		var w = parseFloat(s.width);
		var h = parseFloat(s.height);

		if (isNaN(l)) { l = 0; }
		if (isNaN(t)) { t = 0; }
		if (isNaN(w) || !w) { w = 1; }
		if (isNaN(h) || !h) { h = 1; }

		var origin = (-l / w - 0.5).toFixed(8) + ' ' + (-t / h - 0.5).toFixed(8);

		skew.on = 'f';
		skew.matrix = mt;
		skew.origin = origin;
		skew.offset = offset;
		skew.on = true;
	}

});

},{}],7:[function(require,module,exports){
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
		layer._path.setAttributeNS(null, 'transform',
			'matrix(' + matrix.join(' ') + ')');
	}

});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiZXhhbXBsZS9qcy9hcHAuanMiLCJpbmRleC5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvUGF0aC5EcmFnLmpzIiwic3JjL1BhdGguVHJhbnNmb3JtLmpzIiwic3JjL1NWRy5WTUwuanMiLCJzcmMvU1ZHLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9UQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgTCA9IGdsb2JhbC5MO1xuLy8gTC5Ccm93c2VyLnJldGluYSA9IHRydWU7XG52YXIgRHJhZ0hhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9pbmRleCcpO1xuTC5JY29uLkRlZmF1bHQuaW1hZ2VQYXRoID0gXCJsZWFmbGV0LW1hc3Rlci9pbWFnZXNcIjtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBtYXAgPSBnbG9iYWwubWFwID0gbmV3IEwuTWFwKCdtYXAnLCB7XG4gIC8vIGNyczogTC5DUlMuRVBTRzQzMjYgLy8gdGhhdCB3YXMgdGVzdGVkIGFzIHdlbGxcbn0pLnNldFZpZXcoWzIyLjQyNjU4LCAxMTQuMTk1Ml0sIDExKTtcblxudmFyIHJlbmRlcmVyID0gbmV3IEwuQ2FudmFzKCk7XG5cbkwudGlsZUxheWVyKCdodHRwOi8ve3N9LnRpbGUub3NtLm9yZy97en0ve3h9L3t5fS5wbmcnLCB7XG4gIGF0dHJpYnV0aW9uOiAnJmNvcHk7ICcgK1xuICAgICc8YSBocmVmPVwiaHR0cDovL29zbS5vcmcvY29weXJpZ2h0XCI+T3BlblN0cmVldE1hcDwvYT4gY29udHJpYnV0b3JzJ1xufSkuYWRkVG8obWFwKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIGludGVycG9sYXRlQXJyKGFycmF5LCBpbnNlcnQpIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHAsIGksIGFycikge1xuICAgIHJlcy5wdXNoKHAuY29uY2F0KCkpO1xuXG4gICAgaWYgKGkgPCBhcnIubGVuZ3RoIC0gMSkge1xuICAgICAgdmFyIGRpZmYgPSBbYXJyW2kgKyAxXVswXSAtIHBbMF0sIGFycltpICsgMV1bMV0gLSBwWzFdXTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaW5zZXJ0OyBpKyspIHtcbiAgICAgICAgcmVzLnB1c2goW3BbMF0gKyAoZGlmZlswXSAqIGkpIC8gaW5zZXJ0LCBwWzFdICsgKGRpZmZbMV0gKiBpKSAvIGluc2VydF0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBwb2x5Z29uID0gZ2xvYmFsLnBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFxuXG4gICAgLy8gfiAxMyAwMDAgcG9pbnRzXG4gICAgaW50ZXJwb2xhdGVBcnIoW1xuICAgICAgWzExMy45NzY5NzQ0ODczMDQ2OSwgMjIuNDAzNDEwODkyNzEyMTI0XSxcbiAgICAgIFsxMTMuOTg2NTg3NTI0NDE0MDUsIDIyLjM4MzczMDA4NTkyNDk1XSxcbiAgICAgIFsxMTQuMDEyNjgwMDUzNzEwOTQsIDIyLjM2OTEyNjM5NzU0NTg4N10sXG4gICAgICBbMTE0LjAyNzc4NjI1NDg4MjgxLCAyMi4zODU2MzQ4MDE4NTcxOF0sXG4gICAgICBbMTE0LjA0NzAxMjMyOTEwMTU2LCAyMi4zOTUxNTc5OTAyOTA3NTVdLFxuICAgICAgWzExNC4wNjAwNTg1OTM3NSwgMjIuNDEzNTY3NjM4MzY5ODA1XSxcbiAgICAgIFsxMTQuMDYyODA1MTc1NzgxMjUsIDIyLjQzMjYwOTUzNDg3Njc5Nl0sXG4gICAgICBbMTE0LjA0ODM4NTYyMDExNzE3LCAyMi40NDQ2NjgwNTE2NTcxNTddLFxuICAgICAgWzExNC4wNDI4OTI0NTYwNTQ2OSwgMjIuNDQ4NDc1Nzg2NTY1NDRdLFxuICAgICAgWzExNC4wMzI1OTI3NzM0Mzc0OSwgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcbiAgICAgIFsxMTQuMDE5NTQ2NTA4Nzg5MDYsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgICBbMTEzLjk5NjIwMDU2MTUyMzQ0LCAyMi40MzY0MTc2MDA3NjMxMTRdLFxuICAgICAgWzExMy45ODE3ODEwMDU4NTkzOCwgMjIuNDIwNTQ5OTcwMjkwODc1XSxcbiAgICAgIFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF1cbiAgICBdLCAxMDAwKVxuICApLCB7XG4gICAgY29sb3I6ICcjZjAwJyxcbiAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgcmVuZGVyZXI6IHJlbmRlcmVyXG4gIH0pLmFkZFRvKG1hcCk7XG5cbnZhciBwb2x5bGluZSA9IGdsb2JhbC5wb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFxuICAgIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgICAgWzExNC4xNDMxNDI3MDAxOTUzMSwgMjIuNDk0Nzk0ODQ5NzU0NDNdLFxuICAgICAgWzExNC4xNTM0NDIzODI4MTI1LCAyMi40ODU5MTI5NDIzMjA5NThdLFxuICAgICAgWzExNC4xNTIwNjkwOTE3OTY4OCwgMjIuNDczMjIzNTE0NDc4MV0sXG4gICAgICBbMTE0LjE0OTMyMjUwOTc2NTYxLCAyMi40NTk4OTgzNjM5NDM4OTNdLFxuICAgICAgWzExNC4xNTk2MjIxOTIzODI4MSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICAgIFsxMTQuMTY5OTIxODc1LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgICAgWzExNC4xOTM5NTQ0Njc3NzM0NCwgMjIuNDU5ODk4MzYzOTQzODkzXSxcbiAgICAgIFsxMTQuMjA2MzE0MDg2OTE0MDYsIDIyLjQ2MTE2NzQ4MTEwOTM1XSxcbiAgICAgIFsxMTQuMjExODA3MjUwOTc2NTUsIDIyLjQ3Mzg1ODAxMzQ4NzYxNF0sXG4gICAgICBbMTE0LjIyNDE2Njg3MDExNzE5LCAyMi40NzEzMjAwMDAwMDk5OTJdLFxuICAgICAgWzExNC4yMzcyMTMxMzQ3NjU2MiwgMjIuNDc2Mzk1OTgwNDU3OTczXSxcbiAgICAgIFsxMTQuMjQyMDE5NjUzMzIwMzEsIDIyLjQ5MzUyNjA0MDczNzIyXSxcbiAgICAgIFsxMTQuMjMwMzQ2Njc5Njg3NSwgMjIuNTE1NzI4NTE4MzAzNTFdLFxuICAgICAgWzExNC4yMTc5ODcwNjA1NDY4OCwgMjIuNTI0NjA4NTExMDI2MjYyXSxcbiAgICAgIFsxMTQuMjA3Njg3Mzc3OTI5NjksIDIyLjUyNDYwODUxMTAyNjI2Ml0sXG4gICAgICBbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MzYwMjQ4MDU4ODY5NzRdXG4gICAgXSksIHtcbiAgICAgIHdlaWdodDogMTUsXG4gICAgICBkcmFnZ2FibGU6IHRydWVcbiAgICB9KVxuICAuYWRkVG8obWFwKVxuICAuYmluZFBvcHVwKFwiSSdtIGEgcG9seWxpbmVcIik7XG5cbnZhciBwb2x5Z29uV2l0aEhvbGUgPSBnbG9iYWwucG9seWdvbldpdGhIb2xlID0gbmV3IEwuUG9seWdvbihcbiAgICBbXG4gICAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40MTI5MzI4NjM1MTc3MTddLFxuICAgICAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi40MDA4NzE1OTAzMDU5NV0sXG4gICAgICAgIFsxMTQuMjkwMDg0ODM4ODY3MTcsIDIyLjM4ODgwOTI3MDQ1NTU2XSxcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuMzgyNDYwMjYwODE1NzE2XSxcbiAgICAgICAgWzExNC4zMTg5MjM5NTAxOTUzMSwgMjIuMzkxOTgzNjY2NjAyNzgzXSxcbiAgICAgICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzgwNTU1NTAxNDIxNTMzXSxcbiAgICAgICAgWzExNC4zNDI5NTY1NDI5Njg3NSwgMjIuMzcyOTM2MjAzMTEzODM4XSxcbiAgICAgICAgWzExNC4zMzQ3MTY3OTY4NzUsIDIyLjM4NDM2NDk5NDEzMzMwM10sXG4gICAgICAgIFsxMTQuMzMwNTk2OTIzODI4MTIsIDIyLjM5Mzg4ODI2OTUxMTE5NF0sXG4gICAgICAgIFsxMTQuMzIxNjcwNTMyMjI2NTUsIDIyLjQwMDg3MTU5MDMwNTk1XSxcbiAgICAgICAgWzExNC4zMjc4NTAzNDE3OTY4OCwgMjIuNDEzNTY3NjM4MzY5ODA1XSxcbiAgICAgICAgWzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDI0OTkzMDg5NjQ3MjJdLFxuICAgICAgICBbMTE0LjMyNTc5MDQwNTI3MzQ0LCAyMi40MzA3MDU0NjI3NDg5MThdLFxuICAgICAgICBbMTE0LjMzMTk3MDIxNDg0Mzc1LCAyMi40Mzk1OTA5MDkxNzI2Nl0sXG4gICAgICAgIFsxMTQuMzM3NDYzMzc4OTA2MjQsIDIyLjQ0OTExMDM5ODg4NjEwNl0sXG4gICAgICAgIFsxMTQuMzM1NDAzNDQyMzgyODEsIDIyLjQ2MTgwMjAzNTMzMzk5Ml0sXG4gICAgICAgIFsxMTQuMzI1MTAzNzU5NzY1NjIsIDIyLjQ2NDM0MDIyMzE3NzExOF0sXG4gICAgICAgIFsxMTQuMzI5MjIzNjMyODEyNDksIDIyLjQ3MjU4OTAxMjU2MTk1NF0sXG4gICAgICAgIFsxMTQuMzIzNzMwNDY4NzUsIDIyLjQ3NzAzMDQ2NDkzMzMwN10sXG4gICAgICAgIFsxMTQuMzE5NjEwNTk1NzAzMTIsIDIyLjQ3ODkzMzkwMDkxNjkyOF0sXG4gICAgICAgIFsxMTQuMzAxNzU3ODEyNSwgMjIuNDY2MjQzODMzNTQ5NDQ1XSxcbiAgICAgICAgWzExNC4zMDI0NDQ0NTgwMDc4MSwgMjIuNDU3MzYwMDk0NzUwMDgzXSxcbiAgICAgICAgWzExNC4yOTI4MzE0MjA4OTg0NCwgMjIuNDU0ODIxNzc5MDc1ODMyXSxcbiAgICAgICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDUxMDE0MjE4NDIyNjldLFxuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQ0Mjc2NDE0NTAwMTcwN10sXG4gICAgICAgIFsxMTQuMjkwNzcxNDg0Mzc0OTksIDIyLjQyODE2NjY1OTI3OTYxNV0sXG4gICAgICAgIFsxMTQuMjc3MDM4NTc0MjE4NzUsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDEyOTMyODYzNTE3NzE3XVxuICAgICAgXSksXG4gICAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddLFxuICAgICAgICBbMTE0LjI5MzUxODA2NjQwNjI1LCAyMi40MTQyMDI0MTAzMjEzMDJdLFxuICAgICAgICBbMTE0LjMwNTg3NzY4NTU0Njg2LCAyMi40MDg0ODkzNTgzNDI2MzVdLFxuICAgICAgICBbMTE0LjMyMjM1NzE3NzczNDM4LCAyMi40MjExODQ3MTAzMzE4NThdLFxuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi40MzM4Nzg5MDE3ODI5N11cbiAgICAgIF0pXG4gICAgXSwge1xuICAgICAgZHJhZ2dhYmxlOiB0cnVlLy8sXG4gICAgICAvL3JlbmRlcmVyOiByZW5kZXJlclxuICAgIH1cbiAgKVxuICAuYWRkVG8obWFwKVxuICAuYmluZFBvcHVwKFwiSSdtIGEgcG9seWdvbiB3aXRoIGhvbGVcIik7XG5cbnZhciBjaXJjbGUgPSBnbG9iYWwuY2lyY2xlID0gbmV3IEwuQ2lyY2xlKFsyMi4zNjA4OTcyNDAxMzIzNzMsIDExNC4xNDUyMDI2MzY3MTg3NV0sIDQwMDAsIHtcbiAgICBkcmFnZ2FibGU6IHRydWVcbiAgfSlcbiAgLmJpbmRQb3B1cChcIkwuQ2lyY2xlXCIpXG4gIC5hZGRUbyhtYXApXG5cbnZhciBjaXJjbGVNYXJrZXIgPSBuZXcgTC5DaXJjbGVNYXJrZXIobWFwLmdldENlbnRlcigpLCB7XG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICB9KVxuICAuYmluZFBvcHVwKFwiTC5DaXJjbGVNYXJrZXJcIilcbiAgLmFkZFRvKG1hcCk7XG5cbnZhciBtdWx0aVBvbHlnb24gPSBnbG9iYWwubXVsdGlQb2x5Z29uID0gbmV3IEwuUG9seWdvbihbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjA1NjI3NDQxNDA2MjUsIDIyLjMyMDg1OTg0MTAwNTkzXSxcbiAgICBbMTE0LjIxNTkyNzEyNDAyMzQ0LCAyMi4zNTI2MTYwMzU1MTIxNV0sXG4gICAgWzExNC4yNjQ2Nzg5NTUwNzgxMiwgMjIuMzUxMzQ1OTI2NjA2OTU3XSxcbiAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjMyNDAzNTc4NTg0MDM4XSxcbiAgICBbMTE0LjI5MjE0NDc3NTM5MDYyLCAyMi4zMjcyMTE2NTgzODg5M10sXG4gICAgWzExNC4zMDE3NTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjk0MjA0NzExOTE0MDYsIDIyLjI5MTAwMjQyNzczNTMyNV0sXG4gICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuMjcyNTc2NTg1NDEzNDc1XSxcbiAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi4yNjE3NzQxMDA5NzQzNV0sXG4gICAgWzExNC4yNjg3OTg4MjgxMjUsIDIyLjI4MTQ3MjEyMjc4MzgxOF0sXG4gICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi4yOTQ4MTQzNjc3ODA1MThdLFxuICAgIFsxMTQuMjY5NDg1NDczNjMyODEsIDIyLjMwMjQzNzkzNTkwNDQ4XSxcbiAgICBbMTE0LjI3MDE3MjExOTE0MDYyLCAyMi4zMTUxNDI5NTgxNjkzOV0sXG4gICAgWzExNC4yNTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjQ3NTEyODE3MzgyODEsIDIyLjI5OTg5Njc5Mjc1MTkyN10sXG4gICAgWzExNC4yNDU0NTI4ODA4NTkzOCwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjIyOTY2MDAzNDE3OTY5LCAyMi4zMDc1MjAwODM1MjI0NzZdLFxuICAgIFsxMTQuMjIwNzMzNjQyNTc4MTIsIDIyLjMwNTYxNDI5OTgzNzA0Nl0sXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl0sXG4gICAgWzExNC4zMjAyOTcyNDEyMTA5NCwgMjIuMzI2NTc2NDg5NjYyNDgyXSxcbiAgICBbMTE0LjMyOTkxMDI3ODMyMDMxLCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzMzMzQzNTA1ODU5MzgsIDIyLjMzMjI5MjkwNDA5MTcxNl0sXG4gICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzQyNDU0ODQwMTQ2NV0sXG4gICAgWzExNC4zMTU0OTA3MjI2NTYyNSwgMjIuMzM5Mjc5MzE0NjgzMTJdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdLFxuICAgIFsxMTQuMjgxMTU4NDQ3MjY1NjIsIDIyLjI1MTYwNjI5NTEzMjk0OF0sXG4gICAgWzExNC4yODY2NTE2MTEzMjgxMiwgMjIuMjU1NDE5MzA4ODU4NTU2XSxcbiAgICBbMTE0LjI5OTY5Nzg3NTk3NjU2LCAyMi4yNjExMzg2MzQ3NDQ0OV0sXG4gICAgWzExNC4yOTYyNjQ2NDg0Mzc1LCAyMi4yNTA5NzA3ODI3NTA4NjZdLFxuICAgIFsxMTQuMjk0ODkxMzU3NDIxODgsIDIyLjI0MDgwMjE5MjQ2MzM1XSxcbiAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4yMzg4OTU0OTk2MTMyMzJdLFxuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF1cbiAgXSlcbl0sIHtcbiAgZHJhZ2dhYmxlOiB0cnVlLFxuICAvLyByZW5kZXJlcjogcmVuZGVyZXIsXG4gIGNvbG9yOiAnIzA5Midcbn0pLmJpbmRQb3B1cCgnTXVsdGlQb2x5Z29uJykuYWRkVG8obWFwKTtcblxudmFyIG11bHRpUG9seWxpbmUgPSBnbG9iYWwubXVsdGlQb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExMy44OTg2OTY4OTk0MTQwNiwgMjIuMzk5NjAxOTIxNzA2OTUzXSxcbiAgICBbMTEzLjg5ODAxMDI1MzkwNjI1LCAyMi40MjI0NTQxODE3MDk3MDddLFxuICAgIFsxMTMuOTAzNTAzNDE3OTY4NzUsIDIyLjQzMzI0NDIxOTc4MTE3XSxcbiAgICBbMTEzLjkwOTY4MzIyNzUzOTA2LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgIFsxMTMuOTA2OTM2NjQ1NTA3ODEsIDIyLjQ3ODI5OTQyNTE2Mjg1Ml0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAyMi40ODg0NTA2ODgzMjU0MDhdLFxuICAgIFsxMTMuOTMzNzE1ODIwMzEyNSwgMjIuNDgzMzc1MTQ5Nzg5NjIzXSxcbiAgICBbMTEzLjk0NDcwMjE0ODQzNzUsIDIyLjQ5MjI1NzIyMDA4NTE5M10sXG4gICAgWzExMy45NTIyNTUyNDkwMjM0NCwgMjIuNTEyNTU2OTU0MDUxNDVdXG4gIF0pLFxuXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODY3Nzk3ODUxNTYyNSwgMjIuMzkyNjE4NTM3MTM3MzhdLFxuICAgIFsxMTMuODY5MTcxMTQyNTc4MTEsIDIyLjQyNzUzMTk1MTE1Njk5XSxcbiAgICBbMTEzLjkyMzQxNjEzNzY5NTMsIDIyLjQ2MjQzNjU4NjY1MzE0OF0sXG4gICAgWzExMy45NDgxMzUzNzU5NzY1NiwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICBbMTEzLjk3ODM0Nzc3ODMyMDMsIDIyLjQ5OTIzNTU4OTY4MzA2XSxcbiAgICBbMTEzLjk5Njg4NzIwNzAzMTI1LCAyMi41MTE5MjI2MzI0Njg4Nl0sXG4gICAgWzExNC4wMTMzNjY2OTkyMTg3NSwgMjIuNTAxMTM4NzIwMzAwMjU0XSxcbiAgICBbMTE0LjAyNTAzOTY3Mjg1MTU1LCAyMi41MDgxMTY2NDE4NTM2NzVdXG4gIF0pXG5dLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZSxcbiAgY29sb3I6ICcjZTkwJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlsaW5lJykuYWRkVG8obWFwKTtcblxudmFyIG1hcmtlciA9IG5ldyBMLk1hcmtlcihtYXAuZ2V0Q2VudGVyKCksIHtcbiAgZHJhZ2dhYmxlOiB0cnVlXG59KS5hZGRUbyhtYXApO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltVjRZVzF3YkdVdmFuTXZZWEJ3TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJJaXdpWm1sc1pTSTZJbWRsYm1WeVlYUmxaQzVxY3lJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKMllYSWdUQ0E5SUdkc2IySmhiQzVNTzF4dUx5OGdUQzVDY205M2MyVnlMbkpsZEdsdVlTQTlJSFJ5ZFdVN1hHNTJZWElnUkhKaFowaGhibVJzWlhJZ1BTQnlaWEYxYVhKbEtDY3VMaTh1TGk5cGJtUmxlQ2NwTzF4dVRDNUpZMjl1TGtSbFptRjFiSFF1YVcxaFoyVlFZWFJvSUQwZ1hDSnNaV0ZtYkdWMExXMWhjM1JsY2k5cGJXRm5aWE5jSWp0Y2JseHVMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OWNiblpoY2lCdFlYQWdQU0JuYkc5aVlXd3ViV0Z3SUQwZ2JtVjNJRXd1VFdGd0tDZHRZWEFuTENCN1hHNGdJQzh2SUdOeWN6b2dUQzVEVWxNdVJWQlRSelF6TWpZZ0x5OGdkR2hoZENCM1lYTWdkR1Z6ZEdWa0lHRnpJSGRsYkd4Y2JuMHBMbk5sZEZacFpYY29Xekl5TGpReU5qVTRMQ0F4TVRRdU1UazFNbDBzSURFeEtUdGNibHh1ZG1GeUlISmxibVJsY21WeUlEMGdibVYzSUV3dVEyRnVkbUZ6S0NrN1hHNWNia3d1ZEdsc1pVeGhlV1Z5S0Nkb2RIUndPaTh2ZTNOOUxuUnBiR1V1YjNOdExtOXlaeTk3ZW4wdmUzaDlMM3Q1ZlM1d2JtY25MQ0I3WEc0Z0lHRjBkSEpwWW5WMGFXOXVPaUFuSm1OdmNIazdJQ2NnSzF4dUlDQWdJQ2M4WVNCb2NtVm1QVndpYUhSMGNEb3ZMMjl6YlM1dmNtY3ZZMjl3ZVhKcFoyaDBYQ0krVDNCbGJsTjBjbVZsZEUxaGNEd3ZZVDRnWTI5dWRISnBZblYwYjNKekoxeHVmU2t1WVdSa1ZHOG9iV0Z3S1R0Y2JseHVMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OWNibVoxYm1OMGFXOXVJR2x1ZEdWeWNHOXNZWFJsUVhKeUtHRnljbUY1TENCcGJuTmxjblFwSUh0Y2JpQWdkbUZ5SUhKbGN5QTlJRnRkTzF4dUlDQmhjbkpoZVM1bWIzSkZZV05vS0daMWJtTjBhVzl1S0hBc0lHa3NJR0Z5Y2lrZ2UxeHVJQ0FnSUhKbGN5NXdkWE5vS0hBdVkyOXVZMkYwS0NrcE8xeHVYRzRnSUNBZ2FXWWdLR2tnUENCaGNuSXViR1Z1WjNSb0lDMGdNU2tnZTF4dUlDQWdJQ0FnZG1GeUlHUnBabVlnUFNCYllYSnlXMmtnS3lBeFhWc3dYU0F0SUhCYk1GMHNJR0Z5Y2x0cElDc2dNVjFiTVYwZ0xTQndXekZkWFR0Y2JpQWdJQ0FnSUdadmNpQW9kbUZ5SUdrZ1BTQXhPeUJwSUR3Z2FXNXpaWEowT3lCcEt5c3BJSHRjYmlBZ0lDQWdJQ0FnY21WekxuQjFjMmdvVzNCYk1GMGdLeUFvWkdsbVpsc3dYU0FxSUdrcElDOGdhVzV6WlhKMExDQndXekZkSUNzZ0tHUnBabVpiTVYwZ0tpQnBLU0F2SUdsdWMyVnlkRjBwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJSDFjYmlBZ2ZTazdYRzVjYmlBZ2NtVjBkWEp1SUhKbGN6dGNibjFjYmx4dUx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk5Y2JuWmhjaUJ3YjJ4NVoyOXVJRDBnWjJ4dlltRnNMbkJ2YkhsbmIyNGdQU0J1WlhjZ1RDNVFiMng1WjI5dUtGeHVJQ0JNTGtkbGIwcFRUMDR1WTI5dmNtUnpWRzlNWVhSTWJtZHpLRnh1WEc0Z0lDQWdMeThnZmlBeE15QXdNREFnY0c5cGJuUnpYRzRnSUNBZ2FXNTBaWEp3YjJ4aGRHVkJjbklvVzF4dUlDQWdJQ0FnV3pFeE15NDVOelk1TnpRME9EY3pNRFEyT1N3Z01qSXVOREF6TkRFd09Ea3lOekV5TVRJMFhTeGNiaUFnSUNBZ0lGc3hNVE11T1RnMk5UZzNOVEkwTkRFME1EVXNJREl5TGpNNE16Y3pNREE0TlRreU5EazFYU3hjYmlBZ0lDQWdJRnN4TVRRdU1ERXlOamd3TURVek56RXdPVFFzSURJeUxqTTJPVEV5TmpNNU56VTBOVGc0TjEwc1hHNGdJQ0FnSUNCYk1URTBMakF5TnpjNE5qSTFORGc0TWpneExDQXlNaTR6T0RVMk16UTRNREU0TlRjeE9GMHNYRzRnSUNBZ0lDQmJNVEUwTGpBME56QXhNak15T1RFd01UVTJMQ0F5TWk0ek9UVXhOVGM1T1RBeU9UQTNOVFZkTEZ4dUlDQWdJQ0FnV3pFeE5DNHdOakF3TlRnMU9UTTNOU3dnTWpJdU5ERXpOVFkzTmpNNE16WTVPREExWFN4Y2JpQWdJQ0FnSUZzeE1UUXVNRFl5T0RBMU1UYzFOemd4TWpVc0lESXlMalF6TWpZd09UVXpORGczTmpjNU5sMHNYRzRnSUNBZ0lDQmJNVEUwTGpBME9ETTROVFl5TURFeE56RTNMQ0F5TWk0ME5EUTJOamd3TlRFMk5UY3hOVGRkTEZ4dUlDQWdJQ0FnV3pFeE5DNHdOREk0T1RJME5UWXdOVFEyT1N3Z01qSXVORFE0TkRjMU56ZzJOVFkxTkRSZExGeHVJQ0FnSUNBZ1d6RXhOQzR3TXpJMU9USTNOek0wTXpjME9Td2dNakl1TkRRME5qWTRNRFV4TmpVM01UVTNYU3hjYmlBZ0lDQWdJRnN4TVRRdU1ERTVOVFEyTlRBNE56ZzVNRFlzSURJeUxqUTBOekl3TmpVMU16SXhNVGd4TkYwc1hHNGdJQ0FnSUNCYk1URXpMams1TmpJd01EVTJNVFV5TXpRMExDQXlNaTQwTXpZME1UYzJNREEzTmpNeE1UUmRMRnh1SUNBZ0lDQWdXekV4TXk0NU9ERTNPREV3TURVNE5Ua3pPQ3dnTWpJdU5ESXdOVFE1T1Rjd01qa3dPRGMxWFN4Y2JpQWdJQ0FnSUZzeE1UTXVPVGMyT1RjME5EZzNNekEwTmprc0lESXlMalF3TXpReE1EZzVNamN4TWpFeU5GMWNiaUFnSUNCZExDQXhNREF3S1Z4dUlDQXBMQ0I3WEc0Z0lDQWdZMjlzYjNJNklDY2paakF3Snl4Y2JpQWdJQ0JrY21GbloyRmliR1U2SUhSeWRXVXNYRzRnSUNBZ2NtVnVaR1Z5WlhJNklISmxibVJsY21WeVhHNGdJSDBwTG1Ga1pGUnZLRzFoY0NrN1hHNWNiblpoY2lCd2IyeDViR2x1WlNBOUlHZHNiMkpoYkM1d2IyeDViR2x1WlNBOUlHNWxkeUJNTGxCdmJIbHNhVzVsS0Z4dUlDQWdJRXd1UjJWdlNsTlBUaTVqYjI5eVpITlViMHhoZEV4dVozTW9XMXh1SUNBZ0lDQWdXekV4TkM0eE5ETXhOREkzTURBeE9UVXpNU3dnTWpJdU5EazBOemswT0RRNU56VTBORE5kTEZ4dUlDQWdJQ0FnV3pFeE5DNHhOVE0wTkRJek9ESTRNVEkxTENBeU1pNDBPRFU1TVRJNU5ESXpNakE1TlRoZExGeHVJQ0FnSUNBZ1d6RXhOQzR4TlRJd05qa3dPVEUzT1RZNE9Dd2dNakl1TkRjek1qSXpOVEUwTkRjNE1WMHNYRzRnSUNBZ0lDQmJNVEUwTGpFME9UTXlNalV3T1RjMk5UWXhMQ0F5TWk0ME5UazRPVGd6TmpNNU5ETTRPVE5kTEZ4dUlDQWdJQ0FnV3pFeE5DNHhOVGsyTWpJeE9USXpPREk0TVN3Z01qSXVORFEzTWpBMk5UVXpNakV4T0RFMFhTeGNiaUFnSUNBZ0lGc3hNVFF1TVRZNU9USXhPRGMxTENBeU1pNDBORGN5TURZMU5UTXlNVEU0TVRSZExGeHVJQ0FnSUNBZ1d6RXhOQzR4T1RNNU5UUTBOamMzTnpNME5Dd2dNakl1TkRVNU9EazRNell6T1RRek9Ea3pYU3hjYmlBZ0lDQWdJRnN4TVRRdU1qQTJNekUwTURnMk9URTBNRFlzSURJeUxqUTJNVEUyTnpRNE1URXdPVE0xWFN4Y2JpQWdJQ0FnSUZzeE1UUXVNakV4T0RBM01qVXdPVGMyTlRVc0lESXlMalEzTXpnMU9EQXhNelE0TnpZeE5GMHNYRzRnSUNBZ0lDQmJNVEUwTGpJeU5ERTJOamczTURFeE56RTVMQ0F5TWk0ME56RXpNakF3TURBd01EazVPVEpkTEZ4dUlDQWdJQ0FnV3pFeE5DNHlNemN5TVRNeE16UTNOalUyTWl3Z01qSXVORGMyTXprMU9UZ3dORFUzT1RjelhTeGNiaUFnSUNBZ0lGc3hNVFF1TWpReU1ERTVOalV6TXpJd016RXNJREl5TGpRNU16VXlOakEwTURjek56SXlYU3hjYmlBZ0lDQWdJRnN4TVRRdU1qTXdNelEyTmpjNU5qZzNOU3dnTWpJdU5URTFOekk0TlRFNE16QXpOVEZkTEZ4dUlDQWdJQ0FnV3pFeE5DNHlNVGM1T0Rjd05qQTFORFk0T0N3Z01qSXVOVEkwTmpBNE5URXhNREkyTWpZeVhTeGNiaUFnSUNBZ0lGc3hNVFF1TWpBM05qZzNNemMzT1RJNU5qa3NJREl5TGpVeU5EWXdPRFV4TVRBeU5qSTJNbDBzWEc0Z0lDQWdJQ0JiTVRFMExqSXdOelk0TnpNM056a3lPVFk1TENBeU1pNDFNell3TWpRNE1EVTRPRFk1TnpSZFhHNGdJQ0FnWFNrc0lIdGNiaUFnSUNBZ0lIZGxhV2RvZERvZ01UVXNYRzRnSUNBZ0lDQmtjbUZuWjJGaWJHVTZJSFJ5ZFdWY2JpQWdJQ0I5S1Z4dUlDQXVZV1JrVkc4b2JXRndLVnh1SUNBdVltbHVaRkJ2Y0hWd0tGd2lTU2R0SUdFZ2NHOXNlV3hwYm1WY0lpazdYRzVjYm5aaGNpQndiMng1WjI5dVYybDBhRWh2YkdVZ1BTQm5iRzlpWVd3dWNHOXNlV2R2YmxkcGRHaEliMnhsSUQwZ2JtVjNJRXd1VUc5c2VXZHZiaWhjYmlBZ0lDQmJYRzRnSUNBZ0lDQk1Ma2RsYjBwVFQwNHVZMjl2Y21SelZHOU1ZWFJNYm1kektGdGNiaUFnSUNBZ0lDQWdXekV4TkM0eU56UTVOemcyTXpjMk9UVXpMQ0F5TWk0ME1USTVNekk0TmpNMU1UYzNNVGRkTEZ4dUlDQWdJQ0FnSUNCYk1URTBMakk0TXprd05UQXlPVEk1TmpnNExDQXlNaTQwTURBNE56RTFPVEF6TURVNU5WMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU1qa3dNRGcwT0RNNE9EWTNNVGNzSURJeUxqTTRPRGd3T1RJM01EUTFOVFUyWFN4Y2JpQWdJQ0FnSUNBZ1d6RXhOQzR6TURFd056RXhOalk1T1RJeE9Td2dNakl1TXpneU5EWXdNall3T0RFMU56RTJYU3hjYmlBZ0lDQWdJQ0FnV3pFeE5DNHpNVGc1TWpNNU5UQXhPVFV6TVN3Z01qSXVNemt4T1Rnek5qWTJOakF5TnpnelhTeGNiaUFnSUNBZ0lDQWdXekV4TkM0ek1qTXdORE00TWpNeU5ESXhPU3dnTWpJdU16Z3dOVFUxTlRBeE5ESXhOVE16WFN4Y2JpQWdJQ0FnSUNBZ1d6RXhOQzR6TkRJNU5UWTFOREk1TmpnM05Td2dNakl1TXpjeU9UTTJNakF6TVRFek9ETTRYU3hjYmlBZ0lDQWdJQ0FnV3pFeE5DNHpNelEzTVRZM09UWTROelVzSURJeUxqTTRORE0yTkRrNU5ERXpNek13TTEwc1hHNGdJQ0FnSUNBZ0lGc3hNVFF1TXpNd05UazJPVEl6T0RJNE1USXNJREl5TGpNNU16ZzRPREkyT1RVeE1URTVORjBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNekl4Tmpjd05UTXlNakkyTlRVc0lESXlMalF3TURnM01UVTVNRE13TlRrMVhTeGNiaUFnSUNBZ0lDQWdXekV4TkM0ek1qYzROVEF6TkRFM09UWTRPQ3dnTWpJdU5ERXpOVFkzTmpNNE16WTVPREExWFN4Y2JpQWdJQ0FnSUNBZ1d6RXhOQzR6TXpFNU56QXlNVFE0TkRNM05Td2dNakl1TkRJME9Ua3pNRGc1TmpRM01qSmRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqTXlOVGM1TURRd05USTNNelEwTENBeU1pNDBNekEzTURVME5qSTNORGc1TVRoZExGeHVJQ0FnSUNBZ0lDQmJNVEUwTGpNek1UazNNREl4TkRnME16YzFMQ0F5TWk0ME16azFPVEE1TURreE56STJObDBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNek0zTkRZek16YzRPVEEyTWpRc0lESXlMalEwT1RFeE1ETTVPRGc0TmpFd05sMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU16TTFOREF6TkRReU16Z3lPREVzSURJeUxqUTJNVGd3TWpBek5UTXpNems1TWwwc1hHNGdJQ0FnSUNBZ0lGc3hNVFF1TXpJMU1UQXpOelU1TnpZMU5qSXNJREl5TGpRMk5ETTBNREl5TXpFM056RXhPRjBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNekk1TWpJek5qTXlPREV5TkRrc0lESXlMalEzTWpVNE9UQXhNalUyTVRrMU5GMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU16SXpOek13TkRZNE56VXNJREl5TGpRM056QXpNRFEyTkRrek16TXdOMTBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNekU1TmpFd05UazFOekF6TVRJc0lESXlMalEzT0Rrek16a3dNRGt4TmpreU9GMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU16QXhOelUzT0RFeU5Td2dNakl1TkRZMk1qUXpPRE16TlRRNU5EUTFYU3hjYmlBZ0lDQWdJQ0FnV3pFeE5DNHpNREkwTkRRME5UZ3dNRGM0TVN3Z01qSXVORFUzTXpZd01EazBOelV3TURnelhTeGNiaUFnSUNBZ0lDQWdXekV4TkM0eU9USTRNekUwTWpBNE9UZzBOQ3dnTWpJdU5EVTBPREl4TnpjNU1EYzFPRE15WFN4Y2JpQWdJQ0FnSUNBZ1d6RXhOQzR5T0RNNU1EVXdNamt5T1RZNE9Dd2dNakl1TkRVeE1ERTBNakU0TkRJeU5qbGRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqSTNORGszT0RZek56WTVOVE1zSURJeUxqUTBNamMyTkRFME5UQXdNVGN3TjEwc1hHNGdJQ0FnSUNBZ0lGc3hNVFF1TWprd056Y3hORGcwTXpjME9Ua3NJREl5TGpReU9ERTJOalkxT1RJM09UWXhOVjBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNamMzTURNNE5UYzBNakU0TnpVc0lESXlMalF5TURVME9UazNNREk1TURnM05WMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU1qYzBPVGM0TmpNM05qazFNeXdnTWpJdU5ERXlPVE15T0RZek5URTNOekUzWFZ4dUlDQWdJQ0FnWFNrc1hHNGdJQ0FnSUNCTUxrZGxiMHBUVDA0dVkyOXZjbVJ6Vkc5TVlYUk1ibWR6S0Z0Y2JpQWdJQ0FnSUNBZ1d6RXhOQzR6TURFd056RXhOalk1T1RJeE9Td2dNakl1TkRNek9EYzRPVEF4TnpneU9UZGRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqSTVNelV4T0RBMk5qUXdOakkxTENBeU1pNDBNVFF5TURJME1UQXpNakV6TURKZExGeHVJQ0FnSUNBZ0lDQmJNVEUwTGpNd05UZzNOelk0TlRVME5qZzJMQ0F5TWk0ME1EZzBPRGt6TlRnek5ESTJNelZkTEZ4dUlDQWdJQ0FnSUNCYk1URTBMak15TWpNMU56RTNOemN6TkRNNExDQXlNaTQwTWpFeE9EUTNNVEF6TXpFNE5UaGRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqTXdNVEEzTVRFMk5qazVNakU1TENBeU1pNDBNek00TnpnNU1ERTNPREk1TjExY2JpQWdJQ0FnSUYwcFhHNGdJQ0FnWFN3Z2UxeHVJQ0FnSUNBZ1pISmhaMmRoWW14bE9pQjBjblZsTHk4c1hHNGdJQ0FnSUNBdkwzSmxibVJsY21WeU9pQnlaVzVrWlhKbGNseHVJQ0FnSUgxY2JpQWdLVnh1SUNBdVlXUmtWRzhvYldGd0tWeHVJQ0F1WW1sdVpGQnZjSFZ3S0Z3aVNTZHRJR0VnY0c5c2VXZHZiaUIzYVhSb0lHaHZiR1ZjSWlrN1hHNWNiblpoY2lCamFYSmpiR1VnUFNCbmJHOWlZV3d1WTJseVkyeGxJRDBnYm1WM0lFd3VRMmx5WTJ4bEtGc3lNaTR6TmpBNE9UY3lOREF4TXpJek56TXNJREV4TkM0eE5EVXlNREkyTXpZM01UZzNOVjBzSURRd01EQXNJSHRjYmlBZ0lDQmtjbUZuWjJGaWJHVTZJSFJ5ZFdWY2JpQWdmU2xjYmlBZ0xtSnBibVJRYjNCMWNDaGNJa3d1UTJseVkyeGxYQ0lwWEc0Z0lDNWhaR1JVYnlodFlYQXBYRzVjYm5aaGNpQmphWEpqYkdWTllYSnJaWElnUFNCdVpYY2dUQzVEYVhKamJHVk5ZWEpyWlhJb2JXRndMbWRsZEVObGJuUmxjaWdwTENCN1hHNGdJQ0FnWkhKaFoyZGhZbXhsT2lCMGNuVmxMRnh1SUNBZ0lISmxibVJsY21WeU9pQnlaVzVrWlhKbGNseHVJQ0I5S1Z4dUlDQXVZbWx1WkZCdmNIVndLRndpVEM1RGFYSmpiR1ZOWVhKclpYSmNJaWxjYmlBZ0xtRmtaRlJ2S0cxaGNDazdYRzVjYm5aaGNpQnRkV3gwYVZCdmJIbG5iMjRnUFNCbmJHOWlZV3d1YlhWc2RHbFFiMng1WjI5dUlEMGdibVYzSUV3dVVHOXNlV2R2YmloYlhHNGdJRXd1UjJWdlNsTlBUaTVqYjI5eVpITlViMHhoZEV4dVozTW9XMXh1SUNBZ0lGc3hNVFF1TWpBMU5qSTNORFF4TkRBMk1qVXNJREl5TGpNeU1EZzFPVGcwTVRBd05Ua3pYU3hjYmlBZ0lDQmJNVEUwTGpJeE5Ua3lOekV5TkRBeU16UTBMQ0F5TWk0ek5USTJNVFl3TXpVMU1USXhOVjBzWEc0Z0lDQWdXekV4TkM0eU5qUTJOemc1TlRVd056Z3hNaXdnTWpJdU16VXhNelExT1RJMk5qQTJPVFUzWFN4Y2JpQWdJQ0JiTVRFMExqSTNORGszT0RZek56WTVOVE1zSURJeUxqTXlOREF6TlRjNE5UZzBNRE00WFN4Y2JpQWdJQ0JiTVRFMExqSTVNakUwTkRjM05UTTVNRFl5TENBeU1pNHpNamN5TVRFMk5UZ3pPRGc1TTEwc1hHNGdJQ0FnV3pFeE5DNHpNREUzTlRjNE1USTFMQ0F5TWk0ek1URTVOalk0TVRBNU56YzJNVFpkTEZ4dUlDQWdJRnN4TVRRdU1qazBNakEwTnpFeE9URTBNRFlzSURJeUxqSTVNVEF3TWpReU56Y3pOVE15TlYwc1hHNGdJQ0FnV3pFeE5DNHlPVE0xTVRnd05qWTBNRFl5TlN3Z01qSXVNamN5TlRjMk5UZzFOREV6TkRjMVhTeGNiaUFnSUNCYk1URTBMakk0TXprd05UQXlPVEk1TmpnNExDQXlNaTR5TmpFM056UXhNREE1TnpRek5WMHNYRzRnSUNBZ1d6RXhOQzR5TmpnM09UZzRNamd4TWpVc0lESXlMakk0TVRRM01qRXlNamM0TXpneE9GMHNYRzRnSUNBZ1d6RXhOQzR5TnpRNU56ZzJNemMyT1RVekxDQXlNaTR5T1RRNE1UUXpOamMzT0RBMU1UaGRMRnh1SUNBZ0lGc3hNVFF1TWpZNU5EZzFORGN6TmpNeU9ERXNJREl5TGpNd01qUXpOemt6TlRrd05EUTRYU3hjYmlBZ0lDQmJNVEUwTGpJM01ERTNNakV4T1RFME1EWXlMQ0F5TWk0ek1UVXhOREk1TlRneE5qa3pPVjBzWEc0Z0lDQWdXekV4TkM0eU5UYzRNVEkxTENBeU1pNHpNVEU1TmpZNE1UQTVOemMyTVRaZExGeHVJQ0FnSUZzeE1UUXVNalEzTlRFeU9ERTNNemd5T0RFc0lESXlMakk1T1RnNU5qYzVNamMxTVRreU4xMHNYRzRnSUNBZ1d6RXhOQzR5TkRVME5USTRPREE0TlRrek9Dd2dNakl1TWpreE1EQXlOREkzTnpNMU16STFYU3hjYmlBZ0lDQmJNVEUwTGpJeU9UWTJNREF6TkRFM09UWTVMQ0F5TWk0ek1EYzFNakF3T0RNMU1qSTBOelpkTEZ4dUlDQWdJRnN4TVRRdU1qSXdOek16TmpReU5UYzRNVElzSURJeUxqTXdOVFl4TkRJNU9UZ3pOekEwTmwwc1hHNGdJQ0FnV3pFeE5DNHlNRFUyTWpjME5ERTBNRFl5TlN3Z01qSXVNekl3T0RVNU9EUXhNREExT1ROZFhHNGdJRjBwTEZ4dUlDQk1Ma2RsYjBwVFQwNHVZMjl2Y21SelZHOU1ZWFJNYm1kektGdGNiaUFnSUNCYk1URTBMak14TlRRNU1EY3lNalkxTmpJMUxDQXlNaTR6TXpreU56a3pNVFEyT0RNeE1sMHNYRzRnSUNBZ1d6RXhOQzR6TWpBeU9UY3lOREV5TVRBNU5Dd2dNakl1TXpJMk5UYzJORGc1TmpZeU5EZ3lYU3hjYmlBZ0lDQmJNVEUwTGpNeU9Ua3hNREkzT0RNeU1ETXhMQ0F5TWk0ek1qWTFOelkwT0RrMk5qSTBPREpkTEZ4dUlDQWdJRnN4TVRRdU16TXpNelF6TlRBMU9EVTVNemdzSURJeUxqTXpNakk1TWprd05EQTVNVGN4Tmwwc1hHNGdJQ0FnV3pFeE5DNHpNak13TkRNNE1qTXlOREl4T1N3Z01qSXVNelF5TkRVME9EUXdNVFEyTlYwc1hHNGdJQ0FnV3pFeE5DNHpNVFUwT1RBM01qSTJOVFl5TlN3Z01qSXVNek01TWpjNU16RTBOamd6TVRKZFhHNGdJRjBwTEZ4dUlDQk1Ma2RsYjBwVFQwNHVZMjl2Y21SelZHOU1ZWFJNYm1kektGdGNiaUFnSUNCYk1URTBMakkzT1RBNU9EVXhNRGMwTWpFNUxDQXlNaTR5TkRRMk1UVTFNREF6TWpNd05qUmRMRnh1SUNBZ0lGc3hNVFF1TWpneE1UVTRORFEzTWpZMU5qSXNJREl5TGpJMU1UWXdOakk1TlRFek1qazBPRjBzWEc0Z0lDQWdXekV4TkM0eU9EWTJOVEUyTVRFek1qZ3hNaXdnTWpJdU1qVTFOREU1TXpBNE9EVTROVFUyWFN4Y2JpQWdJQ0JiTVRFMExqSTVPVFk1TnpnM05UazNOalUyTENBeU1pNHlOakV4TXpnMk16UTNORFEwT1Ywc1hHNGdJQ0FnV3pFeE5DNHlPVFl5TmpRMk5EZzBNemMxTENBeU1pNHlOVEE1TnpBM09ESTNOVEE0TmpaZExGeHVJQ0FnSUZzeE1UUXVNamswT0RreE16VTNOREl4T0Rnc0lESXlMakkwTURnd01qRTVNalEyTXpNMVhTeGNiaUFnSUNCYk1URTBMakk1TURBNE5EZ3pPRGcyTnpFM0xDQXlNaTR5TXpnNE9UVTBPVGsyTVRNeU16SmRMRnh1SUNBZ0lGc3hNVFF1TWpjNU1EazROVEV3TnpReU1Ua3NJREl5TGpJME5EWXhOVFV3TURNeU16QTJORjFjYmlBZ1hTbGNibDBzSUh0Y2JpQWdaSEpoWjJkaFlteGxPaUIwY25WbExGeHVJQ0F2THlCeVpXNWtaWEpsY2pvZ2NtVnVaR1Z5WlhJc1hHNGdJR052Ykc5eU9pQW5JekE1TWlkY2JuMHBMbUpwYm1SUWIzQjFjQ2duVFhWc2RHbFFiMng1WjI5dUp5a3VZV1JrVkc4b2JXRndLVHRjYmx4dWRtRnlJRzExYkhScFVHOXNlV3hwYm1VZ1BTQm5iRzlpWVd3dWJYVnNkR2xRYjJ4NWJHbHVaU0E5SUc1bGR5Qk1MbEJ2Ykhsc2FXNWxLRnRjYmlBZ1RDNUhaVzlLVTA5T0xtTnZiM0prYzFSdlRHRjBURzVuY3loYlhHNGdJQ0FnV3pFeE15NDRPVGcyT1RZNE9UazBNVFF3Tml3Z01qSXVNems1TmpBeE9USXhOekEyT1RVelhTeGNiaUFnSUNCYk1URXpMamc1T0RBeE1ESTFNemt3TmpJMUxDQXlNaTQwTWpJME5UUXhPREUzTURrM01EZGRMRnh1SUNBZ0lGc3hNVE11T1RBek5UQXpOREUzT1RZNE56VXNJREl5TGpRek16STBOREl4T1RjNE1URTNYU3hjYmlBZ0lDQmJNVEV6TGprd09UWTRNekl5TnpVek9UQTJMQ0F5TWk0ME5Ea3hNVEF6T1RnNE9EWXhNRFpkTEZ4dUlDQWdJRnN4TVRNdU9UQTJPVE0yTmpRMU5UQTNPREVzSURJeUxqUTNPREk1T1RReU5URTJNamcxTWwwc1hHNGdJQ0FnV3pFeE15NDVNak0wTVRZeE16YzJPVFV6TENBeU1pNDBPRGcwTlRBMk9EZ3pNalUwTURoZExGeHVJQ0FnSUZzeE1UTXVPVE16TnpFMU9ESXdNekV5TlN3Z01qSXVORGd6TXpjMU1UUTVOemc1TmpJelhTeGNiaUFnSUNCYk1URXpMamswTkRjd01qRTBPRFF6TnpVc0lESXlMalE1TWpJMU56SXlNREE0TlRFNU0xMHNYRzRnSUNBZ1d6RXhNeTQ1TlRJeU5UVXlORGt3TWpNME5Dd2dNakl1TlRFeU5UVTJPVFUwTURVeE5EVmRYRzRnSUYwcExGeHVYRzRnSUV3dVIyVnZTbE5QVGk1amIyOXlaSE5VYjB4aGRFeHVaM01vVzF4dUlDQWdJRnN4TVRNdU9EWTNOemszT0RVeE5UWXlOU3dnTWpJdU16a3lOakU0TlRNM01UTTNNemhkTEZ4dUlDQWdJRnN4TVRNdU9EWTVNVGN4TVRReU5UYzRNVEVzSURJeUxqUXlOelV6TVRrMU1URTFOams1WFN4Y2JpQWdJQ0JiTVRFekxqa3lNelF4TmpFek56WTVOVE1zSURJeUxqUTJNalF6TmpVNE5qWTFNekUwT0Ywc1hHNGdJQ0FnV3pFeE15NDVORGd4TXpVek56VTVOelkxTml3Z01qSXVORGN6T0RVNE1ERXpORGczTmpFMFhTeGNiaUFnSUNCYk1URXpMamszT0RNME56YzNPRE15TURNc0lESXlMalE1T1RJek5UVTRPVFk0TXpBMlhTeGNiaUFnSUNCYk1URXpMams1TmpnNE56SXdOekF6TVRJMUxDQXlNaTQxTVRFNU1qSTJNekkwTmpnNE5sMHNYRzRnSUNBZ1d6RXhOQzR3TVRNek5qWTJPVGt5TVRnM05Td2dNakl1TlRBeE1UTTROekl3TXpBd01qVTBYU3hjYmlBZ0lDQmJNVEUwTGpBeU5UQXpPVFkzTWpnMU1UVTFMQ0F5TWk0MU1EZ3hNVFkyTkRFNE5UTTJOelZkWEc0Z0lGMHBYRzVkTENCN1hHNGdJR1J5WVdkbllXSnNaVG9nZEhKMVpTeGNiaUFnWTI5c2IzSTZJQ2NqWlRrd0oxeHVmU2t1WW1sdVpGQnZjSFZ3S0NkTmRXeDBhVkJ2Ykhsc2FXNWxKeWt1WVdSa1ZHOG9iV0Z3S1R0Y2JseHVkbUZ5SUcxaGNtdGxjaUE5SUc1bGR5Qk1MazFoY210bGNpaHRZWEF1WjJWMFEyVnVkR1Z5S0Nrc0lIdGNiaUFnWkhKaFoyZGhZbXhsT2lCMGNuVmxYRzU5S1M1aFpHUlVieWh0WVhBcE8xeHVJbDE5IiwicmVxdWlyZSgnLi9zcmMvU1ZHJyk7XG5yZXF1aXJlKCcuL3NyYy9TVkcuVk1MJyk7XG5yZXF1aXJlKCcuL3NyYy9DYW52YXMnKTtcbnJlcXVpcmUoJy4vc3JjL1BhdGguVHJhbnNmb3JtJyk7XG5yZXF1aXJlKCcuL3NyYy9QYXRoLkRyYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBMLlBhdGguRHJhZztcbiIsIkwuVXRpbC50cnVlRm4gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRydWU7XG59O1xuXG5MLkNhbnZhcy5pbmNsdWRlKHtcblxuICAvKipcbiAgICogRG8gbm90aGluZ1xuICAgKiBAcGFyYW0gIHtMLlBhdGh9IGxheWVyXG4gICAqL1xuICBfcmVzZXRUcmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllcikge1xuICAgIGlmICghdGhpcy5fY29udGFpbmVyQ29weSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRlbGV0ZSB0aGlzLl9jb250YWluZXJDb3B5O1xuXG4gICAgaWYgKGxheWVyLl9jb250YWluc1BvaW50Xykge1xuICAgICAgbGF5ZXIuX2NvbnRhaW5zUG9pbnQgPSBsYXllci5fY29udGFpbnNQb2ludF87XG4gICAgICBkZWxldGUgbGF5ZXIuX2NvbnRhaW5zUG9pbnRfO1xuXG4gICAgICB0aGlzLl9yZXF1ZXN0UmVkcmF3KGxheWVyKTtcbiAgICAgIHRoaXMuX2RyYXcodHJ1ZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBBbGdvcml0aG0gb3V0bGluZTpcbiAgICpcbiAgICogMS4gcHJlLXRyYW5zZm9ybSAtIGNsZWFyIHRoZSBwYXRoIG91dCBvZiB0aGUgY2FudmFzLCBjb3B5IGNhbnZhcyBzdGF0ZVxuICAgKiAyLiBhdCBldmVyeSBmcmFtZTpcbiAgICogICAgMi4xLiBzYXZlXG4gICAqICAgIDIuMi4gcmVkcmF3IHRoZSBjYW52YXMgZnJvbSBzYXZlZCBvbmVcbiAgICogICAgMi4zLiB0cmFuc2Zvcm1cbiAgICogICAgMi40LiBkcmF3IHBhdGhcbiAgICogICAgMi41LiByZXN0b3JlXG4gICAqXG4gICAqIEBwYXJhbSAge0wuUGF0aH0gbGF5ZXJcbiAgICogQHBhcmFtICB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuICAgKi9cbiAgdHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuICAgIHZhciBjb3B5ID0gdGhpcy5fY29udGFpbmVyQ29weTtcbiAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgIHZhciBtID0gTC5Ccm93c2VyLnJldGluYSA/IDIgOiAxO1xuICAgIHZhciBib3VuZHMgPSB0aGlzLl9ib3VuZHM7XG4gICAgdmFyIHNpemUgPSBib3VuZHMuZ2V0U2l6ZSgpO1xuICAgIHZhciBwb3MgPSBib3VuZHMubWluO1xuXG4gICAgaWYgKCFjb3B5KSB7XG4gICAgICBjb3B5ID0gdGhpcy5fY29udGFpbmVyQ29weSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb3B5KTtcblxuICAgICAgY29weS53aWR0aCA9IG0gKiBzaXplLng7XG4gICAgICBjb3B5LmhlaWdodCA9IG0gKiBzaXplLnk7XG5cbiAgICAgIGxheWVyLl9yZW1vdmVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuX3JlZHJhdygpO1xuXG4gICAgICBjb3B5LmdldENvbnRleHQoJzJkJykudHJhbnNsYXRlKG0gKiBib3VuZHMubWluLngsIG0gKiBib3VuZHMubWluLnkpO1xuICAgICAgY29weS5nZXRDb250ZXh0KCcyZCcpLmRyYXdJbWFnZSh0aGlzLl9jb250YWluZXIsIDAsIDApO1xuICAgICAgdGhpcy5faW5pdFBhdGgobGF5ZXIpO1xuICAgICAgbGF5ZXIuX2NvbnRhaW5zUG9pbnRfID0gbGF5ZXIuX2NvbnRhaW5zUG9pbnQ7XG4gICAgICBsYXllci5fY29udGFpbnNQb2ludCA9IEwuVXRpbC50cnVlRm47XG4gICAgfVxuXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguY2xlYXJSZWN0KHBvcy54LCBwb3MueSwgc2l6ZS54ICogbSwgc2l6ZS55ICogbSk7XG4gICAgY3R4LnNldFRyYW5zZm9ybSgxLCAwLCAwLCAxLCAwLCAwKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICAgIGN0eC5zYXZlKCk7XG5cbiAgICBjdHguZHJhd0ltYWdlKHRoaXMuX2NvbnRhaW5lckNvcHksIDAsIDAsIHNpemUueCwgc2l6ZS55KTtcbiAgICBjdHgudHJhbnNmb3JtLmFwcGx5KGN0eCwgbWF0cml4KTtcblxuICAgIHZhciBsYXllcnMgPSB0aGlzLl9sYXllcnM7XG4gICAgdGhpcy5fbGF5ZXJzID0ge307XG5cbiAgICB0aGlzLl9pbml0UGF0aChsYXllcik7XG4gICAgbGF5ZXIuX3VwZGF0ZVBhdGgoKTtcblxuICAgIHRoaXMuX2xheWVycyA9IGxheWVycztcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbn0pO1xuIiwiLyoqXG4gKiBEcmFnIGhhbmRsZXJcbiAqIEBjbGFzcyBMLlBhdGguRHJhZ1xuICogQGV4dGVuZHMge0wuSGFuZGxlcn1cbiAqL1xuTC5IYW5kbGVyLlBhdGhEcmFnID0gTC5IYW5kbGVyLmV4dGVuZCggLyoqIEBsZW5kcyAgTC5QYXRoLkRyYWcucHJvdG90eXBlICovIHtcblxuICBzdGF0aWNzOiB7XG4gICAgRFJBR0dJTkdfQ0xTOiAnbGVhZmxldC1wYXRoLWRyYWdnYWJsZScsXG4gIH0sXG5cblxuICAvKipcbiAgICogQHBhcmFtICB7TC5QYXRofSBwYXRoXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUGF0aH1cbiAgICAgKi9cbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48TnVtYmVyPn1cbiAgICAgKi9cbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUG9pbnR9XG4gICAgICovXG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7TC5Qb2ludH1cbiAgICAgKi9cbiAgICB0aGlzLl9kcmFnU3RhcnRQb2ludCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQgPSBmYWxzZTtcblxuICB9LFxuXG4gIC8qKlxuICAgKiBFbmFibGUgZHJhZ2dpbmdcbiAgICovXG4gIGFkZEhvb2tzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9wYXRoLm9uKCdtb3VzZWRvd24nLCB0aGlzLl9vbkRyYWdTdGFydCwgdGhpcyk7XG5cbiAgICB0aGlzLl9wYXRoLm9wdGlvbnMuY2xhc3NOYW1lID0gdGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZSA/XG4gICAgICAgICh0aGlzLl9wYXRoLm9wdGlvbnMuY2xhc3NOYW1lICsgJyAnICsgTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHSU5HX0NMUykgOlxuICAgICAgICAgTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHSU5HX0NMUztcblxuICAgIGlmICh0aGlzLl9wYXRoLl9wYXRoKSB7XG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fcGF0aC5fcGF0aCwgTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHSU5HX0NMUyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIGRyYWdnaW5nXG4gICAqL1xuICByZW1vdmVIb29rczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcGF0aC5vZmYoJ21vdXNlZG93bicsIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKTtcblxuICAgIHRoaXMuX3BhdGgub3B0aW9ucy5jbGFzc05hbWUgPSB0aGlzLl9wYXRoLm9wdGlvbnMuY2xhc3NOYW1lXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxccysnICsgTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHSU5HX0NMUyksICcnKTtcbiAgICBpZiAodGhpcy5fcGF0aC5fcGF0aCkge1xuICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3BhdGguX3BhdGgsIEwuSGFuZGxlci5QYXRoRHJhZy5EUkFHR0lOR19DTFMpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIG1vdmVkOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcGF0aC5fZHJhZ01vdmVkO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTdGFydCBkcmFnXG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgIHZhciBldmVudFR5cGUgPSBldnQub3JpZ2luYWxFdmVudC5fc2ltdWxhdGVkID8gJ3RvdWNoc3RhcnQnIDogZXZ0Lm9yaWdpbmFsRXZlbnQudHlwZTtcblxuICAgIHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSBldnQuY29udGFpbmVyUG9pbnQuY2xvbmUoKTtcbiAgICB0aGlzLl9kcmFnU3RhcnRQb2ludCA9IGV2dC5jb250YWluZXJQb2ludC5jbG9uZSgpO1xuICAgIHRoaXMuX21hdHJpeCA9IFsxLCAwLCAwLCAxLCAwLCAwXTtcbiAgICBMLkRvbUV2ZW50LnN0b3AoZXZ0Lm9yaWdpbmFsRXZlbnQpO1xuXG4gICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3BhdGguX3JlbmRlcmVyLl9jb250YWluZXIsICdsZWFmbGV0LWludGVyYWN0aXZlJyk7XG4gICAgTC5Eb21FdmVudFxuICAgICAgLm9uKGRvY3VtZW50LCBMLkRyYWdnYWJsZS5NT1ZFW2V2ZW50VHlwZV0sIHRoaXMuX29uRHJhZywgdGhpcylcbiAgICAgIC5vbihkb2N1bWVudCwgTC5EcmFnZ2FibGUuRU5EW2V2ZW50VHlwZV0sIHRoaXMuX29uRHJhZ0VuZCwgdGhpcyk7XG5cbiAgICBpZiAodGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmVuYWJsZWQoKSkge1xuICAgICAgLy8gSSBndWVzcyBpdCdzIHJlcXVpcmVkIGJlY2F1c2UgbW91c2Rvd24gZ2V0cyBzaW11bGF0ZWQgd2l0aCBhIGRlbGF5XG4gICAgICB0aGlzLl9wYXRoLl9tYXAuZHJhZ2dpbmcuX2RyYWdnYWJsZS5fb25VcCgpO1xuXG4gICAgICB0aGlzLl9wYXRoLl9tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5fcGF0aC5fZHJhZ01vdmVkID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fcGF0aC5fcG9wdXApIHsgLy8gdGhhdCBtaWdodCBiZSBhIGNhc2Ugb24gdG91Y2ggZGV2aWNlcyBhcyB3ZWxsXG4gICAgICB0aGlzLl9wYXRoLl9wb3B1cC5fY2xvc2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZXBsYWNlQ29vcmRHZXR0ZXJzKGV2dCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERyYWdnaW5nXG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnOiBmdW5jdGlvbihldnQpIHtcbiAgICBMLkRvbUV2ZW50LnN0b3AoZXZ0KTtcblxuICAgIHZhciBmaXJzdCA9IChldnQudG91Y2hlcyAmJiBldnQudG91Y2hlcy5sZW5ndGggPj0gMSA/IGV2dC50b3VjaGVzWzBdIDogZXZ0KTtcbiAgICB2YXIgY29udGFpbmVyUG9pbnQgPSB0aGlzLl9wYXRoLl9tYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZmlyc3QpO1xuXG4gICAgdmFyIHggPSBjb250YWluZXJQb2ludC54O1xuICAgIHZhciB5ID0gY29udGFpbmVyUG9pbnQueTtcblxuICAgIHZhciBkeCA9IHggLSB0aGlzLl9zdGFydFBvaW50Lng7XG4gICAgdmFyIGR5ID0geSAtIHRoaXMuX3N0YXJ0UG9pbnQueTtcblxuICAgIGlmICghdGhpcy5fcGF0aC5fZHJhZ01vdmVkICYmIChkeCB8fCBkeSkpIHtcbiAgICAgIHRoaXMuX3BhdGguX2RyYWdNb3ZlZCA9IHRydWU7XG4gICAgICB0aGlzLl9wYXRoLmZpcmUoJ2RyYWdzdGFydCcsIGV2dCk7XG4gICAgICAvLyB3ZSBkb24ndCB3YW50IHRoYXQgdG8gaGFwcGVuIG9uIGNsaWNrXG4gICAgICB0aGlzLl9wYXRoLmJyaW5nVG9Gcm9udCgpO1xuICAgIH1cblxuICAgIHRoaXMuX21hdHJpeFs0XSArPSBkeDtcbiAgICB0aGlzLl9tYXRyaXhbNV0gKz0gZHk7XG5cbiAgICB0aGlzLl9zdGFydFBvaW50LnggPSB4O1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQueSA9IHk7XG5cbiAgICB0aGlzLl9wYXRoLmZpcmUoJ3ByZWRyYWcnLCBldnQpO1xuICAgIHRoaXMuX3BhdGguX3RyYW5zZm9ybSh0aGlzLl9tYXRyaXgpO1xuICAgIHRoaXMuX3BhdGguZmlyZSgnZHJhZycsIGV2dCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERyYWdnaW5nIHN0b3BwZWQsIGFwcGx5XG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnRW5kOiBmdW5jdGlvbihldnQpIHtcbiAgICBMLkRvbUV2ZW50LnN0b3AoZXZ0KTtcbiAgICBMLkRvbUV2ZW50Ll9mYWtlU3RvcCh7IHR5cGU6ICdjbGljaycgfSk7XG5cbiAgICB2YXIgY29udGFpbmVyUG9pbnQgPSB0aGlzLl9wYXRoLl9tYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZXZ0KTtcblxuICAgIC8vIGFwcGx5IG1hdHJpeFxuICAgIGlmICh0aGlzLm1vdmVkKCkpIHtcbiAgICAgIHRoaXMuX3RyYW5zZm9ybVBvaW50cyh0aGlzLl9tYXRyaXgpO1xuICAgICAgdGhpcy5fcGF0aC5fdXBkYXRlUGF0aCgpO1xuICAgICAgdGhpcy5fcGF0aC5fcHJvamVjdCgpO1xuICAgICAgdGhpcy5fcGF0aC5fdHJhbnNmb3JtKG51bGwpO1xuICAgIH1cblxuICAgIEwuRG9tRXZlbnRcbiAgICAgIC5vZmYoZG9jdW1lbnQsICdtb3VzZW1vdmUgdG91Y2htb3ZlJywgdGhpcy5fb25EcmFnLCB0aGlzKVxuICAgICAgLm9mZihkb2N1bWVudCwgJ21vdXNldXAgdG91Y2hlbmQnLCAgICB0aGlzLl9vbkRyYWdFbmQsIHRoaXMpO1xuXG4gICAgdGhpcy5fcmVzdG9yZUNvb3JkR2V0dGVycygpO1xuICAgIC8vIGNvbnNpc3RlbmN5XG4gICAgdGhpcy5fcGF0aC5maXJlKCdkcmFnZW5kJywge1xuICAgICAgZGlzdGFuY2U6IE1hdGguc3FydChcbiAgICAgICAgTC5MaW5lVXRpbC5fc3FEaXN0KHRoaXMuX2RyYWdTdGFydFBvaW50LCBjb250YWluZXJQb2ludClcbiAgICAgIClcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdHJpeCAgICAgICAgID0gbnVsbDtcbiAgICB0aGlzLl9zdGFydFBvaW50ICAgICA9IG51bGw7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCkge1xuICAgICAgdGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH1cbiAgfSxcblxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRyYW5zZm9ybWF0aW9uLCBkb2VzIGl0IGluIG9uZSBzd2VlcCBmb3IgcGVyZm9ybWFuY2UsXG4gICAqIHNvIGRvbid0IGJlIHN1cnByaXNlZCBhYm91dCB0aGUgY29kZSByZXBldGl0aW9uLlxuICAgKlxuICAgKiBbIHggXSAgIFsgYSAgYiAgdHggXSBbIHggXSAgIFsgYSAqIHggKyBiICogeSArIHR4IF1cbiAgICogWyB5IF0gPSBbIGMgIGQgIHR5IF0gWyB5IF0gPSBbIGMgKiB4ICsgZCAqIHkgKyB0eSBdXG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuICAgKi9cbiAgX3RyYW5zZm9ybVBvaW50czogZnVuY3Rpb24obWF0cml4LCBkZXN0KSB7XG4gICAgdmFyIHBhdGggPSB0aGlzLl9wYXRoO1xuICAgIHZhciBpLCBsZW4sIGxhdGxuZztcblxuICAgIHZhciBweCA9IEwucG9pbnQobWF0cml4WzRdLCBtYXRyaXhbNV0pO1xuXG4gICAgdmFyIGNycyA9IHBhdGguX21hcC5vcHRpb25zLmNycztcbiAgICB2YXIgdHJhbnNmb3JtYXRpb24gPSBjcnMudHJhbnNmb3JtYXRpb247XG4gICAgdmFyIHNjYWxlID0gY3JzLnNjYWxlKHBhdGguX21hcC5nZXRab29tKCkpO1xuICAgIHZhciBwcm9qZWN0aW9uID0gY3JzLnByb2plY3Rpb247XG5cbiAgICB2YXIgZGlmZiA9IHRyYW5zZm9ybWF0aW9uLnVudHJhbnNmb3JtKHB4LCBzY2FsZSlcbiAgICAgIC5zdWJ0cmFjdCh0cmFuc2Zvcm1hdGlvbi51bnRyYW5zZm9ybShMLnBvaW50KDAsIDApLCBzY2FsZSkpO1xuICAgIHZhciBhcHBseVRyYW5zZm9ybSA9ICFkZXN0O1xuXG4gICAgcGF0aC5fYm91bmRzID0gbmV3IEwuTGF0TG5nQm91bmRzKCk7XG5cbiAgICAvLyBjb25zb2xlLnRpbWUoJ3RyYW5zZm9ybScpO1xuICAgIC8vIGFsbCBzaGlmdHMgYXJlIGluLXBsYWNlXG4gICAgaWYgKHBhdGguX3BvaW50KSB7IC8vIEwuQ2lyY2xlXG4gICAgICBkZXN0ID0gcHJvamVjdGlvbi51bnByb2plY3QoXG4gICAgICAgIHByb2plY3Rpb24ucHJvamVjdChwYXRoLl9sYXRsbmcpLl9hZGQoZGlmZikpO1xuICAgICAgaWYgKGFwcGx5VHJhbnNmb3JtKSB7XG4gICAgICAgIHBhdGguX2xhdGxuZyA9IGRlc3Q7XG4gICAgICAgIHBhdGguX3BvaW50Ll9hZGQocHgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGF0aC5fcmluZ3MgfHwgcGF0aC5fcGFydHMpIHsgLy8gZXZlcnl0aGluZyBlbHNlXG4gICAgICB2YXIgcmluZ3MgICA9IHBhdGguX3JpbmdzIHx8IHBhdGguX3BhcnRzO1xuICAgICAgdmFyIGxhdGxuZ3MgPSBwYXRoLl9sYXRsbmdzO1xuICAgICAgZGVzdCA9IGRlc3QgfHwgbGF0bG5ncztcbiAgICAgIGlmICghTC5VdGlsLmlzQXJyYXkobGF0bG5nc1swXSkpIHsgLy8gcG9seWxpbmVcbiAgICAgICAgbGF0bG5ncyA9IFtsYXRsbmdzXTtcbiAgICAgICAgZGVzdCAgICA9IFtkZXN0XTtcbiAgICAgIH1cbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJpbmdzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGRlc3RbaV0gPSBkZXN0W2ldIHx8IFtdO1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamogPSByaW5nc1tpXS5sZW5ndGg7IGogPCBqajsgaisrKSB7XG4gICAgICAgICAgbGF0bG5nICAgICA9IGxhdGxuZ3NbaV1bal07XG4gICAgICAgICAgZGVzdFtpXVtqXSA9IHByb2plY3Rpb25cbiAgICAgICAgICAgIC51bnByb2plY3QocHJvamVjdGlvbi5wcm9qZWN0KGxhdGxuZykuX2FkZChkaWZmKSk7XG4gICAgICAgICAgaWYgKGFwcGx5VHJhbnNmb3JtKSB7XG4gICAgICAgICAgICBwYXRoLl9ib3VuZHMuZXh0ZW5kKGxhdGxuZ3NbaV1bal0pO1xuICAgICAgICAgICAgcmluZ3NbaV1bal0uX2FkZChweCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZXN0O1xuICAgIC8vIGNvbnNvbGUudGltZUVuZCgndHJhbnNmb3JtJyk7XG4gIH0sXG5cblxuXG4gIC8qKlxuICAgKiBJZiB5b3Ugd2FudCB0byByZWFkIHRoZSBsYXRsbmdzIGR1cmluZyB0aGUgZHJhZyAtIHlvdXIgcmlnaHQsXG4gICAqIGJ1dCB0aGV5IGhhdmUgdG8gYmUgdHJhbnNmb3JtZWRcbiAgICovXG4gIF9yZXBsYWNlQ29vcmRHZXR0ZXJzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fcGF0aC5nZXRMYXRMbmcpIHsgLy8gQ2lyY2xlLCBDaXJjbGVNYXJrZXJcbiAgICAgIHRoaXMuX3BhdGguZ2V0TGF0TG5nXyA9IHRoaXMuX3BhdGguZ2V0TGF0TG5nO1xuICAgICAgdGhpcy5fcGF0aC5nZXRMYXRMbmcgPSBMLlV0aWwuYmluZChmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJhZ2dpbmcuX3RyYW5zZm9ybVBvaW50cyh0aGlzLmRyYWdnaW5nLl9tYXRyaXgsIHt9KTtcbiAgICAgIH0sIHRoaXMuX3BhdGgpO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcGF0aC5nZXRMYXRMbmdzKSB7XG4gICAgICB0aGlzLl9wYXRoLmdldExhdExuZ3NfID0gdGhpcy5fcGF0aC5nZXRMYXRMbmdzO1xuICAgICAgdGhpcy5fcGF0aC5nZXRMYXRMbmdzID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyYWdnaW5nLl90cmFuc2Zvcm1Qb2ludHModGhpcy5kcmFnZ2luZy5fbWF0cml4LCBbXSk7XG4gICAgICB9LCB0aGlzLl9wYXRoKTtcbiAgICB9XG4gIH0sXG5cblxuICAvKipcbiAgICogUHV0IGJhY2sgdGhlIGdldHRlcnNcbiAgICovXG4gIF9yZXN0b3JlQ29vcmRHZXR0ZXJzOiBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5fcGF0aC5nZXRMYXRMbmdfKSB7XG4gICAgICB0aGlzLl9wYXRoLmdldExhdExuZyA9IHRoaXMuX3BhdGguZ2V0TGF0TG5nXztcbiAgICAgIGRlbGV0ZSB0aGlzLl9wYXRoLmdldExhdExuZ187XG4gICAgfSBlbHNlIGlmICh0aGlzLl9wYXRoLmdldExhdExuZ3NfKSB7XG4gICAgICB0aGlzLl9wYXRoLmdldExhdExuZ3MgPSB0aGlzLl9wYXRoLmdldExhdExuZ3NfO1xuICAgICAgZGVsZXRlIHRoaXMuX3BhdGguZ2V0TGF0TG5nc187XG4gICAgfVxuICB9XG5cbn0pO1xuXG5cbi8qKlxuICogQHBhcmFtICB7TC5QYXRofSBsYXllclxuICogQHJldHVybiB7TC5QYXRofVxuICovXG5MLkhhbmRsZXIuUGF0aERyYWcubWFrZURyYWdnYWJsZSA9IGZ1bmN0aW9uKGxheWVyKSB7XG4gIGxheWVyLmRyYWdnaW5nID0gbmV3IEwuSGFuZGxlci5QYXRoRHJhZyhsYXllcik7XG4gIHJldHVybiBsYXllcjtcbn07XG5cblxuLyoqXG4gKiBBbHNvIGV4cG9zZSBhcyBhIG1ldGhvZFxuICogQHJldHVybiB7TC5QYXRofVxuICovXG5MLlBhdGgucHJvdG90eXBlLm1ha2VEcmFnZ2FibGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIEwuSGFuZGxlci5QYXRoRHJhZy5tYWtlRHJhZ2dhYmxlKHRoaXMpO1xufTtcblxuXG5MLlBhdGguYWRkSW5pdEhvb2soZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKSB7XG4gICAgLy8gZW5zdXJlIGludGVyYWN0aXZlXG4gICAgdGhpcy5vcHRpb25zLmludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBMLkhhbmRsZXIuUGF0aERyYWcubWFrZURyYWdnYWJsZSh0aGlzKTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICB0aGlzLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgfVxufSk7XG4iLCIvKipcbiAqIExlYWZsZXQgdmVjdG9yIGZlYXR1cmVzIGRyYWcgZnVuY3Rpb25hbGl0eVxuICogQGF1dGhvciBBbGV4YW5kZXIgTWlsZXZza2kgPGluZm9AdzhyLm5hbWU+XG4gKiBAcHJlc2VydmVcbiAqL1xuXG4vKipcbiAqIE1hdHJpeCB0cmFuc2Zvcm0gcGF0aCBmb3IgU1ZHL1ZNTFxuICogUmVuZGVyZXItaW5kZXBlbmRlbnRcbiAqL1xuTC5QYXRoLmluY2x1ZGUoe1xuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBTVkdcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPj99IG1hdHJpeFxuXHQgKi9cblx0X3RyYW5zZm9ybTogZnVuY3Rpb24obWF0cml4KSB7XG5cdFx0aWYgKHRoaXMuX3JlbmRlcmVyKSB7XG5cdFx0XHRpZiAobWF0cml4KSB7XG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVyLnRyYW5zZm9ybVBhdGgodGhpcywgbWF0cml4KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIHJlc2V0IHRyYW5zZm9ybSBtYXRyaXhcblx0XHRcdFx0dGhpcy5fcmVuZGVyZXIuX3Jlc2V0VHJhbnNmb3JtUGF0aCh0aGlzKTtcblx0XHRcdFx0dGhpcy5fdXBkYXRlKCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBDaGVjayBpZiB0aGUgZmVhdHVyZSB3YXMgZHJhZ2dlZCwgdGhhdCdsbCBzdXByZXNzIHRoZSBjbGljayBldmVudFxuXHQgKiBvbiBtb3VzZXVwLiBUaGF0IGZpeGVzIHBvcHVwcyBmb3IgZXhhbXBsZVxuXHQgKlxuXHQgKiBAcGFyYW0gIHtNb3VzZUV2ZW50fSBlXG5cdCAqL1xuXHRfb25Nb3VzZUNsaWNrOiBmdW5jdGlvbihlKSB7XG5cdFx0aWYgKCh0aGlzLmRyYWdnaW5nICYmIHRoaXMuZHJhZ2dpbmcubW92ZWQoKSkgfHxcblx0XHRcdCh0aGlzLl9tYXAuZHJhZ2dpbmcgJiYgdGhpcy5fbWFwLmRyYWdnaW5nLm1vdmVkKCkpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5fZmlyZU1vdXNlRXZlbnQoZSk7XG5cdH1cblxufSk7XG4iLCJMLlNWRy5pbmNsdWRlKCFMLkJyb3dzZXIudm1sID8ge30gOiB7XG5cblx0LyoqXG5cdCAqIFJlc2V0IHRyYW5zZm9ybSBtYXRyaXhcblx0ICovXG5cdF9yZXNldFRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyKSB7XG5cdFx0aWYgKGxheWVyLl9za2V3KSB7XG5cdFx0XHQvLyBzdXBlciBpbXBvcnRhbnQhIHdvcmthcm91bmQgZm9yIGEgJ2p1bXBpbmcnIGdsaXRjaDpcblx0XHRcdC8vIGRpc2FibGUgdHJhbnNmb3JtIGJlZm9yZSByZW1vdmluZyBpdFxuXHRcdFx0bGF5ZXIuX3NrZXcub24gPSBmYWxzZTtcblx0XHRcdGxheWVyLl9wYXRoLnJlbW92ZUNoaWxkKGxheWVyLl9za2V3KTtcblx0XHRcdGxheWVyLl9za2V3ID0gbnVsbDtcblx0XHR9XG5cdH0sXG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgbWF0cml4IHRyYW5zZm9ybWF0aW9uIHRvIFZNTFxuXHQgKiBAcGFyYW0ge0wuUGF0aH0gICAgICAgICBsYXllclxuXHQgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcblx0ICovXG5cdHRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyLCBtYXRyaXgpIHtcblx0XHR2YXIgc2tldyA9IGxheWVyLl9za2V3O1xuXG5cdFx0aWYgKCFza2V3KSB7XG5cdFx0XHRza2V3ID0gTC5TVkcuY3JlYXRlKCdza2V3Jyk7XG5cdFx0XHRsYXllci5fcGF0aC5hcHBlbmRDaGlsZChza2V3KTtcblx0XHRcdHNrZXcuc3R5bGUuYmVoYXZpb3IgPSAndXJsKCNkZWZhdWx0I1ZNTCknO1xuXHRcdFx0bGF5ZXIuX3NrZXcgPSBza2V3O1xuXHRcdH1cblxuXHRcdC8vIGhhbmRsZSBza2V3L3RyYW5zbGF0ZSBzZXBhcmF0ZWx5LCBjYXVzZSBpdCdzIGJyb2tlblxuXHRcdHZhciBtdCA9IG1hdHJpeFswXS50b0ZpeGVkKDgpICsgJyAnICsgbWF0cml4WzFdLnRvRml4ZWQoOCkgKyAnICcgK1xuXHRcdFx0bWF0cml4WzJdLnRvRml4ZWQoOCkgKyAnICcgKyBtYXRyaXhbM10udG9GaXhlZCg4KSArICcgMCAwJztcblx0XHR2YXIgb2Zmc2V0ID0gTWF0aC5mbG9vcihtYXRyaXhbNF0pLnRvRml4ZWQoKSArICcsICcgK1xuXHRcdFx0TWF0aC5mbG9vcihtYXRyaXhbNV0pLnRvRml4ZWQoKSArICcnO1xuXG5cdFx0dmFyIHMgPSB0aGlzLl9wYXRoLnN0eWxlO1xuXHRcdHZhciBsID0gcGFyc2VGbG9hdChzLmxlZnQpO1xuXHRcdHZhciB0ID0gcGFyc2VGbG9hdChzLnRvcCk7XG5cdFx0dmFyIHcgPSBwYXJzZUZsb2F0KHMud2lkdGgpO1xuXHRcdHZhciBoID0gcGFyc2VGbG9hdChzLmhlaWdodCk7XG5cblx0XHRpZiAoaXNOYU4obCkpIHsgbCA9IDA7IH1cblx0XHRpZiAoaXNOYU4odCkpIHsgdCA9IDA7IH1cblx0XHRpZiAoaXNOYU4odykgfHwgIXcpIHsgdyA9IDE7IH1cblx0XHRpZiAoaXNOYU4oaCkgfHwgIWgpIHsgaCA9IDE7IH1cblxuXHRcdHZhciBvcmlnaW4gPSAoLWwgLyB3IC0gMC41KS50b0ZpeGVkKDgpICsgJyAnICsgKC10IC8gaCAtIDAuNSkudG9GaXhlZCg4KTtcblxuXHRcdHNrZXcub24gPSAnZic7XG5cdFx0c2tldy5tYXRyaXggPSBtdDtcblx0XHRza2V3Lm9yaWdpbiA9IG9yaWdpbjtcblx0XHRza2V3Lm9mZnNldCA9IG9mZnNldDtcblx0XHRza2V3Lm9uID0gdHJ1ZTtcblx0fVxuXG59KTtcbiIsIkwuU1ZHLmluY2x1ZGUoe1xuXG5cdC8qKlxuXHQgKiBSZXNldCB0cmFuc2Zvcm0gbWF0cml4XG5cdCAqL1xuXHRfcmVzZXRUcmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllcikge1xuXHRcdGxheWVyLl9wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsICd0cmFuc2Zvcm0nLCAnJyk7XG5cdH0sXG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgbWF0cml4IHRyYW5zZm9ybWF0aW9uIHRvIFNWR1xuXHQgKiBAcGFyYW0ge0wuUGF0aH0gICAgICAgICBsYXllclxuXHQgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcblx0ICovXG5cdHRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyLCBtYXRyaXgpIHtcblx0XHRsYXllci5fcGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndHJhbnNmb3JtJyxcblx0XHRcdCdtYXRyaXgoJyArIG1hdHJpeC5qb2luKCcgJykgKyAnKScpO1xuXHR9XG5cbn0pO1xuIl19
