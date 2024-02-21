/**
 * Leaflet is a bit too eager with the environment detection, so JSDOM is not enough.
 */

// @ts-expect-error
SVGSVGElement.prototype.createSVGRect = function () {
  return document.createElementNS('http://www.w3.org/2000/svg', 'rect');
};
