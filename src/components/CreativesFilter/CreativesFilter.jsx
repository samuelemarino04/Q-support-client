import { useState } from "react"

const CreativesFilter = ({ filterCreatives }) => {

    const [usernameQuery, setUsernameQuery] = useState('')

    const handleTitleChange = e => {
        setUsernameQuery(e.target.value)
        filterCreatives(e.target.value)
    }

    return (
        <div className="CreativesFilter">
            <h3>Search a Creative</h3>
            <input type="text" placeholder="Creative username..." value={usernameQuery} onChange={handleTitleChange} />
        </div>
    )
}

export default CreativesFilter