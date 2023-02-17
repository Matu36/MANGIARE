import axios from "axios";

export const GET_INGREDIENTS = "GET_INGREDIENTS";

export const getIngredients = () => async (dispatch) => {
  let response = await axios.get(`/ingredients`);
  return dispatch({ type: GET_INGREDIENTS, payload: response.data });
};
