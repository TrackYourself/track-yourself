var d3 = require('d3');

module.exports = function(app) {

  app.directive('sleepGraph', function() {

    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function(scope, element) {
				var margin = {top: 20, right: 20, bottom: 30, left: 60},
						width = 800 - margin.left - margin.right,
						height = 360 - margin.top - margin.bottom;

				var svg = d3.select(element[0])
						.append('svg')
						.attr('width', width + margin.left + margin.right)
						.attr('height', height + margin.top + margin.bottom)
						.append('g')
						.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

				var x = d3.time.scale().range([0, width]);
				var y = d3.scale.linear().range([height, 0]);

				var xAxis = d3.svg.axis()
						.scale(x)
						.orient("bottom");

				var yAxis = d3.svg.axis()
						.scale(y)
						.orient("left");
						//.ticks(10);

				//Render graph based on 'data'
				scope.render = function (data) {

          console.log(data);
          for (var i = 0; i < data.length; i++) {
            data[i].sleep = new Date(data[i].sleep);
            data[i].wake = new Date(data[i].wake);
          }
					//Set our scale's domains
					x.domain(d3.extent(data, function (d) {
            console.log(d.sleep);
						return d.sleep;
					}));
					y.domain(d3.extent(data, function (d) {
            console.log(d.duration);
						return d.duration;
					}));

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
							.attr("dy", ".3em")
							.style("text-anchor", "end")
							.text("Hours");

					var bars = svg.selectAll(".bar").data(data);
					bars.enter()
							.append("rect")
							.attr("class", "bar")
							.attr("x", function (d) {
                console.log(d);
								return x(d.sleep);
							})
							.attr("width", 100)
              .append("svg:title")
              .text(function(d) { return d.duration + ' hours'; });

					//Animate bars
					bars.transition()
							.duration(1000)
							.attr('height', function (d) {
								return height - y(d.duration);
							})
							.attr("y", function (d) {
                console.log(d);
								return y(d.duration);
							});
				};

				//Watch 'data' and run scope.render(newVal) whenever it changes
				//Use true for 'objectEquality' property so comparisons are done on equality and not reference
				scope.$watch('data', function (newVal) {
          scope.render(newVal);
				}, true);

      }
    };
  });
};
