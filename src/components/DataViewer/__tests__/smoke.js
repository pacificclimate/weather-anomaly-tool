import React from 'react';
import ReactDOM from 'react-dom';
import DataViewer from '../DataViewer';
import moment from 'moment';

jest.mock('../../../data-services/weather-anomaly-data-service');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <DataViewer
      dataset={'anomaly'}
      variable={'precip'}
      date={moment([2000, 1])}
    />,
    div
  );
});
