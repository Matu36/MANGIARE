import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredients } from "../../../../Redux/actions/ingredients";
import { Input, FormLabel, Button } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";

export default function IngredientForm() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

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

  //METODO SELECT MULTIPLE VALUE PARA UNITS

  const rowsMap = ingredients.map((product) => {
    return {
      units: product.units,
    };
  });

  const uniqueNames = {};
  const rowsFilter = rowsMap.filter((item) => {
    if (!uniqueNames[item.units]) {
      uniqueNames[item.units] = true;
      return true;
    }
    return false;
  });

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedItems(selectedItems.concat(selectedValues));
  };

  function deleteItem(item) {
    const selectedValues = selectedItems.filter(
      (selectedItem) => selectedItem !== item
    );
    setSelectedItems(selectedValues);
  }

  //FIN METODO SELECT MULTIPLE VALUE PARA UNITS

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <h4> Create Ingredient</h4>
      </div>
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
        <br />
        <div>
          <h5>Units</h5>
          <select multiple onChange={handleSelectChange}>
            {rowsFilter.map((unit, index) => (
              <option key={index} value={unit.units}>
                {unit.units}
              </option>
            ))}
          </select>

          {selectedItems.map((item, index) => (
            <span key={index}>
              {item}
              <button onClick={() => deleteItem(item)}>
                <BsTrash />{" "}
              </button>
            </span>
          ))}
        </div>
        <div>
          <Button type="submit">Create Ingredient</Button>
        </div>
      </div>
    </form>
  );
}
