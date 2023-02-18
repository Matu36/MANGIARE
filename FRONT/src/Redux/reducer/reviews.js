import { GET_REVIEWS } from "../actions/reviews.js";

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

    default:
      return { ...state };
  }
};

export default reviewsReducer;
