import React from "react";

export default function CartDetail ({name, price}) {

    return (
 <div>
      <h1>  My Cart Shop </h1>
<br />
<br />

            <div className= "container">
      <h2 className= "name">Name: {name}</h2>
      <div>
        <br />

        <span className= "price">Price: </span>
         $ {price}.00
      </div>
    </div>
        </div>
    )
}