import React from 'react';
import compact from 'lodash/fp/compact';
import VariableLabel from '../VariableLabel';
import { unitsForVariable } from '../../utils/variables';

export default function VariableTitle({
  variable, dataset, withAnnotation = true, withUnits = true
}) {
  const isAnomaly = dataset === 'anomaly';
  const isRelative = variable === 'precip' && isAnomaly;
  const suffixes = compact([
    withAnnotation && isAnomaly && 'relative to baseline',
    withUnits && (isRelative ? '%' : unitsForVariable[variable]),
  ]);
  const suffix = suffixes.length > 0 ? `(${suffixes.join('; ')})` : null;
  return (
    <><VariableLabel variable={variable}/> {dataset} {suffix}</>
  )
}
