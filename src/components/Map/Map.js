import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Map.css';

class Map extends Component {
    render() {
        return (
            <div>
                <div>Map</div>
                <div>Variable: {this.props.variable}</div>
                <div>Year: {this.props.year}</div>
                <div>Month: {this.props.month}</div>
            </div>
        )
    }
}

Map.propTypes = {
    variable: PropTypes.string,
    year: PropTypes.number,
};

export default Map;
