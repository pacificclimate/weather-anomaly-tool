import React from 'react';
import ReactDOM from 'react-dom';
import FakeDataLoader from '../FakeDataLoader';
import moment from 'moment';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <FakeDataLoader
      variable={'var'}
      date={moment([2000, 1])}
      onDataWillLoad={() => {
      }}
      onDataDidLoad={() => {
      }}
      onDidCatch={() => {
      }}
    />,
    div
  );
});
