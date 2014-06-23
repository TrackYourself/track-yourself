/* Define methods to use as controllers */

module.exports.excerciseInputCtrl = function($scope, $location, Excercise) {
    $scope.excerciseRecord = new Excercise({});

    $scope.excerciseEntered = function() {
        $scope.excerciseRecord.$save(function(excercise, respHeaders) {
            console.log(respHeaders);
            $location.path('/excercise/all');
        });
    };
};

module.exports.excerciseDisplayLastCtrl = function($scope, Excercise) {
    $scope.excerciseRecord = Excercise.get({});
};

module.exports.excerciseDisplayAllCtrl = function($scope, Excercise) {
    $scope.excerciseRecords = Excercise.getAll({});
};
