import React, { useEffect, useState } from "react";
import s from './Orders.module.css';
import IngredientsList from '../../components/IngredientsList/ingredientsList';
const { REACT_APP_BACK_URL } = process.env;
import { Input } from "@chakra-ui/react";

export default function Orders(props) {
    const [state, setState] = useState({
        orders: null,
        orderActive: null,
        filters: {status: '-1'}, // filters: {email: 'yamil.leotta@gmail.com, status: '2'} // '-1': All Statuses
        orderBy: {none: 'ASC'} // orderBy: {status: 'ASC' || 'DES'}
    });
    const user = JSON.parse(localStorage.getItem("MANGIARE_user"));
    let ordersFiltered;

    useEffect(() => {
        fetch(`${REACT_APP_BACK_URL}/orders?id=${user.id}&email=${user.email}${props.all ? '&all=true' : ''}`)
            .then(resp => resp.json())
            .then(orders => {setState({...state, orders})});
        }, []);

    const handlePay = (preferenceId) => {
        window.open(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`, "_self");
    }

    const handleStatus = async (status, orderId) => {
        fetch(`${REACT_APP_BACK_URL}/orders`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({status, orderId, userId: user.id}),
            })
                .then(resp => resp.json())
                .then(order => {
                    setState({...state, orders: state.orders.map(el => (el.id === order.id) ? {...el, status: order.status} : el)})
                })
    }

    return(
        <div>
            {state.orders && (
                <>
                    <table width = "100%">
                        <thead>
                            <tr>
                                {props.all ? <th>Email filter</th> : null }
                                <th>Status filter</th>
                                <th colSpan="2">Order by</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {props.all &&
                                    <td style = {{textAlign: 'center'}}>
                                        <Input
                                            type="text"
                                            placeholder="Search Email"
                                            onChange={({target}) => setState({...state, filters: {...state.filters, email: target.value}})}
                                            value={state.filters.email}
                                            autoComplete="off"
                                            width="30rem"
                                            background="white"
                                            margin="10px"
                                        />
                                    </td>
                                }
                                <td style = {{textAlign: 'center'}}>
                                    <select name="status" value={state.filters.status} onChange={({target}) => {setState({...state, filters: {...state.filters, [target.name]: target.value}})}}>
                                        <option value={-1}>All Statuses</option>
                                        <option value={0}>Payment pending</option>
                                        <option value={1}>Stock pending</option>
                                        <option value={2}>In preparation</option>
                                        <option value={3}>Sent</option>
                                        <option value={4}>Canceled</option>
                                    </select>
                                </td>
                                <td style = {{textAlign: 'center'}}>
                                    <select name="orderBy" value={Object.entries(state.orderBy)[0][0]} onChange={({target}) => {setState({...state, orderBy: {[target.value]: Object.entries(state.orderBy)[0][1]}})}}>
                                        <option value="none">None</option>
                                        <option value="status">Status</option>
                                        {props.all && <option value="email">User's email</option>}
                                        <option value="createdAt">Created At</option>
                                        <option value="id">Order#</option>
                                    </select>
                                </td>
                                <td style = {{textAlign: 'center'}}>
                                    <select name="orderMethod" value={Object.entries(state.orderBy)[0][1]} onChange={({target}) => {setState({...state, orderBy: {[Object.entries(state.orderBy)[0][0]]: target.value}})}} disabled={Object.entries(state.orderBy)[0][0] === 'none'}>
                                        <option value="ASC">Ascending</option>
                                        <option value="DESC">Descending</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table width='100%' className={s.ordersTable}>
                        <thead>
                            <tr>
                                {props.all ? <th>User Email</th> : ''}
                                <th>Order#</th>
                                <th>createdAt</th>
                                <th>Ingredients#</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            ordersFiltered = state.orders.filter(order => !Object.keys(state.filters).some(key => 
                                (key !== 'email')
                                        ? ((order[key] != state.filters[key]) && (key === 'status' && state.filters[key] !== '-1'))
                                        : (!order.User[key].includes(state.filters[key]))
                                ))
                                .sort((a, b) => {
                                    let orderMethod = (Object.entries(state.orderBy)[0][1] === 'ASC') ? 1 : -1
                                    if (Object.entries(state.orderBy)[0][0] === 'email') {
                                        a = a.User;
                                        b = b.User;
                                    }
                                    return (a[Object.entries(state.orderBy)[0][0]] < b[Object.entries(state.orderBy)[0][0]]) ? -orderMethod : orderMethod
                                })
                                .map((el, idx) => (
                                <React.Fragment key={idx}>
                                    <tr className={((el.id === state.orderActive) || (!state.orderActive && el.id == props.order_id)) ? s.orderItem : ((idx % 2) ? '' : s.par)} onClick={() => setState({...state, orderActive: el.id})}>
                                        {props.all ? <td>{el.User.email}</td> : ''}
                                        <td>{el.id}</td>
                                        <td>{el.createdAt}</td>
                                        <td>{el.Order_details.length}</td>
                                        <td>{
                                            (el.status === 0)
                                                ? 'Payment pending'
                                                : (el.status === 1)
                                                    ? 'Stock pending'
                                                    : (el.status === 2)
                                                        ? 'In preparation'
                                                        : (el.status === 3)
                                                            ? 'Sent'
                                                            : 'Canceled'
                                            }</td>
                                        <td>
                                            {(((!el.status) || (el.status === 1) && (user.role !== null) && props.all)) ? <button onClick={() => handleStatus(4, el.id)}>Cancel</button> : ''}

                                            {((!el.status) && (user.id == el.userId)) ? <button onClick={() => handlePay(el.preferenceId)}>Pay</button> : ''}

                                            {((el.status === 2) && (user.role !== null) && (props.all)) ? <button onClick={() => handleStatus(3, el.id)}>Send</button> : ''}
                                        </td>
                                    </tr>
                                    {((state.orderActive === el.id) || (!state.orderActive && el.id == props.order_id)) ? <tr className={s.orderItem}>
                                        <td colSpan={props.all ? 6 : 5} style={{padding: '30px 0'}}>
                                            <div style={{width: '70%', margin: 'auto', backgroundColor: 'white'}}>
                                                <IngredientsList items={el.Order_details.map(({IngredientId, amount, unit, price, Ingredient}) => ({id: IngredientId, amount, unit, price, name: Ingredient.name}))} orderDetail={true}/>
                                                <p style={{padding: '10px'}}>Shipping address: {el.address || 'No shipping address'}</p>
                                            </div>
                                        </td>
                                    </tr> : ''}
                                </React.Fragment>
                            ))
                        }
                        </tbody>
                    </table>
                    {(!ordersFiltered.length) && <p style={{padding: '30px', textAlign: 'center', fontSize: '120%'}}>No orders to list...</p>}
                </>
            )}
        </div>
    )
}
