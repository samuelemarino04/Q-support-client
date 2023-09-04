import { Button, Card, Container, Modal } from 'react-bootstrap'
import { useContext, useEffect, useState } from 'react'
import CreativeEvents from '../../components/CreativeEvents/CreativeEvents'
import eventsService from '../../services/events.services'

const CreativeEventsPage = ({ creative, owner_id }) => {

    const [events, setEvents] = useState()
    console.log(events)
    useEffect(() => {
        loadEvents()
    }, [])

    const loadEvents = () => {

        eventsService
            .getEventsByOwner({ owner_id })
            .then(({ data }) => setEvents(data))
            .catch(err => console.log(err))
        console.log(events)
    }

    return (
        <>
            <Container>

                <CreativeEvents events={events} creative={creative} />
            </Container>
        </>
    )
}

export default CreativeEventsPage