import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-bootstrap';
import keys from 'lodash/fp/keys';

import RadioButtonSelector from '../RadioButtonSelector';
import VariableLabel from '../../variables/VariableLabel';
import { useStore } from '../../../state-store';


function VariableSelector(props) {
  const config = useStore(state => state.config);

  // TODO: Memoize variableOptions
  const variableKeys = keys(config?.variables);
  const variableOptions = variableKeys.map(
    value => ({ value, label: <VariableLabel variable={value}/> })
  );

  const variable = useStore(state => state.variable);
  const setVariable = useStore(state => state.setVariable);
  const isDataLoading = useStore(state => state.isDataLoading());

  return (
    <RadioButtonSelector
      options={variableOptions}
      name="variable"
      disabled={isDataLoading}
      value={variable}
      onChange={setVariable}
      styling={config.ui.variableSelector.styling}
      {...props}
    />
  );
}

VariableSelector.tooltips = {
  precip: <Tooltip id="precip">Monthly total precipitation</Tooltip>,
  tmin: <Tooltip id="tmin">Monthly average of daily minimum
    temperature</Tooltip>,
  tmax: <Tooltip id="tmax">Monthly average of daily maximum
    temperature</Tooltip>,
};

export default VariableSelector;
