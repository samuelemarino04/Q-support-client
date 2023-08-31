import { useContext } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { AuthContext } from './../../contexts/auth.context'


const SubscriptionCard = ({ _id, title, description, type, amount, image, owner }) => {

    const { loggedUser } = useContext(AuthContext)
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
                <Link to={'/paymentDetails'} className='nav-link'>Join</Link>
                <Link to={`subscriptionDetails/${_id}`} />
                <ButtonGroup style={{ width: '100%' }}>
                    {loggedUser._id === owner && <Button variant='dark' size='sm'>Edit</Button>}
                </ButtonGroup>
            </Card.Body>
        </Card>
    )

}

export default SubscriptionCard
