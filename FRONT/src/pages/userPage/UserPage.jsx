import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import s from "./UserPage.module.css";
import {
  Box,
  Image,
  Text,
  IconButton,
  Button,
  HStack,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import Filters from "../../components/Filters/Filters";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { getFavorites } from "../../Redux/actions/favorites";
import banner from "../../img/BannerHome.jpg";
import { Avatar } from "@chakra-ui/react";
import RecipesBox from "../../components/RecipesBox/RecipesBox";
import UserReviewsBox from "../../components/UserReviewsBox/UserReviewsBox";
import { getRecipes } from "../../Redux/actions/recipes";
import UserOrdersBox from "../../components/UserOrdersBox/UserOrdersBox";
import { LogoutButton } from "../../components/Auth0/logout_button";
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

  if (params.get("status") === "approved" && params.get("preference_id"))
    fetch("http://localhost:3001/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: params.get("status"),
        preference_id: params.get("preference_id"),
      }),
    });

  let filteredFavorites = favorites.filter((f) => f.userId === LS_user.id);
  let userFavorites = [];
  recipes.forEach((r) => {
    if (filteredFavorites.some((f) => r.id === f.recipeId))
      userFavorites.push(r);
  });

  let filteredRecipes = recipes.filter((r) => r.userId === LS_user.id);

  let order_id = params.get("id");
  console.log(order_id);

  return (
    <div className={s.containerMain}>
      <NavBar />
      <div className={s.container}>
        <div className={s.userInfoDiv}>
          <Avatar className={s.profileImg} src={user ? user.picture : null} />
          <Text className={s.userName}>{name}</Text>
        </div>
        <div className={s.boxesContainer}>
          <RecipesBox title="Favorites" recipes={userFavorites} />
          <RecipesBox title="Created recipes" recipes={filteredRecipes} />
          <UserReviewsBox />
          {/* <UserOrdersBox /> */}
          <div className={s.ordersContainer}>
            <Orders order_id={order_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
