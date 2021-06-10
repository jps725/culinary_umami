const ADD_ONE = "like/ADD_ONE";
const REMOVE_ONE = "like/REMOVE_ONE";
const LOAD_ALL = "like/LOAD_ALL";

const addOne = (like) => ({
  type: ADD_ONE,
  like,
});

const removeOne = (id) => ({
  type: REMOVE_ONE,
  id,
});

const loadAll = (likes) => ({
  type: LOAD_ALL,
  likes,
});

export const loadLikes = (recipeId) => async (dispatch) => {
  const res = await fetch(`/api/likes/${recipeId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.errors) {
    return data.errors;
  } else if (data.length === 0) {
    return;
  } else {
    dispatch(loadAll(data));
  }
};

export const addLike = (like) => async (dispatch) => {
  const res = await fetch("/api/likes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(like),
  });
  const data = await res.json();
  if (data.errors) {
    return data.errors;
  }
  dispatch(addOne(data));
};

export const removeLike = (id) => async (dispatch) => {
  const res = await fetch(`/api/likes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(removeOne(data.id));
};

const initialState = {};

const likes = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL: {
      let newState = { ...state };
      action.likes.forEach((like) => {
        newState[like.user_id] = like;
      });
      return newState;
    }

    case ADD_ONE: {
      return {
        ...state,
        [action.like.user_id]: action.like,
      };
    }
    case REMOVE_ONE: {
      let newState = { ...state };
      delete newState[action.id];
      return newState;
    }

    default:
      return state;
  }
};

export default likes;
