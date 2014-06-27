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
    .when('/signup', {
      templateUrl: 'templates/register.html',
      controller: 'registerCtrl'
    })
    .when('/login', {
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
    .when('/logout', {
      controller: 'logoutCtrl'
    })

    // Main pages
    .when('/dashboard', {
      templateUrl: 'templates/dashboard.html',
      controller: 'dashboardCtrl'
    })
    .when('/inputs', {
      templateUrl: 'templates/inputs.html'
    })


		// Sleep
		.when('/sleep', {
			templateUrl: 'templates/sleep.html',
			controller: 'sleepDisplayCtrl'
		})

		// Water
		.when('/water', {
			templateUrl: 'templates/water.html'
		})
		.when('/water/add', {
			templateUrl: 'templates/water-input.html',
			controller: 'waterInputCtrl'
		})
    //Exercise
    .when('/exercise', {
        templateUrl: 'templates/exercise-all.html'
    })

    .when('/exercise/add', {
        templateUrl: 'templates/exercise-input.html',
        controller: 'exerciseInputCtrl'
    })
    .when('/home', {
      templateUrl: 'templates/home.html'
    })

    .otherwise({
      redirectTo: '/home'
    });

}]);