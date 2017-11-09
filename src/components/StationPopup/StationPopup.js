import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet'
import './StationPopup.css';

const unitsForVariable = {
    'precip': 'mm/mon',
    'tmin': 'C',
    'tmax': 'C',
};
const decimalPlacesForVariable = {
    'precip': 1,
    'tmin': 2,
    'tmax': 2,
};

class StationPopup extends Component {
    render() {
        const units = unitsForVariable[this.props.variable];
        const decimalPlaces = decimalPlacesForVariable[this.props.variable];
        return (
            <Popup className="StationPopup">
                <div>
                    <div className="name">{this.props.station_name}</div>
                    <div className="lon-lat">
                        <span  className="lon">{this.props.lon}</span>
                        <span className="lat">{this.props.lat}</span>
                    </div>
                    <div className="elevation">{this.props.elevation}</div>
                    {this.props.datum && <div>Baseline datum: {this.props.datum.toFixed(0)} {units}</div>}
                    {this.props.statistic && <div>Monthly statistic: {this.props.statistic.toFixed(1)} {units}</div>}
                    {this.props.data_coverage && <div>Data coverage: {(this.props.data_coverage * 100).toFixed(0)}%</div>}
                    {this.props.anomaly && <div>Anomaly: {this.props.anomaly.toFixed(decimalPlaces)} {units}</div>}
                </div>
            </Popup>
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
    variable: PropTypes.string,
};

export default StationPopup;
