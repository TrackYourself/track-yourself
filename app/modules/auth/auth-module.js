var controllers = require('./auth-controllers.js');
var services = require('./auth-services.js');

// Define/register the auth module
var authModule = angular.module('authModule', []);

authModule.factory('authInterceptor', ['$q', '$location', '$rootScope', services.authInterceptor]);

// Import controller functions and register them
authModule.controller('registerCtrl',
  ['$scope', '$http', '$location', controllers.registerCtrl]);
authModule.controller('loginCtrl',
  ['$scope', '$http', '$location', '$rootScope', controllers.loginCtrl]);

module.exports = authModule;

