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
  //   const [ingredients, setIngredients] = useState([]);
  const updateQuantity = (e) => setQuantity(e.target.value);
  const updateMeasurementType = (e) => setMeasurementType(e.target.value);
  const updateIngredient = (e) => setIngredient(e.target.value);
  //
  //
  useEffect(() => {
    returnDetails(idx, { measurement_type, quantity, ingredient });
  }, [measurement_type, quantity, ingredient]);

  useEffect(() => {
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

  const handleDelete = (e) => {
    e.preventDefault();
    // const idx = e.target.value;
    // console.log(ingredients);
    // console.log(idx);
    // ingredients.splice(idx, 1);
    // setIngredients([...ingredients]);
    // console.log(ingredients);
    console.log(idx);
    // setIngredients([...ingredients.slice(idx), ...ingredients.slice(idx + 1)]);
  };

  return (
    <div className="ingredient__input">
      <div className="ingredient__input--div">
        <label>Amount</label>
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
        <input
          type="text"
          name="measurement_type"
          onChange={updateMeasurementType}
          value={measurement_type}
        ></input>
      </div>
      <div className="ingredient__input--div">
        <label>Name</label>
        <input
          type="text"
          name="ingredient"
          onChange={updateIngredient}
          value={ingredient}
        ></input>
      </div>
      {/* <button
        className="ingredient__delete--button"
        value={idx}
        onClick={handleDelete}
      >
        X
      </button> */}
    </div>
  );
};

export default IngredientInput;
