import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Menu from './pages/Menu';
import Modal from './pages/Modal';

const App = () => {
  return(
 <Routes>
  <Route path="/" element={<Home />}/>
  <Route path="/menu" element={<Menu />} />
  <Route path="/modal" element={<Modal />} />
 </Routes>
  )
};

export default App;
