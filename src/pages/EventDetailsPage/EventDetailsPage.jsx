import { useEffect, useState } from "react"
import eventsService from "../../services/events.services"
import { useParams } from "react-router-dom"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Loader from "../../components/Loader/Loader";

const EventDetailsPage = () => {

    const { event_id } = useParams()

    const [event, setEvent] = useState({})

    useEffect(() => {
        loadEventDetails()
    }, [])

    const loadEventDetails = () => {
        eventsService
            .getEventDetails(event_id)
            .then(({ data }) => setEvent(data))
            .catch(err => console.log(err))
    }

    return (
        !event.address ?
            <Loader />
            :
            <>
                <Col key={event._id}>
                    <Card>
                        <Card.Img variant="top" src={event.icon} style={{ height: '200px', width: '150px' }} />
                        <Card.Body>
                            <Card.Title>{event.title}</Card.Title>
                            <Card.Text>
                                {event.description}
                                {event.address.city}
                                {event.date}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </>
    );
}

export default EventDetailsPage