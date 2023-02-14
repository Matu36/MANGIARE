import React, { useEffect } from "react";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import { setCart, removeToCart } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { LoginButton } from "../../components/Auth0/login_button";
import { useAuth0 } from "@auth0/auth0-react";

export default function ShoppingCart () {
    const [orderState, setOrder] = React.useState();
    const cart = useSelector(({cart}) => cart);
    const dispatch = useDispatch();
    const {email} = useAuth0().user || {email: null};
    const { user, isAuthenticated } = useAuth0();

    //                   --------------- localStorage ---------------
    useEffect(() => {
        let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
        if (!LS_cart) return;
        else {
        dispatch(setCart(LS_cart));
        if (isAuthenticated) {
            localStorage.setItem("MANGIARE_user", JSON.stringify(user.email));
            localStorage.setItem("MANGIARE_userInfo", JSON.stringify(user))
        }
        }
    }, [user, isAuthenticated]);

    const handleLocalStorage = (id) => {
        let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
        localStorage.setItem("MANGIARE_cart", JSON.stringify(LS_cart.filter(i => i.id !== id)));
      };
    //                 --------------- fin localStorage ---------------

    const handleOnDelete = (id, unit) => {
        handleLocalStorage(id)
        dispatch(removeToCart({id, unit}));
    };

    const handleOnChange = ({target}, unit) => {
        dispatch(setCart(cart.map(el => ((el.id == target.id) && (el.unit == unit)) ? {...el, amount: target.value} : el)));
    };

    const handleCheckout = () => {
        fetch(`http://localhost:3001/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user: email, cart}),
          })
            .then(data => data.json())
            .then(order => {
                dispatch(setCart([]));
                localStorage.removeItem('cart');
                setOrder(order)
                localStorage.setItem('pendingPayment', JSON.stringify({user: email, order}))
            })
    }

    const handlePay = () => {
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

    return (
        <div style={{width: '50%', margin: 'auto'}}>
            {
                (!cart?.length)
                    ? <h2>The Shopping Cart is empty...</h2>
                    : (<>
                        <IngredientsList
                            items = {cart.map(el => ({...el, units: [el.unit]}))}
                            onChange = {handleOnChange}
                            itemButton = {{
                                caption: 'Remove Item',
                                action: handleOnDelete
                            }}
                        />
                        <br />
                        <p>Total: ${cart.reduce((aux, el) => aux + el.amount * el.price, 0).toFixed(2)}</p>
                        <center>
                        {
                            email
                                ? <button onClick={handleCheckout}>Checkout</button>
                                : <><p>You must login before proceed to checkout</p> <LoginButton /></>
                        }
                        </center>
                    </>)
            }
            {
                JSON.parse(localStorage.getItem('pendingPayment')) && (<><p>Order #{JSON.parse(localStorage.getItem('pendingPayment')).order.orderId} has been created!</p> <button onClick={handlePay}>PAY</button></>)
            }
        </div>
    )
    
}