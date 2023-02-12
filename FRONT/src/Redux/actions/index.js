export const GET_RECIPES = "GET_RECIPES";
export const SET_RECIPES_TO_SHOW = "SET_RECIPES_TO_SHOW";
export const RESET_RECIPES_TO_SHOW = "RESET_RECIPES_TO_SHOW";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const SET_ORDER_BY = "SET_ORDER_BY";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const CLEAR_FILTERS = "CLEAR_FILTERS";
export const SET_SEARCH_VALUE_NAME = "SET_SEARCH_VALUE_NAME";
export const SET_RECIPEID_AUTOCOMPLETE = "SET_RECIPEID_AUTOCOMPLETE";
export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const CREATE_RECIPE = "CREATE_RECIPE";
export const SET_FILTERED_INGREDIENTS = "SET_FILTERED_INGREDIENTS";
export const DELETE_FILTERED_INGREDIENT = "DELETE_FILTERED_INGREDIENT";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const SET_CART = "SET_CART";

//TRAE LAS RECETAS
export const getRecipes = () => async (dispatch) => {
  return await fetch(`http://localhost:3001/recipes`)
    .then((response) => response.json())
    .then((json) => {
      dispatch({ type: GET_RECIPES, payload: json });
    });
};

export const setRecipesToShow = (payload) => {
  return (dispatch) => dispatch({ type: SET_RECIPES_TO_SHOW, payload });
};

export const resetRecipesToShow = () => {
  return (dispatch) => dispatch({ type: RESET_RECIPES_TO_SHOW });
};

//TRAE EL DETALLE DE LAS RECETAS
export const getRecipeDetail = (id) => async (dispatch) => {
  let response = await fetch(`http://localhost:3001/recipes/${id}`).then(
    (response) => response.json()
  );
  dispatch({ type: GET_RECIPE_DETAIL, payload: response[0] });
};

//CREAR RECETA
export const createRecipe = ({
  id,
  title,
  instructions,
  image,
  diets,
  ingredients,
}) => {
  return (dispatch) =>
    fetch(`http://localhost:3001/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title,
        instructions,
        image,
        diets,
        ingredients,
      }),
    })
      .then((data) => data.json())
      .then((payload) => dispatch({ type: CREATE_RECIPE, payload }));
};

//FILTRO POR DIETA
export const filterByDiet = (payload) => {
  return (dispatch) => dispatch({ type: FILTER_BY_DIET, payload });
};

//FILTRA POR ORDEN
export const setOrderBy = (payload) => {
  return (dispatch) => dispatch({ type: SET_ORDER_BY, payload });
};

//FILTRA POR NOMBRE
export const setSearchValueName = (searchValueName) => {
  return (dispatch) =>
    dispatch({ type: "SET_SEARCH_VALUE_NAME", payload: searchValueName });
};

//FILTRO POR INGREDIENTE
export const setFilteredIngredients = (payload) => {
  return (dispatch) => dispatch({ type: SET_FILTERED_INGREDIENTS, payload });
};

//ELIMINAR UN INGREDIENTE DEL FILTRO
export const deleteFilteredIngredient = (payload) => {
  return (dispatch) => dispatch({ type: DELETE_FILTERED_INGREDIENT, payload });
};

// LIMPIAR FILTROS
export const clearFilters = () => {
  return (dispatch) => dispatch({ type: CLEAR_FILTERS });
};

export const setRecipeIdAutocomplete = (recipeIdAutocomplete) => {
  return (dispatch) =>
    dispatch({
      type: "SET_RECIPEID_AUTOCOMPLETE",
      payload: recipeIdAutocomplete,
    });
};

//OBTIENE LOS INGREDIENTES DE DB - HABILITAR LUEGO DE IMPLEMENTAR EL ENDPOINT getIngredients

export const getIngredients = () => async (dispatch) =>
  await fetch(`http://localhost:3001/ingredients`)
    .then((data) => data.json())
    .then((payload) => dispatch({ type: GET_INGREDIENTS, payload }));

//OBTIENE INGREDIENTES HARCODEADOS - ELIMINAR LUEGO DE IMPLEMENTAR EL ENDPOINT getIngredients
/*export const getIngredients = () => ({
  type: GET_INGREDIENTS,
  payload: [
    { id: 1, name: "carne", price: 1500, units: ["pounds"] },
    { id: 2, name: "pan rallado", price: 1000, units: ["pounds"] },
    { id: 3, name: "huevos", price: 20, units: ["units"] },
    { id: 4, name: "papa", price: 400, units: ["pounds"] },
    { id: 5, name: "leche", price: 50, units: ["cup", "tablespoon"] },
    { id: 6, name: "lechuga", price: 50, units: ["cup", "tablespoon"] },
    { id: 7, name: "tomate", price: 50, units: ["cup", "tablespoon"] },
  ],
});
*/

export const addToCart = (payload) => ({ type: ADD_TO_CART, payload });

export const removeToCart = (payload) => ({ type: REMOVE_TO_CART, payload });

export const setCart = (payload) => ({ type: SET_CART, payload });