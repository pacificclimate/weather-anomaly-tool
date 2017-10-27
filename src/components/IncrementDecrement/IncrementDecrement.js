import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';

import classNames from 'classnames';

import './IncrementDecrement.css';

class IncrementDecrement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            by: Array.isArray(this.props.by) ? this.props.by[0] : this.props.by,
        };
    }

    render() {
        let selector = null;
        if (Array.isArray(this.props.by)) {
            selector = (
                <DropdownButton
                    bsSize="xsmall"
                    title={this.state.by}
                    onSelect={by => this.setState({by: +by})}
                >
                    {this.props.by.map(by =>
                        <MenuItem eventKey={by} className={'btn-xs'}>{by}</MenuItem>
                    )}
                </DropdownButton>
            );
        }

        return (
            <ButtonGroup className={classNames('IncrementDecrement', this.props.className)}>
                <Button bsSize="xsmall" onClick={() => this.props.onIncrement(-this.state.by)}>
                    <Glyphicon glyph={'minus'}/>
                </Button>
                {selector}
                <Button bsSize="xsmall" onClick={() => this.props.onIncrement(this.state.by)}>
                    <Glyphicon glyph={'plus'}/>
                </Button>
            </ButtonGroup>
        );
    }
}

IncrementDecrement.propTypes = {
    by: PropTypes.number,
    onIncrement: PropTypes.func.isRequired,
};

IncrementDecrement.defaultProps = {
    by: 1,
};

export default IncrementDecrement;
