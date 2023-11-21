import React from 'react';
import IncrementDecrement from '../../controls/IncrementDecrement';
import { useStore } from '../../../state-store';

export default function MonthIncrementDecrement(props) {
  const config = useStore(state => state.config);
  const incrementMonth = useStore(state => state.incrementMonth);
  const isDataLoading = useStore(state => state.isDataLoading());

  return (
    <IncrementDecrement
      id="month-increment-decrement"
      disabled={isDataLoading}
      defaultBy={config.ui.monthIncrementDecrement.defaultBy}
      bys={config.ui.monthIncrementDecrement.by}
      onIncrement={incrementMonth}
      styling={config.ui.monthIncrementDecrement.styling}
    />

  )
}