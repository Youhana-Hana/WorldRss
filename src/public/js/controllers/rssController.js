/*jshint unused:false */

angular.module('rssModule', ['ngResource']).
factory('rssService', function($resource) {
  return $resource('/api/1/rss?src=:sources', {});
});

function rssController($scope, rssService) {
  $scope.fetch = function(urls) {
    $scope.feeds = rssService.query({
      sources:urls
    });
  };
}
