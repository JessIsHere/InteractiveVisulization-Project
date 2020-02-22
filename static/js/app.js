//Start building app.js file for extracting ACA data

//Retrieve data from url /API/Data
var url = "/API/Data"

var ACAData = d3.json(url).then(function(data){
<<<<<<< HEAD
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
=======

    var statedata1 = data.filter(value => value["State Name"] === "Alabama");
    var statedata2 = data.filter(value => value["State Name"] === "California");

    console.log(data);
<<<<<<< HEAD
    console.log(statedata1);
    console.log(statedata2);
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
});
>>>>>>> 1b0f393a6f3fc4714348a7897643d78d867741bc
>>>>>>> 6af93e319edc70b7ff0bdc7c95ae85b4873f3941
