import { useNavigate } from "react-router-dom"
import Styles from './EditJob.module.css'

function EditJob({ job }) {

    const navigate = useNavigate()

    const handleEditJob = (selectedJob) => {
        navigate('/addjob', { state: { selectedJob, type: "edit-job" } })
    }

    return < button className={Styles.jobEditButton} onClick={() => handleEditJob(job)}>Edit Job</button>

}

export default EditJob;