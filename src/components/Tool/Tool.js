import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import VariableSelector from '../VariableSelector'
import DateSelector from '../DateSelector'
import Map from '../Map'

class Tool extends Component {
    constructor(props) {
        super(props);
        this.state = Tool.defaultState;
        this.handleVariableChange = this.handleVariableChange.bind(this);
    }

    handleVariableChange(variable) {
        this.setState({variable: variable});
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col lg={4}>
                        <VariableSelector
                            defaultValue={Tool.defaultState.variable}
                            onChange={this.handleVariableChange}
                        />
                        <DateSelector/>
                    </Col>
                    <Col  lg={8}>
                        <Map variable={this.state.variable}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

Tool.defaultState = {
    variable: 'precip',
}

export default Tool;