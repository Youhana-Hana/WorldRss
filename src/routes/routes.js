var rss = require('./rss');

var routes = {};

routes.get = function (app) {
  console.log('routes.get');

  app.get('/api/1/rss', rss.get);
};

module.exports = routes;

