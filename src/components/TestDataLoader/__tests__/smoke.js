import React from 'react';
import ReactDOM from 'react-dom';
import TestDataLoader from '../TestDataLoader';
import moment from 'moment';

jest.mock('../../../data-services/weather-anomaly-data-service');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TestDataLoader
      variable={'precip'}
      date={moment([1990, 6])}
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
