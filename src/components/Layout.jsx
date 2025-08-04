import React from 'react'
import Sidebar from './Sidebar'
import { useUser } from '../context/UserContext'

function Layout() {
    const {user}=useUser();

    return (
    <div style={{border:"2px solid black",padding:"1rem"}}>
        <h1>Mon Application {user.name} (Layout)</h1>
        {/* <Sidebar user={user}/> */}
      
    </div>
  )
}

export default Layout
