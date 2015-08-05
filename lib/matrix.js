/**
 * @param {ImageData} imagedata
 * @return {Array.<Array.<0|1>>}
 */
export default function(imagedata) {
  let {width, height, data} = imagedata;
  let matrix = [];
  for (var h = 0; h < height; h += 1) {
    matrix[h] = [];
    for (var w = 0; w < width; w += 1) {
      let i = (h * width + w) * 4;
      let ok = data[i] === 0 && data[++i] === 0 && data[++i] === 0;
      matrix[h][w] = ok ? 0 : 1;
    }
  }
  return matrix;
}
