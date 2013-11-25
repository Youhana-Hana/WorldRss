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

describe('rssService', function () {
  var rssService, $httpBackend;
  beforeEach(angular.mock.module('rssModule'));

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      rssService = $injector.get('rssService');
    });
  });

  describe('query', function () {
    it('should call rss with url', inject(function (rssService) {
      $httpBackend.expectGET('/api/1/rss?src=URL')
              .respond([ { rss : "content" } ]);

      var result = rssService.query({sources: "URL"});
      $httpBackend.flush();

      expect(result[0].rss).toEqual('content');
    }));

  });
});
