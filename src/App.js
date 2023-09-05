import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Viewdetails from "./pages/ViewDetails/Viewdetails";
import AddJob from "./pages/AddJob/AddJob";
import jwt_decode from "jwt-decode";

export const UserContext = createContext();

function App() {
  const BASE_URL = `https://job-finder-rddz.onrender.com/`;

  const [userAuthToken, setUserAuthToken] = useState(null); // User token
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Decoded Token Here
  const decodedToken = userAuthToken ? jwt_decode(userAuthToken) : null;
  const userId = decodedToken?.id; // Decoded user_id
console.log(userAuthToken);
  return (
    <UserContext.Provider
      value={{
        BASE_URL,
        isLoading,
        setIsLoading,
        errorMsg,
        setErrorMsg,
        userAuthToken,
        setUserAuthToken,
        userId,
        decodedToken,
      }}
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
