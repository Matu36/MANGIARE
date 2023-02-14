import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
const { REACT_APP_AUTH0_CLIENT_ID, REACT_APP_AUTH0_DOMAIN } = process.env;

export const Auth0ProviderModule = ({ children }) => {
  return (
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      clientId={REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: "https://mangiare.vercel.app/home",
      }}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  );
};
