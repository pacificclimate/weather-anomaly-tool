import { InfoCircle } from "react-bootstrap-icons";
import React, { useState } from "react";
import { ListGroup, Offcanvas } from "react-bootstrap";
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
    <ListGroup.Item key={index} onClick={toggleShow} className={"px-2 py-1"}>
      {target}
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
    </ListGroup.Item>
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
};
