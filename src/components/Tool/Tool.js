import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';

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


// Note: We use package `moment` for date arithmetic. It is excellent but it
// *mutates* its objects. We are using functional components,
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
// determined by consulting the backend.
const latestPossibleDataDate = moment().subtract(15, 'days');

export default function Tool({
    monthIncrDecrBy = [1, 3, 6],
    yearIncrDecrBy = [1, 2, 3, 4, 5, 10],
}) {
    const [dataset, setDataset] = useState('anomaly');
    const [variable, setVariable] = useState('precip');
    const [date, setDate] = useState(latestPossibleDataDate);
    const [dataLoading, setDataLoading] = useState(true);

    // Determine latest date with data, and set date to it.
    useEffect(() => {
        setDataLoading(true);
        getLastDateWithDataBefore(variable, date)
        .then(date => {
            setDate(date);
            setDataLoading(false);
        });
    }, [])

    const handleChangeMonth = (month) => {
        setDate((date) => date.clone().month(month));
    };

    const handleChangeYear = (year) => {
        setDate((date) => date.clone().year(year));
    };

    const handleIncrementYear = (by) => {
        setDate((date) => date.clone().add(by, 'year'));
    };

    const handleIncrementMonth = (by) =>  {
        setDate((date) => date.clone().add(by, 'month'));
    };

    const handleDataIsLoading = () => {
        setDataLoading(true);
    }

    const handleDataIsNotLoading = () => {
        setDataLoading(false);
    };

    const isBaselineDataset = dataset === 'baseline';

    return (
      <React.Fragment>
        <Row className="Tool">
            <Col lg={3} className="selectors">
                <Row>Display</Row>
                <Row>
                    <Col lg={2}/>
                    <Col lg={4}>
                        <VariableSelector
                            vertical
                            disabled={dataLoading}
                            value={variable}
                            onChange={setVariable}
                        />
                    </Col>
                    <Col lg={4}>
                        <DatasetSelector
                            vertical
                            value={dataset}
                            onChange={setDataset}
                        />
                    </Col>
                    <Col lg={2}/>
                </Row>
                <Row>for</Row>
                <Row>
                    <Col lg={8}>
                        <MonthSelector
                            disabled={dataLoading}
                            value={date.month()}
                            onChange={handleChangeMonth}
                        />
                    </Col>
                    <Col lg={4}>
                        <IncrementDecrement
                            disabled={dataLoading}
                            id="month-increment"
                            bsSize="xsmall"
                            by={monthIncrDecrBy}
                            onIncrement={handleIncrementMonth}
                        />
                    </Col>
                </Row>
                {!isBaselineDataset &&
                <Row>
                    <Col lg={8}>
                        <YearSelector
                            disabled={dataLoading}
                            start={1970}
                            end={latestPossibleDataDate.year()}
                            value={date.year()}
                            onChange={handleChangeYear}
                        />
                    </Col>
                    <Col lg={4}>
                        <IncrementDecrement
                            disabled={dataLoading}
                            id="year-increment"
                            bsSize="xsmall"
                            by={yearIncrDecrBy}
                            onIncrement={handleIncrementYear}
                        />
                    </Col>
                </Row>}
            </Col>
            <Col  lg={9}>
                <DataViewer
                    dataset={dataset}
                    variable={variable}
                    date={date}
                    onDataWillLoad={handleDataIsLoading}
                    onDataDidLoad={handleDataIsNotLoading}
                    onDataDidCatch={handleDataIsNotLoading}
                />
            </Col>
        </Row>
      </React.Fragment>
    );
}
