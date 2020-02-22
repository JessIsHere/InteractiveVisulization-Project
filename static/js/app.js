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
        valueProperty: 'State',
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

        }

    })
})
