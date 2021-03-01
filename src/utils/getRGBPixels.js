
/**
 * Gets pixels of an RGB image.
 * @export @public @method
 * @name getRGBPixels
 *
 * @param  {image} Image    The cornerstone Image Object.
 * @param  {number} x       The x position of the top-left corner of the region.
 * @param  {number} y       The y position of the top-left corner of the region.
 * @param  {number} width   The width of the region.
 * @param  {number} height  The height of the region
 * @returns {number[]}       The pixel data.
 */
export default function(image, x, y, width, height) {
	if (!image) {
		throw new Error('getRGBPixels: parameter image must not be undefined');
	}

	x = Math.round(x);
	y = Math.round(y);
	// const enabledElement = cornerstone.getEnabledElement(element);
	const storedPixelData = [];
	let index = 0;
	const pixelData = image.getPixelData();
	let spIndex, row, column;

	if (image.color) {
		for (row = 0; row < height; row++) {
			for (column = 0; column < width; column++) {
				spIndex = ((row + y) * image.columns + (column + x)) * 4;
				const red = pixelData[spIndex];
				const green = pixelData[spIndex + 1];
				const blue = pixelData[spIndex + 2];
				const alpha = pixelData[spIndex + 3];

				storedPixelData[index++] = red;
				storedPixelData[index++] = green;
				storedPixelData[index++] = blue;
				storedPixelData[index++] = alpha;
			}
		}
	}

	return storedPixelData;
}