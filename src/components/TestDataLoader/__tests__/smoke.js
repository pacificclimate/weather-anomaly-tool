import React from 'react';
import ReactDOM from 'react-dom';
import TestDataLoader from '../TestDataLoader';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TestDataLoader/>, div);
});
