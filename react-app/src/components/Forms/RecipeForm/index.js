import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createRecipe } from "../../../store/recipe";
import IngredientInput from "./ingredient";
import "./recipeform.css";

const RecipeForm = ({ user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [servings, setServings] = useState(0);
  const [image_url, setImageUrl] = useState("");
  // individual ingredient
  // const [quantity, setQuantity] = useState([]);
  // const [measurement_type, setMeasurementType] = useState([]);
  // const [ingredient, setIngredient] = useState([]);

  const [instruction, setInstruction] = useState({});

  const [ingredients, setIngredients] = useState([]);
  const instructions = [];

  const user_id = user.id;
  // on the click of a button to add a new ingredient or instruction
  // reset state and push to array
  // index counter
  // update object in parent component to hold new values on change of state
  // prevstate ...

  const reset = () => {
    setTitle("");
    setServings(0);
    setImageUrl("");
    setIngredients({});
    setInstruction({});
  };

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
  };

  const updateTitle = (e) => setTitle(e.target.value);
  const updateServings = (e) => setServings(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  // const updateQuantity = (e) => setQuantity(e.target.value);
  // const updateMeasurementType = (e) => setMeasurementType(e.target.value);
  // const updateIngredient = (e) => setIngredient(e.target.value);

  // ingredients: [{quantity:1, measurement_type: "", ingredient:""}, {}, {}]
  // create input component for ingredients and instructions
  // state counter
  // set measurements

  //add field = () =
  // returndetails= (idx, details) -> {
  //   setingredients ([
  //     ...ing.slice(0.idx),
  //     details,
  //     ...ing.slice(idx+1)
  //   ])
  //   // addbutton fucn = () =->{
  //     setIngredient ([...ingredietns, {}])
  //   }
  // }
  // ingrdients.map((ing, idx) =>=>{
  //   return <comp key={idx} idsx={}idx returnDetials={returnDeta}</comp>
  // })
  //
  //

  const [ingInputs, setIngInputs] = useState([]);
  let ing = [];
  const handleAddIngredient = (e) => {
    e.preventDefault();
    setIngInputs(
      ingInputs.concat(<IngredientInput ing={ing} key={ingInputs.length} />)
    );
    console.log("===========================", ingInputs);
  };
  return (
    <div className="recipe__form">
      <form onSubmit={handleAddRecipe}>
        <fieldset>
          <legend>Add a Recipe</legend>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              onChange={updateTitle}
              value={title}
            ></input>
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              name="image_url"
              onChange={updateImageUrl}
              value={image_url}
            ></input>
          </div>
          <div>
            <label>Servings</label>
            <input
              type="number"
              name="servings"
              onChange={updateServings}
              value={servings}
            ></input>
          </div>
          {/* ingredient quantity measurment_type ingredient */}
          <div id="ingredient__inputs">{ingInputs}</div>
          <button onClick={handleAddIngredient}>Add Ingredient</button>
          <div className="recipe__form--button">
            <button type="submit">Submit</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RecipeForm;
