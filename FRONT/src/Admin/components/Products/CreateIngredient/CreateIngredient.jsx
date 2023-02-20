import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createIngredients } from "../../../../Redux/actions/ingredients";
import { Input, FormLabel, Button } from "@chakra-ui/react";

export default function IngredientForm() {
  const dispatch = useDispatch();

  const [ingredient, setIngredient] = useState({
    name: "",
    price: "",
    units: [],
  });

  const handleOnChange = (e) => {
    if (e.target.name === "units") {
      setIngredient({ ...ingredient, units: [e.target.value] });
    } else
      setIngredient({
        ...ingredient,
        [e.target.name]: e.target.value,
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (ingredient.name && ingredient.price && ingredient.units) {
      dispatch(createIngredients(ingredient)); // crea el ingrediente
      window.location.reload();
      alert("Ingredient has created");
      setIngredient({
        name: "",
        price: "",
        units: [],
      });
    } else {
      alert("Please, check the information");
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <h4> Create Ingredient</h4>
        <div>
          <FormLabel>
            <p>Name</p>
            <Input
              type="text"
              name="name"
              value={ingredient.name}
              autoComplete="off"
              placeholder="Ingredient"
              onChange={handleOnChange}
            />
          </FormLabel>
        </div>
        <div>
          <FormLabel>
            <p>Price</p>
            <Input
              type="number"
              name="price"
              value={ingredient.price}
              autoComplete="off"
              placeholder="Price "
              onChange={handleOnChange}
            />
          </FormLabel>
          <FormLabel>
            <p>Units</p>
            <Input
              type="text"
              name="units"
              value={ingredient.units[ingredient.units.length - 1]}
              autoComplete="off"
              placeholder="Units"
              onChange={handleOnChange}
            />
          </FormLabel>
        </div>
        <div>
          <Button type="submit">Create Ingredient</Button>
        </div>
      </div>
    </form>
  );
}
