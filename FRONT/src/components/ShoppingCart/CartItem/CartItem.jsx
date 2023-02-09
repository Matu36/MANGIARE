import React from "react";
 
export default function CartItem({data, delFromCart}) {

let {id, name, price, quantity} = data;




return (

<div>

<h4> {name} </h4>
<h5>$ {price}.00 x {quantity} = ${price * quantity}.00 </h5>
<button onClick={()=> delFromCart(id)}> Remove </button>
<br />
<button onClick={()=> delFromCart(id, true)}> Remove All </button>
<br />



</div>

)

}