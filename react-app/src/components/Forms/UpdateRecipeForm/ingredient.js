import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ingredientInput.css";

const IngredientInput = ({ idx, returnDetails, oldIngredient }) => {
  const history = useHistory();
  const dispatch = useDispatch();

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
  useEffect(() => {
    returnDetails(idx, { measurement_type, quantity, ingredient, id });
  }, [measurement_type, quantity, ingredient, id]);

  // useEffect(() => {
  //   ing.push({
  //     quantity: quantity,
  //     measurement_type: measurement_type,
  //     ingredient: ingredient,
  //   });
  // }, [quantity, measurement_type, ingredient]);

  return (
    <div id="ingredient__input">
      <label>Quantity</label>
      <div>
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
