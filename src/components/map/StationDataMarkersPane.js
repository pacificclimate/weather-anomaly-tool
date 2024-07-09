import {LayerGroup, LayersControl, Pane} from "react-leaflet";
import StationDataMarkers from "@/components/map/StationDataMarkers";
import React from "react";
import useConfigContext from "@/state/context-hooks/use-config-context";

export default function StationDataMarkersPane({
  layerName = "stationDataValueMarkers",
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
        name={config.map.markerLayers.definitions.data}
        checked={getVisibility(layerName)}
      >
        <LayerGroup
          eventHandlers={{
            add: () => setVisibility(layerName, true),
            remove: () => setVisibility(layerName, false),
          }}
        >
          <StationDataMarkers
            variable={variable}
            dataset={dataset}
            date={date}
            stations={stations}
            dataMarkerOptions={config.map.markers.data}
            dataLocationOptions={config.map.markers.location}
            colourScales={config.colourScales}
          />
        </LayerGroup>
      </LayersControl.Overlay>
    </Pane>
  );
}
