import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import VariableSelector from '../VariableSelector'
import YearSelector from '../YearSelector'
import MonthSelector from "../MonthSelector";
import Map from '../Map'

class Tool extends Component {
    constructor(props) {
        super(props);
        this.state = Tool.defaultState;
    }

    makeHandleChange(item) {
        return (function(value) {
            this.setState({[item]: value});
        }).bind(this);
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col lg={2}>
                        <div>Variable</div>
                        <VariableSelector
                            defaultValue={Tool.defaultState.variable}
                            onChange={this.makeHandleChange('variable')}
                        />
                        <Row>
                            <Col lg={6}>
                                <div>Year</div>
                                <YearSelector
                                    start={1970} end={2018}
                                    defaultValue={Tool.defaultState.year}
                                    onChange={this.makeHandleChange('year')}
                                />
                            </Col>
                            <Col lg={6}>
                                <div>Month</div>
                                <MonthSelector
                                    defaultValue={Tool.defaultState.month}
                                    onChange={this.makeHandleChange('month')}
                                />
                            </Col>
                        </Row>
                    </Col>
                    <Col  lg={10}>
                        <Map variable={this.state.variable} year={this.state.year} month={this.state.month} />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

Tool.defaultState = {
    variable: 'precip',
    year: 1990,
    month: 1,
};

export default Tool;