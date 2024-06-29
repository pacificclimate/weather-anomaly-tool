import HelpItem from "@/components/help/HelpItem";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import React from "react";
import usePublicFile from "@/state/query-hooks/use-public-file";
import Loading from "@/components/util/Loading";
import PropTypes from "prop-types";

export default function HelpItemFromFile({ item, index }) {
  const { data, isLoading, isError } = usePublicFile(item.filePath);

  const body = () => {
    if (isLoading) {
      return <Loading>Loading...</Loading>;
    }
    if (isError) {
      return <div>Sorry, there was an error loading this help.</div>;
    }
    return <Markdown rehypePlugins={[rehypeRaw]}>{data ?? item.body}</Markdown>;
  };

  return (
    <HelpItem
      index={index}
      target={<a href={"#"}>{item.title}</a>}
      title={`Help: ${item.title}`}
      backdrop={false}
      placement={item.placement}
      style={item.style}
    >
      {body()}
    </HelpItem>
  );
}

HelpItemFromFile.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.string,
}
