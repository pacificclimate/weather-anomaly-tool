import React from 'react';
import IncrementDecrement from '../../controls/IncrementDecrement';
import { useStore } from '../../../state-store';

export default function YearIncrementDecrement(props) {
  const config = useStore(state => state.config);
  const incrementYear = useStore(state => state.incrementYear);
  const isDataLoading = useStore(state => state.isDataLoading());

  return (
    <IncrementDecrement
      id="year-increment-decrement"
      disabled={isDataLoading}
      defaultBy={config.ui.monthIncrementDecrement.defaultBy}
      bys={config.ui.monthIncrementDecrement.by}
      onIncrement={incrementYear}
      styling={config.ui.monthIncrementDecrement.styling}
    />

  )
}