import React, { useEffect, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../../Redux/actions/ingredients";
import Paginations from "../../../components/Paginations/Paginations";
import { createIngredients } from "../../../Redux/actions/ingredients";
import {
  Input,
  InputGroup,
  FormControl,
  FormLabel,
  Button,
  Heading,
} from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export default function UserList() {
  let dispatch = useDispatch();
  const products = useSelector((state) => state.ingredients.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const rows = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      units: product.units,
    };
  });

  //PAGINADO

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalIngredients, setTotalIngredients] = useState([]); 

  const indexFirstPageIngredient = () => (currentPage - 1) * 9; // Indice del primer Elemento
  const indexLastPageIngredient = () => indexFirstPageIngredient() + 9; //Indice del segundo elemento

  const handlePageNumber = (number) => {
    
    setCurrentPage(number);
  };

  useEffect(() => {
    //Cambio de estado local de Total Recipes indicando los indices que tiene que
    //renderizar en cada pagina
    products &&
      setTotalIngredients(
        rows.slice(indexFirstPageIngredient(), indexLastPageIngredient())
      );
    rows && setNumberOfPage(Math.ceil(rows.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [rows, currentPage]);

  //FIN PAGINADO

  //SEARCHBAR
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState(rows);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    !search ? setIngredients(rows) : filterByIngredients(search);
  }, [ingredients, search]);

  const filterByIngredients = (value) => {
    let arrayCache = [...ingredients];

    arrayCache = arrayCache.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(value.toLowerCase())
    );

    setIngredients(arrayCache);
  };

  //FIN SEARCHBAR

  //CREACION DE INGREDIENTE
  const [create, setCreate] = useState({
    name: "",
    price: "",
    units: "",
    ingredients: [],
  });
  
  const handleChangeCreate = (e) => {
    setCreate({
      ...create,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (
      create.name &&
      create.price &&
      create.units &&
      create.ingredients.length
    ) {
      dispatch(createIngredients(create)); // crea el ingrediente
      alert("Ingredient has create");
      setCreate({
        name: "",
        price: "",
        units: "",
        ingredients: [],
      });
    }
  };

  //FIN CREACION INGREDIENTE

  const columns = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    {field: "units",headerName: "Units",width: 130,},
  ];

  return (
    <div>
      <Table variant="simple" size="sm">
        <Thead>
          <div>
            <InputGroup>
              <Input
                type="text"
                placeholder="Search Ingredient "
                onChange={handleOnChange}
                value={search}
                autoComplete="off"
              />
            </InputGroup>
          </div>
          <Tr>
            {columns.map((column) => (
              <Th key={column.field}>{column.headerName}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {ingredients
            .slice(indexFirstPageIngredient(), indexLastPageIngredient())
            .map((row) => (
              <Tr key={row.id}>
                {columns.map((column) => (
                  <Td key={`${row.id}-${column.field}`}>{row[column.field]}</Td>
                ))}
              </Tr>
            ))}
          <div>
            <br />
            {products && (
              <Paginations
                currentPage={currentPage}
                numberOfPage={numberOfPage}
                handlePageNumber={handlePageNumber}
              />
            )}
          </div>
          <br />
          <div>
            <FormControl onSubmit={handleOnSubmit}>
              <Heading size="md">Create a Ingredient</Heading>
              <br />
              <FormLabel>
                <p>Name</p>
                <Input
                  type="text"
                  name="name"
                  value={create.name}
                  autoComplete="off"
                  placeholder="Ingredient Name"
                  onChange={handleChangeCreate}
                />
              </FormLabel>

              <FormLabel>
                <p>Price</p>
                <Input
                  type="text"
                  name="price"
                  value={create.price}
                  autoComplete="off"
                  placeholder="Ingredient Price"
                  onChange={handleChangeCreate}
                />
              </FormLabel>

              <FormLabel>
                <p>Units</p>
                <Input
                  type="text"
                  name="units"
                  value={create.units}
                  autoComplete="off"
                  placeholder="Ingredient Units"
                  onChange={handleChangeCreate}
                />
              </FormLabel>
              <div>
                <Button type="submit" tertiary>
                  Create Ingredient
                </Button>
              </div>
            </FormControl>
          </div>
        </Tbody>
      </Table>
    </div>
  );
}
