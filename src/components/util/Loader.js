import React from "react";
import * as SVGLoaders from "svg-loaders-react";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className={"my-5"}>
      <div>
        <SVGLoaders.Oval stroke="black">Hello</SVGLoaders.Oval>
      </div>
      <div className={"my-2 align-content-center"}>{message}</div>
    </div>
  );
}
