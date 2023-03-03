import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRecipeIdAutocomplete } from "../../Redux/actions/autocomplete";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { filterByDiet } from "../../Redux/actions/filters";
import { getIngredients } from "../../Redux/actions/ingredients";
import s from "../SearchBar/searchBar.module.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
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
    dispatch(getIngredients(item.id));

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
          className={s.ReactSearchAutocomplete}
        />
      </div>
    </div>
  );
}
