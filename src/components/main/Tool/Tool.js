import React from 'react';
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

  // TODO: Move into config?
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
