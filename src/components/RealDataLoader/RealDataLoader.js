import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import _ from 'lodash';

import { getBaselineData, getMonthlyData } from '../../data-services/weather-anomaly-data-service';

import './RealDataLoader.css';

class RealDataLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    loadData({variable, year, month}) {
        console.log('RealDataLoader.loadData', this.state, this.props);

        this.setState({loading: true});
        this.props.onDataWillLoad();

        // This may be inefficient when only month changes
        const baselineP = getBaselineData(variable, this.props.errorTest && month === 12 ? 13: month);
        const monthlyP = getMonthlyData(variable, year, month);
        Promise.all([baselineP, monthlyP]).then(([baseline, monthly]) => {
            console.log('RealDataLoader.loadData: data loaded, baseline', baseline)
            this.props.onDataDidLoad({baseline: baseline.data, monthly: monthly.data});
            this.setState({loading: false});
        }).catch(error => {
            this.props.onDidCatch(error);
            this.setState({loading: false});
        });
    }

    componentDidMount() {
        console.log('RealDataLoader.componentDidMount', this.props);
        this.loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('RealDataLoader.componentWillReceiveProps', nextProps);
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

export default RealDataLoader;
