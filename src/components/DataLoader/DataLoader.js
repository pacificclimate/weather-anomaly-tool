import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './DataLoader.css';

class DataLoader extends Component {
    // Placeholder for loading data and calling back when loaded. No delay even.
    // This should be done in lifecycle hook `componentWillReceiveProps()`.
    componentDidMount() {
        this.props.onDataLoaded({
            baseline: [{}],
            weather: [{}],
        });
    }

    render() {
        return (
            <div>
                DataLoader: {this.props.variable};{this.props.year}-{this.props.month}&nbsp;
            </div>
        );
    }
}

DataLoader.propTypes = {
    variable: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onDataLoaded: PropTypes.func.isRequired,
};

export default DataLoader;
