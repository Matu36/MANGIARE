import {ADD_TO_CART, REMOVE_ONE_FROM_CART, REMOVE_ALL_FROM_CART, CLEAR_CART, TOTAL_PRICE }
from "../actions/ShoppingActions";


export const shoppingInitialState = {

    products: [
        {id: 1, name: "banana", price: 200},
        {id: 2, name: "carne", price: 300},
        {id: 3, name: "naranja", price: 400},
        {id: 4, name: "huevos", price: 500},
        {id: 5, name: "leche", price: 600},
        {id: 6, name: "manteca", price: 700},
        {id: 7, name: "crema", price: 800},
    
    ],

    cart: [],

    totalPrice: 0
}

export function shoppingReducer (state, action) {

    switch (action.type) {
        case ADD_TO_CART: {

            let newItem = state.products.find(product => product.id === action.payload);
            //console.log (newItem);

            let itemInCart = state.cart.find(item => item.id === newItem.id)
            
            return itemInCart? {
                ...state, 
                cart: state.cart.map((item) => 
                item.id === newItem.id
                ?{...item, quantity: item.quantity + 1}
                :item
                ),
            } : {...state, 
                cart: [...state.cart, {...newItem, quantity:1}]
            };
 
            }

        case REMOVE_ONE_FROM_CART: {
            let itemToDelete = state.cart.find (item => item.id === action.payload)
            return itemToDelete.quantity > 1? {
                ...state,
                cart: state.cart.map((item) => 
                item.id === action.payload
                ? {...item, quantity: item.quantity - 1}:item 
                )
            }: {
                ...state,
                cart: state.cart.filter ((item) => item.id !== action.payload)
            };
            
        }

        case REMOVE_ALL_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter ((item) => item.id !== action.payload)
            };
            
            
        }

        case CLEAR_CART: {
            return shoppingInitialState;
            
        }

        case TOTAL_PRICE: {

            let priceTotal = state.cart.reduce((acc, item) => {
               return acc + (item.quantity * item.price)
                },0)
console.log (priceTotal);
            return {
               ...state,
                totalPrice: priceTotal,
                            }

        }

        default:
            return state;
    }


    }
