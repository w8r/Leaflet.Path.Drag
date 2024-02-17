import { describe, it, beforeAll, assert } from 'vitest';
// import {
//   Map,
//   Handler,
//   polygon,
//   polyline,
//   circle,
//   circleMarker,
//   latLng,
// } from 'leaflet';
// import '../src/';

// const center = [22.42658, 114.1952];

// const createMap = () => {
//   const div = document.createElement('div');
//   div.style.width = div.style.height = '500px';

//   document.body.appendChild(div);

//   const map = new Map(div, {}).setView(center, 11);
//   map._container.style.background =
//     "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAABlBMVEXMzMz////TjRV2AAAASklEQVR42u3SsREAMAjDwGf/pbMAhdJDrQvBlm1mmeOOO+6PU99T96r/U+9Q71VzUfNTc1b7UHtT+1U9UH1RvVL9Uz1VfVa9F7l5CX4DIbeXYmYAAAAASUVORK5CYII=')";
//   return map;
// };

// beforeAll(() => {
//   const stylesheet = document.createElement('link');
//   stylesheet.rel = 'stylesheet';
//   stylesheet.type = 'text/css';
//   const version = require('../package.json').devDependencies.leaflet;
//   stylesheet.href = `https://cdn.jsdelivr.net/npm/leaflet${version}/dist/leaflet.css`;

//   document.head.appendChild(stylesheet);
// });

// describe('L.Path.Drag', () => {
//   describe('API', () => {
//     it('Handler should be defined', () => {
//       // @ts-expect-error
//       assert.isDefined(Handler.PathDrag);
//     });

//     it('L.Polygon', () => {
//       assert.isDefined(
//         polygon(
//           [
//             [1, 1],
//             [2, 2],
//             [3, 3],
//             [4, 4],
//             [1, 1],
//           ],
//           {
//             draggable: true,
//           }
//         ).dragging,
//         'handler on polygon'
//       );
//     });

//     it('L.Polyline', () => {
//       assert.isDefined(
//         polyline(
//           [
//             [1, 1],
//             [2, 2],
//             [3, 3],
//             [4, 4],
//             [1, 1],
//           ],
//           {
//             draggable: true,
//           }
//         ).dragging,
//         'handler on polyline'
//       );
//     });

//     it('L.Circle', () => {
//       assert.isDefined(
//         circle([1, 1], {
//           radius: 200,
//           draggable: true,
//         }).dragging,
//         'handler on circle'
//       );
//     });

//     it('L.CircleMarker', () => {
//       assert.isDefined(
//         circleMarker([1, 1], {
//           radius: 200,
//           draggable: true,
//         }).dragging,
//         'handler on circle'
//       );
//     });
//   });

//   describe('SVG', () => {
//     it('circle', () => {
//       const map = createMap();
//       map.once('click', () => {
//         assert.fail('should not trigger click');
//       });

//       const path = circle(center, {
//         radius: 4000,
//         draggable: true,
//         interactive: true,
//       })
//         .on('dragend', (evt) => {
//           const ll = latLng(center);
//           assert.isFalse(path.getLatLng().equals(ll), 'center changed');
//           assert.isTrue(evt.distance < 105 && evt.distance > 95, 'distance');
//         })
//         .addTo(map);
//     });
//   });
// });
