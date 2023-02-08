import React from "react";
import s from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  filterByDiet,
  setOrderBy,
  setFilteredIngredients,
  deleteFilteredIngredient,
  clearFilters,
} from "../../Redux/actions/index.js";

function Filters() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const orderBy = useSelector((state) => state.orderBy);
  const diets = useSelector((state) => state.diets);
  const ingredients = useSelector((state) => state.ingredients);
  const filteredIngredients = useSelector((state) => state.filteredIngredients);

  const orderSelectByAlphabetical = [
    { label: "Select Order Alphabetical", value: "" },
    { label: "A-Z", value: "A-Z" },
    { label: "Z-A", value: "Z-A" },
  ];

  const optionsDiets = diets.map((diet) => {
    diet = diet[0].toUpperCase() + diet.slice(1);
    return { label: diet, value: diet };
  });

  const handleOrder = (e, { type }) => {
    let cache = { ...orderBy };
    if (orderBy.type !== type) cache.type = type;
    cache.order = e.value;
    dispatch(setOrderBy(cache));
  };

  const handleFilterbyDiet = (event) => {
    dispatch(filterByDiet(event.value));
  };

  const optionsIngredients =
    ingredients &&
    ingredients.map((i) => {
      i = `${i.name[0].toUpperCase()}${i.name.slice(1)}`;
      return { label: i, value: i };
    });

  const handleIngredientesFilter = (value) => {
    value = `${value[0].toLowerCase()}${value.slice(1)}`;
    if (filteredIngredients.includes(value))
      dispatch(deleteFilteredIngredient(value));
    else dispatch(setFilteredIngredients(value));
  };

  const handleClearButton = () => {
    clearFilters();
  };

  return (
    <div className={s.container}>
      <Select
        className={s.select}
        options={optionsDiets}
        onChange={(e) => handleFilterbyDiet(e)}
        placeholder="Order By Diets"
      />
      <Select
        className={s.select}
        options={orderSelectByAlphabetical}
        onChange={(e) => handleOrder(e, { type: "title" })}
        placeholder="Order By Alphabetical"
      />
      <Select
        className={s.select}
        options={optionsIngredients}
        onChange={(e) => handleIngredientesFilter(e.value)}
        placeholder="Seleccionar ingredientes"
      />
      <div className={s.selectedIngredientsDiv}>
        {filteredIngredients.length > 0
          ? filteredIngredients.map((i, index) => {
              return (
                <p key={index}
                  className={s.ingredient}
                  onClick={() => handleIngredientesFilter(i)}
                >
                  {`${i[0].toUpperCase()}${i.slice(1)}`} | X
                </p>
              );
            })
          : null}
      </div>
      {/* <div className={s.clearButtonDiv}>
        <button className={s.clearButton} onClick={handleClearButton}>
          CLEAR FILTERS
        </button>
      </div> */}
      {/* <button onClick={() => console.log(ingredients)}>Ingredients</button>
      <button onClick={() => console.log(filteredIngredients)}>
        Filtered Ingredients
      </button>
      <button onClick={() => console.log(recipes)}>Recipes</button> */}
    </div>
  );
}

export default Filters;
