import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Map, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'proj4';
import 'proj4leaflet';
import 'leaflet/dist/leaflet.css'
import './MapController.css';

class MapController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 55.0,
            lng: -125,
            zoom: 1,
        };

        // Items for a BC Albers map. Put in separate component?
        this.initialCenter = _.pick(this.state, 'lat', 'lng');

        const maxRes = 7812.5;
        this.resolutions = [];
        for (let i = 0; i < 12; i += 1) {
            this.resolutions.push(maxRes / Math.pow(2, i));
        }
        // const bounds = L.bounds(L.point(-1000000, -1000000), L.point(3000000, 3000000));
        this.crs = new L.Proj.CRS(
            'EPSG:3005',
            '+proj=aea +lat_1=50 +lat_2=58.5 +lat_0=45 +lon_0=-126 +x_0=1000000 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
            {
                resolutions: this.resolutions,
                // bounds,
            }
        );
    }

    render() {
        return (
            <div>
                <div>
                    Data: {this.props.variable};{this.props.year}-{this.props.month}&nbsp;
                    Position: ({this.state.lng}, {this.state.lat})&nbsp;
                    Zoom: {this.state.zoom}&nbsp;
                    &nbsp;
                </div>
                <Map
                    crs={this.crs}
                    center={this.initialCenter}
                    zoom={this.state.zoom}
                    minZoom={0}
                    maxZoom={12}
                    // maxBounds={L.latLngBounds([[45, -148], [62, -108]])}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url={process.env.REACT_APP_TILECACHE_URL + '/1.0.0/bc_osm/{z}/{x}/{y}.png'}
                        subdomains={'abc'}
                        noWrap={true}
                        maxZoom={12}
                    />
                </Map>
            </div>
        );
    }
}

Map.propTypes = {
    variable: PropTypes.string,
    year: PropTypes.number,
    month: PropTypes.number,
};

export default MapController;
