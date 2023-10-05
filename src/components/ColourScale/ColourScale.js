import React from 'react';
import { zip } from 'lodash/array';

import {
  colorsForVariable, variableToThresholds, variableToColors
} from '../DataMap/stationColor';
import './ColourScale.css';


export default function ColourScale({
  variable,
  dataset,
  boundaryLabel = (threshold, i, thresholds) =>
    threshold === Infinity ? '∞' : threshold,
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
        zip(thresholds, colors).map(([t, c]) => (
          // Colour block with label centred below right edge
          <span
            className="pe-1 d-inline-block"
            style={{
              backgroundColor: c,
              opacity,
              height: "1em",
              width: `${width}%`
            }}
          >
            <span style={{
              fontSize: "80%",
              position: 'relative',
              left: '55%',
              top: '90%'
            }}>
              {boundaryLabel(t)}
            </span>
            &nbsp;
          </span>
        ))
      }
    </div>
  );
}
