import React from 'react';
import { useConfigContext } from '@/components/main/ConfigContext';

export default function DatasetLabel({ dataset }) {
  const config = useConfigContext();
  return (
    <span dangerouslySetInnerHTML={{
      __html: config?.datasets?.[dataset]?.label ?? dataset
    }}/>
  );
}
