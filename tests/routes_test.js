var  routes = require('../src/routes/routes.js'),
     rss = require('../src/routes/rss.js'),
     sinon = require('sinon'),
     assert = require('assert'),
     logger = require('../src/lib/logger.js');

describe('routes', function() {
  
  it('when requiring should be correct', function() {
    var name = require.resolve('../src/routes/routes');
    delete require.cache[name];
  });

});


describe('logging', function() {
  var app = {};

  beforeEach(function(){
      app.get = sinon.stub();
      sinon.stub(logger, 'verbose');
    });

  afterEach(function(){
      logger.verbose.restore();
    });

  it('should log', function(){
      routes.get(app);
      
      assert(logger.verbose.calledOnce);
      assert.equal('routes.get', logger.verbose.args[0]);
    });

});

describe('get', function() {
  var app = {};

  beforeEach(function(){
      app.get = sinon.stub();
    });
  
  it('should setup get', function(){
      routes.get(app);

      assert(1 === app.get.callCount);
      assert(app.get.calledWith('/api/1/rss', rss.get));
    });

});
