import request from 'request';
import url from 'url';

export default function* (query) {
  return yield new Promise((resolve, reject) => {
    let requestUrl = url.format({
      protocol: 'http',
      host: 'maps.googleapis.com/maps/api/staticmap',
      query: {
        'center': query.center,
        'zoom': query.zoom,
        'size': query.size
      }
    });

    //remove all styles
    requestUrl += '&style=feature:all|element:all|visibility:off';

    //set water tiles to black for future parsing
    requestUrl += '&style=feature:water|element:geometry|color:0x000000|visibility:on';
    requestUrl += '&style=feature:landscape|element:geometry|color:0x00acf2|visibility:on';

    request({url: requestUrl, encoding: null}, function(err, res, body) {
      if (err) {
        reject(err)
      }

      if (res.statusCode === 200) {
        if (Math.random() > 0.5) {
          resolve(body);
        }
        reject(new Error('test promise generator error'));
      }

      reject(res)
    })
  })
}
