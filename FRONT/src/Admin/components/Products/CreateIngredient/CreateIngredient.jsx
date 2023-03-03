import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredients } from "../../../../Redux/actions/ingredients";
import { Input, FormLabel, Button } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import "./createingredient.css";
import { Box, Text, Flex, VStack, HStack, Spacer } from "@chakra-ui/react";
import Swal from "sweetalert2";
export default function IngredientForm() {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  //CREACION DE INGREDIENTE //
  const [ingredient, setIngredient] = useState({
    name: "",
    price: "",
    stock: "",
    units: [],
  });

  const [selectedItems, setSelectedItems] = useState([]);

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
    if (ingredient.name && ingredient.price && selectedItems.length && ingredient.stock) {
      const newIngredient = {
        ...ingredient,
        units: selectedItems,
      };
      dispatch(createIngredients(newIngredient));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Ingredient has been created",
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.reload();
      setIngredient({
        name: "",
        price: "",
        units: [],
      });
      setSelectedItems([]);
    } else {
      Swal.fire({
          position: "center",
          icon: "error",
          title: "Please, complete all fields",
          showConfirmButton: true,
        });
    }
  };

  //FIN CREACION DE INGREDIENTE //

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

  const handleSelectChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    const newItems = selectedValues.map((value) => value + ", ");
    setSelectedItems(selectedItems.concat(newItems));
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
    <Box border="6px solid"
  borderColor="gray.400"
  borderRadius="lg"
  boxShadow="md"
  p={4} width='100%' padding='5px' backgroundColor="grey.100"
                opacity="0.9" paddingBottom='100px' borderBlockEndColor='ActiveBorder'>
        <Text fontSize={{ base: "20px", md: "30px", lg: "46px" }}
                textAlign="center"
                fontWeight="bold"
                color="teal.600"
                backgroundColor="white"
                opacity="0.5"
                marginTop='35px'
                marginBottom='35px'> Create Ingredient </Text>
    
      <HStack spacing='24px'>

        <Box>
        
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
          <p>Stock</p>
          <Input
            type="number"
            name="stock"
            value={ingredient.stock}
            autoComplete="off"
            placeholder="Stock "
            onChange={handleOnChange}
          />
        </FormLabel>

        </Box>

        <div className="units">Units</div>
          <Box border="3px solid"
  borderColor="gray.400"
  borderRadius="lg"
  boxShadow="md"
  p={4}>
          <HStack>
          
            <Box border='black'>
            <select multiple onChange={handleSelectChange} className="selec">
              {rowsFilter.map((unit, index) => (
                <option key={index} value={unit.units}>
                  {unit.units}
                </option>
              ))}
            </select>
            </Box>
          
            <Box>
            {selectedItems.map((item, index) => (
              <span key={index} className="itemsselected">
                {item}
                <button type = "button" onClick={() => deleteItem(item)}>
                  <BsTrash />{" "}
                </button>
              </span>
            ))}
            </Box>
          </HStack>
          
        </Box>

        <br />
        <div className="btn">
          <Button type="submit">Create Ingredient</Button>
        </div>
      
      </HStack>
    </Box>
    </form>
  );
}
