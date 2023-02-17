import "./sideBar.css";
import {MdOutlineLineStyle, MdTimeline, MdTrendingUp, MdProductionQuantityLimits} from "react-icons/md"; 
import {TbUsers, TbCoin, TbMessageCircle} from "react-icons/tb";
import {VscGraph, VscMail, VscFeedback} from "react-icons/vsc";
import { Link } from "react-router-dom";


export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle"> Dashboard </h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
<MdOutlineLineStyle className="sidebarIcon"/>
Home
            </li>
            <li className="sidebarListItem">
<MdTimeline className="sidebarIcon"/>
Analytics
            </li>
            <li className="sidebarListItem">
<MdTrendingUp className="sidebarIcon"/>
Sales
            </li>
            </ul>
            </div>
            <div className="sidebarMenu">
          <h3 className="sidebarTitle"> Quick Menu </h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
<TbUsers className="sidebarIcon"/>
<Link to= "/admin/User"> Users </Link>
            </li>
            <li className="sidebarListItem">
<MdProductionQuantityLimits className="sidebarIcon"/>
Products
            </li>
            
            
            <li className="sidebarListItem">
<TbCoin className="sidebarIcon"/>
Transactions
            </li>
            <li className="sidebarListItem">
<VscGraph className="sidebarIcon"/>
Reports
            </li>
            </ul>
            </div>
            <div className="sidebarMenu">
          <h3 className="sidebarTitle"> Notifications </h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
<VscMail className="sidebarIcon"/>
Mail
            </li>
            <li className="sidebarListItem">
<VscFeedback className="sidebarIcon"/>
Feedback
            </li>
            <li className="sidebarListItem">
<TbMessageCircle className="sidebarIcon"/>
Message
            </li>
            </ul>
            </div>
            
        </div>
      </div>
    
  );
}
