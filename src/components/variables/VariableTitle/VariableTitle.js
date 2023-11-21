// Variable title: Long-form description of variable for titling displays of
// data. It is generic, meaning it does not subscribe to the state store, but
// accepts arbitrary inputs for these values.

import React from 'react';
import compact from 'lodash/fp/compact';
import flow from 'lodash/fp/flow';
import { alternate } from '../../utils';

import VariableLabel from '../VariableLabel';
import VariableUnits from '../VariableUnits';
import DatasetLabel from '../../datasets/DatasetLabel';


export default function VariableTitle({
  variable, dataset, withAnnotation = true, withUnits = true
}) {
  const isAnomaly = dataset === 'anomaly';
  const isRelative = variable === 'precip' && isAnomaly;
  const suffixes = flow(
    compact,
    alternate("; ")
  )([
    withAnnotation && isAnomaly && 'relative to baseline',
    withUnits && (isRelative ? '%' : <VariableUnits variable={variable}/>),
  ]);
  return (
    <>
      <VariableLabel variable={variable}/> {' '}
      <DatasetLabel dataset={dataset}/> {' '}
      {suffixes.length > 0 && (<>({suffixes})</>)}
    </>
  )
}
