import React, { useState, useEffect } from "react";
import { Tr, Td } from "@chakra-ui/react";
import { MdOutlineDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import "./UserRow.css";

const UserRow = ({ id, email, address, role, active, createdAt }) => {
  const dispatch = useDispatch();
  const propToString = (value) => {
    if (value !== null) {
      if (value) return "True";
      else return "False";
    }
    return "Null";
  };
  const [newRole, setNewRole] = useState(propToString(role));
  const [roleEdit, setRoleEdit] = useState(false);
  const handleEditUsersRole = (e, roleEdit) => {
    setRoleEdit(!roleEdit);
  };
  const handleChangeRole = (e) => {
    if (e.target.value === "null") setNewRole(propToString(null));
    else if (e.target.value === "true") setNewRole(propToString(true));
    else setNewRole(propToString(false));

    //dispatch(putNewRole(newRole))
  };
  useEffect(() => {
    setNewRole(newRole);
  }, [roleEdit]);

  const CreateAt = createdAt.split("T");

  return (
    <Tr key={id}>
      <Td>{id}</Td>
      <Td>{email}</Td>
      <Td>{address}</Td>
      {roleEdit ? (
        <Td>
          <select
            name="role"
            onClick={(e) => handleChangeRole(e)}
            className="selectRole"
          >
            <option value="null" selected>
              User Basic
            </option>
            <option value="true">Super Admin</option>
            <option value="false">Admin</option>
          </select>
        </Td>
      ) : (
        <Td>{newRole}</Td>
      )}
      <Td>{propToString(active)}</Td>
      <Td>
        {CreateAt[0]} - {CreateAt[1].split(".")[0]}
      </Td>
      <Td>
        <button>
          <MdOutlineModeEdit
            onClick={(e) => handleEditUsersRole(e, roleEdit)}
          />
        </button>
        <button>
          <MdOutlineDeleteOutline />
        </button>
      </Td>
    </Tr>
  );
};

export default UserRow;
