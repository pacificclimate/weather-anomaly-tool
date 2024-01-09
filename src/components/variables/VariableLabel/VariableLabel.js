import React from 'react';
import { useStore } from '../../../state-store';

export default function VariableLabel({ variable }) {
  const config = useStore(state => state.config);
  return <span dangerouslySetInnerHTML={{
    __html: config?.variables?.[variable]?.label || `${variable}`
  }}/> ;
}
