import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-bootstrap';
import keys from 'lodash/fp/keys';

import { useConfigContext } from '@/components/main/ConfigContext';
import RadioButtonSelector from '@/components/controls/RadioButtonSelector';
import VariableLabel from '@/components/variables/VariableLabel';


function VariableSelector(props) {
  const config = useConfigContext();
  const variableKeys = keys(config?.variables);
  const variableOptions = variableKeys.map(
    value => ({ value, label: <VariableLabel variable={value}/> })
  );
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
