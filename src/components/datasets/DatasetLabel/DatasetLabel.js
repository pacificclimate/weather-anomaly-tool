import React from 'react';
import { useStore } from '../../../state-store';

export default function DatasetLabel({ dataset }) {
  const config = useStore(state => state.config);
  return (
    <span dangerouslySetInnerHTML={{
      __html: config?.datasets?.[dataset]?.label ?? dataset
    }}/>
  );
}
