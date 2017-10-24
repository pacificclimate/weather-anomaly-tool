import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { pick } from '../utils';
import DataLoaderMode from '../DataLoaderMode';
import FakeDataLoader from "../FakeDataLoader/FakeDataLoader";
import DataLoader from "../DataLoader/DataLoader";

import './TestDataLoader.css';

class TestDataLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'fake',
        };
    }

    render() {
        return (
            <Row>
                <Col lg={2}>
                    <DataLoaderMode value={this.state.mode} onChange={mode => { this.setState({mode}); }}/>
                </Col>
                <Col lg={10}>
                    {
                        this.state.mode === 'fake'
                        ? <FakeDataLoader {...pick(this.props, 'variable month year onDataLoaded')}/>
                        : <DataLoader {...pick(this.props, 'variable month year onDataLoaded')}/>
                    }
                </Col>
            </Row>
        );
    }
}

TestDataLoader.propTypes = {
    variable: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onDataLoaded: PropTypes.func.isRequired,
};

export default TestDataLoader;
