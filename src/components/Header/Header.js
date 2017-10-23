import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import classNames from 'classnames';

import styles from './Header.css';

class Header extends Component {

  render() {
    return (
      <div className={classNames(styles.header)}>
        <Grid fluid>
          <Row>
            <Col lg={4}>
              <a href='https://pacificclimate.org/'>
                <img
                  src={require('./logo.png')}
                  width='328'
                  height='38'
                  alt='Pacific Climate Impacts Consortium'
                />
              </a>
            </Col>
            <Col lg={4}>
              <h1>Weather Anomaly Tool</h1>
            </Col>
            <Col lg={4} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Header;
