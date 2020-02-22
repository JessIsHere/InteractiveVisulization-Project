//Start building app.js file for extracting ACA data

//Retrieve data from url /API/Data
var url = "/API/Data"

var ACAData = d3.json(url).then(function(data){
    // console.log(data);
});

// Creating map object

var myMap = L.map('map', {
    center: [39.8283, - 98.5795],
    zoom: 8 
})

// Tile Layer
L.tileLayer(
    'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
  {
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
  }
).addTo(myMap);

var acaJson;

// Load in Data
d3.json(url, function (grabData) {
    // Create choropleth layer
    acaJson = L.choropleth(data, {
        //  Define property to call
        valueProperty: 'Total_Enrollment',
        // Set color scale
        scale: ['#ffffb2', '#b10026'],

        // Number of breaks in step range: Ammount of color saturation in gradient to move from one scale to another.
        steps: 5,

        // How am I defining my steps? Quartile - Health rating 
        mode: 'q',
        style: {
            color: '#fff',
            weight: 1,
            fillOpacity: 0.8
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
              'State: ' +
              index.State +
              '<br>Total Enrollment:<br>' + +
              index.Total_Enrollment
            );
          }
        }).addTo(myMap);
      
        // Set up the legend
        var legend = L.control({ position: 'bottomright' });
        legend.onAdd = function () {
          var div = L.DomUtil.create('div', 'info legend');
          var limits = geojson.options.limits;
          var colors = geojson.options.colors;
          var labels = [];

    })
})



// steve doing things
    var statedata1 = data.filter(value => value["State Name"] === "Alabama");
    var statedata2 = data.filter(value => value["State Name"] === "California");

    console.log(data);
// <<<<<<< HEAD
    console.log(statedata1);
    console.log(statedata2);
