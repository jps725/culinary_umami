import React, { useState, useEffect } from "react";
import "./ingredientInput.css";

const IngredientInput = ({ idx, returnDetails, oldIngredient }) => {
  const [quantity, setQuantity] = useState(oldIngredient.quantity);
  const [measurement_type, setMeasurementType] = useState(
    oldIngredient.measurement_type
  );
  const [ingredient, setIngredient] = useState(oldIngredient.ingredient);
  const [errors, setErrors] = useState({});

  const updateQuantity = (e) => setQuantity(e.target.value);
  const updateMeasurementType = (e) => setMeasurementType(e.target.value);
  const updateIngredient = (e) => setIngredient(e.target.value);

  useEffect(() => {
    returnDetails(idx, { measurement_type, quantity, ingredient });
  }, [measurement_type, quantity, ingredient]);

  useEffect(() => {
    setQuantity(oldIngredient.quantity);
    setMeasurementType(oldIngredient.measurement_type);
    setIngredient(oldIngredient.ingredient);
  }, [oldIngredient]);

  useEffect(() => {
    let errors = {};
    if (quantity < 0) {
      errors.quantity = "Quantity must be more that 0";
    }
    if (!measurement_type) {
      errors.measurement_type = "Please enter a unit type";
    }
    if (!ingredient) {
      errors.ingredient = "Please enter an ingredient";
    }
    setErrors(errors);
  }, [quantity, measurement_type, ingredient]);

  return (
    <div className="ingredient__input">
      <div className="ingredient__input--div">
        <label>Amount</label>
        {errors.quantity && (
          <div className="recipe__form--error">{errors.quantity}</div>
        )}
        {(errors.measurement_type || errors.name) && <div></div>}
        <input
          className="ingredient__input--quantity"
          type="number"
          name="quantity"
          min="0"
          onChange={updateQuantity}
          value={quantity}
        ></input>
      </div>
      <div className="ingredient__input--div">
        <label>Unit</label>
        {errors.measurement_type && (
          <div className="recipe__form--error">{errors.measurement_type}</div>
        )}
        <input
          type="text"
          name="measurement_type"
          onChange={updateMeasurementType}
          value={measurement_type}
        ></input>
      </div>
      <div className="ingredient__input--div">
        <label>Name</label>
        {errors.ingredient && (
          <div className="recipe__form--error">{errors.ingredient}</div>
        )}
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
