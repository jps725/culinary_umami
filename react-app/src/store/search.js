const FIND_ALL = "search/FIND_ALL";

const searchResult = (recipes) => ({
  type: FIND_ALL,
  recipes,
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

const initialState = {};

export default function search(state = initialState, action) {
  switch (action.type) {
    case FIND_ALL: {
      return action.recipes;
    }

    default:
      return state;
  }
}
