import Styles from "./Signup.module.css"
import MainImage from "../../components/MainImage/MainImage";
import { useEffect, useState } from "react";
import client from "../../axiosClient";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()

    // User Signup Input
    const [userSignupInput, seUserSignupInput] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    // Check Checkbox true/false
    const [isCheck, setIsCheck] = useState(false)

    const handleInput = (e) => {
        e.preventDefault()
        seUserSignupInput({ ...userSignupInput, [e.target.name]: e.target.value })
    }
    const handleCheck = () => {
        isCheck ? setIsCheck(false) : setIsCheck(true)
    }

    // POST fetch Signup
    const fetchSubmit = async () => {
        if (!isCheck) {
            return;
        }
        try {
            const response = await client.post('api/user/signup', { ...userSignupInput })
            if (response.status === 200) {
                const user = await response.data
                user && navigate('/login')
            }
        } catch (error) {
            console.log('Signup Error', error);
        }
    }

    return (
        <div className={Styles.registerContainer}>

            <div className={Styles.registerLeftContainer}>

                <h3>Create an account</h3>
                <p>Your personal job finder is here</p>

                <div className={Styles.inputBox}>
                    <input type="text" name="name" value={userSignupInput.name} onChange={handleInput} placeholder="Name" />
                    <input type="email" name="email" value={userSignupInput.email} onChange={handleInput} placeholder="Email" />
                    <input type="tel" name="phone" value={userSignupInput.phone} onChange={handleInput} placeholder="Mobile" />
                    <input type="password" name="password" value={userSignupInput.password} onChange={handleInput} placeholder="Password" />
                </div>

                <div className={Styles.checkBox}>
                    <input type="checkbox" name="checkbox" onChange={handleCheck} />
                    <p>By creating an account, I agree to our terms of use and privacy policy</p>
                </div>

                {isCheck === true && (userSignupInput.name != "" && userSignupInput.email != "" && userSignupInput.phone != "" && userSignupInput.password != "") ?
                    <button onClick={() => fetchSubmit(userSignupInput.name, userSignupInput.email, userSignupInput.phone, userSignupInput.password)}
                        className={Styles.registerPageTrueBtn}>Create Account</button> :
                    <button className={Styles.registerPageFalseBtn}>Create Account</button>
                }

                <p>Already have an account? <span><a href="/login">Sign In</a></span></p>

            </div>

            <MainImage />
        </div>
    )
}
export default Register;