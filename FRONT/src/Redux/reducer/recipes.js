import {
  GET_RECIPES, 
  SET_RECIPES_TO_SHOW, 
  RESET_RECIPES_TO_SHOW, 
  SET_FILTERED_RECIPES, 
  RESET_FILTERED_RECIPES, 
  GET_RECIPE_DETAIL, 
  CREATE_RECIPE,
} from "../actions/index.js";

const initialState = {
  recipes: [],
  recipesToShow: [],
  filteredRecipes: [],
  recipeDetail: {},
};

const recipesReducer = (state = initialState, action) => {
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

    case CREATE_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };

    default:
      return { ...state };
  }
};

export default recipesReducer;
