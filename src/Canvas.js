L.Util.trueFn = function() {
  return true;
};

L.Canvas.include({

  /**
   * Do nothing
   * @param  {L.Path} layer
   */
  _resetTransformPath: function(layer) {
    if (!this._containerCopy) return;

    delete this._containerCopy;

    layer._order    = layer._order_;
    this._drawFirst = this._drawFirst_;
    this._drawLast  = this._drawLast_;

    if (layer._containsPoint_) {
      layer._containsPoint = layer._containsPoint_;
      delete layer._containsPoint_;

      this._requestRedraw(layer);
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
   * 3. Repeat
   *
   * @param  {L.Path}         layer
   * @param  {Array.<Number>} matrix
   */
  transformPath: function(layer, matrix) {
    var copy   = this._containerCopy;
    var ctx    = this._ctx, copyCtx;
    var m      = L.Browser.retina ? 2 : 1;
    var bounds = this._bounds;
    var size   = bounds.getSize();
    var pos    = bounds.min;

    if (!copy) { // get copy of all rendered layers
      copy = this._containerCopy = document.createElement('canvas');
      copyCtx = copy.getContext('2d');
      // document.body.appendChild(copy);

      copy.width  = m * size.x;
      copy.height = m * size.y;

      this._removePath(layer);
      this._redraw();

      copyCtx.translate(m * bounds.min.x, m * bounds.min.y);
      copyCtx.drawImage(this._container, 0, 0);
      this._initPath(layer);
      layer._containsPoint_ = layer._containsPoint;
      layer._containsPoint = L.Util.trueFn;

      layer._order_ = layer._order;
      this._drawFirst_ = this._drawFirst;
      this._drawLast_  = this._drawLast;
    }

    ctx.save();
    ctx.clearRect(pos.x, pos.y, size.x * m, size.y * m);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.restore();
    ctx.save();

    ctx.drawImage(this._containerCopy, 0, 0, size.x, size.y);
    ctx.transform.apply(ctx, matrix);

    // now draw one layer only
    var layers = this._layers;
    this._layers = {};

    //this._removePath(layer);
    this._drawLast = this._drawFirst = null;

    this._initPath(layer);
    this._extendRedrawBounds(layer);
		this._redraw();

    this._layers = layers;

    ctx.restore();
  }

});
