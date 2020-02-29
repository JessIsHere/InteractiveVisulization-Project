//Start building app.js file for states from ACA data for first dropdown
var url = "/API/Data"

// set the dimensions and margins of the graph
var margin = {top: 10, right: 100, bottom: 30, left: 30},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#myChart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//DROPDOWN MENU POPULATING WITH STATE NAMES FROM DATA
//Extract samples data from json file.
d3.json(url).then(function(data) {

  // console.log(data);

  //Extract the states and use these to create a listing for the state dropdown menu.
  var states = data.map(value => value.State);
  console.log(states);

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selStateData");

  //Initial menu option should be "California"
  var cell = dropdownMenu.append("option");
  cell.text("California");

  //Loop through states for appending to dropdownMenu below "State"
  states.forEach(function(newState) {

      //For each new sampleNumber, append a new row and state text.
      var cell = dropdownMenu.append("option");
      cell.text(newState);

  });          

  updateChart()

});

d3.select("#selStateData").on("change", updateChart);


function updateChart() {

  var selectedState = d3.select("#selStateData").property("value");
  console.log(selectedState);

  //set up call to data based on drop down
  var urlState = "/API/" + selectedState;
  console.log(urlState);

  //Read the data
  d3.json(urlState).then(function(data) {

    // List of groups (here I have one group per column)
    var states = ["valueA", "valueB", "valueC"];

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(states)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }); // corresponding value returned by the button

    // Add X axis --> it is a date format
    var x = d3.scaleLinear()
      .domain([0,10])
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain( [0,20])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Initialize line with group a
    var line = svg
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) { return x(+d.time) })
          .y(function(d) { return y(+d.valueA) })
        )
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "none");

    // Initialize dots with group a
    var dot = svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) { return x(+d.time) })
        .attr("cy", function(d) { return y(+d.valueA) })
        .attr("r", 7)
        .style("fill", "#69b3a2");


    // A function that update the chart
    function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} });

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(+d.time) })
            .y(function(d) { return y(+d.value) })
          );
      dot
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return x(+d.time) })
          .attr("cy", function(d) { return y(+d.value) });
    };

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value");
        // run the updateChart function with this selected option
        update(selectedOption);
    });

});

};