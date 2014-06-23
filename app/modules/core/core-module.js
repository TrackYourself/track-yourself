var controllers = require('./core-controllers.js');

// Define/register the core module
var coreModule = angular.module('coreModule', []);

// Import controller functions and register them
coreModule.controller('dashboardCtrl',
  ['$scope', controllers.dashboardCtrl]);

module.exports = coreModule;


