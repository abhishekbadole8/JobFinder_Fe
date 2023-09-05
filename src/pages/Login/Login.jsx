import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Styles from "./Login.module.css"
import MainImage from "../../components/MainImage/MainImage";
import axios from "axios";
import { UserContext } from "../../App";

function Login() {
    const location = useLocation()

    const navigate = useNavigate()

    const { BASE_URL, setUserAuthToken, isLoading, setIsLoading, errorMsg, setErrorMsg } = useContext(UserContext)

    const [userLoginInput, setUserLoginInput] = useState({ email: "", password: "" });

    const handelInput = (e) => {
        e.preventDefault()
        setErrorMsg('')
        setUserLoginInput((prevVal) => ({ ...prevVal, [e.target.name]: e.target.value }))
    }

    // POST fetch login
    const fetchLogin = async () => {
        try {
            const response = await axios.post(BASE_URL + `api/user/login`, { ...userLoginInput })
            if (response) {
                const token = await response.data
                if (token) {
                    setIsLoading(false)
                    setErrorMsg('')
                    localStorage.setItem('user_auth_token', token)
                    setUserAuthToken(token)
                    navigate('/homepage')
                }
            }
        } catch (error) {
            setIsLoading(false)
            const msg = error.response.data.message
            if (msg) {
                setErrorMsg(msg)
            } else {
                console.log('Login Error', error);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!errorMsg) {
            setIsLoading(true)
            fetchLogin()
        }
    }

    return (
        <div className={Styles.loginContainer}>

            {/* Left box */}
            <div className={Styles.loginLeftContainer}>

                <div>
                    <h3>Already have an account?</h3>
                    <p>Your personal job finder is here</p>
                </div>

                <form onSubmit={handleSubmit}>

                    {location.state != null && <p id={Styles.userCreatedMsg}>{location.state.msg}</p>}

                    <div className={Styles.inputBox}>

                        <input type="email" name="email" value={userLoginInput.email} onChange={handelInput} placeholder="Email" />

                        <input type="password" name="password" value={userLoginInput.password} onChange={handelInput} id="" placeholder="password" />
                    </div>

                    {errorMsg && <p id={Styles.errormsg}>{errorMsg}</p>}

                    <button type="submit"
                        className={`${isLoading ? Styles.loginPageTrueBtn : userLoginInput.email && userLoginInput.password ? Styles.loginPageTrueBtn : Styles.loginPageFalseBtn}`}
                        disabled={isLoading || (!userLoginInput.email || !userLoginInput.password)}>
                        {isLoading ? 'Loading...' : 'Sign in'}
                    </button>

                </form>

                <p>Dont have an account? <span><a href="/signup">Sign Up</a></span></p>

            </div>

            {/* Right Image */}
            <MainImage />

        </div>
    )
}
export default Login