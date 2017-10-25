import React from 'react';
import ReactDOM from 'react-dom';
import TestDataLoader from '../TestDataLoader';

jest.mock('../../../data-services/weather-anomaly-data-service');

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <TestDataLoader
            variable={'precip'}
            year={1990}
            month={6}
            onDataWillLoad={() => {}}
            onDataDidLoad={() => {}}
            onDidCatch={() => {}}
        />,
        div
    );
});
