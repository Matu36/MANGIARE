import axios from "axios";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const CREATE_INGREDIENTS = "CREATE_INGREDIENTS";

export const getIngredients = () => async (dispatch) => {
  let response = await axios.get(`/ingredients`);
  return dispatch({ type: GET_INGREDIENTS, payload: response.data });
  
};

export const createIngredients = (ingredients) => {
  return async (dispatch) => {
    try {
      await axios.post(`/ingredients`, ingredients);
      return dispatch({
        type: CREATE_INGREDIENTS,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

