import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ScrollingSelector.css';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class ScrollingSelector extends Component {
    render() {
        const toggleButtons = this.props.options.map((option) => (
            <ToggleButton value={option.value}>{option.label}</ToggleButton>
        ))
        return (
            <div>
                <ToggleButtonGroup
                    vertical type="radio" name={this.props.name}
                    defaultValue={this.props.defaultValue}
                    onChange={this.props.onChange}
                >
                    {toggleButtons}
                </ToggleButtonGroup>

            </div>
        )
    }
}

ScrollingSelector.propTypes = {
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};

export default ScrollingSelector;
