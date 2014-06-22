
module.exports.registerCtrl = function($scope, $http) {
  
  $scope.user = {name: '', email: '', password: ''};

  $scope.error = '';

  $scope.register = function() {
    console.log($scope.user);
    $http.post('/auth/register', $scope.user)
      .success(function(data, status, headers, config) {
        console.log('success!' + data);
      })
      .error(function(data, status, headers, config) {
        console.log('error! ' + status);
        $scope.error = data.message;
      });
  };
    
};

