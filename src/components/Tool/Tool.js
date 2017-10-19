import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import VariableSelector from '../VariableSelector'
import YearSelector from '../YearSelector'
import Map from '../Map'

class Tool extends Component {
    constructor(props) {
        super(props);
        this.state = Tool.defaultState;
        this.handleVariableChange = this.handleVariableChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
    }

    handleVariableChange(variable) {
        this.setState({variable: variable});
    }

    handleYearChange(year) {
        this.setState({year: year});
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
                        <YearSelector
                            defaultValue={Tool.defaultState.year}
                            onChange={this.handleYearChange}
                        />
                    </Col>
                    <Col  lg={8}>
                        <Map variable={this.state.variable} year={this.state.year}/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

Tool.defaultState = {
    variable: 'precip',
    year: 2000,
};

export default Tool;