// DataMap: Component that displays a map with data.

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { LayerGroup, LayersControl, Pane } from "react-leaflet";
import _ from "lodash";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import compact from "lodash/fp/compact";

import { BCBaseMap } from "pcic-react-leaflet-components";
import "@/components/map/DataMap.css";
import { useConfigContext } from "@/state/context-hooks/use-config-context";
import MapSpinner from "@/components/map/MapSpinner";
import StationDataMarkers from "@/components/map/StationDataMarkers";
import StationLocationMarkers from "@/components/map/StationLocationMarkers";

export default function DataMap({ dataset, variable, monthly, baseline }) {
  const config = useConfigContext();

  const stationsForDataset = useMemo(() => {
    // Return a set of stations determined by `dataset`.
    // For `baseline` and `monthly`, return the respective station sets.
    // For `anomaly`, compute the anomaly for stations for which there is both
    // baseline and monthly data.
    if (dataset === "baseline") {
      return baseline;
    }

    if (dataset === "monthly") {
      return monthly;
    }

    // dataset === 'anomaly'
    // This effectively performs an inner join of `baseline` and `monthly` on
    // `station_db_id`, and adds the `anomaly` and `departure` attributes to
    // each resulting item.
    const monthlyByStationDbId = _.groupBy(monthly, "station_db_id");
    return flow(
      map((baselineStation) => {
        const monthlyStation =
          monthlyByStationDbId[baselineStation.station_db_id];
        return (
          monthlyStation && {
            ...baselineStation,
            anomaly: monthlyStation[0].statistic - baselineStation.datum,
            departure: monthlyStation[0].statistic / baselineStation.datum - 1,
          }
        );
      }),
      compact,
    )(baseline);
  }, [dataset, monthly, baseline]);

  // TODO: Consider useMemo for each item
  // Unordered marker layers
  // Each overlay group is enclosed in a Pane, which controls the ordering
  // of the layers on the map. Rendering them in a particular order (see below)
  // within the map controls which layer overlays which.
  const markerLayersById = {
    data: (
      <Pane key={"data"} name="dataValueMarkerPane">
        <LayersControl.Overlay
          name={config.map.markerLayers.definitions.data}
          checked={true}
        >
          <LayerGroup>
            <StationDataMarkers
              variable={variable}
              dataset={dataset}
              stations={stationsForDataset}
              dataMarkerOptions={config.map.markers.data}
              dataLocationOptions={config.map.markers.location}
              colourScales={config.colourScales}
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </Pane>
    ),

    monthly: (
      <Pane key={"monthly"} name="monthlyStationLocationMarkerPane">
        <LayersControl.Overlay
          name={config.map.markerLayers.definitions.monthly}
          checked={false}
        >
          <LayerGroup>
            <StationLocationMarkers
              type="monthly"
              stations={monthly}
              options={config.map.markers.location}
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </Pane>
    ),

    baseline: (
      <Pane key={"baseline"} name="baselineStationLocationMarkerPane">
        <LayersControl.Overlay
          name={config.map.markerLayers.definitions.baseline}
          checked={false}
        >
          <LayerGroup>
            <StationLocationMarkers
              type="baseline"
              stations={baseline}
              options={config.map.markers.location}
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </Pane>
    ),
  };

  const content =
    baseline?.length > 0 && monthly?.length > 0 ? (
      <LayersControl position="topright">
        {
          // Render marker layers in order defined by config. Because each
          // layer group is enclosed in a Pane, the ordering controls which
          // layer overlays which. Later-rendered Panes overlay earlier ones.
          // The ordering also controls the order the layer is listed
          // in the LayersControl.
          config.map.markerLayers.order.map((id) => markerLayersById[id])
        }
      </LayersControl>
    ) : (
      <MapSpinner />
    );

  return (
    <BCBaseMap
      id={"data-map"}
      center={BCBaseMap.initialViewport.center}
      zoom={BCBaseMap.initialViewport.zoom}
    >
      {content}
    </BCBaseMap>
  );
}

DataMap.propTypes = {
  dataset: PropTypes.oneOf(["baseline", "monthly", "anomaly"]).isRequired,
  // Name of dataset to display on data layer
  variable: PropTypes.oneOf(["precip", "tmin", "tmax"]).isRequired,
  // Variable we are displaying ... may affect how/what we show
  baseline: PropTypes.array.isRequired,
  // Array of baseline data from monthly Anomaly Data Service.
  monthly: PropTypes.array.isRequired,
  // Array of monthly data from monthly Anomaly Data Service.
};
