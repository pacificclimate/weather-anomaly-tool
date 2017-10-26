import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';

import { pick } from '../utils';

import './YearSelector.css';


class YearSelector extends Component {
    render() {
        return (
            <InputRange
                className={this.props.className}
                minValue={1970}
                maxValue={2018}
                {...pick(this.props, 'value onChange')}
            />
        );
    }
}

YearSelector.propTypes = {
    height: PropTypes.number,
    // Height of selector, in number of option items
    start: PropTypes.number,
    // Start year
    end: PropTypes.number,
    // End year
    value: PropTypes.number,
    // Current value (year)
    onChange: PropTypes.func.isRequired,
};

YearSelector.defaultProps = {
    height: 12,
};


export default YearSelector;
