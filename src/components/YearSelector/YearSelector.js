import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';

import { bindFunctions } from '../utils';

import './YearSelector.css';


class YearSelector extends Component {
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
                value={this.state.value}
                onChange={this.handleChange}
                onChangeComplete={this.props.onChange}
            />
        );
    }
}

YearSelector.propTypes = {
    start: PropTypes.number,
    // Start year
    end: PropTypes.number,
    // End year
    value: PropTypes.number,
    // Current value (year)
    onChange: PropTypes.func.isRequired,
    // Called with value when dragging complete (no intermediate values)
};

YearSelector.defaultProps = {
    start: 1970,
    end: 2018,
};


export default YearSelector;
