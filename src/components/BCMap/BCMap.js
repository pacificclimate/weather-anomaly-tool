import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOMServer from 'react-dom/server';
import _ from 'lodash';
import { Map, TileLayer, ScaleControl } from 'react-leaflet';
import { Marker, Popup, Circle, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'proj4';
import 'proj4leaflet';
import 'leaflet/dist/leaflet.css';
import './BCMap.css';

class BCMap extends Component {
    constructor(props) {
        super(props);

        // Bind event handlers
        const handlerNames = 'handleMapRef'.split(/\s+/);
        handlerNames.map((name) => {
            this[name] = this[name].bind(this);
        });

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

    componentDidMount() {
        // Icon markers (L.marker) don't work in this environment. I think it is because Webpack isn't including the
        // image files that are needed. Certainly the GETs for those images fail. But circle markers work.
        // let marker = L.marker(this.map.getCenter());
        const marker = L.circleMarker(this.map.getCenter());
        marker.addTo(this.map)
            // Since it's pretty likely we'll want to build the station popups from a React component,
            // this demonstrates how to do it for a simple React element.
            .bindPopup(
                ReactDOMServer.renderToStaticMarkup(<span>Test popup</span>)
            );
    }

    handleMapRef(component) {
        this.map = component.leafletElement;
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
                ref={this.handleMapRef}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url={process.env.REACT_APP_TILECACHE_URL + '/1.0.0/bc_osm/{z}/{x}/{y}.png'}
                    subdomains={'abc'}
                    noWrap={true}
                    maxZoom={12}
                />
                <ScaleControl/>
            </Map>
        );
    }
}

BCMap.propTypes = {

};

BCMap.initial = {
    lat: 55.0,
    lng: -125,
    zoom: 2,
};

export default BCMap;
