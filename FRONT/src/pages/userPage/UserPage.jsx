import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import s from "./UserPage.module.css";
import { Text, useColorModeValue, Input } from "@chakra-ui/react";
import { getFavorites } from "../../Redux/actions/favorites";
import { Avatar } from "@chakra-ui/react";
import RecipesBox from "../../components/RecipesBox/RecipesBox";
import UserReviewsBox from "../../components/UserReviewsBox/UserReviewsBox";
import { getRecipes } from "../../Redux/actions/recipes";
import Orders from "../Orders/Orders";
import { BiSave } from "react-icons/bi";
import axios from "axios";
import Swal from "sweetalert2";

export default function UserPage() {
  let dispatch = useDispatch();
  let { user } = useAuth0();
  const name = user ? user.name : null;
  const LS_user = JSON.parse(localStorage.getItem("MANGIARE_user"));
  const [address, setAddress] = useState(LS_user.address);

  const handleSave = () => {
    let title;

    if (!address.length) title = 'Please, complete address field before Save'
    else
      axios.put("/users", {id: LS_user.id, address})
        .then(response => response.data)
        .then(() => Swal.fire({
          position: "center",
          icon: "success",
          title: "Your default shipping address has been modified",
          showConfirmButton: false,
          timer: 3000,
        }))
        .catch(err => {title = err});
    
    if (title) Swal.fire({
      position: "center",
      icon: "error",
      title,
      showConfirmButton: true,
    });
  }

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

  const pizza = "https://cdn-icons-png.flaticon.com/512/3511/3511307.png";

  const handleDark = useColorModeValue("invert(0)", "invert(1)");

  return (
    <div className={s.containerMain}>
      <NavBar />
      <div className={s.container}>
        <div className={s.userInfoDiv} style={{ filter: handleDark }}>
          <Avatar className={s.profileImg} src={user ? user.picture : null} />
          <Text className={s.userName}>{name}</Text>

          <div className={s.userInfoCountDiv}>
            <Text className={s.userName} style={{textAlign: 'center'}}>Default shipping address:</Text>
            <Input
              type="text"
              width="80%"
              value={address}
              onChange={({target}) => setAddress(target.value)}
            />
            <button type= "button" style={{fontSize: '24px', margin: '10px', verticalAlign:'middle'}} onClick={handleSave}><BiSave /></button>
          </div>

          <div className={s.userInfoCountDiv}>
            <p>Created recipes: {filteredRecipes.length}</p>
            <p>Favorites: {userFavorites.length}</p>
          </div>
          <img src={pizza} alt="pizza" style={{ filter: handleDark }} />
        </div>
        <div className={s.boxesContainer}>
          <RecipesBox title="Favorites" recipes={userFavorites} />
          <RecipesBox title="Created recipes" recipes={filteredRecipes} />
          <UserReviewsBox />
          <div className={s.ordersContainer}>
            <Orders order_id={order_id} />
          </div>
        </div>
      </div>
    </div>
  );
}
