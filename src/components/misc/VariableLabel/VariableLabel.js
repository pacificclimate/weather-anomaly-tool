import React from 'react';
import { useConfigContext } from '../../main/ConfigContext';

export default function VariableLabel({ variable }) {
  const config = useConfigContext();
  return <span dangerouslySetInnerHTML={{
    __html: config?.variables?.[variable]?.label || `${variable}`
  }}/> ;
}
