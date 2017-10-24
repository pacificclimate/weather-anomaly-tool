import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { pick, bindFunctions } from '../utils';
// import DataLoader from '../DataLoader';
import TestDataLoader from '../TestDataLoader';
// import FakeDataLoader from '../FakeDataLoader';
import DataMap from '../DataMap';
import './DataViewer.css';

class DataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = DataViewer.noDataState;
        bindFunctions(this, 'handleDataWillLoad handleDataDidLoad');
    }

    handleDataWillLoad(data) {
        console.log('DataViewer.handleDataWillLoad', data);
        // this.setState(DataViewer.noDataState);
    }

    handleDataDidLoad(data) {
        console.log('DataViewer.handleDataDidLoad', data);
        this.setState(data);
    }

    render() {
        return (
            <div>
                <TestDataLoader
                    {...pick(this.props, 'variable year month')}
                    onDataWillLoad={this.handleDataWillLoad}
                    onDataDidLoad={this.handleDataDidLoad}
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

DataViewer.noDataState = {
    baseline: [],
    monthly: [],
};

export default DataViewer;
