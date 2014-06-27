var controllers = require('./exercise-controller.js');
var services = require('./exercise-services.js');
var d3 = require('d3');
var DateFuncs = require('../../date-functions.js');

// Define/register the exercise module
var exerciseModule = angular.module('exerciseModule', []);

//Register resource function
exerciseModule
	.factory('Exercise', ['$resource', services.resource])
	.controller('exerciseDisplayLastCtrl',
    ['$scope', 'Exercise', controllers.exerciseDisplayLastCtrl])
  .controller('exerciseInputCtrl',
    ['$scope', '$location','Exercise', controllers.exerciseInputCtrl])
	.controller('exerciseDisplayAllCtrl',
    ['$scope','Exercise', controllers.exerciseDisplayAllCtrl])
	.controller('exerciseDisplayGraph',
    ['$scope','Exercise', controllers.exerciseDisplayGraph])
  .directive('exerciseVisualization', function () {

	return {
		restrict: 'E',
		scope   : {
			data: '=',
      height: '=',
      width: '='
		},
		link    : function (scope, element) {

			var margin = {top: 10, right: 0, bottom: 20, left: 30},
					width = scope.width - margin.left - margin.right,
					height = scope.height - margin.top - margin.bottom;

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

			var dateFuncs = new DateFuncs();

			//Render graph based on 'data'
			scope.render = function (data) {

				//Set our scale's domains
				x.domain(data.map(function (d) {
					return dateFuncs.formatDate(d._id);
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
						.text("Minutes");

				var bars = svg.selectAll(".bar").data(data);
				bars.enter()
						.append("rect")
						.attr("class", function (d) {
							return "intensity-" + Math.round(d.intensity);
						})
						.attr("x", function (d) {
							return x(dateFuncs.formatDate(d._id));
						})
						.attr("width", x.rangeBand())
            .append("svg:title")
            .text(function(d) { 
               var text = d.duration + ' minutes, intensity: ' + d.intesnity;
               if (d.notes) { 
                 '\nNotes: ' + d.notes;
               }
             });

				//Animate bars
				bars
						.transition()
						.duration(1000)
						.attr('height', function (d) {
							return height - y(d.duration);
						})
						.attr("y", function (d) {
							return y(d.duration);
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
