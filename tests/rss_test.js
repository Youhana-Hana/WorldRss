var  rss = require('../src/routes/rss.js'),
     sinon = require('sinon'),
     rsslib = require('../src/lib/rss.js'),
     assert = require('assert'),
     logger = require('../src/lib/logger.js');

describe('rss', function() {
  
  it('when requiring should be correct', function() {
    var name = require.resolve('../src/routes/rss');
    delete require.cache[name];
  });

});


describe('logging', function() {
  var req = {
    query: {},  
  };  
  
  var res = {};

  beforeEach(function(){
      res.send = sinon.stub();
      sinon.stub(logger, 'verbose');
    });

  afterEach(function(){
      logger.verbose.restore();
    });

  it('should log', function(){
      rss.get(req, res);
      
      assert(logger.verbose.calledOnce);
      assert.equal('rss.get', logger.verbose.args[0]);
    });

});

describe('get', function() {
  var req = {
    query: {},  
  };  
  var res = {};

  beforeEach(function(){
      res.send = sinon.stub();
      res.json = sinon.stub();  
      sinon.stub(rsslib, 'fetch');
      sinon.stub(logger, 'error');
    });
  
  afterEach(function(){
      logger.error.restore();
      rsslib.fetch.restore();
    });

  it('should return 500 when urls key not there', function(){
      rss.get(req, res);

      assert(res.send.calledOnce);
      assert(res.send.calledWith(500));
      assert(logger.error.calledOnce);
      assert.equal('missing query string', logger.error.args[0]);
    });
  
  it('should return rss when urls key exists', function(){
      req = {
        query: {
          src: "url"
        } 
      };
     
      rsslib.fetch.yields(null, 'json');
      
      rss.get(req, res);

      assert(rsslib.fetch.calledOnce);
      assert(rsslib.fetch.calledWith("url"));
      assert(res.json.calledOnce);
      assert(res.json.calledWith('json'));
    });

  it('should return error when failed to fetch rss', function(){
    req = {                                      
      query: {
        src: "url"
      } 
    };
   
    rsslib.fetch.yields('error', 'json');
    
    rss.get(req, res);
                                                         
    assert(rsslib.fetch.calledOnce);
    assert(rsslib.fetch.calledWith("url"));
    assert(res.send.calledOnce);
    assert(res.send.calledWith(500));
    assert(logger.error.calledOnce);
    assert.equal('error', logger.error.args[0]);
  });

});
