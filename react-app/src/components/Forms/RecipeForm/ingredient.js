import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./ingredientInput.css";

const IngredientInput = ({ ing }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState([]);
  const [measurement_type, setMeasurementType] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  //   const [ingredients, setIngredients] = useState([]);
  const updateQuantity = (e) => setQuantity(e.target.value);
  const updateMeasurementType = (e) => setMeasurementType(e.target.value);
  const updateIngredient = (e) => setIngredient(e.target.value);
//
//
//useefect (() =>{
    returndetials(idx, {measure, quant, type})
    []measurement_type, quatn,
})
//
  useEffect(() => {
    ing.push({
      quantity: quantity,
      measurement_type: measurement_type,
      ingredient: ingredient,
    });
  }, [quantity, measurement_type, ingredient]);

  return (
    <div id="ingredient__input">
      <div>
        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          onChange={updateQuantity}
          value={quantity}
        ></input>
      </div>
      <div>
        <label>Measurement</label>
        <input
          type="text"
          name="measurement_type"
          onChange={updateMeasurementType}
          value={measurement_type}
        ></input>
      </div>
      <div>
        <label>Ingredient</label>
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
