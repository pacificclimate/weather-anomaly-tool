import React from "react";
import { Container } from "react-bootstrap";

import logger from "@/logger";
import Loading from "@/components/util/Loading";
import Header from "@/components/main/Header";
import Tool from "@/components/main/Tool";
import { ConfigContext } from "@/state/context-hooks/use-config-context";
import useConfigDefaults from "@/state/client-server-hooks/use-config-defaults";

import "@/components/main/App.css";

logger.configure({ active: true });

export default function App() {
  const { data: config, isLoading, isError } = useConfigDefaults();

  if (isError) {
    return <div>An error occurred while loading the app configuration.</div>;
  }

  if (isLoading) {
    return <Loading>Loading configuration...</Loading>;
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
