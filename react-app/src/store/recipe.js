const LOAD_ALL = "recipe/LOAD_ALL";
const LOAD_ONE = "recipe/LOAD_ONE";
const ADD_ONE = "recipe/ADD_ONE";
const UPDATE = "recipe/UPDATE";
const REMOVE_ONE = "recipe/REMOVE_ONE";

const loadAll = (recipes) => ({
  type: LOAD_ALL,
  recipes,
});

const loadOne = (recipe) => ({
  type: LOAD_ONE,
  recipe,
});

const create = (recipe) => ({
  type: ADD_ONE,
  recipe,
});

const update = (recipe) => ({
  type: UPDATE,
  recipe,
});

const removeOne = (id) => ({
  type: REMOVE_ONE,
  id,
});

export const getRecipes = () => async (dispatch) => {
  const res = await fetch("/api/recipes/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.errors) {
    return data.errors;
  }
  dispatch(loadAll(data));
};

export const getUserRecipes = (id) => async (dispatch) => {
  const res = await fetch(`/api/recipes/user/${id}`, {
    header: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.errors) {
    return data.errors;
  }
  dispatch(loadAll(data));
};

export const getOneRecipe = (id) => async (dispatch) => {
  const res = await fetch(`/api/recipes/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (data.errors) {
    return data.errors;
  }
  dispatch(loadOne(data));
};

export const createRecipe = (recipe) => async (dispatch) => {
  const res = await fetch("/api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  const data = await res.json();
  if (data.errors) {
    return data.errors;
  }
  dispatch(create(data));
};

export const updateRecipe = (recipe) => async (dispatch) => {
  console.log(recipe);
  const res = await fetch("/api/recipes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  const data = await res.json();
  if (data.errors) {
    return;
  }
  dispatch(update(data));
};

export const deleteRecipe = (id) => async (dispatch) => {
  const res = await fetch(`/api/recipes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  dispatch(removeOne(data.id));
};

const initialState = {};

const recipes = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ONE: {
      return {
        ...state,
        [action.recipe.id]: action.recipe,
      };
    }

    case LOAD_ALL: {
      let newState = { ...state };
      action.recipes.forEach((recipe) => {
        newState[recipe.id] = recipe;
      });
      return newState;
    }

    case ADD_ONE: {
      return {
        ...state,
        [action.recipe.id]: action.recipe,
      };
    }

    case UPDATE: {
      return {
        ...state,
        [action.recipe.id]: action.recipe,
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

export default recipes;
