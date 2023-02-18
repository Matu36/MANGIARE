import React, { useEffect, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../../Redux/actions/ingredients";
import Paginations from "../../../components/Paginations/Paginations";
import { FcSearch } from "react-icons/fc";

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

                                  //Paginado

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalRecipes, setTotalRecipes] = useState([]); //Recetas Totales Seteada en Array Vacio

  const indexFirstPageRecipe = () => (currentPage - 1) * 9; // Indice del primer Elemento
  const indexLastPageRecipe = () => indexFirstPageRecipe() + 12; //Indice del segundo elemento

  const handlePageNumber = (number) => {
    //Manejo del numero de pagina
    setCurrentPage(number);
  };

  useEffect(() => {
    //Cambio de estado local de Total Recipes indicando los indices que tiene que renderizar en cada pagina
    products &&
      setTotalRecipes(
        rows.slice(indexFirstPageRecipe(), indexLastPageRecipe())
      );
    rows && setNumberOfPage(Math.ceil(rows.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [rows, currentPage]);

                                  //Fin paginado

                                   //  FILTER SEARCHBAR
const [search, setSearch] = useState("");

const handleOnChange = (e) => {
  e.preventDefault();
  setSearch(e.target.value)
};

const handleOnClick = (e) => {
  e.preventDefault();

  if (!search) {
    alert("You dont write anything");
  } else {
    dispatch(getIngredients(search));
    setSearch("");
  }
};

  

                               //FIN SEARCHBAR

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "units",
      headerName: "Units",

      width: 130,
    },
  ];

  return (
    <div>
      <Table variant="simple" size="sm">
        <Thead>
        <div>
      <form onSubmit={handleOnClick}>
        <FcSearch  onClick={handleOnClick} />
        <input 
          type="text"
          placeholder="Search Ingredient "
          onChange={handleOnChange}
          value={search}
          autoComplete="off"
        />
      </form>
    </div>
          <Tr>
            {columns.map((column) => (
              <Th key={column.field}>{column.headerName}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows
            .slice(indexFirstPageRecipe(), indexLastPageRecipe())
            .map((row) => (
              <Tr key={row.id}>
                {columns.map((column) => (
                  <Td key={`${row.id}-${column.field}`}>{row[column.field]}</Td>
                ))}
              </Tr>
            ))}
          <div>
            {products && (
              <Paginations
                currentPage={currentPage}
                numberOfPage={numberOfPage}
                handlePageNumber={handlePageNumber}
              />
            )}
          </div>
        </Tbody>
      </Table>
    </div>
  );
}
