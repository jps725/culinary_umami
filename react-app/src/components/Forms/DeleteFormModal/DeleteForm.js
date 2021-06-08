import React from "react";
import { useDispatch } from "react-redux";
import { deleteRecipe, getUserRecipes } from "../../../store/recipe";
import { useHistory } from "react-router-dom";

import "./deleteform.css";

const DeleteForm = ({ recipeId, userId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    dispatch(deleteRecipe(recipeId));
    // dispatch(getUserRecipes(userId));
    history.push("/profile");
  };

  return (
    <div className="delete__form">
      <fieldset>
        <legend>Delete Recipe</legend>
        <div className="delete__form--message">
          Are you sure, this action cannot be undone?
        </div>
        <div id="delete__button--div">
          <button onClick={handleDelete}>Delete</button>
        </div>
      </fieldset>
    </div>
  );
};

export default DeleteForm;
