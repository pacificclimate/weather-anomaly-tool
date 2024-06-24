import React from "react";
import { Container } from "react-bootstrap";

import logger from "@/logger";
import Header from "@/components/main/Header";
import Tool from "@/components/main/Tool";
import ConfigContext, {
  useFetchConfigContext,
} from "@/components/main/ConfigContext";

import "@/components/main/App.css";

logger.configure({ active: true });

function App() {
  // must be invoked before any other items dependent on context.
  const [config, configErrorMessage] = useFetchConfigContext({
    defaultConfig: {
      // TODO
    },
    requiredConfigKeys: [
      // TODO
    ],
  });

  if (configErrorMessage !== null) {
    // TODO: Improve presentation
    return (
      <div>
        <div>{configErrorMessage}</div>
      </div>
    );
  }

  if (config === null) {
    // TODO: Replace with spinner
    return <div>Loading configuration...</div>;
  }

  return (
    <ConfigContext.Provider value={config}>
      <Container fluid className="App">
        <Header />
        <Tool />
      </Container>
    </ConfigContext.Provider>
  );
}

export default App;
