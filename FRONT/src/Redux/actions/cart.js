import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_TO_CART = "REMOVE_TO_CART";
export const SET_CART = "SET_CART";

export const addToCart = (payload) => ({ type: ADD_TO_CART, payload });

export const removeToCart = (payload) => ({ type: REMOVE_TO_CART, payload });

export const setCart = (payload) => ({ type: SET_CART, payload });
