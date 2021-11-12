import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import logger from '../../logger';
import { bindFunctions } from '../utils';
import {
  getBaselineData,
  getMonthlyData
} from '../../data-services/weather-anomaly-data-service';

import './RealDataLoader.css';

export default class RealDataLoader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    bindFunctions(this, 'dataDidLoad dataLoadError');
  }

  dataDidLoad([baseline, monthly]) {
    logger.log(this, 'baseline', baseline)
    this.props.onDataDidLoad({
      baseline: baseline.data,
      monthly: monthly.data
    });
    this.setState({ loading: false });
  }

  dataLoadError(error) {
    logger.log(this);
    this.props.onDidCatch(error);
    this.setState({ loading: false });
  }

  loadData({ variable, date }) {
    logger.log(this, this.state, this.props);

    this.setState({ loading: true });
    this.props.onDataWillLoad();

    // TODO: Don't reload baseline data when month doesn't change
    const baselineP = getBaselineData(variable, date);
    const monthlyP = getMonthlyData(variable, date);
    Promise.all([baselineP, monthlyP])
    .then(this.dataDidLoad)
    .catch(this.dataLoadError);
  }

  componentDidMount() {
    logger.log(this, this.props);
    this.loadData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    logger.log(this, nextProps);
    if (
      nextProps.variable !== this.props.variable ||
      !nextProps.date.isSame(this.props.date)
    ) {
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
          {this.state.loading ?
            <span>Loading... </span> :
            <span>Data: </span>
          }
          <span>
                        {this.props.variable};
            {this.props.date.year()}-{this.props.date.month() + 1}
                    </span>
        </Row>
      </div>
    );
  }
}

RealDataLoader.propTypes = {
  variable: PropTypes.string.isRequired,
  date: PropTypes.object.isRequired,
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
