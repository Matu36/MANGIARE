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
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import UserRow from "../../components/UserRow/UserRow";
import { useDispatch, useSelector } from "react-redux";
import { putBanned } from "../../../Redux/actions/users.js";
import axios from "axios";
import "./UserList.css";

export default function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [search, setSearch] = useState("");
  const [filterUsers, setFilterUsers] = useState(users);
  const currentUser = JSON.parse(localStorage.getItem("MANGIARE_user"));

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
  const [totalUsers, setTotalUsers] = useState(filterUsers); //Recetas Totales Seteada en Array Vacio

  const indexFirstPageRecipe = () => (currentPage - 1) * 9; // Indice del primer Elemento
  const indexLastPageRecipe = () => indexFirstPageRecipe() + 9; //Indice del segundo elemento

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
  }, [filterUsers, currentPage, users]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterUsers, users]);

  const handleRole = (id, newRole) => {
    dispatch(putNewRole(id, newRole)).then(() => {
      let user = {
        id: currentUser.id,
        email: currentUser.email,
      };
      axios
        .get(`/users`, { params: user })
        .then((response) => response.data)
        .then((data) => setFilterUsers(data));
    });
  };

  const handleRestrict = (id, banned) => {
    dispatch(putBanned(id, banned)).then(() => {
      let user = {
        id: currentUser.id,
        email: currentUser.email,
      };
      axios
        .get(`/users`, { params: user })
        .then((response) => response.data)
        .then((data) => setFilterUsers(data));
    });
  };
  //.then(() => dispatch(getUsers(currentUser)).then(()=> setFilterUsers())

  return (
    <div className="containerUsers">
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
              <Th>banned</Th>
              <Th>createdAt</Th>
              <Th>actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {totalUsers?.map((user) => {
              return (
                <UserRow
                  key={user.id}
                  id={user.id}
                  email={user.email}
                  address={user.address}
                  role={user.role}
                  active={user.active}
                  banned={user.banned}
                  createdAt={user.createdAt}
                  handleRole={handleRole}
                  handleRestrict={handleRestrict}
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
              <Th>banned</Th>
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
