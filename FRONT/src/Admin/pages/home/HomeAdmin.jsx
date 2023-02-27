import React, { useEffect } from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./homeAdmin.css";
import { data } from "../../userData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useDispatch, useSelector } from "react-redux";
import Reviews from "../../components/Reviews/Reviews";
import UserList from "../../pages/userList/UserList";
import Products from "../../components/Products/Products";
import Email from "../../components/Email/Email.jsx";
import Feedback from "../../components/Feedback/Feedback.jsx";
import { getIngredients } from "../../../Redux/actions/ingredients";
import { getReviews } from "../../../Redux/actions/reviews";
import { getUsers } from "../../../Redux/actions/users";
import Orders from "../../../pages/Orders/Orders";

export default function HomeAdmin() {
  const dispatch = useDispatch();
  const homeShow = useSelector((state) => state.homeadmin.homeShow);
  let currentUser = JSON.parse(localStorage.getItem("MANGIARE_user"));

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getReviews(currentUser));
    dispatch(getUsers(currentUser));
  }, []);

  return (
    <div className="home">
      {homeShow === "Reviews" && <Reviews />}
      {homeShow === "Users" && <UserList />}
      {homeShow === "Products" && <Products />}
      {homeShow === "Orders" && <Orders all={true}/>}
      {homeShow === "eMail" && <Email />}
      {homeShow === "Feedback" && <Feedback />}
      {homeShow === "Home" && (
        <div>
          <FeaturedInfo />
          <Chart
            data={data}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg all={true}/>
          </div>
        </div>
      )}
    </div>
  );
}
