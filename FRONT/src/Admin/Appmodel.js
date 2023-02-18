import React from "react";
import "./Appmodel.css";
import SideBar from "./components/sideBar/SideBar";
import TopBar from "./components/topBar/TopBar";
import HomeAdmin from "./pages/home/HomeAdmin";
import NavBar from "./../components/NavBar/NavBar.jsx";

export default function Appmodel() {
  return (
    <div className="contain">
      <NavBar />
      <TopBar />
      <div className="divContainerAdmin">
        <SideBar />
        <HomeAdmin />
      </div>
    </div>
  );
}
