import React from 'react';
import ReactDOM from 'react-dom';
import RealDataLoader from '../RealDataLoader';
import moment from 'moment';

jest.mock('../../../data-services/weather-anomaly-data-service');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <RealDataLoader
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
