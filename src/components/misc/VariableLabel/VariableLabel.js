import React from 'react';
import { variableLabels } from '../../../utils/variables';

export default function VariableLabel({ variable }) {
  return variableLabels[variable] || `${variable}`;
}
