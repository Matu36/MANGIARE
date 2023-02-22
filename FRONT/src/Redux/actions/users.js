import axios from "axios";

export const GET_USERS = "GET_USERS";

export const getUsers = (currentUser) => {
  let user = {
    id: currentUser.id,
    email: currentUser.email,
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

export const resetPassword = (email) => {
  let user = {
    client_id: "CLgKXjmteTQnzZDWOjjhhSNJjji9Znua",
    email: email,
    connection: "Username-Password-Authentication",
  };
  return async () => {
    console.log(user);
    await axios
      .post(
        "https://dev-q0op6n5dd6lcy5o2.us.auth0.com/dbconnections/change_password",
        { data: user }
      )
      .then((response) => response.data)
      .catch((err) => {
        console.log(err), err;
      });
  };
};
