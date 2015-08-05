import koa from 'koa';
import fs from 'fs';
import path from 'path';
import jade from 'jade';

import image from '../lib/satellite-image.js';
import imagedata from '../lib/imagedata';
import matrix from '../lib/matrix';

const app = module.exports = koa();

app.use(function* home(next) {
  if (this.request.path !== '/') {
    return yield next;
  }

  //TODO @G write some promo page ;)
  this.response.body = 'hello spf';
})

app.use(function* api(next) {
  if (this.request.path !== '/api') {
    return yield next;
  }

  //TODO @G write verification for query

  try {
    var buffer = yield image(this.request.query)
  } catch (err) {
    this.response.status = 500;
    this.response.body = 'internal server error';
  }

  this.response.body = matrix(imagedata(buffer, this.request.query.size));
})
app.use(function* jsonp(next) {
  if (this.request.path !== '/api/jsonp') {
    return yield next;
  }

  //TODO @G jsonP here
  this.response.body = 'hello jsonp';
})

