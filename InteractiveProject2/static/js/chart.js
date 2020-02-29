//Start building app.js file for states from ACA data for first dropdown
var url = "/API/Data"

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 100},
    width = 800 - margin.left - margin.right,
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
  
  // List of groups (here I have one group per column)
  var metrics = ["Total_Enrollment", "Uninsured_Value", "All Determinants_Value", "Cancer_Deaths_Value", "Cardiovascular_Deaths_Rank", "Cholesterol_Check_Value"];
  console.log(metrics);

  // add the options to the button
  var dropdownMetrics = d3.select("#selectButton");
  var option = dropdownMetrics.append("option");
  option.text("Select Metric");
  
  metrics.forEach(function(newMetric){
  
  var option = dropdownMetrics.append("option");
  option.text(newMetric);
  });


});

var parseTime = d3.timeParse("%Y");

d3.select("#selectButton").on("change", updateChart);
d3.select("#selStateData").on("change", updateChart);


function updateChart() {

  var selectedState = d3.select("#selStateData").property("value");
  // console.log(selectedState);
  var selectedOption = d3.select("#selectButton").property("value");
  console.log(selectedOption);

  //set up call to data based on drop down
  var urlState = "/API/Data/StateData";
  // console.log(urlState);

  //Read the data
  d3.json(urlState).then(function(data) {
    console.log(data);
    
      //Filtering the data by the selectedState
      data.filter(value => value[`${selectedState}`] == selectedState);

      var filteredData = data[0][selectedState];
      console.log(filteredData);
      var years = filteredData.map(d => d['Year']);
      years.forEach(function(data) {
        data.date = parseTime(data.date);
        data.years = +data.years;
      });
    

      console.log(years);
      var Total_Enrollment = filteredData.map(d => d['Total_Enrollment']);
      console.log(Total_Enrollment);
      var Uninsured_Value = filteredData.map(d => d['Uninsured_Value']);
      console.log(Uninsured_Value);


    //   var xTimeScale = d3.scaleTime()
    //     .domain(d3.extent(filteredData, data => data.years))
    //     .range([0, width]);

    //   var yLinearScale = d3.scaleLinear()
    //     .domain([0, d3.max(filteredData, data => data.Total_Enrollment)])
    //     .range([height, 0]);

    //   var bottomAxis = d3.axisBottom(xTimeScale);
    //   var leftAxis = d3.axisLeft(yLinearScale);

    //   var drawLine = d3.line()
    //     .x(filteredData => xTimeScale(data.years))
    //     .y(filteredData => yLinearScale(data.Total_Enrollment));

    //   console.log(drawLine(filteredData));

    //   chartGroup.append("path")
    //   // The drawLine function returns the instructions for creating the line for forceData
    //     .attr("d", drawLine(filteredData))
    //     .classed("line", true);
  
    // // Append an SVG group element to the chartGroup, create the left axis inside of it
    //   chartGroup.append("g")
    //     .classed("axis", true)
    //     .call(leftAxis);
  
    // // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    // // Translate the bottom axis to the bottom of the page
    //   chartGroup.append("g")
    //     .classed("axis", true)
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(bottomAxis);

    if (selectedOption == 'Total_Enrollment'){  
    // Add X axis --> it is a date format
      var x = d3.scaleLinear()
        .domain([2014,2019])
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis based on variable selected
      var y = d3.scaleLinear()
        .domain( [10000,12500000])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));
    


    // Initialize line with group a
      var line = svg
        .append('g')
        .append("path")
          .datum(filteredData)
          .attr("d", d3.line()
            .x(function(d) { return x(+d['Year']) })
            .y(function(d) { return y(+d['Total_Enrollment']) })
          )
          .attr("stroke", "black")
          .style("stroke-width", 4)
          .style("fill", "none");

    // Initialize dots with group a
      var dot = svg
        .selectAll('circle')
        .data(filteredData)
        .enter()
        .append('circle')
          .attr("cx", function(d) { return x(+d['Year']) })
          .attr("cy", function(d) { return y(+d['Total_Enrollment']) })
          .attr("r", 7)
          .style("fill", "#69b3a2");
    }
    else if (selectedOption == 'Uninsured_Value'){
      var x = d3.scaleLinear()
        .domain([2014,2019])
        .range([ 0, width ]);
      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis based on variable selected
      var y = d3.scaleLinear()
        .domain( [10000,12500000])
        .range([ height, 0 ]);
      svg.append("g")
        .call(d3.axisLeft(y));
    


    // Initialize line with group a
      var line = svg
        .append('g')
        .append("path")
          .datum(filteredData)
          .attr("d", d3.line()
            .x(function(d) { return x(+d['Year']) })
            .y(function(d) { return y(+d['Unisured_Value']) })
          )
          .attr("stroke", "black")
          .style("stroke-width", 4)
          .style("fill", "none");

    // Initialize dots with group a
      var dot = svg
        .selectAll('circle')
        .data(filteredData)
        .enter()
        .append('circle')
          .attr("cx", function(d) { return x(+d['Year']) })
          .attr("cy", function(d) { return y(+d['Uninsured_Value']) })
          .attr("r", 7)
          .style("fill", "#69b3a2");


    }


    // // A function that update the chart
    // funSction update(selectedGroup) {

    //   // Create new data with the selection?
    //   var dataFilter = filteredData.map(function(d){return {time: d.Year, value:d[selectedGroup]} });
    //   // console.log(dataFilter);

    //   // Add X axis --> it is a date format
    //   var x = d3.scaleLinear()
    //     .domain([Math.min(years),Math.max(years)])
    //     .range([ 0, width ]);
    //   svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x));

    //   // Add Y axis based on variable selected
    //   var y = d3.scaleLinear()
    //     .domain( [Math.min(Total_Enrollment),Math.max(Total_Enrollment)])
    //     .range([ height, 0 ]);
    //   svg.append("g")
    //     .call(d3.axisLeft(y));

    //   // // Give these new data to update line

    //   // var line = svg
    //   // .append('g')
    //   // .append("path")
    //   //   .datum(filteredData)
    //   //   .attr("d", d3.line()
    //   //     .x(2014,2015,2016,2017,2018,2019)
    //   //     .y(11548401, 11927676, 12220546, 12405352, 12166109, 11919314)
    //   //   )
    //   //   .attr("stroke", "black")
    //   //   .style("stroke-width", 4)
    //   //   .style("fill", "none");


    //   line
    //       .datum(dataFilter)
    //       .transition()
    //       .duration(1000)
    //       .attr("d", d3.line()
    //         .x(function(d) { return x(+d.time) })
    //         .y(function(d) { return y(+d.value) })
    //       );
    //   dot
    //     .data(dataFilter)
    //     .transition()
    //     .duration(1000)
    //       .attr("cx", function(d) { return x(+d.time) })
    //       .attr("cy", function(d) { return y(+d.value) });
    // };

  });  

};