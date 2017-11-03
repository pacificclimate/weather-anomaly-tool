import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logger from '../../logger';
import { pick, bindFunctions } from '../utils';
import TestDataLoader from '../TestDataLoader';
// import FakeDataLoader from '../FakeDataLoader';
import RealDataLoader from '../RealDataLoader';
import DataMap from '../DataMap';
import './DataViewer.css';

class DataViewer extends Component {
    constructor(props) {
        super(props);
        this.state = DataViewer.noDataState;
        bindFunctions(this, 'handleDataWillLoad handleDataDidLoad handleDidCatch');
    }

    handleDataWillLoad(data) {
        logger.log(this, data);
        this.setState({
            ...DataViewer.noDataState,
            message: 'Data loading ...',
        });
        this.props.onDataWillLoad();
    }

    handleDataDidLoad(data) {
        logger.log(this, data);
        this.setState({
            ...data,
            message: null,
        });
        this.props.onDataDidLoad(data);
    }

    handleDidCatch(error) {
        logger.log(this, error);
        this.setState({
            message: 'Error loading data: ' + error.message,
        });
        this.props.onDataDidCatch(error);
    }

    render() {
        return (
            <div>
                <TestDataLoader
                    {...pick(this.props, 'variable year month')}
                    onDataWillLoad={this.handleDataWillLoad}
                    onDataDidLoad={this.handleDataDidLoad}
                    onDidCatch={this.handleDidCatch}
                    errorTest
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
    onDataWillLoad: PropTypes.func,
    onDataDidLoad: PropTypes.func,
    onDataDidCatch: PropTypes.func,
};

DataViewer.noDataState = {
    baseline: [],
    monthly: [],
};

export default DataViewer;
