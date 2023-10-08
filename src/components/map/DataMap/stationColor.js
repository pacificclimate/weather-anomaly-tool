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


function valueToColourScaleItem(value, colourScale){
  const k = _.findIndex(colourScale, item => value < item.threshold);
  return colourScale[k];
}


export function stationColor(variable, dataset, station, colourScales){
  // Return a color code for the marker for station.
  // TODO: fold this up into fn getDataValue
  const value = station[dataValueName(variable, dataset)];
  // TODO: This uses too much knowledge about config structure.
  //  Pass in just the relevant colourScale
  const colourScale = colourScales[variable][dataset];
  // TODO: Super ugly; refactor
  const colourScaleItem = valueToColourScaleItem(value, colourScale);
  return {
    fillColor: colourScaleItem.color,
    opacity: colourScaleItem.opacity,
  };
}
