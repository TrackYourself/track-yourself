(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var sleep = require('./modules/sleep/sleep-module.js');

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


},{"./modules/sleep/sleep-module.js":4}],2:[function(require,module,exports){

module.exports.resource = function($resource) {
  return $resource('/sleep/:user',
    {user: 'testuser'}, //default params
    {getAll: {
      method: 'GET',
      url: '/sleep/:user/all',
      isArray: true,
      responseType: 'json'
    }}
  ); 
};


},{}],3:[function(require,module,exports){
/* Define methods to use as controllers */


module.exports.sleepInputCtrl = function($scope, Sleep) {
  $scope.sleepRecord = new Sleep({});

  $scope.sleepEntered = function() {
    $scope.sleepRecord.$save(function(sleep, respHeaders) {
      console.log(respHeaders);
    });
  };
};

module.exports.sleepDisplayLastCtrl = function($scope, Sleep) {
  $scope.sleepRecord = Sleep.get({});
};

module.exports.sleepDisplayAllCtrl = function($scope, Sleep) {
  $scope.sleepRecords = Sleep.getAll({});
};

  

},{}],4:[function(require,module,exports){
var controllers = require('./sleep-controllers.js');
var services = require('./services.js');

// Define/register the sleep module
var sleepModule = angular.module('sleepModule', []);

// Register resource function
sleepModule.factory('Sleep', ['$resource', services.resource]);

// Import controller functions and register them
sleepModule.controller('sleepDisplayLastCtrl',
  ['$scope', 'Sleep', controllers.sleepDisplayLastCtrl]);
sleepModule.controller('sleepInputCtrl',
  ['$scope', 'Sleep', controllers.sleepInputCtrl]);
sleepModule.controller('sleepDisplayAllCtrl',
  ['$scope', 'Sleep', controllers.sleepDisplayAllCtrl]);

module.exports = sleepModule;


},{"./services.js":2,"./sleep-controllers.js":3}]},{},[1])