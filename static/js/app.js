var geoData = "static/data/statesData.geojson";

d3.json(geoData, function(data){
    console.log(geoData)
});

var myMap = L.map('mapid', {
    center: [34.0522, -118.2437],
    zoom: 8
    });
    
    // Adding tile layer
    L.tileLayer(
    'https://API/Data/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',{
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: API_KEY
    }).addTo(myMap);