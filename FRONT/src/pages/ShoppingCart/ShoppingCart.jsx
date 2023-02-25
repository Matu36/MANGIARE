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
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import logo from "../../img/LOGO 2.png";
import NavBar from "../../components/NavBar/NavBar";
const { REACT_APP_FRONT_URL, REACT_APP_BACK_URL } = process.env;


export default function ShoppingCart() {
  const [state, setState] = React.useState({ address: null, checkout: false });
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
      if (isAuthenticated) {
        localStorage.setItem("MANGIARE_user", JSON.stringify(user.email));
        localStorage.setItem("MANGIARE_userInfo", JSON.stringify(user));
      }
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    setState({
      ...state,
      address: JSON.parse(localStorage.getItem("MANGIARE_user"))?.address || "",
    });
  }, []);

  const deleteFromLocalStorage = (id) => {
    let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
    localStorage.setItem(
      "MANGIARE_cart",
      JSON.stringify(LS_cart.filter((i) => i.id !== id))
    );
  };

  const changeFromLocalStorage = (target) => {
    let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
    let element = LS_cart.find((i) => parseInt(i.id) === parseInt(target.id));
    let index = LS_cart.indexOf(element);
    LS_cart[index].amount = target.value;
    localStorage.setItem("MANGIARE_cart", JSON.stringify(LS_cart));
  };
  //                 --------------- fin localStorage ---------------

  const handleOnAddressChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const handleOnChange = ({ target }, unit) => {
    changeFromLocalStorage(target);
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
        window.location.href = `${REACT_APP_FRONT_URL}/user?id=${order.id}`;
      });
  };

  const handleCheckout = () => {
    setState({ ...state, checkout: true });
  };

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
      <Flex marginTop='70px'>
        <Box
          w="40%"
          h="100vh"
          bgImage={background}
          style={{
            backgroundSize: "cover",
          }}
        />
        <Spacer width="400px" />
        <Box w="600px">
          <Text
            fontSize="6xl"
            fontWeight="bold"
            color="yellow.500"
            style={{ textAlign: "center" }}
          >
            Shopping Cart
          </Text>
          <VStack spacing={100} align="stretch" my={10}>
            {!cart?.length ? (
              <Text fontSize="2xl">The Shopping Cart is empty...</Text>
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
                <HStack justify="space-between" align="flex-end" mt={10}>
                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    color="green.500"
                    style={{ textAlign: "left" }}
                  >
                    Total: $
                    {cart
                      .reduce((aux, el) => aux + el.amount * el.price, 0)
                      .toFixed(2)}
                  </Text>
                  <center>
                    {email ? (
                      state.checkout ? (
                        <>
                          <label htmlFor="address">Shipping address:</label>
                          <br />
                          <input
                            type="text"
                            id="address"
                            name="address"
                            value={state.address}
                            placeholder="Confirm shipping address..."
                            onChange={handleOnAddressChange}
                          />
                          <br />
                          <br />
                          <Button
                            colorScheme="teal"
                            variant="solid"
                            size="lg"
                            isDisabled={!state.address.length}
                            onClick={handleConfirm}
                          >
                            Confirm
                          </Button>
                        </>
                      ) : (
                        <Button
                          colorScheme="teal"
                          variant="solid"
                          size="lg"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </Button>
                      )
                    ) : (
                      <>
                        <Text fontSize="lg" mr={2}>
                          You must login before proceed to checkout
                        </Text>{" "}
                        <LoginButton />
                      </>
                    )}
                  </center>
                </HStack>
              </>
            )}
            <NavLink to={"/home"} align="center">
              <Button colorScheme="teal" variant="solid" size="lg">
                Go Home
              </Button>
            </NavLink>
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
