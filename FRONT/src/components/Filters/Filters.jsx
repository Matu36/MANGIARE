import React, { useEffect, useState } from "react";
import s from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  filterByDiet,
  setOrderBy,
  setRecipesToShow,
  resetRecipesToShow,
  setFilteredIngredients,
  deleteFilteredIngredient,
  clearFilters,
} from "../../Redux/actions/index.js";

function Filters() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const recipesToShow = useSelector((state) => state.recipesToShow);
  const filteredDiet = useSelector((state) => state.filteredDiet);
  const orderBy = useSelector((state) => state.orderBy);
  const diets = useSelector((state) => state.diets);
  const ingredients = useSelector((state) => state.ingredients);
  const filteredIngredients = useSelector((state) => state.filteredIngredients);

  const order = useSelector((state) => state.orderBy);

  const optionsDiets = diets.map((diet) => {
    diet = diet[0].toUpperCase() + diet.slice(1);
    return { label: diet, value: diet };
  });

  const handleFilterbyDiet = (e) => {
    dispatch(filterByDiet(e.value));
  };

  useEffect(() => {
    if (filteredDiet === "All Diets") dispatch(resetRecipesToShow());
    else
      dispatch(
        setRecipesToShow(
          recipes.filter((recipe) =>
            recipe.diets.some(
              (diet) => diet.toLowerCase() === filteredDiet.toLowerCase()
            )
          )
        )
      );
  }, [filteredDiet, recipes]);

  const optionsOrderBy = [
    { label: "Select Order Alphabetical", value: "" },
    { label: "A-Z", value: "az" },
    { label: "Z-A", value: "za" },
  ];

  const handleOrder = (e) => {
    dispatch(setOrderBy(e));
  };

  useEffect(() => {
    let result;
    if (orderBy === "az") {
      result = recipesToShow.sort((a, b) => {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        if (a < b) return -1;
        else if (a > b) return 1;
        else return 0;
      });
      dispatch(setRecipesToShow(result));
    } else if (orderBy === "za") {
      result = recipesToShow.sort((a, b) => {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        if (a < b) return 1;
        else if (a > b) return -1;
        else return 0;
      });
      dispatch(setRecipesToShow(result));
    } else return;
  }, [orderBy, recipesToShow]);

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

  function filterRecipes(recipes, ingredients, filteredIngredients) {
    const idsfilteredIngredients = ingredients
      .filter((ingredient) => filteredIngredients.includes(ingredient.name))
      .map((ingredient) => ingredient.id);

    let filteredRecipes = recipes.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map(
        (ingredient) => ingredient.id
      );
      return idsfilteredIngredients.some((id) =>
        recipeIngredients.includes(id)
      );
    });
    dispatch(setRecipesToShow(filteredRecipes));
  }

  useEffect(() => {
    filteredIngredients.length > 0
      ? filterRecipes(recipes, ingredients, filteredIngredients)
      : dispatch(resetRecipesToShow());
  }, [filteredIngredients]);

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
        options={optionsOrderBy}
        onChange={(e) => handleOrder(e.value)}
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
                <p
                  key={index}
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
    </div>
  );
}

export default Filters;
