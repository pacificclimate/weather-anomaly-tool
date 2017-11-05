import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import _ from 'lodash';

import logger from '../../logger';
import withLifeCycleLogging from '../../HOCs/withLifeCycleLogging';
import { bindFunctions } from '../utils';
import { getBaselineData, getMonthlyData } from '../../data-services/weather-anomaly-data-service';

import './RealDataLoader.css';

class RealDataLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
        bindFunctions(this, 'dataDidLoad dataLoadError');
    }

    dataDidLoad([baseline, monthly]) {
        logger.log(this, 'baseline', baseline)
        this.props.onDataDidLoad({baseline: baseline.data, monthly: monthly.data});
        this.setState({loading: false});
    }

    dataLoadError(error) {
        logger.log(this);
        this.props.onDidCatch(error);
        this.setState({loading: false});
    }

    loadData({variable, year, month}) {
        logger.log(this, this.state, this.props);

        this.setState({loading: true});
        this.props.onDataWillLoad();

        // This may be inefficient when only month changes
        const baselineP = getBaselineData(variable, this.props.errorTest && month === 12 ? 13: month);
        const monthlyP = getMonthlyData(variable, year, month);
        Promise.all([baselineP, monthlyP]).then(this.dataDidLoad).catch(this.dataLoadError);
    }

    componentDidMount() {
        logger.log(this, this.props);
        this.loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        logger.log(this, nextProps);
        const checkKeys = 'variable year month'.split(' ');
        if (!_.isEqual(_.pick(nextProps, checkKeys), _.pick(this.props, checkKeys))) {
            this.loadData(nextProps);
        }
    }

    render() {
        return (
            this.props.render &&
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

RealDataLoader.propTypes = {
    variable: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    render: PropTypes.bool,
    errorTest: PropTypes.bool,
    onDataWillLoad: PropTypes.func.isRequired,
    onDataDidLoad: PropTypes.func.isRequired,
    onDidCatch: PropTypes.func.isRequired,
};


RealDataLoader.defaultProps = {
    render: false,
    errorTest: false,
};

export default withLifeCycleLogging.hoc()(RealDataLoader);
