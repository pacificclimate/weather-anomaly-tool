import React, { PureComponent } from 'react';
import { Row, Col } from 'react-bootstrap';

import { bindFunctions, incrementMonth, pick } from '../utils';
import DatasetSelector from '../DatasetSelector'
import VariableSelector from '../VariableSelector'
import YearSelector from '../YearSelector';
import MonthSelector from '../MonthSelector';
import IncrementDecrement from '../IncrementDecrement';
import DataViewer from '../DataViewer';

import 'react-input-range/lib/css/index.css';
import './Tool.css';
import { getLastDateWithDataBefore }
    from '../../data-services/weather-anomaly-data-service';


// Compute likely latest possible date of available data = current date - 15 d.
// This allows for cron jobs that run in first half of month.
// Subtract fewer/more days if cron jobs run earlier/later in month.
// But it is not guaranteed that there is data for this date; that can only be
// determined by consulting the backend. That's done in `componentDidMount()`.
const msInDay = 24 * 60 * 60 * 1000;
const latestPossibleDataDate = new Date(Date.now() - 15 * msInDay);
console.log('### latestDataDate', latestPossibleDataDate)


class Tool extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataset: 'anomaly',
            variable: 'precip',
            year: latestPossibleDataDate.getFullYear(),
            month: latestPossibleDataDate.getMonth() + 1,
            dataLoading: true,
        };
        bindFunctions(this, 'handleChangeVariable handleChangeDataset handleChangeMonth handleChangeYear handleIncrementYear handleIncrementMonth handleDataIsLoading handleDataIsNotLoading');
    }

    componentDidMount() {
        // Set the year and month to the last date before present with data.
        // This happens only once, when the component mounts.
        const { variable, year, month } = this.state;
        this.setState({ dataLoading: true })
        getLastDateWithDataBefore(variable, [year, month])
            .then(([year, month]) => {
                this.setState({ year, month, dataLoading: false });
            });
    }

    handleChangeVariable(variable) {
        this.setState({variable});
    }

    handleChangeDataset(dataset) {
        this.setState({dataset});
    }

    handleChangeMonth(month) {
        this.setState({month});
    }

    handleChangeYear(year) {
        this.setState({year});
    }

    handleIncrementYear(by) {
        this.setState({ year: this.state.year + by});
    }

    handleIncrementMonth(by) {
        this.setState(({ year, month }) => {
            const [iYear, iMonth] = incrementMonth([year, month], by);
            return { year: iYear, month: iMonth };
        });
    }

    handleDataIsLoading() {
        this.setState({dataLoading: true});
    }

    handleDataIsNotLoading() {
        this.setState({dataLoading: false});
    }

    render() {
        const isBaselineDataset = this.state.dataset === 'baseline';
        return (
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
                                value={this.state.month}
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
                                start={1970} end={latestPossibleDataDate.getFullYear()}
                                value={this.state.year}
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
                        {...pick(this.state, 'dataset variable year month')}
                        onDataWillLoad={this.handleDataIsLoading}
                        onDataDidLoad={this.handleDataIsNotLoading}
                        onDataDidCatch={this.handleDataIsNotLoading}
                    />
                </Col>
            </Row>
        );
    }
}

export default Tool;