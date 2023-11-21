import React from 'react';
import ThrottledInputRange from '../ThrottledInputRange';
import { useStore } from '../../../state-store';

const monthNames = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
const formatLabel = value => monthNames[value];

function MonthSelector(props) {
  const date = useStore(state => state.date);
  const setMonth = useStore(state => state.setMonth);
  const isDataLoading = useStore(state => state.isDataLoading);

  return (
    <ThrottledInputRange
      minValue={0}
      maxValue={11}
      formatLabel={formatLabel}
      disabled={isDataLoading()}
      value={date.month()}
      onChange={setMonth}
      {...props}
    />
  );
}

export default MonthSelector;
