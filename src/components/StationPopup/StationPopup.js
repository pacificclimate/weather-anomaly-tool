import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StationPopup.css';

class StationPopup extends Component {
    render() {
        return (
            <div className="StationPopup">
                <div className="name">{this.props.station_name}</div>
                <div className="lon-lat">
                    <span  className="lon">{this.props.lon}</span>
                    <span className="lat">{this.props.lat}</span>
                </div>
                <div className="elevation">{this.props.elevation}</div>
                {this.props.datum && <div>Baseline datum: {this.props.datum}</div>}
                {this.props.statistic && <div>Monthly statistic: {this.props.statistic}</div>}
                {this.props.data_coverage && <div>Data coverage: {this.props.data_coverage}</div>}
                {this.props.anomaly && <div>Anomaly: {this.props.anomaly}</div>}
            </div>
        );
    }
}

StationPopup.propTypes = {
    station_name: PropTypes.string,
    lat: PropTypes.number,
    lon: PropTypes.number,
    elevation: PropTypes.number,
    datum: PropTypes.number,            // Baseline
    statistic: PropTypes.number,        // Monthly
    data_coverage: PropTypes.number,    // Monthly
    anomaly: PropTypes.number,          // Anomaly
};

export default StationPopup;
