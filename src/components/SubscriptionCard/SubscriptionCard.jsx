
import { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth.context';
import SubscriptionForm from '../SubscriptionForm/SubscriptionForm';
import { Button, Modal } from 'react-bootstrap';

const SubscriptionCard = ({ _id, title, description, type, price, currency, paymentFrequency, image, owner }) => {
    console.log("este es el id de la subscripción----------------", _id)
    const { loggedUser } = useContext(AuthContext)

    const [showModal, setShowModal] = useState(false)

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

                    {loggedUser?._id !== owner && <Link className={'btn btn-outline-dark nodeco'} to={'/paymentPage'}>Join</Link>}

                    {loggedUser?._id === owner &&
                        <div>
                            <Button variant='dark' size='sm' onClick={() => setShowModal(true)}>edit</Button>
                            <Link className={'btn btn-outline-dark nodeco'} to={'/paymentPage'}>Delete</Link>
                        </div>}

                </Card.Body>
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
