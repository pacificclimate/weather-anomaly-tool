import React from 'react';
import ReactDOM from 'react-dom';
import DatasetSelector from '../DatasetSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <DatasetSelector
      onChange={() => {
      }}
    />,
    div
  );
});
