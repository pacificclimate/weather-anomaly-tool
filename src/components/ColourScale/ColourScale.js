import React from 'react';
import zip from 'lodash/fp/zip';

import { VariableLabel } from '../VariableSelector';
import { unitsForVariable } from '../../utils/variables';
import {
  colorsForVariable, variableToThresholds, variableToColors
} from '../DataMap/stationColor';
import './ColourScale.css';


export default function ColourScale({ variable, dataset }) {
  const units = unitsForVariable[variable];
  const opacity = 0.75;

  if (dataset === 'monthly' || dataset === 'baseline') {
    const color = colorsForVariable[variable];
    return (
      <div className="mx-1 my-1">
        <div><VariableLabel variable={variable}/> {dataset} ({units})</div>
        <div>
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
      </div>
    );
  }

  const thresholds = variableToThresholds[variable];
  const colors = variableToColors[variable];
  const numItems = thresholds.length;
  const width= 100 / numItems;
  return (
    <div className="mx-1 mt-1" >
      <div className="mb-1">
        <VariableLabel variable={variable}/> {dataset} ({units})
      </div>
      <div className="w-100">
        {
          colors.map(c => (
            <span
              className="pe-1 d-inline-block"
              style={{
                backgroundColor: c,
                opacity,
                height: "1em",
                width: `${width}%`
              }}
            >
              &nbsp;
            </span>
          ))
        }
      </div>
      <div className="w-100">
        {
          thresholds.map(t => (
            <span
              style={{
                fontSize: "80%",
                height: "1em",
                width: `${width}%`,
              }}
              className="p-0 d-inline-block"
            >
              <span
                style={{
                  position: "relative",
                  bottom: "60%",
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
