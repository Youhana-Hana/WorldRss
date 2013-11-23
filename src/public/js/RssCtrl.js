/*jshint unused:false */
function RssCtrl($scope, $http, $templateCache) {

  $scope.fetch = function(sources) {
    $http({ method: 'get', url: 'http://localhost:3000/api/1/rss?src=' + sources,
            cache: $templateCache }).
      success(function(data, status) {
        $scope.feeds = data;
        $scope.status = status;
      }).
      error(function(data, status) {
        $scope.feeds = [];
        $scope.failure = data || "Request failed";
        $scope.status = status;
      });
  };
}
