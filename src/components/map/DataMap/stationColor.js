import _ from 'lodash';


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

function valueToColourScaleItem(value, colourScale) {
  return _.find(colourScale, item => value < item.threshold);
}


export function stationColor(variable, dataset, station, colourScales){
  // Return a color code for the marker for station.
  const value = station[dataValueName(variable, dataset)];
  const colourScale = colourScales[variable][dataset];
  return {
    fillColor: valueToColourScaleItem(value, colourScale).color,
  };
}
