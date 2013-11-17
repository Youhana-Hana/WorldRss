var app = require('../src/app.js'),
     sinon = require('sinon'),
     should = require('should'),
     assert = require('assert');

describe('app', function() {
  
  it('when requiring should be correct', function() {
    var name = require.resolve('../src/app');
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

  it('should log configure', function(){
			app.configure();
			assert.equal('app.configure', console.log.args[0]);
		});

});

describe('settings', function() {
 
  beforeEach(function(){
      sinon.stub(console, 'log');
    });

  afterEach(function(){
      console.log.restore();
    });

  it('should set settings', function(){
			app.configure();
			
			assert.equal('ejs', app.get('view engine'));
			assert.equal('/home/Youhana/src/WorldRss/src/views', app.get('views'));
			assert.equal('3000', app.get('port'));
		});

});

describe('routes', function() {
  
  it('when confiure should set routes', function() {
    var routes = app.routes;
    should.notStrictEqual(undefined, routes);
    should.notStrictEqual(undefined, routes.get);
    routes.get[0].path.should.equal('/api/1/rss');
  });

});
