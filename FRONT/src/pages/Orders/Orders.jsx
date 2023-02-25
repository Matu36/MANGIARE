import React, { useEffect, useState } from "react";
import s from './Orders.module.css';
import IngredientsList from '../../components/IngredientsList/ingredientsList';
import {Table,Thead,Tfoot,Tbody,Tr,Th,Td,TableCaption,TableContainer, WrapItem, Button, Box} from '@chakra-ui/react';
import Order from "./Order";
import NavBar from "../../components/NavBar/NavBar";
import banner from "../../img/BannerHome.jpg";


export default function Orders(props) {
    const [state, setState] = useState({orders: null, orderActive: null});
    const params = new URLSearchParams(window.location.search);
    const user = JSON.parse(localStorage.getItem("MANGIARE_user"));
    const arrStatus = ['Payment pending', 'Stock pending', 'In preparation', 'Sent', 'Canceled'];
    
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

    const CancelButton = () => {
        return(
            <WrapItem>
                <Button colorScheme='red' onClick={() => handleStatus(4, el.id)}>Cancel</Button>
            </WrapItem>
        );
    }

    const PayButton = () => {
        return(
            <WrapItem>
                <Button colorScheme='green' onClick={() => handlePay(el.preferenceId)}>Pagar</Button>
            </WrapItem>
        )
    }

    const SendButton = () => {
        return (
            <WrapItem>
                <Button colorScheme='blue' onClick={() => handleStatus(3, el.id)}>Send</Button>
            </WrapItem>
        )
    }

    const Main = () => {
        return (
            <TableContainer width="90%" backgroundColor="white">
                        <Table variant='simple'> 
                            <Thead>
                                <Tr>
                                    {props.all ? <Th fontSize="2xl">User Email</Th> : ''}
                                    <Th fontSize="2xl">Order Number</Th>
                                    <Th fontSize="2xl">Creation date</Th>
                                    <Th fontSize="2xl" >Total</Th>
                                    <Th fontSize="2xl" >State</Th>
                                    <Th fontSize="2xl" style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        }} >Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    state.orders?.map((el, idx) => (
                                        <React.Fragment key={idx}>
                                            <Order props={props} el={el} idx={idx} />
                                        </React.Fragment>
                                    ))
                                }
                            </Tbody>
                        </Table>
                    </TableContainer>
        )
    }

    return( 
        <>
            <NavBar />
            {!props.all ? 
            <div className="body">  
            <Box width="100%"
                    height="99.9vh"
                    marginTop="1px"
                    backgroundImage={banner}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                    }}>
                    <Main />

                </Box>
            </div>: <Main />}
            

                

        </>
    )}


    
        {/* <table width='100%' className={s.ordersTable}>
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
                state.orders?.map((el, idx) => (
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
                                <IngredientsList items={el.Order_details.map(({IngredientId, amount, unit, price, Ingredient}) => ({id: IngredientId, amount, unit, price, name: Ingredient.name}))} orderDetail={true}/>
                            </td>
                        </tr> : ''}
                    </React.Fragment>
                ))
            }
            </tbody>
        </table> */}

