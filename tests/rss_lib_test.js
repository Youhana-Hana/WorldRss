var  rss = require('../src/lib/rss.js'),
     sinon = require('sinon'),
     assert = require('assert'),
     request = require('request'),
     logger = require('../src/lib/logger.js');

describe('rss module', function() {
  
  it('when requiring should be correct', function() {
    var name = require.resolve('../src/lib/rss');
    delete require.cache[name];
  });

});

describe('rss data', function() {
  var fakeRequest;
 
  beforeEach(function(){
    fakeRequest = sinon.stub(request, 'get');
    sinon.stub(logger, 'error');
    sinon.stub(logger, 'verbose');
  });

  afterEach(function(){
    fakeRequest.restore();
    logger.verbose.restore();
    logger.error.restore();
  });

  describe('fetch data failed', function() {

    it('should return error when failed to get rss', function(){
      fakeRequest.yields('error', '');
 
      rss.fetch('url', function(err, results) {
        assert.equal('error', err);
        assert.equal(null, results);
        assert(logger.error.calledWith('error'));
      });      
    });

    it('should return error when status code is not 200', function(){
     
      fakeRequest.yields(null, { statusCode: 401 }, '');

      rss.fetch('url', function(err, results) {
      
        assert.equal('failed to fetch rss from url, response status code 401', err);
        assert.equal(null, results);
        assert(logger.error.calledWith('failed to fetch rss from url, response status code 401'));
      });      
    });

  });


  describe('fetch data OK', function() {

    it('should fail if not valid xml', function(){
      var content = "nothing"; 

      fakeRequest.yields(null, { statusCode: 200 }, content);

      rss.fetch('url', function(err, results) {
        
        assert.equal('invalid rss.', err);
        assert.equal(null, results);
      });      
    });


    it('should return rss as object', function(){
      var content = "<rss><channel><item><title>1</title></item>" + 
                   "<item><title>2</title></item></channel></rss>";

      fakeRequest.yields(null, { statusCode: 200 }, content);

      rss.fetch('url', function(err, results) {
        
        assert.equal(null, err);
        var channels = JSON.parse(results);
        assert.equal(2, channels.channel.item.length);
      });      
    });


    it('should return maximum 10 items', function(){
      var content = "<rss><channel><item><title>1</title></item>" + 
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "</channel></rss>";

      fakeRequest.yields(null, { statusCode: 200 }, content);

      rss.fetch('url', function(err, results) {
        
        assert.equal(null, err);
        var channels = JSON.parse(results);
        assert.equal(10, channels.channel.item.length);
      });      
    });


    it('should group results for more than one source', function(){
      var content = "<rss><channel><item><title>1</title></item>" + 
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "<item><title>2</title></item><item><title>3</title></item>"+
                   "</channel></rss>";

      fakeRequest.yields(null, { statusCode: 200 }, content);

      rss.fetch('url;url2', function(err, results) {
       
        assert.equal(null, err);
        var channel1 = JSON.parse(results[0]);
        var channel2 = JSON.parse(results[0]);
        assert.equal(10, channel1.channel.item.length);
        assert.equal(10, channel2.channel.item.length);
      });      
    });

  });

});

