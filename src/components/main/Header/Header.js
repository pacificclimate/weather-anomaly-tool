import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from './logo.png';

import './Header.css';

class Header extends Component {

  render() {
    return (
      <Row className={'Header'}>
        <Col lg={3} className="text-left">
          <a href='https://pacificclimate.org/'>
            <img
              src={logo}
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
