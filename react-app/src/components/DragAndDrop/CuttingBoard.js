import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const style = {
  height: "14rem",
  width: "14rem",
  margin: "1.5rem",
  color: "black",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
  borderRadius: "8px",
  border: ".3rem ridge rgba(150,150,150,.6)",
  boxShadow: "1rem 1rem 1rem rgba(0, 0, 0, .6)",
  fontFamily: "Montserrat Alternates",
  // background: "url('../images/pexels-henry-&-co-2341290.jpeg')",
};

export const CuttingBoard = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: "CuttingBoard" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let background = `linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1)), url(${require(`../images/pexels-henry-&-co-2341290.jpeg`)})`;
  // if (isActive) {
  //   backgroundColor = "green";
  // } else if (canDrop) {
  //   backgroundColor = "pink";
  // }
  return (
    <div ref={drop} role={"CuttingBoard"} style={{ ...style, background }}>
      {isActive ? "Release to search" : "Drag an ingredient here"}
    </div>
  );
};
