import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Viewdetails from "./pages/ViewDetails/Viewdetails";
import AddJob from "./pages/AddJob/AddJob";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/Login" element={<Login />}></Route>
        <Route exact path="/Register" element={<Register />}></Route>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/Homepage" element={<Homepage />}></Route>
        <Route exact path="/Viewdetails" element={<Viewdetails />}></Route>
        <Route exact path="/AddJob" element={<AddJob />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
