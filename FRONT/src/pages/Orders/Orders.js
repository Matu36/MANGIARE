import React, { useEffect, useState } from "react";
import s from './Orders.module.css';
import IngredientsList from '../../components/IngredientsList/ingredientsList';

export default function Orders(props) {
    const [state, setState] = useState({orders: null, orderActive: null});
    const params = new URLSearchParams(window.location.search);
    const user = JSON.parse(localStorage.getItem("MANGIARE_user"));
    
    if ((params.get('status') === 'approved') && (params.get('preference_id')))
        fetch(`http://localhost:3001/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({status: params.get('status'), preference_id: params.get('preference_id')}),
            })
                .then(data => data.json())
//                .then(order => window.location.href = `/orders?id=${order.id}`)
  
/*
    useEffect(() => {
        console.log(state.orders);
    }, [state.orders]);
*/

    useEffect(() => {
        fetch(`http://localhost:3001/orders?id=${user.id}&email=${user.email}${props.all ? '&all=true' : ''}`)
            .then(resp => resp.json())
            .then(data => {setState({...state, orders: data})});
        }, []);

    const handlePay = (preferenceId) => {
        window.open(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`, "_self");
    }

    const handleStatus = async (status, orderId) => {
        fetch(`http://localhost:3001/orders`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({status, orderId, userId: user.id}),
            })
                .then(resp => resp.json())
                .then(order => {
                    console.log(order);
                    setState({...state, orders: state.orders.map(el => (el.id === order.id) ? {...el, status: order.status} : el)})
                })
    }

    return(
        <table width='100%' className={s.ordersTable}>
            <thead>
                <tr>
                    {props.all ? <th>User Email</th> : ''}
                    <th>Order#</th>
                    <th>createdAt#</th>
                    <th>Ingredients#</th>
                    <th>Actions#</th>
                </tr>
            </thead>
            <tbody>
            {
                state.orders?.map((el, idx) => (
                    <React.Fragment key={idx}>
                        <tr className={((el.id === state.orderActive) || (!state.orderActive && el.id == params.get('id'))) ? s.orderItem : ((idx % 2) ? '' : s.par)} onClick={() => setState({...state, orderActive: el.id})}>
                            {props.all ? <td>{el.User.email}</td> : ''}
                            <td>{el.id}</td>
                            <td>{el.createdAt}</td>
                            <td>{el.Order_details.length}</td>
                            <td>
                                {(((!el.status) || (el.status === 1) && (user.role !== null) && props.all)) ? <button onClick={() => handleStatus(4, el.id)}>Cancel</button> : ''}

                                {((!el.status) && (user.id == el.userId)) ? <button onClick={() => handlePay(el.preferenceId)}>Pay</button> : ''}

                                {((el.status === 2) && (user.role !== null) && (props.all)) ? <button onClick={() => handleStatus(3, el.id)}>Send</button> : ''}
                            </td>
                        </tr>
                        {((state.orderActive === el.id) || (!state.orderActive && el.id == params.get('id'))) ? <tr className={s.orderItem}>
                            <td colSpan={props.all ? 5 : 4} style={{padding: '30px 0'}}>
                                <IngredientsList items={el.Order_details.map(({IngredientId, amount, unit, price, Ingredient}) => ({id: IngredientId, amount, unit, price, name: Ingredient.name}))} orderDetail={true}/>
                            </td>
                        </tr> : ''}
                    </React.Fragment>
                ))
            }
            </tbody>
        </table>
    )
}