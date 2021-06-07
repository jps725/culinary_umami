import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneRecipe } from "../../store/recipe";
import { useParams } from "react-router-dom";

import "./singlerecipe.css";

const SingleRecipe = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeId = id;
  useEffect(() => {
    dispatch(getOneRecipe(recipeId));
  }, [dispatch, recipeId]);

  const recipe = useSelector((state) => state.recipes[recipeId]);

  if (!recipe) {
    return null;
  }
  return (
    <div className="recipe__container">
      <div className="recipe__title">{recipe.title}</div>
      <div className="recipe__servings">Servings: {recipe.servings}</div>
      <div className="recipe__middle">
        <div className="recipe__image--container">
          <img className="recipe__image" src={recipe.image_url} />
        </div>
        <div className="recipe__ingredients">
          <div className="recipe__label">Ingredients</div>
          {recipe.ingredients.map((ingredient) => (
            <div key={ingredient.id} className="recipe__ingredient">
              <div className="recipe__ingredient--number">
                {ingredient.quantity}
              </div>
              <div className="recipe__ingredient--measurement">
                {ingredient.measurement_type}
              </div>
              <div className="recipe__ingredient--name">
                {ingredient.ingredient}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recipe__instructions">
        <div className="recipe__label">Instructions</div>
        {recipe.instructions.map((instruction) => (
          <div key={instruction.id} className="recipe__instruction">
            <div className="recipe__instruction--step">
              {instruction.step_number}
            </div>
            <div className="recipe__instruction--method">
              {instruction.method}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleRecipe;
