import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Navbar.module.css"
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../App";

function Navbar() {
    const navigate = useNavigate()

    const { userAuthToken, setUserAuthToken, decodedToken } = useContext(UserContext)

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
                        <p>Hello! {decodedToken?.name}</p>
                        <FaUserCircle size={40} />
                    </div> :
                    <div className={Styles.authButton}>
                        <button onClick={() => navigate('/login')} >Login</button>
                        <button onClick={() => navigate('/signup')} >Register</button>
                    </div>
                }

            </header >
        </>
    )
}
export default Navbar;