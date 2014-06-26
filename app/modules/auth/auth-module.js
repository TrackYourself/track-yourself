var controllers = require('./auth-controllers.js');
var services = require('./auth-services.js');

// Define/register the auth module
var authModule = angular.module('authModule', []);

authModule.factory('authInterceptor', ['$q', '$location', '$rootScope', services.authInterceptor]);

// Import controller functions and register them
authModule.controller('registerCtrl',
  ['$scope', '$http', '$location', '$rootScope', controllers.registerCtrl]);
authModule.controller('loginCtrl',
  ['$scope', '$http', '$location', '$rootScope', controllers.loginCtrl]);
authModule.controller('logoutCtrl',
  ['$scope', '$http', '$location', '$rootScope', controllers.logoutCtrl]);

module.exports = authModule;

