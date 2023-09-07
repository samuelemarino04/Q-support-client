import { Container, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import CreativeEvents from '../../components/CreativeEvents/CreativeEvents'
import eventsService from '../../services/events.services'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'



const CreativeEventsPage = ({ owner_id }) => {

    const [events, setEvents] = useState()
    const { loggedUser } = useContext(AuthContext)

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
                {
                    loggedUser?.role === "CREATIVE" &&
                    <>
                        <Button variant='info' size='sm' className='mt-3' onClick={() => setShowModal(true)}>Add new event</Button>
                    </>
                }
            </Container>
        </>
    )
}

export default CreativeEventsPage