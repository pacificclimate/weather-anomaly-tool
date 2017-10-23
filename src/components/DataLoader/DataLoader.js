import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './DataLoader.css';

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
function getData(delay, failProb) {
    return new Promise((resolve, reject) => {
        setTimeout(function() {
            if (Math.random() >= failProb) {
                console.log('getData: resolving', index);
                resolve(data[index]);
                index = (index + 1) % data.length;
            } else {
                console.log('getData: rejecting')
                reject('Error')
            }
        }, delay);
    });
}

class DataLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    // Placeholder for loading data and calling back when loaded.
    // Consider https://www.npmjs.com/package/react-promise ... but it may not solve any problem that we have
    loadData() {
        console.log('DataLoader.loadData');

        this.setState({loading: true});
        getData(2000, 0.0).then((data) => {
            this.props.onDataLoaded(data);
            this.setState({loading: false});
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log('DataLoader.componentWillReceiveProps', nextProps);
        const checkKeys = 'variable year month'.split(' ');
        if (!_.isEqual(_.pick(nextProps, checkKeys), _.pick(this.state, checkKeys))) {
            this.loadData();
            this.setState(nextProps);
        }
    }

    componentDidMount() {
        console.log('DataLoader.componentDidMount', this.props);
        this.loadData();
        this.setState(this.props);
    }

    componentDidUpdate() {
        console.log('DataLoader.componentDidUpdate', this.props);
    }

    render() {
        return (
            <div>
                <p>
                    {this.state.loading ? <span>Loading... </span> : <span>Data: </span>}
                    {this.props.variable};{this.props.year}-{this.props.month}
                </p>
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
