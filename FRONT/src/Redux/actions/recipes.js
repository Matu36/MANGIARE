import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const SET_RECIPES_TO_SHOW = "SET_RECIPES_TO_SHOW";
export const RESET_RECIPES_TO_SHOW = "RESET_RECIPES_TO_SHOW";
export const SET_FILTERED_RECIPES = "SET_FILTERED_RECIPES";
export const RESET_FILTERED_RECIPES = "RESET_FILTERED_RECIPES";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CREATE_RECIPE = "CREATE_RECIPE";

export const getRecipes = () => async (dispatch) => {
  return await axios
    .get(`/recipes`)
    .then((response) => response.data)
    .then((data) => {
      dispatch({ type: GET_RECIPES, payload: data });
    });
};

export const setRecipesToShow = (payload) => {
  return (dispatch) => {
    dispatch({ type: SET_RECIPES_TO_SHOW, payload });
  };
};

export const resetRecipesToShow = () => {
  return (dispatch) => dispatch({ type: RESET_RECIPES_TO_SHOW });
};

export const setFilteredRecipes = (payload) => {
  return (dispatch) => dispatch({ type: SET_FILTERED_RECIPES, payload });
};

export const resetFilteredRecipes = () => {
  return (dispatch) => dispatch({ type: RESET_FILTERED_RECIPES });
};

export const getRecipeDetail = (id) => async (dispatch) => {
  let response = await axios.get(`/recipes/${id}`);
  dispatch({ type: GET_RECIPE_DETAIL, payload: response.data[0] });
};

export const createRecipe = ({
  id,
  userId,
  title,
  instructions,
  image,
  diets,
  ingredients,
}) => {
  let recipe = {
    id,
    userId,
    title,
    instructions,
    image,
    diets,
    ingredients,
  };
  return (dispatch) =>
    axios
      .post(`/recipes`, recipe)
      .then((payload) => dispatch({ type: CREATE_RECIPE, payload }));
};
