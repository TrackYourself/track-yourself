var sleep = require('./modules/sleep/sleep-module.js');

var trackerApp = angular.module('trackerApp', ['ngRoute', sleep.name]);

/*
trackerApp.controller('sleepDisplayLastCtrl', ['$scope', function($scope) {
  $scope.sleepRecord = 50;
}]);
*/

trackerApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sleep', {
    templateUrl: 'templates/sleep-last.html',
    controller: 'sleepDisplayLastCtrl'
  });
}]);

