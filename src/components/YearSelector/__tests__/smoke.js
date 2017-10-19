import React from 'react';
import ReactDOM from 'react-dom';
import YearSelector from '../YearSelector';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <YearSelector
            start={1900} end={1920} defaultValue={1910}
            onChange={() => {}}
        />,
        div
    );
});
