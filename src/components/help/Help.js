import { Stack } from "react-bootstrap";
import HelpItem from "@/components/help/HelpItem";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import React from "react";
import useConfigContext from "@/state/context-hooks/use-config-context";

export default function Help() {
  const config = useConfigContext();
  return (
    <Stack direction={"horizontal"} gap={2}>
      <div>Help:</div>
      {config.help.offcanvas.map((item, i) => (
        <HelpItem
          key={i}
          target={<a href={"#"}>{item.title}</a>}
          title={`Help: ${item.title}`}
          backdrop={false}
          placement={item.placement}
          style={item.style}
        >
          <Markdown rehypePlugins={[rehypeRaw]}>{item.body}</Markdown>
        </HelpItem>
      ))}
    </Stack>
  );
}
