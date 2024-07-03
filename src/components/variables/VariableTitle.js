// Composes and presents a title for a variable from a dataset,
// with optional annotations.

import React from "react";
import PropTypes from "prop-types";
import compact from "lodash/fp/compact";
import flow from "lodash/fp/flow";
import { alternate, formatDate } from "@/components/utils";

import VariableLabel from "@/components/variables/VariableLabel";
import VariableUnits from "@/components/variables/VariableUnits";
import DatasetLabel from "@/components/datasets/DatasetLabel";

export default function VariableTitle({
  variable,
  dataset,
  date,
  withAnnotation = true,
  withUnits = true,
  withDate = true,
}) {
  const isBaseline = dataset === "baseline";
  const isAnomaly = dataset === "anomaly";
  const isRelative = variable === "precip" && isAnomaly;
  const suffixes = flow(
    compact,
    alternate("; "),
  )([
    withAnnotation && isAnomaly && "relative to baseline",
    withUnits && (isRelative ? "%" : <VariableUnits variable={variable} />),
  ]);
  return (
    <>
      <VariableLabel variable={variable} /> <DatasetLabel dataset={dataset} />{" "}
      {suffixes.length > 0 && <>({suffixes})</>}{" "}
      {withDate && <>for {formatDate(date, dataset)}</>}
    </>
  );
}

VariableTitle.propTypes = {
  // Variable identifier
  variable: PropTypes.string.isRequired,
  // Dataset identifier
  dataset: PropTypes.string.isRequired,
  // Date of dataset presented
  date: PropTypes.object.isRequired,
  // Add relative/absolute annotation for anomalies?
  withAnnotation: PropTypes.bool,
  // Add variable units annotation?
  withUnits: PropTypes.bool,
  // Add date?
  withDate: PropTypes.bool,
};
