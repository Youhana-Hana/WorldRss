var rssLib = require('../lib/rss.js');
var rss = {};

rss.get = function(req, res){
  console.log('rss.get');
  var src = req.query.src;
  if (src === undefined) {
    return res.send(500);
  }
  
  rssLib.fetch(src, function(err, articles) {
    if (err) {
      console.error(err);
      return res.send(500);
    }    

    return res.json(articles);
  });
};

module.exports = rss;
