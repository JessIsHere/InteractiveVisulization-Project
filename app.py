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
    aca_data = aca_state_data.find({}, {"_id": 0})
    return jsonify(list(aca_data))



if __name__ == "__main__":
    app.run(debug=True)