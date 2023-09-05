import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Styles from "./AddJob.module.css"
import addJobbackImg from "../../assets/addjobbackimg.svg"
import axios from "axios"
import { UserContext } from "../../App"

function AddJob() {

    const navigate = useNavigate()
    const location = useLocation()

    const { BASE_URL, userAuthToken } = useContext(UserContext)

    const { type, selectedJob } = location.state == null ? "" : location.state

    // add/edit Job Input
    const [jobInput, setJobInput] = useState({
        company_name: "", logo_url: "", job_position: "", monthly_salary: "", job_type: "",
        remote_office: "", location: "", job_description: "", about_company: "", skills: [],
    });

    const handleInput = (e) => {
        setJobInput({ ...jobInput, [e.target.name]: e.target.value })
    }
    const handleSkills = (e) => {
        const newSkills = e.target.value.split(',');
        setJobInput({ ...jobInput, skills: newSkills })
    }

    // POST fetch Add Job
    const fetchAddJob = async () => {
        try {
            let response
            if (selectedJob) {
                const job_id = selectedJob._id
                // PATCH request
                response = await axios.patch(BASE_URL + `api/job/${job_id}`, {
                    ...jobInput
                }, {
                    headers: {
                        Authorization: `Bearer ${userAuthToken}`
                    }
                })
            } else {
                // POST request
                response = await axios.post(BASE_URL + `api/job/add`, {
                    ...jobInput
                }, {
                    headers: {
                        Authorization: `Bearer ${userAuthToken}`
                    }
                })
            }
            if (response.status === 200) {
                const data = response.data
                data && navigate('/homepage')
            }
        } catch (error) {
            console.log('Add/Edit Job Error', error);
        }
    }

    useEffect(() => {
        if (type == 'edit-job' && selectedJob) {
            setJobInput({ ...selectedJob })
        } else {
            setJobInput({})
        }
    }, [type, selectedJob])


    return (
        <div className={Styles.addJobContainer}>

            {/* Left box */}
            <div className={Styles.addJobLeftContainer}>

                <h4>Add job description</h4>

                <div className={Styles.addJobInputBox}>

                    <div className={Styles.jobInfoInput}>
                        <h3>Company Name </h3>
                        <input type="text" name="company_name" onChange={handleInput} value={jobInput.company_name} placeholder="Enter your company name here" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Add logo URL </h3>
                        <input type="text" name="logo_url" onChange={handleInput} value={jobInput.logo_url} placeholder="Enter the link" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Job position</h3>
                        <input type="text" name="job_position" onChange={handleInput} value={jobInput.job_position} placeholder="Enter job position" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Monthly salary</h3>
                        <input type="number" name="monthly_salary" onChange={handleInput} value={jobInput.monthly_salary} placeholder="Enter Amount in rupees" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Job Type</h3>

                        <select name="job_type" value={jobInput.job_type} onChange={handleInput}>
                            <option value="full-time" >Full-Time</option>
                            <option value="part-time">Part-Time</option>
                        </select>

                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Remote/office</h3>
                        <select name="remote_office" value={jobInput.remote_office} onChange={handleInput}>
                            <option value="remote" >Remote</option>
                            <option value="office" >Office</option>
                            <option value="flexible">Flexible</option>
                        </select>
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Location</h3>
                        <input type="location" name="location" onChange={handleInput} value={jobInput.location} placeholder="Enter Location" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>About Company</h3>
                        <input type="about_company" name="about_company" onChange={handleInput} value={jobInput.about_company} placeholder="Type about your company" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Job Description</h3>
                        <input type="job_description" name="job_description" onChange={handleInput} value={jobInput.job_description} placeholder="Type the job description" />
                    </div>

                    <div className={Styles.jobInfoInput}>
                        <h3>Skills Required</h3>
                        <input type="skills" name="skills" onChange={handleSkills} value={jobInput.skills} placeholder="Enter the must have skills" />
                    </div>

                </div>

                {/* Buttons */}
                <div className={Styles.addJobsButtons}>
                    {/* Cancel Button */}
                    <button className={Styles.cancelBtn} onClick={() => navigate(-1)}>Cancel</button>

                    {/* Add Job Button active/disable*/}
                    {(jobInput.company_name !== "" || jobInput.logo_url !== "" && jobInput.job_position !== "" && jobInput.monthly_salary !== "" && jobInput.job_type !== ""
                        && jobInput.remote_office !== "" && jobInput.location !== "" && jobInput.job_description !== "" && jobInput.about_company != "") ?
                        <button className={Styles.activeAddBtn} onClick={() => fetchAddJob(jobInput)}>+ Add Job</button> :
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