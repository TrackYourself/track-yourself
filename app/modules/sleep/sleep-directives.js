var d3 = require('d3');

module.exports = function(app) {

  app.directive('sleepGraph', function() {

    return {
      restrict: 'E',
      scope: {
        data: '=',
        width: '=',
        height: '='
      },
      link: function(scope, element) {
				var margin = {top: 20, right: 20, bottom: 30, left: 60},
						width = scope.width - margin.left - margin.right,
						height = scope.height - margin.top - margin.bottom;

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
				scope.render = function (dbData) {
          var data = [];

          for (var i = 0; i < dbData.length; i++) {
            data.push({
              sleep: new Date(dbData[i].sleep),
              wake: new Date(dbData[i].wake),
              notes: dbData[i].notes,
              duration: dbData[i].duration
            });
          }

					//Set our scale's domains
					x.domain([
            d3.max(data, function (d) {
              var max = new Date(d.sleep);
              max.setDate(d.sleep.getDate() + 1);
              return max;
            }),
            d3.min(data, function (d) {
              var min = new Date(d.sleep);
              min.setDate(d.sleep.getDate() - 1);
              return min;
            })
					]);
					y.domain(d3.extent(data, function (d) {
						return d.duration + 1;
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
              .attr('x', -20)
							.attr("dy", ".3em")
							.style("text-anchor", "end")
							.text("Hours");

					var bars = svg.selectAll(".bar").data(data);
					bars.enter()
							.append("rect")
							.attr("class", "bar")
							.attr("x", function (d) {
								return x(d.sleep);
							})
							.attr("width", 20)
              .append("svg:title")
              .text(function(d) { 
                 return d.duration + ' hours' + '\nNotes: ' + d.notes;
               });

					//Animate bars
					bars.transition()
							.duration(1000)
							.attr('height', function (d) {
								return y(d.duration);
							})
							.attr("y", function (d) {
								return 0;
							});
				};

				//Watch 'data' and run scope.render(newVal) whenever it changes
				//Use true for 'objectEquality' property so comparisons are done on equality and not reference
				scope.$watch('data', function (newVal) {
            if (newVal.$resolved) {
              scope.render(newVal);
            }
				}, true);

      }
    };
  });
};
