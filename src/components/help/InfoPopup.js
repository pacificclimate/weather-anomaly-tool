import React from "react";
import PropTypes from "prop-types";

import "./InfoPopup.css";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { InfoCircle } from "react-bootstrap-icons";

function InfoPopup({
  label = <InfoCircle size={20} />,
  placement = "right",
  title,
  children,
  key,
}) {
  return (
    <OverlayTrigger
      key={key}
      placement={placement}
      trigger={"click"}
      overlay={
        <Popover id={title}>
          <Popover.Header>{title}</Popover.Header>
          <Popover.Body>{children}</Popover.Body>
        </Popover>
      }
    >
      {label}
    </OverlayTrigger>
  );
}

InfoPopup.propTypes = {
  placement: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
};

export default InfoPopup;
