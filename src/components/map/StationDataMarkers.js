import React from "react";
import { CircleMarker } from "react-leaflet";

import { stationColor } from "@/components/map/stationColor";
import StationPopup from "@/components/map/StationPopup";
import uniqueKey from "@/components/map/uniqueKey";

export default function StationDataMarkers({
  variable,
  dataset,
  stations,
  dataMarkerOptions,
  dataLocationOptions,
  colourScales,
}) {
  // Return a list of markers (<CircleMarker/>) for the data for each station
  // in `station`.
  return stations.map((station) => (
    <React.Fragment key={`frag-${variable}-${dataset}-${uniqueKey(station)}`}>
      <CircleMarker
        key={`data-${variable}-${dataset}-${uniqueKey(station)}`}
        center={{ lng: station.lon, lat: station.lat }}
        {...dataMarkerOptions}
        {...stationColor(variable, dataset, station, colourScales)}
      >
        <StationPopup variable={variable} dataset={dataset} station={station} />
      </CircleMarker>
      <CircleMarker
        key={`dataloc-${variable}-${uniqueKey(station)}`}
        center={{ lng: station.lon, lat: station.lat }}
        {...dataLocationOptions}
      />
    </React.Fragment>
  ));
}
