import React from "react";
import { useSelector } from "react-redux";
import "./widgetSm.css";
import UserRichard from "../../../img/UserRichard.png";
import {MdVisibility} from "react-icons/md";
import PerfilVacio from "../../../img/PERFILVACIO.png";

export default function WidgetSm() {
  
const users = useSelector((state) => state.users.users);
const usersSlice = users.slice (-5);  //constante que tiene los ultimos 5 users


  return (
    <div className="widgetSm">
      <span className="widgeSmTitle">New Join Members</span>
      <br />
      <ul className="ulnone">
        {usersSlice.map(user => (
          <li classname= "widgetSmUserName"key={user.id}>
             <img src={PerfilVacio} className="widgetSmImg" alt={`Foto de ${user.email}`} />
            <span className="widgetSmUserName">{user.email}</span>
         
          
      </li>
        ))}
      </ul>
      
    </div>
  );
}
