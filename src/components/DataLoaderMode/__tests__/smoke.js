import React from 'react';
import ReactDOM from 'react-dom';
import DataLoaderMode from '../DataLoaderMode';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <DataLoaderMode
      onChange={() => {
      }}
    />,
    div
  );
});
