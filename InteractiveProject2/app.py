from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
import pandas as pd

app = Flask(__name__)

#Setup MongoDB connection as in scrape_mars.py. Conn = connection port info, 
#client is connection client.
app.config["MONGO_URI"] = "mongodb://localhost:27017/ACAData_DB"
mongo = PyMongo(app)

#Connect to db = Data databases.
aca_state_data = mongo.db.ACAStateData
Alaska = mongo.db.Alaska
Alabama = mongo.db.Alabama
Arizona = mongo.db.Arizona
Arkansas = mongo.db.Arkansas
California = mongo.db.California
Colorado = mongo.db.Colorado
Connecticut = mongo.db.Connecticut
Delaware = mongo.db.Delware
Florida = mongo.db.Florida
Georgia = mongo.db.Georgia
Hawaii = mongo.db.Hawaii
Idaho = mongo.db.Idaho
Illinois = mongo.db.Illinois
Indiana = mongo.db.Indiana
Iowa = mongo.db.Iowa
Kansas = mongo.db.Kansas
Kentucky = mongo.db.Kentucky
Louisiana = mongo.db.Louisiana
Maine = mongo.db.Maine
Maryland = mongo.db.Maryland
Massachusetts = mongo.db.Massachusetts
Michigan = mongo.db.Michigan
Minnesota = mongo.db.Minnesota
Mississippi = mongo.db.Mississippi
Missouri = mongo.db.Missouri
Montana = mongo.db.Montana
Nebraska = mongo.db.Nebraska
Nevada = mongo.db.Nevada
New_Hampshire = mongo.db.New_Hampshire
New_Jersey = mongo.db.New_Jersey
New_Mexico = mongo.db.New_Mexico
New_York = mongo.db.New_York
North_Carolina = mongo.db.North_Carolina
North_Dakota = mongo.db.North_Dakota
Ohio = mongo.db.Ohio
Oklahoma = mongo.db.Oklahoma
Pennsylvania = mongo.db.Pennsylvania
Rhode_Island = mongo.db.Rhode_Island
South_Carolina = mongo.db.South_Carolina
South_Dakota = mongo.db.South_Dakota
Tennessee = mongo.db.Tennessee
Texas = mongo.db.Texas
Utah = mongo.db.Utah
Vermont = mongo.db.Vermont
Virginia = mongo.db.Virginia
Washington = mongo.db.Washington
West_Virginia = mongo.db.West_Virginia
Wisconsin = mongo.db.Wisconsin
Wyoming = mongo.db.Wyoming


