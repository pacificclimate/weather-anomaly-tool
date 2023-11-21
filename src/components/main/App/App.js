import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import logger from '../../../logger';
import Header from '../Header';
import Tool from '../Tool'

import './App.css';
import { useStore } from '../../../state-store';

logger.configure({ active: true });

function App() {
  const initialize = useStore(state => state.initialize);
  const config = useStore(state => state.config);
  const configErrorMessage = useStore(state => state.configError);

  // Initialize must be invoked before any items dependent on context.
  useEffect(() => {
    initialize({
        defaultConfig: {
          // TODO
        },
        requiredConfigKeys: [
          // TODO
        ],
      });
  });

  // Now in state store
  // must be invoked before any other items dependent on context.
  // const [config, configErrorMessage] = useFetchConfigContext({
  //   defaultConfig: {
  //     // TODO
  //   },
  //   requiredConfigKeys: [
  //     // TODO
  //   ],
  // });

  if (configErrorMessage !== null) {
    // TODO: Improve presentation
    return (
      <div>
        <div>{configErrorMessage}</div>
      </div>
    )
  }

  if (config === null) {
    // TODO: Replace with spinner
    return <div>Loading configuration...</div>
  }

  return (
    <Container fluid className="App">
      <Header/>
      <Tool/>
    </Container>
  );
}

export default App;
