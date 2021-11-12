// RadioButtonSelector - a component that provides a selector as group of
// (radio) buttons.

// TODO: Add prop for option item height?
// TODO: Use inline styles only?

import React from 'react';
import PropTypes from 'prop-types';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import classNames from 'classnames';
import './RadioButtonSelector.css';

function RadioButtonSelector({ options, name, disabled, className, ...rest }) {
  return (
    <ToggleButtonGroup
      className={classNames('RadioButtonSelector', className)}
      type="radio"
      name={name}
      disabled={disabled}
      {...rest}
    >
      {options.map((option, i) => (
        // Note: prop `id` is essential; omit => onChange callback fails.
        <ToggleButton
          className={classNames('RadioButtonSelector-button', className)}
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

RadioButtonSelector.defaultProps = {
  disabled: false,
};

export default RadioButtonSelector;
