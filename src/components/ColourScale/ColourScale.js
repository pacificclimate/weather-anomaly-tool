import React from 'react';
import zip from 'lodash/fp/zip';

import { VariableLabel } from '../VariableSelector';
import {
  colorsForVariable, variableToThresholds, variableToColors
} from '../DataMap/stationColor';

import './ColourScale.css';


export default function ColourScale({ variable, dataset }) {
  if (dataset === 'monthly' || dataset === 'baseline') {
    return (
      <span style={{ backgroundColor: colorsForVariable[variable]}}>
        <VariableLabel variable={variable}/> {dataset}: All stations are represented by this colour
      </span>
    );
  }
  const thresholds = variableToThresholds[variable];
  const colors = variableToColors[variable];
  const numItems = thresholds.length;
  const width= 100 / numItems;
  return (
    <div className="mx-1 my-1" >
      <div><VariableLabel variable={variable}/> {dataset}</div>
      <div
        style={{
          width: '100%',
        }}
      >
        {
          zip(thresholds, colors).map(([t, c]) => (
            <span
              className="pe-1 d-inline-block text-end"
              style={{
                backgroundColor: c,
                opacity: 0.75,
                height: "1em",
                width: `${width}%`
              }}
            >
              &nbsp;
            </span>
          ))
        }
      </div>
      <div
        style={{ width: '100%'}}
      >
        {
          thresholds.map(t => (
            <span
              style={{
                fontSize: "80%",
                height: "1em",
                width: `${width}%`,
                marginTop: 0,
                marginBottom:0
              }}
              className="p-0 d-inline-block"
            >
              <span
                style={{
                  position: "relative",
                  bottom: "50%",
                  left: "50%"
                }}
              >
                {t === Infinity ? '∞' : t}
              </span>
            </span>
          ))
        }
      </div>
    </div>

  );
}
