import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import _ from 'lodash';

import { getBaselineData, getMonthlyData } from '../../data-services/weather-anomaly-data-service';

import './DataLoader.css';

class DataLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    loadData() {
        console.log('DataLoader.loadData', this.state, this.props);

        this.setState({loading: true});

        // This may be inefficient when only month changes
        const baselineP = getBaselineData(this.props.variable, this.props.month);
        const monthlyP = getMonthlyData(this.props.variable, this.props.year, this.props.month);
        Promise.all([baselineP, monthlyP])
            .then(({baseline, monthly}) => {
                this.setState({baseline, monthly , loading: false});
            });
        // TODO: catch errors!
    }

    componentDidMount() {
        console.log('DataLoader.componentDidMount', this.props);
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        console.log('DataLoader.componentWillReceiveProps', nextProps);
        const checkKeys = 'variable year month'.split(' ');
        if (!_.isEqual(_.pick(nextProps, checkKeys), _.pick(this.props, checkKeys))) {
            this.loadData();
        }
    }

    render() {
        return (
            <div>
                <Row>
                    Real Data Loader: Goes out to the WADS!
                </Row>
                <Row>
                    {this.state.loading ? <span>Loading... </span> : <span>Data: </span>}
                    <span>{this.props.variable};{this.props.year}-{this.props.month}</span>
                </Row>
            </div>
        );
    }
}

DataLoader.propTypes = {
    variable: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onDataLoaded: PropTypes.func.isRequired,
};

export default DataLoader;
