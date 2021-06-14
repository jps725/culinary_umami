const FIND_ALL = "search/FIND_ALL";
const CLEAR_ALL = "search/CLEAR_ALL";

const searchResult = (recipes) => ({
  type: FIND_ALL,
  recipes,
});

const clearAll = (state) => ({
  type: CLEAR_ALL,
  state,
});

export const recipeSearch = (input) => async (dispatch) => {
  const res = await fetch("/api/search/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input,
    }),
  });
  const data = await res.json();
  if (data.errors) {
    return;
  }
  dispatch(searchResult(data));
};

export const clearSearch = () => async (dispatch) => {
  dispatch(clearAll());
};

const initialState = {};

export default function search(state = initialState, action) {
  switch (action.type) {
    case FIND_ALL: {
      // if (Object.keys(action.recipes).length === 0) {
      //   console.log(Object.keys(action.recipes).length);
      //   return (action.recipes[0] = 1);
      // }

      return action.recipes;
    }
    case CLEAR_ALL: {
      let newState = {};
      return newState;
    }
    default:
      return state;
  }
}
