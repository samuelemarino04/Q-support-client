import { Col, Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'
import EventCard from '../EventCard/EventCard'
import eventsService from '../../services/events.services'
import { useEffect, useState } from 'react'


const EventsList = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const [filteredEvents, setFilteredEvents] = useState([])


    useEffect(() => {
        loadEvents()
    }, [searchQuery])


    const loadEvents = () => {

        eventsService
            .getFilteredEvents(searchQuery)
            .then(({ data }) => {
                setFilteredEvents(data)
            })
            .catch(err => console.log(err))
    }


    const handleInputChange = (e) => {
        const searchWord = e.target.value
        setSearchQuery(searchWord)
    }


    return (
        !filteredEvents ?
            <Loader />
            :
            <>
                <Row>
                    <Col md={6}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder='Type to search'
                            className="form-control"
                        />
                    </Col>
                    {
                        filteredEvents.map(elm =>
                            <EventCard {...elm} key={elm._id} />
                        )
                    }
                </Row>
            </>
    )
}

export default EventsList