import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MapControl } from 'react-leaflet';
import L from 'leaflet';

import './MessageControl.css';

class MessageControl extends MapControl {
    createLeafletElement(props) {
        const leafletElement = L.control();

        leafletElement.onAdd = map => {
            this.container = L.DomUtil.create('div', 'leaflet-control-layers');
            this.container.innerHTML = props.message;
            return this.container;
        };

        return leafletElement;
    }

    updateLeafletElement (fromProps, toProps) {
        this.container.innerHTML = toProps.message;
    }
}

MessageControl.propTypes = {
    message: PropTypes.string,
};

export default MessageControl;
