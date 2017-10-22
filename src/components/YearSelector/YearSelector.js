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
                {...pick(this.props, 'height defaultValue onChange')}
            />
        );
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
