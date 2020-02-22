//Start building app.js file for extracting ACA data

//Retrieve data from url /API/Data
var url = "/API/Data"

var ACAData = d3.json(url).then(function(data){
    console.log(data);
});

// button drop down function
$('#state-button').mdbDropSearch();

var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' + APIKEY), {
    id: 'mapbox/light-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: APIKEY
}.addTo(map);

console.log('string')

L.geoJson(statesData).addTo(map);

print("string")

function stateSelect(data)
    // This function will allow the user to select the state on the top drop down.
    // EVENT LISTENER: On click the three boxes at the top will pull data to show overview of statistics for that state
    // This function will also trigger the data in section 2 to show state graphs and representation of demographics

function stateCompare(data)
    // This function will execute in the third section. The user will be able to select a different state to compare to the currently selected state

