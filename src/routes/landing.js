var logger = require('../lib/logger.js');

var landing = {};

landing.get = function(req, res){
  logger.verbose('landing.get');
  
  return res.render('landing');
};

module.exports = landing;
