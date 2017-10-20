// DataMap: Component that displays a map with data.
//
// Currently, we're accepting data in the output format from the Weather Anomaly Data Service endpoints
// /baseline and /weather. That may be refactored as we progress.
//
// For prop definitions, see comments in BCMap.propTypes.

import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import L from 'leaflet';

import BCMap from '../BCMap';
import { bindFunctions } from '../utils';
import './DataMap.css';

class DataMap extends Component {
    constructor(props) {
        super(props);

        // Bind event handlers
        bindFunctions(this, 'handleMapRef');
    }

    handleMapRef(component) {
        this.map = component.leafletElement;
    }

    // Placeholder for inserting station markers based on data.
    // This should be done in lifecycle hook `componentWillReceiveProps()`.
    componentDidMount() {
        // Icon markers (L.marker) don't work in this environment. I think it is because Webpack isn't including the
        // image files that are needed. Certainly the GETs for those images fail. But circle markers work.
        // let marker = L.marker(this.map.getCenter());
        const marker = L.circleMarker(this.map.getCenter());
        marker.addTo(this.map)
        // Since it's pretty likely we'll want to build the station popups from a React component,
        // this demonstrates how to do it with a simple React element.
            .bindPopup(
                ReactDOMServer.renderToStaticMarkup(<span>Test popup</span>)
            );
    }

    render() {
        return (
            <BCMap mapRef={this.handleMapRef}/>
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
