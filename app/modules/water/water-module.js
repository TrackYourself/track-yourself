var controllers = require('./water-controllers.js');
var services = require('./water-services.js');

// Define/register the water module
var waterModule = angular.module('waterModule', []);

// Register resource function
waterModule.factory('Water', ['$resource', services.resource]);

// Import controller functions and register them
waterModule.controller(
	'waterDisplayLastCtrl',
  ['$scope', 'Water', controllers.waterDisplayLastCtrl]
);
waterModule.controller(
	'waterInputCtrl',
  ['$scope', '$location', 'Water', controllers.waterInputCtrl]
);
waterModule.controller(
	'waterDisplayAllCtrl',
  ['$scope', 'Water', controllers.waterDisplayAllCtrl]
);

module.exports = waterModule;
