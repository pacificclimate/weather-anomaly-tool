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
                    <ToggleButton value={'precip'}><span className="glyphicon glyphicon-cloud"></span> Precipitation</ToggleButton>
                    <ToggleButton value={'tmin'}><span className="glyphicon glyphicon-arrow-down"></span> Minimum Temperature</ToggleButton>
                    <ToggleButton value={'tmax'}><span className="glyphicon glyphicon-arrow-up"></span> Maximum Temperature</ToggleButton>
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
