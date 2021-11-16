import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import { Popup } from 'react-leaflet';

import StationPopup from '../StationPopup';

it('renders without crashing', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<StationPopup/>);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe(Popup);
});
