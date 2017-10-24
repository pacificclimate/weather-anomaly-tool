// BCMap: Component that establishes a map of B.C., and nothing more.
//
// Parent components are are responsible for adding markers and other decorations as needed. A ref callback
// prop is provided for this purpose.
//
// For prop definitions, see comments in BCMap.propTypes.

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Map, TileLayer, LayersControl } from 'react-leaflet';
import L from 'leaflet';

import 'proj4';
import 'proj4leaflet';
import 'leaflet/dist/leaflet.css';
import './BCMap.css';

class BCMap extends Component {
    constructor(props) {
        super(props);

        const maxRes = 7812.5;
        this.resolutions = [];
        for (let i = 0; i < 12; i += 1) {
            this.resolutions.push(maxRes / Math.pow(2, i));
        }
        this.crs = new L.Proj.CRS(
            'EPSG:3005',
            '+proj=aea +lat_1=50 +lat_2=58.5 +lat_0=45 +lon_0=-126 +x_0=1000000 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs',
            {
                resolutions: this.resolutions,

                // TODO: Remove when it becomes obvious these have no point ... i.e., soon
                // bounds: L.bounds(L.point(35043.6538, 440006.8768), L.point(1885895.3117, 1735643.8497)); // from http://spatialreference.org/ref/epsg/nad83-bc-albers/ x, y
                // bounds: L.bounds(L.point(440006.8768, 35043.6538), L.point(1735643.8497, 1885895.3117)); // from http://spatialreference.org/ref/epsg/nad83-bc-albers/ y, x
                // bounds: L.bounds(L.point(-139.0500, 48.3000), L.point(-114.0300, 60.0000)); // from http://spatialreference.org/ref/epsg/nad83-bc-albers/ x, y (lon-lat)
                // bounds: L.bounds(L.point(48.3000, -139.0500), L.point(60.0000, -114.0300)); // from http://spatialreference.org/ref/epsg/nad83-bc-albers/ y, x (lat lon)
                // bounds: L.bounds(L.point(-3816000.49, -609246.88), L.point(2368556.22, 4942147.44)); // from https://epsg.io/3005 x, y
                // bounds: L.bounds(L.point(-609246.88, -3816000.49), L.point(4942147.44, 2368556.22)); // from https://epsg.io/3005 y, x

                // If we don't set the origin correctly, then the projection transforms BC Albers coordinates to lat-lng
                // coordinates incorrectly. You have to know the magic origin value.
                //
                // It is also probably important to know that the bc_osm tile set is a TMS tile set, which has axes
                // transposed with respect to Leaflet axes. The proj4leaflet documentation incorrectly states that
                // there is a CRS constructor `L.Proj.CRS.TMS` for TMS tilesets. It is absent in the recent version
                // (1.0.2) we are using. It exists in proj4leaflet ver 0.7.1 (in use in CE), and shows that the
                // correct value for the origin option is `[bounds[0], bounds[3]]`, where `bounds` is the 3rd argument
                // of the TMS constructor. These values are defined for us in Climate Explorer's version of this map.
                // W00t.
                origin: [-1000000, 3000000],
            }
        );
    }

    render() {
        const center = _.pick(BCMap.initial, 'lat', 'lng');
        return (
            <Map
                crs={this.crs}
                center={center}
                zoom={BCMap.initial.zoom}
                minZoom={0}   // ?
                maxZoom={12}  // ? There are only 12 zoom levels defined
                ref={this.props.mapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url={process.env.REACT_APP_TILECACHE_URL + '/1.0.0/bc_osm/{z}/{x}/{y}.png'}
                    subdomains={'abc'}
                    noWrap={true}
                    maxZoom={12}
                />
                {this.props.children}
            </Map>
        );
    }
}

BCMap.propTypes = {
    mapRef: PropTypes.func,
    // Callback to which a ref to the Map component is passed. Allows parent components to diddle with the
    // map established here (e.g., add markers).
};

BCMap.defaultProps = {
    mapRef: (() => null),
};

BCMap.initial = {
    lat: 55.0,
    lng: -125,
    zoom: 2,
};

export default BCMap;
