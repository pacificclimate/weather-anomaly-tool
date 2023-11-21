import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import DatasetSelector from '../../controls/DatasetSelector'
import VariableSelector from '../../controls/VariableSelector'
import YearSelector from '../../controls/YearSelector';
import MonthSelector from '../../controls/MonthSelector';
import MonthIncrementDecrement from '../../controls/MonthIncrementDecrement';
import YearIncrementDecrement from '../../controls/YearIncrementDecrement';
import DataDisplay from '../../map/DataDisplay';

import { useStore } from '../../../state-store';

import 'react-input-range/lib/css/index.css';
import './Tool.css';


export default function Tool() {
  const isBaselineDataset = useStore(state => state.isBaselineDataset());

  // Subsumed in state store, not used in this component
  // const [variable, setVariable] = useState(config.ui.variableSelector.initial);
  // const [dataset, setDataset] = useState(config.ui.datasetSelector.initial);
  // const [date, setDate] = useState(latestPossibleDataDate);
  // const [baseline, setBaseline] = useState(null);
  // const [monthly, setMonthly] = useState(null);

  // Part of initialize
  // // Determine latest date with data, and set date to it. This happens once,
  // // on first render.
  // useEffect(() => {
  //   setBaseline(null);
  //   setMonthly(null);
  //   getLastDateWithDataBefore(variable, date, wadsUrl)
  //   .then(date => {
  //     setDate(date);
  //   });
  // }, []);

  // Folded into store actions
  // // When variable or date changes, get data.
  // // (Both datasets are is retrieved for all values of `dataset`. This could
  // // be refined to get only the dataset(s) required by the value of `dataset`.)
  // // Consider splitting this into two separate effects, with an if on `dataset`.
  // useEffect(() => {
  //   setBaseline(null);
  //   setMonthly(null);
  //   getBaselineData(variable, date, wadsUrl)
  //   .then(r => {
  //     setBaseline(r.data);
  //   });
  //   getMonthlyData(variable, date, wadsUrl)
  //   .then(r => {
  //     setMonthly(r.data);
  //   });
  // }, [variable, date]);

  // Handlers moved to state store actions
  // const handleChangeMonth = (month) => {
  //   setDate((date) => date.clone().month(month));
  // };
  //
  // const handleChangeYear = (year) => {
  //   setDate((date) => date.clone().year(year));
  // };
  //
  // const handleIncrementYear = (by) => {
  //   setDate((date) => date.clone().add(by, 'year'));
  // };
  //
  // const handleIncrementMonth = (by) => {
  //   setDate((date) => date.clone().add(by, 'month'));
  // };

  // Computed values moved to state store actions
  // const isDataLoading = baseline === null || monthly === null;
  // const isBaselineDataset = dataset === 'baseline';

  const displayColWidths = { xs: 12, md: "auto" };
  const rowSpacing = "mt-3"

  return (
    <React.Fragment>
      <Row className="Tool">
        <Col xs={3} className="selectors">
          <Row className={rowSpacing}><Col>Display</Col></Row>
          <Row className={`${rowSpacing} justify-content-md-center`}>
            <Col {...displayColWidths} className="mb-sm-2 mb-lg-0">
              <VariableSelector vertical/>
            </Col>
            <Col {...displayColWidths}>
              <DatasetSelector vertical/>
            </Col>
          </Row>
          <Row className={rowSpacing}><Col>for</Col></Row>
          <Row className={`${rowSpacing} mt-1 ps-2 pe-5`}>
            <Col>
              <MonthSelector/>
            </Col>
          </Row>
          <Row className="mt-0">
            <Col>
              <MonthIncrementDecrement/>
            </Col>
          </Row>
          {!isBaselineDataset &&
            <React.Fragment>
              <Row className={`${rowSpacing} ps-2 pe-5`}>
                <Col>
                    <YearSelector/>
                </Col>
              </Row>
              <Row className="mt-0">
                <Col>
                  <YearIncrementDecrement/>
                </Col>
              </Row>
            </React.Fragment>
          }
        </Col>
        <Col xs={9}>
          <DataDisplay/>
        </Col>
      </Row>
    </React.Fragment>
  );
}
