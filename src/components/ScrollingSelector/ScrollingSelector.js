import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ScrollingSelector.css';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

class ScrollingSelector extends Component {
    render() {
        const toggleButtons = this.props.options.map((option) => (
            <ToggleButton
                className="ScrollingSelector-button"
                key={option.value} value={option.value}
            >
                {option.label}
            </ToggleButton>
        ));
        return (
            <ToggleButtonGroup
                className="ScrollingSelector"
                style={{height: `${(this.props.height * 1.43).toString()}em`}}
                vertical type="radio" name={this.props.name}
                defaultValue={this.props.defaultValue}
                onChange={this.props.onChange}
            >
                {toggleButtons}
            </ToggleButtonGroup>
        )
    }
}

ScrollingSelector.propTypes = {
    height: PropTypes.number,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func.isRequired,
};

ScrollingSelector.defaultProps = {
    height: 10,
};

export default ScrollingSelector;
