import { useEffect, useState } from "react"
import eventsService from "../../services/events.services"
import { useParams, Link } from "react-router-dom"
import { Container, Row, Button, Form } from "react-bootstrap";
import Col from 'react-bootstrap/Col';
import Loader from "../../components/Loader/Loader";
import formatCustomDateTime from "../../utils/date-util";
import { useNavigate } from "react-router-dom";


const EventDetailsPage = () => {

    const navigate = useNavigate()
    const { event_id } = useParams()
    const [event, setEvent] = useState({})
    const [userJoined, setUserJoined] = useState(false)

    useEffect(() => {
        loadEventDetails()
    }, [event])

    const loadEventDetails = () => {
        eventsService
            .getEventDetails(event_id)
            .then(({ data }) => setEvent(data))
            .catch(err => console.log(err))
    }


    const handleJoinEvent = () => {
        eventsService
            .joinEvent(event_id)
            .then(({ data }) => {
                setEvent(data);
                setUserJoined(true); // Imposta lo stato per indicare che l'utente ha aderito all'evento
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
                                <li>{event.address.street}, {event.address.number}, {event.address.zipcode}, {event.address.city}, {event.address.country},  </li>
                            </ul>
                            {userJoined ? (
                                <Button variant="dark" onClick={handleUnjoinEvent}>Unjoin Event</Button>
                            ) : (
                                <Button variant="dark" onClick={handleJoinEvent}>Join Event</Button>
                            )}
                            <Button variant="dark" onClick={handleRemoveEvent}>Remove Event</Button>


                            <hr />
                            <Link to={`/events/${event_id}/edit`} className="btn btn-dark">Edit Event</Link>
                            <Link to='/events' className="btn btn-dark">Volver a la galería</Link>
                        </Col>

                        <Col md={{ span: 4 }}>
                            <img src={event.icon} style={{ width: '100%' }} />
                        </Col>

                    </Row>

                </Container >
            </>
    );
}

export default EventDetailsPage