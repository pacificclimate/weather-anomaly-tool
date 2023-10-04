// DataMap: Component that displays a map with data.

import React, { PureComponent } from 'react';
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

import { BCBaseMap } from 'pcic-react-leaflet-components';
import { pick } from '../utils';
import StationPopup from '../StationPopup';
import { stationColor } from './stationColor';
import './DataMap.css';

const locationMarkerOptions = {
  color: '#222222',
  radius: 1,
  weight: 1,
  fillOpacity: 1,
};

const dataMarkerOptions = {
  radius: 8,
  color: "#999999",
  weight: 1,
  fillOpacity: 0.8,
  fillColor: "#000000",  // Replaced according to station value
};

function uniqueKey(station) {
  return station.station_db_id.toString() + station.network_variable_name;
}

function StationLocationMarkers({ type, stations }) {
  // Return a set of markers (<CircleMarker/>) for the locations of each
  // station in `props.station`. Icon markers `<Marker/>` don't work in this
  // environment. I think it is because Webpack isn't including the image
  // files that are needed. Certainly the GETs for those images fail. But
  // circle markers work.
  return stations.map(station =>
    <CircleMarker
      key={`loc-${type}-${uniqueKey(station)}`}
      center={{ lng: station.lon, lat: station.lat }}
      {...locationMarkerOptions}
    />
  );
}

function StationDataMarkers({ variable, dataset, stations }) {
  // Return a list of markers (<CircleMarker/>) for the data for each station
  // in `station`.
  return stations.map(station =>
    <CircleMarker
      key={`data-${variable}-${dataset}-${uniqueKey(station)}`}
      center={{ lng: station.lon, lat: station.lat }}
      {...dataMarkerOptions}
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


class DataMap extends PureComponent {
  static propTypes = {
    variable: PropTypes.oneOf(["precip", "tmin", "tmax"]).isRequired,
    dataset: PropTypes.oneOf(["anomaly", "monthly", "baseline"]).isRequired,
    monthly: PropTypes.array.isRequired,
    baseline: PropTypes.array.isRequired,
  };

  stationsForDataset() {
    // Return a set of stations determined by `this.props.dataset`.
    // For `baseline` and `monthly`, return the respective station sets.
    // For `anomaly`, compute the anomaly for stations for which there is both
    // baseline and monthly data.
    // TODO: This code is horrible. Improve (early ret; functional prog.)
    let stations;

    if (this.props.dataset === 'anomaly') {
      const monthlyByStationDbId = _.groupBy(
        this.props.monthly, 'station_db_id'
      );
      stations = [];
      this.props.baseline.forEach(baselineStation => {
        const monthlyStation =
          monthlyByStationDbId[baselineStation.station_db_id];
        if (monthlyStation) {
          const anomaly =
            monthlyStation[0].statistic - baselineStation.datum;
          const departure =
            monthlyStation[0].statistic / baselineStation.datum - 1;
          stations.push({
            ...baselineStation,
            anomaly,
            departure,
          });
        }
      });

    } else {
      stations = this.props[this.props.dataset];
    }
    return stations;
  }

  render() {
    const content =
      (this.props.baseline?.length > 0 && this.props.monthly?.length > 0) ?
      (
        <LayersControl position='topright'>
          <LayersControl.Overlay name='Data values' checked>
            <LayerGroup>
              <StationDataMarkers
                variable={this.props.variable}
                dataset={this.props.dataset}
                stations={this.stationsForDataset()}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Baseline stations'>
            <LayerGroup>
              <StationLocationMarkers
                type="baseline"
                stations={this.props.baseline}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Monthly stations' checked>
            <LayerGroup>
              <StationLocationMarkers
                type="monthly"
                stations={this.props.monthly}
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
}

DataMap.propTypes = {
  dataset: PropTypes.oneOf(['baseline', 'monthly', 'anomaly']).isRequired,
  // Name of dataset to display on data layer
  variable: PropTypes.string,  // TODO: .oneOf ?
  // Variable we are displaying ... may affect how/what we show
  baseline: PropTypes.array.isRequired,
  // Array of baseline data from monthly Anomaly Data Service.
  monthly: PropTypes.array.isRequired,
  // Array of monthly data from monthly Anomaly Data Service.
};

DataMap.defaultProps = {
  message: null,
};

export default DataMap;
