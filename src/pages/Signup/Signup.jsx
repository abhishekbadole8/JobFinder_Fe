import Styles from "./Signup.module.css"
import MainImage from "../../components/MainImage/MainImage";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App"

function Register() {
    const navigate = useNavigate()

    const { BASE_URL, isLoading, setIsLoading, errorMsg, setErrorMsg } = useContext(UserContext)

    // User Signup Input
    const [userSignupInput, seUserSignupInput] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    // Check Checkbox true/false
    const [isCheck, setIsCheck] = useState(false)

    const handleInput = (e) => {
        e.preventDefault()
        setErrorMsg('')
        seUserSignupInput({ ...userSignupInput, [e.target.name]: e.target.value })
    }

    const handleCheck = () => {
        isCheck ? setIsCheck(false) : setIsCheck(true)
    }

    // POST fetch Signup
    const fetchRegister = async () => {
        if (!isCheck) {
            return;
        }
        try {
            const response = await axios.post(BASE_URL + 'api/user/signup', { ...userSignupInput })
            if (response) {
                const user = await response.data
                setIsLoading(false)
                setErrorMsg('')
                user && navigate('/login', { state: { msg: 'User Created, Now Login ' } })
            }
        } catch (error) {
            setIsLoading(false)
            const msg = error.response.data.message
            if (msg) {
                setErrorMsg(msg)
            } else {
                console.log('Signup Error', error);
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!errorMsg) {
            setIsLoading(true)
            fetchRegister()
        }
    }

    return (
        <div className={Styles.registerContainer}>

            <div className={Styles.registerLeftContainer}>

                <div>
                    <h3>Create an account</h3>
                    <p>Your personal job finder is here</p>
                </div>

                <form onSubmit={handleSubmit}>

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

                    {errorMsg && <p id={Styles.errormsg}>{errorMsg}</p>}

                    <button type="submit" className={`${isCheck === true && (userSignupInput.name != "" && userSignupInput.email != "" && userSignupInput.phone != "" && userSignupInput.password != "") ?
                        Styles.registerPageTrueBtn : Styles.registerPageFalseBtn}`}
                        disabled={isLoading || !isCheck || (!userSignupInput.name || !userSignupInput.email || !userSignupInput.phone || !userSignupInput.password)}>
                        {!isLoading ? 'Create Account' : 'Loading...'}
                    </button>

                </form>

                <p>Already have an account? <span><a href="/login">Sign In</a></span></p>

            </div>

            <MainImage />
        </div>
    )
}
export default Register;