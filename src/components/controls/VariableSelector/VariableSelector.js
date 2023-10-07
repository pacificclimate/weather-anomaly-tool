import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-bootstrap';

import RadioButtonSelector from '../RadioButtonSelector';
import VariableLabel from '../../misc/VariableLabel';
import { variableKeys } from '../../../utils/variables';
import './VariableSelector.css';


const variableOptions = variableKeys.map(
  value => ({ value, label: <VariableLabel variable={value}/> })
);

function VariableSelector(props) {
  return (
    <RadioButtonSelector options={variableOptions} name="variable" {...props} />
  );
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
  tmin: <Tooltip id="tmin">Monthly average of daily minimum
    temperature</Tooltip>,
  tmax: <Tooltip id="tmax">Monthly average of daily maximum
    temperature</Tooltip>,
};

export default VariableSelector;
