import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
  const { user } = useAuth0();

  return (
    <div>
      <img>{user.image}</img>
      <h3>Hello {user.name}</h3>
      <h2> {user.email}</h2>
    </div>
  );
}

export default Profile;
