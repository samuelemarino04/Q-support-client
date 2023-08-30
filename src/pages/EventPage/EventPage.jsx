import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import eventsService from '../../services/events.services'
import EventsList from '../../components/EventsList/EventsList'


const EventPage = () => {

    const [events, setEvents] = useState()

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventsService
            .getEvents()
            .then(({ data }) => setEvents(data))
            .catch(err => console.log(err))
    }

    return (

        <Container>
            <h1>hello</h1>
            <EventsList events={events}></EventsList>
        </Container>
    )
}

export default EventPage