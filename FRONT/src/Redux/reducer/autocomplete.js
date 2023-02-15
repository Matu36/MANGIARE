import {
  SET_SEARCH_VALUE_NAME,
  SET_RECIPEID_AUTOCOMPLETE,
} from "../actions/index.js";

const initialState = {
  recipeIdAutocomplete: null,
  searchValueName: "",
};

const autocompleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPEID_AUTOCOMPLETE:
      return { ...state, recipeIdAutocomplete: action.payload };

    case SET_SEARCH_VALUE_NAME:
      return { ...state, searchValue: action.payload };

    default:
      return { ...state };
  }
};

export default autocompleteReducer;
