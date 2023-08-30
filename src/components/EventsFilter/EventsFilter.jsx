import { useState } from "react"

const EventsFilter = ({ filterEvents }) => {

    const [cityQuery, setCityQuery] = useState('')

    const handleCityChange = e => {
        setCityQuery(e.target.value)
        filterEvents(e.target.value)
    }

    return (
        <div className="CreativesFilter">
            <h3>Search an event in your city</h3>
            <input type="text" placeholder="City..." value={cityQuery} onChange={handleCityChange} />
        </div>
    )
}

export default EventsFilter