state_abbr = {'Alaska': 'AK', 'Alabama': 'AL', 'Arkansas': 'AR', 'American Samoa': 'AS', 'Arizona': 'AZ', 'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'District of Columbia': 'DC', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA', 'Guam': 'GU', 'Hawaii': 'HI', 'Iowa': 'IA', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Massachusetts': 'MA', 'Maryland': 'MD', 'Maine': 'ME', 'Michigan': 'MI', 'Minnesota': 'MN', 'Missouri': 'MO', 'Northern Mariana Islands': 'MP', 'Mississippi': 'MS', 'Montana': 'MT', 'National': 'NA', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Nebraska': 'NE', 'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'Nevada': 'NV', 'New York': 'NY', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Puerto Rico': 'PR', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Virginia': 'VA', 'Virgin Islands': 'VI', 'Vermont': 'VT', 'Washington': 'WA', 'Wisconsin': 'WI', 'West Virginia': 'WV', 'Wyoming': 'WY'}

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

@app.route("/API/Data/MapData")
def MapData():
    # query for content
    content = list(aca_state_data.find({}, {"_id": 0}))

    # pull out the "Data" key into list for grouping and stuff
    result_list = [result['Data'] for result in content]
    result_df = pd.DataFrame(result_list)
    grouped_df = pd.DataFrame(result_df.groupby("Year"))

    output = []
    d = {}
    for index, row in grouped_df.iterrows():
        d[row[0]] = row[1].to_dict(orient="records")
    output.append(d)
    return jsonify(output)


@app.route("/API/Data/StateData")
def StateData():
    # query for content
    content = list(aca_state_data.find({}, {"_id": 0}))

    # pull out the "Data" key into list for grouping and stuff
    result_list = [result['Data'] for result in content]
    result_df = pd.DataFrame(result_list)
    grouped_df = pd.DataFrame(result_df.groupby("State"))

    output = []
    d = {}
    for index, row in grouped_df.iterrows():
        d[row[0]] = row[1].to_dict(orient="records")
    output.append(d)
    return jsonify(output)


@app.route("/API/Data/Alaska")
def Alaska():
    alaska_data = list(Alaska.find({}, {"_id": 0}))
    return jsonify(alaska_data)

@app.route("/API/Data/Alabama")
def Alabama():
    alabama_data = list(Alabama.find({}, {"_id": 0}))
    return jsonify(alabama_data)

@app.route("/API/Data/Arkansas")
def Arkansas():
    arkansas_data = list(Arkansas.find({}, {"_id": 0}))
    return jsonify(arkansas_data)

@app.route("/API/Data/Arizona")
def Arizona():
    arizona_data = list(Arizona.find({}, {"_id": 0}))
    return jsonify(arizona_data)

@app.route("/API/Data/California")
def California():
    california_data = list(California.find({}, {"_id": 0}))
    return jsonify(california_data)

@app.route("/API/Data/Colorado")
def Colorado():
    colorado_data = list(Colorado.find({}, {"_id": 0}))
    return jsonify(colorado_data)

@app.route("/API/Data/Connecticut")
def Connecticut():
    connecticut_data = list(Connecticut.find({}, {"_id": 0}))
    return jsonify(connecticut_data)

@app.route("/API/Data/Delware")
def Delaware():
    delaware_data = list(Delaware.find({}, {"_id": 0}))
    return jsonify(delaware_data)

@app.route("/API/Data/Florida")
def Florida():
    florida_data = list(Florida.find({}, {"_id": 0}))
    return jsonify(florida_data)

@app.route("/API/Data/Georgia")
def Georgia():
    georgia_data = list(Georgia.find({}, {"_id": 0}))
    return jsonify(georgia_data)

@app.route("/API/Data/Hawaii")
def Hawaii():
    hawaii_data = list(Hawaii.find({}, {"_id": 0}))
    return jsonify(hawaii_data)

@app.route("/API/Data/Iowa")
def Iowa():
    iowa_data = list(Iowa.find({}, {"_id": 0}))
    return jsonify(iowa_data)

@app.route("/API/Data/Idaho")
def Idaho():
    idaho_data = list(Idaho.find({}, {"_id": 0}))
    return jsonify(idaho_data)

@app.route("/API/Data/Illinois")
def Illinois():
    illinois_data = list(Illinois.find({}, {"_id": 0}))
    return jsonify(illinois_data)

@app.route("/API/Data/Indiana")
def Indiana():
    indiana_data = list(Indiana.find({}, {"_id": 0}))
    return jsonify(indiana_data)

@app.route("/API/Data/Kansas")
def Kansas():
    kansas_data = list(Kansas.find({}, {"_id": 0}))
    return jsonify(kansas_data)

@app.route("/API/Data/Kentucky")
def Kentucky():
    kentucky_data = list(Kentucky.find({}, {"_id": 0}))
    return jsonify(kentucky_data)

@app.route("/API/Data/Louisiana")
def Louisiana():
    louisiana_data = list(Louisiana.find({}, {"_id": 0}))
    return jsonify(louisiana_data)

@app.route("/API/Data/Massachusetts")
def Massachusetts():
    massachusetts_data = list(Massachusetts.find({}, {"_id": 0}))
    return jsonify(massachusetts_data)

@app.route("/API/Data/Maryland")
def Maryland():
    maryland_data = list(Maryland.find({}, {"_id": 0}))
    return jsonify(maryland_data)

@app.route("/API/Data/Maine")
def Maine():
    maine_data = list(Maine.find({}, {"_id": 0}))
    return jsonify(maine_data)

@app.route("/API/Data/Michigan")
def Michigan():
    michigan_data = list(Michigan.find({}, {"_id": 0}))
    return jsonify(michigan_data)

@app.route("/API/Data/Minnesota")
def Minnesota():
    minnesota_data = list(Minnesota.find({}, {"_id": 0}))
    return jsonify(minnesota_data)

@app.route("/API/Data/Missouri")
def Missouri():
    missouri_data = list(Missouri.find({}, {"_id": 0}))
    return jsonify(missouri_data)

@app.route("/API/Data/Mississippi")
def Mississippi():
    mississippi_data = list(Mississippi.find({}, {"_id": 0}))
    return jsonify(mississippi_data)

@app.route("/API/Data/Montana")
def Montana():
    montana_data = list(Montana.find({}, {"_id": 0}))
    return jsonify(montana_data)

@app.route("/API/Data/North Carolina")
def North_Carolina():
    north_carolina_data = list(North_Carolina.find({}, {"_id": 0}))
    return jsonify(north_carolina_data)

@app.route("/API/Data/North Dakota")
def North_Dakota():
    north_dakota_data = list(North_Dakota.find({}, {"_id": 0}))
    return jsonify(north_dakota_data)

@app.route("/API/Data/Nebraska")
def Nebraska():
    nebraska_data = list(Nebraska.find({}, {"_id": 0}))
    return jsonify(nebraska_data)

@app.route("/API/Data/New Hampshire")
def New_Hampshire():
    new_hampshire_data = list(New_Hampshire.find({}, {"_id": 0}))
    return jsonify(new_hampshire_data)

@app.route("/API/Data/New Jersey")
def New_Jersey():
    new_jersey_data = list(New_Jersey.find({}, {"_id": 0}))
    return jsonify(new_jersey_data)

@app.route("/API/Data/New Mexico")
def New_Mexico():
    new_mexico_data = list(New_Mexico.find({}, {"_id": 0}))
    return jsonify(new_mexico_data)

@app.route("/API/Data/Nevada")
def Nevada():
    nevada_data = list(Nevada.find({}, {"_id": 0}))
    return jsonify(nevada_data)

@app.route("/API/Data/New York")
def New_York():
    new_york_data = list(New_York.find({}, {"_id": 0}))
    return jsonify(new_york_data)

@app.route("/API/Data/Ohio")
def Ohio():
    ohio_data = list(Ohio.find({}, {"_id": 0}))
    return jsonify(ohio_data)

@app.route("/API/Data/Oklahoma")
def Oklahoma():
    oklahoma_data = list(Oklahoma.find({}, {"_id": 0}))
    return jsonify(oklahoma_data)

@app.route("/API/Data/Oregon")
def Oregon():
    oregon_data = list(Oregon.find({}, {"_id": 0}))
    return jsonify(oregon_data)

@app.route("/API/Data/Pennsylvania")
def Pennsylvania():
    pennsylvania_data = list(Pennsylvania.find({}, {"_id": 0}))
    return jsonify(pennsylvania_data)

@app.route("/API/Data/Rhode Island")
def Rhode_Island():
    rhode_island_data = list(Rhode_Island.find({}, {"_id": 0}))
    return jsonify(rhode_island_data)

@app.route("/API/Data/South Carolina")
def South_Carolina():
    south_carolina_data = list(South_Carolina.find({}, {"_id": 0}))
    return jsonify(south_carolina_data)

@app.route("/API/Data/South Dakota")
def South_Dakota():
    south_dakota_data = list(South_Dakota.find({}, {"_id": 0}))
    return jsonify(south_dakota_data)

@app.route("/API/Data/Tennessee")
def Tennessee():
    tennessee_data = list(Tennessee.find({}, {"_id": 0}))
    return jsonify(tennessee_data)

@app.route("/API/Data/Texas")
def Texas():
    texas_data = list(Texas.find({}, {"_id": 0}))
    return jsonify(texas_data)

@app.route("/API/Data/Utah")
def Utah():
    utah_data = list(Utah.find({}, {"_id": 0}))
    return jsonify(utah_data)

@app.route("/API/Data/Virginia")
def Virginia():
    virginia_data = list(Virginia.find({}, {"_id": 0}))
    return jsonify(virgina_data)

@app.route("/API/Data/Vermont")
def Vermont():
    vermont_data = list(Vermont.find({}, {"_id": 0}))
    return jsonify(vermont_data)

@app.route("/API/Data/Washington")
def Washington():
    washington_data = list(Washington.find({}, {"_id": 0}))
    return jsonify(washington_data)

@app.route("/API/Data/Wisconsin")
def Wisconsin():
    wisconsin_data = list(Wisconsin.find({}, {"_id": 0}))
    return jsonify(wisconsin_data)

@app.route("/API/Data/West Virginia")
def West_Virginia():
    west_virginia_data = list(West_Virginia.find({}, {"_id": 0}))
    return jsonify(west_virginia_data)

@app.route("/API/Data/Wyoming")
def Wyoming():
    wyoming_data = list(Wyoming.find({}, {"_id": 0}))
    return jsonify(wyoming_data)


@app.route("/About")
def about():
    return render_template("about.html")




if __name__ == "__main__":
    app.run(debug=True)