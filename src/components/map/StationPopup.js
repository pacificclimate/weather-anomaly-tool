import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet'

import VariableLabel from '@/components/variables/VariableLabel';
import VariableUnits from '@/components/variables/VariableUnits';
import { useConfigContext } from '@/components/main/ConfigContext';


export default function StationPopup({
  variable,
  dataset,
  station: {
    network_name,
    station_name,
    station_native_id,
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
  const config = useConfigContext();
  const units = <VariableUnits variable={variable}/>;
  const decimalPlaces = config?.variables?.[variable]?.decimalPlaces;

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
    <Popup className="StationPopup" pane="popupPane">
      <div className="fw-bold border-bottom py-1">{station_name}</div>

      <div className="border-bottom py-1">
        <div>Network: {network_name}</div>
        <div>Native ID: {station_native_id}</div>
        <div>
          Location: <span>{lon.toFixed(3)} °E</span>, <span>{lat.toFixed(3)} °N</span>
        </div>
        <div>Elevation: {elevation} m</div>
      </div>

      <div className="border-bottom py-1">
        <div className="fst-italic"><VariableLabel variable={variable}/></div>
        {anomaly &&
          <div>Anomaly: {fmt(anomaly, { fixedFractionDigits: decimalPlaces })} {units}</div>}
        {datum &&
          <div>Baseline: {fmt(datum, { fixedFractionDigits: 0 })} {units}</div>}
        {statistic &&
          <div>Monthly statistic: {fmt(statistic, { fixedFractionDigits: 1 })} {units}</div>}
        {data_coverage &&
          <div>Data coverage: {fmt(data_coverage, { style: "percent", fixedFractionDigits: 0 })}</div>}
        {variable === 'precip' && departure &&
          <div>Departure: {fmt(departure, { style: "percent", fixedFractionDigits: 0 })}</div>}
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
