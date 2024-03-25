import altair as alt
import pandas as pd
import requests

url = 'https://data.lacity.org/api/views/2nrs-mtv8/rows.csv?accessType=DOWNLOAD'
r = requests.get(url)
with open('data/Crime_Data_from_2020_to_Present.csv', 'wb') as f:
    f.write(r.content)

crime = pd.read_csv('data/Crime_Data_from_2020_to_Present.csv', parse_dates=True)
crime = crime.query('`Vict Age` >= 0')
crime['Date Rptd'] = pd.to_datetime(crime['Date Rptd'], format='%m/%d/%Y %I:%M:%S %p')
crime['DATE OCC'] = pd.to_datetime(crime['DATE OCC'], format='%m/%d/%Y %I:%M:%S %p')
crime['WeekPeriod'] = pd.DatetimeIndex(crime["DATE OCC"]).to_period('W').to_timestamp()
crime['MonthPeriod'] = pd.DatetimeIndex(crime["DATE OCC"]).to_period('M').to_timestamp()

top10_crimes = crime["Crm Cd Desc"].value_counts()[0:10]
top_crime_time = crime[crime['Crm Cd Desc'].isin(top10_crimes.index.to_list())]
top_crime_time_month = top_crime_time.groupby(["MonthPeriod", "Crm Cd Desc"]).count().reset_index()[["MonthPeriod", "Crm Cd Desc", "DR_NO"]]

input_dropdown = alt.binding_select(
    options=[None] + top10_crimes.index.to_list(),
    labels=['All'] + top10_crimes.index.to_list(),
    name='Show Incident Type: '
)
selection = alt.selection_point(fields=['Crm Cd Desc'], bind=input_dropdown)
color=alt.condition(
    selection,
    alt.Color('Crm Cd Desc:N', title='Incident Type'),
    alt.value('lightgray')
)

c = alt.Chart(top_crime_time_month).mark_line().encode(
    x=alt.X('MonthPeriod:T', title='Month'),
    y=alt.Y('DR_NO:Q', title='Reported Incidents'),
    color=color
).properties(
    title='Los Angeles Monthly Reported Incidents, Top 10 Incident Types',
    width='container'
).add_params(
    selection
).interactive()

c.save('monthlytop10.html')