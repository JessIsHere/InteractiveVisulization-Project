
d3.json('/API/Data/Map').then(function(response){
      
      var data = response;
      console.log(data)

      var layout = {
          title: 'Test',
          geo:{
              scope: 'usa',
              showlakes: true,
              lakecolor: 'rgb(255,255,255)'
          }
      };

      Plotly.newPlot("map", data, layout, {showLink: false});
});