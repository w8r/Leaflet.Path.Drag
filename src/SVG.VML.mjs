import { SVG, Browser } from 'leaflet';

SVG.include(
  !Browser.vml
    ? {}
    : {
        /**
         * Reset transform matrix
         */
        _resetTransformPath: function (layer) {
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
        transformPath: function (layer, matrix) {
          let skew = layer._skew;

          if (!skew) {
            skew = SVG.create('skew');
            layer._path.appendChild(skew);
            skew.style.behavior = 'url(#default#VML)';
            layer._skew = skew;
          }

          // handle skew/translate separately, cause it's broken
          const mt =
            matrix[0].toFixed(8) +
            ' ' +
            matrix[1].toFixed(8) +
            ' ' +
            matrix[2].toFixed(8) +
            ' ' +
            matrix[3].toFixed(8) +
            ' 0 0';
          const offset =
            Math.floor(matrix[4]).toFixed() +
            ', ' +
            Math.floor(matrix[5]).toFixed() +
            '';

          const s = this._path.style;
          let l = parseFloat(s.left);
          let t = parseFloat(s.top);
          let w = parseFloat(s.width);
          let h = parseFloat(s.height);

          if (isNaN(l)) l = 0;
          if (isNaN(t)) t = 0;
          if (isNaN(w) || !w) w = 1;
          if (isNaN(h) || !h) h = 1;

          const origin =
            (-l / w - 0.5).toFixed(8) + ' ' + (-t / h - 0.5).toFixed(8);

          skew.on = 'f';
          skew.matrix = mt;
          skew.origin = origin;
          skew.offset = offset;
          skew.on = true;
        },
      }
);
