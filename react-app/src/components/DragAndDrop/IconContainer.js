import React from "react";
import { memo } from "react";
import { CuttingBoard } from "./CuttingBoard";
import { Box } from "./Box";

export const IconContainer = memo(function Container() {
  return (
    <div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        <Box name="carrot" value="carrot" image="carrot" />
        <Box name="Salt" value="salt" image="carrot" />
        <Box name="Almond" value="almond" image="carrot" />
      </div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        <CuttingBoard />
      </div>
    </div>
  );
});
