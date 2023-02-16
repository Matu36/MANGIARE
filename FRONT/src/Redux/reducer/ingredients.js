import { GET_INGREDIENTS } from "../actions/ingredients";

const initialState = {
  ingredients: null,
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return { ...state, ingredients: action.payload };

    default:
      return { ...state };
  }
};

export default ingredientsReducer;
