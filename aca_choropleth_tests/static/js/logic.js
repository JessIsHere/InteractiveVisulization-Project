// Creating map object
var myMap = L.map('map', {
  center: [37.8, -96.0],
  zoom: 8
});

// Adding tile layer
L.tileLayer(
  'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
  }
).addTo(myMap);

//Found that the us-states.js data file is not authentic geojson! Found https://jsonlint.com/ for a validation tool
//to determine problems with formatting. Last line had a semicolon, which is NOT accepted in geojson. Removed = working!
var geoData = "static/data/statesData.geojson";

var geojson;

//Read in data with d3
d3.json(geoData, function(data){

  //Test that data extraction is working for statesData.geojson file.
  console.log(data)

  // //As Justin's example, create new chloropleth layer
  // geojson = L.choropleth(data, {
  //   //define a property to in the features to use. The statesData has "density" for population density.
  //   valueProperty: "density",

  //   //Set color scale
  //   scale: ['#ffffb2', '#b10026'],

  //   //Number of breaks in step range
  //   steps: 10,

  //   // q for quartile, e for equidistant, k for k-means
  //   mode: 'e',
  //   style: {
  //     // Border color
  //     color: '#fff',
  //     weight: 1,
  //     fillOpacity: 0.8
  //   },








});