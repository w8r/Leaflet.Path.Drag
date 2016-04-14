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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBMID0gZ2xvYmFsLkw7XG4vLyBMLkJyb3dzZXIucmV0aW5hID0gdHJ1ZTtcbnZhciBEcmFnSGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7XG5cbkwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCA9IFwibGVhZmxldC1tYXN0ZXIvaW1hZ2VzXCI7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbWFwID0gZ2xvYmFsLm1hcCA9IG5ldyBMLk1hcCgnbWFwJywge1xuICAvLyBjcnM6IEwuQ1JTLkVQU0c0MzI2IC8vIHRoYXQgd2FzIHRlc3RlZCBhcyB3ZWxsXG59KS5zZXRWaWV3KFsyMi40MjY1OCwgMTE0LjE5NTJdLCAxMSk7XG5cbnZhciByZW5kZXJlciA9IG5ldyBMLkNhbnZhcygpO1xuXG5MLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICBhdHRyaWJ1dGlvbjogJyZjb3B5OyAnICtcbiAgICAnPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcbn0pLmFkZFRvKG1hcCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFycihhcnJheSwgaW5zZXJ0KSB7XG4gIHZhciByZXMgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihwLCBpLCBhcnIpIHtcbiAgICByZXMucHVzaChwLmNvbmNhdCgpKTtcblxuICAgIGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgIHZhciBkaWZmID0gW2FycltpICsgMV1bMF0gLSBwWzBdLCBhcnJbaSArIDFdWzFdIC0gcFsxXV07XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGluc2VydDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKFtwWzBdICsgKGRpZmZbMF0gKiBpKSAvIGluc2VydCwgcFsxXSArIChkaWZmWzFdICogaSkgLyBpbnNlcnRdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgcG9seWdvbiA9IGdsb2JhbC5wb2x5Z29uID0gbmV3IEwuUG9seWdvbihcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhcblxuICAgIC8vIH4gMTMgMDAwIHBvaW50c1xuICAgIGludGVycG9sYXRlQXJyKFtcbiAgICAgIFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF0sXG4gICAgICBbMTEzLjk4NjU4NzUyNDQxNDA1LCAyMi4zODM3MzAwODU5MjQ5NV0sXG4gICAgICBbMTE0LjAxMjY4MDA1MzcxMDk0LCAyMi4zNjkxMjYzOTc1NDU4ODddLFxuICAgICAgWzExNC4wMjc3ODYyNTQ4ODI4MSwgMjIuMzg1NjM0ODAxODU3MThdLFxuICAgICAgWzExNC4wNDcwMTIzMjkxMDE1NiwgMjIuMzk1MTU3OTkwMjkwNzU1XSxcbiAgICAgIFsxMTQuMDYwMDU4NTkzNzUsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICBbMTE0LjA2MjgwNTE3NTc4MTI1LCAyMi40MzI2MDk1MzQ4NzY3OTZdLFxuICAgICAgWzExNC4wNDgzODU2MjAxMTcxNywgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcbiAgICAgIFsxMTQuMDQyODkyNDU2MDU0NjksIDIyLjQ0ODQ3NTc4NjU2NTQ0XSxcbiAgICAgIFsxMTQuMDMyNTkyNzczNDM3NDksIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG4gICAgICBbMTE0LjAxOTU0NjUwODc4OTA2LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgICAgWzExMy45OTYyMDA1NjE1MjM0NCwgMjIuNDM2NDE3NjAwNzYzMTE0XSxcbiAgICAgIFsxMTMuOTgxNzgxMDA1ODU5MzgsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG4gICAgICBbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdXG4gICAgXSwgMTAwMClcbiAgKSwge1xuICAgIGNvbG9yOiAnI2YwMCcsXG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICB9KS5hZGRUbyhtYXApO1xuXG52YXIgcG9seWxpbmUgPSBnbG9iYWwucG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShcbiAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICAgIFsxMTQuMTQzMTQyNzAwMTk1MzEsIDIyLjQ5NDc5NDg0OTc1NDQzXSxcbiAgICAgIFsxMTQuMTUzNDQyMzgyODEyNSwgMjIuNDg1OTEyOTQyMzIwOTU4XSxcbiAgICAgIFsxMTQuMTUyMDY5MDkxNzk2ODgsIDIyLjQ3MzIyMzUxNDQ3ODFdLFxuICAgICAgWzExNC4xNDkzMjI1MDk3NjU2MSwgMjIuNDU5ODk4MzYzOTQzODkzXSxcbiAgICAgIFsxMTQuMTU5NjIyMTkyMzgyODEsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgICBbMTE0LjE2OTkyMTg3NSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICAgIFsxMTQuMTkzOTU0NDY3NzczNDQsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG4gICAgICBbMTE0LjIwNjMxNDA4NjkxNDA2LCAyMi40NjExNjc0ODExMDkzNV0sXG4gICAgICBbMTE0LjIxMTgwNzI1MDk3NjU1LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuICAgICAgWzExNC4yMjQxNjY4NzAxMTcxOSwgMjIuNDcxMzIwMDAwMDA5OTkyXSxcbiAgICAgIFsxMTQuMjM3MjEzMTM0NzY1NjIsIDIyLjQ3NjM5NTk4MDQ1Nzk3M10sXG4gICAgICBbMTE0LjI0MjAxOTY1MzMyMDMxLCAyMi40OTM1MjYwNDA3MzcyMl0sXG4gICAgICBbMTE0LjIzMDM0NjY3OTY4NzUsIDIyLjUxNTcyODUxODMwMzUxXSxcbiAgICAgIFsxMTQuMjE3OTg3MDYwNTQ2ODgsIDIyLjUyNDYwODUxMTAyNjI2Ml0sXG4gICAgICBbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuICAgICAgWzExNC4yMDc2ODczNzc5Mjk2OSwgMjIuNTM2MDI0ODA1ODg2OTc0XVxuICAgIF0pLCB7XG4gICAgICB3ZWlnaHQ6IDE1LFxuICAgICAgZHJhZ2dhYmxlOiB0cnVlXG4gICAgfSlcbiAgLmFkZFRvKG1hcClcbiAgLmJpbmRQb3B1cChcIkknbSBhIHBvbHlsaW5lXCIpO1xuXG52YXIgcG9seWdvbldpdGhIb2xlID0gZ2xvYmFsLnBvbHlnb25XaXRoSG9sZSA9IG5ldyBMLlBvbHlnb24oXG4gICAgW1xuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDEyOTMyODYzNTE3NzE3XSxcbiAgICAgICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDAwODcxNTkwMzA1OTVdLFxuICAgICAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4zODg4MDkyNzA0NTU1Nl0sXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjM4MjQ2MDI2MDgxNTcxNl0sXG4gICAgICAgIFsxMTQuMzE4OTIzOTUwMTk1MzEsIDIyLjM5MTk4MzY2NjYwMjc4M10sXG4gICAgICAgIFsxMTQuMzIzMDQzODIzMjQyMTksIDIyLjM4MDU1NTUwMTQyMTUzM10sXG4gICAgICAgIFsxMTQuMzQyOTU2NTQyOTY4NzUsIDIyLjM3MjkzNjIwMzExMzgzOF0sXG4gICAgICAgIFsxMTQuMzM0NzE2Nzk2ODc1LCAyMi4zODQzNjQ5OTQxMzMzMDNdLFxuICAgICAgICBbMTE0LjMzMDU5NjkyMzgyODEyLCAyMi4zOTM4ODgyNjk1MTExOTRdLFxuICAgICAgICBbMTE0LjMyMTY3MDUzMjIyNjU1LCAyMi40MDA4NzE1OTAzMDU5NV0sXG4gICAgICAgIFsxMTQuMzI3ODUwMzQxNzk2ODgsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICAgIFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQyNDk5MzA4OTY0NzIyXSxcbiAgICAgICAgWzExNC4zMjU3OTA0MDUyNzM0NCwgMjIuNDMwNzA1NDYyNzQ4OTE4XSxcbiAgICAgICAgWzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDM5NTkwOTA5MTcyNjZdLFxuICAgICAgICBbMTE0LjMzNzQ2MzM3ODkwNjI0LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgICAgICBbMTE0LjMzNTQwMzQ0MjM4MjgxLCAyMi40NjE4MDIwMzUzMzM5OTJdLFxuICAgICAgICBbMTE0LjMyNTEwMzc1OTc2NTYyLCAyMi40NjQzNDAyMjMxNzcxMThdLFxuICAgICAgICBbMTE0LjMyOTIyMzYzMjgxMjQ5LCAyMi40NzI1ODkwMTI1NjE5NTRdLFxuICAgICAgICBbMTE0LjMyMzczMDQ2ODc1LCAyMi40NzcwMzA0NjQ5MzMzMDddLFxuICAgICAgICBbMTE0LjMxOTYxMDU5NTcwMzEyLCAyMi40Nzg5MzM5MDA5MTY5MjhdLFxuICAgICAgICBbMTE0LjMwMTc1NzgxMjUsIDIyLjQ2NjI0MzgzMzU0OTQ0NV0sXG4gICAgICAgIFsxMTQuMzAyNDQ0NDU4MDA3ODEsIDIyLjQ1NzM2MDA5NDc1MDA4M10sXG4gICAgICAgIFsxMTQuMjkyODMxNDIwODk4NDQsIDIyLjQ1NDgyMTc3OTA3NTgzMl0sXG4gICAgICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQ1MTAxNDIxODQyMjY5XSxcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40NDI3NjQxNDUwMDE3MDddLFxuICAgICAgICBbMTE0LjI5MDc3MTQ4NDM3NDk5LCAyMi40MjgxNjY2NTkyNzk2MTVdLFxuICAgICAgICBbMTE0LjI3NzAzODU3NDIxODc1LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQxMjkzMjg2MzUxNzcxN11cbiAgICAgIF0pLFxuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XSxcbiAgICAgICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuNDE0MjAyNDEwMzIxMzAyXSxcbiAgICAgICAgWzExNC4zMDU4Nzc2ODU1NDY4NiwgMjIuNDA4NDg5MzU4MzQyNjM1XSxcbiAgICAgICAgWzExNC4zMjIzNTcxNzc3MzQzOCwgMjIuNDIxMTg0NzEwMzMxODU4XSxcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddXG4gICAgICBdKVxuICAgIF0sIHtcbiAgICAgIGRyYWdnYWJsZTogdHJ1ZS8vLFxuICAgICAgLy9yZW5kZXJlcjogcmVuZGVyZXJcbiAgICB9XG4gIClcbiAgLmFkZFRvKG1hcClcbiAgLmJpbmRQb3B1cChcIkknbSBhIHBvbHlnb24gd2l0aCBob2xlXCIpO1xuXG52YXIgY2lyY2xlID0gZ2xvYmFsLmNpcmNsZSA9IG5ldyBMLkNpcmNsZShbMjIuMzYwODk3MjQwMTMyMzczLCAxMTQuMTQ1MjAyNjM2NzE4NzVdLCA0MDAwLCB7XG4gICAgZHJhZ2dhYmxlOiB0cnVlXG4gIH0pXG4gIC5iaW5kUG9wdXAoXCJMLkNpcmNsZVwiKVxuICAuYWRkVG8obWFwKVxuXG52YXIgY2lyY2xlTWFya2VyID0gbmV3IEwuQ2lyY2xlTWFya2VyKG1hcC5nZXRDZW50ZXIoKSwge1xuICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICByZW5kZXJlcjogcmVuZGVyZXJcbiAgfSlcbiAgLmJpbmRQb3B1cChcIkwuQ2lyY2xlTWFya2VyXCIpXG4gIC5hZGRUbyhtYXApO1xuXG52YXIgbXVsdGlQb2x5Z29uID0gZ2xvYmFsLm11bHRpUG9seWdvbiA9IG5ldyBMLlBvbHlnb24oW1xuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjIwNTYyNzQ0MTQwNjI1LCAyMi4zMjA4NTk4NDEwMDU5M10sXG4gICAgWzExNC4yMTU5MjcxMjQwMjM0NCwgMjIuMzUyNjE2MDM1NTEyMTVdLFxuICAgIFsxMTQuMjY0Njc4OTU1MDc4MTIsIDIyLjM1MTM0NTkyNjYwNjk1N10sXG4gICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi4zMjQwMzU3ODU4NDAzOF0sXG4gICAgWzExNC4yOTIxNDQ3NzUzOTA2MiwgMjIuMzI3MjExNjU4Mzg4OTNdLFxuICAgIFsxMTQuMzAxNzU3ODEyNSwgMjIuMzExOTY2ODEwOTc3NjE2XSxcbiAgICBbMTE0LjI5NDIwNDcxMTkxNDA2LCAyMi4yOTEwMDI0Mjc3MzUzMjVdLFxuICAgIFsxMTQuMjkzNTE4MDY2NDA2MjUsIDIyLjI3MjU3NjU4NTQxMzQ3NV0sXG4gICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuMjYxNzc0MTAwOTc0MzVdLFxuICAgIFsxMTQuMjY4Nzk4ODI4MTI1LCAyMi4yODE0NzIxMjI3ODM4MThdLFxuICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuMjk0ODE0MzY3NzgwNTE4XSxcbiAgICBbMTE0LjI2OTQ4NTQ3MzYzMjgxLCAyMi4zMDI0Mzc5MzU5MDQ0OF0sXG4gICAgWzExNC4yNzAxNzIxMTkxNDA2MiwgMjIuMzE1MTQyOTU4MTY5MzldLFxuICAgIFsxMTQuMjU3ODEyNSwgMjIuMzExOTY2ODEwOTc3NjE2XSxcbiAgICBbMTE0LjI0NzUxMjgxNzM4MjgxLCAyMi4yOTk4OTY3OTI3NTE5MjddLFxuICAgIFsxMTQuMjQ1NDUyODgwODU5MzgsIDIyLjI5MTAwMjQyNzczNTMyNV0sXG4gICAgWzExNC4yMjk2NjAwMzQxNzk2OSwgMjIuMzA3NTIwMDgzNTIyNDc2XSxcbiAgICBbMTE0LjIyMDczMzY0MjU3ODEyLCAyMi4zMDU2MTQyOTk4MzcwNDZdLFxuICAgIFsxMTQuMjA1NjI3NDQxNDA2MjUsIDIyLjMyMDg1OTg0MTAwNTkzXVxuICBdKSxcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExNC4zMTU0OTA3MjI2NTYyNSwgMjIuMzM5Mjc5MzE0NjgzMTJdLFxuICAgIFsxMTQuMzIwMjk3MjQxMjEwOTQsIDIyLjMyNjU3NjQ4OTY2MjQ4Ml0sXG4gICAgWzExNC4zMjk5MTAyNzgzMjAzMSwgMjIuMzI2NTc2NDg5NjYyNDgyXSxcbiAgICBbMTE0LjMzMzM0MzUwNTg1OTM4LCAyMi4zMzIyOTI5MDQwOTE3MTZdLFxuICAgIFsxMTQuMzIzMDQzODIzMjQyMTksIDIyLjM0MjQ1NDg0MDE0NjVdLFxuICAgIFsxMTQuMzE1NDkwNzIyNjU2MjUsIDIyLjMzOTI3OTMxNDY4MzEyXVxuICBdKSxcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExNC4yNzkwOTg1MTA3NDIxOSwgMjIuMjQ0NjE1NTAwMzIzMDY0XSxcbiAgICBbMTE0LjI4MTE1ODQ0NzI2NTYyLCAyMi4yNTE2MDYyOTUxMzI5NDhdLFxuICAgIFsxMTQuMjg2NjUxNjExMzI4MTIsIDIyLjI1NTQxOTMwODg1ODU1Nl0sXG4gICAgWzExNC4yOTk2OTc4NzU5NzY1NiwgMjIuMjYxMTM4NjM0NzQ0NDldLFxuICAgIFsxMTQuMjk2MjY0NjQ4NDM3NSwgMjIuMjUwOTcwNzgyNzUwODY2XSxcbiAgICBbMTE0LjI5NDg5MTM1NzQyMTg4LCAyMi4yNDA4MDIxOTI0NjMzNV0sXG4gICAgWzExNC4yOTAwODQ4Mzg4NjcxNywgMjIuMjM4ODk1NDk5NjEzMjMyXSxcbiAgICBbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdXG4gIF0pXG5dLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZSxcbiAgLy8gcmVuZGVyZXI6IHJlbmRlcmVyLFxuICBjb2xvcjogJyMwOTInXG59KS5iaW5kUG9wdXAoJ011bHRpUG9seWdvbicpLmFkZFRvKG1hcCk7XG5cbnZhciBtdWx0aVBvbHlsaW5lID0gZ2xvYmFsLm11bHRpUG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODk4Njk2ODk5NDE0MDYsIDIyLjM5OTYwMTkyMTcwNjk1M10sXG4gICAgWzExMy44OTgwMTAyNTM5MDYyNSwgMjIuNDIyNDU0MTgxNzA5NzA3XSxcbiAgICBbMTEzLjkwMzUwMzQxNzk2ODc1LCAyMi40MzMyNDQyMTk3ODExN10sXG4gICAgWzExMy45MDk2ODMyMjc1MzkwNiwgMjIuNDQ5MTEwMzk4ODg2MTA2XSxcbiAgICBbMTEzLjkwNjkzNjY0NTUwNzgxLCAyMi40NzgyOTk0MjUxNjI4NTJdLFxuICAgIFsxMTMuOTIzNDE2MTM3Njk1MywgMjIuNDg4NDUwNjg4MzI1NDA4XSxcbiAgICBbMTEzLjkzMzcxNTgyMDMxMjUsIDIyLjQ4MzM3NTE0OTc4OTYyM10sXG4gICAgWzExMy45NDQ3MDIxNDg0Mzc1LCAyMi40OTIyNTcyMjAwODUxOTNdLFxuICAgIFsxMTMuOTUyMjU1MjQ5MDIzNDQsIDIyLjUxMjU1Njk1NDA1MTQ1XVxuICBdKSxcblxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTEzLjg2Nzc5Nzg1MTU2MjUsIDIyLjM5MjYxODUzNzEzNzM4XSxcbiAgICBbMTEzLjg2OTE3MTE0MjU3ODExLCAyMi40Mjc1MzE5NTExNTY5OV0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAyMi40NjI0MzY1ODY2NTMxNDhdLFxuICAgIFsxMTMuOTQ4MTM1Mzc1OTc2NTYsIDIyLjQ3Mzg1ODAxMzQ4NzYxNF0sXG4gICAgWzExMy45NzgzNDc3NzgzMjAzLCAyMi40OTkyMzU1ODk2ODMwNl0sXG4gICAgWzExMy45OTY4ODcyMDcwMzEyNSwgMjIuNTExOTIyNjMyNDY4ODZdLFxuICAgIFsxMTQuMDEzMzY2Njk5MjE4NzUsIDIyLjUwMTEzODcyMDMwMDI1NF0sXG4gICAgWzExNC4wMjUwMzk2NzI4NTE1NSwgMjIuNTA4MTE2NjQxODUzNjc1XVxuICBdKVxuXSwge1xuICBkcmFnZ2FibGU6IHRydWUsXG4gIGNvbG9yOiAnI2U5MCdcbn0pLmJpbmRQb3B1cCgnTXVsdGlQb2x5bGluZScpLmFkZFRvKG1hcCk7XG5cbnZhciBtYXJrZXIgPSBuZXcgTC5NYXJrZXIobWFwLmdldENlbnRlcigpLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZVxufSkuYWRkVG8obWFwKTtcbiJdfQ==
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
    this._restoreCoordGetters();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiZXhhbXBsZS9qcy9hcHAuanMiLCJpbmRleC5qcyIsInNyYy9DYW52YXMuanMiLCJzcmMvUGF0aC5EcmFnLmpzIiwic3JjL1BhdGguVHJhbnNmb3JtLmpzIiwic3JjL1NWRy5WTUwuanMiLCJzcmMvU1ZHLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25PQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBMID0gZ2xvYmFsLkw7XG4vLyBMLkJyb3dzZXIucmV0aW5hID0gdHJ1ZTtcbnZhciBEcmFnSGFuZGxlciA9IHJlcXVpcmUoJy4uLy4uL2luZGV4Jyk7XG5cbkwuSWNvbi5EZWZhdWx0LmltYWdlUGF0aCA9IFwibGVhZmxldC1tYXN0ZXIvaW1hZ2VzXCI7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbWFwID0gZ2xvYmFsLm1hcCA9IG5ldyBMLk1hcCgnbWFwJywge1xuICAvLyBjcnM6IEwuQ1JTLkVQU0c0MzI2IC8vIHRoYXQgd2FzIHRlc3RlZCBhcyB3ZWxsXG59KS5zZXRWaWV3KFsyMi40MjY1OCwgMTE0LjE5NTJdLCAxMSk7XG5cbnZhciByZW5kZXJlciA9IG5ldyBMLkNhbnZhcygpO1xuXG5MLnRpbGVMYXllcignaHR0cDovL3tzfS50aWxlLm9zbS5vcmcve3p9L3t4fS97eX0ucG5nJywge1xuICBhdHRyaWJ1dGlvbjogJyZjb3B5OyAnICtcbiAgICAnPGEgaHJlZj1cImh0dHA6Ly9vc20ub3JnL2NvcHlyaWdodFwiPk9wZW5TdHJlZXRNYXA8L2E+IGNvbnRyaWJ1dG9ycydcbn0pLmFkZFRvKG1hcCk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFycihhcnJheSwgaW5zZXJ0KSB7XG4gIHZhciByZXMgPSBbXTtcbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihwLCBpLCBhcnIpIHtcbiAgICByZXMucHVzaChwLmNvbmNhdCgpKTtcblxuICAgIGlmIChpIDwgYXJyLmxlbmd0aCAtIDEpIHtcbiAgICAgIHZhciBkaWZmID0gW2FycltpICsgMV1bMF0gLSBwWzBdLCBhcnJbaSArIDFdWzFdIC0gcFsxXV07XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGluc2VydDsgaSsrKSB7XG4gICAgICAgIHJlcy5wdXNoKFtwWzBdICsgKGRpZmZbMF0gKiBpKSAvIGluc2VydCwgcFsxXSArIChkaWZmWzFdICogaSkgLyBpbnNlcnRdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiByZXM7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgcG9seWdvbiA9IGdsb2JhbC5wb2x5Z29uID0gbmV3IEwuUG9seWdvbihcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhcblxuICAgIC8vIH4gMTMgMDAwIHBvaW50c1xuICAgIGludGVycG9sYXRlQXJyKFtcbiAgICAgIFsxMTMuOTc2OTc0NDg3MzA0NjksIDIyLjQwMzQxMDg5MjcxMjEyNF0sXG4gICAgICBbMTEzLjk4NjU4NzUyNDQxNDA1LCAyMi4zODM3MzAwODU5MjQ5NV0sXG4gICAgICBbMTE0LjAxMjY4MDA1MzcxMDk0LCAyMi4zNjkxMjYzOTc1NDU4ODddLFxuICAgICAgWzExNC4wMjc3ODYyNTQ4ODI4MSwgMjIuMzg1NjM0ODAxODU3MThdLFxuICAgICAgWzExNC4wNDcwMTIzMjkxMDE1NiwgMjIuMzk1MTU3OTkwMjkwNzU1XSxcbiAgICAgIFsxMTQuMDYwMDU4NTkzNzUsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICBbMTE0LjA2MjgwNTE3NTc4MTI1LCAyMi40MzI2MDk1MzQ4NzY3OTZdLFxuICAgICAgWzExNC4wNDgzODU2MjAxMTcxNywgMjIuNDQ0NjY4MDUxNjU3MTU3XSxcbiAgICAgIFsxMTQuMDQyODkyNDU2MDU0NjksIDIyLjQ0ODQ3NTc4NjU2NTQ0XSxcbiAgICAgIFsxMTQuMDMyNTkyNzczNDM3NDksIDIyLjQ0NDY2ODA1MTY1NzE1N10sXG4gICAgICBbMTE0LjAxOTU0NjUwODc4OTA2LCAyMi40NDcyMDY1NTMyMTE4MTRdLFxuICAgICAgWzExMy45OTYyMDA1NjE1MjM0NCwgMjIuNDM2NDE3NjAwNzYzMTE0XSxcbiAgICAgIFsxMTMuOTgxNzgxMDA1ODU5MzgsIDIyLjQyMDU0OTk3MDI5MDg3NV0sXG4gICAgICBbMTEzLjk3Njk3NDQ4NzMwNDY5LCAyMi40MDM0MTA4OTI3MTIxMjRdXG4gICAgXSwgMTAwMClcbiAgKSwge1xuICAgIGNvbG9yOiAnI2YwMCcsXG4gICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgIHJlbmRlcmVyOiByZW5kZXJlclxuICB9KS5hZGRUbyhtYXApO1xuXG52YXIgcG9seWxpbmUgPSBnbG9iYWwucG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShcbiAgICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICAgIFsxMTQuMTQzMTQyNzAwMTk1MzEsIDIyLjQ5NDc5NDg0OTc1NDQzXSxcbiAgICAgIFsxMTQuMTUzNDQyMzgyODEyNSwgMjIuNDg1OTEyOTQyMzIwOTU4XSxcbiAgICAgIFsxMTQuMTUyMDY5MDkxNzk2ODgsIDIyLjQ3MzIyMzUxNDQ3ODFdLFxuICAgICAgWzExNC4xNDkzMjI1MDk3NjU2MSwgMjIuNDU5ODk4MzYzOTQzODkzXSxcbiAgICAgIFsxMTQuMTU5NjIyMTkyMzgyODEsIDIyLjQ0NzIwNjU1MzIxMTgxNF0sXG4gICAgICBbMTE0LjE2OTkyMTg3NSwgMjIuNDQ3MjA2NTUzMjExODE0XSxcbiAgICAgIFsxMTQuMTkzOTU0NDY3NzczNDQsIDIyLjQ1OTg5ODM2Mzk0Mzg5M10sXG4gICAgICBbMTE0LjIwNjMxNDA4NjkxNDA2LCAyMi40NjExNjc0ODExMDkzNV0sXG4gICAgICBbMTE0LjIxMTgwNzI1MDk3NjU1LCAyMi40NzM4NTgwMTM0ODc2MTRdLFxuICAgICAgWzExNC4yMjQxNjY4NzAxMTcxOSwgMjIuNDcxMzIwMDAwMDA5OTkyXSxcbiAgICAgIFsxMTQuMjM3MjEzMTM0NzY1NjIsIDIyLjQ3NjM5NTk4MDQ1Nzk3M10sXG4gICAgICBbMTE0LjI0MjAxOTY1MzMyMDMxLCAyMi40OTM1MjYwNDA3MzcyMl0sXG4gICAgICBbMTE0LjIzMDM0NjY3OTY4NzUsIDIyLjUxNTcyODUxODMwMzUxXSxcbiAgICAgIFsxMTQuMjE3OTg3MDYwNTQ2ODgsIDIyLjUyNDYwODUxMTAyNjI2Ml0sXG4gICAgICBbMTE0LjIwNzY4NzM3NzkyOTY5LCAyMi41MjQ2MDg1MTEwMjYyNjJdLFxuICAgICAgWzExNC4yMDc2ODczNzc5Mjk2OSwgMjIuNTM2MDI0ODA1ODg2OTc0XVxuICAgIF0pLCB7XG4gICAgICB3ZWlnaHQ6IDE1LFxuICAgICAgZHJhZ2dhYmxlOiB0cnVlXG4gICAgfSlcbiAgLmFkZFRvKG1hcClcbiAgLmJpbmRQb3B1cChcIkknbSBhIHBvbHlsaW5lXCIpO1xuXG52YXIgcG9seWdvbldpdGhIb2xlID0gZ2xvYmFsLnBvbHlnb25XaXRoSG9sZSA9IG5ldyBMLlBvbHlnb24oXG4gICAgW1xuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuNDEyOTMyODYzNTE3NzE3XSxcbiAgICAgICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuNDAwODcxNTkwMzA1OTVdLFxuICAgICAgICBbMTE0LjI5MDA4NDgzODg2NzE3LCAyMi4zODg4MDkyNzA0NTU1Nl0sXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjM4MjQ2MDI2MDgxNTcxNl0sXG4gICAgICAgIFsxMTQuMzE4OTIzOTUwMTk1MzEsIDIyLjM5MTk4MzY2NjYwMjc4M10sXG4gICAgICAgIFsxMTQuMzIzMDQzODIzMjQyMTksIDIyLjM4MDU1NTUwMTQyMTUzM10sXG4gICAgICAgIFsxMTQuMzQyOTU2NTQyOTY4NzUsIDIyLjM3MjkzNjIwMzExMzgzOF0sXG4gICAgICAgIFsxMTQuMzM0NzE2Nzk2ODc1LCAyMi4zODQzNjQ5OTQxMzMzMDNdLFxuICAgICAgICBbMTE0LjMzMDU5NjkyMzgyODEyLCAyMi4zOTM4ODgyNjk1MTExOTRdLFxuICAgICAgICBbMTE0LjMyMTY3MDUzMjIyNjU1LCAyMi40MDA4NzE1OTAzMDU5NV0sXG4gICAgICAgIFsxMTQuMzI3ODUwMzQxNzk2ODgsIDIyLjQxMzU2NzYzODM2OTgwNV0sXG4gICAgICAgIFsxMTQuMzMxOTcwMjE0ODQzNzUsIDIyLjQyNDk5MzA4OTY0NzIyXSxcbiAgICAgICAgWzExNC4zMjU3OTA0MDUyNzM0NCwgMjIuNDMwNzA1NDYyNzQ4OTE4XSxcbiAgICAgICAgWzExNC4zMzE5NzAyMTQ4NDM3NSwgMjIuNDM5NTkwOTA5MTcyNjZdLFxuICAgICAgICBbMTE0LjMzNzQ2MzM3ODkwNjI0LCAyMi40NDkxMTAzOTg4ODYxMDZdLFxuICAgICAgICBbMTE0LjMzNTQwMzQ0MjM4MjgxLCAyMi40NjE4MDIwMzUzMzM5OTJdLFxuICAgICAgICBbMTE0LjMyNTEwMzc1OTc2NTYyLCAyMi40NjQzNDAyMjMxNzcxMThdLFxuICAgICAgICBbMTE0LjMyOTIyMzYzMjgxMjQ5LCAyMi40NzI1ODkwMTI1NjE5NTRdLFxuICAgICAgICBbMTE0LjMyMzczMDQ2ODc1LCAyMi40NzcwMzA0NjQ5MzMzMDddLFxuICAgICAgICBbMTE0LjMxOTYxMDU5NTcwMzEyLCAyMi40Nzg5MzM5MDA5MTY5MjhdLFxuICAgICAgICBbMTE0LjMwMTc1NzgxMjUsIDIyLjQ2NjI0MzgzMzU0OTQ0NV0sXG4gICAgICAgIFsxMTQuMzAyNDQ0NDU4MDA3ODEsIDIyLjQ1NzM2MDA5NDc1MDA4M10sXG4gICAgICAgIFsxMTQuMjkyODMxNDIwODk4NDQsIDIyLjQ1NDgyMTc3OTA3NTgzMl0sXG4gICAgICAgIFsxMTQuMjgzOTA1MDI5Mjk2ODgsIDIyLjQ1MTAxNDIxODQyMjY5XSxcbiAgICAgICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi40NDI3NjQxNDUwMDE3MDddLFxuICAgICAgICBbMTE0LjI5MDc3MTQ4NDM3NDk5LCAyMi40MjgxNjY2NTkyNzk2MTVdLFxuICAgICAgICBbMTE0LjI3NzAzODU3NDIxODc1LCAyMi40MjA1NDk5NzAyOTA4NzVdLFxuICAgICAgICBbMTE0LjI3NDk3ODYzNzY5NTMsIDIyLjQxMjkzMjg2MzUxNzcxN11cbiAgICAgIF0pLFxuICAgICAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgICAgIFsxMTQuMzAxMDcxMTY2OTkyMTksIDIyLjQzMzg3ODkwMTc4Mjk3XSxcbiAgICAgICAgWzExNC4yOTM1MTgwNjY0MDYyNSwgMjIuNDE0MjAyNDEwMzIxMzAyXSxcbiAgICAgICAgWzExNC4zMDU4Nzc2ODU1NDY4NiwgMjIuNDA4NDg5MzU4MzQyNjM1XSxcbiAgICAgICAgWzExNC4zMjIzNTcxNzc3MzQzOCwgMjIuNDIxMTg0NzEwMzMxODU4XSxcbiAgICAgICAgWzExNC4zMDEwNzExNjY5OTIxOSwgMjIuNDMzODc4OTAxNzgyOTddXG4gICAgICBdKVxuICAgIF0sIHtcbiAgICAgIGRyYWdnYWJsZTogdHJ1ZS8vLFxuICAgICAgLy9yZW5kZXJlcjogcmVuZGVyZXJcbiAgICB9XG4gIClcbiAgLmFkZFRvKG1hcClcbiAgLmJpbmRQb3B1cChcIkknbSBhIHBvbHlnb24gd2l0aCBob2xlXCIpO1xuXG52YXIgY2lyY2xlID0gZ2xvYmFsLmNpcmNsZSA9IG5ldyBMLkNpcmNsZShbMjIuMzYwODk3MjQwMTMyMzczLCAxMTQuMTQ1MjAyNjM2NzE4NzVdLCA0MDAwLCB7XG4gICAgZHJhZ2dhYmxlOiB0cnVlXG4gIH0pXG4gIC5iaW5kUG9wdXAoXCJMLkNpcmNsZVwiKVxuICAuYWRkVG8obWFwKVxuXG52YXIgY2lyY2xlTWFya2VyID0gbmV3IEwuQ2lyY2xlTWFya2VyKG1hcC5nZXRDZW50ZXIoKSwge1xuICAgIGRyYWdnYWJsZTogdHJ1ZSxcbiAgICByZW5kZXJlcjogcmVuZGVyZXJcbiAgfSlcbiAgLmJpbmRQb3B1cChcIkwuQ2lyY2xlTWFya2VyXCIpXG4gIC5hZGRUbyhtYXApO1xuXG52YXIgbXVsdGlQb2x5Z29uID0gZ2xvYmFsLm11bHRpUG9seWdvbiA9IG5ldyBMLlBvbHlnb24oW1xuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTE0LjIwNTYyNzQ0MTQwNjI1LCAyMi4zMjA4NTk4NDEwMDU5M10sXG4gICAgWzExNC4yMTU5MjcxMjQwMjM0NCwgMjIuMzUyNjE2MDM1NTEyMTVdLFxuICAgIFsxMTQuMjY0Njc4OTU1MDc4MTIsIDIyLjM1MTM0NTkyNjYwNjk1N10sXG4gICAgWzExNC4yNzQ5Nzg2Mzc2OTUzLCAyMi4zMjQwMzU3ODU4NDAzOF0sXG4gICAgWzExNC4yOTIxNDQ3NzUzOTA2MiwgMjIuMzI3MjExNjU4Mzg4OTNdLFxuICAgIFsxMTQuMzAxNzU3ODEyNSwgMjIuMzExOTY2ODEwOTc3NjE2XSxcbiAgICBbMTE0LjI5NDIwNDcxMTkxNDA2LCAyMi4yOTEwMDI0Mjc3MzUzMjVdLFxuICAgIFsxMTQuMjkzNTE4MDY2NDA2MjUsIDIyLjI3MjU3NjU4NTQxMzQ3NV0sXG4gICAgWzExNC4yODM5MDUwMjkyOTY4OCwgMjIuMjYxNzc0MTAwOTc0MzVdLFxuICAgIFsxMTQuMjY4Nzk4ODI4MTI1LCAyMi4yODE0NzIxMjI3ODM4MThdLFxuICAgIFsxMTQuMjc0OTc4NjM3Njk1MywgMjIuMjk0ODE0MzY3NzgwNTE4XSxcbiAgICBbMTE0LjI2OTQ4NTQ3MzYzMjgxLCAyMi4zMDI0Mzc5MzU5MDQ0OF0sXG4gICAgWzExNC4yNzAxNzIxMTkxNDA2MiwgMjIuMzE1MTQyOTU4MTY5MzldLFxuICAgIFsxMTQuMjU3ODEyNSwgMjIuMzExOTY2ODEwOTc3NjE2XSxcbiAgICBbMTE0LjI0NzUxMjgxNzM4MjgxLCAyMi4yOTk4OTY3OTI3NTE5MjddLFxuICAgIFsxMTQuMjQ1NDUyODgwODU5MzgsIDIyLjI5MTAwMjQyNzczNTMyNV0sXG4gICAgWzExNC4yMjk2NjAwMzQxNzk2OSwgMjIuMzA3NTIwMDgzNTIyNDc2XSxcbiAgICBbMTE0LjIyMDczMzY0MjU3ODEyLCAyMi4zMDU2MTQyOTk4MzcwNDZdLFxuICAgIFsxMTQuMjA1NjI3NDQxNDA2MjUsIDIyLjMyMDg1OTg0MTAwNTkzXVxuICBdKSxcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExNC4zMTU0OTA3MjI2NTYyNSwgMjIuMzM5Mjc5MzE0NjgzMTJdLFxuICAgIFsxMTQuMzIwMjk3MjQxMjEwOTQsIDIyLjMyNjU3NjQ4OTY2MjQ4Ml0sXG4gICAgWzExNC4zMjk5MTAyNzgzMjAzMSwgMjIuMzI2NTc2NDg5NjYyNDgyXSxcbiAgICBbMTE0LjMzMzM0MzUwNTg1OTM4LCAyMi4zMzIyOTI5MDQwOTE3MTZdLFxuICAgIFsxMTQuMzIzMDQzODIzMjQyMTksIDIyLjM0MjQ1NDg0MDE0NjVdLFxuICAgIFsxMTQuMzE1NDkwNzIyNjU2MjUsIDIyLjMzOTI3OTMxNDY4MzEyXVxuICBdKSxcbiAgTC5HZW9KU09OLmNvb3Jkc1RvTGF0TG5ncyhbXG4gICAgWzExNC4yNzkwOTg1MTA3NDIxOSwgMjIuMjQ0NjE1NTAwMzIzMDY0XSxcbiAgICBbMTE0LjI4MTE1ODQ0NzI2NTYyLCAyMi4yNTE2MDYyOTUxMzI5NDhdLFxuICAgIFsxMTQuMjg2NjUxNjExMzI4MTIsIDIyLjI1NTQxOTMwODg1ODU1Nl0sXG4gICAgWzExNC4yOTk2OTc4NzU5NzY1NiwgMjIuMjYxMTM4NjM0NzQ0NDldLFxuICAgIFsxMTQuMjk2MjY0NjQ4NDM3NSwgMjIuMjUwOTcwNzgyNzUwODY2XSxcbiAgICBbMTE0LjI5NDg5MTM1NzQyMTg4LCAyMi4yNDA4MDIxOTI0NjMzNV0sXG4gICAgWzExNC4yOTAwODQ4Mzg4NjcxNywgMjIuMjM4ODk1NDk5NjEzMjMyXSxcbiAgICBbMTE0LjI3OTA5ODUxMDc0MjE5LCAyMi4yNDQ2MTU1MDAzMjMwNjRdXG4gIF0pXG5dLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZSxcbiAgLy8gcmVuZGVyZXI6IHJlbmRlcmVyLFxuICBjb2xvcjogJyMwOTInXG59KS5iaW5kUG9wdXAoJ011bHRpUG9seWdvbicpLmFkZFRvKG1hcCk7XG5cbnZhciBtdWx0aVBvbHlsaW5lID0gZ2xvYmFsLm11bHRpUG9seWxpbmUgPSBuZXcgTC5Qb2x5bGluZShbXG4gIEwuR2VvSlNPTi5jb29yZHNUb0xhdExuZ3MoW1xuICAgIFsxMTMuODk4Njk2ODk5NDE0MDYsIDIyLjM5OTYwMTkyMTcwNjk1M10sXG4gICAgWzExMy44OTgwMTAyNTM5MDYyNSwgMjIuNDIyNDU0MTgxNzA5NzA3XSxcbiAgICBbMTEzLjkwMzUwMzQxNzk2ODc1LCAyMi40MzMyNDQyMTk3ODExN10sXG4gICAgWzExMy45MDk2ODMyMjc1MzkwNiwgMjIuNDQ5MTEwMzk4ODg2MTA2XSxcbiAgICBbMTEzLjkwNjkzNjY0NTUwNzgxLCAyMi40NzgyOTk0MjUxNjI4NTJdLFxuICAgIFsxMTMuOTIzNDE2MTM3Njk1MywgMjIuNDg4NDUwNjg4MzI1NDA4XSxcbiAgICBbMTEzLjkzMzcxNTgyMDMxMjUsIDIyLjQ4MzM3NTE0OTc4OTYyM10sXG4gICAgWzExMy45NDQ3MDIxNDg0Mzc1LCAyMi40OTIyNTcyMjAwODUxOTNdLFxuICAgIFsxMTMuOTUyMjU1MjQ5MDIzNDQsIDIyLjUxMjU1Njk1NDA1MTQ1XVxuICBdKSxcblxuICBMLkdlb0pTT04uY29vcmRzVG9MYXRMbmdzKFtcbiAgICBbMTEzLjg2Nzc5Nzg1MTU2MjUsIDIyLjM5MjYxODUzNzEzNzM4XSxcbiAgICBbMTEzLjg2OTE3MTE0MjU3ODExLCAyMi40Mjc1MzE5NTExNTY5OV0sXG4gICAgWzExMy45MjM0MTYxMzc2OTUzLCAyMi40NjI0MzY1ODY2NTMxNDhdLFxuICAgIFsxMTMuOTQ4MTM1Mzc1OTc2NTYsIDIyLjQ3Mzg1ODAxMzQ4NzYxNF0sXG4gICAgWzExMy45NzgzNDc3NzgzMjAzLCAyMi40OTkyMzU1ODk2ODMwNl0sXG4gICAgWzExMy45OTY4ODcyMDcwMzEyNSwgMjIuNTExOTIyNjMyNDY4ODZdLFxuICAgIFsxMTQuMDEzMzY2Njk5MjE4NzUsIDIyLjUwMTEzODcyMDMwMDI1NF0sXG4gICAgWzExNC4wMjUwMzk2NzI4NTE1NSwgMjIuNTA4MTE2NjQxODUzNjc1XVxuICBdKVxuXSwge1xuICBkcmFnZ2FibGU6IHRydWUsXG4gIGNvbG9yOiAnI2U5MCdcbn0pLmJpbmRQb3B1cCgnTXVsdGlQb2x5bGluZScpLmFkZFRvKG1hcCk7XG5cbnZhciBtYXJrZXIgPSBuZXcgTC5NYXJrZXIobWFwLmdldENlbnRlcigpLCB7XG4gIGRyYWdnYWJsZTogdHJ1ZVxufSkuYWRkVG8obWFwKTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVY0WVcxd2JHVXZhbk12WVhCd0xtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSTdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRWlMQ0ptYVd4bElqb2laMlZ1WlhKaGRHVmtMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW5aaGNpQk1JRDBnWjJ4dlltRnNMa3c3WEc0dkx5Qk1Ma0p5YjNkelpYSXVjbVYwYVc1aElEMGdkSEoxWlR0Y2JuWmhjaUJFY21GblNHRnVaR3hsY2lBOUlISmxjWFZwY21Vb0p5NHVMeTR1TDJsdVpHVjRKeWs3WEc1Y2Jrd3VTV052Ymk1RVpXWmhkV3gwTG1sdFlXZGxVR0YwYUNBOUlGd2liR1ZoWm14bGRDMXRZWE4wWlhJdmFXMWhaMlZ6WENJN1hHNWNiaTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZYRzUyWVhJZ2JXRndJRDBnWjJ4dlltRnNMbTFoY0NBOUlHNWxkeUJNTGsxaGNDZ25iV0Z3Snl3Z2UxeHVJQ0F2THlCamNuTTZJRXd1UTFKVExrVlFVMGMwTXpJMklDOHZJSFJvWVhRZ2QyRnpJSFJsYzNSbFpDQmhjeUIzWld4c1hHNTlLUzV6WlhSV2FXVjNLRnN5TWk0ME1qWTFPQ3dnTVRFMExqRTVOVEpkTENBeE1TazdYRzVjYm5aaGNpQnlaVzVrWlhKbGNpQTlJRzVsZHlCTUxrTmhiblpoY3lncE8xeHVYRzVNTG5ScGJHVk1ZWGxsY2lnbmFIUjBjRG92TDN0emZTNTBhV3hsTG05emJTNXZjbWN2ZTNwOUwzdDRmUzk3ZVgwdWNHNW5KeXdnZTF4dUlDQmhkSFJ5YVdKMWRHbHZiam9nSnlaamIzQjVPeUFuSUN0Y2JpQWdJQ0FuUEdFZ2FISmxaajFjSW1oMGRIQTZMeTl2YzIwdWIzSm5MMk52Y0hseWFXZG9kRndpUGs5d1pXNVRkSEpsWlhSTllYQThMMkUrSUdOdmJuUnlhV0oxZEc5eWN5ZGNibjBwTG1Ga1pGUnZLRzFoY0NrN1hHNWNiaTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZYRzVtZFc1amRHbHZiaUJwYm5SbGNuQnZiR0YwWlVGeWNpaGhjbkpoZVN3Z2FXNXpaWEowS1NCN1hHNGdJSFpoY2lCeVpYTWdQU0JiWFR0Y2JpQWdZWEp5WVhrdVptOXlSV0ZqYUNobWRXNWpkR2x2Ymlod0xDQnBMQ0JoY25JcElIdGNiaUFnSUNCeVpYTXVjSFZ6YUNod0xtTnZibU5oZENncEtUdGNibHh1SUNBZ0lHbG1JQ2hwSUR3Z1lYSnlMbXhsYm1kMGFDQXRJREVwSUh0Y2JpQWdJQ0FnSUhaaGNpQmthV1ptSUQwZ1cyRnljbHRwSUNzZ01WMWJNRjBnTFNCd1d6QmRMQ0JoY25KYmFTQXJJREZkV3pGZElDMGdjRnN4WFYwN1hHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCcElEMGdNVHNnYVNBOElHbHVjMlZ5ZERzZ2FTc3JLU0I3WEc0Z0lDQWdJQ0FnSUhKbGN5NXdkWE5vS0Z0d1d6QmRJQ3NnS0dScFptWmJNRjBnS2lCcEtTQXZJR2x1YzJWeWRDd2djRnN4WFNBcklDaGthV1ptV3pGZElDb2dhU2tnTHlCcGJuTmxjblJkS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lIMHBPMXh1WEc0Z0lISmxkSFZ5YmlCeVpYTTdYRzU5WEc1Y2JpOHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dkx5OHZMeTh2THk4dlhHNTJZWElnY0c5c2VXZHZiaUE5SUdkc2IySmhiQzV3YjJ4NVoyOXVJRDBnYm1WM0lFd3VVRzlzZVdkdmJpaGNiaUFnVEM1SFpXOUtVMDlPTG1OdmIzSmtjMVJ2VEdGMFRHNW5jeWhjYmx4dUlDQWdJQzh2SUg0Z01UTWdNREF3SUhCdmFXNTBjMXh1SUNBZ0lHbHVkR1Z5Y0c5c1lYUmxRWEp5S0Z0Y2JpQWdJQ0FnSUZzeE1UTXVPVGMyT1RjME5EZzNNekEwTmprc0lESXlMalF3TXpReE1EZzVNamN4TWpFeU5GMHNYRzRnSUNBZ0lDQmJNVEV6TGprNE5qVTROelV5TkRReE5EQTFMQ0F5TWk0ek9ETTNNekF3T0RVNU1qUTVOVjBzWEc0Z0lDQWdJQ0JiTVRFMExqQXhNalk0TURBMU16Y3hNRGswTENBeU1pNHpOamt4TWpZek9UYzFORFU0T0RkZExGeHVJQ0FnSUNBZ1d6RXhOQzR3TWpjM09EWXlOVFE0T0RJNE1Td2dNakl1TXpnMU5qTTBPREF4T0RVM01UaGRMRnh1SUNBZ0lDQWdXekV4TkM0d05EY3dNVEl6TWpreE1ERTFOaXdnTWpJdU16azFNVFUzT1Rrd01qa3dOelUxWFN4Y2JpQWdJQ0FnSUZzeE1UUXVNRFl3TURVNE5Ua3pOelVzSURJeUxqUXhNelUyTnpZek9ETTJPVGd3TlYwc1hHNGdJQ0FnSUNCYk1URTBMakEyTWpnd05URTNOVGM0TVRJMUxDQXlNaTQwTXpJMk1EazFNelE0TnpZM09UWmRMRnh1SUNBZ0lDQWdXekV4TkM0d05EZ3pPRFUyTWpBeE1UY3hOeXdnTWpJdU5EUTBOalk0TURVeE5qVTNNVFUzWFN4Y2JpQWdJQ0FnSUZzeE1UUXVNRFF5T0RreU5EVTJNRFUwTmprc0lESXlMalEwT0RRM05UYzROalUyTlRRMFhTeGNiaUFnSUNBZ0lGc3hNVFF1TURNeU5Ua3lOemN6TkRNM05Ea3NJREl5TGpRME5EWTJPREExTVRZMU56RTFOMTBzWEc0Z0lDQWdJQ0JiTVRFMExqQXhPVFUwTmpVd09EYzRPVEEyTENBeU1pNDBORGN5TURZMU5UTXlNVEU0TVRSZExGeHVJQ0FnSUNBZ1d6RXhNeTQ1T1RZeU1EQTFOakUxTWpNME5Dd2dNakl1TkRNMk5ERTNOakF3TnpZek1URTBYU3hjYmlBZ0lDQWdJRnN4TVRNdU9UZ3hOemd4TURBMU9EVTVNemdzSURJeUxqUXlNRFUwT1RrM01ESTVNRGczTlYwc1hHNGdJQ0FnSUNCYk1URXpMamszTmprM05EUTROek13TkRZNUxDQXlNaTQwTURNME1UQTRPVEkzTVRJeE1qUmRYRzRnSUNBZ1hTd2dNVEF3TUNsY2JpQWdLU3dnZTF4dUlDQWdJR052Ykc5eU9pQW5JMll3TUNjc1hHNGdJQ0FnWkhKaFoyZGhZbXhsT2lCMGNuVmxMRnh1SUNBZ0lISmxibVJsY21WeU9pQnlaVzVrWlhKbGNseHVJQ0I5S1M1aFpHUlVieWh0WVhBcE8xeHVYRzUyWVhJZ2NHOXNlV3hwYm1VZ1BTQm5iRzlpWVd3dWNHOXNlV3hwYm1VZ1BTQnVaWGNnVEM1UWIyeDViR2x1WlNoY2JpQWdJQ0JNTGtkbGIwcFRUMDR1WTI5dmNtUnpWRzlNWVhSTWJtZHpLRnRjYmlBZ0lDQWdJRnN4TVRRdU1UUXpNVFF5TnpBd01UazFNekVzSURJeUxqUTVORGM1TkRnME9UYzFORFF6WFN4Y2JpQWdJQ0FnSUZzeE1UUXVNVFV6TkRReU16Z3lPREV5TlN3Z01qSXVORGcxT1RFeU9UUXlNekl3T1RVNFhTeGNiaUFnSUNBZ0lGc3hNVFF1TVRVeU1EWTVNRGt4TnprMk9EZ3NJREl5TGpRM016SXlNelV4TkRRM09ERmRMRnh1SUNBZ0lDQWdXekV4TkM0eE5Ea3pNakkxTURrM05qVTJNU3dnTWpJdU5EVTVPRGs0TXpZek9UUXpPRGt6WFN4Y2JpQWdJQ0FnSUZzeE1UUXVNVFU1TmpJeU1Ua3lNemd5T0RFc0lESXlMalEwTnpJd05qVTFNekl4TVRneE5GMHNYRzRnSUNBZ0lDQmJNVEUwTGpFMk9Ua3lNVGczTlN3Z01qSXVORFEzTWpBMk5UVXpNakV4T0RFMFhTeGNiaUFnSUNBZ0lGc3hNVFF1TVRrek9UVTBORFkzTnpjek5EUXNJREl5TGpRMU9UZzVPRE0yTXprME16ZzVNMTBzWEc0Z0lDQWdJQ0JiTVRFMExqSXdOak14TkRBNE5qa3hOREEyTENBeU1pNDBOakV4TmpjME9ERXhNRGt6TlYwc1hHNGdJQ0FnSUNCYk1URTBMakl4TVRnd056STFNRGszTmpVMUxDQXlNaTQwTnpNNE5UZ3dNVE0wT0RjMk1UUmRMRnh1SUNBZ0lDQWdXekV4TkM0eU1qUXhOalk0TnpBeE1UY3hPU3dnTWpJdU5EY3hNekl3TURBd01EQTVPVGt5WFN4Y2JpQWdJQ0FnSUZzeE1UUXVNak0zTWpFek1UTTBOelkxTmpJc0lESXlMalEzTmpNNU5UazRNRFExTnprM00xMHNYRzRnSUNBZ0lDQmJNVEUwTGpJME1qQXhPVFkxTXpNeU1ETXhMQ0F5TWk0ME9UTTFNall3TkRBM016Y3lNbDBzWEc0Z0lDQWdJQ0JiTVRFMExqSXpNRE0wTmpZM09UWTROelVzSURJeUxqVXhOVGN5T0RVeE9ETXdNelV4WFN4Y2JpQWdJQ0FnSUZzeE1UUXVNakUzT1RnM01EWXdOVFEyT0Rnc0lESXlMalV5TkRZd09EVXhNVEF5TmpJMk1sMHNYRzRnSUNBZ0lDQmJNVEUwTGpJd056WTROek0zTnpreU9UWTVMQ0F5TWk0MU1qUTJNRGcxTVRFd01qWXlOakpkTEZ4dUlDQWdJQ0FnV3pFeE5DNHlNRGMyT0Rjek56YzVNamsyT1N3Z01qSXVOVE0yTURJME9EQTFPRGcyT1RjMFhWeHVJQ0FnSUYwcExDQjdYRzRnSUNBZ0lDQjNaV2xuYUhRNklERTFMRnh1SUNBZ0lDQWdaSEpoWjJkaFlteGxPaUIwY25WbFhHNGdJQ0FnZlNsY2JpQWdMbUZrWkZSdktHMWhjQ2xjYmlBZ0xtSnBibVJRYjNCMWNDaGNJa2tuYlNCaElIQnZiSGxzYVc1bFhDSXBPMXh1WEc1MllYSWdjRzlzZVdkdmJsZHBkR2hJYjJ4bElEMGdaMnh2WW1Gc0xuQnZiSGxuYjI1WGFYUm9TRzlzWlNBOUlHNWxkeUJNTGxCdmJIbG5iMjRvWEc0Z0lDQWdXMXh1SUNBZ0lDQWdUQzVIWlc5S1UwOU9MbU52YjNKa2MxUnZUR0YwVEc1bmN5aGJYRzRnSUNBZ0lDQWdJRnN4TVRRdU1qYzBPVGM0TmpNM05qazFNeXdnTWpJdU5ERXlPVE15T0RZek5URTNOekUzWFN4Y2JpQWdJQ0FnSUNBZ1d6RXhOQzR5T0RNNU1EVXdNamt5T1RZNE9Dd2dNakl1TkRBd09EY3hOVGt3TXpBMU9UVmRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqSTVNREE0TkRnek9EZzJOekUzTENBeU1pNHpPRGc0TURreU56QTBOVFUxTmwwc1hHNGdJQ0FnSUNBZ0lGc3hNVFF1TXpBeE1EY3hNVFkyT1RreU1Ua3NJREl5TGpNNE1qUTJNREkyTURneE5UY3hObDBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNekU0T1RJek9UVXdNVGsxTXpFc0lESXlMak01TVRrNE16WTJOall3TWpjNE0xMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU16SXpNRFF6T0RJek1qUXlNVGtzSURJeUxqTTRNRFUxTlRVd01UUXlNVFV6TTEwc1hHNGdJQ0FnSUNBZ0lGc3hNVFF1TXpReU9UVTJOVFF5T1RZNE56VXNJREl5TGpNM01qa3pOakl3TXpFeE16Z3pPRjBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNek0wTnpFMk56azJPRGMxTENBeU1pNHpPRFF6TmpRNU9UUXhNek16TUROZExGeHVJQ0FnSUNBZ0lDQmJNVEUwTGpNek1EVTVOamt5TXpneU9ERXlMQ0F5TWk0ek9UTTRPRGd5TmprMU1URXhPVFJkTEZ4dUlDQWdJQ0FnSUNCYk1URTBMak15TVRZM01EVXpNakl5TmpVMUxDQXlNaTQwTURBNE56RTFPVEF6TURVNU5WMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU16STNPRFV3TXpReE56azJPRGdzSURJeUxqUXhNelUyTnpZek9ETTJPVGd3TlYwc1hHNGdJQ0FnSUNBZ0lGc3hNVFF1TXpNeE9UY3dNakUwT0RRek56VXNJREl5TGpReU5EazVNekE0T1RZME56SXlYU3hjYmlBZ0lDQWdJQ0FnV3pFeE5DNHpNalUzT1RBME1EVXlOek0wTkN3Z01qSXVORE13TnpBMU5EWXlOelE0T1RFNFhTeGNiaUFnSUNBZ0lDQWdXekV4TkM0ek16RTVOekF5TVRRNE5ETTNOU3dnTWpJdU5ETTVOVGt3T1RBNU1UY3lOalpkTEZ4dUlDQWdJQ0FnSUNCYk1URTBMak16TnpRMk16TTNPRGt3TmpJMExDQXlNaTQwTkRreE1UQXpPVGc0T0RZeE1EWmRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqTXpOVFF3TXpRME1qTTRNamd4TENBeU1pNDBOakU0TURJd016VXpNek01T1RKZExGeHVJQ0FnSUNBZ0lDQmJNVEUwTGpNeU5URXdNemMxT1RjMk5UWXlMQ0F5TWk0ME5qUXpOREF5TWpNeE56Y3hNVGhkTEZ4dUlDQWdJQ0FnSUNCYk1URTBMak15T1RJeU16WXpNamd4TWpRNUxDQXlNaTQwTnpJMU9Ea3dNVEkxTmpFNU5UUmRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqTXlNemN6TURRMk9EYzFMQ0F5TWk0ME56Y3dNekEwTmpRNU16TXpNRGRkTEZ4dUlDQWdJQ0FnSUNCYk1URTBMak14T1RZeE1EVTVOVGN3TXpFeUxDQXlNaTQwTnpnNU16TTVNREE1TVRZNU1qaGRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqTXdNVGMxTnpneE1qVXNJREl5TGpRMk5qSTBNemd6TXpVME9UUTBOVjBzWEc0Z0lDQWdJQ0FnSUZzeE1UUXVNekF5TkRRME5EVTRNREEzT0RFc0lESXlMalExTnpNMk1EQTVORGMxTURBNE0xMHNYRzRnSUNBZ0lDQWdJRnN4TVRRdU1qa3lPRE14TkRJd09EazRORFFzSURJeUxqUTFORGd5TVRjM09UQTNOVGd6TWwwc1hHNGdJQ0FnSUNBZ0lGc3hNVFF1TWpnek9UQTFNREk1TWprMk9EZ3NJREl5TGpRMU1UQXhOREl4T0RReU1qWTVYU3hjYmlBZ0lDQWdJQ0FnV3pFeE5DNHlOelE1TnpnMk16YzJPVFV6TENBeU1pNDBOREkzTmpReE5EVXdNREUzTURkZExGeHVJQ0FnSUNBZ0lDQmJNVEUwTGpJNU1EYzNNVFE0TkRNM05EazVMQ0F5TWk0ME1qZ3hOalkyTlRreU56azJNVFZkTEZ4dUlDQWdJQ0FnSUNCYk1URTBMakkzTnpBek9EVTNOREl4T0RjMUxDQXlNaTQwTWpBMU5EazVOekF5T1RBNE56VmRMRnh1SUNBZ0lDQWdJQ0JiTVRFMExqSTNORGszT0RZek56WTVOVE1zSURJeUxqUXhNamt6TWpnMk16VXhOemN4TjExY2JpQWdJQ0FnSUYwcExGeHVJQ0FnSUNBZ1RDNUhaVzlLVTA5T0xtTnZiM0prYzFSdlRHRjBURzVuY3loYlhHNGdJQ0FnSUNBZ0lGc3hNVFF1TXpBeE1EY3hNVFkyT1RreU1Ua3NJREl5TGpRek16ZzNPRGt3TVRjNE1qazNYU3hjYmlBZ0lDQWdJQ0FnV3pFeE5DNHlPVE0xTVRnd05qWTBNRFl5TlN3Z01qSXVOREUwTWpBeU5ERXdNekl4TXpBeVhTeGNiaUFnSUNBZ0lDQWdXekV4TkM0ek1EVTROemMyT0RVMU5EWTROaXdnTWpJdU5EQTRORGc1TXpVNE16UXlOak0xWFN4Y2JpQWdJQ0FnSUNBZ1d6RXhOQzR6TWpJek5UY3hOemMzTXpRek9Dd2dNakl1TkRJeE1UZzBOekV3TXpNeE9EVTRYU3hjYmlBZ0lDQWdJQ0FnV3pFeE5DNHpNREV3TnpFeE5qWTVPVEl4T1N3Z01qSXVORE16T0RjNE9UQXhOemd5T1RkZFhHNGdJQ0FnSUNCZEtWeHVJQ0FnSUYwc0lIdGNiaUFnSUNBZ0lHUnlZV2RuWVdKc1pUb2dkSEoxWlM4dkxGeHVJQ0FnSUNBZ0x5OXlaVzVrWlhKbGNqb2djbVZ1WkdWeVpYSmNiaUFnSUNCOVhHNGdJQ2xjYmlBZ0xtRmtaRlJ2S0cxaGNDbGNiaUFnTG1KcGJtUlFiM0IxY0NoY0lra25iU0JoSUhCdmJIbG5iMjRnZDJsMGFDQm9iMnhsWENJcE8xeHVYRzUyWVhJZ1kybHlZMnhsSUQwZ1oyeHZZbUZzTG1OcGNtTnNaU0E5SUc1bGR5Qk1Ma05wY21Oc1pTaGJNakl1TXpZd09EazNNalF3TVRNeU16Y3pMQ0F4TVRRdU1UUTFNakF5TmpNMk56RTROelZkTENBME1EQXdMQ0I3WEc0Z0lDQWdaSEpoWjJkaFlteGxPaUIwY25WbFhHNGdJSDBwWEc0Z0lDNWlhVzVrVUc5d2RYQW9YQ0pNTGtOcGNtTnNaVndpS1Z4dUlDQXVZV1JrVkc4b2JXRndLVnh1WEc1MllYSWdZMmx5WTJ4bFRXRnlhMlZ5SUQwZ2JtVjNJRXd1UTJseVkyeGxUV0Z5YTJWeUtHMWhjQzVuWlhSRFpXNTBaWElvS1N3Z2UxeHVJQ0FnSUdSeVlXZG5ZV0pzWlRvZ2RISjFaU3hjYmlBZ0lDQnlaVzVrWlhKbGNqb2djbVZ1WkdWeVpYSmNiaUFnZlNsY2JpQWdMbUpwYm1SUWIzQjFjQ2hjSWt3dVEybHlZMnhsVFdGeWEyVnlYQ0lwWEc0Z0lDNWhaR1JVYnlodFlYQXBPMXh1WEc1MllYSWdiWFZzZEdsUWIyeDVaMjl1SUQwZ1oyeHZZbUZzTG0xMWJIUnBVRzlzZVdkdmJpQTlJRzVsZHlCTUxsQnZiSGxuYjI0b1cxeHVJQ0JNTGtkbGIwcFRUMDR1WTI5dmNtUnpWRzlNWVhSTWJtZHpLRnRjYmlBZ0lDQmJNVEUwTGpJd05UWXlOelEwTVRRd05qSTFMQ0F5TWk0ek1qQTROVGs0TkRFd01EVTVNMTBzWEc0Z0lDQWdXekV4TkM0eU1UVTVNamN4TWpRd01qTTBOQ3dnTWpJdU16VXlOakUyTURNMU5URXlNVFZkTEZ4dUlDQWdJRnN4TVRRdU1qWTBOamM0T1RVMU1EYzRNVElzSURJeUxqTTFNVE0wTlRreU5qWXdOamsxTjEwc1hHNGdJQ0FnV3pFeE5DNHlOelE1TnpnMk16YzJPVFV6TENBeU1pNHpNalF3TXpVM09EVTROREF6T0Ywc1hHNGdJQ0FnV3pFeE5DNHlPVEl4TkRRM056VXpPVEEyTWl3Z01qSXVNekkzTWpFeE5qVTRNemc0T1ROZExGeHVJQ0FnSUZzeE1UUXVNekF4TnpVM09ERXlOU3dnTWpJdU16RXhPVFkyT0RFd09UYzNOakUyWFN4Y2JpQWdJQ0JiTVRFMExqSTVOREl3TkRjeE1Ua3hOREEyTENBeU1pNHlPVEV3TURJME1qYzNNelV6TWpWZExGeHVJQ0FnSUZzeE1UUXVNamt6TlRFNE1EWTJOREEyTWpVc0lESXlMakkzTWpVM05qVTROVFF4TXpRM05WMHNYRzRnSUNBZ1d6RXhOQzR5T0RNNU1EVXdNamt5T1RZNE9Dd2dNakl1TWpZeE56YzBNVEF3T1RjME16VmRMRnh1SUNBZ0lGc3hNVFF1TWpZNE56azRPREk0TVRJMUxDQXlNaTR5T0RFME56SXhNakkzT0RNNE1UaGRMRnh1SUNBZ0lGc3hNVFF1TWpjME9UYzROak0zTmprMU15d2dNakl1TWprME9ERTBNelkzTnpnd05URTRYU3hjYmlBZ0lDQmJNVEUwTGpJMk9UUTROVFEzTXpZek1qZ3hMQ0F5TWk0ek1ESTBNemM1TXpVNU1EUTBPRjBzWEc0Z0lDQWdXekV4TkM0eU56QXhOekl4TVRreE5EQTJNaXdnTWpJdU16RTFNVFF5T1RVNE1UWTVNemxkTEZ4dUlDQWdJRnN4TVRRdU1qVTNPREV5TlN3Z01qSXVNekV4T1RZMk9ERXdPVGMzTmpFMlhTeGNiaUFnSUNCYk1URTBMakkwTnpVeE1qZ3hOek00TWpneExDQXlNaTR5T1RrNE9UWTNPVEkzTlRFNU1qZGRMRnh1SUNBZ0lGc3hNVFF1TWpRMU5EVXlPRGd3T0RVNU16Z3NJREl5TGpJNU1UQXdNalF5Tnpjek5UTXlOVjBzWEc0Z0lDQWdXekV4TkM0eU1qazJOakF3TXpReE56azJPU3dnTWpJdU16QTNOVEl3TURnek5USXlORGMyWFN4Y2JpQWdJQ0JiTVRFMExqSXlNRGN6TXpZME1qVTNPREV5TENBeU1pNHpNRFUyTVRReU9UazRNemN3TkRaZExGeHVJQ0FnSUZzeE1UUXVNakExTmpJM05EUXhOREEyTWpVc0lESXlMak15TURnMU9UZzBNVEF3TlRrelhWeHVJQ0JkS1N4Y2JpQWdUQzVIWlc5S1UwOU9MbU52YjNKa2MxUnZUR0YwVEc1bmN5aGJYRzRnSUNBZ1d6RXhOQzR6TVRVME9UQTNNakkyTlRZeU5Td2dNakl1TXpNNU1qYzVNekUwTmpnek1USmRMRnh1SUNBZ0lGc3hNVFF1TXpJd01qazNNalF4TWpFd09UUXNJREl5TGpNeU5qVTNOalE0T1RZMk1qUTRNbDBzWEc0Z0lDQWdXekV4TkM0ek1qazVNVEF5Tnpnek1qQXpNU3dnTWpJdU16STJOVGMyTkRnNU5qWXlORGd5WFN4Y2JpQWdJQ0JiTVRFMExqTXpNek0wTXpVd05UZzFPVE00TENBeU1pNHpNekl5T1RJNU1EUXdPVEUzTVRaZExGeHVJQ0FnSUZzeE1UUXVNekl6TURRek9ESXpNalF5TVRrc0lESXlMak0wTWpRMU5EZzBNREUwTmpWZExGeHVJQ0FnSUZzeE1UUXVNekUxTkRrd056SXlOalUyTWpVc0lESXlMak16T1RJM09UTXhORFk0TXpFeVhWeHVJQ0JkS1N4Y2JpQWdUQzVIWlc5S1UwOU9MbU52YjNKa2MxUnZUR0YwVEc1bmN5aGJYRzRnSUNBZ1d6RXhOQzR5Tnprd09UZzFNVEEzTkRJeE9Td2dNakl1TWpRME5qRTFOVEF3TXpJek1EWTBYU3hjYmlBZ0lDQmJNVEUwTGpJNE1URTFPRFEwTnpJMk5UWXlMQ0F5TWk0eU5URTJNRFl5T1RVeE16STVORGhkTEZ4dUlDQWdJRnN4TVRRdU1qZzJOalV4TmpFeE16STRNVElzSURJeUxqSTFOVFF4T1RNd09EZzFPRFUxTmwwc1hHNGdJQ0FnV3pFeE5DNHlPVGsyT1RjNE56VTVOelkxTml3Z01qSXVNall4TVRNNE5qTTBOelEwTkRsZExGeHVJQ0FnSUZzeE1UUXVNamsyTWpZME5qUTRORE0zTlN3Z01qSXVNalV3T1Rjd056Z3lOelV3T0RZMlhTeGNiaUFnSUNCYk1URTBMakk1TkRnNU1UTTFOelF5TVRnNExDQXlNaTR5TkRBNE1ESXhPVEkwTmpNek5WMHNYRzRnSUNBZ1d6RXhOQzR5T1RBd09EUTRNemc0TmpjeE55d2dNakl1TWpNNE9EazFORGs1TmpFek1qTXlYU3hjYmlBZ0lDQmJNVEUwTGpJM09UQTVPRFV4TURjME1qRTVMQ0F5TWk0eU5EUTJNVFUxTURBek1qTXdOalJkWEc0Z0lGMHBYRzVkTENCN1hHNGdJR1J5WVdkbllXSnNaVG9nZEhKMVpTeGNiaUFnTHk4Z2NtVnVaR1Z5WlhJNklISmxibVJsY21WeUxGeHVJQ0JqYjJ4dmNqb2dKeU13T1RJblhHNTlLUzVpYVc1a1VHOXdkWEFvSjAxMWJIUnBVRzlzZVdkdmJpY3BMbUZrWkZSdktHMWhjQ2s3WEc1Y2JuWmhjaUJ0ZFd4MGFWQnZiSGxzYVc1bElEMGdaMnh2WW1Gc0xtMTFiSFJwVUc5c2VXeHBibVVnUFNCdVpYY2dUQzVRYjJ4NWJHbHVaU2hiWEc0Z0lFd3VSMlZ2U2xOUFRpNWpiMjl5WkhOVWIweGhkRXh1WjNNb1cxeHVJQ0FnSUZzeE1UTXVPRGs0TmprMk9EazVOREUwTURZc0lESXlMak01T1RZd01Ua3lNVGN3TmprMU0xMHNYRzRnSUNBZ1d6RXhNeTQ0T1Rnd01UQXlOVE01TURZeU5Td2dNakl1TkRJeU5EVTBNVGd4TnpBNU56QTNYU3hjYmlBZ0lDQmJNVEV6TGprd016VXdNelF4TnprMk9EYzFMQ0F5TWk0ME16TXlORFF5TVRrM09ERXhOMTBzWEc0Z0lDQWdXekV4TXk0NU1EazJPRE15TWpjMU16a3dOaXdnTWpJdU5EUTVNVEV3TXprNE9EZzJNVEEyWFN4Y2JpQWdJQ0JiTVRFekxqa3dOamt6TmpZME5UVXdOemd4TENBeU1pNDBOemd5T1RrME1qVXhOakk0TlRKZExGeHVJQ0FnSUZzeE1UTXVPVEl6TkRFMk1UTTNOamsxTXl3Z01qSXVORGc0TkRVd05qZzRNekkxTkRBNFhTeGNiaUFnSUNCYk1URXpMamt6TXpjeE5UZ3lNRE14TWpVc0lESXlMalE0TXpNM05URTBPVGM0T1RZeU0xMHNYRzRnSUNBZ1d6RXhNeTQ1TkRRM01ESXhORGcwTXpjMUxDQXlNaTQwT1RJeU5UY3lNakF3T0RVeE9UTmRMRnh1SUNBZ0lGc3hNVE11T1RVeU1qVTFNalE1TURJek5EUXNJREl5TGpVeE1qVTFOamsxTkRBMU1UUTFYVnh1SUNCZEtTeGNibHh1SUNCTUxrZGxiMHBUVDA0dVkyOXZjbVJ6Vkc5TVlYUk1ibWR6S0Z0Y2JpQWdJQ0JiTVRFekxqZzJOemM1TnpnMU1UVTJNalVzSURJeUxqTTVNall4T0RVek56RXpOek00WFN4Y2JpQWdJQ0JiTVRFekxqZzJPVEUzTVRFME1qVTNPREV4TENBeU1pNDBNamMxTXpFNU5URXhOVFk1T1Ywc1hHNGdJQ0FnV3pFeE15NDVNak0wTVRZeE16YzJPVFV6TENBeU1pNDBOakkwTXpZMU9EWTJOVE14TkRoZExGeHVJQ0FnSUZzeE1UTXVPVFE0TVRNMU16YzFPVGMyTlRZc0lESXlMalEzTXpnMU9EQXhNelE0TnpZeE5GMHNYRzRnSUNBZ1d6RXhNeTQ1Tnpnek5EYzNOemd6TWpBekxDQXlNaTQwT1RreU16VTFPRGsyT0RNd05sMHNYRzRnSUNBZ1d6RXhNeTQ1T1RZNE9EY3lNRGN3TXpFeU5Td2dNakl1TlRFeE9USXlOak15TkRZNE9EWmRMRnh1SUNBZ0lGc3hNVFF1TURFek16WTJOams1TWpFNE56VXNJREl5TGpVd01URXpPRGN5TURNd01ESTFORjBzWEc0Z0lDQWdXekV4TkM0d01qVXdNemsyTnpJNE5URTFOU3dnTWpJdU5UQTRNVEUyTmpReE9EVXpOamMxWFZ4dUlDQmRLVnh1WFN3Z2UxeHVJQ0JrY21GbloyRmliR1U2SUhSeWRXVXNYRzRnSUdOdmJHOXlPaUFuSTJVNU1DZGNibjBwTG1KcGJtUlFiM0IxY0NnblRYVnNkR2xRYjJ4NWJHbHVaU2NwTG1Ga1pGUnZLRzFoY0NrN1hHNWNiblpoY2lCdFlYSnJaWElnUFNCdVpYY2dUQzVOWVhKclpYSW9iV0Z3TG1kbGRFTmxiblJsY2lncExDQjdYRzRnSUdSeVlXZG5ZV0pzWlRvZ2RISjFaVnh1ZlNrdVlXUmtWRzhvYldGd0tUdGNiaUpkZlE9PSIsInJlcXVpcmUoJy4vc3JjL1NWRycpO1xucmVxdWlyZSgnLi9zcmMvU1ZHLlZNTCcpO1xucmVxdWlyZSgnLi9zcmMvQ2FudmFzJyk7XG5yZXF1aXJlKCcuL3NyYy9QYXRoLlRyYW5zZm9ybScpO1xucmVxdWlyZSgnLi9zcmMvUGF0aC5EcmFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTC5QYXRoLkRyYWc7XG4iLCJMLlV0aWwudHJ1ZUZuID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0cnVlO1xufTtcblxuTC5DYW52YXMuaW5jbHVkZSh7XG5cbiAgLyoqXG4gICAqIERvIG5vdGhpbmdcbiAgICogQHBhcmFtICB7TC5QYXRofSBsYXllclxuICAgKi9cbiAgX3Jlc2V0VHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIpIHtcbiAgICBpZiAoIXRoaXMuX2NvbnRhaW5lckNvcHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkZWxldGUgdGhpcy5fY29udGFpbmVyQ29weTtcblxuICAgIGlmIChsYXllci5fY29udGFpbnNQb2ludF8pIHtcbiAgICAgIGxheWVyLl9jb250YWluc1BvaW50ID0gbGF5ZXIuX2NvbnRhaW5zUG9pbnRfO1xuICAgICAgZGVsZXRlIGxheWVyLl9jb250YWluc1BvaW50XztcblxuICAgICAgdGhpcy5fcmVxdWVzdFJlZHJhdyhsYXllcik7XG4gICAgICB0aGlzLl9kcmF3KHRydWUpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQWxnb3JpdGhtIG91dGxpbmU6XG4gICAqXG4gICAqIDEuIHByZS10cmFuc2Zvcm0gLSBjbGVhciB0aGUgcGF0aCBvdXQgb2YgdGhlIGNhbnZhcywgY29weSBjYW52YXMgc3RhdGVcbiAgICogMi4gYXQgZXZlcnkgZnJhbWU6XG4gICAqICAgIDIuMS4gc2F2ZVxuICAgKiAgICAyLjIuIHJlZHJhdyB0aGUgY2FudmFzIGZyb20gc2F2ZWQgb25lXG4gICAqICAgIDIuMy4gdHJhbnNmb3JtXG4gICAqICAgIDIuNC4gZHJhdyBwYXRoXG4gICAqICAgIDIuNS4gcmVzdG9yZVxuICAgKlxuICAgKiBAcGFyYW0gIHtMLlBhdGh9IGxheWVyXG4gICAqIEBwYXJhbSAge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcbiAgICovXG4gIHRyYW5zZm9ybVBhdGg6IGZ1bmN0aW9uKGxheWVyLCBtYXRyaXgpIHtcbiAgICB2YXIgY29weSA9IHRoaXMuX2NvbnRhaW5lckNvcHk7XG4gICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICB2YXIgbSA9IEwuQnJvd3Nlci5yZXRpbmEgPyAyIDogMTtcbiAgICB2YXIgYm91bmRzID0gdGhpcy5fYm91bmRzO1xuICAgIHZhciBzaXplID0gYm91bmRzLmdldFNpemUoKTtcbiAgICB2YXIgcG9zID0gYm91bmRzLm1pbjtcblxuICAgIGlmICghY29weSkge1xuICAgICAgY29weSA9IHRoaXMuX2NvbnRhaW5lckNvcHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY29weSk7XG5cbiAgICAgIGNvcHkud2lkdGggPSBtICogc2l6ZS54O1xuICAgICAgY29weS5oZWlnaHQgPSBtICogc2l6ZS55O1xuXG4gICAgICBsYXllci5fcmVtb3ZlZCA9IHRydWU7XG4gICAgICB0aGlzLl9yZWRyYXcoKTtcblxuICAgICAgY29weS5nZXRDb250ZXh0KCcyZCcpLnRyYW5zbGF0ZShtICogYm91bmRzLm1pbi54LCBtICogYm91bmRzLm1pbi55KTtcbiAgICAgIGNvcHkuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UodGhpcy5fY29udGFpbmVyLCAwLCAwKTtcbiAgICAgIHRoaXMuX2luaXRQYXRoKGxheWVyKTtcbiAgICAgIGxheWVyLl9jb250YWluc1BvaW50XyA9IGxheWVyLl9jb250YWluc1BvaW50O1xuICAgICAgbGF5ZXIuX2NvbnRhaW5zUG9pbnQgPSBMLlV0aWwudHJ1ZUZuO1xuICAgIH1cblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmNsZWFyUmVjdChwb3MueCwgcG9zLnksIHNpemUueCAqIG0sIHNpemUueSAqIG0pO1xuICAgIGN0eC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgICBjdHguc2F2ZSgpO1xuXG4gICAgY3R4LmRyYXdJbWFnZSh0aGlzLl9jb250YWluZXJDb3B5LCAwLCAwLCBzaXplLngsIHNpemUueSk7XG4gICAgY3R4LnRyYW5zZm9ybS5hcHBseShjdHgsIG1hdHJpeCk7XG5cbiAgICB2YXIgbGF5ZXJzID0gdGhpcy5fbGF5ZXJzO1xuICAgIHRoaXMuX2xheWVycyA9IHt9O1xuXG4gICAgdGhpcy5faW5pdFBhdGgobGF5ZXIpO1xuICAgIGxheWVyLl91cGRhdGVQYXRoKCk7XG5cbiAgICB0aGlzLl9sYXllcnMgPSBsYXllcnM7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG59KTtcbiIsIi8qKlxuICogRHJhZyBoYW5kbGVyXG4gKiBAY2xhc3MgTC5QYXRoLkRyYWdcbiAqIEBleHRlbmRzIHtMLkhhbmRsZXJ9XG4gKi9cbkwuSGFuZGxlci5QYXRoRHJhZyA9IEwuSGFuZGxlci5leHRlbmQoIC8qKiBAbGVuZHMgIEwuUGF0aC5EcmFnLnByb3RvdHlwZSAqLyB7XG5cbiAgc3RhdGljczoge1xuICAgIERSQUdHSU5HX0NMUzogJ2xlYWZsZXQtcGF0aC1kcmFnZ2FibGUnLFxuICB9LFxuXG5cbiAgLyoqXG4gICAqIEBwYXJhbSAge0wuUGF0aH0gcGF0aFxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGluaXRpYWxpemU6IGZ1bmN0aW9uKHBhdGgpIHtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtMLlBhdGh9XG4gICAgICovXG4gICAgdGhpcy5fcGF0aCA9IHBhdGg7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPE51bWJlcj59XG4gICAgICovXG4gICAgdGhpcy5fbWF0cml4ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtMLlBvaW50fVxuICAgICAqL1xuICAgIHRoaXMuX3N0YXJ0UG9pbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0wuUG9pbnR9XG4gICAgICovXG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBudWxsO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5fbWFwRHJhZ2dpbmdXYXNFbmFibGVkID0gZmFsc2U7XG5cbiAgfSxcblxuICAvKipcbiAgICogRW5hYmxlIGRyYWdnaW5nXG4gICAqL1xuICBhZGRIb29rczogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fcGF0aC5vbignbW91c2Vkb3duJywgdGhpcy5fb25EcmFnU3RhcnQsIHRoaXMpO1xuXG4gICAgdGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZSA9IHRoaXMuX3BhdGgub3B0aW9ucy5jbGFzc05hbWUgP1xuICAgICAgICAodGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZSArICcgJyArIEwuSGFuZGxlci5QYXRoRHJhZy5EUkFHR0lOR19DTFMpIDpcbiAgICAgICAgIEwuSGFuZGxlci5QYXRoRHJhZy5EUkFHR0lOR19DTFM7XG5cbiAgICBpZiAodGhpcy5fcGF0aC5fcGF0aCkge1xuICAgICAgTC5Eb21VdGlsLmFkZENsYXNzKHRoaXMuX3BhdGguX3BhdGgsIEwuSGFuZGxlci5QYXRoRHJhZy5EUkFHR0lOR19DTFMpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogRGlzYWJsZSBkcmFnZ2luZ1xuICAgKi9cbiAgcmVtb3ZlSG9va3M6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX3BhdGgub2ZmKCdtb3VzZWRvd24nLCB0aGlzLl9vbkRyYWdTdGFydCwgdGhpcyk7XG5cbiAgICB0aGlzLl9wYXRoLm9wdGlvbnMuY2xhc3NOYW1lID0gdGhpcy5fcGF0aC5vcHRpb25zLmNsYXNzTmFtZVxuICAgICAgLnJlcGxhY2UobmV3IFJlZ0V4cCgnXFxcXHMrJyArIEwuSGFuZGxlci5QYXRoRHJhZy5EUkFHR0lOR19DTFMpLCAnJyk7XG4gICAgaWYgKHRoaXMuX3BhdGguX3BhdGgpIHtcbiAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyh0aGlzLl9wYXRoLl9wYXRoLCBMLkhhbmRsZXIuUGF0aERyYWcuRFJBR0dJTkdfQ0xTKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqL1xuICBtb3ZlZDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhdGguX2RyYWdNb3ZlZDtcbiAgfSxcblxuICAvKipcbiAgICogU3RhcnQgZHJhZ1xuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZ1N0YXJ0OiBmdW5jdGlvbihldnQpIHtcbiAgICB2YXIgZXZlbnRUeXBlID0gZXZ0Lm9yaWdpbmFsRXZlbnQuX3NpbXVsYXRlZCA/ICd0b3VjaHN0YXJ0JyA6IGV2dC5vcmlnaW5hbEV2ZW50LnR5cGU7XG5cbiAgICB0aGlzLl9tYXBEcmFnZ2luZ1dhc0VuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9zdGFydFBvaW50ID0gZXZ0LmNvbnRhaW5lclBvaW50LmNsb25lKCk7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBldnQuY29udGFpbmVyUG9pbnQuY2xvbmUoKTtcbiAgICB0aGlzLl9tYXRyaXggPSBbMSwgMCwgMCwgMSwgMCwgMF07XG4gICAgTC5Eb21FdmVudC5zdG9wKGV2dC5vcmlnaW5hbEV2ZW50KTtcblxuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLl9wYXRoLl9yZW5kZXJlci5fY29udGFpbmVyLCAnbGVhZmxldC1pbnRlcmFjdGl2ZScpO1xuICAgIEwuRG9tRXZlbnRcbiAgICAgIC5vbihkb2N1bWVudCwgTC5EcmFnZ2FibGUuTU9WRVtldmVudFR5cGVdLCB0aGlzLl9vbkRyYWcsIHRoaXMpXG4gICAgICAub24oZG9jdW1lbnQsIEwuRHJhZ2dhYmxlLkVORFtldmVudFR5cGVdLCB0aGlzLl9vbkRyYWdFbmQsIHRoaXMpO1xuXG4gICAgaWYgKHRoaXMuX3BhdGguX21hcC5kcmFnZ2luZy5lbmFibGVkKCkpIHtcbiAgICAgIC8vIEkgZ3Vlc3MgaXQncyByZXF1aXJlZCBiZWNhdXNlIG1vdXNkb3duIGdldHMgc2ltdWxhdGVkIHdpdGggYSBkZWxheVxuICAgICAgdGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLl9kcmFnZ2FibGUuX29uVXAoKTtcblxuICAgICAgdGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmRpc2FibGUoKTtcbiAgICAgIHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIHRoaXMuX3BhdGguX2RyYWdNb3ZlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMuX3BhdGguX3BvcHVwKSB7IC8vIHRoYXQgbWlnaHQgYmUgYSBjYXNlIG9uIHRvdWNoIGRldmljZXMgYXMgd2VsbFxuICAgICAgdGhpcy5fcGF0aC5fcG9wdXAuX2Nsb3NlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fcmVwbGFjZUNvb3JkR2V0dGVycyhldnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEcmFnZ2luZ1xuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZzogZnVuY3Rpb24oZXZ0KSB7XG4gICAgTC5Eb21FdmVudC5zdG9wKGV2dCk7XG5cbiAgICB2YXIgZmlyc3QgPSAoZXZ0LnRvdWNoZXMgJiYgZXZ0LnRvdWNoZXMubGVuZ3RoID49IDEgPyBldnQudG91Y2hlc1swXSA6IGV2dCk7XG4gICAgdmFyIGNvbnRhaW5lclBvaW50ID0gdGhpcy5fcGF0aC5fbWFwLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGZpcnN0KTtcblxuICAgIHZhciB4ID0gY29udGFpbmVyUG9pbnQueDtcbiAgICB2YXIgeSA9IGNvbnRhaW5lclBvaW50Lnk7XG5cbiAgICB2YXIgZHggPSB4IC0gdGhpcy5fc3RhcnRQb2ludC54O1xuICAgIHZhciBkeSA9IHkgLSB0aGlzLl9zdGFydFBvaW50Lnk7XG5cbiAgICBpZiAoIXRoaXMuX3BhdGguX2RyYWdNb3ZlZCAmJiAoZHggfHwgZHkpKSB7XG4gICAgICB0aGlzLl9wYXRoLl9kcmFnTW92ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5fcGF0aC5maXJlKCdkcmFnc3RhcnQnLCBldnQpO1xuICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0aGF0IHRvIGhhcHBlbiBvbiBjbGlja1xuICAgICAgdGhpcy5fcGF0aC5icmluZ1RvRnJvbnQoKTtcbiAgICB9XG5cbiAgICB0aGlzLl9tYXRyaXhbNF0gKz0gZHg7XG4gICAgdGhpcy5fbWF0cml4WzVdICs9IGR5O1xuXG4gICAgdGhpcy5fc3RhcnRQb2ludC54ID0geDtcbiAgICB0aGlzLl9zdGFydFBvaW50LnkgPSB5O1xuXG4gICAgdGhpcy5fcGF0aC5maXJlKCdwcmVkcmFnJywgZXZ0KTtcbiAgICB0aGlzLl9wYXRoLl90cmFuc2Zvcm0odGhpcy5fbWF0cml4KTtcbiAgICB0aGlzLl9wYXRoLmZpcmUoJ2RyYWcnLCBldnQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEcmFnZ2luZyBzdG9wcGVkLCBhcHBseVxuICAgKiBAcGFyYW0gIHtMLk1vdXNlRXZlbnR9IGV2dFxuICAgKi9cbiAgX29uRHJhZ0VuZDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIGNvbnRhaW5lclBvaW50ID0gdGhpcy5fcGF0aC5fbWFwLm1vdXNlRXZlbnRUb0NvbnRhaW5lclBvaW50KGV2dCk7XG5cbiAgICAvLyBhcHBseSBtYXRyaXhcbiAgICBpZiAodGhpcy5tb3ZlZCgpKSB7XG4gICAgICB0aGlzLl90cmFuc2Zvcm1Qb2ludHModGhpcy5fbWF0cml4KTtcbiAgICAgIHRoaXMuX3BhdGguX3VwZGF0ZVBhdGgoKTtcbiAgICAgIHRoaXMuX3BhdGguX3Byb2plY3QoKTtcbiAgICAgIHRoaXMuX3BhdGguX3RyYW5zZm9ybShudWxsKTtcbiAgICB9XG5cbiAgICBMLkRvbUV2ZW50XG4gICAgICAub2ZmKGRvY3VtZW50LCAnbW91c2Vtb3ZlIHRvdWNobW92ZScsIHRoaXMuX29uRHJhZywgdGhpcylcbiAgICAgIC5vZmYoZG9jdW1lbnQsICdtb3VzZXVwIHRvdWNoZW5kJywgICAgdGhpcy5fb25EcmFnRW5kLCB0aGlzKTtcblxuICAgIC8vIGNvbnNpc3RlbmN5XG4gICAgdGhpcy5fcGF0aC5maXJlKCdkcmFnZW5kJywge1xuICAgICAgZGlzdGFuY2U6IE1hdGguc3FydChcbiAgICAgICAgTC5MaW5lVXRpbC5fc3FEaXN0KHRoaXMuX2RyYWdTdGFydFBvaW50LCBjb250YWluZXJQb2ludClcbiAgICAgIClcbiAgICB9KTtcblxuICAgIHRoaXMuX21hdHJpeCAgICAgICAgID0gbnVsbDtcbiAgICB0aGlzLl9zdGFydFBvaW50ICAgICA9IG51bGw7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0UG9pbnQgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuX21hcERyYWdnaW5nV2FzRW5hYmxlZCkge1xuICAgICAgdGhpcy5fcGF0aC5fbWFwLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH1cbiAgICB0aGlzLl9yZXN0b3JlQ29vcmRHZXR0ZXJzKCk7XG4gIH0sXG5cblxuICAvKipcbiAgICogQXBwbGllcyB0cmFuc2Zvcm1hdGlvbiwgZG9lcyBpdCBpbiBvbmUgc3dlZXAgZm9yIHBlcmZvcm1hbmNlLFxuICAgKiBzbyBkb24ndCBiZSBzdXJwcmlzZWQgYWJvdXQgdGhlIGNvZGUgcmVwZXRpdGlvbi5cbiAgICpcbiAgICogWyB4IF0gICBbIGEgIGIgIHR4IF0gWyB4IF0gICBbIGEgKiB4ICsgYiAqIHkgKyB0eCBdXG4gICAqIFsgeSBdID0gWyBjICBkICB0eSBdIFsgeSBdID0gWyBjICogeCArIGQgKiB5ICsgdHkgXVxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBtYXRyaXhcbiAgICovXG4gIF90cmFuc2Zvcm1Qb2ludHM6IGZ1bmN0aW9uKG1hdHJpeCwgZGVzdCkge1xuICAgIHZhciBwYXRoID0gdGhpcy5fcGF0aDtcbiAgICB2YXIgaSwgbGVuLCBsYXRsbmc7XG5cbiAgICB2YXIgcHggPSBMLnBvaW50KG1hdHJpeFs0XSwgbWF0cml4WzVdKTtcblxuICAgIHZhciBjcnMgPSBwYXRoLl9tYXAub3B0aW9ucy5jcnM7XG4gICAgdmFyIHRyYW5zZm9ybWF0aW9uID0gY3JzLnRyYW5zZm9ybWF0aW9uO1xuICAgIHZhciBzY2FsZSA9IGNycy5zY2FsZShwYXRoLl9tYXAuZ2V0Wm9vbSgpKTtcbiAgICB2YXIgcHJvamVjdGlvbiA9IGNycy5wcm9qZWN0aW9uO1xuXG4gICAgdmFyIGRpZmYgPSB0cmFuc2Zvcm1hdGlvbi51bnRyYW5zZm9ybShweCwgc2NhbGUpXG4gICAgICAuc3VidHJhY3QodHJhbnNmb3JtYXRpb24udW50cmFuc2Zvcm0oTC5wb2ludCgwLCAwKSwgc2NhbGUpKTtcbiAgICB2YXIgYXBwbHlUcmFuc2Zvcm0gPSAhZGVzdDtcblxuICAgIHBhdGguX2JvdW5kcyA9IG5ldyBMLkxhdExuZ0JvdW5kcygpO1xuXG4gICAgLy8gY29uc29sZS50aW1lKCd0cmFuc2Zvcm0nKTtcbiAgICAvLyBhbGwgc2hpZnRzIGFyZSBpbi1wbGFjZVxuICAgIGlmIChwYXRoLl9wb2ludCkgeyAvLyBMLkNpcmNsZVxuICAgICAgZGVzdCA9IHByb2plY3Rpb24udW5wcm9qZWN0KFxuICAgICAgICBwcm9qZWN0aW9uLnByb2plY3QocGF0aC5fbGF0bG5nKS5fYWRkKGRpZmYpKTtcbiAgICAgIGlmIChhcHBseVRyYW5zZm9ybSkge1xuICAgICAgICBwYXRoLl9sYXRsbmcgPSBkZXN0O1xuICAgICAgICBwYXRoLl9wb2ludC5fYWRkKHB4KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhdGguX3JpbmdzIHx8IHBhdGguX3BhcnRzKSB7IC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgdmFyIHJpbmdzICAgPSBwYXRoLl9yaW5ncyB8fCBwYXRoLl9wYXJ0cztcbiAgICAgIHZhciBsYXRsbmdzID0gcGF0aC5fbGF0bG5ncztcbiAgICAgIGRlc3QgPSBkZXN0IHx8IGxhdGxuZ3M7XG4gICAgICBpZiAoIUwuVXRpbC5pc0FycmF5KGxhdGxuZ3NbMF0pKSB7IC8vIHBvbHlsaW5lXG4gICAgICAgIGxhdGxuZ3MgPSBbbGF0bG5nc107XG4gICAgICAgIGRlc3QgICAgPSBbZGVzdF07XG4gICAgICB9XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByaW5ncy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBkZXN0W2ldID0gZGVzdFtpXSB8fCBbXTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpqID0gcmluZ3NbaV0ubGVuZ3RoOyBqIDwgamo7IGorKykge1xuICAgICAgICAgIGxhdGxuZyAgICAgPSBsYXRsbmdzW2ldW2pdO1xuICAgICAgICAgIGRlc3RbaV1bal0gPSBwcm9qZWN0aW9uXG4gICAgICAgICAgICAudW5wcm9qZWN0KHByb2plY3Rpb24ucHJvamVjdChsYXRsbmcpLl9hZGQoZGlmZikpO1xuICAgICAgICAgIGlmIChhcHBseVRyYW5zZm9ybSkge1xuICAgICAgICAgICAgcGF0aC5fYm91bmRzLmV4dGVuZChsYXRsbmdzW2ldW2pdKTtcbiAgICAgICAgICAgIHJpbmdzW2ldW2pdLl9hZGQocHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVzdDtcbiAgICAvLyBjb25zb2xlLnRpbWVFbmQoJ3RyYW5zZm9ybScpO1xuICB9LFxuXG5cblxuICAvKipcbiAgICogSWYgeW91IHdhbnQgdG8gcmVhZCB0aGUgbGF0bG5ncyBkdXJpbmcgdGhlIGRyYWcgLSB5b3VyIHJpZ2h0LFxuICAgKiBidXQgdGhleSBoYXZlIHRvIGJlIHRyYW5zZm9ybWVkXG4gICAqL1xuICBfcmVwbGFjZUNvb3JkR2V0dGVyczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3BhdGguZ2V0TGF0TG5nKSB7IC8vIENpcmNsZSwgQ2lyY2xlTWFya2VyXG4gICAgICB0aGlzLl9wYXRoLmdldExhdExuZ18gPSB0aGlzLl9wYXRoLmdldExhdExuZztcbiAgICAgIHRoaXMuX3BhdGguZ2V0TGF0TG5nID0gTC5VdGlsLmJpbmQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRyYWdnaW5nLl90cmFuc2Zvcm1Qb2ludHModGhpcy5kcmFnZ2luZy5fbWF0cml4LCB7fSk7XG4gICAgICB9LCB0aGlzLl9wYXRoKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3BhdGguZ2V0TGF0TG5ncykge1xuICAgICAgdGhpcy5fcGF0aC5nZXRMYXRMbmdzXyA9IHRoaXMuX3BhdGguZ2V0TGF0TG5ncztcbiAgICAgIHRoaXMuX3BhdGguZ2V0TGF0TG5ncyA9IEwuVXRpbC5iaW5kKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kcmFnZ2luZy5fdHJhbnNmb3JtUG9pbnRzKHRoaXMuZHJhZ2dpbmcuX21hdHJpeCwgW10pO1xuICAgICAgfSwgdGhpcy5fcGF0aCk7XG4gICAgfVxuICB9LFxuXG5cbiAgLyoqXG4gICAqIFB1dCBiYWNrIHRoZSBnZXR0ZXJzXG4gICAqL1xuICBfcmVzdG9yZUNvb3JkR2V0dGVyczogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX3BhdGguZ2V0TGF0TG5nXykge1xuICAgICAgdGhpcy5fcGF0aC5nZXRMYXRMbmcgPSB0aGlzLl9wYXRoLmdldExhdExuZ187XG4gICAgICBkZWxldGUgdGhpcy5fcGF0aC5nZXRMYXRMbmdfO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fcGF0aC5nZXRMYXRMbmdzXykge1xuICAgICAgdGhpcy5fcGF0aC5nZXRMYXRMbmdzID0gdGhpcy5fcGF0aC5nZXRMYXRMbmdzXztcbiAgICAgIGRlbGV0ZSB0aGlzLl9wYXRoLmdldExhdExuZ3NfO1xuICAgIH1cbiAgfVxuXG59KTtcblxuXG4vKipcbiAqIEBwYXJhbSAge0wuUGF0aH0gbGF5ZXJcbiAqIEByZXR1cm4ge0wuUGF0aH1cbiAqL1xuTC5IYW5kbGVyLlBhdGhEcmFnLm1ha2VEcmFnZ2FibGUgPSBmdW5jdGlvbihsYXllcikge1xuICBsYXllci5kcmFnZ2luZyA9IG5ldyBMLkhhbmRsZXIuUGF0aERyYWcobGF5ZXIpO1xuICByZXR1cm4gbGF5ZXI7XG59O1xuXG5cbi8qKlxuICogQWxzbyBleHBvc2UgYXMgYSBtZXRob2RcbiAqIEByZXR1cm4ge0wuUGF0aH1cbiAqL1xuTC5QYXRoLnByb3RvdHlwZS5tYWtlRHJhZ2dhYmxlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBMLkhhbmRsZXIuUGF0aERyYWcubWFrZURyYWdnYWJsZSh0aGlzKTtcbn07XG5cblxuTC5QYXRoLmFkZEluaXRIb29rKGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5vcHRpb25zLmRyYWdnYWJsZSkge1xuICAgIC8vIGVuc3VyZSBpbnRlcmFjdGl2ZVxuICAgIHRoaXMub3B0aW9ucy5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5kcmFnZ2luZykge1xuICAgICAgdGhpcy5kcmFnZ2luZy5lbmFibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgTC5IYW5kbGVyLlBhdGhEcmFnLm1ha2VEcmFnZ2FibGUodGhpcyk7XG4gICAgICB0aGlzLmRyYWdnaW5nLmVuYWJsZSgpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0aGlzLmRyYWdnaW5nKSB7XG4gICAgdGhpcy5kcmFnZ2luZy5kaXNhYmxlKCk7XG4gIH1cbn0pO1xuIiwiLyoqXG4gKiBMZWFmbGV0IHZlY3RvciBmZWF0dXJlcyBkcmFnIGZ1bmN0aW9uYWxpdHlcbiAqIEBhdXRob3IgQWxleGFuZGVyIE1pbGV2c2tpIDxpbmZvQHc4ci5uYW1lPlxuICogQHByZXNlcnZlXG4gKi9cblxuLyoqXG4gKiBNYXRyaXggdHJhbnNmb3JtIHBhdGggZm9yIFNWRy9WTUxcbiAqIFJlbmRlcmVyLWluZGVwZW5kZW50XG4gKi9cbkwuUGF0aC5pbmNsdWRlKHtcblxuXHQvKipcblx0ICogQXBwbGllcyBtYXRyaXggdHJhbnNmb3JtYXRpb24gdG8gU1ZHXG5cdCAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj4/fSBtYXRyaXhcblx0ICovXG5cdF90cmFuc2Zvcm06IGZ1bmN0aW9uKG1hdHJpeCkge1xuXHRcdGlmICh0aGlzLl9yZW5kZXJlcikge1xuXHRcdFx0aWYgKG1hdHJpeCkge1xuXHRcdFx0XHR0aGlzLl9yZW5kZXJlci50cmFuc2Zvcm1QYXRoKHRoaXMsIG1hdHJpeCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvLyByZXNldCB0cmFuc2Zvcm0gbWF0cml4XG5cdFx0XHRcdHRoaXMuX3JlbmRlcmVyLl9yZXNldFRyYW5zZm9ybVBhdGgodGhpcyk7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcztcblx0fSxcblxuXHQvKipcblx0ICogQ2hlY2sgaWYgdGhlIGZlYXR1cmUgd2FzIGRyYWdnZWQsIHRoYXQnbGwgc3VwcmVzcyB0aGUgY2xpY2sgZXZlbnRcblx0ICogb24gbW91c2V1cC4gVGhhdCBmaXhlcyBwb3B1cHMgZm9yIGV4YW1wbGVcblx0ICpcblx0ICogQHBhcmFtICB7TW91c2VFdmVudH0gZVxuXHQgKi9cblx0X29uTW91c2VDbGljazogZnVuY3Rpb24oZSkge1xuXHRcdGlmICgodGhpcy5kcmFnZ2luZyAmJiB0aGlzLmRyYWdnaW5nLm1vdmVkKCkpIHx8XG5cdFx0XHQodGhpcy5fbWFwLmRyYWdnaW5nICYmIHRoaXMuX21hcC5kcmFnZ2luZy5tb3ZlZCgpKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuX2ZpcmVNb3VzZUV2ZW50KGUpO1xuXHR9XG5cbn0pO1xuIiwiTC5TVkcuaW5jbHVkZSghTC5Ccm93c2VyLnZtbCA/IHt9IDoge1xuXG5cdC8qKlxuXHQgKiBSZXNldCB0cmFuc2Zvcm0gbWF0cml4XG5cdCAqL1xuXHRfcmVzZXRUcmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllcikge1xuXHRcdGlmIChsYXllci5fc2tldykge1xuXHRcdFx0Ly8gc3VwZXIgaW1wb3J0YW50ISB3b3JrYXJvdW5kIGZvciBhICdqdW1waW5nJyBnbGl0Y2g6XG5cdFx0XHQvLyBkaXNhYmxlIHRyYW5zZm9ybSBiZWZvcmUgcmVtb3ZpbmcgaXRcblx0XHRcdGxheWVyLl9za2V3Lm9uID0gZmFsc2U7XG5cdFx0XHRsYXllci5fcGF0aC5yZW1vdmVDaGlsZChsYXllci5fc2tldyk7XG5cdFx0XHRsYXllci5fc2tldyA9IG51bGw7XG5cdFx0fVxuXHR9LFxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBWTUxcblx0ICogQHBhcmFtIHtMLlBhdGh9ICAgICAgICAgbGF5ZXJcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG5cdCAqL1xuXHR0cmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllciwgbWF0cml4KSB7XG5cdFx0dmFyIHNrZXcgPSBsYXllci5fc2tldztcblxuXHRcdGlmICghc2tldykge1xuXHRcdFx0c2tldyA9IEwuU1ZHLmNyZWF0ZSgnc2tldycpO1xuXHRcdFx0bGF5ZXIuX3BhdGguYXBwZW5kQ2hpbGQoc2tldyk7XG5cdFx0XHRza2V3LnN0eWxlLmJlaGF2aW9yID0gJ3VybCgjZGVmYXVsdCNWTUwpJztcblx0XHRcdGxheWVyLl9za2V3ID0gc2tldztcblx0XHR9XG5cblx0XHQvLyBoYW5kbGUgc2tldy90cmFuc2xhdGUgc2VwYXJhdGVseSwgY2F1c2UgaXQncyBicm9rZW5cblx0XHR2YXIgbXQgPSBtYXRyaXhbMF0udG9GaXhlZCg4KSArICcgJyArIG1hdHJpeFsxXS50b0ZpeGVkKDgpICsgJyAnICtcblx0XHRcdG1hdHJpeFsyXS50b0ZpeGVkKDgpICsgJyAnICsgbWF0cml4WzNdLnRvRml4ZWQoOCkgKyAnIDAgMCc7XG5cdFx0dmFyIG9mZnNldCA9IE1hdGguZmxvb3IobWF0cml4WzRdKS50b0ZpeGVkKCkgKyAnLCAnICtcblx0XHRcdE1hdGguZmxvb3IobWF0cml4WzVdKS50b0ZpeGVkKCkgKyAnJztcblxuXHRcdHZhciBzID0gdGhpcy5fcGF0aC5zdHlsZTtcblx0XHR2YXIgbCA9IHBhcnNlRmxvYXQocy5sZWZ0KTtcblx0XHR2YXIgdCA9IHBhcnNlRmxvYXQocy50b3ApO1xuXHRcdHZhciB3ID0gcGFyc2VGbG9hdChzLndpZHRoKTtcblx0XHR2YXIgaCA9IHBhcnNlRmxvYXQocy5oZWlnaHQpO1xuXG5cdFx0aWYgKGlzTmFOKGwpKSB7IGwgPSAwOyB9XG5cdFx0aWYgKGlzTmFOKHQpKSB7IHQgPSAwOyB9XG5cdFx0aWYgKGlzTmFOKHcpIHx8ICF3KSB7IHcgPSAxOyB9XG5cdFx0aWYgKGlzTmFOKGgpIHx8ICFoKSB7IGggPSAxOyB9XG5cblx0XHR2YXIgb3JpZ2luID0gKC1sIC8gdyAtIDAuNSkudG9GaXhlZCg4KSArICcgJyArICgtdCAvIGggLSAwLjUpLnRvRml4ZWQoOCk7XG5cblx0XHRza2V3Lm9uID0gJ2YnO1xuXHRcdHNrZXcubWF0cml4ID0gbXQ7XG5cdFx0c2tldy5vcmlnaW4gPSBvcmlnaW47XG5cdFx0c2tldy5vZmZzZXQgPSBvZmZzZXQ7XG5cdFx0c2tldy5vbiA9IHRydWU7XG5cdH1cblxufSk7XG4iLCJMLlNWRy5pbmNsdWRlKHtcblxuXHQvKipcblx0ICogUmVzZXQgdHJhbnNmb3JtIG1hdHJpeFxuXHQgKi9cblx0X3Jlc2V0VHJhbnNmb3JtUGF0aDogZnVuY3Rpb24obGF5ZXIpIHtcblx0XHRsYXllci5fcGF0aC5zZXRBdHRyaWJ1dGVOUyhudWxsLCAndHJhbnNmb3JtJywgJycpO1xuXHR9LFxuXG5cdC8qKlxuXHQgKiBBcHBsaWVzIG1hdHJpeCB0cmFuc2Zvcm1hdGlvbiB0byBTVkdcblx0ICogQHBhcmFtIHtMLlBhdGh9ICAgICAgICAgbGF5ZXJcblx0ICogQHBhcmFtIHtBcnJheS48TnVtYmVyPn0gbWF0cml4XG5cdCAqL1xuXHR0cmFuc2Zvcm1QYXRoOiBmdW5jdGlvbihsYXllciwgbWF0cml4KSB7XG5cdFx0bGF5ZXIuX3BhdGguc2V0QXR0cmlidXRlTlMobnVsbCwgJ3RyYW5zZm9ybScsXG5cdFx0XHQnbWF0cml4KCcgKyBtYXRyaXguam9pbignICcpICsgJyknKTtcblx0fVxuXG59KTtcbiJdfQ==
