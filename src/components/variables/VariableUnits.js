import React from 'react';
import { useConfigContext } from '@/components/main/ConfigContext';

export default function VariableUnits({ variable }) {
  const config = useConfigContext();
  return (
    <span dangerouslySetInnerHTML={{
      __html: config?.variables?.[variable]?.units ?? 'bar'
    }}/>
  );
}
