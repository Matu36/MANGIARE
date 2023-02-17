import React from "react";
import { useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

export default function UserList() {


  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "UserName",
      headerName: "USERNAME",

      width: 130,
    },
    {
      field: "Email",
      headerName: "EMAIL",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    { field: "Action", headerName: "ACTION", width: 130 },
  ];

  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      UserName: 35,
      Email: "matipineda@gmail.com",
      Action: (
        <div>
        <button><MdOutlineModeEdit /> </button>
        <button>
          <MdOutlineDeleteOutline />{" "}
        </button>
        </div>
      ),
    },
    {
      id: 2,
      lastName: "Lannister",
      firstName: "Cersei",
      UserName: 42,
      Email: "matipineda@gmail.com",
      Action: (
        <div>
        <button><MdOutlineModeEdit /> </button>
        <button>
          <MdOutlineDeleteOutline />{" "}
        </button>
        </div>
      ),
    },
    {
      id: 3,
      lastName: "Lannister",
      firstName: "Jaime",
      UserName: 45,
      Email: "matipineda@gmail.com",
      Action: (
        <div>
        <button><MdOutlineModeEdit /> </button>
        <button>
          <MdOutlineDeleteOutline />{" "}
        </button>
        </div>
      ),
    },
    {
      id: 4,
      lastName: "Stark",
      firstName: "Arya",
      UserName: 16,
      Email: "matipineda@gmail.com",
      Action: (
        <div>
        <button><MdOutlineModeEdit /> </button>
        <button>
          <MdOutlineDeleteOutline />{" "}
        </button>
        </div>
      ),
    },
    {
      id: 5,
      lastName: "Targaryen",
      firstName: "Daenerys",
      UserName: null,
      Email: "matipineda@gmail.com",
      Action: (
        <div>
        <button><MdOutlineModeEdit /> </button>
        <button>
          <MdOutlineDeleteOutline />{" "}
        </button>
        </div>
      ),
    },
    {
      id: 6,
      lastName: "Melisandre",
      firstName: null,
      UserName: 150,
      Email: "matipineda@gmail.com",
      Action: (
        <div>
        <button><MdOutlineModeEdit /> </button>
        <button>
          <MdOutlineDeleteOutline />{" "}
        </button>
        </div>
      ),
    },
    {
      id: 7,
      lastName: "Clifford",
      firstName: "Ferrara",
      UserName: 44,
      Email: "matipineda@gmail.com",
      Action: (
        <div>
        <button><MdOutlineModeEdit /> </button>
        <button>
          <MdOutlineDeleteOutline />{" "}
        </button>
        </div>
      ),
    },
    {
      id: 8,
      lastName: "Frances",
      firstName: "Rossini",
      UserName: 36,
      Email: "matipineda@gmail.com",
      Action: (
        <div>
        <button><MdOutlineModeEdit /> </button>
        <button>
          <MdOutlineDeleteOutline />{" "}
        </button>
        </div>
      ),
    },
    {
      id: 9,
      lastName: "Roxie",
      firstName: "Harvey",
      UserName: 65,
      Email: "matipineda@gmail.com",
      Action: (
        <div>
        <button><MdOutlineModeEdit /> </button>
        <button>
          <MdOutlineDeleteOutline />{" "}
        </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column.field}>{column.headerName}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((row) => (
            <Tr key={row.id}>
              {columns.map((column) => (
                <Td key={`${row.id}-${column.field}`}>{row[column.field]}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
}
