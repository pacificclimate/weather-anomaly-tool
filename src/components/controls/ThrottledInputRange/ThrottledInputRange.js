import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';

import './ThrottledInputRange.css';

function ThrottledInputRange({ value, onChange, ...rest }) {
  const [intermediateValue, setIntermediateValue] = useState(value);

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
