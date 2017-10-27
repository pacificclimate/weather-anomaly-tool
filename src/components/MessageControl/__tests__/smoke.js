import React from 'react';
import ReactDOM from 'react-dom';
import MessageControl from '../';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessageControl/>, div);
});
