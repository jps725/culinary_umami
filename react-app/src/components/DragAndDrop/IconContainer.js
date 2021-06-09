import React, { memo } from "react";
import { CuttingBoard } from "./CuttingBoard";
import { Box } from "./Box";

const style = {
  margin: "1.5rem",
  height: "20rem",
  width: "16rem",
  borderRadius: "8px",
  border: ".3rem ridge rgba(150,150,150,.6)",
  boxShadow: "1rem 1rem 1rem rgba(0, 0, 0, .6)",
  background: `linear-gradient(rgba(0,0,0,.05),rgba(0,0,0,.05)), url(${require(`../images/pexels-henry-&-co-2341290.jpeg`)})`,
};

export const IconContainer = memo(function Container() {
  return (
    <div>
      <div style={{ ...style, overflowY: "scroll", clear: "both" }}>
        <Box name="Apple" value="apple" image="apple" />
        <Box name="Banana" value="banana" image="banana" />
        <Box name="Beef" value="beef" image="beef" />
        <Box name="Blueberry" value="blueberry" image="blueberry" />
        <Box name="Bread" value="bread" image="bread" />
        <Box name="Broccoli" value="broccoli" image="broccoli" />
        <Box name="Carrot" value="carrot" image="carrot" />
        <Box name="Cheese" value="cheese" image="cheese" />
        <Box name="Cherry" value="cherry" image="cherry" />
        <Box name="Chicken" value="chicken" image="chicken" />
        <Box name="Chili" value="chili" image="chili" />
        <Box name="Chocolate" value="chocolate" image="chocolate" />
        <Box name="Corn" value="corn" image="corn" />
        <Box name="Crab" value="crab" image="crab" />
        <Box name="Egg" value="egg" image="egg" />
        <Box name="Eggplant" value="eggplant" image="eggplant" />
        <Box name="Fish" value="fish" image="fish" />
        <Box name="Garlic" value="garlic" image="garlic" />
        <Box name="Lemon" value="lemon" image="lemon" />
        <Box name="Lettuce" value="lettuce" image="lettuce" />
        <Box name="Lime" value="lime" image="lime" />
        <Box name="Onion" value="onion" image="onion" />
        <Box name="Pea" value="pea" image="pea" />
        <Box name="Pepper" value="pepper" image="pepper" />
        <Box name="Pineapple" value="pineapple" image="pineapple" />
        <Box name="Pork" value="pork" image="pork" />
        <Box name="Pumpkin" value="pumpkin" image="pumpkin" />
        <Box name="Strawberry" value="strawberry" image="strawberry" />
        <Box name="Tomato" value="tomato" image="tomato" />
        <Box name="Wine" value="wine" image="wine" />
      </div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        <CuttingBoard />
      </div>
    </div>
  );
});
