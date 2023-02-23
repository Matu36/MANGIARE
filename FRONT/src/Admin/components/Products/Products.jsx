import React, { useEffect, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import Paginations from "../../../components/Paginations/Paginations";
import IngredientForm from "./CreateIngredient/CreateIngredient";
import { BiEditAlt } from "react-icons/bi";
import { updateIngredient } from "../../../Redux/actions/ingredients";
import { Input, InputGroup } from "@chakra-ui/react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box
} from "@chakra-ui/react";

export default function UserList() {
  let dispatch = useDispatch();
  const products = useSelector((state) => state.ingredients.ingredients);

  const rows = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      units: product.units,
    };
  });

  //SEARCHBAR
  const [search, setSearch] = useState("");
  const [ingredients, setIngredients] = useState(rows);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    filterByIngredients(search);
  }, [rows, search]);

  const filterByIngredients = (value) => {
    let arrayCache = [...rows];
    if (!search) setIngredients(rows);
    else {
      arrayCache = arrayCache.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(value.toLowerCase())
      );

      setIngredients(arrayCache);
    }
  };

  //FIN SEARCHBAR

  //EDITAR PRECIO

  const [editIndex, setEditIndex] = useState(null);
  const [editPrice, setEditPrice] = useState(null);

  const handleEdit = (index, price) => {
    setEditIndex(index);
    setEditPrice(price);
  };

  const handlePriceChange = (price) => {
    setEditPrice(price);
  };

  const handleSave = (index) => {
    const updatedIngredient = {
      id: totalIngredients[index - 1].id,
      price: editPrice
    };
    dispatch(updateIngredient(updatedIngredient));
    setEditIndex(null);
    setEditPrice(null);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditPrice(null);
  };

  //FIN EDITAR PRECIO

  const columns = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    { field: "units", headerName: "Units", width: 130 },
  ];

  //PAGINADO

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalIngredients, setTotalIngredients] = useState(rows);

  const indexFirstPageIngredient = () => (currentPage - 1) * 9; // Indice del primer Elemento
  const indexLastPageIngredient = () => indexFirstPageIngredient() + 9; //Indice del segundo elemento

  const handlePageNumber = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    //Cambio de estado local de Total Recipes indicando los indices que tiene que
    //renderizar en cada pagina

    setTotalIngredients(
      ingredients.slice(indexFirstPageIngredient(), indexLastPageIngredient())
    );
    setNumberOfPage(Math.ceil(ingredients.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [ingredients, currentPage]);

  //FIN PAGINADO

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
          {totalIngredients.map((row) => (
            <Tr key={row.id}>
              {columns.map((column) => (
                <Td key={`${row.id}-${column.field}`}>
                  {column.field === "price" && editIndex === row.id ? (
                    <div>
                      <Input
                        type="number"
                        value={editPrice}
                        onChange={(e) => handlePriceChange(e.target.value)}
                      />
                      <button onClick={() => handleSave(row.id)}>Save</button>
                      <br />
                      <button onClick={handleCancel}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      {row[column.field]}
                      {column.field === "price" && (
                        <Box ml="auto">
                        <button onClick={() => handleEdit(row.id, row.price)}>
                          <BiEditAlt />
                        </button>
                        </Box>
                      )}
                    </div>
                  )}
                </Td>
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
            <IngredientForm />
          </div>
        </Tbody>
      </Table>
    </div>
  );
}
