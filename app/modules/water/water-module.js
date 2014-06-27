var controllers = require('./water-controllers.js');
var services = require('./water-services.js');
var d3 = require('d3');
var DateFuncs = require('../../date-functions.js');

// Define/register the water module
var waterModule = angular.module('waterModule', []);

// Register resource function
waterModule
	.factory('Water', ['$resource', services.resource])
	.controller(
		'waterInputCtrl',
		['$scope', '$location', 'Water', controllers.waterInputCtrl]
	)
	.controller(
			'waterDisplayAllCtrl',
			['$scope', 'Water', controllers.waterDisplayAllCtrl]
	)
	.controller(
		'waterGraphControl',
		['$scope', 'Water', controllers.waterGraphControl]
	)
	.directive( 'waterVisualization', function () {

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

				var dateFuncs = new DateFuncs();

				//Render graph based on 'data'
				scope.render = function (data) {

					//Set our scale's domains
					x.domain(data.map(function (d) {
						return dateFuncs.formatDate(d._id);
					}));
					y.domain([0, d3.max(data, function (d) {
						return d.total;
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
							.text("Cups");

					var bars = svg.selectAll(".bar").data(data);
					bars.enter()
							.append("rect")
							.attr("class", "bar")
							.attr("x", function (d) {
								return x(dateFuncs.formatDate(d._id));
							})
							.attr("width", x.rangeBand())
              .append("svg:title")
              .text(function(d) { 
                 var text = d.total + ' cups';
                 if (d.notes) {
                   text += '\nNotes: ' + d.notes;
                 }
                return text;
              });

					//Animate bars
					bars
							.transition()
							.duration(1000)
							.attr('height', function (d) {
								return height - y(d.total);
							})
							.attr("y", function (d) {
								return y(d.total);
							})
				};

				//Watch 'data' and run scope.render(newVal) whenever it changes

				//Use true for 'objectEquality' property so comparisons are done on equality and not reference
				scope.$watch('data', function (newVal) {
          //if (newVal.$resolved) {
					scope.render(newVal);
          //}
				}, true);
			}
		};
	});

/*
Combining "all" with "last"

waterModule.controller(
	'waterDisplayLastCtrl',
	['$scope', 'Water', controllers.waterDisplayLastCtrl]
);
*/

module.exports = waterModule;
