import { ADD_TO_CART, REMOVE_TO_CART, SET_CART } from "../actions/index.js";
const initialState = {
  cart: [], // [{id, name, price...}, {id, name, price...}...].
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
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

export default cartReducer;
