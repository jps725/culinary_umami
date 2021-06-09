import React, { useState, useEffect, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recipeSearch } from "../../store/search";
import { useHistory } from "react-router-dom";
import SearchCard from "../SearchCard";
import DragAndDrop from "../DragAndDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./search.css";

export default function SearchPage() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const updateInput = (e) => setInput(e.target.value);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(recipeSearch(input));
  };

  const recipeList = useSelector((state) => Object.values(state.search));
  let recipes = [];
  if (recipeList) {
    recipes = recipeList?.map((recipe) => (
      <div key={recipe.id} className="search__page--card">
        <SearchCard recipeId={recipe.id} />
      </div>
    ));
  }

  if (!recipeList) {
    return null;
  }

  return (
    <div className="search__page--container">
      <div className="search__page--left">
        <form onSubmit={handleSearch} className="search__page--form">
          <input type="text" value={input} onChange={updateInput} />
          <button type="submit">Search</button>
        </form>
        <div className="searh__page--dnd">
          <DndProvider backend={HTML5Backend}>
            <DragAndDrop />
          </DndProvider>
        </div>
      </div>
      <div className="search__page--results">{recipes}</div>
    </div>
  );
}
