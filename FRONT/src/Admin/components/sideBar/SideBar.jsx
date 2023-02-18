import "./sideBar.css";
import {
  MdOutlineLineStyle,
  MdTimeline,
  MdTrendingUp,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { TbUsers, TbCoin, TbMessageCircle } from "react-icons/tb";
import { VscGraph, VscMail, VscFeedback } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeHomeAdminShow } from "../../../Redux/actions/homeadmin";

export default function SideBar() {
  const dispatch = useDispatch();

  const handleHomeAdmin = (e) => {
    dispatch(changeHomeAdminShow(e.target.textContent));
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle"> Dashboard </h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <MdOutlineLineStyle className="sidebarIcon" />
              <button onClick={(e) => handleHomeAdmin(e)}>Home</button>
            </li>
            <li className="sidebarListItem">
              <MdTimeline className="sidebarIcon" />
             Analytics
            </li>
            <li className="sidebarListItem">
              <MdTrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu </h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <TbUsers className="sidebarIcon" />
              <button onClick={(e) => handleHomeAdmin(e)}>Users</button>
            </li>
            <li className="sidebarListItem">
              <MdProductionQuantityLimits className="sidebarIcon" />
              <button onClick={(e) => handleHomeAdmin(e)}>Products</button>
            </li>

            <li className="sidebarListItem">
              <TbCoin className="sidebarIcon" />
              <button onClick={(e) => handleHomeAdmin(e)}>Transactions</button>
            </li>
            <li className="sidebarListItem">
              <TbCoin className="sidebarIcon" />
              <button onClick={(e) => handleHomeAdmin(e)}>Reviews</button>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle"> Notifications </h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <VscMail className="sidebarIcon" />
              <button onClick={(e) => handleHomeAdmin(e)}>eMail</button>
            </li>
            <li className="sidebarListItem">
              <VscFeedback className="sidebarIcon" />
              <button onClick={(e) => handleHomeAdmin(e)}>Feedback</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
