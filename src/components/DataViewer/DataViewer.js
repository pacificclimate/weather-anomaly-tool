import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataLoader from '../DataLoader';
import DataMap from '../DataMap';
import './DataViewer.css';

class DataViewer extends Component {
    render() {
        return (
            <div>
                <DataLoader
                    variable={this.props.variable}
                    year={this.props.year}
                    month={this.props.month}
                    onDataLoaded={() => null}
                />
                <DataMap baseline={[]} weather={[]}/>
            </div>
        )
    }
}

DataViewer.propTypes = {
    variable: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
};

export default DataViewer;
