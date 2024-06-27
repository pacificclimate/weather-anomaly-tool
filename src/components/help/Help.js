import { Stack } from "react-bootstrap";
import HelpItem from "@/components/help/HelpItem";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import React from "react";
import useConfigContext from "@/state/context-hooks/use-config-context";
import usePublicFile from "@/state/query-hooks/use-public-file";
import HelpItemFromFile from "@/components/help/HelpItemFromFile";

export default function Help() {
  const config = useConfigContext();
  return (
    <Stack direction={"horizontal"} gap={2}>
      <div>Help:</div>
      {config.help.offcanvas.map((item, i) => (
        <HelpItemFromFile item={item} key={i} />
      ))}
    </Stack>
  );
}
