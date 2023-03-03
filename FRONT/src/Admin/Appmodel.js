import React from "react";
import "./Appmodel.css";
import SideBar from "./components/sideBar/SideBar";
import TopBar from "./components/topBar/TopBar";
import HomeAdmin from "./pages/home/HomeAdmin";
import NavBar from "./../components/NavBar/NavBar.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import NotFound from "../pages/NotFound/NotFound";

export default function Appmodel() {
  const { isAutenticated } = useAuth0();
  const currentUser = JSON.parse(localStorage.getItem("MANGIARE_user"));
  //console.log(isAutenticated, currentUser);

  return (
    <div className="contain">
      {(!isAutenticated && currentUser?.role === undefined) ||
      currentUser?.role === null ? (
        <NotFound />
      ) : (
        <div>
          <NavBar />
          <TopBar />
          <div className="divContainerAdmin">
            <SideBar />
            <HomeAdmin />
          </div>
        </div>
      )}
    </div>
  );
}
