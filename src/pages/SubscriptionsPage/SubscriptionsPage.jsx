import { Container } from 'react-bootstrap'
import SubscriptionsList from '../../components/SubscriptionsList/SubscriptionsList'
import { useEffect, useState } from 'react'
import subscriptionService from '../../services/subscription.services'
import { Link, useParams } from 'react-router-dom'

// TODO: cambiar el link CREATE NEW SUBSCRIPTION (linea 30) a modal, dentro del bottomgroup comentado

const SubscriptionsPage = () => {

    const { owner_id } = useParams()

    const [subscriptions, setSubscriptions] = useState()

    useEffect(() => {
        loadSubscriptions()
    }, [])

    const loadSubscriptions = () => {
        subscriptionService
            .getSubscriptionsByOwner(owner_id)
            .then(({ data }) => setSubscriptions(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        loadSubscriptions()
    }

    return (
        <Container>
            <Link className={'btn btn-outline-dark nodeco'} to={"/newsubscription"}>Create new subscription</Link>
            {/* <ButtonGroup style={{ width: '100%' }}>
                    {loggedUser?._id === owner && <Button variant='dark' size='sm'>Create new subscription</Button>}
                </ButtonGroup> */}
            <SubscriptionsList subscriptions={subscriptions} />
        </Container>




    )
}

export default SubscriptionsPage