import "./App.css"



const Presentation=({nom})=>{
  return(
    <div className="presentation">
  <h1>{nom}</h1>
  <p>Bonsoir {nom}, deja felicitation d'avoir fini cette formation full Stack, je vous souhaite le meilleur</p>
</div>
  )
}
const nom=["Mr Author","Mr Louad","Mr Adlès","Mr Serge","Mr Christian","Mr Sinai","Mr Medy","Mr Oracle"]
for (let index = 0; index < nom.length; index++) {
  const element = nom[index];
  console.log(element)
  
}
function App() {
   return (
    <>
{nom.map((element,index)=><Presentation key={index} nom={element}/>)}
    </>
  )
}

export default App
