import React from 'react';
import "./Appmodel.css";
import SideBar from './components/sideBar/SideBar'
import TopBar from './components/topBar/TopBar'
import HomeAdmin from './pages/home/HomeAdmin';


export default function Appmodel() {
  return (
    <div className='contain'>
      <TopBar />
      <div className='container'></div>
      <SideBar />
      <HomeAdmin />
    </div>
  )
}
