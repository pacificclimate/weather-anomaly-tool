import React from 'react';
import ReactDOM from 'react-dom';
import DataLoader from '../DataLoader';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <DataLoader
            variable={'var'}
            year={2000}
            month={1}
            onDataLoaded={() => null}
        />,
        div
    );
});
