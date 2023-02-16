import React, { useEffect, useState } from "react";
import s from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  filterByDiet,
  setOrderBy,
  setRecipesToShow,
  resetRecipesToShow,
  setFilteredRecipes,
  resetFilteredRecipes,
  setFilteredIngredients,
  deleteFilteredIngredient,
  clearFilters,
  setOrderByPriceOrRating,
} from "../../Redux/actions/index.js";

import { Box, HStack, VStack, Button, Text } from "@chakra-ui/react";

function Filters() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const recipesToShow = useSelector((state) => state.recipes.recipesToShow);
  const filteredDiet = useSelector((state) => state.filters.filteredDiet);
  const orderBy = useSelector((state) => state.filters.orderBy);
  const diets = useSelector((state) => state.filters.diets);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const filteredIngredients = useSelector((state) => state.filters.filteredIngredients);
  const orderByPOrR = useSelector((state) => state.filters.orderByPriceOrRating);

  const optionsDiets = diets.map((diet) => {
    diet = diet[0].toUpperCase() + diet.slice(1);
    return { label: diet, value: diet };
  });

  const handleFilterbyDiet = (e) => {
    dispatch(filterByDiet(e.value));
  };

  useEffect(() => {
    if (filteredDiet === "All Diets") dispatch(resetFilteredRecipes());
    else
      dispatch(
        setFilteredRecipes(
          recipesToShow.filter((recipe) =>
            recipe.diets.some(
              (diet) => diet.toLowerCase() === filteredDiet.toLowerCase()
            )
          )
        )
      );
  }, [filteredDiet, recipes, recipesToShow]);

  const optionsOrderBy = [
    { label: "Select Order Alphabetical", value: "" },
    { label: "A-Z", value: "az" },
    { label: "Z-A", value: "za" },
  ];

  const handleOrder = (e) => {
    dispatch(setOrderBy(e));
  };

  useEffect(() => {
    let result = recipesToShow;
    if (orderBy === "az") {
      result = result.sort((a, b) => {
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

  const optionOrderByPriceOrRating = [
    { label: "Select Order", value: "" },
    { label: "Major to Minor", value: "Major to Minor" },
    { label: "Minor to Major", value: "Minor to Major" },
  ];

  const handleOrderPriceOrRating = (e, { type }) => {
    let cache = { ...orderByPOrR };

    if (orderByPOrR.type !== type) cache.type = type;

    cache.order = e.value;

    dispatch(setOrderByPriceOrRating(cache));
  };

  const orderByProp = () => {
    const { order, type } = orderByPOrR;
    dispatch(setOrderBy(""));
    let cache = [...recipesToShow];

    if (order === "") return dispatch(setRecipesToShow(cache));

    // El metodo sort ordena segun el valor mayor igual o menor que cero dependiendo la funciona comparadora.
    cache = cache.sort((a, b) => {
      if (a[type] < b[type]) return order === "Minor to Major" ? -1 : 1;
      if (a[type] > b[type]) return order === "Minor to Major" ? 1 : -1;
      return 0;
    });

    dispatch(setRecipesToShow(cache));
  };

  useEffect(() => {
    orderByProp();
  }, [orderByPOrR]);

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
    <Box
      width="100%"
      mt={38}
      style={{
        display: "flex",
        alignItems: "",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <VStack spacing="20px">
        <Select
          className={s.selectIngredients}
          options={optionsIngredients}
          onChange={(e) => handleIngredientesFilter(e.value)}
          placeholder="Select Ingredients"
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

        <HStack spacing="100px">
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
            placeholder="Order By A-Z"
          />
          <Select
            className={s.select}
            options={optionOrderByPriceOrRating}
            onChange={(e) => handleOrderPriceOrRating(e, { type: "price" })}
            placeholder="Order By Price"
          />
          <Select
            className={s.select}
            options={optionOrderByPriceOrRating}
            onChange={(e) => handleOrderPriceOrRating(e, { type: "rating" })}
            placeholder="Order By Rating"
          />
        </HStack>
      </VStack>
    </Box>
  );
}

export default Filters;
