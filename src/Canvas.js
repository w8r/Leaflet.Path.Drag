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

		if (!copy) {
			copy = this._containerCopy = document.createElement('canvas');
			copy.width = this._container.width;
			copy.height = this._container.height;

			layer._removed = true;
			this._redraw();

			copy.getContext('2d').translate(this._bounds.min.x, this._bounds.min.y);
			copy.getContext('2d').drawImage(this._container, 0, 0);
			this._initPath(layer);
			layer._containsPoint_ = layer._containsPoint;
			layer._containsPoint = L.Util.trueFn;
		}

		ctx.save();
		ctx.clearRect(0, 0, copy.width, copy.height);
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
