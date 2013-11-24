describe('RssCtrl', function() {
  var $httpBackend, $rootScope, createController;

    beforeEach(inject(function($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $rootScope = $injector.get('$rootScope');
      var $controller = $injector.get('$controller');
   
      createController = function() {
       return $controller('RssCtrl', {'$scope' : $rootScope });
      };
 
    }));
 
  describe('$http succeeded', function() { 
    var response = {'rss': 'content'};
   
     beforeEach(inject(function($injector) {
      $httpBackend.when('GET', 'http://localhost:3000/api/1/rss?src=url')
                             .respond(response);
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
      expect($rootScope.feeds).toBe(response);
    });

  });

  describe('$http failed', function() { 
   
     beforeEach(inject(function($injector) {
      $httpBackend.when('GET', 'http://localhost:3000/api/1/rss?src=url')
                             .respond(500, 'error!');
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
      $rootScope.feeds.should.be.empty;
      expect($rootScope.failure).toBe('error!');
    });

  });

});

