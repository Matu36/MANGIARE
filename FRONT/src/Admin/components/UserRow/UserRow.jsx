import React, { useState, useEffect } from "react";
import { Tr, Td } from "@chakra-ui/react";
import {
  MdOutlineDeleteOutline,
  MdOutlineModeEdit,
  MdRestore,
  MdNotInterested,
  MdRateReview,
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
  handleRole,
  handleRestrict,
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

  const handleEditUsersRole = (roleEdit) => {
    setRoleEdit(!roleEdit);
  };
  const handleChangeRole = (e) => {
    //console.log(e.target.value);
    if (e.target.value === "null") setNewRole(null);
    else if (e.target.value === "false") setNewRole(false);
  };
  useEffect(() => {
    //console.log("useEffect", roleEdit);
    if (!roleEdit) {
      handleRole(id, newRole);
    }
  }, [roleEdit]);

  const CreateAt = createdAt.split("T");

  const handleResetPassword = (valueEmail) => {
    dispatch(resetPassword(valueEmail));
  };
  const handleRestrictClick = (id, banned) => {
    handleRestrict(id, banned);
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
          <button
            title={roleEdit ? "Save Role" : "Edit Role"}
            style={roleEdit ? { color: "red" } : null}
          >
            <MdOutlineModeEdit
              style={roleEdit ? { width: "20px", height: "20px" } : null}
              onClick={(e) => handleEditUsersRole(roleEdit)}
            />
          </button>
        )}
        <button title="Reset Password Email">
          <MdRestore onClick={(e) => handleResetPassword(email)} />
        </button>
        <button onClick={() => handleRestrictClick(id, banned)}>
          {banned ? (
            <MdRateReview title="Allow Comments Recipes" />
          ) : (
            <MdNotInterested title="Restrict Comments recipes" />
          )}
        </button>
      </Td>
    </Tr>
  );
};

export default UserRow;
