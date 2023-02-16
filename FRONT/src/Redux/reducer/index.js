import { combineReducers } from "redux";
import recipes from "./recipes";
import ingredients from "./ingredients";
import filters from "./filters";
import cart from "./cart";
import autocomplete from "./autocomplete";

export default combineReducers({
  recipes,
  ingredients,
  filters,
  cart,
  autocomplete,
});
