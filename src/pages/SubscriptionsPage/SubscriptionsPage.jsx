import { Button, Card, Container, Modal } from 'react-bootstrap'
import SubscriptionsList from '../../components/SubscriptionsList/SubscriptionsList'
import { useContext, useEffect, useState } from 'react'
import subscriptionService from '../../services/subscription.services'
import SubscriptionForm from '../../components/SubscriptionForm/SubscriptionForm'
import { AuthContext } from '../../contexts/auth.context'

const SubscriptionsPage = ({ creative, owner_id }) => {

    const { loggedUser } = useContext(AuthContext)

    const [subscriptions, setSubscriptions] = useState()
    console.log("estado desde page", subscriptions)

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        loadSubscriptions()
    }, [])

    const loadSubscriptions = () => {
        subscriptionService
            .getSubscriptionsByOwner(owner_id)
            .then(({ data }) => setSubscriptions(data))
            .catch(err => console.log(err))
    }

    return (
        <>
            <Container>
                {loggedUser?._id === owner_id && <Button variant='dark' size='sm' onClick={() => setShowModal(true)}>new subscription</Button>}
                <SubscriptionsList subscriptions={subscriptions} creative={creative} />
            </Container>
            <Modal show={showModal} onHide={() => { setShowModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Create a new Subscription</Modal.Title>
                </Modal.Header>
                <SubscriptionForm setShowModal={setShowModal} />
            </Modal>
        </>
    )
}

export default SubscriptionsPage