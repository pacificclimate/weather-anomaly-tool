import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/fp/flow';
import keys from 'lodash/fp/keys';
import map from 'lodash/fp/map';

import DatasetLabel from '../../datasets/DatasetLabel';
import RadioButtonSelector from '../RadioButtonSelector';
import { useStore } from '../../../state-store';


function DatasetSelector(props) {
  const config = useStore(state => state.config);

  // TODO: Memoize
  const options = flow(
    keys,
    map(dataset =>
        ({ value: dataset, label: <DatasetLabel dataset={dataset}/> })
    ),
  )(config.datasets);

  const dataset = useStore(state => state.dataset);
  const setDataset = useStore(state => state.setDataset);

  return (
    <RadioButtonSelector
      name="dataset"
      options={options}
      value={dataset}
      onChange={setDataset}
      styling={config.ui.datasetSelector.styling}
      {...props}
    />
  );
}

DatasetSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DatasetSelector;
