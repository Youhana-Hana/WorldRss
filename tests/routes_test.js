var  routes = require('../src/routes/routes.js'),
     rss = require('../src/routes/rss.js'),
     sinon = require('sinon'),
     assert = require('assert');

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
      sinon.stub(console, 'log');
    });

  afterEach(function(){
      console.log.restore();
    });

  it('should log', function(){
      routes.get(app);
      
      assert(console.log.calledOnce);
      assert.equal('routes.get', console.log.args[0]);
    });

});

describe('get', function() {
  var app = {};

  beforeEach(function(){
      app.get = sinon.stub();
      sinon.stub(console, 'log');
    });
  
  afterEach(function(){
      console.log.restore();
    });

  it('should setup get', function(){
      routes.get(app);

      assert(1 === app.get.callCount);
      assert(app.get.calledWith('/api/1/rss', rss.get));
    });

});
