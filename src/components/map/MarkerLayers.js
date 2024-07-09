import React, { useState } from "react";
import StationDataMarkersPane from "@/components/map/StationDataMarkersPane";
import StationLocationMarkersPane from "@/components/map/StationLocationMarkersPane";
import useConfigContext from "@/state/context-hooks/use-config-context";
import { LayersControl } from "react-leaflet";

export default function MarkerLayers({
  dataset,
  variable,
  date,
  baseline,
  monthly,
  stationsForDataset,
}) {
  // Server state
  const config = useConfigContext();

  // App state

  // Layer visibility.
  //
  // This set of states could be formulated differently,
  // but this way works fine. To ensure correct behaviour have to create a new
  // state object every time state is updated.
  const [visibleLayers, setVisibleLayers] = useState({
    stationDataValueMarkers: true,
    monthlyStationLocationMarkers: false,
    baselineStationLocationMarkers: false,
  });
  const getLayerVisibility = (layer) => visibleLayers[layer];
  const setLayerVisibility = (layer, visibility) =>
    setVisibleLayers({
      ...visibleLayers,
      [layer]: visibility,
    });

  // TODO: Consider useMemo for each item
  // Unordered marker layers
  // Each overlay group is enclosed in a Pane, which controls the ordering
  // of the layers on the map. Rendering them in a particular order (see below)
  // within the map controls which layer overlays which.
  const markerLayersById = {
    data: (
      <StationDataMarkersPane
        key={"data"}
        layerName={"stationDataValueMarkers"}
        variable={variable}
        dataset={dataset}
        date={date}
        stations={stationsForDataset}
        getVisibility={getLayerVisibility}
        setVisibility={setLayerVisibility}
      />
    ),

    monthly: (
      <StationLocationMarkersPane
        key={"monthly"}
        layerName={"monthlyStationLocationMarkers"}
        variable={variable}
        dataset={"monthly"}
        date={date}
        stations={monthly}
        getVisibility={getLayerVisibility}
        setVisibility={setLayerVisibility}
      />
    ),

    baseline: (
      <StationLocationMarkersPane
        key={"baseline"}
        layerName={"baselineStationLocationMarkers"}
        variable={variable}
        dataset={"baseline"}
        date={date}
        stations={baseline}
        getVisibility={getLayerVisibility}
        setVisibility={setLayerVisibility}
      />
    ),
  };

  // Return marker layers in order defined by config.
  // Because each layer group is enclosed in a Pane, the ordering controls
  // which layer overlays which. Later-rendered Panes overlay earlier ones.
  // The ordering also controls the order the layer is listed
  // in the LayersControl.
  // Note: We must return the LayersControl as part of this component.
  // Otherwise, layer visibility is not maintained between re-renders.
  // It is not clear why this is so, but the interaction between
  // Layers and LayersControl is subtle.
  return (
    <LayersControl position="topright">
      {config.map.markerLayers.order.map((id) => markerLayersById[id])}
    </LayersControl>
  );
}
