// IncrementDecrement: Component that provides a control for incrementing or decrementing a value.
//
// Clicking on "-" button (decrement) button causes callback to be called with negative `by` value;
// clicking on "+" button (increment), with positive `by`.
//
// Increment/decrement amount can be a single fixed number, or can be selected by dropdown control
// from an array of numbers, according to the type of property `by`.

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Form } from 'react-bootstrap';

import classNames from 'classnames';

import { bindFunctions, pick } from '../utils';

import './IncrementDecrement.css';

class IncrementDecrement extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            by: Array.isArray(this.props.by) ? this.props.by[0] : this.props.by,
        };
        bindFunctions(this, 'onDecrement onIncrement')
    }

    onDecrement() {
        this.props.onIncrement(-this.state.by)
    }

    onIncrement() {
        this.props.onIncrement(this.state.by)
    }

    handleChangeBy = e => {
        this.setState({ by: +e.target.value })
    }

    render() {
        let selector = null;
        if (Array.isArray(this.props.by)) {
            selector = (
                <Form.Select
                    {...pick(this.props, 'id bsSize')}
                    title={this.state.by}
                    onChange={this.handleChangeBy}
                >
                    {this.props.by.map(by =>
                        <option key={by} className={'btn-xs'}>
                            {by}
                        </option>
                    )}
                </Form.Select>
            );
        }

        return (
            <ButtonGroup
                className={classNames('IncrementDecrement', this.props.className)}
            >
                <Button
                    bsSize={this.props.bsSize}
                    disabled={this.props.disabled}
                    onClick={this.onDecrement}
                >
                    -
                </Button>
                {selector}
                <Button
                    bsSize={this.props.bsSize}
                    disabled={this.props.disabled}
                    onClick={this.onIncrement}
                >
                    +
                </Button>
            </ButtonGroup>
        );
    }
}

IncrementDecrement.propTypes = {
    disabled: PropTypes.bool,
    // Is control disabled
    by: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
    ]),
    // Determines the value with which the callback is called. If an array of numbers is provided,
    // a dropdown selector allows the user to select an increment value from the array. If a single
    // number is provided, there is no dropdown selector and this is the increment value.
    onIncrement: PropTypes.func.isRequired,
    // Callback called with either `-by` (decrement) or `+by` (increment), where `by` is the currently
    // chosen increment value.
};

IncrementDecrement.defaultProps = {
    disabled: false,
    by: 1,
};

export default IncrementDecrement;
