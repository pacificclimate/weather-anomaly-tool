import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Map.css';

class Map extends Component {
    render() {
        return (
            <div>
                <div>Map</div>
                <div>{this.props.variable}</div>
            </div>
        )
    }
}

Map.propTypes = {
    variable: PropTypes.string,
}

export default Map;
