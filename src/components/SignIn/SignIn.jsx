import Styles from "./SignIn.module.css"
import { useNavigate } from "react-router-dom";
function SignIn() {
    const navigate = useNavigate()

    const navigateLogin=()=>{
        navigate('/login')
    }
    const navigateRegister=()=>{
        navigate('/register')
    }
    return (
        <>
            <div className={Styles.authButton}>
                <button onClick={navigateLogin}>Login</button>
                <button onClick={navigateRegister}>Register</button>
            </div>
        </>
    )

}
export default SignIn;