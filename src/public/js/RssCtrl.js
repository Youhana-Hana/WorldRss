/*jshint unused:false */
function RssCtrl($scope, $http, $templateCache) {

  $scope.fetch = function(sources) {
    $http({ method: 'get', url: 'http://localhost:3000/api/1/rss?src=' + sources,
            cache: $templateCache }).
      success(function(data, status) {
        $scope.rss = JSON.parse(data);
        $scope.status = status;
      }).
      error(function(data, status) {
        $scope.rss = [];
        $scope.failure = data || "Request failed";
        $scope.status = status;
      });
  };
}
