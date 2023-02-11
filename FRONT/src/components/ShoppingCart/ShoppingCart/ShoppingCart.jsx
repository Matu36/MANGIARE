import React, { useState } from "react";
import { ADD_TO_CART, REMOVE_ITEM } from "../../../Redux/actions/ShoppingActions";
import { shoppingInitialState, shoppingReducer } from "../../../Redux/reducer/ShoppingReducer";
import CartItem from "../CartItem/CartItem";
import ProductItem from "../ProductItem/ProductItem";

export default function ShoppingCart () {
    const dispatch = useDispatch();
    const [{cart}, dispatchShop] = useReducer (shoppingReducer, shoppingInitialState);


const handleChange = ({target}) => {
    switch (target.name){
        case 'amount': setState(state.map(el => ((el.id == target.id) ? ({...el, id: target.id, amount: target.value}) : el)));
        case 'units': setState(state.map(el => ((el.id == target.id) ? ({...el, id: target.id, amount: target.value}) : el)));
        //if (target.value > 0) dispatch({type: SET_TO_CART, payload: {id: target.id, unit: 'vemos!!!!!!!', amount: target.value}}); break;
        default: break;
    }
}

const handleRemove = payload => dispatch({type: payload ? REMOVE_ITEM : CLEAR_CART, payload})

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

<button> Check Out </button>

</article>
    </div>
)

}