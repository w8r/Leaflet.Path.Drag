L.Canvas.include({

	/**
	 * Do nothing
	 * @param  {L.Path} layer
	 */
	_resetTransformPath: function(layer) {
		delete this._copy;
		delete this._copyCtx;
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
		if (!this._copy) {
			this._copy = document.createElement('canvas');
			this._copyCtx = this._copy.getContext('2d');
			this._copy.width = this._container.width;
			this._copy.height = this._container.height;

			document.body.appendChild(this._copy);
			this._copy.style.width = this._container.width / 5 + 'px';
			this._copy.style.height = this._container.height / 5 + 'px';
			this._copy.style.position = 'absolute';
			this._copy.style.top = 0;
			this._copy.style.left = 0;
			this._copy.style.zIndex = 9999;
			this._copy.style.border = '1px solid #444';
			console.log(this._copy);

			layer._removed = true;
			this._redrawBounds = this._redrawBounds || new L.Bounds();
			this._redrawBounds.extend(layer._pxBounds.min).extend(layer._pxBounds.max);
			this._redraw();
			this._copyCtx.drawImage(this._container, 0, 0)

			this._initPath(layer);
		}

		this._ctx.save();
		//this._ctx.clearRect(0, 0, this._copy.width, this._copy.height);
		this._ctx.drawImage(this._copy, 0, 0, this._copy.width, this._copy.height);
		this._ctx.transform.apply(this._ctx, matrix);

		var lrs = this._layers;
		this._layers = {}
		this._initPath(layer);
		//this._updatePoly(layer, true);
		this._layers = lrs;

		//this._layers
		//layer._removed = true;
		this._ctx.restore();
	}

});
