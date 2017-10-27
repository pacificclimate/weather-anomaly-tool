import React from 'react';
import ReactDOM from 'react-dom';
import IncrementDecrement from '../';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <IncrementDecrement
            id="test"
            onDecrement={() => {}}
            onIncrement={() => {}}
        />,
        div
    );
});
