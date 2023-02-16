import axios from "axios";

export const SET_SEARCH_VALUE_NAME = "SET_SEARCH_VALUE_NAME";
export const SET_RECIPEID_AUTOCOMPLETE = "SET_RECIPEID_AUTOCOMPLETE";

export const setSearchValueName = (searchValueName) => {
  return (dispatch) =>
    dispatch({ type: SET_SEARCH_VALUE_NAME, payload: searchValueName });
};

export const setRecipeIdAutocomplete = (recipeIdAutocomplete) => {
  return (dispatch) =>
    dispatch({
      type: SET_RECIPEID_AUTOCOMPLETE,
      payload: recipeIdAutocomplete,
    });
};
