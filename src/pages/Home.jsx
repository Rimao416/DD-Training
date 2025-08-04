import { useState } from "react";


function Home() {
const [formData, setFormData] = useState({
  nom: "---",
  email: "---",
  age: "---",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

  return (
    <form onSubmit={()=>console.log("Envoie")}>
      <div>
        <label htmlFor="">Nom</label>
        <input type="text"
        name="nom"
        value="---"
        onChange={handleChange}
        required
        />
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input type="email"
        name="email"
        value="---"
        onChange={handleChange}
        required
        />
      </div>
      <div>
        <label htmlFor="">Age</label>
        <input type="number"
        name="age"
        value="---"
        onChange={handleChange}
        required
        />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default Home;
