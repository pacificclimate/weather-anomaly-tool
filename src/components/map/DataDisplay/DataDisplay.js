import React from 'react';
import { Col, Row } from 'react-bootstrap';

import ColourScale from '../../map/ColourScale';
import DataMap from '../../map/DataMap';
import VariableTitle from '../../variables/VariableTitle';
import { useStore } from '../../../state-store';

export default function DataDisplay() {
  const variable = useStore(state => state.variable);
  const dataset = useStore(state => state.dataset);
  const baseline = useStore(state => state.baseline);
  const monthly = useStore(state => state.monthly);

  return (
    <>
      <Row className="my-1">
        <Col>
          <VariableTitle variable={variable} dataset={dataset}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ColourScale variable={variable} dataset={dataset}/>
        </Col>
      </Row>
      <Row>
        <DataMap
          dataset={dataset}
          variable={variable}
          baseline={baseline}
          monthly={monthly}
        />
      </Row>
    </>
  );
}