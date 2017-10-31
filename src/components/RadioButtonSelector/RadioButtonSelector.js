// RadioButtonSelector - a component that provides a selector as a vertical scrollable list of (radio) buttons.
//
// For prop definitions, see RadioButtonSelector.propTypes

// TODO: Add props.style and pass thru to ToggleButtonGroup
// TODO: Add prop for option item height?
// TODO: (as called for) Make vertical a prop
// TODO: Use inline styles only

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import classNames from 'classnames';
import { pick } from '../utils';
import './RadioButtonSelector.css';

class RadioButtonSelector extends Component {
    render() {
        const toggleButtons = this.props.options.map((option) => (
            <ToggleButton
                className={classNames('RadioButtonSelector-button', this.props.className)}
                disabled={this.props.disabled}
                key={option.value}
                value={option.value}
            >
                {option.label}
            </ToggleButton>
        ));
        return (
            <ToggleButtonGroup
                className={classNames('RadioButtonSelector', this.props.className)}
                vertical
                type="radio"
                {...pick(this.props, 'style name value onChange')}
                ref={(component) => { this.toggleButtonGroup = component; }}
            >
                {toggleButtons}
            </ToggleButtonGroup>
        );
    }
}

RadioButtonSelector.propTypes = {
    disabled: PropTypes.boolean,
    // Is control disabled
    name: PropTypes.string.isRequired,
    // An HTML <input> name for each child button
    options: PropTypes.array.isRequired,
    // Array of selector options, specified by objects with keys `value`, `label`.
    // `value` is the value taken by the option; `label` is the displayed name of the option.
    value: PropTypes.any,
    // Default value for selector.
    onChange: PropTypes.func.isRequired,
    // Callback called when selection changes.
};

RadioButtonSelector.defaultProps = {
    disabled: false,
};

export default RadioButtonSelector;
