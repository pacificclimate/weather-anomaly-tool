import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './YearSelector.css';

import ScrollingSelector from '../ScrollingSelector';

class YearSelector extends Component {
    render() {
        let years = []
        for (var  year = this.props.start; year < this.props.end + 1; year += 1) {
            years.push({value: year, label: year});
        }
        return (
            <ScrollingSelector
                height={this.props.height}
                name="year"
                options={years}
                defaultValue={this.props.defaultValue}
                onChange={this.props.onChange}
            />
        )
    }
}

YearSelector.propTypes = {
    height: PropTypes.number,
    start: PropTypes.number,
    end: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

YearSelector.defaultProps = {
    height: 12,
};


export default YearSelector;
