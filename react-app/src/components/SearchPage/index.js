import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchCard from "../SearchCard";
import DragAndDrop from "../DragAndDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSearchValue } from "../../context/SearchContext";
import { NavLink } from "react-router-dom";
// import { clearSearch } from "../../store/search";
import "./search.css";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { searchValue, searchFlag, setSearchFlag } = useSearchValue();

  let searchDiv = (
    <div className="search__page--message">
      Search for Recipes by Ingredient
    </div>
  );

  const recipeList = useSelector((state) => Object.values(state.search));

  let recipes;

  // let noResult;
  // if (recipeList[0] === "0") {
  //   noResult = (
  //     <div className="search__page--message">
  //       Oops! It looks like we don't have any recipes with {searchValue}
  //     </div>
  //   );

  //   // setSearchFlag(false);
  //   // dispatch(clearSearch());
  // }

  if (recipeList[0] !== 0) {
    recipes = recipeList?.map((recipe) => (
      <div key={recipe.id} className="search__page--card">
        <SearchCard recipeId={recipe.id} />
      </div>
    ));
  } else {
    console.log("----------------");
    recipes = (
      <div className="search__page--card">
        <div className="searchCard__container">
          <NavLink to={`/addrecipe`} className="searchCard__navlink">
            <div
              className="searchCard__image--container"
              style={{ justifyContent: "center" }}
            >
              <img
                className="searchCard__image"
                alt="food"
                src={recipeList[1]}
                style={{ width: "8em" }}
              />
            </div>
            <div className="searchCard__title">{recipeList[2]}</div>
          </NavLink>
        </div>
      </div>
    );
  }

  if (searchValue) {
    searchDiv = (
      <div className="search__page--message">Searched for - {searchValue}</div>
    );
  }
  // if (searchValue && searchFlag && recipes.length === 0) {
  //   searchDiv = (
  //     <div className="search__page--message">
  //       Oops! It looks like we don't have any recipes with {searchValue}
  //     </div>
  //   );
  // }

  // let search = useSelector((state) => state.search);

  // if (searchValue && Object.keys(search).length === 0) {
  //   searchDiv = (
  //     <div className="search__page--message">
  //       Oops! It looks like we don't have any recipes with {searchValue}
  //     </div>
  //   );
  // }

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
