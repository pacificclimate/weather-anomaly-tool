import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import logger from '../../logger';
import './FakeDataLoader.css';

import baseline_precip_1 from './dummy-data/baseline-precip-1.json';
import baseline_precip_2 from './dummy-data/baseline-precip-2.json';
import monthly_precip_1990_1 from './dummy-data/monthly-precip-1990-1.json';
import monthly_precip_1990_2 from './dummy-data/monthly-precip-1990-2.json';

const data = [
    {
        baseline: baseline_precip_1,
        monthly: monthly_precip_1990_1,
    },
    {
        baseline: baseline_precip_2,
        monthly: monthly_precip_1990_2,
    },
];
let index = 0;

// Placeholder for real async data retrieval
function getFakeData(delay, failProb) {
    logger.log(this, {delay, failProb});
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            if (Math.random() >= failProb) {
                logger.log(this, 'getFakeData: resolving', {time: (new Date()).getSeconds(), index});
                resolve(data[index]);
                index = (index + 1) % data.length;
            } else {
                logger.log(this, 'getFakeData: rejecting', {time: (new Date()).getSeconds()});
                reject(new Error('You lose'))
            }
        }, delay);
    });
}

// TODO: Add error controls

export default class FakeDataLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            delay: 2000,
            failProb: 0,
        };
    }

    loadData() {
        logger.log(this, this.state, this.props);

        this.setState({loading: true});
        this.props.onDataWillLoad();

        getFakeData(this.state.delay, this.state.failProb).then((data) => {
            this.props.onDataDidLoad(data);
            this.setState({loading: false});
        }).catch(error => {
            this.props.onDidCatch(error);
            this.setState({loading: false});
        });
    }

    componentDidMount() {
        logger.log(this, this.props);
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        logger.log(this, nextProps);
        if (
          nextProps.variable !== this.props.variable ||
          !nextProps.date.isSame(this.props.date)
        ) {
            this.loadData();
        }
    }

    render() {
        return (
            <div>
                <Row>
                    Fake Data Loader: For any change of parameter, data alternates between precip 1990-1 and 1990-2
                </Row>
                <Row>
                    <Col lg={6}>
                        <label>Loading delay</label>
                        {' '}
                        <input
                            value={this.state.delay}
                            onChange={event => {
                                this.setState({delay: event.target.value}, this.loadData);
                                // Alternatively, could call this.loadData() in componentDidUpdate(), but would have to
                                // compare old state to new ... and we know what's happening here.
                            }}
                        />
                    </Col>
                    <Col lg={6}>
                        <label>Loading failure prob.</label>
                        {' '}
                        <input
                            value={this.state.failProb}
                            onChange={event => {
                                this.setState({failProb: event.target.value}, this.loadData);
                            }}
                        />

                    </Col>
                </Row>
                <Row>
                    {this.state.loading ?
                      <span>Loading... </span> :
                      <span>Data: </span>
                    }
                    <span>
                        {this.props.variable};
                        {this.props.date.year()}-{this.props.date().month()+1}
                    </span>
                </Row>
            </div>
        );
    }
}

FakeDataLoader.propTypes = {
    variable: PropTypes.string.isRequired,
    date: PropTypes.object.isRequired,
    onDataWillLoad: PropTypes.func.isRequired,
    onDataDidLoad: PropTypes.func.isRequired,
    onDidCatch: PropTypes.func.isRequired,
};
