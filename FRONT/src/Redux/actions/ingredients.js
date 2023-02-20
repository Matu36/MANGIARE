import axios from "axios";

export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const CREATE_INGREDIENTS = "CREATE_INGREDIENTS";

export const getIngredients = () => async (dispatch) => {
  let response = await axios.get(`/ingredients`);
  return dispatch({ type: GET_INGREDIENTS, payload: response.data });
  
};

export const createIngredients = ({
  name,
  price,
  units,
}) => {
  let ingredient = {
    name,
    price,
    units,
  };
  return (dispatch) =>
    axios
      .post(`/ingredients`, ingredient)
      .then((payload) => dispatch({ type: CREATE_INGREDIENTS, payload }));
};

