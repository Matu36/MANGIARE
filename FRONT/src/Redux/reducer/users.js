import { GET_USERS } from "../actions/users.js";

const initialState = {
  users: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    default:
      return { ...state };
  }
};

export default usersReducer;
