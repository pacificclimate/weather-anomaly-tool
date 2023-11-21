import React from 'react';
import { useStore } from '../../../state-store';

export default function VariableUnits({ variable }) {
  const config = useStore(state => state.config);
  return (
    <span dangerouslySetInnerHTML={{
      __html: config?.variables?.[variable]?.units ?? 'bar'
    }}/>
  );
}
