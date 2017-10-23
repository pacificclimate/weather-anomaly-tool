import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pick } from '../utils';
import RadioButtonSelector from '../RadioButtonSelector';
import './DatasetSelector.css';


class DatasetSelector extends Component {
    render() {
        const datasets = [
            { value: 'anomaly', label: 'Anomaly', },
            { value: 'monthly', label: 'Monthly', },
            { value: 'baseline', label: 'Baseline', },
        ];
        return (
            <RadioButtonSelector
                name="dataset"
                options={datasets}
                {...pick(this.props, 'value onChange')}
            />
        );
    }
}

DatasetSelector.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default DatasetSelector;
