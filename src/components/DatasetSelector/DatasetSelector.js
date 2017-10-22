import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-bootstrap';
import { pick } from '../utils';
import RadioButtonSelector from '../RadioButtonSelector';
import './DatasetSelector.css';


class DatasetSelector extends Component {
    render() {
        const datasets = [
            { value: 'baseline', label: 'Baseline', },
            { value: 'monthly', label: 'Monthly', },
            { value: 'anomaly', label: 'Anomaly', },
        ];
        return (
            <RadioButtonSelector
                name="dataset"
                options={datasets}
                {...pick(this.props, 'defaultValue onChange')}
            />
        );
    }
}

DatasetSelector.propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
};

export default DatasetSelector;
