import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from 'react-leaflet';
import MessageControl from '../';

it('renders without crashing', () => {
    const div = document.createElement('div');
    div.style.height = 100;
    ReactDOM.render(
        <Map>
            <MessageControl position='topright'>Test</MessageControl>
        </Map>,
        div
    );
});
