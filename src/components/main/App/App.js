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
  const isConfigLoaded = useStore(state => state.isConfigLoaded());
  const configError = useStore(state => state.configError);

  // Initialize must be invoked before any items dependent on config.
  // Done once, at startup.
  useEffect(() => {
    initialize({
      configOpts: {
          dfault: {
            // TODO
          },
          requiredKeys: [
            // TODO
          ],
        }
    });
  }, []);

  if (configError !== null) {
    // TODO: Improve presentation
    return (
      <div>
        <div>{configError}</div>
      </div>
    )
  }

  if (!isConfigLoaded) {
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
