import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./Redux/store/index.js";
import Auth0ProviderModule from "./auth0-provider";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0ProviderModule>
          <App />
        </Auth0ProviderModule>
        ,
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
