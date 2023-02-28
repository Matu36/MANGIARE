import React, { useEffect, useState } from "react";
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
  Image,
  Text,
  IconButton,
  Button,
  HStack,
  Flex,
  
} from "@chakra-ui/react";
import meat from "../../img/iconMeat.jpg";
import carrot from "../../img/carrotIcon.png";
import eggs from "../../img/eggsIcon.png";
import chicken from "../../img/chickenIcon.png";
import banner from "../../img/BannerHome.jpg";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { getUsers } from "../../Redux/actions/users";
import Swal from 'sweetalert2';
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

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getIngredients());
  }, []);


  useEffect(() => {
    if (isAuthenticated) {
      onExecutePostEmail(user);

    if (params.get("status") && params.get("preference_id")) {
      if (params.get("status") === 'approved')
        fetch(`${REACT_APP_BACK_URL}/payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: LS_user.email,
            status: params.get("status"),
            preference_id: params.get("preference_id"),
          }),
        })
          .then(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Your order has been paid',
              showConfirmButton: false,
              timer: 2000
            });
          });
      else
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Your order has not been paid',
          html: 'You can retry the payment or cancel it from <a href="/user"><b>User page</b></a>',
          showConfirmButton: true,
        })

    }
  }, [user, isAuthenticated]);

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
  const bgColor = useColorModeValue("linear-gradient(to bottom, #4CAF50, #f2f2f2)",
  "linear-gradient(to bottom, #2d3748, #1a202c)");
  const opacity = useColorModeValue(0.7, 0.9);

  const randomTip = () => {
    var myArray = healthyTips;
    var rand = Math.floor(Math.random() * myArray.length);
    var rValue = myArray[rand];
    return rValue;
  };

  return (
    <div>
      
      <NavBar />
      
      <Box
        width="100%"
        height="700px"
        marginTop="1px"
        backgroundImage={banner}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        
        <Box flex="1">
          <Text
            style={{ fontFamily: "Bistro Script, sans-serif" }}
            fontSize="80px"
            fontWeight="bold"
            width="800px"
            height="26px"
            maxWidth="100%"
            marginTop="250px"
            textAlign={"center"}
          >
            Cooking, simplified
          </Text>
        </Box>

        <Box
          width="70%"
          height="100px"
          marginTop="80px"
          marginBottom="50px"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
          }}
        >
          <Box flex="1">
            <Text
              style={{ fontFamily: "Caviar Dreams, sans-serif" }}
              fontWeight="bold"
              align="center"
              fontSize="25px"
              color="green.700"
              marginTop="1px"
              marginRight="20px"
            >
              Tell us which ingredients you have and we'll show the best recipes
              that match with them.{" "}
            </Text>
          </Box>
          <Box flex="1"></Box>
        </Box>
        
        <Box
          width="100%"
          height="100px"
          marginTop="5px"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Box>
          <Filters />
          </Box>
        </Box>
        <Text 
      fontFamily="Caviar Dreams, sans-serif"
      fontWeight="bold"
      align="center"
      fontSize="50px"
      color={textColore}
      marginTop="120px"
      marginRight="20px"
      background={bgColor}
      opacity={opacity}
      borderRadius="5%"
  
      width="50%"
    >
      {" "}
          Check our recipes!{" "}
    </Text>

      </Box>
      <Spacer h={5}  />
      <div className={s.img} alt="randomImg" />

      
      <div className={s.mainRecipesDiv}>
        {recipeByIdAutocomplete && (
          <RecipeCard
            id={recipeByIdAutocomplete.id}
            title={recipeByIdAutocomplete.title}
            image={recipeByIdAutocomplete.image}
            diets={recipeByIdAutocomplete.diets}
          />
        )}

        <div className={s.cardsContainer}>
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
              <div className="nFound">
                <img className="not found" alt="no Results" />
                <h2>No se encontraron resultados</h2>
              </div>
            ))}
        </div>

        <Box bg={bg} w="70%" rounded="md">
      <Flex align="center">
        <Center bg="gray.400" borderRadius="50%" w="1px" h="70px" />
        <Box w="10%" h="100%" display="flex" alignItems="center" justifyContent="center">
          <FaRegLightbulb size={24} />
        </Box>
        <Box w="89%" p={4} boxSizing="border-box">
          <Text fontSize="xl" fontWeight="bold" color={textColor}>¡Healthy Tip!</Text>
          <Text mt={2} color={textColor}>{randomTip()}</Text>
        </Box>
      </Flex>
    </Box>
 
          

        {/* <div className={s.moreRecipesDiv}>
            {totalRecipes?.slice(3).map((recipe) => (
              <RecipeCardHorizontal
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
                diets={recipe.diets}
              />
            ))}
          </div> */}

        <hr />
        <div className={s.divPagination}>
          {recipesToShow && (
            <Paginations
              currentPage={currentPage}
              numberOfPage={numberOfPage}
              handlePageNumber={handlePageNumber}
            />
          )}
        </div>
      </div>
    </div>
  );
}
