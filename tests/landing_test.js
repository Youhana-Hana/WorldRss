var  landing = require('../src/routes/landing.js'),
     sinon = require('sinon'),
     assert = require('assert'),
     logger = require('../src/lib/logger.js');

describe('landing', function() {
  
  it('when requiring should be correct', function() {
    var name = require.resolve('../src/routes/landing');
    delete require.cache[name];
  });

});


describe('logging', function() {
  var req = {}; 
  var res = {};

  beforeEach(function(){
      res.render = sinon.stub();
      sinon.stub(logger, 'verbose');
    });

  afterEach(function(){
      logger.verbose.restore();
    });

  it('should log', function(){
      landing.get(req, res);
      
      assert(logger.verbose.calledOnce);
      assert.equal('landing.get', logger.verbose.args[0]);
    });

});

describe('get', function() {
  var req = {}; 
  var res = {};

  beforeEach(function(){
      res.render = sinon.stub();
    });
  
  it('should return 500 when urls key not there', function(){
      landing.get(req, res);

      assert(res.render.calledOnce);
      assert(res.render.calledWith('landing'));
    });
});
