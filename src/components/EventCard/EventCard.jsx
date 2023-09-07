import { Col, Card, Row } from "react-bootstrap"
import { Link } from "react-router-dom"


const EventCard = ({ _id, title, icon, description, address, owner, ownerName }) => {

    return (
        <Row xs={1} md={2} className="g-4">
            <Col>
                <Card>
                    <Card.Body>
                        <img variant="top" src={icon} height='110px' width='135px' className="mb-3 border border-dark" />
                        <Card.Title>{title}</Card.Title>
                        <p>Creative: {ownerName}</p>
                        <p>{description}</p>
                        <hr />
                        <Card.Text>
                            <p>Address: {address}</p>
                            <Link className={'btn btn-outline-info nodeco'} to={`/getOneEvent/${_id}`}>See details</Link>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default EventCard