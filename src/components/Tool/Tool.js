import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import { pick } from '../utils';
import DatasetSelector from '../DatasetSelector'
import VariableSelector from '../VariableSelector'
import YearSelector from '../YearSelector';
import MonthSelector from '../MonthSelector';
import DataViewer from '../DataViewer';

import './Tool.css';

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

        const isBaselineDataset = this.state.dataset === 'baseline';
        return (
            <Grid fluid className="Tool">
                <Row>
                    <Col lg={3} className="selectors">
                        Display
                        <Row>
                            <Col lg={6}>
                                <VariableSelector
                                    value={this.state.variable}
                                    onChange={this.makeHandleChange('variable')}
                                />
                            </Col>
                            <Col lg={6}>
                                <DatasetSelector
                                    value={this.state.dataset}
                                    onChange={this.makeHandleChange('dataset')}
                                />
                            </Col>
                        </Row>
                        for
                        <Row>
                            <Col lg={isBaselineDataset ? 12 : 6}>
                                <YearSelector
                                    start={1970} end={2018}
                                    value={this.state.year}
                                    onChange={this.makeHandleChange('year')}
                                />
                            </Col>
                            {!isBaselineDataset &&
                            <Col lg={6} className="map">
                                <MonthSelector
                                    value={this.state.month}
                                    onChange={this.makeHandleChange('month')}
                                />
                            </Col>
                            }
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