import React from "react";
import { Row, Col } from "react-bootstrap";
import logo from "@/components/main/logo.png";

import "@/components/main/Header.css";
import { useConfigContext } from "@/state/context-hooks/use-config-context";

export default function Header() {
  const config = useConfigContext();
  return (
    <Row className={"Header"}>
      <Col lg={3} className="text-left">
        <a href="https://pacificclimate.org/">
          <img
            src={logo}
            width="328"
            height="38"
            alt="Pacific Climate Impacts Consortium"
          />
        </a>
      </Col>
      <Col>
        <h1>{config.title}</h1>
      </Col>
      <Col lg={2} className="text-right">
        <p>Version: {config.appVersion}</p>
      </Col>
    </Row>
  );
}
