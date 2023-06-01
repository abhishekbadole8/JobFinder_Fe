import Styles from "./Navbar.module.css"
import SignIn from "../SignIn/SignIn";
import { memo, useEffect, useState } from "react";
import SignOut from "../Signout/SignOut";
// import back1 from "../../assets/back1.svg"
// import back2 from "../../assets/back2.svg"
// import back3 from "../../assets/back3.svg"

function Navbar() {
    const [local, setLocal] = useState(null)
    
    useEffect(() => {
        const getLocal = localStorage.getItem("User_Details")
        setLocal(getLocal)
    }, [local])


    return (
        <>
            <header>
                <label htmlFor="/Homepage" className={Styles.logo}>Jobfinder</label>
                {local === null ? <SignIn /> : <SignOut />}

                {/* <div className={Styles.backgroundImage}>
                    <img src={back1} alt="" />
                    <img src={back2} alt="" />
                    <img src={back3} alt="" />
                </div> */}
            </header>
        </>
    )
}
export default memo(Navbar);