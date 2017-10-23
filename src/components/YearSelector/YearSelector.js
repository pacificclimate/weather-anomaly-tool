import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pick } from '../utils';
import ScrollingSelector from '../ScrollingSelector';
import './YearSelector.css';


class YearSelector extends Component {
    render() {
        let years = [];
        for (let  year = this.props.start; year < this.props.end + 1; year += 1) {
            years.push({value: year, label: year});
        }
        return (
            <ScrollingSelector
                name="year"
                options={years}
                {...pick(this.props, 'height value onChange')}
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
