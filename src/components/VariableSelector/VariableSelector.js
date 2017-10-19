import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './VariableSelector.css';

import { ToggleButtonGroup, ToggleButton, Glyphicon, Tooltip } from 'react-bootstrap';

class VariableSelector extends Component {
    render() {
        return (
            <div>
                <ToggleButtonGroup
                    vertical type="radio" name="variable"
                    defaultValue={this.props.defaultValue}
                    onChange={this.props.onChange}
                >
                    <ToggleButton value={'precip'}>
                        <Glyphicon glyph="cloud"/> Precipitation
                    </ToggleButton>
                    <ToggleButton value={'tmin'}>
                        <Glyphicon glyph="arrow-down"/> T<sub>min</sub>
                    </ToggleButton>
                    <ToggleButton value={'tmax'}>
                        <Glyphicon glyph="arrow-up"/> T<sub>max</sub>
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
        );
    }
}

VariableSelector.propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
};

VariableSelector.tooltips = {
    precip: <Tooltip id="precip">Monthly total precipitation</Tooltip>,
    tmin: <Tooltip id="tmin">Monthly average of daily minimum temperature</Tooltip>,
    tmax: <Tooltip id="tmax">Monthly average of daily maximum temperature</Tooltip>,
};

export default VariableSelector;
