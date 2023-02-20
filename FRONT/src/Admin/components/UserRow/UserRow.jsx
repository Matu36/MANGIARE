import React from "react";
import { Tr, Td } from "@chakra-ui/react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";

const UserRow = ({ id, email, address, role, active, createdAt }) => {
  const propToString = (prop) => {
    if (prop !== null) {
      if (prop) return "True";
      else return "False";
    }
    return "Null";
  };
  return (
    <Tr>
      <Td>{id}</Td>
      <Td>{email}</Td>
      <Td>{address}</Td>
      <Td>{propToString(role)}</Td>
      <Td>{propToString(active)}</Td>
      <Td>{createdAt.split("T")[0]}</Td>
      <Td>
        <button>
          <MdOutlineModeEdit />{" "}
        </button>
        <button>
          <MdOutlineDeleteOutline />{" "}
        </button>
      </Td>
    </Tr>
  );
};

export default UserRow;
