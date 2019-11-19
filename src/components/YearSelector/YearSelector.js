// TODO: YearSelector and MonthSelector are nearly identical. Use a HOC for them both.

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';

import { bindFunctions, pick } from '../utils';

import './YearSelector.css';


class YearSelector extends PureComponent {
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

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }

    render() {
        return (
            <InputRange
                {...pick(this.props, 'className disabled')}
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
    disabled: PropTypes.bool,
    // Is control disabled
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
    disabled: false,
    start: 1970,
    end: 2019,
    //The default property for the year selector needs to dynamically track 
    //the current year so that the tool appears up-to-date. Current deployment 
    //shows 2018 as the max year. Using the +- increment/decrement buttons allows
    //one to select 2019, but this is HIGHLY unintuitive.
};


export default YearSelector;
