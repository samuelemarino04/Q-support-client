import NewEventForm from '../../components/NewEventForm/NewEventForm'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { useEffect, useState } from "react"
import EditEventForm from '../../components/EditEventForm/EditEventForm'
import eventsService from '../../services/events.services'

const EditEventPage = () => {


    const navigate = useNavigate()
    const [event, setEvent] = useState({
        title: '',
        icon: '',
        description: '',
        attendees: '',
        address: {
            street: '',
            number: '',
            zipcode: '',
            city: '',
            country: ''
        },
        date: '',
        organizer: ''
    });

    const handleSave = (event) => {

        eventsService
            .editEvent()
            .then((event) => setEventData(event))
            .catch(err => console.log(err))
    };

    return (

        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>

                    <h1>Edit Event</h1>

                    <hr />

                    <EditEventForm event={event} onSave={handleSave} />
                </Col>
            </Row>
        </Container>
    )
}

export default EditEventPage