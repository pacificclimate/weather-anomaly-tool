// DataMap: Component that displays a map with data.
//
// Currently, we're accepting data in the output format from the monthly Anomaly Data Service endpoints
// /baseline and /monthly. That may be refactored as we progress.
//
// For prop definitions, see comments in BCMap.propTypes.

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';

import { LayerGroup, LayersControl } from 'react-leaflet';
import L from 'leaflet';

import _ from 'lodash';

import { bindFunctions, pick } from '../utils';
import BCMap from '../BCMap';
import StationPopup from '../StationPopup';
import './DataMap.css';

function now() {
    return (new Date()).getSeconds();
}

const stationCircleMarkerOptions = {
    color: '#000000',
    radius: 1,
    weight: 1,
    fillOpacity: 1,
};
const dataCircleMarkerOptions = {
    radius: 8,
    weight: 1,
    fillOpacity: 0.5,
    color: '#3388ff',
};

class DataMap extends Component {
    constructor(props) {
        super(props);
        this.baselineMarkers = [];

        // Bind event handlers
        bindFunctions(this, 'handleRefMap handleRefBaselineLayerGroup handleRefMonthlyLayerGroup handleRefDataLayerGroup');
    }

    // This is a factory of handlers, but it doesn't work for some reason; cannot access component.leafletElement,
    // even though console.log(component) shows the expected component with property leafletElement. WTF????
    // So we are reduced to cut-and-paste for ref handlers. Urk.
    handleLeafletRef(name) {
        return (function(component) {
            console.log(`handleLeafletRef(${name})`, 'component', component)
            console.log(`handleLeafletRef(${name})`, 'component.leafletElement', component.leafletElement)
            this[name] = component.leafletElement;
        }).bind(this);
    }

    handleRefMap(component) {
        this.map = component.leafletElement;
    }

    handleRefBaselineLayerGroup(component) {
        this.baselineLayerGroup = component.leafletElement;
    }

    handleRefMonthlyLayerGroup(component) {
        this.monthlyLayerGroup = component.leafletElement;
    }

    handleRefDataLayerGroup(component) {
        this.dataLayerGroup = component.leafletElement;
    }

    removeAllStationMarkers() {
        console.log('DataMap.removeAllStationMarkers', now());
        [this.baselineLayerGroup, this.monthlyLayerGroup, this.dataLayerGroup].forEach(group => {
            if (group) {
                group.clearLayers();
            }
        });
    }

    addStationLocationMarkers(stations, layerGroup, markerOptions) {
        // console.log('DataMap.addStationLocationMarkers');
        // Icon markers (L.marker) don't work in this environment. I think it is because Webpack isn't including the
        // image files that are needed. Certainly the GETs for those images fail. But circle markers work.
        const markers = stations.map((station) =>
            L.circleMarker({lng: station.lon, lat: station.lat}, markerOptions)
        );
        markers.forEach(marker => {
            marker.addTo(layerGroup);
        });
    }

    addStationDataMarkers(stations, layerGroup, markerOptions) {
        // console.log('DataMap.addStationDataMarkers');
        const markers = stations.map((station) =>
            L.circleMarker({lng: station.lon, lat: station.lat}, markerOptions)
                .bindPopup(
                    ReactDOMServer.renderToStaticMarkup(<StationPopup {...station}/>)
                )
        );
        markers.forEach(marker => {
            marker.addTo(layerGroup);
        });
    }

    addAllStationMarkers() {
        console.log('DataMap.addAllStationMarkers', now());
        this.addStationLocationMarkers(this.props.baseline, this.baselineLayerGroup, stationCircleMarkerOptions);
        this.addStationLocationMarkers(this.props.monthly, this.monthlyLayerGroup, stationCircleMarkerOptions);
        let stations;
        if (this.props.dataset === 'anomaly') {
            stations = this.props.baseline.map(baselineStation => {
                const monthlyStation = _.find(this.props.monthly, {station_db_id: baselineStation.station_db_id});
                const anomaly = monthlyStation && monthlyStation.statistic - baselineStation.datum;
                return {
                    ...pick(baselineStation, 'station_name lat lon elevation'),
                    anomaly,
                }
            });
        } else {
            stations = this.props[this.props.dataset];
        }
        this.addStationDataMarkers(stations, this.dataLayerGroup, dataCircleMarkerOptions);
}

    componentWillReceiveProps(nextProps) {
        console.log('DataMap.componentWillReceiveProps', nextProps);
        this.removeAllStationMarkers();
    }

    componentDidMount() {
        console.log('DataMap.componentDidMount', this.props);
    }

    componentDidUpdate() {
        console.log('DataMap.componentDidUpdate', this.props);
        this.addAllStationMarkers();
    }

    render() {
        return (
            <BCMap mapRef={this.handleRefMap}>
                <LayersControl position='topright'>
                    <LayersControl.Overlay name='Baseline stations' checked>
                        <LayerGroup ref={this.handleRefBaselineLayerGroup}/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name='Monthly stations' checked>
                        <LayerGroup ref={this.handleRefMonthlyLayerGroup}/>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name='Data values' checked>
                        <LayerGroup ref={this.handleRefDataLayerGroup}/>
                    </LayersControl.Overlay>
                </LayersControl>
            </BCMap>
        )
    }
}

DataMap.propTypes = {
    dataset: PropTypes.oneOf(['baseline', 'monthly', 'anomaly']).isRequired,
    // Name of dataset to display on data layer
    baseline: PropTypes.array.isRequired,
    // Array of baseline data from monthly Anomaly Data Service.
    monthly: PropTypes.array.isRequired,
    // Array of monthly data from monthly Anomaly Data Service.
};

export default DataMap;
