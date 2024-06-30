import React from "react";
import * as SVGLoaders from "svg-loaders-react";

export default function Loading({ children, ...rest }) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      {...rest}
    >
      <div>
        <SVGLoaders.Oval stroke="black">Hello</SVGLoaders.Oval>
      </div>
      <div className={"my-2 align-content-center"}>{children}</div>
    </div>
  );
}
