var  rss = require('../src/lib/rss.js'),
     sinon = require('sinon'),
     assert = require('assert'),
     request = require('request');

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
  });

  afterEach(function(){
    fakeRequest.restore();
  });

  describe('fetch data failed', function() {

    it('should return error when failed to get rss', function(){
      fakeRequest.yields('error', '');
 
      rss.fetch('url', function(err, results) {
        assert.equal('error', err);
        assert.equal(null, results);
      });      
    });

    it('should return error when status code is not 200', function(){
     
      fakeRequest.yields(null, { statusCode: 401 }, '');

      rss.fetch('url', function(err, results) {
      
        assert.equal('failed to fetch rss from url, response status code 401', err);
        assert.equal(null, results);
      });      
    });

  });


  describe('fetch data OK', function() {

    it('should return rss as object', function(){
      var content = "<rss><channel><item><title>1</title></item>" + 
                   "<item><title>2</title></item></channel></rss>";

      fakeRequest.yields(null, { statusCode: 200 }, content);

      rss.fetch('url', function(err, results) {
        
        assert.equal(null, err);
        assert.equal(2, results[0].rss.channel[0].item.length);
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
        assert.equal(10, results[0].rss.channel[0].item.length);
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
        assert.equal(10, results[0].rss.channel[0].item.length);
        assert.equal(10, results[1].rss.channel[0].item.length);
      });      
    });

  });

});

































































