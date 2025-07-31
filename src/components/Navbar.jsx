import {Link}   from "react-router-dom"
function Navbar() {
  return (
    <nav className='navbar'>
        <div className='nav-logo'>MonSite</div>
        <div className='nav-links'>
            <Link to="/">Accueil</Link>
            <Link to="/about">A propos</Link>
            <Link to="/contact">Contact</Link>
        </div>
    </nav>
  )
}

export default Navbar
