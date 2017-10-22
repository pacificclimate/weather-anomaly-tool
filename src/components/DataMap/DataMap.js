// DataMap: Component that displays a map with data.
//
// Currently, we're accepting data in the output format from the monthly Anomaly Data Service endpoints
// /baseline and /monthly. That may be refactored as we progress.
//
// For prop definitions, see comments in BCMap.propTypes.

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { ScaleControl, LayerGroup, LayersControl } from 'react-leaflet';
import L from 'leaflet';

import BCMap from '../BCMap';
import StationPopup from '../StationPopup';
import { bindFunctions } from '../utils';
import './DataMap.css';

const circleMarkerOptions = {
    radius: 8,
    weight: 1,
    fillOpacity: 0.5,
};
const baselineCircleMarkerOptions = {
    ...circleMarkerOptions,
    color: '#3388ff',
};
const monthlyCircleMarkerOptions = {
    ...circleMarkerOptions,
    color: '#df42f4',
};

class DataMap extends Component {
    constructor(props) {
        super(props);
        this.baselineMarkers = [];

        // Bind event handlers
        bindFunctions(this, 'handleRefMap handleRefBaselineLayerGroup handleRefMonthlyLayerGroup');
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

    displayStationData(stations, layerGroup, markerOptions) {
        layerGroup.eachLayer(marker => {
            layerGroup.removeLayer(marker);
        });
        // Icon markers (L.marker) don't work in this environment. I think it is because Webpack isn't including the
        // image files that are needed. Certainly the GETs for those images fail. But circle markers work.
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

    displayData() {
        console.log('DataMap.displayData');
        this.displayStationData(this.props.baseline, this.baselineLayerGroup, baselineCircleMarkerOptions);
        this.displayStationData(this.props.monthly, this.monthlyLayerGroup, monthlyCircleMarkerOptions);
    }

    componentWillReceiveProps(nextProps) {
        console.log('DataMap.componentWillReceiveProps', nextProps);
    }

    componentDidMount() {
        console.log('DataMap.componentDidMount', this.props);
    }

    componentDidUpdate() {
        console.log('DataMap.componentDidUpdate', this.props);
        this.displayData();
    }

    render() {
        return (
            <BCMap mapRef={this.handleRefMap}>
                <LayersControl.Overlay name='Baseline' checked>
                    <LayerGroup ref={this.handleRefBaselineLayerGroup}/>
                </LayersControl.Overlay>
                <LayersControl.Overlay name='Monthly'>
                    <LayerGroup ref={this.handleRefMonthlyLayerGroup}/>
                </LayersControl.Overlay>
            </BCMap>
        )
    }
}

DataMap.propTypes = {
    baseline: PropTypes.array.isRequired,
    // Array of baseline data from monthly Anomaly Data Service.
    monthly: PropTypes.array.isRequired,
    // Array of monthly data from monthly Anomaly Data Service.
};

export default DataMap;
