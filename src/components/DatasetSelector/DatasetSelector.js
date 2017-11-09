import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { pick } from '../utils';
import RadioButtonSelector from '../RadioButtonSelector';
import './DatasetSelector.css';


const datasets = [
    { value: 'anomaly', label: 'Anomaly', },
    { value: 'monthly', label: 'Monthly', },
    { value: 'baseline', label: 'Baseline', },
];

class DatasetSelector extends PureComponent {
    render() {
        return (
            <RadioButtonSelector
                className={this.props.className}
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
