var controllers = require('./exercise-controller.js');
var services = require('./exercise-services.js');
var d3 = require('d3');

// Define/register the exercise module
var exerciseModule = angular.module('exerciseModule', []);

//Register resource function
exerciseModule.factory('Exercise', ['$resource', services.resource]);


// Import controller functions and register them
exerciseModule.controller('exerciseDisplayLastCtrl',
    ['$scope', 'Exercise', controllers.exerciseDisplayLastCtrl]);

exerciseModule.controller('exerciseInputCtrl',
    ['$scope', '$location','Exercise', controllers.exerciseInputCtrl]);

exerciseModule.controller('exerciseDisplayAllCtrl',
    ['$scope','Exercise', controllers.exerciseDisplayAllCtrl]);

exerciseModule.directive('exerciseVisualization', function () {

	return {
		restrict: 'E',
		scope   : {
			data: '='
		},
		link    : function (scope, element) {

			var margin = {top: 20, right: 20, bottom: 30, left: 40},
					width = 800 - margin.left - margin.right,
					height = 360 - margin.top - margin.bottom;

			var svg = d3.select(element[0])
					.append("svg")
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
			var y = d3.scale.linear().range([height, 0]);

			var xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom");

			var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left")
					.ticks(10);

			var formatDotw = function (dayInt) {
				switch (dayInt) {
					case 0:
						return 'Sun';
					case 1:
						return 'Mon';
					case 2:
						return 'Tue';
					case 3:
						return 'Wed';
					case 4:
						return 'Thu';
					case 5:
						return 'Fri';
					case 6:
						return 'Sat';
				}
			};


			var formatDate = function (dateId) {
				var newDate = new Date(dateId);
				var today = new Date();

				if (today.getDate() === newDate.getDate()) {
					return 'Today';
				}

				var dateString = formatDotw(newDate.getDay());
				dateString += ' - ' + (newDate.getMonth() + 1);
				dateString += '/' + newDate.getDate();

				return dateString;
			};

			//Render graph based on 'data'
			scope.render = function (data) {

				//Set our scale's domains
				x.domain(data.map(function (d) {
					return formatDate(d.date);
				}));
				y.domain([0, d3.max(data, function (d) {
					return d.duration;
				})]);

				//Redraw the axes
				svg.selectAll('g.axis').remove();
				//X axis
				svg.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0," + height + ")")
						.call(xAxis);

				//Y axis
				svg.append("g")
						.attr("class", "y axis")
						.call(yAxis)
						.append("text")
						.attr("transform", "rotate(-90)")
						.attr("y", 6)
						.attr("dy", ".71em")
						.style("text-anchor", "end")
						.text("Duration (minutes)");

				var bars = svg.selectAll(".bar").data(data);
				bars.enter()
						.append("rect")
						.attr("class", function (d) {
							return "intensity-" + d.intensity;
						})
						.attr("x", function (d) {
							return x(formatDate(d.date));
						})
						.attr("width", x.rangeBand());

				//Animate bars
				bars
						.transition()
						.duration(1000)
						.attr('height', function (d) {
							return height - y(d.duration);
						})
						.attr("y", function (d) {
							return y(d.duration);
						})
            .append("svg:title")
            .text(function(d) { 
               return d.duration + ' minutes, intensity: ' + d.intesnity + 
               '\nNotes: ' + d.notes;
             });
			};

			//Watch 'data' and run scope.render(newVal) whenever it changes
			//Use true for 'objectEquality' property so comparisons are done on equality and not reference
			scope.$watch('data', function () {
				scope.render(scope.data);
			}, true);
		}
	};
});


module.exports = exerciseModule;
