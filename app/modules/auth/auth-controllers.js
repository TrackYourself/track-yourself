
module.exports.loginCtrl = function($scope, $http, $location, $rootScope) {
  $scope.user = {email: '', password: ''};
  $scope.error = '';

  $scope.logIn = function() {
    $http.post('/auth/login', $scope.user)
      .success(function(data, status, headers, config) {
        $rootScope.currentUser = $scope.user.email;
        $location.path('/dashboard');
      })
      .error(function(data, status, headers, config) {
        $scope.error = data.message;
      });
  };
};

module.exports.registerCtrl = function($scope, $http, $location) {

  $scope.user = {name: '', email: '', password: ''};

  $scope.error = '';

  $scope.register = function() {
    $http.post('/auth/register', $scope.user)
      .success(function(data, status, headers, config) {
        $location.path('/dashboard');
      })
      .error(function(data, status, headers, config) {
        $scope.error = data.message;
      });
  };

};

