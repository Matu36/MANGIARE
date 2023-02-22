import React, { useState, useEffect } from "react";
import { Tr, Td } from "@chakra-ui/react";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEdit,
  MdRestore,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import "./UserRow.css";
import { resetPassword, putNewRole } from "../../../Redux/actions/users";

const UserRow = ({ id, email, address, role, active, createdAt }) => {
  const dispatch = useDispatch();
  const propToString = (value, type) => {
    if (type === "active") {
      if (value !== null) {
        if (value) return "True";
        else return "False";
      }
      return "Null";
    } else {
      if (value !== null) {
        if (value) return "Super Admin";
        else return "Admin";
      }
      return "User";
    }
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

    dispatch(putNewRole(newRole));
  };
  useEffect(() => {
    setNewRole(newRole);
  }, [roleEdit]);

  const CreateAt = createdAt.split("T");

  const handleResetPassword = (e, valueEmail) => {
    dispatch(resetPassword(valueEmail));
  };

  return (
    <Tr key={id}>
      <Td>{id}</Td>
      <Td>{email}</Td>
      <Td>{address}</Td>
      {roleEdit ? (
        <Td>
          <select
            name="role"
            defaultValue={null}
            onClick={(e) => handleChangeRole(e)}
            className="selectRole"
          >
            <option value="null">User</option>
            <option value="true">Super Admin</option>
            <option value="false">Admin</option>
          </select>
        </Td>
      ) : (
        <Td>{newRole}</Td>
      )}
      <Td>{propToString(active, "active")}</Td>
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
        <button onClick={(e) => handleResetPassword(e, email)}>
          <MdRestore />
        </button>
      </Td>
    </Tr>
  );
};

export default UserRow;
