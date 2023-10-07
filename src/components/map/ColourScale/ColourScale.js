import React from 'react';

import {
  colorsForVariable,
  variableToColourScale
} from '../DataMap/stationColor';
import './ColourScale.css';


export default function ColourScale({
  variable,
  dataset,
  boundaryLabel = (variable, dataset, csItem, i, colourScale) => {
    const isAnomaly = dataset === 'anomaly';
    const isRelative = variable === 'precip' && isAnomaly;
    return csItem.threshold.toLocaleString(
      undefined,
      {
        signDisplay: isAnomaly ? "always" : "negative",
        style: isRelative ? "percent" : "decimal",
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 3,
      }
    );
  },
  annotation = (variable, dataset, csItem, i, colourScale) => {
    return csItem.annotation;
  },
}) {
  const opacity = 0.8;

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

  const colourScale = variableToColourScale[variable];
  const numItems = colourScale.length;
  const width= 100 / numItems;
  return (
    <div className="w-100 px-5 pt-1 pb-4" >
      {
        colourScale.map((item, i, cs) => (
          // Colour block with
          // - annotation centred within it
          // - label below and centred on its right edge
          <span
            className="pe-1 d-inline-block position-relative"
            style={{
              backgroundColor: item.color,
              opacity,
              height: "1em",
              width: `${width}%`,
              ...item.blockStyle,
            }}
          >
            <span
              className="w-100 position-absolute top-50 start-50 translate-middle"
              style={{ fontSize: "80%", ...item.annotationStyle }}
            >
              {annotation(variable, dataset, item, i, cs)}
            </span>
            <span
              className="w-100 position-absolute top-100"
              style={{ fontSize: "80%", left: '50%', ...item.labelStyle }}
            >
              {boundaryLabel(variable, dataset, item, i, cs)}
            </span>
            &nbsp;
          </span>
        ))
      }
    </div>
  );
}
