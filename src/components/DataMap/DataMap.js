import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BCMap from '../BCMap';
import './DataMap.css';

class DataMap extends Component {
    render() {
        return (
            <BCMap/>
        )
    }
}

DataMap.propTypes = {
    baseline: PropTypes.array.isRequired,
    weather: PropTypes.array.isRequired,
};

export default DataMap;
