var sleep = require('./modules/sleep/sleep-module.js');
require('angular');
require('angular-route');
require('angular-resource');

var trackerApp = angular.module('trackerApp', ['ngRoute', 'ngResource', sleep.name]);

trackerApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/sleep', {
    templateUrl: 'templates/sleep-last.html',
    controller: 'sleepDisplayLastCtrl'
  })
  .when('/sleep/add', {
    templateUrl: 'templates/sleep-input.html',
    controller: 'sleepInputCtrl'
  })
  .when('/sleep/all', {
    templateUrl: 'templates/sleep-all.html',
    controller: 'sleepDisplayAllCtrl'
  });
}]);
