import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './YearSelector.css';

import ScrollingSelector from '../ScrollingSelector';

class YearSelector extends Component {
    render() {
        let years = []
        for (var  year = 1970; year < 2020; year += 1) {
            years.push({value: year, label: year});
        }
        return (
            <ScrollingSelector
                name="year"
                options={years}
                defaultValue={this.props.defaultValue}
                onChange={this.props.onChange}
            />
        )
    }
}

YearSelector.propTypes = {
    defaultValue: PropTypes.number,
    onChange: PropTypes.func.isRequired,
}

export default YearSelector;
