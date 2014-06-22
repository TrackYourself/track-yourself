var controllers = require('./auth-controllers.js');
var services = require('./auth-services.js');

// Define/register the auth module
var authModule = angular.module('authModule', []);

/* Register resource function
authModule.factory('register', ['$http', services.register]);
*/
// Import controller functions and register them
authModule.controller('registerCtrl',
  ['$scope', '$http', controllers.registerCtrl]);

module.exports = authModule;

