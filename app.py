from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

#Setup MongoDB connection as in scrape_mars.py. Conn = connection port info, 
#client is connection client.
app.config["MONGO_URI"] = "mongodb://localhost:27017/ACAData_DB"
mongo = PyMongo(app)

#Connect to db = Mars_DataDB database and scraped_mars_data is the collection.
aca_state_data = mongo.db.ACAStateData


#Route to render the index.html page with data from the ACAData_DB database
@app.route("/")
def index():
    return render_template("index.html")

#Setup api for acquiring data from MongoDB. 
#The find({}, {"_id":0}) basically amends find() to select everything (first {} set), 
#then omits the "_id" ({"_id": 0}). This is CRITICAL because the ObjectId from MongoDB
#is NOT JSONIFIABLE!!!
@app.route("/API/Data/")
def data():
    aca_data = list(aca_state_data.find({}, {"_id": 0}))
    return jsonify(aca_data)


@app.route("/API/Data/Map")
def map_data():
    aca_data = list(aca_state_data.find({}, {"_id": 0}))
            
    # list comprehension
    # enrollment = [row["Data"]["Total_Enrollment"] if row["Data"]["Total_Enrollment"] >= -99999999999 else 0 for row in aca_data]
    enrollment = [row["Data"]["Total_Enrollment"] for row in aca_data]

    # state_abbr = [row["Data"]['State_Abbr'] for row in aca_data]
    state_name = [row["Data"]['State'] for row in aca_data]
    data_mapped = [{
        "type": "choropleth",
        "locationmode": "USA-states",
        "locations": state_name,
        'z': enrollment,
        # Change state name later to show associated value
        "text": state_name,
        "hoverinfo": "text",
        'zmin': 0,
        "zmax": max(enrollment),
        "colorscale": [
              [0, 'rgb(242,240,247)'], [0.2, 'rgb(218,218,235)'],
              [0.4, 'rgb(188,189,220)'], [0.6, 'rgb(158,154,200)'],
              [0.8, 'rgb(117,107,177)'], [1, 'rgb(84,39,143)']
          ],
          "colorbar": {
              "title": 'Enrollment',
              "thickness": 0.2
          },
        "marker": {
            "line": {
                "color": "rgb(8,8,8)",
                "width": 2
            },
        }
    }]
    return jsonify(data_mapped)




if __name__ == "__main__":
    app.run(debug=True)