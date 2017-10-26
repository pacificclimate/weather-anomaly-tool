import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Glyphicon } from 'react-bootstrap';

import classNames from 'classnames';

import './IncrementDecrement.css';

class IncrementDecrement extends Component {
    render() {
        return (
            <ButtonGroup className={classNames('IncrementDecrement', this.props.className)}>
                <Button bsSize="small" onClick={() => this.props.onIncrement(-this.props.by)}>
                    <Glyphicon glyph={'minus'}/>
                </Button>
                <Button bsSize="small" onClick={() => this.props.onIncrement(this.props.by)}>
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
