var rssLib = require('../lib/rss.js'),
    logger = require('../lib/logger.js');

var rss = {};

rss.get = function(req, res){
  logger.verbose('rss.get');
  var src = req.query.src;
  
  if (src === undefined) {
    logger.error('missing query string');
    
    return res.send(500);
  }
    
  rssLib.fetch(src, function(err, articles) {
    if (err) {
      logger.error(err);

      return res.send(500);
    }    

    return res.json(articles);
  });
};

module.exports = rss;
