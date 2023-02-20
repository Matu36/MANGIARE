import { GET_INGREDIENTS, CREATE_INGREDIENTS } from "../actions/ingredients";

const initialState = {
  ingredients: [],
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return { ...state, ingredients: action.payload };
      
      case CREATE_INGREDIENTS:
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    default:
      return { ...state };
  }
};

export default ingredientsReducer;
