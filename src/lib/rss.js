var request = require('request'),
    util = require('util'),
    async = require('async'),
    parseString = require('xml2js').parseString,
    logger = require('./logger.js');

var rss = {};

rss.fetch = function(src, callback) {
  logger.verbose('rss.fetch %s', src);
  
  var sources = src.split(';');
 
  async.concat(sources, _get, function(err, results) {
    if (err) {
      logger.error(err);

      return callback(err, null);
    }
   
    return callback(null, results);
  });
};

_get = function(src, callback) {
    logger.verbose('rss.get');

    async.waterfall([
      function(callback) {
        _getRss(src, callback);     
      },
      function(body, callback) {
        _getContentAsJson(body, callback);
      },
      function(content, callback) {
        _getTopItems(content, 10, callback);
      }
    ], function(err, result) {
        return callback(err, result);
      }); 
  };

_getRss = function(url, callback) {
    logger.verbose('rss.getRss');

    request.get(url, function(err, response, body) {

      if(!err && response.statusCode == 200) {
        return callback(null, body);     
      }
    
      if (err) {
        logger.error('error get rss from %s, error %s', url, err);
        return callback(err, null);
      }
    
      if (response.statusCode != 200) {
        
        var failMessage = util.format(
         'failed to fetch rss from %s, response status code %d',
         url,
         response.statusCode);
       
        logger.error(failMessage);

        return callback(failMessage, null);
      }
    });
  };

_getContentAsJson = function(body, callback) {
    logger.verbose('rss.getContentAsJson');

    return parseString(body, callback);
  };

_getTopItems = function(rss, count, callback) {
    logger.verbose('rss.getTopItems');

    var itemsCount = rss.rss.channel[0].item.length;
   
    if (itemsCount > 10) {
      rss.rss.channel[0].item.splice(10, itemsCount -10);
    }
 
    return callback(null, rss);
  };

module.exports = rss;
