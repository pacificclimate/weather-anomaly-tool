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

Baseline markers and monthly data markers do not differ in appearance. They can be shown or hidden (the default) using the map layer control in the upper right of the map. When displayed, they give an idea of the spatial extents of data available to form anomaly values. Anomalies can only be computed where there is both baseline and monthly data available.

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
      - Data values: One or more of the following items, depending on the value type selected (anomaly, monthly, baseline):
           - Anomaly: absolute difference from baseline
           - Departure: relative difference from baseline
           - Baseline: absolute baseline value
           - Monthly statistic: absolute value of monthly statistic (varies by variable: cumulative for precipitation; average for temperature)
           - Data coverage: Fraction of contributing observations present in database relative to total number possible in selected period (month)

  ### Marker colours: colour bar and colour scales

  Colour scales (displayed in the colour bar at the top of the map) have been defined primarily for the anomaly values. At present, a single colour is used to represent all values in the Monthly and Baseline displays on the map.
  
  For Precipitation Anomaly values, a marker colour has been defined for computed anomalies that are apparently erroneous. These are the result of station variable reports that cannot at present be handled by the anomaly computations. (These are cumulative tipping-bucket sensor values which reset on irregular schedules. We are working on a fix for this problem.)
  
  ### Marker visibility
  
  The marker layer control in the upper right of the map allows you to select which of the three marker types are visible. Normally only the data value markers are of interest, and this is the default. If you are interested in where all baseline and/or where all monthly data value stations are located, you can display these markers too.
  
  ### Map zooming and scrolling
  
  To zoom in or out, use the controls in the upper left of the map, or use the mouse scroll wheel. To pan, click and drag on a point on the map.
