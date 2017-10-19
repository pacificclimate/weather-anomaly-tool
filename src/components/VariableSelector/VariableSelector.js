import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VariableSelector.css';

import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class VariableSelector extends Component {
    render() {
        return (
            <div>
                <ToggleButtonGroup
                    vertical type="radio" name="variable"
                    defaultValue={this.props.defaultValue}
                    onChange={this.props.onChange}
                >
                    <ToggleButton value={'precip'}>Precipitation</ToggleButton>
                    <ToggleButton value={'tmax'}>Maximum Temperature</ToggleButton>
                    <ToggleButton value={'tmin'}>Minimum Temperature</ToggleButton>
                </ToggleButtonGroup>
            </div>
        )
    }
}

VariableSelector.propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
};

export default VariableSelector;
