var rss = {};

rss.get = function(req, res){
  console.log('rss.get');
  return res.send(401);
};

module.exports = rss;
