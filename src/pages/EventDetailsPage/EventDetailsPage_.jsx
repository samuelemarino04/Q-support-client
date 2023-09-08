import { useEffect, useState } from "react"
import eventsService from "../../services/events.services"
import { useParams, Link } from "react-router-dom"
import { Container, Row, Button, Modal, ButtonGroup } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Loader from "../../components/Loader/Loader";
import formatCustomDateTime from "../../utils/date-util";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import EditEventForm from "../../components/EditEventForm/EditEventForm";
import { useContext } from "react";
import Maps from "../../components/Maps/Maps";
import './EventDetailsPage.css'


const EventDetailsPage = ({ }) => {

    const navigate = useNavigate()
    const { event_id } = useParams()
    const [event, setEvent] = useState({})
    const [userJoined, setUserJoined] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const { loggedUser } = useContext(AuthContext)



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
                    <div className="d-flex justify-content-between">
                        <h4 className="mt-4">{event.title}</h4>
                        {loggedUser?._id === event.owner || loggedUser.role === "ADMIN" ?
                            <>
                                <ButtonGroup className="custom-event-button">
                                    <Button variant='outline-dark' size='sm' onClick={() => setShowModal(true)}>Edit</Button>
                                    <Button variant="outline-danger" size="sm" onClick={handleRemoveEvent}>Remove</Button>
                                </ButtonGroup>
                            </>
                            :
                            null
                        }
                    </div>
                    <hr />
                    <Row>
                        <Col md={{ span: 6, offset: 1 }}>
                            <h5>Info</h5>
                            <p>{event.description}</p>
                            <ul>
                                <li>Attenders: {event.attendees.length}</li>
                                <li>Date: {formatCustomDateTime(event.date)}</li>
                                <li className="mb-4">{event.address}</li>
                                <Maps event={event} />
                            </ul>
                            {userJoined ? (
                                <Button variant="outline-danger" onClick={handleUnjoinEvent}>Unjoin Event</Button>
                            ) : (
                                <Button variant="success" onClick={handleJoinEvent}>Join Event</Button>
                            )}
                            <Modal show={showModal} onHide={() => { setShowModal(false) }}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit event</Modal.Title>
                                </Modal.Header>
                                <EditEventForm event={event} fireFinalActions={fireFinalActions} />
                            </Modal>
                            <hr />
                            <Link to='/events' className="btn btn-dark">Volver a la galería</Link>
                        </Col>
                        <Col md={{ span: 4 }}>
                            <img src={event.icon} style={{ width: '500px', height: '400px', objectFit: 'cover' }} />
                        </Col>
                    </Row>
                </Container >
            </>
    )
}

export default EventDetailsPage