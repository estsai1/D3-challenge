// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
var svgWidth = 600;
var svgHeight = 400;

// Define the chart's margins as an object
var chartMargin = {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10
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

    // Log healthcare, poverty, and state abbreviation
    var healthcare = data.map(d => d.healthcare);
    var poverty = data.map(d => d.poverty);
    var abbr = data.map(d => d.abbr);

    console.log("Abbr:", abbr, "Healthcare:", healthcare, "Poverty:", poverty);

    // data.forEach(function(data)



});