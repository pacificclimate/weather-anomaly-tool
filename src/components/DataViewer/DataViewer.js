import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { pick, bindFunctions } from '../utils';
import DataLoader from '../DataLoader';
import DataMap from '../DataMap';
import './DataViewer.css';

class DataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            baseline: [],
            monthly: [],
        };
        bindFunctions(this, 'handleDataLoaded');
    }

    handleDataLoaded(data) {
        console.log('DataViewer.handleDataLoaded', data)
        this.setState(data);
    }

    render() {
        return (
            <div>
                <DataLoader
                    {...pick(this.props, 'variable year month')}
                    onDataLoaded={this.handleDataLoaded}
                />
                <DataMap
                    dataset={this.props.dataset}
                    {...pick(this.state, 'baseline monthly')}
                />
            </div>
        );
    }
}

DataViewer.propTypes = {
    dataset: PropTypes.string.isRequired,
    variable: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
};

export default DataViewer;
