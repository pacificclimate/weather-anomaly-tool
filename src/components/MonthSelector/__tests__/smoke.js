import React from 'react';
import ReactDOM from 'react-dom';
import MonthSelector from '../MonthSelector';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <MonthSelector
            value={1}
            onChange={() => {}}
        />,
        div
    );
});
