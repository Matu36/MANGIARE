import React from "react";
import "./widgetSm.css";
import UserRichard from "../../../img/UserRichard.png";
import {MdVisibility} from "react-icons/md";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgeSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        <li className="widgetSmListItem">
          <img src={UserRichard} alt="foto" className="widgetSmImg" />
          <div className="divwidgetSmUser">
            <span className="widgetSmUserName"> Ricardo Lafranconi</span>
          </div>
          <button className="widgetSmButton">
            <MdVisibility className="widgetSmIcon"/>
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img src={UserRichard} alt="foto" className="widgetSmImg" />
          <div className="divwidgetSmUser">
            <span className="widgetSmUserName"> German Navarrete</span>
          </div>
          <button className="widgetSmButton">
            <MdVisibility className="widgetSmIcon"/>
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img src={UserRichard} alt="foto" className="widgetSmImg" />
          <div className="divwidgetSmUser">
            <span className="widgetSmUserName"> Leandro Rocha</span>
          </div>
          <button className="widgetSmButton">
            <MdVisibility className="widgetSmIcon"/>
            Display
          </button>
        </li>
        <li className="widgetSmListItem">
          <img src={UserRichard} alt="foto" className="widgetSmImg" />
          <div className="divwidgetSmUser">
            <span className="widgetSmUserName"> Yamil Leota</span>
          </div>
          <button className="widgetSmButton">
            <MdVisibility className="widgetSmIcon"/>
            Display
          </button>
        </li>
      </ul>
    </div>
  );
}
