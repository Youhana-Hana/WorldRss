describe('RssCtrl', function() {
  var $httpBackend, $rootScope, createController;
  
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', 'http://localhost:3000/api/1/rss?src=url')
                             .respond([{'rss': 'content'}]);
    $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');
   
    createController = function() {
      return $controller('RssCtrl', {'$scope' : $rootScope });
    };

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should fetch data', function() {
    $httpBackend.expectGET('http://localhost:3000/api/1/rss?src=url');
    controller = createController();
    
    $rootScope.fetch('url');
    $httpBackend.flush();
  });

});

