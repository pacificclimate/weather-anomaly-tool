import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../DataLoader';
import DataMap from '../DataMap';
import { bindFunctions } from '../utils';
import './DataViewer.css';

class DataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseline: [],
            weather: [],
        };
        bindFunctions(this, 'handleDataLoaded');
    }

    handleDataLoaded(data) {
        this.setState(data);
    }

    render() {
        return (
            <div>
                <DataLoader
                    variable={this.props.variable}
                    year={this.props.year}
                    month={this.props.month}
                    onDataLoaded={this.handleDataLoaded}
                />
                <DataMap
                    baseline={this.state.baseline}
                    weather={this.state.weather}
                />
            </div>
        );
    }
}

DataViewer.propTypes = {
    variable: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
};

export default DataViewer;
