import React from "react";
import { SVGOverlay, useMap } from "react-leaflet";
import * as SVGLoaders from "svg-loaders-react";

export default function MapSpinner({ children }) {
  const map = useMap();
  return (
    <SVGOverlay bounds={map.getBounds()}>
      <SVGLoaders.Bars x="40%" y="40%" stroke="#98ff98" />
      // Using SVG text is the easiest way to display in a message. We are
      having trouble // with pcic-react-leaflet-components StaticControl, which
      would be the other way.
      <svg>
        <text fontSize={"1.2em"} x="45%" y="68%" textAnchor={"middle"}>
          {children}
        </text>
      </svg>
    </SVGOverlay>
  );
}
