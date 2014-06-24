var core = require('./modules/core/core-module.js');
var sleep = require('./modules/sleep/sleep-module.js');
var water = require('./modules/water/water-module.js');
var exercise = require('./modules/exercise/exercise-module.js');
var auth = require('./modules/auth/auth-module.js');

var trackerApp = angular.module('trackerApp', [
  'ngRoute', 'ngResource', sleep.name, water.name, exercise.name, auth.name, core.name
]);

// Register auth interceptor
trackerApp.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
}]);

// Routes
trackerApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider

    // Auth
    .when('/register', {
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    // Main pages
    .when('/dashboard', {
      templateUrl: 'templates/dashboard.html',
      controller: 'dashboardCtrl'
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
			templateUrl: 'templates/water.html'
		})
		.when('/water/add', {
			templateUrl: 'templates/water-input.html',
			controller: 'waterInputCtrl'
		})

		/*
		Combining "all" with "last"

		.when('/water/all', {
			templateUrl: 'templates/water-all.html',
			controller: 'waterDisplayAllCtrl'
		})
		*/

        //Exercise
        .when('/exercise', {
            templateUrl: 'templates/exercise-last.html',
            controller: 'exerciseDisplayCtrl'
        })

        .when('/exercise/add', {
            templateUrl: 'templates/exercise-input.html',
            controller: 'exerciseInputCtrl'
        })

        .when('/exercise/all', {
            templateUrl: 'templates/exercise-all.html',
            controller: 'exerciseDisplayAllCtrl'
        })

    .otherwise('/', {
      redirectTo: '/dashboard'
    });

}]);

// test
