import _ from 'lodash';

import logger from '../../logger';


function dataValueName(variable, dataset) {
    if (dataset === 'anomaly') {
        return variable === 'precip' ? 'departure' : 'anomaly';
    } else if (dataset === 'monthly') {
        return 'statistic';
    } else if (dataset === 'baseline') {
        return 'datum';
    }
}

const colorsForVariable = {
    'precip': '#36ff32',
    'tmin': '#3388ff',
    'tmax': '#ff6831',

};

const temperatureThresholds = [
    -4.5, -3.5, -2.5, -1.5, -0.5, 0.5, 1.5, 2.5, 3.5, 4.5, +Infinity
];

const temperatureColors = [
    '#053061', '#2166ac', '#4393c3', '#92c5de', '#d1e5f0', '#f7f7f7', '#fddbc7', '#f4a582', '#d6604d', '#b2182b', '#67001f'
];

const precipThresholds = [
    // arithmetic progression up to interval around zero; geometric after that with roughly 400 as the extreme
    -87.5, -62.5, -37.5, -12.5, 12.5 * Math.pow(3,0), 12.5 * Math.pow(3,1), 12.5 * Math.pow(3,2), 12.5 * Math.pow(3,3), +Infinity
];

const precipColors = [
    '#8c510a','#bf812d','#dfc27d','#f6e8c3','#f5f5f5','#c7eae5','#80cdc1','#35978f','#01665e'
];

const variableToThresholds = {
    'precip': precipThresholds,
    'tmax': temperatureThresholds,
    'tmin': temperatureThresholds,
};

const variableToColors = {
    'precip': precipColors,
    'tmax': temperatureColors,
    'tmin': temperatureColors,
};


function value_to_color(value, thresholds, colors) {
    logger.assert(thresholds.length === colors.length, 'Incompatible lengths for thresholds and colors');
    const k = _.findIndex(thresholds, threshold => value < threshold);
    return colors[k]
}


function color(variable, dataset, station) {
    // Return a color code for the marker for station.
    if (dataset === 'anomaly') {
        const value = station[dataValueName(variable, dataset)];
        return value_to_color(value, variableToThresholds[variable], variableToColors[variable]);
    } else {
        return colorsForVariable[variable];
    }

}

export default color;