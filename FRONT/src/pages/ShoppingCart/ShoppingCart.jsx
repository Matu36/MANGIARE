import React, { useEffect } from "react";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import { setCart, removeToCart } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { LoginButton } from "../../components/Auth0/login_button";
import { useAuth0 } from "@auth0/auth0-react";
import background from "../../img/CartShopBackground.png";
import {Box, HStack, Grid, Text, Button, IconButton, Image, Flex, Spacer, Input, InputGroup, InputRightElement, InputLeftElement, InputLeftAddon, InputRightAddon, Stack, Center, Divider, useToast, VStack} from "@chakra-ui/react";

export default function ShoppingCart () {
    const [orderState, setOrder] = React.useState();
    const cart = useSelector(({cart}) => cart);
    const dispatch = useDispatch();
    const {email} = useAuth0().user || {email: null};
    const { user, isAuthenticated } = useAuth0();

    //                   --------------- localStorage ---------------
    useEffect(() => {
        let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
        if (!LS_cart) return;
        else {
        dispatch(setCart(LS_cart));
        if (isAuthenticated) {
            localStorage.setItem("MANGIARE_user", JSON.stringify(user.email));
            localStorage.setItem("MANGIARE_userInfo", JSON.stringify(user))
        }
        }
    }, [user, isAuthenticated]);

    const handleLocalStorage = (id) => {
        let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
        localStorage.setItem("MANGIARE_cart", JSON.stringify(LS_cart.filter(i => i.id !== id)));
      };
    //                 --------------- fin localStorage ---------------

    const handleOnDelete = (id, unit) => {
        handleLocalStorage(id)
        dispatch(removeToCart({id, unit}));
    };

    const handleOnChange = ({target}, unit) => {
        dispatch(setCart(cart.map(el => ((el.id == target.id) && (el.unit == unit)) ? {...el, amount: target.value} : el)));
    };

    const handleCheckout = () => {
        fetch(`http://localhost:3001/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({user: email, cart}),
          })
            .then(data => data.json())
            .then(order => {
                dispatch(setCart([]));
                localStorage.removeItem('cart');
                setOrder(order)
                localStorage.setItem('pendingPayment', JSON.stringify({user: email, order}))
            })
    }

    const handlePay = () => {
        const {order, user} = JSON.parse(localStorage.getItem('pendingPayment'));
        const {orderDetail, orderId} = order;

        fetch(`http://localhost:3001/payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({orderDetail, user, orderId})
          })
            .then(data => data.json())
            .then(({response}) => window.open(response.init_point))
            .then(() => {
                localStorage.removeItem('pendingPayment');
                window.location.href = '/home';
            })
    }

    return (
        < Box
        width="100%"
        height="100vh"
        marginTop="1px"        
        style={{
          display: "flex",
          alignItems: "left",
          justifyContent: "left",
          flexDirection: "row",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <Flex>
            <Box w='40%' h='100vh' bgImage={background} style={{          
          backgroundSize: "cover",
          }} />
            <Spacer width='400px'/>
            <Box w = '600px'>
                <Text fontSize="6xl" fontWeight="bold" color="yellow.500" style={{textAlign: "center"}}>
                  Shopping Cart
                </Text>
                <VStack spacing={10} align="stretch" my={10}>
            {
                (!cart?.length)
                    ? <Text fontSize="2xl">The Shopping Cart is empty...</Text>
                    : (<>
                        <IngredientsList
                            items = {cart.map(el => ({...el, units: [el.unit]}))}
                            onChange = {handleOnChange}
                            itemButton = {{
                                caption: 'Remove Item',
                                action: handleOnDelete
                            }}
                        />
                        <HStack justify="space-between" align="flex-end" mt={10}>
                        <Text fontSize="3xl" fontWeight="bold" color="green.500" style={{textAlign: "left"}}>
                            Total: ${cart.reduce((aux, el) => aux + el.amount * el.price, 0).toFixed(2)}</Text>
                        <center>
                        {
                            email
                                ? <Button colorScheme="teal"  variant="solid" size="lg" onClick={handleCheckout}>
                                Checkout
                              </Button>
                                : <><Text fontSize="lg" mr={2}>You must login before proceed to checkout</Text> <LoginButton /></>
                        }
                        </center>
                        </HStack>
                    </>)
            }
            {
                JSON.parse(localStorage.getItem('pendingPayment')) && (<HStack justify="space-between" align="flex-end">
                <Text fontSize="3xl" fontWeight="bold" color="green.500">Order #{JSON.parse(localStorage.getItem('pendingPayment')).order.orderId} has been created!</Text> <Button onClick={handlePay} colorScheme="green" size="lg">
PAY
</Button>
</HStack>)
            }

            </VStack>

                </Box>
                <Box w = '600px'/>
            </Flex>
        </Box>
    )
    
}