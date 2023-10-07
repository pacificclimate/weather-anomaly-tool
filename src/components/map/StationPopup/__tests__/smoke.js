import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { Popup } from 'react-leaflet';

import StationPopup from '../StationPopup';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(
    <StationPopup 
      variable="precip" 
      dataset="anomaly" 
      station={{
        network_name: "network_name",
        station_name: "station_name",
        station_native_id: "station_native_id",
        lon: -123.456,
        lat: 51.234,
        elevation: 123,
        datum: 90,
        statistic: 91,
        data_coverage: 0.987,
        anomaly: 9,
        departure: 0.123,
      }}
    />
  );
  const result = renderer.getRenderOutput();
  expect(result.type).toBe(Popup);
});
