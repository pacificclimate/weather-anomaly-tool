import _ from 'lodash';

import logger from '../../logger';


// TODO: Move into utils
function dataValueName(variable, dataset){
  if (dataset === 'anomaly'){
    return variable === 'precip' ? 'departure' : 'anomaly';
  } else if (dataset === 'monthly'){
    return 'statistic';
  } else if (dataset === 'baseline'){
    return 'datum';
  }
}


// Colours for non-colour-scaled displays
export const colorsForVariable ={
  'precip': '#36ff32',
  'tmin': '#3388ff',
  'tmax': '#ff6831',
};


const temperatureColourScale = [
  { 
    threshold: -4.5,
    color: '#053061',
    annotation: "frigid",
    annotationStyle: { color: "white" },
  },
  { 
    threshold: -3.5,
    color: '#2166ac',
  },
  { 
    threshold: -2.5,
    color: '#4393c3',
  },
  { 
    threshold: -1.5,
    color: '#92c5de',
  },
  { 
    threshold: -0.5,
    color: '#d1e5f0',
  },
  { 
    threshold: 0.5,
    color: '#f7f7f7',
  },
  { 
    threshold: 1.5,
    color: '#fddbc7',
  },
  { 
    threshold: 2.5,
    color: '#f4a582',
  },
  { 
    threshold: 3.5,
    color: '#d6604d',
  },
  { 
    threshold: 4.5,
    color: '#b2182b',
  },
  { 
    threshold: +Infinity,
    color: '#67001f',
    annotation: "toasty",
    annotationStyle: { color: "white" },
  },
];

const precipColourScale = [
  {
    threshold: -0.875,
    color: '#8c510a',
  },
  {
    threshold: -0.625,
    color: '#bf812d',
  },
  {
    threshold: -0.375,
    color: '#dfc27d',
  },
  {
    threshold: -0.125,
    color: '#f6e8c3',
  },
  {
    threshold: 0.125 * Math.pow(3, 0),
    color: '#f5f5f5',
  },
  {
    threshold: 0.125 * Math.pow(3, 1),
    color: '#c7eae5',
  },
  {
    threshold: 0.125 * Math.pow(3, 2),
    color: '#80cdc1',
  },
  {
    threshold: 0.125 * Math.pow(3, 3),
    color: '#35978f',
  },
  {
    threshold: 10,
    color: '#01665e',
  },
  {
    threshold: +Infinity,
    color: '#ce1111',
    blockStyle: {
      borderLeft: "3px solid white",
      borderRight: "3px solid white",
      borderRadius: "1em",
    },
    annotation: "erroneous",
    annotationStyle: { color: "white" },
  },
];

export const variableToColourScale = {
  'precip': precipColourScale,
  'tmax': temperatureColourScale,
  'tmin': temperatureColourScale,
};


function value_to_color(value, colourScale){
  const k = _.findIndex(colourScale, item => value < item.threshold);
  return colourScale[k].color;
}


export function stationColor(variable, dataset, station){
  // Return a color code for the marker for station.
  if (dataset === 'anomaly'){
    const value = station[dataValueName(variable, dataset)];
    return value_to_color(
      value, variableToColourScale[variable]
    );
  }
  return colorsForVariable[variable];
}
