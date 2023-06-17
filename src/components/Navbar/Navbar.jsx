import { useNavigate } from "react-router-dom";
import Styles from "./Navbar.module.css"
import { useContext, useEffect, useState } from "react";
// import back1 from "../../assets/back1.svg"
// import back2 from "../../assets/back2.svg"
// import back3 from "../../assets/back3.svg"
import { FaUserCircle } from "react-icons/fa";
import UserContext from "../../UserContext";

function Navbar() {
    const navigate = useNavigate()

    const { userAuthToken, setUserAuthToken, userId, decodedToken } = useContext(UserContext)

    const handleLogout = () => {
        localStorage.removeItem("user_auth_token")
        setUserAuthToken(null)
    }

    return (
        <>
            <header>
                <label htmlFor="/Homepage" className={Styles.logo}>Jobfinder</label>

                {userAuthToken !== null ?
                    <div className={Styles.authDetail}>
                        <button onClick={handleLogout}>Logout</button>
                        <p>Hello! {decodedToken.name}</p>
                        <FaUserCircle size={40} />
                    </div> :
                    <div className={Styles.authButton}>
                        <button onClick={() => navigate('/login')} >Login</button>
                        <button onClick={() => navigate('/register')} >Register</button>
                    </div>
                }

                {/* <div className={Styles.backgroundImage}>
                    <img src={back1} alt="" />
                    <img src={back2} alt="" />
                    <img src={back3} alt="" />
                </div> */}
            </header >
        </>
    )
}
export default Navbar;