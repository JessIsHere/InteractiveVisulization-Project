# Project-2: Dashboard Page


## Question 
We are exploring medicaid expansion by state since the ACA passed. Capturing the differences in enrollement patterns as states adopted. Highlighting key stats about more impacted areas.

## Datasets

Monthly Medicaid & CHIP Application, Eligibility Determination, and Enrollment Reports & Data | Medicaid:
https://www.medicaid.gov/medicaid/national-medicaid-chip-program-information/medicaid-chip-enrollment-data/monthly-medicaid-chip-application-eligibility-determination-and-enrollment-reports-data/index.html

Poverty Thresholds US Census: 
https://www.census.gov/data/tables/time-series/demo/income-poverty/historical-poverty-thresholds.html

Medicaid & CHIP Scorecard | Medicaid
https://www.medicaid.gov/state-overviews/scorecard/index.html

## Images

![US Map](https://github.com/JessIsHere/Project-2/blob/master/Assets/Screen%20Shot%202020-02-13%20at%207.50.58%20PM.png)
![Bubble Chart](https://github.com/JessIsHere/Project-2/blob/master/Assets/Screen%20Shot%202020-02-13%20at%209.18.16%20PM.png)
![Dpnut Chart](https://github.com/JessIsHere/Project-2/blob/master/Assets/Screen%20Shot%202020-02-13%20at%209.20.11%20PM.png)
![Dashboard Example](https://github.com/JessIsHere/Project-2/blob/master/Assets/Screen%20Shot%202020-02-13%20at%209.26.39%20PM.png)
![Horizontal Bar Chart](https://github.com/JessIsHere/Project-2/blob/master/Assets/horizontal-bar-chart.gif)

SJB Documentation:
1. From Raquel's data munging of the raw ACA data, we have a viable dataframe format containing all of the data required for this initial analysis.
Columns:
State_Abbr, 
State, 
Report Data, 
Medicaid_Expanded, 
Total_Financial_Assistance_Apps_Submitted
Medicaid_Indiv_Elig_Applied
CHIP_Indiv_Elig_Applied
Total Medicaid and CHIP Determinations
Total_Enrollment
New Georefernced Column
Total Medicaid Enrollent
Tot_CHIP_Enroll
Monthly

2. In ipynb file medicaid_data_MongoDB1, I appended code to take Raquel's code and convert dataframe into list of dictionaries for inserting into MongoDB.
I checked this code and it functions as expected.

3. Constructed Flask app.py based on the Mars Datascraping assignment code. We need to consider how to extract data from the MongoDB. 
	A) Do we include a Flask code for extracting data based on user input at extraction stage (extract only data needed from MongoDB)?
	B) Do we use JavaScript coding to generate a pulldown menu based on the entire MongoDB data (extract all data, then filter in JavaScript)?
	
4. Current problem I am working on with Jessica: I can access the MongoDB data through Flask and app.py. The index.html file that I have appended in
the templates folder (Remember that this is required for Flask), has "greened' out code for a table that I used to confirm the aca_data from MongoDB
is accessible. The problem now is how to integrate this into JavaScript for the webpages. I could not figure out an extraction method to read the aca_data
from the Flask application into JavaScript. I found a JavaScript library called Node.js and Mongoose that essentially performs the same function as 
PyMongo and Flask. However, I will ask about this implementation tomorrow in class.	

By Raquel, Jess, and Steve
