import NewEventForm from '../../components/NewEventForm/NewEventForm'
import { Container, Row, Col } from 'react-bootstrap'

const NewEventPage = () => {

    return (

        <Container>
            <Row>
                <Col md={{ offset: 3, span: 6 }}>
                    <h1>Add Event</h1>
                    <hr />
                    {/* TODO: FAKTA PORP FIREFINALACTIONS */}
                    <NewEventForm />
                </Col>
            </Row>
        </Container>
    )
}

export default NewEventPage