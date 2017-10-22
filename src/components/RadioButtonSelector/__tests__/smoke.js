import React from 'react';
import ReactDOM from 'react-dom';
import RadioButtonSelector from '../RadioButtonSelector';

it('renders without crashing', () => {
    const div = document.createElement('div');
    const optionNames = 'one two three'.split(' ');
    const options = optionNames.map((name, i) => ({value: i, label: name}));
    ReactDOM.render(
        <RadioButtonSelector
            name="test"
            options={options}
            onChange={() => {}}
        />,
        div
    );
});
