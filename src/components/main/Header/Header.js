import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from './logo.png';

import './Header.css';
import { useConfigContext } from '../ConfigContext';

export default function Header() {
  const config = useConfigContext();
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
        <h1>{config.frontend.title}</h1>
      </Col>
    </Row>
  );
}
