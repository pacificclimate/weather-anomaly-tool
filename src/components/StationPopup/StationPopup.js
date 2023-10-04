import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet'

import {
  decimalPlacesForVariable,
  unitsForVariable
} from '../../utils/variables';
import './StationPopup.css';


export default function StationPopup({
  variable,
  dataset,
  station: {
    station_name,
    lon,
    lat,
    elevation,
    datum,
    statistic,
    data_coverage,
    anomaly,
    departure,
  },
}) {
    const units = unitsForVariable[variable];
    const decimalPlaces = decimalPlacesForVariable[variable];

    // Convenience function for number formatting. Uses Number.toLocaleString;
    // supplies common options; provides fixed-precision option.
    function fmt(num, { fixedFractionDigits, ...restOptions }) {
      return num.toLocaleString(
        undefined,
        {
          signDisplay: dataset === 'anomaly' ? "always" : "negative",
          minimumFractionDigits: fixedFractionDigits,
          maximumFractionDigits: fixedFractionDigits,
          ...restOptions,
        }
      );
    }

  return (
      <Popup className="StationPopup">
        <div>
          <div className="name">{station_name}</div>
          <div className="lon-lat">
            <span className="lon">{lon}</span>
            <span className="lat">{lat}</span>
          </div>
          <div className="elevation">{elevation}</div>
          {datum &&
          <div>Baseline datum: {fmt(datum, { fixedFractionDigits: 0 })} {units}</div>}
          {statistic && <div>Monthly
            statistic: {fmt(statistic, { fixedFractionDigits: 1 })} {units}</div>}
          {data_coverage && <div>Data
            coverage: {fmt(data_coverage, { style: "percent", fixedFractionDigits: 0 })}</div>}
          {anomaly &&
          <div>Anomaly: {fmt(anomaly, { fixedFractionDigits: decimalPlaces })} {units}</div>}
          {variable === 'precip' && departure &&
          <div>
            Departure: {fmt(departure, { style: "percent", fixedFractionDigits: 0 })}
          </div>}
        </div>
      </Popup>
    );
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
  departure: PropTypes.number,         // Anomaly
  variable: PropTypes.string,
  dataset: PropTypes.string,
};
