import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRecipeIdAutocomplete,
  setSearchValueName,
} from "../../Redux/actions/index.js";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { filterByDiet, setOrderBy, getIngredients } from "../../Redux/actions/index.js";
import s from "../SearchBar/searchBar.module.css";
import Select from "react-select";
import { useNavigate} from "react-router-dom";

export default function SearchBar() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  const diets = useSelector((state) => state.filters.diets);
  const orderBy = useSelector((state) => state.filters.orderBy);
  const navigate = useNavigate();

  const mapRecipes = recipes.map((r) => {
    return { name: r.title, id: r.id, img: r.image, diet: r.diets };
  });

  const handleOnSearch = (string, results) => {
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    console.log(result);
  };

  const handleOnSelect = (item) => {
    dispatch(setRecipeIdAutocomplete(item.id));
    dispatch(filterByDiet(""));
    dispatch(getIngredients(item.id))

    navigate(`/recipes/${item.id}`);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>{item.name}</span>
      </>
    );
  };

  const handleSearch = (event) => {
    dispatch(setSearchValueName(event.target.value));
  };

  const handleFilterbyDiet = (event) => {
    dispatch(filterByDiet(event.value));
  };

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

  return (
    <div className={s.container}>
      <div className={s.componentDiv}>
        <ReactSearchAutocomplete
          items={mapRecipes}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          placeholder="Search Recipe"
        />
      </div>
    </div>
  );
}
