import React from 'react';
import PropTypes from 'prop-types';

import RadioButtonSelector from '../RadioButtonSelector';
import './DatasetSelector.css';


const datasets = [
    { value: 'anomaly', label: 'Anomaly', },
    { value: 'monthly', label: 'Monthly', },
    { value: 'baseline', label: 'Baseline', },
];

function DatasetSelector(props) {
    return (
        <RadioButtonSelector name="dataset" options={datasets} {...props}/>
    );
}

DatasetSelector.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default DatasetSelector;
