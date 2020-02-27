
// d3.json('/API/Data/Map').then(function(response){
      
//       var data = response;
//       console.log(data)

//       var layout = {
//           title: 'Test',
//           geo:{
//               scope: 'usa',
//               showlakes: true,
//               lakecolor: 'rgb(255,255,255)'
//           }
//       };

//       Plotly.newPlot("map", data, layout, {showLink: false});
// });

var url = "/API/Data/MapData"

var state_abbr = {'Alaska': 'AK', 'Alabama': 'AL', 'Arkansas': 'AR', 'American Samoa': 'AS', 'Arizona': 'AZ', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'District of Columbia': 'DC', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA', 'Guam': 'GU', 'Hawaii': 'HI', 'Iowa': 'IA', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Massachusetts': 'MA', 'Maryland': 'MD', 'Maine': 'ME', 'Michigan': 'MI', 'Minnesota': 'MN', 'Missouri': 'MO', 'Northern Mariana Islands': 'MP', 'Mississippi': 'MS', 'Montana': 'MT', 'National': 'NA', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Nebraska': 'NE', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'Nevada': 'NV', 'New York': 'NY', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Puerto Rico': 'PR', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Virginia': 'VA', 'Virgin Islands': 'VI', 'Vermont': 'VT', 'Washington': 'WA', 'Wisconsin': 'WI', 'West Virginia': 'WV', 'Wyoming': 'WY'}


function buildMap(filterYear){

  d3.json(url).then(function(data){
    //console.log(data);

    var filteredData = data[0][filterYear];
    
    var ranks = filteredData.map(d => d['All_Determinants_Rank']);
    var state_codes = filteredData.map(d => state_abbr[d['State']]);
    var states = filteredData.map(d => d['State']);

    var data = [{
      type: 'choropleth',
      locationmode: 'USA-states',
      locations: state_codes,
      z: ranks,
      text: states,
      autocolorscale: true
  }];
  
  var layout = {
  title: '2014 US Popultaion by State',
      geo:{
          scope: 'usa',
          countrycolor: 'rgb(255, 255, 255)',
          showland: true,
          landcolor: 'rgb(217, 217, 217)',
          showlakes: true,
          lakecolor: 'rgb(255, 255, 255)',
          subunitcolor: 'rgb(255, 255, 255)',
          lonaxis: {},
          lataxis: {}
      }
  };

  Plotly.newPlot("map", data, layout, {showLink: false});

});

};
buildMap(2019);
// Creating map object

// var myMap = L.map('map', {
//     center: [39.8283, - 98.5795],
//     zoom: 8 
// })

// // Tile Layer
// L.tileLayer(
//     'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
//   {
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: API_KEY
//   }
// ).addTo(myMap);

// var acaJson;

// Load in Data
// d3.json(url).then(function(grabData) {
//     var states = grabData.map(value => value.States);
//     var years = grabData.map(value => value.Year);
//     var thisYear = 2019;
//     var yearData;
    
//     // var stateData = state[0]["Data"];
//     // console.log(stateData['All_Determinants_Rank']);
//     // console.log(stateData['All_Determinants_Rank'])
//     // Create choropleth layer
//     acaJson = L.choropleth(grabData, {
//         yearData: grabData.filter(value => value['Year'] == '2019'),
//         stateData: yearData.map(value => value['State'][0]['Data']),
       
//         valueProperty: yearData.map(value => value.All_Determinants_Rank),       
        
//         // Set color scale
//         scale: ['#ffffb2', '#b10026'],

//         // Number of breaks in step range: Ammount of color saturation in gradient to move from one scale to another.
//         steps: 5,

//         // How am I defining my steps? Quartile - Health rating 
//         mode: 'q',
//         style: {
//             color: '#fff',
//             weight: 1,
//             fillOpacity: 0.8
//         },


        
    //     // Pop for Additional Data
    //     onEachFeature: function (feature, layer) {
    //         layer.bindPopup(
    //           'State: ' +
    //           feature.index.State +
    //           '<br>Total Enrollment:<br>' + +
    //           feature.index.Total_Enrollment
    //         );
    //       }
    //     }).addTo(myMap);
    //     console.log(stateData),
    //     console.log(data.rank);
    //     // Set up the legend
    //     var legend = L.control({ position: 'bottomright' });
    //     legend.onAdd = function () {
    //       var div = L.DomUtil.create('div', 'info legend');
    //       var limits = acaData.options.limits;
    //       var colors = acaData.options.colors;
    //       var labels = [];

    //       // Add min & max
    //       var legendInfo =
    //       '<h1>Health Rating</h1>' +
    //       '<div class="labels">' +
    //       '<div class="min">' +
    //       limits[0] +
    //       '</div>' +
    //       '<div class="max">' +
    //       limits[limits.length - 1] +
    //       '</div>' +
    //       '</div>';

    //     div.innerHTML = legendInfo;

    //     limits.forEach(function (limit, index) {
    //       labels.push('<li style="background-color: ' + colors[index] + '"></li>');
    //     });

    //     div.innerHTML += '<ul>' + labels.join('') + '</ul>';
    //     return div;
    //   };

    // // Adding legend to the map
    // legend.addTo(myMap);

    // });