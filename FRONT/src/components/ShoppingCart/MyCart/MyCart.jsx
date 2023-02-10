import React from "react";
import CartDetail from "../MiCarrito/CartDetail";

export default function MyCart () {
    return (
        <div>



{products.length > 0 ? (
                    products?.map((product, index) => (
                      <CartDetail
                        key={index}
                        name={product.name}
                        price={product.price}
                      />
                    ))
                  ) : (
                    <h3>No products found</h3>
                  )}




      </div>
    )
    
}