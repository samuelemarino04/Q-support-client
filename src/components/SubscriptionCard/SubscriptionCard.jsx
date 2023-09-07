import { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { AuthContext } from '../../contexts/auth.context';
import SubscriptionForm from '../SubscriptionForm/SubscriptionForm';
import { Button, Modal, ButtonGroup } from 'react-bootstrap';
import subscriptionService from '../../services/subscription.services';
import PaymentForm from '../PaymentForm/PaymentForm';
import formatCustomDateTime from '../../utils/date-util';


const SubscriptionCard = ({ _id, title, description, clients, type, price, currency, paymentFrequency, image, owner, setSubscriptions, loadSubscriptions }) => {

    const { loggedUser } = useContext(AuthContext)
    const [hasJoined, setHasJoined] = useState(clients.includes(loggedUser?._id))
    const [showPaymentModal, setShowPaymentModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    const subscriptionDetails = {
        title: title,
        description: description,
        type: type,
        price: price,
        currency: currency,
        paymentFrequency: paymentFrequency
    }
    const handleDeleteSubscription = () => {

        subscriptionService
            .deleteSubscription(_id)
            .then(() => setSubscriptions())
            .catch(err => console.log(err))
    }


    const handleSubscriptionChange = value => {

        hasJoined ?
            (
                subscriptionService
                    .unsubscribe(_id)
                    .then(() => {
                        setHasJoined(false)
                        loadSubscriptions()
                    }
                    )
                    .catch(err => console.log(err))
            )
            :
            (
                subscriptionService
                    .subscribe(_id)
                    .then(() => {
                        setHasJoined(value)
                        loadSubscriptions()
                    }
                    )
                    .catch(err => console.log(err))
            )
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
                            <Button variant="dark" size='sm' onClick={() => { handleSubscriptionChange(false) }}>Cancel subscription</Button>
                            :
                            <Button variant="dark" size='sm' onClick={() => { setShowPaymentModal(true) }}>Join</Button>
                        :
                        null
                    }


                    {loggedUser?._id === owner &&
                        <div>
                            <ButtonGroup aria-label="Basic example">
                                <Button variant='info' size='sm' onClick={() => setShowEditModal(true)}>Edit</Button>
                                <Button variant="dark" size='sm' onClick={handleDeleteSubscription}>Delete</Button>
                            </ButtonGroup>
                        </div>
                    }
                </Card.Body >
            </Card >


            <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>You've chosen:</Modal.Title>
                </Modal.Header>
                <PaymentForm handleSubscriptionChange={handleSubscriptionChange} subscriptionDetails={subscriptionDetails} clients={clients} setShowPaymentModal={setShowPaymentModal} />
            </Modal>

            <Modal show={showEditModal} onHide={() => { setShowEditModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Subscription</Modal.Title>
                </Modal.Header>
                <SubscriptionForm setShowEditModal={setShowEditModal} subscription={{ _id, title, description, type, price, currency, paymentFrequency, image, owner }} />
            </Modal>
        </>
    )
}

export default SubscriptionCard
