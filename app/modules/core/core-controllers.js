// Wraps other controllers, gives access to url path
module.exports.appCtrl = function($scope, $location) {
  $scope.path = $location.path();

  $scope.$watch(function() {
      return $location.path();
    }, function(path) {
      $scope.path = path;
    }
  );
};

module.exports.dashboardCtrl = function($scope) {
};

