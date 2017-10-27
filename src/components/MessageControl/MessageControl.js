import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import { MapControl } from 'react-leaflet';
import L from 'leaflet';

import './MessageControl.css';

class MessageControl extends MapControl {
    createLeafletElement(props) {
        const leafletElement = L.control();

        leafletElement.onAdd = map => {
            this.container = L.DomUtil.create('div', 'MessageControl leaflet-control');
             ReactDom.render(props.children, this.container);
            return this.container;
        };

        return leafletElement;
    }

    updateLeafletElement (fromProps, toProps) {
        if (fromProps.children !== toProps.children) {
            ReactDom.render(toProps.children, this.container);
        }
    }
}

MessageControl.propTypes = {
    message: PropTypes.string,
};

export default MessageControl;
