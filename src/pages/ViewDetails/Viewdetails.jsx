import { useLocation } from "react-router-dom";
import EditJob from "../../components/EditJob/EditJob";
import Navbar from "../../components/Navbar/Navbar";
import Styles from "./Viewdetails.module.css"

function Viewdetails({navigateAddJob}) {
    const location = useLocation()
    console.log(location);
    return (
        < div className={Styles.viewDetailsmain}>
            <Navbar />
            <div className={Styles.ViewDetailsMainContainer}>
                {/* First Box Title */}
                <div className={Styles.jobTitle}>
                    <h3>WordPress Development work from home job/internship at Adyaka Infosec Private Limited</h3>
                </div>

                {/* Second Box Job Descrription */}
                <div className={Styles.jobDetailInfo}>

                    <div className={Styles.jobDetailFirstLayer}>
                        <span>1w ago</span>
                        <span>Full Time</span>
                    </div>

                    <div className={Styles.jobDetailSecondLayer}>

                        <div>
                            <h2>WordPress Development </h2>

                            <div className={Styles.locationDetails}>
                                <span>Bangalore</span>
                                <span>|</span>
                                <span>India</span>
                            </div>
                        </div>
                        
                        <EditJob onClick={navigateAddJob}/>
                     
                    </div>

                    <div className={Styles.jobDetailThirdLayer}>
                        {/* First Col */}

                        <div className={Styles.jobStipendBox}>
                            <div className={Styles.jobStipendBoxFirstLayer}>
                                <img src="" alt="" />
                                <span>Stipend</span>
                            </div>
                            <p>Rs 25000/month</p>

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
                                <p>We provide technology-based services to help businesses and organizations achieve their goals. We offer a wide range of services, including software development, system integration, network and security services, cloud computing, and data analytics. Our primary focus is on leveraging technology to streamline business processes, improve productivity, and enhance overall efficiency.</p>
                            </li>
                            {/* About job */}
                            <li>
                                <h5>About the  job/internship</h5>
                                <p>We are looking for a responsible PHP/WordPress/Laravel/Shopify Developer. He/She will be liable for managing services and therefore the interchange of knowledge between the server and the users. The candidate's primary focus is going to be the event of all server-side logic, definition, and maintenance of the central database and ensuring high performance and responsiveness to requests from the front end.

                                    Selected intern's day-to-day responsibilities include:
                                    1. Work on the development of theme customization, liquid programming language, and corresponding apps
                                    2. Implement system integrations that are crucial to our success
                                    3. Contribute to the development of HTML5/CSS/JavaScript and standard web technologies integral to building seamless multi-channel experiences
                                    4. Work on speed optimization and making a mobile-friendly website</p>
                            </li>
                            {/* Skills */}
                            <li>
                                <h5>Skill(s) required</h5>

                                <div className={Styles.jobSkillsTags}>
                                    <span>CSS</span>
                                    <span>HTMl</span>
                                    <span>WordPress</span>
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