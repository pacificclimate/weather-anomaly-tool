import { ListGroup } from "react-bootstrap";
import React from "react";
import useConfigContext from "@/state/context-hooks/use-config-context";
import HelpItemFromFile from "@/components/help/HelpItemFromFile";

export default function Help() {
  const config = useConfigContext();
  return (
    <ListGroup horizontal={"xl"}>
      <ListGroup.Item className={"px-2 py-1"}>Help:</ListGroup.Item>
      {config.help.offcanvas.map((item, i) => (
        <HelpItemFromFile item={item} key={i} />
      ))}
    </ListGroup>
  );
}
