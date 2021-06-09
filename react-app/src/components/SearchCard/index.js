import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./recipecard.css";

const SearchCard = ({ recipeId }) => {
  const dispatch = useDispatch();

  const recipe = useSelector((state) => state.search[recipeId]);

  if (!recipe) {
    return null;
  }
  return (
    <div className="recipeCard__container">
      <NavLink to={`/recipe/${recipeId}`} className="recipeCard__navlink">
        <div className="recipeCard__image--container">
          <img className="recipeCard__image" src={recipe.image_url} />
        </div>
        <div className="recipeCard__title">{recipe.title}</div>
      </NavLink>
    </div>
  );
};

export default SearchCard;
