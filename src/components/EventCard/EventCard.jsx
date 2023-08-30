import { Col, Card, Row } from "react-bootstrap"


const EventCard = ({ _id, title, icon, description, address }) => {
    return (

        <Row xs={1} md={2} className="g-4">
            <Col>
                <Card>
                    <Card.Body>
                        <img variant="top" src={icon} height='50px' width='50px' />
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {description}
                            <hr />
                            {address.city}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default EventCard