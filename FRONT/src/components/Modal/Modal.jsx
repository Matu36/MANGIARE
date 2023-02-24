import React from "react";
import styled from "@emotion/styled";
import { ModalContent, ModalHeader } from "@chakra-ui/react";



const Modal = ({
    state,
    changeState,
    title,
    h1,
    body,
    price}) => {
    return (
        <>
            {state &&
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
                <p>{body}</p>
                <hr />
                <h2>Total = ${price}</h2>
                </ContenedorModal>

            </Overlay>
            }
        </>
    )
}

export default Modal;

const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
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
    width: 500px;
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



