import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';

import { bindFunctions, pick } from '../utils';

import './MonthSelector.css';

const monthNames = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
const formatLabel = value => monthNames[value-1];

class MonthSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
        bindFunctions(this, 'handleChange');
    }

    handleChange(value) {
        this.setState({value})
    }

    render() {
        return (
            <InputRange
                className={this.props.className}
                minValue={this.props.start}
                maxValue={this.props.end}
                formatLabel={formatLabel}
                value={this.state.value}
                onChange={this.handleChange}
                onChangeComplete={this.props.onChange}
            />
        )
    }
}

MonthSelector.propTypes = {
    start: PropTypes.number,
    // Start month
    end: PropTypes.number,
    // End month
    value: PropTypes.number,
    // Current value (year)
    onChange: PropTypes.func.isRequired,
    // Called with value when dragging complete (no intermediate values)
};

MonthSelector.defaultProps = {
    start: 1,
    end: 12,
};


export default MonthSelector;
