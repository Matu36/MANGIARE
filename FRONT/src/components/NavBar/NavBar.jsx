import React, { useState, useEffect } from "react";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { BsCartCheck, BsCart4 } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../Auth0/login_button";
import { LogoutButton } from "../Auth0/logout_button";
import SearchBar from "../../components/SearchBar/searchBar";
import logo from "../../img/LOGO 2.png";
import mangiare from "../../img/LOGO.png";
import UserMenu from "../UserMenu/UserMenu";
import onExecutePostEmail from "../Auth0/onLogin.js";

function NavBar(userLocalstorage) {
  const { user, isAuthenticated } = useAuth0();
  const [cartItems, setCartItems] = useState(0);
  const [userLocal, setUserLocal] = useState();

  // const LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart")) || [];

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("MANGIARE_cart"));
    setCartItems(items ? items.length : 0);
  }, [userLocalstorage]);

  useEffect(() => {
    if (isAuthenticated) {
      onExecutePostEmail(user).then(() => setUserLocal(JSON.parse(localStorage.getItem("MANGIARE_user"))))
    }
  }, [user, isAuthenticated]);

  return (
    <div className={s.container}>
      <Link to={"/home"}>
        <img
          style={{ width: "65px", height: "60px" }}
          src={mangiare}
          alt="logo"
          className={s.logo}
        />
      </Link>

      <Link to={"/createRecipe"}>
        <button className={s.btn1}>CREATE RECIPE</button>
      </Link>
     {/*  <Link to={"/myRecipes"}>
        <button className={s.btn1}>MY RECIPES</button>
      </Link> */}
      {/* <Link to={"/aboutUs"}>
        <button className={s.btn1}>ABOUT US</button>
      </Link> */}
      {/* <Link to={"/contact"}>
        <button className={s.btn1}>CONTACT</button>
      </Link> */}
      <SearchBar />

      <div className={s.shoppingCartButton}>
        <Link to={"/shoppingCart"}>
          {cartItems > 0 && <div className={s.cartItemCount}>{cartItems}</div>}
          <BsCart4 size={30} />
        </Link>
      </div>
      {isAuthenticated ? (
        <div className={s.btn2}>
          <UserMenu userLocal={userLocal}/>{" "}
        </div>
      ) : (
        <div className={s.btn1}>
          <LoginButton />
        </div>
      )}
    </div>
  );
}

export default NavBar;
