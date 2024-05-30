# Weather Anomaly Viewer User Documentation

## Purpose

The WAV (Weather Anomaly Viewer) allows you to view anomalies of weather observations recorded at stations throughout the region covered by the observation database. It presents anomalies as colour-coded markers on a map of the region, one marker for each station for which there is sufficient data to compute the anomaly. You choose the variable (e.g., maximum temperature) and the time period (e.g., month and year). The anomalies for that combination are displayed on the map.

## Quick How-To

To view the monthly anomaly, observation, or baseline value of a particular weather variable for a particular month and year:

1. Click the weather variable of interest (**Precipitation**, **T<sub>min</sub>**, or **T<sub>max</sub>**).
2. Click the value of interest (**Anomaly**, **Monthly**, or **Baseline**).
3. Use the date sliders to choose the month and year of interest. (For baseline values, only the month is selectable, since the baseline is a multi-year average of the selected month.)
4. The map displays markers at each station representing the data values corresponding to those selections.
5. Look at the colour bar at the top of the map to get an idea of what data ranges the colours represent.
6. Click on a map marker to see station metadata (name, location, etc.) and precise anomaly data values for that station.

### Notes:

- When initially loaded into your web browser, the WAV sometimes displays an endless waiting spinner on the map. To fix this, please refresh the page.
- If you choose a date in the future, the map displays an endless waiting spinner. Please choose a date prior to the current date.
- Data acquisition is as close to real-time as possible given the sources. Same-day data is _not_ available on all networks.
- Some stations report precipitation values in a format that causes the WAV to compute erroneous values. These values are flagged by a contrasting colour different from the normal data range colours. These values occur more often in recent years than in past years (prior to 2020). We are working to correct this problem.

## Weather anomalies

A weather anomaly is a measure, at a given station, of the departure of weather observations for a given variable (e.g. total precipitation) over a given period (e.g., a specific month) from a historical baseline value for that period at that station.
- The periods available are calendar months.
- The variables available are total precipitation, average minimum temperature, and average maximum temperature over the period.

Anomaly values are differences from baseline. They are expressed as follows:
- For (total period) precipitation, as a percentage difference from baseline.
- For average temperatures, as absolute difference in temperature from baseline.

With the WAV, you can display not only anomaly values, but also the absolute period values and the baseline values used to derive the anomaly values.

Note that baseline values are multi-year (1971-2000) averages for a given period (month).

## User interface

The WAV is a web application. It presents an interface to the user comprising two main parts:
- Variable, value, and period selectors (right-hand side)
- Map showing anomaly values at each available station (left-hand side)

## Variable, value, and period selectors

These selectors are intended to read as an English sentence of the form "Display `<observation variable>` `<value type>` for `<period>`." A couple of examples of this sentence: 
- Display T<sub>min</sub> Anomaly for Jun 2020.
- Display Precipitation Baseline for Feb.

These selectors determine what is displayed on the map.

_Variable_: To select the observation variable, click on one of the three buttons labelled **Precipitation**, **T<sub>min</sub>**, or **T<sub>max</sub>**. The selected button is highlighted.

_Value type_: To select the value type shown, click on one of the three buttons labelled **Anomaly**, **Monthly**, or **Baseline**.

_Month_: To select the period month, click or drag the top slider to the desired month. 

- To decrement or increment the month selected, click the **-*N*** or **+*N*** button below the month slider. (_N_ here is the number of months by which to change the selection. The default is 1 month, so the buttons are labelled **-1** and **+1**.) 
- To change the increment, use the drop-down between the buttons. 
- These buttons can be useful to step uniformly through the months available while looking at the map. 
- Note that decrementing or incrementing the month carries across year boundaries. For example, incrementing +1 from Dec 2020 changes the selection to Jan 2021.

_Year_: To select the period year, click or drag the top slider to the desired year.

- To decrement or increment the year selected, click the **-*N*** or **+*N*** button below the year slider. (_N_ here is the number of years by which to change the selection. The default is 1 year, so the buttons are labelled **-1** and **+1**.)
- To change the increment, use the drop-down between the buttons. 
- These buttons can be useful to step uniformly through the years available while looking at the map.

## Map display

The map display consists of several parts. From top to bottom, roughly:

- _Title_: Indicates the variable, value, and units displayed by the coloured markers.
- _Colour scale_: Indicates the value ranges represented by the marker colours on the map.
- _Base map_: A low-colour, unobtrusive map of the region covered by the database, designed to allow marker colours to be read easily.
- _Zoom in/out controls_: (Upper left of map) These are also controlled by the mouse scroll wheel.
- _Marker visibility control_: (Upper right of map) Selects which of the three types of markers to display on the map: anomaly, monthly station, and/or baseline station. See below for details.
- _Markers_: A coloured circle or black dot centred on the location of each station with data, representing the data at that station. Click on a marker to see station and data details. See below for details.

### Map markers 

The central feature of the map is of course the markers, which represent data at each station.

There are three categories of markers:
- _Baseline data markers_: A small black dot at the location of each station for which there is baseline data for the selected variable and month.
- _Monthly data markers_: A small black dot at the location of each station for which there is monthly data for the selected variable, month and year.
- _Data value markers_: A coloured circle at the location of each station for which there is data (of the selected value type) for the selected variable, month and year. 

Baseline markers and monthly data markers do not differ in appearance. They can be shown or hidden (the default) using the map layer control in the upper right of the map.

Each data value marker is filled with a colour representing the value of the anomaly at that station. The meaning (value range) of each colour is shown in the colour bar above the map. See below for more details.

A data value marker can be clicked to show a pop-up that displays information on the station proper (its network, identity, location, etc.) and the data values for the selected variable and time period at that station. See below for more details.

### Data value popups

A data value popup contains the following information:
- Station metadata
  - Station name
  - Network the station belongs to
  - Station native ID: a unique station identifier provided by the network
  - Location and elevation
- Data
  - Variable name (e.g., Precipitation)
  - For Anomaly value type
    - Baseline: absolute baseline value
    - Anomaly: absolute difference from baseline
    - Departure: relative difference from baseline
  - For Monthly value type
    - Monthly statistic: absolute value of monthly statistic (varies by variable: cumulative for precipitation; average for temperature)
    - Data coverage: Fraction of contributing observations present in database relative to total number possible in selected period (month)
  - For Baseline value type
      - Baseline: absolute baseline value

### Marker colours: colour bar and colour scales

Colour scales (displayed in the colour bar at the top of the map) have been defined primarily for the anomaly values. At present, a single colour is used to represent all values in the Monthly and Baseline displays on the map.

For Precipitation Anomaly values, a marker colour has been defined for computed anomalies that are apparently erroneous. These are the result of station variable reports that cannot at present be handled by the anomaly computations. (These are cumulative tipping-bucket sensor values which reset on irregular schedules. We are working on a fix for this problem.)

### Marker visibility

The marker layer control in the upper right of the map allows you to select which of the three marker types are visible. Normally only the data value markers are of interest, and this is the default. If you are interested in where all baseline and/or where all monthly data value stations are located, you can display these markers too.

### Map zooming and scrolling

To zoom in or out, use the controls in the upper left of the map, or use the mouse scroll wheel. To pan, click and drag on a point on the map.

