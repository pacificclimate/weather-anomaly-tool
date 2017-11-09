import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import logger from '../../logger';
import withLifeCycleLogging from '../../HOCs/withLifeCycleLogging';
import { pick, bindFunctions } from '../utils';
import TestDataLoader from '../TestDataLoader';
import FakeDataLoader from '../FakeDataLoader';
import RealDataLoader from '../RealDataLoader';
import DataMap from '../DataMap';
import './DataViewer.css';

const DataLoader = {
    'test': TestDataLoader,
    'fake': FakeDataLoader,
    'real': RealDataLoader,
}[process.env.DATA_LOADER || 'real'];

class DataViewer extends PureComponent {
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
                <DataLoader
                    {...pick(this.props, 'variable year month')}
                    onDataWillLoad={this.handleDataWillLoad}
                    onDataDidLoad={this.handleDataDidLoad}
                    onDidCatch={this.handleDidCatch}
                    errorTest
                />
                <DataMap
                    {...pick(this.props, 'dataset variable')}
                    {...pick(this.state, 'baseline monthly message')}
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

DataViewer.defaultProps ={
    onDataWillLoad: () => {},
    onDataDidLoad: () => {},
    onDataDidCatch: () => {},
};

DataViewer.noDataState = {
    baseline: [],
    monthly: [],
};

export default withLifeCycleLogging.hoc()(DataViewer);
