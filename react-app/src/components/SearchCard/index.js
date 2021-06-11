import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./recipecard.css";

const SearchCard = ({ recipeId }) => {
  const recipe = useSelector((state) => state.search[recipeId]);
  // const numLikes = recipe.likes.length;
  if (!recipe) {
    return null;
  }
  return (
    <div className="searchCard__container">
      <NavLink to={`/recipe/${recipeId}`} className="searchCard__navlink">
        <div className="searchCard__image--container">
          <img
            className="searchCard__image"
            alt="food"
            src={recipe.image_url}
          />
        </div>
        <div className="searchCard__title">{recipe.title}</div>
        {/* <div className="searchCard__likes">Likes: {numLikes}</div> */}
      </NavLink>
    </div>
  );
};

export default SearchCard;
