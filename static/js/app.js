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
    acaJson = L.choropleth(grabData, {
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
              feature.index.State +
              '<br>Total Enrollment:<br>' + +
              feature.index.Total_Enrollment
            );
          }
        }).addTo(myMap);
      
        // Set up the legend
        var legend = L.control({ position: 'bottomright' });
        legend.onAdd = function () {
          var div = L.DomUtil.create('div', 'info legend');
          var limits = acaData.options.limits;
          var colors = acaData.options.colors;
          var labels = [];

<<<<<<< HEAD
          // Add min & max
          var legendInfo =
          '<h1>Health Rating</h1>' +
          '<div class="labels">' +
          '<div class="min">' +
          limits[0] +
          '</div>' +
          '<div class="max">' +
          limits[limits.length - 1] +
          '</div>' +
          '</div>';

        div.innerHTML = legendInfo;

        limits.forEach(function (limit, index) {
          labels.push('<li style="background-color: ' + colors[index] + '"></li>');
        });
    
        div.innerHTML += '<ul>' + labels.join('') + '</ul>';
        return div;
      };
    
    // Adding legend to the map
    legend.addTo(myMap);

});
=======
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
>>>>>>> 577fe158985159011f2f9b3232223ff35a17fc3f



// steve doing things
//     var statedata1 = data.filter(value => value["State Name"] === "Alabama");
//     var statedata2 = data.filter(value => value["State Name"] === "California");

<<<<<<< HEAD
//     console.log(data);
// // <<<<<<< HEAD
//     console.log(statedata1);
//     console.log(statedata2);
=======
    console.log(data);
// <<<<<<< HEAD
    console.log(statedata1);
    console.log(statedata2);
>>>>>>> 52f0fc6d5657cadf823c51dd6ead6f6bc163805b
>>>>>>> 577fe158985159011f2f9b3232223ff35a17fc3f
