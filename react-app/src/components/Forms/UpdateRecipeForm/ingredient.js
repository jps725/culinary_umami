import React, { useState, useEffect } from "react";
import "./updateingredientInput.css";

const IngredientInput = ({ idx, returnDetails, oldIngredient }) => {
  const [quantity, setQuantity] = useState(oldIngredient.quantity);
  const [measurement_type, setMeasurementType] = useState(
    oldIngredient.measurement_type
  );
  const [ingredient, setIngredient] = useState(oldIngredient.ingredient);
  const [errors, setErrors] = useState({});
  const id = oldIngredient.id;

  const updateQuantity = (e) => setQuantity(e.target.value);
  const updateMeasurementType = (e) => setMeasurementType(e.target.value);
  const updateIngredient = (e) => setIngredient(e.target.value);

  const recipe_id = oldIngredient.recipe_id;

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

  useEffect(() => {
    if (
      oldIngredient.measurement_type !== measurement_type ||
      oldIngredient.quantity !== quantity ||
      oldIngredient.ingredient !== ingredient
    ) {
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
    setQuantity(oldIngredient.quantity);
    setMeasurementType(oldIngredient.measurement_type);
    setIngredient(oldIngredient.ingredient);
  }, [oldIngredient]);

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
          onChange={updateQuantity}
          value={quantity}
        ></input>
      </div>
      <div className="ingredient__input--div">
        <label>Unit</label>
        {errors.measurement_type && (
          <div className="recipe__form--error">{errors.measurement_type}</div>
        )}
        {(errors.quantity || errors.name) && <div></div>}
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
        {(errors.measurement_type || errors.quantity) && <div></div>}
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
