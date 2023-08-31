import { Col, Card, Row } from "react-bootstrap"
import { Link } from "react-router-dom"


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
                            {address.street}
                            <hr />
                            {address.number}
                            <hr />
                            {address.zipcode}
                            <hr />
                            {address.city}
                            <hr />
                            <Link className={'btn btn-outline-dark nodeco'} to={`/getOneEvent/${_id}`}>See details</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default EventCard