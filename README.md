# Crime in Los Angeles Since 2020

Yi Chen Wu, Matthew Xue, Fred Wang, Tim Wang

[View Project Site](https://timaeusx.github.io/ds4200-los-angeles-crime/)

## Code for visualizations

See the following files for the code used to generate each visualization.
- [map_overview.ipynb: ](map_overview.ipynb) Map Overview (All Years)
- [monthlytop10.py: ](monthlytop10.py) Monthly Crime Type Trends (Line Plot)
- [crime_analysis.ipynb:](crime_analysis.ipynb) Heatmap Matrix, Types of Incidents (Word Cloud)
- [main.js: ](main.js) Crime Incidents Reported by Police Stations (Bar Plot)

## Description of visualizations used

### Map Overview
We use an interactive map to create an geographical overview of all of the crime incidents in the dataset.
Each layer contains data for a single calendar year, and multiple layers can be toggled to filter incidents by year.
Incidents are plotted on the map by location.
Nearby incidents are grouped together at high zoom levels.

### Monthly Crime Type Trends
An interactive line plot shows the counts for the top ten most frequently occurring types of incidents in the dataset, by month.
This helps visualize trends in crime over time.
The line corresponding to each incident type can be highlighted using a dropdown.
The line plot can additionally be panned and zoomed to inspect the data more closely.

### Heatmap Matrix
A heatmap matrix shows monthly trends in the total counts of incidents occurring at each hour of the day.
This allows for more granular visualization of crime trends over time, at the hour level.
Hovering over each cell in the matrix shows the count for that hour/month.

### Crime Incidents Reported by Police Stations
A bar plot shows the percentage of incidents reported at each Los Angeles Police Department community police station.
As a result it is easy to see a breakdown of crime frequency in different neighborhoods of the city.
Each bar can be highlighted by clicking it, for a pop-out effect.

### Types of Incidents
A word cloud helps to gain a qualitative understanding of the incidents being reported.
The sizes of the different words and phrases in the word cloud correspond to their relative frequencies with which they appear in the incident reports as a whole.
