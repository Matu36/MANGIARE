import axios from "axios";

export const GET_REVIEWS = "GET_REVIEWS";
export const RESET_REVIEWS = "RESET_REVIEWS";

export const getReviews = () => async (dispatch) => {
  return await axios
    .get(`/reviews`)
    .then((response) => response.data)
    .then((data) => {
      dispatch({ type: GET_REVIEWS, payload: data });
    });
};

export const resetReviews = () => async (dispatch) => {
  return dispatch({ type: RESET_REVIEWS});
};
