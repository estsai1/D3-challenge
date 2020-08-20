// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var chartMargin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select id=scatter, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
d3.csv("https://raw.githubusercontent.com/estsai1/test/master/data.csv").then(function(data) {

    console.log(data);

    // Format healthcare and poverty to numbers
    data.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

    // Log healthcare, poverty, and state abbreviation
    var healthcare = data.map(d => d.healthcare);
    var poverty = data.map(d => d.poverty);
    var abbr = data.map(d => d.abbr);

    console.log("Abbr:", abbr, "Healthcare:", healthcare, "Poverty:", poverty);

    // Set up bottom axis
    var x_scale = d3.scaleLinear()
        .domain([8, d3.max(data, entry => entry.poverty)])
        .range([0, chartWidth]);
    var bottom_axis = d3.axisBottom(x_scale);
    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottom_axis);

    // Set up left axis
    var y_scale = d3.scaleLinear()
        .domain([4, d3.max(data, entry => entry.healthcare)])
        .range([chartHeight, 0]);
    var left_axis = d3.axisLeft(y_scale);
    chartGroup.append("g")
        .classed("axis", true)
        .call(left_axis);

    // Create axis labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left + 40)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 30})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");        

    // Draw states
    var circles_group = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", data => x_scale(data.poverty))
        .attr("cy", data => y_scale(data.healthcare))
        .attr("r", 15)
        .attr("fill", "skyblue");

    // Add state abbreviations to circles
    // Doesn't work quite right
    var state_names = chartGroup.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("dx", function(data) {
            return x_scale(data.poverty) - 12;
        })
        .attr("dy", function(data) {
            return y_scale(data.healthcare) + 5;
        })
        .style("fill", "white")
        .text(function (data) {
            return data.abbr;
        });

});