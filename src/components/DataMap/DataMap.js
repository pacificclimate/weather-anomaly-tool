// DataMap: Component that displays a map with data.
//
// Currently, we're accepting data in the output format from the monthly Anomaly Data Service endpoints
// /baseline and /monthly. That may be refactored as we progress.
//
// For prop definitions, see comments in BCMap.propTypes.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LayerGroup, LayersControl, CircleMarker, Popup } from 'react-leaflet';

import _ from 'lodash';

import { pick } from '../utils';
import BCMap from '../BCMap';
import MessageControl from '../MessageControl';
import StationPopup from '../StationPopup';
import './DataMap.css';

const stationLocationMarkerOptions = {
    color: '#000000',
    radius: 1,
    weight: 1,
    fillOpacity: 1,
};
const dataMarkerOptions = {
    radius: 8,
    weight: 1,
    fillOpacity: 0.5,
};
const colorForVariable = {
    'precip': '#36ff32',
    'tmin': '#3388ff',
    'tmax': '#ff6831',

};

function uniqueKey(station) {
    return station.station_db_id.toString() + station.network_variable_name;
}

// TODO: Make this into a component
function stationLocationMarkers(stations, markerOptions) {
    // Icon markers (L.marker) don't work in this environment. I think it is because Webpack isn't including the
    // image files that are needed. Certainly the GETs for those images fail. But circle markers work.
    return stations.map((station) =>
        // TODO: use a more certainly unique key than station_native_id. But backend doesn't provide yet.
        <CircleMarker key={uniqueKey(station)} center={{lng: station.lon, lat: station.lat}} {...markerOptions} />
    );
}

// TODO: Make this into a component
function stationDataMarkers(variable, stations, markerOptions) {
    // console.log('DataMap.addStationDataMarkers');
    return stations.map(station =>
        <CircleMarker key={uniqueKey(station)} center={{lng: station.lon, lat: station.lat}} {...markerOptions}>
            <StationPopup variable={variable} {...station}/>
        </CircleMarker>
    );
}

class DataMap extends Component {
    stationsForDataset() {
        // Return a set of stations determined by `this.props.dataset`. For `anomaly` stations,
        // compute the anomaly for stations for which there is both baseline and monthly data.
        let stations;
        if (this.props.dataset === 'anomaly') {
            const monthlyByStationDbId = _.groupBy(this.props.monthly, 'station_db_id');
            stations = [];
            this.props.baseline.forEach(baselineStation => {
                const monthlyStation = monthlyByStationDbId[baselineStation.station_db_id];
                if (monthlyStation) {
                    const anomaly = monthlyStation[0].statistic - baselineStation.datum;
                    stations.push({
                        ...pick(baselineStation, 'station_name lat lon elevation station_db_id network_variable_name'),
                        anomaly,
                    });
                }
            });
        } else {
            stations = this.props[this.props.dataset];
        }
        return stations;
    }

    render() {
        return (
            <BCMap>
                <LayersControl position='topright'>
                    <LayersControl.Overlay name='Baseline stations'>
                        <LayerGroup>
                            {stationLocationMarkers(this.props.baseline, stationLocationMarkerOptions)}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name='Monthly stations' checked>
                        <LayerGroup>
                            {stationLocationMarkers(this.props.monthly, stationLocationMarkerOptions)}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name='Data values' checked>
                        <LayerGroup>
                            {stationDataMarkers(this.props.variable, this.stationsForDataset(),
                                {...dataMarkerOptions, color: colorForVariable[this.props.variable]})
                            }
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
                {this.props.message && <MessageControl position='topright'>{this.props.message}</MessageControl>}
            </BCMap>
        )
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
    message: PropTypes.string,  // Component?
    // Optional message to display on map (e.g., "Loading...")
};

DataMap.defaultProps = {
    message: null,
};

export default DataMap;
