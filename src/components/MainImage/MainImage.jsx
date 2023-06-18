import Styles from "./MainImage.module.css"
import man from "../../assets/man.webp"

function MainImage() {
    return (
        <div className={Styles.loginRightContainer}>
            <img src={man} alt="man" />
            <h2>Your Personal Job Finder</h2>
        </div>
    )
}
export default MainImage;