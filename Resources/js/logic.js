d3.json(url).then(function(data){
    console.log(data)
});

// var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/ACAData_DB';


// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     dbo.collection("ACAStateData").findOne({}, function(err, result) {
//       if (err) throw err;
//       console.log(result.name);
//       db.close();
//     });
//   });