import axios from "axios";

export const SET_ORDER_BY = "SET_ORDER_BY";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const SET_FILTERED_INGREDIENTS = "SET_FILTERED_INGREDIENTS";
export const DELETE_FILTERED_INGREDIENT = "DELETE_FILTERED_INGREDIENT";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const SET_ORDER_BY_PRICE_OR_RATING = "SET_ORDER_BY_PRICE_OR_RATING";


export const setOrderByPriceOrRating = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_ORDER_BY_PRICE_OR_RATING, payload });
  };
};

export const filterByDiet = (payload) => {
  return (dispatch) => dispatch({ type: FILTER_BY_DIET, payload });
};

export const setOrderBy = (payload) => {
  return (dispatch) => dispatch({ type: SET_ORDER_BY, payload });
};

export const setFilteredIngredients = (payload) => {
  return (dispatch) => dispatch({ type: SET_FILTERED_INGREDIENTS, payload });
};

export const deleteFilteredIngredient = (payload) => {
  return (dispatch) => dispatch({ type: DELETE_FILTERED_INGREDIENT, payload });
};

export const clearFilters = () => {
  return (dispatch) => dispatch({ type: CLEAR_FILTERS });
};