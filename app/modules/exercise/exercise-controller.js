/* Define methods to use as controllers */

module.exports.exerciseInputCtrl = function($scope, $location, Exercise) {
    $scope.exerciseRecord = new Exercise({});
    $scope.inputSaved = false;


    $scope.exerciseEntered = function() {
        $scope.exerciseRecord.$save(function(exercise, respHeaders) {
            $scope.inputSaved = true;
            $scope.exerciseRecord = new Exercise({});
            global.setTimeout(function($scope){
                $scope.inputSaved = false;
            }, 3000);
        });
    };
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
