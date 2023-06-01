import Styles from "./Signout.module.css"
import dp from "../../assets/dp.svg"
import { useEffect, useState } from "react"

function SignOut() {
    const [name, setName] = useState()

    const handelSignOut = () => {
        localStorage.removeItem("User_Details")
    }
    const handelName = async () => {
        const value = await JSON.parse(localStorage.getItem("User_Details"))
        setName(value)
    }
    useEffect(() => {
        handelName()
    }, [])

    return (
        <>
            <div className={Styles.authDetail}>

                <button onClick={handelSignOut}>Logout</button>
                <p>Hello! {name == undefined ? "Recurator" : name.name}</p>
                <img src={dp} alt="profile-pic" />

            </div>
        </>
    )

}
export default SignOut;