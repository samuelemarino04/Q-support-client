import { useState } from 'react'
import { Container, Modal, Button } from 'react-bootstrap'
import EventsList from '../../components/EventsList/EventsList'
import NewEventForm from '../../components/NewEventForm/NewEventForm'
import { AuthContext } from '../../contexts/auth.context'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import Maps from '../../components/Maps/Maps'



const EventPage = () => {

    const [showModal, setShowModal] = useState(false)
    const { loggedUser, logout } = useContext(AuthContext)

    const navigate = useNavigate()

    const fireFinalActions = () => {
        navigate(`/creative/${loggedUser._id}`)
    }


    return (
        <>
            <Container>

                {
                    loggedUser?.role === "CREATIVE" &&
                    <>
                        <Button variant='info' size='sm' className='mt-3 mb-3' onClick={() => setShowModal(true)}>Add new event</Button>
                    </>
                }

                <EventsList />
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