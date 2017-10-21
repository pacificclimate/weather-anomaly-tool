import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './DataLoader.css';

const data = [
    {
        baseline: [{
            "network_name": "EC",
            "datum": 120.0,
            "history_db_id": 404,
            "station_name": "ACTIVE PASS",
            "elevation": 4.0,
            "station_native_id": "1010066",
            "lon": -123.283333,
            "lat": 48.866667,
            "station_db_id": 1
        }],
        weather: [{
            "network_name": "EC",
            "history_db_id": 404,
            "data_coverage": 0.741935483870968,
            "station_name": "ACTIVE PASS",
            "cell_method": "time: sum",
            "network_variable_name": "ONE_DAY_PRECIPITATION",
            "frequency": "daily",
            "statistic": 118.6,
            "lon": -123.283333,
            "station_native_id": "1010066",
            "elevation": 4.0,
            "lat": 48.866667,
            "station_db_id": 1
        }],
    },

    {
        baseline: [{
            "network_name": "EC",
            "datum": 64.0,
            "history_db_id": 1200,
            "station_name": "PRINCE GEORGE MIWORTH",
            "elevation": 610.0,
            "station_native_id": "1096465",
            "lon": -122.933333,
            "lat": 53.966667,
            "station_db_id": 797
        }],
        weather: [{
            "network_name": "EC",
            "history_db_id": 1200,
            "data_coverage": 0.870967741935484,
            "station_name": "PRINCE GEORGE MIWORTH",
            "cell_method": "time: sum",
            "network_variable_name": "ONE_DAY_PRECIPITATION",
            "frequency": "daily",
            "statistic": 73.6,
            "lon": -122.933333,
            "station_native_id": "1096465",
            "elevation": 610.0,
            "lat": 53.966667,
            "station_db_id": 797
        }],
    },
];
let index = 0;

class DataLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Placeholder for loading data and calling back when loaded.
    // Consider https://www.npmjs.com/package/react-promise ... but it may not solve any problem that we have
    loadData() {
        console.log('DataLoader.loadData');

        // Placeholder for async data retrieval
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

        getData(2000, 0.0).then(this.props.onDataLoaded);
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
                DataLoader: {this.props.variable};{this.props.year}-{this.props.month}&nbsp;
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
