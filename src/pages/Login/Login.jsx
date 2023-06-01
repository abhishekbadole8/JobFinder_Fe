import Styles from "./Login.module.css"
import MainImage from "../../components/MainImage/MainImage";

import client from "../../axiosClient"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate()

    const [inputData, setInputData] = useState({ email: "", password: "" })
    const [notValid, setnotValid] = useState(false)

    const handelInput = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        const response = await client.post(`api/users/login`, inputData)

        localStorage.setItem("User_Details", JSON.stringify(response.data))

        if (response.status == 200) {
            navigate("/Homepage")
        }
        if (response.status == 404) {
            setnotValid(true)
        }
    }

    // const navigateToHome = () => {
    //     navigate("/Homepage")
    // }

    return (
        <div className={Styles.loginContainer}>

            {/* Left box */}
            <div className={Styles.loginLeftContainer}>

                <div>
                    <h3>Already have an account?</h3>
                    <p>Your personal job finder is here</p>
                </div>

                <div className={Styles.inputBox}>
                    <input type="email" name="email" value={inputData.email} onChange={handelInput} placeholder="Email" />
                    <input type="password" name="password" value={inputData.password} onChange={handelInput} id="" placeholder="password" />
                    {notValid === true ? <h4 className={Styles.errorToggleLoginPage}>Email Or Password Is Invalid !!!</h4> : ""}
                </div>

                {(inputData.email != "" && inputData.password != "") ?
                    <button onClick={handelSubmit} className={Styles.loginPageTrueBtn}>Sign in</button> :
                    <button className={Styles.loginPageFalseBtn}>Sign in</button>
                }

                <p>Dont have an account? <span><a href="/register">Sign Up</a></span></p>

            </div>

            {/* Right Image */}
            <MainImage />

        </div>
    )
}
export default Login