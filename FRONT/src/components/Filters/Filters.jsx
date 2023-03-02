import React, { useEffect, useState } from "react";
import s from "./Filters.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderBy,
  filterByDiet,
  setFilteredIngredients,
  deleteFilteredIngredient,
  clearFilters,
  setOrderByPriceOrRating,
} from "../../Redux/actions/filters";

import {
  setRecipesToShow,
  resetRecipesToShow,
  setFilteredRecipes,
  resetFilteredRecipes,
} from "../../Redux/actions/recipes";

import {
  Box,
  HStack,
  Flex,
  Stack,
  Spacer,
  VStack,
  Button,
  Text,
  useColorModeValue,
  Select
} from "@chakra-ui/react";

function Filters() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const recipesToShow = useSelector((state) => state.recipes.recipesToShow);
  const filteredDiet = useSelector((state) => state.filters.filteredDiet);
  const orderBy = useSelector((state) => state.filters.orderBy);
  const diets = useSelector((state) => state.filters.diets);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const filteredIngredients = useSelector(
    (state) => state.filters.filteredIngredients
  );
  const orderByPOrR = useSelector(
    (state) => state.filters.orderByPriceOrRating
  );

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
    <VStack>
      <Box width="30%" minWidth="200px" borderRadius="40%">
      <Select
          borderRadius="40%"
          height="40px"
          colorScheme="dark"
          bg={useColorModeValue("dark", "gray.800")}
          onChange={({target}) => handleIngredientesFilter(target.value)}
          placeholder="Select Ingredients"
          placeholderTextColor="gray.400"
        >
          {optionsIngredients?.map(({label, value}) => (<option value={value}>{label}</option>))}
        </Select>
        <Spacer />

      
      </Box>

      <Box
        background-color="rgba(255, 255, 255, 0.7)"
        color="green"
        width="50%"
        min-width="80px"
        min-height="1 rem"
        border="3px"
        solid="#b3b3b3"
        border-Radius="30%"
        display="flex"
        flex-wrap="wrap"
        gap="15px"
        padding="1rem"
        box-sizing="border-box"
      >
        {filteredIngredients.length > 0
          ? filteredIngredients.map((i, index) => {
              return (
                <Text
                  bgColor="brown"
                  borderRadius="5px"
                  color="#fff"
                  fontSize="20px"
                  height="1.5rem"
                  padding="0 5px"
                  display="flex"
                  justify-content="center"
                  align-items="center"
                  cursor="pointer"
                  key={index}
                  className={s.ingredient}
                  onClick={() => handleIngredientesFilter(i)}
                >
                  {`${i[0].toUpperCase()}${i.slice(1)}`} | X
                </Text>
              );
            })
          : null}
      </Box>
      <Spacer />


      <Box
        width="50%"
        align="center"
        justifyContent="center"
        minWidth="200px"
        colorScheme="dark"
        bg={useColorModeValue("gray.100", "gray.700")}
      >
        <Stack direction= {['column', 'column', 'row', 'row']} spacing='24px'
        justify={[ 'center', 'center', 'space-between']}>
        <Select
          bg={useColorModeValue("gray.100", "gray.700")}
          onChange={({target}) => handleFilterbyDiet(target)}
          placeholder="Filter By Diets"
        >
          {optionsDiets?.map(({label, value}) => (<option value={value}>{label}</option>))}
        </Select>

        <Select
          bg={useColorModeValue("gray.100", "gray.700")}
          onChange={({target}) => handleOrder(target.value)}
          placeholder="Order By A-Z"
          >
          {optionsOrderBy?.map(({label, value}) => (<option value={value}>{label}</option>))}
        </Select>

        <Select
          bg={useColorModeValue("gray.100", "gray.700")}
          options={optionOrderByPriceOrRating}
          onChange={({target}) => handleOrderPriceOrRating(target, { type: "price" })}
          placeholder="Order By Price"
          >
          {optionOrderByPriceOrRating?.map(({label, value}) => (<option value={value}>{label}</option>))}
        </Select>

        <Select
          bg={useColorModeValue("gray.100", "gray.700")}
          onChange={({target}) => handleOrderPriceOrRating(target, { type: "rating" })}
          placeholder="Order By Rating"
          >
          {optionOrderByPriceOrRating?.map(({label, value}) => (<option value={value}>{label}</option>))}
        </Select>
        </Stack>
      </Box>
    </VStack>
  );
}

export default Filters;
