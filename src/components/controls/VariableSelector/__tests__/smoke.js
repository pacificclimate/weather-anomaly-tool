import React from 'react';
import ReactDOM from 'react-dom';
import VariableSelector from '../VariableSelector';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <VariableSelector
      onChange={() => {
      }}
    />,
    div
  );
});
