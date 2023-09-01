import { Container } from 'react-bootstrap'
import SubscriptionsList from '../../components/SubscriptionsList/SubscriptionsList'
import { useEffect, useState } from 'react'
import subscriptionService from '../../services/subscription.services'
import { useParams } from 'react-router-dom'

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
            <h1>heeeeeeeeeeeeeeeeeey</h1>
            <SubscriptionsList subscriptions={subscriptions} />
        </Container>


    )
}

export default SubscriptionsPage