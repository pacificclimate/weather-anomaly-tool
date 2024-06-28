import { InfoCircle } from "react-bootstrap-icons";
import React, { useState } from "react";
import {Badge, Button, Offcanvas} from "react-bootstrap";

export default function HelpItem({
  target = <InfoCircle />,
  title,
  children,
  style,
  ...offcanvasProps
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow(!show);

  return (
    <>
      <span onClick={toggleShow}>{target}</span>
      <Offcanvas
        show={show}
        onHide={handleClose}
        style={style}
        {...offcanvasProps}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
