import React from 'react';
import SingleValueSlider from '../SingleValueSlider';

function YearSelector(props) {
  return (
    <SingleValueSlider ticks={{ count: 5 }} {...props} />
  );
}

export default YearSelector;
