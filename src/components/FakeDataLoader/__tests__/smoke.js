import React from 'react';
import ReactDOM from 'react-dom';
import FakeDataLoader from '../FakeDataLoader';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <FakeDataLoader
            variable={'var'}
            year={2000}
            month={1}
            onDataLoaded={() => null}
        />,
        div
    );
});
