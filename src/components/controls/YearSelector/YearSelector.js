import React from 'react';
import ThrottledInputRange from '../ThrottledInputRange';
import { latestPossibleDataDate, useStore } from '../../../state-store';

function YearSelector(props) {
  const date = useStore(state => state.date);
  const setYear = useStore(state => state.setYear);
  const isDataLoading = useStore(state => state.isDataLoading);

  return (
    <ThrottledInputRange
      disabled={isDataLoading}
      minValue={1970}
      maxValue={latestPossibleDataDate.year()}
      value={date.year()}
      onChange={setYear}
      {...props}
    />
  );
}

export default YearSelector;
