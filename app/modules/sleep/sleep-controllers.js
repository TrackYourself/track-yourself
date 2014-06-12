/* Define methods to use as controllers */


module.exports.sleepInputCtrl = function($scope, Sleep) {
  $scope.sleepRecord = new Sleep({});

  $scope.sleepEntered = function() {
    $scope.sleepRecord.$save(function(sleep, respHeaders) {
      console.log(respHeaders);
    });
  };
};

module.exports.sleepDisplayLastCtrl = function($scope, Sleep) {
  $scope.sleepRecord = Sleep.get({});
};

module.exports.sleepDisplayAllCtrl = function($scope, Sleep) {
  $scope.sleepRecords = Sleep.getAll({});
};

  
