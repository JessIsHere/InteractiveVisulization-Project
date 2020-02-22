//Start building app.js file for extracting ACA data

//Retrieve data from url /API/Data
var url = "/API/Data"

var ACAData = d3.json(url).then(function(data){

    var statedata1 = data.filter(value => value["State Name"] === "Alabama");
    var statedata2 = data.filter(value => value["State Name"] === "California");

    console.log(data);
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