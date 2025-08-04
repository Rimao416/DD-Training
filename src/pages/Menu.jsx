import React, { useState } from 'react'

function Menu() {
      const [compteur,setCompteur]=useState(0);
      const increment=()=>setCompteur(compteur+1);
      const decrementer=()=>setCompteur(compteur-1);
      const reset=()=>setCompteur(0);
    
  return (
    <div>
          <h1>Bienvenue dans mon application</h1>
    <button onClick={increment}>+</button>
    <button onClick={decrementer}>-</button>
    <button onClick={reset}>reset</button>
    <p>{compteur}</p>
    </div>
  )
}

export default Menu
