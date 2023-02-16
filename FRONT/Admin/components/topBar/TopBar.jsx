import "./topbar.css";
import {MdOutlineNotificationsNone} from "react-icons/md";
import {GrLanguage} from "react-icons/gr";
import {TbSettings} from "react-icons/tb";
import LOGO from "../../../src/img/LOGOBIGOTIN.jpg"

export default function TopBar() {
  return (
      <div className="topbar">
      <div className="topbarWraper">
      <div className="topLeft">
      <span className="logo"> MangiareAdmin</span>
      </div>
      <div className="topRight">
      <div className="topBarIconContainer">
      <MdOutlineNotificationsNone />
      <span className="topIconBadge">2</span>
      </div>
      <div className="topBarIconContainer">
      <GrLanguage />
      <span className="topIconBadge">2</span>
      </div>
      <div className="topBarIconContainer">
      <TbSettings />
      </div>
      <img src= {LOGO} alt="LOGO" className="topAvatar" />
      </div>
      </div>
    </div>
  )
}
