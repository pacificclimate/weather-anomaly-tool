import React from "react";
import { CircleMarker } from "react-leaflet";
import uniqueKey, {uniqueStationKey} from "@/components/map/uniqueKey";

export default function StationLocationMarkers({
   type, variable, dataset, date, stations, options
}) {
  // Return a set of markers (<CircleMarker/>) for the locations of each
  // station in `props.station`. Icon markers `<Marker/>` don't work in this
  // environment. I think it is because Webpack isn't including the image
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
