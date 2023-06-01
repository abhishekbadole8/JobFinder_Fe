import Styles from "./Register.module.css"
import MainImage from "../../components/MainImage/MainImage";
import { useEffect, useState } from "react";
import client from "../../axiosClient";

function Register() {
    const [newUserInput, setNewUserInput] = useState({ name: "", email: "", phone: "", password: "" })
    const [check, IsCheck] = useState(false)

    const handelInput = (e) => {
        setNewUserInput({ ...newUserInput, [e.target.name]: e.target.value })
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        // const setNewInput = await client.post(`/api/users/register`, newUserInput)
        console.log(await client.post(`api/users/register`, newUserInput));
        // setNewUserInput(setNewInput)
    }

    const handelCheck = (e) => {
        IsCheck(!check)
    }

    // useEffect(() => {
    //     console.log(newUserInput);
    //     console.log(check);
    // }, [newUserInput, check])

    return (
        <div className={Styles.registerContainer}>

            <div className={Styles.registerLeftContainer}>

                <h3>Create an account</h3>
                <p>Your personal job finder is here</p>

                <div className={Styles.inputBox}>
                    <input type="name" name="name" value={newUserInput.name} onChange={handelInput} placeholder="Name" />
                    <input type="email" name="email" value={newUserInput.email} onChange={handelInput} placeholder="Email" />
                    <input type="tel" name="phone" value={newUserInput.phone} onChange={handelInput} placeholder="Mobile" />
                    <input type="password" name="password" value={newUserInput.password} onChange={handelInput} placeholder="Password" />
                </div>

                <div className={Styles.checkBox}>
                    <input type="checkbox" name="checkbox" onChange={handelCheck} />
                    <p>By creating an account, I agree to our terms of use and privacy policy</p>
                </div>

                {check === true && (newUserInput.name != "" && newUserInput.email != "" && newUserInput.phone != "" && newUserInput.password != "")?
                    <button onClick={handelSubmit} className={Styles.registerPageTrueBtn}>Create Account</button>:
                    <button disabled className={Styles.registerPageFalseBtn}>Create Account </button> 
                }


                <p>Already have an account? <span><a href="/login">Sign In</a></span></p>

            </div>

            <MainImage />
        </div>
    )
}
export default Register;