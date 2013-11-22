var request = require('request'),
    util = require('util'),
    async = require('async'),
    logger = require('./logger.js'),
    xml2json = require("xml2json");

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
        return callback(err, null);
      }
    
      if (response.statusCode != 200) {
        
        var failMessage = util.format(
         'failed to fetch rss from %s, response status code %d',
         url,
         response.statusCode);
       
        return callback(failMessage, null);
      }
    });
  };

_getContentAsJson = function(body, callback) {
    logger.verbose('rss.getContentAsJson');

    var options = {
      sanitize: false 
    };

    return callback(null, xml2json.toJson(body, options));
  };

_getTopItems = function(content, count, callback) {
    logger.verbose('rss.getTopItems');

    var rss = JSON.parse(content).rss;
    if(!rss)
    {
      return callback('invalid rss.', null);
    }

    var itemsCount = rss.channel.item.length;
   
    if (itemsCount > 10) {
      rss.channel.item.splice(10, itemsCount -10);
    }
 
    return callback(null, JSON.stringify(rss));
  };

module.exports = rss;
