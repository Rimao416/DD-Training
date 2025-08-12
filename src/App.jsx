import './App.css';
import {Routes, Route} from "react-router-dom";
import Messages from './pages/Messages';
import Groups from './pages/Groups';
import Profile from './pages/Profile';

const App = () => {
  return(
 <Routes>
<Route path="/" element={<Messages/>}/>
<Route path="/groups" element={<Groups />} />
<Route path="/profile" element={<Profile />} />

  {/* <Route path="/about" element={<About />} /> */}
 </Routes>
  )
};

export default App;
