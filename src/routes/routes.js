var rss = require('./rss'),
    logger = require('../lib/logger.js');

var routes = {};

routes.get = function (app) {
  logger.verbose('routes.get');

  app.get('/api/1/rss', rss.get);
};

module.exports = routes;

