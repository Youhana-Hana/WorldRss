var app = require('../src/app.js'),
     sinon = require('sinon'),
     assert = require('assert');

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

  it('should set settings', function(){
			app.configure();
			
			assert.equal('ejs', app.get('view engine'));
			assert.equal('/home/Youhana/src/WorldRss/src/views', app.get('views'));
			assert.equal('3000', app.get('port'));
		});

});
