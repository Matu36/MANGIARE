import React from "react";
import styled from 'styled-components';
import IngredientsList from '../../components/IngredientsList/ingredientsList';
import { Box, ModalContent, ModalHeader } from "@chakra-ui/react";
import s from "../Modal/Modal.module.css";
import {WrapItem, Button} from '@chakra-ui/react';



const Modal = ({
    state,
    changeState,
    title,
    h1,
    status,
    el}) => {
        
    const items=el.Order_details.map(({IngredientId, amount, unit, price, Ingredient}) => ({id: IngredientId, amount, unit, price, name: Ingredient.name}))
    let total = 0;
    items.map((el) => {
      total= total + (el.price * el.amount);
    });

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


    return (
        <>
            {state &&
            <div>
            <Overlay >
                <ContenedorModal>
                    <EncabezadoModal>
                    <h3>Detail Order #{title}</h3>
                    </EncabezadoModal>
                    <CloseButton onClick={() => changeState(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                    </CloseButton>
                <h1>Order {h1}</h1>
                <hr />
               
                <hr />
                <div className={s.ingredientList}>
                <IngredientsList 
                    items={items} 
                    orderDetail={true}
                    className={s.list}
                    width="50px"
                    
                />
                </div>
                <hr />
                <div>
                <p className={s.total}>Total = ${total.toFixed(2)}</p>
                </div>
                <hr />
                <div className={s.actionsModal}>
                    {status<2 ? < CancelButton />: ""}
                    {status==0 ? < PayButton />: ""}
                    
                </div>
                </ContenedorModal>

            </Overlay>
            </div>
            }
        </>
    )
}

export default Modal;

const Overlay = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0,.4);
    padding: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    `;

const ContenedorModal = styled.div`
    width: 100%;
    min-height: 100px;
    background-color: #fff;
    position: relative;
    border-radius: 5px;
    box-shadow: rgba(100,100,111,.2) 0px 7px 29px 0px;
    padding: 20px;
    z-index: 2;

    h1{
        font-size: 42px;
        font-weight: 700;
        text-align: center;
        margin-top: 20px;
        margin-bottom: 30px
    }
    h2{
        font-size: 20px;
        font-weight: 700;
        text-align: center;
        margin-top: 30px;

    }
    p{
        font-size: 18px;
        margin-top:20px;
        margin-bottom: 20px;
    }
`;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #E8E8E8;

  h3{
    font-weight: 500px;
    font-size: 20px;
    color: #1766DC;
  }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 15px;
    right: 20px;
    width: 30px;
    height: 30px;
    border: none;
    background: none;
    cursor: pointer;
    transition: .3s ease all;
    border-radius: 5px;
    color: #1766dc;

    &:hover{
        background: #f2f2f2
    }

    svg{
        width: 100%;
        height: 100%;
    }
`;



