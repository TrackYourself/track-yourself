/* Define methods to use as controllers */

module.exports.exerciseInputCtrl = function($scope, $location, Exercise) {
    $scope.exerciseRecord = new Exercise({});

    $scope.exerciseEntered = function() {
        $scope.exerciseRecord.$save(function(exercise, respHeaders) {
            console.log(respHeaders);
            $location.path('/exercise/all');
        });
    };
};

module.exports.exerciseDisplayLastCtrl = function($scope, Exercise) {
    $scope.exerciseRecord = Exercise.get({});
};

module.exports.exerciseDisplayAllCtrl = function($scope, Exercise) {
    $scope.exerciseRecords = Exercise.getAll({});
};
