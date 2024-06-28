import { Badge, Stack } from "react-bootstrap";
import React from "react";
import useConfigContext from "@/state/context-hooks/use-config-context";
import HelpItemFromFile from "@/components/help/HelpItemFromFile";

export default function Help() {
  const config = useConfigContext();
  return (
    <Stack
      direction={"horizontal"}
      gap={2}
      className={"px-2 py-1 my-1 lh-base border rounded"}
    >
      <div className={"text-secondary fw-bold"}>Help:</div>
      {config.help.offcanvas.map((item, i) => (
        <HelpItemFromFile item={item} key={i} />
      ))}
    </Stack>
  );
}
