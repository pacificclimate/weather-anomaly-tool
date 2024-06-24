// Control for selecting a "month" value, an integer between 0 and 11.
// Current presentation: a slider.

import React from 'react';
import SingleValueSlider from '@/components/controls/SingleValueSlider';

const monthNames = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
const formatLabel = ({value}) => monthNames[value];

function MonthSelector(props) {
  return (
    <SingleValueSlider
      minValue={0}
      maxValue={11}
      formatLabel={formatLabel}
      ticks={{ values: [0, 3, 6, 9] }}
      {...props}
    />
  );
}

export default MonthSelector;
