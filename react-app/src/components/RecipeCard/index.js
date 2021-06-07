import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneRecipe } from "../../store/recipe";
import { NavLink } from "react-router-dom";
import "./recipecard.css";

const RecipeCard = ({ recipeId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneRecipe(recipeId));
  }, [dispatch, recipeId]);

  const recipe = useSelector((state) => state.recipes[recipeId]);

  if (!recipe) {
    return null;
  }
  return (
    <NavLink to={`/recipe/${recipeId}`} className="recipeCard__navlink">
      <div className="recipeCard__container">
        <div className="recipeCard__image--container">
          <img className="recipeCard__image" src={recipe.image_url} />
        </div>
        <div className="recipeCard__title">{recipe.title}</div>
      </div>
    </NavLink>
  );
};

export default RecipeCard;
