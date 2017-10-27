import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';

import { pick } from '../utils';

import './MonthSelector.css';

class MonthSelector extends Component {
    render() {
        const monthNames = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
        return (
            <InputRange
                className={this.props.className}
                minValue={1}
                maxValue={12}
                formatLabel={value => monthNames[value-1]}
                {...pick(this.props, 'value onChange')}
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
