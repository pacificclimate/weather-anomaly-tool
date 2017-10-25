import React from 'react';
import ReactDOM from 'react-dom';
import RealDataLoader from '../RealDataLoader';

jest.mock('../../../data-services/weather-anomaly-data-service');

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <RealDataLoader
            variable={'var'}
            year={2000}
            month={1}
            onDataWillLoad={() => {}}
            onDataDidLoad={() => {}}
            onDidCatch={() => {}}
        />,
        div
    );
});
