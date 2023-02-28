import React, {useState} from "react";
import {Tr, Td, WrapItem, Button, Portal, Box} from '@chakra-ui/react';
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
import s from './UserPage.module.css';
import styled from "@emotion/styled";
import Modal from "../Modal/Modal";

export default function Order({number, date, price, status, list}) {
    const [estadoModal1, setEstadoModal1] = useState(false);
    const arrStatus = ["Outstanding", "Package in preparation", "Dispatched", "Delivered", "Cancelled"];

    function CancelButton(){
        return(
            <WrapItem>
                <Button colorScheme='red'>Cancel</Button>
            </WrapItem>
        );
    }

    function PayButton(){
        return(
            <WrapItem>
                <Button colorScheme='green'>Pagar</Button>
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
        title={number}
        h1={number}
        body={list}
        price={price}
    >
        <Contenido>
            
        </Contenido>
    </Modal>
    </div>
  
  )
    }

    return(
        <Tr>
        <Td className={s.orderItem}># {number}</Td>
        <Td className={s.orderItem}>{date}</Td>
        <Td isNumeric className={s.orderItem}>$ {price}</Td>
        <Td className={s.orderItem}>{arrStatus[status]}</Td>
        <Td >
        <div className={s.actions}>
            <ViewButton />
            {status<2 ? < CancelButton />: ""}
            {status==0 ? < PayButton />: ""}
            
        </div>
        </Td>
    </Tr>
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