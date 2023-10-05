import React from 'react';
import compact from 'lodash/fp/compact';
import VariableLabel from '../VariableLabel';
import { unitsForVariable } from '../../utils/variables';

export default function VariableTitle({
  variable, dataset, withAnnotation = true, withUnits = true
}) {
  const isRelative = variable === 'precip' && dataset === 'anomaly';
  const suffixes = compact([
    withAnnotation && isRelative && 'relative',
    withUnits && (isRelative ? '%' : unitsForVariable[variable]),
  ]);
  const suffix = suffixes.length > 0 ? `(${suffixes.join('; ')})` : null;
  return (
    <><VariableLabel variable={variable}/> {dataset} {suffix}</>
  )
}
