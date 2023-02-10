import React, { useReducer } from "react";
import { ADD_TO_CART, CLEAR_CART, REMOVE_ALL_FROM_CART, REMOVE_ONE_FROM_CART, TOTAL_PRICE } from "../../../Redux/actions/ShoppingActions";
import { shoppingInitialState, shoppingReducer } from "../../../Redux/reducer/ShoppingReducer";
import CartItem from "../CartItem/CartItem";
import ProductItem from "../ProductItem/ProductItem";


export default function ShoppingCart () {
const [state, dispatch] = useReducer (shoppingReducer, shoppingInitialState);
const {products, cart, totalPrice} = state;
console.log (state);
console.log (totalPrice);
console.log (cart);

const addToCart = (id) => {console.log (id);
dispatch({type: ADD_TO_CART, payload: id});
dispatch ({type: TOTAL_PRICE});


};


const delFromCart = (id, all = false) => {
    console.log (id, all);
    if (all) {
        dispatch ({type: REMOVE_ALL_FROM_CART, payload:id})
    } else {
        dispatch ({type: REMOVE_ONE_FROM_CART, payload:id})
    }
};

const clearCart = () => {
    dispatch ({type: CLEAR_CART})
};


const productSelect = products.map((product) => 
<ProductItem key = {product.id} data = {product} addToCart = {addToCart} />
)

return (
    <div className= "container">
        <div className= "article">
<h2> Shopping Cart</h2>
<h3> Products </h3>

<article className= "box">
    
{products.map((product) => 
    <ProductItem key = {product.id} data = {product} addToCart = {addToCart} />
)}

</article>
</div>
<h3>Cart</h3>

<article className="box">

<button onClick={clearCart}> Clean the Cart</button>
{
    cart.map ((item, index) => <CartItem key= {index} data = {item}
    delFromCart = {delFromCart} />)
}
<br />
<h3> Total Price: $ {totalPrice}.00 </h3>


</article>
    </div>
)

}