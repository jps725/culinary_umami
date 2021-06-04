import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneRecipe } from "../../store/recipe";
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
    <div className="recipeCard__container">
      <div className="recipeCard__title">{recipe.title}</div>
      <div className="recipeCard__middle">
        <div className="recipeCard__images--container">
          {recipe.images.map((image) => (
            <div key={image.id} className="recipeCard__image--container">
              <img className="recipeCard__image" src={image.image_url} />
            </div>
          ))}
        </div>
        <div className="recipeCard__ingredients">
          <div className="recipeCard__label">Ingredients</div>
          {recipe.ingredients.map((ingredient) => (
            <div key={ingredient.id} className="recipeCard__ingredient">
              <div className="recipeCard__ingredient--number">
                {ingredient.quantity}
              </div>
              <div className="recipeCard__ingredient--measurement">
                {ingredient.measurement_type}
              </div>
              <div className="recipeCard__ingredient--name">
                {ingredient.ingredient}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recipeCard__instructions">
        <div className="recipeCard__label">Instructions</div>
        {recipe.instructions.map((instruction) => (
          <div key={instruction.id} className="recipeCard__instruction">
            <div className="recipeCard__instruction--step">
              {instruction.step_number}
            </div>
            <div className="recipeCard__instruction--method">
              {instruction.method}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
