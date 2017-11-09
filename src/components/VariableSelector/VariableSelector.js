import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-bootstrap';

import { pick } from '../utils';
import RadioButtonSelector from '../RadioButtonSelector';
import './VariableSelector.css';


const variables = [
    { value: 'precip', label: 'Precipitation', },
    { value: 'tmin', label: <span>T<sub>min</sub></span>, },
    { value: 'tmax', label: <span>T<sub>max</sub></span>, },
];

class VariableSelector extends PureComponent {
    render() {
        return (
            <RadioButtonSelector
                {...pick(this.props, 'className disabled value onChange')}
                name="variable"
                options={variables}
            />
            // <div>
            //     <ToggleButtonGroup
            //         vertical type="radio" name="variable"
            //         defaultValue={this.props.defaultValue}
            //         onChange={this.props.onChange}
            //     >
            //         <ToggleButton value={'precip'}>
            //             <Glyphicon glyph="cloud"/> Precipitation
            //         </ToggleButton>
            //         <ToggleButton value={'tmin'}>
            //             <Glyphicon glyph="arrow-down"/> T<sub>min</sub>
            //         </ToggleButton>
            //         <ToggleButton value={'tmax'}>
            //             <Glyphicon glyph="arrow-up"/> T<sub>max</sub>
            //         </ToggleButton>
            //     </ToggleButtonGroup>
            // </div>
        );
    }
}

VariableSelector.propTypes = {
    disabled: PropTypes.bool,
    // Is control disabled
    value: PropTypes.string,
    // Current value of control
    onChange: PropTypes.func,
    // Callback when new option selected
};

VariableSelector.tooltips = {
    precip: <Tooltip id="precip">Monthly total precipitation</Tooltip>,
    tmin: <Tooltip id="tmin">Monthly average of daily minimum temperature</Tooltip>,
    tmax: <Tooltip id="tmax">Monthly average of daily maximum temperature</Tooltip>,
};

export default VariableSelector;
