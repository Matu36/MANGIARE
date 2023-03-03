import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  IconButton,
  MenuButton,
  MenuList,
  MenuDivider,
  Center,
} from "@chakra-ui/react";
import { LogoutButton } from "../Auth0/logout_button";
import { Avatar } from "@chakra-ui/react";

export default function UserMenu({ userLocal }) {
  const { user } = useAuth0();
  let location = useLocation();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<Avatar size="md" name={user.name} src={user.picture} />}
        variant="outline"
      />
      <MenuList textAlign="center">
        {location.pathname == "/user" ? (
          <Link to={"/home"}>Home</Link>
        ) : (
          <Link to={"/user"}>My user</Link>
        )}
        <MenuDivider />
        {userLocal && userLocal?.role !== null && (
          <div>
            <Link to={"/admin"}>Admin</Link> <MenuDivider />
          </div>
        )}
        <LogoutButton />
      </MenuList>
    </Menu>
  );
}
