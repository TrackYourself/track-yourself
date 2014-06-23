var controllers = require('./excercise-controllers.js');
var services = require('./excercise-services.js');

// Define/register the excercise module
var excerciseModule = angular.module('excerciseModule', []);

//Register resource function
excerciseModule.factory('Excercise', ['$resource', services.resource]);

// Import controller functions and register them
excerciseModule.controller('excerciseDisplayLastCtrl',
    ['$scope', 'Excercise', controllers.excerciseDisplayCtrl]);
excerciseModule.controller('excerciseInputCtrl',
    ['$scope', '$location','Excercise', controllers.excerciseInputCtrl]);
excerciseModule.controller('excerciseDisplayAllCtrl',
    ['$scope','Excercise', controllers.excerciseDisplayAllCtrl]);

module.exports = excerciseModule;
