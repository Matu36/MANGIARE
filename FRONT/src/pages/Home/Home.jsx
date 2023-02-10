import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/searchBar";
import { healthyTips } from "../../components/healthyTips/healthyTips";
import {
  getRecipes,
  getIngredients,
  resetRecipesToShow,
} from "../../Redux/actions";
import Paginations from "../../components/Paginations/Paginations";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeCardHorizontal from "../../components/RecipeCardHorizontal/RecipeCardHorizontal";
import Filters from "../../components/Filters/Filters";

export default function Home() {
  let dispatch = useDispatch(); 
  const recipes = useSelector((state) => state.recipes);
  const recipesToShow = useSelector((state) => state.recipesToShow);
  const orderBy = useSelector((state) => state.orderBy);
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
      <SearchBar />
      <br />
      
      <br />

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
