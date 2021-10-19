// DataMap: Component that displays a map with data.
//
// Currently, we're accepting data in the output format from the monthly Anomaly Data Service endpoints
// /baseline and /monthly. That may be refactored as we progress.
//
// For prop definitions, see comments in BCMap.propTypes.

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { LayerGroup, LayersControl, CircleMarker } from 'react-leaflet';

import _ from 'lodash';

import { BCBaseMap } from 'pcic-react-leaflet-components';
import { bindFunctions, pick } from '../utils';
import StaticControl from '../StaticControl';
import StationPopup from '../StationPopup';
import stationColor from './stationColor';
import './DataMap.css';

const locationMarkerOptions = {
    color: '#000000',
    radius: 1,
    weight: 1,
    fillOpacity: 1,
};

const dataMarkerOptions = {
    radius: 8,
    weight: 1,
    fillOpacity: 0.75,
};

function uniqueKey(station) {
    return station.station_db_id.toString() + station.network_variable_name;
}

function StationLocationMarkers({stations}) {
    // Return a set of markers (<CircleMarker/>) for the locations of each station in `props.station`.
    // Icon markers `<Marker/>` don't work in this environment. I think it is because Webpack isn't including the
    // image files that are needed. Certainly the GETs for those images fail. But circle markers work.
    return stations.map(station =>
        <CircleMarker
            key={uniqueKey(station)}
            center={{lng: station.lon, lat: station.lat}}
            {...locationMarkerOptions}
        />
    );
}

function StationDataMarkers({variable, dataset, stations}) {
    // Return a set of markers (<CircleMarker/>) for the data for each station in `station`.

    return stations.map(station =>
        <CircleMarker
            key={uniqueKey(station)}
            center={{lng: station.lon, lat: station.lat}}
            {...dataMarkerOptions}
            color={stationColor(variable, dataset, station)}
        >
            <StationPopup variable={variable} {...station}/>
        </CircleMarker>
    );
}

class DataMap extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            faderColor: '#777777',
            faderOpacity: 0.6,
        };

        this.baselineMarkers = [];  // Necessary?

        // Bind event handlers
        bindFunctions(this, 'handleMapFaderChangeColor handleMapFaderChangeOpacity handleRefFaderLayer');
    }

    handleMapFaderChangeColor(faderColor) {
        this.setState({faderColor}, () => this.faderLayer.redraw());
    }

    handleMapFaderChangeOpacity(faderOpacity) {
        this.setState({faderOpacity});
    }

    handleRefFaderLayer(component) {
        this.faderLayer = component.leafletElement;
        this.faderLayer.createTile = () => {
            const tile = document.createElement('div');
            tile.style.background = this.state.faderColor;
            // tile.style.background = '#000000';
            // tile.style.background = '#ffffff';
            return tile;
        };
        this.faderLayer.redraw();
    }

    stationsForDataset() {
        // Return a set of stations determined by `this.props.dataset`.
        // For `baseline` and `monthly`, return the respective station sets.
        // For `anomaly`, compute the anomaly for stations for which there is both baseline and monthly data.
        let stations;
        if (this.props.dataset === 'anomaly') {
            const monthlyByStationDbId = _.groupBy(this.props.monthly, 'station_db_id');
            stations = [];
            this.props.baseline.forEach(baselineStation => {
                const monthlyStation = monthlyByStationDbId[baselineStation.station_db_id];
                if (monthlyStation) {
                    const anomaly = monthlyStation[0].statistic - baselineStation.datum;
                    const departure = 100 * ((monthlyStation[0].statistic / baselineStation.datum) - 1);
                    stations.push({
                        ...pick(baselineStation, 'station_name lat lon elevation station_db_id network_variable_name'),
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
        return (
            <BCBaseMap
              id={'data-map'}
              viewport={BCBaseMap.initialViewport}
            >
                <LayersControl position='topright'>
                    <LayersControl.Overlay name='Baseline stations'>
                        <LayerGroup>
                            <StationLocationMarkers
                              stations={this.props.baseline}
                            />
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name='Monthly stations' checked>
                        <LayerGroup>
                            <StationLocationMarkers
                              stations={this.props.monthly}
                            />
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name='Data values' checked>
                        <LayerGroup>
                            <StationDataMarkers
                              variable={this.props.variable}
                              dataset={this.props.dataset}
                              stations={this.stationsForDataset()}
                            />
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
                {
                    this.props.message &&
                    <StaticControl position='topright'>
                        {this.props.message}
                    </StaticControl>
                }
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
    message: PropTypes.string,  // Component?
    // Optional message to display on map (e.g., "Loading...")
};

DataMap.defaultProps = {
    message: null,
};

export default DataMap;
