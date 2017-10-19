// ScrollingSelector - a component that provides a selector as a vertical scrollable list of (radio) buttons.
//
// For prop definitions, see ScrollingSelector.propTypes

// TODO: Add props.style and pass thru to ToggleButtonGroup
// TODO: Add prop for option item height?
// TODO: (as called for) Make vertical a prop
// TODO: Use inline styles only

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {findIndex} from 'lodash';
import './ScrollingSelector.css';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

const optionItemHeightEms = 1.43;

class ScrollingSelector extends Component {
    componentDidMount() {
        // Scroll container to location of `defaultValue` option.
        const defaultIndex = findIndex(this.props.options, {value: this.props.defaultValue});
        const node = ReactDOM.findDOMNode(this.toggleButtonGroup);
        const optionItemHeight = node.children[0].offsetHeight;
        node.scrollTop = (defaultIndex - this.props.height/2) * optionItemHeight;
    }

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
                style={{height: `${(this.props.height * optionItemHeightEms).toString()}em`}}
                vertical type="radio" name={this.props.name}
                defaultValue={this.props.defaultValue}
                onChange={this.props.onChange}
                ref={(component) => { this.toggleButtonGroup = component; }}
            >
                {toggleButtons}
            </ToggleButtonGroup>
        )
    }
}

ScrollingSelector.propTypes = {
    height: PropTypes.number,
    // Height of scrolling list, measured in number of option items
    name: PropTypes.string.isRequired,
    // An HTML <input> name for each child button
    options: PropTypes.array.isRequired,
    // Array of selector options, specified by objects with keys `value`, `label`.
    // `value` is the value taken by the option; `label` is the displayed name of the option.
    defaultValue: PropTypes.any,
    // Default value for selector.
    onChange: PropTypes.func.isRequired,
    // Callback called when selection changes.
};

ScrollingSelector.defaultProps = {
    height: 10,
};

export default ScrollingSelector;
