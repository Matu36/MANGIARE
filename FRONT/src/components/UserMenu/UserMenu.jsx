import React from "react";
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

export default function UserMenu(userLocalstorage) {
  const { user } = useAuth0();
  let location = useLocation();

  if (location.pathname == "/user") {
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar size="md" name={user.name} src={user.image} />}
          variant="outline"
        />
        <MenuList>
          <Link to={"/home"}>Home</Link>
          <MenuDivider />
          {userLocalstorage && userLocalstorage.role !== null && (
            <div>
              <Link to={"/admin"}>Admin</Link> <MenuDivider />
            </div>
          )}
          <LogoutButton />
        </MenuList>
      </Menu>
    );
  }
  if (location.pathname == "/home"  || location.pathname == "/shoppingCart" 
  || location.pathname === "/createRecipe" || location.pathname === "/admin" || location.pathname.includes("/recipes/"))
    return (
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar size="md" name={user.name} src={user.image} />}
          variant="outline"
        />
        <MenuList>
          <Link to={"/user"}>My user</Link>
          <MenuDivider />
          {userLocalstorage && userLocalstorage.role !== null && (
            <div>
              <Link to={"/admin"}>Admin</Link> <MenuDivider />
            </div>
          )}

          <LogoutButton />
        </MenuList>
      </Menu>
    );
//   if (location.pathname == "/admin")
//     return (
//       <Menu>
//         <MenuButton
//           as={IconButton}
//           aria-label="Options"
//           icon={<Avatar size="md" name={user.name} src={user.image} />}
//           variant="outline"
//         />
//         <MenuList>
//           <Link to={"/home"}>Home</Link>
//           <MenuDivider />
//           <Link to={"/user"}>My user</Link>
//           <MenuDivider />
//           <LogoutButton />
//         </MenuList>
//       </Menu>
//     );

// if (location.pathname == "/createRecipe")
// return (
//   <Menu>
//     <MenuButton
//       as={IconButton}
//       aria-label="Options"
//       icon={<Avatar size="md" name={user.name} src={user.image} />}
//       variant="outline"
//     />
//     <MenuList>
//       <Link to={"/user"}>My user</Link>
//       <MenuDivider />
//       {userLocalstorage && userLocalstorage.role !== null && (
//         <div>
//           <Link to={"/admin"}>Admin</Link> <MenuDivider />
//         </div>
//       )}

//       <LogoutButton />
//     </MenuList>
//   </Menu>
// )
// if (location.pathname == "/shoppingCart")
// return (
//   <Menu>
//     <MenuButton
//       as={IconButton}
//       aria-label="Options"
//       icon={<Avatar size="md" name={user.name} src={user.image} />}
//       variant="outline"
//     />
//     <MenuList>
//       <Link to={"/user"}>My user</Link>
//       <MenuDivider />
//       {userLocalstorage && userLocalstorage.role !== null && (
//         <div>
//           <Link to={"/admin"}>Admin</Link> <MenuDivider />
//         </div>
//       )}

//       <LogoutButton />
//     </MenuList>
//   </Menu>


// )

// if (location.pathname.includes("/recipes/"))
//     return (
//       <Menu>
//         <MenuButton
//           as={IconButton}
//           aria-label="Options"
//           icon={<Avatar size="md" name={user.name} src={user.image} />}
//           variant="outline"
//         />
//         <MenuList>
//           <Link to={"/user"}>My user</Link>
//           <MenuDivider />
//           {userLocalstorage && userLocalstorage.role !== null && (
//             <div>
//               <Link to={"/admin"}>Admin</Link> <MenuDivider />
//             </div>
//           )}

//           <LogoutButton />
//         </MenuList>
//       </Menu>
//     )

    ;
}

