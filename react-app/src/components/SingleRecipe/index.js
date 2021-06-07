import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneRecipe } from "../../store/recipe";
import { useParams, NavLink } from "react-router-dom";
import DeleteFormModal from "../Forms/DeleteFormModal";

import "./singlerecipe.css";

const SingleRecipe = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeId = id;

  useEffect(() => {
    dispatch(getOneRecipe(recipeId));
  }, [dispatch]);

  const recipe = useSelector((state) => state.recipes[recipeId]);
  const userId = useSelector((state) => state.session.user.id);
  // const location = useLocation();
  // const { recipe } = location.recipe;
  // console.log(recipe);

  let render = false;
  if (userId === recipe?.user_id) {
    render = true;
  }

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
      <div className="recipe__edit--button">
        {render && (
          <NavLink to={`/editrecipe/${recipeId}`}>Edit Recipe</NavLink>
        )}
      </div>
      <div className="recipe__delete--button">
        {render && <DeleteFormModal recipeId={recipeId} />}
      </div>
    </div>
  );
};
export default SingleRecipe;
