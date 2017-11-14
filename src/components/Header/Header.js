import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import classNames from 'classnames';

import styles from './Header.css';

class Header extends Component {

    render() {
        return (
            <Row className={'Header'}>
                <Col lg={3} className="text-left">
                    <a href='https://pacificclimate.org/'>
                        <img
                            src={require('./logo.png')}
                            width='328'
                            height='38'
                            alt='Pacific Climate Impacts Consortium'
                        />
                    </a>
                </Col>
                <Col>
                    <h1>Weather Anomaly Viewer</h1>
                </Col>
            </Row>
        );
    }
}

export default Header;
