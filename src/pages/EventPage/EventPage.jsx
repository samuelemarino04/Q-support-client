import { useState, useEffect } from 'react'
import { Container, Modal, Button } from 'react-bootstrap'
import eventsService from '../../services/events.services'
import EventsList from '../../components/EventsList/EventsList'
import EventsFilter from '../../components/EventsFilter/EventsFilter'
import NewEventForm from '../../components/NewEventForm/NewEventForm'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'


const EventPage = () => {

    const [events, setEvents] = useState()
    const [eventsBackup, setEventsBackup] = useState()
    const [showModal, setShowModal] = useState(false)
    const { loggedUser, logout } = useContext(AuthContext)

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

    const fireFinalActions = () => {
        setShowModal(false)
        loadEvents()
    }

    return (
        <>
            <Container>
                {
                    loggedUser &&
                    <>
                        <Button variant='dark' size='sm' onClick={() => setShowModal(true)}>Add new event</Button>
                    </>
                }
                {/* TODO: INTEGRAR FILTRO CONTRA LA API */}
                <EventsFilter filterEvents={filterEvents} />
                <EventsList events={events} />

            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add an event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewEventForm fireFinalActions={fireFinalActions} />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EventPage