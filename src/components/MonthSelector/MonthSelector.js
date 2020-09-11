// TODO: YearSelector and MonthSelector are nearly identical. Use a HOC for them both.

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';

import { bindFunctions, pick } from '../utils';

import './MonthSelector.css';

const monthNames = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');

class MonthSelector extends PureComponent {
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

    formatLabel = value => monthNames[value - this.props.start];

    render() {
        return (
            <InputRange
                {...pick(this.props, 'className disabled')}
                minValue={this.props.start}
                maxValue={this.props.end}
                formatLabel={this.formatLabel}
                value={this.state.value}
                onChange={this.handleChange}
                onChangeComplete={this.props.onChange}
            />
        )
    }
}

MonthSelector.propTypes = {
    disabled: PropTypes.bool,
    // Is control disabled
    start: PropTypes.number,
    // Start month
    end: PropTypes.number,
    // End month
    value: PropTypes.number,
    // Current value (month)
    onChange: PropTypes.func.isRequired,
    // Called with value when dragging complete (no intermediate values)
};

MonthSelector.defaultProps = {
    disabled: false,
    start: 0,
    end: 11,
};


export default MonthSelector;
