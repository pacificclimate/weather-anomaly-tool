import React from "react";
import { SVGOverlay, useMap } from "react-leaflet";
import * as SVGLoaders from "svg-loaders-react";

export default function MapSpinner() {
  const map = useMap();
  return (
    <SVGOverlay bounds={map.getBounds()}>
      <SVGLoaders.Bars x="40%" y="40%" stroke="#98ff98" />
    </SVGOverlay>
  );
}
