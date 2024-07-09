// DataMap: Component that displays a map with data.

import React, { useMemo } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import flow from "lodash/fp/flow";
import map from "lodash/fp/map";
import compact from "lodash/fp/compact";

import { BCBaseMap } from "pcic-react-leaflet-components";
import { useConfigContext } from "@/state/context-hooks/use-config-context";
import MapSpinner from "@/components/map/MapSpinner";
import useBaseline from "@/state/query-hooks/use-baseline";
import useMonthly from "@/state/query-hooks/use-monthly";
import { formatDate } from "@/components/utils";
import MarkerLayers from "@/components/map/MarkerLayers";

import "@/components/map/DataMap.css";

export default function DataMap({ dataset, variable, date }) {
  // Server state
  const config = useConfigContext();
  const {
    data: baseline,
    isPending: baselineIsPending,
    isError: baselineIsError,
  } = useBaseline(variable, date);
  const {
    data: monthly,
    isPending: monthlyIsPending,
    isError: monthlyIsError,
  } = useMonthly(variable, date);

  const isBaseline = dataset === "baseline";
  const isMonthly = dataset === "monthly";

  const stationsForDataset = useMemo(() => {
    // Return a set of stations determined by `dataset`.
    // For `baseline` and `monthly`, return the respective station sets.
    // For `anomaly`, compute the anomaly for stations for which there is both
    // baseline and monthly data.
    if (isBaseline) {
      return baseline;
    }

    if (isMonthly) {
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

  const makeContent = () => {
    if (baselineIsPending || monthlyIsPending) {
      return <MapSpinner>Loading data...</MapSpinner>;
    }

    if (baselineIsError || monthlyIsError) {
      return (
        <MapSpinner>Sorry, there was an error loading this data.</MapSpinner>
      );
    }

    if (stationsForDataset.length === 0) {
      return (
        <MapSpinner>
          No {dataset} data is available for {formatDate(date, dataset)}.
        </MapSpinner>
      );
    }

    return (
      <MarkerLayers
        dataset={dataset}
        variable={variable}
        date={date}
        baseline={baseline}
        monthly={monthly}
        stationsForDataset={stationsForDataset}
      />
    );
  };

  return (
    <BCBaseMap
      id={"data-map"}
      center={BCBaseMap.initialViewport.center}
      zoom={BCBaseMap.initialViewport.zoom}
      {...config.map?.options}
    >
      {makeContent()}
    </BCBaseMap>
  );
}

DataMap.propTypes = {
  dataset: PropTypes.oneOf(["baseline", "monthly", "anomaly"]).isRequired,
  // Name of dataset to display on data layer
  variable: PropTypes.oneOf(["precip", "tmin", "tmax"]).isRequired,
  // Variable we are displaying ... may affect how/what we show
  date: PropTypes.object,
  // moment object representing date (year, month) to display
};
