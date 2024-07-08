import React from "react";
import { CircleMarker, LayerGroup } from "react-leaflet";

import { stationColor } from "@/components/map/stationColor";
import StationPopup from "@/components/map/StationPopup";
import { uniqueStationKey } from "@/components/map/uniqueKey";
import PropTypes from "prop-types";

export default function StationDataMarkers({
  type = "data",
  variable,
  dataset,
  date,
  stations,
  dataMarkerOptions,
  dataLocationOptions,
  colourScales, // Pass in just the applicable colour scale, not all
  onAdd,
  onRemove,
}) {
  // Return a LayerGroup containing markers (<CircleMarker>) for the data
  // for each station in `station`.
  return (
    <LayerGroup eventHandlers={{ add: onAdd, remove: onRemove }}>
      {stations.map((station) => (
        <>
          <CircleMarker
            key={uniqueStationKey(
              `${type}-value`,
              variable,
              dataset,
              date,
              station,
            )}
            center={{ lng: station.lon, lat: station.lat }}
            {...dataMarkerOptions}
            {...stationColor(variable, dataset, station, colourScales)}
          >
            <StationPopup
              variable={variable}
              dataset={dataset}
              date={date}
              station={station}
            />
          </CircleMarker>
          <CircleMarker
            key={uniqueStationKey(
              `${type}-location`,
              variable,
              dataset,
              date,
              station,
            )}
            center={{ lng: station.lon, lat: station.lat }}
            {...dataLocationOptions}
          />
        </>
      ))}
    </LayerGroup>
  );
}

StationDataMarkers.propTypes = {
  type: PropTypes.string,
  variable: PropTypes.string.isRequired,
  dataset: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataMarkerOptions: PropTypes.object,
  dataLocationOptions: PropTypes.object,
  colourScales: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};
