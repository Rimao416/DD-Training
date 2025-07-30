import { useState } from "react"
import "./App.css"


function App() {
  // useState
  const [compteur,setCompteur]=useState(0)
   return (
    <>
    <h1>{compteur}</h1>
    <div className="presentation">
  <button class="btn" onClick={()=>setCompteur(compteur+1)}>Incremneter</button>
  <button class="btn" onClick={()=>setCompteur(compteur-1)}>Decrementer</button>

    </div>
    <p className="result">
      On veut qu'en cliquant sur Incrementer que le chiffre augmente de 1 et en cliquant sur Decrementer que le chiffre diminue de 1
    </p>
    </>
  )
}

export default App
