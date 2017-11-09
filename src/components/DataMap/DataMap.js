// DataMap: Component that displays a map with data.
//
// Currently, we're accepting data in the output format from the monthly Anomaly Data Service endpoints
// /baseline and /monthly. That may be refactored as we progress.
//
// For prop definitions, see comments in BCMap.propTypes.

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Checkbox, FormControl, ControlLabel } from 'react-bootstrap';

import { LayerGroup, LayersControl, GridLayer, CircleMarker } from 'react-leaflet';
import L from 'leaflet';

import _ from 'lodash';

import { bindFunctions, pick } from '../utils';
import BCMap from '../BCMap';
import StaticControl from '../StaticControl';
import StationPopup from '../StationPopup';
import RadioButtonSelector from '../RadioButtonSelector';
import './DataMap.css';

const datasetToDataValueName = {'anomaly': 'anomaly', 'monthly': 'statistic', 'baseline': 'datum'};

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

const colorsForVariable = {
    'precip': '#36ff32',
    'tmin': '#3388ff',
    'tmax': '#ff6831',

};

const coloursForClassAndDatasetAndVariable = {
    'anomaly': {
        'precip': [ '#8c510a','#d8b365','#f6e8c3','#f5f5f5','#c7eae5','#5ab4ac','#01665e' ],
        'tmin': [ '#4575b4', '#91bfdb', '#e0f3f8', '#ffffbf', '#fee090', '#fc8d59', '#d73027' ],
        'tmax': [ '#4575b4', '#91bfdb', '#e0f3f8', '#ffffbf', '#fee090', '#fc8d59', '#d73027' ],
    },
    // Omit monthly and baseline for now. Defaults to simple one colour scheme above.
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
    // Return a set of markers (<CircleMarker/>) for the data for each station in `props.station`.

    const dataValueName = datasetToDataValueName[dataset];
    const dataMin = stations.reduce((acc, stn) => Math.min(acc, stn[dataValueName]), Infinity);
    const dataMax = stations.reduce((acc, stn) => Math.max(acc, stn[dataValueName]), -Infinity);
    const dataAbsMax = Math.max(Math.abs(dataMin), Math.abs(dataMax));

    const coloursForClass =
        coloursForClassAndDatasetAndVariable[dataset] &&
        coloursForClassAndDatasetAndVariable[dataset][variable];

    const colorForVariable = colorsForVariable[variable];

    function valueClass(value) {
        // 7 classes
        return (
            value < -0.75 * dataAbsMax ?    0 :
            value < -0.50 * dataAbsMax ?    1 :
            value < -0.25 * dataAbsMax ?    2 :
            value <  0.00 * dataAbsMax ?    3 :
            value <  0.25 * dataAbsMax ?    4 :
            value <  0.50 * dataAbsMax ?    5 :
            value <  0.75 * dataAbsMax ?    6 :
                                            7
        );
    }

    function color(station) {
        const value = station[dataValueName];
        if (coloursForClass) {
            return coloursForClass[valueClass(value)];
        } else {
            return colorForVariable;
        }
    }

    return stations.map(station =>
        <CircleMarker
            key={uniqueKey(station)}
            center={{lng: station.lon, lat: station.lat}}
            {...dataMarkerOptions}
            color={color(station)}
        >
            <StationPopup variable={variable} {...station}/>
        </CircleMarker>
    );
}

class DataMap extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showFaderControls: false,
            fader: {
                color: '#777777',
                opacity: 0.5,
            }
        };

        this.baselineMarkers = [];  // Necessary?

        // Bind event handlers
        bindFunctions(this, 'handleRefMap handleRefFaderLayer');
    }

    // TODO: Remove?
    handleRefMap(component) {
        this.map = component.leafletElement;
    }

    handleRefFaderLayer(component) {
        this.faderLayer = component.leafletElement;
        this.faderLayer.createTile = () => {
            const tile = document.createElement('div');
            tile.style.background = this.state.fader.color;
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

    // TODO: Remove
    // componentDidUpdate(prevProps) {
    //     console.log('DataMap.componentDidUpdate', this.props);
    //     if (this.dataChanged(prevProps)) {
    //         this.removeAllStationMarkers();
    //         this.addAllStationMarkers();
    //     }
    //     if (this.messageChanged(prevProps)) {
    //         this.updateMessageControl(this.props.message);
    //     }
    // }

    render() {
        return (
            <div>
                {this.state.showFaderControls &&
                <div>
                    <ControlLabel>Base map fader:</ControlLabel>{' '}
                    <ControlLabel>Opacity </ControlLabel>{' '}
                    <FormControl
                        style={{width: '20%', display: 'inline'}}
                        type={'range'}
                        min={0} max={1} step={0.05}
                        value={this.state.fader.opacity}
                        onChange={e => {
                            this.setState({
                                fader: {...this.state.fader, opacity: e.target.value}
                            });
                        }}
                    />
                    <span style={{width: '6em', display: 'inline-block', textAlign: 'left'}}>
                        ({this.state.fader.opacity})
                    </span>
                    <ControlLabel>Color </ControlLabel>{' '}
                    <RadioButtonSelector
                        name={'fader-color'}
                        options={[
                            { label: 'Black', value: 'black' },
                            { label: 'Grey', value: '#777777' },
                            { label: 'White', value: 'white' },
                        ]}
                        value={this.state.fader.color}
                        onChange={value => {
                            this.setState(
                                {fader: {...this.state.fader, color: value,}},
                                () => { this.faderLayer.redraw(); }
                            );

                        }}
                    />
                </div>}

                <BCMap mapRef={this.handleRefMap}>
                    <LayersControl position='topright'>
                        <LayersControl.Overlay name='Fader' checked>
                            <GridLayer ref={this.handleRefFaderLayer} opacity={this.state.fader.opacity}/>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay name='Baseline stations'>
                            <LayerGroup>
                                <StationLocationMarkers stations={this.props.baseline}/>
                            </LayerGroup>
                        </LayersControl.Overlay>
                        <LayersControl.Overlay name='Monthly stations' checked>
                            <LayerGroup>
                                <StationLocationMarkers stations={this.props.monthly}/>
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
                    {this.props.message && <StaticControl position='topright'>{this.props.message}</StaticControl>}
                    <StaticControl>
                        <label>
                            <Checkbox
                                value={this.state.showFaderControls}
                                onChange={e => {
                                    console.log('####', e.target.checked);
                                    this.setState({showFaderControls: e.target.checked});
                                }}
                            >
                                Basemap fader controls
                            </Checkbox>
                        </label>
                    </StaticControl>
                </BCMap>

            </div>
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
