
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


const SubscriptionCard = ({ _id, title, description, type, amount, image }) => {

    return (
        <Card key={_id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {amount}
                </Card.Text>
                <Card.Text>
                    {type}
                </Card.Text>
                <Card.Text>
                    {description}
                </Card.Text>
                <Link className={'btn btn-outline-dark nodeco'} to={'/paymentPage'}>Join</Link>
            </Card.Body>
        </Card>
    )
}

export default SubscriptionCard
