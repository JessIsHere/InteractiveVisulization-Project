from flask import Flask, render_template, redirect
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
    aca_data = aca_state_data.find()
    return render_template("index.html", aca_data=aca_data)

#DEPENDING ON OUR ROUTE DECISIONS, WE CAN USE AN UPDATE DASHBOARD FUNCTION IN FLASK OR JAVASCRIPT UPDATING FUNCTION
#Route to replot ACAStateData data in the dashboard using a Python script, then redirect to index.html data page.
# @app.route("/update_dashboard")
# def update_dashboard():

    #Use update_dashboard.py function to take new data and replot the dashboard.
    #The ACAStateData is already inserted into MongoDB, so no external insert_many required.
    #update_dashboard.update()

    #Redirect function to send us back to main html page.
    #return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)