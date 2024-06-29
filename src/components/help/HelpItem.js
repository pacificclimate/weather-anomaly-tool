import { InfoCircle } from "react-bootstrap-icons";
import React, { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import PropTypes from "prop-types";

export default function HelpItem({
  target = <InfoCircle />,
  title,
  children,
  style,
  index,
  ...offcanvasProps
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow(!show);

  return (
    <div key={index}>
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
    </div>
  );
}

HelpItem.propTypes = {
  // Click target for hide/show help item
  target: PropTypes.element.isRequired,
  // Title of Offcanvas block
  title: PropTypes.node,
  // Body content of Offcanvas block
  children: PropTypes.node,
  // Offcanvas item styling
  style: PropTypes.object,
  // Key-like identifier for this item
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
