import { combineReducers } from "redux";
import recipes from "./recipes";
import ingredients from "./ingredients";
import filters from "./filters";
import cart from "./cart";
import autocomplete from "./autocomplete";
import reviews from "./reviews";
import homeadmin from "./homeadmin";
import users from "./users";

export default combineReducers({
  recipes,
  ingredients,
  filters,
  cart,
  autocomplete,
  reviews,
  homeadmin,
  users,
});
