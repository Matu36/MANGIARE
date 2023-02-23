import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = (currentUser) => {
  let user;
  if (currentUser) {
    user = {
      id: currentUser.id,
      email: currentUser.email,
    };
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
