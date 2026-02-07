import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import BusAssign from './pages/busassign'
import BusRegister from './pages/BusRegister'
import TripCreate from './pages/TripCreate';
import TripTransiction from "./pages/TripTransaction";
import TripList from './pages/TripList';
import BusStudentDetails from "./pages/busStudentDetails";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/bus/bus-register' element={<BusRegister/>}/>
      <Route path='/bus/bus-assign' element={<BusAssign/>}/>
      <Route path='/tripcreate' element={<TripCreate/>}/>
    <Route path ='/triptransaction' element ={<TripTransiction/>}/>
    <Route path='/tripdetails' element={<TripList/>}/>
    <Route path ='/busStudentdetails' element={<BusStudentDetails/>}/>
    </Routes> 
  );
}

export default App;
