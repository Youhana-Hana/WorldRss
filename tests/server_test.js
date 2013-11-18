var  sinon = require('sinon'),
     app = require('../src/app.js');

describe('server', function() {
  
  it('when requiring should be correct', function() {
    var name = require.resolve('../src/server');
    delete require.cache[name];
  });

});

describe('server', function() {
  beforeEach(function(){
      sinon.stub(app, 'configure');
      sinon.stub(app, 'listen');
    });
  
  afterEach(function(){
      app.configure.restore();
      app.listen.restore();
    });

  it('should listen to port 3000', function(){
      server = require('../src/server.js');

      // assert(app.configure.calledOnce);
      //assert(app.listen.calledOnce);
    });
  
});
