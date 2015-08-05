import Canvas, {Image} from 'canvas';

/**
 * @param {Buffer} buffer
 * @param {string} size
 * @returns {ImageData}
 */
export default function(buffer, size) {
  let [width, height] = size.split('x').map(val => +val);
  let ctx = new Canvas(width, height).getContext('2d');
  let img = new Image;
  img.source = buffer;
  ctx.drawImage(img, 0, 0);
  return ctx.getImageData(0, 0, width, height);
}


