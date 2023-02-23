import { combineReducers } from "redux";
import recipes from "./recipes";
import ingredients from "./ingredients";
import filters from "./filters";
import cart from "./cart";
import autocomplete from "./autocomplete";
import reviews from "./reviews";
import homeadmin from "./homeadmin";
import users from "./users";
import favorites from "./favorites";

export default combineReducers({
  recipes,
  ingredients,
  filters,
  cart,
  autocomplete,
  reviews,
  favorites,
  homeadmin,
  users,
});
