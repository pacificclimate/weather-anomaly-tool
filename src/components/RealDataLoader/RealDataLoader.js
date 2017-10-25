import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import _ from 'lodash';

import { getBaselineData, getMonthlyData } from '../../data-services/weather-anomaly-data-service';

import './RealDataLoader.css';

class DataLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    loadData({variable, year, month}) {
        console.log('DataLoader.loadData', this.state, this.props);

        this.setState({loading: true});
        this.props.onDataWillLoad();

        // This may be inefficient when only month changes
        const baselineP = getBaselineData(variable, month);
        const monthlyP = getMonthlyData(variable, year, month);
        Promise.all([baselineP, monthlyP]).then(([baseline, monthly]) => {
            console.log('DataLoader.loadData: data loaded, baseline', baseline)
            this.props.onDataDidLoad({baseline: baseline.data, monthly: monthly.data});
            this.setState({loading: false});
        }).catch(error => {
            this.props.onDidCatch(error);
            this.setState({loading: false});
        });
    }

    componentDidMount() {
        console.log('DataLoader.componentDidMount', this.props);
        this.loadData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log('DataLoader.componentWillReceiveProps', nextProps);
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

DataLoader.propTypes = {
    variable: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    render: PropTypes.bool,
    onDataWillLoad: PropTypes.func.isRequired,
    onDataDidLoad: PropTypes.func.isRequired,
};


DataLoader.defaultProps = {
    render: false,
};

export default DataLoader;
