import SubscriptionCard from '../SubscriptionCard/SubscriptionCard'
import { Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'

const SubscriptionsList = ({ loadSubscriptions, subscriptions, setSubscriptions }) => {

    return (
        !subscriptions ?
            <Loader />
            :
            <>
                <Row>
                    {
                        subscriptions.map(elm => <SubscriptionCard loadSubscriptions={loadSubscriptions} setSubscriptions={setSubscriptions} key={elm._id} {...elm} />)
                    }
                </Row>
            </>
    )
}

export default SubscriptionsList