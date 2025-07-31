import React from 'react'
import Sidebar from '../components/Sidebar'
import {Outlet} from "react-router-dom"
function Dashboard() {
  return (
    <div className="dashboard">
        <Sidebar/>
        <div className="dashboard-content">
            <Outlet/>
            </div>

      
    </div>
  )
}

export default Dashboard
