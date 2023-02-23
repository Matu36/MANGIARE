import { GET_INGREDIENTS, CREATE_INGREDIENTS, UPDATE_INGREDIENT } from "../actions/ingredients";

const initialState = {
  ingredients: [],
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return { ...state, ingredients: action.payload };
      
      case CREATE_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

      case UPDATE_INGREDIENT:
        const { id, price } = action.payload;
        const updatedIngredients = state.ingredients.map((ingredient) => {
          if (ingredient.id === id) {
            return { ...ingredient, price };
          }
          return ingredient;
        });
        return { ...state, ingredients: updatedIngredients };

    default:
      return { ...state };
  }
};

export default ingredientsReducer;
