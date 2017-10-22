import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StationPopup.css';

class StationPopup extends Component {
    render() {
        return (
            <div>
                <div>Name: {this.props.station_name}</div>
                <div>Lat: {this.props.lat} Lon: {this.props.lon}</div>
                <div>Elevation: {this.props.elevation}</div>
                {this.props.datum && <div>Datum: {this.props.datum}</div>}
                {this.props.statistic && <div>Statistic: {this.props.statistic}</div>}
                {this.props.data_coverage && <div>Data coverage: {this.props.data_coverage}</div>}
            </div>
        );
    }
}

StationPopup.propTypes = {
    height: PropTypes.number,
    start: PropTypes.number,
    end: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

StationPopup.defaultProps = {
    height: 12,
};

export default StationPopup;
