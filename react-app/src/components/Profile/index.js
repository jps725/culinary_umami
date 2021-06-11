import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "../RecipeCard";
import { getUserRecipes } from "../../store/recipe";

import "./profile.css";

const Profile = ({ user }) => {
  const dispatch = useDispatch();

  const recipeList = useSelector((state) => Object.values(state.recipes));
  let recipes = [];
  if (recipeList) {
    recipes = recipeList.map((recipe) => {
      if (recipe.user_id === user.id) {
        return (
          <div key={recipe.id} className="profile__recipeBox--card">
            <RecipeCard recipeId={recipe.id} />
          </div>
        );
      }
      return null;
    });
  }

  useEffect(() => {
    dispatch(getUserRecipes(user.id));
  }, [dispatch, recipes.length, user.id]);

  if (!recipeList) {
    return null;
  }
  return (
    <div>
      <div className="profile__user--div">
        <img
          className="profile__user--img"
          alt="user profile"
          src={user.imageUrl}
        />
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
