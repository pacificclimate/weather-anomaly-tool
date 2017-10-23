import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pick } from '../utils';
import ScrollingSelector from '../ScrollingSelector';
import './MonthSelector.css';

class MonthSelector extends Component {
    render() {
        const monthNames = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
        const months = monthNames.map((name, i) => ({value: i+1, label: name}));
        return (
            <ScrollingSelector
                name="month"
                options={months}
                {...pick(this.props, 'height value onChange')}
            />
        )
    }
}

MonthSelector.propTypes = {
    height: PropTypes.number,
    start: PropTypes.number,
    end: PropTypes.number,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};

MonthSelector.defaultProps = {
    height: 12,
};


export default MonthSelector;
