import axios from "axios";

export const GET_USERS = "GET_USERS";
const { REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN } = process.env;

export const getUsers = (currentUser) => {
  let user;
  if (currentUser) {
    user = {
      id: currentUser.id,
      email: currentUser.email,
    };
  }
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
  const url = `https://${REACT_APP_AUTH0_DOMAIN}/dbconnections/change_password`;
  const data = {
    client_id: REACT_APP_AUTH0_CLIENT_ID,
    email: email,
    connection: "Username-Password-Authentication",
    // You may also include other fields, such as 'password', 'connection_id', etc.
  };

  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .post(url, data, { headers })
    .then((response) => alert(`${email}. ${response.data}`))
    .catch((error) => alert(`${email}. ${error}`));
};

export const putNewRole = (id, newRole) => {
  let user = {
    id: id,
    role: newRole ? false : null,
  };
  return async () =>
    await axios
      .put("/users", user)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err), err;
      });
};

export const putBanned = (id, banned) => {
  let user = {
    id: id,
    banned: !banned,
  };
  return async () => {
    await axios
      .put("/users", user)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err), err;
      });
  };
};
