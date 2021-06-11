import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateRecipe, getOneRecipe } from "../../../store/recipe";
import IngredientInput from "./ingredient";
import "./updaterecipeform.css";

const UpdateRecipeForm = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeId = id;

  useEffect(() => {
    dispatch(getOneRecipe(recipeId));
  }, [dispatch, recipeId]);

  const recipe = useSelector((state) => state.recipes[recipeId]);

  const [title, setTitle] = useState("");
  const [servings, setServings] = useState(0);
  const [image_url, setImageUrl] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [errors, setErrors] = useState({});
  const [deleteFlag, setDeleteFlag] = useState(false);

  useEffect(() => {
    let errors = {};
    if (title.length < 5) {
      errors.title = "Title must be more than 5 characters";
    } else if (title.length > 100) {
      errors.title = "Title must be less than 100 characters";
    }
    if (servings < 1) {
      errors.servings = "Servings must be more than 0";
    }
    if (ingredients.length < 1) {
      errors.ingredients = "Please add an ingredient";
    }
    setErrors(errors);
  }, [title, servings, ingredients]);

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setServings(recipe.servings);
      setImageUrl(recipe.image_url);
      setIngredients(recipe.ingredients);
      setInstructions(recipe.instruction[0].method);
    }
  }, [recipe]);

  const user_id = user.id;
  const updateTitle = (e) => setTitle(e.target.value);
  const updateServings = (e) => setServings(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateInstructions = (e) => setInstructions(e.target.value);

  const handleUpdateRecipe = (e) => {
    e.preventDefault();

    const recipe = {
      title,
      servings,
      image_url,
      instructions,
      ingredients,
      id,
      user_id,
    };

    dispatch(updateRecipe(recipe));
    history.push(`/recipe/${recipeId}`);
  };

  const returnDetails = (idx, details) => {
    if (!deleteFlag) {
      setIngredients([
        ...ingredients.slice(0, idx),
        details,
        ...ingredients.slice(idx + 1),
      ]);
    } else {
      setDeleteFlag(false);
    }
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, {}]);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const idx = e.target.value;
    ingredients.splice(idx, 1);
    setIngredients([...ingredients]);
    // dispatch(deleteIngredient(id));
    // console.log(ingId);
    // if (ingId) {
    //   dispatch(deleteIngredient(ingId));

    setDeleteFlag(true);
  };

  if (!recipe) {
    return null;
  }

  return (
    <div className="recipe__form">
      <form onSubmit={handleUpdateRecipe}>
        <fieldset>
          <legend>Update a Recipe</legend>
          <div className="recipe__form--top">
            <div>
              <label>Title</label>
              {errors.title && (
                <div className="recipe__form--error">{errors.title}</div>
              )}
              <input
                className="recipe__form--input"
                type="text"
                name="title"
                onChange={updateTitle}
                value={title}
              ></input>
            </div>
            <div>
              <label>Image URL</label>
              {(errors.title || errors.servings) && <div></div>}
              <input
                className="recipe__form--input"
                type="text"
                name="image_url"
                onChange={updateImageUrl}
                value={image_url}
              ></input>
            </div>
            <div>
              <label>Servings</label>
              {errors.servings && (
                <div className="recipe__form--error">{errors.servings}</div>
              )}
              <input
                className="recipe__form--input"
                id="recipe__form--servings"
                type="number"
                name="servings"
                onChange={updateServings}
                value={servings}
              ></input>
            </div>
          </div>
          {errors.ingredient && (
            <div className="recipe__form--error">{errors.ingredient}</div>
          )}
          {ingredients.map((ingredient, idx) => (
            <div key={idx} className="recipe__ingredient--inputs">
              <IngredientInput
                key={idx}
                idx={idx}
                oldIngredient={ingredient}
                returnDetails={returnDetails}
              />
              <button
                className="ingredient__delete--button"
                value={idx}
                onClick={handleDelete}
              >
                X
              </button>
            </div>
          ))}
          <button
            className="recipe__form--addbutton"
            onClick={handleAddIngredient}
          >
            + Ingredient
          </button>
          <div className="updaterecipe__instruction--container">
            <label>Instructions</label>
            <textarea
              className="recipe__form--instruction"
              type="text"
              name="instructions"
              onChange={updateInstructions}
              value={instructions}
            ></textarea>
          </div>
          <div className="recipe__form--buttoncontainer">
            <button
              className="recipe__form--submit"
              type="submit"
              disabled={Object.keys(errors).length}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default UpdateRecipeForm;
