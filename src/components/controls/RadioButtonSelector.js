// RadioButtonSelector - a component that provides a selector as group of
// (radio) buttons.

// TODO: Add prop for option item height?
// TODO: Use inline styles only?

import React from "react";
import PropTypes from "prop-types";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import classNames from "classnames";

function RadioButtonSelector({
  options,
  name,
  disabled = false,
  className,
  value,
  onChange,
  styling: {
    buttons: { variant, ...bsRest },
  },
}) {
  return (
    <ToggleButtonGroup
      className={classNames("RadioButtonSelector", className)}
      type="radio"
      name={name}
      disabled={disabled}
      value={value}
      onChange={onChange}
      {...bsRest}
    >
      {options.map((option, i) => (
        // Note: prop `id` is essential; omit => onChange callback fails.
        <ToggleButton
          variant={variant}
          className={classNames("RadioButtonSelector-button", className)}
          disabled={disabled}
          id={`${name}-btn-${i}`}
          key={option.value}
          value={option.value}
        >
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

RadioButtonSelector.propTypes = {
  disabled: PropTypes.bool,
  // Is control disabled
  name: PropTypes.string.isRequired,
  // An HTML <input> name for each child button
  options: PropTypes.array.isRequired,
  // Array of selector options, specified by objects with keys `value`,
  // `label`.
  // `value` is the value taken by the option; `label` is the displayed name of
  // the option.
  value: PropTypes.any,
  // Default value for selector.
  onChange: PropTypes.func.isRequired,
  // Callback called when selection changes.
};

export default RadioButtonSelector;
