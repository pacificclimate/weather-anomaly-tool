// Composes and presents a label for a variable.

import React from 'react';
import PropTypes from 'prop-types';
import { useConfigContext } from '@/components/main/ConfigContext';

export default function VariableLabel({ variable }) {
  const config = useConfigContext();
  return <span dangerouslySetInnerHTML={{
    __html: config?.variables?.[variable]?.label || `${variable}`
  }}/> ;
}

VariableLabel.propTypes = {
  // Variable identifier
  variable: PropTypes.string,
}
