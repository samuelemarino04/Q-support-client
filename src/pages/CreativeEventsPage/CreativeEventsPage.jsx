import { Container } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import CreativeEvents from '../../components/CreativeEvents/CreativeEvents'
import eventsService from '../../services/events.services'

const CreativeEventsPage = ({ owner_id }) => {

    const [events, setEvents] = useState()

    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {

        eventsService
            .getEventsByOwner(owner_id)
            .then(({ data }) => setEvents(data))
            .catch(err => console.log(err))
    }


    return (
        <>
            <Container>
                <CreativeEvents events={events} />
            </Container>
        </>
    )
}

export default CreativeEventsPage