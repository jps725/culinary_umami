import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneRecipe } from "../../store/recipe";
import { useParams, NavLink } from "react-router-dom";
import DeleteFormModal from "../Forms/DeleteFormModal";
import Likes from "../Likes";

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
    <div className="recipe__page">
      <div className="recipe__container">
        <div className="recipe__title">{recipe.title}</div>
        <div className="recipe__subTitle--container">
          <div className="recipe__subTitle--servingContainer">
            <div className="recipe__servings">Servings: {recipe.servings}</div>
            <div className="recipe__source">
              <a href={recipe.source_url}>Creator</a>
            </div>
          </div>
          <div className="recipe__likes">
            <Likes userId={userId} recipeId={recipeId} />
          </div>
        </div>
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
          <div className="recipe__method">{recipe.instruction[0].method} </div>
        </div>
        <div className="recipe__button--container">
          <div className="recipe__button">
            {render && (
              <NavLink
                to={`/editrecipe/${recipeId}`}
                className="recipe__edit--button"
              >
                Edit Recipe
              </NavLink>
            )}
          </div>
          <div className="recipe__button">
            {render && <DeleteFormModal userId={userId} recipeId={recipeId} />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SingleRecipe;
