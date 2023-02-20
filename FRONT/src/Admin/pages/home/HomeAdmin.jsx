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
import { getIngredients } from "../../../Redux/actions/ingredients";

export default function HomeAdmin() {
  const dispatch = useDispatch();
  const homeShow = useSelector((state) => state.homeadmin.homeShow);
  useEffect(() => {
    dispatch(getIngredients());
  }, []);
  return (
    <div className="home">
      {homeShow === "Reviews" && <Reviews />}
      {homeShow === "Users" && <UserList />}
      {homeShow === "Products" && <Products />}
      {homeShow === "Home" && (
        <div>
          {" "}
          <FeaturedInfo />
          <Chart
            data={data}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets"></div>
          <WidgetSm />
          <WidgetLg />
        </div>
      )}
    </div>
  );
}
