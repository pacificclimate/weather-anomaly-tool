import React from 'react';
import ReactDOM from 'react-dom';
import DataViewer from '../DataViewer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <DataViewer
            variable={'var'}
            year={2000}
            month={1}
        />,
        div
    );
});
