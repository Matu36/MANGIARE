import React from 'react';
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import "./homeAdmin.css";
import { data } from '../../userData';

export default function HomeAdmin() {
  return (
    <div className='home'>
       <FeaturedInfo />
       <Chart data={data} title= "User Analytics" grid dataKey="Active User"/>
      
    </div>
  )
}
