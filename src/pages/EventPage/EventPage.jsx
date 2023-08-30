import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import eventsService from '../../services/events.services'
import EventsList from '../../components/EventsList/EventsList'
import EventsFilter from '../../components/EventsFilter/EventsFilter'


const EventPage = () => {

    const [events, setEvents] = useState()
    const [eventsBackup, setEventsBackup] = useState()

    const filterEvents = cityQuery => {
        const filteredEvents = eventsBackup.filter(elm => elm.address.city.includes(cityQuery))
        setEvents(filteredEvents)
    }

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {
        eventsService
            .getEvents()
            .then(({ data }) => { setEvents(data), setEventsBackup(data) })
            .catch(err => console.log(err))
    }

    return (

        <Container>
            <EventsFilter filterEvents={filterEvents} />
            <EventsList events={events}></EventsList>
        </Container>
    )
}

export default EventPage