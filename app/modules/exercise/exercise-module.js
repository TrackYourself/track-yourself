var controllers = require('./exercise-controller.js');
var services = require('./exercise-services.js');

// Define/register the exercise module
var exerciseModule = angular.module('exerciseModule', []);

//Register resource function
exerciseModule.factory('Exercise', ['$resource', services.resource]);


// Import controller functions and register them
exerciseModule.controller('exerciseDisplayLastCtrl',
    ['$scope', 'Exercise', controllers.exerciseDisplayCtrl]);

exerciseModule.controller('exerciseInputCtrl',
    ['$scope', '$location','Exercise', controllers.exerciseInputCtrl]);

exerciseModule.controller('exerciseDisplayAllCtrl',
    ['$scope','Exercise', controllers.exerciseDisplayAllCtrl]);


module.exports = exerciseModule;
