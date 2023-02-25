import React, {useState} from "react";
import {Table, Tr, Td, WrapItem, Button, Portal, Box} from '@chakra-ui/react';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
  } from '@chakra-ui/react'
import s from './Orders.module.css';
import styled from "@emotion/styled";
import Modal from "../../components/Modal/Modal";

export default function Order({number, props, el, idx, price, status, list}) {
    const [estadoModal1, setEstadoModal1] = useState(false);
    const arrStatus = ['Payment pending', 'Stock pending', 'In preparation', 'Sent', 'Canceled'];
    const [state, setState] = useState({orders: null, orderActive: null});
    const user = JSON.parse(localStorage.getItem("MANGIARE_user"));

    
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


    function CancelButton(){
        return(
            <WrapItem>
                <Button colorScheme='red' onClick={() => handleStatus(4, el.id)}>Cancel</Button>
            </WrapItem>
        );
    }

    function PayButton(){
        return(
            <WrapItem>
                <Button colorScheme='green'onClick={() => handlePay(el.preferenceId)}>Pagar</Button>
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

    function ViewButton(){
        
  return (
    <div>
    <WrapItem>
      <Button colorScheme='gray' onClick={() => setEstadoModal1(!estadoModal1)}>View</Button>
    </WrapItem>
  
    <Modal
        state={estadoModal1}
        changeState={setEstadoModal1}
        title={el.createdAt}
        h1={el.id}
        status={el.status}
        el={el} 
        className={s.overlay}
        ca
        >

    </Modal>
    </div>
  
  )
    }

    return(

        <Tr className={((el.id === state.orderActive) || (!state.orderActive && el.id == props.order_id)) ? s.orderItem : ((idx % 2) ? '': s.par)} onClick={() => setState({...state, orderActive: el.id})} >
            {props.all ? <Td>{el.User.email}</Td>: ""}
            <Td className={s.orderItem}># {el.id}</Td>
            <Td className={s.orderItem}>{el.createdAt}</Td>
            <Td className={s.orderItem}>{el.Order_details.length}</Td>
            <Td className={s.orderItem}>{el.status}</Td>
            <Td>
            <div className={s.actions}>

                <ViewButton />
                
                {(((!el.status) || (el.status === 1) && (user.role !== null) && props.all)) ? < CancelButton /> : ''}

                {((!el.status) && (user.id == el.userId)) ? <PayButton /> : ''}

                {((el.status === 2) && (user.role !== null) && (props.all)) ? <SendButton /> : ''}
            </div>
            </Td>
        </Tr>
       /*  {((state.orderActive === el.id) || (!state.orderActive && el.id == props.order_id)) ? <Tr className={s.orderItem}>
            <Td colSpan={props.all ? 6 : 5} style={{padding: '30px 0'}}>
                <IngredientsList items={el.Order_details.map(({IngredientId, amount, unit, price, Ingredient}) => ({id: IngredientId, amount, unit, price, name: Ingredient.name}))} orderDetail={true}/>
            </Td>
        </Tr> : ''} */

    )
    
}

const Contenido = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        font-size: 42px;
        font-weight: 700;
        margin-top: 20px;
        margin-bottom: 30px
    }

    p{
        font-size: 18px;
        margin-bottom: 20px;
    }
`;