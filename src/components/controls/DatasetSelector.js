import React from 'react';
import PropTypes from 'prop-types';
import flow from 'lodash/fp/flow';
import keys from 'lodash/fp/keys';
import map from 'lodash/fp/map';

import DatasetLabel from '../datasets/DatasetLabel';
import RadioButtonSelector from './RadioButtonSelector';
import { useConfigContext } from '../main/ConfigContext';


function DatasetSelector(props) {
  const config = useConfigContext();
  const options = flow(
    keys,
    map(dataset =>
        ({ value: dataset, label: <DatasetLabel dataset={dataset}/> })
    ),
  )(config.datasets);
  return (
    <RadioButtonSelector name="dataset" options={options} {...props}/>
  );
}

DatasetSelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DatasetSelector;
