var controllers = require('./controllers/sleep-controller.js');

// Define/register the sleep module
var sleepModule = angular.module('sleepModule', []);

// Import controller functions and register them
sleepModule.controller('sleepDisplayLastCtrl',
  ['$scope', controllers.sleepDisplayLastCtrl]);

module.exports = sleepModule;

