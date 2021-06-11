import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import search, { recipeSearch } from "../../store/search";
import { useHistory } from "react-router-dom";
import SearchCard from "../SearchCard";
import DragAndDrop from "../DragAndDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getOneRecipe } from "../../store/recipe";
import { useSearchValue } from "../../context/SearchContext";

import "./search.css";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { searchValue } = useSearchValue();
  let searchDiv = (
    <div className="search__page--message">
      Search for Recipes by Ingredient
    </div>
  );
  if (searchValue) {
    searchDiv = (
      <div className="search__page--message">Searched for - {searchValue}</div>
    );
  }
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
        {searchDiv}
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
