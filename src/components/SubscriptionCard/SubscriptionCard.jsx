import { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';
import SubscriptionForm from '../SubscriptionForm/SubscriptionForm';
import { Button, Modal } from 'react-bootstrap';
import subscriptionService from '../../services/subscription.services';


const SubscriptionCard = ({ _id, title, description, clients, type, price, currency, paymentFrequency, image, owner }) => {

    const { loggedUser } = useContext(AuthContext)
    const [hasJoined, setHasJoined] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()


    const handleDeleteSubscription = () => {

        subscriptionService
            .deleteSubscription(_id)
            .then(() => navigate(`/creative/${owner}`))
            .catch(err => console.log(err))
    }


    const handleSubscriptionChange = value => {

        subscriptionService
            .subscribe(_id)
            .then(() => {
                setHasJoined(value)
            })
            .catch(err => console.log(err))
    }



    return (
        <>
            <Card key={_id} style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        Price: {price}{currency} ({paymentFrequency})
                    </Card.Text>
                    <Card.Text>
                        {type} subscription.
                    </Card.Text>
                    <Card.Text>
                        Info: {description}
                    </Card.Text>

                    {loggedUser?._id !== owner ?

                        clients.includes(loggedUser?._id) ?
                            <Button variant="dark" size='sm' onClick={() => handleSubscriptionChange(false)}>Leave</Button>
                            :
                            < Button variant="dark" size='sm' onClick={() => handleSubscriptionChange(true)}>Join</Button>
                        :
                        null
                    }
                    {loggedUser?._id === owner &&
                        <div>
                            <Button variant='dark' size='sm' onClick={() => setShowModal(true)}>Edit</Button>
                            <Button variant="dark" size='sm' onClick={handleDeleteSubscription}>Delete</Button>
                        </div>
                    }
                </Card.Body >
            </Card >
            <Modal show={showModal} onHide={() => { setShowModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Subscription</Modal.Title>
                </Modal.Header>
                <SubscriptionForm setShowModal={setShowModal} subscription={{ _id, title, description, type, price, currency, paymentFrequency, image, owner }} />
            </Modal>
        </>
    )
}

export default SubscriptionCard
