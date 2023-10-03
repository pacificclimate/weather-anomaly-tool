import keys from 'lodash/fp/keys';
import React from 'react';

export const unitsForVariable = {
  'precip': 'mm/mon',
  'tmin': 'C',
  'tmax': 'C',
};


export const decimalPlacesForVariable = {
  'precip': 1,
  'tmin': 2,
  'tmax': 2,
};


export const variableLabels = {
  precip: 'Precipitation',
  tmin: <span>T<sub>min</sub></span>,
  tmax: <span>T<sub>max</sub></span>,
};

export const variableKeys = keys(variableLabels);


