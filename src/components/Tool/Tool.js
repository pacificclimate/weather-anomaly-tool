import React, { PureComponent } from 'react';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';

import { bindFunctions, pick } from '../utils';
import DatasetSelector from '../DatasetSelector'
import VariableSelector from '../VariableSelector'
import YearSelector from '../YearSelector';
import MonthSelector from '../MonthSelector';
import IncrementDecrement from '../IncrementDecrement';
import DataViewer from '../DataViewer';

import 'react-input-range/lib/css/index.css';
import './Tool.css';
import { getLastDateWithDataBefore } from '../../data-services/weather-anomaly-data-service';


// Note: We use package `moment` for date arithmetic. It is excellent but it
// *mutates* its objects. We are using React PureComponents in this application,
// which require values whose identity changes when their value is changed,
// i.e., a new object. Therefore every change to a `moment` date object should
// be preceded by `.clone()`; for example, `y = x.clone().subtract(1, 'month')`
// yields a new moment object with a value 1 month before the original `x`
// object. `x` is unchanged by this operation, and `y` is a different object
// than `x`.

// Compute likely latest possible date of available data = current date - 15 d.
// This allows for cron jobs that run in first half of month.
// Subtract fewer/more days if cron jobs run earlier/later in month.
// But it is not guaranteed that there is data for this date; that can only be
// determined by consulting the backend. That's done in `componentDidMount()`.
const latestPossibleDataDate = moment().subtract(15, 'days');


export default class Tool extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataset: 'anomaly',
            variable: 'precip',
            date: latestPossibleDataDate,
            dataLoading: true,
        };
        bindFunctions(this, 'handleChangeVariable handleChangeDataset handleChangeMonth handleChangeYear handleIncrementYear handleIncrementMonth handleDataIsLoading handleDataIsNotLoading');
    }

    componentDidMount() {
        // Set the year and month to the last date before present with data.
        // This happens only once, when the component mounts.
        this.setState({ dataLoading: true });
        getLastDateWithDataBefore(this.state.variable, this.state.date)
            .then(date => {
                this.setState({ date, dataLoading: false });
            });
    }

    handleChangeVariable(variable) {
        this.setState({variable});
    }

    handleChangeDataset(dataset) {
        this.setState({dataset});
    }

    handleChangeMonth(month) {
        // TODO: Refactor so that months are everywhere 0-based
        this.setState(({ date }) => ({ date: date.clone().month(month-1) }));
    }

    handleChangeYear(year) {
        this.setState(({ date }) => ({ date: date.clone().year(year) }));
    }

    handleIncrementYear(by) {
        this.setState(({ date }) => ({ date: date.clone().add(by, 'year') }));
    }

    handleIncrementMonth(by) {
        this.setState(({ date }) => ({ date: date.clone().add(by, 'month') }));
    }

    handleDataIsLoading() {
        this.setState({ dataLoading: true });
    }

    handleDataIsNotLoading() {
        this.setState({ dataLoading: false });
    }

    render() {
        const isBaselineDataset = this.state.dataset === 'baseline';
        return (
          <React.Fragment>
            <Row className="Tool">
                <Col lg={3} className="selectors">
                    <Row>Display</Row>
                    <Row>
                        <Col lg={2}/>
                        <Col lg={4}>
                            <VariableSelector
                                disabled={this.state.dataLoading}
                                value={this.state.variable}
                                onChange={this.handleChangeVariable}
                            />
                        </Col>
                        <Col lg={4}>
                            <DatasetSelector
                                value={this.state.dataset}
                                onChange={this.handleChangeDataset}
                            />
                        </Col>
                        <Col lg={2}/>
                    </Row>
                    <Row>for</Row>
                    <Row>
                        <Col lg={8}>
                            <MonthSelector
                                disabled={this.state.dataLoading}
                                value={this.state.date.month() + 1}
                                onChange={this.handleChangeMonth}
                            />
                        </Col>
                        <Col lg={4}>
                            <IncrementDecrement
                                disabled={this.state.dataLoading}
                                id="month-increment"
                                bsSize="xsmall"
                                by={[1, 3, 6]}
                                onIncrement={this.handleIncrementMonth}
                            />
                        </Col>
                    </Row>
                    {!isBaselineDataset &&
                    <Row>
                        <Col lg={8}>
                            <YearSelector
                                disabled={this.state.dataLoading}
                                start={1970}
                                end={latestPossibleDataDate.year()}
                                value={this.state.date.year()}
                                onChange={this.handleChangeYear}
                            />
                        </Col>
                        <Col lg={4}>
                            <IncrementDecrement
                                disabled={this.state.dataLoading}
                                id="year-increment"
                                bsSize="xsmall"
                                by={[1, 2, 3, 4, 5, 10]}
                                onIncrement={this.handleIncrementYear}
                            />
                        </Col>
                    </Row>}
                </Col>
                <Col  lg={9}>
                    <DataViewer
                        {...pick(this.state, 'dataset variable date')}
                        onDataWillLoad={this.handleDataIsLoading}
                        onDataDidLoad={this.handleDataIsNotLoading}
                        onDataDidCatch={this.handleDataIsNotLoading}
                    />
                </Col>
            </Row>
          </React.Fragment>
        );
    }
}
