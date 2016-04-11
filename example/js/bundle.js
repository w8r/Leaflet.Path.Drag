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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBMID0gZ2xvYmFsLkw7XG4vLyBMLkJyb3dzZXIucmV0aW5hID0gdHJ1ZTtcbnZhciBEcmFnSGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7XG5cbkwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCA9IFwibGVhZmxldC1tYXN0ZXIvaW1hZ2VzXCI7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbWFwID0gZ2xvYmFsLm1hcCA9IG5ldyBMLk1hcCgnbWFwJywge1xuICAvLyBjcnM6IEwuQ1JTLkVQU0c0MzI2IC8vIHRoYXQgd2FzIHRlc3RlZCBhcyB3ZWxsXG59KS5zZXRWaWV3KFsyMi40MjY1OCwgMTE0LjE5NTJdLCAxMSk7XG5cbnZhciByZW5kZXJlciA9IG5ldyBMLkNhbnZhcygpO1xuXG5MLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICBhdHRyaWJ1dGlvbjogJyZjb3B5OyAnICtcbiAgICAnPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcbn0pLmFkZFRvKG1hcCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFycihhcnJheSwgaW5zZXJ0KSB7XG4gIHZhciByZXMgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihwLCBpLCBhcnIpIHtcbiAgICByZXMucHVzaChwLmNvbmNhdCgpKTtcblxuICAgIGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgIHZhciBkaWZmID0gW2FycltpICsgMV1bMF0gLSBwWzBdLCBhcnJbaSArIDFdWzFdIC0gcFsxXV07XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGluc2VydDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKFtwWzBdICsgKGRpZmZbMF0gKiBpKSAvIGluc2VydCwgcFsxXSArIChkaWZmWzFdICogaSkgLyBpbnNlcnRdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgcG9seWdvbiA9IGdsb2JhbC5wb2x5Z29uID0gbmV3IEwuUG9seWdvbihcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhcblxuICAgIC8vIH4gMTMgMDAwIHBvaW50c1xuICAgIGludGVycG9sYXRlQXJyKFtcbiAgICAgIFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF0sXG4gICAgICBbMTEzLjk4NjU4NzUyNDQxNDA1LCAyMi4zODM3MzAwODU5MjQ5NV0sXG4gICAgICBbMTE0LjAxMjY4MDA1MzcxMDk0LCAyMi4zNjkxMjYzOTc1NDU4ODddLFxuICAgICAgWzExNC4wMjc3ODYyNTQ4ODI4MSwgMjIuMzg1NjM0ODAxODU3MThdLFxuICAgICAgWzExNC4wNDcwMTIzMjkxMDE1NiwgMjIuMzk1MTU3OTkwMjkwNzU1XSxcbiAgICAgIFsxMTQuMDYwMDU4NTkzNzUsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICBbMTE0LjA2MjgwNTE3NTc4MTI1LCAyMi40MzI2MDk1MzQ4NzY3OTZdLFxuICAgICAgWzExNC4wNDgzODU2MjAxMTcxNywgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcbiAgICAgIFsxMTQuMDQyODkyNDU2MDU0NjksIDIyLjQ0ODQ3NTc4NjU2NTQ0XSxcbiAgICAgIFsxMTQuMDMyNTkyNzczNDM3NDksIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG4gICAgICBbMTE0LjAxOTU0NjUwODc4OTA2LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgICAgWzExMy45OTYyMDA1NjE1MjM0NCwgMjIuNDM2NDE3NjAwNzYzMTE0XSxcbiAgICAgIFsxMTMuOTgxNzgxMDA1ODU5MzgsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG4gICAgICBbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdXG4gICAgXSwgMTAwMClcbiAgKSwge1xuICAgIGNvbG9yOiAnI2YwMCcsXG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICB9KS5hZGRUbyhtYXApO1xuXG52YXIgcG9seWxpbmUgPSBnbG9iYWwucG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShcbiAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICAgIFsxMTQuMTQzMTQyNzAwMTk1MzEsIDIyLjQ5NDc5NDg0OTc1NDQzXSxcbiAgICAgIFsxMTQuMTUzNDQyMzgyODEyNSwgMjIuNDg1OTEyOTQyMzIwOTU4XSxcbiAgICAgIFsxMTQuMTUyMDY5MDkxNzk2ODgsIDIyLjQ3MzIyMzUxNDQ3ODFdLFxuICAgICAgWzExNC4xNDkzMjI1MDk3NjU2MSwgMjIuNDU5ODk4MzYzOTQzODkzXSxcbiAgICAgIFsxMTQuMTU5NjIyMTkyMzgyODEsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgICBbMTE0LjE2OTkyMTg3NSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICAgIFsxMTQuMTkzOTU0NDY3NzczNDQsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG4gICAgICBbMTE0LjIwNjMxNDA4NjkxNDA2LCAyMi40NjExNjc0ODExMDkzNV0sXG4gICAgICBbMTE0LjIxMTgwNzI1MDk3NjU1LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuICAgICAgWzExNC4yMjQxNjY4NzAxMTcxOSwgMjIuNDcxMzIwMDAwMDA5OTkyXSxcbiAgICAgIFsxMTQuMjM3MjEzMTM0NzY1NjIsIDIyLjQ3NjM5NTk4MDQ1Nzk3M10sXG4gICAgICBbMTE0LjI0MjAxOTY1MzMyMDMxLCAyMi40OTM1MjYwNDA3MzcyMl0sXG4gICAgICBbMTE0LjIzMDM0NjY3OTY4NzUsIDIyLjUxNTcyODUxODMwMzUxXSxcbiAgICAgIFsxMTQuMjE3OTg3MDYwNTQ2ODgsIDIyLjUyNDYwODUxMTAyNjI2Ml0sXG4gICAgICBbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuICAgICAgWzExNC4yMDc2ODczNzc5Mjk2OSwgMjIuNTM2MDI0ODA1ODg2OTc0XVxuICAgIF0pLCB7XG4gICAgICB3ZWlnaHQ6IDE1LFxuICAgICAgZHJhZ2dhYmxlOiB0cnVlXG4gICAgfSlcbiAgLmFkZFRvKG1hcClcbiAgLmJpbmRQb3B1cChcIkknbSBhIHBvbHlsaW5lXCIpO1xuXG52YXIgcG9seWdvbldpdGhIb2xlID0gZ2xvYmFsLnBvbHlnb25XaXRoSG9sZSA9IG5ldyBMLlBvbHlnb24oXG4gICAgW1xuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDEyOTMyODYzNTE3NzE3XSxcbiAgICAgICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDAwODcxNTkwMzA1OTVdLFxuICAgICAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4zODg4MDkyNzA0NTU1Nl0sXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjM4MjQ2MDI2MDgxNTcxNl0sXG4gICAgICAgIFsxMTQuMzE4OTIzOTUwMTk1MzEsIDIyLjM5MTk4MzY2NjYwMjc4M10sXG4gICAgICAgIFsxMTQuMzIzMDQzODIzMjQyMTksIDIyLjM4MDU1NTUwMTQyMTUzM10sXG4gICAgICAgIFsxMTQuMzQyOTU2NTQyOTY4NzUsIDIyLjM3MjkzNjIwMzExMzgzOF0sXG4gICAgICAgIFsxMTQuMzM0NzE2Nzk2ODc1LCAyMi4zODQzNjQ5OTQxMzMzMDNdLFxuICAgICAgICBbMTE0LjMzMDU5NjkyMzgyODEyLCAyMi4zOTM4ODgyNjk1MTExOTRdLFxuICAgICAgICBbMTE0LjMyMTY3MDUzMjIyNjU1LCAyMi40MDA4NzE1OTAzMDU5NV0sXG4gICAgICAgIFsxMTQuMzI3ODUwMzQxNzk2ODgsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICAgIFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQyNDk5MzA4OTY0NzIyXSxcbiAgICAgICAgWzExNC4zMjU3OTA0MDUyNzM0NCwgMjIuNDMwNzA1NDYyNzQ4OTE4XSxcbiAgICAgICAgWzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDM5NTkwOTA5MTcyNjZdLFxuICAgICAgICBbMTE0LjMzNzQ2MzM3ODkwNjI0LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgICAgICBbMTE0LjMzNTQwMzQ0MjM4MjgxLCAyMi40NjE4MDIwMzUzMzM5OTJdLFxuICAgICAgICBbMTE0LjMyNTEwMzc1OTc2NTYyLCAyMi40NjQzNDAyMjMxNzcxMThdLFxuICAgICAgICBbMTE0LjMyOTIyMzYzMjgxMjQ5LCAyMi40NzI1ODkwMTI1NjE5NTRdLFxuICAgICAgICBbMTE0LjMyMzczMDQ2ODc1LCAyMi40NzcwMzA0NjQ5MzMzMDddLFxuICAgICAgICBbMTE0LjMxOTYxMDU5NTcwMzEyLCAyMi40Nzg5MzM5MDA5MTY5MjhdLFxuICAgICAgICBbMTE0LjMwMTc1NzgxMjUsIDIyLjQ2NjI0MzgzMzU0OTQ0NV0sXG4gICAgICAgIFsxMTQuMzAyNDQ0NDU4MDA3ODEsIDIyLjQ1NzM2MDA5NDc1MDA4M10sXG4gICAgICAgIFsxMTQuMjkyODMxNDIwODk4NDQsIDIyLjQ1NDgyMTc3OTA3NTgzMl0sXG4gICAgICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQ1MTAxNDIxODQyMjY5XSxcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40NDI3NjQxNDUwMDE3MDddLFxuICAgICAgICBbMTE0LjI5MDc3MTQ4NDM3NDk5LCAyMi40MjgxNjY2NTkyNzk2MTVdLFxuICAgICAgICBbMTE0LjI3NzAzODU3NDIxODc1LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQxMjkzMjg2MzUxNzcxN11cbiAgICAgIF0pLFxuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XSxcbiAgICAgICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuNDE0MjAyNDEwMzIxMzAyXSxcbiAgICAgICAgWzExNC4zMDU4Nzc2ODU1NDY4NiwgMjIuNDA4NDg5MzU4MzQyNjM1XSxcbiAgICAgICAgWzExNC4zMjIzNTcxNzc3MzQzOCwgMjIuNDIxMTg0NzEwMzMxODU4XSxcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddXG4gICAgICBdKVxuICAgIF0sIHtcbiAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICAgIH1cbiAgKVxuICAuYWRkVG8obWFwKVxuICAuYmluZFBvcHVwKFwiSSdtIGEgcG9seWdvbiB3aXRoIGhvbGVcIik7XG5cbnZhciBjaXJjbGUgPSBuZXcgTC5DaXJjbGUoWzIyLjM2MDg5NzI0MDEzMjM3MywgMTE0LjE0NTIwMjYzNjcxODc1XSwgNDAwMCwge1xuICAgIGRyYWdnYWJsZTogdHJ1ZVxuICB9KVxuICAuYmluZFBvcHVwKFwiTC5DaXJjbGVcIilcbiAgLmFkZFRvKG1hcClcblxudmFyIGNpcmNsZU1hcmtlciA9IG5ldyBMLkNpcmNsZU1hcmtlcihtYXAuZ2V0Q2VudGVyKCksIHtcbiAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgcmVuZGVyZXI6IHJlbmRlcmVyXG4gIH0pXG4gIC5iaW5kUG9wdXAoXCJMLkNpcmNsZU1hcmtlclwiKVxuICAuYWRkVG8obWFwKTtcblxudmFyIG11bHRpUG9seWdvbiA9IGdsb2JhbC5tdWx0aVBvbHlnb24gPSBuZXcgTC5Qb2x5Z29uKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdLFxuICAgIFsxMTQuMjE1OTI3MTI0MDIzNDQsIDIyLjM1MjYxNjAzNTUxMjE1XSxcbiAgICBbMTE0LjI2NDY3ODk1NTA3ODEyLCAyMi4zNTEzNDU5MjY2MDY5NTddLFxuICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuMzI0MDM1Nzg1ODQwMzhdLFxuICAgIFsxMTQuMjkyMTQ0Nzc1MzkwNjIsIDIyLjMyNzIxMTY1ODM4ODkzXSxcbiAgICBbMTE0LjMwMTc1NzgxMjUsIDIyLjMxMTk2NjgxMDk3NzYxNl0sXG4gICAgWzExNC4yOTQyMDQ3MTE5MTQwNiwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjI5MzUxODA2NjQwNjI1LCAyMi4yNzI1NzY1ODU0MTM0NzVdLFxuICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjI2MTc3NDEwMDk3NDM1XSxcbiAgICBbMTE0LjI2ODc5ODgyODEyNSwgMjIuMjgxNDcyMTIyNzgzODE4XSxcbiAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjI5NDgxNDM2Nzc4MDUxOF0sXG4gICAgWzExNC4yNjk0ODU0NzM2MzI4MSwgMjIuMzAyNDM3OTM1OTA0NDhdLFxuICAgIFsxMTQuMjcwMTcyMTE5MTQwNjIsIDIyLjMxNTE0Mjk1ODE2OTM5XSxcbiAgICBbMTE0LjI1NzgxMjUsIDIyLjMxMTk2NjgxMDk3NzYxNl0sXG4gICAgWzExNC4yNDc1MTI4MTczODI4MSwgMjIuMjk5ODk2NzkyNzUxOTI3XSxcbiAgICBbMTE0LjI0NTQ1Mjg4MDg1OTM4LCAyMi4yOTEwMDI0Mjc3MzUzMjVdLFxuICAgIFsxMTQuMjI5NjYwMDM0MTc5NjksIDIyLjMwNzUyMDA4MzUyMjQ3Nl0sXG4gICAgWzExNC4yMjA3MzM2NDI1NzgxMiwgMjIuMzA1NjE0Mjk5ODM3MDQ2XSxcbiAgICBbMTE0LjIwNTYyNzQ0MTQwNjI1LCAyMi4zMjA4NTk4NDEwMDU5M11cbiAgXSksXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMzE1NDkwNzIyNjU2MjUsIDIyLjMzOTI3OTMxNDY4MzEyXSxcbiAgICBbMTE0LjMyMDI5NzI0MTIxMDk0LCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzI5OTEwMjc4MzIwMzEsIDIyLjMyNjU3NjQ4OTY2MjQ4Ml0sXG4gICAgWzExNC4zMzMzNDM1MDU4NTkzOCwgMjIuMzMyMjkyOTA0MDkxNzE2XSxcbiAgICBbMTE0LjMyMzA0MzgyMzI0MjE5LCAyMi4zNDI0NTQ4NDAxNDY1XSxcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl1cbiAgXSksXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF0sXG4gICAgWzExNC4yODExNTg0NDcyNjU2MiwgMjIuMjUxNjA2Mjk1MTMyOTQ4XSxcbiAgICBbMTE0LjI4NjY1MTYxMTMyODEyLCAyMi4yNTU0MTkzMDg4NTg1NTZdLFxuICAgIFsxMTQuMjk5Njk3ODc1OTc2NTYsIDIyLjI2MTEzODYzNDc0NDQ5XSxcbiAgICBbMTE0LjI5NjI2NDY0ODQzNzUsIDIyLjI1MDk3MDc4Mjc1MDg2Nl0sXG4gICAgWzExNC4yOTQ4OTEzNTc0MjE4OCwgMjIuMjQwODAyMTkyNDYzMzVdLFxuICAgIFsxMTQuMjkwMDg0ODM4ODY3MTcsIDIyLjIzODg5NTQ5OTYxMzIzMl0sXG4gICAgWzExNC4yNzkwOTg1MTA3NDIxOSwgMjIuMjQ0NjE1NTAwMzIzMDY0XVxuICBdKVxuXSwge1xuICBkcmFnZ2FibGU6IHRydWUsXG4gIC8vIHJlbmRlcmVyOiByZW5kZXJlcixcbiAgY29sb3I6ICcjMDkyJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlnb24nKS5hZGRUbyhtYXApO1xuXG52YXIgbXVsdGlQb2x5bGluZSA9IGdsb2JhbC5tdWx0aVBvbHlsaW5lID0gbmV3IEwuUG9seWxpbmUoW1xuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTEzLjg5ODY5Njg5OTQxNDA2LCAyMi4zOTk2MDE5MjE3MDY5NTNdLFxuICAgIFsxMTMuODk4MDEwMjUzOTA2MjUsIDIyLjQyMjQ1NDE4MTcwOTcwN10sXG4gICAgWzExMy45MDM1MDM0MTc5Njg3NSwgMjIuNDMzMjQ0MjE5NzgxMTddLFxuICAgIFsxMTMuOTA5NjgzMjI3NTM5MDYsIDIyLjQ0OTExMDM5ODg4NjEwNl0sXG4gICAgWzExMy45MDY5MzY2NDU1MDc4MSwgMjIuNDc4Mjk5NDI1MTYyODUyXSxcbiAgICBbMTEzLjkyMzQxNjEzNzY5NTMsIDIyLjQ4ODQ1MDY4ODMyNTQwOF0sXG4gICAgWzExMy45MzM3MTU4MjAzMTI1LCAyMi40ODMzNzUxNDk3ODk2MjNdLFxuICAgIFsxMTMuOTQ0NzAyMTQ4NDM3NSwgMjIuNDkyMjU3MjIwMDg1MTkzXSxcbiAgICBbMTEzLjk1MjI1NTI0OTAyMzQ0LCAyMi41MTI1NTY5NTQwNTE0NV1cbiAgXSksXG5cbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExMy44Njc3OTc4NTE1NjI1LCAyMi4zOTI2MTg1MzcxMzczOF0sXG4gICAgWzExMy44NjkxNzExNDI1NzgxMSwgMjIuNDI3NTMxOTUxMTU2OTldLFxuICAgIFsxMTMuOTIzNDE2MTM3Njk1MywgMjIuNDYyNDM2NTg2NjUzMTQ4XSxcbiAgICBbMTEzLjk0ODEzNTM3NTk3NjU2LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuICAgIFsxMTMuOTc4MzQ3Nzc4MzIwMywgMjIuNDk5MjM1NTg5NjgzMDZdLFxuICAgIFsxMTMuOTk2ODg3MjA3MDMxMjUsIDIyLjUxMTkyMjYzMjQ2ODg2XSxcbiAgICBbMTE0LjAxMzM2NjY5OTIxODc1LCAyMi41MDExMzg3MjAzMDAyNTRdLFxuICAgIFsxMTQuMDI1MDM5NjcyODUxNTUsIDIyLjUwODExNjY0MTg1MzY3NV1cbiAgXSlcbl0sIHtcbiAgZHJhZ2dhYmxlOiB0cnVlLFxuICBjb2xvcjogJyNlOTAnXG59KS5iaW5kUG9wdXAoJ011bHRpUG9seWxpbmUnKS5hZGRUbyhtYXApO1xuXG52YXIgbWFya2VyID0gbmV3IEwuTWFya2VyKG1hcC5nZXRDZW50ZXIoKSwge1xuICBkcmFnZ2FibGU6IHRydWVcbn0pLmFkZFRvKG1hcCk7XG4iXX0=
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
    DRAGGING_CLS: 'leaflet-path-draggable'
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
    var eventType = evt.type;
    var containerPoint = this._path._map.mouseEventToContainerPoint(evt);

    // apply matrix
    if (this.moved()) {
      this._transformPoints(this._matrix);
      this._path._project();
      this._path._transform(null);
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
    // ensure interactive
    this.options.interactive = true;

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

},{}],5:[function(require,module,exports){
/**
 * Matrix transform path for SVG/VML
 */

// Renderer-independent
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
		layer._path.setAttributeNS(null, "transform",
			'matrix(' + matrix.join(' ') + ')');
	}

});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiZXhhbXBsZS9qcy9hcHAuanMiLCJpbmRleC5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvUGF0aC5EcmFnLmpzIiwic3JjL1BhdGguVHJhbnNmb3JtLmpzIiwic3JjL1NWRy5WTUwuanMiLCJzcmMvU1ZHLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgTCA9IGdsb2JhbC5MO1xuLy8gTC5Ccm93c2VyLnJldGluYSA9IHRydWU7XG52YXIgRHJhZ0hhbmRsZXIgPSByZXF1aXJlKCcuLi8uLi9pbmRleCcpO1xuXG5MLkljb24uRGVmYXVsdC5pbWFnZVBhdGggPSBcImxlYWZsZXQtbWFzdGVyL2ltYWdlc1wiO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIG1hcCA9IGdsb2JhbC5tYXAgPSBuZXcgTC5NYXAoJ21hcCcsIHtcbiAgLy8gY3JzOiBMLkNSUy5FUFNHNDMyNiAvLyB0aGF0IHdhcyB0ZXN0ZWQgYXMgd2VsbFxufSkuc2V0VmlldyhbMjIuNDI2NTgsIDExNC4xOTUyXSwgMTEpO1xuXG52YXIgcmVuZGVyZXIgPSBuZXcgTC5DYW52YXMoKTtcblxuTC50aWxlTGF5ZXIoJ2h0dHA6Ly97c30udGlsZS5vc20ub3JnL3t6fS97eH0ve3l9LnBuZycsIHtcbiAgYXR0cmlidXRpb246ICcmY29weTsgJyArXG4gICAgJzxhIGhyZWY9XCJodHRwOi8vb3NtLm9yZy9jb3B5cmlnaHRcIj5PcGVuU3RyZWV0TWFwPC9hPiBjb250cmlidXRvcnMnXG59KS5hZGRUbyhtYXApO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gaW50ZXJwb2xhdGVBcnIoYXJyYXksIGluc2VydCkge1xuICB2YXIgcmVzID0gW107XG4gIGFycmF5LmZvckVhY2goZnVuY3Rpb24ocCwgaSwgYXJyKSB7XG4gICAgcmVzLnB1c2gocC5jb25jYXQoKSk7XG5cbiAgICBpZiAoaSA8IGFyci5sZW5ndGggLSAxKSB7XG4gICAgICB2YXIgZGlmZiA9IFthcnJbaSArIDFdWzBdIC0gcFswXSwgYXJyW2kgKyAxXVsxXSAtIHBbMV1dO1xuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBpbnNlcnQ7IGkrKykge1xuICAgICAgICByZXMucHVzaChbcFswXSArIChkaWZmWzBdICogaSkgLyBpbnNlcnQsIHBbMV0gKyAoZGlmZlsxXSAqIGkpIC8gaW5zZXJ0XSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzO1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIHBvbHlnb24gPSBnbG9iYWwucG9seWdvbiA9IG5ldyBMLlBvbHlnb24oXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoXG5cbiAgICAvLyB+IDEzIDAwMCBwb2ludHNcbiAgICBpbnRlcnBvbGF0ZUFycihbXG4gICAgICBbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdLFxuICAgICAgWzExMy45ODY1ODc1MjQ0MTQwNSwgMjIuMzgzNzMwMDg1OTI0OTVdLFxuICAgICAgWzExNC4wMTI2ODAwNTM3MTA5NCwgMjIuMzY5MTI2Mzk3NTQ1ODg3XSxcbiAgICAgIFsxMTQuMDI3Nzg2MjU0ODgyODEsIDIyLjM4NTYzNDgwMTg1NzE4XSxcbiAgICAgIFsxMTQuMDQ3MDEyMzI5MTAxNTYsIDIyLjM5NTE1Nzk5MDI5MDc1NV0sXG4gICAgICBbMTE0LjA2MDA1ODU5Mzc1LCAyMi40MTM1Njc2MzgzNjk4MDVdLFxuICAgICAgWzExNC4wNjI4MDUxNzU3ODEyNSwgMjIuNDMyNjA5NTM0ODc2Nzk2XSxcbiAgICAgIFsxMTQuMDQ4Mzg1NjIwMTE3MTcsIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG4gICAgICBbMTE0LjA0Mjg5MjQ1NjA1NDY5LCAyMi40NDg0NzU3ODY1NjU0NF0sXG4gICAgICBbMTE0LjAzMjU5Mjc3MzQzNzQ5LCAyMi40NDQ2NjgwNTE2NTcxNTddLFxuICAgICAgWzExNC4wMTk1NDY1MDg3ODkwNiwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICAgIFsxMTMuOTk2MjAwNTYxNTIzNDQsIDIyLjQzNjQxNzYwMDc2MzExNF0sXG4gICAgICBbMTEzLjk4MTc4MTAwNTg1OTM4LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuICAgICAgWzExMy45NzY5NzQ0ODczMDQ2OSwgMjIuNDAzNDEwODkyNzEyMTI0XVxuICAgIF0sIDEwMDApXG4gICksIHtcbiAgICBjb2xvcjogJyNmMDAnLFxuICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICByZW5kZXJlcjogcmVuZGVyZXJcbiAgfSkuYWRkVG8obWFwKTtcblxudmFyIHBvbHlsaW5lID0gZ2xvYmFsLnBvbHlsaW5lID0gbmV3IEwuUG9seWxpbmUoXG4gICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICBbMTE0LjE0MzE0MjcwMDE5NTMxLCAyMi40OTQ3OTQ4NDk3NTQ0M10sXG4gICAgICBbMTE0LjE1MzQ0MjM4MjgxMjUsIDIyLjQ4NTkxMjk0MjMyMDk1OF0sXG4gICAgICBbMTE0LjE1MjA2OTA5MTc5Njg4LCAyMi40NzMyMjM1MTQ0NzgxXSxcbiAgICAgIFsxMTQuMTQ5MzIyNTA5NzY1NjEsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG4gICAgICBbMTE0LjE1OTYyMjE5MjM4MjgxLCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgICAgWzExNC4xNjk5MjE4NzUsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgICBbMTE0LjE5Mzk1NDQ2Nzc3MzQ0LCAyMi40NTk4OTgzNjM5NDM4OTNdLFxuICAgICAgWzExNC4yMDYzMTQwODY5MTQwNiwgMjIuNDYxMTY3NDgxMTA5MzVdLFxuICAgICAgWzExNC4yMTE4MDcyNTA5NzY1NSwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICAgIFsxMTQuMjI0MTY2ODcwMTE3MTksIDIyLjQ3MTMyMDAwMDAwOTk5Ml0sXG4gICAgICBbMTE0LjIzNzIxMzEzNDc2NTYyLCAyMi40NzYzOTU5ODA0NTc5NzNdLFxuICAgICAgWzExNC4yNDIwMTk2NTMzMjAzMSwgMjIuNDkzNTI2MDQwNzM3MjJdLFxuICAgICAgWzExNC4yMzAzNDY2Nzk2ODc1LCAyMi41MTU3Mjg1MTgzMDM1MV0sXG4gICAgICBbMTE0LjIxNzk4NzA2MDU0Njg4LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuICAgICAgWzExNC4yMDc2ODczNzc5Mjk2OSwgMjIuNTI0NjA4NTExMDI2MjYyXSxcbiAgICAgIFsxMTQuMjA3Njg3Mzc3OTI5NjksIDIyLjUzNjAyNDgwNTg4Njk3NF1cbiAgICBdKSwge1xuICAgICAgd2VpZ2h0OiAxNSxcbiAgICAgIGRyYWdnYWJsZTogdHJ1ZVxuICAgIH0pXG4gIC5hZGRUbyhtYXApXG4gIC5iaW5kUG9wdXAoXCJJJ20gYSBwb2x5bGluZVwiKTtcblxudmFyIHBvbHlnb25XaXRoSG9sZSA9IGdsb2JhbC5wb2x5Z29uV2l0aEhvbGUgPSBuZXcgTC5Qb2x5Z29uKFxuICAgIFtcbiAgICAgIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQxMjkzMjg2MzUxNzcxN10sXG4gICAgICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQwMDg3MTU5MDMwNTk1XSxcbiAgICAgICAgWzExNC4yOTAwODQ4Mzg4NjcxNywgMjIuMzg4ODA5MjcwNDU1NTZdLFxuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi4zODI0NjAyNjA4MTU3MTZdLFxuICAgICAgICBbMTE0LjMxODkyMzk1MDE5NTMxLCAyMi4zOTE5ODM2NjY2MDI3ODNdLFxuICAgICAgICBbMTE0LjMyMzA0MzgyMzI0MjE5LCAyMi4zODA1NTU1MDE0MjE1MzNdLFxuICAgICAgICBbMTE0LjM0Mjk1NjU0Mjk2ODc1LCAyMi4zNzI5MzYyMDMxMTM4MzhdLFxuICAgICAgICBbMTE0LjMzNDcxNjc5Njg3NSwgMjIuMzg0MzY0OTk0MTMzMzAzXSxcbiAgICAgICAgWzExNC4zMzA1OTY5MjM4MjgxMiwgMjIuMzkzODg4MjY5NTExMTk0XSxcbiAgICAgICAgWzExNC4zMjE2NzA1MzIyMjY1NSwgMjIuNDAwODcxNTkwMzA1OTVdLFxuICAgICAgICBbMTE0LjMyNzg1MDM0MTc5Njg4LCAyMi40MTM1Njc2MzgzNjk4MDVdLFxuICAgICAgICBbMTE0LjMzMTk3MDIxNDg0Mzc1LCAyMi40MjQ5OTMwODk2NDcyMl0sXG4gICAgICAgIFsxMTQuMzI1NzkwNDA1MjczNDQsIDIyLjQzMDcwNTQ2Mjc0ODkxOF0sXG4gICAgICAgIFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQzOTU5MDkwOTE3MjY2XSxcbiAgICAgICAgWzExNC4zMzc0NjMzNzg5MDYyNCwgMjIuNDQ5MTEwMzk4ODg2MTA2XSxcbiAgICAgICAgWzExNC4zMzU0MDM0NDIzODI4MSwgMjIuNDYxODAyMDM1MzMzOTkyXSxcbiAgICAgICAgWzExNC4zMjUxMDM3NTk3NjU2MiwgMjIuNDY0MzQwMjIzMTc3MTE4XSxcbiAgICAgICAgWzExNC4zMjkyMjM2MzI4MTI0OSwgMjIuNDcyNTg5MDEyNTYxOTU0XSxcbiAgICAgICAgWzExNC4zMjM3MzA0Njg3NSwgMjIuNDc3MDMwNDY0OTMzMzA3XSxcbiAgICAgICAgWzExNC4zMTk2MTA1OTU3MDMxMiwgMjIuNDc4OTMzOTAwOTE2OTI4XSxcbiAgICAgICAgWzExNC4zMDE3NTc4MTI1LCAyMi40NjYyNDM4MzM1NDk0NDVdLFxuICAgICAgICBbMTE0LjMwMjQ0NDQ1ODAwNzgxLCAyMi40NTczNjAwOTQ3NTAwODNdLFxuICAgICAgICBbMTE0LjI5MjgzMTQyMDg5ODQ0LCAyMi40NTQ4MjE3NzkwNzU4MzJdLFxuICAgICAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi40NTEwMTQyMTg0MjI2OV0sXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDQyNzY0MTQ1MDAxNzA3XSxcbiAgICAgICAgWzExNC4yOTA3NzE0ODQzNzQ5OSwgMjIuNDI4MTY2NjU5Mjc5NjE1XSxcbiAgICAgICAgWzExNC4yNzcwMzg1NzQyMTg3NSwgMjIuNDIwNTQ5OTcwMjkwODc1XSxcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40MTI5MzI4NjM1MTc3MTddXG4gICAgICBdKSxcbiAgICAgIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgICAgICBbMTE0LjMwMTA3MTE2Njk5MjE5LCAyMi40MzM4Nzg5MDE3ODI5N10sXG4gICAgICAgIFsxMTQuMjkzNTE4MDY2NDA2MjUsIDIyLjQxNDIwMjQxMDMyMTMwMl0sXG4gICAgICAgIFsxMTQuMzA1ODc3Njg1NTQ2ODYsIDIyLjQwODQ4OTM1ODM0MjYzNV0sXG4gICAgICAgIFsxMTQuMzIyMzU3MTc3NzM0MzgsIDIyLjQyMTE4NDcxMDMzMTg1OF0sXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XVxuICAgICAgXSlcbiAgICBdLCB7XG4gICAgICBkcmFnZ2FibGU6IHRydWUsXG4gICAgICByZW5kZXJlcjogcmVuZGVyZXJcbiAgICB9XG4gIClcbiAgLmFkZFRvKG1hcClcbiAgLmJpbmRQb3B1cChcIkknbSBhIHBvbHlnb24gd2l0aCBob2xlXCIpO1xuXG52YXIgY2lyY2xlID0gbmV3IEwuQ2lyY2xlKFsyMi4zNjA4OTcyNDAxMzIzNzMsIDExNC4xNDUyMDI2MzY3MTg3NV0sIDQwMDAsIHtcbiAgICBkcmFnZ2FibGU6IHRydWVcbiAgfSlcbiAgLmJpbmRQb3B1cChcIkwuQ2lyY2xlXCIpXG4gIC5hZGRUbyhtYXApXG5cbnZhciBjaXJjbGVNYXJrZXIgPSBuZXcgTC5DaXJjbGVNYXJrZXIobWFwLmdldENlbnRlcigpLCB7XG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICB9KVxuICAuYmluZFBvcHVwKFwiTC5DaXJjbGVNYXJrZXJcIilcbiAgLmFkZFRvKG1hcCk7XG5cbnZhciBtdWx0aVBvbHlnb24gPSBnbG9iYWwubXVsdGlQb2x5Z29uID0gbmV3IEwuUG9seWdvbihbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTQuMjA1NjI3NDQxNDA2MjUsIDIyLjMyMDg1OTg0MTAwNTkzXSxcbiAgICBbMTE0LjIxNTkyNzEyNDAyMzQ0LCAyMi4zNTI2MTYwMzU1MTIxNV0sXG4gICAgWzExNC4yNjQ2Nzg5NTUwNzgxMiwgMjIuMzUxMzQ1OTI2NjA2OTU3XSxcbiAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjMyNDAzNTc4NTg0MDM4XSxcbiAgICBbMTE0LjI5MjE0NDc3NTM5MDYyLCAyMi4zMjcyMTE2NTgzODg5M10sXG4gICAgWzExNC4zMDE3NTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjk0MjA0NzExOTE0MDYsIDIyLjI5MTAwMjQyNzczNTMyNV0sXG4gICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuMjcyNTc2NTg1NDEzNDc1XSxcbiAgICBbMTE0LjI4MzkwNTAyOTI5Njg4LCAyMi4yNjE3NzQxMDA5NzQzNV0sXG4gICAgWzExNC4yNjg3OTg4MjgxMjUsIDIyLjI4MTQ3MjEyMjc4MzgxOF0sXG4gICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi4yOTQ4MTQzNjc3ODA1MThdLFxuICAgIFsxMTQuMjY5NDg1NDczNjMyODEsIDIyLjMwMjQzNzkzNTkwNDQ4XSxcbiAgICBbMTE0LjI3MDE3MjExOTE0MDYyLCAyMi4zMTUxNDI5NTgxNjkzOV0sXG4gICAgWzExNC4yNTc4MTI1LCAyMi4zMTE5NjY4MTA5Nzc2MTZdLFxuICAgIFsxMTQuMjQ3NTEyODE3MzgyODEsIDIyLjI5OTg5Njc5Mjc1MTkyN10sXG4gICAgWzExNC4yNDU0NTI4ODA4NTkzOCwgMjIuMjkxMDAyNDI3NzM1MzI1XSxcbiAgICBbMTE0LjIyOTY2MDAzNDE3OTY5LCAyMi4zMDc1MjAwODM1MjI0NzZdLFxuICAgIFsxMTQuMjIwNzMzNjQyNTc4MTIsIDIyLjMwNTYxNDI5OTgzNzA0Nl0sXG4gICAgWzExNC4yMDU2Mjc0NDE0MDYyNSwgMjIuMzIwODU5ODQxMDA1OTNdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjMxNTQ5MDcyMjY1NjI1LCAyMi4zMzkyNzkzMTQ2ODMxMl0sXG4gICAgWzExNC4zMjAyOTcyNDEyMTA5NCwgMjIuMzI2NTc2NDg5NjYyNDgyXSxcbiAgICBbMTE0LjMyOTkxMDI3ODMyMDMxLCAyMi4zMjY1NzY0ODk2NjI0ODJdLFxuICAgIFsxMTQuMzMzMzQzNTA1ODU5MzgsIDIyLjMzMjI5MjkwNDA5MTcxNl0sXG4gICAgWzExNC4zMjMwNDM4MjMyNDIxOSwgMjIuMzQyNDU0ODQwMTQ2NV0sXG4gICAgWzExNC4zMTU0OTA3MjI2NTYyNSwgMjIuMzM5Mjc5MzE0NjgzMTJdXG4gIF0pLFxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdLFxuICAgIFsxMTQuMjgxMTU4NDQ3MjY1NjIsIDIyLjI1MTYwNjI5NTEzMjk0OF0sXG4gICAgWzExNC4yODY2NTE2MTEzMjgxMiwgMjIuMjU1NDE5MzA4ODU4NTU2XSxcbiAgICBbMTE0LjI5OTY5Nzg3NTk3NjU2LCAyMi4yNjExMzg2MzQ3NDQ0OV0sXG4gICAgWzExNC4yOTYyNjQ2NDg0Mzc1LCAyMi4yNTA5NzA3ODI3NTA4NjZdLFxuICAgIFsxMTQuMjk0ODkxMzU3NDIxODgsIDIyLjI0MDgwMjE5MjQ2MzM1XSxcbiAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4yMzg4OTU0OTk2MTMyMzJdLFxuICAgIFsxMTQuMjc5MDk4NTEwNzQyMTksIDIyLjI0NDYxNTUwMDMyMzA2NF1cbiAgXSlcbl0sIHtcbiAgZHJhZ2dhYmxlOiB0cnVlLFxuICAvLyByZW5kZXJlcjogcmVuZGVyZXIsXG4gIGNvbG9yOiAnIzA5Midcbn0pLmJpbmRQb3B1cCgnTXVsdGlQb2x5Z29uJykuYWRkVG8obWFwKTtcblxudmFyIG11bHRpUG9seWxpbmUgPSBnbG9iYWwubXVsdGlQb2x5bGluZSA9IG5ldyBMLlBvbHlsaW5lKFtcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExMy44OTg2OTY4OTk0MTQwNiwgMjIuMzk5NjAxOTIxNzA2OTUzXSxcbiAgICBbMTEzLjg5ODAxMDI1MzkwNjI1LCAyMi40MjI0NTQxODE3MDk3MDddLFxuICAgIFsxMTMuOTAzNTAzNDE3OTY4NzUsIDIyLjQzMzI0NDIxOTc4MTE3XSxcbiAgICBbMTEzLjkwOTY4MzIyNzUzOTA2LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgIFsxMTMuOTA2OTM2NjQ1NTA3ODEsIDIyLjQ3ODI5OTQyNTE2Mjg1Ml0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAyMi40ODg0NTA2ODgzMjU0MDhdLFxuICAgIFsxMTMuOTMzNzE1ODIwMzEyNSwgMjIuNDgzMzc1MTQ5Nzg5NjIzXSxcbiAgICBbMTEzLjk0NDcwMjE0ODQzNzUsIDIyLjQ5MjI1NzIyMDA4NTE5M10sXG4gICAgWzExMy45NTIyNTUyNDkwMjM0NCwgMjIuNTEyNTU2OTU0MDUxNDVdXG4gIF0pLFxuXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODY3Nzk3ODUxNTYyNSwgMjIuMzkyNjE4NTM3MTM3MzhdLFxuICAgIFsxMTMuODY5MTcxMTQyNTc4MTEsIDIyLjQyNzUzMTk1MTE1Njk5XSxcbiAgICBbMTEzLjkyMzQxNjEzNzY5NTMsIDIyLjQ2MjQzNjU4NjY1MzE0OF0sXG4gICAgWzExMy45NDgxMzUzNzU5NzY1NiwgMjIuNDczODU4MDEzNDg3NjE0XSxcbiAgICBbMTEzLjk3ODM0Nzc3ODMyMDMsIDIyLjQ5OTIzNTU4OTY4MzA2XSxcbiAgICBbMTEzLjk5Njg4NzIwNzAzMTI1LCAyMi41MTE5MjI2MzI0Njg4Nl0sXG4gICAgWzExNC4wMTMzNjY2OTkyMTg3NSwgMjIuNTAxMTM4NzIwMzAwMjU0XSxcbiAgICBbMTE0LjAyNTAzOTY3Mjg1MTU1LCAyMi41MDgxMTY2NDE4NTM2NzVdXG4gIF0pXG5dLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZSxcbiAgY29sb3I6ICcjZTkwJ1xufSkuYmluZFBvcHVwKCdNdWx0aVBvbHlsaW5lJykuYWRkVG8obWFwKTtcblxudmFyIG1hcmtlciA9IG5ldyBMLk1hcmtlcihtYXAuZ2V0Q2VudGVyKCksIHtcbiAgZHJhZ2dhYmxlOiB0cnVlXG59KS5hZGRUbyhtYXApO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltVjRZVzF3YkdVdmFuTXZZWEJ3TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN1FVRkJRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFaUxDSm1hV3hsSWpvaVoyVnVaWEpoZEdWa0xtcHpJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJblpoY2lCTUlEMGdaMnh2WW1Gc0xrdzdYRzR2THlCTUxrSnliM2R6WlhJdWNtVjBhVzVoSUQwZ2RISjFaVHRjYm5aaGNpQkVjbUZuU0dGdVpHeGxjaUE5SUhKbGNYVnBjbVVvSnk0dUx5NHVMMmx1WkdWNEp5azdYRzVjYmt3dVNXTnZiaTVFWldaaGRXeDBMbWx0WVdkbFVHRjBhQ0E5SUZ3aWJHVmhabXhsZEMxdFlYTjBaWEl2YVcxaFoyVnpYQ0k3WEc1Y2JpOHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dlhHNTJZWElnYldGd0lEMGdaMnh2WW1Gc0xtMWhjQ0E5SUc1bGR5Qk1MazFoY0NnbmJXRndKeXdnZTF4dUlDQXZMeUJqY25NNklFd3VRMUpUTGtWUVUwYzBNekkySUM4dklIUm9ZWFFnZDJGeklIUmxjM1JsWkNCaGN5QjNaV3hzWEc1OUtTNXpaWFJXYVdWM0tGc3lNaTQwTWpZMU9Dd2dNVEUwTGpFNU5USmRMQ0F4TVNrN1hHNWNiblpoY2lCeVpXNWtaWEpsY2lBOUlHNWxkeUJNTGtOaGJuWmhjeWdwTzF4dVhHNU1MblJwYkdWTVlYbGxjaWduYUhSMGNEb3ZMM3R6ZlM1MGFXeGxMbTl6YlM1dmNtY3ZlM3A5TDN0NGZTOTdlWDB1Y0c1bkp5d2dlMXh1SUNCaGRIUnlhV0oxZEdsdmJqb2dKeVpqYjNCNU95QW5JQ3RjYmlBZ0lDQW5QR0VnYUhKbFpqMWNJbWgwZEhBNkx5OXZjMjB1YjNKbkwyTnZjSGx5YVdkb2RGd2lQazl3Wlc1VGRISmxaWFJOWVhBOEwyRStJR052Ym5SeWFXSjFkRzl5Y3lkY2JuMHBMbUZrWkZSdktHMWhjQ2s3WEc1Y2JpOHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dlhHNW1kVzVqZEdsdmJpQnBiblJsY25CdmJHRjBaVUZ5Y2loaGNuSmhlU3dnYVc1elpYSjBLU0I3WEc0Z0lIWmhjaUJ5WlhNZ1BTQmJYVHRjYmlBZ1lYSnlZWGt1Wm05eVJXRmphQ2htZFc1amRHbHZiaWh3TENCcExDQmhjbklwSUh0Y2JpQWdJQ0J5WlhNdWNIVnphQ2h3TG1OdmJtTmhkQ2dwS1R0Y2JseHVJQ0FnSUdsbUlDaHBJRHdnWVhKeUxteGxibWQwYUNBdElERXBJSHRjYmlBZ0lDQWdJSFpoY2lCa2FXWm1JRDBnVzJGeWNsdHBJQ3NnTVYxYk1GMGdMU0J3V3pCZExDQmhjbkpiYVNBcklERmRXekZkSUMwZ2NGc3hYVjA3WEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ01Uc2dhU0E4SUdsdWMyVnlkRHNnYVNzcktTQjdYRzRnSUNBZ0lDQWdJSEpsY3k1d2RYTm9LRnR3V3pCZElDc2dLR1JwWm1aYk1GMGdLaUJwS1NBdklHbHVjMlZ5ZEN3Z2NGc3hYU0FySUNoa2FXWm1XekZkSUNvZ2FTa2dMeUJwYm5ObGNuUmRLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUgwcE8xeHVYRzRnSUhKbGRIVnliaUJ5WlhNN1hHNTlYRzVjYmk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2WEc1MllYSWdjRzlzZVdkdmJpQTlJR2RzYjJKaGJDNXdiMng1WjI5dUlEMGdibVYzSUV3dVVHOXNlV2R2YmloY2JpQWdUQzVIWlc5S1UwOU9MbU52YjNKa2MxUnZUR0YwVEc1bmN5aGNibHh1SUNBZ0lDOHZJSDRnTVRNZ01EQXdJSEJ2YVc1MGMxeHVJQ0FnSUdsdWRHVnljRzlzWVhSbFFYSnlLRnRjYmlBZ0lDQWdJRnN4TVRNdU9UYzJPVGMwTkRnM016QTBOamtzSURJeUxqUXdNelF4TURnNU1qY3hNakV5TkYwc1hHNGdJQ0FnSUNCYk1URXpMams0TmpVNE56VXlORFF4TkRBMUxDQXlNaTR6T0RNM016QXdPRFU1TWpRNU5WMHNYRzRnSUNBZ0lDQmJNVEUwTGpBeE1qWTRNREExTXpjeE1EazBMQ0F5TWk0ek5qa3hNall6T1RjMU5EVTRPRGRkTEZ4dUlDQWdJQ0FnV3pFeE5DNHdNamMzT0RZeU5UUTRPREk0TVN3Z01qSXVNemcxTmpNME9EQXhPRFUzTVRoZExGeHVJQ0FnSUNBZ1d6RXhOQzR3TkRjd01USXpNamt4TURFMU5pd2dNakl1TXprMU1UVTNPVGt3TWprd056VTFYU3hjYmlBZ0lDQWdJRnN4TVRRdU1EWXdNRFU0TlRrek56VXNJREl5TGpReE16VTJOell6T0RNMk9UZ3dOVjBzWEc0Z0lDQWdJQ0JiTVRFMExqQTJNamd3TlRFM05UYzRNVEkxTENBeU1pNDBNekkyTURrMU16UTROelkzT1RaZExGeHVJQ0FnSUNBZ1d6RXhOQzR3TkRnek9EVTJNakF4TVRjeE55d2dNakl1TkRRME5qWTRNRFV4TmpVM01UVTNYU3hjYmlBZ0lDQWdJRnN4TVRRdU1EUXlPRGt5TkRVMk1EVTBOamtzSURJeUxqUTBPRFEzTlRjNE5qVTJOVFEwWFN4Y2JpQWdJQ0FnSUZzeE1UUXVNRE15TlRreU56Y3pORE0zTkRrc0lESXlMalEwTkRZMk9EQTFNVFkxTnpFMU4xMHNYRzRnSUNBZ0lDQmJNVEUwTGpBeE9UVTBOalV3T0RjNE9UQTJMQ0F5TWk0ME5EY3lNRFkxTlRNeU1URTRNVFJkTEZ4dUlDQWdJQ0FnV3pFeE15NDVPVFl5TURBMU5qRTFNak0wTkN3Z01qSXVORE0yTkRFM05qQXdOell6TVRFMFhTeGNiaUFnSUNBZ0lGc3hNVE11T1RneE56Z3hNREExT0RVNU16Z3NJREl5TGpReU1EVTBPVGszTURJNU1EZzNOVjBzWEc0Z0lDQWdJQ0JiTVRFekxqazNOamszTkRRNE56TXdORFk1TENBeU1pNDBNRE0wTVRBNE9USTNNVEl4TWpSZFhHNGdJQ0FnWFN3Z01UQXdNQ2xjYmlBZ0tTd2dlMXh1SUNBZ0lHTnZiRzl5T2lBbkkyWXdNQ2NzWEc0Z0lDQWdaSEpoWjJkaFlteGxPaUIwY25WbExGeHVJQ0FnSUhKbGJtUmxjbVZ5T2lCeVpXNWtaWEpsY2x4dUlDQjlLUzVoWkdSVWJ5aHRZWEFwTzF4dVhHNTJZWElnY0c5c2VXeHBibVVnUFNCbmJHOWlZV3d1Y0c5c2VXeHBibVVnUFNCdVpYY2dUQzVRYjJ4NWJHbHVaU2hjYmlBZ0lDQk1Ma2RsYjBwVFQwNHVZMjl2Y21SelZHOU1ZWFJNYm1kektGdGNiaUFnSUNBZ0lGc3hNVFF1TVRRek1UUXlOekF3TVRrMU16RXNJREl5TGpRNU5EYzVORGcwT1RjMU5EUXpYU3hjYmlBZ0lDQWdJRnN4TVRRdU1UVXpORFF5TXpneU9ERXlOU3dnTWpJdU5EZzFPVEV5T1RReU16SXdPVFU0WFN4Y2JpQWdJQ0FnSUZzeE1UUXVNVFV5TURZNU1Ea3hOemsyT0Rnc0lESXlMalEzTXpJeU16VXhORFEzT0RGZExGeHVJQ0FnSUNBZ1d6RXhOQzR4TkRrek1qSTFNRGszTmpVMk1Td2dNakl1TkRVNU9EazRNell6T1RRek9Ea3pYU3hjYmlBZ0lDQWdJRnN4TVRRdU1UVTVOakl5TVRreU16Z3lPREVzSURJeUxqUTBOekl3TmpVMU16SXhNVGd4TkYwc1hHNGdJQ0FnSUNCYk1URTBMakUyT1RreU1UZzNOU3dnTWpJdU5EUTNNakEyTlRVek1qRXhPREUwWFN4Y2JpQWdJQ0FnSUZzeE1UUXVNVGt6T1RVME5EWTNOemN6TkRRc0lESXlMalExT1RnNU9ETTJNemswTXpnNU0xMHNYRzRnSUNBZ0lDQmJNVEUwTGpJd05qTXhOREE0TmpreE5EQTJMQ0F5TWk0ME5qRXhOamMwT0RFeE1Ea3pOVjBzWEc0Z0lDQWdJQ0JiTVRFMExqSXhNVGd3TnpJMU1EazNOalUxTENBeU1pNDBOek00TlRnd01UTTBPRGMyTVRSZExGeHVJQ0FnSUNBZ1d6RXhOQzR5TWpReE5qWTROekF4TVRjeE9Td2dNakl1TkRjeE16SXdNREF3TURBNU9Ua3lYU3hjYmlBZ0lDQWdJRnN4TVRRdU1qTTNNakV6TVRNME56WTFOaklzSURJeUxqUTNOak01TlRrNE1EUTFOemszTTEwc1hHNGdJQ0FnSUNCYk1URTBMakkwTWpBeE9UWTFNek15TURNeExDQXlNaTQwT1RNMU1qWXdOREEzTXpjeU1sMHNYRzRnSUNBZ0lDQmJNVEUwTGpJek1ETTBOalkzT1RZNE56VXNJREl5TGpVeE5UY3lPRFV4T0RNd016VXhYU3hjYmlBZ0lDQWdJRnN4TVRRdU1qRTNPVGczTURZd05UUTJPRGdzSURJeUxqVXlORFl3T0RVeE1UQXlOakkyTWwwc1hHNGdJQ0FnSUNCYk1URTBMakl3TnpZNE56TTNOemt5T1RZNUxDQXlNaTQxTWpRMk1EZzFNVEV3TWpZeU5qSmRMRnh1SUNBZ0lDQWdXekV4TkM0eU1EYzJPRGN6TnpjNU1qazJPU3dnTWpJdU5UTTJNREkwT0RBMU9EZzJPVGMwWFZ4dUlDQWdJRjBwTENCN1hHNGdJQ0FnSUNCM1pXbG5hSFE2SURFMUxGeHVJQ0FnSUNBZ1pISmhaMmRoWW14bE9pQjBjblZsWEc0Z0lDQWdmU2xjYmlBZ0xtRmtaRlJ2S0cxaGNDbGNiaUFnTG1KcGJtUlFiM0IxY0NoY0lra25iU0JoSUhCdmJIbHNhVzVsWENJcE8xeHVYRzUyWVhJZ2NHOXNlV2R2YmxkcGRHaEliMnhsSUQwZ1oyeHZZbUZzTG5CdmJIbG5iMjVYYVhSb1NHOXNaU0E5SUc1bGR5Qk1MbEJ2YkhsbmIyNG9YRzRnSUNBZ1cxeHVJQ0FnSUNBZ1RDNUhaVzlLVTA5T0xtTnZiM0prYzFSdlRHRjBURzVuY3loYlhHNGdJQ0FnSUNBZ0lGc3hNVFF1TWpjME9UYzROak0zTmprMU15d2dNakl1TkRFeU9UTXlPRFl6TlRFM056RTNYU3hjYmlBZ0lDQWdJQ0FnV3pFeE5DNHlPRE01TURVd01qa3lPVFk0T0N3Z01qSXVOREF3T0RjeE5Ua3dNekExT1RWZExGeHVJQ0FnSUNBZ0lDQmJNVEUwTGpJNU1EQTRORGd6T0RnMk56RTNMQ0F5TWk0ek9EZzRNRGt5TnpBME5UVTFObDBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNekF4TURjeE1UWTJPVGt5TVRrc0lESXlMak00TWpRMk1ESTJNRGd4TlRjeE5sMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU16RTRPVEl6T1RVd01UazFNekVzSURJeUxqTTVNVGs0TXpZMk5qWXdNamM0TTEwc1hHNGdJQ0FnSUNBZ0lGc3hNVFF1TXpJek1EUXpPREl6TWpReU1Ua3NJREl5TGpNNE1EVTFOVFV3TVRReU1UVXpNMTBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNelF5T1RVMk5UUXlPVFk0TnpVc0lESXlMak0zTWprek5qSXdNekV4TXpnek9GMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU16TTBOekUyTnprMk9EYzFMQ0F5TWk0ek9EUXpOalE1T1RReE16TXpNRE5kTEZ4dUlDQWdJQ0FnSUNCYk1URTBMak16TURVNU5qa3lNemd5T0RFeUxDQXlNaTR6T1RNNE9EZ3lOamsxTVRFeE9UUmRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqTXlNVFkzTURVek1qSXlOalUxTENBeU1pNDBNREE0TnpFMU9UQXpNRFU1TlYwc1hHNGdJQ0FnSUNBZ0lGc3hNVFF1TXpJM09EVXdNelF4TnprMk9EZ3NJREl5TGpReE16VTJOell6T0RNMk9UZ3dOVjBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNek14T1Rjd01qRTBPRFF6TnpVc0lESXlMalF5TkRrNU16QTRPVFkwTnpJeVhTeGNiaUFnSUNBZ0lDQWdXekV4TkM0ek1qVTNPVEEwTURVeU56TTBOQ3dnTWpJdU5ETXdOekExTkRZeU56UTRPVEU0WFN4Y2JpQWdJQ0FnSUNBZ1d6RXhOQzR6TXpFNU56QXlNVFE0TkRNM05Td2dNakl1TkRNNU5Ua3dPVEE1TVRjeU5qWmRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqTXpOelEyTXpNM09Ea3dOakkwTENBeU1pNDBORGt4TVRBek9UZzRPRFl4TURaZExGeHVJQ0FnSUNBZ0lDQmJNVEUwTGpNek5UUXdNelEwTWpNNE1qZ3hMQ0F5TWk0ME5qRTRNREl3TXpVek16TTVPVEpkTEZ4dUlDQWdJQ0FnSUNCYk1URTBMak15TlRFd016YzFPVGMyTlRZeUxDQXlNaTQwTmpRek5EQXlNak14TnpjeE1UaGRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqTXlPVEl5TXpZek1qZ3hNalE1TENBeU1pNDBOekkxT0Rrd01USTFOakU1TlRSZExGeHVJQ0FnSUNBZ0lDQmJNVEUwTGpNeU16Y3pNRFEyT0RjMUxDQXlNaTQwTnpjd016QTBOalE1TXpNek1EZGRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqTXhPVFl4TURVNU5UY3dNekV5TENBeU1pNDBOemc1TXpNNU1EQTVNVFk1TWpoZExGeHVJQ0FnSUNBZ0lDQmJNVEUwTGpNd01UYzFOemd4TWpVc0lESXlMalEyTmpJME16Z3pNelUwT1RRME5WMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU16QXlORFEwTkRVNE1EQTNPREVzSURJeUxqUTFOek0yTURBNU5EYzFNREE0TTEwc1hHNGdJQ0FnSUNBZ0lGc3hNVFF1TWpreU9ETXhOREl3T0RrNE5EUXNJREl5TGpRMU5EZ3lNVGMzT1RBM05UZ3pNbDBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNamd6T1RBMU1ESTVNamsyT0Rnc0lESXlMalExTVRBeE5ESXhPRFF5TWpZNVhTeGNiaUFnSUNBZ0lDQWdXekV4TkM0eU56UTVOemcyTXpjMk9UVXpMQ0F5TWk0ME5ESTNOalF4TkRVd01ERTNNRGRkTEZ4dUlDQWdJQ0FnSUNCYk1URTBMakk1TURjM01UUTRORE0zTkRrNUxDQXlNaTQwTWpneE5qWTJOVGt5TnprMk1UVmRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqSTNOekF6T0RVM05ESXhPRGMxTENBeU1pNDBNakExTkRrNU56QXlPVEE0TnpWZExGeHVJQ0FnSUNBZ0lDQmJNVEUwTGpJM05EazNPRFl6TnpZNU5UTXNJREl5TGpReE1qa3pNamcyTXpVeE56Y3hOMTFjYmlBZ0lDQWdJRjBwTEZ4dUlDQWdJQ0FnVEM1SFpXOUtVMDlPTG1OdmIzSmtjMVJ2VEdGMFRHNW5jeWhiWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNekF4TURjeE1UWTJPVGt5TVRrc0lESXlMalF6TXpnM09Ea3dNVGM0TWprM1hTeGNiaUFnSUNBZ0lDQWdXekV4TkM0eU9UTTFNVGd3TmpZME1EWXlOU3dnTWpJdU5ERTBNakF5TkRFd016SXhNekF5WFN4Y2JpQWdJQ0FnSUNBZ1d6RXhOQzR6TURVNE56YzJPRFUxTkRZNE5pd2dNakl1TkRBNE5EZzVNelU0TXpReU5qTTFYU3hjYmlBZ0lDQWdJQ0FnV3pFeE5DNHpNakl6TlRjeE56YzNNelF6T0N3Z01qSXVOREl4TVRnME56RXdNek14T0RVNFhTeGNiaUFnSUNBZ0lDQWdXekV4TkM0ek1ERXdOekV4TmpZNU9USXhPU3dnTWpJdU5ETXpPRGM0T1RBeE56Z3lPVGRkWEc0Z0lDQWdJQ0JkS1Z4dUlDQWdJRjBzSUh0Y2JpQWdJQ0FnSUdSeVlXZG5ZV0pzWlRvZ2RISjFaU3hjYmlBZ0lDQWdJSEpsYm1SbGNtVnlPaUJ5Wlc1a1pYSmxjbHh1SUNBZ0lIMWNiaUFnS1Z4dUlDQXVZV1JrVkc4b2JXRndLVnh1SUNBdVltbHVaRkJ2Y0hWd0tGd2lTU2R0SUdFZ2NHOXNlV2R2YmlCM2FYUm9JR2h2YkdWY0lpazdYRzVjYm5aaGNpQmphWEpqYkdVZ1BTQnVaWGNnVEM1RGFYSmpiR1VvV3pJeUxqTTJNRGc1TnpJME1ERXpNak0zTXl3Z01URTBMakUwTlRJd01qWXpOamN4T0RjMVhTd2dOREF3TUN3Z2UxeHVJQ0FnSUdSeVlXZG5ZV0pzWlRvZ2RISjFaVnh1SUNCOUtWeHVJQ0F1WW1sdVpGQnZjSFZ3S0Z3aVRDNURhWEpqYkdWY0lpbGNiaUFnTG1Ga1pGUnZLRzFoY0NsY2JseHVkbUZ5SUdOcGNtTnNaVTFoY210bGNpQTlJRzVsZHlCTUxrTnBjbU5zWlUxaGNtdGxjaWh0WVhBdVoyVjBRMlZ1ZEdWeUtDa3NJSHRjYmlBZ0lDQmtjbUZuWjJGaWJHVTZJSFJ5ZFdVc1hHNGdJQ0FnY21WdVpHVnlaWEk2SUhKbGJtUmxjbVZ5WEc0Z0lIMHBYRzRnSUM1aWFXNWtVRzl3ZFhBb1hDSk1Ma05wY21Oc1pVMWhjbXRsY2x3aUtWeHVJQ0F1WVdSa1ZHOG9iV0Z3S1R0Y2JseHVkbUZ5SUcxMWJIUnBVRzlzZVdkdmJpQTlJR2RzYjJKaGJDNXRkV3gwYVZCdmJIbG5iMjRnUFNCdVpYY2dUQzVRYjJ4NVoyOXVLRnRjYmlBZ1RDNUhaVzlLVTA5T0xtTnZiM0prYzFSdlRHRjBURzVuY3loYlhHNGdJQ0FnV3pFeE5DNHlNRFUyTWpjME5ERTBNRFl5TlN3Z01qSXVNekl3T0RVNU9EUXhNREExT1ROZExGeHVJQ0FnSUZzeE1UUXVNakUxT1RJM01USTBNREl6TkRRc0lESXlMak0xTWpZeE5qQXpOVFV4TWpFMVhTeGNiaUFnSUNCYk1URTBMakkyTkRZM09EazFOVEEzT0RFeUxDQXlNaTR6TlRFek5EVTVNalkyTURZNU5UZGRMRnh1SUNBZ0lGc3hNVFF1TWpjME9UYzROak0zTmprMU15d2dNakl1TXpJME1ETTFOemcxT0RRd016aGRMRnh1SUNBZ0lGc3hNVFF1TWpreU1UUTBOemMxTXprd05qSXNJREl5TGpNeU56SXhNVFkxT0RNNE9Ea3pYU3hjYmlBZ0lDQmJNVEUwTGpNd01UYzFOemd4TWpVc0lESXlMak14TVRrMk5qZ3hNRGszTnpZeE5sMHNYRzRnSUNBZ1d6RXhOQzR5T1RReU1EUTNNVEU1TVRRd05pd2dNakl1TWpreE1EQXlOREkzTnpNMU16STFYU3hjYmlBZ0lDQmJNVEUwTGpJNU16VXhPREEyTmpRd05qSTFMQ0F5TWk0eU56STFOelkxT0RVME1UTTBOelZkTEZ4dUlDQWdJRnN4TVRRdU1qZ3pPVEExTURJNU1qazJPRGdzSURJeUxqSTJNVGMzTkRFd01EazNORE0xWFN4Y2JpQWdJQ0JiTVRFMExqSTJPRGM1T0RneU9ERXlOU3dnTWpJdU1qZ3hORGN5TVRJeU56Z3pPREU0WFN4Y2JpQWdJQ0JiTVRFMExqSTNORGszT0RZek56WTVOVE1zSURJeUxqSTVORGd4TkRNMk56YzRNRFV4T0Ywc1hHNGdJQ0FnV3pFeE5DNHlOamswT0RVME56TTJNekk0TVN3Z01qSXVNekF5TkRNM09UTTFPVEEwTkRoZExGeHVJQ0FnSUZzeE1UUXVNamN3TVRjeU1URTVNVFF3TmpJc0lESXlMak14TlRFME1qazFPREUyT1RNNVhTeGNiaUFnSUNCYk1URTBMakkxTnpneE1qVXNJREl5TGpNeE1UazJOamd4TURrM056WXhObDBzWEc0Z0lDQWdXekV4TkM0eU5EYzFNVEk0TVRjek9ESTRNU3dnTWpJdU1qazVPRGsyTnpreU56VXhPVEkzWFN4Y2JpQWdJQ0JiTVRFMExqSTBOVFExTWpnNE1EZzFPVE00TENBeU1pNHlPVEV3TURJME1qYzNNelV6TWpWZExGeHVJQ0FnSUZzeE1UUXVNakk1TmpZd01ETTBNVGM1Tmprc0lESXlMak13TnpVeU1EQTRNelV5TWpRM05sMHNYRzRnSUNBZ1d6RXhOQzR5TWpBM016TTJOREkxTnpneE1pd2dNakl1TXpBMU5qRTBNams1T0RNM01EUTJYU3hjYmlBZ0lDQmJNVEUwTGpJd05UWXlOelEwTVRRd05qSTFMQ0F5TWk0ek1qQTROVGs0TkRFd01EVTVNMTFjYmlBZ1hTa3NYRzRnSUV3dVIyVnZTbE5QVGk1amIyOXlaSE5VYjB4aGRFeHVaM01vVzF4dUlDQWdJRnN4TVRRdU16RTFORGt3TnpJeU5qVTJNalVzSURJeUxqTXpPVEkzT1RNeE5EWTRNekV5WFN4Y2JpQWdJQ0JiTVRFMExqTXlNREk1TnpJME1USXhNRGswTENBeU1pNHpNalkxTnpZME9EazJOakkwT0RKZExGeHVJQ0FnSUZzeE1UUXVNekk1T1RFd01qYzRNekl3TXpFc0lESXlMak15TmpVM05qUTRPVFkyTWpRNE1sMHNYRzRnSUNBZ1d6RXhOQzR6TXpNek5ETTFNRFU0TlRrek9Dd2dNakl1TXpNeU1qa3lPVEEwTURreE56RTJYU3hjYmlBZ0lDQmJNVEUwTGpNeU16QTBNemd5TXpJME1qRTVMQ0F5TWk0ek5ESTBOVFE0TkRBeE5EWTFYU3hjYmlBZ0lDQmJNVEUwTGpNeE5UUTVNRGN5TWpZMU5qSTFMQ0F5TWk0ek16a3lOemt6TVRRMk9ETXhNbDFjYmlBZ1hTa3NYRzRnSUV3dVIyVnZTbE5QVGk1amIyOXlaSE5VYjB4aGRFeHVaM01vVzF4dUlDQWdJRnN4TVRRdU1qYzVNRGs0TlRFd056UXlNVGtzSURJeUxqSTBORFl4TlRVd01ETXlNekEyTkYwc1hHNGdJQ0FnV3pFeE5DNHlPREV4TlRnME5EY3lOalUyTWl3Z01qSXVNalV4TmpBMk1qazFNVE15T1RRNFhTeGNiaUFnSUNCYk1URTBMakk0TmpZMU1UWXhNVE15T0RFeUxDQXlNaTR5TlRVME1Ua3pNRGc0TlRnMU5UWmRMRnh1SUNBZ0lGc3hNVFF1TWprNU5qazNPRGMxT1RjMk5UWXNJREl5TGpJMk1URXpPRFl6TkRjME5EUTVYU3hjYmlBZ0lDQmJNVEUwTGpJNU5qSTJORFkwT0RRek56VXNJREl5TGpJMU1EazNNRGM0TWpjMU1EZzJObDBzWEc0Z0lDQWdXekV4TkM0eU9UUTRPVEV6TlRjME1qRTRPQ3dnTWpJdU1qUXdPREF5TVRreU5EWXpNelZkTEZ4dUlDQWdJRnN4TVRRdU1qa3dNRGcwT0RNNE9EWTNNVGNzSURJeUxqSXpPRGc1TlRRNU9UWXhNekl6TWwwc1hHNGdJQ0FnV3pFeE5DNHlOemt3T1RnMU1UQTNOREl4T1N3Z01qSXVNalEwTmpFMU5UQXdNekl6TURZMFhWeHVJQ0JkS1Z4dVhTd2dlMXh1SUNCa2NtRm5aMkZpYkdVNklIUnlkV1VzWEc0Z0lDOHZJSEpsYm1SbGNtVnlPaUJ5Wlc1a1pYSmxjaXhjYmlBZ1kyOXNiM0k2SUNjak1Ea3lKMXh1ZlNrdVltbHVaRkJ2Y0hWd0tDZE5kV3gwYVZCdmJIbG5iMjRuS1M1aFpHUlVieWh0WVhBcE8xeHVYRzUyWVhJZ2JYVnNkR2xRYjJ4NWJHbHVaU0E5SUdkc2IySmhiQzV0ZFd4MGFWQnZiSGxzYVc1bElEMGdibVYzSUV3dVVHOXNlV3hwYm1Vb1cxeHVJQ0JNTGtkbGIwcFRUMDR1WTI5dmNtUnpWRzlNWVhSTWJtZHpLRnRjYmlBZ0lDQmJNVEV6TGpnNU9EWTVOamc1T1RReE5EQTJMQ0F5TWk0ek9UazJNREU1TWpFM01EWTVOVE5kTEZ4dUlDQWdJRnN4TVRNdU9EazRNREV3TWpVek9UQTJNalVzSURJeUxqUXlNalExTkRFNE1UY3dPVGN3TjEwc1hHNGdJQ0FnV3pFeE15NDVNRE0xTURNME1UYzVOamczTlN3Z01qSXVORE16TWpRME1qRTVOemd4TVRkZExGeHVJQ0FnSUZzeE1UTXVPVEE1Tmpnek1qSTNOVE01TURZc0lESXlMalEwT1RFeE1ETTVPRGc0TmpFd05sMHNYRzRnSUNBZ1d6RXhNeTQ1TURZNU16WTJORFUxTURjNE1Td2dNakl1TkRjNE1qazVOREkxTVRZeU9EVXlYU3hjYmlBZ0lDQmJNVEV6TGpreU16UXhOakV6TnpZNU5UTXNJREl5TGpRNE9EUTFNRFk0T0RNeU5UUXdPRjBzWEc0Z0lDQWdXekV4TXk0NU16TTNNVFU0TWpBek1USTFMQ0F5TWk0ME9ETXpOelV4TkRrM09EazJNak5kTEZ4dUlDQWdJRnN4TVRNdU9UUTBOekF5TVRRNE5ETTNOU3dnTWpJdU5Ea3lNalUzTWpJd01EZzFNVGt6WFN4Y2JpQWdJQ0JiTVRFekxqazFNakkxTlRJME9UQXlNelEwTENBeU1pNDFNVEkxTlRZNU5UUXdOVEUwTlYxY2JpQWdYU2tzWEc1Y2JpQWdUQzVIWlc5S1UwOU9MbU52YjNKa2MxUnZUR0YwVEc1bmN5aGJYRzRnSUNBZ1d6RXhNeTQ0TmpjM09UYzROVEUxTmpJMUxDQXlNaTR6T1RJMk1UZzFNemN4TXpjek9GMHNYRzRnSUNBZ1d6RXhNeTQ0TmpreE56RXhOREkxTnpneE1Td2dNakl1TkRJM05UTXhPVFV4TVRVMk9UbGRMRnh1SUNBZ0lGc3hNVE11T1RJek5ERTJNVE0zTmprMU15d2dNakl1TkRZeU5ETTJOVGcyTmpVek1UUTRYU3hjYmlBZ0lDQmJNVEV6TGprME9ERXpOVE0zTlRrM05qVTJMQ0F5TWk0ME56TTROVGd3TVRNME9EYzJNVFJkTEZ4dUlDQWdJRnN4TVRNdU9UYzRNelEzTnpjNE16SXdNeXdnTWpJdU5EazVNak0xTlRnNU5qZ3pNRFpkTEZ4dUlDQWdJRnN4TVRNdU9UazJPRGczTWpBM01ETXhNalVzSURJeUxqVXhNVGt5TWpZek1qUTJPRGcyWFN4Y2JpQWdJQ0JiTVRFMExqQXhNek0yTmpZNU9USXhPRGMxTENBeU1pNDFNREV4TXpnM01qQXpNREF5TlRSZExGeHVJQ0FnSUZzeE1UUXVNREkxTURNNU5qY3lPRFV4TlRVc0lESXlMalV3T0RFeE5qWTBNVGcxTXpZM05WMWNiaUFnWFNsY2JsMHNJSHRjYmlBZ1pISmhaMmRoWW14bE9pQjBjblZsTEZ4dUlDQmpiMnh2Y2pvZ0p5TmxPVEFuWEc1OUtTNWlhVzVrVUc5d2RYQW9KMDExYkhScFVHOXNlV3hwYm1VbktTNWhaR1JVYnlodFlYQXBPMXh1WEc1MllYSWdiV0Z5YTJWeUlEMGdibVYzSUV3dVRXRnlhMlZ5S0cxaGNDNW5aWFJEWlc1MFpYSW9LU3dnZTF4dUlDQmtjbUZuWjJGaWJHVTZJSFJ5ZFdWY2JuMHBMbUZrWkZSdktHMWhjQ2s3WEc0aVhYMD0iLCJyZXF1aXJlKCcuL3NyYy9TVkcnKTtcbnJlcXVpcmUoJy4vc3JjL1NWRy5WTUwnKTtcbnJlcXVpcmUoJy4vc3JjL0NhbnZhcycpO1xucmVxdWlyZSgnLi9zcmMvUGF0aC5UcmFuc2Zvcm0nKTtcbnJlcXVpcmUoJy4vc3JjL1BhdGguRHJhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEwuUGF0aC5EcmFnO1xuIiwiTC5VdGlsLnRydWVGbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbkwuQ2FudmFzLmluY2x1ZGUoe1xuXG4gIC8qKlxuICAgKiBEbyBub3RoaW5nXG4gICAqIEBwYXJhbSAge0wuUGF0aH0gbGF5ZXJcbiAgICovXG4gIF9yZXNldFRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyKSB7XG4gICAgaWYgKCF0aGlzLl9jb250YWluZXJDb3B5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZGVsZXRlIHRoaXMuX2NvbnRhaW5lckNvcHk7XG5cbiAgICBpZiAobGF5ZXIuX2NvbnRhaW5zUG9pbnRfKSB7XG4gICAgICBsYXllci5fY29udGFpbnNQb2ludCA9IGxheWVyLl9jb250YWluc1BvaW50XztcbiAgICAgIGRlbGV0ZSBsYXllci5fY29udGFpbnNQb2ludF87XG5cbiAgICAgIHRoaXMuX3JlcXVlc3RSZWRyYXcobGF5ZXIpO1xuICAgICAgdGhpcy5fZHJhdyh0cnVlKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEFsZ29yaXRobSBvdXRsaW5lOlxuICAgKlxuICAgKiAxLiBwcmUtdHJhbnNmb3JtIC0gY2xlYXIgdGhlIHBhdGggb3V0IG9mIHRoZSBjYW52YXMsIGNvcHkgY2FudmFzIHN0YXRlXG4gICAqIDIuIGF0IGV2ZXJ5IGZyYW1lOlxuICAgKiAgICAyLjEuIHNhdmVcbiAgICogICAgMi4yLiByZWRyYXcgdGhlIGNhbnZhcyBmcm9tIHNhdmVkIG9uZVxuICAgKiAgICAyLjMuIHRyYW5zZm9ybVxuICAgKiAgICAyLjQuIGRyYXcgcGF0aFxuICAgKiAgICAyLjUuIHJlc3RvcmVcbiAgICpcbiAgICogQHBhcmFtICB7TC5QYXRofSBsYXllclxuICAgKiBAcGFyYW0gIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG4gICAqL1xuICB0cmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllciwgbWF0cml4KSB7XG4gICAgdmFyIGNvcHkgPSB0aGlzLl9jb250YWluZXJDb3B5O1xuICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG4gICAgdmFyIG0gPSBMLkJyb3dzZXIucmV0aW5hID8gMiA6IDE7XG4gICAgdmFyIGJvdW5kcyA9IHRoaXMuX2JvdW5kcztcbiAgICB2YXIgc2l6ZSA9IGJvdW5kcy5nZXRTaXplKCk7XG4gICAgdmFyIHBvcyA9IGJvdW5kcy5taW47XG5cbiAgICBpZiAoIWNvcHkpIHtcbiAgICAgIGNvcHkgPSB0aGlzLl9jb250YWluZXJDb3B5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvcHkpO1xuXG4gICAgICBjb3B5LndpZHRoID0gbSAqIHNpemUueDtcbiAgICAgIGNvcHkuaGVpZ2h0ID0gbSAqIHNpemUueTtcblxuICAgICAgbGF5ZXIuX3JlbW92ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fcmVkcmF3KCk7XG5cbiAgICAgIGNvcHkuZ2V0Q29udGV4dCgnMmQnKS50cmFuc2xhdGUobSAqIGJvdW5kcy5taW4ueCwgbSAqIGJvdW5kcy5taW4ueSk7XG4gICAgICBjb3B5LmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKHRoaXMuX2NvbnRhaW5lciwgMCwgMCk7XG4gICAgICB0aGlzLl9pbml0UGF0aChsYXllcik7XG4gICAgICBsYXllci5fY29udGFpbnNQb2ludF8gPSBsYXllci5fY29udGFpbnNQb2ludDtcbiAgICAgIGxheWVyLl9jb250YWluc1BvaW50ID0gTC5VdGlsLnRydWVGbjtcbiAgICB9XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5jbGVhclJlY3QocG9zLngsIHBvcy55LCBzaXplLnggKiBtLCBzaXplLnkgKiBtKTtcbiAgICBjdHguc2V0VHJhbnNmb3JtKDEsIDAsIDAsIDEsIDAsIDApO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgY3R4LnNhdmUoKTtcblxuICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5fY29udGFpbmVyQ29weSwgMCwgMCwgc2l6ZS54LCBzaXplLnkpO1xuICAgIGN0eC50cmFuc2Zvcm0uYXBwbHkoY3R4LCBtYXRyaXgpO1xuXG4gICAgdmFyIGxheWVycyA9IHRoaXMuX2xheWVycztcbiAgICB0aGlzLl9sYXllcnMgPSB7fTtcblxuICAgIHRoaXMuX2luaXRQYXRoKGxheWVyKTtcbiAgICBsYXllci5fdXBkYXRlUGF0aCgpO1xuXG4gICAgdGhpcy5fbGF5ZXJzID0gbGF5ZXJzO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxufSk7XG4iLCIvKipcbiAqIExlYWZsZXQgdmVjdG9yIGZlYXR1cmVzIGRyYWcgZnVuY3Rpb25hbGl0eVxuICogQHByZXNlcnZlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogRHJhZyBoYW5kbGVyXG4gKiBAY2xhc3MgTC5QYXRoLkRyYWdcbiAqIEBleHRlbmRzIHtMLkhhbmRsZXJ9XG4gKi9cbkwuSGFuZGxlci5QYXRoRHJhZyA9IEwuSGFuZGxlci5leHRlbmQoIC8qKiBAbGVuZHMgIEwuUGF0aC5EcmFnLnByb3RvdHlwZSAqLyB7XG5cbiAgc3RhdGljczoge1xuICAgIERSQUdHSU5HX0NMUzogJ2xlYWZsZXQtcGF0aC1kcmFnZ2FibGUnXG4gIH0sXG5cblxuICAvKipcbiAgICogQHBhcmFtICB7TC5QYXRofSBwYXRoXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24ocGF0aCkge1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUGF0aH1cbiAgICAgKi9cbiAgICB0aGlzLl9wYXRoID0gcGF0aDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtBcnJheS48TnVtYmVyPn1cbiAgICAgKi9cbiAgICB0aGlzLl9tYXRyaXggPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUG9pbnR9XG4gICAgICovXG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7TC5Qb2ludH1cbiAgICAgKi9cbiAgICB0aGlzLl9kcmFnU3RhcnRQb2ludCA9IG51bGw7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICB0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQgPSBmYWxzZTtcblxuICB9LFxuXG4gIC8qKlxuICAgKiBFbmFibGUgZHJhZ2dpbmdcbiAgICovXG4gIGFkZEhvb2tzOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9wYXRoLm9uKCdtb3VzZWRvd24nLCB0aGlzLl9vbkRyYWdTdGFydCwgdGhpcyk7XG5cbiAgICB0aGlzLl9wYXRoLm9wdGlvbnMuY2xhc3NOYW1lID0gdGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZSA/XG4gICAgICAgICh0aGlzLl9wYXRoLm9wdGlvbnMuY2xhc3NOYW1lICsgJyAnICsgTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHSU5HX0NMUykgOlxuICAgICAgICAgTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHSU5HX0NMUztcblxuICAgIGlmICh0aGlzLl9wYXRoLl9wYXRoKSB7XG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3ModGhpcy5fcGF0aC5fcGF0aCwgTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHSU5HX0NMUyk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBEaXNhYmxlIGRyYWdnaW5nXG4gICAqL1xuICByZW1vdmVIb29rczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcGF0aC5vZmYoJ21vdXNlZG93bicsIHRoaXMuX29uRHJhZ1N0YXJ0LCB0aGlzKTtcblxuICAgIHRoaXMuX3BhdGgub3B0aW9ucy5jbGFzc05hbWUgPSB0aGlzLl9wYXRoLm9wdGlvbnMuY2xhc3NOYW1lXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKCdcXFxccysnICsgTC5IYW5kbGVyLlBhdGhEcmFnLkRSQUdHSU5HX0NMUyksICcnKTtcbiAgICBpZiAodGhpcy5fcGF0aC5fcGF0aCkge1xuICAgICAgTC5Eb21VdGlsLnJlbW92ZUNsYXNzKHRoaXMuX3BhdGguX3BhdGgsIEwuSGFuZGxlci5QYXRoRHJhZy5EUkFHR0lOR19DTFMpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICovXG4gIG1vdmVkOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fcGF0aC5fZHJhZ01vdmVkO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTdGFydCBkcmFnXG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgIHZhciBldmVudFR5cGUgPSBldnQub3JpZ2luYWxFdmVudC5fc2ltdWxhdGVkID8gJ3RvdWNoc3RhcnQnIDogZXZ0Lm9yaWdpbmFsRXZlbnQudHlwZTtcblxuICAgIHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSBldnQuY29udGFpbmVyUG9pbnQuY2xvbmUoKTtcbiAgICB0aGlzLl9kcmFnU3RhcnRQb2ludCA9IGV2dC5jb250YWluZXJQb2ludC5jbG9uZSgpO1xuICAgIHRoaXMuX21hdHJpeCA9IFsxLCAwLCAwLCAxLCAwLCAwXTtcbiAgICBMLkRvbUV2ZW50LnN0b3AoZXZ0Lm9yaWdpbmFsRXZlbnQpO1xuXG4gICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3BhdGguX3JlbmRlcmVyLl9jb250YWluZXIsICdsZWFmbGV0LWludGVyYWN0aXZlJyk7XG4gICAgTC5Eb21FdmVudFxuICAgICAgLm9uKGRvY3VtZW50LCBMLkRyYWdnYWJsZS5NT1ZFW2V2ZW50VHlwZV0sIHRoaXMuX29uRHJhZywgdGhpcylcbiAgICAgIC5vbihkb2N1bWVudCwgTC5EcmFnZ2FibGUuRU5EW2V2ZW50VHlwZV0sIHRoaXMuX29uRHJhZ0VuZCwgdGhpcyk7XG5cbiAgICBpZiAodGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmVuYWJsZWQoKSkge1xuICAgICAgLy8gSSBndWVzcyBpdCdzIHJlcXVpcmVkIGJlY2F1c2UgbW91c2Rvd24gZ2V0cyBzaW11bGF0ZWQgd2l0aCBhIGRlbGF5XG4gICAgICB0aGlzLl9wYXRoLl9tYXAuZHJhZ2dpbmcuX2RyYWdnYWJsZS5fb25VcCgpO1xuXG4gICAgICB0aGlzLl9wYXRoLl9tYXAuZHJhZ2dpbmcuZGlzYWJsZSgpO1xuICAgICAgdGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5fcGF0aC5fZHJhZ01vdmVkID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5fcGF0aC5fcG9wdXApIHsgLy8gdGhhdCBtaWdodCBiZSBhIGNhc2Ugb24gdG91Y2ggZGV2aWNlcyBhcyB3ZWxsXG4gICAgICB0aGlzLl9wYXRoLl9wb3B1cC5fY2xvc2UoKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIERyYWdnaW5nXG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnOiBmdW5jdGlvbihldnQpIHtcbiAgICBMLkRvbUV2ZW50LnN0b3AoZXZ0KTtcblxuICAgIHZhciBmaXJzdCA9IChldnQudG91Y2hlcyAmJiBldnQudG91Y2hlcy5sZW5ndGggPj0gMSA/IGV2dC50b3VjaGVzWzBdIDogZXZ0KTtcbiAgICB2YXIgY29udGFpbmVyUG9pbnQgPSB0aGlzLl9wYXRoLl9tYXAubW91c2VFdmVudFRvQ29udGFpbmVyUG9pbnQoZmlyc3QpO1xuXG4gICAgdmFyIHggPSBjb250YWluZXJQb2ludC54O1xuICAgIHZhciB5ID0gY29udGFpbmVyUG9pbnQueTtcblxuICAgIHZhciBkeCA9IHggLSB0aGlzLl9zdGFydFBvaW50Lng7XG4gICAgdmFyIGR5ID0geSAtIHRoaXMuX3N0YXJ0UG9pbnQueTtcblxuICAgIGlmICghdGhpcy5fcGF0aC5fZHJhZ01vdmVkICYmIChkeCB8fCBkeSkpIHtcbiAgICAgIHRoaXMuX3BhdGguX2RyYWdNb3ZlZCA9IHRydWU7XG4gICAgICB0aGlzLl9wYXRoLmZpcmUoJ2RyYWdzdGFydCcsIGV2dCk7XG4gICAgICAvLyB3ZSBkb24ndCB3YW50IHRoYXQgdG8gaGFwcGVuIG9uIGNsaWNrXG4gICAgICB0aGlzLl9wYXRoLmJyaW5nVG9Gcm9udCgpO1xuICAgIH1cblxuICAgIHRoaXMuX21hdHJpeFs0XSArPSBkeDtcbiAgICB0aGlzLl9tYXRyaXhbNV0gKz0gZHk7XG5cbiAgICB0aGlzLl9zdGFydFBvaW50LnggPSB4O1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQueSA9IHk7XG5cbiAgICB0aGlzLl9wYXRoLmZpcmUoJ3ByZWRyYWcnLCBldnQpO1xuICAgIHRoaXMuX3BhdGguX3RyYW5zZm9ybSh0aGlzLl9tYXRyaXgpO1xuICAgIHRoaXMuX3BhdGguZmlyZSgnZHJhZycsIGV2dCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERyYWdnaW5nIHN0b3BwZWQsIGFwcGx5XG4gICAqIEBwYXJhbSAge0wuTW91c2VFdmVudH0gZXZ0XG4gICAqL1xuICBfb25EcmFnRW5kOiBmdW5jdGlvbihldnQpIHtcbiAgICB2YXIgZXZlbnRUeXBlID0gZXZ0LnR5cGU7XG4gICAgdmFyIGNvbnRhaW5lclBvaW50ID0gdGhpcy5fcGF0aC5fbWFwLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGV2dCk7XG5cbiAgICAvLyBhcHBseSBtYXRyaXhcbiAgICBpZiAodGhpcy5tb3ZlZCgpKSB7XG4gICAgICB0aGlzLl90cmFuc2Zvcm1Qb2ludHModGhpcy5fbWF0cml4KTtcbiAgICAgIHRoaXMuX3BhdGguX3Byb2plY3QoKTtcbiAgICAgIHRoaXMuX3BhdGguX3RyYW5zZm9ybShudWxsKTtcbiAgICB9XG5cbiAgICBMLkRvbUV2ZW50XG4gICAgICAub2ZmKGRvY3VtZW50LCAnbW91c2Vtb3ZlIHRvdWNobW92ZScsIHRoaXMuX29uRHJhZywgdGhpcylcbiAgICAgIC5vZmYoZG9jdW1lbnQsICdtb3VzZXVwIHRvdWNoZW5kJywgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcblxuICAgIC8vIGNvbnNpc3RlbmN5XG4gICAgdGhpcy5fcGF0aC5maXJlKCdkcmFnZW5kJywge1xuICAgICAgZGlzdGFuY2U6IE1hdGguc3FydChcbiAgICAgICAgTC5MaW5lVXRpbC5fc3FEaXN0KHRoaXMuX2RyYWdTdGFydFBvaW50LCBjb250YWluZXJQb2ludClcbiAgICAgIClcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdHJpeCA9IG51bGw7XG4gICAgdGhpcy5fc3RhcnRQb2ludCA9IG51bGw7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCkge1xuICAgICAgdGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQXBwbGllcyB0cmFuc2Zvcm1hdGlvbiwgZG9lcyBpdCBpbiBvbmUgc3dlZXAgZm9yIHBlcmZvcm1hbmNlLFxuICAgKiBzbyBkb24ndCBiZSBzdXJwcmlzZWQgYWJvdXQgdGhlIGNvZGUgcmVwZXRpdGlvbi5cbiAgICpcbiAgICogWyB4IF0gICBbIGEgIGIgIHR4IF0gWyB4IF0gICBbIGEgKiB4ICsgYiAqIHkgKyB0eCBdXG4gICAqIFsgeSBdID0gWyBjICBkICB0eSBdIFsgeSBdID0gWyBjICogeCArIGQgKiB5ICsgdHkgXVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcbiAgICovXG4gIF90cmFuc2Zvcm1Qb2ludHM6IGZ1bmN0aW9uKG1hdHJpeCkge1xuICAgIHZhciBwYXRoID0gdGhpcy5fcGF0aDtcbiAgICB2YXIgaSwgbGVuLCBsYXRsbmc7XG5cbiAgICB2YXIgcHggPSBMLnBvaW50KG1hdHJpeFs0XSwgbWF0cml4WzVdKTtcblxuICAgIHZhciBjcnMgPSBwYXRoLl9tYXAub3B0aW9ucy5jcnM7XG4gICAgdmFyIHRyYW5zZm9ybWF0aW9uID0gY3JzLnRyYW5zZm9ybWF0aW9uO1xuICAgIHZhciBzY2FsZSA9IGNycy5zY2FsZShwYXRoLl9tYXAuZ2V0Wm9vbSgpKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IGNycy5wcm9qZWN0aW9uO1xuXG4gICAgdmFyIGRpZmYgPSB0cmFuc2Zvcm1hdGlvbi51bnRyYW5zZm9ybShweCwgc2NhbGUpXG4gICAgICAuc3VidHJhY3QodHJhbnNmb3JtYXRpb24udW50cmFuc2Zvcm0oTC5wb2ludCgwLCAwKSwgc2NhbGUpKTtcblxuICAgIHBhdGguX2JvdW5kcyA9IG5ldyBMLkxhdExuZ0JvdW5kcygpO1xuXG4gICAgLy8gY29uc29sZS50aW1lKCd0cmFuc2Zvcm0nKTtcbiAgICAvLyBhbGwgc2hpZnRzIGFyZSBpbi1wbGFjZVxuICAgIGlmIChwYXRoLl9wb2ludCkgeyAvLyBMLkNpcmNsZVxuICAgICAgcGF0aC5fbGF0bG5nID0gcHJvamVjdGlvbi51bnByb2plY3QoXG4gICAgICAgIHByb2plY3Rpb24ucHJvamVjdChwYXRoLl9sYXRsbmcpLl9hZGQoZGlmZikpO1xuICAgICAgcGF0aC5fcG9pbnQuX2FkZChweCk7XG4gICAgfSBlbHNlIGlmIChwYXRoLl9yaW5ncyB8fCBwYXRoLl9wYXJ0cykgeyAvLyBldmVyeXRoaW5nIGVsc2VcbiAgICAgIHZhciByaW5ncyA9IHBhdGguX3JpbmdzIHx8IHBhdGguX3BhcnRzO1xuICAgICAgdmFyIGxhdGxuZ3MgPSBwYXRoLl9sYXRsbmdzO1xuICAgICAgaWYgKCFMLlV0aWwuaXNBcnJheShsYXRsbmdzWzBdKSkgeyAvLyBwb2x5bGluZVxuICAgICAgICBsYXRsbmdzID0gW2xhdGxuZ3NdO1xuICAgICAgfVxuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmluZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpqID0gcmluZ3NbaV0ubGVuZ3RoOyBqIDwgamo7IGorKykge1xuICAgICAgICAgIGxhdGxuZyA9IGxhdGxuZ3NbaV1bal07XG4gICAgICAgICAgbGF0bG5nc1tpXVtqXSA9IHByb2plY3Rpb25cbiAgICAgICAgICAgIC51bnByb2plY3QocHJvamVjdGlvbi5wcm9qZWN0KGxhdGxuZykuX2FkZChkaWZmKSk7XG4gICAgICAgICAgcGF0aC5fYm91bmRzLmV4dGVuZChsYXRsbmdzW2ldW2pdKTtcbiAgICAgICAgICByaW5nc1tpXVtqXS5fYWRkKHB4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjb25zb2xlLnRpbWVFbmQoJ3RyYW5zZm9ybScpO1xuXG4gICAgcGF0aC5fdXBkYXRlUGF0aCgpO1xuICB9XG5cbn0pO1xuXG5MLlBhdGguYWRkSW5pdEhvb2soZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlKSB7XG4gICAgLy8gZW5zdXJlIGludGVyYWN0aXZlXG4gICAgdGhpcy5vcHRpb25zLmludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgICB0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmRyYWdnaW5nID0gbmV3IEwuSGFuZGxlci5QYXRoRHJhZyh0aGlzKTtcbiAgICAgIHRoaXMuZHJhZ2dpbmcuZW5hYmxlKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHRoaXMuZHJhZ2dpbmcpIHtcbiAgICB0aGlzLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgfVxufSk7XG4iLCIvKipcbiAqIE1hdHJpeCB0cmFuc2Zvcm0gcGF0aCBmb3IgU1ZHL1ZNTFxuICovXG5cbi8vIFJlbmRlcmVyLWluZGVwZW5kZW50XG5MLlBhdGguaW5jbHVkZSh7XG5cblx0LyoqXG5cdCAqIEFwcGxpZXMgbWF0cml4IHRyYW5zZm9ybWF0aW9uIHRvIFNWR1xuXHQgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+P30gbWF0cml4XG5cdCAqL1xuXHRfdHJhbnNmb3JtOiBmdW5jdGlvbihtYXRyaXgpIHtcblx0XHRpZiAodGhpcy5fcmVuZGVyZXIpIHtcblx0XHRcdGlmIChtYXRyaXgpIHtcblx0XHRcdFx0dGhpcy5fcmVuZGVyZXIudHJhbnNmb3JtUGF0aCh0aGlzLCBtYXRyaXgpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gcmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHRcdFx0XHR0aGlzLl9yZW5kZXJlci5fcmVzZXRUcmFuc2Zvcm1QYXRoKHRoaXMpO1xuXHRcdFx0XHR0aGlzLl91cGRhdGUoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0LyoqXG5cdCAqIENoZWNrIGlmIHRoZSBmZWF0dXJlIHdhcyBkcmFnZ2VkLCB0aGF0J2xsIHN1cHJlc3MgdGhlIGNsaWNrIGV2ZW50XG5cdCAqIG9uIG1vdXNldXAuIFRoYXQgZml4ZXMgcG9wdXBzIGZvciBleGFtcGxlXG5cdCAqXG5cdCAqIEBwYXJhbSAge01vdXNlRXZlbnR9IGVcblx0ICovXG5cdF9vbk1vdXNlQ2xpY2s6IGZ1bmN0aW9uKGUpIHtcblx0XHRpZiAoKHRoaXMuZHJhZ2dpbmcgJiYgdGhpcy5kcmFnZ2luZy5tb3ZlZCgpKSB8fFxuXHRcdFx0KHRoaXMuX21hcC5kcmFnZ2luZyAmJiB0aGlzLl9tYXAuZHJhZ2dpbmcubW92ZWQoKSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHR0aGlzLl9maXJlTW91c2VFdmVudChlKTtcblx0fVxuXG59KTtcbiIsIkwuU1ZHLmluY2x1ZGUoIUwuQnJvd3Nlci52bWwgPyB7fSA6IHtcblxuXHQvKipcblx0ICogUmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHQgKi9cblx0X3Jlc2V0VHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIpIHtcblx0XHRpZiAobGF5ZXIuX3NrZXcpIHtcblx0XHRcdC8vIHN1cGVyIGltcG9ydGFudCEgd29ya2Fyb3VuZCBmb3IgYSAnanVtcGluZycgZ2xpdGNoOlxuXHRcdFx0Ly8gZGlzYWJsZSB0cmFuc2Zvcm0gYmVmb3JlIHJlbW92aW5nIGl0XG5cdFx0XHRsYXllci5fc2tldy5vbiA9IGZhbHNlO1xuXHRcdFx0bGF5ZXIuX3BhdGgucmVtb3ZlQ2hpbGQobGF5ZXIuX3NrZXcpO1xuXHRcdFx0bGF5ZXIuX3NrZXcgPSBudWxsO1xuXHRcdH1cblx0fSxcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gVk1MXG5cdCAqIEBwYXJhbSB7TC5QYXRofSAgICAgICAgIGxheWVyXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuXHQgKi9cblx0dHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuXHRcdHZhciBza2V3ID0gbGF5ZXIuX3NrZXc7XG5cblx0XHRpZiAoIXNrZXcpIHtcblx0XHRcdHNrZXcgPSBMLlNWRy5jcmVhdGUoJ3NrZXcnKTtcblx0XHRcdGxheWVyLl9wYXRoLmFwcGVuZENoaWxkKHNrZXcpO1xuXHRcdFx0c2tldy5zdHlsZS5iZWhhdmlvciA9ICd1cmwoI2RlZmF1bHQjVk1MKSc7XG5cdFx0XHRsYXllci5fc2tldyA9IHNrZXc7XG5cdFx0fVxuXG5cdFx0Ly8gaGFuZGxlIHNrZXcvdHJhbnNsYXRlIHNlcGFyYXRlbHksIGNhdXNlIGl0J3MgYnJva2VuXG5cdFx0dmFyIG10ID0gbWF0cml4WzBdLnRvRml4ZWQoOCkgKyBcIiBcIiArIG1hdHJpeFsxXS50b0ZpeGVkKDgpICsgXCIgXCIgK1xuXHRcdFx0bWF0cml4WzJdLnRvRml4ZWQoOCkgKyBcIiBcIiArIG1hdHJpeFszXS50b0ZpeGVkKDgpICsgXCIgMCAwXCI7XG5cdFx0dmFyIG9mZnNldCA9IE1hdGguZmxvb3IobWF0cml4WzRdKS50b0ZpeGVkKCkgKyBcIiwgXCIgK1xuXHRcdFx0TWF0aC5mbG9vcihtYXRyaXhbNV0pLnRvRml4ZWQoKSArIFwiXCI7XG5cblx0XHR2YXIgcyA9IHRoaXMuX3BhdGguc3R5bGU7XG5cdFx0dmFyIGwgPSBwYXJzZUZsb2F0KHMubGVmdCk7XG5cdFx0dmFyIHQgPSBwYXJzZUZsb2F0KHMudG9wKTtcblx0XHR2YXIgdyA9IHBhcnNlRmxvYXQocy53aWR0aCk7XG5cdFx0dmFyIGggPSBwYXJzZUZsb2F0KHMuaGVpZ2h0KTtcblxuXHRcdGlmIChpc05hTihsKSkgbCA9IDA7XG5cdFx0aWYgKGlzTmFOKHQpKSB0ID0gMDtcblx0XHRpZiAoaXNOYU4odykgfHwgIXcpIHcgPSAxO1xuXHRcdGlmIChpc05hTihoKSB8fCAhaCkgaCA9IDE7XG5cblx0XHR2YXIgb3JpZ2luID0gKC1sIC8gdyAtIDAuNSkudG9GaXhlZCg4KSArIFwiIFwiICsgKC10IC8gaCAtIDAuNSkudG9GaXhlZCg4KTtcblxuXHRcdHNrZXcub24gPSBcImZcIjtcblx0XHRza2V3Lm1hdHJpeCA9IG10O1xuXHRcdHNrZXcub3JpZ2luID0gb3JpZ2luO1xuXHRcdHNrZXcub2Zmc2V0ID0gb2Zmc2V0O1xuXHRcdHNrZXcub24gPSB0cnVlO1xuXHR9XG5cbn0pO1xuIiwiTC5TVkcuaW5jbHVkZSh7XG5cblx0LyoqXG5cdCAqIFJlc2V0IHRyYW5zZm9ybSBtYXRyaXhcblx0ICovXG5cdF9yZXNldFRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyKSB7XG5cdFx0bGF5ZXIuX3BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ3RyYW5zZm9ybScsICcnKTtcblx0fSxcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gU1ZHXG5cdCAqIEBwYXJhbSB7TC5QYXRofSAgICAgICAgIGxheWVyXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IG1hdHJpeFxuXHQgKi9cblx0dHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIsIG1hdHJpeCkge1xuXHRcdGxheWVyLl9wYXRoLnNldEF0dHJpYnV0ZU5TKG51bGwsIFwidHJhbnNmb3JtXCIsXG5cdFx0XHQnbWF0cml4KCcgKyBtYXRyaXguam9pbignICcpICsgJyknKTtcblx0fVxuXG59KTtcbiJdfQ==
