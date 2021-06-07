import React from "react";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../../../store/recipe";
import { useHistory } from "react-router-dom";

const DeleteForm = ({ recipeId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = () => {
    dispatch(deleteRecipe(recipeId));
    history.push("/profile");
  };

  return (
    <div className="delete__form">
      <div className="delete__form--message">
        Are you sure you want to Delete this recipe?
      </div>
      <div className="delete__button--container">
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default DeleteForm;
