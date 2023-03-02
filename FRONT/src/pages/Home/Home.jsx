import React, { useEffect, useState, createContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Home.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/searchBar";
import { healthyTips } from "../../components/healthyTips/healthyTips";
import { getRecipes, resetRecipesToShow } from "../../Redux/actions/recipes";
import { setCart } from "../../Redux/actions/cart";
import { getIngredients } from "../../Redux/actions/ingredients";
import Paginations from "../../components/Paginations/Paginations";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeCardHorizontal from "../../components/RecipeCardHorizontal/RecipeCardHorizontal";
import Filters from "../../components/Filters/Filters";
import onExecutePostEmail from "../../components/Auth0/onLogin.js";
import ColorModeSwitcher from "../DarkMode/ColorModeSwitcher";
import { FaRegLightbulb } from "react-icons/fa";
import {
  useColorModeValue,
  Center,
  Box,
  Spacer,
  Slider,
  Image,
  Text,
  IconButton,
  Button,
  HStack,
  VStack,
  Stack,
  Flex,
} from "@chakra-ui/react";

import banner from "../../img/BannerHome.jpg";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { getUsers } from "../../Redux/actions/users";
import Swal from "sweetalert2";
const { REACT_APP_BACK_URL } = process.env;

export default function Home() {
  let dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();
  const recipes = useSelector((state) => state.recipes.recipes);
  const recipesToShow = useSelector((state) => state.recipes.recipesToShow);
  const filteredRecipes = useSelector((state) => state.recipes.filteredRecipes);
  const orderBy = useSelector((state) => state.filters.orderBy);
  const cart = useSelector((state) => state.cart.cart);
  const filteredIngredients = useSelector(
    (state) => state.filters.filteredIngredients
  );
  const recipeDetailIdAutocomplete = useSelector(
    (state) => state.autocomplete.recipeIdAutocomplete
  );
  const [userLocalstorage, setUserLocalstorage] = useState();

  const params = new URLSearchParams(window.location.search);
  const LS_user = JSON.parse(localStorage.getItem("MANGIARE_user"));

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getIngredients());

    if (params.get("status") && params.get("preference_id")) {
      if (params.get("status") === "approved")
        fetch(`${REACT_APP_BACK_URL}/payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: LS_user.email,
            status: params.get("status"),
            preference_id: params.get("preference_id"),
          }),
        }).then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your order has been paid",
            showConfirmButton: false,
            timer: 2000,
          });
        });
      else
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Your order has not been paid",
          html: 'You can retry the payment or cancel it from <a href="/user"><b>User page</b></a>',
          showConfirmButton: true,
        });
    }
  }, []);

  useEffect(() => {
    dispatch(resetRecipesToShow());
  }, [recipes]);

  //                   --------------- localStorage ---------------
  useEffect(() => {
    let LS_cart = JSON.parse(localStorage.getItem("MANGIARE_cart"));
    if (!LS_cart) return;
    else {
      dispatch(setCart(LS_cart));
      // if (isAuthenticated) {
      //   localStorage.setItem("MANGIARE_user", JSON.stringify(user.email));
      //   localStorage.setItem("MANGIARE_userInfo", JSON.stringify(user));
      // }
    }
  }, [user, isAuthenticated]);
  //                 --------------- fin localStorage ---------------

  const [recipeByIdAutocomplete, setrecipeByIdAutocomplete] = useState();

  const filterById = () => {
    const cache = [...recipes];
    const recipe = cache.find(
      (recipe) => recipe.id === recipeDetailIdAutocomplete
    );
    setrecipeByIdAutocomplete(recipe);
  };

  useEffect(() => {
    filterById();
  }, [recipeDetailIdAutocomplete, recipes]);

  //                 Paginacion del contenido             //-----------------------------

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalRecipes, setTotalRecipes] = useState([]); //Recetas Totales Seteada en Array Vacio

  const indexFirstPageRecipe = () => (currentPage - 1) * 9; // Indice del primer Elemento
  const indexLastPageRecipe = () => indexFirstPageRecipe() + 9; //Indice del segundo elemento

  const handlePageNumber = (number) => {
    //Manejo del numero de pagina
    setCurrentPage(number);
  };

  useEffect(() => {
    //Cambio de estado local de Total Recipes indicando los indices que tiene que renderizar en cada pagina
    recipesToShow &&
      setTotalRecipes(
        filteredRecipes.slice(indexFirstPageRecipe(), indexLastPageRecipe())
      );
    filteredRecipes && setNumberOfPage(Math.ceil(filteredRecipes.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [filteredRecipes, currentPage, orderBy, filteredIngredients]);

  useEffect(() => {
    setCurrentPage(1); //setea el numero de pagina actual a 1 cuando recipesName Cambia
  }, [filteredRecipes]);

  /*const mapArrayDeObetos = allRecipes.map((r) =>{
    return {name:r.title,
            img:r.image,
            diets: r.diets}
  })

  const randomImg = () => {
    var myArray = mapArrayDeObetos;
    var rand = Math.floor(Math.random() * myArray.lenght);
    var rValue = myArray[rand];
    return rValue;
  }*/
  const bg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "white");
  const textColore = useColorModeValue("yellow.900", "gray.200");
  const bgColor = useColorModeValue(
    "linear-gradient(to bottom, #4CAF50, #f2f2f2)",
    "linear-gradient(to bottom, #2d3748, #1a202c)"
  );
  const opacity = useColorModeValue(0.7, 0.9);

  const randomTip = () => {
    var myArray = healthyTips;
    var rand = Math.floor(Math.random() * myArray.length);
    var rValue = myArray[rand];
    return rValue;
  };

  return (
    <Stack>
      <NavBar />
      <IconButton onClick={ColorModeSwitcher} />

      <Box
        w="100%"
        h={["420px", "420px", "500px", "500px"]}
        marginTop="1px"
        backgroundImage={banner}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundSize: "cover",
          backgroundPosition: "center bottom 60%",
        }}
      >
        <Text
          style={{ fontFamily: "Bistro Script, sans-serif" }}
          fontSize={{ base: "56px", md: "70px", lg: "80px" }}
          fontWeight="bold"
          width="100%"
          height={["5%", "5%", "60px", "60px"]}
          maxWidth="100%"
          marginTop={["25%", "25%", "15%", "1%"]}
          textAlign="center"
        >
          Cooking, simplified
        </Text>
        <Text
          style={{ fontFamily: "Caviar Dreams, sans-serif" }}
          fontWeight="bold"
          align="center"
          marginTop={["200px", "200px", "100px", "100px"]}
          fontSize={["15px", "15px", "40px", "40px"]}
          color="green.700"
        >
          Tell us which ingredients you have 
          <br/>and we'll show the best recipes
          that match with them.{" "}
        </Text>
      </Box>
      <Filters />
      <Spacer h="60px" />
      <Center>
        <Box
          marginTop="50px"
          p={4}
          fontFamily="Caviar Dreams, sans-serif"
          fontWeight="bold"
          textAlign={{ base: "center", md: "center", lg: "center" }}
          fontSize={{ base: "40px", md: "45px", lg: "45px" }}
          color='teal.700'
          background='white'
          opacity='0.8'
          borderRadius="5px"
          w={["80%", '80%', '40%', '40%']}
          h="20%"
          backgroundImage={banner}
          backgroundPosition="center bottom 60%"
          backgroundSize="cover"
      //     style={{
      //       background: "linear-gradient(to bottom right, #f2e2d2, #8da9c4), linear-gradient(to top left, #f2e2d2, #8da9c4)",
      // backgroundSize: "20px 20px",
      // backgroundPosition: "0 0, 10px 10px",
      // filter: "brightness(90%) saturate(80%) hue-rotate(-20deg) contrast(120%)"
      //     }}
        >
          Check our recipes!
        </Box>
      </Center>

      <Box
        w="100%"
        h="60%"
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
      >
        {recipeByIdAutocomplete && (
          <RecipeCard
            id={recipeByIdAutocomplete.id}
            title={recipeByIdAutocomplete.title}
            image={recipeByIdAutocomplete.image}
            diets={recipeByIdAutocomplete.diets}
          />
        )}

        <Box className={s.cardsContainer}>
          {recipesToShow &&
            (totalRecipes
              ?.slice(0, 8)
              .map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  id={recipe.id}
                  title={recipe.title}
                  image={recipe.image}
                  diets={recipe.diets}
                />
              )) || (
              <Box className="nFound">
                <Image className="not found" alt="no Results" />
                <Text>No se encontraron resultados</Text>
              </Box>
            ))}
        </Box>
        <Center>
          <Box
            display="flex"
            flexDirection={["column", "column", "row", "row"]}
            w="60%"
            p="10px"
            alignItems="center"
            justifyContent="center"
          >
            <FaRegLightbulb size={80} />
            <Spacer />
            {/* </Box>
        <Box boxSizing="border-box" p="20px"> */}
            <Text p={3} fontSize="xl" fontWeight="bold" color={textColor}>
              ¡Healthy Tip!
            </Text>
            <Spacer />
            <Text color={textColor}>{randomTip()}</Text>
          </Box>
        </Center>

        <Spacer />
        <Button display="flex" justifyContent="center">
          {recipesToShow && (
            <Paginations
              currentPage={currentPage}
              numberOfPage={numberOfPage}
              handlePageNumber={handlePageNumber}
            />
          )}
        </Button>
      </Box>
    </Stack>
  );
}
