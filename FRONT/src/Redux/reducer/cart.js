import { ADD_TO_CART, REMOVE_TO_CART, SET_CART } from "../actions/cart";
const initialState = {
  cart: [], // [{id, name, price...}, {id, name, price...}...].
};

const cartReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case REMOVE_TO_CART:
      return {
        ...state,
        cart: payload ? state.cart.filter(item => ((item.id != payload.id) || (item.unit != payload.unit))) : [],
      };

    case ADD_TO_CART:
      let indexFound;
      payload.forEach(el => {
        indexFound = state.cart.findIndex(aux => aux.id == el.id && aux.unit === el.unit);
        if (indexFound === -1) state.cart.push(el);
        else 
          state.cart = [...state.cart.slice(0, indexFound), {...el, amount: el.amount + state.cart[indexFound].amount,
            },
            ...state.cart.slice(indexFound + 1),
          ];
      });
      return { ...state };

    case SET_CART:
      return {
        ...state,
        cart: payload,
      };

    default:
      return { ...state };
  }
};

export default cartReducer;
