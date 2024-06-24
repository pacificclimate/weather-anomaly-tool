// Control for selecting a year (integer value).
// Current presentation: a slider.

import React from "react";
import SingleValueSlider from "@/components/controls/SingleValueSlider";

function YearSelector(props) {
  return <SingleValueSlider ticks={{ count: 5 }} {...props} />;
}

export default YearSelector;
