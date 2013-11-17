var rss = {};

rss.fetch = function(src, callback) {
  console.log('rss.fetch %s', src);
 
  return callback(null, '[]');
};

module.exports = rss;
