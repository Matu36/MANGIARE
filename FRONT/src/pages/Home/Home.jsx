import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";
import SearchBar from "../../components/SearchBar/searchBar";
import { healthyTips } from "../../components/healthyTips/healthyTips";
import { getRecipes, getIngredients } from "../../Redux/actions";
import Paginations from "../../components/Paginations/Paginations";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import RecipeCardHorizontal from "../../components/RecipeCardHorizontal/RecipeCardHorizontal";
import Filters from "../../components/Filters/Filters";


export default function Home() {
  let dispatch = useDispatch(); // hooks para conectar con la actions
  const allRecipes = useSelector((state) => state.recipes);
  const recipeDetailIdAutocomplete = useSelector(
    (state) => state.recipeIdAutocomplete
  );

  // componentDidMount para hacer la solicitud a la api/db al iniciar el componente Home una sola vez.
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getIngredients());
  }, []);

  const [recipeByIdAutocomplete, setrecipeByIdAutocomplete] = useState();
  const [recipesToShow, setRecipesToShow] = useState(allRecipes);

  const filterById = () => {
    const cache = [...allRecipes];
    const recipe = cache.find(
      (recipe) => recipe.id === recipeDetailIdAutocomplete
    );
    setrecipeByIdAutocomplete(recipe);
  };

  useEffect(() => {
    filterById();
  }, [recipeDetailIdAutocomplete, allRecipes]);

  //                Filtro por DIET                  //---------------
  const [recipesByDiet, setRecipesForDiet] = useState(allRecipes);

  const filterbyDiet = useSelector((state) => state.filterByDiet);

  useEffect(() => {
    filterbyDiet === "All Diets"
      ? setRecipesForDiet(allRecipes)
      : setRecipesForDiet(
          allRecipes.filter((recipe) =>
            recipe.diets.some(
              (diet) => diet.toLowerCase() === filterbyDiet.toLowerCase()
            )
          )
        );
  }, [filterbyDiet, allRecipes]);

  //                 Filtro por Name                   //----------------

  // const [recipesByName, setRecipesByName] = useState(recipesByDiet);

  // const nameValue = useSelector((state) => state.searchValueName);

  // const filterByName = () => {
  //   let arrayCache = [...recipesByDiet];

  //   arrayCache = arrayCache.filter((recipe) =>
  //     recipe.title.toLowerCase().includes(nameValue.toLowerCase())
  //   );

  //   setRecipesByName(arrayCache);
  // };

  // useEffect(() => {
  //   filterByName();
  // }, [nameValue, recipesByDiet]);

  // ------------------------  FILTRO POR INGREDIENTE ------------------------

  const [recipesByIngredient, setRecipesByIngredient] = useState(recipesByDiet);
  const filteredIngredients = useSelector((state) => state.filteredIngredients);

  function filterByIngredient() {
    if (recipesByDiet.length <= 0) setRecipesByIngredient(allRecipes);
    if (filteredIngredients.length <= 0)
      filterbyDiet === "All Diets"
        ? setRecipesByIngredient(allRecipes)
        : setRecipesByIngredient(recipesByDiet);
    else
      setRecipesByIngredient(
        recipesByIngredient.filter((recipe) =>
          recipe.ingredients.some((ingredient) =>
            filteredIngredients.includes(ingredient.name)
          )
        )
      );
  }

  useEffect(() => {
    filterByIngredient();
    // console.log("allrecipes: ", allRecipes);
    // console.log("recipesByDiet: ", recipesByDiet);
    // console.log("recipesByIngredient: ", recipesByIngredient);
  }, [filteredIngredients, recipesByDiet]);

  //                 Filtro por Orden de Healthscore      //----------------------------

  const orderBy = useSelector((state) => state.orderBy);

  const orderByProp = () => {
    const { order, type } = orderBy;

    let cache = [...recipesByIngredient];

    if (order === "") return setRecipesByIngredient(recipesByIngredient);
    // El metodo sort ordena segun el valor mayor igual o menor que cero dependiendo la funciona comparadora
    cache.sort((a, b) => {
      if (a[type] < b[type])
        return order === "A-Z" || order === "Menor a Mayor" ? -1 : 1;
      if (a[type] > b[type])
        return order === "A-Z" || order === "Menor a Mayor" ? 1 : -1;
      return 0;
    });

    setRecipesByIngredient(cache);
  };

  useEffect(() => {
    orderByProp();
  }, [orderBy]);

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
    setTotalRecipes(
      recipesByIngredient.slice(indexFirstPageRecipe(), indexLastPageRecipe())
    );
    setNumberOfPage(Math.ceil(recipesByIngredient.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [recipesByIngredient, currentPage]);

  useEffect(() => {
    setCurrentPage(1); //setea el numero de pagina actual a 1 cuando recipesName Cambia
  }, [recipesByIngredient]);

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
    <div className={s.containerMain} >
      <NavBar />
      
   
      <SearchBar />
      <div className ={s.img} alt="randomImg" />

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
            {(orderBy.order !== "" ||
              filterbyDiet !== "" ||
              filteredIngredients.length <= 0) &&
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
            {(orderBy.order !== "" || filterbyDiet !== "") && (
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
