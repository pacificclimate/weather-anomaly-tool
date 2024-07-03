import React from "react";
import { CircleMarker } from "react-leaflet";

import { stationColor } from "@/components/map/stationColor";
import StationPopup from "@/components/map/StationPopup";
import {uniqueStationKey} from "@/components/map/uniqueKey";
import PropTypes from "prop-types";

export default function StationDataMarkers({
  variable,
  dataset,
  date,
  stations,
  dataMarkerOptions,
  dataLocationOptions,
  colourScales,
}) {
  // Return a list of markers (<CircleMarker/>) for the data for each station
  // in `station`.
  return stations.map((station) => (
    // Is key necessary for this? Alternatively, are CircleMarker keys nec?
    <React.Fragment key={uniqueStationKey("frag", variable, dataset, date, station)}>
      <CircleMarker
        key={uniqueStationKey("data-value", variable, dataset, date, station)}
        center={{ lng: station.lon, lat: station.lat }}
        {...dataMarkerOptions}
        {...stationColor(variable, dataset, station, colourScales)}
      >
        <StationPopup variable={variable} dataset={dataset} date={date} station={station} />
      </CircleMarker>
      <CircleMarker
        key={uniqueStationKey("data-location", variable, dataset, date, station)}
        center={{ lng: station.lon, lat: station.lat }}
        {...dataLocationOptions}
      />
    </React.Fragment>
  ));
}

StationDataMarkers.propTypes = {
  variable: PropTypes.string.isRequired,
  dataset: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataMarkerOptions: PropTypes.object,
  dataLocationOptions: PropTypes.object,
  colourScales: PropTypes.arrayOf(PropTypes.object).isRequired,
};
