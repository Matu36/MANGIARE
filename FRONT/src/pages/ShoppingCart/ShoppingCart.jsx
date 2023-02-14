import React from "react";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import { setCart, removeToCart } from "../../Redux/actions";
import { connect } from "react-redux";
import { LoginButton } from "../../components/Auth0/login_button";

class ShoppingCart extends React.Component {
    constructor (props){
        super(props);
        this.state = {order: null}
        localStorage.setItem('MANGIARE_user', JSON.stringify('yamil.leotta@gmail.com'));
    }

    handleOnDelete = (id, unit) => {
        this.props.removeToCart({id, unit});
    };

    handleOnChange = ({target}, unit) => {
        this.props.setCart(this.props.cart.map(el => ((el.id == target.id) && (el.unit == unit)) ? {...el, amount: target.value} : el));
    };

    handleCheckout = (cart, email) => {
        fetch(`http://localhost:3001/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user: email, cart}),
          })
            .then(data => data.json())
            .then(order => {
                this.props.setCart([]);
                localStorage.removeItem('cart');
                this.setState(old => ({...old, order}))
                localStorage.setItem('pendingPayment', JSON.stringify({user: email, order}))
            })
    }

    handlePay = () => {
        const {order, user} = JSON.parse(localStorage.getItem('pendingPayment'));
        const {orderDetail, orderId} = order;

        fetch(`http://localhost:3001/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({orderDetail, user, orderId})
          })
            .then(data => data.json())
            .then(({response}) => window.open(response.init_point))
            .then(() => {
                localStorage.removeItem('pendingPayment');
                window.location.href = '/home';
            })
    }

    render(){
        return (
            <div style={{width: '50%', margin: 'auto'}}>
                {
                    (!this.props.cart?.length)
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
                            <center>
                            {
                                ((JSON.parse(localStorage.getItem('MANGIARE_user'))) && (JSON.parse(localStorage.getItem('MANGIARE_user')) !== 'guest'))
                                    ? <button onClick={() => this.handleCheckout(this.props.cart, JSON.parse(localStorage.getItem('MANGIARE_user')))}>Checkout</button>
                                    : <><p>You must login before proceed to checkout</p> <LoginButton /></>
                            }
                            </center>
                        </>)
                }
                {
                    JSON.parse(localStorage.getItem('pendingPayment')) && (<><p>Order #{JSON.parse(localStorage.getItem('pendingPayment')).order.orderId} has been created!</p> <button onClick={this.handlePay}>PAY</button></>)
                }
            </div>
        )
    }
}

export default connect(({cart}) => ({cart}), {setCart, removeToCart})(ShoppingCart); 