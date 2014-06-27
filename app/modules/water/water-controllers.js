/* Define methods to use as controllers */

/*
 Combining "all" with "last"

module.exports.waterDisplayLastCtrl = function ($scope, Water) {
	$scope.waterRecord = Water.get({});
};
*/

module.exports.waterInputCtrl = function($scope, $location, Water) {

  $scope.waterRecord = new Water({});
  $scope.inputSaved = false;


  $scope.waterEntered = function() {
    $scope.waterRecord.$save(function(intake, respHeaders) {
        $scope.inputSaved = true;
        $scope.waterRecord = new Water({});
        global.setTimeout(function($scope){
            $scope.inputSaved = false;
        }, 3000);
    });
  };

};

module.exports.waterDisplayAllCtrl = function($scope, Water) {
  $scope.waterRecords = Water.getAll({});
};

module.exports.waterGraphControl = function ($scope, Water) {
	$scope.waterRecords = Water.getAllGraph({});
};
