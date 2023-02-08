import React from "react";
import s from "./NavBar.module.css";
import { Link } from "react-router-dom";


function NavBar() {
  
  return (
    <div className= {s.container}>
    
    <Link to = {"/home"}>
    <button className= {s.btn1}>HOME</button>
   </Link>
   <Link to = {"/createRecipe"}>
    <button className= {s.btn1}>CREATE YOUR OWN RECIPE</button>
   </Link>
   <Link to = {"/myRecipes"}>
    <button className= {s.btn1}>MY RECIPES</button>
   </Link>
   <Link to = {"/aboutUs"}>
    <button className= {s.btn1}>ABOUT US</button>
   </Link>
   <Link to = {"/contact"}>
    <button className= {s.btn1}>CONTACT</button>
   </Link>
      </div>

  );
}

export default NavBar;
