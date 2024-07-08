import React from "react";
import { CircleMarker } from "react-leaflet";
import { uniqueStationKey } from "@/components/map/uniqueKey";
import PropTypes from "prop-types";

export default function StationLocationMarkers({
  type,
  variable,
  dataset,
  date,
  stations,
  options,
}) {
  // Return markers (<CircleMarker/>) for the locations
  // of each station in `station`. Icon markers `<Marker/>` don't work in
  // this environment. I think it is because Webpack isn't including the image
  // files that are needed. Certainly the GETs for those images fail. But
  // circle markers work.

  return stations.map((station) => (
    <CircleMarker
      key={uniqueStationKey(type, variable, dataset, date, station)}
      center={{ lng: station.lon, lat: station.lat }}
      {...options}
    />
  ));
}

StationLocationMarkers.propTypes = {
  type: PropTypes.string.isRequired,
  variable: PropTypes.string.isRequired,
  dataset: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
  stations: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataMarkerOptions: PropTypes.object,
  dataLocationOptions: PropTypes.object,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};
