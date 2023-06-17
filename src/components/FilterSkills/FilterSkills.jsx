import styles from './FilterSkills.module.css'

function FilterSkills({ skills, skillsTag, setSkillsTag }) {

    const updatedSkills = [...new Set(skills.flat())]

    const handleFilter = (e) => {
        const value = e.target.value
        setSkillsTag((prevTags) => {
            if (!prevTags.includes(value)) {
                return [...prevTags, value]
            }
            return prevTags;
        })
    }

    return (
        <>
            <select name="skillTag" value="" className={styles.filterskills} onChange={(e) => handleFilter(e)}>
                <option value="" disabled>Skills</option>

                {updatedSkills.map((skill, i) => (
                    <option value={skill} key={i} >{skill}</option>
                ))}

            </select>
        </>
    )
}

export default FilterSkills;