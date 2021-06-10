import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadLikes, removeLike, addLike } from "../../store/like";
import chefHat from "../Icons/chefs-hat-filled.svg";
import emptyChefHat from "../Icons/chefs-hat-empty.svg";
import { useParams } from "react-router-dom";

import "./likes.css";

const Likes = () => {
  const dispatch = useDispatch();
  let likes = useSelector((state) => state.likes);
  let userId = useSelector((state) => state.session.user.id);
  // let recipe = useSelector((state) => state.recipes[recipeId]);

  const { id } = useParams();
  const recipeId = Number(id);
  useEffect(() => {
    dispatch(loadLikes(recipeId));
  }, [dispatch, recipeId, likes.length]);

  const numLikes = Object.keys(likes).length;

  let likeSymbol = emptyChefHat;
  let like = likes[userId];

  if (like && like?.recipe_id === Number(id)) {
    likeSymbol = chefHat;
  }

  const handleLike = (e) => {
    e.preventDefault();
    if (likeSymbol === chefHat) {
      let id = likes[userId].id;
      dispatch(removeLike(id));
    } else {
      const newLike = {
        userId,
        recipeId,
      };
      dispatch(addLike(newLike));
    }
  };

  return (
    <div className="likes__container">
      <div className="likes__symbol">
        <img src={likeSymbol} alt="chef hat" onClick={handleLike} />
      </div>
      <div className="likes__number--container">
        <div className="likes__number">{numLikes} Likes</div>
      </div>
    </div>
  );
};

export default Likes;
