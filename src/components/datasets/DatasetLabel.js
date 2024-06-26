// Composes and presents a label for a dataset

import React from "react";
import PropTypes from "prop-types";
import { useConfigContext } from "@/state/context-hooks/use-config-context";

export default function DatasetLabel({ dataset }) {
  const config = useConfigContext();
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: config?.datasets?.[dataset]?.label ?? dataset,
      }}
    />
  );
}

DatasetLabel.propTypes = {
  // Dataset identifier
  dataset: PropTypes.string,
};
