import { useNavigate } from "react-router-dom"

import Styles from "./JobBox.module.css"
import first_company from "../../assets/first_company.svg"
import flag from "../../assets/flag.svg"
import { FaUserFriends } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import EditJob from "../EditJob/EditJob";

function JobBox({ job,  navigateAddJob }) {

    const navigate = useNavigate()

    const { _id, job_position, monthly_salary, location, remote_office, job_type } = job

    const navigateViewDetails = () => {
        navigate('/viewdetails')
    }

    return (

        <div className={Styles.mainSecondContainerBox} key={_id}>

            {/* ----------------------------------------- Left Side ----------------------------------------- */}
            <div className={Styles.jobDetailsLeftBox}>
                <img src={first_company} alt="company-logo" id={Styles.companyLogo} />

                <div className={Styles.jobDetailsInfo}>
                    
                    {/* Job Title */}
                    <p>{job_position}</p>

                    <div className={Styles.jobDetails}>
                        <div className={Styles.jobDetailsTags}>
                            <FaUserFriends />
                            <p>11-50</p>
                        </div>
                        <div className={Styles.jobDetailsTags}>
                            <BsCurrencyRupee />
                            <p>{monthly_salary}</p>
                        </div>
                        <div className={Styles.jobDetailsTags}>
                            <img src={flag} alt="country-flag" />
                            <p>{location}</p>
                        </div>
                    </div>

                    <div className={Styles.typeDetails}>
                        <p>{remote_office}</p>
                        <p>{job_type}</p>
                    </div>
                </div>

            </div>

            {/* -----------------------------------------Right Side----------------------------------------- */}
            <div className={Styles.jobDetailsRightBox}>

                <div className={Styles.skillsList} >

                    {/* Skills map */}
                    {job.skills.map((skill, i) => {
                        return <li key={i}>{skill}</li>
                    })}

                </div>

                <div className={Styles.skillsButton}>
                    {"" === null ?
                        <button className={Styles.viewDetailsButton} onClick={navigateViewDetails}>View details</button> :
                        <>
                            <EditJob onClick={navigateAddJob} />
                            <button className={Styles.viewDetailsButton} onClick={navigateViewDetails}>View details</button>
                        </>}
                </div>

            </div>

        </div>

    )
}
export default JobBox;