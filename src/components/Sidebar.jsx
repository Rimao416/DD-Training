import React from 'react'
import {Link} from "react-router-dom"
function Sidebar() {
  return (
    <aside className="sidebar">
        <h2>Dashobard</h2> 
        <nav>
            <Link to="profile" className="link">Profile</Link>
            <Link to="settings" className="link">settings</Link>
            </nav>
      
    </aside>
  )
}

export default Sidebar
