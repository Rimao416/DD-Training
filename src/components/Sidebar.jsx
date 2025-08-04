import React from 'react'
import UserPanel from './UserPanel'

function Sidebar({user}) {
  return (
    <div style={{border:"2px solid blue",padding:"1rem"}}>
          <h1>Sidebar {user.name} (Sidebar)</h1>
          <UserPanel user={user}/>
        
      </div>
  )
}

export default Sidebar
