import React from 'react';
import ReactDOM from 'react-dom';
import Tool from '../Tool';

jest.mock('../../../../data-services/weather-anomaly-data-service');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tool/>, div);
});
