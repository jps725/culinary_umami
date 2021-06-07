import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRecipe } from "../../../store/recipe";
import IngredientInput from "./ingredient";
import InstructionInput from "./instruction";
import "./recipeform.css";

const RecipeForm = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [servings, setServings] = useState(0);
  const [image_url, setImageUrl] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const user_id = user.id;

  const updateTitle = (e) => setTitle(e.target.value);
  const updateServings = (e) => setServings(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  // const reset = () => {
  //   setTitle("");
  //   setServings(0);
  //   setImageUrl("");
  //   setIngredients({});
  //   setInstruction({});
  // };

  const handleAddRecipe = (e) => {
    e.preventDefault();

    const recipe = {
      title,
      servings,
      image_url,
      instructions,
      ingredients,
      user_id,
    };

    dispatch(createRecipe(recipe));
    history.push("/profile");
  };

  const returnDetails = (idx, details) => {
    setIngredients([
      ...ingredients.slice(0, idx),
      details,
      ...ingredients.slice(idx + 1),
    ]);
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, {}]);
  };

  const returnMethods = (idx, methods) => {
    setInstructions([
      ...instructions.slice(0, idx),
      methods,
      ...instructions.slice(idx + 1),
    ]);
  };
  const handleAddInstruction = (e) => {
    e.preventDefault();
    setInstructions([...instructions, {}]);
  };

  return (
    <div className="recipe__form">
      <form onSubmit={handleAddRecipe}>
        <fieldset>
          <legend>Add a Recipe</legend>
          <div className="recipe__form--top">
            <div>
              <label>Title</label>
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
          <div className="recipe__ingredient--inputs">
            {ingredients.map((ingredient, idx) => (
              <IngredientInput
                key={idx}
                idx={idx}
                returnDetails={returnDetails}
              />
            ))}
            <button
              className="recipe__form--addbutton"
              onClick={handleAddIngredient}
            >
              + Ingredient
            </button>
          </div>
          <div className="recipe__form--button">
            <div className="recipe__instruction--inputs">
              {instructions.map((instruction, idx) => (
                <InstructionInput
                  key={idx}
                  idx={idx}
                  returnMethods={returnMethods}
                />
              ))}
              <button
                className="recipe__form--addbutton"
                onClick={handleAddInstruction}
              >
                + Instruction
              </button>
            </div>
          </div>
          <div className="recipe__form--buttoncontainer">
            <button className="recipe__form--submit" type="submit">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RecipeForm;
