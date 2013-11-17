var  rss = require('../src/routes/rss.js'),
     sinon = require('sinon'),
     assert = require('assert');

describe('rss', function() {
  
  it('when requiring should be correct', function() {
    var name = require.resolve('../src/routes/rss');
    delete require.cache[name];
  });

});


describe('logging', function() {
  var req = {};  
  var res = {};

  beforeEach(function(){
      res.send = sinon.stub();
      sinon.stub(console, 'log');
    });

  afterEach(function(){
      console.log.restore();
    });

  it('should log', function(){
      rss.get(req, res);
      
      assert(console.log.calledOnce);
      assert.equal('rss.get', console.log.args[0]);
    });

});

describe('get', function() {
  var req = {};
  var res = {};

  beforeEach(function(){
      res.send = sinon.stub();
      sinon.stub(console, 'log');
    });
  
  afterEach(function(){
      console.log.restore();
    });

  it('should return 401', function(){
      rss.get(req, res);

      assert(1 === res.send.callCount);
      assert(res.send.calledWith(401));
    });

});
