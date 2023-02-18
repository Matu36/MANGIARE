import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./homeAdmin.css";
import { data } from "../../userData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

export default function HomeAdmin() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={data} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets"></div>
      <WidgetSm />
      <WidgetLg />
    </div>
  );
}
