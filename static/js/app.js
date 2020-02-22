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

<<<<<<< HEAD
    // var statedata1 = data.filter(value => value["State Name"] === "Alabama");
    // var statedata2 = data.filter(value => value["State Name"] === "California");

    console.log(data);
    // console.log(statedata1);
    // console.log(statedata2);
});


// //Clear previous data in demographicMenu: Select in Line 1, Reassign to nothing in Line 2
// var oldDemographicMenu = d3.select("#sample-metadata");
// oldDemographicMenu.html("");
    
    
// //Select sample-metadata id using d3. This is where I will insert text for demographicData
// var demographicMenu = d3.select("#sample-metadata");

//     var cell = demographicMenu.append("p");
//     cell.text(`Age: ${age}`);
            
//     var cell = demographicMenu.append("p");
//     cell.text(`Ethnicity: ${ethnicity}`);

//     var cell = demographicMenu.append("p");
//     cell.text(`Gender: ${gender}`);
            
//     var cell = demographicMenu.append("p");
//     cell.text(`Location: ${location}`);

//     var cell = demographicMenu.append("p");
//     cell.text(`Wash Frequency: ${wfreq}`);
=======
    })
})



// steve doing things
    var statedata1 = data.filter(value => value["State Name"] === "Alabama");
    var statedata2 = data.filter(value => value["State Name"] === "California");

    console.log(data);
// <<<<<<< HEAD
    console.log(statedata1);
    console.log(statedata2);
>>>>>>> 52f0fc6d5657cadf823c51dd6ead6f6bc163805b
