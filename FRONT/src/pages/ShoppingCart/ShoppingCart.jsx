import React from "react";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import { setCart, removeToCart } from "../../Redux/actions";
import { connect } from "react-redux";

class ShoppingCart extends React.Component {
    constructor (props){
        super(props);
        this.state = {order: null}
    }
    handleOnDelete = (id, unit) => {
        this.props.removeToCart({id, unit});
    };

    handleOnChange = ({target}, unit) => {
        this.props.setCart(this.props.cart.map(el => ((el.id == target.id) && (el.unit == unit)) ? {...el, amount: target.value} : el));
    };

    handleCheckout = cart => {
        fetch(`http://localhost:3001/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user: {email: 'email1@email1.com'}, cart}),
          })
            .then(data => data.json())
            .then(order => {
                this.setState(old => ({...old, order}))
            })
    }

    handlePay = () => {
        fetch(`http://localhost:3001/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user: {email: 'email1@email1.com'}, orderDetail: this.state.order.orderDetail}),
          })
            .then(data => data.json())
            .then(({response}) => window.open(response.init_point))
    }

    render(){
        return (
            <div style={{width: '50%', margin: 'auto'}}>
                {
                    !this.props.cart.length
                        ? <h2>The Shopping Cart is empty...</h2>
                        : (<>
                            <IngredientsList
                                items = {this.props.cart.map(el => ({...el, units: [el.unit]}))}
                                onChange = {this.handleOnChange}
                                itemButton = {{
                                    caption: 'Remove Item',
                                    action: this.handleOnDelete
                                }}
                            />
                            <br />
                            <p>Total: ${this.props.cart.reduce((aux, el) => aux + el.amount * el.price, 0).toFixed(2)}</p>
                            <center><button onClick={() => this.handleCheckout(this.props.cart)}>Checkout</button></center>
                        </>)
                }
                {
                    this.state.order?.orderId && (<><p>Order #{this.state.order.orderId} has been created!</p> <button onClick={this.handlePay}>PAY</button></>)
                }
            </div>
        )
    }
}

export default connect(({cart}) => ({cart}), {setCart, removeToCart})(ShoppingCart); 