import React from "react";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import { setCart, removeToCart } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { LoginButton } from "../../components/Auth0/login_button";
import { useAuth0 } from "@auth0/auth0-react";

export default function ShoppingCart () {
    const [orderState, setOrder] = React.useState();
    const cart = useSelector(({cart}) => cart);
    const dispatch = useDispatch();
    const {email} = useAuth0().user || {email: null};

    const handleOnDelete = (id, unit) => {
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
                 <VStack spacing={10} align="stretch">
                
                 {
                     !this.props.cart.length
                         ? <h2>The Shopping Cart is empty...</h2>
                         : (<>
                             <IngredientsList
                                 items = {this.props.cart.map(el => ({...el, units: [el.unit]}))}
                                 onChange = {this.handleOnChange}
                                 itemButton = {{
                                     caption: 'Remove Item',
                                     action: this.handleOnDelete
                                 }}
                             />
                             <br />
                             <Text fontSize="3xl" fontWeight="bold" color="green.500" style={{textAlign: "left"}}>
                             >Total: ${this.props.cart.reduce((aux, el) => aux + el.amount * el.price, 0).toFixed(2)}</Text>
                             <center>
                                 
                                 <Button  onClick={() => this.handleCheckout(this.props.cart)}  colorScheme="teal"  variant="solid" size="lg"
 >
   Checkout
 </Button></center>
                         </>)
                 }
                 {
                     this.state.order?.orderId && (<><p>Order #{this.state.order.orderId} has been created!</p> <button onClick={this.handlePay}>PAY</button></>)
                 }
 
                 </VStack>
                 </Box>
                 
 
                 <Box w = '400px'/>
                
             </Flex>
         </Box>
         )
     }
    
 
