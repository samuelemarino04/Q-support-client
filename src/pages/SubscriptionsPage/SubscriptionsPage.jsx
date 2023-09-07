import { Button, Card, Container, Modal } from 'react-bootstrap'
import SubscriptionsList from '../../components/SubscriptionsList/SubscriptionsList'
import { useContext, useEffect, useState } from 'react'
import subscriptionService from '../../services/subscription.services'
import SubscriptionForm from '../../components/SubscriptionForm/SubscriptionForm'
import { AuthContext } from '../../contexts/auth.context'

// TODO: NOMINAR COMO COMPONENTE PLANO Y DESENRUTAR

const SubscriptionsPage = ({ creative, owner_id }) => {

    const { loggedUser } = useContext(AuthContext)
    const [subscriptions, setSubscriptions] = useState()
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
                <SubscriptionsList loadSubscriptions={loadSubscriptions} subscriptions={subscriptions} setSubscriptions={setSubscriptions} creative={creative} />
                {loggedUser?._id === owner_id && <Button variant='info' size='sm' className="mt-3" onClick={() => setShowModal(true)}>new subscription</Button>}
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