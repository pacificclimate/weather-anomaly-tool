import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import moment from 'moment';

import DatasetSelector from '../DatasetSelector'
import VariableSelector from '../VariableSelector'
import YearSelector from '../YearSelector';
import MonthSelector from '../MonthSelector';
import IncrementDecrement from '../IncrementDecrement';

import 'react-input-range/lib/css/index.css';
import './Tool.css';
import { getBaselineData, getLastDateWithDataBefore, getMonthlyData }
  from '../../data-services/weather-anomaly-data-service';
import DataMap from '../DataMap';


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

  // Determine latest date with data, and set date to it. This happens once,
  // on first render.
  useEffect(() => {
    setBaseline(null);
    setMonthly(null);
    getLastDateWithDataBefore(variable, date)
    .then(date => {
      setDate(date);
    });
  }, []);

  const [baseline, setBaseline] = useState(null);  // Change to null
  const [monthly, setMonthly] = useState(null);  // Change to null

  useEffect(() => {
    setBaseline(null);
    setMonthly(null);
    getBaselineData(variable, date).then(r => {
      setBaseline(r.data);
    });
    getMonthlyData(variable, date).then(r => {
      setMonthly(r.data);
    });
  }, [variable, date]);

  const handleChangeMonth = (month) => {
    setDate((date) => date.clone().month(month));
  };

  const handleChangeYear = (year) => {
    setDate((date) => date.clone().year(year));
  };

  const handleIncrementYear = (by) => {
    setDate((date) => date.clone().add(by, 'year'));
  };

  const handleIncrementMonth = (by) => {
    setDate((date) => date.clone().add(by, 'month'));
  };

  const isDataLoading = baseline === null || monthly === null;
  const isBaselineDataset = dataset === 'baseline';

  return (
    <React.Fragment>
      <Row className="Tool">
        <Col xs={3} className="selectors">
          <Row><Col>Display</Col></Row>
          <Row>
            <Col xs={2}/>
            <Col xs={4}>
              <VariableSelector
                vertical
                size="sm"
                disabled={isDataLoading}
                value={variable}
                onChange={setVariable}
              />
            </Col>
            <Col xs={4}>
              <DatasetSelector
                vertical
                size="sm"
                value={dataset}
                onChange={setDataset}
              />
            </Col>
            <Col xs={2}/>
          </Row>
          <Row><Col>for</Col></Row>
          <Row>
            <Col xs={9}>
              <MonthSelector
                disabled={isDataLoading}
                value={date.month()}
                onChange={handleChangeMonth}
              />
            </Col>
            <Col xs={3}>
              <IncrementDecrement
                disabled={isDataLoading}
                id="month-increment"
                bys={monthIncrDecrBy}
                onIncrement={handleIncrementMonth}
              />
            </Col>
          </Row>
          {!isBaselineDataset &&
          <Row>
            <Col xs={9}>
              <YearSelector
                disabled={isDataLoading}
                minValue={1970}
                maxValue={latestPossibleDataDate.year()}
                value={date.year()}
                onChange={handleChangeYear}
              />
            </Col>
            <Col xs={3}>
              <IncrementDecrement
                disabled={isDataLoading}
                id="year-increment"
                bys={yearIncrDecrBy}
                onIncrement={handleIncrementYear}
              />
            </Col>
          </Row>
          }
        </Col>
        <Col xs={9}>
          <DataMap
            dataset={dataset}
            variable={variable}
            baseline={baseline}
            monthly={monthly}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}
