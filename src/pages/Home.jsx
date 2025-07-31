import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
     const [todos, setTodos] = useState([]);
  const [nouveau, setNouveauTodo] = useState('');
  const [filtre, setFiltre] = useState('tous');

  const ajouterTodo = (e) => {
    e.preventDefault();
    if (nouveau.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: nouveau.trim(),
          complete: false
        }
      ]);
      navigate('/about');
      setNouveauTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, complete: !todo.complete } : todo
    ));
  };

  const todosFiltres = todos.filter((todo) => {
    if (filtre === 'tous') return true;
    if (filtre === 'complete') return todo.complete;
    if (filtre === 'incomplete') return !todo.complete;
    return true;
  });   
  
  return (
    <div className="app-container">
        <Navbar />
      <h1>Ma todo Liste</h1>

      <form className="todo-form" onSubmit={ajouterTodo}>
        <input
          type="text"
          value={nouveau}
          onChange={(e) => setNouveauTodo(e.target.value)}
          placeholder="Ajouter une tâche"
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      <div className="filters">
        <button
          onClick={() => setFiltre('tous')}
          className={filtre === 'tous' ? 'active' : ''}
        >
          Tous
        </button>
        <button
          onClick={() => setFiltre('complete')}
          className={filtre === 'complete' ? 'active' : ''}
        >
          Complétés
        </button>
        <button
          onClick={() => setFiltre('incomplete')}
          className={filtre === 'incomplete' ? 'active' : ''}
        >
          Incomplets
        </button>
      </div>

      {todosFiltres.length === 0 && (
        <p className="empty-message">Aucune tâche</p>
      )}

      <div className="todo-list">
        {todosFiltres.map((todo) => (
          <div key={todo.id} className={`todo-item ${todo.complete ? 'done' : ''}`}>
            <input
              type="checkbox"
              checked={todo.complete}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home
