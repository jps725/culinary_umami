import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RecipeCard from "../RecipeCard";
import { getUserRecipes } from "../../store/recipe";

import "./profile.css";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const recipeList = useSelector((state) => Object.values(state.recipes));
  let recipes = [];
  if (recipeList) {
    recipes = recipeList.map((recipe) => (
      <div key={recipe.id} className="profile__recipeBox--card">
        <RecipeCard recipeId={recipe.id} />
      </div>
    ));
  }

  useEffect(() => {
    dispatch(getUserRecipes(user.id));
  }, [dispatch, recipes.length]);

  if (!recipeList) {
    return null;
  }
  return (
    <div>
      <div className="profile__user--div">
        <img className="profile__user--img" src={user.imageUrl} />
        <div className="profile__user--name">{user.username}</div>
      </div>
      <div className="profile__recipeBox--container">
        <div className="profile__recipeBox--label">My Recipes</div>
        <div className="profile__recipeBox">{recipes}</div>
      </div>
    </div>
  );
};

export default Profile;
