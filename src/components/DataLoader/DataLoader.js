import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './DataLoader.css';

class DataLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // Placeholder for loading data and calling back when loaded. No delay even.
    // This should be done in lifecycle hook `componentWillReceiveProps()`.
    loadData() {
        console.log('DataLoader.loadData');
        this.props.onDataLoaded({
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
