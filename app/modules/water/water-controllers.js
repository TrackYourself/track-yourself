var DateFuncs = require('../../date-functions.js');

module.exports.waterInputCtrl = function($scope, $location, Water) {

	var dateFuncs = new DateFuncs();

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

	// Default date
	$scope.waterRecord.drank = dateFuncs.defaultInputDate();

};

module.exports.waterDisplayAllCtrl = function($scope, Water) {
  $scope.waterRecords = Water.getAll({});
};

module.exports.waterGraphControl = function ($scope, Water) {
	$scope.waterRecords = Water.getAllGraph({});
};
