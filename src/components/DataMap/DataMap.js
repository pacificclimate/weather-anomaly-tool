// DataMap: Component that displays a map with data.
//
// Currently, we're accepting data in the output format from the monthly Anomaly Data Service endpoints
// /baseline and /monthly. That may be refactored as we progress.
//
// For prop definitions, see comments in BCMap.propTypes.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import PropTypes from 'prop-types';
import { Checkbox, FormControl, ControlLabel } from 'react-bootstrap';

import { LayerGroup, LayersControl, GridLayer } from 'react-leaflet';
import L from 'leaflet';

import _ from 'lodash';

import { bindFunctions, pick } from '../utils';
import BCMap from '../BCMap';
import StationPopup from '../StationPopup';
import RadioButtonSelector from '../RadioButtonSelector';
import './DataMap.css';

function now() {
    return (new Date()).getSeconds();
}

const datasetToDataValueName = {'anomaly': 'anomaly', 'monthly': 'statistic', 'baseline': 'datum'};

const stationCircleMarkerOptions = {
    color: '#000000',
    radius: 1,
    weight: 1,
    fillOpacity: 1,
};

const dataCircleMarkerOptions = {
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
}

class DataMap extends Component {
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
        bindFunctions(this, 'handleRefMap handleRefBaselineLayerGroup handleRefMonthlyLayerGroup handleRefDataLayerGroup handleRefFaderLayer');
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

        const dataValueName = datasetToDataValueName[this.props.dataset];
        const dataMin = stations.reduce((acc, stn) => Math.min(acc, stn[dataValueName]), Infinity);
        const dataMax = stations.reduce((acc, stn) => Math.max(acc, stn[dataValueName]), -Infinity);
        const dataAbsMax = Math.max(Math.abs(dataMin), Math.abs(dataMax));
        console.log('####', dataMin, dataMax, dataAbsMax);

        const coloursForClass =
            coloursForClassAndDatasetAndVariable[this.props.dataset] &&
            coloursForClassAndDatasetAndVariable[this.props.dataset][this.props.variable];

        const colorForVariable = colorsForVariable[this.props.variable];

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

        function colour(value) {
            if (coloursForClass) {
                return coloursForClass[valueClass(value)];
            } else {
                return colorForVariable;
            }
        }

        const markers = stations.map((station) =>
            L.circleMarker(
                {lng: station.lon, lat: station.lat},
                {...markerOptions, color: colour(station[dataValueName])}
            ).bindPopup(
                ReactDOMServer.renderToStaticMarkup(<StationPopup variable={this.props.variable} {...station}/>)
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
            const monthlyByStationDbId = _.groupBy(this.props.monthly, 'station_db_id');
            stations = [];
            this.props.baseline.forEach(baselineStation => {
               const monthlyStation = monthlyByStationDbId[baselineStation.station_db_id];
               if (monthlyStation) {
                   const anomaly = monthlyStation[0].statistic - baselineStation.datum;
                   stations.push({
                       ...pick(baselineStation, 'station_name lat lon elevation'),
                       anomaly,
                   });
               }
            });
        } else {
            stations = this.props[this.props.dataset];
        }

        this.addStationDataMarkers(stations, this.dataLayerGroup, dataCircleMarkerOptions);
    }

    dataChanged(props) {
        const dataPropnames = 'dataset baseline monthly';
        // TODO: Replace with a more efficient comparison
        return !_.isEqual(pick(props, dataPropnames), pick(this.props, dataPropnames));
    }

    messageChanged(props) {
        return props.message !== this.props.message;
    }

    createMessageControl() {
        console.log('DataMap.createMessageControl')
        const messageControl = this.messageControl = L.control();

        messageControl.onAdd = map => {
            console.log('DataMap.messageControl.onAdd', this);
            this._div = L.DomUtil.create('div', 'DataMap-message leaflet-control-layers');
            messageControl.update();
            return this._div;
        };

        messageControl.update = message => {
            this._div.innerHTML = message;
        };

        messageControl.addTo(this.map);
    }

    updateMessageControl(message) {
        if (message) {
            console.log('DataMap.updateMessageControl: adding')
            this.messageControl.addTo(this.map);
            this.messageControl.update(message);
        } else {
            console.log('DataMap.updateMessageControl: removing')
            this.messageControl.remove();
        }
    }

    createFaderControl() {
        const faderControl = this.faderControl = L.control();

        faderControl.onAdd = map => {
            this.container = L.DomUtil.create('div', 'DataMap-message leaflet-control-layers');
            ReactDOM.render(
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
                </label>,
                this.container);
            return this.container;
        };

        faderControl.addTo(this.map);
    }

    componentWillReceiveProps(nextProps) {
        console.log('DataMap.componentWillReceiveProps', nextProps);
    }

    componentDidMount() {
        console.log('DataMap.componentDidMount', this.props);
        this.createMessageControl();
        this.createFaderControl();
    }

    componentDidUpdate(prevProps) {
        console.log('DataMap.componentDidUpdate', this.props);
        if (this.dataChanged(prevProps)) {
            this.removeAllStationMarkers();
            this.addAllStationMarkers();
        }
        if (this.messageChanged(prevProps)) {
            this.updateMessageControl(this.props.message);
        }
    }

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
