import React, { useState, useEffect } from "react";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { BsCartCheck, BsCart4 } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../Auth0/login_button";
import { LogoutButton } from "../Auth0/logout_button";
import SearchBar from "../../components/SearchBar/searchBar";
import logo from "../../img/LOGO 2.png";
import mangiare from "../../img/transparentLogo.png";
import UserMenu from "../UserMenu/UserMenu";
import onExecutePostEmail from "../Auth0/onLogin.js";
import {
  Image,
  Flex,
  Box,
  Text,
  Button,
  useColorMode,
  IconButton,
  Switch,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ColorModeSwitcher from "../../pages/DarkMode/ColorModeSwitcher.jsx";
import { useColorModeValue } from "@chakra-ui/react"

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
      onExecutePostEmail(user).then(() =>
        setUserLocal(JSON.parse(localStorage.getItem("MANGIARE_user")))
      );
    }
  }, [user, isAuthenticated]);


  const [display, changeDisplay] = useState('none')


  const bg = useColorModeValue("white",
  "linear-gradient(to bottom, #2d3748, #1a202c)");

  const imgFunction = useColorModeValue("invert(0)", "invert(1)");

  const colorShop = useColorModeValue("black", "white");
  
    return (
      <Flex
        
      >
        <Flex
          position="fixed"
          top='0'
          height='4rem'
          // right="1rem"
          align="center"
          justify="space-between"
          background = {bg}
          w="100%"
          zIndex="10"
          boxSizing="border-box"
        >
          {/* Desktop */}
          <Flex
            display={['none', 'none', 'flex','flex']}
            // flexDir="row"
            height="100%"
            justifyContent="space-between"
             w="100%"
            align="center"
          >
            <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                display="flex"
  alignItems="center"
  justifyContent="center"
  padding="0"
  margin="0"
  width="60px"
  height="55px"
              >
            <Link to={"/home"}>
        <Image
          style={{ width: "60px", height: "55px", filter: imgFunction }}
          align="center"
          
          src={mangiare}

          alt="logo"

        />
      </Link>
      </Button>

      <ColorModeSwitcher color= {colorShop} />

          <Link to={"/createRecipe"}>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
              Create Recipe
            </Button>
          </Link>

          <SearchBar />

            <div className={s.shoppingCartButton} style={{color: colorShop }}>
     <Link to={"/shoppingCart"}>
           {cartItems > 0 && <div className={s.cartItemCount}>{cartItems}</div>}
           
           <BsCart4 size={30} />
         </Link>
       </div>

                       

       {isAuthenticated ? (
         <Button
         as="a"
         variant="ghost"
         aria-label="Contact"
        my={5}
         w="5%"
       >
           <UserMenu userLocal={userLocal} />{" "}
         </Button>
       ) : (
        <Button
        as="a"
        variant="ghost"
        aria-label="Contact"
        // my={5}
        w="5%"
      >
           <LoginButton />
         </Button>
  
        )}
            

            
          </Flex>
  
          {/* Mobile */}

        <Flex
          display={["flex", "flex", "none", "none"]}
          justify="space-between"
          width={"100%"}
          align="center"
        >
          {/* <Link to={"/home"}>
        <Image
          style={{ width: "50px", height: "45px" }}
          align="center"
          marginTop='10px'
          src={mangiare}
          alt="logo"
        />
      </Link> */}

          <IconButton
            aria-label="Open Menu"
            size="lg"
            // mr={2}
            icon={<HamburgerIcon />}
            onClick={() => changeDisplay("flex")}
            display={["flex", "flex", "none", "none"]}
          />

          <SearchBar />

          {/* <div className={s.shoppingCartButton}>
     <Link to={"/shoppingCart"}>
           {cartItems > 0 && <div className={s.cartItemCount}>{cartItems}</div>}
           <BsCart4 size={30} />
         </Link>
       </div> */}

          {isAuthenticated ? (
            <div className={s.btn2}>
              <UserMenu userLocal={userLocal} />{" "}
            </div>
          ) : (
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="10%">
              <LoginButton />
            </Button>
          )}
        </Flex>
      </Flex>
      {/* <Switch
            color="green"
            isChecked={isDark}
            onChange={toggleColorMode}
          /> */}

      {/* Mobile Content */}
      <Flex
        w="70vw"
        display={display}
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        // justifyContent={'space-evenly'}

        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-center">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay("none")}
          />
        </Flex>

        <Flex flexDir="column" align="center">
          <Link to="/">
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Home
            </Button>
          </Link>

          <Link to={"/createRecipe"}>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
              Create Recipe
            </Button>
          </Link>

          <ColorModeSwitcher />

          <div className={s.shoppingCartButton}>
            <Link to={"/shoppingCart"}>
              {cartItems > 0 && (
                <div className={s.cartItemCount}>{cartItems}</div>
              )}
              <BsCart4 size={30} />
            </Link>
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default NavBar;

// import React, { useState, useEffect } from "react";
// import s from "./NavBar.module.css";
// import { Link } from "react-router-dom";
// import { BsCartCheck, BsCart4 } from "react-icons/bs";
// import { useAuth0 } from "@auth0/auth0-react";
// import { LoginButton } from "../Auth0/login_button";
// import { LogoutButton } from "../Auth0/logout_button";
// import SearchBar from "../../components/SearchBar/searchBar";
// import logo from "../../img/LOGO 2.png";
// import mangiare from "../../img/LOGO.png";
// import UserMenu from "../UserMenu/UserMenu";
// import onExecutePostEmail from "../Auth0/onLogin.js";
// import ColorModeSwitcher from "../../pages/DarkMode/ColorModeSwitcher";

// function NavBar(userLocalstorage) {
//   const { user, isAuthenticated } = useAuth0();
//   const [cartItems, setCartItems] = useState(0);
//   const [userLocal, setUserLocal] = useState();

//   // const LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart")) || [];

//   useEffect(() => {
//     const items = JSON.parse(localStorage.getItem("MANGIARE_cart"));
//     setCartItems(items ? items.length : 0);
//   }, [userLocalstorage]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       onExecutePostEmail(user).then(() =>
//         setUserLocal(JSON.parse(localStorage.getItem("MANGIARE_user")))
//       );
//     }
//   }, [user, isAuthenticated]);

//   return (
//     <div className={s.container}>
//       <Link to={"/home"}>
//         <img
//           style={{ width: "65px", height: "60px" }}
//           src={mangiare}
//           alt="logo"
//           className={s.logo}
//         />
//       </Link>
//       <ColorModeSwitcher />
//       <Link to={"/createRecipe"}>
//         <button className={s.btn1}>CREATE RECIPE</button>
//       </Link>
//       {/*  <Link to={"/myRecipes"}>
//         <button className={s.btn1}>MY RECIPES</button>
//       </Link> */}
//       {/* <Link to={"/aboutUs"}>
//         <button className={s.btn1}>ABOUT US</button>
//       </Link> */}
//       {/* <Link to={"/contact"}>
//         <button className={s.btn1}>CONTACT</button>
//       </Link> */}
//       <SearchBar />

//       <div className={s.shoppingCartButton}>
//         <Link to={"/shoppingCart"}>
//           {cartItems > 0 && <div className={s.cartItemCount}>{cartItems}</div>}
//           <BsCart4 size={30} />
//         </Link>
//       </div>
//       {isAuthenticated ? (
//         <div className={s.btn2}>
//           <UserMenu userLocal={userLocal} />{" "}
//         </div>
//       ) : (
//         <div className={s.btn1}>
//           <LoginButton />
//         </div>
//       )}
//     </div>
//   );
// }

// export default NavBar;
