var sleep = require('./modules/sleep/sleep-module.js');
var water = require('./modules/water/water-module.js');
var auth = require('./modules/auth/auth-module.js');

var trackerApp = angular.module('trackerApp', ['ngRoute', 'ngResource', sleep.name, water.name, auth.name]);

trackerApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider

    // Auth
    .when('/register', {
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    })

		// Sleep
		.when('/sleep', {
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
		})

		// Water
		.when('/water', {
			templateUrl: 'templates/water-last.html',
			controller: 'waterDisplayLastCtrl'
		})
		.when('/water/add', {
			templateUrl: 'templates/water-input.html',
			controller: 'waterInputCtrl'
		})
		.when('/water/all', {
			templateUrl: 'templates/water-all.html',
			controller: 'waterDisplayAllCtrl'
		});
}]);

// test
