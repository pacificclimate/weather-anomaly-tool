import React from 'react';
import ReactDOM from 'react-dom';
import ThrottledInputRange from '../ThrottledInputRange';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <ThrottledInputRange
      value={1}
      onChange={() => {
      }}
    />,
    div
  );
});
