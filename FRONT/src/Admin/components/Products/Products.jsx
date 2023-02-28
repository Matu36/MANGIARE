import React, { useEffect, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import Paginations from "../../../components/Paginations/Paginations";
import IngredientForm from "./CreateIngredient/CreateIngredient";
import { BiEditAlt, BsSave2, BiSave } from "react-icons/bi";
import {MdCancel} from "react-icons/md";
import { updateIngredient } from "../../../Redux/actions/ingredients";
import { Input, InputGroup } from "@chakra-ui/react";
import "./products.css";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";

export default function Products() {
  let dispatch = useDispatch();
  const products = useSelector((state) => state.ingredients.ingredients);

  const rows = products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      stock: product.stock,
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
      price: editPrice,
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

  //EDITAR STOCK

  const [editStock, setEditStock] = useState(null);

  const handleEditStock = (index, stock) => {
    console.log('stock', stock)
    setEditIndex(index);
    setEditStock(stock);
  };

  const handleStockChange = (stock) => {
    setEditStock(stock);
  };

  const handleSaveStock = (index) => {
    const updatedIngredient = {
      id: totalIngredients[index - 1].id,
      stock: editStock,
    };
    dispatch(updateIngredient(updatedIngredient));
    setEditIndex(null);
    setEditStock(null);
  };

  const handleCancelStock = () => {
    setEditIndex(null);
    setEditStock(null);
  };

  //FIN EDITAR STOCK

  const columns = [
    { field: "id", headerName: "ID", width: 5 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "stock", headerName: "Stock", width: 130 },
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
      <div className="my-container">
        <Input
          type="text"
          placeholder="Search Ingredient "
          onChange={handleOnChange}
          value={search}
          autoComplete="off"
          width="30rem"
          background="white"
          margin="10px"
        />
        <h1 className="titleIngredients">Ingredients</h1>
      </div>
      <Table variant="striped" colorScheme="teal">
        <Thead>
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
                <Td width="20%" key={`${row.id}-${column.field}`}>
                {((column.field === "price" && editPrice !== null) || (column.field === "stock" && editStock !== null)) && editIndex === row.id ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    
                    <Input
                      type="number"
                      value={(column.field === "price") ? editPrice : editStock}
                      onChange={(e) => (column.field === "price") ? handlePriceChange(e.target.value) : handleStockChange(e.target.value)}
                    />
                    

                    <button type= "button" style={{fontSize: '24px'}}  onClick={() => (column.field === "price") ? handleSave(row.id) : handleSaveStock(row.id)}title="Save"><BiSave /></button>

                    <button type= "button"style={{fontSize: '24px'}}  onClick={(column.field === "price") ? handleCancel : handleCancelStock}title="Cancel"><MdCancel /></button>
                    </div>
                  
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>{row[column.field]}</div>
                    {((column.field === "price") || (column.field === "stock")) && (
                      <Box ml="auto">
                        <button style={{fontSize: '24px'}}  onClick={() => (column.field === "price") ? handleEdit(row.id, row.price) : handleEditStock(row.id, row.stock)}>
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

          <Box width= "100%">
            <br />
            {products && (
              <Paginations
                currentPage={currentPage}
                numberOfPage={numberOfPage}
                handlePageNumber={handlePageNumber}
              />
            )}
          </Box>
          <br />
          
        </Tbody>
      </Table>
      <Box display= "flex" width="800px">
            <IngredientForm />
          </Box>
    </div>
  );
}
