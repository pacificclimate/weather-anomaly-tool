import React from 'react';
import ReactDOM from 'react-dom';
import DataViewer from '../DataViewer';

jest.mock('../../../data-services/weather-anomaly-data-service');

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <DataViewer
            dataset={'anomaly'}
            variable={'precip'}
            year={2000}
            month={1}
        />,
        div
    );
});
