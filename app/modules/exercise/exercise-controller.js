/* Define methods to use as controllers */

var DateFuncs = require('../../date-functions.js');

module.exports.exerciseInputCtrl = function($scope, $location, Exercise) {

	var dateFuncs = new DateFuncs();

	$scope.exerciseRecord = new Exercise({});
	$scope.inputSaved = false;


	$scope.exerciseEntered = function() {
			$scope.exerciseRecord.$save(function(exercise, respHeaders) {
					$scope.inputSaved = true;
					$scope.exerciseRecord = new Exercise({});
					/*global.setTimeout(function($scope){
							$scope.inputSaved = false;
					}, 3000);
          */
			});
	};

	// Default date
	$scope.exerciseRecord.date = dateFuncs.defaultInputDate();

};

module.exports.exerciseDisplayLastCtrl = function($scope, Exercise) {
    $scope.exerciseRecord = Exercise.get({});
};

module.exports.exerciseDisplayAllCtrl = function($scope, Exercise) {
    $scope.exerciseRecords = Exercise.getAll({});
};

module.exports.exerciseDisplayGraph = function($scope, Exercise) {
    $scope.exerciseRecords = Exercise.getGraph({});
};
