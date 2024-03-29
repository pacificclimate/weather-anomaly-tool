// IncrementDecrement: Component that provides a control for incrementing or
// decrementing a value.
//
// Clicking on "-" button (decrement) button causes callback to be called with
// negative `by` value;
// clicking on "+" button (increment), with positive `by`.
//
// Increment/decrement amount can be a single fixed number, or can be selected
// by dropdown control from an array of numbers, according to the type of
// property `by`.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import classNames from 'classnames';


function IncrementDecrement({
  id,
  bys,
  defaultBy = 1,
  onIncrement,
  disabled = false,
  className,
  styling: { buttons: { variant, ...rest } },
}) {
  const [by, setBy] = useState(defaultBy | bys?.[0]);
  const handleChangeBy = e => setBy(+e.target.value);

  const handleDecrement = () => onIncrement(-by);
  const handleIncrement = () => onIncrement(by);

  const selector = Array.isArray(bys) &&  (
    <Form.Select
      size="sm"
      style={{ width: "0.5em" }}
      title={"Select increment"}
      disabled={disabled}
      onChange={handleChangeBy}
    >
      {bys.map(by => (<option key={by}>{by}</option>))}
    </Form.Select>
  );

  return (
    <ButtonGroup
      id={id}
      className={classNames('IncrementDecrement', className)}
      {...rest}
    >
      <Button
        variant={variant}
        disabled={disabled}
        onClick={handleDecrement}
      >
        -{by}
      </Button>
      {selector}
      <Button
        variant={variant}
        disabled={disabled}
        onClick={handleIncrement}
      >
        +{by}
      </Button>
    </ButtonGroup>
  );
}

IncrementDecrement.propTypes = {
  disabled: PropTypes.bool,
  // Is control disabled
  by: PropTypes.arrayOf(PropTypes.number),
  // Determines the value with which the callback is called. If an array of
  // numbers is provided, a dropdown selector allows the user to select an
  // increment value from the array. If a single number is provided, there is
  // no dropdown selector and this is the increment value.
  onIncrement: PropTypes.func.isRequired,
  // Callback called with either `-by` (decrement) or `+by` (increment),
  // where `by` is the currently chosen increment value.
};

export default IncrementDecrement;
