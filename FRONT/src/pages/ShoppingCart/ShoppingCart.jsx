import React, { useEffect } from "react";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import { setCart, removeToCart } from "../../Redux/actions/cart";
import { useDispatch, useSelector } from "react-redux";
import { LoginButton } from "../../components/Auth0/login_button";
import { useAuth0 } from "@auth0/auth0-react";
import background from "../../img/CartShopBackground.png";
import {
  Box,
  HStack,
  Text,
  Button,
  Flex,
  Image,
  Spacer,
  VStack,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Input
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import logo from "../../img/LOGO 2.png";
import NavBar from "../../components/NavBar/NavBar";
const { REACT_APP_BACK_URL } = process.env;

export default function ShoppingCart() {
  const [state, setState] = React.useState({ address: null });
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const { email } = useAuth0().user || { email: null };
  const { user, isAuthenticated } = useAuth0();

  // =============  ALERTA PARA EL USUARIO AL REMOVER ITEM  =============
  const [isAlertOpen, setIsAlertOpen] = React.useState(false);
  const [idToDelete, setIdToDelete] = React.useState(null);
  const [unitToDelete, setUnitToDelete] = React.useState(null);

  const cancelRef = React.useRef();

  const handleOnDelete = (id, unit) => {
    setIdToDelete(id);
    setUnitToDelete(unit);
    setIsAlertOpen(true);
  };

  const handleDeleteConfirmation = () => {
    deleteFromLocalStorage(idToDelete);
    dispatch(removeToCart({ id: idToDelete, unit: unitToDelete }));
    setIsAlertOpen(false);
    const toast = useToast();
    toast({
      title: "Item removed",
      description: "The item has been successfully removed from your cart.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDeleteCancel = () => {
    setIsAlertOpen(false);
  };

  //                   --------------- localStorage ---------------

  useEffect(() => {
    let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
    if (!LS_cart) return;
    else {
      dispatch(setCart(LS_cart));
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    setState({
      ...state,
      address: JSON.parse(localStorage.getItem("MANGIARE_user"))?.address || null,
    });
  }, []);

  const deleteFromLocalStorage = (id) => {
    let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
    localStorage.setItem(
      "MANGIARE_cart",
      JSON.stringify(LS_cart.filter((i) => i.id !== id))
    );
  };

  const changeFromLocalStorage = (target, unit) => {
    let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
    let index = LS_cart.indexOf(LS_cart.find((i) => (i.id == target.id) && (i.unit == unit)));
    LS_cart[index].amount = parseFloat(target.value).toFixed(2);
    localStorage.setItem("MANGIARE_cart", JSON.stringify(LS_cart));
  };
  //                 --------------- fin localStorage ---------------

  const handleOnAddressChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleOnChange = ({ target }, unit) => {
    changeFromLocalStorage(target, unit);
    dispatch(
      setCart(
        cart.map((el) =>
          el.id == target.id && el.unit == unit
            ? { ...el, amount: target.value }
            : el
        )
      )
    );
  };

  const handleConfirm = () => {
    fetch(`${REACT_APP_BACK_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        address: state.address,
        cart,
        userId: user.id,
      }),
    })
      .then((data) => data.json())
      .then((order) => {
        dispatch(setCart([]));
        localStorage.removeItem("MANGIARE_cart");
        window.open(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${order.preferenceId}`, "_self")
      });
  };

  const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }

  return (
    <Box
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
      <NavBar />
      <Flex marginTop={{base: "5%", sm:"15%", md:"5%"  }}>
        <Box
          w={{base: "35%", lg: "35%", sm:"0%" }}
          h={{base: "100%", lg: "100%", sm:"0%" }}
          bgImage={background}
          display={{base: "block", lg:"block", sm: "none"}}
          style={{
            backgroundSize: "cover",
          }}
        />
        <Spacer flex={{base:"0 0 auto", lg:"0 0 auto", sm:"0"}}/>
        <Box  marginLeft={{base: "25vw", lg:"25vw", sm:"5vw"}} >
          <Flex  style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "2rem" }}>
          <Text 
            fontSize={{base: "6xl", lg:"6xl", md:"5xl", sm:"4xl"}}
            fontWeight="bold"
            color="yellow.500"
          >
            Shopping Cart
          </Text>
          </Flex>
          <VStack spacing={!cart?.length ? 300: 30} align="stretch" >
            {!cart?.length ? (
              <Text marginLeft= "22.5%" marginTop="50%" fontSize="2xl">The Shopping Cart is empty...</Text>
            ) : (
              <>
                <IngredientsList
                  items={cart.map((el) => ({ ...el, units: [el.unit] }))}
                  onChange={handleOnChange}
                  itemButton={{
                    caption: "Remove Item",
                    action: handleOnDelete,
                  }}
                />
                <HStack justify="space-between" a mt={10} style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="green.500"
                  >
                    Total: $
                      {cart
                        .reduce((aux, el) => aux + el.amount * el.price, 0)
                        .toFixed(2)}
                  </Text>
                </HStack>
                {email
                  ? (
                    <HStack style={{display: "flex", justifyContent: "space-between"}}>
                      <Box>
                        <Text fontSize="xl" fontWeight="bold" textAlign="center">Shipping address: </Text>
                        <Input
                          type="text"
                          id="address"
                          name="address"
                          value={state.address || ''}
                          placeholder="Confirm shipping address..."
                          onChange={handleOnAddressChange}
                        />
                      </Box>
                      <Box>
                        <Text visibility={state.address && "hidden"} fontSize={{base:"md", lg:"md", sm:"sm"}}>* Complete shipping address</Text>
                        <Box display="flex" justifyContent="center" alignItems="center">
                        <Button
                          style={{ marginLeft: "15px" }}
                          colorScheme="teal"
                          variant="solid"
                          size="lg"
                          onClick={handleConfirm}
                          isDisabled={!state.address}
                        >
                          Pay
                        </Button>
                        </Box>
                      </Box>
                    </HStack>
                    )
                  : (
                      <VStack>
                        <Text>
                          You must login before proceed to checkout
                        </Text>
                        <Button colorScheme="teal" variant="solid" size="lg">
                          <LoginButton />
                        </Button>
                      </VStack>
                    )}
              </>
            )}
            {!cart?.length ? (
            <NavLink to={"/home"} align="center">
              <Button colorScheme="teal" variant="solid" size="lg">
                Go Home
              </Button>
            </NavLink>) : ""}
          </VStack>
        </Box>
        <AlertDialog
          isOpen={isAlertOpen}
          leastDestructiveRef={cancelRef}
          onClose={handleDeleteCancel}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Remove Item
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to remove this item from your cart?
              </AlertDialogBody>

              <AlertDialogFooter>
                <Flex align="center">
                  <Image
                    src={logo}
                    alt="logo"
                    width="50px"
                    height="50px"
                    mr={4}
                  />
                </Flex>
                <Spacer />
                <Button ref={cancelRef} onClick={handleDeleteCancel}>
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  ml={3}
                  onClick={handleDeleteConfirmation}
                >
                  Remove
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        <Box w="600px" />
      </Flex>
    </Box>
  );
}
