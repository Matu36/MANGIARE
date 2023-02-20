import axios from "axios";

export const GET_REVIEWS = "GET_REVIEWS";
export const RESET_REVIEWS = "RESET_REVIEWS";

export const getReviews = () => {
  let user = {
    id: 6,
    email: "german@gmail.com",
    active: true,
  };
  return async (dispatch) => {
    await axios
      .get(`/reviews`, { params: user })
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: GET_REVIEWS, payload: data });
      });
  };
};

export const resetReviews = () => async (dispatch) => {
  return dispatch({ type: RESET_REVIEWS});
};
