describe('rssController', function() {
  var  $rootScope, rssService, createController;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
    
    rssService = { query: jasmine.createSpy() };
    
    createController = function() {
      return $controller('rssController', {'$scope' : $rootScope,  'rssService': rssService});
    };
 
  }));
 
  it('should fetch data', function() {
    controller = createController();
    $rootScope.fetch('url');
    
    expect(rssService.query.callCount).toEqual(1);
    expect(rssService.query.mostRecentCall.args).toEqual([ { sources : 'url' } ]);
  });

});
