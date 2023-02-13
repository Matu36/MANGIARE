import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function LogoutButton() {
  const { logout } = useAuth0();

  const loggingOut = () => {
    localStorage.removeItem("MANGIARE_user");
    localStorage.removeItem("MANGIARE_cart");
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return <button onClick={loggingOut}>Log out</button>;
}
