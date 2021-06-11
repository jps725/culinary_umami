import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchCard from "../SearchCard";
import DragAndDrop from "../DragAndDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSearchValue } from "../../context/SearchContext";

import "./search.css";

export default function SearchPage() {
  const { searchValue } = useSearchValue();
  let searchDiv = (
    <div className="search__page--message">
      Search for Recipes by Ingredient
    </div>
  );
  let noResult;
  const recipeList = useSelector((state) => Object.values(state.search));
  let recipes = [];

  if (recipeList) {
    recipes = recipeList?.map((recipe) => (
      <div key={recipe.id} className="search__page--card">
        <SearchCard recipeId={recipe.id} />
      </div>
    ));
  }

  if (searchValue) {
    searchDiv = (
      <div className="search__page--message">Searched for - {searchValue}</div>
    );
  }

  let search = useSelector((state) => state.search);

  if (searchValue && Object.keys(search).length === 0) {
    searchDiv = (
      <div className="search__page--message">
        Oops! It looks like we don't have any recipes with {searchValue}
      </div>
    );
  }

  if (!recipeList) {
    return null;
  }

  return (
    <div className="search__page--container">
      <div className="search__page--left">
        {searchDiv}
        {noResult}
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
