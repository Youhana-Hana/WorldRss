/*jshint unused:false */
function RssCtrl($scope, $http) {

  $scope.fetch = function(sources) {
    $http.get('http://localhost:3000/api/1/rss?src=' + sources)
      .success(function(data, status) {
        $scope.feeds = data;
        $scope.status = status;
      })
      .error(function(data, status) {
        $scope.feeds = [];
        $scope.failure = data || "Request failed";
        $scope.status = status;
      });
  };
}
