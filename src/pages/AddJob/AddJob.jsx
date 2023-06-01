import { useLocation, useNavigate } from "react-router-dom"
import Styles from "./AddJob.module.css"
import addJobbackImg from "../../assets/addjobbackimg.svg"
import client from "../../axiosClient"
import { useState } from "react"

function AddJob() {

    const navigate = useNavigate()
    const location = useLocation()

    // console.log(location.state.Authorization.split(" ")[1]);

    const [job, setJob] = useState({
        company_name: "", logo_url: "", job_position: "", monthly_salary: "", job_type: "",
        remote_office: "", location: "", job_description: "", about_company: "", skills: []
    })

    const handelCancel = () => {
        navigate('/homepage')
    }

    const handelChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value })
    }

    const handelSkills = (e) => {
        const newSkills = e.target.value.split(',');
        setJob({ ...job, skills: newSkills })
    }


    const handelSubmit = async () => {
        try {
            const response = await client.post(`api/jobs/`, job, location.state)
            alert(`Job Added Successfully!!!`)
            navigate('/homepage')
        } catch (error) {
            alert(`Error ${error}`)
        }
    }

    return (
        <div className={Styles.addJobContainer}>

            {/* Left box */}
            <div className={Styles.addJobLeftContainer}>

                <h4>Add job description</h4>

                <div className={Styles.addJobInputBox}>

                    <div className={Styles.jobInfoInput}>
                        <h3>Company Name </h3>
                        <input type="text" name="company_name" onChange={handelChange} value={job.company_name} placeholder="Enter your company name here" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Add logo URL </h3>
                        <input type="text" name="logo_url" onChange={handelChange} value={job.logo_url} placeholder="Enter the link" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Job position</h3>
                        <input type="text" name="job_position" onChange={handelChange} value={job.job_position} placeholder="Enter job position" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Monthly salary</h3>
                        <input type="number" name="monthly_salary" onChange={handelChange} value={job.monthly_salary} placeholder="Enter Amount in rupees" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Job Type</h3>
                        <select name="job_type" value={job.job_type} onChange={handelChange}>
                            <option value="full-time" selected>Full-Time</option>
                            <option value="part-time">Part-Time</option>
                        </select>
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Remote/office</h3>
                        <select name="remote_office" value={job.remote_office} onChange={handelChange}>
                            <option value="remote" >Remote</option>
                            <option value="office" selected>Office</option>
                            <option value="flexible">Flexible</option>
                        </select>
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Location</h3>
                        <input type="location" name="location" onChange={handelChange} value={job.location} placeholder="Enter Location" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>About Company</h3>
                        <input type="about_company" name="about_company" onChange={handelChange} value={job.about_company} placeholder="Type about your company" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Job Description</h3>
                        <input type="job_description" name="job_description" onChange={handelChange} value={job.job_description} placeholder="Type the job description" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Skills Required</h3>
                        <input type="skills" name="skills" onChange={handelSkills} value={job.skills} placeholder="Enter the must have skills" />
                    </div>

                </div>

                {/* Buttons */}
                <div className={Styles.addJobsButtons}>
                    {/* Cancel Button */}
                    <button className={Styles.cancelBtn} onClick={handelCancel}>Cancel</button>

                    {/* Add Job Button */}
                    {(job.company_name !== "" || job.logo_url !== "" && job.job_position !== "" && job.monthly_salary !== "" &&
                        job.job_type !== "" && job.remote_office !== "" && job.location !== "" && job.job_description !== "" &&
                        job.about_company != "") ?
                        <button className={Styles.activeAddBtn} onClick={handelSubmit}>+ Add Job</button> :
                        <button disabled className={Styles.disabledAddBtn} >+ Add Job</button>
                    }


                </div>

            </div>

            {/* Right Image */}

            <div className={Styles.addJobRightContainer}>
                <img src={addJobbackImg} alt="man" />
                <h2>Recruiter add job details here</h2>
            </div>
        </div>

    )

}
export default AddJob;