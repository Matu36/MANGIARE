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

const UserRow = ({
  id,
  email,
  address,
  role,
  active,
  banned,
  createdAt,
  setFilterUsers,
}) => {
  const dispatch = useDispatch();
  const propToString = (value, type) => {
    if (type !== "role") {
      if (value !== null) {
        if (value) return "Yes";
        else return "No";
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
  const [newRole, setNewRole] = useState(role);
  const [roleEdit, setRoleEdit] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("MANGIARE_user"));

  const handleEditUsersRole = (e, roleEdit, newRole, id) => {
    setRoleEdit(!roleEdit);
    if (roleEdit) {
      dispatch(putNewRole(id, newRole));
    }
  };
  const handleChangeRole = (e) => {
    if (e.target.value === "null") setNewRole(null);
    else if (e.target.value === "true") setNewRole(true);
    else setNewRole(false);
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
        <Td>{propToString(newRole, "role")}</Td>
      )}
      <Td>{propToString(active, "active")}</Td>
      <Td>{propToString(banned, "banned")}</Td>
      <Td>
        {CreateAt[0]} - {CreateAt[1].split(".")[0]}
      </Td>
      <Td>
        {currentUser.role && (
          <button>
            <MdOutlineModeEdit
              onClick={(e) => handleEditUsersRole(e, roleEdit, newRole, id)}
            />
          </button>
        )}
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
