import React, { useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import s from "./UserPage.module.css";
import { Text, Button } from "@chakra-ui/react";
import { getFavorites } from "../../Redux/actions/favorites";
import { Avatar } from "@chakra-ui/react";
import RecipesBox from "../../components/RecipesBox/RecipesBox";
import UserReviewsBox from "../../components/UserReviewsBox/UserReviewsBox";
import { getRecipes } from "../../Redux/actions/recipes";
import Orders from "../Orders/Orders";
import { Link } from "react-router-dom";

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
    <div className={s.containerMain}>
      <NavBar />
      <div className={s.container}>
        <div className={s.userInfoDiv}>
          <Avatar className={s.profileImg} src={user ? user.picture : null} />
          <Text className={s.userName}>{name}</Text>
          <hr />
          {LS_user?.role !== null && (
            <Button>
              <Link to={"/admin"}>DashBoard Admin</Link>
            </Button>
          )}
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
