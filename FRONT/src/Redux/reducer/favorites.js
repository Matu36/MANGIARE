import { GET_FAVORITES } from "../actions/favorites.js";

const initialState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload,
      };

    default:
      return { ...state };
  }
};

export default favoritesReducer;
