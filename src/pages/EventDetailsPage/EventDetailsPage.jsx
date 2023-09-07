import { useEffect, useState } from "react"
import eventsService from "../../services/events.services"
import { useParams, Link } from "react-router-dom"
import { Container, Row, Button, Modal } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Loader from "../../components/Loader/Loader";
import formatCustomDateTime from "../../utils/date-util";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import EditEventForm from "../../components/EditEventForm/EditEventForm";
import { useContext } from "react";
import Maps from "../../components/Maps/Maps";


const EventDetailsPage = ({ }) => {

    const navigate = useNavigate()
    const { event_id } = useParams()
    const [event, setEvent] = useState({})
    const [userJoined, setUserJoined] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { loggedUser } = useContext(AuthContext)

    console.log("esto es lo que me llega dentro del evento", event)
    console.log("esto es lo que me llega del loggedUser", loggedUser)

    useEffect(() => {
        loadEventDetails()
    }, [userJoined])


    const loadEventDetails = () => {

        eventsService
            .getEventDetails(event_id)
            .then(({ data }) => setEvent(data))
            .catch(err => console.log(err))
    }


    const fireFinalActions = () => {
        navigate(`/creative/${loggedUser._id}`)
    }


    const handleJoinEvent = () => {

        eventsService
            .joinEvent(event_id)
            .then(({ data }) => {
                setEvent(data);
                setUserJoined(true);
            })
            .catch(err => console.log(err))
    }


    const handleUnjoinEvent = () => {

        eventsService
            .unjoinEvent(event_id)
            .then(({ data }) => {
                setEvent(data);
                setUserJoined(false);
            })
            .catch(err => console.log(err))
    }


    const handleRemoveEvent = () => {

        eventsService
            .removeEvent(event_id)
            .then(() => navigate('/events'))
            .catch(err => console.log(err))
    }


    return (
        !event.address ?
            <Loader />
            :
            <>
                <Container>
                    <h1 className="mb-4">{event.title} details</h1>
                    <hr />
                    <Row>
                        <Col md={{ span: 6, offset: 1 }}>
                            <h3>Infos</h3>
                            <p>{event.description}</p>
                            <ul>
                                <li>Attenders: {event.attendees.length}</li>
                                <li>Date: {formatCustomDateTime(event.date)}</li>
                                <li>{event.address}</li>
                            </ul>
                            {userJoined ? (
                                <Button variant="dark" onClick={handleUnjoinEvent}>Unjoin Event</Button>
                            ) : (
                                <Button variant="dark" onClick={handleJoinEvent}>Join Event</Button>
                            )}
                            {loggedUser?._id === event.owner || loggedUser.role === "ADMIN" ?
                                <>
                                    <Button variant="dark" onClick={handleRemoveEvent}>Remove Event</Button>
                                    <hr />
                                    <Button variant='dark' size='sm' onClick={() => setShowModal(true)}>Edit event</Button>
                                </>
                                :
                                null
                            }
                            <Modal show={showModal} onHide={() => { setShowModal(false) }}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit event</Modal.Title>
                                </Modal.Header>
                                {/* // TODO: EDIT ISSUE - ADAPTAR PROPS FINALKESs */}
                                <EditEventForm event={event} fireFinalActions={fireFinalActions} />
                            </Modal>
                            <Link to='/events' className="btn btn-dark">Volver a la galería</Link>
                        </Col>
                        <Col md={{ span: 4 }}>
                            <img src={event.icon} style={{ width: '100%' }} />
                        </Col>
                        <Col>
                            <Maps event={event} />
                        </Col>
                    </Row>
                </Container >
            </>
    )
}

export default EventDetailsPage