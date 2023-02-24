import React, { useEffect, useState } from "react";
import { Menu, IconButton, MenuButton, MenuItem, MenuList, MenuDivider, Box, useQuery} from "@chakra-ui/react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useDeferredValue } from "react";

export default function Orders(props) {
    const [orders, setOrders] = useState();
    const params = new URLSearchParams(window.location.search);
    const user = JSON.parse(localStorage.getItem("MANGIARE_user"));
    
    console.log(params.get('status'), params.get('preference_id'), params.get('all'));

    if ((params.get('status') === 'approved') && (params.get('preference_id')))
        fetch(`http://localhost:3001/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({status: params.get('status'), preference_id: params.get('preference_id')}),
            })
  
    useEffect(() => {
        console.log(orders);
    }, [orders]);

    useEffect(() => {
        fetch(`http://localhost:3001/orders?id=${user.id}&email=${user.email}${props.all ? '&all=true' : ''}`)
            .then(resp => resp.json())
            .then(data => setOrders(data));
    }, []);

    const handlePay = (preferenceId) => {
        window.open(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${preferenceId}`);
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
                    setOrders(orders.map(el => (el.id === order.id) ? {...el, status: order.status} : el))
                })
    }

    return(
        <table width = '100%'>
            <tbody>
                <tr>
                    <td style={{textAlign: 'center'}}>Order#</td>
                    <td style={{textAlign: 'center'}}>createdAt#</td>
                    <td style={{textAlign: 'center'}}>Ingredients#</td>
                    <td style={{textAlign: 'center'}}>Actions#</td>
                </tr>
                {
                    orders?.map((el, idx) => (<tr key={idx}>
                        <td style={{textAlign: 'center'}}>{el.id}</td>
                        <td style={{textAlign: 'center'}}>{el.createdAt}</td>
                        <td style={{textAlign: 'center'}}>{el.Order_details.length}</td>
                        <td style={{textAlign: 'center'}}>
                            <button>View</button>

                            {(((!el.status) || (el.status === 1) && (user.role !== null) && props.all)) ? <button onClick={() => handleStatus(4, el.id)}>Cancel</button> : ''}

                            {((!el.status) && (user.id == el.userId)) ? <button onClick={() => handlePay(el.preferenceId)}>Pay</button> : ''}

                            {((el.status === 2) && (user.role !== null) && (props.all)) ? <button onClick={() => handleStatus(3, el.id)}>Send</button> : ''}
                        </td>
                    </tr>))
                }
            </tbody>
        </table>
    )
}
