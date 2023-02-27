import React, { useEffect, useState, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { getRecipeDetail } from "../../Redux/actions/recipes";
import { getIngredients } from "../../Redux/actions/ingredients";
import {
  deleteReview,
  getFavorites,
  postReview,
} from "../../Redux/actions/favorites";
import { setCart, addToCart } from "../../Redux/actions/cart";
import s from "../RecipeDetail/RecipeDetail.module.css";
import NavBar from "../../components/NavBar/NavBar";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import ReviewsBox from "../../components/ReviewsBox/ReviewsBox";
import {
  Box,
  Image,
  Text,
  IconButton,
  Button,
  Container,
  ListItem,
  Tabs,
  TabList,
  TabPanels,
  Spinner,
  Tab,
  TabPanel,
  UnorderedList,
  Stack,
  VStack,
} from "@chakra-ui/react";
import background from "../../img/RDetailBG.jpg";
import { FaRegHeart, FaHeart } from "react-icons/fa";
const { REACT_APP_BACK_URL } = process.env;

const RecipeDetail = () => {
  let { id } = useParams();
  const { user } = useAuth0();
  let dispatch = useDispatch();
  let recipe = useSelector((state) => state.recipes.recipeDetail);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const [list, setList] = useState(); // Traigo datos faltantes de ingredients
  //formato list: [{id, name, price}, {id, name, price}...]
  const cart = useSelector((state) => state.cart.cart);
  const [loading, setLoading] = useState(false);
  const LS_user = JSON.parse(localStorage.getItem("MANGIARE_user"));
  const [state, setState] = React.useState({ address: null });
  const { email } = useAuth0().user || { email: null };

  //                   --------------- localStorage ---------------
  useEffect(() => {
    let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
    if (!LS_cart) return;
    else {
      dispatch(setCart(LS_cart));
    }
  }, [user]);

  const handleLocalStorage = (ingredient) => {
    let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
    if (!LS_cart) {
      localStorage.setItem("MANGIARE_cart", JSON.stringify([...ingredient]));
    } else {
      let index = LS_cart.indexOf(
        LS_cart.find((i) => i.id === ingredient[0].id)
      );
      if (index === -1) {
        localStorage.setItem(
          "MANGIARE_cart",
          JSON.stringify([...LS_cart, ...ingredient])
        );
      } else {
        LS_cart[index] = {
          ...LS_cart[index],
          amount:
            parseInt(LS_cart[index].amount) + parseInt(ingredient[0].amount),
        };
        localStorage.setItem("MANGIARE_cart", JSON.stringify(LS_cart));
      }
    }
  };
  //                 --------------- fin localStorage ---------------

  const { title, image, instructions, rating, diets, price } = recipe;

  useEffect(() => {
    setLoading(true);
    dispatch(getRecipeDetail(id)).then((data) => {
      setLoading(false);
      return data;
    });
    dispatch(getIngredients());
  }, [id]);

  useEffect(() => {
    if (recipe.ingredients && ingredients) {
      setList(
        recipe.ingredients.map((el) => ({
          ...el,
          ...ingredients.find((aux) => aux.id === el.id),
        }))
      );
    }
  }, [recipe, ingredients, cart]);

  useEffect(() => {
    setState({
      ...state,
      address: JSON.parse(localStorage.getItem("MANGIARE_user"))?.address || null,
    });
  }, []);

  const handleOnAdd = (id, unit) => {
    handleLocalStorage([list.find((el) => el.id == id)]);
    setList(
      list.map((el) =>
        el.id == id && el.unit == unit ? { ...el, inCart: true } : { ...el }
      )
    );
    return dispatch(
      addToCart(id ? [list.find((el) => el.id == id && el.unit == unit)] : list)
    );
  };

  const handleOnChange = ({ target }, unit) => {
    setList(
      list.map((el) =>
        el.id != target.id || el.unit != unit
          ? el
          : { ...el, amount: target.value <= 0 ? 0 : target.value }
      )
    );
  };

  const handleOnUnitChange = (id, value) => {
    setList(list.map((el) => (el.id != id ? el : { ...el, unit: value })));
  };

  const favorites = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    dispatch(getFavorites());
  }, []);

  let filteredFavorites =
    LS_user &&
    favorites
      .filter((f) => f.userId === LS_user.id)
      .filter((f) => f.recipeId === parseInt(id));

  const handleFavorite = async () => {
    if (filteredFavorites.length > 0) {
      await dispatch(deleteReview(LS_user.id, id));
      dispatch(getFavorites());
    } else {
      await dispatch(postReview(LS_user.id, id));
      dispatch(getFavorites());
    }
  };

  
  const handleConfirm = () => {
    fetch(`${REACT_APP_BACK_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        address: state.address,
        cart: list.map((el) => ({ ...el, units: [el.unit] })),
        userId: user.id,
      }),
    })
      .then((data) => data.json())
      .then((order) => {
        window.open(`https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${order.preferenceId}`, "_self")
      });
  };

  return (
    <>
      {" "}
      {loading ? (
        <div className={s.divSpinner}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <Stack
          //width={{ base: "lg", md: "3xl", lg: "6xl" }}
          width="100%"
          height="auto"
          marginTop="1px"
          paddingTop="70px"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundSize: "auto",
            backgroundPosition: "center",
          }}
        >
          <Box
            width={{ base: "sm", md: "2xl", lg: "4xl", xl: "6xl" }}
            height="10%"
            marginBottom="none"
          >
            <NavBar />
          </Box>
          <Box
            width="100%"
            height={["10rem", "10rem", "20rem", "20rem"]}
            marginBottom="none"
            backgroundImage={background}
            style={{
              backgroundSize: "cover",
              filter: "contrast(100%)",
              backgroundPosition: "center bottom 45%",
            }}
          ></Box>

          <Box
            width={{ base: "xsm", md: "2xl", lg: "6xl" }}
            maxWidth="80%"
            height="50%"
            objectFit={"cover"}
            borderRadius="10px"
            style={{
              position: "relative",
            }}
          >
            <Text
              fontSize={{ base: "36px", md: "40px", lg: "56px" }}
              textAlign="center"
              fontWeight="bold"
              color="yellow.800"
              backgroundColor="white"
              opacity="0.5"
            >
              {title}
            </Text>
            <Image
              borderRadius="50px"
              width="560px"
              height="370px"
              margin="auto"
              padding="20px"
              src={image}
              alt={title}
            />
            {filteredFavorites ? (
              <div className={s.favoriteButtonDiv} onClick={handleFavorite}>
                {filteredFavorites.length > 0 ? <FaHeart /> : <FaRegHeart />}
              </div>
            ) : null}
          </Box>
          <Stack>
            <Tabs
              font-size="sm"
              width="50%"
              size="md"
              align="left"
              variant="enclosed"
              marginTop="90px"
            >
              <TabList>
                <Tab _selected={{ color: "white", bg: "blue.500" }}>
                  Ingredients
                </Tab>
                <Tab _selected={{ color: "white", bg: "blue.500" }}>
                  Instructions
                </Tab>
                <Tab _selected={{ color: "white", bg: "blue.500" }}>Diets</Tab>
                <Tab _selected={{ color: "white", bg: "blue.500" }}>Rating</Tab>
              </TabList>
              <TabPanels>
                <TabPanel
                  backgroundColor="rgba(255, 255, 255, 0.7)"
                  width={{ base: "sm", md: "lg", lg: "2xl" }}
                  //height={["200px", "300px", "400px"]}
                  overflowY="scroll"
                >
                  {!list ? (
                    <Text>Loading...</Text>
                  ) : (
                    <IngredientsList
                      items={list.map((el) => ({ ...el, units: [el.unit] }))}
                      onChange={handleOnChange}
                      onUnitChange={handleOnUnitChange}
                      itemButton={{
                        caption: "Add to Cart",
                        action: handleOnAdd,
                      }}
                    />
                  )}
                </TabPanel>
                <TabPanel backgroundColor="rgba(255, 255, 255, 0.5)">
                  <Box width="100%" color="black">
                    <Text>{instructions}</Text>
                  </Box>
                </TabPanel>
                <TabPanel backgroundColor="rgba(255, 255, 255, 0.5)">
                  <UnorderedList className="recipeDetail">
                    {diets &&
                      diets.map((diet, index) => {
                        return <ListItem key={index}>{diet}</ListItem>;
                      })}
                  </UnorderedList>
                </TabPanel>
                <TabPanel backgroundColor="rgba(255, 255, 255, 0.5)">
                  <Box
                    width="35%"
                    height="45%"
                    display="flex"
                    alignContent="center"
                    marginTop="1px"
                    fontSize="20px"
                  >
                    Rating: {rating}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>

          <VStack spacing="24px">
            <Box padding="20px">
              <NavLink to={"/shoppingCart"}>
                <Button colorScheme="teal" variant="solid" size="lg">
                  Go to Cart
                </Button>
              </NavLink>
              <Button style={{marginLeft: '15px'}} colorScheme="teal" variant="solid" size="lg" onClick={handleConfirm}>
                  Fast Buy Recipe
              </Button>
            </Box>
            <Box
              w={["90%", "90%", "65%", "65%"]}
              borderWidth="1px"
              padding="10px"
              borderRadius="lg"
            >
              <ReviewsBox />
            </Box>
            <Box />
            <Box padding="10px">
              <NavLink className={s.navlinkGoBackButton} to={"/home"}>
                <Button colorScheme="teal" variant="outline" size="lg">
                  Go Home
                </Button>
              </NavLink>
            </Box>
          </VStack>
        </Stack>
      )}
    </>
  );
};

export default RecipeDetail;
