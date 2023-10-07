import React from 'react';
import ReactDOM from 'react-dom';
import DataMap from '../DataMap';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <DataMap
      dataset={'baseline'}
      variable={'precip'}
      baseline={[]}
      monthly={[]}
    />,
    div
  );
});
