import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Home.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/searchBar";
import { healthyTips } from "../../components/healthyTips/healthyTips";
import {
  getRecipes,
  getIngredients,
  resetRecipesToShow,
  setCart,
} from "../../Redux/actions";
import Paginations from "../../components/Paginations/Paginations";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeCardHorizontal from "../../components/RecipeCardHorizontal/RecipeCardHorizontal";
import Filters from "../../components/Filters/Filters";
import { Box, Image, Text, IconButton, Button, HStack } from "@chakra-ui/react";
import meat from "../../img/iconMeat.jpg";
import carrot from "../../img/carrotIcon.png";
import eggs from "../../img/eggsIcon.png";
import chicken from "../../img/chickenIcon.png";
import banner from "../../img/BannerHome.jpg";
import IngredientsList from "../../components/IngredientsList/ingredientsList";
import { ArrowDownIcon } from "@chakra-ui/icons";

export default function Home() {
  let dispatch = useDispatch();
  const { user } = useAuth0();
  const recipes = useSelector((state) => state.recipes);
  const recipesToShow = useSelector((state) => state.recipesToShow);
  const orderBy = useSelector((state) => state.orderBy);
  const cart = useSelector((state) => state.cart);
  const filteredIngredients = useSelector((state) => state.filteredIngredients);
  const recipeDetailIdAutocomplete = useSelector(
    (state) => state.recipeIdAutocomplete
  );

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    dispatch(resetRecipesToShow());
  }, [recipes]);

  //                   --------------- localStorage ---------------
  useEffect(() => {
    let LS_cart = JSON.parse(localStorage.getItem("cart"));
    if (!LS_cart) return;
    else {
      if (user) {
        let email = user.email;
        LS_cart.hasOwnProperty(email)
          ? dispatch(setCart(LS_cart[email]))
          : dispatch(setCart([]));
      } else {
        LS_cart.hasOwnProperty("guest")
          ? dispatch(setCart(LS_cart.guest))
          : dispatch(setCart([]));
      }
    }
  }, [user]);

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
        recipesToShow.slice(indexFirstPageRecipe(), indexLastPageRecipe())
      );
    recipesToShow && setNumberOfPage(Math.ceil(recipesToShow.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [recipesToShow, currentPage, orderBy, filteredIngredients]);

  useEffect(() => {
    setCurrentPage(1); //setea el numero de pagina actual a 1 cuando recipesName Cambia
  }, [recipesToShow]);

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

  const randomTip = () => {
    var myArray = healthyTips;
    var rand = Math.floor(Math.random() * myArray.length);
    var rValue = myArray[rand];
    return rValue;
  };

  return (
    <div className={s.containerMain}>
      <NavBar />
      <Box
        width="100%"
        height="850px"
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
        <Text
          style={{ fontFamily: "Bistro Script, sans-serif" }}
          fontSize="100px"
          fontWeight="bold"
          width="597px"
          height="116px"
          maxWidth="100%"
          marginTop="200px"
        >
          MANGIAR-E
        </Text>
        <Box
          width="70%"
          height="100px"
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
              fontSize="30px"
              color="green.500"
              marginTop="20px"
              marginRight="20px"
            >
              Tell us which ingredients you have and we'll show the best recipes
              that match with them{" "}
            </Text>
          </Box>
          <Box flex="1">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="500px"
              marginTop="20px"
            >
              <Button
                flex="1"
                aria-label="Search"
                width="60px"
                height="60px"
                backgroundImage={meat}
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
                backgroundPosition="center center"
                transition="all 0.2s ease-in-out"
                _hover={{ transform: "scale(1.2)" }}
              />
              <Button
                flex="1"
                aria-label="Search"
                width="60px"
                height="60px"
                backgroundImage={carrot}
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
                backgroundPosition="center center"
                transition="all 0.2s ease-in-out"
                _hover={{ transform: "scale(1.2)" }}
              />
              <Button
                flex="1"
                aria-label="Search"
                width="60px"
                height="60px"
                backgroundImage={eggs}
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
                backgroundPosition="center center"
                transition="all 0.2s ease-in-out"
                _hover={{ transform: "scale(1.2)" }}
              />
              <Button
                flex="1"
                aria-label="Search"
                width="60px"
                height="60px"
                backgroundImage={chicken}
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
                backgroundPosition="center center"
                transition="all 0.2s ease-in-out"
                _hover={{ transform: "scale(1.2)" }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          width="50%"
          height="100px"
          marginTop="100px"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{ fontFamily: "Caviar Dreams, sans-serif" }}
            fontWeight="bold"
            fontStyle="italic"
            fontSize="25px"
            color="yellow.700"
            marginTop="20px"
          >
            Have some more ingredients? Search here
          </Text>
          <SearchBar />
        </Box>

        <Text
          fontSize="3xl"
          textAlign="center"
          fontWeight="bold"
          color="yellow.900"
          marginTop="20px"
        >
          {" "}
          Check our recipes!{" "}
        </Text>
        <ArrowDownIcon w={20} h={20} color="yellow.900" marginTop="20px" />
      </Box>

      <div className={s.img} alt="randomImg" />

      <div className={s.mainContainDiv}>
        <div className={s.filtersContainerDiv}>
          <Filters />
        </div>
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
                ?.slice(0, 3)
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

          <div className={s.healtyTipDiv}>
            <div className={s.healtyTipIconDiv}>💡</div>
            <div className={s.verticalDiv}></div>
            <div className={s.healtyTipMainContain}>
              <p>Healthy Tip</p>
              <p>{randomTip()}</p>
            </div>
          </div>

          <div className={s.moreRecipesDiv}>
            {totalRecipes?.slice(3).map((recipe) => (
              <RecipeCardHorizontal
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
                diets={recipe.diets}
              />
            ))}
          </div>

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
    </div>
  );
}
