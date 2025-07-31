import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import About from './pages/About';
import Contact from './pages/contact';
import Dashboard from './pages/dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
const App = () => {
  return(
 <Routes>
  <Route path="/" element={<Home />}/>
  <Route path="/about" element={<About />}/>
  <Route path="/contact" element={<Contact />}/>
  <Route path="/dashboard" element={<Dashboard/>}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
  {/* <Route path="/about" element={<About />} /> */}
 </Routes>
  )
};

export default App;
