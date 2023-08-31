import { Container } from 'react-bootstrap'
import SubscriptionsList from '../../components/SubscriptionsList/SubscriptionsList'
import { useContext, useEffect, useState } from 'react'
import subscriptionService from '../../services/subscription.services'
import { AuthContext } from '../../contexts/auth.context'
import { useParams } from 'react-router-dom'

const SubscriptionsPage = () => {

    const { _id: creativeId } = useParams()

    //en el params desectruturar en entrada according to the name given 

    const [subscriptions, setSubscriptions] = useState()

    const { loggedUser } = useContext(AuthContext)

    useEffect(() => {
        loadSubscriptions()
    }, [])

    const loadSubscriptions = () => {
        subscriptionService
            .getSubscriptions(creativeId)
            .then(({ data }) => setSubscriptions(data))
            .catch(err => console.log(err))
    }

    const fireFinalActions = () => {
        loadSubscriptions()
    }

    return (
        <Container>
            <SubscriptionsList subscriptions={subscriptions} />
        </Container>


    )
}

export default SubscriptionsPage