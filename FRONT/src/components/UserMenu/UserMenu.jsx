import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  IconButton,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
} from "@chakra-ui/react";
import { LogoutButton } from "../Auth0/logout_button";
import { Avatar } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export default function UserMenu() {
  const { user, isAuthenticated } = useAuth0();
  let location = useLocation();
  const [userLocal, setUserLocal] = useState(null);

  useEffect(() => {
    setUserLocal(JSON.parse(localStorage.getItem("MANGIARE_user")));
  }, []);

  //console.log("usermenu", userLocal);

  if (location.pathname == "/user") {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar size="md" name={user.name} src={user.picture} />}
          variant="outline"
        />
        <MenuList>
          <Link to={"/home"}>Home</Link>
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
  if (location.pathname == "/home")
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar size="md" name={user.name} src={user.picture} />}
          variant="outline"
        />
        <MenuList>
          <Link to={"/user"}>My user</Link>
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
  if (location.pathname == "/admin")
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar size="md" name={user.name} src={user.picture} />}
          variant="outline"
        />
        <MenuList>
          <Link to={"/home"}>Home</Link>
          <MenuDivider />
          <Link to={"/user"}>My user</Link>
          <MenuDivider />
          <LogoutButton />
        </MenuList>
      </Menu>
    );
}
