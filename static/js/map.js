
var urlMap = "/API/Data/MapData"

var state_abbr = { 'Alaska': 'AK', 'Alabama': 'AL', 'Arkansas': 'AR', 'American Samoa': 'AS', 'Arizona': 'AZ', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'District of Columbia': 'DC', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA', 'Guam': 'GU', 'Hawaii': 'HI', 'Iowa': 'IA', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Massachusetts': 'MA', 'Maryland': 'MD', 'Maine': 'ME', 'Michigan': 'MI', 'Minnesota': 'MN', 'Missouri': 'MO', 'Northern Mariana Islands': 'MP', 'Mississippi': 'MS', 'Montana': 'MT', 'National': 'NA', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Nebraska': 'NE', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'Nevada': 'NV', 'New York': 'NY', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Puerto Rico': 'PR', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Virginia': 'VA', 'Virgin Islands': 'VI', 'Vermont': 'VT', 'Washington': 'WA', 'Wisconsin': 'WI', 'West Virginia': 'WV', 'Wyoming': 'WY' }


function buildMap(filterYear) {

  d3.json(urlMap).then(function (data) {
    console.log(data);

    var filteredData = data[0][filterYear];

    var ranks = filteredData.map(d => d['All_Determinants_Rank']);
    console.log(ranks)

    var state_codes = filteredData.map(d => state_abbr[d['State']]);
    var states = filteredData.map(d => d['State']);

    var data = [{
      type: 'choropleth',
      locationmode: 'USA-states',
      locations: state_codes,
      z: ranks,
      text: states,
      text: filterYear,
      hovertext: ['Test A'],
      colorscale: [
        [0, 'rgb(194,219,194)'], [0.2, 'rgb(123,188,176)'],
        [0.4, 'rgb(85,156,158)'], [0.6, 'rgb(58,124,137)'],
        [0.8, 'rgb(35,93,114)'], [1, 'rgb(18,63,90)']
      ],

    }];

    var layout = {
      title: 'Health Ranking Changes by State',
      geo: {
        scope: 'usa',
        countrycolor: 'rgb(252,141,89)',
        showland: true,
        landcolor: 'rgb(255,255,191)',
        showlakes: true,
        lakecolor: 'rgb(255, 255, 255)',
        subunitcolor: 'rgb(145,191,219)',
        lonaxis: {},
        lataxis: {},

      }
    }
    Plotly.newPlot("map", data, layout, { showLink: false });

  });

};


buildMap(2019);


d3.json(url).then(function (data) {
  //Extract the states and use these to create a listing for the state dropdown menu.
  var states = data.map(value => value.State);
  //console.log(states);

  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.select("#selDataset1");

  //Initial menu option should be "State"
  var cell = dropdownMenu.append("option");
  cell.text("State");


  //Loop through states for appending to dropdownMenu below "State"
  states.forEach(function (newState) {

    //For each new sampleNumber, append a new row and state text.
    var cell = dropdownMenu.append("option");
    cell.text(newState);

  });
});