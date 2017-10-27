import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { bindFunctions, pick } from '../utils';
import DatasetSelector from '../DatasetSelector'
import VariableSelector from '../VariableSelector'
import YearSelector from '../YearSelector';
import MonthSelector from '../MonthSelector';
import IncrementDecrement from '../IncrementDecrement';
import DataViewer from '../DataViewer';

import 'react-input-range/lib/css/index.css';
import './Tool.css';

class Tool extends Component {
    constructor(props) {
        super(props);
        this.state = Tool.defaultState;
        bindFunctions(this, 'handleIncrementYear handleIncrementMonth');
    }

    makeHandleChange(item) {
        return (function(value) {
            this.setState({[item]: value});
        }).bind(this);
    }

    handleIncrementYear(by) {
        console.log('handleIncrementYear', this, by)
        this.setState({'year': this.state.year + by});
    }

    handleIncrementMonth(by) {
        let monthsSinceEpoch = this.state.year * 12 + this.state.month - 1 + by;
        const month = monthsSinceEpoch % 12 + 1;
        const year = Math.floor(monthsSinceEpoch / 12);
        this.setState({month, year});
    }

    render() {

        const isBaselineDataset = this.state.dataset === 'baseline';
        return (
            <Grid fluid className="Tool">
                <Row>
                    <Col lg={3} className="selectors">
                        <Row>Display</Row>
                        <Row>
                            <Col lg={2}/>
                            <Col lg={4}>
                                <VariableSelector
                                    value={this.state.variable}
                                    onChange={this.makeHandleChange('variable')}
                                />
                            </Col>
                            <Col lg={4}>
                                <DatasetSelector
                                    value={this.state.dataset}
                                    onChange={this.makeHandleChange('dataset')}
                                />
                            </Col>
                            <Col lg={2}/>
                        </Row>
                        <Row>for</Row>
                        <Row>
                            <Col lg={12} className="map">
                                <MonthSelector
                                    value={this.state.month}
                                    onChange={this.makeHandleChange('month')}
                                />
                            </Col>
                        </Row>
                        {!isBaselineDataset &&
                        <Row>
                            <Col lg={12}>
                                <YearSelector
                                    start={1970} end={2018}
                                    value={this.state.year}
                                    onChange={this.makeHandleChange('year')}
                                />
                            </Col>
                        </Row>}
                        <Row>
                            <Col lg={12} className="map">
                                <MonthSelector
                                    value={this.state.month}
                                    onChange={this.makeHandleChange('month')}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={2}/>
                            <Col lg={4}>
                                <IncrementDecrement
                                    id="year-increment"
                                    bsSize="xsmall"
                                    by={[1, 2, 3, 4, 5, 10]}
                                    onIncrement={this.handleIncrementYear}
                                />
                            </Col>
                            <Col lg={4}>
                                <IncrementDecrement
                                    id="month-increment"
                                    bsSize="xsmall"
                                    by={[1, 3, 6]}
                                    onIncrement={this.handleIncrementMonth}
                                />
                            </Col>
                            <Col lg={2}/>
                        </Row>
                    </Col>
                    <Col  lg={9}>
                        <DataViewer
                            {...pick(this.state, 'dataset variable year month')}
                        />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

Tool.defaultState = {
    dataset: 'anomaly',
    variable: 'precip',
    year: 1990,
    month: 6,
};

export default Tool;