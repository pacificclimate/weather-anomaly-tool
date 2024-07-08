import {LayerGroup, LayersControl, Pane} from "react-leaflet";
import React from "react";
import useConfigContext from "@/state/context-hooks/use-config-context";
import StationLocationMarkers from "@/components/map/StationLocationMarkers";

export default function StationLocationMarkersPane({
  layerName,
  variable,
  dataset,
  date,
  stations,
  getVisibility,
  setVisibility,
}) {
  const config = useConfigContext();
  return (
    <Pane key={layerName} name={`${layerName}-pane`}>
      <LayersControl.Overlay
        name={config.map.markerLayers.definitions[dataset]}
        checked={getVisibility(layerName)}
      >
        <LayerGroup
          eventHandlers={{
            add: () => setVisibility(layerName, true),
            remove: () => setVisibility(layerName, false),
          }}
        >
          <StationLocationMarkers
            type="station-loc"   // Use layerName here?
            variable={variable}
            dataset={dataset}
            date={date}
            stations={stations}
            options={config.map.markers.location}
          />
        </LayerGroup>
      </LayersControl.Overlay>
    </Pane>
  );
}
