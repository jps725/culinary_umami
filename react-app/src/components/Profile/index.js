import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RecipeCard from "../RecipeCard";
import { authenticate } from "../../store/session";
import "./profile.css";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const recipes = useSelector((state) => {
    const recipeList = Object.values(state.session.user.recipes);
    return recipeList?.map((recipe) => (
      <div key={recipe.id} className="profile__recipeBox--card">
        <div className="profile__recipeCard">
          <RecipeCard recipeId={recipe.id} />
        </div>
      </div>
    ));
  });

  const recipesList = useSelector((state) => state.session.user.recipes);

  useEffect(() => {
    return;
  }, [recipesList]);

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
