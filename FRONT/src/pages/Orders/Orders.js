import React, { useEffect } from "react";
import { Menu, IconButton, MenuButton, MenuItem, MenuList, MenuDivider, Box} from "@chakra-ui/react";
import { useParams } from "react-router-dom"

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const params = useParams();

    console.log(params);
    
    useEffect(async () => {
        setOrders((await fetch('https://localhost:3001/orders')).json());
    }, []);


}
