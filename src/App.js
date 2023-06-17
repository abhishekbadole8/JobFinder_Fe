import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Viewdetails from "./pages/ViewDetails/Viewdetails";
import AddJob from "./pages/AddJob/AddJob";
import Navbar from "./components/Navbar/Navbar";
import UserContext from "./UserContext";
import jwt_decode from "jwt-decode";
function App() {

  // state - LocalStorage token
  const [userAuthToken, setUserAuthToken] = useState(
    eval(localStorage.getItem("user_auth_token"))
  );

  // Decoded Token Here
  const decodedToken = userAuthToken ? jwt_decode(userAuthToken) : null;
  const userId = decodedToken?.id // Decoded user_id

  return (
    <UserContext.Provider
      value={{ userAuthToken, setUserAuthToken, userId,decodedToken }}
    >
      <Router>
        <Routes>
          <Route
            exact
            path="/login"
            element={!userAuthToken ? <Login /> : <Navigate to={"/homepage"} />}
          />
          <Route
            exact
            path="/signup"
            element={
              !userAuthToken ? <Signup /> : <Navigate to={"/homepage"} />
            }
          />
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/homepage" element={<Homepage />} />
          <Route exact path="/viewdetails" element={<Viewdetails />} />
          <Route exact path="/addJob" element={<AddJob />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
