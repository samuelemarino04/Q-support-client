import { Col, Card, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const EventCard = (_id, title, icon, description) => {

    return (

        <Row xs={1} md={2} className="g-4">
            <Col>
                <Card>
                    {/* <img variant="top" src={icon} height='50px' width='50px' /> */}
                    <Card.Body>
                        <img variant="top" src={icon} height='50px' width='50px' />
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {description}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

        </Row>

    )
}

export default EventCard