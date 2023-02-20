import { GET_REVIEWS, RESET_REVIEWS } from "../actions/reviews.js";


const initialState = {
  reviews: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
      case RESET_REVIEWS:
      return {
        ...state,
        reviews: reviews,
      };

    default:
      return { ...state };
  }
};

export default reviewsReducer;
