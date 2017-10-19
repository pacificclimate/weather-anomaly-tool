import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MonthSelector.css';

import ScrollingSelector from '../ScrollingSelector';

class MonthSelector extends Component {
    render() {
        const monthNames = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
        const months = monthNames.map((name, i) => ({value: i+1, label: name}));
        return (
            <ScrollingSelector
                height={this.props.height}
                name="month"
                options={months}
                defaultValue={this.props.defaultValue}
                onChange={this.props.onChange}
            />
        )
    }
}

MonthSelector.propTypes = {
    height: PropTypes.number,
    start: PropTypes.number,
    end: PropTypes.number,
    defaultValue: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

MonthSelector.defaultProps = {
    height: 12,
};


export default MonthSelector;
