// ScrollingSelector - a component that provides a selector as a vertical
// scrollable list of (radio) buttons.  For prop definitions, see
// ScrollingSelector.propTypes

// TODO: Add props.style and pass thru to RadioButtonSelector
// TODO: Add prop for option item height?
// TODO: (as called for) Make vertical a prop
// TODO: Use inline styles only

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { findIndex } from 'lodash';
import classNames from 'classnames';

import { pick } from '../utils';
import RadioButtonSelector from '../RadioButtonSelector';
import './ScrollingSelector.css';

const optionItemHeightEms = 1.43;

class ScrollingSelector extends Component {
  scrollToValue(value) {
    if (this.props.height < this.props.options.length) {
      // Scroll container to location of `defaultValue` option.
      const defaultIndex = findIndex(this.props.options, { value });
      const node = ReactDOM.findDOMNode(this.radioButtonSelector);
      const optionItemHeight = node.children[0].offsetHeight;
      node.scrollTop = (defaultIndex - this.props.height / 2) * optionItemHeight;
    }
  }

  componentDidMount() {
    this.scrollToValue(this.props.value);
  }

  componentDidUpdate() {
    this.scrollToValue(this.props.value);
  }

  render() {
    return (
      <RadioButtonSelector
        className={classNames("ScrollingSelector", this.props.className)}
        style={{
          height: `${(this.props.height * optionItemHeightEms + 0.02).toString()}em`,
          overflowY: (this.props.height < this.props.options.length) ? 'scroll' : 'visible',
        }}
        {...pick(this.props, 'name options value onChange')}
        ref={(component) => {
          this.radioButtonSelector = component;
        }}
      >
      </RadioButtonSelector>
    );
  }
}

ScrollingSelector.propTypes = {
  height: PropTypes.number,
  // Height of scrolling list, measured in number of option items
  name: PropTypes.string.isRequired,
  // An HTML <input> name for each child button
  options: PropTypes.array.isRequired,
  // Array of selector options, specified by objects with keys `value`,
  // `label`.
  // `value` is the value taken by the option; `label` is the displayed name of
  // the option.
  value: PropTypes.any,
  // Value of selector
  onChange: PropTypes.func.isRequired,
  // Callback called when selection changes.
};

ScrollingSelector.defaultProps = {
  height: 10,
};

export default ScrollingSelector;
