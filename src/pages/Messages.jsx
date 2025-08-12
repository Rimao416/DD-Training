import React from 'react'
import { Link } from 'react-router-dom'

function Messages() {
  return (
    <div>
      <h1>Je suis le composant Messages</h1>
      <Link to="/groups">Aller dans la page groups</Link>
    </div>
  )
}

export default Messages
