import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { pick, bindFunctions } from '../utils';
import TestDataLoader from '../TestDataLoader';
import FakeDataLoader from '../FakeDataLoader';
import RealDataLoader from '../RealDataLoader';
import DataMap from '../DataMap';
import './DataViewer.css';
import DataLoader from "../RealDataLoader/RealDataLoader";

class DataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = DataViewer.noDataState;
        bindFunctions(this, 'handleDataWillLoad handleDataDidLoad handleDidCatch');
    }

    handleDataWillLoad(data) {
        console.log('DataViewer.handleDataWillLoad', data);
        this.setState({
            ...DataViewer.noDataState,
            message: 'Data loading ...',
        });
    }

    handleDataDidLoad(data) {
        console.log('DataViewer.handleDataDidLoad', data);
        this.setState({
            ...data,
            message: null,
        });
    }

    handleDidCatch(error) {
        console.log('DataViewer.handleDidCatch', error);
        this.setState({
            message: 'Error loading data: ' + error.message,
        });
    }

    render() {
        return (
            <div>
                <RealDataLoader
                    {...pick(this.props, 'variable year month')}
                    onDataWillLoad={this.handleDataWillLoad}
                    onDataDidLoad={this.handleDataDidLoad}
                    onDidCatch={this.handleDidCatch}
                />
                <DataMap
                    {...{
                        ...pick(this.props, 'dataset variable'),
                        ...pick(this.state, 'baseline monthly message'),
                    }}
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
