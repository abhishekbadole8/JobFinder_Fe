import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Styles from "./Homepage.module.css"
import Navbar from "../../components/Navbar/Navbar"
import client from "../../axiosClient"
import JobBox from "../../components/JobBox/JobBox";

function Homepage() {
    const navigate = useNavigate()
    const [localStore, setLocalStore] = useState()

    const skillsList = ['HTML', 'CSS', 'Javascript', 'Nodejs'] //Array of Skills 
    const [skillTag, setskillTag] = useState([]) // Store Skill Tag

    const [jobsBox, setJobsBox] = useState()// Here Api Jobs are Store

    const authToken = JSON.parse(localStorage.getItem('User_Details'))
    const headers = { Authorization: `Bearer ${authToken.AccessToken}` }

    const navigateAddJob = () => {
        navigate('/addjob', { state: headers })
    }

    // Fetch Job from api and show in Boxes
    const fetchJobs = async () => {
        try {
            const response = await client.get(`/api/jobs`)
            setJobsBox(response.data)

        } catch (error) {
            alert(`Error Loading Jobs: ${error}`)
        }
    }

    // Set DropDown Value to State
    const dropDownSkill = (e) => {
        e.preventDefault()
        const value = e.target.value
        setskillTag((pre) => [...pre, value])
    }
    // Remove Skill Tag
    const handelRemove = (index) => {
        setskillTag((prevSkills) => {
            const newSkills = [...prevSkills]
            newSkills.splice(index, 1)
            return newSkills
        })
    }

    //Clear All Button
    const handelClearAll = () => {
        const allClear = skillTag.splice(0, skillTag.length)
        setskillTag()
    }
    // const handleShowJob = async (job) => {
    //     const mappingSkills = await jobsBox.map((ele) => {
    //         const eleArray = ele.skills

    //         const updatedSkill = eleArray.map((x) => {               
    //             console.log("return",x === ele);

    //         })
    //     })
    // }

    useEffect(() => {
        setLocalStore(JSON.parse(localStorage.getItem("User_Details")))
        fetchJobs()
        // handleShowJob(jobsBox)
    }, [skillTag])

    return (
        <>
            <Navbar />

            {/* Main Container */}
            <section>

                {/* Inside Input Box */}
                <div className={Styles.mainFirstContainer}>

                    <div className={Styles.inputBox}>
                        <input type="text" placeholder="Type any job title" />
                    </div>

                    <div className={Styles.dropDownBox}>
                        {/* Dropdown Here */}
                        <div className={Styles.dropDownBoxLeft}>

                            <select name="skillTag" onChange={dropDownSkill}>
                                {skillsList.map((val, i) => (
                                    <option value={val} key={i}>{val}</option>
                                ))}
                            </select>

                            <div className={Styles.coursesTagBox}>
                                <div className={Styles.coursesTagBoxTop}>

                                    {/* Skill Tags */}

                                    {skillTag !== undefined ? skillTag.map((val, i) => {
                                        return (
                                            <div className={Styles.coursesTag} key={i} >
                                                <p>{val}</p>
                                                <span onClick={() => handelRemove(i)}>X</span>
                                            </div>
                                        )
                                    }) : "Select at least One Skill"
                                    }

                                </div>

                                <div className={Styles.coursesTagBoxBottom}>
                                    <p className={Styles.clearBtn} onClick={handelClearAll}>Clear</p>
                                </div>
                            </div>

                        </div>

                        {/* Search Container Right Side */}
                        <div className={Styles.dropDownBoxRight}>
                            <button className={Styles.addJobBtn} onClick={navigateAddJob}>+ Add Job</button>
                        </div>
                        
                    </div>
                </div>

                {/* Second Container Start here */}
                <div className={Styles.mainSecondContainer}>

                    {/* Map */}
                    {jobsBox !== undefined ?

                        jobsBox.map((job) => {

                            return (
                                <JobBox job={job} navigateAddJob={navigateAddJob} />
                            )
                        })
                        : "Loading....."
                    }

                </div>

            </section>
        </>
    )
}
export default Homepage;