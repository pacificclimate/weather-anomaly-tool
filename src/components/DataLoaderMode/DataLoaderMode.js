import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { pick } from '../utils';
import RadioButtonSelector from '../RadioButtonSelector';

import './DataLoaderMode.css';

class DataLoaderMode extends Component {
  render() {
    const modes = [
      { value: 'fake', label: 'Fake', },
      { value: 'real', label: 'Real', },
    ];
    return (
      <RadioButtonSelector
        name="dataloader-mode"
        options={modes}
        {...pick(this.props, 'value onChange')}
      />
    );
  }
}

DataLoaderMode.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default DataLoaderMode;
