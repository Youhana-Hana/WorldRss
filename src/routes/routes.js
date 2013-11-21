var rss = require('./rss'),
    logger = require('../lib/logger.js'),
    landing = require('./landing');

var routes = {};

routes.get = function (app) {
  logger.verbose('routes.get');

  app.get('/api/1/rss', rss.get);
};

routes.views = function(app) {
  logger.verbose('routes.views');

  app.get('/', landing.get);
};

module.exports = routes;

