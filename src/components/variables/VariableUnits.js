// Compose and present units of a variable

import React from "react";
import { useConfigContext } from "@/components/main/ConfigContext";
import PropTypes from "prop-types";
import VariableTitle from "@/components/variables/VariableTitle";

export default function VariableUnits({ variable }) {
  const config = useConfigContext();
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: config?.variables?.[variable]?.units ?? "bar",
      }}
    />
  );
}

VariableTitle.propTypes = {
  // Variable identifier
  variable: PropTypes.string.isRequired,
};
