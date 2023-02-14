import {
  GET_RECIPES,
  SET_RECIPES_TO_SHOW,
  RESET_RECIPES_TO_SHOW,
  SET_FILTERED_RECIPES,
  RESET_FILTERED_RECIPES,
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
  ADD_TO_CART,
  REMOVE_TO_CART,
  SET_CART,
  SET_ORDER_BY_PRICE_OR_RATING,
} from "../actions/index.js";

const initialState = {
  recipes: [],
  recipesToShow: [],
  filteredRecipes: [],
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

  filteredDiet: "All Diets",

  orderBy: "",

  searchValueName: "",

  orderByPriceOrRating: {
    type: undefined,
    order: "",
  },

  ingredients: null,
  filteredIngredients: [],

  cart: [], // [{id, name, price...}, {id, name, price...}...]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        recipesToShow: action.payload,
        filteredRecipes: action.payload,
      };

    case SET_RECIPES_TO_SHOW:
      return {
        ...state,
        recipesToShow: action.payload,
        filteredRecipes: action.payload,
      };

    case RESET_RECIPES_TO_SHOW:
      return {
        ...state,
        recipesToShow: state.recipes,
        filteredRecipes: state.recipes,
      };

    case SET_FILTERED_RECIPES:
      return {
        ...state,
        filteredRecipes: action.payload,
      };

    case RESET_FILTERED_RECIPES:
      return {
        ...state,
        filteredRecipes: state.recipesToShow,
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

    case REMOVE_TO_CART:
      return {
        ...state,
        cart: action.payload
          ? state.cart.filter(
              (item) =>
                item.id !== action.payload.id ||
                item.unit !== action.payload.unit
            )
          : [],
      };
    case SET_ORDER_BY_PRICE_OR_RATING:
      return {
        ...state,
        orderByPriceOrRating: action.payload,
      };

    case ADD_TO_CART:
      let indexFound;
      action.payload.forEach((el) => {
        indexFound = state.cart.findIndex(
          (aux) => aux.id == el.id && aux.unit == el.unit
        ); // Busco el id y la unit
        if (indexFound === -1)
          state.cart.push(el); // si no lo encuentra, lo agrega
        else
          state.cart = [
            ...state.cart.slice(0, indexFound),
            {
              ...el,
              amount: 1 * el.amount + 1 * state.cart[indexFound].amount,
            },
            ...state.cart.slice(indexFound + 1),
          ]; // si lo encuentra, agrega la cantidad
      });
      return { ...state };

    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
