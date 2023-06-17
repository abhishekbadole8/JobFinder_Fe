import { useNavigate } from "react-router-dom"
import Styles from "./JobBox.module.css"
import flag from "../../assets/flag.webp"
import { FaUserFriends } from "react-icons/fa";
import { BsCurrencyRupee } from "react-icons/bs";
import { useEffect, useState } from "react";
import EditJob from "../EditJob/EditJob";

function JobBox({ job, userId, userAuthToken }) {

    const navigate = useNavigate()
    // const [editJob, setEditJob] = useState() // Here Job to edit

    const { _id, user_id, logo_url, job_position, monthly_salary, location, remote_office, job_type } = job

    return (

        <div className={Styles.mainSecondContainerBox} key={_id}>

            {/* ----------------------------------------- Left Side ----------------------------------------- */}
            <div className={Styles.jobDetailsLeftBox}>

                <img src={logo_url} alt="company-logo" id={Styles.companyLogo} />

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

                    {/* Edit Button */}
                    {userAuthToken && user_id === userId &&
                        // < button className={Styles.jobEditButton} onClick={() => handleEditJob(job)}>Edit Job</button>
                        <EditJob job={job} />
                    }

                    {/* View Detail Button */}
                    <button className={Styles.viewDetailsButton} onClick={() => navigate('/viewdetails', { state: { job } })}>View details</button>

                </div>

            </div>

        </div >

    )
}
export default JobBox;