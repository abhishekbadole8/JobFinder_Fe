import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Login.module.css"
import MainImage from "../../components/MainImage/MainImage";
import client from "../../axiosClient"

function Login() {

    const navigate = useNavigate()

    // User Login Input
    const [userLoginInput, setUserLoginInput] = useState({
        email: "",
        password: "",
    });

    const handelInput = (e) => {
        e.preventDefault()
        setUserLoginInput({ ...userLoginInput, [e.target.name]: e.target.value })
    }

    // POST fetch login
    const fetchLogin = async () => {
        try {
            const response = await client.post(`api/user/login`, { ...userLoginInput })
            if (response.status == 200) {
                const user = await response.data
                if (user) {
                    localStorage.setItem('user_auth_token', JSON.stringify(user))
                    navigate('/homepage')
                }
            }
        } catch (error) {
            console.log('Login Error', error);
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

                <div className={Styles.inputBox}>

                    <input type="email" name="email" value={userLoginInput.email} onChange={handelInput} placeholder="Email" />
                    <input type="password" name="password" value={userLoginInput.password} onChange={handelInput} id="" placeholder="password" />
                </div>

                {userLoginInput.email && userLoginInput.password ?

                    <button className={Styles.loginPageTrueBtn} onClick={() => fetchLogin(userLoginInput.email, userLoginInput.password)} >Sign in</button> :

                    <button className={Styles.loginPageFalseBtn} >Sign in</button>
                }

                <p>Dont have an account? <span><a href="/signup">Sign Up</a></span></p>

            </div>

            {/* Right Image */}
            <MainImage />

        </div>
    )
}
export default Login