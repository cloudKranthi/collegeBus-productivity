import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import BusRegister from './pages/BusRegister'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/bus/bus-register' element={<BusRegister/>}/>
    </Routes>
  );
}

export default App;
