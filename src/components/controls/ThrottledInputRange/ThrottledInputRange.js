import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';


function ThrottledInputRange({ value, onChange, ...rest }) {
  const [intermediateValue, setIntermediateValue] = useState(value);

  // TODO: This is probably better as useMemo.
  // Update intermediate value whenever external value changes.
  useEffect(() => {
    setIntermediateValue(value);
  }, [value]);

  return (
    <InputRange
      value={intermediateValue}
      onChange={setIntermediateValue}
      onChangeComplete={onChange}
      {...rest}
    />
  );
}

ThrottledInputRange.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default ThrottledInputRange;
