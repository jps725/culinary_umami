import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { recipeSearch } from "../../store/search";
import { useDispatch } from "react-redux";
import { useSearchValue } from "../../context/SearchContext";

const style = {
  // border: "2px solid red",
  // backgroundColor: "yellow",
  padding: ".5rem 1rem",
  margin: ".75rem",
  height: "2rem",
  cursor: "grab",
  float: "left",
  backgroundSize: "cover",
};

export const Box = function Box({ name, value, image }) {
  const dispatch = useDispatch();
  const { searchValue, setSearchValue } = useSearchValue();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    value: { value },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        // alert(`Dropped ${item.name} onto ${dropResult.name}`);
        setSearchValue(value);
        dispatch(recipeSearch(value));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  const background = `url(${require(`../Icons/${image}.svg`)}) no-repeat center center`;
  return (
    <div
      ref={drag}
      role="Box"
      style={{ ...style, opacity, background }}
      data-testid={`box-${name}`}
    ></div>
  );
};
