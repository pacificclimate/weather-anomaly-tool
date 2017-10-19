import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import './MapController.css';

class MapController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 51.505,
            lng: -0.09,
            zoom: 13,
        };
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div>
                <div>
                    {this.props.variable};{this.props.year}-{this.props.month}
                </div>
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                        </Popup>
                    </Marker>
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
