import React, { useEffect } from "react";
import {Table,Thead,Tfoot,Tbody,Tr,Th,Td,TableCaption,TableContainer, WrapItem, Button} from '@chakra-ui/react';
import s from "./UserPage.module.css";
import Order from "./Order";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import { Menu, IconButton, MenuButton, MenuItem, MenuList, MenuDivider, Box} from "@chakra-ui/react";
import { LogoutButton } from "../Auth0/logout_button";
import NavBar from "../NavBar/NavBar";
import banner from "../../img/BannerHome.jpg";


export default function Orders() {
    /* const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
          const response = await fetch('https://localhost:3001/orders');
          const data = await response.json();
          setOrders(data);
        };
    
        fetchOrders();
      }, []);
 */
    return(
        <div>
            <NavBar />
            <div>
              

            </div>    

            <div className="body">
                    <Box 
                        width="100%"
                        height="1100px"
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
                            <TableContainer 
                                width="90%"
                                backgroundColor="white"
                                >
                                <Table variant='simple'>
                                    <Thead>
                                    <Tr>
                                        <Th fontSize="2xl">Order Number</Th>
                                        <Th fontSize="2xl">Creation date</Th>
                                        <Th fontSize="2xl" isNumeric>Total</Th>
                                        <Th fontSize="2xl" >State</Th>
                                        <Th fontSize="2xl" style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }} >Actions</Th>
                                    </Tr>
                                    </Thead>
                                    <Tbody>
                                        <Order
                                            number={6}
                                            date="05/02/2023"
                                            price={732}
                                            status={0}
                                                
                                            />
                                        <Order
                                            number={12}
                                            date="05/02/2023"
                                            price={732}
                                            status={1}
                                                
                                            />
                                        <Order
                                            number={32}
                                            date="05/02/2023"
                                            price={732}
                                            status={2}
                                                
                                            />
                                        <Order
                                            number={45}
                                            date="05/02/2023"
                                            price={732}
                                            status={4}
                                                
                                            />
                                    </Tbody>
                                </Table>
                            </TableContainer>
                    </Box>
            </div>
        </div>
    )
}