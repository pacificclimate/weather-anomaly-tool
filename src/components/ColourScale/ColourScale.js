import React from 'react';
import { zip } from 'lodash/array';

import {
  colorsForVariable, variableToThresholds, variableToColors
} from '../DataMap/stationColor';
import './ColourScale.css';


export default function ColourScale({
  variable,
  dataset,
  boundaryLabel = (variable, dataset, threshold, i, thresholds) => {
    const isAnomaly = dataset === 'anomaly';
    const isRelative = variable === 'precip' && isAnomaly;
    return threshold.toLocaleString(
      undefined,
      {
        signDisplay: isAnomaly ? "always" : "negative",
        style: isRelative ? "percent" : "decimal",
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 3,
      }
    );
  },
}) {
  const opacity = 0.75;

  if (dataset === 'monthly' || dataset === 'baseline') {
    const color = colorsForVariable[variable];
    return (
      <div className="mb-2">
        All stations are represented by this colour:
        <div
          className="ms-2 d-inline-block"
          style={{
            height: "1em",
            width: "1em",
            borderRadius: "50%",
            backgroundColor: color,
            opacity,
            position: "relative",
            top: "0.2em",
        }}
        >
          &nbsp;
        </div>
      </div>
    );
  }

  const thresholds = variableToThresholds[variable];
  const colors = variableToColors[variable];
  const numItems = thresholds.length;
  const width= 100 / numItems;
  return (
    <div className="w-100 px-5 pt-1 pb-4" >
      {
        zip(thresholds, colors).map(([t, c], i, [ts, cs]) => (
          // Colour block with label centred below right edge
          <span
            className="pe-1 d-inline-block position-relative"
            style={{
              backgroundColor: c,
              opacity,
              height: "1em",
              width: `${width}%`,
              // borderLeft: i === thresholds.length - 1 ? "3px solid white" : "none"
            }}
          >
            <span
              className="w-100 position-absolute top-50 start-50 translate-middle"
              style={{ fontSize: "80%" }}
            >
              {i === thresholds.length - 1 && "(error)"}
            </span>
            <span
              className="w-100 position-absolute top-100"
              style={{ fontSize: "80%", left: '50%' }}
            >
              {boundaryLabel(variable, dataset, t, i, ts)}
            </span>
            &nbsp;
          </span>
        ))
      }
    </div>
  );
}
