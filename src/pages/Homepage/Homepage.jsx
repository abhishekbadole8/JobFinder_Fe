import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Styles from "./Homepage.module.css"
import Navbar from "../../components/Navbar/Navbar"
import client from "../../axiosClient"
import JobBox from "../../components/JobBox/JobBox";
import UserContext from "../../UserContext"
import FilterSkills from "../../components/FilterSkills/FilterSkills"

function Homepage() {
    const navigate = useNavigate()

    const { userAuthToken, setUserAuthToken, userId } = useContext(UserContext)

    const [skillsTag, setSkillsTag] = useState([]) // Store Selected Skill Tag
    const [jobsList, setJobsList] = useState([]) // Here Api Jobs are Store

    // fetch Jobs
    const fetchJobs = async () => {
        try {
            let response;
            if (skillsTag.length > 0) {
                response = await client.get('/api/job/', {
                    params: { skills: skillsTag.join(",") }
                })
            } else {
                response = await client.get(`/api/job/`)
            }
            if (response.status === 200) {
                const data = response.data
                if (data) {
                    setJobsList(response.data)
                }
            }
        } catch (error) {
            console.log('Jobs Fetching Error', error);
        }
    }


    // Remove Skill Tag
    const handelRemove = (index) => {
        setSkillsTag((prevSkills) => {
            const newSkills = [...prevSkills]
            newSkills.splice(index, 1)
            return newSkills
        })
    }

    // Clear All Button
    const handelClearAll = () => {
        // const allClear = skillsTag.splice(0, skillsTag.length)
        setSkillsTag([])
    }

    // Handle Search Title Input
    const handleInput = (e) => {
        const value = e.target.value;

    };

    useEffect(() => {
        fetchJobs()
    }, [skillsTag])



    return (
        <>
            <Navbar />

            {/* Main Container */}
            <section>

                {/* Inside Input Box */}
                <div className={Styles.mainFirstContainer}>

                    <div className={Styles.inputBox}>
                        <input type="text" placeholder="Type any job title" onChange={(e) => handleInput(e)} />
                    </div>

                    <div className={Styles.dropDownBox}>

                        <div className={Styles.dropDownBoxLeft}>
                            {/* Dropdown Here */}
                            <FilterSkills skillsTag={skillsTag} setSkillsTag={setSkillsTag} skills={jobsList ? jobsList.map((skill) => skill.skills) : []} />

                            <div className={Styles.coursesTagBox}>
                                <div className={Styles.coursesTagBoxTop}>

                                    {/* Skill Tags */}
                                    {skillsTag !== undefined ? skillsTag.map((skill, i) => {
                                        return (
                                            <div className={Styles.coursesTag} key={i} >
                                                <p>{skill}</p>
                                                <span onClick={() => handelRemove(i)}>X</span>
                                            </div>
                                        )
                                    }) : "Select at least One Skill"
                                    }

                                </div>

                                {userAuthToken &&
                                    <div className={Styles.coursesTagBoxBottom}>
                                        <p className={Styles.clearBtn} onClick={handelClearAll}>Clear</p>
                                    </div>}

                            </div>

                        </div>

                        {/* Search Container Right Side */}
                        {userAuthToken ?
                            //when user is logged in
                            <div className={Styles.dropDownBoxRight}>
                                <button className={Styles.addJobBtn} onClick={() => navigate('/addjob')}>+ Add Job</button>
                            </div> :
                            // if user is not logged in
                            <div className={Styles.coursesTagBoxBottom}>
                                <p className={Styles.clearBtn} onClick={handelClearAll}>Clear</p>
                            </div>
                        }

                    </div>
                </div>


                {/* Second Container Start here */}
                <div className={Styles.mainSecondContainer}>

                    {(jobsList !== undefined) ?
                        jobsList.map((job) => {
                            return <JobBox job={job} userId={userId} userAuthToken={userAuthToken} key={job._id} />
                        })
                        : "Loading....."
                    }

                </div>

            </section>

        </>
    )
}
export default Homepage;