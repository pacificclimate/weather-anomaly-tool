import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            zoom: 10,
        };
    }

    render() {
        console.log(L);
        const position = [this.state.lat, this.state.lng];
        const maxRes = 7812.5;
        let resolutions = [];
        for (let i = 0; i < 12; i += 1) {
            resolutions.push(maxRes / Math.pow(2, i));
        }
        console.log(resolutions)
        const crs = new L.Proj.CRS(
            'EPSG:3005',
            '+proj=aea +lat_1=50 +lat_2=58.5 +lat_0=45 +lon_0=-126 +x_0=1000000 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
            { resolutions: resolutions }
        );
        return (
            <div>
                <div>
                    {this.props.variable};{this.props.year}-{this.props.month}
                </div>
                <Map
                    crs={crs}
                    center={position}
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
};

export default MapController;
