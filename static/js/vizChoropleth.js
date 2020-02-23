//Start building app.js file for extracting ACA data

//Retrieve data from url /API/Data
var url = "/API/Data"

d3.json(url).then(function(data){
    console.log(data);
});

// Creating map object

var myMap = L.map('map', {
    center: [39.8283, - 98.5795],
    zoom: 8 
})

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

// Map and projection
var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(70)
  .center([0,20])
  .translate([width / 2, height / 2]);

// Data and color scale
var data = d3.map();
var colorScale = d3.scaleThreshold()
  .domain([100000, 1000000, 10000000, 30000000, 100000000, 500000000])
  .range(d3.schemeBlues[7]);

// Load external data and boot
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv", function(d) { data.set(d.code, +d.pop); })
  .await(ready);

function ready(error, topo) {

  // Draw the map
  svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill", function (d) {
        d.total = data.get(d.id) || 0;
        return colorScale(d.total);
      });
    }
//   div.innerHTML = legendInfo;

      //   limits.forEach(function (limit, index) {
      //     labels.push('<li style="background-color: ' + colors[index] + '"></li>');
      //   });
    
      //   div.innerHTML += '<ul>' + labels.join('') + '</ul>';
      //   return div;
      // };
    
    // Adding legend to the map
    // legend.addTo(myMap);





// steve doing things
//     var statedata1 = data.filter(value => value["State Name"] === "Alabama");
//     var statedata2 = data.filter(value => value["State Name"] === "California");

//     console.log(data);
// // <<<<<<< HEAD
//     console.log(statedata1);
//     console.log(statedata2);
