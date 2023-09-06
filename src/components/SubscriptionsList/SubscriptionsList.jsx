import SubscriptionCard from '../SubscriptionCard/SubscriptionCard'
import { Row } from 'react-bootstrap'
import Loader from '../Loader/Loader'

const SubscriptionsList = ({ subscriptions, setSubscriptions }) => {

    return (
        !subscriptions ?
            <Loader />
            :
            <>
                <Row>
                    {
                        subscriptions.map(elm => <SubscriptionCard setSubscriptions={setSubscriptions} key={elm._id} {...elm} />)
                    }
                </Row>
            </>
    )
}

export default SubscriptionsList