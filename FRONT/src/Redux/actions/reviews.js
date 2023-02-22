import axios from "axios";

export const GET_REVIEWS = "GET_REVIEWS";

export const getReviews = (currentUser) => {
  let user;
  if (currentUser) {
    user = {
      id: currentUser.id,
      email: currentUser.email,
    };
  }
  return async (dispatch) => {
    await axios
      .get(`/reviews`, user ? { params: user } : null)
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: GET_REVIEWS, payload: data });
      });
  };
};

export const postReview = (payload) => async (dispatch) => {
  return await axios.post(`/reviews`, payload);
};

export const deleteReview = (payload) => async (dispatch) => {
  return await axios.delete(`/reviews`, { data: payload });
};
