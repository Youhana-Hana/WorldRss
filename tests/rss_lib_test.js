var  rss = require('../src/lib/rss.js'),
     sinon = require('sinon'),
     assert = require('assert');

describe('rss', function() {
  
  it('when requiring should be correct', function() {
    var name = require.resolve('../src/lib/rss');
    delete require.cache[name];
  });

});


describe('logging', function() {
  beforeEach(function(){
      sinon.stub(console, 'log');
    });

  afterEach(function(){
      console.log.restore();
    });

  it('should log', function(done){
      rss.fetch('url', done);
      
      assert.equal('rss.fetch %s', console.log.args[0][0]);
      assert.equal('url', console.log.args[0][1]);
    });

});

































































