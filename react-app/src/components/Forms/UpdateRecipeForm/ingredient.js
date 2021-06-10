import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./updateingredientInput.css";

const IngredientInput = ({ idx, returnDetails, oldIngredient }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // let prevIngredient = oldIngredient;

  const [quantity, setQuantity] = useState(oldIngredient.quantity);
  const [measurement_type, setMeasurementType] = useState(
    oldIngredient.measurement_type
  );
  const [ingredient, setIngredient] = useState(oldIngredient.ingredient);
  const id = oldIngredient.id;
  //   const [ingredients, setIngredients] = useState([]);
  const updateQuantity = (e) => setQuantity(e.target.value);
  const updateMeasurementType = (e) => setMeasurementType(e.target.value);
  const updateIngredient = (e) => setIngredient(e.target.value);
  //
  //

  const recipe_id = oldIngredient.recipe_id;
  useEffect(() => {
    console.log("--------running top use effect-------");
    if (
      oldIngredient.measurement_type !== measurement_type ||
      oldIngredient.quantity !== quantity ||
      oldIngredient.ingredient !== ingredient
    ) {
      console.log("----------inside if------------");
      returnDetails(idx, {
        measurement_type,
        quantity,
        ingredient,
        id,
        recipe_id,
      });
    }
  }, [measurement_type, quantity, ingredient, id, recipe_id]);

  useEffect(() => {
    console.log("=============================bnaanaannananan");
    setQuantity(oldIngredient.quantity);
    setMeasurementType(oldIngredient.measurement_type);
    setIngredient(oldIngredient.ingredient);
  }, [oldIngredient]);

  // useEffect(() => {
  //   ing.push({
  //     quantity: quantity,
  //     measurement_type: measurement_type,
  //     ingredient: ingredient,
  //   });
  // }, [quantity, measurement_type, ingredient]);

  return (
    <div className="ingredient__input">
      <div className="ingredient__input--div">
        <label>Quantity</label>

        <input
          className="ingredient__input--quantity"
          type="number"
          name="quantity"
          onChange={updateQuantity}
          value={quantity}
        ></input>
      </div>
      <label>Measurement</label>
      <div>
        <input
          type="text"
          name="measurement_type"
          onChange={updateMeasurementType}
          value={measurement_type}
        ></input>
      </div>
      <label>Ingredient</label>
      <div>
        <input
          type="text"
          name="ingredient"
          onChange={updateIngredient}
          value={ingredient}
        ></input>
      </div>
    </div>
  );
};

export default IngredientInput;
