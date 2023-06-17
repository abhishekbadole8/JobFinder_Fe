import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Styles from "./Viewdetails.module.css"
import EditJob from "../../components/EditJob/EditJob"
import { useContext } from "react";
import UserContext from "../../UserContext";

function Viewdetails() {

    const location = useLocation()

    const { userAuthToken, userId } = useContext(UserContext)

    const job = location.state.job

    return (
        < div className={Styles.viewDetailsmain}>

            <Navbar />

            <div className={Styles.ViewDetailsMainContainer}>

                {/* First Box Title */}
                <div className={Styles.jobTitle}>
                    <h3>{job.company_name}</h3>
                </div>

                {/* Second Box Job Descrription */}
                <div className={Styles.jobDetailInfo}>

                    <div className={Styles.jobDetailFirstLayer}>
                        <span>1w ago</span>
                        <span>{job.job_type}</span>
                    </div>

                    <div className={Styles.jobDetailSecondLayer}>

                        <div>
                            <h2>{job.job_position} </h2>

                            <div className={Styles.locationDetails}>
                                <span>{job.location}</span>
                                <span>|</span>
                                <span>India</span>
                            </div>
                        </div>

                        {/* Show Edit Button to verified user */}
                        {userAuthToken && job.user_id === userId &&
                            <EditJob job={job} />
                        }


                    </div>

                    <div className={Styles.jobDetailThirdLayer}>
                        {/* First Col */}

                        <div className={Styles.jobStipendBox}>
                            <div className={Styles.jobStipendBoxFirstLayer}>
                                <img src="" alt="" />
                                <span>Stipend</span>
                            </div>
                            <p>Rs {job.monthly_salary}/month</p>

                        </div>

                        {/* Second Col */}
                        <div className={Styles.jobDurationBox}>
                            <div className={Styles.jobStipendBoxFirstLayer}>
                                <img src="" alt="" />
                                <span>Duration</span>
                            </div>

                            <p>6 Months</p>

                        </div>

                    </div>

                    <div className={Styles.jobDetailInfoList}>
                        <ul>
                            {/* About Company */}
                            <li>
                                <h5>About company</h5>
                                <p>{job.about_company}</p>
                            </li>

                            {/* About job */}
                            <li>
                                <h5>About the  job/internship</h5>
                                <p>{job.job_description}</p>
                            </li>

                            {/* Skills */}
                            <li>
                                <h5>Skill(s) required</h5>

                                <div className={Styles.jobSkillsTags}>
                                    {job.skills.map((skill) => {
                                        return <span>{skill}</span>
                                    })}
                                </div>
                            </li>

                            {/* additional info. */}
                            <li>
                                <h5>Additional Information</h5>
                                <p>Stipend structure: This is a performance-based internship. In addition to the minimum-assured stipend, you will also be paid a performance-linked incentive (₹ 2500 per design).</p>
                            </li>
                        </ul>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default Viewdetails;