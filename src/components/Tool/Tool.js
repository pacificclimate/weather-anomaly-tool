import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import VariableSelector from '../VariableSelector'
import DateSelector from '../DateSelector'
import Map from '../Map'

class Tool extends Component {
    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col lg={4}>
                        <VariableSelector/>
                        <DateSelector/>
                    </Col>
                    <Col  lg={8}>
                        <Map/>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Tool;