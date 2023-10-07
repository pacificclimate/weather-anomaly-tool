// DataMap: Component that displays a map with data.

import React from 'react';
import PropTypes from 'prop-types';
import {
  LayerGroup,
  LayersControl,
  CircleMarker,
  SVGOverlay,
  useMap,
} from 'react-leaflet';
import * as SVGLoaders from 'svg-loaders-react';
import _ from 'lodash';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import compact from 'lodash/fp/compact';

import { BCBaseMap } from 'pcic-react-leaflet-components';
import StationPopup from '../StationPopup';
import { stationColor } from './stationColor';
import './DataMap.css';
import { useConfigContext } from '../../main/ConfigContext';


function uniqueKey(station) {
  return station.station_db_id.toString() + station.network_variable_name;
}

function StationLocationMarkers({ type, stations, options }) {
  // Return a set of markers (<CircleMarker/>) for the locations of each
  // station in `props.station`. Icon markers `<Marker/>` don't work in this
  // environment. I think it is because Webpack isn't including the image
  // files that are needed. Certainly the GETs for those images fail. But
  // circle markers work.
  return stations.map(station =>
    <CircleMarker
      key={`loc-${type}-${uniqueKey(station)}`}
      center={{ lng: station.lon, lat: station.lat }}
      {...options}
    />
  );
}

function StationDataMarkers({ variable, dataset, stations, options }) {
  // Return a list of markers (<CircleMarker/>) for the data for each station
  // in `station`.
  return stations.map(station =>
    <CircleMarker
      key={`data-${variable}-${dataset}-${uniqueKey(station)}`}
      center={{ lng: station.lon, lat: station.lat }}
      {...options}
      fillColor={stationColor(variable, dataset, station)}
    >
      <StationPopup variable={variable} dataset={dataset}  station={station}/>
    </CircleMarker>
  );
}


function MapSpinner() {
  const map = useMap();
  return (
    <SVGOverlay bounds={map.getBounds()}>
      <SVGLoaders.Bars x="40%" y="40%" stroke="#98ff98"/>
    </SVGOverlay>
  );
}


export default function DataMap({ dataset, variable, monthly, baseline }) {
  const config = useConfigContext();

  function stationsForDataset() {
    // Return a set of stations determined by `dataset`.
    // For `baseline` and `monthly`, return the respective station sets.
    // For `anomaly`, compute the anomaly for stations for which there is both
    // baseline and monthly data.
    if (dataset === 'baseline') {
      return baseline;
    }

    if (dataset === 'monthly') {
      return monthly;
    }

    // dataset === 'anomaly'
    // This effectively performs an inner join of `baseline` and `monthly` on
    // `station_db_id`, and adds the `anomaly` and `departure` attributes to
    // each resulting item.
    const monthlyByStationDbId = _.groupBy(monthly, 'station_db_id');
    const stations = flow(
      map(baselineStation => {
        const monthlyStation =
          monthlyByStationDbId[baselineStation.station_db_id];
        return monthlyStation && (
          {
            ...baselineStation,
            anomaly: monthlyStation[0].statistic - baselineStation.datum,
            departure: monthlyStation[0].statistic / baselineStation.datum - 1,
          }
        )
      }),
      compact,
    )(baseline);
    return stations;
  }

  const content =
    (baseline?.length > 0 && monthly?.length > 0) ?
    (
      <LayersControl position='topright'>
        <LayersControl.Overlay name='Data values' checked>
          <LayerGroup>
            <StationDataMarkers
              variable={variable}
              dataset={dataset}
              stations={stationsForDataset()}
              options={config.frontend.map.markers.data}
            />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name='Baseline stations'>
          <LayerGroup>
            <StationLocationMarkers
              type="baseline"
              stations={baseline}
              options={config.frontend.map.markers.location}
            />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name='Monthly stations' checked>
          <LayerGroup>
            <StationLocationMarkers
              type="monthly"
              stations={monthly}
              options={config.frontend.map.markers.location}
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    ) : (
      <MapSpinner/>
    );

    return (
      <BCBaseMap
        id={'data-map'}
        center={BCBaseMap.initialViewport.center}
        zoom={BCBaseMap.initialViewport.zoom}
      >
        {content}
      </BCBaseMap>
    );
}

DataMap.propTypes = {
  dataset: PropTypes.oneOf(['baseline', 'monthly', 'anomaly']).isRequired,
  // Name of dataset to display on data layer
  variable: PropTypes.oneOf(["precip", "tmin", "tmax"]).isRequired,
  // Variable we are displaying ... may affect how/what we show
  baseline: PropTypes.array.isRequired,
  // Array of baseline data from monthly Anomaly Data Service.
  monthly: PropTypes.array.isRequired,
  // Array of monthly data from monthly Anomaly Data Service.
};
