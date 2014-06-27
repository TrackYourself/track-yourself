/* Define methods to use as controllers */

module.exports.sleepMainCtrl = function($scope, Sleep) {
  $scope.sleepRecord = Sleep.get({});
  $scope.newSleep = new Sleep({});

  $scope.sleepEntered = function() {
    console.log($scope.newSleep);
    $scope.newSleep.$save(function(sleep, respHeaders) {
      $scope.sleepRecord = sleep;
    });
  };
};

module.exports.sleepDisplayCtrl = function($scope, Sleep) {
  $scope.sleepRecords = Sleep.getAll({});
};
