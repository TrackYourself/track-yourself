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
  ['$scope', '$location', 'Sleep', controllers.sleepInputCtrl]);
sleepModule.controller('sleepDisplayAllCtrl',
  ['$scope', 'Sleep', controllers.sleepDisplayAllCtrl]);

module.exports = sleepModule;
