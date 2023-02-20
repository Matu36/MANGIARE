import React from "react";
import { useState, useEffect } from "react";
import Paginations from "../../../components/Paginations/Paginations.jsx";
import { Input } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import UserRow from "../../components/UserRow/UserRow";
import { useSelector } from "react-redux";

export default function UserList() {
  const users = useSelector((state) => state.users.users);
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState(users);

  const handleOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  useEffect(() => {
    filterByUsers(search);
  }, [search]);

  const filterByUsers = (value) => {
    let arrayCache = [...users];
    if (value === "") setFilterUsers(users);
    else {
      arrayCache = arrayCache.filter((user) =>
        user.email.toLowerCase().includes(value.toLowerCase())
      );
      setFilterUsers(arrayCache);
    }
  };

  //                 Paginacion del contenido             //-----------------------------

  const [currentPage, setCurrentPage] = useState(1); //Pagina Actual seteada en 1
  const [numberOfPage, setNumberOfPage] = useState(0); //Numero de Paginas seteado en 0
  const [totalUsers, setTotalUsers] = useState(users); //Recetas Totales Seteada en Array Vacio

  const indexFirstPageRecipe = () => (currentPage - 1) * 8; // Indice del primer Elemento
  const indexLastPageRecipe = () => indexFirstPageRecipe() + 8; //Indice del segundo elemento

  const handlePageNumber = (number) => {
    //Manejo del numero de pagina
    setCurrentPage(number);
  };

  useEffect(() => {
    //Cambio de estado local de Total Recipes indicando los indices que tiene que renderizar en cada pagina
    setTotalUsers(
      filterUsers.slice(indexFirstPageRecipe(), indexLastPageRecipe())
    );
    setNumberOfPage(Math.ceil(filterUsers.length / 9)); // cambiando el estado local de numeros de paginas a renderiza
  }, [filterUsers, currentPage]);

  //console.log(totalreviews);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterUsers]);

  return (
    <div>
      <div className="divContainerHead">
        <Input
          onChange={handleOnChange}
          placeholder="Search Review for comment"
          width="30rem"
          background="white"
          margin="10px"
        />
        <h1 className="titleReviews">Users</h1>
      </div>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>
            Total registered users: {users.length} users
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Email</Th>
              <Th>address</Th>
              <Th>role</Th>
              <Th>active</Th>
              <Th>createdAt</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {totalUsers?.map((user) => {
              return (
                <UserRow
                  id={user.id}
                  email={user.email}
                  address={user.address}
                  role={user.role}
                  active={user.active}
                  createdAt={user.createdAt}
                />
              );
            })}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Id</Th>
              <Th>Email</Th>
              <Th>address</Th>
              <Th>role</Th>
              <Th>active</Th>
              <Th>createdAt</Th>
              <Th>actions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Paginations
        currentPage={currentPage}
        numberOfPage={numberOfPage}
        handlePageNumber={handlePageNumber}
      />
    </div>
  );
}
