import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import s from "./UserPage.module.css";
import { getFavorites } from "../../Redux/actions/favorites";
import { Avatar, Box, Image, Text, Flex   } from "@chakra-ui/react";
import RecipesBox from "../../components/RecipesBox/RecipesBox";
import UserReviewsBox from "../../components/UserReviewsBox/UserReviewsBox";
import { getRecipes } from "../../Redux/actions/recipes";
import Orders from "../Orders/Orders";

export default function UserPage() {
  let dispatch = useDispatch();
  let { user } = useAuth0();
  const name = user ? user.name : null;
  const LS_user = JSON.parse(localStorage.getItem("MANGIARE_user"));

  const params = new URLSearchParams(window.location.search);

  const favorites = useSelector((state) => state.favorites.favorites);
  const recipes = useSelector((state) => state.recipes.recipes);
  
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getFavorites());
  }, []);

  let filteredFavorites = favorites.filter((f) => f.userId === LS_user.id);
  let userFavorites = [];
  recipes.forEach((r) => {
    if (filteredFavorites.some((f) => r.id === f.recipeId))
      userFavorites.push(r);
  });

  let filteredRecipes = recipes.filter((r) => r.userId === LS_user.id);

  let order_id = params.get("id");

  return (
    <Box className="containerMain" backgroundColor="#FFFFFF">
  <NavBar />
  <Box className="container" width="100%" marginTop="4rem" display="flex" position="relative">
    <Box
      className="userInfoDiv"
      width="20%"
      height="30rem"
      backgroundColor="#0C1D2C"
      display="flex"
      flexDirection="column"
      alignItems="center"
      padding="2rem"
      boxSizing="border-box"
      gap="2rem"
      position="fixed"
    >
      <Avatar width="6rem" height="auto" src={user ? user.picture : null} />
      <Text className="userName" color="#FFFFFF">
        {name}
      </Text>
    </Box>
    <Flex
      ml="20%"
      width="80%"
      padding="2rem"
      
      boxSizing="border-box"
      justifyContent="space-between"
      alignItems="flex-start"
      flexWrap="wrap"
      gap="1rem"
    >
      <Box width={["100%", "49%", "33.33%"]}>
        <RecipesBox title="Favorites" recipes={userFavorites} />
      </Box>
      <Box width={["100%", "49%", "33.33%"]}>
        <RecipesBox title="Created recipes" recipes={filteredRecipes} />
      </Box>
      <Box width={["100%", "49%", "33.33%"]}>
        <UserReviewsBox />
      </Box>
      {/* <UserOrdersBox /> */}
      <Box
        className="ordersContainer"
        marginTop="1rem"
        width="97%"
        borderWidth="1px"
        borderColor="gray.300"
        boxShadow="5px 5px 10px gray"
      >
        <Orders order_id={order_id} />
      </Box>
    </Flex>
  </Box>
</Box>
)}
