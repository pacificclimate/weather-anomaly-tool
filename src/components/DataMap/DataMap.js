// DataMap: Component that displays a map with data.
//
// Currently, we're accepting data in the output format from the Weather Anomaly Data Service endpoints
// /baseline and /weather. That may be refactored as we progress.
//
// For prop definitions, see comments in BCMap.propTypes.

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { ScaleControl } from 'react-leaflet';
import L from 'leaflet';

import BCMap from '../BCMap';
import { bindFunctions } from '../utils';
import './DataMap.css';

class DataMap extends Component {
    constructor(props) {
        super(props);
        this.baselineMarkers = [];

        // Bind event handlers
        bindFunctions(this, 'handleMapRef');
    }

    handleMapRef(component) {
        this.map = component.leafletElement;
    }

    // Placeholder for inserting station markers based on data.
    // This should be done in lifecycle hook `componentWillReceiveProps()`.
    displayData() {
        console.log('DataMap.displayData, baseline:', this.props.baseline);
        this.baselineMarkers.map(marker => {
            this.map.removeLayer(marker);
            return null;  // prevent warning
        });
        // Icon markers (L.marker) don't work in this environment. I think it is because Webpack isn't including the
        // image files that are needed. Certainly the GETs for those images fail. But circle markers work.
        this.baselineMarkers = this.props.baseline.map((station) =>
            L.circleMarker({lng: station.lon, lat: station.lat})
                .bindPopup(
                    ReactDOMServer.renderToStaticMarkup(<span>{station.station_name}</span>)
                )
        );
        this.baselineMarkers.map(marker => {
            marker.addTo(this.map);
            return null;  // prevent warning
        });
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
            <BCMap mapRef={this.handleMapRef}>
                <ScaleControl/>
            </BCMap>
        )
    }
}

DataMap.propTypes = {
    baseline: PropTypes.array.isRequired,
    // Array of baseline data from Weather Anomaly Data Service.
    weather: PropTypes.array.isRequired,
    // Array of weather data from Weather Anomaly Data Service.
};

export default DataMap;
