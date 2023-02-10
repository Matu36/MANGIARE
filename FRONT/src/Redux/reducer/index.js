import {
  GET_RECIPES,
  SET_RECIPES_TO_SHOW,
  RESET_RECIPES_TO_SHOW,
  GET_RECIPE_DETAIL,
  FILTER_BY_DIET,
  SET_ORDER_BY,
  CLEAR_FILTERS,
  SET_SEARCH_VALUE_NAME,
  SET_RECIPEID_AUTOCOMPLETE,
  GET_INGREDIENTS,
  CREATE_RECIPE,
  SET_FILTERED_INGREDIENTS,
  DELETE_FILTERED_INGREDIENT,
} from "../actions/index.js";

const initialState = {
  recipes: [],
  recipesToShow: [],
  recipeDetail: {},
  recipeIdAutocomplete: null,
  diets: [
    "All Diets",
    "gluten free",
    "dairy free",
    "lacto ovo vegetarian",
    "vegan",
    "vegetarian",
    "paleolithic",
    "primal",
    "whole 30",
    "pescatarian",
    "ketogenic",
    "fodmap friendly",
  ],

  filteredDiet: "",

  orderBy: '',

  searchValueName: "",

  ingredients: null,
  filteredIngredients: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipesToShow: action.payload,
      };

    case SET_RECIPES_TO_SHOW:
      return {
        ...state,
        recipesToShow: action.payload,
      };

    case RESET_RECIPES_TO_SHOW:
      return {
        ...state,
        recipesToShow: state.recipes,
      };

    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload,
      };

    case FILTER_BY_DIET:
      return { ...state, filteredDiet: action.payload };

    case SET_ORDER_BY:
      return { ...state, orderBy: action.payload };

    case SET_FILTERED_INGREDIENTS:
      return {
        ...state,
        filteredIngredients: [...state.filteredIngredients, action.payload],
      };

    case DELETE_FILTERED_INGREDIENT:
      return {
        ...state,
        filteredIngredients: state.filteredIngredients.filter(
          (f) => f !== action.payload
        ),
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filteredIngredients: [],
        filteredDiet: "",
      };

    case SET_RECIPEID_AUTOCOMPLETE:
      return { ...state, recipeIdAutocomplete: action.payload };

    case SET_SEARCH_VALUE_NAME:
      return { ...state, searchValue: action.payload };

    case GET_INGREDIENTS:
      return { ...state, ingredients: action.payload };

    case CREATE_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };

    default:
      return { ...state };
  }
};

export default rootReducer;
