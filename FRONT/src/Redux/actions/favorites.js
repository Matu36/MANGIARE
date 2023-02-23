import axios from "axios";

export const GET_FAVORITES = "GET_FAVORITES";

export const getFavorites = (userId) => async (dispatch) => {
  let response = await axios.get(
    `/favorites`,
    userId ? { params: userId } : null
  );
  return dispatch({ type: GET_FAVORITES, payload: response.data });
};

export const postReview = (userId, recipeId) => async (dispatch) => {
  return await axios.post(`/favorites`, { userId, recipeId });
};

export const deleteReview = (userId, recipeId) => async (dispatch) => {
  try {
    await axios.delete("/favorites", {
      data: { userId, recipeId },
    });
  } catch (error) {
    console.log(error);
  }
};
