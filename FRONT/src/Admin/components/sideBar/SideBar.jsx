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

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle"> Dashboard </h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <MdOutlineLineStyle className="sidebarIcon" />
              Home
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
          <h3 className="sidebarTitle"> Quick Menu </h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <TbUsers className="sidebarIcon" />
              <Link to="/admin/User"> Users </Link>
            </li>
            <li className="sidebarListItem">
              <MdProductionQuantityLimits className="sidebarIcon" />
              <Link to= "/admin/Products">Products</Link>
            </li>

            <li className="sidebarListItem">
              <TbCoin className="sidebarIcon" />
              <Link to= "/admin/Transactions">Transactions</Link>
            </li>
            <li className="sidebarListItem">
              <TbCoin className="sidebarIcon" />
              <Link to = "/admin/Reviews">Reviews</Link>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle"> Notifications </h3>
          <ul className="sidebarList">
            <li className="sidebarListItem active">
              <VscMail className="sidebarIcon" />
              <Link to = "/admin/Email">eMail </Link>
            </li>
            <li className="sidebarListItem">
              <VscFeedback className="sidebarIcon" />
              <Link to = "/admin/Feedback"> Feedback </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
