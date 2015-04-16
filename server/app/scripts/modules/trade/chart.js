

define(function(){

    return function(){
        return{
            restrict: 'A',
            link: function(scope, element, attrs){
                var svg = d3.select(element[0]);

                var barHeight = 25,
                    barSpacing = 10;

                var margin = {top: 50, left: 50, bottom: 50},
                    chartMargin = {top: 30};


                scope.render = function(data){
                    svg.selectAll('*').remove();

                    if(!data)
                        return;

                    var chart = svg.append('g');

                    var dataHeight = data.length * (barHeight + barSpacing),
                        height = margin.top + chartMargin. top + dataHeight + margin.bottom;
                        width = svg.node().offsetWidth,
                        orderIdWidth = 60,
                        orderIdPadding = 10,
                        totalUnderlineWidth = width * .1,
                        dataWidth = width * .6,

                        xScale = d3.scale.linear()
                                .domain([0, 1])
                                .range([0, dataWidth]),

                        xAxis = d3.svg.axis()
                                .scale(xScale)
                                .ticks(10)
                                .tickFormat( function(d){  // Only label 0%, 50%, and 100%
                                    if(d == 0 || d == .5 || d == 1)
                                        return (d * 100) + '%';
                                    else
                                        return null;
                                })
                                .orient('top');


                    //Resize parent height
                    svg.attr('viewBox', '(0 , 0, ' + width + 'px, ' + height + 'px)')
                    .style('height', height)
                    .style('width', width);
                    
                    //Position Chart
                    chart.attr('transform', 'translate(' + margin.left + ', ' + (margin.top + chartMargin.top)+ ')');

                    /* Chart Title */
                    svg.append('text')
                    .attr('text-anchor', 'middle')
                    .attr('x', width / 2)
                    .attr('y', margin.top)
                    .attr('class', 'chart-title')
                    .text('Order Execution Status');

                    //Append xAxis
                    chart.append('g')
                    .attr('class', 'x-axis')
                    .attr('transform', 'translate(' + orderIdWidth + ', ' + ' 0)')
                    .call(xAxis);

                    /* Dotted Lines */
                    d3.selectAll('g.tick')
                    .append('line')
                    .attr('x1', 0).attr('y1', 0)
                    .attr('x2', 0).attr('y2', dataHeight)
                    .attr('stroke', '#C1C1C1')
                    .attr('stroke-lincecap', 'round')
                    .attr('stroke-width', 1)
                    .attr('stroke-dasharray', '1, 1');

                    /* Total Label */
                    chart.append('text')
                    .attr('x', dataWidth + orderIdWidth + totalUnderlineWidth)
                    .attr('text-anchor', 'end')
                    .attr('class', 'total-label')
                    .text('Totals');

                    /* Order ID Label */
                    chart.append('text')
                    .attr('class', 'order-id-label')
                    .attr('transform', 'translate(0, ' +  (dataHeight / 2) +' )rotate(270)')
                    .text('Order Id');


                    /* Legend */
                    var legend = chart.append('g')
                    .attr('transform', 'translate(' + (orderIdWidth + dataWidth + totalUnderlineWidth + margin.left) + ', 0)' );

                    scope.renderLegend(legend);



                    /* Data Groups */
                    var groups = 
                    chart.append('g')
                    .attr('transform', 'translate(0, ' + barSpacing + ')')
                    .selectAll('.data').data(data).enter()
                    .append('g')
                    .attr('transform', function(d, i) { return 'translate(0, ' + i * (barHeight + barSpacing) + ')'});

                    /* Totals Underlines */
                    groups.append('rect')
                    .attr('x', dataWidth + orderIdWidth)
                    .attr('y', barHeight - 3)
                    .attr('width', totalUnderlineWidth)
                    .attr('height', 3)
                    .attr('class', 'total');

                    /* Total Data */
                    groups.append('text')
                    .attr('x', dataWidth + orderIdWidth + totalUnderlineWidth)
                    .attr('y', barHeight - 5)
                    .attr('text-anchor', 'end')
                    .attr('class', 'total-data')
                    .text( function(d) { return d.quantity });

                    /* Total Bars */
                    groups.append('rect')
                    .attr('height', barHeight)
                    .attr('width', dataWidth)
                    .attr('x' , orderIdWidth)
                    .attr('class', 'total');

                    /* Placed Bars */
                    groups.append('rect')
                    .attr('height', barHeight)
                    .attr('width', function(d){ return ((d.quantityPlaced / d.quantity) * dataWidth)})
                    .attr('x' , orderIdWidth)
                    .attr('class', 'placed');

                    /* Executed Bars */
                    groups.append('rect')
                    .attr('height', barHeight)
                    .attr('width', function(d){ return ((d.quantityExecuted / d.quantity) * dataWidth)})
                    .attr('x' , orderIdWidth)
                    .attr('class', 'executed');

                    /* Order Ids */
                    groups.append('text')
                    .attr('y', (barHeight + barSpacing) / 2)
                    .attr('x', orderIdWidth - orderIdPadding)
                    .attr('text-anchor', 'end')
                    .attr('class', 'chart-label')
                    .text( function(d) { return d.id } );

    
                    
                };



                scope.renderLegend = function(legend){
                    var legendSquareSize = 15;

                     /* Legend Total Label */
                    var legendTotal = legend.append('g');

                    legendTotal.append('text')
                    .attr('x' , legendSquareSize + 10)
                    .attr('y', legendSquareSize / 2)
                    .attr('class', 'legend-label')
                    .attr('alignment-baseline', 'middle')
                    .text('Total Order');

                    legendTotal.append('rect')
                    .attr('class', 'total')
                    .attr('height', legendSquareSize)
                    .attr('width', legendSquareSize);

                    /* Legend Placed Label */
                    var legendPlaced = legend.append('g')
                    .attr('transform', 'translate(0, ' + (legendSquareSize * 2) + ')');

                    legendPlaced.append('text')
                    .attr('x' , legendSquareSize + 10)
                    .attr('y', legendSquareSize / 2)
                    .attr('class', 'legend-label')
                    .attr('alignment-baseline', 'middle')
                    .text('Placed');

                    legendPlaced.append('rect')
                    .attr('class', 'placed')
                    .attr('height', legendSquareSize)
                    .attr('width', legendSquareSize);

                    /* Legend Executed Label */
                    /* Legend Total Label */
                    var legendExecuted = legend.append('g')
                    .attr('transform', 'translate(0, ' + (legendSquareSize * 4) + ')');

                    legendExecuted.append('text')
                    .attr('x' , legendSquareSize + 10)
                    .attr('y', legendSquareSize / 2)
                    .attr('class', 'legend-label')
                    .attr('alignment-baseline', 'middle')
                    .text('Executed');

                    legendExecuted.append('rect')
                    .attr('class', 'executed')
                    .attr('height', legendSquareSize)
                    .attr('width', legendSquareSize);

                };



                scope.$watch('rootOrders', function(newVal, oldVal){
                    console.log('Updated.');
                    scope.render(newVal);
                }, true);


            }
        };
    };
});
    