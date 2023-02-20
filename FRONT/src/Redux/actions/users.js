import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = () => {
  let user = {
    id: 6,
    email: "germannavarrete.info@gmail.com",
    active: true,
  };
  return async (dispatch) => {
    await axios
      .get(`/users`, { params: user })
      .then((response) => response.data)
      .then((data) => {
        dispatch({ type: GET_USERS, payload: data });
      });
  };
};

export const resetUsers = () => async (dispatch) => {
  return dispatch({ type: RESET_USERS });
};
